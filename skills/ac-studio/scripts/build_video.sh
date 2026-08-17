#!/usr/bin/env bash
# AC — Reel Creator · one-shot build: render frames -> synth audio -> encode+mux.
# Works for BOTH engines; it auto-detects which audio track to synthesize:
#   - reel.template.html copies (5 scenes, ~11.7s)  -> reel_audio.py
#   - tod.template.html copies  (7 scenes, ~31.6s)  -> tod_audio.py
# Run from a WORKING copy of the assets (never edit the skill's originals in place).
#   ./build_video.sh <working.html> <out.mp4> [--silent]
set -euo pipefail
HTML="${1:-reel.html}"
OUT="${2:-AC_Reel.mp4}"
SILENT="${3:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
ASSETS="$(cd "$HERE/../assets" && pwd)"
WORK="$(pwd)"
# Unique per-invocation frames/wav names: concurrent builds in the same working
# dir no longer clobber each other. produce.sh relies on this to run cuts in parallel.
TAG="$$_$(basename "$OUT" .mp4)"
FRAMES="$WORK/_frames_$TAG"
trap 'rm -rf "$FRAMES"' EXIT

# Engine detection: only the TOD timeline has a scene G.
if grep -q "{id:'G'" "$HTML"; then AUDIO="$ASSETS/tod_audio.py"; else AUDIO="$ASSETS/reel_audio.py"; fi
echo "==> Engine audio: $(basename "$AUDIO")"

echo "==> 1/3 Rendering frames"
rm -rf "$FRAMES"; mkdir -p "$FRAMES"
node "$ASSETS/render_frames.js" "$HTML" "$FRAMES" 30 0.3

if [ "$SILENT" == "--silent" ]; then
  echo "==> 2/3 (skipped audio)"
  ffmpeg -y -framerate 30 -i "$FRAMES/f%05d.jpg" \
    -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -preset slow -r 30 \
    -shortest -c:a aac -b:a 128k -movflags +faststart "$OUT"
else
  echo "==> 2/3 Synthesizing sound design"
  # AUDIO_ARGS (optional env var) passes retime flags through, e.g.
  #   AUDIO_ARGS='--scenes A=0,B=5.2,C=10.3,D=15.4,E=19.7 --dur 24'
  # See references/variants.md.
  WAV="$WORK/master_$TAG.wav"
  # shellcheck disable=SC2086
  python3 "$AUDIO" "$WAV" ${AUDIO_ARGS:-}
  echo "==> 3/3 Encoding + muxing"
  ffmpeg -y -framerate 30 -i "$FRAMES/f%05d.jpg" -i "$WAV" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -preset slow -r 30 \
    -c:a aac -b:a 192k -movflags +faststart -shortest "$OUT"
fi

rm -rf "$FRAMES"; rm -f "$WORK/master_$TAG.wav"
echo "==> Done: $OUT"
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height -of default=noprint_wrappers=1 "$OUT" || true
