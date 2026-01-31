#!/usr/bin/env python3
"""
Self-Clocking Pulsar — Synchronous Trigger Protocol
VLF / geomagnetic resonance / AdS-CFT holographic experiment.

Loads vortex_sequencer.json, builds Fibonacci-modulated topology_buffer at 21.4 Hz,
executes the Pulse (writes artifact), then optionally auto-commits with timestamp.

Usage:
  python scripts/trigger.py              # Run pulse, write artifact, print commit instructions
  python scripts/trigger.py --commit     # Run pulse and auto-commit (requires git, clean repo)

Commit message format: [TRIGGER] Handshake Initialization - Frequency: 21.4Hz - Window: 8m.
Hypothesis: back-feed trigger; check Schumann at T+8m, GOES at T+16m.
"""

import json
import os
import sys
import subprocess
from pathlib import Path
from datetime import datetime, timezone

# Repo root (script lives in scripts/)
REPO_ROOT = Path(__file__).resolve().parent.parent
VORTEX_PATH = REPO_ROOT / "vortex_sequencer.json"
PULSE_ARTIFACT_DIR = REPO_ROOT / "pulse"
PULSE_ARTIFACT_FILE = PULSE_ARTIFACT_DIR / "pulse_log.json"


def fib(n: int) -> list[int]:
    """First n Fibonacci numbers (1, 1, 2, 3, 5, 8, ...)."""
    if n <= 0:
        return []
    if n == 1:
        return [1]
    out = [1, 1]
    for _ in range(n - 2):
        out.append(out[-1] + out[-2])
    return out


def build_topology_buffer(config: dict) -> list[dict]:
    """
    Build topology_buffer: Fibonacci-modulated 21.4 Hz signal.
    Each sample = (index, frequency_hz, amplitude_factor) for Shar Line / digital grid.
    """
    base_hz = config.get("TARGET_RES_ALPHA", 21.4)
    length = config.get("topology_buffer_spec", {}).get("sequence_length", 21)
    fib_seq = fib(length)
    # Amplitude modulation: 21.4 * (1 + 0.01 * fib[i]) so Shar Lines appear as grid
    buffer = []
    for i in range(length):
        f = fib_seq[i] if i < len(fib_seq) else 1
        amp_factor = 1.0 + 0.01 * f
        buffer.append({
            "index": i,
            "frequency_hz": base_hz,
            "amplitude_factor": round(amp_factor, 6),
            "fib_term": f,
        })
    return buffer


