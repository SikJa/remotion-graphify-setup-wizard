import {rmSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const apply = process.argv.includes('--apply');
const dirs = [...new Set([
  process.env.REMOTION_TMP_DIR,
  path.join(process.env.EDITOR_SCRATCH_ROOT || path.join(os.tmpdir(), 'remotion-editor-kit'), 'remotion-tmp'),
].filter(Boolean))];

let count = 0;
let bytes = 0;
let failed = 0;
const candidates = [];

const sizeOf = (target) => {
  try {
    const st = statSync(target);
    if (!st.isDirectory()) return st.size;
    let total = 0;
    for (const child of readdirSync(target)) total += sizeOf(path.join(target, child));
    return total;
  } catch {
    return 0;
  }
};

for (const dir of dirs) {
  try {
    for (const entry of readdirSync(dir)) {
      if (!entry.toLowerCase().startsWith('remotion')) continue;
      const target = path.join(dir, entry);
      const size = sizeOf(target);
      candidates.push({target, size});
      if (!apply) continue;
      try {
        rmSync(target, {recursive: true, force: true, maxRetries: 2, retryDelay: 250});
        count++;
        bytes += size;
      } catch (error) {
        failed++;
        console.warn(`[clean-remotion-temp] failed ${target}: ${error.message}`);
      }
    }
  } catch {
    // ignore missing temp roots
  }
}

console.log(JSON.stringify({
  mode: apply ? 'apply' : 'dry-run',
  candidates: candidates.map((item) => ({path: item.target, gb: +(item.size / 1024 ** 3).toFixed(3)})),
  deleted_items: count,
  deleted_gb: +(bytes / 1024 ** 3).toFixed(3),
  failed,
}, null, 2));

if (!apply) console.log('\nDry-run only. Re-run with --apply after reviewing candidates.');
