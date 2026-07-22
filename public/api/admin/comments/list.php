<?php

declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

require_method('GET');
require_admin_session();

$status = trim((string) ($_GET['status'] ?? 'pending'));
$articleSlug = trim((string) ($_GET['articleSlug'] ?? ''));
$dateFrom = trim((string) ($_GET['dateFrom'] ?? ''));
$dateTo = trim((string) ($_GET['dateTo'] ?? ''));
$where = [];
$params = [];

if ($status !== '' && $status !== 'all') {
    if (!in_array($status, ['pending', 'approved', 'rejected'], true)) {
        json_response(['success' => false, 'message' => 'Invalid status filter.'], 422);
    }
    $where[] = 'status = :status';
    $params['status'] = $status;
}

if ($articleSlug !== '') {
    $articleSlug = validate_article_slug($articleSlug);
    $where[] = 'article_slug = :article_slug';
    $params['article_slug'] = $articleSlug;
}

if ($dateFrom !== '') {
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateFrom)) {
        json_response(['success' => false, 'message' => 'Invalid start date.'], 422);
    }
    $where[] = 'created_at >= :date_from';
    $params['date_from'] = $dateFrom . ' 00:00:00';
}

if ($dateTo !== '') {
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateTo)) {
        json_response(['success' => false, 'message' => 'Invalid end date.'], 422);
    }
    $where[] = 'created_at <= :date_to';
    $params['date_to'] = $dateTo . ' 23:59:59';
}

$sql = 'SELECT id, article_slug, name, email, website, message, status, created_at, updated_at FROM blog_comments';
if ($where) {
    $sql .= ' WHERE ' . implode(' AND ', $where);
}
$sql .= ' ORDER BY created_at DESC LIMIT 300';

try {
    $statement = db()->prepare($sql);
    $statement->execute($params);
    $comments = array_map('public_comment_payload', $statement->fetchAll());

    json_response([
        'success' => true,
        'comments' => $comments,
        'articles' => ARTICLE_TITLES,
        'csrfToken' => admin_csrf_token(),
    ]);
} catch (Throwable $exception) {
    error_log('Admin comments list failed: ' . $exception->getMessage());
    json_response(['success' => false, 'message' => 'Unable to load comments.'], 500);
}
