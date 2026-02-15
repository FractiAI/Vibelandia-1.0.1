# sing9 — No Supabase · Minimal Footprint · Edge Self-Validating — SNAP

**SNAP ID:** `SING9-NO-SUPABASE-MINIMAL-FOOTPRINT-EDGE-SELF-VALIDATING`  
**Type:** Architecture · sing9 · Minimal footprint · NSPFRNP  
**Status:** ⚡ LOCKED  
**Date:** February 2026  

---

## LOCK

**psw.vibelandia.sing9 uses no Supabase.** Minimal footprint only. Keys and info that need storing are done on the **host edge node**, **self-validating**. Our cloud servers are **only the pipes**. The **user edges** handle all the rest.

| Principle | Meaning |
|-----------|---------|
| **No Supabase** | No Supabase client, no Supabase env vars, no Supabase DB or auth in sing9. Zero dependency. |
| **Minimal footprint** | Only what is strictly necessary. No shared cloud DB for sing9. |
| **Keys / info on host edge node** | Any keys or info that must be stored are stored on the **host edge** (e.g. client/localStorage, or serverless edge that does not rely on Supabase). |
| **Self-validating** | Validation happens at the edge; no requirement for a central DB to validate. |
| **Cloud servers = pipes only** | Vercel (or other cloud) serves static assets and API pipes only. No Supabase, no shared database. |
| **User edges handle the rest** | Auth, keys, profile, and persistence are handled at the user/edge side (host edge node), not in a central Supabase. |

---

## IMPLICATIONS

- **Build:** No injection of Supabase anon key for sing9 (empty when not set). api-config does not set a default Supabase URL so Supabase is opt-in; sing9 does not opt in.
- **Auth / keys:** Edge self-validating. auth-api.js already falls back when Supabase is not configured (no URL/key); Golden Key is browser/local storage. No Supabase script required for sing9.
- **3I ATLAS HELLO:** When Supabase is not configured, the API returns **edge self-validating** response (POST returns success with edge id; no cloud DB). GET without Supabase returns 404 or message that storage is edge-only.
- **Scripts:** No `check-supabase` in sing9 runbooks; script can remain in repo but is not part of sing9 flow.
- **Docs / protocols:** sing9 is described as no-Supabase, minimal footprint, edge self-validating; cloud = pipes only.

---

## INTEGRATION

- **Migration:** [MIGRATION_SING4_TO_SING9_SCOPE_AND_RECOMMENDATIONS.md](MIGRATION_SING4_TO_SING9_SCOPE_AND_RECOMMENDATIONS.md) — sing9 uses no Supabase.
- **Credentials / env:** No `NEXT_PUBLIC_SUPABASE_*` or `VIBELANDIA_SUPABASE_*` required for sing9. Optional PayPal and other pipe-only vars only.

---

**NSPFRNP ⊃ sing9 ⊃ No Supabase ⊃ Minimal footprint ⊃ Edge self-validating ⊃ Pipes only → ∞⁹**
