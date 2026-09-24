<?php
/**
 * AL FAKHAMA (HARV FRIES) - Admin Inquiries API & CSV Export
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Key');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── Security: Bot detection + Rate Limiting ──────────────────────────────────
require_once __DIR__ . '/rate_limit.php';
rejectSuspiciousRequests();           // Block scanners / known bots
checkRateLimit('admin_api');          // Max 60 requests per IP per minute
// ─────────────────────────────────────────────────────────────────────────────

require_once __DIR__ . '/config.php';

// Check Admin Authentication Key
$authKey = $_SERVER['HTTP_X_ADMIN_KEY'] ?? $_GET['key'] ?? $_POST['key'] ?? '';

if ($authKey !== ADMIN_SECRET_KEY) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized: Invalid Admin Secret Key.']);
    exit;
}

$pdo = getDbConnection();

// ============================================================================
// ACTION 1: Update Status (POST)
// ============================================================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?? $_POST;

    $action    = $data['action'] ?? '';
    $inquiryId = (int)($data['id'] ?? 0);
    $newStatus = trim($data['status'] ?? '');

    if ($action === 'update_status' && $inquiryId > 0 && in_array($newStatus, ['new', 'contacted', 'in_progress', 'completed', 'archived'])) {
        $stmt = $pdo->prepare("UPDATE `rfq_inquiries` SET `status` = :status WHERE `id` = :id");
        $stmt->execute([':status' => $newStatus, ':id' => $inquiryId]);

        echo json_encode(['success' => true, 'message' => "Inquiry #{$inquiryId} updated to {$newStatus}."]);
        exit;
    }

    if ($action === 'delete' && $inquiryId > 0) {
        $stmt = $pdo->prepare("DELETE FROM `rfq_inquiries` WHERE `id` = :id");
        $stmt->execute([':id' => $inquiryId]);

        echo json_encode(['success' => true, 'message' => "Inquiry #{$inquiryId} deleted successfully."]);
        exit;
    }

    if ($action === 'bulk_delete') {
        $ids = array_values(array_filter(array_map('intval', (array)($data['ids'] ?? []))));
        if (!empty($ids)) {
            $inClause = implode(',', array_fill(0, count($ids), '?'));
            $stmt = $pdo->prepare("DELETE FROM `rfq_inquiries` WHERE `id` IN ($inClause)");
            $stmt->execute($ids);

            echo json_encode(['success' => true, 'message' => count($ids) . " inquiries deleted successfully."]);
            exit;
        } else {
            echo json_encode(['success' => false, 'message' => 'No valid IDs provided for deletion.']);
            exit;
        }
    }
}

// ============================================================================
// ACTION 2: CSV Export for Excel (GET with export=csv)
// ============================================================================
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="alfakhama_rfq_inquiries_' . date('Y-m-d_His') . '.csv"');

    $output = fopen('php://output', 'w');
    // Add UTF-8 BOM for Microsoft Excel compatibility
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

    fputcsv($output, ['ID', 'Full Name', 'Company', 'Email', 'Phone/WhatsApp', 'Country Destination', 'Product Cut', 'Estimated Volume', 'Notes / Message', 'Status', 'IP Address', 'Created Date']);

    $stmt = $pdo->query("SELECT `id`, `full_name`, `company_name`, `email`, `phone_whatsapp`, `country_destination`, `product_cut`, `estimated_volume`, `message`, `status`, `ip_address`, `created_at` FROM `rfq_inquiries` ORDER BY `id` DESC");
    
    while ($row = $stmt->fetch()) {
        fputcsv($output, $row);
    }

    fclose($output);
    exit;
}

// ============================================================================
// ACTION 3: Fetch JSON list of Inquiries
// ============================================================================
$statusFilter = $_GET['status'] ?? 'all';
$sql = "SELECT `id`, `full_name`, `company_name`, `email`, `phone_whatsapp`, `country_destination`, `product_cut`, `estimated_volume`, `message`, `status`, `created_at` FROM `rfq_inquiries`";

if ($statusFilter !== 'all' && in_array($statusFilter, ['new', 'contacted', 'in_progress', 'completed', 'archived'])) {
    $stmt = $pdo->prepare($sql . " WHERE `status` = :status ORDER BY `id` DESC");
    $stmt->execute([':status' => $statusFilter]);
} else {
    $stmt = $pdo->query($sql . " ORDER BY `id` DESC");
}

$inquiries = $stmt->fetchAll();

// Statistics
$statsStmt = $pdo->query("
    SELECT 
        COUNT(*) as total_inquiries,
        SUM(CASE WHEN `status` = 'new' THEN 1 ELSE 0 END) as new_count,
        SUM(CASE WHEN `status` = 'contacted' THEN 1 ELSE 0 END) as contacted_count,
        SUM(CASE WHEN `status` = 'completed' THEN 1 ELSE 0 END) as completed_count
    FROM `rfq_inquiries`
");
$stats = $statsStmt->fetch();

echo json_encode([
    'success'   => true,
    'count'     => count($inquiries),
    'stats'     => $stats,
    'inquiries' => $inquiries
]);
