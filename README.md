# Arab Pro Academy

Next.js marketing site + admin panel for spoken Arabic courses in Riyadh.

## Stack (Hostinger-ready)

Same pattern as the BIMSavvy site already running on Hostinger:

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Prisma + **MySQL**
- Auth.js (NextAuth v5) credentials login
- Node 20.x

See [HOSTINGER.md](./HOSTINGER.md) for deploy steps.

## Getting started

```bash
npm install
copy .env.example .env.local
```

Fill `MYSQL_*`, `AUTH_SECRET`, and `ADMIN_*` in `.env.local`, then:

```bash
npx prisma migrate deploy
npm run db:seed
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

The homepage still works without MySQL (static fallbacks). Admin and lead storage need MySQL.

## Scripts

- `npm run dev` — development server
- `npm run build` — `prisma generate && next build`
- `npm run start` — production server
- `npm run db:seed` — create SUPER_ADMIN and seed pricing / FAQ / testimonials
