#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const apply = process.argv.includes('--apply');
const root = process.cwd();
const configPath = path.join(root, 'remotion-system.config.json');
let cfg = {};
if (fs.existsSync(configPath)) cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const candidates = new Set([
  path.join(root, '.cache'),
  path.join(root, 'node_modules', '.cache'),
  path.join(root, 'Remotion', 'node_modules', '.cache'),
  path.join(root, 'Remotion', '.cache'),
]);

const scratch = cfg.paths?.scratch ? path.resolve(cfg.paths.scratch) : path.join(root, 'Scratch');
for (const sub of ['.cache', 'cache', 'tmp', 'temp', 'remotion-cache']) {
  candidates.add(path.join(scratch, sub));
}

// Conservative OS temp candidates: only Remotion-named temp dirs are considered.
const tempRoots = [os.tmpdir(), process.env.TMP, process.env.TEMP].filter(Boolean);
for (const t of tempRoots) {
  if (!fs.existsSync(t)) continue;
  for (const name of fs.readdirSync(t)) {
    if (/^remotion[-_.]/i.test(name) || /^remotion$/i.test(name)) {
      candidates.add(path.join(t, name));
    }
  }
}

function sizeOf(p) {
  if (!fs.existsSync(p)) return 0;
  const st = fs.statSync(p);
  if (st.isFile()) return st.size;
  let total = 0;
  for (const entry of fs.readdirSync(p)) total += sizeOf(path.join(p, entry));
  return total;
}
function fmt(bytes) { return `${(bytes / 1024 / 1024).toFixed(1)} MB`; }

const protectedNames = /Videos Finales|Assets Pesados|Recursos|Inbox|Publicaciones|Backups|Renders Viejos/i;
console.log(apply
  ? 'Applying cleanup only to known cache/temp folders...'
  : 'Dry run. No files are changed. Use --apply only after reviewing the list.'
);

let total = 0;
for (const p of [...candidates].sort()) {
  if (!fs.existsSync(p)) continue;
  if (protectedNames.test(p)) continue;
  const bytes = sizeOf(p);
  if (bytes === 0) continue;
  total += bytes;
  console.log(`${apply ? 'remove' : 'candidate'}: ${p} (${fmt(bytes)})`);
  if (apply) fs.rmSync(p, { recursive: true, force: true });
}
console.log(`${apply ? 'Removed' : 'Potential cleanup'}: ${fmt(total)}`);
