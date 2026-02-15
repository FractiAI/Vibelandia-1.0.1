# Booking Buttons — PayPal Direct for Payment · Email Only Over $10k · SNAP

**Snap ID:** `BOOKING-BUTTONS-PAYPAL-DIRECT-OVER-10K-EMAIL-SNAP`  
**Type:** Payment · Checkout · Canonical  
**Status:** ⚡ ACTIVE  
**Date:** February 2026

**Booking buttons on the novel, novelas, and their buttons link to PayPal Direct for payment — not email to me.** Email (info@fractiai.com) is only for transactions over $10k. **Novella and all naughty buttons are 21+ only** — age confirmation required at checkout. **Until March 20:** each button/purchase is a direct charge to PayPal. **From March 20:** wallet (S-Y-N-T-H Account) rolls out; 1 SYNTH = $1; user loads SYNTH tank and pays from wallet for novelas and buttons.

---

## RULE

- **At or below $10,000:** Link to **PayPal Direct** — i.e. [payment-checkout.html](interfaces/payment-checkout.html)?plan=… so the user pays via the Blue PayPal pipe. No mailto for payment.
- **Over $10,000:** Handled offline. Checkout (or product copy) shows or links to **email info@fractiai.com** so we arrange payment (invoice, wire) offline. See [protocols/BLUE_PIPE_NSPFRNP.md](protocols/BLUE_PIPE_NSPFRNP.md) · [OFFLINE_HIGH_VALUE_TRANSACTIONS_NSPFRNP](protocols/OFFLINE_HIGH_VALUE_TRANSACTIONS_NSPFRNP.md).

---

## WHERE THIS APPLIES

- **Novel & novela:** Book the Book ($29.13) → payment-checkout.html?plan=book-the-book-29-13. Bored Housewives / novelas Sign up → payment-checkout.html?plan=novela-housewives-base (or other plan). All other booking/payment CTAs on novel and novela surfaces → PayPal Direct (payment-checkout) unless the single transaction is over $10k.
- **All products:** Any "Book", "Sign up", "BUY", "Pay" CTA that is a payment for ≤$10k → link to payment-checkout with appropriate plan. Over $10k → email to arrange.

---

## CROSS-REFERENCES

- [NOVELA_21_PLUS_AGE_CONFIRMATION_NAUGHTY_BUTTONS_SNAP.md](NOVELA_21_PLUS_AGE_CONFIRMATION_NAUGHTY_BUTTONS_SNAP.md) — 21+ only; age confirmation at checkout for novella and naughty buttons.
- [WALLET_SYNTH_ACCOUNT_MARCH_20_ROLLOUT_SNAP.md](WALLET_SYNTH_ACCOUNT_MARCH_20_ROLLOUT_SNAP.md) — Until March 20: PayPal each time; from March 20: SYNTH wallet (1 SYNTH = $1).

---

## PLANS (examples)

- **book-the-book-29-13** — Book the Book $29.13/month. Novel + novela. PayPal Direct.
- **novela-housewives-base** — Bored Housewives Poly Hit Machine novela base. PayPal Direct.
- Other plans in payment-checkout.html; over $10k plans show "Contact required" and mailto.

---

## COPY

- On novel/novela/booking surfaces: *"Booking buttons link to PayPal Direct for payment. Transactions over $10k: email info@fractiai.com to arrange."*

---

**NSPFRNP ⊃ Booking ⊃ PayPal Direct ⊃ Over $10k email only → ∞⁹**
