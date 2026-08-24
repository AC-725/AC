/* Regenerate every baked vault asset from the three.js scenes in bake/.
 *
 *   node bake_vault.js [outdir]        default: ../baked-vault
 *   node bake_vault.js --check         bake to a temp dir and diff against the shipped set
 *
 * WHY: the 45 PNGs in assets/baked-vault/ shipped on Day 38 with NO generator anywhere in
 * the skill. open_draft.html and signoff_draft.html are three-tile contact sheets frozen at
 * fixed phases — they never produced a frame sequence. The run-log records that the mark
 * geometry is a REDRAW standing in until AC's real logo file arrives; when it does, all 45
 * frames plus the cover corner have to be rebuilt, and without this that means by hand.
 *
 * Everything the frames depend on lives in lib/vault.js. Change the mark there, re-run
 * this, and the whole set moves together.
 *
 * NOTE ON CHROMIUM FLAGS: none of the --use-gl / --use-angle flags are needed. Measured
 * 2026-08-24: this Chromium already defaults to ANGLE/SwiftShader and renders identically
 * with and without them. These are render_frames.js's exact args, deliberately, so a scene
 * that bakes here also renders in the reel engine. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ARGS = ['--force-color-profile=srgb', '--font-render-hinting=none', '--allow-file-access-from-files'];
const HERE = __dirname;
const SHIPPED = path.resolve(HERE, '..', 'baked-vault');

const check = process.argv.includes('--check');
const movesOnly = process.argv.includes('--moves');

/* THE MOVE REGISTRY (route 1). Each entry bakes to assets/baked-moves/<name>_NN.png at
 * the CSS box size its slot actually uses, not the full frame - the mark open already
 * proves the pattern (720x792 frames in a 224x246 box). Baking at slot size is the
 * difference between a usable library and hundreds of megabytes of PNG.
 *
 * `scene` is the reel scene the move is designed for. `frames` is its own frame budget:
 * a move that only has to read once wants fewer frames than one carrying a whole beat. */
const MOVES = [
  { name: 'bars',   w: 560,  h: 420,  frames: 18, scene: 'C', note: 'proof - bars rise with the odometer' },
  { name: 'toggle', w: 620,  h: 520,  frames: 18, scene: 'B', note: 'shift - wrong card greys and recedes' },
  { name: 'dolly',  w: 1080, h: 1920, frames: 20, scene: 'D', note: 'rule - dolly zoom on the ground' },
];
const OUT = check
  ? fs.mkdtempSync(path.join(require('os').tmpdir(), 'vaultbake-'))
  : path.resolve(process.argv[2] || SHIPPED);

/* frame counts are the template's contract - vaultTick() indexes 0..19 and 0..23 */
const OPEN_FRAMES = 20, STING_FRAMES = 24;

async function openPage(browser, file, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e).split('\n')[0]));
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
  await page.goto('file://' + path.resolve(HERE, 'bake', file), { waitUntil: 'load' });
  await page.waitForFunction(() => window.__READY === true, { timeout: 20000 })
    .catch(() => { throw new Error(`${file} never set __READY. errors: ${errs.join(' | ') || '(none)'}`); });
  if (errs.length) console.warn(`  ! ${file}:`, [...new Set(errs)].slice(0, 3).join(' | '));
  return page;
}

async function bakeMoves(browser) {
  const dir = check ? path.join(OUT, 'moves') : path.resolve(HERE, '..', 'baked-moves');
  fs.mkdirSync(dir, { recursive: true });
  for (const m of MOVES) {
    const page = await openPage(browser, path.join('moves', `${m.name}.html`), m.w, m.h);
    const cv = await page.$('canvas');
    for (let k = 0; k < m.frames; k++) {
      await page.evaluate(t => window.seek(t), k / (m.frames - 1));
      await cv.screenshot({ path: path.join(dir, `${m.name}_${String(k).padStart(2, '0')}.png`),
        omitBackground: true });
    }
    await page.close();
    console.log(`move ${m.name.padEnd(7)}: ${m.frames} frames ${m.w}x${m.h}  -> scene ${m.scene}  (${m.note})`);
  }
  return dir;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ARGS });

  if (movesOnly) {
    const dir = await bakeMoves(browser);
    await browser.close();
    console.log(`\nwrote ${fs.readdirSync(dir).length} move frames to ${dir}`);
    return;
  }

  // ---- open: 20 transparent frames, assemble 0 -> 1 ----
  const op = await openPage(browser, 'open.html', 720, 792);
  const opCanvas = await op.$('canvas');
  for (let k = 0; k < OPEN_FRAMES; k++) {
    await op.evaluate(t => window.seek(t), k / (OPEN_FRAMES - 1));
    await opCanvas.screenshot({ path: path.join(OUT, `open_${String(k).padStart(2, '0')}.png`), omitBackground: true });
  }
  console.log(`open   : ${OPEN_FRAMES} frames`);
  await op.close();

  // ---- sting: 24 opaque frames, one full sway; plus the mark-less floor ----
  const st = await openPage(browser, 'sting.html', 1080, 1920);
  const stCanvas = await st.$('canvas');
  for (let k = 0; k < STING_FRAMES; k++) {
    await st.evaluate(t => window.seek(t), k / STING_FRAMES);   // /24 not /23 — frame 24 == frame 0, so it loops
    await stCanvas.screenshot({ path: path.join(OUT, `sting_${String(k).padStart(2, '0')}.png`) });
  }
  console.log(`sting  : ${STING_FRAMES} frames`);

  await st.evaluate(() => { window.MARK.visible = false; window.seek(0); });
  await stCanvas.screenshot({ path: path.join(OUT, 'vault_floor.png') });
  console.log('floor  : 1 frame');
  await st.close();

  // ---- cover corner mark: one static transparent asset ----
  const cp = await openPage(browser, 'corner.html', 150, 178);
  const cpCanvas = await cp.$('canvas');
  await cpCanvas.screenshot({ path: path.join(OUT, 'mark_corner.png'), omitBackground: true });
  console.log('corner : 1 frame');
  await cp.close();

  await browser.close();

  if (check) {
    console.log(`\nbaked to ${OUT}\n--- diff against shipped ---`);
    let same = 0, diff = 0, missing = 0;
    for (const f of fs.readdirSync(OUT)) {
      const a = path.join(OUT, f), b = path.join(SHIPPED, f);
      if (!fs.existsSync(b)) { missing++; continue; }
      (Buffer.compare(fs.readFileSync(a), fs.readFileSync(b)) === 0 ? same++ : diff++);
    }
    console.log(`byte-identical: ${same}   differ: ${diff}   not in shipped: ${missing}`);
    console.log(`compare visually:  ${OUT}`);
  } else {
    console.log(`\nwrote ${fs.readdirSync(OUT).length} files to ${OUT}`);
  }
})();
