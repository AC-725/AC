# Duration variants — retiming a cut without desyncing anything

Sometimes a story needs more room than the default cut (Day 14 shipped both an 11.7s and
a ~24s News cut). Retiming is now a **flag, not a project**: audio cues are defined
relative to scene starts, and subtitles ride on `SCENES`, so both follow the template
automatically.

## The procedure (News reel)

1. **Retime `SCENES` in the working copy** — new `start`/`dur` per scene. Keep the scene
   ORDER and count; stretch the holds, not the intros (each scene's entrance animations
   keep their attack — a longer scene simply holds its composed frame, which is what a
   VO-paced cut wants).
2. **Build with `AUDIO_ARGS`** carrying the SAME starts you set in step 1:

   ```bash
   AUDIO_ARGS='--scenes A=0,B=5.2,C=10.3,D=15.4,E=19.7 --dur 24' \
     bash SKILL_DIR/scripts/produce.sh reel24.html AC_Reel_DayN_slug_24s
   ```

   `build_video.sh` passes `AUDIO_ARGS` to `reel_audio.py`, which re-places every cue at
   the new scene starts. Do NOT edit the cue code for a retime.
3. **Subtitles need nothing** — `subTick(t)` reads `SCENES`, so captions re-anchor
   themselves. Longer scenes give slower, calmer typing; check one typed frame per scene
   anyway (a 5s hold may want a slightly longer SUB fragment).
4. **Re-run the full QA** (`qa_layout.sh` + frame eyeball at the NEW scene midpoints) —
   retimed frames are new frames.

### A known-good 24s map

Proportional stretch of the default (0 / 2.6 / 5.0 / 7.5 / 9.6 · 11.7s):

```
A=0  B=5.2  C=10.3  D=15.4  E=19.7   dur 24   (durs: 5.3/5.2/5.2/4.4/4.3)
```

## TOD

`tod_audio.py` still uses absolute cue times (denser cue map, rarely retimed). To retime
TOD: edit `SCENES` in the working copy AND shift each scene block's cues in a working
copy of `tod_audio.py` by that scene's delta. If TOD retimes become routine, port it to
the scene-relative pattern `reel_audio.py` now uses.

## Guardrail unchanged

The default cuts stay the defaults: ~11.7s News / ~31.6s TOD. A variant is a deliberate
extra deliverable (VO pacing, A/B test), not a new standard. Log every variant in
run-log.md with its scene map so the next session can rebuild it.
