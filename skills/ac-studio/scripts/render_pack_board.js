/* Render the pack board (Stop 1a) from pack.json.
 *
 *   node render_pack_board.js <pack.json> [out.png]
 *
 * Copies the board template beside the manifest (so icons and fonts resolve
 * relatively), injects the manifest as window.PACK before the page runs, and
 * screenshots the full page at 1x. Output defaults to <pack dir>/pack-board.png.
 * Fonts: expects ../fonts (the run dir's copy) or falls back to Poppins system.
 */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

function findChrome(){
  try{ for(const d of fs.readdirSync('/opt/pw-browsers')) if(d.startsWith('chromium-')){
    const p = path.join('/opt/pw-browsers', d, 'chrome-linux', 'chrome');
    if(fs.existsSync(p)) return p; } }catch(e){}
}

(async () => {
  const mpath = path.resolve(process.argv[2] || 'pack/pack.json');
  const dir = path.dirname(mpath);
  const out = path.resolve(process.argv[3] || path.join(dir, 'pack-board.png'));
  const pack = JSON.parse(fs.readFileSync(mpath, 'utf8'));
  const tpl = path.join(__dirname, '..', 'assets', 'pack-board.template.html');
  const html = path.join(dir, '_pack-board.html');
  fs.writeFileSync(html, fs.readFileSync(tpl, 'utf8'));
  // the template's @font-face points at fonts/ — link the run's copy if it is one level up
  if (!fs.existsSync(path.join(dir, 'fonts')) && fs.existsSync(path.join(dir, '..', 'fonts')))
    { try { fs.symlinkSync(path.join('..', 'fonts'), path.join(dir, 'fonts')); } catch (e) {} }

  const browser = await chromium.launch({ executablePath: findChrome(),
    args: ['--force-color-profile=srgb', '--font-render-hinting=none', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  await page.addInitScript(p => { window.PACK = p; }, pack);
  await page.goto('file://' + html, { waitUntil: 'load' });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForFunction(() => document.body.dataset.ready === '1', null, { timeout: 20000 });
  await page.waitForTimeout(150);
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log('pack board ->', path.relative(process.cwd(), out));
})();
