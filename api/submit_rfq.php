<?php
/**
 * AL FAKHAMA (HARV FRIES) - RFQ & Inquiry Submission Endpoint
 * Inserts B2B quote inquiries into MySQL database on Hostinger
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed. Use POST.']);
    exit;
}

// ── Security: Bot detection + Rate Limiting ──────────────────────────────────
require_once __DIR__ . '/rate_limit.php';
rejectSuspiciousRequests();           // Block scanners / known bots
checkRateLimit('rfq_submit');         // Max 5 submissions per IP per 10 minutes
// ─────────────────────────────────────────────────────────────────────────────

require_once __DIR__ . '/config.php';

// Parse incoming data (JSON payload or standard POST)
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// Extract and sanitize fields
$fullName    = trim($data['full_name'] ?? $data['name'] ?? '');
$companyName = trim($data['company_name'] ?? $data['company'] ?? '');
$email       = trim($data['email'] ?? '');
$phone       = trim($data['phone_whatsapp'] ?? $data['phone'] ?? '');
$country     = trim($data['country_destination'] ?? $data['country'] ?? '');
$productCut  = trim($data['product_cut'] ?? $data['cut'] ?? 'Par-Fried Frozen Fries');
$volume      = trim($data['estimated_volume'] ?? $data['quantity'] ?? 'Commercial Volume');
$message     = trim($data['message'] ?? $data['notes'] ?? '');

// Validation
$errors = [];
if (empty($fullName))    $errors[] = 'Full Name is required.';
if (empty($companyName)) $errors[] = 'Company Name is required.';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid Business Email is required.';
if (empty($phone))       $errors[] = 'Phone / WhatsApp number is required.';
if (empty($country))     $errors[] = 'Country / Destination Port is required.';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation error.',
        'errors'  => $errors
    ]);
    exit;
}

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
$userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500);

try {
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("
        INSERT INTO `rfq_inquiries` 
        (`full_name`, `company_name`, `email`, `phone_whatsapp`, `country_destination`, `product_cut`, `estimated_volume`, `message`, `ip_address`, `user_agent`, `status`)
        VALUES 
        (:full_name, :company_name, :email, :phone, :country, :product_cut, :volume, :message, :ip, :ua, 'new')
    ");

    $stmt->execute([
        ':full_name'    => $fullName,
        ':company_name' => $companyName,
        ':email'        => $email,
        ':phone'        => $phone,
        ':country'      => $country,
        ':product_cut'  => $productCut,
        ':volume'       => $volume,
        ':message'      => $message,
        ':ip'           => $ipAddress,
        ':ua'           => $userAgent
    ]);

    $inquiryId = $pdo->lastInsertId();

    // Optional email notification to company sales inbox
    if (defined('NOTIFICATION_EMAIL') && filter_var(NOTIFICATION_EMAIL, FILTER_VALIDATE_EMAIL)) {
        $subject = "New RFQ Lead #{$inquiryId} - {$companyName} ({$country})";
        $emailBody = "New B2B Quote Request Received on Al Fakhama Portal:\n\n"
                   . "Inquiry ID: #{$inquiryId}\n"
                   . "Client Name: {$fullName}\n"
                   . "Company: {$companyName}\n"
                   . "Email: {$email}\n"
                   . "Phone/WhatsApp: {$phone}\n"
                   . "Destination: {$country}\n"
                   . "Product Cut: {$productCut}\n"
                   . "Estimated Volume: {$volume}\n"
                   . "Notes: {$message}\n\n"
                   . "Date: " . date('Y-m-d H:i:s') . "\n";

        $headers = "From: no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'alfakhama-fries.com') . "\r\n"
                 . "Reply-To: {$email}\r\n"
                 . "X-Mailer: PHP/" . phpversion();

        @mail(NOTIFICATION_EMAIL, $subject, $emailBody, $headers);
    }

    echo json_encode([
        'success'    => true,
        'message'    => 'Thank you! Your quote request has been saved and forwarded to our export commercial team.',
        'inquiry_id' => (int)$inquiryId
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while storing your request. Please try contacting us via WhatsApp.',
        'error'   => $e->getMessage()
    ]);
}
