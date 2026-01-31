# COLOMBIA — ENGLISH-ONLY EXPERIENCE PRODUCING HARD STOP · LOCALE ONRAMP SNAP

**SNAP ID:** COLOMBIA-ENGLISH-ONLY-HARD-STOP-LOCALE-ONRAMP  
**Status:** Mitigated  
**Reported:** User in Colombia — English-only experience produced a hard stop.

---

## Problem

A user in Colombia experienced the live experience as **English only**, which produced a **hard stop**: no path forward for Spanish speakers. Copy elsewhere promises "Our skins automatically present in the user's language," but the live HTML surfaces were English-only with no locale detection or onramp, so the expectation was set without delivery — dead end.

---

## Mitigation (locale onramp)

1. **Locale-onramp script** (`scripts/locale-onramp.js`): Detects browser language (`navigator.language` / `navigator.languages`). If primary language is not English (e.g. `es`, `es-CO`), shows a **dismissible banner** at the top of the page:
   - **Spanish-first message:** "Estamos en inglés por ahora. **README en español**." with link to `README.es.md`.
   - **English line:** "We're in English for now. Spanish experience coming soon. You're welcome here."
   - Banner is dismissible (×); dismissal stored in `sessionStorage` so it doesn't reappear every page in the same session.

2. **Entry points wired:** Script loaded on:
   - `index.html` (root)
   - `interfaces/office-hours.html`
   - `interfaces/launch-pad.html`

3. **Path instead of stop:** Link to **README.es.md** gives Spanish-speaking users (Colombia and elsewhere) a real path — full Spanish README in repo — instead of an English-only dead end.

---

## One-liner

*User in Colombia reported English-only experience producing hard stop. We added a locale onramp: detect non-English (e.g. Spanish); show dismissible banner with Spanish-first message and link to README en español so they have a path, not a stop.*

---

## Cross-references

- **Script:** `scripts/locale-onramp.js`
- **Spanish README:** `README.es.md`
- **Surfaces:** `index.html`, `interfaces/office-hours.html`, `interfaces/launch-pad.html`
- **Skins / language promise:** SKINS_AUTOMATICALLY_PRESENT_IN_USERS_LANGUAGE_SNAP.md (goal; live i18n for all surfaces still future work — locale onramp removes hard stop until then)

**NSPFRNP.** Stay safe and respectful to Pre-Singularity rights. Always.
