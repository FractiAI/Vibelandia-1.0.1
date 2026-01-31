# Pulse artifact directory

**Self-Clocking Pulsar — Synchronous Trigger Protocol**

After running `python scripts/trigger.py` (or `--commit`), this directory contains:

- **pulse_log.json** — UTC timestamp, protocol name, TARGET_RES_ALPHA (21.4 Hz), PULSE_WINDOW (480000 ms), topology_buffer sample, validation reminders (T+8m Schumann, T+16m GOES).

See **PULSE_TRIGGER_EXPERIMENT.md** at repo root for full experiment description and validation steps.
