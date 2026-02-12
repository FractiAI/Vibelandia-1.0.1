#!/usr/bin/env node
/**
 * Ingest Social Journal — Facebook & Instagram data exports.
 * Consume and metabolize: raw text preserved for genuine dialogs and scenes.
 * Output: data/social-journal/YYYY/YYYY-MM.md; media → interfaces/assets/social-journal/; index.json for Seed journal.
 *
 * Usage (turnkey):
 *   npm run ingest-social-journal
 *   — Put facebook.zip and instagram.zip in data/social-journal/incoming/ then run. Script unzips and ingests.
 * Or with paths:
 *   node scripts/ingest-social-journal.mjs [facebook.zip or folder] [instagram.zip or folder]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outJournal = path.join(root, 'data', 'social-journal');
const outAssets = path.join(root, 'interfaces', 'assets', 'social-journal');
const defaultIncoming = path.join(outJournal, 'incoming');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function extractZip(zipPath, outDir) {
  ensureDir(outDir);
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(outDir, true);
  return outDir;
}

/** Resolve path: if .zip, extract to temp dir and return that dir; else return path. */
function resolveExportPath(inputPath) {
  if (!inputPath || !fs.existsSync(inputPath)) return null;
  const stat = fs.statSync(inputPath);
  if (stat.isDirectory()) return inputPath;
  if (stat.isFile() && inputPath.toLowerCase().endsWith('.zip')) {
    const base = path.basename(inputPath, '.zip');
    const outDir = path.join(path.dirname(inputPath), base);
    extractZip(inputPath, outDir);
    return outDir;
  }
  return inputPath;
}

function parseTimestamp(ts) {
  if (!ts) return null;
  const d = new Date(ts);
  return isNaN(d.getTime()) ? null : d;
}

function safeFilename(prefix, dateStr, index, ext) {
  const base = `${prefix}-${dateStr}-${String(index).padStart(3, '0')}${ext}`;
  return base.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// ---- Instagram: content/posts_1.json (or posts.json) + media in content/
function findInstagramPosts(instaDir) {
  const contentDir = path.join(instaDir, 'content');
  if (!fs.existsSync(contentDir)) return [];
  const posts = [];
  const seen = new Set();
  const walk = (dir) => {
    const names = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of names) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.match(/^posts(\d*)\.json$/i) || e.name === 'posts.json') {
        try {
          const raw = fs.readFileSync(full, 'utf8');
          const data = JSON.parse(raw);
          const list = Array.isArray(data) ? data : data?.media || data?.posts || [];
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const id = item.id || item.uri || `${path.basename(full)}-${i}`;
            if (seen.has(id)) continue;
            seen.add(id);
            const caption = item.caption ?? item.title ?? item.description ?? '';
            const ts = parseTimestamp(item.timestamp || item.creation_timestamp || item.taken_at);
            const media = item.media || item.photos || item.videos || [];
            const uris = Array.isArray(media) ? media.map((m) => (m.uri ?? m.path ?? m)).filter(Boolean) : [];
            posts.push({
              source: 'instagram',
              timestamp: ts,
              rawText: typeof caption === 'string' ? caption : (caption?.text ?? ''),
              mediaUris: uris,
              contentDir: path.dirname(full),
              exportRoot: instaDir,
            });
          }
        } catch (err) {
          console.warn('Skip', full, err.message);
        }
      }
    }
  };
  walk(contentDir);
  return posts.sort((a, b) => (a.timestamp && b.timestamp ? a.timestamp - b.timestamp : 0));
}

// ---- Facebook: your_posts_1.json or posts/your_posts_1.json
function findFacebookPosts(fbDir) {
  const posts = [];
  const candidates = [
    path.join(fbDir, 'your_posts_1.json'),
    path.join(fbDir, 'posts', 'your_posts_1.json'),
    path.join(fbDir, 'your_posts.json'),
    path.join(fbDir, 'posts_and_comments', 'posts', 'your_posts_1.json'),
  ];
  for (const p of candidates) {
    if (!fs.existsSync(p)) continue;
    try {
      const raw = fs.readFileSync(p, 'utf8');
      const data = JSON.parse(raw);
      const list = Array.isArray(data) ? data : data?.status_updates ?? data?.posts ?? [];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const ts = parseTimestamp(item.timestamp || item.created_time || item.update_timestamp);
        let text = '';
        if (item.data) {
          const d = Array.isArray(item.data) ? item.data[0] : item.data;
          text = d?.post ?? d?.status ?? d?.update ?? '';
        }
        if (!text && item.post) text = item.post;
        if (!text && item.status) text = item.status;
        const attachments = item.attachments || [];
        const mediaUris = [];
        for (const att of attachments) {
          const d = att.data;
          if (d && Array.isArray(d)) d.forEach((x) => { if (x.media?.uri) mediaUris.push(x.media.uri); });
          else if (d?.media?.uri) mediaUris.push(d.media.uri);
        }
        posts.push({
          source: 'facebook',
          timestamp: ts,
          rawText: typeof text === 'string' ? text : (text?.[0]?.post ?? ''),
          mediaUris,
          contentDir: path.dirname(p),
          exportRoot: fbDir,
        });
      }
      break;
    } catch (err) {
      console.warn('Skip', p, err.message);
    }
  }
  return posts.sort((a, b) => (a.timestamp && b.timestamp ? a.timestamp - b.timestamp : 0));
}

