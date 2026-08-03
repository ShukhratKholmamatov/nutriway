# Deploying NUTRIWAY to cPanel (Node.js hosting)

This is a **Next.js app**, not a static HTML site. It needs a running Node.js
process — the Telegram lead form, the locale redirects, and the generated
social/favicon images all execute on the server. Plain file-upload to static
hosting will not work.

> ⚠️ **Build on Linux, not Windows.** A build produced on Windows contains
> Windows-only binaries and is not portable to a Linux cPanel server. Use the
> GitHub Action below (it builds on Linux for you) — do **not** upload a `deploy`
> or `bundle` folder built on your PC.

---

## Prerequisites (check these first)

1. **cPanel → Software → "Setup Node.js App"** exists.
   If it does not, your plan has no Node.js — you cannot host this app here.
   (In that case: host free on Vercel and just point your domain's DNS at it.)
2. The Node version offered is **20 or newer** (Next.js 16 requires it).
3. You know your final public domain (e.g. `nutriway.uz`) — see step 6.

---

## Step 1 — Get a Linux build from GitHub

1. Push this repo to GitHub (already done).
2. On GitHub, open the **Actions** tab → **Build for cPanel** → **Run workflow**.
   (It also runs automatically on every push to `main`.)
3. When the green check appears, open that run and download the
   **`nutriway-cpanel`** artifact. It's a zip — this is exactly what you upload.

The zip contains:

```
server.js            ← the app's entry point
node_modules/        ← only what the server needs (small)
package.json
.next/               ← compiled app + static assets
public/              ← images, logo, etc.
```

---

## Step 2 — Upload to cPanel

1. cPanel → **File Manager**.
2. Create a folder for the app, e.g. `nutriway` (NOT inside `public_html`).
3. Upload the `nutriway-cpanel` zip into it and **Extract** it there.
   You should end up with `…/nutriway/server.js`, `…/nutriway/.next`, etc.

---

## Step 3 — Create the Node.js app

cPanel → **Setup Node.js App** → **Create Application**:

| Field | Value |
| --- | --- |
| Node.js version | **20** (or newer) |
| Application mode | **Production** |
| Application root | `nutriway` (the folder from step 2) |
| Application URL | your domain / subdomain |
| Application startup file | `server.js` |

Click **Create**.

---

## Step 4 — Environment variables (the Telegram secrets)

Still in the Node.js app screen, add these **Environment variables**
(do **not** upload `.env.local` — set them here instead):

| Name | Value |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | your BotFather token |
| `TELEGRAM_CHAT_ID` | `-1004454698076` (the "Nutriway conversions" group) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-real-domain` |
| `NODE_ENV` | `production` |

---

## Step 5 — Start it

Click **Run NPM Install** is **NOT** needed (the bundle already includes
node_modules). Just press **Restart**. Then open your domain — the site should
load, and submitting the contact form should post to the Telegram group.

If it doesn't start, open the app's **log** (link on the same screen) and read
the error — usually it's the Node version being too old, or the startup file not
set to `server.js`.

---

## Step 6 — Set the real domain (for correct SEO links)

`NEXT_PUBLIC_SITE_URL` (step 4) must be your real public URL. It's used in
`<link rel="canonical">`, `hreflang`, the sitemap and structured data. If it's
wrong, Google indexes the wrong URLs. Set it and Restart.

---

## Updating the site later

1. Change code → push to GitHub.
2. Actions rebuilds the `nutriway-cpanel` artifact automatically.
3. Download it, re-upload/extract into the app folder (overwrite), press
   **Restart** in Setup Node.js App.

---

## If "Setup Node.js App" is missing

Your plan is static-only and can't run this app. Best option, keeping your
domain:

1. Import this GitHub repo at **vercel.com** (free).
2. Add the same environment variables (step 4) in the Vercel project settings.
3. Add your domain in Vercel → it gives you DNS records.
4. In your webname.uz control panel, set those DNS records for the domain.

Visitors get the fully working site; you keep the domain where it is.
