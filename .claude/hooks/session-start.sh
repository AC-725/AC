#!/bin/bash
#
# SessionStart hook: make the firecrawl, exa, and claude-mem plugins available in
# Claude Code on the web.
#
# Remote sessions run in a fresh, ephemeral container, so a plugin installed into
# ~/.claude does not survive to the next session. This reinstalls them on startup.
#
# Two things are non-obvious here:
#
#   1. `claude plugin install firecrawl@claude-plugins-official` on its own fails,
#      because the official marketplace index is fetched from downloads.claude.ai,
#      which the remote environment's network policy blocks. Adding the marketplace
#      from its GitHub source instead routes over the git proxy, which is allowed.
#
#   2. firecrawl is an *external* plugin — the marketplace holds only a pointer to
#      firecrawl/firecrawl-claude-plugin.git. Nothing outside the marketplace
#      manifest is needed, so --sparse keeps the checkout to ~500K instead of ~11M.
#
# Nothing is written to stdout on success: SessionStart stdout is added to the
# session context, and this hook has nothing worth saying there.

set -uo pipefail

# Local runs have their own plugin setup; don't touch it.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

MARKETPLACE_REPO="anthropics/claude-plugins-official"
MARKETPLACE="claude-plugins-official"
# firecrawl: browser-backed scraping for JS-heavy pages.
# exa:       semantic search plus the deep-research orchestrator.
# Both are external plugins, so each is a separate small clone.
PLUGINS="firecrawl exa"

warn() { echo "session-start: $*" >&2; }

if ! command -v claude >/dev/null 2>&1; then
  warn "claude CLI not on PATH; skipping plugin installs"
  exit 0
fi

# Both steps are git clones, so a transient network failure is the likeliest way
# this breaks. Output is buffered and only surfaced when an attempt fails.
attempt() {
  local desc="$1"; shift
  local delay=2 n out
  for n in 1 2 3; do
    if out=$("$@" 2>&1); then
      return 0
    fi
    warn "${desc} failed (attempt ${n}/3)"
    printf '%s\n' "$out" >&2
    if [ "$n" -lt 3 ]; then
      sleep "$delay"
      delay=$((delay * 2))
    fi
  done
  return 1
}

# A missing plugin should never block the session from starting, so every failure
# path below warns and exits clean.
if ! attempt "marketplace add" \
    claude plugin marketplace add "$MARKETPLACE_REPO" --sparse .claude-plugin --scope user; then
  warn "could not add ${MARKETPLACE}; its plugins are unavailable this session"
  exit 0
fi

# One failing plugin shouldn't cost the others, so each is attempted independently.
for plugin in $PLUGINS; do
  if ! attempt "install ${plugin}" \
      claude plugin install "${plugin}@${MARKETPLACE}" --scope user; then
    warn "could not install ${plugin}; it is unavailable this session"
  fi
done

# Exa's MCP tools authenticate through the managed connector and need no key here,
# so only Firecrawl is worth warning about.
if [ -z "${FIRECRAWL_API_KEY:-}" ]; then
  warn "firecrawl installed, but FIRECRAWL_API_KEY is unset — add it to the environment's variables before using the plugin"
fi

# ---- claude-mem: memory capture + skills, installed as a plugin ----
#
# claude-mem (thedotmack/claude-mem) records observations while Claude works and
# makes them searchable through its bundled skills (mem-search, learn-codebase,
# how-it-works, ...). Its own npm installer replaces the marketplace/install
# dance used above: it registers the thedotmack marketplace, copies the plugin
# into ~/.claude, and installs the plugin's runtime deps. --provider claude runs
# memory on the logged-in Claude account with cloud sync off.
#
# Three remote-specific quirks:
#
#   1. The installer's marketplace copy (from the npm tarball) is missing
#      .claude-plugin/marketplace.json, so the plugin registers but then fails
#      to load ("cache-miss"). Refreshing the marketplace re-clones it from
#      GitHub — routed over the git proxy, which is allowed — and the plugin
#      loads from its versioned cache after that.
#
#   2. The plugin's own SessionStart hooks never fire here: the plugin lands
#      *during* this hook, after SessionStart has already happened, and the
#      next session starts from a fresh container and installs again. So the
#      worker those hooks would launch is started explicitly instead
#      (`claude-mem start` daemonizes and returns).
#
#   3. The memory store (~/.claude-mem) lives and dies with the container, so
#      memories do NOT carry across web sessions — within one session claude-mem
#      records and searches fine, but each session starts blank. For memory that
#      actually persists, run `npx claude-mem install` once on a machine whose
#      home directory survives (laptop CLI or the desktop app).
#
# The npm install is heavyweight (roughly two minutes), so it gets one attempt
# rather than three, and settings.json raises this hook's timeout to cover it.
if out=$(npx -y claude-mem install --provider claude </dev/null 2>&1); then
  if ! attempt "claude-mem marketplace refresh" \
      claude plugin marketplace update thedotmack; then
    warn "claude-mem installed but its marketplace did not load; its skills are unavailable this session"
  fi
  if ! out=$(npx -y claude-mem start </dev/null 2>&1); then
    warn "claude-mem worker did not start; memory capture is off this session"
    printf '%s\n' "$out" >&2
  fi
else
  warn "could not install claude-mem; memory is unavailable this session"
  printf '%s\n' "$out" >&2
fi
