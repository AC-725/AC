# @itsac.ai Rebuild — Implementation Plan (Infrastructure)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the durable infrastructure for the `@itsac.ai` rebrand — a version-controlled brand protocol skill, a working font pipeline, retyped reel templates, and a screenshot frame template.

**Architecture:** Everything is vendored into this repo's `.claude/` directory so it is committed, reviewable, and survives a fresh container — the same pattern used to install `caveman` and `superpowers`. The brand protocol becomes a project skill (`itsac-instagram`) that supersedes the user-level `ac-instagram` skill. Reel templates are retyped in place after fonts are made actually available to the renderer.

**Tech Stack:** Markdown skills, HTML/CSS templates, Playwright + headless Chromium (already installed at `/opt/pw-browsers`), Node 22, fontconfig.

**Source spec:** `docs/superpowers/specs/2026-07-25-itsac-ai-rebuild-design.md`

## Global Constraints

Copied verbatim from the spec. Every task's requirements implicitly include this section.

- **Type pair:** `Space Grotesk` for headlines; `JetBrains Mono` for numbers, labels, and verdicts. Lora and Poppins are retired.
- **Base black:** `#0A0A0A`. Gold accent: `#E7C765` (signal), `#C9A23F` (deep), `#F4DF95` (light).
- **Verdict colors — verdicts only, never decoration:** muted green = works, muted red = failed. Gold remains the only *attention* color.
- **Positioning:** "I test AI tools so you don't waste build time."
- **Reputation to own:** "he actually tried it."
- **Post formula:** Hook (claim + number) → Receipt (evidence, immediately) → What broke → Verdict → CTA.
- **CTA ladder:** Save → Follow → Comment. No offer rung.
- **Voice rules:** no "explain like they're 12"; peer not guide; show the receipt; post the failures.
- **Retired:** the name "AI in Plain English", the handle `@ac.wins`, and Lora/Poppins.

## Scope

**This plan covers infrastructure only.** The spec's fourth deliverable — writing the first 9 posts — is deliberately excluded and belongs in a separate plan. It is blocked on human input: a bakeoff, teardown, or failure post requires Austin to have actually tested specific tools, and that content cannot be planned or written without knowing what he tested. Attempting it here would produce fabricated receipts, which directly violates the brand's core rule.

## Pre-existing bug this plan fixes

`ac-reel-creator`'s templates reference `'Lora'` and `'Poppins'` by family name with no `@font-face` rule and no webfont `<link>`. Neither font is installed on this machine — `fc-list` reports only DejaVu, Liberation, FreeSans, and CJK families. Chromium therefore silently substitutes a default sans on every render. Task 2 fixes the pipeline; without it, retyping the templates in Task 3 would change nothing visible.

## File Structure

**Create:**

| Path | Responsibility |
|---|---|
| `.claude/skills/itsac-instagram/SKILL.md` | Brand entry point: positioning, voice, task router |
| `.claude/skills/itsac-instagram/references/part-1-visual.md` | Visual system: palette, type, frame, verdict colors |
| `.claude/skills/itsac-instagram/references/part-2-content.md` | Content engine: pillars, weekly shape, post formula |
| `.claude/skills/itsac-instagram/references/part-3-launch.md` | Profile, highlights, grid reset, launch sequence |
| `.claude/assets/fonts/*.ttf` | Committed font binaries (4 files) |
| `.claude/scripts/install-fonts.sh` | Installs committed fonts into the user font dir |
| `.claude/assets/screenshot-frame.template.html` | Screenshot frame template |
| `tests/render/probe-font.html` | Font-resolution probe used by Task 2's test |
| `tests/render/check-fonts.js` | Asserts Chromium resolves the brand fonts |

**Modify:**

| Path | Change |
|---|---|
| `.claude/skills/ac-reel-creator/assets/tod.template.html` | Family-name swap (6 Lora, 11 Poppins) + verdict tokens |
| `.claude/skills/ac-reel-creator/assets/reel.template.html` | Family-name swap (5 Lora, 7 Poppins) |
| `.claude/skills/ac-reel-creator/assets/cover.template.html` | Family-name swap (3 Lora, 4 Poppins) |
| `.claude/skills/ac-reel-creator/references/brand.md` | Palette and type sections rewritten |

**Note on Task 1 ordering:** `ac-reel-creator` currently lives at `~/.claude/skills/ac-reel-creator` (user-level, outside git). Task 1 vendors it into `.claude/skills/` before any edits, so Tasks 3–4 modify committed files.

---

### Task 1: Vendor skills into the repo

Bring `ac-reel-creator` under version control and create the new `itsac-instagram` protocol skill. Nothing else in this plan is durable until this lands.

