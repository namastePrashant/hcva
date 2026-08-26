import { spawn } from "node:child_process";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "hostinger-dist");
const port = 4173;
const origin = `http://127.0.0.1:${port}`;
const publicOrigin = (process.env.HCVA_PUBLIC_ORIGIN || "https://humanitariancva.org").replace(/\/$/, "");

const routes = [
  "/", "/services", "/lali360", "/learning", "/insights", "/events", "/opportunities", "/5w1h", "/about",
  "/insights/nepal-digital-payments-humanitarian-cash",
  "/insights/cash-readiness-beyond-a-checklist",
  "/insights/responsible-data-cva-digital-systems",
  "/insights/anticipatory-action-cash-design-questions",
];

const staticEnhancements = `<script data-hostinger-static>
document.addEventListener("click",function(event){
  var anchor=event.target.closest&&event.target.closest("a");
  if(!anchor||anchor.target||anchor.hasAttribute("download"))return;
  var url=new URL(anchor.href,location.href);
  if(url.origin===location.origin&&url.pathname!==location.pathname){
    event.preventDefault();event.stopImmediatePropagation();location.assign(url.href);
  }
},true);

document.addEventListener("DOMContentLoaded",function(){
  var mega=document.querySelector(".mega-menu");
  var megaButton=document.querySelector(".mega-trigger");
  var header=document.querySelector(".site-header");
  if(mega&&megaButton){
    function setMega(open){mega.classList.toggle("open",open);megaButton.setAttribute("aria-expanded",String(open));}
    megaButton.addEventListener("click",function(){setMega(!mega.classList.contains("open"));});
    megaButton.addEventListener("mouseenter",function(){setMega(true);});
    megaButton.addEventListener("focus",function(){setMega(true);});
    header&&header.addEventListener("mouseleave",function(){setMega(false);});
  }

  var mobileButton=document.querySelector(".mobile-toggle");
  var mobileMenu=document.querySelector(".mobile-menu");
  if(mobileButton&&mobileMenu){
    function setMobile(open){mobileMenu.classList.toggle("open",open);mobileButton.textContent=open?"Close":"Menu";mobileButton.setAttribute("aria-expanded",String(open));document.body.classList.toggle("menu-open",open);}
    mobileButton.addEventListener("click",function(){setMobile(!mobileMenu.classList.contains("open"));});
    mobileMenu.querySelectorAll("a").forEach(function(link){link.addEventListener("click",function(){setMobile(false);});});
    document.addEventListener("keydown",function(event){if(event.key==="Escape")setMobile(false);});
  }

  var grid=document.querySelector(".resource-grid");
  var cards=grid?Array.from(grid.querySelectorAll(".resource-card")):[];
  var search=document.querySelector(".search-box input");
  var filters=Array.from(document.querySelectorAll(".topic-filter button"));
  var loadMore=document.querySelector(".load-more");
  var selectedTopic="All";
  function filterResources(){
    var query=search?search.value.trim().toLowerCase():"";
    cards.forEach(function(card){var matchesTopic=selectedTopic==="All"||card.dataset.topic===selectedTopic;var matchesSearch=!query||(card.dataset.search||"").includes(query);card.hidden=!(matchesTopic&&matchesSearch);});
    grid&&grid.classList.toggle("show-all",Boolean(query)||selectedTopic!=="All"||(loadMore&&loadMore.dataset.expanded==="true"));
  }
  search&&search.addEventListener("input",filterResources);
  filters.forEach(function(button){button.addEventListener("click",function(){selectedTopic=button.textContent.trim();filters.forEach(function(item){item.classList.toggle("active",item===button);});filterResources();});});
  loadMore&&loadMore.addEventListener("click",function(){var expanded=loadMore.dataset.expanded!=="true";loadMore.dataset.expanded=String(expanded);loadMore.innerHTML=expanded?'Show fewer resources <span>↑</span>':'View all resources <span>↓</span>';filterResources();});

  var omniPanel=document.querySelector(".omni-panel");
  function openOmni(){omniPanel&&omniPanel.classList.add("open");}
  document.querySelectorAll(".ask-button,.omni-cta,.omni-fab").forEach(function(button){button.addEventListener("click",openOmni);});
  var closeOmni=document.querySelector(".omni-panel-head button");
  closeOmni&&closeOmni.addEventListener("click",function(){omniPanel&&omniPanel.classList.remove("open");});

  var fivew=document.querySelector(".fivew-app");
  if(fivew){
    var fivewRows=Array.from(fivew.querySelectorAll("tbody tr"));
    var fivewFilters=Array.from(fivew.querySelectorAll("[data-fivew-filter]"));
    var fivewSearch=fivew.querySelector("[data-fivew-search]");
    function filterFivew(){
      var visible=[];
      fivewRows.forEach(function(row){
        var match=fivewFilters.every(function(field){var value=field.value;return value==="All"||row.dataset[field.dataset.fivewFilter]===value;});
        var query=fivewSearch?fivewSearch.value.trim().toLowerCase():"";
        match=match&&(!query||row.textContent.toLowerCase().includes(query));row.hidden=!match;if(match)visible.push(row);
      });
      function stat(name,value){var node=fivew.querySelector('[data-fivew-stat="'+name+'"]');if(node)node.textContent=value;}
      stat("activities",visible.length);
      stat("organizations",new Set(visible.map(function(row){return row.dataset.organization;})).size);
      stat("districts",new Set(visible.map(function(row){return row.dataset.district;})).size);
      stat("target",visible.reduce(function(sum,row){return sum+Number(row.dataset.target||0);},0).toLocaleString("en-US"));
    }
    fivewFilters.forEach(function(field){field.addEventListener("change",filterFivew);});
    fivewSearch&&fivewSearch.addEventListener("input",filterFivew);
    var clearFivew=fivew.querySelector("[data-fivew-clear]");
    clearFivew&&clearFivew.addEventListener("click",function(){fivewFilters.forEach(function(field){field.value="All";});if(fivewSearch)fivewSearch.value="";filterFivew();});
    fivew.querySelectorAll("[data-fivew-tab]").forEach(function(button){button.addEventListener("click",function(){var tab=button.dataset.fivewTab;fivew.querySelectorAll("[data-fivew-tab]").forEach(function(item){item.classList.toggle("active",item.dataset.fivewTab===tab);});fivew.querySelectorAll("[data-fivew-panel]").forEach(function(panel){panel.hidden=panel.dataset.fivewPanel!==tab;});});});
    var drawer=fivew.querySelector(".fivew-drawer");var backdrop=fivew.querySelector(".fivew-backdrop");
    function setDrawer(open){drawer&&drawer.classList.toggle("open",open);if(backdrop)backdrop.hidden=!open;}
    fivew.querySelectorAll("[data-fivew-add]").forEach(function(button){button.addEventListener("click",function(){setDrawer(true);});});
    fivew.querySelectorAll("[data-fivew-close]").forEach(function(button){button.addEventListener("click",function(){setDrawer(false);});});
    var drawerForm=fivew.querySelector(".fivew-drawer form");drawerForm&&drawerForm.addEventListener("submit",function(event){event.preventDefault();setDrawer(false);});
    var downloadFivew=fivew.querySelector("[data-fivew-download]");
    downloadFivew&&downloadFivew.addEventListener("click",function(){var lines=[["Who","What","Where","When","Why","How","Target","Status"]];fivewRows.filter(function(row){return !row.hidden;}).forEach(function(row){lines.push(Array.from(row.cells).map(function(cell){return cell.innerText.replace(/\\s+/g," ").trim();}));});var csv=lines.map(function(line){return line.map(function(value){return '"'+String(value).replaceAll('"','""')+'"';}).join(",");}).join("\\n");var url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));var link=document.createElement("a");link.href=url;link.download="hcva-5w1h-sample.csv";link.click();URL.revokeObjectURL(url);});
  }
});
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
  html = html.replace(/<script\b[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, "");
  html = html.replace("</body>", `${staticEnhancements}</body>`);
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
