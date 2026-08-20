# Hostinger deploy (same pattern as BIMSavvy)

This app is Next.js + Prisma + MySQL + Auth.js — the same stack that already runs on your Hostinger Node hosting.

## 1. Create the database

In hPanel → **MySQL Databases**:

- Database name, user, and password (Hostinger prefixes them, e.g. `u123_arabpro`)
- Host is usually `localhost`

## 2. Import tables

phpMyAdmin → select the database → **Import** `prisma/hostinger-bootstrap.sql`.

(Alternatively SSH: `npx prisma migrate deploy` after env is set.)

## 3. Node.js environment variables

Set these in Hostinger Node.js app env (same style as BIMSavvy):

```
MYSQL_USER=u123_arabpro
MYSQL_PASSWORD=********
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=u123_arabpro

AUTH_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))">
AUTH_URL=https://your-domain.com

ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD=a-strong-password
ADMIN_NAME=Academy Admin
```

Do **not** put `#`, `@`, or `%` into a single `DATABASE_URL` string — use the `MYSQL_*` parts instead (the app builds the URL and encodes the password).

## 4. Build & start (Hostinger)

- **Node version:** 20.x (set in hPanel; `package.json` engines matches this)
- **Build command:** `npm run build`  (runs `prisma generate && next build`)
- **Start command:** `npm run start`  (`next start`)

## 5. Create the first admin + website content

On the server after the first successful start:

```
npm run db:seed
```

This upserts SUPER_ADMIN from `ADMIN_EMAIL` / `ADMIN_PASSWORD` and copies pricing, FAQ, testimonials, and online levels into MySQL.

Then open `https://your-domain.com/admin/login`.

If seed via CLI is awkward, log in after a manual admin insert, then use **Admin → Overview → Seed website content**.

## 6. After each redeploy

Hostinger CDN can serve stale HTML that points at old `/_next` chunks. This project already sends `no-store` on HTML (same as BIMSavvy). If the site looks broken after upload, purge cache / hard-refresh.

## Local development

Copy `.env.example` to `.env.local`, fill MySQL (local or remote Hostinger), then:

```
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

The public site still renders from hardcoded fallbacks if MySQL is not configured. Admin login requires MySQL.
