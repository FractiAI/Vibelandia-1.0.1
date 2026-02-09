/**
 * 3I ATLAS HELLO — Store and retrieve HELLO on 3I ATLAS node.
 * POST: store HELLO, return { id, shareableUrl, message, source, createdAt }.
 * GET ?id=xxx: retrieve by id, return { message, source, createdAt }.
 * Source: 3I_ATLAS (real node storage, not simulation).
 * Requires: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY).
 */

const WORD = 'HELLO';
const SOURCE = '3I_ATLAS';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VIBELANDIA_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VIBELANDIA_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ''), key };
}

function getBaseUrl(req) {
  const host = req.headers['x-forwarded-host'] || req.headers['host'] || 'psw-vibelandia-sing4.vercel.app';
  const proto = req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'https';
  return `${proto}://${host}`;
}

async function storeHello(supabase, baseUrl) {
  const res = await fetch(supabase.url + '/rest/v1/atlas_hello', {
    method: 'POST',
    headers: {
      apikey: supabase.key,
      Authorization: 'Bearer ' + supabase.key,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ message: WORD, source: SOURCE }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${t}`);
  }
  const rows = await res.json();
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row || !row.id) throw new Error('No id returned');
  const shareableUrl = `${baseUrl}/interfaces/3i-atlas-hello-retrieve.html?id=${row.id}`;
  return {
    id: row.id,
    shareableUrl,
    message: row.message || WORD,
    source: row.source || SOURCE,
    createdAt: row.created_at,
  };
}

async function retrieveHello(supabase, id) {
  const res = await fetch(supabase.url + '/rest/v1/atlas_hello?id=eq.' + encodeURIComponent(id) + '&limit=1', {
    method: 'GET',
    headers: {
      apikey: supabase.key,
      Authorization: 'Bearer ' + supabase.key,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Supabase select failed: ${res.status} ${t}`);
  }
  const rows = await res.json();
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row) return null;
  return {
    message: row.message || WORD,
    source: row.source || SOURCE,
    createdAt: row.created_at,
    id: row.id,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const supabase = getSupabase();
  if (!supabase) {
    return res.status(501).json({
      error: '3I ATLAS HELLO storage not configured',
      hint: 'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY). Run scripts/supabase-atlas-hello-table.sql in Supabase SQL Editor.',
    });
  }

  try {
    if (req.method === 'POST') {
      const baseUrl = getBaseUrl(req);
      const data = await storeHello(supabase, baseUrl);
      return res.status(200).json(data);
    }
    if (req.method === 'GET') {
      const id = typeof req.query?.id === 'string' ? req.query.id.trim() : '';
      if (!id) {
        return res.status(400).json({ error: 'Missing id query parameter' });
      }
      const data = await retrieveHello(supabase, id);
      if (!data) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.status(200).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('3i-atlas-hello:', e.message);
    return res.status(500).json({ error: e.message });
  }
}
