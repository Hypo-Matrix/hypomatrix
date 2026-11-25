#!/usr/bin/env node
/**
 * Brand asset generator.
 *
 * Single source of truth: public/brand/trademark.svg
 * Run `pnpm brand:generate` after editing it. Every file listed in TARGETS
 * below is (re)generated from that SVG, so nothing else needs to be touched.
 *
 * To add a new icon location, add one entry to TARGETS.
 *
 * Target options:
 *   type        "svg" | "png" | "ico"
 *   out         output path, relative to the project root
 *   size        (png) square size in px
 *   sizes       (ico) list of square sizes, embedded as PNGs
 *   scale       how much of the canvas the logo fills (0-1); lower = more padding.
 *               This is the safe area: the logo is always centered inside it.
 *               Guide: favicon/icon ~0.8, apple-icon ~0.64 (iOS rounds corners),
 *               maskable PWA <= 0.56 (the logo must fit the 80% safe circle).
 *   background  css color or null for transparent
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = "public/brand/trademark.svg";

const WHITE = "#ffffff";

const TARGETS = [
  // Next.js app-router metadata icons (src/app)
  { type: "svg", out: "src/app/icon.svg", scale: 0.8, background: null },
  { type: "png", out: "src/app/apple-icon.png", size: 180, scale: 0.64, background: WHITE },
  { type: "ico", out: "src/app/favicon.ico", sizes: [16, 32, 48], scale: 0.8, background: null },

  // PWA manifest icons (public) - maskable, so keep the logo inside the safe zone
  { type: "png", out: "public/web-app-manifest-192x192.png", size: 192, scale: 0.56, background: WHITE },
  { type: "png", out: "public/web-app-manifest-512x512.png", size: 512, scale: 0.56, background: WHITE },
];

const abs = (p) => path.join(ROOT, p);

async function renderPng(svg, size, scale, background) {
  const inner = Math.round(size * scale);
  // density high enough that the SVG is rasterised crisply before resizing
  const logo = await sharp(svg, { density: 600 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Wrap the source SVG in a square canvas so the logo sits centered inside the safe area.
function padSvg(svgText, scale, background) {
  const m = svgText.match(/viewBox="([-\d.\s]+)"/);
  if (!m) throw new Error("trademark.svg needs a viewBox");
  const [x, y, w, h] = m[1].trim().split(/\s+/).map(Number);
  const side = Math.max(w, h) / scale;
  const vx = x + w / 2 - side / 2;
  const vy = y + h / 2 - side / 2;
  const inner = svgText
    .replace(/<\?xml[^>]*\?>\s*/, "")
    .replace(/^\s*<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
  const bg = background ? `<rect x="${vx}" y="${vy}" width="${side}" height="${side}" fill="${background}"/>` : "";
  return `<svg width="${side}" height="${side}" viewBox="${vx} ${vy} ${side} ${side}" fill="none" xmlns="http://www.w3.org/2000/svg">${bg}${inner}</svg>\n`;
}

// Minimal ICO writer: an ICONDIR followed by PNG-encoded images.
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  const svg = await readFile(abs(SOURCE));
  console.log(`Source: ${SOURCE}\n`);

  for (const t of TARGETS) {
    await mkdir(path.dirname(abs(t.out)), { recursive: true });

    if (t.type === "svg") {
      await writeFile(abs(t.out), padSvg(svg.toString(), t.scale ?? 1, t.background ?? null));
    } else if (t.type === "png") {
      await writeFile(abs(t.out), await renderPng(svg, t.size, t.scale, t.background));
    } else if (t.type === "ico") {
      const images = [];
      for (const size of t.sizes) {
        images.push({ size, data: await renderPng(svg, size, t.scale, t.background) });
      }
      await writeFile(abs(t.out), buildIco(images));
    } else {
      throw new Error(`Unknown target type: ${t.type}`);
    }
    console.log(`  ✓ ${t.out}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
