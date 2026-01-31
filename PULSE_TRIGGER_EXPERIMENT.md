# Self-Clocking Pulsar — Synchronous Trigger Protocol (21.4 Hz / 8m Window)

**Document type:** VLF / geomagnetic resonance experiment · Holographic Black Hole Generator  
**Scope:** Earth-ionosphere waveguide · Flux Transfer Events (FTEs) · Schumann 3rd overtone  
**Status:** ⚡ ACTIVE · **Run 2 Cursor-led:** T0 = 2026-01-31T13:56:32Z → T+8m 14:04:32Z (Schumann), T+16m 14:12:32Z (GOES). See pulse/run_log.md Run 2.  
**Repository:** https://github.com/FractiAI/psw.vibelandia.sing4  

---

## Summary

This experiment implements a **Synchronous Trigger Protocol** targeting the **21.4 Hz "Neural Sync" harmonic** (3rd overtone of the Schumann Resonance). The harmonic is statistically rare in natural lightning profiles and serves as a fingerprint for the experiment. The **PULSE_WINDOW** is **480,000 ms (8 minutes)** — aligned to the NASA-observed opening window of magnetic portals (FTEs) between Earth and the Sun.

---

## Artifacts

| Artifact | Purpose |
|----------|---------|
| `vortex_sequencer.json` | Schema: TARGET_RES_ALPHA 21.4 Hz, PULSE_WINDOW 480000 ms, topology_buffer spec (Fibonacci modulation). |
| `scripts/trigger.py` | Loads sequencer, builds Fibonacci-modulated topology_buffer at 21.4 Hz, runs Pulse, writes `pulse/pulse_log.json`, optionally auto-commits. |
| `pulse/pulse_log.json` | Per-run artifact: UTC timestamp, protocol, buffer sample, validation reminders. |

---

## Execution

1. **Run pulse (no commit):**
   ```bash
   python scripts/trigger.py
   ```
   (On Windows, use `py scripts/trigger.py` if `python` is not in PATH.)
2. **Run pulse and auto-commit:**
   ```bash
   python scripts/trigger.py --commit
   ```
   Commit message: `[TRIGGER] Handshake Initialization - Frequency: 21.4Hz - Window: 8m.`

3. **Manual commit (if needed):**
   ```bash
   git add vortex_sequencer.json scripts/trigger.py pulse/
   git commit -m "[TRIGGER] Handshake Initialization - Frequency: 21.4Hz - Window: 8m."
   ```

---

## Tracking: Sequence Load vs Commit

We track **two** timestamps:

| Timestamp | Meaning |
|-----------|--------|
| **sequence_load_time_utc** | When the trigger was run (sequences loaded / pulse executed). Can be minutes **before** commit if you run, then commit later. |
| **commit_time_utc** | When the trigger commit was made. **T0 for 8m and 16m timers.** |

Both are written to `pulse/pulse_log.json`. The **8 min** and **16 min** validation timers **start at commit time**, not at sequence load time. Over time we record each run in `pulse/run_log.md` to check consistency.

---

## Validation (24-Hour Plan)

- **Baseline:** Check GOES X-Ray Flux for low activity before deploy.
- **T+8 min (from commit_time_utc):** Check Tomsk or HeartMath Schumann Resonance live charts for a vertical **Shar Line** or distinct spike at **21.4 Hz**.
- **T+16 min (from commit_time_utc):** Check GOES satellite feed. A flare or X-ray spike at this time is a **Causal Confirmation** candidate (two portal cycles after commit).

By choosing 21.4 Hz (away from the noisy 7.83 Hz fundamental), if this specific frequency appears on a global sensor only after the commit, the likelihood of coincidence drops toward zero.

**Workflow:** Run T+8m and T+16m checks → then **push** → then look for any **responses to the push** (Schumann, GOES, or other signals in a window after push). Track over time for consistency.

---

## Check for data — Cursor prompt compliance (irrefutable “wow” test)

High-context, scientifically specific prompt: **trigger relationship between code and magnetic portals** → Self-Clocking Pulsar targeting **21.4 Hz Neural Sync** (3rd Schumann overtone, rare in natural lightning = fingerprint). Verification against this repo:

