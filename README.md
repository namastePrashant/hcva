# Humanitarian CVA (HCVA)

Aria Technologies' global platform for Cash and Voucher Assistance digital
services, consulting, the Lali360 product, learning and sector knowledge.

Built with [vinext](https://github.com/cloudflare/vinext) (Next.js App Router on
Vite) and deployed as a **Cloudflare Worker**.

## Prerequisites

- Node.js `>=22.13.0`

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produce the deployable Worker in dist/
npm test           # build + rendered-HTML / SEO smoke tests
npm run lint
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — services, Lali360, learning library, insights, events, opportunities, Omni |
| `/services`, `/lali360`, `/learning`, `/events`, `/opportunities`, `/about` | Content pages |
| `/insights`, `/insights/[slug]` | HCVA Insights index + articles |
| `/5w1h` | 5W1H coordination tool showcase |
| `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` | Generated metadata routes |

## SEO

- Per-route metadata is built through `app/seo.ts` (`pageMetadata`): canonical
  URL, Open Graph and Twitter cards from one source.
- `metadataBase` follows the request host in production and falls back to
  `SITE_ORIGIN` (`https://humanitariancva.org`).
- Structured data (`components/JsonLd.tsx`): site-wide `Organization` +
  `WebSite`, `BreadcrumbList` on every internal page, `Article` on insights.
- `app/robots.ts` and `app/sitemap.ts` derive from `SITE_ORIGIN` and the
  `data/insights.ts` list.
- The Worker redirects `www.*` and the `.com` domain to the canonical
  `.org` origin and sets baseline security headers.
- Known follow-up: `public/og-hcva.png` is ~2 MB / 1731×909 — regenerate a
  ~1200×630, <300 KB card for faster social unfurls.

## Deployment

- **Cloudflare Workers (primary):** see [`CLOUDFLARE-DEPLOYMENT.md`](./CLOUDFLARE-DEPLOYMENT.md).
  `npm run deploy`, or push to `main` (GitHub Actions).
- **Hostinger static export (secondary):** see [`HOSTINGER-DEPLOYMENT.md`](./HOSTINGER-DEPLOYMENT.md).

## Project shape

- `app/` — routes, `layout.tsx`, `seo.ts`, metadata routes
- `components/` — `HomePage`, `ContentPage`, header/footer, `FiveWTool`, `JsonLd`
- `data/insights.ts` — insights content
- `worker/index.ts` — Cloudflare Worker entry (redirects, security headers, image optimization)
- `vite.config.ts` — Worker name, compatibility flags, custom-domain routes
- `.openai/hosting.json` — optional D1/R2 bindings (currently none)
- `db/` + `drizzle.config.ts` — optional Drizzle/D1 surface (schema intentionally empty)

## Workspace auth headers

Signed-in visitors receive `oai-authenticated-user-id` and
`oai-authenticated-user-email` (plus optional
`oai-authenticated-user-full-name`). Helpers for optional/required ChatGPT
sign-in live in `app/chatgpt-auth.ts`. Public content stays anonymous.

## Useful commands

- `npm run dev` — local development
- `npm run build` — build the Worker
- `npm run preview` — build, then run the Worker on Miniflare via `wrangler dev`
- `npm run deploy` — build, then `wrangler deploy`
- `npm run deploy:dry-run` — build + validate, upload nothing
- `npm test` — build + smoke tests (`tests/rendered-html.test.mjs`)
- `npm run db:generate` — regenerate Drizzle migrations after schema changes
