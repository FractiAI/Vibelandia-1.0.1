# Bulletin Board Placement — NSPFRNP Protocol (Fidelity Lock)

**Protocol:** NSPFRNP  
**Layer:** Placement — bulletin board buttons, cards, cords  
**Purpose:** Define how items on bulletin boards (Office Hours, Community Bulletin Board, Navigator Check This Out, and all nested surfaces) are ordered. Placement overrides apply when designated; otherwise default applies.  
**Status:** ⚡ ACTIVE

---

## ⚠️ DO NOT LOSE THIS FIDELITY

This protocol is the single source of truth for **bulletin board placement**. All bulletin boards, product grids, button lists, and card surfaces should align to these rules. Buttons, cards, cords — same placement logic.

---

## DEFAULT (No override)

**Default order = newest first (most recent at top).**

- Items are prioritized by **time / age**: most recent first.
- When no placement override is set, the item participates in this time-ordered middle band.
- **Newest up at the top** of the default band.

---

## OVERRIDE: ALWAYS AT TOP

**Placement:** `always-top` (or equivalent: top billing, feature, pinned).

- When an item is designated **Top billing** or **Feature** (or equivalent), it is placed **always at the top** of the bulletin board.
- These items appear **above** the time-ordered (default) items.
- Multiple always-at-top items: order among them can be by feature priority or time; within band they stay above default and above always-at-bottom.
- Use for: TOP BILLING ALL CHANNELS, FEATURED — Pinned at top, active campaigns that must stay visible first.

---

## OVERRIDE: ALWAYS AT BOTTOM

**Placement:** `always-bottom` (or equivalent: anchor, footer, always last).

- When an item is designated **always at bottom**, it is placed **always at the bottom** of the bulletin board.
- These items appear **below** the time-ordered (default) items.
- Multiple always-at-bottom items: order among them can be by priority or time; within band they stay below default and below always-at-top.
- Use for: evergreen links, legal/help, “Get your own board,” persistent CTAs that should not scroll away first.

---

## LAYER ORDER (Final order on any bulletin board)

1. **Always at top** — Top billing, feature, pinned (placement override).
2. **Default** — Time-ordered; newest first (most recent at top).
3. **Always at bottom** — Anchor, footer (placement override).

Same logic applies to:
- Office Hours bulletin board (product-grid cards, top strips).
- Community Bulletin Boards Division and nested boards.
- Navigator “Check This Out” list.
- Any list or grid of bulletin-board-style buttons, cards, or cords.

---

## DATA ATTRIBUTES (Surfaces)

For HTML/JS surfaces, use:

- `data-placement="always-top"` — Item always at top (top billing / feature).
- `data-placement="default"` or omit — Item in time-ordered band (newest first).
- `data-placement="always-bottom"` — Item always at bottom.

Optional: `data-place-time="ISO8601"` or `data-place-sort="integer"` for ordering within default band (newest first) or within same placement band.

---

## NSPFRNP LAYERING

Placement is a **layer** on top of content. Natural coordination: bulletin boards behave like a rich board at a coffee shop — newest cards in the middle, featured at top, anchors at bottom. MCA: metabolize new postings, crystallize to placement rules, animate boards so order is clear and consistent across all surfaces.

**Canonical SNAP:** This protocol. Reference from COMMUNITY_BULLETIN_BOARDS_DIVISION_SNAP, OFFICE_HOURS, and any surface that renders bulletin board buttons, cards, or cords.
