#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import os from 'node:os';

const checks = [
  ['node', ['-v'], true],
  ['npm', ['-v'], true],
  ['git', ['--version'], true],
  ['python', ['--version'], false],
  ['python3', ['--version'], false],
  ['ffmpeg', ['-version'], false],
  ['graphify', ['--version'], false],
];

function run(cmd, args) {
  try { return execFileSync(`${cmd} ${args.join(' ')}`, {encoding:'utf8', stdio:['ignore','pipe','pipe'], shell:true}).split('\n')[0].trim(); }
  catch { return null; }
}

console.log('Remotion + Graphify setup doctor');
console.log(`OS: ${os.type()} ${os.release()} (${os.platform()} ${os.arch()})`);
let requiredOk = true;
for (const [cmd,args,required] of checks) {
  const out = run(cmd,args);
  const label = required ? 'required' : 'optional';
  if (out) console.log(`✓ ${cmd.padEnd(10)} ${label.padEnd(8)} ${out}`);
  else {
    console.log(`${required ? '✗' : '○'} ${cmd.padEnd(10)} ${label.padEnd(8)} not found`);
    if (required) requiredOk = false;
  }
}
console.log('');
if (!requiredOk) {
  console.log('Missing required tools. Install Node.js 20+, npm and Git before running setup.');
  process.exit(1);
}
console.log('Base environment OK. Run: npm run setup');
