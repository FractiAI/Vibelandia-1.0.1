# Migration psw.vibelandia.sing4 → psw.vibelandia.sing9 — Scope & Recommendations

**Purpose:** Migrate to new GitHub repository **psw.vibelandia.sing9** with **transparent switchover** to the same Vercel deployment (no user-facing URL change if desired).  
**Status:** Scoped · Recommendations below · Repo prepared for cutover  
**Date:** February 2026  

---

## 1. SCOPE

### 1.1 What’s in scope

| Area | What changes |
|------|----------------|
| **GitHub** | New repo: `FractiAI/psw.vibelandia.sing9` (or your org). Source of truth moves from sing4 to sing9. |
| **Codebase** | All references to `sing4` / `psw.vibelandia.sing4` / `psw-vibelandia-sing4` updated to **sing9** in config, docs, and data. |
| **Vercel** | Same project continues to deploy the app. Git connection is **switched** from sing4 repo to sing9 repo. Build command and output stay the same. |
| **Live URL** | By default, the existing Vercel project keeps its current URL (e.g. `psw-vibelandia-sing4.vercel.app`) unless you rename the project or add a custom domain. So: **transparent** = no change for users. Optional: add/use `psw-vibelandia-sing9.vercel.app` or a custom domain. |

### 1.2 What’s out of scope (unchanged)

- **Build:** Same (`node scripts/vercel-static-output.mjs`, `.vercel/output`). No build logic change.
- **Runtime:** Static HTML/CSS/JS; no server rename. No env var renames required unless you add new ones for “sing9”.
- **Content / NSPFRNP:** SNAPs, episodes, ticker, protocols stay as-is except where repo/URL strings are updated to sing9.

### 1.3 Files that reference sing4 / deployment URL

| File | What to update |
|------|----------------|
| `package.json` | `name`: `psw-vibelandia-sing4` → `psw-vibelandia-sing9` |
| `vercel.json` | `name`: `psw-vibelandia-sing4` → `psw-vibelandia-sing9` (optional; Vercel project name can stay for same URL) |
| `DEPLOYMENT_VERCEL.md` | Repo name, project name, URLs, “Add New Project” steps → sing9 |
| `README.md` | All `psw-vibelandia-sing4.vercel.app` → `psw-vibelandia-sing9.vercel.app` (or keep sing4 URL if you keep that Vercel project name); all `psw.vibelandia.sing4` / `psw.vibelandia.sing4` → `psw.vibelandia.sing9` |
| `data/ticker-feed.json` | Git item: label and URL → FractiAI psw.vibelandia.sing9 |
| **Other SNAPs/docs** | Any that mention the repo or live URL (e.g. T-CLASS, B-Class) → sing9 where appropriate. |

No references to the repo or Vercel URL in `scripts/vercel-static-output.mjs` or other build scripts; no code changes there.

### 1.4 sing9: No Supabase · Minimal footprint · Edge self-validating

**sing9 uses no Supabase.** Minimal footprint only. Keys and info are stored on the **host edge node**, **self-validating**. Cloud servers are **pipes only**; **user edges** handle the rest. See [SING9_NO_SUPABASE_MINIMAL_FOOTPRINT_EDGE_SELF_VALIDATING_SNAP.md](SING9_NO_SUPABASE_MINIMAL_FOOTPRINT_EDGE_SELF_VALIDATING_SNAP.md). No Supabase env vars required for sing9.

---

## 2. RECOMMENDATIONS

### 2.1 Same Vercel deployment = transparent switchover

**Recommendation:** Keep using the **existing** Vercel project and only **change its Git repository** from `psw.vibelandia.sing4` to `psw.vibelandia.sing9`.

- **Why:** One project, one URL. No duplicate deployments, no DNS or domain changes. Deploys come from the new repo; users and links keep the same experience.
- **How:** In Vercel Dashboard → your project → **Settings** → **Git** → **Disconnect** (or **Change Git Repository**) and connect **psw.vibelandia.sing9**. Future pushes to the new repo trigger the same build and go live at the same URL (e.g. `psw-vibelandia-sing4.vercel.app` if you leave the project name as-is).

**If you want the URL to say “sing9”:** Either (a) add a second Vercel domain `psw-vibelandia-sing9.vercel.app` to the same project and use that in docs/links, or (b) rename the Vercel project to `psw-vibelandia-sing9` (Vercel may then give you `psw-vibelandia-sing9.vercel.app` as default). Recommendation: (a) keeps the old URL working during transition; (b) is simpler long-term if you’re okay updating all links.

### 2.2 Create the new repo and push once

1. **Create** `psw.vibelandia.sing9` on GitHub (empty, no README).
2. **In this (sing4) repo:** Ensure all sing4 → sing9 changes are committed (see “Prep checklist” below).
3. **Add the new remote and push:**  
   `git remote add sing9 https://github.com/FractiAI/psw.vibelandia.sing9.git`  
   `git push sing9 main`  
   (or `master` if that’s your default branch.)
