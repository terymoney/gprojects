<?php

return [
    'username' => getenv('GPROJECTS_ADMIN_USER') ?: 'admin',
    'password_hash' => getenv('GPROJECTS_ADMIN_PASSWORD_HASH') ?: '$2y$12$replace_with_a_real_password_hash_generated_on_hostbeak',
];
