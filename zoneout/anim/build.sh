#!/usr/bin/env bash
# ZoneOut · Three.js beat -> 1080x1920 h264 MP4. Zero API credits.
#   ./build.sh scenes/priority-1877.html out/priority-1877.mp4 [fps]
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SCENE="${1:-$HERE/scenes/priority-1877.html}"
OUT="${2:-$HERE/out/beat.mp4}"
FPS="${3:-30}"
FRAMES="$HERE/out/_frames"

export NODE_PATH="${NODE_PATH:-/opt/node22/lib/node_modules}"

# Playwright ships a stripped ffmpeg with no libx264; prefer ffmpeg-static, then PATH.
FF="$(node -e "try{console.log(require('ffmpeg-static'))}catch(e){console.log('')}" 2>/dev/null || true)"
[ -z "$FF" ] && FF="$(command -v ffmpeg || true)"
if [ -z "$FF" ]; then
  echo "no ffmpeg with libx264 found. run: npm i ffmpeg-static" >&2; exit 1
fi

echo "==> 1/2 rendering frames"
node "$HERE/render.js" "$SCENE" "$FRAMES" "$FPS"

echo "==> 2/2 encoding"
mkdir -p "$(dirname "$OUT")"
"$FF" -y -framerate "$FPS" -i "$FRAMES/f%05d.jpg" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -preset slow -r "$FPS" \
  -movflags +faststart "$OUT" -loglevel error

rm -rf "$FRAMES"
echo "==> $OUT"
