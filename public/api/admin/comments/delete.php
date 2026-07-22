<?php

declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

require_method('POST');
require_same_origin();
require_admin_session();

$data = get_request_data();
require_admin_csrf($data);
$id = validate_comment_id($data['id'] ?? null);

try {
    $statement = db()->prepare('DELETE FROM blog_comments WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);

    json_response(['success' => true, 'message' => 'Comment deleted.']);
} catch (Throwable $exception) {
    error_log('Admin comment delete failed: ' . $exception->getMessage());
    json_response(['success' => false, 'message' => 'Unable to delete comment.'], 500);
}
