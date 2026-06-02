import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const SCRATCH_ROOT = process.env.EDITOR_SCRATCH_ROOT || path.join(os.tmpdir(), 'remotion-editor-kit');
const REMOTION_TMP = process.env.REMOTION_TMP_DIR || path.join(SCRATCH_ROOT, 'remotion-tmp');
const REMOTION_CACHE = process.env.REMOTION_CACHE_DIR || path.join(SCRATCH_ROOT, 'remotion-cache');
const PREVIEWS = process.env.EDITOR_PREVIEWS_DIR || path.join(SCRATCH_ROOT, 'previews');
const TEMPORARY_RENDERS = process.env.EDITOR_TEMP_RENDER_DIR || path.join(SCRATCH_ROOT, 'temporary-renders');

for (const dir of [SCRATCH_ROOT, REMOTION_TMP, REMOTION_CACHE, PREVIEWS, TEMPORARY_RENDERS]) {
  mkdirSync(dir, {recursive: true});
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/remotion-safe.mjs <remotion-command> [...args]');
  process.exit(1);
}

const env = {
  ...process.env,
  TEMP: REMOTION_TMP,
  TMP: REMOTION_TMP,
  TMPDIR: REMOTION_TMP,
  REMOTION_CACHE_DIR: REMOTION_CACHE,
  EDITOR_SCRATCH_ROOT: SCRATCH_ROOT,
  EDITOR_PREVIEWS_DIR: PREVIEWS,
  EDITOR_TEMP_RENDER_DIR: TEMPORARY_RENDERS,
};

console.log(`[remotion-safe] temp=${REMOTION_TMP}`);
console.log(`[remotion-safe] cache=${REMOTION_CACHE}`);

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(command, ['remotion', ...args], {
  stdio: 'inherit',
  env,
  shell: process.platform === 'win32',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(`[remotion-safe] Failed to start Remotion: ${error.message}`);
  process.exit(1);
});