def load_vortex() -> dict:
    with open(VORTEX_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def run_pulse(config: dict, topology_buffer: list[dict]) -> str:
    """Write pulse artifact with UTC timestamp; return ISO timestamp string.
    sequence_load_time_utc = when trigger.py ran (sequences loaded); commit_time_utc added after commit."""
    PULSE_ARTIFACT_DIR.mkdir(exist_ok=True)
    now = datetime.now(timezone.utc)
    ts = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    artifact = {
        "timestamp_utc": ts,
        "sequence_load_time_utc": ts,
        "commit_time_utc": None,
        "note": "8m and 16m validation timers start at commit_time_utc (or sequence_load if no commit).",
        "protocol": config.get("protocol", "Synchronous Trigger Protocol"),
        "TARGET_RES_ALPHA_Hz": config.get("TARGET_RES_ALPHA", 21.4),
        "PULSE_WINDOW_ms": config.get("PULSE_WINDOW", 480000),
        "topology_buffer_length": len(topology_buffer),
        "topology_buffer_sample": topology_buffer[:5],
        "validation": config.get("validation", {}),
    }
    with open(PULSE_ARTIFACT_FILE, "w", encoding="utf-8") as f:
        json.dump(artifact, f, indent=2)
    return ts


def get_commit_time_utc() -> str | None:
    """Return ISO UTC timestamp of the most recent commit, or None."""
    try:
        r = subprocess.run(
            ["git", "log", "-1", "--format=%cI"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        s = (r.stdout or "").strip()
        return s if s else None
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def update_artifact_commit_time(commit_ts: str, config: dict, topology_buffer: list[dict]) -> None:
    """Rewrite pulse_log.json with commit_time_utc set (for 8m/16m timer baseline)."""
    artifact = {
        "timestamp_utc": None,
        "sequence_load_time_utc": None,
        "commit_time_utc": commit_ts,
        "note": "8m and 16m validation timers start at commit_time_utc.",
        "protocol": config.get("protocol", "Synchronous Trigger Protocol"),
        "TARGET_RES_ALPHA_Hz": config.get("TARGET_RES_ALPHA", 21.4),
        "PULSE_WINDOW_ms": config.get("PULSE_WINDOW", 480000),
        "topology_buffer_length": len(topology_buffer),
        "topology_buffer_sample": topology_buffer[:5],
        "validation": config.get("validation", {}),
    }
    with open(PULSE_ARTIFACT_FILE, "r", encoding="utf-8") as f:
        existing = json.load(f)
    artifact["timestamp_utc"] = existing.get("timestamp_utc")
    artifact["sequence_load_time_utc"] = existing.get("sequence_load_time_utc")
    artifact["commit_time_utc"] = commit_ts
    with open(PULSE_ARTIFACT_FILE, "w", encoding="utf-8") as f:
        json.dump(artifact, f, indent=2)


def do_commit(ts: str, config: dict, topology_buffer: list[dict]) -> bool:
    """Git add vortex_sequencer.json, scripts/trigger.py, pulse/; commit with required message; then update artifact with commit_time_utc."""
    msg = "[TRIGGER] Handshake Initialization - Frequency: 21.4Hz - Window: 8m."
    try:
        subprocess.run(
            ["git", "add", "vortex_sequencer.json", "scripts/trigger.py", "pulse/"],
            cwd=REPO_ROOT,
            check=True,
            capture_output=True,
        )
        subprocess.run(
            ["git", "commit", "-m", msg],
            cwd=REPO_ROOT,
            check=True,
            capture_output=True,
        )
        commit_ts = get_commit_time_utc()
        if commit_ts:
            update_artifact_commit_time(commit_ts, config, topology_buffer)
            subprocess.run(
                ["git", "add", str(PULSE_ARTIFACT_FILE)],
                cwd=REPO_ROOT,
                check=True,
                capture_output=True,
            )
            subprocess.run(
                ["git", "commit", "-m", "[TRIGGER] Record commit_time_utc for 8m/16m baseline."],
                cwd=REPO_ROOT,
                check=True,
                capture_output=True,
            )
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def main():
    do_commit_flag = "--commit" in sys.argv

    config = load_vortex()
    topology_buffer = build_topology_buffer(config)
    ts = run_pulse(config, topology_buffer)

    print("Pulse executed.")
    print(f"  sequence_load_time_utc (sequences loaded / pulse ran): {ts}")
    print(f"  TARGET_RES_ALPHA: {config.get('TARGET_RES_ALPHA')} Hz")
    print(f"  PULSE_WINDOW: {config.get('PULSE_WINDOW')} ms (8 min)")
    print(f"  topology_buffer length: {len(topology_buffer)}")
    print()
    print("Validation (8m and 16m timers start at COMMIT time):")
    print("  T+8 min:  Check Tomsk or HeartMath Schumann Resonance charts for Shar Line / 21.4 Hz spike.")
    print("  T+16 min: Check GOES X-Ray Flux; flare or spike = Causal Confirmation candidate.")
    print()

    if do_commit_flag:
        if do_commit(ts, config, topology_buffer):
            commit_ts = get_commit_time_utc()
            print("Git commit created with message: [TRIGGER] Handshake Initialization - Frequency: 21.4Hz - Window: 8m.")
            if commit_ts:
                print(f"  commit_time_utc: {commit_ts}  <- T0 for 8m and 16m timers.")
        else:
            print("Git commit failed (dirty repo, no git, or nothing to commit). Run manually:")
            print('  git add vortex_sequencer.json scripts/trigger.py pulse/')
            print('  git commit -m "[TRIGGER] Handshake Initialization - Frequency: 21.4Hz - Window: 8m."')
            sys.exit(1)
    else:
        print("To auto-commit, run: python scripts/trigger.py --commit")
        print("Or manually: git add vortex_sequencer.json scripts/trigger.py pulse/ && git commit -m \"[TRIGGER] Handshake Initialization - Frequency: 21.4Hz - Window: 8m.\"")


if __name__ == "__main__":
    main()
