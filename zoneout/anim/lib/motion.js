/* ZoneOut · motion law — what "premium" means, as numbers rather than taste.
 *
 * DIAGNOSIS THIS FILE ANSWERS. Measured on scenes/priority-1877.html, 24 Aug 2026:
 *   - SIX overlapping motion spans. At t=1.0 four things were moving at once.
 *   - SIX continuous sine drivers that never stop. The camera drifted on two axes for
 *     the whole beat; the animal bobbed forever. Nothing was EVER still.
 *   - ease.back (overshoot) on both nameplate entrances.
 *
 * Those three together ARE the look people read as "AI". Not the render quality, not the
 * resolution — perpetual motion, everything moving at once, and bouncy easing. A stock
 * clip with a Ken Burns pan has exactly the same signature, which is why the format reads
 * machine-made even when the research behind it is original.
 *
 * Premium motion is the inverse, and it is cheap to state:
 *
 *   1. ONE THING MOVES AT A TIME. A second simultaneous move needs a reason.
 *   2. STILLNESS IS A CUE. A hold before the turn is what makes the turn land. A frame
 *      where nothing moves is not a dead frame — it is the setup.
 *   3. NO OVERSHOOT ON TYPE. Back, elastic and bounce read as toy. They are not exported
 *      from this file, deliberately.
 *   4. ENTRANCES OUTLAST EXITS. Roughly 1.6:1. Viewers care what arrives, not what leaves.
 *   5. MICRO-LIFE DECAYS. If something breathes, it settles. A sine that runs forever is
 *      a screensaver.
 *
 * The gate is `motionAudit()` at the bottom: it counts how many cues are live at each
 * sampled instant and fails a scene that exceeds its budget. Same discipline as the render
 * gates — a rule nobody can check is a rule nobody keeps.
 */

/* ---- easing: deceleration only ---------------------------------------------
 * outQuint is the house curve. It puts ~97% of the distance in the first 55% of the
 * duration, so a move arrives early and settles late, which is what reads as weight.
 * No back/elastic/bounce is exported. That is the point. */
export const E = {
  outQuint:   p => 1 - Math.pow(1 - p, 5),
  outExpo:    p => p >= 1 ? 1 : 1 - Math.pow(2, -10 * p),
  outCubic:   p => 1 - Math.pow(1 - p, 3),
  inOutQuart: p => p < 0.5 ? 8 * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2,
  linear:     p => p,
};

const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;

/* A cue: normalised, clamped progress of t across [at, at+dur].
 * Registers itself so motionAudit() can see it. */
const REGISTRY = [];
export function cue(t, at, dur, fn = E.outQuint, label = '') {
  if (dur <= 0) return t >= at ? 1 : 0;
  if (label) REGISTRY.push({ at, dur, label });
  return fn(clamp01((t - at) / dur));
}

/** Entrance/exit pair honouring the 1.6:1 rule. Pass the entrance duration. */
export const IN_OUT = inDur => ({ in: inDur, out: inDur / 1.6 });

/**
 * Micro-life that SETTLES. Amplitude decays to zero by `until`, so a breath reads as the
 * thing coming to rest rather than as a loop. Replaces the bare Math.sin(t * k) drivers,
 * every one of which ran for the whole beat and never stopped.
 */
export function breathe(t, { freq = 1.6, amp = 0.04, until = 2.2 } = {}) {
  if (t >= until) return 0;
  const decay = Math.pow(1 - t / until, 2);
  return Math.sin(t * freq * Math.PI * 2) * amp * decay;
}

/**
 * A deliberate camera move: still, then ONE move, then still again. The opposite of
 * `camera.position.x = Math.sin(t * 0.42) * 0.18`, which never arrives anywhere.
 * Returns 0..1 progress across the move window only.
 */
export function push(t, at, dur) { return cue(t, at, dur, E.inOutQuart); }

/**
 * MOTION CEILING GATE. Samples the beat and reports how many labelled cues are live at
 * each instant. `budget` is how many simultaneous moves the scene allows.
 *
 * This is the inverse of a motion FLOOR. ac-studio gates that nothing sits static too
 * long; ZoneOut's problem is the opposite — too much moving at once is what reads
 * machine-made. Both are real, and a format needs whichever one it actually fails.
 */
export function motionAudit(total, budget = 2, step = 0.1) {
  const worst = { t: 0, n: 0, live: [] };
  const overs = [];
  for (let t = 0; t <= total + 1e-9; t += step) {
    const live = REGISTRY.filter(c => t >= c.at && t < c.at + c.dur);
    if (live.length > worst.n) { worst.t = +t.toFixed(2); worst.n = live.length; worst.live = live.map(c => c.label); }
    if (live.length > budget) overs.push(+t.toFixed(2));
  }
  const stillness = (() => {
    let still = 0, n = 0;
    for (let t = 0; t <= total + 1e-9; t += step) {
      n++;
      if (!REGISTRY.some(c => t >= c.at && t < c.at + c.dur)) still++;
    }
    return n ? still / n : 0;
  })();
  return {
    cues: REGISTRY.length,
    budget,
    peakSimultaneous: worst.n,
    peakAt: worst.t,
    peakCues: worst.live,
    framesOverBudget: overs.length,
    stillnessRatio: +stillness.toFixed(3),
    pass: overs.length === 0 && stillness >= 0.12,
  };
}

export function resetAudit() { REGISTRY.length = 0; }
