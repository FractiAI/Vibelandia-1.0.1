#!/usr/bin/env node
/**
 * HELLO — Print, store in permanent memory, and pipe.
 * Canonical rule: If the system cannot print, store in permanent memory, and pipe the word HELLO, there is no system yet.
 * NSPFRNP · Space Cloud · EGS · handshake.
 */

import { appendFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const PERMANENT_MEMORY_PATH = join(REPO_ROOT, 'data', 'HELLO');
const PIPE_PATH = join(REPO_ROOT, 'data', 'pipe');

const WORD = 'HELLO';

// 1. Print
console.log(WORD);

// 2. Store in permanent memory
const iso = new Date().toISOString();
const line = WORD + '\t' + iso + '\n';
appendFileSync(PERMANENT_MEMORY_PATH, line);

// 3. Pipe — write HELLO to canonical pipe (downstream/readers)
appendFileSync(PIPE_PATH, line);
