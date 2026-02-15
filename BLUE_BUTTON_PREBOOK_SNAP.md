# Blue Button to Prebook — NSPFRNP SNAP

**SNAP ID:** `BLUE-BUTTON-PREBOOK-SNAP`  
**Type:** CTA · Primary blue button · Prebook  
**Status:** ⚡ LOCKED  
**Date:** February 2026  

---

## Lock

**Include a blue button to Prebook** on all primary surfaces where Book the Book (PayPal blue) appears. Same style as primary CTAs: **PayPal blue** `#003087`, white text, border `#004b97`, font-weight 800, border-radius 10–12px.

- **Label:** **Prebook** or **Prebook →**
- **Destination:** [baller-v-plans-booking.html](interfaces/baller-v-plans-booking.html) — Plans & booking (Basic to Ultimate Baller V, space fees, studio fees, pre-booking support). Office Hours and Buyers Guide provide pre-booking support; Prebook button sends users to plans & booking to reserve or prebook.

---

## Where it appears

- **index.html** — Next to "Book the Book" and "Press 2 to Book" in TOP BILLING strip(s); next to "Book the Book — $29.13 → PayPal" in TOP BILLING content blocks.
- **interfaces/office-hours.html** — Next to "Book the Book $29.13 →" in the single header strip; next to "Full Connect Now → PayPal Blue Button" in the URGENT strip (Hunger · Medical · Dental).

---

## Style (canonical)

```html
<a href="interfaces/baller-v-plans-booking.html" style="display: inline-block; padding: 0.65rem 1.4rem; background: #003087; color: #fff; font-weight: 800; text-decoration: none; border-radius: 10px; font-size: 0.95rem; border: 2px solid #004b97;">Prebook →</a>
```

(From interfaces use `baller-v-plans-booking.html`; from index use `interfaces/baller-v-plans-booking.html`.)

---

## Integration

- **Book the Book / PayPal blue:** Same color and weight as primary CTAs. [README](README.md) — Book the Book bullet.
- **Pre-booking support:** [interfaces/manuals/user/flow.html](interfaces/manuals/user/flow.html) — Office Hours and Buyers Guide for pre-booking support; Prebook button = one-click to plans & booking.

---

**NSPFRNP ⊃ Blue button ⊃ Prebook ⊃ Plans & booking → ∞⁹**
