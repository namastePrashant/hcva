# Hostinger deployment

The standard `npm run build` output is a server application for Cloudflare-compatible hosting. Do not upload the project source or the `dist/server` directory to Hostinger Web Hosting.

## Create the Hostinger package

Run:

```bash
npm run build:hostinger
cd hostinger-dist
zip -r ../hostinger-deploy.zip .
```

The package uses `https://humanitariancva.org` for canonical and social URLs. To build temporarily for the Hostinger preview domain instead, run:

```bash
HCVA_PUBLIC_ORIGIN=https://mediumspringgreen-hippopotamus-622206.hostingersite.com npm run build:hostinger
```

## Upload correctly

1. In Hostinger hPanel, open **Websites → Dashboard → File Manager**.
2. Open the website's `public_html` directory.
3. Remove or move aside the previously uploaded application files.
4. Upload `hostinger-deploy.zip` into `public_html` and extract it there.
5. Confirm that `public_html/index.html`, `public_html/.htaccess`, `public_html/_next`, and the page folders are directly visible. They must not be inside an extra `hostinger-dist` folder.
6. Set folders to permission `755` and files to `644` if Hostinger shows different permissions.
7. Clear the Hostinger CDN cache and reload the site.

The exported package contains static HTML for every public route. Server-only features would require a Hostinger VPS or another Node/Cloudflare-compatible host.

## Deploy from GitHub

The repository includes a generated `hostinger-static` branch. In Hostinger's Git deployment settings use:

- Repository: `https://github.com/namastePrashant/hcva.git`
- Branch: `hostinger-static`
- Install path: leave it empty so Hostinger deploys directly to `/public_html`

For Hostinger's **Deploy Web App** settings use:

- Framework preset: `Vite`
- Branch: `hostinger-static`
- Node version: `22.x`
- Build command: `npm run build`
- Package manager: `npm`
- Output directory: `dist`

The GitHub workflow rebuilds and replaces this deployment branch whenever `main` changes. In Hostinger, enable Auto Deployment for the `hostinger-static` branch if you want new pushes to publish automatically.
