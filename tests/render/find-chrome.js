/* Locates the sandbox's pinned Chromium. Returns undefined to let Playwright
 * resolve its own default. Shared by every test in this directory. */
const fs = require('fs');
const path = require('path');

module.exports = function findChrome() {
  const base = '/opt/pw-browsers';
  try {
    for (const d of fs.readdirSync(base)) {
      if (d.startsWith('chromium-')) {
        const p = path.join(base, d, 'chrome-linux', 'chrome');
        if (fs.existsSync(p)) return p;
      }
    }
  } catch (e) {}
  return undefined;
};
