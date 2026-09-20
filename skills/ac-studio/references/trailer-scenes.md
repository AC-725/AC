# Trailer engine — the figure-as-Simon montage cut

Born 2026-08-18 (Day 34 intro), reverse-engineered shot-for-shot from
@realsimonsquibb DZdWv_jMQfJ and AC's screen recording of it. The AC figure plays
the creator: an address shot, a one-word-per-hard-cut montage with gold lighting
flips, wordless b-roll poses, and a wide wave-out with the CTA. Use it when a story
wants movie-trailer drama rather than the calm News-engine read — a launch, an
introduction, a callout.

Template: `assets/trailer.template.html` (self-contained; fonts must sit beside it
in `fonts/`). Same engine contract as the other templates: `window.__TOTAL`,
`window.seek(t)`, a `SCENES` global, a `const SUBS=[...]` block produce.sh can strip.

## The shot grammar (the Squibb skeleton)

1. **Address shot** (~2s) — figure talking, caps caption names the VILLAIN, not the
   viewer ("THIS IS A MESSAGE TO EVERY AI GURU"). Live on frame 0, never soft.
2. **One-word montage** (~0.5s per cut) — the claim spread one giant Gloock word per
   hard cut. Every 2nd-3rd cut flips to the gold panel (`inv:true`) — the lighting
   change is the architecture change gate 3 needs, so keep one flip inside 2.6-3.6s.
3. **Receipts** (~1.2s per cut) — the proof words, incl. the cash-fan pose (`fan:1`).
4. **Wordless b-roll** (~2s per cut) — posed figure, no words. The music moment.
5. **The law** — two more word cuts, one inverted.
6. **Wide wave-out** — smaller figure waving (`waveup`), handle, `Comment X · asset`
   tagline, faint loop line repeating the opening words (the rewatch seam).

## Editing rules learned the hard way (all shipped as bugs first)

- **One scene per hard cut.** Cards sharing a scene stack in the DOM and
  `qa_layout`'s freeze-audit force-shows every child — phantom collisions.
- **Word + figure must FIT the content zone** (`.scene` top/bottom). The zone is
  ~1000px with no subtitle band (240→1240). A word block plus a figure taller than
  the zone silently overflows *upward* out of the flex box — the gates measure the
  scene untransformed and cannot see it. Size figures as
  `figW ≈ (zoneH - wordH - gap) * 210/290`.
- **Entrances grow IN to scale 1, never overshoot past it.** The audit's scale-1
  measurement is only the worst case if nothing ever exceeds scale 1. A 1.18
  shrink-in overshot into the fixed overlays.
- **Fixed overlays (watermark, any caption band) are invisible to gates 1/2.**
  After every layout change, eyeball rendered frames of EVERY worded shot against
  the watermark line. Gate 6 checks only what it can see at scene freeze.
- **The watermark inverts to black during `inv` shots** (seek() drives it) — gold
  on gold is invisible. Brand law: on gold ground, the accent inverts.
- **Nothing static >1.0s** (gate 4): linear pose drift (never eOut — it plateaus),
  a continuous forearm micro-sway, mouth talk in `talk:1` shots, and a punch zoom
  on the long CTA hold (`transform-origin` anchored at the bottom so the zoom
  grows AWAY from the watermark).
- **Deterministic only.** Every animated value is a pure function of t
  (Math.sin(t) fine; Date/random never).

## Poses

`rest · akimbo · shrug · point · crossed · waveup · palms · lean` — two-bone arms,
a shot interpolates `pA→pB` linearly across its hold with head angles `hA→hB`.
The figure is the canonical mark **without hair** (AC's reference, 2026-08-18):
clean head, sunglasses with temple arms, one raised brow, caret mouth.

## Sound

The trailer is **music-first, like the source**: primary deliverable is the silent
cut with AC's chosen track muxed (or added in the IG app). The engine's SFX bed
still builds via `AUDIO_ARGS` mapping the 5 VO groups onto the shot timeline:

```bash
AUDIO_ARGS='--scenes A=0,B=2.0,C=5.0,D=12.6,E=15.4 --dur 18.5' \
  bash SKILL_DIR/scripts/produce.sh trailer.html AC_<Slug> --silent-also
# then mux the track:
ffmpeg -i <name>_silent.mp4 -i track.mp3 -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 192k -t 18.5 -af "afade=t=out:st=17.3:d=1.2" <name>_music.mp4
```

VO (optional, recorded over the music): written to the 5 groups with a
**deliberate 4s silence over the b-roll** — the quiet is the confidence. Subtitles
are dropped on this engine by design: the giant words ARE the captions
(AC's call, 2026-08-18); the `SUBS` block stays in the file with empty strings so
produce.sh still recognises it.

## Day 34 reference cut

18.5s · 14 shots · map above · words: MOST / AI / ADVICE / IS AN / AD. →
WE CHECKED. / 14 "FREE" TOOLS / 6 WERE TRIALS. → b-roll ×2 → NO SOURCE, / NO POST.
→ wave-out. Music: AC-supplied track. Full run in `runs/day34-intro/` (repo).

## v4 addendum (2026-08-18, AC's review)

- **The gold flip is FULL-BLEED**, never a boxed panel — the box read as an awkward
  square during cuts. A stage-level `#goldbg` underlay toggles via seek() and the
  chrome (frame, ticks, progress rule, watermark) inverts with `#stage.goldmode`.
- **The pause/b-roll shots use the `think` pose** (hand on chin, head-tilt drift),
  not `crossed` — crossed read as praying hands at reel scale and is retired from
  shots (it survives only on the WARNED. cover, where it reads as arms folded).
