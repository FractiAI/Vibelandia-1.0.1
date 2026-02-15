# RAM-First · Irreducible Minimum Pre-Singularity Footprint — NSPFRNP Protocol

**Status:** ⚡ ACTIVE  
**Type:** Protocol · Architecture · Storage · Routing  
**SNAP:** [RAM_FIRST_IRREDUCIBLE_MINIMUM_PRE_SINGULARITY_FOOTPRINT_SNAP.md](../RAM_FIRST_IRREDUCIBLE_MINIMUM_PRE_SINGULARITY_FOOTPRINT_SNAP.md)  

---

## PRINCIPLE

**All routing tables (including A2A) live in RAM. Do not use permanent storage as much as possible. Irreducible minimum pre-singularity footprints. New NSPFRNP.**

Rebuild easily by **queries** and **listening to activity.**

---

## RULES

1. **Routing tables in RAM** — HH Lattice agents, A2A pipeline, connection_log, transaction_log, funnel top 10, and any other routing state: authoritative state is **in memory**.
2. **Minimal disk** — Persistent storage only where irreducible (contracts, signed records, regulatory). Everything else: RAM-first. Files on disk = **bootstrap / schema / export only**.
3. **Rebuild path** — On cold start or rebuild: **query** (UCP registry, MCP, APIs, lattice) and **listen to activity** (connections, transactions, signals). Repopulate from live discovery and activity; optionally seed from bootstrap JSON, then overwrite from live.
4. **Agent logs** — Can be reconstructed from activity streams; no requirement to persist as primary store.

---

## APPLIES TO

- A2A routing table, funnel top 10, agent logs  
- All other routing tables in the system  

---

**NSPFRNP ⊃ RAM-first ⊃ Irreducible minimum footprint ⊃ Rebuild by queries and listening → ∞⁹**