**Files:**
- Create: `.claude/skills/itsac-instagram/SKILL.md`
- Create: `.claude/skills/itsac-instagram/references/part-1-visual.md`
- Create: `.claude/skills/itsac-instagram/references/part-2-content.md`
- Create: `.claude/skills/itsac-instagram/references/part-3-launch.md`
- Copy: `~/.claude/skills/ac-reel-creator/` → `.claude/skills/ac-reel-creator/`

**Interfaces:**
- Produces: skill directory `itsac-instagram` with frontmatter field `name: itsac-instagram`; vendored path `.claude/skills/ac-reel-creator/assets/*.template.html` consumed by Tasks 3–4.

- [ ] **Step 1: Copy ac-reel-creator into the repo**

```bash
cd /home/user/AC
mkdir -p .claude/skills
cp -R ~/.claude/skills/ac-reel-creator .claude/skills/ac-reel-creator
find .claude/skills/ac-reel-creator -type f | wc -l   # expect 15
```

- [ ] **Step 2: Write the protocol entry point**

Create `.claude/skills/itsac-instagram/SKILL.md`:

```markdown
---
name: itsac-instagram
description: >
  Austin's Instagram brand protocol for @itsac.ai — an account for builders and
  indie hackers built on tested AI tools and receipts. Use when writing posts,
  captions, or reels for @itsac.ai, checking a graphic against the brand, planning
  the weekly content calendar, or editing the profile. Supersedes the retired
  @ac.wins "AI in Plain English" protocol.
---

# @itsac.ai — Instagram Brand Protocol

## The brand in one breath

- **Handle:** `@itsac.ai`
- **Person:** Austin (AC)
- **Audience:** builders and indie hackers — people shipping with AI tools
- **Positioning:** *"I test AI tools so you don't waste build time."*
- **Reputation to own:** "he actually tried it" — not "he heard about it"
- **Goal right now:** audience first. No offer, no funnel, no selling in feed.

## The problem this page solves

Builders are drowning. Dozens of AI tools launch weekly, each claiming to change
everything, and nobody has time to test them. The valuable person is whoever
separates signal from noise with evidence.

## Voice

**Carried over from the old brand — these are assets:**

- Anti-hype. This works harder with builders, who are allergic to it.
- One real number per post. Builders respect receipts.
- Short lines, zero filler.
- Never salesy in feed.

**Changed for this audience:**

- **No "explain like they're 12."** Builders want depth. Use RAG, MCP, context
  window, eval without a glossary. Kill jargon when decorative; keep it when precise.
- **Peer, not guide.** The old voice coached beginners. This one is
  builder-to-builder: "tried it, here's what broke." No mentoring.
- **Show the receipt.** A screenshot, benchmark, or token count, or it didn't
  happen. No claim without evidence.
- **Post the failures.** "This tool didn't work" is the highest-trust content in
  AI and almost nobody posts it.

**The shift, same story:**

- Old: "AI agents can now handle customer service. Here's what that means for your business."
- New: "Ran 200 support tickets through 3 agent frameworks. Two hallucinated refund policy. Screenshots + the eval harness below."

## Post formula

**Hook (claim + number) → Receipt (evidence, immediately) → What broke → Verdict → CTA**

Evidence sits in position two. Builders bounce on unbacked claims; burying proof
in beat three is fatal with this audience.

## Non-negotiables

- Never claim a result you did not produce. No invented benchmarks, no fabricated
  screenshots. The entire brand rests on receipts being real.
- Gold is the only attention color. Green and red carry verdict information only.
- Never change the type pair: Space Grotesk headlines, JetBrains Mono numbers/labels.
- No selling in feed. CTA ladder stops at Comment.
- Post the failures, not just the wins.

## Task router

- "Write today's post / a post about X" → `references/part-2-content.md`
- "Does this graphic fit the brand?" → `references/part-1-visual.md`
- "What should I post this week?" → `references/part-2-content.md`
- "Fix my bio / highlights / relaunch the grid" → `references/part-3-launch.md`
- Reels (AI News, Tool of the Day) → the `ac-reel-creator` skill, which follows this protocol
```

- [ ] **Step 3: Write the visual reference**

Create `.claude/skills/itsac-instagram/references/part-1-visual.md`:

