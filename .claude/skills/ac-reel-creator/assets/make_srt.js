#!/usr/bin/env node
/* make_srt.js — extract CONTENT.subs from a filled reel/tod template and write SRT.
 * Usage: node make_srt.js <filled-template.html> <out.srt>
 * The subs array is the same data that bakes the on-video subtitle lane, so the
 * sidecar can never drift from what the video shows. Exits 1 if subs are missing —
 * every reel ships with subtitles, so an empty lane is an error, not a default.
 */
const fs = require('fs');
const vm = require('vm');

const [,, inPath, outPath] = process.argv;
if (!inPath || !outPath) { console.error('usage: node make_srt.js <template.html> <out.srt>'); process.exit(1); }

const html = fs.readFileSync(inPath, 'utf8');

// Bracket-match the CONTENT object literal.
const start = html.indexOf('const CONTENT={');
if (start === -1) { console.error('make_srt: no CONTENT object found'); process.exit(1); }
let i = html.indexOf('{', start), depth = 0, end = -1;
for (; i < html.length; i++) {
  const c = html[i];
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}
if (end === -1) { console.error('make_srt: unbalanced CONTENT braces'); process.exit(1); }

const src = html.slice(start, end);
const sandbox = {};
vm.runInNewContext("const HANDLE='';" + src + "; __out = CONTENT;", sandbox, { timeout: 1000 });
const subs = sandbox.__out && sandbox.__out.subs;
if (!Array.isArray(subs) || subs.length === 0) {
  console.error('make_srt: CONTENT.subs missing or empty — every reel must carry subtitles');
  process.exit(1);
}

function ts(sec) {
  const ms = Math.round(sec * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60,
        s = Math.floor(ms / 1000) % 60, r = ms % 1000;
  const p = (n, w) => String(n).padStart(w, '0');
  return `${p(h,2)}:${p(m,2)}:${p(s,2)},${p(r,3)}`;
}

const srt = subs.map((e, n) => `${n + 1}\n${ts(e.t0)} --> ${ts(e.t1)}\n${e.text}\n`).join('\n');
fs.writeFileSync(outPath, srt);
console.log(`make_srt: wrote ${subs.length} cues to ${outPath}`);
