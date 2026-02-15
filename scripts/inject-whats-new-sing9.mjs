#!/usr/bin/env node
/**
 * Inject "What's New in SING! 9" wrapper + script into every HTML file that has <body> and doesn't already have it.
 * Run from repo root: node scripts/inject-whats-new-sing9.mjs
 * Key experiences (index, office-hours, launch-pad, navigator, sing-pulse, space-cloud-division, test-drive-showroom,
 * oh-line, chairman-workspace, payment-checkout, vibelandia-amusement-park-menu, ar4366, buyers-guide,
 * one-page-appraisal) are already updated manually; this script fills in the rest of interfaces/* and 404 if present.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const interfacesDir = path.join(root, 'interfaces');

function relToInterfaces(filePath) {
  const dir = path.dirname(filePath);
  const rel = path.relative(dir, path.join(root, 'interfaces'));
  const segs = rel.split(path.sep).filter(Boolean);
  if (segs.length === 0) return 'whats-new-sing9.js';
  return path.join(...segs, 'whats-new-sing9.js').replace(/\\/g, '/');
}

function inject(html, scriptSrc) {
  const marker = '<div id="whats-new-sing9-wrap"></div>';
  const script = `<script src="${scriptSrc}"></script>`;
  const block = marker + '\n        ' + script;
  // Insert right after <body> or <body ...>
  const bodyOpen = html.match(/<body[^>]*>/);
  if (!bodyOpen) return html;
  const after = bodyOpen[0].length + html.indexOf(bodyOpen[0]);
  const beforeContent = html.slice(0, after);
  const afterContent = html.slice(after);
  const trimmed = afterContent.replace(/^[\r\n]+/, '');
  const indent = afterContent.match(/^([ \t]*)/)?.[1] ?? '    ';
  return beforeContent + '\n    ' + marker + '\n    ' + script + '\n' + indent + trimmed;
}

let count = 0;
function processFile(filePath) {
  const rel = path.relative(root, filePath);
  let html = fs.readFileSync(filePath, 'utf8');
  if (html.includes('whats-new-sing9-wrap')) return;
  if (!html.includes('<body')) return;
  const scriptSrc = rel.startsWith('interfaces') ? relToInterfaces(filePath) : 'interfaces/whats-new-sing9.js';
  const next = inject(html, scriptSrc);
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

// Root index
const indexHtml = path.join(root, 'index.html');
if (fs.existsSync(indexHtml)) processFile(indexHtml);
// 404 if present
const notFound = path.join(root, '404.html');
if (fs.existsSync(notFound)) processFile(notFound);
// All interfaces
walk(interfacesDir);
console.log('Done. Injected into', count, 'files.');
if (count === 0) console.log('(All target files already had the block.)');
