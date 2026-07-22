<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

require_method('GET');

$articleSlug = validate_article_slug($_GET['articleSlug'] ?? null);

try {
    $statement = db()->prepare(
        "SELECT id, name, message, created_at
         FROM blog_comments
         WHERE article_slug = :article_slug
         AND status = 'approved'
         ORDER BY created_at ASC"
    );
    $statement->execute(['article_slug' => $articleSlug]);

    $comments = array_map(static function (array $row): array {
        return [
            'id' => (int) $row['id'],
            'name' => $row['name'],
            'message' => $row['message'],
            'createdAt' => $row['created_at'],
        ];
    }, $statement->fetchAll());

    json_response([
        'success' => true,
        'comments' => $comments,
        'count' => count($comments),
    ]);
} catch (Throwable $exception) {
    error_log('Blog comments list failed: ' . $exception->getMessage());
    json_response(['success' => false, 'message' => 'Comments are temporarily unavailable.'], 500);
}
