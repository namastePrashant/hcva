# Cloudflare Workers deployment

`npm run build` produces a Cloudflare Worker (a server application, **not** a
static site). Vinext + `@cloudflare/vite-plugin` write the deployable Worker to
`dist/server/` and a redirect at `.wrangler/deploy/config.json` that points
Wrangler at `dist/server/wrangler.json`. There is no hand-maintained
`wrangler.jsonc`; the Worker name, compatibility flags and custom-domain routes
are declared in `vite.config.ts` (`localBindingConfig`).

## What gets deployed

| Setting | Value | Source |
| --- | --- | --- |
| Worker name | `humanitarian-cva` | `vite.config.ts` |
| Compatibility date | `2026-05-15` | `vite.config.ts` |
| Compatibility flags | `nodejs_compat` | `vite.config.ts` |
| Custom domains | `humanitariancva.org`, `www.humanitariancva.org`, `humanitariancva.com`, `www.humanitariancva.com` | `vite.config.ts` |
| Static assets | `dist/client/` | Worker Assets binding |
| Observability | enabled | `vite.config.ts` |

The Worker (`worker/index.ts`) issues a `308` redirect from `www.*` and both
`.com` hosts to `https://humanitariancva.org`, and adds baseline security
headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Strict-Transport-Security`, `Permissions-Policy`) to every response.

## Prerequisites

1. A Cloudflare account.
2. The zones `humanitariancva.org` **and** `humanitariancva.com` active in that
   account (custom-domain routes fail to attach otherwise). If a zone is not on
   Cloudflare yet, remove its entries from the `routes` array in
   `vite.config.ts` until it is, then redeploy.
3. Wrangler authentication — either `npx wrangler login` locally, or a
   `CLOUDFLARE_API_TOKEN` (scopes: *Workers Scripts: Edit*, *Workers Routes:
   Edit*, *Account Settings: Read*, and *Zone: Read* / *DNS: Edit* for the two
   zones) plus `CLOUDFLARE_ACCOUNT_ID`.

## Manual deploy

```bash
npm install
npm run deploy          # builds, then `wrangler deploy`
```

Dry run (build + validate, upload nothing):

```bash
npm run deploy:dry-run
```

Local preview of the built Worker on Miniflare:

```bash
npm run preview         # builds, then `wrangler dev`
```

First deploy also provisions the custom domains. DNS for each apex/host is
created and proxied by Cloudflare automatically; propagation and certificate
issuance can take a few minutes.

## CI deploy (GitHub Actions)

`.github/workflows/deploy-cloudflare.yml` builds and deploys on every push to
`main` (and via **Run workflow**). Add two repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

`SITE_ORIGIN` is set to `https://humanitariancva.org` for the build so
canonical/OG URLs and the sitemap are absolute even if the build host differs.

## Environment variables

| Name | Purpose | Default |
| --- | --- | --- |
| `SITE_ORIGIN` | Canonical origin used for `<link rel="canonical">`, Open Graph URLs, `robots.txt` and `sitemap.xml` | `https://humanitariancva.org` |

Set it as a build-time env var (CI) or a Worker var if you fork the site to a
different domain.

## Rollback

```bash
npx wrangler deployments list
npx wrangler rollback [<deployment-id>]
```

## Not this

The Hostinger static-export path (`npm run build:hostinger`,
`HOSTINGER-DEPLOYMENT.md`, `.github/workflows/deploy-hostinger.yml`) is
unrelated and still present. It produces flat HTML for a PHP host and does not
run the Worker. Use Cloudflare for the full server-rendered site.
