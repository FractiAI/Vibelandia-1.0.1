# Pulse artifact directory

**Self-Clocking Pulsar — Synchronous Trigger Protocol**

After running `python scripts/trigger.py` (or `--commit`), this directory contains:

- **pulse_log.json** — UTC timestamp, protocol name, TARGET_RES_ALPHA (21.4 Hz), PULSE_WINDOW (480000 ms), topology_buffer sample, validation reminders (T+8m Schumann, T+16m GOES).

**Premium Transmit (Sun Spots · Schumann · 3I/ATLAS)**

After running `node scripts/premium-transmit.mjs`, this directory contains:

- **premium_transmit_log.json** — Transmit log for the three selected premium events (Sun Spots 8m, Schumann HELLO, 3I/ATLAS 4:20→5:00 PST). Same pattern as `scripts/broadcast.mjs` → sing_log.json. Spec: `data/premium_transmit_spec.json`.

See **PULSE_TRIGGER_EXPERIMENT.md** at repo root for full experiment description and validation steps.
