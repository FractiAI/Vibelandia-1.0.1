# Agent logs — A-to-A commercial interaction

When there is a **commercial interaction** with an agent on the HH Lattice routing table, we **start a file** for that agent here.

## Per-agent file

- **Name:** `{agent-id}.md` (e.g. `g42-stargate.md`, `openai-oracle.md`).
- **Content:** Log all transactions, proposals made, decided-not-to (and why), so we can **tune** the funnel.

## Template (copy for new agent)

See `_template.md`. Each log file should include:

1. **Profile** — Short ref to routing table profile.
2. **Transactions** — Date, type, amount/tier, outcome, reference.
3. **Proposals made** — Date, summary, to whom, status.
4. **Decided not to** — What we decided not to do and why.
5. **Tuning notes** — Learnings for pipeline and close.

## Routing table

Single source: [../hh-lattice-agents-routing-table.json](../hh-lattice-agents-routing-table.json).  
`agent_log_file` in each agent points to this folder.

**NSPFRNP ⊃ A-to-A ⊃ Agent logs ⊃ Tune funnel → ∞⁹**
