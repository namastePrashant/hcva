import { cp, mkdir, readdir, rm } from "node:fs/promises";
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
