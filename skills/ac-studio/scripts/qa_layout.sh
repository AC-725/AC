#!/usr/bin/env bash
# AC — layout + structure QA. One entry point, two kinds of input.
#
#   bash qa_layout.sh reel.html [more.html ...]        # pre-render, scene gates
#   bash qa_layout.sh AC_News_x_subs.mp4 [flags]       # post-render, timeline gates
#   bash qa_layout.sh reel.html out.mp4                # both, in one call
#
# HTML input — the scene gates (these look at one frozen scene at a time):
#   Gate 1 (bounds): nothing overlaps its neighbours' boxes, nothing leaves frame.
#   Gate 2 (ink):    no GLYPH collides with another, and separate content groups
#                    keep >=18px clear. Gate 2 is the one that matters — a box can
#                    look fine while a descender sits on the line below.
#   Gate 6 (app):    everything readable sits inside Instagram's safe window
#                    (170 < y < 1300, x < 930 below mid-frame), and the caption and
#                    watermark clear both the scene ink and each other. Gate 2 only
#                    walks children INSIDE one scene, so it cannot see either.
#                    SAFE_ALL_THEMES=1 checks all four themes, not just the set one.
#
# MP4 input — the timeline gates. Neither can be seen from a still scene, which
# is why they were missing: they are properties of the CUT, not of the layout.
#   Gate 3 (architecture): a real layout change lands in the scroll-decision
#                    window (2.6-3.6s). New text in the same frame does not count.
#   Gate 4 (motion floor): no stretch sits near-static longer than 1.0s. With no
#                    face on screen there is nothing covering a still frame.
#   Gate 5 (cut budget): reported; --strict-cuts makes it fail.
#
# Thresholds for gate 3 are look-dependent. Run once with --calibrate on a render
# you already trust, then set --grid-min / --row-min just under what it reports.
#
# Exit non-zero if any gate fails. Never ship a render that has not passed this.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
WORK="$(pwd)"; SHOTS="$WORK/_inkshots_$$"
rm -rf "$SHOTS"; trap 'rm -rf "$SHOTS"' EXIT

HTMLS=(); VIDEOS=(); PASSTHRU=()
for arg in "$@"; do
  case "$arg" in
    *.html)                   HTMLS+=("$arg") ;;
    *.mp4|*.mov|*.m4v)        VIDEOS+=("$arg") ;;
    -*)                       PASSTHRU+=("$arg") ;;
    *)
      # bare value belonging to the preceding flag (e.g. --grid-min 0.12)
      if [ ${#PASSTHRU[@]} -gt 0 ]; then PASSTHRU+=("$arg")
      else echo "qa_layout: don't know what to do with '$arg'" >&2; exit 2; fi ;;
  esac
done

if [ ${#HTMLS[@]} -eq 0 ] && [ ${#VIDEOS[@]} -eq 0 ]; then
  echo "usage: qa_layout.sh <working.html ...> | <render.mp4 ...> [flags]" >&2
  exit 2
fi

FAILED=0

# ---------------- scene gates (HTML) ----------------
if [ ${#HTMLS[@]} -gt 0 ]; then
  echo "==> gate 1 · bounds + box overlap"
  node "$HERE/audit_bounds.js" "${HTMLS[@]}"
  echo "==> gate 2 · glyph ink clearance"
  node "$HERE/audit_capture.js" "$SHOTS" "${HTMLS[@]}" >/dev/null
  python3 "$HERE/audit_report.py" "$SHOTS" 18
  rm -rf "$SHOTS"
  # Gate 6 · the APP-SAFE window. Gates 1-2 check the FILE; this checks whether the
  # layout survives Instagram's own chrome, and catches the caption/watermark
  # collisions gate 2 is structurally blind to (they are siblings of the scenes).
  echo "==> gate 6 · app-safe window (Instagram chrome)"
  if ! node "$HERE/audit_safearea.js" ${SAFE_ALL_THEMES:+--all-themes} "${HTMLS[@]}"; then
    FAILED=1
  fi
fi

# ---------------- timeline gates (MP4) ----------------
if [ ${#VIDEOS[@]} -gt 0 ]; then
  for v in "${VIDEOS[@]}"; do
    echo
    echo "==> gates 3-5 · timeline structure"
    if ! python3 "$HERE/audit_motion.py" "$v" ${PASSTHRU[@]+"${PASSTHRU[@]}"}; then
      FAILED=1
    fi
  done
fi

exit $FAILED
