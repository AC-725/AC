# Subtitles — mandatory on every video

Every video ships with burned-in captions. Most of the feed watches sound-off, so the
typed caption is what carries the message when the audio doesn't play — and it reads as
part of the brand, not an afterthought. **Write the SUB fragments on the beat sheet with
the rest of the words (step 4), fill `SUBS` together with `CONTENT` (step 5)** — one QA
pass then covers caption ink, and `produce.sh` builds the subtitled and clean cuts
together (the clean cut strips `SUBS` automatically). What stays LAST is verification:
never ship without reading a fully-typed caption frame per theme.

The engine is already baked into both templates (`reel.template.html`, `tod.template.html`).
You never rebuild it — you fill the `SUBS` array and verify placement. It is driven by
`seek(t)`, so it renders deterministically frame-by-frame like everything else.

## What it looks like

A single centred line that **types itself out** letter-by-letter as each scene opens, with
a soft blinking caret, then fades with the scene. Gold on the dark themes; ink on the gold
(light) override. `Poppins` medium, ~31px reel / ~30px TOD. One caption per scene, in
scene order.

## Fill the `SUBS` array

Find `const SUBS=[ … ]` in the working copy and fill one entry per scene, **in order**:

- Reel = 5 entries (A hook · B shift · C proof · D rule · E CTA).
- TOD = 7 entries (A–G; see `tod-scenes.md` for what each scene shows).

Rules for the words:

- **One glanceable fragment per scene.** It has to be readable in the ~0.5–2s it holds.
  Shorten hard — this is a caption, not the VO transcript. Track the VO's *point*, not its
  every word.
- **No em-dashes on screen** (same law as all on-screen copy). Colons and periods are fine.
- **Keep figures intact** — `57%`, `$100M`. Never let a caption lowercase a number.
- **Leave `""` to skip a scene** — an empty string hides the line for that scene cleanly.
- Match the handle from the CTA scene exactly (`@itsac.ai`).

Example (Day 14 reel):

```js
const SUBS=[
  "Most web traffic is now bots. 57%.",   // A
  "Meta AI now acts, not just chats.",    // B
  "Ng bet $100M: AI won't take your job.",// C
  "The web flipped. You didn't.",         // D
  "Follow @itsac.ai. Daily AI, no hype."  // E
];
```

## Position — the clear zone per theme

The caption sits in the frame's empty zone. The templates default to the right spot for
most themes, but **one theme moves and you must eyeball all of them**:

| Engine | Default | Note |
|---|---|---|
| Reel · base / crest / margin | top-centre (`top:372px`) | clear void above the centred block; crest's band is higher up |
| Reel · **column** | lower black half (`bottom:210px`) | **KNOWN DEFECT, y≈1666 — outside the app-safe window.** Column's fold is pinned at 50%, so scene ink runs to ~y1232 and no clear band is left before y1300. Fixing it means recomposing column around the fixed fold. Gate 6 reports it on every run |
| TOD · all | `bottom:708px` (y1169..1212) | **changed 2026-08-06** from `bottom:150px`, which sat at y≈1770 — underneath Instagram's caption block on every TOD ever shipped. It now sits directly under the content, the one band the app never covers |
| Spine | `top:684px`, under the fold | set by the Day 23 safe-area rebuild; the line AC's own post proved reads perfectly |

**The rule behind all of these:** a caption is only doing its job if the APP leaves it visible.
The file passing gates 1-2 says nothing about that. `scripts/audit_safearea.js` (gate 6) is what
actually checks it, and it also catches the caption landing on scene copy or on the watermark —
which gate 2 cannot see, because those elements are siblings of the scenes rather than children
of one.

These are defaults, not guarantees. The moment on-screen copy changes, the clear zone can
move — so the audit (`qa_layout.sh` + the eyeball pass) is what confirms it. If a caption
lands on top of scene content or on a matching-colour ground, nudge `#subline` (`top` /
`bottom`) to that theme's actual empty space and re-check. Never ship a washed-out or
overlapping caption.

## The light (gold-ground) override

When a run also ships the light video look, the light override block must send the caption
to ink so it reads on gold — add these two lines alongside the rest of the flip:

```css
#subtxt{color:#12100A !important;}
#subcar{background:#12100A !important;}
```

(The dark templates already carry the gold version; only the light flip needs this.)

## Verify, then build both cuts

1. `SUBS` is already filled (step 5), so the step-5 `qa_layout.sh` pass checked the
   caption as real ink. If SUBS changed since, re-run it.
2. Render a couple of QA frames per theme at a fully-typed moment (≈ scene start + 2.3s)
   and read them: caption in the clear zone, legible colour, figures intact, caret present.
3. `produce.sh` builds **both cuts from the one working copy, in parallel**:
   - **Subtitled cut** (`…_subs.mp4`, `…_light_subs.mp4`) — the one to post.
   - **Clean cut** (`….mp4`) — SUBS stripped automatically at build time: for voice-over
     reposts and platforms whose own captions you'd rather use.

Ship both. The subtitled cut is the primary deliverable; the clean cut is the backup.

## Under the hood (don't rebuild — just know it)

`subTick(t)` picks the active scene, reveals `SUBS[i]` over ~2s starting 0.3s into the
scene (`(lt-0.3)/2.0`), blinks the caret while idle, and cross-fades the line with the
scene's own in/out. It shares the template's `clamp()` helper and is called inside
`seek(t)`. Timings ride on `SCENES`, so if you retime scenes (and the audio cues with
them), the captions follow automatically — nothing else to touch.
