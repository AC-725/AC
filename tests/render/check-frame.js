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
    const verdict = document.querySelector('.verdict');
    return {
      hasFrame: !!frame,
      hasCaption: !!cap,
      verdictVisible: verdict ? getComputedStyle(verdict).display !== 'none' : false,
      captionFont: cap ? getComputedStyle(cap).fontFamily : '',
      bg: getComputedStyle(document.body).backgroundColor,
    };
  });

  await browser.close();

  const failures = [];
  if (!out.hasFrame) failures.push('missing .frame');
  if (!out.hasCaption) failures.push('missing .caption');
  if (!/JetBrains Mono/.test(out.captionFont)) failures.push('caption not mono: ' + out.captionFont);
  if (out.bg !== 'rgb(10, 10, 10)') failures.push('background not #0A0A0A: ' + out.bg);

  if (failures.length) {
    console.error('FAIL: ' + failures.join('; '));
    process.exit(1);
  }
  console.log('PASS: frame template well-formed');
})();