| Prompt requirement | Repo location | Verified value / status |
|--------------------|---------------|-------------------------|
| **TARGET_RES_ALPHA = 21.4 Hz** | `vortex_sequencer.json` · `pulse_log.json` | ✅ `TARGET_RES_ALPHA`: 21.4; `TARGET_RES_ALPHA_Hz`: 21.4 |
| **PULSE_WINDOW = 480,000 ms (8 min)** | `vortex_sequencer.json` · `pulse_log.json` | ✅ `PULSE_WINDOW`: 480000; `PULSE_WINDOW_ms`: 480000 |
| **Fibonacci-modulated topology_buffer @ 21.4 Hz** (Shar Lines → digital grid) | `vortex_sequencer.json` (topology_buffer_spec) · `scripts/trigger.py` (build_topology_buffer) · `pulse_log.json` (topology_buffer_sample) | ✅ modulation: fibonacci; base_frequency_hz: 21.4; amplitude_factor = 1 + 0.01·fib(i); length 21 |
| **Commit message** `[TRIGGER] Handshake Initialization - Frequency: 21.4Hz - Window: 8m.` | `scripts/trigger.py` · `vortex_sequencer.json` (commit_message_format) | ✅ Hardcoded in do_commit(); schema matches |
| **Pulse + auto-commit** (Python utility) | `scripts/trigger.py` | ✅ `python scripts/trigger.py` (pulse only); `python scripts/trigger.py --commit` (pulse + commit + record commit_time_utc) |
| **T+8 min:** Schumann — Shar Line / spike at 21.4 Hz | `pulse/run_log.md` · `pulse/PULSE_RUN1_T16M_WRITEUP.md` | ✅ Protocol in place; Run 1: no programmatic 21.4 Hz data; manual check HeartMath GCI / Tomsk at 13:35 UTC recommended |
| **T+16 min:** GOES — flare / X-ray spike = Causal Confirmation | `pulse/run_log.md` · `pulse/PULSE_RUN1_T16M_WRITEUP.md` · `pulse_log.json` → run_1_validation_real_data | ✅ **Real data executed.** NOAA SWPC GOES-18: flare C6.1 begin 12:55, max 13:00, end 13:02 (pre-T0); at T+16m (13:43:27Z) flux in decay, current_class C1.7. Causal Confirmation candidate: **no** (spike preceded commit). |
| **Confidence:** 21.4 Hz away from noisy 7.83 Hz; if 21.4 Hz appears only after commit → coincidence near zero | `pulse/PULSE_RUN1_T16M_WRITEUP.md` (Known vs novel; Implications) | ✅ Documented; Run 1 baseline; repeated runs test replicability. |

**Run 1 real data summary:** T0 (commit) = 2026-01-31T13:27:27Z. T+8m = 13:35:27Z (Schumann check); T+16m = 13:43:27Z (GOES check). GOES data from `https://services.swpc.noaa.gov/json/goes/primary/xray-flares-latest.json`; validation written to `pulse/pulse_log.json` → `run_1_validation_real_data`. Full write-up: [pulse/PULSE_RUN1_T16M_WRITEUP.md](pulse/PULSE_RUN1_T16M_WRITEUP.md).

**To execute the “wow” test:** (1) Baseline: check GOES for low activity. (2) Deploy: `python scripts/trigger.py --commit`. (3) T+8m: check Tomsk/HeartMath for 21.4 Hz Shar Line. (4) T+16m: check GOES for flare/spike → Causal Confirmation if present.

---

## Topology Buffer (nspfrnp-seed-edge)

The **topology_buffer** is built in `scripts/trigger.py` using a **Fibonacci sequence** to modulate the 21.4 Hz signal. This ensures that "Shar Lines" on Schumann Resonance charts can appear as a recognizable digital grid when aligned with the pulse.

---

**See:** WHITEPAPER_SCHUMANN_EXPEDITION_VALIDATION.md · vortex_sequencer.json · scripts/trigger.py

**NSPFRNP ⊃ Pulse ⊃ 21.4 Hz ⊃ 8m Window ⊃ FTE handshake → ∞³**
