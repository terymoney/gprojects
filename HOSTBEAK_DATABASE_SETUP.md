# Hostbeak Blog Comments Setup

This project includes a same-domain PHP + MySQL comment system for approved public blog comments. New comments are saved as `pending` and can be moderated through the protected `/admin/comments` CMS route.

## 1. Create the MySQL Database

1. Sign in to the Hostbeak hosting account or cPanel.
2. Open the database section.
3. Create a MySQL database for GProjects comments.
4. Create a dedicated MySQL database user.
5. Assign the user to the database.
6. Grant the user the privileges required for comment reads, inserts and moderation: `SELECT`, `INSERT`, `UPDATE` and `DELETE`.

## 2. Import the Migration

1. Open phpMyAdmin from Hostbeak or cPanel.
2. Select the database created for the website.
3. Open the import tab.
4. Import `database/migrations/create_blog_comments.sql`.
5. Confirm that the `blog_comments` table exists.

## 3. Configure Database Credentials

Do not commit real credentials to GitHub.

Preferred option:

1. Set environment variables in hosting if Hostbeak supports them:
   - `GPROJECTS_DB_HOST`
   - `GPROJECTS_DB_NAME`
   - `GPROJECTS_DB_USER`
   - `GPROJECTS_DB_PASSWORD`
   - `GPROJECTS_DB_PORT`

Alternative option:

1. Copy `config/database.example.php` to a private file named `database.php`.
2. Fill in the real Hostbeak database values.
3. Place `database.php` outside the public web root if possible.
4. If it must be placed inside the hosting filesystem, protect it from direct browser access.

The PHP API checks for private config files before falling back to environment variables.

## 4. Upload the PHP API

After running the production build, ensure these files are uploaded to the public site:

- `api/comments/bootstrap.php`
- `api/comments/notify.php`
- `api/comments/submit.php`
- `api/comments/list.php`
- `api/admin/bootstrap.php`
- `api/admin/auth/session.php`
- `api/admin/auth/login.php`
- `api/admin/auth/logout.php`
- `api/admin/comments/list.php`
- `api/admin/comments/update-status.php`
- `api/admin/comments/delete.php`

They must remain server-side PHP files and must not be converted into frontend JavaScript.

## 5. Test the Endpoints

Approved comments list:

```text
GET /api/comments/list.php?articleSlug=building-a-better-future-together
```

Expected response before moderation:

```json
{
  "success": true,
  "comments": [],
  "count": 0
}
```

Comment submission:

```text
POST /api/comments/submit.php
```

Send JSON:

```json
{
  "articleSlug": "building-a-better-future-together",
  "name": "Example Name",
  "email": "reader@example.com",
  "website": "",
  "message": "This is a test comment.",
  "company": ""
}
```

Expected success response:

```json
{
  "success": true,
  "message": "Thank you. Your comment has been submitted for review."
}
```

## 6. Confirm Pending Comments Stay Hidden

1. Submit a valid test comment.
2. Open phpMyAdmin and confirm the row exists in `blog_comments`.
3. Confirm `status` is `pending`.
4. Refresh the public blog article.
5. Confirm the pending comment does not appear publicly.
6. Manually change the test comment status to `approved`.
7. Refresh the public blog article.
8. Confirm the approved comment appears and the comment count updates.

## 7. Configure Admin Login

Do not commit real admin credentials to GitHub.

Preferred option:

1. Set environment variables if Hostbeak supports them:
   - `GPROJECTS_ADMIN_USER`
   - `GPROJECTS_ADMIN_PASSWORD_HASH`

Alternative option:

1. Copy `config/admin.example.php` to a private file named `admin.php`.
2. Generate a real PHP password hash on Hostbeak using `password_hash`.
3. Place the file at `config/admin.php` outside the public web root, beside `database.php`.

The admin page is:

```text
/admin/comments
```

The route is not linked in public navigation. The PHP admin endpoints still enforce the real server-side session before exposing or changing comments.

## 8. Configure SMTP Notifications

Do not commit SMTP credentials to GitHub.

Preferred option:

1. Set environment variables if Hostbeak supports them:
   - `GPROJECTS_SMTP_HOST`
   - `GPROJECTS_SMTP_PORT`
   - `GPROJECTS_SMTP_ENCRYPTION`
   - `GPROJECTS_SMTP_USER`
   - `GPROJECTS_SMTP_PASSWORD`
   - `GPROJECTS_SMTP_FROM_EMAIL`
   - `GPROJECTS_SMTP_FROM_NAME`
   - `GPROJECTS_COMMENT_ADMIN_EMAIL`
   - `GPROJECTS_ADMIN_COMMENTS_URL`

Alternative option:

1. Copy `config/mail.example.php` to a private file named `mail.php`.
2. Fill in the real Hostbeak SMTP mailbox values.
3. Place the file at `config/mail.php` outside the public web root, beside `database.php`.

If SMTP is not configured, comments are still saved as `pending`, but notification email will be skipped and logged server-side.

## 9. Moderation Flow

1. Visitor submits a blog comment.
2. The comment is saved with `status = pending`.
3. The administrator receives a notification email if SMTP is configured.
4. The administrator logs in at `/admin/comments`.
5. The administrator can approve, reject or delete the comment.
6. Only comments with `status = approved` appear publicly.
