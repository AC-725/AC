/* ============================================================================
   GATE 6 · APP-SAFE WINDOW  —  does the layout survive the Instagram player?
   ============================================================================
   Gates 1-2 check the FILE (nothing overlaps, nothing leaves frame). Gates 3-5
   check the CUT. Neither can see the thing that actually broke a shipped reel:
   the APP draws its own chrome on top of the video, so a frame that is
   geometrically perfect can still be unreadable in the player.

   The window was measured off AC's own Reels-player screenshot (run-log Day 23,
   second pass) and is the law for EVERY engine, not just Spine:

       top     y > 170    (status bar + "Reels" scrim)
       bottom  y < 1300   (username / caption / audio block — the opaque one)
       right   x < 930    below mid-frame only (like / comment / share rail)

   Everything a viewer must READ lives inside that box. The bottom ~620px is
   deliberately empty black; the app fills it. Compose for the app.

   This gate also covers a blind spot in gate 2. The typed caption (#subline)
   and the watermark (#wm) are SIBLINGS of the scenes, and gate 2 only ever
   compares children inside one scene — so a caption sitting on top of scene
   copy, or on top of the watermark, passes gate 2 silently. Both are tested
   here as real per-frame rectangle intersections.

   Usage:
     node audit_safearea.js <working.html> [more.html ...]     # THEME as set
     node audit_safearea.js --all-themes <working.html>        # all four
   Exits non-zero on any violation.
   ========================================================================= */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

function findChrome() {
  const b = '/opt/pw-browsers';
  for (const d of fs.readdirSync(b)) if (d.startsWith('chromium-')) {
    const p = path.join(b, d, 'chrome-linux', 'chrome');
    if (fs.existsSync(p)) return p;
  }
}
const SAFE = { top: 170, bottom: 1300, right: 930, midFrame: 960 };
const STEP = 0.1;   // dense sweep — a settle-frame check cannot see an entrance overshoot
const CLR  = 18;    // the same glyph-clearance figure gate 2 uses

const args = process.argv.slice(2);
const allThemes = args.includes('--all-themes');
const files = args.filter(a => !a.startsWith('--'));
if (!files.length) {
  console.error('usage: audit_safearea.js [--all-themes] <working.html ...>');
  process.exit(2);
}

