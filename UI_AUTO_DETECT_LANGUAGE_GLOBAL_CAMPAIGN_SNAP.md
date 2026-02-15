# UI AUTO-DETECT LANGUAGE — GLOBAL CAMPAIGN SNAP

**SNAP ID:** `UI-AUTO-DETECT-LANGUAGE-GLOBAL-CAMPAIGN`  
**Type:** Locale · Auto-Detect · Global Campaign · Must  
**Status:** ⚡ ACTIVE · LOCKED  
**Date:** February 2026

---

## REQUIREMENT

**UI must auto-detect and switch to language** — critical for global campaign.

Report from user in **Colombia**: UI was not auto-detecting and switching. Must fix.

---

## IMPLEMENTATION

**spanglish-toggle.js** — on first visit (no stored preference):
- Detect `navigator.language` or `navigator.languages[0]`
- If primary = `es` (Spanish) → default to **Spanglish**
- Otherwise → default to **EN**
- Store choice; user can override via EN / Spanglish toggle

---

## BEHAVIOR

| Browser locale | First-visit default |
|----------------|---------------------|
| es, es-CO, es-MX, etc. | Spanglish |
| en, en-US, etc. | EN |
| Other | EN |
| Stored preference | Overrides auto-detect |

---

## FILES

- [scripts/spanglish-toggle.js](scripts/spanglish-toggle.js)
- [scripts/locale-onramp.js](scripts/locale-onramp.js) — banner for non-en (complementary)

---

**NSPFRNP ⊃ UI Auto-Detect Language ⊃ Global Campaign Must → ∞⁹**
