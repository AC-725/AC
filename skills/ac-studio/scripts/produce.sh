#!/usr/bin/env bash
# AC — Studio · produce.sh — the one-command back half.
# Runs AFTER the AC checkpoint: QA gate -> all cuts (parallel pairs) -> verify.
#
#   bash produce.sh <working.html> <BaseName> [--clean-also] [--silent-also] [--light <light.html>] [--serial]
#
# ONE CUT BY DEFAULT (AC's standing rule, 2026-08-21: "no need to make 3
# videos — just one with subs, with the AC figure"). From ONE working copy
# (CONTENT + SUBS filled, FIGURE on) it builds:
#   <BaseName>_subs.mp4          THE deliverable (captions on, figure on)
#   <BaseName>.mp4               only with --clean-also  (SUBS stripped)
#   <BaseName>_silent.mp4        only with --silent-also (clean + no audio, for a VO session)
#   <BaseName>_light_subs.mp4    only with --light <light.html>
#
# The QA gate runs first and is a hard stop. AUDIO_ARGS passes through to the
# audio synth for retimed cuts (references/variants.md).
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

HERE="$(cd "$(dirname "$0")" && pwd)"
HTML="${1:?usage: produce.sh <working.html> <BaseName> [--light <light.html>] [--silent-also] [--serial]}"
BASE="${2:?BaseName required}"
shift 2
LIGHT=""; SILENT_ALSO=0; SERIAL=0; CLEAN_ALSO=0
while [ $# -gt 0 ]; do
  case "$1" in
    --light) LIGHT="$2"; shift 2;;
    --clean-also) CLEAN_ALSO=1; shift;;
    --silent-also) SILENT_ALSO=1; shift;;
    --serial) SERIAL=1; shift;;
    *) echo "unknown flag: $1"; exit 2;;
  esac
done

# ---- 1. QA gate (hard stop) ----
echo "==> QA gate"
bash "$HERE/qa_layout.sh" "$HTML" ${LIGHT:+"$LIGHT"}

# ---- 2. derive clean copies (SUBS stripped) ----
strip_subs(){ # $1 in, $2 out
  node -e '
    const fs=require("fs");
    let h=fs.readFileSync(process.argv[1],"utf8");
    const m=h.match(/const SUBS=\[[\s\S]*?\];/g)||[];
    if(m.length!==1){console.error("expected exactly 1 SUBS block, found "+m.length);process.exit(1);}
    fs.writeFileSync(process.argv[2],h.replace(/const SUBS=\[[\s\S]*?\];/,"const SUBS=[];"));
  ' "$1" "$2"
}
# clean copies are derived only when a flag needs one
CLEAN=""; CLEANL=""
if [ "$CLEAN_ALSO" = 1 ] || [ "$SILENT_ALSO" = 1 ]; then
  CLEAN="_clean_$$.html"; strip_subs "$HTML" "$CLEAN"
fi
trap 'rm -f ${CLEAN:+"$CLEAN"} ${CLEANL:+"$CLEANL"}' EXIT

run_pair(){ # $1 htmlA $2 outA $3 htmlB $4 outB — parallel unless --serial
  if [ "$SERIAL" = 1 ]; then
    bash "$HERE/build_video.sh" "$1" "$2"
    bash "$HERE/build_video.sh" "$3" "$4"
  else
    bash "$HERE/build_video.sh" "$1" "$2" & P1=$!
    bash "$HERE/build_video.sh" "$3" "$4" & P2=$!
    wait $P1; wait $P2
  fi
}

# ---- 3. build ----
if [ "$CLEAN_ALSO" = 1 ]; then
  echo "==> Building: ${BASE}_subs.mp4 + ${BASE}.mp4"
  run_pair "$HTML" "${BASE}_subs.mp4" "$CLEAN" "${BASE}.mp4"
else
  echo "==> Building: ${BASE}_subs.mp4"
  bash "$HERE/build_video.sh" "$HTML" "${BASE}_subs.mp4"
fi
if [ -n "$LIGHT" ]; then
  echo "==> Building: ${BASE}_light_subs.mp4"
  bash "$HERE/build_video.sh" "$LIGHT" "${BASE}_light_subs.mp4"
fi
if [ "$SILENT_ALSO" = 1 ]; then
  echo "==> Building: ${BASE}_silent.mp4"
  bash "$HERE/build_video.sh" "$CLEAN" "${BASE}_silent.mp4" --silent
fi

# ---- 4. verify ----
echo "==> Verify"
for f in "${BASE}_subs.mp4" \
         $( [ "$CLEAN_ALSO" = 1 ] && echo "${BASE}.mp4" ) \
         ${LIGHT:+"${BASE}_light_subs.mp4"} \
         $( [ "$SILENT_ALSO" = 1 ] && echo "${BASE}_silent.mp4" ); do
  d=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$f")
  s=$(ffprobe -v error -show_entries stream=codec_type -of default=noprint_wrappers=1:nokey=1 "$f" | tr '\n' '+' | sed 's/+$//')
  echo "    $f  ${d}s  [$s]"
done

# ---- 5. structural gate (hard stop) ----
# Gates 1+2 ran on the HTML and can only see one frozen scene at a time. Gates
# 3-5 are properties of the TIMELINE, so they can only run here, on the render.
# Primary cut only — the other cuts share its timeline.
# QA_ARGS passes thresholds through, e.g. QA_ARGS='--strict-cuts --grid-min 0.10'
echo "==> Structural gate (timeline)"
# shellcheck disable=SC2086
bash "$HERE/qa_layout.sh" "${BASE}_subs.mp4" ${QA_ARGS:-}

echo "==> Done. Eyeball one typed-caption frame before shipping (subtitles.md)."
