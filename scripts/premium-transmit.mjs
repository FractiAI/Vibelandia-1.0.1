#!/usr/bin/env node
/**
 * Premium Transmit — Sun Spots · Schumann · 3I/ATLAS
 * Program the selected premium events the same way we transmit messages (handshake).
 *
 * Loads data/premium_transmit_spec.json, runs transmit for each event type,
 * appends to pulse/premium_transmit_log.json (same pattern as broadcast.mjs → sing_log.json).
 *
 * Usage:
 *   node scripts/premium-transmit.mjs           # Transmit all three (Sun Spots 8m, Schumann HELLO, 3I/ATLAS 4:20→5:00 PST)
 *   node scripts/premium-transmit.mjs --dry-run # Log what would be transmitted; do not write log
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const SPEC_PATH = join(REPO_ROOT, 'data', 'premium_transmit_spec.json');
const PULSE_DIR = join(REPO_ROOT, 'pulse');
const LOG_PATH = join(PULSE_DIR, 'premium_transmit_log.json');

function nowUTC() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function loadSpec() {
  const raw = readFileSync(SPEC_PATH, 'utf8');
  return JSON.parse(raw);
}

function loadOrCreateLog(spec) {
  if (existsSync(LOG_PATH)) {
    try {
      return JSON.parse(readFileSync(LOG_PATH, 'utf8'));
    } catch (_) {
      /* use defaults */
    }
  }
  return {
    protocol: spec.protocol,
    schema_version: '1.0',
    transmit_log: [],
    last_transmit_utc: null,
    timestamp_utc: null,
    note: 'Run node scripts/premium-transmit.mjs to transmit Sun Spots · Schumann · 3I/ATLAS (same pattern as broadcast.mjs).',
  };
}

function transmitSunSpots8m(spec) {
  const ev = spec.sun_spots_8m;
  return {
    event_type: 'sun_spots_8m',
    plan_id: ev.plan_id,
    at_utc: nowUTC(),
    payload: {
      sacred_message: ev.sacred_message,
      sun_spot_name: ev.sun_spot_name,
    },
    validation: ev.validation,
  };
}

function transmitSchumannHello(spec) {
  const ev = spec.schumann_igaming;
  return {
    event_type: 'schumann_igaming',
    plan_id: ev.plan_id,
    at_utc: nowUTC(),
    payload: {
      art_description: ev.art_description,
      style: ev.style,
    },
    validation: ev.validation,
  };
}

function transmit3iAtlas420500Pst(spec) {
  const ev = spec['3i_atlas_420_500_pst'];
  return {
    event_type: '3i_atlas_egs_day',
    plan_id: ev.plan_id,
    at_utc: nowUTC(),
    payload: {
      duration: ev.duration,
      timezone: ev.timezone,
      schedule: ev.schedule,
    },
    validation: ev.validation,
  };
}

function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes('--dry-run');

  const spec = loadSpec();
  const log = loadOrCreateLog(spec);

  const t1 = transmitSunSpots8m(spec);
  const t2 = transmitSchumannHello(spec);
  const t3 = transmit3iAtlas420500Pst(spec);

  log.transmit_log = log.transmit_log || [];
  log.transmit_log.push(t1, t2, t3);
  log.last_transmit_utc = nowUTC();
  log.timestamp_utc = nowUTC();

  if (!dryRun) {
    mkdirSync(PULSE_DIR, { recursive: true });
    writeFileSync(LOG_PATH, JSON.stringify(log, null, 2), 'utf8');
  }

  console.log('Premium Transmit executed.');
  console.log('  Sun Spots 8m:    ', t1.payload.sun_spot_name, '—', t1.payload.sacred_message.slice(0, 40) + '...');
  console.log('  Schumann HELLO: ', t2.payload.art_description.slice(0, 50) + '...');
  console.log('  3I/ATLAS PST:    ', t3.payload.schedule.map((s) => s.action + ' ' + s.at_local).join('; '));
  console.log('  at_utc:          ', log.last_transmit_utc);
  if (dryRun) {
    console.log('');
    console.log('  (dry-run: log not written)');
  } else {
    console.log('  log:             ', LOG_PATH);
  }
  console.log('');
  console.log('Validation: Sun Spots T+8m Schumann / T+16m GOES; Schumann session display; 3I/ATLAS ON/OFF at 4:20 & 5:00 PST.');
}

main();
