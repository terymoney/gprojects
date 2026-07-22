<?php

return [
    'host' => getenv('GPROJECTS_DB_HOST') ?: 'localhost',
    'database' => getenv('GPROJECTS_DB_NAME') ?: 'your_database_name',
    'username' => getenv('GPROJECTS_DB_USER') ?: 'your_database_user',
    'password' => getenv('GPROJECTS_DB_PASSWORD') ?: 'your_database_password',
    'port' => getenv('GPROJECTS_DB_PORT') ?: '3306',
];