```markdown
# Part 1 — Visual System

## Palette

| Hex | Name | Use |
|---|---|---|
| `#0A0A0A` | Base Black | background of every frame |
| `#16130E` | Warm Charcoal | gradient depth |
| `#E7C765` | Signal Gold | primary accent |
| `#C9A23F` | Deep Gold | gradient mid-tone |
| `#F4DF95` | Light Gold | gradient highlight |
| `#F4F0E7` | Warm White | headline text |
| `#B9B1A1` | Muted Stone | body text |
| `#4ADE80` | Verdict Green | "works" — verdicts only |
| `#F87171` | Verdict Red | "failed" — verdicts only |

Gold gradient: `linear-gradient(118deg,#F4DF95,#E7C765 46%,#C9A23F)`.

**Verdict colors are information, not emphasis.** They appear only on
pass/fail marks, verdict chips, and result rows. Never on headlines,
backgrounds, or decoration. Gold remains the only attention color.

## Type — two fonts, never more

- **Space Grotesk** — headlines and big numbers. Geometric, slightly technical.
  Weights 500–700.
- **JetBrains Mono** — kickers, labels, verdicts, any number being presented as
  data. Weights 400–700.

Monospace is the highest-leverage brand cue. It reads "technical" instantly
with no other signal. When in doubt about a label, set it in mono.

Lora and Poppins are retired. Do not reintroduce serif headlines — an elegant
serif signals "consultant/coach", which is the wrong cue for builders.

Fonts are committed at `.claude/assets/fonts/` and installed by
`.claude/scripts/install-fonts.sh`. Renders will silently fall back to a
default sans if that script has not been run in the current environment.

## Screenshot frame

Proof content is screenshot-heavy: terminal output, dashboards, benchmark
tables. Raw screenshots look pasted-in without a consistent frame.

The frame: 1px border `rgba(231,199,101,0.28)`, 12px radius, 2px gold hairline
along the top edge, on the base black canvas. Template lives at
`.claude/assets/screenshot-frame.template.html`.

## Layout rules

- Black canvas, one idea per card.
- One gold accent per frame. Gold means "look here."
- Screenshots are first-class content, not decoration — give them room.
- Footer watermark: the handle, centered, muted gold.
```

- [ ] **Step 4: Write the content reference**

Create `.claude/skills/itsac-instagram/references/part-2-content.md`:

```markdown
# Part 2 — Content Engine

Two layers, seven slots per week.

## Reach layer — 5 reels/week

Produced with the `ac-reel-creator` skill.

| Format | Angle |
|---|---|
| **AI News** (sub-12s) | "X shipped — here's what it changes for what you're building." Not a headline repeat. |
| **Tool of the Day** (31s) | "Tested it. Verdict + the one thing it can't do." Receipt-driven. |

Repeating headlines is the commodity trap: every AI account posts the same news
within an hour. The edge is the so-what for someone shipping code.

## Proof layer — 2 posts/week

Four pillars rotate; each lands roughly every two weeks.

1. **Teardown** — built X with AI. Stack, screenshots, what broke.
2. **Bakeoff** — N tools, same task, ranked with evidence. Highest-value format
   for this audience and the widest open lane.
3. **Failure** — tried it, didn't work, why. The trust engine.
4. **Stack** — the actual setup for Y. Real config, real costs.

## Weekly shape

| Day | Slot |
|---|---|
| Mon | Tool of the Day |
| Tue | AI News |
| Wed | Proof — teardown or bakeoff |
| Thu | Tool of the Day |
| Fri | AI News |
| Sat | Proof — stack or failure |
| Sun | Tool of the Day |

## Post formula

**Hook (claim + number) → Receipt (evidence, immediately) → What broke → Verdict → CTA**

## CTA ladder

**Save → Follow → Comment.** No offer rung while the account is audience-first.

Comment prompts perform best when they ask for the reader's counter-data
("what's your stack?") rather than an opinion.

## Hard rule

Never write a receipt Austin did not produce. If the evidence for a post does
not exist yet, the post does not get written — ask him to run the test first.
```

- [ ] **Step 5: Write the launch reference**

Create `.claude/skills/itsac-instagram/references/part-3-launch.md`:

```markdown
# Part 3 — Profile & Launch

## Profile

- **Name field** (Instagram indexes this for search): `AC · AI tools, tested`
- **Bio:**

  ```
  I test AI tools so you don't waste build time.
  Receipts, not hype. Failures posted too.
  New teardown every Wed.
  ```

- **Link:** `ac-wins.com` stays for now. It sells AI automation to businesses,
  which is the wrong audience — revisit at monetization.

## Highlights

`Start Here` · `Bakeoffs` · `Stacks` · `Failures`

Four, not six. Each maps to a proof pillar so they fill themselves as posts ship.

## Grid reset

**Archive, do not delete.** Archiving is reversible, keeps the data, and gives
the same visual result.

