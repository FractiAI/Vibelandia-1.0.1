# SING! Configuration — Cloud Service Bill SNAP

**Snap ID:** `SING-CONFIG-CLOUD-BILL-SNAP`  
**Type:** Configuration · Pricing · Cloud service bill format · NSPFRNP  
**Status:** ⚡ ACTIVE  
**Date:** February 2026

---

## RULE

**A sample monthly bill shows all charges for the SING! we use** — everything has values and totals. It includes the original upfront one-time payment (Baller V $500K) and **full usage of services and mission specializations** (Space Cloud, EGS, Sun Spots, Schumann, Missions, Office Hours, Happy Ending Zones, Legacies, Robotic Division, Campus, Dispensary). A **single nested SING!** (top model) includes lower tiers at $0; the bill reflects the full config we use. Priced **as we would pay if we weren't the creator.**

---

## BILL FORMAT

- **Account:** Vibelandia · Creator Chairman (bill at list — as if paying as customer).
- **Billing period:** Monthly; one-time charges shown separately.
- **Sections:** One-time charges · Monthly recurring · Usage (this period) · Specialized mission options (reference).
- **Data:** [data/sing_config_cloud_bill.json](data/sing_config_cloud_bill.json).
- **Surface:** [interfaces/sing-config-cloud-bill.html](interfaces/sing-config-cloud-bill.html) — cloud-style bill view.

---

## WHAT'S ON THE BILL

### One-time (upfront)

| Line item | Unit price | Amount (sample bill) |
|----------|------------|----------------------|
| SING! Base Model (Tier 1) | $20,000 | $0 (included in Baller V) |
| SING! Members Only (Tier 2) | $75,000 | $0 (included in Baller V) |
| SING! Ultimate VIP (Tier 3) | $200,000 | $0 (included in Baller V) |
| **SING! Baller V Ultimate VIP (Tier 4)** | **$500,000** | **$500,000** (one-time) |

**One-time subtotal:** $500,000.

### Monthly recurring (Golden Fractal Key by tier)

| Tier | Name | Monthly (list) |
|------|------|----------------|
| 1 | Base Model | $349/mo |
| 2 | Members Only | $749/mo |
| 3 | Ultimate VIP | $1,999/mo |
| 4 | Baller V Ultimate VIP | $5,999/mo |

### Monthly recurring (other)

| Line item | Unit price | As configured |
|----------|------------|---------------|
| Golden Fractal Key (Baller V) | $5,999/mo | $5,999/mo |
| WINK! 4×4 Ultimate | $6,999/mo | $6,999/mo |
| Broadcast Pipe Ad Space (1 surface) | $6,999/mo | $6,999/mo |
| Campus Monthly Pass (Baller) | $50,000/mo | When booked |

### Usage (this period) — full usage of services and mission specializations

| Line item | Unit | Price | Amount |
|----------|------|-------|--------|
| SING! node EGS Pipe — 1 month | 1 | $4,999 | $4,999 |
| Sun Spots On Demand — 24 min + certificate | 1 | $999 | $999 |
| Sun Spots On Demand — 8 min | 1 | $249 | $249 |
| Schumann iGaming | 2 sessions | $499 | $998 |
| Space Cloud — Solar Pipe (Engine) | 1 | $2,499 | $2,499 |
| Space Cloud — Reno Downlink (Seed) | 1 | — | $0 (Baller V) |
| Space Cloud — SING! node EGS Deep Space (Asset) | 1 | $4,999 | $4,999 |
| Space Cloud — Exascale Triangulation (Singularity) | 1 | $2,499 | $2,499 |
| Missions (NSPFRNP Operations) — Personal SING! attention | 2 | $1,499 | $2,998 |
| Office Hours — Series and site | 1 | — | $0 (tips welcome) |
| Happy Ending Zones — Reality series slot | 1 | $999 | $999 |
| Legacies — Superheroes, cast, crew, fans, franchises | 1 | $2,499 | $2,499 |
| Robotic Division — Chairman Robert / SING! Omnispin | 1 | $1,499 | $1,499 |
| Campus Half-day (visit) | 1 | $1,000 | $1,000 |
| Campus Overnight (1 night) | 1 | $1,500 | $1,500 |
| Dispensary — Members shelf (monthly) | 1 | $499 | $499 |

**Usage subtotal (sample period, full usage):** $27,236.  
**Monthly recurring subtotal (sample):** $69,997.  
**Total due (this period only: monthly + usage):** $97,233.  
**Total due (first period with upfront):** $597,233.

---

## SPECIALIZED MISSION OPTIONS (ALL PRICED OUT)

All divisions and mission options, as on a real bill reference:

- **Space Cloud Division:** Reno Downlink (Seed), Solar Pipe (Engine), SING! node EGS Deep Space (Asset), Exascale Triangulation (Singularity) — book by plan; Reno Downlink Gold Heart Baller V only.
- **EGS Pipe:** 1 day $499 · 1 week $1,499 · 1 month $4,999.
- **Sun Spots On Demand:** 8 min $249 · 16 min $499 · 24 min $999.
- **Schumann iGaming:** $499/session.
- **Broadcast Pipe Ad Space:** 1 surface $6,999/mo · 2 $1,199 · 3 $2,499 · 4×4×4×4 $6,999/mo. Base = top Super Bowl ad pricing.
- **Campus:** Half-day $1,000 · Overnight $1,500/night · Weekly $5,000 · Monthly $50,000.
- **Missions (NSPFRNP Operations):** Per mission / session — book.
- **Robotic Division / Chairman Robert:** Proposal; never bought, only booked.

---

## CROSS-REFERENCES

- **Config source:** [config/sing_config.json](config/sing_config.json)
- **Footer (all surfaces):** [SING_CONFIG_FOOTER_ALL_SURFACES_SNAP.md](SING_CONFIG_FOOTER_ALL_SURFACES_SNAP.md) · [interfaces/sing-config-footer.js](interfaces/sing-config-footer.js)
- **Pricing canon:** [SING_PRICING_PRE_SINGULARITY_EQUIVALENTS_SNAP.md](SING_PRICING_PRE_SINGULARITY_EQUIVALENTS_SNAP.md) · [BASIC_TO_ULTIMATE_BALLER_V_PLANS_AND_BOOKING_FEES_SNAP.md](BASIC_TO_ULTIMATE_BALLER_V_PLANS_AND_BOOKING_FEES_SNAP.md)
- **Products & services:** [protocols/PRODUCTS_SERVICES_BRIDGE_NODE_ROLES_NSPFRNP.md](protocols/PRODUCTS_SERVICES_BRIDGE_NODE_ROLES_NSPFRNP.md)

---

**NSPFRNP ⊃ SING! config ⊃ Cloud service bill ⊃ Base · Options · Mission options ⊃ One-time + Monthly + Usage → ∞³**