(async () => {
  const browser = await chromium.launch({ executablePath: findChrome(),
    args: ['--force-color-profile=srgb', '--font-render-hinting=none', '--allow-file-access-from-files'] });
  let violations = 0, checked = 0;

  for (const file of files) {
    const src = fs.readFileSync(path.resolve(file), 'utf8');
    const themes = allThemes ? ['base', 'crest', 'column', 'margin'] : [null];

    for (const theme of themes) {
      let target = path.resolve(file), tmp = null;
      if (theme) {
        tmp = path.resolve(path.dirname(file), `_safearea_${theme}.html`);
        fs.writeFileSync(tmp, src.replace(/const THEME='[a-z]+';/, `const THEME='${theme}';`));
        target = tmp;
      }
      const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
      await page.goto('file://' + target, { waitUntil: 'load' });
      await page.evaluate(async () => { await document.fonts.ready; });
      await page.waitForTimeout(250);
      const TOTAL = await page.evaluate(() => window.__TOTAL);

      const sceneIds = new Set();
      const collisions = {};
      const outside = {};

      for (let t = 0; t <= TOTAL; t += STEP) {
        const r = await page.evaluate((cfg) => {
          const SAFE = cfg.SAFE, CLR = cfg.CLR;
          window.seek(cfg.tt);
          const out = { id: null, items: [], collide: [], outside: [] };

          const sc = [...document.querySelectorAll('#scenes .scene')]
            .find(s => parseFloat(getComputedStyle(s).opacity) > 0.35);
          if (sc) {
            out.id = sc.id;
            const walk = (n) => {
              for (const k of n.children) {
                const cs = getComputedStyle(k);
                if (cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.35) continue;
                const b = k.getBoundingClientRect();
                const hasText = [...k.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
                /* A leaf only counts if it actually PAINTS. Reserved spacers and empty
                   layout bands (Spine's 380px spine lane) carry no ink, and the app is
                   welcome to cover them — flagging those is noise, not a defect. */
                let paints = /^(svg|img|canvas)$/i.test(k.tagName);
                if (!paints) {
                  const bg = cs.backgroundColor || '';
                  const bgOpaque = bg && bg.indexOf('rgba(0, 0, 0, 0)') === -1 && bg !== 'transparent';
                  const bw = ['Top', 'Right', 'Bottom', 'Left']
                    .some(sd => parseFloat(cs['border' + sd + 'Width']) > 0.5);
                  paints = bgOpaque || bw || (cs.backgroundImage && cs.backgroundImage !== 'none');
                }
                if (b.height > 2 && b.width > 2 && (hasText || (k.children.length === 0 && paints))) {
                  out.items.push({ t: b.top, b: b.bottom, l: b.left, r: b.right,
                    cls: String((typeof k.className === 'string' ? k.className : '') || k.tagName),
                    txt: (k.textContent || '').trim().slice(0, 30) });
                }
                walk(k);
              }
            };
            walk(sc);
          }

          const grab = (id, textId) => {
            const e = document.getElementById(id);
            if (!e || parseFloat(getComputedStyle(e).opacity) < 0.05) return null;
            const s = textId ? document.getElementById(textId) : e;
            if (!s || !s.textContent.trim()) return null;
            const b = s.getBoundingClientRect();
            return b.height > 2 ? { t: b.top, b: b.bottom, l: b.left, r: b.right } : null;
          };
          const sub = grab('subline', 'subtxt');
          const wm  = grab('wm', null);

          const name = (c) => c.split(' ')[0] || 'el';
          for (const it of out.items) {
            const bad = [];
            if (it.t < SAFE.top) bad.push('above the top scrim');
            if (it.b > SAFE.bottom) bad.push('under the caption block');
            if (it.t > SAFE.midFrame && it.r > SAFE.right) bad.push('under the action rail');
            if (bad.length) out.outside.push(
              name(it.cls) + ' ' + bad.join(' + ') + ' — y ' + Math.round(it.t) + '..' +
              Math.round(it.b) + ' x..' + Math.round(it.r) + ' "' + it.txt + '"');
          }
          for (const [box, label] of [[sub, 'caption'], [wm, 'watermark']]) {
            if (!box) continue;
            if (box.b > SAFE.bottom || box.t < SAFE.top)
              out.outside.push(label + ' sits outside the window — y ' +
                Math.round(box.t) + '..' + Math.round(box.b) + ', the app draws over this');
            for (const it of out.items) {
              const ox = Math.min(box.r, it.r) - Math.max(box.l, it.l);
              const oy = Math.min(box.b, it.b + CLR) - Math.max(box.t, it.t - CLR);
              if (ox > 1 && oy > 1) out.collide.push(
                label + ' runs into ' + name(it.cls) + ' at y ' + Math.round(it.t) + '..' +
                Math.round(it.b) + ' "' + it.txt + '"');
            }
          }
          if (sub && wm) {
            const ox = Math.min(sub.r, wm.r) - Math.max(sub.l, wm.l);
            const oy = Math.min(sub.b, wm.b + CLR) - Math.max(sub.t, wm.t - CLR);
            if (ox > 1 && oy > 1) out.collide.push('caption and watermark share a band');
          }
          return out;
        }, { tt: +t.toFixed(2), SAFE: SAFE, CLR: CLR });

        if (r.id) sceneIds.add(r.id);
        for (const c of r.collide) collisions[c] = (collisions[c] || 0) + 1;
        for (const o of r.outside) outside[o] = (outside[o] || 0) + 1;
      }
      await page.close();
      if (tmp) fs.unlinkSync(tmp);

      const tag = path.basename(file) + (theme ? ' · ' + theme : '');
      checked += sceneIds.size;
      const problems = [...Object.entries(outside), ...Object.entries(collisions)];
      if (!problems.length) {
        console.log('ok  ' + tag + '  — ' + sceneIds.size +
          ' scenes inside 170 < y < 1300, x < 930 below mid-frame; caption and watermark clear');
      } else {
        for (const [msg, n] of problems) {
          violations++;
          console.log('VIOLATION  ' + tag + '  ' + msg + (n > 1 ? '  (' + n + ' frames)' : ''));
        }
      }
    }
  }
  await browser.close();
  if (violations) {
    console.log('\n' + violations + ' app-safe violation(s). A frame that passes gates 1-2 can still be unreadable in the player.');
    process.exit(1);
  }
  console.log('\nCLEAN — ' + checked + ' scene-checks inside the app-safe window');
})();
