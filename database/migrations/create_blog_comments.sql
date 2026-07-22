CREATE TABLE blog_comments (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    article_slug VARCHAR(255) NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255) DEFAULT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    ip_hash VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_blog_comments_article_slug (article_slug),
    INDEX idx_blog_comments_status (status),
    INDEX idx_blog_comments_article_status (article_slug, status)
);
