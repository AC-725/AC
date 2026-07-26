# Superpowers — installed in this repo

[superpowers](https://github.com/obra/superpowers) (Jesse Vincent, MIT) is a
core **skills library** for Claude Code — proven workflow skills for TDD,
debugging, planning, code review, and collaboration. Installed **locally** in
this repo (under `.claude/`) and committed to git, so it loads automatically
whenever this project is opened in Claude Code. Nothing was written to your
global `~/.claude`.

Like caveman, it wires through the repo's `.claude/settings.json`, so its
SessionStart context injection fires on **session start** — begin a new session
to pick it up. The skills themselves are invocable immediately.

## What it does

At session start it injects the `using-superpowers` skill, which tells Claude
to **check for and invoke a relevant skill before acting** on any task. When a
skill applies, Claude announces "Using [skill] to [purpose]" and follows it.

## Skills installed (14)

| Skill | When it fires |
|---|---|
| `brainstorming` | Before any creative/feature work — explore intent & design first |
| `writing-plans` | Turn a spec into a step-by-step implementation plan |
| `executing-plans` | Execute a written plan with review checkpoints |
| `test-driven-development` | Before writing implementation code |
| `systematic-debugging` | Any bug / test failure / unexpected behavior |
| `verification-before-completion` | Before claiming work done — evidence first |
| `requesting-code-review` | On completing features / before merge |
| `receiving-code-review` | Handling review feedback with rigor |
| `subagent-driven-development` | Independent tasks in the current session |
| `dispatching-parallel-agents` | 2+ independent, parallelizable tasks |
| `using-git-worktrees` | Isolated workspace for feature work |
| `finishing-a-development-branch` | Integrate completed work |
| `writing-skills` | Create / edit / test skills |
| `using-superpowers` | Entry point — how to find & use skills |

## Notes / scope

- Vendored as **project skills** (`.claude/skills/`), so they load as bare
  names (`brainstorming`, `test-driven-development`, …). Upstream cross-refs
  written as `superpowers:<name>` still resolve — Claude maps them to the
  available skill.
- Each skill is self-contained (its own `scripts/`, `references/`); the
  `brainstorming` visual server ships inside the skill.
- Only the **Claude Code** integration was installed. The upstream repo's
  other-harness adapters (Cursor / Codex / opencode / Kimi / Pi) and the
  Windows `run-hook.cmd` shim were not vendored — not needed here.
- To install globally on a local machine instead of per-repo, use the official
  path: `/plugin marketplace add obra/superpowers` then install `superpowers`.
- Source / license (MIT): https://github.com/obra/superpowers
