## Production Blog System with Admin Panel

A production-ready blog CMS built with Next.js App Router, Prisma, PostgreSQL, cookie-based admin auth, and ImgBB image uploads.

## Features

- Public blog list: `/blogs`
- Public blog details: `/blog/[slug]`
- Admin login: `/admin/login`
- Admin dashboard: `/admin/dashboard`
- Admin blog management: `/admin/blogs`
- Create and edit posts:
  - `/admin/blogs/create`
  - `/admin/blogs/edit/[id]`
- Rich text editing with TipTap
- SEO metadata fields and JSON-LD schema support per post
- Slug auto-generation with manual override
- Input validation + HTML sanitization
- Protected admin API routes with session + CSRF validation

## Tech Stack

- Next.js App Router
- PostgreSQL (Supabase session pooler compatible)
- Prisma ORM
- Route Handlers (REST APIs)
- CSS Modules (no Tailwind in implemented blog/admin flows)
- ImgBB upload API

## Prisma Blog Model

`prisma/schema.prisma`

- `id` (UUID primary key)
- `title`
- `slug` (unique)
- `metaTitle`
- `metaDescription`
- `tags` (`String[]`)
- `keywords` (`String[]`)
- `schemas` (`Json[]`)
- `coverImage`
- `ogImage`
- `content`
- `createdAt`
- `updatedAt`

## Environment Variables

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXT_PUBLIC_SITE_URL="https://www.digitaladdaagency.com"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="use-a-long-unique-password"
JWT_SECRET="use-a-long-random-secret"
ADMIN_SESSION_SECRET="replace-with-long-random-secret"
IMGBB_API_KEY="your-imgbb-api-key"
WEB3FORMS_ACCESS_KEY="your-web3forms-access-key"
```

## API Endpoints

Public:

- `GET /api/blogs`
- `GET /api/blog/[slug]`

Admin:

- `POST /api/admin/login`
- `GET /api/admin/blogs`
- `POST /api/admin/blog`
- `PUT /api/admin/blog/[id]`
- `DELETE /api/admin/blog/[id]`

Uploads:

- `POST /api/upload`

## Setup

```bash
npm install
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public" npm run prepare
npm run db:push
npm run seed
npm run dev
```

## Build

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public" npm run build
```

## Notes

- Admin pages and Prisma-backed pages are configured as dynamic routes to avoid build-time database prerender errors.
- Legacy routes (`/admin/blog*`, `/blog`) are preserved as redirects for compatibility.
