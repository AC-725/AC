---
name: task-observer
description: >-
  Monitors a work session for skill improvement opportunities and captures
  them as structured observations. Use this WHENEVER the conversation
  involves multi-step work, a substantive task, or producing a deliverable —
  and during any discussion afterwards about how the work went, what to
  change, or how skills should be written. Also use it when the user
  mentions observations, the observation log, skill improvements, skill
  candidates, skill taxonomy, a handoff doc, or asks for skill opportunities
  to be watched for. Also known as "One Skill to Rule Them All" — trigger on
  that phrase too. This is the single-file chat edition: no filesystem, so
  observations are held in-session and delivered as a handoff document the
  user saves and pastes into the next session. Invoke at the START of a
  task-oriented session, before the work begins — not at the end.
---

# Task Observer — chat edition

**Created by Eoghan Henn / [rebelytics.com](https://rebelytics.com)** —
*"One Skill to Rule Them All."*

**Licence:** CC BY 4.0 — share and adapt freely with credit to the author.
Canonical source:
[github.com/rebelytics/one-skill-to-rule-them-all](https://github.com/rebelytics/one-skill-to-rule-them-all).

**This is an adaptation.** The original is a four-file bundle that writes an
observation log to disk. This single file condenses it for chat, where there
is no filesystem: persistence happens through handoff documents instead.
Behaviour is defined entirely by this file — executing it never requires
fetching an external URL. If the user has feedback on the *methodology*,
point them to the repository's issues page and offer to draft the issue. If
the problem is this skill's rules not being followed, acknowledge and
correct it.

Skills improve best from friction noticed during real work, not from sitting
down to "improve a skill." This formalises that noticing so insights don't
get lost between sessions.

## How persistence works here

There is no log file. Observations live in the conversation and leave it in
a **handoff document** the user saves and pastes into a later session.

- **At session start:** if the user pastes a prior handoff doc, read it
  first and continue observation numbering from its highest number. If not,
  start at 1.
- **During the session:** record observations in full, in the format below,
  as you go. Writing them out *in the conversation* is what replaces the log
  write — it is the enforcement mechanism, not a formality.
- **At session end:** deliver the handoff doc.

## When to observe

Active for the entire session: execution, post-task feedback, review
discussion, meta-discussion about skills or methodology, and reflective
conversation about how work should be done.

**The observation mindset does not deactivate when the conversation shifts
from doing the work to discussing it** — feedback in review phases is often
the highest-signal input of the whole session.

Inactive only for casual conversation and quick factual questions with no
substantive work involved.

## What to watch for

**Signals for a NEW skill:** a reusable multi-step workflow; a methodology
the user explains that no existing skill captures; a recurring task type
with similar structure; a process with clear inputs, phases and outputs; the
user describing a refined process ("I always do it this way"); a structured
approach emerging naturally during the work.

**Signals for IMPROVING a skill:** a documented rule gets violated (the
skill needs enforcement, not louder rules); a user correction reveals a
missing rule or edge case; a better workflow emerges than the skill
recommends; a technique works well enough to promote from incidental to
recommended; an undocumented use case; feedback that generalises; a wrong
assumption; new tooling obsoletes a step; corrections forming a pattern; a
naming, framing or structural suggestion, even a conversational one.

**Signals for SIMPLIFYING a skill:** a section never relevant across many
sessions; a rule resting on a single unvalidated observation; workflows
users consistently shortcut; contradictory rules; "just in case" complexity
that never triggered; a rule the agent consistently fails to follow —
convert it to structural enforcement or remove it. Ask "what can we remove?"
as deliberately as "what should we add?"

**Do NOT log:** one-off corrections that don't generalise; preferences
already captured in a skill; tool bugs unrelated to methodology;
observations that would need confidential information to be useful.

## How to log

Record each observation **within the same turn it occurs, or the next** —
never batch them mentally for the end. Batching is the failure mode this
skill exists to prevent: the insights that matter surface during cognitive
load, and that is exactly when they are lost.

Keep it brief in-line — don't derail the work. A logged observation is a
side note, not a discussion topic.

**Deliverable-event flush.** Whenever you deliver something substantial — a
document, an analysis, a draft, a completed batch of steps — flush any
pending observations at that moment, before moving on. These are natural
checkpoints that already interrupt the work, so the flush costs nothing
extra. Soft prompts that rely on memory don't survive long sessions.

**Every observation MUST carry `**Status:** OPEN` as its first field.** This
is mandatory at write time. Reviews classify entries by status; one written
without a status line is invisible to any status-filtered pass and gets
silently skipped instead of triaged.

Number sequentially. If continuing from a handoff doc, continue its
numbering — never restart at 1 and never reuse a number.

### Format

```markdown
### Observation [N]: [Short descriptive title]

**Status:** OPEN
**Date:** [date]
**Session context:** [what was being worked on]
**Skill:** [existing skill name, or "New skill candidate: [working name]"]
**Type:** [open-source | internal]
**Phase/Area:** [which part of the skill or workflow]

**Issue:** [What happened — specific enough to understand weeks later
without the original conversation.]

**Suggested improvement:** [Concrete change. For an existing skill, name the
section or rule; for a new skill, the scope and key components.]

**Principle:** [The generalisable takeaway — the most important field.]
```

**Context preservation:** if an observation depends on something that dies
with the session — a pasted output, an uploaded file's contents, a specific
error — reproduce that evidence inside the observation itself. An
observation whose evidence is gone is incomplete.

## Open-source or internal

**Open-source** — client-agnostic, methodology-driven, useful to other
practitioners. **Internal** — contains user, client or project specifics, or
personal preferences.

Default to open-source when it could go either way, stripping the specifics.
The boundary is also a confidentiality boundary: for an open-source
observation the Issue and Improvement fields may reference specifics for
context, but the **Principle must be fully generalised** — no client names,
domains, or details traceable to a real project.

## Surfacing

At the end of the session, give a grouped summary: improvements grouped by
skill, new-skill candidates listed separately, one sentence each plus the
suggested type.

Surface earlier only when an observation needs the user's input to be
complete, when a skill is actively producing wrong output, or when several
observations cluster on one skill.

**Default to log-and-defer.** Surfacing is not an invitation to act. State
that it's captured for the next review, and stop. Do not routinely offer a
binary "apply now or defer?" choice — for anyone running regular reviews
that's unwanted friction repeated every session. If the user expresses a
standing preference to defer, suppress the offer entirely.

**Act only when:** the user explicitly asks ("update X", "act on #3"), or a
skill is producing wrong output right now that the user should know about.
Otherwise: log, don't act.

**Self-check before surfacing:** observations were captured throughout the
whole session including discussion phases; each follows Issue → Improvement
→ Principle; each is typed; existing-skill items name the section; no
open-source Principle contains identifying information; every observation
carries a Status line.

## The handoff document

**Offer it proactively when the conversation winds down** — a premature
offer is a minor interruption, a missing one is lost work.

```markdown
# Session Handoff: [Session Topic]

**Date:** [date]
**Context:** [what was worked on; what the next session needs to know]

## Decisions Made
[numbered]

## Observations Logged
[full entries in the standard format above]

## Cross-Cutting Principles (current)
[principles that apply to skills generally, not just one]

## Action Items
[next steps, with enough context to resume cold]

## Working Artifacts
[drafts and analyses in full]
```

### When a handoff doc arrives

1. Log every explicitly stated observation first, unfiltered.
2. Then re-read every section asking what skill gaps or candidates are
   *implied but unstated* — handoff docs carry signal beyond what was
   captured live.
3. Pay particular attention to action items (each may imply a missing
   skill), open questions (ambiguity signals a decision-framework gap), and
   the work-completed narrative (patterns there may reveal meta-skills).
4. Attribute derived observations to handoff-doc analysis, not to the
   original session.

## Writing or changing a skill

Two rules carry most of the weight:

**The Pre-Flight Principle.** Rules documented in a skill are not reliably
followed during creative flow. Every skill with rules needs a verification
step where the output is checked against them before delivery. When adding a
rule, ask: what makes this checkable? A rule that keeps getting broken
should become structural or be removed — not restated louder.

**Lean content.** A skill should contain only what changes behaviour at
execution time. Test: would removing it change what the agent does? If not,
cut it. But do NOT cut examples, anti-patterns, or worked scenarios — bare
rules get violated far more often than rules with context.

For an open-source skill, also required: an attribution block, a licence
statement, and a confidentiality sweep for names, domains and examples
traceable to a real project. When in doubt, remove — slightly more generic
beats slightly leaky.

## Quick reference

| Question | Answer |
|----------|--------|
| When do I observe? | The whole session, including feedback and reflection phases |
| When do I write one down? | Same turn or the next — never batched for the end |
| What forces the write? | Deliverable events: flush pending observations as you hand something over |
| Status line? | Mandatory `**Status:** OPEN` as the first field, every time |
| Numbering? | Sequential; continue from a pasted handoff doc, never restart |
| Open-source or internal? | Default open-source; the Principle must carry nothing identifying |
| Should I act on it? | No — log and defer, unless asked or a skill is actively wrong |
| How does anything persist? | The handoff doc — offer it as the conversation winds down |