4. **In Vercel:** Point the project at `psw.vibelandia.sing9` (replace the current Git connection).
5. **Trigger a deploy** (or push a small commit to sing9) and confirm the site works at the same URL.

No need to “move” the sing4 repo; you can leave it as a read-only archive or delete it later.

### 2.3 Branch strategy

- **Recommendation:** Use a single main branch (`main` or `master`) for the cutover. No need for a separate “migration” branch if you do the string replacements in this repo and then push that state to sing9.
- If you prefer a safety net: create a branch `migrate-to-sing9`, apply all changes there, push to sing9, then after Vercel is connected and verified, merge to main and make sing9 the source of truth.

### 2.4 Vercel project name vs. URL

- **Option A (max transparency):** Leave Vercel project name as `psw-vibelandia-sing4`. Connect it to repo `psw.vibelandia.sing9`. Live URL stays `psw-vibelandia-sing4.vercel.app`. In docs/code we can still call the product “sing9” and point GitHub links to the new repo. No user-visible URL change.
- **Option B (name alignment):** Rename Vercel project to `psw-vibelandia-sing9`. Default URL becomes `psw-vibelandia-sing9.vercel.app`. Update all links in README, ticker, SNAPs to the new URL. Old URL may redirect or stop working depending on Vercel behavior.

**Recommendation:** Option A for zero link breakage; Option B if you want the live hostname to match “sing9” and are ready to update every link.

### 2.5 Environment variables and secrets

- No code or build currently depends on the repo name. If you have `VERCEL_PROJECT_NAME` or similar in env, you can leave it or update after renaming. No new env vars required for the migration itself.

### 2.6 After switchover

- **README / DEPLOYMENT_VERCEL:** State that the canonical repo is **psw.vibelandia.sing9** and (if applicable) that the same Vercel project is used for deployment.
- **Bookmarks / external links:** If any external sites point at `github.com/FractiAI/psw.vibelandia.sing4`, add a note in the old repo’s README: “Canonical repo is now [psw.vibelandia.sing9](https://github.com/FractiAI/psw.vibelandia.sing9).”

---

## 3. PREP CHECKLIST (done in this repo so you can push to sing9)

- [x] **package.json** — `name` set to `psw-vibelandia-sing9`
- [x] **vercel.json** — `name` set to `psw-vibelandia-sing9` (optional; see 2.4)
- [x] **DEPLOYMENT_VERCEL.md** — Repo, project, and URLs updated to sing9
- [x] **README.md** — All `psw.vibelandia.sing4` → `psw.vibelandia.sing9`, all `psw-vibelandia-sing4.vercel.app` → `psw-vibelandia-sing9.vercel.app` (or keep .vercel.app URL if you keep Option A)
- [x] **data/ticker-feed.json** — Git item label and URL → psw.vibelandia.sing9
- [ ] **You:** Create GitHub repo `psw.vibelandia.sing9`, add remote, push, then in Vercel connect the project to the new repo.

**Optional second pass** (can be done after cutover): README.ar.md, README.zh.md, README.es.md, README.de.md, README.ja.md (repo name); MCA_RUN_REPOSITORY.md; .github/workflows/README-set-vercel-env.md; episodes (EPISODE_ULTIMATE_BALLER_V, EPISODE_SELF_CLOCKING_PULSAR); WHITEPAPER_SCHUMANN_EXPEDITION_VALIDATION.md; CHANCELLOR_FULL_LAUNCH_BROCHURE; protocols/NEW_AGENT_BOOT_PROTOCOL; scripts/push-with-github-token.ps1; scripts/wordcount-andre.ps1 (local path); SUPER_BOWL_SUN_SCHUMANN_ADS_TICKER_EXPERIENCE_SNAP; PRESS_RELEASES. Any reference in MIGRATION_SING4_TO_SING9_SCOPE_AND_RECOMMENDATIONS.md to “sing4” is intentional (describes the migration).

---

## 4. SUMMARY

| Question | Answer |
|----------|--------|
| **Scope** | New repo sing9; all in-repo references sing4 → sing9; same Vercel project, new Git source. |
| **Transparent?** | Yes: keep existing Vercel project and only point it at psw.vibelandia.sing9; same deployment URL unless you rename the project. |
| **Recommendation** | One Vercel project, connect to sing9; optionally keep project name/URL as sing4 for zero link breakage, or rename to sing9 and update all links. |
| **Prep** | All config and doc updates applied in this repo; you create the new repo, push, and switch Vercel’s Git connection. |

**NSPFRNP · Infinity 9 · psw.vibelandia.sing9 → ∞⁹**
