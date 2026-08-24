# The duration model, recalibrated after seq 44

`total = words x rate / speed + sum(pauses)`

The single-rate version of this model **under-predicted seq 44 by 2.07s and put a video
outside the 22-28s gate.** It shipped at 29.52s. The fix is not a new constant — it is
recognising that the rate is not a constant.

## What the renders actually measured

| seq | words | pause | modelled | actual | miss | s/word at 0.92 |
|---|---|---|---|---|---|---|
| 42 | 55 | 2.15 | 27.2 | 24.84 | −2.36 | 0.4125 |
| 43 | 50 | 2.30 | 24.93 | 22.04 | −2.89 | 0.3948 |
| **44** | **54** | **2.85** | **27.45** | **29.52** | **+2.07** | **0.4939** |

Seq 44 runs **25% slower per word** than seq 43. Same voice, same speed, same renderer.

## Why

The Build Beats header already says it: *"Word LENGTH moves it ±3s — short common words
run fast, multisyllabic numbers run slow."* Seq 44 is the extreme case. It says
**Brontosaurus** twice and **Apatosaurus** three times — five words carrying 5 syllables
each, in a 54-word script. Seq 43's vocabulary is *ball, TV, trick, pattern, phone*.

Treating 0.4191 as a universal constant is what produced the miss. It is a
short-common-word rate.

## Use this instead

Count syllables, not words. Rough rate per **syllable** at speed 1.0, from the three
renders above:

    seq 42  ~0.244 s/syllable
    seq 43  ~0.240 s/syllable
    seq 44  ~0.248 s/syllable

That collapses to **~0.244 s/syllable at speed 1.0**, and it holds across all three
where the per-word rate swings 25%.

    total = syllables x 0.244 / speed + sum(pauses)

Check against seq 44: 54 words but ~101 syllables. 101 × 0.244 / 0.92 + 2.85 = **29.63s**
against 29.52 actual. The per-word model said 27.45.

## Practical rule for scripting

Budget **~95-100 syllables** at speed 0.92 with ~2.6s of pause to land mid-gate at ~25s.
For an ordinary-vocabulary script that is 50-55 words. For a script carrying Latin
binomials, chemical names or long place names it may be as few as 44.

**Count the long words before writing the seventh beat, not after the render.** The
render is the expensive place to discover a script is polysyllabic.

### Two counting traps

**Initialisms under-count.** A syllable counter looking for vowels reads `FTC` as one
syllable. Spoken it is three — *eff-tee-see*. Same for `FDA`, `USB`, `PhD`. Acronyms
said as a word (`NASA`, `NATO`) are fine; letter-by-letter initialisms are not.
Seq 45 was 86 by script and 88 by mouth.
This is the exact mirror of seq 44's failure: Latin binomials broke the *per-word* model,
initialisms break the *per-syllable* counter.

**Numerals under-count worse.** `1995` is one token and four syllables minimum
(*nineteen ninety-five*), `2015` the same. Seq 44 carried two of them. Always expand a
numeral to the words the voice will actually say before counting.

## Still to verify

Three renders is a thin calibration and all three are the same voice at the same speed.
The syllable rate should be re-checked on the next two videos before it is trusted as
firmly as the 22-28s gate itself.
