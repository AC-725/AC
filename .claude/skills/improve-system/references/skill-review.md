# Mode: Skill Review

Fold the corrections from this conversation back into the skill, so the same correction never has to
be made twice.

The premise: every time Austin corrected, re-asked, or rejected something in this session, a skill
was missing an instruction. The conversation just produced the fix for free — the only question is
whether it gets written down before the context is gone.

## 1. Identify the target

Usually obvious: the skill that just ran. If several were involved, ask which one — or if the friction
was really about a shared fact (brand, price, audience), this is the wrong mode. Route that to
Foundation, because fixing it in one skill leaves the other four wrong.

If no skill ran and the friction was with Claude's default behavior, the fix belongs in `CLAUDE.md`
or a new skill. Say so rather than forcing it into an unrelated file.

## 2. Harvest the friction

Reread the conversation and pull out every one of these:

- **Corrections** — "no", "that's wrong", "not like that". The strongest signal there is.
- **Re-asks** — he asked for the same thing twice. The first attempt missed something the skill
  should have specified.
- **Rejections** — output he threw away. Why it was wrong is the missing rule.
- **Things he had to explain** — any fact he supplied that the skill should already have known.
- **Praise** — "perfect", "exactly that". Just as important, and almost always lost. Pin down what
  made it right so the next run reproduces it instead of rediscovering it.
- **Silent recoveries** — cases where you noticed the problem yourself and fixed it mid-run. He never
  had to say anything, so it feels resolved, but the skill is still wrong and next time it may not
  get caught.

Write each as a one-line rule in his words. Vague harvests produce vague instructions: "be more
concise" changes nothing, "captions cap at 3 lines before the CTA" changes every future run.

## 3. Route each rule to the right place

Where a rule goes determines whether it ever fires.

| The problem was | Put the fix in |
| --- | --- |
| Skill didn't trigger, or the wrong one did | The `description` frontmatter — nowhere else affects triggering |
| Skill triggered but did the wrong thing | SKILL.md body, at the step that went wrong |
| A detail only some runs need | The relevant `references/*.md` |
| A fact several skills need | `system/foundation/*.md` — not this skill |
| A step done by hand every time, identically | A script under `scripts/` |
| A value hardcoded in two places | One constant, referenced twice |

Two failure modes to avoid:

- **Appending instead of fixing.** If the skill already says something wrong, edit that line. Adding a
  correct line below it leaves a file that contradicts itself, and the reader has no way to know
  which line wins.
- **Writing "when to use" into the body.** Triggering is decided entirely from the description. A body
  paragraph explaining when the skill applies is read only after it has already fired.

## 4. Edit, tightly

- Put the rule where it fires, not in a "Notes" section at the bottom. A rule the reader reaches
  after the relevant step has already happened is decoration.
- Match the file's existing voice, heading depth, and table style. These skills read as one system;
  a section in a different register stands out as bolted on.
- Prefer replacing a vague line over adding a specific one next to it.
- Keep it short. Every added line dilutes the rest — a skill that doubles in length gets skimmed, and
  a skimmed rule is a dead rule.
- If the skill is over ~500 lines and the new rule isn't universal, move detail into `references/`
  rather than growing SKILL.md further.

Show the diff before applying, unless he said to just do it.

## 5. Make it durable

For a project skill under `<repo>/.claude/skills/`: commit. Done.

For a personal skill under `~/.claude/skills/`: the edit works for the rest of this session but
vanishes with the container. Follow the three durability steps in `SKILL.md` — edit in place, commit
the durable copy into the repo, and give Austin the exact text for the claude.ai library. Say clearly
which of those you did. "Updated the skill" is misleading when the update evaporates at session end.

## 6. Verify it would actually have fired

Before closing, reread the new text as if you hadn't been in this conversation. Would it have
prevented the specific thing that went wrong? If it only makes sense to someone who remembers today,
it's too vague — rewrite it with the concrete detail included.

Worth stating plainly if true: a rule you can't test today, and expect to hold, is still worth
writing. Just don't report it as verified.

## When to hand off to `skill-creator`

This mode is the fast path — targeted fixes from a live conversation. Use the `skill-creator` skill
instead when Austin wants to build a skill from scratch, restructure a large one, run evals or
benchmarks, or systematically optimize a description for triggering. It has the scripts for that;
don't reimplement them here.
