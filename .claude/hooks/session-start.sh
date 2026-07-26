#!/bin/bash
#
# SessionStart hook: make the firecrawl plugin available in Claude Code on the web.
#
# Remote sessions run in a fresh, ephemeral container, so a plugin installed into
# ~/.claude does not survive to the next session. This reinstalls it on startup.
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
  warn "claude CLI not on PATH; skipping ${PLUGIN} plugin install"
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
  warn "could not add ${MARKETPLACE}; ${PLUGIN} is unavailable this session"
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
