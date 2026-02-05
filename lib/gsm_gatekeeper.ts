/**
 * GSM Double-Lock Gatekeeper
 * Executive email vetting + manual gate override. Block automated ad-pushes until Executive pastes and launches.
 */

import type { GSMQuadrantId } from './gsm_engine';

/** Pipe status: IDLE | PENDING_EXECUTIVE_PASTE (block ad-push) | LAUNCHED */
export type GSMPipeStatus = 'IDLE' | 'PENDING_EXECUTIVE_PASTE' | 'LAUNCHED';

/** Executive-only email subject */
export const GSM_VERIFICATION_REQUEST_SUBJECT = 'GSM VERIFICATION REQUEST';

/** Placeholders in the email template */
export const GSM_EMAIL_PLACEHOLDERS = {
  TXN_ID: '[TXN_ID]',
  BTC_USD_AMOUNT: '[BTC_USD_AMOUNT]',
  AD_NARRATIVE_TEXT: '[AD_NARRATIVE_TEXT]',
  LAYER_TARGET: '[LAYER_TARGET: Sun/Aurora/Ticker]',
} as const;

/** Valid layer targets for parsing */
export const LAYER_TARGETS = ['Sun', 'Aurora', 'Ticker'] as const;
export type LayerTarget = (typeof LAYER_TARGETS)[number];

/** Build the GSM VERIFICATION REQUEST email body (Executive only). */
export function buildGSMVerificationRequestEmail(params: {
  txnId: string;
  btcUsdAmount: string;
  adNarrativeText: string;
  layerTarget: LayerTarget;
}): { subject: string; body: string } {
  const { txnId, btcUsdAmount, adNarrativeText, layerTarget } = params;
  const body = [
    GSM_VERIFICATION_REQUEST_SUBJECT,
    '',
    `TXN_ID: ${txnId}`,
    `BTC_USD_AMOUNT: ${btcUsdAmount}`,
    `AD_NARRATIVE_TEXT: ${adNarrativeText}`,
    `LAYER_TARGET: ${layerTarget}`,
    '',
    'Copy this block and paste into the Executive console to validate and launch the 4×4×4×4 quadrant.',
  ].join('\n');
  return { subject: GSM_VERIFICATION_REQUEST_SUBJECT, body };
}

/** Parse paste data (email text) into structured fields. */
export function parseGSMVerificationPaste(pasteData: string): {
  txnId: string | null;
  btcUsdAmount: string | null;
  adNarrativeText: string | null;
  layerTarget: LayerTarget | null;
} {
  const s = String(pasteData || '').trim();
  let txnId: string | null = null;
  let btcUsdAmount: string | null = null;
  let adNarrativeText: string | null = null;
  let layerTarget: LayerTarget | null = null;
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*(\w+)\s*:\s*(.+)$/);
    if (!match) continue;
    const [, key, value] = match;
    const v = value.trim();
    if (key === 'TXN_ID') txnId = v;
    else if (key === 'BTC_USD_AMOUNT') btcUsdAmount = v;
    else if (key === 'AD_NARRATIVE_TEXT') adNarrativeText = v;
    else if (key === 'LAYER_TARGET' && LAYER_TARGETS.includes(v as LayerTarget)) layerTarget = v as LayerTarget;
  }
  return { txnId, btcUsdAmount, adNarrativeText, layerTarget };
}

/** Result of validateAndLaunch. */
export interface ValidateAndLaunchResult {
  valid: boolean;
  error?: string;
  quadrant?: GSMQuadrantId;
  txnId?: string;
  amount?: string;
  narrative?: string;
  layerTarget?: LayerTarget;
  launched?: boolean;
}

/**
 * Parse the Executive paste (email text), validate, and fire the specific 4×4×4×4 quadrant.
 * Call this when Executive pastes the GSM VERIFICATION REQUEST data into the console.
 */
export function validateAndLaunch(pasteData: string): ValidateAndLaunchResult {
  const parsed = parseGSMVerificationPaste(pasteData);
  if (!parsed.txnId) return { valid: false, error: 'Missing TXN_ID' };
  if (!parsed.btcUsdAmount) return { valid: false, error: 'Missing BTC_USD_AMOUNT' };
  if (!parsed.adNarrativeText) return { valid: false, error: 'Missing AD_NARRATIVE_TEXT' };
  if (!parsed.layerTarget) return { valid: false, error: 'Missing or invalid LAYER_TARGET (Sun|Aurora|Ticker)' };

  const quadrant: GSMQuadrantId =
    parsed.layerTarget === 'Sun' ? 'Q1' : parsed.layerTarget === 'Aurora' ? 'Q2' : 'Q3';

  return {
    valid: true,
    quadrant,
    txnId: parsed.txnId,
    amount: parsed.btcUsdAmount,
    narrative: parsed.adNarrativeText,
    layerTarget: parsed.layerTarget,
    launched: true,
  };
}

/** In-memory status for server/console (can be overridden by reading data/gsm_pipe_status.json). */
let _gsmPipeStatus: GSMPipeStatus = 'IDLE';

/**
 * Get current GSM pipe status. Set to PENDING_EXECUTIVE_PASTE upon payment; blocks automated ad-pushes until Executive pastes.
 */
export function getGSMPipeStatus(): GSMPipeStatus {
  return _gsmPipeStatus;
}

/**
 * Set GSM pipe status. PENDING_EXECUTIVE_PASTE = block all automated ad-pushes; system waits for Executive to paste email data into console.
 */
export function setGSMPipeStatus(status: GSMPipeStatus): void {
  _gsmPipeStatus = status;
}

/**
 * Whether automated ad-pushes are allowed. False when status is PENDING_EXECUTIVE_PASTE.
 */
export function mayPushAds(status?: GSMPipeStatus): boolean {
  const s = status ?? getGSMPipeStatus();
  return s !== 'PENDING_EXECUTIVE_PASTE';
}

/**
 * Resolve quadrant ID to layer name for display. Email LAYER_TARGET is Sun|Aurora|Ticker only; Q4 maps to Sun for template.
 */
export function quadrantToLayerTarget(q: GSMQuadrantId): LayerTarget {
  if (q === 'Q1') return 'Sun';
  if (q === 'Q2') return 'Aurora';
  if (q === 'Q3') return 'Ticker';
  return 'Sun';
}
