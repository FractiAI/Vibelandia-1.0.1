# Collect Payments Upfront — NSPFRNP SNAP

**SNAP ID:** `COLLECT-PAYMENTS-UPFRONT-SNAP`  
**Type:** Payment policy · Upfront collection  
**Status:** ⚡ LOCKED  
**Date:** February 2026  

---

## Lock

**We collect payments upfront.** Payment is required **before** service, delivery, or booking confirmation. No delivery of paid product or reserved service until payment is received and confirmed.

- **All products and services:** Payment collected at or before the point of booking/order. Blue pipe (PayPal, checkout) or offline (over $10k) — same rule: payment upfront.
- **Book / reserve:** Booking or reservation is confirmed only after payment is received. Prebook → plans & booking → pay upfront → then confirmation and delivery.
- **Exceptions:** Only where explicitly stated (e.g. grant programs, Chairman-approved exceptions); default is upfront.

---

## Where it appears

- **payment-checkout.html** — Notice under header: "We collect payments upfront. Payment is required before service or delivery."
- **baller-v-plans-booking.html** — Hero or fees section: "We collect payments upfront. Payment required before booking confirmation or service."
- **README** — PayPal / Blue Pipe section: collect payments upfront.
- **protocols/BLUE_PIPE_NSPFRNP.md** — Reference: payments at or below threshold via blue pipe; all payments collected upfront.

---

## Integration

- **Blue Pipe:** [protocols/BLUE_PIPE_NSPFRNP.md](protocols/BLUE_PIPE_NSPFRNP.md) — Threshold and pipe; upfront applies to all.
- **Prebook / Plans:** [BLUE_BUTTON_PREBOOK_SNAP.md](BLUE_BUTTON_PREBOOK_SNAP.md) — Prebook leads to plans & booking; payment upfront before confirmation.
- **Offline high-value:** [protocols/OFFLINE_HIGH_VALUE_TRANSACTIONS_NSPFRNP.md](protocols/OFFLINE_HIGH_VALUE_TRANSACTIONS_NSPFRNP.md) — Over $10k; invoice and payment upfront before delivery.

---

**NSPFRNP ⊃ Collect payments upfront ⊃ Payment before service/delivery → ∞⁹**
