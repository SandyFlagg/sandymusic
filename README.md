# sandymusic.com

Personal site for Sandy — producer and DJ from Sydney. Next.js 16 (App Router),
Postgres via Prisma, Clerk for admin auth, Tailwind v4.

## Deploying

The site is hosted on **Vercel**, connected to this GitHub repo.

```
git push origin main   # live on www.sandymusic.com in ~2 minutes
```

There is no manual deploy step and no approval gate. Do not use the `vercel` CLI
locally — `.vercel/project.json` points at a deleted project ID and will target
the wrong place. Push to `main` instead.

## Editing content

Content lives in the database, not in the repo. Sign in and go to `/admin`:

| Page | What it manages |
| --- | --- |
| `/admin/blog` | Blog posts — create, edit, publish, delete |
| `/admin/shows` | Tour dates shown on the homepage |
| `/admin/authors` | Author profiles attached to posts |
| `/admin/media` | Uploaded images |

Changes appear on the live site immediately. Pages that read from the database
are cached (`export const revalidate = 60`) and the write routes call
`revalidateContent()` from `lib/revalidate.ts` to flush that cache on save. If
you add a new page that queries Prisma, it needs a `revalidate` export too —
without one Next prerenders it once at build time and it never updates again.

Unpublished posts are visible at their real URL to the signed-in admin only, so
you can preview a draft before publishing.

## Local development

```
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Requires `.env` with `DATABASE_URL`, `DIRECT_URL`, and the Clerk keys. Set
`ADMIN_USER_ID` to your Clerk user ID — without it, any signed-in user can reach
`/admin`.

The database is Supabase Postgres and auto-pauses when idle, so the first
request after a quiet period can take a while to wake up.

## Known gaps

- **Image uploads don't work in production.** `app/api/upload/route.ts` writes to
  `public/uploads` on the local filesystem. Vercel's filesystem is read-only and
  ephemeral, so uploads from the live admin fail or vanish on the next deploy.
  Fix is to switch to `@vercel/blob`, which needs a Blob store and a
  `BLOB_READ_WRITE_TOKEN`. Until then, commit cover images to `public/images/`.
- `app/admin/design-system/` and `lib/shop-data.ts` are leftovers from an
  abandoned shop. Nothing public links to them.
