/* Bake the imagery pack: render every object in bake.html and write the raw
 * alpha PNGs.
 *
 *   node bake_pack.js <bake.html> <out_dir> [name ...]
 *
 * The bake page is an ES module (import map -> ./vendor/three.module.min.js),
 * and Chromium refuses module imports over file:// with a CORS error that
 * leaves every canvas silently empty. The lab's fix was "serve the directory
 * over http and point the browser at localhost"; this script does that itself
 * on a random port, so there is no server to start and no wrong-cwd 404.
 *
 * Output: <out_dir>/<name>.png, 900x900 RGBA, straight from the canvas buffer
 * (toDataURL — never an element screenshot, which captures CSS size, not the
 * buffer). Then run prep_pack.py to crop, square and edge-check.
 */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), http = require('http');

function findChrome(){
  try{ for(const d of fs.readdirSync('/opt/pw-browsers')) if(d.startsWith('chromium-')){
    const p = path.join('/opt/pw-browsers', d, 'chrome-linux', 'chrome');
    if(fs.existsSync(p)) return p; } }catch(e){}
}
const MIME = { '.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.png':'image/png', '.json':'application/json', '.css':'text/css', '.ttf':'font/ttf', '.woff2':'font/woff2' };

function serve(root){
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      const rel = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(root, rel);
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    srv.listen(0, '127.0.0.1', () => resolve({ srv, port: srv.address().port }));
  });
}

(async () => {
  const html = path.resolve(process.argv[2] || 'bake.html');
  const out  = path.resolve(process.argv[3] || 'pack/raw');
  const only = process.argv.slice(4);
  const root = path.dirname(html);
  if (!fs.existsSync(path.join(root, 'vendor', 'three.module.min.js')))
    { console.error('bake_pack: vendor/three.module.min.js not beside ' + path.basename(html) + ' — cp -r SKILL_DIR/assets/vendor .'); process.exit(2); }
  fs.mkdirSync(out, { recursive: true });

  const { srv, port } = await serve(root);
  const browser = await chromium.launch({ executablePath: findChrome(), args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.goto(`http://127.0.0.1:${port}/${path.basename(html)}`, { waitUntil: 'load' });
  await page.waitForFunction(() => document.body.dataset.ready === '1', null, { timeout: 60000 });

  const icons  = await page.evaluate(() => window.__icons);
  const errors = await page.evaluate(() => window.__errors);
  let n = 0, bad = 0;
  for (const [name, url] of Object.entries(icons)) {
    if (only.length && !only.includes(name)) continue;
    const f = path.join(out, name + '.png');
    fs.writeFileSync(f, Buffer.from(url.split(',')[1], 'base64'));
    console.log('baked', name, '->', path.relative(process.cwd(), f)); n++;
  }
  for (const [name, err] of Object.entries(errors)) { console.error('FAILED', name, '·', err); bad++; }
  await browser.close(); srv.close();
  console.log(`\n${n} object(s) baked${bad ? ', ' + bad + ' FAILED' : ''}. Next: python3 SKILL_DIR/scripts/prep_pack.py ${path.relative(process.cwd(), out)} pack/icons`);
  process.exit(bad ? 1 : 0);
})();
