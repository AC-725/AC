# Mode: Experience

Austin just shared something real — a client win, a story, a number, a thing that worked, a lesson
learned the hard way. Capture it before it's gone.

These are the highest-value things in the system and the easiest to lose. A lesson told in chat and
never written down gets relearned at full price. A client win that isn't captured can't become
content, proof, or a case study three weeks from now when he needs one.

## First: what kind of thing is it?

Two kinds, two destinations. Some things are both — capture both, cross-referenced.

| Kind | Looks like | Goes to |
| --- | --- | --- |
| **Lesson / rule** | "turns out X never works", "clients always ask Y first" | The skill it changes — as an instruction. Then log it. |
| **Story / win / proof** | "this client saved 6 hours a week", "the reel hit 40k" | `system/experiences.md` — reusable raw material |

A lesson that only lands in the log changes nothing. If it should alter behavior, put it in the skill
where the behavior lives (see `references/skill-review.md` for routing) and log it as the record of
why. The log is memory, not instruction — nothing reads it automatically.

## Capture in his words

His whole brand is the plain-English voice. The verbatim phrasing is the asset — it's what makes an
entry usable as a caption or a hook later without rewriting. Sanding it into neutral business prose
destroys exactly the thing worth keeping.

So: quote him directly. Keep the phrasing that has energy, including the informal bits. Put your own
summary in the headline if you need one, and leave his words intact underneath.

## Ask only for what's missing

Cap it at three questions, and only genuinely load-bearing ones. He was telling a story, not filling
in a form — an interrogation is a good way to teach him not to share the next one.

Worth asking when absent:

- **The number.** "Saved a bunch of time" is unusable; "4 hours a week, down from 6" is proof. His
  content is built on one real number, so an unquantified win is half-captured.
- **Naming rights.** If a client is involved: can the name be used publicly, or is this
  anonymized-only ("a Hong Kong logistics firm")? Never assume a real business consented to appear in
  marketing. Record the answer with the entry — a name captured without this is unusable later,
  because nobody will remember whether it was allowed.
- **The before.** A result only reads as a result against what it replaced.

Don't ask for anything you can infer from the conversation. And never invent a number to fill a gap —
write "(number not captured)" and move on. An invented metric that later gets published is a much
worse outcome than a thin entry.

## Log format

Newest first, so `system/experiences.md` opens on what's current. Create the file with this header if
it doesn't exist yet.

```markdown
# Experience log

Stories, wins, and lessons in Austin's own words. Raw material for content, proof, and case studies.
Newest first. Nothing here loads automatically — it's a store to search, not instructions.

---

## 2026-07-26 · Logistics client cut quote turnaround from 2 days to 20 minutes

**Kind:** win + lesson
**Client:** Hong Kong logistics firm — **anonymized only, name not cleared**
**Numbers:** 2 days → 20 min per quote · ~6 hrs/week back · 40 quotes/month

**What happened**
Their quotes were being typed by hand from a WhatsApp thread every time. We pointed the quotes
skill at their own template and the turnaround collapsed.

**In his words**
> "They didn't want AI. They wanted their evenings back. That's the whole pitch."

**Lesson** → folded into `ac-wins-assessment`: lead with the hours returned, not the tech.
**Reusable as:** proof in discovery calls · a reel on "what clients actually buy" · offer page
```

Fields that carry their weight: date, a headline that says the outcome, the numbers, his quote, and
where it can be reused. Skip any field you don't have rather than padding it — and mark the skill
edit inline, so the log shows which lessons already changed behavior and which are still just notes.

## Close out

Per `SKILL.md`: what changed, where it lives, what still needs him. Commit — `system/experiences.md`
is in the repo precisely so this survives the container.

If the entry contains an uncleared client name, say so in the close-out. That's the one field most
likely to cause a real problem downstream if it's forgotten.
