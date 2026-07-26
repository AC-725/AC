#!/usr/bin/env bash
# AC — Tool of the Day · one-shot build: render frames -> synth audio -> encode+mux.
# Run from a WORKING copy of the assets (never edit the skill's originals in place).
#   ./build_video.sh <reel.html> <out.mp4> [--silent]
# Produces the MP4 with synced sound (unless --silent). Cleans up frames after.
set -euo pipefail
HTML="${1:-reel.template.html}"
OUT="${2:-AC_ToolOfTheDay.mp4}"
SILENT="${3:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
ASSETS="$(cd "$HERE/../assets" && pwd)"
WORK="$(pwd)"
FRAMES="$WORK/_frames"

echo "==> 1/3 Rendering frames"
rm -rf "$FRAMES"; mkdir -p "$FRAMES"
node "$ASSETS/render_frames.js" "$HTML" "$FRAMES" 30 0.4

if [ "$SILENT" == "--silent" ]; then
  echo "==> 2/3 (skipped audio)"
  ffmpeg -y -framerate 30 -i "$FRAMES/f%05d.jpg" \
    -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -preset slow -r 30 \
    -shortest -c:a aac -b:a 128k -movflags +faststart "$OUT"
else
  echo "==> 2/3 Synthesizing sound design"
  python3 "$ASSETS/synth_audio.py" "$WORK/master.wav"
  echo "==> 3/3 Encoding + muxing"
  ffmpeg -y -framerate 30 -i "$FRAMES/f%05d.jpg" -i "$WORK/master.wav" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -preset slow -r 30 \
    -c:a aac -b:a 192k -movflags +faststart -shortest "$OUT"
fi

rm -rf "$FRAMES"
echo "==> Done: $OUT"
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height -of default=noprint_wrappers=1 "$OUT" || true
