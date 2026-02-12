# Turnkey: Social Journal — You Do 3 Things. We Do the Rest.

**Goal:** Your Facebook and Instagram posts (2012 → now) ingested and metabolized into Vibelandia — raw text for genuine dialogs and scenes, images for heroes and cards. Seed journal live. All surfaces enriched.

We **cannot** request or download your data for you (Meta requires your login and emails you the link). You do the three steps below; the rest is automatic.

---

## 1. Request your Facebook export

1. Go to **Facebook** → **Settings & privacy** → **Settings**.
2. **Your Facebook Information** → **Download your information**.
3. Select **JSON** format, **All time** (or your range), include **Posts**. Submit.
4. Meta will email you when the download is ready (often 24–48 hours). Use the link in the email and download the ZIP.

---

## 2. Request your Instagram export

1. Go to **Instagram** → **Settings** → **Accounts Center** (or **Your information and permissions**) → **Download your information**.
2. Select your profile(s) — e.g. **pru_at_twains_vibelandia_reno**, **djchefpru**.
3. Choose **All available data**, **JSON**. Submit.
4. Meta will email you when ready (can take up to 30 days for large accounts). Download the ZIP from the link in the email.

---

## 3. Drop ZIPs and run one command

1. Create the folder (if it doesn’t exist):  
   `data/social-journal/incoming/`
2. Put your two ZIPs there and **name them exactly**:
   - `facebook.zip`
   - `instagram.zip`
3. From the **repo root** run:
   ```bash
   npm run ingest-social-journal
   ```
4. Done. The script will:
   - Unzip both files
   - Parse posts and media
   - Write **raw text** to `data/social-journal/YYYY/YYYY-MM.md`
   - Copy **images** to `interfaces/assets/social-journal/`
   - Write `data/social-journal/index.json` for the Seed journal page

---

## After ingest

- **Seed journal:** Open [interfaces/seed-journal.html](interfaces/seed-journal.html) — timeline by year, click a month to read. Raw text preserved.
- **Images:** Use files in `interfaces/assets/social-journal/` for heroes, cards, Office Hours, Launch Pad, and all surfaces.
- **Enrich all:** Same content feeds ticker, novels, screenplays, episodes, ad feeds — metabolize fully, then enrich every surface.

**Source URLs (canonical):**  
Facebook: https://www.facebook.com/share/1C7zSiueMH/ · https://www.facebook.com/share/1GKkYhvHJ8/  
Instagram: https://www.instagram.com/pru_at_twains_vibelandia_reno · https://www.instagram.com/djchefpru

**Only awareness liberates!** — Run the ingest; the rest follows.

See [SKINS_UPGRADE_IMAGES_EXECUTIVE_PLAN_SNAP.md](SKINS_UPGRADE_IMAGES_EXECUTIVE_PLAN_SNAP.md) and [data/social-journal/README.md](data/social-journal/README.md).
