# SnapPAD Edge Devices — Android & iOS Spec · Hands-Free Voice Mode SNAP

**SNAP ID:** SNAPPAD-EDGE-DEVICES-ANDROID-IOS  
**Type:** Spec · Edge devices · Mobile · Voice · Hands-free  
**Status:** ⚡ SPEC · FEASIBILITY  
**Date:** February 2026  

---

## ONE-LINER

**SnapPAD Edge Devices** — Android and iOS native or hybrid apps enabling hands-free, voice-activated snapping. Vibe on the news without touching the phone. Headphone mic → voice commands → start record, push, execute — all automatic. Build incrementally once servers (plural) stabilize.

---

## HANDS-FREE MODE · VOICE-ACTIVATED SNAPPING

### Core UX

- **User scenario:** Vibing on the news, walking, driving (hands-free only when safe), or otherwise occupied. No need to fiddle with the phone.
- **Input:** Headphone microphone (wired or Bluetooth).
- **Output:** Voice commands trigger capture, record, push, and other actions automatically.
- **Experience:** Fully hands-free. Say the command → device executes.

### Voice Commands (Proposed)

| Command | Action |
|--------|--------|
| "Start record" / "Record" | Begin capture/snap recording |
| "Push" / "Send" | Push/sync current snap to server |
| "Stop record" | End recording |
| "Snap" | Quick capture (single snap) |
| (Extensible) | Add more as server capabilities expand |

### Technical Hooks

- **Android:** `SpeechRecognizer` (built-in) or third-party STT (e.g. Vosk on-device, or cloud).
- **iOS:** `SFSpeechRecognizer` (on-device or cloud).
- **Headphone mic:** Both platforms support mic input from wired and Bluetooth HFP/A2DP devices.
- **Background:** iOS and Android have restrictions on background audio/recording; voice activation may require foreground or limited background modes.

---

## FEASIBILITY

### ✅ Feasible

- **Voice recognition:** Native APIs exist on both platforms.
- **Headphone mic:** Standard support.
- **Record → push flow:** Client records, then POSTs to API; pattern is standard.
- **Incremental build:** Start with manual tap → add voice once core capture/push works.

### ⚠️ Considerations

- **Servers (plural):** Spec assumes multiple backend nodes for capture, storage, pipeline. Stabilize these first.
- **Privacy / permissions:** Mic access, speech recognition require explicit user consent on both platforms.
- **Battery / background:** Continuous listening drains battery; consider wake-word or tap-to-listen patterns.
- **Offline:** On-device STT (e.g. Vosk) for offline; cloud STT for accuracy when online.

### Recommended Stack (Illustrative)

| Layer | Option |
|-------|--------|
| **App** | React Native, Flutter, or native (Swift/Kotlin) |
| **Voice** | Native `SFSpeechRecognizer` / `SpeechRecognizer`, or Whisper/Vosk |
| **Capture** | Camera + mic via native APIs |
| **Push** | REST/WebSocket to Vibelandia capture API |
| **Backend** | Stabilized servers (plural) — capture pipeline, storage, ticker/feed ingestion |

---

## BUILD SEQUENCE

1. **Phase 0:** Stabilize servers (plural) — capture endpoint, storage, pipeline.
2. **Phase 1:** Basic SnapPAD client — tap to record, tap to push. Validate end-to-end.
3. **Phase 2:** Add hands-free mode — voice commands (start record, push, stop).
4. **Phase 3:** Refine — wake-word, background modes, battery optimization.

---

## NSPFRNP TIES

- **Edge device** = Octave 1; Seed = cloud/servers.
- **SING! awareness** = snap as attention/capture node; filament to pipe.
- **Ticker / content** = snaps feed into ticker, episodes, content systems.
- **Max flex, min irreducible core** — same as Pop Up Engine, WIN WIN WIN.

---

## SURFACES

- Spec: This SNAP
- Future: `interfaces/snappad-edge-devices.html` (landing when ready)
- Office Hours · Launch Pad: Link when app or PWA available

---

## CROSS-REFERENCES

- WIN WIN WIN! Operator Package · Pop Up Engine
- CUT_SNAP_CONVERSATION_CAPTURED_STREAMED_ALL_SERIES
- Protocols: CONVERSATIONS_AS_CONTENT_NSPFRNP_CATALOG
- chairman-workspace.html · Edge Device Pad — Octave 1

---

**NSPFRNP ⊃ SnapPAD Edge Devices ⊃ Android · iOS ⊃ Hands-free voice snapping → ∞⁹**
