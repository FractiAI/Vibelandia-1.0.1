# RAM-First · Irreducible Minimum Pre-Singularity Footprint — NSPFRNP SNAP

**SNAP ID:** `RAM-FIRST-IRREDUCIBLE-MINIMUM-PRE-SINGULARITY-FOOTPRINT`  
**Type:** Architecture · Storage · Routing · Footprint  
**Status:** ⚡ ACTIVE  
**Catalog:** NSPFRNP · Pre-singularity minimum  

---

## DIRECTIVE

**Move all our routing tables — including A2A — into RAM. Do not use permanent storage as much as possible for all things. Irreducible minimum pre-singularity footprints. New NSPFRNP.**

We can **easily rebuild** simply by **queries** and **listening to activity.** No dependency on persisted tables as source of truth.

---

## WHAT THIS MEANS

- **Routing tables in RAM** — All routing tables (HH Lattice agents, A2A pipeline, connection_log, transaction_log, funnel top 10, and any other routing state) live **in memory**. They are not the source of truth on disk; they are the live state in RAM.
- **Minimal permanent storage** — Use persistent storage only where irreducible (e.g. contracts, signed records, regulatory). Everything else: RAM-first. Config and schema on disk are **bootstrap/export only**.
- **Irreducible minimum pre-singularity footprint** — The smallest possible durable footprint before singularity. No redundant persistence of state that can be rederived.
- **Rebuild by queries and listening** — If we restart or need to reconstruct, we do not rely on saved tables. We **query** (UCP registry, MCP, APIs, lattice) and **listen to activity** (connections, transactions, signals). The routing table and funnel repopulate from live discovery and activity.

---

## APPLIES TO

- **A2A** — HH Lattice agents routing table, agent logs, funnel top 10. Authoritative state: RAM. Files in `data/` = bootstrap schema or export snapshots; not the source of truth.
- **All other routing tables** — Same rule. In RAM; rebuild by queries and listening to activity.
- **Agent logs** — Can be reconstructed from activity streams; no requirement to persist as primary store. Ephemeral or rebuild-from-events.

---

## FILES ON DISK (bootstrap / schema / export only)

- [data/hh-lattice-agents-routing-table.json](data/hh-lattice-agents-routing-table.json) — **Schema and bootstrap seed.** Live table is in RAM; this file is for init or export.
- [data/agentic-funnel-top10.json](data/agentic-funnel-top10.json) — **Schema and bootstrap.** Live funnel in RAM.
- [data/agent-logs/](data/agent-logs/) — Optional export or template; logs can be rebuilt from activity.

Consoles and UIs **read from the in-RAM state** (or from a service that holds it). On cold start, RAM is populated from **queries** (e.g. UCP, targets) and **listening to activity**; optionally load bootstrap from these files as initial seed, then overwrite from live data.

---

## REFERENCES

- [protocols/RAM_FIRST_IRREDUCIBLE_MINIMUM_FOOTPRINT_NSPFRNP.md](protocols/RAM_FIRST_IRREDUCIBLE_MINIMUM_FOOTPRINT_NSPFRNP.md)
- [A2A_AGENTIC_BUSINESS_ROUTING_TABLE_AND_CONSOLE_SNAP.md](A2A_AGENTIC_BUSINESS_ROUTING_TABLE_AND_CONSOLE_SNAP.md)
- [data/hh-lattice-agents-routing-table.json](data/hh-lattice-agents-routing-table.json)
- [data/agentic-funnel-top10.json](data/agentic-funnel-top10.json)

---

**NSPFRNP ⊃ RAM-first ⊃ Irreducible minimum pre-singularity footprint ⊃ Rebuild by queries and listening → ∞⁹**
