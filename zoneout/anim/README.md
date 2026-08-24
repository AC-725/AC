# ZoneOut · Three.js animated beats

A third picture path for the evidence-on-screen format, alongside archive images and
Pexels clips. Renders locally to MP4 for **zero API credits**.

    ./build.sh scenes/priority-1877.html out/priority-1877.mp4 30
    node render.js scenes/priority-1877.html qa "0.5,1.5,2.9,4.1"   # QA stills only

## Why this exists

| Path | Cost per 4s beat | Wall clock | Deterministic |
|---|---|---|---|
| JSON2Video pan/zoom on a still | ~4 credits | seconds | yes |
| MiniMax H3 image-to-video | **$0.52** at 2K | ~3.5 min inference | no |
| **Three.js, this pipeline** | **$0** | **~21s** | **yes** |

Measured: 126 frames at 1080x1920 in 20.9s — **5.0x realtime** on the software
rasteriser. Re-rendering after a tweak is cheap, which MiniMax never is.

The originality argument matters more than the cost one. Meta's test is *"if someone
could remove your contribution to your post or reel, and the content would virtually
be the same, it probably needs more of you in it."* A bespoke animation authored for
one specific argument is unambiguously a contribution — a stronger answer than an
archive scan with a pan on it, and far stronger than a stock clip.

**Use it for the mechanism the voice cannot state.** Not decoration. The rule from
`evidence-format.md` holds unchanged: a card must show what the voice does not say.
`scenes/priority-1877.html` animates the *filing rule* that retired Brontosaurus —
unshowable with any archive plate, because no such plate exists.

## Integration — no workflow changes needed

`Build Beats` already carries a `v` field (a pre-resolved clip URL, added 22 Aug for
MiniMax), and `Build Movie` checks `b.vid` before `b.img`. A locally-rendered MP4
uploaded to the Worker drops into that same slot.

Beat precedence in `picks()`: **`v` (clip) → `img` (archive) → Pexels query.**

⚠ `Pexels Search` still fires for every beat regardless, so an animated beat **still
needs a real footage-probed `q`/`s` pair** or the execution 400s before rendering.
Reuse a query already probed SAFE for another beat — same fix seq 42 used.

⚠ Deploy the whole asset set to the Worker, never a partial one. It replaces the set.

## Two things that will waste an hour if forgotten

**1. Vendor both Three.js files.** `three.module.min.js` imports `three.core.min.js`.
Ship only the first and the module fails with `ERR_FILE_NOT_FOUND`, `window.__READY`
never flips, and the page renders pure black — the exact failure signature as seq 41's
three dead scenes, from a completely different cause.

**2. ~~WebGL needs the ANGLE/SwiftShader flags.~~ FALSE - corrected 24 Aug 2026.**
This claim was wrong and is kept visible rather than deleted, because the reasoning error
is the useful part.

Measured: this Chromium build **already defaults to ANGLE/SwiftShader**. A probe with
`render_frames.js`'s exact args and none of the GL flags reports
`hasGL: true`, renderer `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)),
SwiftShader driver)`, and renders the ac-studio lab's torus at ~1,971 gold pixels against
~2,001 with the flags - a 30px antialiasing difference between runs, not a flag effect.

`render.js` still passes `--use-gl=angle --use-angle=swiftshader
--enable-unsafe-swiftshader`. They are harmless and pin the behaviour explicitly, so they
stay - but they are **not** what fixed anything, and ac-studio's `render_frames.js` renders
these scenes fine without them.

WHY THE MISTAKE HAPPENED, because it will happen again: the missing-core-file failure and
a genuine no-GL failure produce the **identical** symptom, a silent black frame. Both were
"fixed" in one step - vendoring `three.core.min.js` AND adding the flags - and the credit
went to the wrong change. Item 1 was the real cause, every time.
**Change one thing per test when two candidate causes share a symptom.**

The standing lesson survives intact: a silent black frame passes every gate, so a render
that looks structurally fine proves nothing about whether a picture is in it.

## Fonts

Brand faces are **Poppins** (covers) and **Oswald Bold** (captions). A fresh container
has neither, so beats fall back to Liberation Sans and `zoneout_cover.py` fails outright
on `ImageFont.truetype`.

    ../setup-fonts.sh
    python3 ../install-cover-icons.py   # extra cover icons, incl. `sauropod`

Google Fonts is blocked by the egress proxy, but the npm registry is not and
`@fontsource` ships the real files — the script fetches them and converts woff2 to TTF,
which PIL needs. **Run it once per container**, before rendering a cover or a beat.

## Writing a scene

Every scene exposes the same contract as the itsac.ai pipeline:

    window.__TOTAL = 4.2;        // duration in seconds
    window.seek = (t) => { ... } // pure function of t, then renderer.render()
    window.__READY = true;       // set last

`seek(t)` must be **a pure function of t** — no clock, no `requestAnimationFrame`, no
randomness. That is what makes a render reproducible and resumable, and it is why
`lib/zoneout.js` exports `span()`/`lerp()` instead of a delta-time helper.

`lib/zoneout.js` carries the palette, the light rig, the 1080x1920 stage, a
`textTexture()` helper that draws type to a canvas (font *loaders* are unusable here —
headless Chromium has no network), and `sauropod()`, the 3D twin of the `sauropod`
cover icon built from tubes so it reads as drawn rather than modelled.

⚠ **The frame is only ~3.5 units wide at z=0** (fov 38, aspect 9:16, camera z=9).
Anything wider is silently cropped with no error. `sauropod()` is ~6 units wide at
scale 1, so it needs ~0.42 and a band of its own — placed behind the plates it just
reads as loose gold tubing.

**Grey always means the wrong or old version; gold always means the correction.**
Same law as the covers. On `priority-1877` the viewer reads the argument before
reading a word.

## Gates

The `duration 22-28s` gate is on the **whole video**, not the beat. An animated beat
is one scene inside it and does not change the word budget — run the duration model
as normal.
