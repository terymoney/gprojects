<?php

declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

require_method('GET');
secure_admin_session_start();

json_response([
    'success' => true,
    'authenticated' => is_admin_authenticated(),
    'username' => $_SESSION['admin_username'] ?? null,
    'csrfToken' => is_admin_authenticated() ? admin_csrf_token() : null,
]);
