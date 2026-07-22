<?php

declare(strict_types=1);

function load_mail_config(): array
{
    $paths = [
        __DIR__ . '/../../../config/mail.php',
        __DIR__ . '/../../../../config/mail.php',
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
        'host' => getenv('GPROJECTS_SMTP_HOST') ?: '',
        'port' => getenv('GPROJECTS_SMTP_PORT') ?: '587',
        'encryption' => getenv('GPROJECTS_SMTP_ENCRYPTION') ?: 'tls',
        'username' => getenv('GPROJECTS_SMTP_USER') ?: '',
        'password' => getenv('GPROJECTS_SMTP_PASSWORD') ?: '',
        'from_email' => getenv('GPROJECTS_SMTP_FROM_EMAIL') ?: '',
        'from_name' => getenv('GPROJECTS_SMTP_FROM_NAME') ?: 'GProjects Website',
        'admin_email' => getenv('GPROJECTS_COMMENT_ADMIN_EMAIL') ?: '',
        'admin_comments_url' => getenv('GPROJECTS_ADMIN_COMMENTS_URL') ?: '',
    ];
}

function smtp_read($socket): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }

    return $response;
}

function smtp_expect($socket, array $codes): string
{
    $response = smtp_read($socket);
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $codes, true)) {
        throw new RuntimeException('Unexpected SMTP response: ' . trim($response));
    }

    return $response;
}

function smtp_command($socket, string $command, array $codes): string
{
    fwrite($socket, $command . "\r\n");
    return smtp_expect($socket, $codes);
}

function encode_mail_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function smtp_send_mail(array $config, string $to, string $subject, string $body): void
{
    $host = (string) ($config['host'] ?? '');
    $port = (int) ($config['port'] ?? 587);
    $encryption = strtolower((string) ($config['encryption'] ?? 'tls'));
    $username = (string) ($config['username'] ?? '');
    $password = (string) ($config['password'] ?? '');
    $fromEmail = (string) ($config['from_email'] ?? $username);
    $fromName = (string) ($config['from_name'] ?? 'GProjects Website');

    if ($host === '' || $username === '' || $password === '' || $fromEmail === '' || $to === '') {
        throw new RuntimeException('SMTP configuration is incomplete.');
    }

    $remote = ($encryption === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $socket = stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$socket) {
        throw new RuntimeException('SMTP connection failed: ' . $errstr, $errno);
    }

    stream_set_timeout($socket, 20);

    try {
        smtp_expect($socket, [220]);
        smtp_command($socket, 'EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'gprojects.ng'), [250]);

        if ($encryption === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('Unable to start SMTP TLS encryption.');
            }
            smtp_command($socket, 'EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'gprojects.ng'), [250]);
        }

        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($username), [334]);
        smtp_command($socket, base64_encode($password), [235]);
        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $headers = [
            'From: ' . encode_mail_header($fromName) . ' <' . $fromEmail . '>',
            'To: <' . $to . '>',
            'Subject: ' . encode_mail_header($subject),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];
        $message = implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n.", "\n..", $body) . "\r\n.";
        smtp_command($socket, $message, [250]);
        smtp_command($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function notify_pending_comment(array $comment): void
{
    $config = load_mail_config();
    $adminEmail = (string) ($config['admin_email'] ?? '');
    $adminUrl = (string) ($config['admin_comments_url'] ?? '');

    if ($adminEmail === '' || $adminUrl === '') {
        error_log('Blog comment notification skipped: admin email or comments URL is missing.');
        return;
    }

    $message = trim((string) ($comment['message'] ?? ''));
    $preview = substr(preg_replace('/\s+/', ' ', $message) ?: '', 0, 180);

    $body = implode("\n", [
        'A new blog comment is awaiting approval.',
        '',
        'Name: ' . ($comment['name'] ?? ''),
        'Article: ' . get_article_title((string) ($comment['articleSlug'] ?? '')),
        'Article slug: ' . ($comment['articleSlug'] ?? ''),
        'Submitted: ' . ($comment['createdAt'] ?? date('Y-m-d H:i:s')),
        '',
        'Preview:',
        $preview,
        '',
        'Moderate comments here:',
        $adminUrl,
    ]);

    try {
        smtp_send_mail($config, $adminEmail, 'New blog comment awaiting approval', $body);
    } catch (Throwable $exception) {
        error_log('Blog comment notification failed: ' . $exception->getMessage());
    }
}
