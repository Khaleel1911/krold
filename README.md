# Krold Mfins

Marketing site for Krold Mfins Private Limited, built with Next.js (App Router), React, Tailwind CSS and GSAP.

## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run Oxlint

## Structure

- `src/app/` — routes and the root layout (navbar, footer, fonts, theme script)
- `src/views/` — the page component each route renders
- `src/components/`, `src/data/`, `src/hooks/` — shared UI, content and hooks

## Blog CMS

The blog (`/blog`) is managed from `/admin`, a password-protected editor for writing, previewing,
publishing, hiding and deleting posts. Posts and all uploaded images, videos and files are stored
in Cloudinary (posts as one JSON file under `krold-blog/db/`, media under `krold-blog/media/`).

Setup: copy `.env.example` to `.env.local` (and to the hosting provider's environment variables)
and fill in the Cloudinary credentials and the admin login. Without Cloudinary, local development
saves posts to `.blog-data/posts.json` and uploads are off.

- `src/lib/blog/` — storage, auth and helpers
- `src/app/api/admin/` — the admin API (login, posts CRUD, upload signing)
- `src/components/admin/` — dashboard and editor
- `src/data/blogPosts.js` — the first two posts, shown until the first save in the CMS
