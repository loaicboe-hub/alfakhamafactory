<?php
/**
 * AL FAKHAMA (HARV FRIES) - Rate Limiting Library
 * ─────────────────────────────────────────────────
 * Protects API endpoints from spam, bots, and brute-force attacks.
 * Uses MySQL for persistence across requests (no Redis needed).
 *
 * Usage:
 *   require_once __DIR__ . '/rate_limit.php';
 *   checkRateLimit('rfq_submit');       // throws 429 if exceeded
 *   checkRateLimit('admin_auth', 10);   // custom limit
 */

defined('ALFAKHAMA_APP') or define('ALFAKHAMA_APP', true);

// ============================================================================
// RATE LIMIT CONFIGURATION
// ============================================================================
const RATE_LIMITS = [
    'rfq_submit'   => ['max' => 5,  'window' => 600],  // 5 submits / 10 min per IP
    'admin_auth'   => ['max' => 10, 'window' => 300],  // 10 auth attempts / 5 min per IP
    'admin_api'    => ['max' => 60, 'window' => 60],   // 60 requests / 1 min (admin ops)
    'default'      => ['max' => 20, 'window' => 60],   // fallback
];

/**
 * Get real client IP address (handles proxies / Cloudflare / load balancers)
 */
function getClientIp(): string {
    $headers = [
        'HTTP_CF_CONNECTING_IP',   // Cloudflare
        'HTTP_X_FORWARDED_FOR',    // Proxies / Load Balancers
        'HTTP_X_REAL_IP',
        'REMOTE_ADDR'
    ];

    foreach ($headers as $h) {
        if (!empty($_SERVER[$h])) {
            $ip = trim(explode(',', $_SERVER[$h])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return $ip;
            }
        }
    }

    // Fall back to REMOTE_ADDR even if private range (local dev)
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/**
 * Ensure the rate_limit table exists (auto-creates on first run)
 */
function ensureRateLimitTable(PDO $pdo): void {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `rate_limit` (
            `id`           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            `ip`           VARCHAR(45)  NOT NULL,
            `endpoint`     VARCHAR(64)  NOT NULL,
            `hits`         INT UNSIGNED NOT NULL DEFAULT 1,
            `window_start` DATETIME     NOT NULL,
            INDEX `idx_ip_endpoint` (`ip`, `endpoint`),
            INDEX `idx_window`      (`window_start`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
}

/**
 * Check rate limit for the current request.
 * Sends HTTP 429 and exits if the limit is exceeded.
 *
 * @param string   $endpoint  Key from RATE_LIMITS config (e.g. 'rfq_submit')
 * @param int|null $maxHits   Override max hits (optional)
 * @param int|null $window    Override window in seconds (optional)
 */
function checkRateLimit(string $endpoint = 'default', int $maxHits = null, int $window = null): void {
    $config    = RATE_LIMITS[$endpoint] ?? RATE_LIMITS['default'];
    $maxHits   = $maxHits  ?? $config['max'];
    $window    = $window   ?? $config['window'];
    $ip        = getClientIp();
    $now       = date('Y-m-d H:i:s');
    $windowStart = date('Y-m-d H:i:s', time() - $window);

    try {
        require_once __DIR__ . '/config.php';
        $pdo = getDbConnection();
        ensureRateLimitTable($pdo);

        // Clean up old records for this IP+endpoint to keep the table lean
        $pdo->prepare("
            DELETE FROM `rate_limit`
            WHERE `ip` = :ip AND `endpoint` = :ep AND `window_start` < :ws
        ")->execute([':ip' => $ip, ':ep' => $endpoint, ':ws' => $windowStart]);

        // Count existing hits within the current window
        $stmt = $pdo->prepare("
            SELECT COALESCE(SUM(`hits`), 0) AS total
            FROM `rate_limit`
            WHERE `ip` = :ip AND `endpoint` = :ep AND `window_start` >= :ws
        ");
        $stmt->execute([':ip' => $ip, ':ep' => $endpoint, ':ws' => $windowStart]);
        $total = (int)$stmt->fetchColumn();

        if ($total >= $maxHits) {
            $retryAfter = $window;
            header('Retry-After: '        . $retryAfter);
            header('X-RateLimit-Limit: '  . $maxHits);
            header('X-RateLimit-Remaining: 0');
            header('X-RateLimit-Reset: '  . (time() + $retryAfter));
            http_response_code(429);
            echo json_encode([
                'success'     => false,
                'message'     => 'Too many requests. Please wait a moment before trying again.',
                'retry_after' => $retryAfter,
                'error_code'  => 'RATE_LIMIT_EXCEEDED'
            ]);
            exit;
        }

        // Log this hit
        $pdo->prepare("
            INSERT INTO `rate_limit` (`ip`, `endpoint`, `hits`, `window_start`)
            VALUES (:ip, :ep, 1, :now)
        ")->execute([':ip' => $ip, ':ep' => $endpoint, ':now' => $now]);

        // Informational headers
        $remaining = max(0, $maxHits - $total - 1);
        header('X-RateLimit-Limit: '     . $maxHits);
        header('X-RateLimit-Remaining: ' . $remaining);
        header('X-RateLimit-Reset: '     . (time() + $window));

    } catch (Exception $e) {
        // Fail open — don't block legit users if DB is temporarily unavailable
        error_log('[RateLimit Error] ' . $e->getMessage());
    }
}

/**
 * Lightweight bot / abuse signal detection.
 * Rejects obviously malicious requests before rate limit even runs.
 */
function rejectSuspiciousRequests(): void {
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';

    // Block empty user agents
    if (empty(trim($ua))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Bad request.', 'error_code' => 'MISSING_UA']);
        exit;
    }

    // Block known scanner/bot signatures
    $blockedPatterns = [
        'sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab',
        'python-requests', 'go-http-client', 'libwww-perl',
        'scrapy', 'httpclient', 'dirbuster', 'nuclei'
    ];
    $uaLower = strtolower($ua);
    foreach ($blockedPatterns as $pattern) {
        if (strpos($uaLower, $pattern) !== false) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Forbidden.', 'error_code' => 'BOT_DETECTED']);
            exit;
        }
    }
}