// ---- Resolve media path relative to export
function resolveMediaPath(uri, contentDir, exportRoot) {
  const normalized = uri.replace(/^\.\//, '').replace(/\\/g, '/');
  for (const base of [contentDir, path.join(exportRoot, 'content'), exportRoot]) {
    const full = path.join(base, normalized);
    if (fs.existsSync(full)) return full;
    const full2 = path.join(base, path.basename(normalized));
    if (fs.existsSync(full2)) return full2;
  }
  return null;
}

// ---- Write one post to year/month MD and copy media
const entriesByKey = new Map(); // "YYYY-MM" -> array of { date, source, rawText, mediaRefs }

function emitEntry(post, copiedRefs) {
  const d = post.timestamp || new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const key = `${y}-${m}`;
  if (!entriesByKey.has(key)) entriesByKey.set(key, []);
  entriesByKey.get(key).push({
    date: d.toISOString().slice(0, 10),
    source: post.source,
    rawText: post.rawText || '',
    mediaRefs: copiedRefs || [],
  });
}

function copyMediaAndEmit(post, contentDir, exportRoot) {
  const copiedRefs = [];
  for (let i = 0; i < (post.mediaUris || []).length; i++) {
    const uri = post.mediaUris[i];
    const src = resolveMediaPath(uri, contentDir || post.contentDir, exportRoot || post.exportRoot);
    if (!src || !fs.existsSync(src)) continue;
    const ext = path.extname(src) || '.jpg';
    const dateStr = (post.timestamp || new Date()).toISOString().slice(0, 10).replace(/-/g, '-');
    const name = safeFilename(post.source, dateStr, copiedRefs.length, ext);
    ensureDir(outAssets);
    const dest = path.join(outAssets, name);
    try {
      fs.copyFileSync(src, dest);
      copiedRefs.push(name);
    } catch (e) {
      console.warn('Copy failed', src, e.message);
    }
  }
  emitEntry(post, copiedRefs);
}

// ---- Write all YYYY/YYYY-MM.md
function writeMarkdownFiles() {
  for (const [key, entries] of entriesByKey) {
    const [y, m] = key.split('-');
    const dir = path.join(outJournal, y);
    ensureDir(dir);
    const file = path.join(dir, `${key}.md`);
    const lines = [
      `# Social Journal — ${key}`,
      '',
      'Raw text preserved for genuine dialogs and scenes. Source: Facebook · Instagram.',
      '',
      '---',
      '',
    ];
    for (const e of entries) {
      lines.push(`## ${e.date} · ${e.source}`);
      lines.push('');
      if (e.rawText) lines.push(e.rawText.trim());
      lines.push('');
      if (e.mediaRefs.length) {
        lines.push('Media: ' + e.mediaRefs.map((r) => `\`assets/social-journal/${r}\``).join(', '));
        lines.push('');
      }
      lines.push('---');
      lines.push('');
    }
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    console.log('Wrote', file);
  }
}

// ---- Write index for Seed journal page
function writeIndexJson() {
  const months = [...entriesByKey.keys()].sort().reverse();
  const byYear = {};
  for (const key of months) {
    const y = key.slice(0, 4);
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(key);
  }
  for (const y of Object.keys(byYear)) byYear[y].sort().reverse();
  const index = {
    generated: new Date().toISOString(),
    months,
    byYear,
    totalEntries: [...entriesByKey.values()].reduce((s, arr) => s + arr.length, 0),
  };
  const indexPath = path.join(outJournal, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
  console.log('Wrote', indexPath);
}

// ---- Main: resolve paths (ZIP or folder); default = incoming/facebook.zip or .../instagram.zip
const args = process.argv.slice(2);
let fbInput = args[0] || path.join(defaultIncoming, 'facebook');
let instaInput = args[1] || path.join(defaultIncoming, 'instagram');
if (!args.length) {
  const fbZip = path.join(defaultIncoming, 'facebook.zip');
  const instaZip = path.join(defaultIncoming, 'instagram.zip');
  if (fs.existsSync(fbZip)) fbInput = fbZip;
  if (fs.existsSync(instaZip)) instaInput = instaZip;
}
const fbDir = resolveExportPath(fbInput);
const instaDir = resolveExportPath(instaInput);

console.log('Ingest Social Journal — metabolize all');
console.log('Facebook:', fbInput, fbDir ? '(resolved)' : '(not found)');
console.log('Instagram:', instaInput, instaDir ? '(resolved)' : '(not found)');

if (fbDir && fs.existsSync(fbDir)) {
  const fbPosts = findFacebookPosts(fbDir);
  console.log('Facebook posts found:', fbPosts.length);
  for (const post of fbPosts) copyMediaAndEmit(post, post.contentDir, post.exportRoot);
} else {
  console.log('Facebook: skip (no export).');
}

if (instaDir && fs.existsSync(instaDir)) {
  const instaPosts = findInstagramPosts(instaDir);
  console.log('Instagram posts found:', instaPosts.length);
  for (const post of instaPosts) copyMediaAndEmit(post, post.contentDir, post.exportRoot);
} else {
  console.log('Instagram: skip (no export).');
}

writeMarkdownFiles();
if (entriesByKey.size > 0) writeIndexJson();

const total = [...entriesByKey.values()].reduce((s, arr) => s + arr.length, 0);
console.log('Total entries metabolized:', total);
console.log('Output: data/social-journal/YYYY/YYYY-MM.md; media → interfaces/assets/social-journal/');
