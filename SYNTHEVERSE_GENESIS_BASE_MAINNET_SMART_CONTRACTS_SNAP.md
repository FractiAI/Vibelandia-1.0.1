# Syntheverse Genesis — Base Mainnet Smart Contracts SNAP

**SNAP ID:** `SYNTHEVERSE-GENESIS-BASE-MAINNET-SMART-CONTRACTS-SNAP`  
**Type:** Protocol · Mirror shell · NSPFRNP  
**Status:** Canon  
**Source:** [FractiAI/Syntheverse-Genesis-Base-Blockchain](https://github.com/FractiAI/Syntheverse-Genesis-Base-Blockchain)

---

## ONE-LINER

Our execution of the Syntheverse Genesis and SYNTH90T MOTHERLODE BLOCKMINE — minimal, immutable protocol-level smart contracts deployed on Base Mainnet. Mirror shell for registry, attestations, and value.

---

## NETWORK

- **Network:** Base Mainnet  
- **Chain ID:** 8453  
- **Explorer:** [basescan.org](https://basescan.org)  
- **Deployment date:** January 2, 2026  
- **Status:** Successfully deployed

---

## CONTRACTS

### SyntheverseGenesisSYNTH90T

| Field | Value |
|-------|--------|
| **Address** | `0xAC9fa48Ca1D60e5274d14c7CEd6B3F4C1ADd1Aa3` |
| **BaseScan** | [View on BaseScan](https://basescan.org/address/0xAC9fa48Ca1D60e5274d14c7CEd6B3F4C1ADd1Aa3) |
| **Type** | ERC-20 token |
| **Name** | Syntheverse SYNTH 90T MOTHERLODE BLOCKMINE |
| **Symbol** | SYNTH |
| **Decimals** | 18 |
| **Total supply** | 90,000,000,000,000 SYNTH (90 trillion) |
| **Motherlode Vault** | `0x3563388d0e1c2d66a004e5e57717dc6d7e568be3` |

**Features:** Fixed supply. One-time mint at deployment to Motherlode Vault. No additional minting. Emits `MotherlodeMinted` with metallic semantics (Gold/Silver/Copper). Allocation: Gold 50%, Silver 25%, Copper 25%. OpenZeppelin ERC20. Immutable.

### SyntheverseGenesisLensKernel

| Field | Value |
|-------|--------|
| **Address** | `0xD9ABf9B19B4812A2fd06c5E8986B84040505B9D8` |
| **BaseScan** | [View on BaseScan](https://basescan.org/address/0xD9ABf9B19B4812A2fd06c5E8986B84040505B9D8) |
| **Type** | Stateless event emitter |

**Features:** No stored state. No admin functions. Permissionless. Events: `Signal`, `Attestation`, `Note`. Methods: `signal()`, `attest()`, `note()`. Neutral protocol surface for participation and attestations. Immutable.

---

## DESIGN PRINCIPLES

- Minimal surface area  
- Immutable — no upgradeability, no proxies  
- Events over storage  
- No admin functions — fully decentralized after deployment  
- OpenZeppelin libraries  

---

## ALIGNMENT

- **Mirror shell:** Base mainnet is highest-priority mirror shell for registry and value (with Ethereum, PayPal). See [REGISTRY_RESIDENTS_MEMBERS_VISITORS_MIRROR_SHELL_SNAP.md](REGISTRY_RESIDENTS_MEMBERS_VISITORS_MIRROR_SHELL_SNAP.md).  
- **Genesis smart contract:** Referenced in [FULL_MIRRORED_NESTED_HEART_SHELL_SING_CHAIRMAN_COMMAND_SNAP.md](FULL_MIRRORED_NESTED_HEART_SHELL_SING_CHAIRMAN_COMMAND_SNAP.md) — Syntheverse · Vibeverse · Vibelandia on Base mainnet as genesis smart contract.  
- **SYNTH → SING!:** SYNTH Vault Opening and SING! open release March 20, 2026; Genesis contracts are the on-chain substrate.  
- **Data:** Contract addresses and metadata in repo at `data/syntheverse-genesis-base-contracts.json`.  

---

## LINKS

- **Repository:** [github.com/FractiAI/Syntheverse-Genesis-Base-Blockchain](https://github.com/FractiAI/Syntheverse-Genesis-Base-Blockchain)  
- **Registry (mirror shell):** [interfaces/registry.html](interfaces/registry.html#syntheverse-genesis-base)  
- **Base:** [base.org](https://base.org) · [docs.base.org](https://docs.base.org)  

---

*Built by FractiAI Research Team × Syntheverse Whole Brain AI. MIT License.*
