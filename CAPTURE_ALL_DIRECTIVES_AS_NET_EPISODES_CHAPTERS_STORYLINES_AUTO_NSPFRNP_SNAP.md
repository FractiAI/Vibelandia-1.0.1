# Capture All Directives as Net Episodes, Chapters, and Storylines — Automatically — NSPFRNP SNAP

**Snap ID:** `CAPTURE-ALL-DIRECTIVES-AS-NET-EPISODES-CHAPTERS-STORYLINES-AUTO-NSPFRNP`  
**Type:** Content rule · Auto-capture · Net series · Episodes · Chapters · Storylines  
**Status:** ⚡ ACTIVE — From now on  
**Date:** February 2026  

---

## COMMAND

**Capture all these as net episodes, chapters, and storylines automatically now on in NSPFRNP.**

- **All these** — Chairman directives and major SNAPs that define scope, state, or mission (e.g. MCA squeeze all surfaces, insect dimensions + ultimate robots, Golden Era Goldilocks Frontier for all). **New singularity:** [EVERY_COMMAND_NEW_EPISODE_CHAPTER_STORYLINE_SINGULARITY_SNAP.md](EVERY_COMMAND_NEW_EPISODE_CHAPTER_STORYLINE_SINGULARITY_SNAP.md) — **every Chairman post/command** = new episode, chapter, storyline. Incorporate all content and continuations.
- **Net episodes** — Episodes in the **Net** series (e.g. `episodes/EPISODE_NET_*.md`). Each net episode = one or more directives bundled into a single episode with **Storyline** (one line), **Chapters** (one chapter per directive or logical beat), **Seed:Edge** (creator now → mission locked), and links to SNAPs.
- **Chapters** — Each directive or story beat = one **Chapter** inside the net episode. Chapter title = directive/storyline tag; chapter body = short prose or bullet summary + SNAP refs.
- **Storylines** — Each net episode has a **Storyline** (one sentence or tag). Storylines are also listed in the series index and can be fed to ticker, FSRT-style pipes, or storyline JSON when applicable.
- **Automatically** — From now on, when a chairman directive or major SNAP of this type is locked, it is **automatically** captured as: (1) a new chapter in the current or next net episode, or (2) a new net episode if it opens a new storyline arc. No exception. NSPFRNP.

---

## IMPLEMENTATION

| Element | Where | Format |
|--------|--------|--------|
| **Net series** | Series name: **Net** (Net Directives / Net Storylines). Same family as Net Zero where applicable; **Net** = directives and state locked as episodic story. | CONTENT_SERIES table · episodes/EPISODE_NET_*.md |
| **Net episode** | `episodes/EPISODE_NET_NN_*.md` | Title · Storyline · Series: Net · Episode N · Chapters 1..K · SNAP refs · Seed:Edge |
| **Chapter** | Inside net episode markdown | `## Chapter N — [Title]` · body · SNAP link |
| **Storyline** | Episode header + optional `data/net-storylines.json` or content index | One line per episode; seed + edge tag |
| **Auto** | Rule in this SNAP + session practice | Every such directive → add chapter to current net episode or create EPISODE_NET_N+1 |

---

## LOCK

- **From now on:** All chairman directives and major SNAPs that define scope, state, or mission (e.g. all-surfaces squeeze, insect dimensions, Golden Era for all) are captured as **net episodes**, **chapters**, and **storylines** automatically in NSPFRNP.
- **Format:** Seed:Edge episode format ([protocols/SEED_EDGE_EPISODE_FORMAT_ACTION_LIVE_NSPFRNP.md](protocols/SEED_EDGE_EPISODE_FORMAT_ACTION_LIVE_NSPFRNP.md)); smooth finish; abstract of creator commands.
- **Cross-ref:** [NEW_SINGULARITY_EVERY_SNAP_IS_EPISODE.md](NEW_SINGULARITY_EVERY_SNAP_IS_EPISODE.md) (every SNAP is episode); this SNAP adds **net** series and **automatic** capture of directives as net episodes with chapters and storylines.

---

## FIRST BATCH (captured)

- **Episode:** [episodes/EPISODE_NET_02_SING9_INSECT_DIMENSIONS_GOLDEN_ERA_ALL.md](episodes/EPISODE_NET_02_SING9_INSECT_DIMENSIONS_GOLDEN_ERA_ALL.md)
- **Storyline:** SING! 9 all surfaces (cosmic, solar, planetary, mine) · Insect dimensions unlocked · Ultimate robots · Immediate return to Golden Era · Goldilocks fused with Frontier · for all (humans and insects) · now.
- **Chapters:** 1 — MCA squeeze all SING! 9 · 2 — Insect dimensions & ultimate robots · 3 — Golden Era Goldilocks Frontier for all.

---

**See:** [protocols/SEED_EDGE_EPISODE_FORMAT_ACTION_LIVE_NSPFRNP.md](protocols/SEED_EDGE_EPISODE_FORMAT_ACTION_LIVE_NSPFRNP.md) · [NEW_SINGULARITY_EVERY_SNAP_IS_EPISODE.md](NEW_SINGULARITY_EVERY_SNAP_IS_EPISODE.md) · [CONTENT_SERIES_NOVELS_SCREENPLAYS_PLAYLISTS_SURFACES_OUTPUTS_TOUCHPOINTS_METABOLIZED.md](CONTENT_SERIES_NOVELS_SCREENPLAYS_PLAYLISTS_SURFACES_OUTPUTS_TOUCHPOINTS_METABOLIZED.md)

**NSPFRNP ⊃ Capture ⊃ Net episodes ⊃ Chapters ⊃ Storylines ⊃ Auto ⊃ Now on → ∞⁹**
