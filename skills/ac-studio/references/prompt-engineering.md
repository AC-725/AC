# Prompt engineering, folded in — from AC's `prompt-master` skill (2026-08-30)

Distilled into ac-studio's own house style, not cross-called, so a run never has to leave
this skill mid-task. AC's separate `prompt-master` skill remains the canonical,
tool-agnostic reference and evolves on its own; when it changes meaningfully, re-sync this
file by hand — it is a translation, not a link.

**Fires at ONE moment: right after AC agrees the topic/direction, before drafting
starts.** Not at the start of a run (that's research, step 2) and not after the fact
(that's the audit gates). It is the step between "we know what we're making" and "now
build it" — Lane A step **3b**, right after "Confirm the creative" and before "Write the
words"; Lane B right after a cover, layout or icon direction is picked and before slides
or motifs get built.

**Why it exists: to cut rework, not add ceremony.** A vague or unbounded brief — whether
it's the instruction I'm effectively giving myself when drafting a beat sheet, or a
prompt going to an outside image/3D generator — costs the same when it's wrong: a full
re-render, a re-audit, a re-board. This step is cheaper than that, every time. Concretely,
the class of defect it would have caught on past runs: the walker's arm crossing the
slide counter (no stated boundary — "must clear X"), a disclaimer headlined instead of
the exchange (no named audience/goal for the slide), a keyword mismatch between two
slides (no shared output-format lock across the pack), icons mounted at 60% padding (no
explicit spec for what "ready to mount" means). None of these needed a smarter idea —
they needed the idea stated as a bounded spec before building, instead of discovered
after.

## Two things this step produces

### A. The internal drafting brief — for beat sheets, captions, on-screen copy, VO

Before writing the beat sheet or the carousel CONTENT, clear four lines — not a form to
fill out, a checklist to clear:

- **Role** — whose voice, for whom. Already answered by this skill's Voice section for
  most runs; restate only when a piece breaks pattern (Technique Day's neutral UI, a
  bilingual caption).
- **Output-format lock** — the real constraints: word/line counts, banned words, no
  em-dashes on screen, which slide carries the keyword and what it must be reused
  verbatim on. State it before drafting, not as a post-hoc edit.
- **Grounding anchor** — the primary source for the number, cited before it goes on
  screen. This is `references/research.md`'s law, restated as a drafting-time habit
  rather than a gate discovered later.
- **Stop condition** — what "done" looks like for this piece, in the audience's own
  terms. A pack whose own tool slide can't say what it hands over is asking the audience
  to want something undefined.

Ask for **conclusions, evidence and verification results** when checking a draft against
this brief — never hidden reasoning, never a chain-of-thought trace. "Does this line pass
the banned-word list, yes or no, which word" beats "think step by step about whether this
is good."

### B. The external generation prompt — when an asset needs an outside AI tool

**New law (AC, 2026-08-30): external generative AI is a legal asset source for icons,
motifs and cover art. Never for the AC figure** — he stays the approved stroke rig,
`references/figure-rig.md`, transform-only, no exceptions. Three.js baking
(`references/icons3d.md`) stays the default, in-house, free, already brand-gated route;
reach for an external tool when a piece wants more character than the simplicity gate's
3–8 parts can carry — a cover motif, a one-off hero image, a prop the baked set doesn't
have.

**Every such prompt opens with the same fixed constraint block, before the subject:**

```
flat #0A0A0A ground (or true transparency if it must composite — no white box, no
checkerboard baked in); if metallic, the matte gold trio #C9A961 / #E7C765 / #8A7331
plus cream #F4F0E7 for paper or dial faces only; one strong silhouette; no gradient
background, no glow, no grain, no vendor watermark or logo; soft warm key light + gold
rim if lit; consistent 3/4 angle if part of a set.
```

That block is not decoration — it's what lets an externally generated piece pass the
SAME gates a three.js bake already passes: Gate 9 (alpha-check on arrival — knock out
luminance > 250, ramp the 225–250 band), the one-gold-idea law, and the legibility a
carousel slide needs at a 208px mount.

**Pick the target by what the asset is:**

| Asset | Target | Prompt shape |
| --- | --- | --- |
| Flat cover art, a motif, a mood piece | **Midjourney** | Comma-separated descriptors: subject → style → mood → lighting → composition, params at the end (`--ar 4:5 --v 6 --style raw`), `--no` for anything to exclude. |
| A quick flat piece where prose beats tags | **DALL-E 3** | Full prose description. Add "no text in the image unless specified." Describe foreground/midground/background separately if the comp is busy. |
| A piece needing precise weight control on one element | **Stable Diffusion** | `(word:weight)` syntax, CFG 7–12, negative prompt is mandatory — put the constraint block there too. |
| A 3D icon, prop or set piece beyond the baked 12 | **Meshy / Tripo / Rodin** | style keyword (matte, low-detail, geometric) + subject + key features + primary material (matte gold / brushed cream) + texture detail + export target (say "PNG bake," not a game asset) + negative prompt: "no background, no base, no floating parts." Rodin for a single hero piece at highest quality; Tripo when several props are needed fast. |

**After generation:** alpha-check (Gate 9) before mounting, same as any baked icon. If it
doesn't knock out cleanly to transparency, it doesn't ship — regenerate or matte it out
by hand rather than mount a piece with a visible box.

**Never** ask a generation prompt for chain-of-thought, a visible "thinking" pass, or a
vendor's own UI chrome recreated inside the frame — the neutral-UI law from Technique Day
now covers any externally sourced art too: no recognizable product chrome, ever, in-feed.

## Credential safety

If a future tool needs a key, it never goes into the prompt text or into any file this
skill produces. Reference it as "assumes `<SERVICE>` is already authenticated" and stop
there.

## The verification pass — before it ships, not instead of the other gates

This step does not replace `qa-audit.md`, Gate 7 or Gate 9 — it runs BEFORE them, so
fewer things arrive at those gates broken. The question at the end of drafting is the
one prompt-master asks of any prompt: **would this produce the right output on the first
pass, with zero rework?** If the honest answer is no, tighten the brief, not the finished
asset.
