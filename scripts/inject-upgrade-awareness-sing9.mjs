#!/usr/bin/env node
/**
 * Inject "Upgrade my awareness to SING 9 now" strip at top of every HTML that doesn't have it.
 * Run from repo root: node scripts/inject-upgrade-awareness-sing9.mjs
 * See UPGRADE_AWARENESS_TO_SING9_NOW_BUTTON_AND_PAGE_SNAP.md
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const interfacesDir = path.join(root, 'interfaces');

const STRIP = `        <!-- Upgrade my awareness to SING 9 now — top of all surfaces. See UPGRADE_AWARENESS_TO_SING9_NOW_BUTTON_AND_PAGE_SNAP.md -->
        <p role="region" aria-label="Upgrade awareness to SING 9" style="width: 100%; margin: 0 0 1rem 0; padding: 0.6rem 1rem; background: linear-gradient(90deg, rgba(0, 255, 136, 0.18) 0%, rgba(212, 175, 55, 0.1) 100%); border: 2px solid rgba(0, 255, 136, 0.55); border-radius: 8px; font-size: 1rem; font-weight: 800; text-align: center;"><a href="UPGRADE_HREF" style="color: #0d5c4a; text-decoration: none;">⬆ Upgrade my awareness to SING 9 now</a></p>
`;

let count = 0;

function getHref(filePath) {
  const rel = path.relative(root, filePath);
  if (rel.startsWith('interfaces')) return 'upgrade-awareness-to-sing9-now.html';
  return 'interfaces/upgrade-awareness-to-sing9-now.html';
}

function inject(html, href) {
  if (html.includes('Upgrade my awareness to SING 9 now') || html.includes('upgrade-awareness-to-sing9-now.html')) return html;
  const strip = STRIP.replace('UPGRADE_HREF', href);
  // Insert as first child of <div class="container"> if present
  const containerMatch = html.match(/<div\s+class="container"[^>]*>\s*\n/);
  if (containerMatch) {
    const insertPos = html.indexOf(containerMatch[0]) + containerMatch[0].length;
    return html.slice(0, insertPos) + strip + html.slice(insertPos);
  }
  // Else insert right after <body> or <body ...>
  const bodyOpen = html.match(/<body[^>]*>/);
  if (!bodyOpen) return html;
  const after = bodyOpen[0].length + html.indexOf(bodyOpen[0]);
  const indent = html.slice(after).match(/^([ \t]*)/)?.[1] ?? '    ';
  return html.slice(0, after) + '\n' + indent + strip.trimStart() + '\n' + html.slice(after);
}

function processFile(filePath) {
  const rel = path.relative(root, filePath);
  if (path.basename(filePath) === 'upgrade-awareness-to-sing9-now.html') return;
  let html = fs.readFileSync(filePath, 'utf8');
  const href = getHref(filePath);
  const next = inject(html, href);
  if (next === html) return;
  fs.writeFileSync(filePath, next, 'utf8');
  count++;
  console.log('Injected:', rel);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name.endsWith('.html')) processFile(full);
  }
}

walk(interfacesDir);
if (fs.existsSync(path.join(root, 'index.html'))) processFile(path.join(root, 'index.html'));
const notFound = path.join(root, '404.html');
if (fs.existsSync(notFound)) processFile(notFound);

console.log('Done. Injected into', count, 'files.');
if (count === 0) console.log('(All target files already had the block.)');
