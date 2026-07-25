#!/usr/bin/env bash
# Install the committed brand fonts into the user font directory.
# Idempotent — safe to re-run. Run once per environment before rendering.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SRC="${REPO_ROOT}/.claude/assets/fonts"
DEST="${HOME}/.local/share/fonts"

if [ ! -d "$SRC" ]; then
  echo "install-fonts: no font directory at $SRC" >&2
  exit 1
fi

mkdir -p "$DEST"
cp -f "$SRC"/*.ttf "$DEST"/
fc-cache -f "$DEST" >/dev/null 2>&1 || true

echo "install-fonts: installed $(ls -1 "$SRC"/*.ttf | wc -l) fonts into $DEST"
fc-list : family | tr ',' '\n' | grep -iE "space grotesk|jetbrains mono" | sort -u || true
