# Hostinger deploy — arabproacademy.com

Same stack as BIMSavvy (Next.js + Prisma + MySQL + Auth.js).
GitHub: https://github.com/mohshamim/arabproacademy (branch `main`)

Hostinger account prefix: `u506363420_`

## A) Create MySQL database

hPanel → **arabproacademy.com** → **Databases** → **Management**

Fill **Create a New MySQL Database And Database User**:

| Field | Type this (prefix is automatic) | Full name Hostinger will use |
| --- | --- | --- |
| Database name | `arabpro` | `u506363420_arabpro` |
| MySQL username | `arabpro` | `u506363420_arabpro` |
| Password | generate a strong one | save it in a notes file |

Password rules (learned from BIMSavvy):

- Use letters + numbers only
- Avoid `#` `@` `%` `&` in the password (they break connection URLs)

Click **Create**. Leave this tab open until you have copied:

- Database: `u506363420_arabpro`
- User: `u506363420_arabpro`
- Password: (the one you just set)
- Host: `localhost`

## B) Import tables (phpMyAdmin)

1. Sidebar → **Databases** → **phpMyAdmin**
2. Left column: click `u506363420_arabpro`
3. Top tab **Import**
4. Choose file from this project:

   `D:\Shamim\arabproacademy\prisma\hostinger-bootstrap.sql`

5. Click **Import** / **Go**
6. Refresh the left list. You should see tables including `AdminUser`, `Lead`, `FaqItem`, `PricingPackage`, `SiteSetting`.

If Import errors on foreign keys, ignore the commented `ALTER TABLE` line — tables still work.

## C) Node.js website (same as BIMSavvy)

hPanel → **arabproacademy.com** → **Websites** → **Node.js** (or **Deploy** / Git)

| Setting | Value |
| --- | --- |
| Repository | `mohshamim/arabproacademy` |
| Branch | `main` |
| Root directory | empty / `.` (package.json is at repo root) |
| Framework | Next.js |
| Node.js | **20.x** |
| Install command | `npm install` |
| Build command | `npm run build` |
| Start command | `npm run start` |
| Output directory | **LEAVE EMPTY** — do not set `.next` |

## D) Environment variables

hPanel → Node.js app → **Environment variables**.

Add these (no quotes). **Do not create `DATABASE_URL`.**

```
MYSQL_USER=u506363420_arabpro
MYSQL_PASSWORD=paste-the-password-you-created
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=u506363420_arabpro

AUTH_SECRET=paste-generated-secret
AUTH_URL=https://arabproacademy.com

ADMIN_EMAIL=admin@arabproacademy.com
ADMIN_PASSWORD=choose-a-strong-admin-password
ADMIN_NAME=Academy Admin
```

Save → **Apply** / **Restart**.

If login later says database auth failed, also try:

```
MYSQL_HOST=127.0.0.1
```

and/or hPanel → Databases → **Remote MySQL** → Any Host, then set `MYSQL_HOST` to the hostname shown there (often `auth-db….hstgr.io`).

## E) Deploy

Click **Deploy** / **Rebuild**. Wait until status is **Running** (not Building).

Open in a **new Incognito** window:

- https://arabproacademy.com
- https://arabproacademy.com/admin/login

If the page has no CSS after a redeploy: purge CDN/cache in hPanel, confirm Output directory is empty, then Incognito again.

## F) Create the first admin (seed)

The SQL file creates **tables only**, not the login user. You need seed once.

**Option 1 — Hostinger SSH** (same account as BIMSavvy):

```
ssh -p 65002 u506363420@217.21.90.15
```

Find the arabproacademy app folder (look for `package.json` + `prisma/`), then:

```
npm run db:seed
```

This creates SUPER_ADMIN from `ADMIN_EMAIL` / `ADMIN_PASSWORD` and copies pricing, FAQ, testimonials.

**Option 2 — if SSH is painful:** after the app is running with env vars, you can run seed from Hostinger **Node.js → terminal / SSH**, or ask me to add a one-time bootstrap login. Do not skip seed — `/admin/login` will fail until an `AdminUser` row exists.

## G) Login

https://arabproacademy.com/admin/login

Email: the `ADMIN_EMAIL` you set  
Password: the `ADMIN_PASSWORD` you set

Then: **Overview → Seed website content** if FAQ/pricing are empty.

## H) Courses / batches / students (after first go-live)

Import in phpMyAdmin (does not wipe existing tables):

`D:\Shamim\arabproacademy\prisma\hostinger-courses-upgrade.sql`

Redeploy the latest GitHub commit, then in admin click **Seed content now**. That loads the 12-week in-person syllabus and both 8-week online syllabi.

## I) Attendance, quizzes, oral exams, certificates

Import in phpMyAdmin (does not wipe existing tables):

`D:\Shamim\arabproacademy\prisma\hostinger-lms-upgrade.sql`

Redeploy, then **Seed content now** to load the public placement quiz (`/placement`). Certificates verify at `/verify/APA-XXXXXX`.

Change the admin password after first login (create a second Super Admin, then stop using the env default).
