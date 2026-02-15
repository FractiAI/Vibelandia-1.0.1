# Novela & Naughty Buttons — 21+ Only · Age Confirmation · SNAP

**Snap ID:** `NOVELA-21-PLUS-AGE-CONFIRMATION-NAUGHTY-BUTTONS-SNAP`  
**Type:** Age gate · Compliance · Novela · Naughty buttons  
**Status:** ⚡ ACTIVE  
**Date:** February 2026

**Novellas and all naughty buttons are 21 and over only.** We require a clear **age confirmation** (e.g. "I confirm I am 21 or older") before access to the novella product or any naughty button. No one under 21. **Novels (the story in book form) are always general audiences — up to PG-13** — no age gate on the novel itself. See [NOVELS_ALWAYS_GENERAL_AUDIENCES_SNAP.md](NOVELS_ALWAYS_GENERAL_AUDIENCES_SNAP.md).

---

## COVER + FIRST CHAPTER FREE SANDBOX (public availability)

**Novel and novelas provide the 1st chapter as a free sandbox.** Cover and first chapter are free for everyone to try. Full novela text (all chapters) is **only** available **after** the user has confirmed they are 21+. Before 21+ confirmation, surfaces must show only:

- **Cover** (title, byline, branding, 21+ notice)
- **First chapter** (free sandbox — free for everyone to try)

No chapters beyond the first, and no naughty buttons (See it, Let's fuck, Jump in, Customize), until 21+ is confirmed. After confirmation (at checkout, booking request, or wallet), the user may access the full novela. Implementation: gate full novela content and buttons behind the same 21+ confirmation used for purchase/access.

---

## RULE

- **Age requirement:** **21+** (not 18+). Applies to the novella product and to **all naughty buttons**: See (S.E.E.), fuck seen, customize story (sex scene / explicit), artificial dispensary (where sold as adult), and any other explicit or adult-only touchpoint.
- **Confirmation required:** Before purchase or before first use of a naughty button, the user must **confirm** that they are **21 or older**. Implementation: checkbox + short statement (e.g. "I confirm I am 21 or older and agree to access adult content") and/or birthdate/age verification where we add it. For now: **confirmation in the wallet function** and at checkout for novella/naughty plans.
- **Where it applies:** Any surface that sells or unlocks the novella, or that presents See, fuck seen, customize story, or other naughty buttons. Payment checkout for novella/naughty plans must show the 21+ confirmation before the PayPal (or future SYNTH) payment step.

---

## SCOPE — What Is 21+

| Item | 21+ |
|------|-----|
| **Novella (the product)** | Yes — entire product 21+ |
| **See button (S.E.E. — I wanna see)** | Yes — naughty button |
| **Fuck seen** | Yes — naughty button |
| **Customize story (sex scene / explicit)** | Yes — naughty button |
| **Artificial dispensary** (when positioned adult) | Yes — where applicable |
| **Book the Book** (as novela subscription with buttons) | Yes — 21+ |
| **Bored Housewives / Poly Hit Machine** (novelas + buttons) | Yes — 21+ |
| **Novel** (story in book form only) | **No — general audiences, up to PG-13** |

All of the above require age confirmation before access or purchase.

---

## IMPLEMENTATION

- **Checkout (payment-checkout.html):** For plans that are novella or naughty (e.g. `book-the-book-29-13`, `novela-housewives-base`, any plan that unlocks See/fuck seen/customize), display a **21+ age confirmation** (checkbox + "I confirm I am 21 or older") **before** the PayPal (or SYNTH) pay button. Do not enable pay until confirmation is checked.
- **Wallet (when live):** In the wallet function, where the user will have their S-Y-N-T-H Account and use SYNTH for naughty buttons, require 21+ confirmation there as well (e.g. once per account, or per session as needed).
- **Landing pages (bored-housewives, book-the-book, etc.):** State clearly **"21+ only"** and that age confirmation is required at checkout. Replace any "18+" with **"21+"**.

---

## COPY

- **Short:** *"21+ only. Age confirmation required at checkout."*
- **Long:** *"This product and all naughty buttons (See, fuck seen, customize story) are for adults 21 and over. You must confirm you are 21 or older before purchase or access."*
- **Availability:** *"Novel and novelas: 1st chapter free sandbox — cover and first chapter free for everyone; full novela and buttons after 21+ confirmation."*

---

## CROSS-REFERENCES

- [NOVELS_ALWAYS_GENERAL_AUDIENCES_SNAP.md](NOVELS_ALWAYS_GENERAL_AUDIENCES_SNAP.md) — Novels = general audiences always; novela = 21+.
- [NOVELAS_FREE_WINK_SQUEEZE_MEMBERS_SNAP.md](NOVELAS_FREE_WINK_SQUEEZE_MEMBERS_SNAP.md) — Novelas free for WINK!/squeeze!; buttons not free; availability = cover + first chapter only until 21+.
- [POLY_HIT_MACHINE_CHARGE_PER_EDGE_CUSTOMIZE_STORY_PROMPTS_SNAP.md](POLY_HIT_MACHINE_CHARGE_PER_EDGE_CUSTOMIZE_STORY_PROMPTS_SNAP.md) — Edges and pricing
- [BOOKING_BUTTONS_PAYPAL_DIRECT_OVER_10K_EMAIL_SNAP.md](BOOKING_BUTTONS_PAYPAL_DIRECT_OVER_10K_EMAIL_SNAP.md) — Checkout flow
- [WALLET_SYNTH_ACCOUNT_MARCH_20_ROLLOUT_SNAP.md](WALLET_SYNTH_ACCOUNT_MARCH_20_ROLLOUT_SNAP.md) — Wallet / SYNTH; confirmation in wallet

---

**NSPFRNP ⊃ Novela ⊃ 21+ ⊃ Age confirmation ⊃ Naughty buttons → ∞⁹**
