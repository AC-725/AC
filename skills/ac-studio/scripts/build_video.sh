#!/usr/bin/env bash
# AC — Reel Creator · one-shot build: render frames -> synth audio -> encode+mux.
# Works for BOTH engines; it auto-detects which audio track to synthesize:
#   - reel.template.html copies (5 scenes, ~11.7s)  -> reel_audio.py
#   - tod.template.html copies  (7 scenes, ~31.6s)  -> tod_audio.py
# Run from a WORKING copy of the assets (never edit the skill's originals in place).
#   ./build_video.sh <working.html> <out.mp4> [--silent]
set -euo pipefail

# playwright lives in the GLOBAL node root in this toolchain, so a bare require()
# from a run directory dies with MODULE_NOT_FOUND. Resolve it here rather than
# depending on whatever NODE_PATH the calling shell happened to export.
export NODE_PATH="${NODE_PATH:+$NODE_PATH:}$(npm root -g 2>/dev/null || echo /opt/node22/lib/node_modules)"

# ffmpeg/ffprobe: this container ships no system ffmpeg, and the one bundled with
# Playwright encodes VP8/webm only. The static H.264/AAC build from the python
# imageio-ffmpeg wheel is the working one; /root/bin also holds the small ffprobe
# shim the verify step calls. Resolve both here so a fresh shell can run this
# script - depending on the caller's PATH cost a failed encode on 2026-08-18.
[ -d /root/bin ] && export PATH="/root/bin:$PATH"
if ! command -v ffmpeg >/dev/null 2>&1; then
  _FFBIN="$(python3 -c 'import imageio_ffmpeg,sys; sys.stdout.write(imageio_ffmpeg.get_ffmpeg_exe())' 2>/dev/null || true)"
  if [ -n "${_FFBIN:-}" ]; then
    mkdir -p /root/bin && ln -sf "$_FFBIN" /root/bin/ffmpeg
    export PATH="/root/bin:$PATH"
  fi
fi
command -v ffmpeg >/dev/null 2>&1 || { echo "no ffmpeg: pip install imageio-ffmpeg" >&2; exit 1; }

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
# 60fps + lossless PNG frames (AC, 2026-08-24). See the header of render_frames.js
# for why; the short version is that 30fps juddered and the JPEG intermediate cost a
# whole extra generation of loss on gradients that are mostly gold-on-black.
node "$ASSETS/render_frames.js" "$HTML" "$FRAMES" 60 0.3

if [ "$SILENT" == "--silent" ]; then
  echo "==> 2/3 (skipped audio)"
  ffmpeg -y -framerate 60 -i "$FRAMES/f%05d.png" \
    -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
    -c:v libx264 -profile:v high -level 4.2 -pix_fmt yuv420p -crf 16 -preset slow -r 60 \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
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
  # CRF 18 -> 16 and explicit bt709 tags: the ground is flat #0A0A0A with gold
  # gradients over it, which is the exact content H.264 bands on, and an untagged
  # yuv420p file leaves the player to guess the transfer curve (gold drifts warm on
  # some phones). 60fps in, 60fps out.
  ffmpeg -y -framerate 60 -i "$FRAMES/f%05d.png" -i "$WAV" \
    -c:v libx264 -profile:v high -level 4.2 -pix_fmt yuv420p -crf 16 -preset slow -r 60 \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
    -c:a aac -b:a 192k -movflags +faststart -shortest "$OUT"
fi

rm -rf "$FRAMES"; rm -f "$WORK/master_$TAG.wav"
echo "==> Done: $OUT"
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height -of default=noprint_wrappers=1 "$OUT" || true
