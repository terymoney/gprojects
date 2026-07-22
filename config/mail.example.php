<?php

return [
    'host' => getenv('GPROJECTS_SMTP_HOST') ?: 'mail.gprojects.ng',
    'port' => getenv('GPROJECTS_SMTP_PORT') ?: '587',
    'encryption' => getenv('GPROJECTS_SMTP_ENCRYPTION') ?: 'tls',
    'username' => getenv('GPROJECTS_SMTP_USER') ?: 'notifications@gprojects.ng',
    'password' => getenv('GPROJECTS_SMTP_PASSWORD') ?: '',
    'from_email' => getenv('GPROJECTS_SMTP_FROM_EMAIL') ?: 'notifications@gprojects.ng',
    'from_name' => getenv('GPROJECTS_SMTP_FROM_NAME') ?: 'GProjects Website',
    'admin_email' => getenv('GPROJECTS_COMMENT_ADMIN_EMAIL') ?: 'admin@gprojects.ng',
    'admin_comments_url' => getenv('GPROJECTS_ADMIN_COMMENTS_URL') ?: 'https://www.gprojects.ng/admin/comments',
];
