<?php

declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

require_method('POST');
require_same_origin();
secure_admin_session_start();

$data = get_request_data();
$username = trim((string) ($data['username'] ?? ''));
$password = (string) ($data['password'] ?? '');
$config = load_admin_config();
$expectedUsername = (string) ($config['username'] ?? '');
$passwordHash = (string) ($config['password_hash'] ?? '');

if ($expectedUsername === '' || $passwordHash === '') {
    error_log('Admin authentication configuration is missing.');
    json_response(['success' => false, 'message' => 'Admin login is not configured.'], 503);
}

if (!hash_equals($expectedUsername, $username) || !password_verify($password, $passwordHash)) {
    json_response(['success' => false, 'message' => 'Invalid admin credentials.'], 401);
}

session_regenerate_id(true);
$_SESSION['admin_authenticated'] = true;
$_SESSION['admin_username'] = $expectedUsername;
$_SESSION['admin_csrf_token'] = bin2hex(random_bytes(32));

json_response([
    'success' => true,
    'message' => 'Signed in.',
    'username' => $expectedUsername,
    'csrfToken' => $_SESSION['admin_csrf_token'],
]);
