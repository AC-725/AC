/* Asserts Chromium actually resolves the brand fonts.
 * A missing font falls back silently, so compare rendered width against a
 * known-different family: identical widths mean no font loaded.
 *
 * DEVIATION FROM BRIEF (documented in task-2-report.md): the brief's original
 * reference point was the CSS generic keyword ('sans-serif' / 'monospace').
 * Empirically, on this host, Chromium resolves an *unrecognized quoted family
 * name* (what 'Space Grotesk' or 'JetBrains Mono' are before install) through
 * a different fallback path than the generic keywords -- unrecognized names
 * land on Noto Sans, while sans-serif lands on Liberation Sans/Arimo and
 * monospace lands on DejaVu Sans Mono. Those are three different fonts with
 * three different widths, so the brief's comparison produced a false PASS
 * even with neither brand font installed (verified: see task-2-report.md).
 * A guaranteed-nonexistent family name goes through the same "unrecognized
 * name" fallback path as the brand names do pre-install, and was verified
 * to land on the identical width (586.640625px) in that state -- so it is
 * used here as the control instead. Everything else matches the brief. */
const { chromium } = require('playwright');
const path = require('path');
const findChrome = require('./find-chrome');

(async () => {
  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'probe-font.html'));
  await page.evaluate(async () => { await document.fonts.ready; });

  const results = await page.evaluate(() => {
    function widthOf(family) {
      const el = document.createElement('span');
      el.style.cssText = 'position:absolute;font-size:120px;white-space:nowrap';
      el.style.fontFamily = family;
      el.textContent = 'WjgpMi010';
      document.body.appendChild(el);
      const w = el.getBoundingClientRect().width;
      el.remove();
      return w;
    }
    const NONEXISTENT = "'AC Probe Nonexistent Font 9f2c'";
    return {
      grotesk: widthOf("'Space Grotesk'"),
      groteskFallback: widthOf(NONEXISTENT),
      mono: widthOf("'JetBrains Mono'"),
      monoFallback: widthOf(NONEXISTENT),
    };
  });

  await browser.close();

  const failures = [];
  if (results.grotesk === results.groteskFallback) failures.push('Space Grotesk did not load');
  if (results.mono === results.monoFallback) failures.push('JetBrains Mono did not load');

  if (failures.length) {
    console.error('FAIL: ' + failures.join('; '));
    console.error(JSON.stringify(results));
    process.exit(1);
  }
  console.log('PASS: both brand fonts resolved');
})();
