# Caveman — installed in this repo

[caveman](https://github.com/JuliusBrussee/caveman) is an ultra-compressed
communication mode for Claude Code. It makes Claude drop articles, filler,
pleasantries, and hedging while keeping full technical accuracy — measured
~65% fewer output tokens. Code, commits, security warnings, and exact error
strings are always written normally.

This is a **local, checked-in install** — everything lives under `.claude/`
and `.caveman/` in this repo and is committed to git. That means it travels
with the repo and loads automatically every time you (or Claude Code on the
web) open this project. Nothing was written to your global `~/.claude`.

> Because it is wired through the repo's `.claude/settings.json`, the
> auto-activation hooks only fire on **session start**. If you were already in
> a session when this was installed, start a new one to pick it up. The
> `caveman` skill and slash commands are available immediately.

## Use it

- Auto-activates at session start (default mode: `full`).
- `/caveman` — activate / switch to full mode
- `/caveman lite` — light touch: keep sentences, drop only filler
- `/caveman ultra` — maximum compression
- `/caveman wenyan` — classical Chinese (文言文) style; `wenyan-lite` / `wenyan-ultra` also available
- Natural language works too: "talk like caveman", "be brief", "less tokens"

### Turn it off

- Say **"stop caveman"** or **"normal mode"**, or run `/caveman off`.
- To disable auto-activation permanently for this repo, set the default to
  `off` in [`.caveman/config.json`](.caveman/config.json):
  `{ "defaultMode": "off" }`. You can still activate manually with `/caveman`.

## Commands & skills

| Command | What it does |
|---|---|
| `/caveman [lite\|full\|ultra\|wenyan]` | Switch intensity level |
| `/caveman-commit` | Terse Conventional-Commits message for staged changes |
| `/caveman-review` | One-line-per-finding code review |
| `/caveman-stats [--share]` | Real session token usage + estimated savings |
| `/caveman-help` | Quick reference card |

The `caveman-compress` skill (compress `CLAUDE.md` / memory files to caveman
prose) and the **cavecrew** subagents (`cavecrew-investigator`,
`cavecrew-builder`, `cavecrew-reviewer` — compressed-output helpers) are also
installed.

## What's in the repo

```
.claude/
  settings.json        # wires the two auto-activation hooks
  skills/              # caveman, caveman-commit, caveman-review, caveman-stats,
                       #   caveman-compress, caveman-help, cavecrew
  commands/            # /caveman, /caveman-commit, /caveman-review, /caveman-stats
  agents/              # cavecrew-{investigator,builder,reviewer}
  hooks/               # caveman-activate.js (SessionStart),
                       #   caveman-mode-tracker.js (UserPromptSubmit),
                       #   caveman-config.js, caveman-stats.js,
                       #   cavecrew-model-overrides.js, caveman-statusline.{sh,ps1}
.caveman/
  config.json          # per-repo default mode ("full")
```

### Optional: statusline badge

A `[CAVEMAN]` badge (terminal CLI) is not wired by default so it doesn't
override your own statusline. To enable it, add to `.claude/settings.json`:

```json
"statusLine": {
  "type": "command",
  "command": "bash \"${CLAUDE_PROJECT_DIR}/.claude/hooks/caveman-statusline.sh\""
}
```

## Notes

- The upstream `caveman-init` command was intentionally **not** vendored: it
  reaches out over the network and writes rule files for *other* IDEs
  (Cursor, Windsurf, Cline, Copilot), which is out of scope for a Claude Code
  install.
- To install caveman globally on a local machine instead of per-repo, use the
  official one-liner: `claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman`.
- Source / license (MIT): https://github.com/JuliusBrussee/caveman
