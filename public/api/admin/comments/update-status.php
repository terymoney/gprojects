<?php

declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

require_method('POST');
require_same_origin();
require_admin_session();

$data = get_request_data();
require_admin_csrf($data);

$id = validate_comment_id($data['id'] ?? null);
$status = trim((string) ($data['status'] ?? ''));

if (!in_array($status, ['approved', 'rejected'], true)) {
    json_response(['success' => false, 'message' => 'Invalid moderation status.'], 422);
}

try {
    $statement = db()->prepare('UPDATE blog_comments SET status = :status WHERE id = :id LIMIT 1');
    $statement->execute(['status' => $status, 'id' => $id]);

    json_response([
        'success' => true,
        'message' => $status === 'approved' ? 'Comment approved.' : 'Comment rejected.',
    ]);
} catch (Throwable $exception) {
    error_log('Admin comment status update failed: ' . $exception->getMessage());
    json_response(['success' => false, 'message' => 'Unable to update comment.'], 500);
}
