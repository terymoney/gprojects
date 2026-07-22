<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/notify.php';

require_method('POST');
require_same_origin();

$data = get_request_data();
$errors = [];
$articleSlug = validate_article_slug($data['articleSlug'] ?? null);
$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$website = trim((string) ($data['website'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$honeypot = trim((string) ($data['company'] ?? $data['honeypot'] ?? ''));

if ($honeypot !== '') {
    json_response(['success' => true, 'message' => 'Thank you. Your comment has been submitted for review.']);
}

if ($name === '') {
    $errors['name'] = 'Enter your name.';
} elseif (strlen($name) > 150) {
    $errors['name'] = 'Name must be 150 characters or fewer.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Enter a valid email address.';
} elseif (strlen($email) > 255) {
    $errors['email'] = 'Email must be 255 characters or fewer.';
}

if ($website !== '' && !filter_var($website, FILTER_VALIDATE_URL)) {
    $errors['website'] = 'Enter a valid website URL.';
} elseif (strlen($website) > 255) {
    $errors['website'] = 'Website must be 255 characters or fewer.';
}

if ($message === '') {
    $errors['message'] = 'Enter your comment.';
} elseif (strlen($message) > 5000) {
    $errors['message'] = 'Comment must be 5,000 characters or fewer.';
}

if ($errors) {
    json_response([
        'success' => false,
        'message' => 'Please correct the highlighted fields.',
        'errors' => $errors,
    ], 422);
}

session_start();
$now = time();
$windowSeconds = 300;
$maxSubmissions = 3;
$_SESSION['comment_submissions'] = array_values(array_filter(
    $_SESSION['comment_submissions'] ?? [],
    static fn (int $timestamp): bool => $timestamp > $now - $windowSeconds
));

if (count($_SESSION['comment_submissions']) >= $maxSubmissions) {
    json_response([
        'success' => false,
        'message' => 'Please wait a few minutes before submitting another comment.',
    ], 429);
}

try {
    $statement = db()->prepare(
        "INSERT INTO blog_comments
            (article_slug, name, email, website, message, status, ip_hash)
         VALUES
            (:article_slug, :name, :email, :website, :message, 'pending', :ip_hash)"
    );
    $statement->execute([
        'article_slug' => $articleSlug,
        'name' => $name,
        'email' => $email,
        'website' => $website !== '' ? $website : null,
        'message' => $message,
        'ip_hash' => client_ip_hash(),
    ]);

    $_SESSION['comment_submissions'][] = $now;

    notify_pending_comment([
        'name' => $name,
        'articleSlug' => $articleSlug,
        'message' => $message,
        'createdAt' => date('Y-m-d H:i:s'),
    ]);

    json_response([
        'success' => true,
        'message' => 'Thank you. Your comment has been submitted for review.',
    ], 201);
} catch (Throwable $exception) {
    error_log('Blog comment submission failed: ' . $exception->getMessage());
    json_response(['success' => false, 'message' => 'Your comment could not be submitted. Please try again.'], 500);
}
