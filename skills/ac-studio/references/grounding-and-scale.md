# Figures on a floor line: grounding, scale, and the finish post

Learned on the 2026-08-25 "A robot beat Usain Bolt" run, after four rounds of AC's screenshots.
Every rule here exists because a specific defect shipped into a preview.

## 1. Pin the floor line for the whole video

A floor line that rides the camera shifts a few pixels between beats and reads as a wobble.
Set the camera's vertical component to zero and pivot the zoom ON the floor
(`transformOrigin: X_finish + 'px ' + BASE + 'px'`). The line then sits at the same pixel from
frame one to the loop seam, at every zoom level, and anything standing on it is anchored.
AC's words: "the line should be fixed entirely throughout the video."

## 2. Hang limbs from the joint, not from a box edge

A limb drawn as a bar with `bottom: N` and rotated about its top pivots around a point that
moves when the bar's length changes. Hang it from the joint instead:

    bottom: jointHeight - length, transformOrigin: '50% 0%'

so the tip swings on an arc that ends ON the floor line.

## 3. Lift the body, never sink the feet

When a leg swings more vertical its tip reaches past the floor. Raise the whole figure by
exactly that overshoot:

    lift = max(0, cos(frontAngle)*frontLen - hip, cos(backAngle)*backLen - hip)

That lift IS the natural rise and fall of a run, so it costs nothing visually and one foot is
always planted. Do NOT add a separate sine bob on top: the two fight and the figure floats.

## 4. Counter-rotate the shoes

A foot block inherits its leg's rotation, so its corner digs under the line. Rotate it back by
`-legAngle` about its own top. Deepest ink after this fix: ~3px, which reads as contact.

## 5. Scale the whole figure from one constant

AC re-sized the runners twice (145 to 120px). Keep ONE scale constant on the outer wrapper with
`transformOrigin: '50% 100%'` (the feet), and scale the lift by the same factor. Everything
inside — limbs, kit, streaks, labels — follows, and the grounding math still lands.

## 6. The finish post is longer than you think, and it fights the zoom

AC asked twice for a longer 100m finish line. Two traps:
- A post drawn `top: BASE - 130, height: 146` hangs 16px THROUGH the floor. Height must equal
  the offset, exactly.
- The opening close-up runs at 2x, so a post sized for the wide shot doubles and hits the
  headline. Animate its world height inverse to the zoom: 150 during the 2x open, 300 for every
  wide shot, crossfading during the pull-back. The screen length then looks constant.

## 7. Labels below the floor

A travelling label under a runner sits within ~25px of the floor line. Any source credit in the
same column must start at 1074 or lower, or the two touch. Static lane tags (BOLT / ROBOT) on
each lane's own rule never collide and read as a legend.
