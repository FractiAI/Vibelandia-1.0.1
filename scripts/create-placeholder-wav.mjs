#!/usr/bin/env node
/**
 * Create minimal valid WAV placeholder files for Te Quiero Mucho Baby and Dorila Gao.
 * 44.1kHz, 16-bit mono, ~1 second silence. Used so catalog/playlist can reference static WAV.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'interfaces', 'audio');

function createMinimalWav(numSamples = 44100) {
  const dataSize = numSamples * 2; // 16-bit = 2 bytes per sample
  const fileSize = 36 + dataSize; // 44 - 8 + dataSize, riff chunk = 4 + 4 + rest
  const riffSize = fileSize - 8;
  const buf = Buffer.alloc(44 + dataSize);
  let o = 0;
  buf.write('RIFF', o); o += 4;
  buf.writeUInt32LE(riffSize, o); o += 4;
  buf.write('WAVE', o); o += 4;
  buf.write('fmt ', o); o += 4;
  buf.writeUInt32LE(16, o); o += 4;
  buf.writeUInt16LE(1, o); o += 2;  // PCM
  buf.writeUInt16LE(1, o); o += 2;  // mono
  buf.writeUInt32LE(44100, o); o += 4;
  buf.writeUInt32LE(88200, o); o += 4; // byte rate
  buf.writeUInt16LE(2, o); o += 2;   // block align
  buf.writeUInt16LE(16, o); o += 2;
  buf.write('data', o); o += 4;
  buf.writeUInt32LE(dataSize, o); o += 4;
  // samples already 0
  return buf;
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const wav1 = createMinimalWav(44100);
fs.writeFileSync(path.join(outDir, 'te-quiero-mucho-baby.wav'), wav1);
fs.writeFileSync(path.join(outDir, 'dorila-gao.wav'), createMinimalWav(44100));

console.log('Created interfaces/audio/te-quiero-mucho-baby.wav and dorila-gao.wav');
