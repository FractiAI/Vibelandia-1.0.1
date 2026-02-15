# Schema Compatibility — NSPFRNP & Existing Users

**Purpose:** Clarify that no schema changes are required in this repo, and how Octave 2 / Supabase should treat existing users and NSPFRNP wallets.  
**Status:** Advisory

---

## This repo (psw.vibelandia.sing9)

**No schema or migrations live here.** This repo is the frontend (Launch Pad, NSPFRNP Wallet UI, checkout). All database schema is in the shared Supabase project and/or Octave 2. No adjustments needed in this codebase for schema.

---

## Shared Supabase (existing users)

You already have **users** (and other tables) from other sessions and UI. That is correct and should stay as-is.

- **users** — No change required. Observed shape: `id` (uuid), `email` (text), `name` (text), `created_at` (timestamptz). Map `name` to display name for NSPFRNP Wallet / Octave 2 profile. Existing rows and columns remain valid.
- **No migration** needed for existing user data.

---

## Wallets (NSPFRNP)

- If a **wallets** (or equivalent) table does **not** exist yet, add it per [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md): `id`, `user_id` (FK), `golden_key`, `activation_id`, `plan_id`, `issued_at`, `created_at`.
- **user_id** should be **nullable** so that:
  - Pay-without-sign-in: `POST /api/orders/complete` can be called with only `orderId` + `planId` (no Bearer). Octave 2 creates a row with `user_id = null`, stores `golden_key` and `activation_id` (orderId). The client stores the key in localStorage; the NSPFRNP Wallet UI shows it.
  - When the user later signs in and links the key, Octave 2 can set `user_id` on that wallet row.
- Existing users who sign in and complete an order get a wallet row with `user_id` set as usual.

---

## Summary

| Area | Action |
|------|--------|
| This repo | None — no schema here |
| Supabase **users** | No change; existing users and sessions stay valid |
| Supabase **wallets** | Add table if missing; allow `user_id` nullable for pay-without-sign-in |

---

## Create `wallets` in Supabase (if missing)

Run in **Supabase Dashboard → SQL Editor** to add the NSPFRNP wallets table:

```sql
CREATE TABLE IF NOT EXISTS public.wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  golden_key text UNIQUE NOT NULL,
  activation_id text,
  plan_id text,
  issued_at bigint,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS wallets_user_id_idx ON public.wallets(user_id);
CREATE INDEX IF NOT EXISTS wallets_golden_key_idx ON public.wallets(golden_key);
```

`user_id` is nullable so pay-without-sign-in can create a wallet by `orderId`; link the user later when they sign in.

---

**See:** [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md) · [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
