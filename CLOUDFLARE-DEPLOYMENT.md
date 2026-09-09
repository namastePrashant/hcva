# Cloudflare Workers deployment

`npm run build` produces a Cloudflare Worker (a server application, **not** a
static site). Vinext + `@cloudflare/vite-plugin` write the deployable Worker to
`dist/server/` and a redirect at `.wrangler/deploy/config.json` that points
Wrangler at `dist/server/wrangler.json`. There is no hand-maintained
`wrangler.jsonc`; the Worker name and compatibility flags are declared in
`vite.config.ts` (`localBindingConfig`).

## Primary CI: Cloudflare Workers Builds

The repo is connected to **Cloudflare Workers Builds**, which deploys the
Worker named **`hcva`** on every push to `main`:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Config: auto-detected via `.wrangler/deploy/config.json` -> `dist/server/wrangler.json`

The Worker name in `vite.config.ts` (`name: "hcva"`) must match the Workers
Builds project name or the build logs a name-mismatch warning.

## What gets deployed

| Setting | Value | Source |
| --- | --- | --- |
| Worker name | `hcva` | `vite.config.ts` |
| Compatibility date | `2026-05-15` | `vite.config.ts` |
| Compatibility flags | `nodejs_compat` | `vite.config.ts` |
| Static assets | `dist/client/` | Worker Assets binding |
| Observability | enabled | `vite.config.ts` |
| Custom domains | **attached in dashboard** (see below) | — |

The Worker (`worker/index.ts`) issues a `308` redirect from `www.*` and both
`.com` hosts to `https://humanitariancva.org`, and adds baseline security
headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Strict-Transport-Security`, `Permissions-Policy`) to every response. The
redirect only takes effect once those hostnames are routed to the Worker.

## Custom domains

Declaring custom domains in `vite.config.ts` (`routes` with
`custom_domain: true`) fails during deploy with:

```
✘ A request to the Cloudflare API (/workers/scripts/hcva/domains/records) failed.
  Hostname 'humanitariancva.org' already has externally managed DNS records
  (A, CNAME, etc). Delete them first or try a different hostname. [code: 100117]
```

...because the apex/`www` records still point at the previous host. To move the
domains onto the Worker:

1. In Cloudflare **DNS** for `humanitariancva.org` (and `humanitariancva.com`),
   delete the existing `A`/`AAAA`/`CNAME` records for the apex and `www`.
2. In **Workers & Pages -> hcva -> Settings -> Domains & Routes -> Add ->
   Custom Domain**, add:
   - `humanitariancva.org`
   - `www.humanitariancva.org`
   - `humanitariancva.com`
   - `www.humanitariancva.com`
   Cloudflare recreates the proxied DNS records and issues certificates
   (a few minutes).
3. Optionally re-enable the commented `routes` block in `vite.config.ts` so the
   binding is reproduced from config on future deploys.

Until then the Worker is reachable at `hcva.<subdomain>.workers.dev`.

## Manual / local deploy

```bash
npm install
npx wrangler login        # once
npm run deploy            # builds, then `wrangler deploy`
npm run deploy:dry-run    # build + validate, upload nothing
npm run preview           # build, then run the Worker on Miniflare
```

## Manual GitHub Actions fallback

`.github/workflows/deploy-cloudflare.yml` runs **only** via
**Actions -> Deploy to Cloudflare Workers -> Run workflow** (not on push, to
avoid racing Workers Builds). Requires repo secrets:

- `CLOUDFLARE_API_TOKEN` (scopes: *Workers Scripts: Edit*, *Workers Routes:
  Edit*, *Account: Read*)
- `CLOUDFLARE_ACCOUNT_ID`

## Environment variables

| Name | Purpose | Default |
| --- | --- | --- |
| `SITE_ORIGIN` | Canonical origin for `<link rel="canonical">`, Open Graph URLs, `robots.txt`, `sitemap.xml` | `https://humanitariancva.org` |

## Rollback

```bash
npx wrangler deployments list
npx wrangler rollback [<deployment-id>]
```

## Not this

The Hostinger static-export path (`npm run build:hostinger`,
`HOSTINGER-DEPLOYMENT.md`, `.github/workflows/deploy-hostinger.yml`) is
unrelated and still present. It produces flat HTML for a PHP host and does not
run the Worker.
