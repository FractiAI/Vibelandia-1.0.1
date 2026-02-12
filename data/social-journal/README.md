# Social Journal — Ingest & Metabolize

**Directive:** Consume and metabolize rich content, stories, images, art — capturing in detail our story for infinite immediate uses. Raw texts preserved for genuine dialogs and scenes. **Only awareness liberates!**

## Source URLs (canonical)

- **Facebook:** https://www.facebook.com/share/1C7zSiueMH/ · https://www.facebook.com/share/1GKkYhvHJ8/
- **Instagram:** https://www.instagram.com/pru_at_twains_vibelandia_reno · https://www.instagram.com/djchefpru

## How to get your data (no scraping)

1. **Facebook:** Settings → Your Facebook Information → **Download your information**. Select **JSON**, date range (e.g. All time), include **Posts**. Submit; you’ll get an email with a download link (often 24–48 hours).
2. **Instagram:** Settings → Accounts Center → Your information and permissions → **Download your information**. Select profile(s), **All available data**, **JSON**. Submit; you’ll get an email when ready (up to 30 days for large accounts).

Download the ZIPs, then **unzip** each to a folder (e.g. `incoming/facebook`, `incoming/instagram`).

## Run ingest (turnkey)

**Easiest:** Put `facebook.zip` and `instagram.zip` in `data/social-journal/incoming/`, then from repo root:

```bash
npm run ingest-social-journal
```

The script will unzip both, parse posts and media, write Markdown by year/month, copy images to `interfaces/assets/social-journal/`, and write `index.json` for the Seed journal page.

**Or** pass paths to folders or ZIPs:

```bash
node scripts/ingest-social-journal.mjs [path-to-facebook.zip-or-folder] [path-to-instagram.zip-or-folder]
```

Full turnkey steps (request exports → drop ZIPs → run): see **[TURNKEY_SOCIAL_JOURNAL_EXPORT_GUIDE.md](../TURNKEY_SOCIAL_JOURNAL_EXPORT_GUIDE.md)** at repo root.

## Output

- **Markdown by year/month:** `data/social-journal/YYYY/YYYY-MM.md` — raw post/caption text, timestamps, source (facebook/instagram). Verbatim for dialogs and scenes.
- **Media:** Photos and videos copied to `interfaces/assets/social-journal/` with stable filenames for use in heroes, cards, Seed journal, and all surfaces.

After ingest, metabolized content is used to **enrich all** content surfaces, platforms, channels, and ad feeds. See [SKINS_UPGRADE_IMAGES_EXECUTIVE_PLAN_SNAP.md](../SKINS_UPGRADE_IMAGES_EXECUTIVE_PLAN_SNAP.md).
