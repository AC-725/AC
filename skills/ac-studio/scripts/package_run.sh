#!/usr/bin/env bash
# AC — package a finished run into ONE download.
#
#   bash package_run.sh <run-dir> [zip-name]
#
# WHY (2026-08-19, AC's request: "compose everything in a zip file for me to
# easier download"). A run ships six to nine separate files — three MP4 cuts, a
# cover, a VO PDF, the caption kit, the DM reply, the beat sheet, the filmstrip.
# Sent one by one that is nine taps on a phone and an easy way to lose the cover
# or grab last week's caption by mistake. One zip is one tap, and the folder
# inside carries the run's own name, so his downloads folder stays legible.
#
# WHAT GOES IN: the deliverables only. Render intermediates — frame dirs, master
# wavs, the qa scratch dir, the filmstrip's 31 source tiles, the working HTML and
# the fonts — are rebuilt by produce.sh on demand and would multiply the size for
# nothing. The contact sheet itself DOES go in: it is the evidence that gate 7
# was read, and AC asked to see it.
#
# Run it as the last step before delivery, AFTER produce.sh has verified the cuts.
set -euo pipefail

RUN="${1:?usage: package_run.sh <run-dir> [zip-name]}"
RUN="$(cd "$RUN" && pwd)"
NAME="${2:-$(basename "$RUN")}"
STAGE="$(mktemp -d)"; OUT="$RUN/${NAME}.zip"
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/$NAME"
copied=0
add(){ # add <src> [subdir]
  local src="$1" sub="${2:-}"
  [ -e "$src" ] || return 0
  local dest="$STAGE/$NAME${sub:+/$sub}"
  mkdir -p "$dest"; cp -r "$src" "$dest/"; copied=$((copied+1))
}

# the cuts and the stills live in run/ or one level up, depending on the run
for d in "$RUN" "$RUN/run" "$RUN/.."; do
  [ -d "$d" ] || continue
  for f in "$d"/*.mp4 "$d"/*.mov; do [ -e "$f" ] && add "$f"; done
  for f in "$d"/COVER*.png "$d"/*.pdf "$d"/caption.txt "$d"/dm_reply.txt \
           "$d"/beatsheet*.md "$d"/structure-analysis.md; do [ -e "$f" ] && add "$f"; done
  [ -e "$d/_filmstrip/FILMSTRIP.jpg" ] && add "$d/_filmstrip/FILMSTRIP.jpg" "qa"
done

[ "$copied" -gt 0 ] || { echo "package_run: nothing to package in $RUN" >&2; exit 1; }

rm -f "$OUT"
( cd "$STAGE" && zip -qr "$OUT" "$NAME" )

echo "==> packaged $copied file(s)"
( cd "$STAGE" && find "$NAME" -type f | sort | sed 's/^/    /' )
echo "==> $OUT  ($(du -h "$OUT" | cut -f1))"
