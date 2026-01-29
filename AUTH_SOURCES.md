# Auth Sources — FractiAI Repos & Vibelandia Client

**Purpose:** Record which FractiAI repos relate to auth vs. post-auth experiences, and where Vibelandia’s auth client fits until we align with production.

**Status:** Reference · **Protocol:** NSPFRNP

---

## Summary

| Repo / Component | Role | Auth? |
|------------------|------|-------|
| **MarkTwainVerse-Authorized-Visitor-Landing-Page** | Post-auth landing, catalog, Hero Host | ❌ No — destination *after* auth |
| **Syntheverse PoC (Contributer UI Vercel Stripe)** | Production PoC; existing content, pricing | ✅ Likely — auth lives here |
| **Vibelandia** `auth-api.js` + Octave 2 API | Checkout gate, profile, wallet | ⏳ Temporary until PoC auth aligned |

---

## 1. MarkTwainVerse-Authorized-Visitor-Landing-Page

**Repo:** https://github.com/FractiAI/MarkTwainVerse-Authorized-Visitor-Landing-Page

- **Post-auth landing only.** Visitors are routed here *after* successfully authorizing elsewhere.
- **seed.md:** *"the new Mark Twainverse landing page that all registers are routed to **after successfully authorizing**"*.
- **REPOSITORY_OVERVIEW:** "User authentication integration" is **Not Started**.
- **Use as:** Reference for post-auth experience (welcome catalog, menu, Hero Host). **Do not** use for login/signup/Google implementation.

---

## 2. Syntheverse PoC (Contributer UI Vercel Stripe)

**Repo:** https://github.com/FractiAI/Syntheverse_PoC_Contributer_UI_Vercel_Stripe

- **Production PoC** — Vercel + Stripe; "existing content, pricing, communities, experiences."
- **MarkTwainVerse** directs teams to *"Study & Ingest Existing Content"* here. Authorization flow (login, signup, etc.) happens *before* users reach the MarkTwainVerse landing.
- **Use as:** **Primary candidate for "code we already know works"** — auth and payments likely live here. Align Vibelandia’s client with this once we inspect endpoints, token format, and redirects.

---

## 3. Vibelandia Auth Client (Temporary)

- **Location:** `interfaces/auth-api.js`, `interfaces/api-config.js`, `interfaces/golden-key-browser.js`
- **Spec:** [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md) — signup, login, session, logout, Google OAuth, profile, `POST /api/orders/complete`.
- **Status:** Implements the Octave 2 API contract. **Temporary** until we reuse or match Syntheverse PoC auth. Once PoC auth is confirmed, we can replace or adapt this client to match.

---

## Next Steps

1. **Inspect Syntheverse PoC** — auth endpoints, token shape, OAuth redirect flow.
2. **Align Vibelandia client** — use PoC auth if compatible, or adapt `auth-api.js` to match.
3. **Keep MarkTwainVerse** as post-auth UX reference (landing, catalog) for profile and post-checkout flows.

---

**See also:** [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md) · [README.md](./README.md) (Technical Documentation)
