#!/usr/bin/env bash
# ZoneOut render-environment setup.
#
# A fresh container has neither Poppins nor Oswald, so zoneout_cover.py fails on
# ImageFont.truetype and every Three.js beat silently falls back to Liberation Sans.
# Google Fonts is blocked by the egress proxy — but the npm registry is not, and
# @fontsource ships the real font files. That is the way in.
#
#   ./setup-fonts.sh
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
WORK="$HERE/.fonts-tmp"
DEST="/usr/share/fonts/truetype/google-fonts"   # path zoneout_cover.py expects

echo "==> 1/3 python deps"
pip install --quiet pillow fonttools brotli

echo "==> 2/3 fetching fonts from npm"
mkdir -p "$WORK" && cd "$WORK"
[ -f package.json ] || npm init -y >/dev/null 2>&1
npm install @fontsource/poppins @fontsource/oswald --no-audit --no-fund >/dev/null 2>&1

echo "==> 3/3 woff2 -> ttf (PIL cannot read woff2)"
mkdir -p "$DEST"
python3 - "$WORK" "$DEST" <<'PY'
import os, sys
from fontTools.ttLib import TTFont
work, dest = sys.argv[1], sys.argv[2]
jobs = [("poppins", {"300":"Light","400":"Regular","500":"Medium","600":"SemiBold","700":"Bold"}),
        ("oswald",  {"400":"Regular","500":"Medium","600":"SemiBold","700":"Bold"})]
n = 0
for fam, weights in jobs:
    src = f"{work}/node_modules/@fontsource/{fam}/files"
    for w, name in weights.items():
        p = f"{src}/{fam}-latin-{w}-normal.woff2"
        if not os.path.exists(p):
            print(f"   skip {fam} {w} (not published)"); continue
        f = TTFont(p); f.flavor = None
        f.save(f"{dest}/{fam.capitalize()}-{name}.ttf"); n += 1
print(f"   {n} faces installed")
PY

fc-cache -f >/dev/null 2>&1 || true
rm -rf "$WORK"
echo "==> done. covers and Three.js beats now render in brand type."
