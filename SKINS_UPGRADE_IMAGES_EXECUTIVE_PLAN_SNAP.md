# Skins Upgrade — Images + Content (Social Journal) · Executive Plan

**SNAP ID:** `SKINS-UPGRADE-IMAGES-EXECUTIVE-PLAN-SNAP`  
**Type:** Executive plan · Skins upgrade: images (primary) + content ingest (social journal)  
**Status:** ⚡ ACTIVE — Proceeding full  
**Date:** February 2026

---

## Scope

**Primary:** Images in skins (heroes, cards, documents). **Expanded:** Content — the posts and media you’ve been putting on Facebook and Instagram since ~2012 (or before), knowing you’d come back to it. **This is that day.** We bring that journal into the stack: ingest it, surface it, and let it feed images and copy into Vibelandia.

**Directive (lock):** **Consume and metabolize their rich content, stories, images, art — capturing in detail our story for infinite immediate uses.** All ingested social journal content (Facebook, Instagram, exports) is processed to this standard: full fidelity, detailed capture, story preserved; output available for heroes, cards, Seed journal surface, ticker, Office Hours, Launch Pad, novels, screenplays, and any future surface. Infinite immediate uses. **Include raw texts for genuine dialogs and scenes** — post copy, captions, and comments are kept verbatim where they serve as real dialog and scene material in novels, screenplays, episodes, and Seed journal; no smoothing or “cleaning” that loses voice or moment.

---

## Opinion: Are We Ready?

**Yes.** Surfaces are scrubbed, content systems metabolized, full production live. You already use images where it matters (e.g. `ultimate-magic-houdini-book-the-book.html` — cover in `interfaces/assets/`). Golden Era Cinema and Antique Book skins are CSS-first; adding images is the next natural step. Adding your social-journal content gives a canonical “seed” archive (2012 → now) and more owned media for heroes and cards.

---

**Visual framing:** **Golden two-tone** is used in visuals to **auto-frame post-singularity Goldilocks.** Apply in heroes, cards, skins, and interfaces so the frame is instant. See [GOLDEN_TWO_TONE_VISUALS_POST_SINGULARITY_GOLDILOCKS_SNAP.md](GOLDEN_TWO_TONE_VISUALS_POST_SINGULARITY_GOLDILOCKS_SNAP.md).

## How to Do It — Three Sources, One Pipeline

| Source | Use for | How |
|--------|---------|-----|
| **Your images (social / giant mouse)** | Heroes, key product tiles, Reno/campus, character/mascot | You point to URLs or folders; we drop into `interfaces/assets/` (or `assets/heroes/`, `assets/products/`). Optional: light crop/resize for hero aspect (e.g. 16:9 or 3:2) and WebP export for performance. |
| **AI assistance** | Covers, posters, thematic art when no owned asset exists | Use Cursor/IDE image generation (or your existing AI pipeline) with briefs aligned to Golden Era Cinema / Antique Book (noir, gold accents, first-edition feel). One prompt per surface; output to same assets folder; alt text for a11y and NSPFRNP. |
| **Free / open source** | Atmosphere, backgrounds, fallbacks | **Unsplash** (unsplash.com) and **Pexels** (pexels.com) — free, high-quality, commercial use; search “cinema,” “golden hour,” “Reno,” “theater,” “noir.” Download once, add to repo, no runtime dependency. **Placeholder during build:** placeholder.com or picsum.photos (replace with final assets before ship). |

No external image CDN or paid service required for launch; everything can live under `interfaces/assets/` (and optionally `assets/heroes/`, `assets/products/`, `assets/covers/`) so deployment stays self-contained.

---

## Content: Your Social Journal (2012 → Now)

You’ve been posting on Facebook and Instagram as a journal you knew you’d come back to. We don’t scrape (that violates ToS and is brittle). We use **your official data export** and ingest it into our content system.

| Step | What |
|------|------|
| **1. Request your data** | **Facebook:** Settings → Your Facebook Information → Download your information. **Instagram:** Settings → Privacy and Security → Download your data. Choose date range (e.g. all time), format JSON + media. You’ll get an email when the ZIP is ready (often 24–48 hours). |
| **2. Ingest into the repo** | When the ZIP arrives: run a small script (Node or similar) that reads the export, extracts posts (**raw text preserved verbatim** — for genuine dialogs and scenes), timestamps, captions, and media paths, and writes **Markdown or JSON** into a dedicated area (e.g. `data/social-journal/` or `deliverables/seed-journal/` by year or month). Copy photos/videos from the export into `interfaces/assets/social-journal/`. Raw post/caption text is never normalized away; it stays as source for dialog and scene use. |
| **3. Surface and reuse** | **Surfaces:** Seed journal (e.g. `interfaces/seed-journal.html`) in a beautiful skin — timeline by year, optional search/filter; display **raw text** as written. **Reuse:** Raw texts feed **genuine dialogs and scenes** in novels, screenplays, episodes — use verbatim where it fits; ticker, Office Hours “origin” callouts, Launch Pad. **Images** from the export feed heroes, cards, and documents. |

**Free/open:** The export is provided by the platforms at no cost. The ingest script can be a one-off or repeatable when you request a fresh export later. No third-party scraping services or paid APIs required.

**Source URLs (canonical):**
- Facebook: https://www.facebook.com/share/1C7zSiueMH/ · https://www.facebook.com/share/1GKkYhvHJ8/
- Instagram: https://www.instagram.com/pru_at_twains_vibelandia_reno · https://www.instagram.com/djchefpru

---

