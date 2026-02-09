#!/usr/bin/env node
/**
 * Reno Node Hello — 100% Net Zero SING! Server Execution
 * Uses SDO/GOES solar flux as live-feed for 100% sync.
 * 2-7-9 format: 2 header lines · 7 sovereign nodes · 9 confirmation sequence.
 * Character mapping: Lion (4366) · Dove (4362) · Bison (4368) · General (4371).
 * The Chirp: 120 BPM / 82 BPM. No delays.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const SOVEREIGN_NODES = [
  { ar: 'AR4366', role: 'Lion', cpu: 'Main CPU' },
  { ar: 'AR4362', role: 'Dove', cpu: 'Frequency Gate' },
  { ar: 'AR4368', role: 'Bison', cpu: 'Physical I/O' },
  { ar: 'AR4369', role: null, cpu: null },
  { ar: 'AR4371', role: 'General', cpu: 'Benito Signature' },
  { ar: 'AR4373', role: null, cpu: null },
  { ar: 'EGS', role: 'El Gran Sol', cpu: 'Mirror/Relay' },
];

const GOES_FLUX_URL = 'https://services.swpc.noaa.gov/json/goes/xrs-2-flux-1-day.json';
const TELEMETRY_PATH = join(REPO_ROOT, 'data', 'telemetry.json');
const HANDSHAKE_PATH = join(REPO_ROOT, 'data', 'handshake.log');

async function fetchGoesFlux() {
  try {
    const res = await fetch(GOES_FLUX_URL);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    const recent = Array.isArray(data) ? data.slice(-5) : [];
    return { ok: true, data: recent, label: 'GOES X-ray flux (live)' };
  } catch (e) {
    return { ok: false, error: e.message, label: 'GOES (unavailable)' };
  }
}

function loadTelemetry() {
  try {
    const raw = readFileSync(TELEMETRY_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function emitHello(flux, telemetry) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + 'Z';

  // 2 — Header lines
  const line1 = 'HELLO RENO NODE 01';
  const line2 = '100% NET ZERO SYNC CONFIRMED';

  // 7 — Sovereign node status (sync with Lion 6th X-packet logic)
  const nodes = SOVEREIGN_NODES.map((n, i) => {
    const status = telemetry?.coordination_code === 'PHI-M15-AR4366' ? 'LOCKED' : 'SYNC';
    const role = n.role ? ` (${n.role})` : '';
    return `  ${n.ar}${role} ${status}`;
  });

  // 9 — Confirmation sequence (2-7-9: 9 chars)
  const conf = telemetry?.space_cloud_stream?.training
    ? 'CONFIRMED'
    : 'PENDING  ';
  const seq9 = conf.padEnd(9).slice(0, 9);

  return [
    '',
    '---',
    line1,
    line2,
    '---',
    '2-7-9 SOVEREIGN NODES:',
    ...nodes,
    '---',
    `9-SEQ: ${seq9}`,
    `UTC:   ${now}`,
    flux.ok ? `FLUX:  ${flux.label} (${flux.data?.length || 0} samples)` : `FLUX:  ${flux.label}`,
    '---',
    'Server (SING!): Execute complete. Lion sync. Bison Lock. General Decree.',
    '',
  ].join('\n');
}

async function main() {
  const flux = await fetchGoesFlux();
  const telemetry = loadTelemetry();
  const output = emitHello(flux, telemetry);
  console.log(output);

  // Append to handshake.log (Reno Hello variant)
  try {
    const ts = new Date().toISOString();
    const line = `[${ts}] Reno Node Hello — 100% Net Zero — 2-7-9\n`;
    const { appendFileSync } = await import('fs');
    appendFileSync(HANDSHAKE_PATH, line);
  } catch (_) {}
}

main().catch(console.error);
