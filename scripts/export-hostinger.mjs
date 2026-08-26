import { spawn } from "node:child_process";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "hostinger-dist");
const port = 4173;
const origin = `http://127.0.0.1:${port}`;
const publicOrigin = (process.env.HCVA_PUBLIC_ORIGIN || "https://humanitariancva.org").replace(/\/$/, "");

const routes = [
  "/", "/services", "/lali360", "/learning", "/insights", "/events", "/opportunities", "/about",
  "/insights/nepal-digital-payments-humanitarian-cash",
  "/insights/cash-readiness-beyond-a-checklist",
  "/insights/responsible-data-cva-digital-systems",
  "/insights/anticipatory-action-cash-design-questions",
];

const forceDocumentNavigation = `<script data-hostinger-static-navigation>
document.addEventListener("click",function(event){
  var anchor=event.target.closest&&event.target.closest("a");
  if(!anchor||anchor.target||anchor.hasAttribute("download"))return;
  var url=new URL(anchor.href,location.href);
  if(url.origin===location.origin&&url.pathname!==location.pathname){
    event.preventDefault();event.stopImmediatePropagation();location.assign(url.href);
  }
},true);
</script>`;

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error("The production preview did not start in time.");
}

async function renderRoute(route) {
  const response = await fetch(`${origin}${route}`);
  if (!response.ok) throw new Error(`Could not render ${route}: HTTP ${response.status}`);
  let html = await response.text();
  for (const localOrigin of [origin, `https://127.0.0.1:${port}`, `http://localhost:${port}`, `https://localhost:${port}`]) {
    html = html.replaceAll(localOrigin, publicOrigin);
  }
  const streamedMetadata = html.match(/<div hidden=""><title>[\s\S]*?<\/div>/)?.[0];
  if (streamedMetadata) {
    const metadataTags = streamedMetadata.replace(/^<div hidden="">/, "").replace(/<\/div>$/, "");
    html = html.replace("</head>", `${metadataTags}</head>`);
  }
  html = html.replace("</body>", `${forceDocumentNavigation}</body>`);
  const directory = route === "/" ? output : path.join(output, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, "dist", "client"), output, { recursive: true });

const vinextExecutable = path.join(root, "node_modules", ".bin", process.platform === "win32" ? "vinext.cmd" : "vinext");
const server = spawn(vinextExecutable, ["start", "--port", String(port)], {
  cwd: root,
  env: process.env,
  stdio: ["ignore", "pipe", "pipe"],
});

let serverLog = "";
server.stdout.on("data", chunk => { serverLog += chunk.toString(); });
server.stderr.on("data", chunk => { serverLog += chunk.toString(); });

try {
  await waitForServer();
  for (const route of routes) await renderRoute(route);

  const sitemap = await fetch(`${origin}/sitemap.xml`);
  if (sitemap.ok) await writeFile(path.join(output, "sitemap.xml"), await sitemap.text());
  const robots = await fetch(`${origin}/robots.txt`);
  if (robots.ok) await writeFile(path.join(output, "robots.txt"), await robots.text());

  await writeFile(path.join(output, ".htaccess"), `DirectoryIndex index.html
Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType text/css .css
</IfModule>
`);

  await writeFile(path.join(output, "package.json"), JSON.stringify({
    name: "hcva-hostinger-static",
    version: "1.0.0",
    private: true,
    engines: { node: ">=22" },
    scripts: { build: "node build-static.mjs" },
    devDependencies: { vite: "^6.0.0" },
  }, null, 2) + "\n");

  await writeFile(path.join(output, "build-static.mjs"), `import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const destination = path.join(root, "dist");
const excluded = new Set([".git", "dist", "package.json", "package-lock.json", "build-static.mjs"]);

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const entry of await readdir(root)) {
  if (excluded.has(entry)) continue;
  await cp(path.join(root, entry), path.join(destination, entry), { recursive: true });
}
console.log("Hostinger static output created in dist");
`);
  console.log(`Hostinger files created in ${output}`);
} catch (error) {
  console.error(serverLog);
  throw error;
} finally {
  server.kill("SIGTERM");
}