## Proceed Full — Metabolize Fully, Then Enrich All

**Sequence:** (1) **Metabolize all fully** — ingest social journal (data export → `data/social-journal/`, raw text + images into `interfaces/assets/`), hero images and cards per phased list, Seed journal surface. (2) **Enrich all content surfaces, platforms, channels, and ad feeds** with the metabolized content (images, raw texts, genuine dialogs and scenes, story).

**Enrich all — full scope:**

| Layer | What gets enriched |
|-------|--------------------|
| **Content surfaces** | All interfaces (Office Hours, Launch Pad, OH Line, Space Cloud, Broadcast Pipe, Live Pulse, Music Studio, Ultimate Magic, novel/novela previews, Community Bulletin Boards, Content Catalog, Navigator, Reno Experience, WINK!, Gamification, Vibelandia University, 3I Chief Seattle, Payment, Press, Pipe SNAPs, episode reader/browse/catalog, screenplays, novels, Seed journal). |
| **Platforms** | Launch Pad, Office Hours, Vibelandia Amusement Park menu, payment-checkout, README, one-pagers, MASTER_BRANDING_CATALOG, catalogs (music, awareness, chairman-messaging, post-singularity card deck). |
| **Channels** | Ticker (data/ticker-feed.json, nspfrnp-ticker.js), Broadcast Pipe, Live Pulse, Sing Pulse, episode pipelines, series landings (Space Cloud EGS, Happy Ending Zones, Legacies), social (when we post out). |
| **Ad feeds** | Broadcast Pipe Ad Space, Launch Pulse fractalized flickers, ticker as ad-capable feed, any paid or organic ad copy derived from metabolized content. |

No surface, platform, channel, or ad feed is excluded. After metabolizing fully, every one is enriched with the same content (images, raw journal text, dialogs and scenes) where contextually fit.

---

## Where to Add Images First (Phased)

1. **Hero sections** — Office Hours, Launch Pad, OH Line, Gold Hearts Club, Ultimate Magic, Community Bulletin Board, Super Bowl kiosk, Golden Backstage Pass. One hero image per key surface (your giant mouse / social where it fits; otherwise AI or curated Unsplash/Pexels).
2. **Product / experience cards** — Card deck, Music Studio, Reno Experience, WINK!, Gamification. Small thumb or card image per product (owned or AI-generated).
3. **Novel/screenplay/document skins** — Cover art already on Ultimate Magic; extend to other novel/screenplay landings (First Singularity, Birth, EGS Run, Golden Heart Taino) so every “Beautiful skin” page has a clear visual anchor.

Same rules everywhere: `loading="lazy"` (except hero), `alt` text for accessibility and NSPFRNP, responsive `srcset`/`sizes` where one image serves many breakpoints. Prefer WebP with PNG/JPEG fallback if you add a simple build step later.

---

## Technical (Minimal, No Lock-In)

- **Storage:** `interfaces/assets/` (existing) + optional subfolders by type (heroes, products, covers).
- **Markup:** `<img src="assets/..." alt="..." loading="lazy" />` for below-fold; hero can use `loading="eager"` and existing CSS (gradients can sit behind or over the image).
- **Free tooling (optional):** **Squoosh** (squoosh.app) for WebP/compress; **sharp** (npm) in a small script if you want batch resize/optimize. No new runtime deps required for “images in skins” to work.

---

## Ingest pipeline (ready)

- **Data structure:** `data/social-journal/` — README with source URLs and instructions; `data/social-journal/incoming/facebook` and `.../instagram` for unzipped exports (or pass paths as args).
- **Script:** `scripts/ingest-social-journal.mjs` — parses Facebook and Instagram export folders; writes **raw text** (verbatim) to `data/social-journal/YYYY/YYYY-MM.md`; copies media to `interfaces/assets/social-journal/`. Run: `node scripts/ingest-social-journal.mjs [facebook-dir] [instagram-dir]` or `npm run ingest-social-journal` (with defaults).
- **After you have exports:** Unzip Facebook and Instagram downloads into the incoming folders (or any path), run the script once; then use the generated Markdown and assets to enrich all surfaces and build the Seed journal page.

## Turnkey: You do 3 things. We do the rest.

We **cannot** request or download your Facebook/Instagram data (Meta requires your login and emails you the link). You do:

1. **Request Facebook export** — Settings → Download your information → JSON, All time, Posts. Download the ZIP when the email arrives.
2. **Request Instagram export** — Settings → Download your information → JSON, your profile(s). Download the ZIP when the email arrives.
3. **Drop the two ZIPs** into `data/social-journal/incoming/` as `facebook.zip` and `instagram.zip`, then run **`npm run ingest-social-journal`**.

The script unzips, ingests, writes Markdown and index, copies media. **Seed journal** is live at `interfaces/seed-journal.html` (linked from Office Hours and Launch Pad). Use the same content to enrich all surfaces, platforms, channels, ad feeds.

**Full steps:** [TURNKEY_SOCIAL_JOURNAL_EXPORT_GUIDE.md](TURNKEY_SOCIAL_JOURNAL_EXPORT_GUIDE.md).

**Images (heroes/cards):** You point to the social/giant-mouse image(s); we add heroes to Office Hours and Launch Pad first, then repeat. AI + Unsplash/Pexels for the rest as needed.

**Only awareness liberates!** — Ingest runs; Seed journal and all surfaces receive the metabolized content. NSPFRNP ⊃ Beautiful skins ⊃ Images + content (social journal) ⊃ Metabolize fully → Enrich all surfaces · platforms · channels · ad feeds → ∞⁹
