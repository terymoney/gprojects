<?php

declare(strict_types=1);

const ARTICLE_TITLES = [
    'building-a-better-future-together' => 'Building a Better Future Together: Partnering with GProjects Limited Through GInitiative for Sustainable Development and Human Impact',
    'gprojects-sets-benchmark-with-ginitiative-csr-achievements' => 'GProjects Limited Sets Benchmark with GInitiative CSR Achievements: Advancing 17 UN-SDGs with 80% Completion',
    'unlocking-the-future-digital-literacy-project' => "Unlocking the Future: How GInitiative's Digital Literacy Project Is Empowering the Next Generation",
    'what-clients-should-know-before-starting-a-construction-project' => 'What Clients Should Know Before Starting a Construction Project',
    'why-project-management-matters-before-construction-begins' => 'Why Project Management Matters Before Construction Begins',
    'importance-of-documentation-in-real-estate-and-construction-projects' => 'The Importance of Documentation in Real Estate and Construction Projects',
    'how-digital-tools-are-changing-the-way-construction-projects-are-managed' => 'How Digital Tools Are Changing the Way Construction Projects Are Managed',
];

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

function require_method(string $method): void
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        header('Allow: ' . $method);
        json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
    }
}

function validate_article_slug(?string $slug): string
{
    $slug = trim((string) $slug);
    if (!array_key_exists($slug, ARTICLE_TITLES)) {
        json_response(['success' => false, 'message' => 'Invalid article.'], 400);
    }

    return $slug;
}

function get_article_title(string $slug): string
{
    return ARTICLE_TITLES[$slug] ?? $slug;
}

function load_database_config(): array
{
    $paths = [
        __DIR__ . '/../../../config/database.php',
        __DIR__ . '/../../../../config/database.php',
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
        'host' => getenv('GPROJECTS_DB_HOST') ?: '',
        'database' => getenv('GPROJECTS_DB_NAME') ?: '',
        'username' => getenv('GPROJECTS_DB_USER') ?: '',
        'password' => getenv('GPROJECTS_DB_PASSWORD') ?: '',
        'port' => getenv('GPROJECTS_DB_PORT') ?: '3306',
    ];
}

function db(): PDO
{
    $config = load_database_config();

    if (!$config['host'] || !$config['database'] || !$config['username']) {
        error_log('Blog comments database configuration is missing.');
        json_response(['success' => false, 'message' => 'Comments are temporarily unavailable.'], 503);
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        $config['host'],
        $config['port'] ?: '3306',
        $config['database']
    );

    try {
        return new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (Throwable $exception) {
        error_log('Blog comments database connection failed: ' . $exception->getMessage());
        json_response(['success' => false, 'message' => 'Comments are temporarily unavailable.'], 503);
    }
}

function get_request_data(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input') ?: '';
        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            json_response(['success' => false, 'message' => 'Invalid JSON payload.'], 400);
        }

        return $decoded;
    }

    return $_POST;
}

function require_same_origin(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host = $_SERVER['HTTP_HOST'] ?? '';

    if ($origin && $host && parse_url($origin, PHP_URL_HOST) !== $host) {
        json_response(['success' => false, 'message' => 'Request origin is not allowed.'], 403);
    }
}

function client_ip_hash(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return hash('sha256', $ip . '|' . (__DIR__));
}
