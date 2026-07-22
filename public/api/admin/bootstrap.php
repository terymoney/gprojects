<?php

declare(strict_types=1);

require __DIR__ . '/../comments/bootstrap.php';

function secure_admin_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

    session_name('gprojects_admin');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

function load_admin_config(): array
{
    $paths = [
        __DIR__ . '/../../../config/admin.php',
        __DIR__ . '/../../../../config/admin.php',
    ];

    foreach ($paths as $path) {
        if (is_readable($path)) {
            $config = require $path;
            if (is_array($config)) {
                return $config;
            }
        }
    }

    return [
        'username' => getenv('GPROJECTS_ADMIN_USER') ?: '',
        'password_hash' => getenv('GPROJECTS_ADMIN_PASSWORD_HASH') ?: '',
    ];
}

function admin_csrf_token(): string
{
    secure_admin_session_start();

    if (empty($_SESSION['admin_csrf_token'])) {
        $_SESSION['admin_csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['admin_csrf_token'];
}

function is_admin_authenticated(): bool
{
    secure_admin_session_start();
    return (bool) ($_SESSION['admin_authenticated'] ?? false);
}

function require_admin_session(): void
{
    if (!is_admin_authenticated()) {
        json_response(['success' => false, 'message' => 'Authentication required.'], 401);
    }
}

function require_admin_csrf(?array $data = null): void
{
    secure_admin_session_start();

    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? ($data['csrfToken'] ?? '');
    if (!is_string($token) || $token === '' || !hash_equals($_SESSION['admin_csrf_token'] ?? '', $token)) {
        json_response(['success' => false, 'message' => 'Invalid security token.'], 403);
    }
}

function validate_comment_id($value): int
{
    $id = filter_var($value, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if (!$id) {
        json_response(['success' => false, 'message' => 'Invalid comment id.'], 422);
    }

    return (int) $id;
}

function public_comment_payload(array $row): array
{
    $slug = (string) $row['article_slug'];

    return [
        'id' => (int) $row['id'],
        'articleSlug' => $slug,
        'articleTitle' => get_article_title($slug),
        'name' => $row['name'],
        'email' => $row['email'],
        'website' => $row['website'],
        'message' => $row['message'],
        'status' => $row['status'],
        'createdAt' => $row['created_at'],
        'updatedAt' => $row['updated_at'],
    ];
}
