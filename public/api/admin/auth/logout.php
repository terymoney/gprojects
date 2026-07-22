<?php

declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

require_method('POST');
require_same_origin();
secure_admin_session_start();
$data = get_request_data();

if (is_admin_authenticated()) {
    require_admin_csrf($data);
}

$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
}

session_destroy();
json_response(['success' => true, 'message' => 'Signed out.']);
