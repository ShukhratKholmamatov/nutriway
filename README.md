# NUTRIWAY NATURAL — NATURFLEX COLLAGEN

Bilingual (Uzbek / Russian) marketing site for NUTRIWAY NATURAL and its marine
collagen product, NATURFLEX COLLAGEN.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and Motion.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

`/` redirects to `/uz` or `/ru` based on the visitor's `Accept-Language`
header, defaulting to Uzbek.

---

## Routes

| Route | What it is |
| --- | --- |
| `/[locale]` | Landing page — hero, product, articles teaser, FAQ, contacts |
| `/[locale]/blog` | Article index |
| `/[locale]/blog/[slug]` | One of four long-form articles |
| `/api/lead` | Telegram lead endpoint (POST) |

**Article slugs are localised**, so the same article lives at a different URL per
language — better for search in each language:

| Article | Uzbek | Russian |
| --- | --- | --- |
| Marine collagen | `/uz/blog/dengiz-kollageni-nima` | `/ru/blog/chto-takoe-morskoy-kollagen` |
| How to take it | `/uz/blog/kollagenni-qanday-qabul-qilish` | `/ru/blog/kak-prinimat-kollagen` |
| 5 mistakes | `/uz/blog/kollagen-qabul-qilishda-5-xato` | `/ru/blog/5-oshibok-pri-prieme-kollagena` |
| Foods | `/uz/blog/kollagen-uchun-ovqatlanish` | `/ru/blog/produkty-dlya-vyrabotki-kollagena` |

Because the slugs differ, the language switcher and the `hreflang` tags cannot
do a naive `/uz` → `/ru` path swap — that would 404. Both resolve the article's
stable key first (`lib/articles.ts`) and then look up the counterpart slug. Add
an article by adding one entry to `articles.items` in **both** dictionaries; the
registry, sitemap, hreflang and static params all derive from that.

---

## Telegram lead notifications

Every submission of the contact form is delivered to a Telegram group by a bot.
The bot token is only ever read server-side, inside `app/api/lead/route.ts` —
it is never exposed to the browser.

**Setup**

