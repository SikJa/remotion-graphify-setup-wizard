import {readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const roots = [
  process.env.EDITOR_SCRATCH_ROOT || path.join(os.tmpdir(), 'remotion-editor-kit'),
  process.env.REMOTION_TMP_DIR,
  process.env.REMOTION_CACHE_DIR,
  process.env.EDITOR_TEMP_RENDER_DIR,
  process.env.EDITOR_PREVIEWS_DIR,
].filter(Boolean);

const sizeOf = (target) => {
  try {
    const st = statSync(target);
    if (!st.isDirectory()) return st.size;
    let total = 0;
    for (const child of readdirSync(target)) total += sizeOf(path.join(target, child));
    return total;
  } catch {
    return null;
  }
};

const rows = roots.map((root) => {
  const bytes = sizeOf(root);
  return {
    path: root,
    exists: bytes !== null,
    gb: bytes === null ? null : +(bytes / 1024 ** 3).toFixed(3),
  };
});

console.log(JSON.stringify(rows, null, 2));
