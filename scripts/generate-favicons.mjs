/**
 * Rasterise public/favicon.svg into the PNG/ICO variants that browsers, iOS,
 * and Android/PWA installs expect. Run after editing the source SVG:
 *
 *   node scripts/generate-favicons.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const source = await readFile(new URL("favicon.svg", `file://${publicDir}`));

/** Render the source SVG to a square PNG buffer at the given pixel size. */
async function png(size) {
  return sharp(source, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

const pngTargets = [
  { file: "favicon-16.png", size: 16 },
  { file: "favicon-32.png", size: 32 },
  { file: "favicon-48.png", size: 48 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
];

const rendered = new Map();
for (const { file, size } of pngTargets) {
  const buffer = await png(size);
  rendered.set(size, buffer);
  await writeFile(new URL(file, `file://${publicDir}`), buffer);
  console.log(`wrote public/${file}`);
}

/** Pack PNG buffers into a single multi-resolution .ico (PNG-compressed entries). */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(entries.length * 16);
  let offset = header.length + directory.length;
  const chunks = [];

  entries.forEach(({ size, data }, index) => {
    const entry = directory.subarray(index * 16, index * 16 + 16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // offset from file start
    offset += data.length;
    chunks.push(data);
  });

  return Buffer.concat([header, directory, ...chunks]);
}

const ico = buildIco([
  { size: 16, data: rendered.get(16) },
  { size: 32, data: rendered.get(32) },
  { size: 48, data: rendered.get(48) },
]);
await writeFile(new URL("favicon.ico", `file://${publicDir}`), ico);
console.log("wrote public/favicon.ico");