1. Open [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token.
2. Add the bot to your group and **promote it to administrator** (otherwise it
   cannot post).
3. Find the group id — add [@RawDataBot](https://t.me/RawDataBot) to the group,
   or call `https://api.telegram.org/bot<TOKEN>/getUpdates` after posting a
   message there. Group ids start with `-100`.
4. Put both values in `.env.local`:

```env
TELEGRAM_BOT_TOKEN=123456789:AA...
TELEGRAM_CHAT_ID=-1001234567890
# TELEGRAM_THREAD_ID=12   # only for forum-mode groups with topics
NEXT_PUBLIC_SITE_URL=https://nutriway.uz
```

**Endpoint behaviour** (`POST /api/lead`)

| Case | Response |
| --- | --- |
| Valid lead, delivered | `200 {"ok":true}` |
| Name shorter than 2 chars | `400 invalid_name` |
| Phone with fewer than 7 digits | `400 invalid_phone` |
| Honeypot field filled (bot) | `200 {"ok":true}`, silently dropped |
| More than 5 posts/minute per IP | `429 rate_limited` |
| Env vars missing | `500 not_configured` |
| Telegram unreachable / rejects | `502 telegram_failed` |

---

## Editing content

All copy lives in two mirrored dictionaries — no text is hard-coded in
components:

- `lib/content/uz.ts` — Uzbek (source of truth for the shape)
- `lib/content/ru.ts` — Russian, typed as `typeof uz` so a missing or renamed
  key is a **compile error**

Business details (phone numbers, addresses, opening hours, social links) live in
`lib/site.ts`. Image assignments per section live in `lib/content/index.ts`.

### Placeholders to replace before launch

`lib/site.ts` ships with placeholder contact data:

- `phones` — both numbers are `+998 (90) 000-00-00` / `+998 (71) 000-00-00`
- `locations` — street addresses and coordinates are examples
- `social` — Telegram / Instagram / email handles are guesses
- `SITE_URL` — defaults to `https://nutriway.uz`

---

## SEO

- Per-locale `<title>`, description and keywords
- `hreflang` alternates for `uz`, `ru` and `x-default`, plus canonical URLs
- Open Graph and Twitter card metadata
- JSON-LD: `Organization`, `WebSite`, `HealthAndBeautyBusiness` (per location),
  `Product` with offer + spec properties, `FAQPage` (9 Q&As), `Article`
  (with dates, `timeRequired`, keywords) + `BreadcrumbList` per post,
  `CollectionPage` + `ItemList` on the blog index
- Generated social cards: a per-locale card for the home page and blog index,
  and a **per-article card** carrying that article's headline and reading time
  (`components/seo/ogCard.tsx`)
- Generated favicon / PWA icon (`app/icon.tsx`) and `manifest.webmanifest`
- `sitemap.xml` (12 URLs, with per-locale alternates) and `robots.txt`
- All 28 routes are statically prerendered

Article dates in structured data come from `CONTENT_PUBLISHED_AT` in
`lib/site.ts` — **bump it when you revise the article copy**, since that value
is what Google displays as the article date.

> Note: the `Product` offer declares availability and currency but no `price`,
> because the product has no public price yet. Adding a real `price` in
> `components/seo/JsonLd.tsx` would make the product eligible for richer
> search results.

---

## Mobile & accessibility

- Verified at 360px and 390px: no horizontal overflow on any route
- All interactive targets meet the WCAG 2.2 AA 24×24px minimum (footer links,
  phone numbers, map links, breadcrumbs and the back link all carry explicit
  vertical padding for this reason — don't strip it)
- Skip-to-content link, visible focus rings, `prefers-reduced-motion` honoured
- The header inverts to light text only over dark heroes (landing page and
  article headers) and stays dark-on-glass elsewhere — see `hasDarkHero()` in
  `components/layout/Header.tsx`

The FAQ section is written to target real search queries about marine collagen
(what it is, absorption, dosage, how long until results, how to choose one).

---

## Design system

Tokens are defined once in `app/globals.css` under `@theme`:

- **wine** `#491522` — the brand colour, with a full 50–950 ramp
- **gold** `#c1904a` — accent
- **bone** — warm paper neutrals (there are no cool grays in the palette)
- Playfair Display (display) + Manrope (sans) — both ship Latin **and Cyrillic**,
  so Uzbek and Russian render in the same voice

Motion is scroll-triggered and respects `prefers-reduced-motion`; the `Reveal`
component renders content unanimated when reduced motion is requested.

---

## No photography — everything is drawn

The site deliberately uses **no photographs**. The brand's Instagram carousels
(kept in `info/` for reference) have marketing copy burnt into the images, so
using them would have put untranslatable, unindexable, un-selectable text on the
page — and would have shown Russian slides on the Uzbek pages.

Instead the text was transcribed out of those slides into `lib/content/`, and
every visual is vector:

| Component | Purpose |
| --- | --- |
| `components/ui/ProductJar.tsx` | The NATURFLEX pack, drawn in SVG. Every label is real text, so it stays crisp at any size and localises (the capsule-count seal reads "90 kapsula" / "90 капсул"). |
| `components/ui/Motifs.tsx` | `HelixMotif` (collagen triple helix), `RingsMotif`, `CapsuleMotif`, `WaveMotif` — texture in place of stock imagery. |
| `app/[locale]/opengraph-image.tsx` | Social preview card, generated per locale from brand tokens. |

The only raster asset in `public/` is the logo.

Because of this, all body copy is real DOM text — fully indexable by search
engines, translatable, and readable by screen readers.

**If you later get professional product photography**, it can be dropped in
alongside: add the files to `public/`, and swap `ProductJar` for `next/image` in
`Hero.tsx` and `Product.tsx`.

---

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build (also typechecks)
npm run start   # serve the production build
npm run lint    # eslint
```
