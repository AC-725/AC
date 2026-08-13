# Skill template

A starting scaffold for new skills in this repo. Copy the block below into
`.claude/skills/<name>/SKILL.md`, fill it in, run the validator, done.

This file lives in `docs/` on purpose — anything at
`.claude/skills/<name>/SKILL.md` is loaded as a **live skill**, so a template
parked there would register itself and pollute the skill list. Keep templates
out of the skills tree.

## The constraints that actually break things

| Rule | Why |
| --- | --- |
| `name:` must equal the directory name | Mismatch and the skill silently fails to load |
| `name:` lowercase, hyphens, no spaces | Matches `task-observer`, `web-scraping`, `ac-studio` |
| `description:` under 1024 characters | Hard ceiling. Repo today: web-scraping 456, task-observer 992, ac-studio 1010 |
| Only `name` and `description` in frontmatter | Extra keys are ignored at best |
| Every `references/…` path in the body must exist | A dead reference means a mid-task load failure, and the agent improvises instead |
| One skill per directory | `references/`, `scripts/`, `assets/` live beside `SKILL.md` |

## The template

````markdown
---
name: skill-name-here
description: >-
  [What it does, in one sentence, third person.] Use this WHENEVER [the
  concrete situations that should trigger it — list the actual words a user
  would type, not abstract categories]. Also use it when [secondary /
  less-obvious triggers], even when [the thing that is usually named] is
  never mentioned. [If it replaces or defers to another skill, say so:
  "For X, use other-skill instead."]
---

# [Skill name] — [what it is in five words]

[One paragraph: what this does and when it earns its place. No backstory.]

## [The thing to read before acting]

[Voice, constraints, non-negotiables — whatever the agent must hold in mind
before producing anything. Put it first; it gets read first.]

## Task router

| If the ask is | Do this | Depth lives in |
| --- | --- | --- |
| [common case] | [the short path] | `references/[file].md` |
| [other case] | [the other path] | `references/[file].md` |

## Workflow

### 1. [First step]
[What happens. Be specific about inputs and outputs.]

### 2. [Second step]
[…]

### 3. Check before delivering
Re-read the rules above and verify the output against them. [Name the
specific checks — see "Give every rule an enforcement mechanism" below.]

## Where the depth lives

- **`references/[file].md`** — [what's in it, and when to load it]
- **`references/[file].md`** — [same]

Load these on demand, not up front.

## Guardrails

- [The mistake this skill exists to prevent]
- [The thing that must never happen]
````

## Writing the description — the part that decides whether it ever fires

The description is the whole triggering mechanism. The body is only read
*after* something in the description matches. A perfect body behind a vague
description never runs.

What works, borrowing from `ac-studio`:

- **Lead with the job**, third person — "Austin's single front door for the
  Instagram brand…", not "This skill helps you…"
- **List literal trigger words** a person would actually type — "a reel,
  video, TOD, tool of the day, AI news, 'day N' content, a post, caption,
  bio, highlight, hashtag set". Concrete beats categorical every time.
- **Cover the implicit case** — "even when he never names the brand or the
  format" catches the ask that doesn't announce itself.
- **Name the aliases** — task-observer adds *"Also known as 'One Skill to
  Rule Them All' — trigger on this phrase too."*
- **Draw the boundary** when skills are adjacent — "For story research and
  growth questions, use ac-studio."

What doesn't: describing the implementation, listing internal phases, or
writing for a reader who already knows the skill exists.

## Core vs references — progressive disclosure

The body is fixed overhead, loaded every time the skill fires. Reference
files cost nothing until loaded. So:

- **Body** — rules that apply every run, the router, the guardrails.
- **`references/`** — episodic material: procedures for one branch, long
  lookup tables, worked examples, anything used by some sessions and not
  others.

Audit the body like the always-on cost it is. The test from the authoring
reference: *would removing it change behaviour?* If no, it goes to a
reference or gets cut. But don't cut examples or anti-patterns to save room
— bare rules get violated more often than rules with context.

## Give every rule an enforcement mechanism

The Pre-Flight Principle, from `references/skill-authoring.md`: rules written
in a skill are not reliably followed during creative flow. Whenever you add a
rule, ask what makes it *checkable* — a verification step, a checklist the
agent re-reads before delivery, a command that fails loudly. A rule the agent
keeps breaking should become structural or be removed, not restated louder.

Same reference, and it applies to this file too: **any command embedded in a
skill must be run once against real data before the skill ships.** Prose gets
reinterpreted in context; an embedded command runs verbatim, forever, and a
subtly wrong one reads as correct on every re-read. Test the failure path as
well as the success path — a check that only ever passes isn't a check.

## Internal or open-source

Most skills here are **internal** — they carry your specifics, your clients,
your preferences. They need no attribution or licence, can be informal, and
should stay current rather than polished.

A skill becomes **open-source** when the methodology stands alone without
your context. Then it needs an attribution block, a licence statement, a
LICENSE file, and a confidentiality sweep for client names, domains, and
examples traceable to real projects. Full requirements, including the
attribution template and the five confidentiality layers, are in
`.claude/skills/task-observer/references/skill-authoring.md`.

Default to internal until a skill is genuinely worth publishing.

## Before you ship

```bash
scripts/validate-skill.sh .claude/skills/<name>
```

Checks name/directory match, description length, and that every
`references/`, `scripts/`, and `assets/` path in the body resolves. Exits
non-zero on any failure.

Then the judgement calls the script can't make:

- [ ] Would someone typing their real request hit this description?
- [ ] Does it overlap an existing skill? If so, does one of them say which wins?
- [ ] Does every rule have something that enforces it?
- [ ] Is anything in the body that only some sessions need? Move it to `references/`.
- [ ] If open-source: attribution, licence, and a leakage sweep done?
