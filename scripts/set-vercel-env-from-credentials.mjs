#!/usr/bin/env node
/**
 * Push env vars from .env.nspfrnp (or .env.local) to Vercel project.
 * Uses Vercel REST API. Requires VERCEL_TOKEN in env or in the same credentials file.
 *
 * Usage: node scripts/set-vercel-env-from-credentials.mjs
 * Optional: VERCEL_PROJECT_ID or VERCEL_PROJECT_NAME (default: psw-vibelandia-sing4)
 *           VERCEL_TEAM_ID if project is under a team
 *
 * Protocol: NSPFRNP
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Env keys we push to Vercel (must exist in credentials with a non-empty value)
const VERCEL_ENV_KEYS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'VIBELANDIA_SUPABASE_ANON_KEY',
  'VIBELANDIA_SUPABASE_URL',
  'VIBELANDIA_PAYPAL_CLIENT_ID',
  'NEXT_PUBLIC_PAYPAL_CLIENT_ID',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
  'NEXT_PUBLIC_WEBSITE_URL',
];

// Keys that should be stored as secret (encrypted) in Vercel
const SECRET_KEYS = new Set([
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'VIBELANDIA_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
]);

function loadEnv() {
  const envFiles = [
    join(repoRoot, '.env.nspfrnp'),
    join(repoRoot, '.env.local'),
    join(repoRoot, '.env'),
  ];
  for (const envFile of envFiles) {
    if (existsSync(envFile)) {
      console.log('📄 Loading credentials from:', envFile);
      const content = readFileSync(envFile, 'utf-8');
      const env = {};
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eq = trimmed.indexOf('=');
          if (eq > 0) {
            const key = trimmed.slice(0, eq).trim();
            let val = trimmed.slice(eq + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            env[key] = val;
          }
        }
      }
      return env;
    }
  }
  return {};
}

async function main() {
  const env = loadEnv();
  const token = env.VERCEL_TOKEN || env.VERCEL_API_TOKEN || process.env.VERCEL_TOKEN;
  if (!token) {
    console.error('❌ VERCEL_TOKEN not found. Add it to .env.nspfrnp or .env.local, or set VERCEL_TOKEN in the environment.');
    console.error('   Get a token: https://vercel.com/account/tokens');
    process.exit(1);
  }

  const projectIdOrName = env.VERCEL_PROJECT_ID || env.VERCEL_PROJECT_NAME || process.env.VERCEL_PROJECT_ID || process.env.VERCEL_PROJECT_NAME || 'psw-vibelandia-sing4';
  const teamId = env.VERCEL_TEAM_ID || process.env.VERCEL_TEAM_ID;

  const toPush = VERCEL_ENV_KEYS.filter((key) => {
    const v = env[key] || process.env[key];
    return typeof v === 'string' && v.length > 0;
  });

  if (toPush.length === 0) {
    console.log('⚠️  No credentials to push. Set at least one of:', VERCEL_ENV_KEYS.join(', '));
    console.log('   in .env.nspfrnp or .env.local (values are read from the file only, not from current process.env for security).');
    process.exit(1);
  }

  console.log('📤 Pushing', toPush.length, 'env var(s) to Vercel project:', projectIdOrName);
  if (teamId) console.log('   Team:', teamId);

  const baseUrl = 'https://api.vercel.com/v10/projects/' + encodeURIComponent(projectIdOrName) + '/env';
  const targets = ['production', 'preview'];

  for (const key of toPush) {
    const value = env[key] || process.env[key];
    const type = SECRET_KEYS.has(key) ? 'secret' : 'plain';
    const url = baseUrl + '?upsert=true' + (teamId ? '&teamId=' + encodeURIComponent(teamId) : '');
    const body = { key, value, type, target: targets };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error('   ❌', key, res.status, err.slice(0, 200));
        continue;
      }
      console.log('   ✅', key, '(' + type + ')');
    } catch (e) {
      console.error('   ❌', key, e.message);
    }
  }

  console.log('\n✅ Done. Redeploy the project for changes to take effect.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
