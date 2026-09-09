import assert from "node:assert/strict";
import test from "node:test";

const ASSET_STUB = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const CTX = { waitUntil() {}, passThroughOnException() {} };

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function fetchPath(path, { host = "localhost" } = {}) {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(`http://${host}${path}`, { headers: { accept: "text/html" } }),
    ASSET_STUB,
    CTX,
  );
}

test("home page renders with core SEO tags", async () => {
  const response = await fetchPath("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>[^<]*Humanitarian CVA[^<]*<\/title>/i);
  assert.match(html, /<link[^>]+rel="canonical"[^>]+href="[^"]*humanitariancva\.org\/?"/i);
  assert.match(html, /<meta[^>]+property="og:image"/i);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"WebSite"/);
});

test("applies security headers", async () => {
  const response = await fetchPath("/");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.ok(response.headers.get("strict-transport-security"));
});

test("redirects the www and .com hosts to the canonical origin", async () => {
  for (const host of [
    "www.humanitariancva.org",
    "humanitariancva.com",
    "www.humanitariancva.com",
  ]) {
    const response = await fetchPath("/services", { host });
    assert.equal(response.status, 308, `${host} should redirect`);
    assert.equal(
      response.headers.get("location"),
      "https://humanitariancva.org/services",
    );
  }
});

test("serves robots.txt and sitemap.xml", async () => {
  const robots = await fetchPath("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap:\s*https:\/\/humanitariancva\.org\/sitemap\.xml/i);

  const sitemap = await fetchPath("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /<loc>https:\/\/humanitariancva\.org<\/loc>/);
  assert.match(xml, /\/insights\/nepal-digital-payments-humanitarian-cash/);
});

test("content route renders its own canonical and title", async () => {
  const response = await fetchPath("/services");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<link[^>]+rel="canonical"[^>]+href="[^"]*\/services"/i);
  assert.match(html, /Consulting &(amp;)? Digital Services/i);
  assert.match(html, /"@type":"BreadcrumbList"/);
});
