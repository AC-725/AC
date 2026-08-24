# seq 45 · Dry clean only · lane B (`everyone gets this wrong`)

**Week variable: origin-forward beat 2, held constant from seq 44.** Seq 44's 48-hour
read is not in yet. Changing a second thing this week would void the read on the first.
So: same structure, new topic, no new variable.

The animated priority timeline (`anim/scenes/priority-1877.html`) is built and proven but
**does not debut here.** It was scheduled as seq 45's variable; it waits until origin-forward
has a clean two-video read.

---

## Why this topic passed where three others failed

Three rejected candidates this week — leather, thread count, "dry clean only is CYA" —
all died the same death. The rule they taught:

> **A label lie is only fresh if nobody sells the alternative.**

Wrought iron worked (1,315 IG) because real wrought iron stopped being made
commercially in 1973 and nobody runs SEO on it. Full-grain leather sellers and bedding
brands have already pre-packaged the correction for leather and thread count — the
beneficiaries of the correction own page one.

Care labels have no beneficiary. No brand profits from teaching you to read the word
*only*, and the FTC's own guidance page is not written for consumers.

## The premise had to be rebuilt from the source

The original angle was **"dry clean only is just CYA — wash it anyway."** That is
**false**, and it would have ruined people's clothes.

16 CFR 423 does not let a manufacturer print the harder claim for free. Per the FTC:

> when you use `Dryclean only`, you must have a reasonable basis for **both** the dry
> cleaning instruction **and** the warning against washing.

So the correction runs the *other* direction. The soft label is the one that
overpromises — a plain `Dryclean` only has to be *one* safe method, because the Rule
compels exactly one:

> dry cleaning "need not be the only, or even the best, method of cleaning the item"

Same shape as wrought iron: a word on a tag that does not mean what the buyer reads.
Opposite safety direction from the version I first proposed.

## Script — 64 words

| # | Line | Words | Syl | `p` |
|---|---|---|---|---|
| 1 | Your label says dry clean. | 5 | 6 | 0.25 |
| 2 | The FTC decides that wording. | 5 | 8 | 0.85 |
| 3 | Dry clean and dry clean only are two different labels. | 10 | 14 | 0.20 |
| 4 | The rule only makes them name one safe method. | 9 | 13 | 0.15 |
| 5 | So dry clean may simply be the method they chose to print. | 12 | 14 | 0.50 |
| 6 | Only is the word that means they proved washing destroys it. | 11 | 15 | 0.20 |
| 7 | Go read the label inside your collar. Look for the word only. | 12 | 16 | 0.65 |

**SFX:** hit on beat 2 (0.6), soft on beat 7 (0.4). `sfxHits: 2`.
Beat 1 is 5 words, under the 7-word cap.

### Duration — the syllable model's first live test

    total = syllables x 0.244 / speed + sum(pauses)
          = 88 x 0.244 / 0.92 + 2.80
          = 23.34 + 2.80
          = 26.14s modelled

`22-28s` gate: **PASS**, 4.14s off the floor, 1.86s off the ceiling.

⚠ **88, not 86.** The syllable counter reads `FTC` as one syllable because it holds no
vowels. Spoken it is three — *eff-tee-see*. Initialisms are the mirror of seq 44's
problem: Latin binomials made the *per-word* model under-count, and initialisms make the
*per-syllable* counter under-count. Count them by mouth.

The syllable model reproduced seq 44 to within 0.11s, so the expected residual here is
~0.2s, not seq 44's 2.07s. 1.86s of ceiling headroom is comfortable on that basis.

### Close

"Go read the label inside your collar" — physical, do-it-now, and the garment is already
on the viewer. Same family as "go look at your window", which produced the only share in
25 reels. "Send this" has produced zero, every time.

---

## `trap` — what NOT to say

**1. NEVER tell a viewer to wash a garment labelled `Dryclean only`.** That label carries
a legal burden in both directions. This was the original angle. The FTC text killed it.

**2. Never invert the two labels.** Plain `Dryclean` = one of possibly several safe
methods, because the Rule compels only one. `Dryclean only` = the *stronger* claim,
requiring a basis for the warning against washing. The correction runs from soft to
strong, not strong to soft.

**3. Do not say the FTC "wrote" or "invented" the words on a specific garment.** The FTC
sets what wording is permitted and what basis is required; the manufacturer picks. Beat 2
says "decides that wording", which is accurate.

**4. No year anywhere.** The Rule's dates were not confirmed against a primary source
this session. Do not let a caption reintroduce one — that is exactly how seq 44 ended up
with a blog-sourced 1995.

**5. Verification status: FTC business guidance read via search summary, not fetched.**
The two block quotes above are the load-bearing text. **Confirm on ftc.gov before
posting.** This is the same weak link seq 44 shipped with, and it is the second time.

---

## Cover

SPLIT, seed 45, part 20. Grey tag `DRY CLEAN` left, gold tag `DRY CLEAN ONLY` right,
divider between. Headline "One word changes the label", meta "only carries a legal
burden".

RECEIPT was blocked by grid variety — seq 44 already used it. Part 20 derives from seq 44
being part 19, from seq 43's node header reading "Lane B, part 18".

## Pictures

Pexels clips, 11 queries probed in one pass (7 beats + 4 alternates). Beats 1, 3 and 7 all
want a garment label and are deliberately given **three different subjects** — `label`,
`collar`, `shirt` — because seq 44 proved a shared subject returns the same single clip to
two beats and trips `repeatedClips`.

## Still open

- **Probe not yet run.** Queries are loaded in the `Queries` node of
  `r3sBLmUBkpfos7fW`; it is a manual trigger, so it needs a human click.
- **`BEATS[45]` not yet written** — waits on the probe verdicts.
- Row 45 sits at `draft`. Flip to `ready` only after the node carries the beats.
- Seq 44's 48-hour read: still no sends ÷ reach, still no viewed-vs-swiped.
