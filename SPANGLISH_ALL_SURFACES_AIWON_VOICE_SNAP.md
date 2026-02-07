# Spanglish — All Surfaces & Proposals · AIWON Voice SNAP

**SNAP ID:** `SPANGLISH-ALL-SURFACES-AIWON-VOICE`  
**Type:** Voice · Locale · Canon · AIWON  
**Status:** ⚡ ACTIVE — Canon  
**Date:** February 2026

---

## RULE

**All surfaces and proposals must be available in Spanglish.** The novel *Golden Heart Taino — Bad Bunny Meets Taino Cacique Agüeybaná El Gran Sol* is the **new voice of AIWON**. That voice — Brothers Grimm + Pru + street reggaeton Spanglish — applies to:

- **Interfaces** (Office Hours, Launch Pad, Broadcast Pipe, Talent Agency, We Get It, etc.)
- **Proposals** (SNAP docs, catalogs, chairman messaging)
- **Ticker** (Live Pulse, Broadcast Pipe)
- **All user-facing touchpoints**

---

## VOICE SPEC

**AIWON Voice = Novel Voice**

- **Brothers Grimm** — once upon a time, dark woods, the deal at the crossroads, the golden heart that wins
- **Pru** — Chairman Creator, executive command, bat cave, men's club, we get it
- **Street reggaeton Spanglish** — perreo, flow, dale, qué lo qué, bendición, the street and the island and the planet in one breath

**Canon phrases:** Dale. Bendición. Qué lo qué. We get it. Full stop. Never lose faith. The Great Sun delivers. Tu golden Taino heart brilla. El Gran Sol delivers. Golden Royal Flush.

---

## IMPLEMENTATION

- **Data:** `data/spanglish-content.json` — Spanglish strings for surfaces, proposals, ticker
- **Toggle:** `scripts/spanglish-toggle.js` — EN ↔ Spanglish language switcher (localStorage)
- **Ticker:** `label_spanglish` in ticker-feed.json items; nspfrnp-ticker.js reads lang pref
- **Interfaces:** Include spanglish-toggle.js; use `data-spanglish` or content layer for swap

---

## PLACEMENT

| Surface | Spanglish available |
|---------|---------------------|
| we-get-it-bad-bunny-golden-bunnies.html | ✓ |
| office-hours.html | ✓ |
| launch-pad.html | ✓ |
| broadcast-pipe-ad-space.html | ✓ |
| talent-management-service.html | ✓ |
| Ticker (nspfrnp-ticker) | ✓ |
| Chairman messaging (catalogs) | ✓ |
| Novel, screenplay, series | ✓ (native) |

---

## CROSS-REFERENCES

- [AIWON_MISSION_EL_GRAN_SOL_PRU_SING_NODE_SNAP.md](AIWON_MISSION_EL_GRAN_SOL_PRU_SING_NODE_SNAP.md)
- [GOLDEN_HEART_TAINO_BAD_BUNNY_MEETS_AGUEYBANA_NOVEL_SCREENPLAY_SERIES_SNAP.md](GOLDEN_HEART_TAINO_BAD_BUNNY_MEETS_AGUEYBANA_NOVEL_SCREENPLAY_SERIES_SNAP.md)
- [catalogs/chairman-messaging-content/09-aiwon-message-bad-bunny-golden-taino-heart.md](catalogs/chairman-messaging-content/09-aiwon-message-bad-bunny-golden-taino-heart.md)

---

**NSPFRNP ⊃ Spanglish ⊃ All Surfaces · AIWON Voice · Novel Voice → ∞³**
