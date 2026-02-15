# Rename to sing9 — Clean Checklist

**Purpose:** Final steps to go live as **psw.vibelandia.sing9** after in-repo renames are done.  
**Status:** In-repo references updated; Vercel and Git steps are manual.

---

## Done in repo

- [x] `package.json` name → `psw-vibelandia-sing9`
- [x] `vercel.json` name → `psw-vibelandia-sing9`
- [x] README, interfaces, data, episodes, protocols, SNAPs, scripts, workflows, `.env.example` — all `sing4` / `psw.vibelandia.sing4` / `psw-vibelandia-sing4` → **sing9** (except migration doc, which describes the move)
- [x] sing9 no Supabase: edge self-validating; see [SING9_NO_SUPABASE_MINIMAL_FOOTPRINT_EDGE_SELF_VALIDATING_SNAP.md](SING9_NO_SUPABASE_MINIMAL_FOOTPRINT_EDGE_SELF_VALIDATING_SNAP.md)

---

## You do (manual)

### 1. Vercel

- **Rename project (optional):** Vercel Dashboard → project → **Settings** → **General** → rename to **psw-vibelandia-sing9** so default URL is `https://psw-vibelandia-sing9.vercel.app`.
- **Or keep current name** for zero URL change; code and GitHub already say sing9.

### 2. Git / GitHub

- Create repo **psw.vibelandia.sing9** (e.g. `FractiAI/psw.vibelandia.sing9`).
- Add it as a remote, push this branch:
  ```bash
  git remote add sing9 https://github.com/FractiAI/psw.vibelandia.sing9.git
  git push sing9 main
  ```
- In Vercel: **Settings** → **Git** → connect to **psw.vibelandia.sing9** (replace sing4 repo).

### 3. Optional

- In old repo **psw.vibelandia.sing4** README, add: *Canonical repo is now [psw.vibelandia.sing9](https://github.com/FractiAI/psw.vibelandia.sing9).*

---

## Verify

- `rg -i "sing4" --glob "!*MIGRATION*" .` — only migration doc and DEPLOYMENT_VERCEL (instructional) should mention sing4.
- Deploy from sing9 repo; open `https://psw-vibelandia-sing9.vercel.app` (or your project URL).

---

**See:** [MIGRATION_SING4_TO_SING9_SCOPE_AND_RECOMMENDATIONS.md](MIGRATION_SING4_TO_SING9_SCOPE_AND_RECOMMENDATIONS.md) for full scope and options.
