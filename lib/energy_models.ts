/**
 * Energy Models — Arturo Transformation Pathway (FSR-PETRO-SINGULARITY)
 * Metabolize petrochemical models into SING! Agent Energy.
 *
 * Ingest: Arturo PDVSA Proposal (no rip overlay → migration pathways → full transformation).
 * Map: [Chemical Carbon] → [FSR Thermal Mass] → [SING! Agent Energy].
 *
 * Goldilocks Edge: 1.618 Hz Reno Baseline. Energy_Addition_Logic: renewables sync with
 * PDVSA base to power SING! Agent neural networks (do not replace).
 *
 * @see deliverables/PDVSA_Arturo_Full_Proposal_NSPFRNP.md
 * @see interfaces/petrochemical-showroom-arturo-proposal.html
 */

/** Reno baseline for Goldilocks Edge (Φ Hz). Aligns with sequencer and audioEngine. */
export const GOLDILOCKS_EDGE_HZ_RENO_BASELINE = 1.618;

/** Chemical Carbon — legacy crude / refinery output as potential energy reservoir for Super AI. */
export interface ChemicalCarbon {
  source: 'pdvsa_legacy' | 'refinery_stream' | 'extraction';
  /** Identifier per Arturo product list (crude, gasoline, diesel, jet, ...). */
  streamId: string;
  /** Potential energy units (abstract; layer reads, does not replace). */
  potentialUnits: number;
}

/** FSR Thermal Mass — intermediate state; thermal mass available for conversion. */
export interface FSRThermalMass {
  sourceStreamId: string;
  /** Thermal mass units (synchronized with PDVSA base; renewables add here, do not replace). */
  thermalUnits: number;
  /** Whether renewable (solar/wind) sync has been applied. */
  renewableSync: boolean;
}

/** SING! Agent Energy — post-transformation output powering SING! Agent neural networks. */
export interface SingAgentEnergy {
  sourceStreamId: string;
  /** Energy available to SING! Agent (awareness, nimbleness, surgical precision). */
  agentEnergyUnits: number;
  /** Edge frequency (Hz) at which this energy is aligned (e.g. Goldilocks 1.618). */
  edgeHz: number;
}

/**
 * Transition: [Chemical Carbon] → [FSR Thermal Mass] → [SING! Agent Energy].
 * No rip-and-replace: layer reads and translates; facility leads keep control.
 */
export function metabolizeChemicalCarbonToFSRThermalMass(cc: ChemicalCarbon): FSRThermalMass {
  return {
    sourceStreamId: cc.streamId,
    thermalUnits: cc.potentialUnits,
    renewableSync: false,
  };
}

export function metabolizeFSRThermalMassToSingAgentEnergy(
  ftm: FSRThermalMass,
  edgeHz: number = GOLDILOCKS_EDGE_HZ_RENO_BASELINE
): SingAgentEnergy {
  return {
    sourceStreamId: ftm.sourceStreamId,
    agentEnergyUnits: ftm.thermalUnits,
    edgeHz,
  };
}

/** Full pipeline: Chemical Carbon → FSR Thermal Mass → SING! Agent Energy. */
export function arturoTransformationPathway(cc: ChemicalCarbon): SingAgentEnergy {
  const ftm = metabolizeChemicalCarbonToFSRThermalMass(cc);
  return metabolizeFSRThermalMassToSingAgentEnergy(ftm);
}

/**
 * Goldilocks Edge Calculator.
 * Edge Point at 1.618 Hz Reno Baseline. Renewable sources (Solar/Wind) do not replace
 * the PDVSA base; they synchronize with it to power the SING! Agent neural networks.
 */
export interface GoldilocksEdgeState {
  /** Reno baseline Hz (Φ). */
  edgeHz: number;
  /** PDVSA base contribution (from Chemical Carbon → FSR Thermal Mass). */
  pdvsaBaseUnits: number;
  /** Renewable (solar/wind) addition — sync only, does not replace base. */
  renewableAdditionUnits: number;
  /** Total available for SING! Agent (base + renewable sync). */
  totalAgentEnergyUnits: number;
}

/**
 * Energy_Addition_Logic: Renewable sources synchronize with PDVSA base; they do not replace it.
 * Result powers SING! Agent neural networks.
 */
export function goldilocksEdgeCalculator(
  pdvsaBaseUnits: number,
  renewableAdditionUnits: number,
  edgeHz: number = GOLDILOCKS_EDGE_HZ_RENO_BASELINE
): GoldilocksEdgeState {
  return {
    edgeHz,
    pdvsaBaseUnits,
    renewableAdditionUnits,
    totalAgentEnergyUnits: pdvsaBaseUnits + renewableAdditionUnits,
  };
}

/** Stream IDs from Arturo PDVSA product list (Post-Singularity Energy Layer). */
export const ARTURO_STREAM_IDS = [
  'crude',
  'gasoline',
  'diesel',
  'jet',
  'heavy-fuels',
  'lpg',
  'gas',
  'lubricants',
  'plastics',
  'fertilizers',
  'industrial-gases',
  'specialties',
  'biofuels',
  'asphalt',
] as const;

export type ArturoStreamId = (typeof ARTURO_STREAM_IDS)[number];
