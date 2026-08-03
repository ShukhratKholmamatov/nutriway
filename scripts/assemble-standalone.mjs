/**
 * After `next build` with output:"standalone", the server lives in
 * .next/standalone/server.js but the static assets and /public are NOT copied
 * in automatically. This copies them into place so the standalone server can
 * serve them. Written in Node (not shell) so it works on Windows and Linux.
 *
 * Run via: npm run build:cpanel   (which does `next build` then this)
 */
import { cpSync, existsSync } from "node:fs";

const standalone = ".next/standalone";
if (!existsSync(`${standalone}/server.js`)) {
  console.error(
    "✗ .next/standalone/server.js not found. Did `next build` run with output:'standalone'?"
  );
  process.exit(1);
}

cpSync("public", `${standalone}/public`, { recursive: true });
cpSync(".next/static", `${standalone}/.next/static`, { recursive: true });

console.log("✓ Assembled standalone bundle (copied public/ and .next/static).");