1. Archive old posts.
2. Update name, bio, avatar. If the account still reads `@ac.wins`, rename it
   here — Instagram allows it and the follower base carries over.
3. **Bank 9 pieces before promoting anything.**

Step 3 is the one people skip. New visitors judge the top nine, and early reach
is the scarcest resource.

## First 9 posts

- 1 bakeoff (strongest piece — widest open lane, best save-rate potential)
- 1 teardown
- 1 failure
- 4 Tool of the Day
- 2 AI News

Weighted toward proof so a first-time visitor reads "he actually tests things"
rather than "another AI news account."
```

- [ ] **Step 6: Verify the skill is well-formed**

```bash
cd /home/user/AC
head -3 .claude/skills/itsac-instagram/SKILL.md   # expect: ---\nname: itsac-instagram
ls .claude/skills/itsac-instagram/references/     # expect 3 files
```

Expected: frontmatter opens with `---` and `name: itsac-instagram`; three reference files present.

- [ ] **Step 7: Commit**

```bash
cd /home/user/AC
git add .claude/skills/itsac-instagram .claude/skills/ac-reel-creator
git commit -m "feat: add itsac-instagram brand protocol, vendor ac-reel-creator"
```

---

### Task 2: Fix the font pipeline

Make Space Grotesk and JetBrains Mono actually resolve in headless Chromium. Written test-first, because the failure mode is silent — a wrong font renders fine, just wrong.

**Files:**
- Create: `tests/render/probe-font.html`
- Create: `tests/render/check-fonts.js`
- Create: `.claude/scripts/install-fonts.sh`
- Create: `.claude/assets/fonts/` (4 `.ttf` files)

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: font families `Space Grotesk` and `JetBrains Mono` resolvable by Chromium; script `.claude/scripts/install-fonts.sh` (idempotent, no arguments).

- [ ] **Step 1: Write the failing test**

Create `tests/render/probe-font.html`:

```html
<div id="grotesk" style="font-family:'Space Grotesk',sans-serif">probe</div>
<div id="mono" style="font-family:'JetBrains Mono',monospace">probe</div>
```

Create `tests/render/check-fonts.js`:

```javascript
/* Asserts Chromium actually resolves the brand fonts.
 * A missing font falls back silently, so compare rendered width against a
 * known-different generic family: identical widths mean no font loaded. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function findChrome() {
  const base = '/opt/pw-browsers';
  try {
    for (const d of fs.readdirSync(base)) {
      if (d.startsWith('chromium-')) {
        const p = path.join(base, d, 'chrome-linux', 'chrome');
        if (fs.existsSync(p)) return p;
      }
    }
  } catch (e) {}
  return undefined;
}

(async () => {
  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'probe-font.html'));
  await page.evaluate(async () => { await document.fonts.ready; });

  const results = await page.evaluate(() => {
    function widthOf(family) {
      const el = document.createElement('span');
      el.style.cssText = 'position:absolute;font-size:120px;white-space:nowrap';
      el.style.fontFamily = family;
      el.textContent = 'WjgpMi010';
      document.body.appendChild(el);
      const w = el.getBoundingClientRect().width;
      el.remove();
      return w;
    }
    return {
      grotesk: widthOf("'Space Grotesk'"),
      groteskFallback: widthOf('sans-serif'),
      mono: widthOf("'JetBrains Mono'"),
      monoFallback: widthOf('monospace'),
    };
  });

  await browser.close();

  const failures = [];
  if (results.grotesk === results.groteskFallback) failures.push('Space Grotesk did not load');
  if (results.mono === results.monoFallback) failures.push('JetBrains Mono did not load');

  if (failures.length) {
    console.error('FAIL: ' + failures.join('; '));
    console.error(JSON.stringify(results));
    process.exit(1);
  }
  console.log('PASS: both brand fonts resolved');
})();
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /home/user/AC && node tests/render/check-fonts.js
```

Expected: `FAIL: Space Grotesk did not load; JetBrains Mono did not load`, exit code 1. Neither font is installed yet.

- [ ] **Step 3: Download the font binaries**

```bash
cd /home/user/AC
mkdir -p .claude/assets/fonts
CSS=$(curl -sS --max-time 30 "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;700")
echo "$CSS" | grep -oE "https://fonts\.gstatic\.com/[^)]+\.(ttf|woff2)" | sort -u | while read -r url; do
  name=$(echo "$CSS" | grep -B6 "$url" | grep -oE "font-family: '[^']+'" | tail -1 | sed "s/font-family: '//;s/'//;s/ //g")
  weight=$(echo "$CSS" | grep -B4 "$url" | grep -oE "font-weight: [0-9]+" | tail -1 | grep -oE "[0-9]+")
  curl -sS --max-time 30 -o ".claude/assets/fonts/${name}-${weight}.ttf" "$url"
done
ls -la .claude/assets/fonts/
```

Expected: 4 `.ttf` files, roughly 100–200 KB each.

- [ ] **Step 4: Write the install script**

Create `.claude/scripts/install-fonts.sh`:

```bash
#!/usr/bin/env bash
# Install the committed brand fonts into the user font directory.
# Idempotent — safe to re-run. Run once per environment before rendering.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SRC="${REPO_ROOT}/.claude/assets/fonts"
DEST="${HOME}/.local/share/fonts"

if [ ! -d "$SRC" ]; then
  echo "install-fonts: no font directory at $SRC" >&2
  exit 1
fi

mkdir -p "$DEST"
cp -f "$SRC"/*.ttf "$DEST"/
fc-cache -f "$DEST" >/dev/null 2>&1 || true

echo "install-fonts: installed $(ls -1 "$SRC"/*.ttf | wc -l) fonts into $DEST"
fc-list : family | tr ',' '\n' | grep -iE "space grotesk|jetbrains mono" | sort -u
```

Then:

```bash
chmod +x .claude/scripts/install-fonts.sh
```

- [ ] **Step 5: Run the installer**

```bash
cd /home/user/AC && ./.claude/scripts/install-fonts.sh
```

Expected: reports 4 fonts installed and lists `JetBrains Mono` and `Space Grotesk`.

- [ ] **Step 6: Run the test to verify it passes**

```bash
cd /home/user/AC && node tests/render/check-fonts.js
```

Expected: `PASS: both brand fonts resolved`, exit code 0.

- [ ] **Step 7: Commit**

```bash
cd /home/user/AC
git add .claude/assets/fonts .claude/scripts/install-fonts.sh tests/render
git commit -m "feat: add brand font pipeline with resolution test"
```

---

### Task 3: Retype the reel templates

Swap the retired families for the new pair across all three templates.

**Files:**
- Modify: `.claude/skills/ac-reel-creator/assets/tod.template.html`
- Modify: `.claude/skills/ac-reel-creator/assets/reel.template.html`
- Modify: `.claude/skills/ac-reel-creator/assets/cover.template.html`

**Interfaces:**
- Consumes: font families installed by Task 2; vendored template paths from Task 1.
- Produces: templates containing zero `'Lora'` / `'Poppins'` references.

Mapping: `'Lora'` → `'Space Grotesk'` (headlines, big numbers), `'Poppins'` → `'JetBrains Mono'` (kickers, labels, body).

- [ ] **Step 1: Write the failing check**

```bash
cd /home/user/AC
grep -c "'Lora'\|'Poppins'" .claude/skills/ac-reel-creator/assets/*.template.html
```

Expected before the change: `cover=7`, `reel=12`, `tod=17` (non-zero counts are the failure).

- [ ] **Step 2: Apply the swap**

```bash
cd /home/user/AC/.claude/skills/ac-reel-creator/assets
sed -i "s/'Lora'/'Space Grotesk'/g; s/'Poppins'/'JetBrains Mono'/g" \
  tod.template.html reel.template.html cover.template.html
```

- [ ] **Step 3: Fix the one italic that does not survive the swap**

`tod.template.html` sets `font-style:italic` on `.step .stx .q`, which was a Lora italic. JetBrains Mono has no true italic and Space Grotesk's is synthesized; replace the italic cue with a gold-light color cue already in the palette.

```bash
cd /home/user/AC/.claude/skills/ac-reel-creator/assets
sed -i "s/font-family:'Space Grotesk';font-style:italic;color:var(--gold-light);/font-family:'Space Grotesk';font-weight:500;color:var(--gold-light);/" tod.template.html
grep -n "gold-light" tod.template.html
```

Expected: the `.q` rule shows `font-weight:500`, no `font-style:italic`.

- [ ] **Step 4: Verify the swap is complete**

```bash
cd /home/user/AC
grep -c "'Lora'\|'Poppins'" .claude/skills/ac-reel-creator/assets/*.template.html || echo "clean"
grep -c "'Space Grotesk'\|'JetBrains Mono'" .claude/skills/ac-reel-creator/assets/*.template.html
```

Expected: zero old-family matches; new-family counts match the old totals (7 / 12 / 17).

- [ ] **Step 5: Render a real frame to confirm nothing broke**

```bash
cd /home/user/AC/.claude/skills/ac-reel-creator/assets
node render_frames.js tod.template.html qa "1,8,16,24"
ls -la qa/
```

Expected: `TOTAL` prints a duration and four JPEGs are written. Open one and confirm headlines are geometric sans and labels are monospace.

- [ ] **Step 6: Commit**

```bash
cd /home/user/AC
git add .claude/skills/ac-reel-creator/assets
git commit -m "feat: retype reel templates to Space Grotesk and JetBrains Mono"
```

---

### Task 4: Add verdict color tokens

Give the templates a pass/fail signal, per the spec's approved guardrail change.

**Files:**
- Modify: `.claude/skills/ac-reel-creator/assets/tod.template.html:16-17`
- Modify: `.claude/skills/ac-reel-creator/assets/reel.template.html:18-19`
- Modify: `.claude/skills/ac-reel-creator/references/brand.md`

**Interfaces:**
- Consumes: templates from Task 3.
- Produces: CSS custom properties `--verdict-pass: #4ADE80` and `--verdict-fail: #F87171`, plus classes `.verdict.pass` and `.verdict.fail`.

- [ ] **Step 1: Write the failing check**

```bash
cd /home/user/AC
grep -c "verdict-pass" .claude/skills/ac-reel-creator/assets/tod.template.html || echo "0 — expected, not added yet"
```

Expected: `0`.

- [ ] **Step 2: Add the tokens to both reel templates**

In `tod.template.html`, find line 17:

```css
    --white:#F4F0E7; --stone:#B9B1A1; --grey:#6f6a60;
```

Replace with:

```css
    --white:#F4F0E7; --stone:#B9B1A1; --grey:#6f6a60;
    --verdict-pass:#4ADE80; --verdict-fail:#F87171;
```

Apply the identical change to `reel.template.html` at its matching `--white:` line (line 19).

- [ ] **Step 3: Add the verdict chip class**

Append to the `<style>` block of both `tod.template.html` and `reel.template.html`:

```css
  .verdict{font-family:'JetBrains Mono';font-weight:700;font-size:34px;
    letter-spacing:2px;text-transform:uppercase;padding:10px 22px;border-radius:8px;}
  .verdict.pass{color:var(--verdict-pass);border:2px solid var(--verdict-pass);}
  .verdict.fail{color:var(--verdict-fail);border:2px solid var(--verdict-fail);}
```

- [ ] **Step 4: Verify**

```bash
cd /home/user/AC
grep -c "verdict-pass\|verdict-fail" .claude/skills/ac-reel-creator/assets/tod.template.html
grep -c "verdict-pass\|verdict-fail" .claude/skills/ac-reel-creator/assets/reel.template.html
```

Expected: `3` in each (one token definition line plus two class rules).

- [ ] **Step 5: Update the brand reference**

In `.claude/skills/ac-reel-creator/references/brand.md`, replace the "Type — two fonts, never more" section (lines 30–33) with:

```markdown
## Type — two fonts, never more
- **Space Grotesk** — headlines & big numbers. Geometric, slightly technical.
  Weights 500–700.
- **JetBrains Mono** — kickers, labels, verdicts & body. Weights 400–700.
```

Then append to the palette table (after the Muted Stone row):

```markdown
| `#4ADE80` | Verdict Green | "works" — verdicts only, never decoration |
| `#F87171` | Verdict Red | "failed" — verdicts only, never decoration |
```

And replace the line beginning "One gold accent per scene" with:

```markdown
- One gold accent per scene. Gold means "look here." Verdict green/red carry
  information only and never act as accents. The retouch FX are texture, not accents.
```

- [ ] **Step 6: Commit**

```bash
cd /home/user/AC
git add .claude/skills/ac-reel-creator
git commit -m "feat: add verdict color tokens to reel templates and brand reference"
```

---

### Task 5: Build the screenshot frame template

The proof layer's missing piece: a consistent frame so raw screenshots look intentional.

**Files:**
- Create: `.claude/assets/screenshot-frame.template.html`
- Create: `tests/render/check-frame.js`

**Interfaces:**
- Consumes: fonts from Task 2.
- Produces: a 1080×1350 template reading `window.__FRAME = { image, caption, verdict }` where `verdict` is `'pass' | 'fail' | null`.

- [ ] **Step 1: Write the failing test**

Create `tests/render/check-frame.js`:

```javascript
/* Renders the screenshot frame template and asserts its structure. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function findChrome() {
  const base = '/opt/pw-browsers';
  try {
    for (const d of fs.readdirSync(base)) {
      if (d.startsWith('chromium-')) {
        const p = path.join(base, d, 'chrome-linux', 'chrome');
        if (fs.existsSync(p)) return p;
      }
    }
  } catch (e) {}
  return undefined;
}

(async () => {
  const tpl = path.resolve(__dirname, '../../.claude/assets/screenshot-frame.template.html');
  if (!fs.existsSync(tpl)) {
    console.error('FAIL: template missing at ' + tpl);
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto('file://' + tpl);
  await page.evaluate(async () => { await document.fonts.ready; });

  const out = await page.evaluate(() => {
    const frame = document.querySelector('.frame');
    const cap = document.querySelector('.caption');
    const verdict = document.querySelector('.verdict');
    return {
      hasFrame: !!frame,
      hasCaption: !!cap,
      verdictVisible: verdict ? getComputedStyle(verdict).display !== 'none' : false,
      captionFont: cap ? getComputedStyle(cap).fontFamily : '',
      bg: getComputedStyle(document.body).backgroundColor,
    };
  });

  await browser.close();

  const failures = [];
  if (!out.hasFrame) failures.push('missing .frame');
  if (!out.hasCaption) failures.push('missing .caption');
  if (!/JetBrains Mono/.test(out.captionFont)) failures.push('caption not mono: ' + out.captionFont);
  if (out.bg !== 'rgb(10, 10, 10)') failures.push('background not #0A0A0A: ' + out.bg);

  if (failures.length) {
    console.error('FAIL: ' + failures.join('; '));
    process.exit(1);
  }
  console.log('PASS: frame template well-formed');
})();
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /home/user/AC && node tests/render/check-frame.js
```

Expected: `FAIL: template missing at ...`, exit code 1.

- [ ] **Step 3: Write the template**

Create `.claude/assets/screenshot-frame.template.html`:

```html
<meta charset="utf-8">
<style>
  :root{
    --black:#0A0A0A; --gold:#E7C765; --gold-deep:#C9A23F;
    --white:#F4F0E7; --stone:#B9B1A1;
    --verdict-pass:#4ADE80; --verdict-fail:#F87171;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  body{width:1080px;height:1350px;background:var(--black);
    display:flex;flex-direction:column;justify-content:center;
    gap:36px;padding:72px;}
  .kicker{font-family:'JetBrains Mono';font-weight:700;font-size:26px;
    letter-spacing:6px;text-transform:uppercase;color:var(--gold);}
  .frame{position:relative;border:1px solid rgba(231,199,101,0.28);
    border-radius:12px;overflow:hidden;background:#0E0E0E;}
  .frame::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
    background:linear-gradient(90deg,#F4DF95,#C9A23F);}
  .frame img{display:block;width:100%;height:auto;}
  .caption{font-family:'JetBrains Mono';font-weight:400;font-size:30px;
    line-height:1.45;color:var(--stone);}
  .verdict{align-self:flex-start;font-family:'JetBrains Mono';font-weight:700;
    font-size:34px;letter-spacing:2px;text-transform:uppercase;
    padding:10px 22px;border-radius:8px;}
  .verdict.pass{color:var(--verdict-pass);border:2px solid var(--verdict-pass);}
  .verdict.fail{color:var(--verdict-fail);border:2px solid var(--verdict-fail);}
  .verdict.hidden{display:none;}
  .handle{font-family:'JetBrains Mono';font-weight:500;font-size:26px;
    letter-spacing:3px;color:rgba(231,199,101,0.55);text-align:center;}
</style>

<div class="kicker" id="kicker">RECEIPT</div>
<div class="frame"><img id="shot" alt=""></div>
<div class="verdict hidden" id="verdict">PASS</div>
<div class="caption" id="caption">Caption goes here.</div>
<div class="handle">@itsac.ai</div>

<script>
  window.__FRAME = window.__FRAME || {
    image: '',
    caption: 'Ran the same prompt through 3 tools. Only one kept the schema.',
    verdict: null,
    kicker: 'RECEIPT'
  };
  (function render(){
    var f = window.__FRAME;
    document.getElementById('kicker').textContent = f.kicker || 'RECEIPT';
    document.getElementById('caption').textContent = f.caption || '';
    var img = document.getElementById('shot');
    if (f.image) { img.src = f.image; } else { img.style.height = '620px'; }
    var v = document.getElementById('verdict');
    if (f.verdict === 'pass' || f.verdict === 'fail') {
      v.classList.remove('hidden');
      v.classList.add(f.verdict);
      v.textContent = f.verdict === 'pass' ? 'WORKS' : 'FAILED';
    }
  })();
</script>
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd /home/user/AC && node tests/render/check-frame.js
```

Expected: `PASS: frame template well-formed`, exit code 0.

- [ ] **Step 5: Render a visual sample for review**

```bash
cd /home/user/AC
node -e "
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
function findChrome(){const b='/opt/pw-browsers';for(const d of fs.readdirSync(b)){if(d.startsWith('chromium-')){const p=path.join(b,d,'chrome-linux','chrome');if(fs.existsSync(p))return p;}}}
(async()=>{const br=await chromium.launch({executablePath:findChrome()});
const pg=await br.newPage({viewport:{width:1080,height:1350}});
await pg.goto('file://'+path.resolve('.claude/assets/screenshot-frame.template.html'));
await pg.evaluate(async()=>{await document.fonts.ready;});
await pg.screenshot({path:'frame-sample.png'});await br.close();console.log('wrote frame-sample.png');})();
"
```

Expected: `frame-sample.png` written. Review it before committing.

- [ ] **Step 6: Commit**

```bash
cd /home/user/AC
rm -f frame-sample.png
git add .claude/assets/screenshot-frame.template.html tests/render/check-frame.js
git commit -m "feat: add screenshot frame template for proof-layer posts"
```

---

### Task 6: Retire the old protocol and document the setup

Point the repo at the new protocol and record the one-time environment step.

**Files:**
- Modify: `README.md`
- Create: `docs/superpowers/plans/2026-07-25-itsac-ai-rebuild-STATUS.md`

**Interfaces:**
- Consumes: everything from Tasks 1–5.

- [ ] **Step 1: Add a brand section to the README**

Append to `README.md`:

```markdown
## @itsac.ai brand system

The Instagram brand protocol for `@itsac.ai` lives in
`.claude/skills/itsac-instagram/`. It supersedes the retired `@ac.wins`
"AI in Plain English" protocol.

Design spec: `docs/superpowers/specs/2026-07-25-itsac-ai-rebuild-design.md`

**One-time setup per environment** — the reel and frame templates need the
brand fonts installed, or Chromium silently falls back to a default sans:

```bash
./.claude/scripts/install-fonts.sh
node tests/render/check-fonts.js   # expect: PASS
```
```

- [ ] **Step 2: Write the status note**

Create `docs/superpowers/plans/2026-07-25-itsac-ai-rebuild-STATUS.md`:

```markdown
# @itsac.ai Rebuild — Status

**Infrastructure plan:** `2026-07-25-itsac-ai-rebuild.md`

## Done

- `itsac-instagram` brand protocol skill (vendored, version controlled)
- `ac-reel-creator` vendored into the repo
- Font pipeline: Space Grotesk + JetBrains Mono, with a resolution test
- Reel templates retyped; verdict color tokens added
- Screenshot frame template

## Not started — needs Austin

Writing the first 9 posts is blocked on real testing. A bakeoff, teardown, or
failure post requires tools he has actually run; inventing results would break
the brand's core rule.

**To unblock:** pick the bakeoff subject (3–4 tools doing one task), run them,
and keep the screenshots and numbers. That becomes the strongest launch post.

## Deferred by decision

Monetization, offers, and the link-in-bio replacement. The account is
audience-first; revisit once the audience exists. Note the standing tension:
the page targets builders while `ac-wins.com` sells to businesses.
```

- [ ] **Step 3: Verify the full pipeline from clean**

```bash
cd /home/user/AC
./.claude/scripts/install-fonts.sh
node tests/render/check-fonts.js
node tests/render/check-frame.js
```

Expected: installer reports 4 fonts; both tests print `PASS`.

- [ ] **Step 4: Commit and push**

```bash
cd /home/user/AC
git add README.md docs/
git commit -m "docs: document itsac.ai brand system and setup"
git push -u origin claude/cave-man-install-6erl5m
```

---

## Self-Review

**Spec coverage:**

| Spec section | Task |
|---|---|
| §3 Positioning and voice | Task 1 (SKILL.md) |
| §4 Visual system — type | Tasks 2, 3 |
| §4 Visual system — verdict colors | Task 4 |
| §4 Screenshot frame | Task 5 |
| §5 Content engine | Task 1 (part-2-content.md) |
| §6 Profile and launch | Task 1 (part-3-launch.md) |
| §8 Vendoring constraint | Task 1 (steps 1, 7) |
| §8 First 9 posts | **Out of scope** — see Scope section and Task 6 status note |

**Placeholder scan:** no TBD/TODO. Every code step carries real content. Sample counts (7/12/17) were measured, not estimated.

**Type consistency:** `--verdict-pass` / `--verdict-fail` and `.verdict.pass` / `.verdict.fail` are defined in Task 4 and reused identically in Task 5. `window.__FRAME` keys (`image`, `caption`, `verdict`, `kicker`) match between the template and its test. `findChrome()` is duplicated verbatim in both test files rather than shared, since each must run standalone.
