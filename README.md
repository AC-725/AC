# AC

## Caveman (token-saving mode)

This repo has the [caveman](https://github.com/JuliusBrussee/caveman) Claude
Code plugin installed locally under `.claude/`. Claude replies in an
ultra-compressed "caveman" style that cuts ~65% of output tokens while keeping
full technical accuracy (code, commits, and errors stay normal).

It auto-activates when you open this repo in Claude Code. Say **"stop caveman"**
to turn it off. See **[CAVEMAN.md](CAVEMAN.md)** for modes, commands, and config.

## Superpowers (skills library)

This repo also has the [superpowers](https://github.com/obra/superpowers) skills
library installed locally under `.claude/` — proven Claude Code workflow skills
for TDD, systematic debugging, planning, code review, and brainstorming. It
loads automatically in this repo and prompts Claude to invoke the right skill
before acting. See **[SUPERPOWERS.md](SUPERPOWERS.md)** for the full skill list.

## @itsac.ai brand system

The Instagram brand protocol for `@itsac.ai` lives in
`.claude/skills/itsac-instagram/`. It supersedes the retired `@ac.wins`
"AI in Plain English" protocol.

Design spec: `docs/superpowers/specs/2026-07-25-itsac-ai-rebuild-design.md`

**One-time setup per environment** — the reel and frame templates need the
brand fonts installed, or Chromium silently falls back to a default sans:

```bash
./.claude/scripts/install-fonts.sh
NODE_PATH="$(npm root -g)" node tests/render/check-fonts.js   # expect: PASS
```

`NODE_PATH` is required: this repo has no local `node_modules` and Playwright
is installed globally only.
