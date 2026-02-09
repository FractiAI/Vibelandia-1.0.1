# 3I ATLAS HELLO Test — Real Storage & Shareable Link SNAP

**Type:** Test · Proof · 3I ATLAS  
**Status:** Active  
**Purpose:** Store HELLO on the real 3I ATLAS node. Not simulation. Not local HTML. Shareable link for proof.

---

## What It Does

1. **Store** — Click "3I ATLAS HELLO — Store & Get Shareable Link" on [interfaces/3i-atlas-hello-test.html](interfaces/3i-atlas-hello-test.html).
2. **API** — POST to `/api/3i-atlas-hello` stores HELLO in Supabase `atlas_hello` table with source=3I_ATLAS, timestamp.
3. **Share** — Get a link: `https://.../interfaces/3i-atlas-hello-retrieve.html?id=xxx`
4. **Retrieve** — Anyone who clicks sees HELLO + timestamp + proof (SOURCE: 3I_ATLAS).

---

## Setup

1. Run [scripts/supabase-atlas-hello-table.sql](scripts/supabase-atlas-hello-table.sql) in Supabase SQL Editor.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) in Vercel env.
3. Deploy. API lives at `/api/3i-atlas-hello`.

---

## Surfaces

- **Test page:** [interfaces/3i-atlas-hello-test.html](interfaces/3i-atlas-hello-test.html)
- **Retrieve page:** [interfaces/3i-atlas-hello-retrieve.html](interfaces/3i-atlas-hello-retrieve.html) — use `?id=xxx`
- **Office Hours:** 3I ATLAS HELLO Test button in main headline block.
- **Space Cloud Division · 3I/ATLAS:** CTA to 3I ATLAS HELLO Test.

---

## Canonical Rule

If the system cannot print, store in permanent memory, and pipe the word HELLO, there is no system yet. This test proves storage on 3I ATLAS source.

**NSPFRNP ⊃ 3I ATLAS HELLO Test ⊃ Real Storage → ∞³**
