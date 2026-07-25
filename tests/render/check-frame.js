/* Renders the screenshot frame template and asserts its structure. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const findChrome = require('./find-chrome');

(async () => {
  const tpl = path.resolve(__dirname, '../../.claude/assets/screenshot-frame.template.html');
  if (!fs.existsSync(tpl)) {
    console.error('FAIL: template missing at ' + tpl);
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto('file://' + tpl);
  await page.evaluate(async () => { await document.fonts.ready; });

  const out = await page.evaluate(() => {
    const frame = document.querySelector('.frame');
    const cap = document.querySelector('.caption');
    return {
      hasFrame: !!frame,
      hasCaption: !!cap,
      // getComputedStyle().fontFamily returns the SPECIFIED family list, not the
      // font actually resolved, so it matches even when nothing loaded and
      // Chromium fell back to a default sans. document.fonts.check() is no help
      // either — it returns true for an uninstalled system family. The only
      // reliable probe is rendered width against a family that cannot exist:
      // identical widths mean both landed on the same fallback.
      captionFontResolved: (function () {
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
        return widthOf("'JetBrains Mono'") !== widthOf("'NoSuchFamily-ZZ9'");
      })(),
      captionFontSpecified: cap ? getComputedStyle(cap).fontFamily : '',
      bg: getComputedStyle(document.body).backgroundColor,
    };
  });

  await browser.close();

  const failures = [];
  if (!out.hasFrame) failures.push('missing .frame');
  if (!out.hasCaption) failures.push('missing .caption');
  if (!/JetBrains Mono/.test(out.captionFontSpecified)) {
    failures.push('caption not declared mono: ' + out.captionFontSpecified);
  }
  if (!out.captionFontResolved) {
    failures.push('JetBrains Mono declared but not installed — run .claude/scripts/install-fonts.sh');
  }
  if (out.bg !== 'rgb(10, 10, 10)') failures.push('background not #0A0A0A: ' + out.bg);

  if (failures.length) {
    console.error('FAIL: ' + failures.join('; '));
    process.exit(1);
  }
  console.log('PASS: frame template well-formed');
})();
