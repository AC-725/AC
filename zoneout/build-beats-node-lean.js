// One item per beat: text to speak, Pexels query, the SUBJECT string the chosen
// clip's page slug must contain, EXCLUDE fragments that disqualify a clip, and an
// optional SFX cue ('hit' or 'soft').
//
// FORMAT RULES (standing, revised 24 Aug 2026):
//   - ONE cut. Render 22-26s, which YouTube reports as 25-28s. Ceiling <=28s. The
//     two best videos in the catalog are both 22s (camel 1,962, strawberries 1,675).
//   - THE CLAIM LANDS IN THE FIRST TWO SECONDS.
//   - BEAT 1 MUST BE <=7 WORDS AND A BELIEF THE VIEWER ALREADY HOLDS. This is the
//     retention lever. 'Bulls hate the colour red' (5w, universal) held 5.77s, 2nd
//     best ever. 'Someone designed the King of Hearts with a sword behind his head'
//     (12w, niche) held 1.45s, 2nd WORST - despite a record debut.
//   - MANY SHORT COMPLETE SENTENCES. Never split a sentence across beats.
//   - Vary beat length hard. Three words beside sixteen kills the metronome.
//   - CONCRETE, TOUCHABLE SUBJECTS. Abstractions die: brain 236, chess 3rd-worst.
//   - Last beat loops back toward the opening image.
//
// *** DURATION: COUNT SYLLABLES, NOT WORDS. Recalibrated 24 Aug after seq 44
// shipped at 29.52s and FAILED the 22-28s gate. ***
//
//     total = syllables x 0.244 / speed + sum(pauses)
//
// The old per-word rule in this header ("~57-60 words") is what caused that miss.
// Per-word rate swings 25% between scripts - 0.3948 s/w on seq 43 (ball, TV, trick)
// against 0.4939 on seq 44, which says Brontosaurus twice and Apatosaurus three
// times. Per syllable it collapses to ~0.244 across all three renders (42: 0.244,
// 43: 0.240, 44: 0.248) and reproduced seq 44 to within 0.11s.
//   BUDGET ~95-100 syllables at speed 0.92 with ~2.6s pause to land mid-gate ~25s.
//   That is 50-55 ordinary words, but as few as 44 carrying Latin binomials,
//   chemical names or long place names.
//   COUNT THE LONG WORDS BEFORE WRITING BEAT 7, not after the render.
//   Initialisms are the mirror trap: a syllable counter reads 'FTC' as one because
//   it holds no vowels. Spoken it is three. Count them by mouth.
//
// PACKAGING - ship every short with an explicit `en` audio-language tag AND a full
// sourced description.
//
// TWO LANES:
//   A) 'sounds fake, is true' - beat 1 states the strange BEHAVIOUR, never the
//      finished fact. seq 2, 8, 9, 14, 15, 16, 17, 18, 22, 25.
//   B) 'everyone gets this wrong' - the correction format. seq 19+.
//        Beat 1   the belief, stated FLATLY as if agreeing. No hedging.
//        Beat 2   the turn. Five words maximum. Carries the SFX hit.
//        Beat 3-5 what is actually true.
//        Beat 6   WHERE THE WRONG VERSION CAME FROM. Protect this beat.
//        Beat 7   the ask. Soft SFX.
//
// ORIGIN-FORWARD BEAT 2 - the open experiment, seq 44 and 45. Beat 2 spends its
// words on WHO and WHEN instead of announcing the correction, moving provenance
// from beat 6 (where ~2/3 of viewers never arrive) to ~4s. Baseline to beat is
// 30.8% stayed-to-watch. HOLD EVERYTHING ELSE CONSTANT until it has a two-video
// read, or the read is void.
//
// BEAT 7: a PHYSICAL DO-IT-NOW ACTION on an object already near the viewer. The
// only share across 25 reels came from 'go look at your window'. 'Send this' has
// produced zero, every time.
//
// SFX: the hit file is ~1.0s so it fits inside even a three-word beat. Audio
// inside a scene is truncated at the scene boundary, so never cue a longer file.
//
// SUBJECT REPEAT RULE:
//   A subject may appear in more than one beat ONLY when the footage probe shows
//   enough distinct portrait clips, AND per-beat `x` exclusions force visually
//   different picks. Run workflow r3sBLmUBkpfos7fW first and read
//   strictAndPortrait: 0 = FAIL, 1 = THIN (one beat only), 2+ = SAFE.
//
//   *** READ THE SLUGS, NEVER JUST THE COUNT. *** The strict filter matches on
//   substring. Confirmed incidents:
//     10 Aug - 'moth' passed 'bagworm-moth-caterpillar'. A caterpillar.
//     12 Aug - 'factory' returned 4 SAFE, every one a MOTORCYCLE assembly line.
//     13 Aug - 'factory' did it AGAIN. 'factory' IS BANNED AS A QUERY.
//     13 Aug - 'museum' SAFE at 10, every clip Greek statuary in Istanbul.
//     13 Aug - 'stamp' SAFE at 2, one a batik-fabric workshop.
//     14 Aug - 'skull' SAFE at 5, all Halloween. 'microscope' SAFE at 11, all modern
//       labs in scrub suits. 'nose' SAFE at 2 but one was a KISS on the nose.
//     15 Aug - 'card' SAFE at 14 but one is a CREDIT card. 'print' SAFE at 5 but
//       mostly textile and screen printing.
//     16 Aug - 'sand' SAFE at 10 but mostly beaches, rocks, a wasp and a crab.
//     23 Aug - 'dinosaur' 4 SAFE but three were a TOY, a MINIATURE CARVING and a
//       MODEL IN A FOREST, and b6's own query returned the SAME clip b1 matched.
//     24 Aug - 'collar' SAFE at 2, one a PUPPY wearing a red collar.
//   A generic noun can pass the count and still be unusable.
//
//   REGISTER CAN DISQUALIFY A DEEP SUBJECT TOO. 15 Aug: 'casino' 9 and 'poker' 6,
//   both genuine and on-topic, both dropped - gambling b-roll pushes an ad-supported
//   short toward limited ads for no gain. 16 Aug: 'mirror' 10 and 'eyeglass' 3, both
//   genuine, both dropped - every clip is a person looking at themselves, and the
//   person pulls focus off the object.
//
// PEXELS FIRES PER-BEAT UNCONDITIONALLY. Even a beat carrying u: or v: needs a real
// probed q/s pair or the execution 400s before rendering. Build Movie is what
// ignores the result downstream; the query also serves as the 404 fallback.
//
// BEAT FIELDS BEYOND t/q/s/x:
//   u    archive image URL - Build Movie emits an image element for that beat.
//   v    pre-resolved clip URL (MiniMax, or a local Three.js render). Takes
//        priority over u. Precedence in picks(): v -> u -> Pexels query.
//   p    seconds of silence AFTER the line. THE pacing lever - vary it or the edit
//        reads as a metronome. Default 0.15 is flat; do not leave it there.
//   ov   text overlay. JSON2Video's DOCUMENTED minimal pattern ONLY: settings{}
//        with vertical-position and horizontal-position, and NO x/y/width/z-index.
//        Mixing the two positioning systems rendered three scenes BLACK in
//        execution 79. Every beat now carries a real image, so a text failure can
//        cost legibility but never the picture.
//   card a JSON2Video text composition. A card must show what the VOICE DOES NOT
//        SAY - captions already print the spoken line, so a card echoing it is
//        doubled on screen.
//
// --------------------------------------------------------------------------
// seqs 2-43 REMOVED FROM THIS NODE, 24 Aug 2026 (2-40 went 22 Aug, 41-43 today).
// `Get Next Ready Script` filters `seq > 43`, so nothing at or below 43 can ever
// be selected again. Nothing is lost: the complete pre-trim file with every
// historical beat array and every sourcing/incident comment is archived at
// zoneout/build-beats-archive-24aug.js in the AC repo, and n8n's own version
// history holds it too. Read either before assuming a past decision is gone.
//
// Every standing lesson those blocks taught has been lifted into the header above
// rather than left buried in a retired beat array. What stayed behind is
// per-video provenance - which Library of Congress plate, which Geograph photo,
// which MiniMax render - and that belongs in the project doc, not here.
//
// KEEP THIS NODE LEAN. Carrying documentation here made every edit a 32KB
// rewrite, and a rewrite that large is where silent transcription errors live -
// the kind `node --check` cannot catch, because a corrupted comment still parses.
// When 46 ships, retire 44.
// --------------------------------------------------------------------------
const BEATS = {
  /* seq 44 - THE PRIORITY RULE. Brontosaurus was not a mistake, it was a filing
   * rule: Marsh named Apatosaurus 1877 and Brontosaurus 1879, Riggs judged them
   * one animal in 1903, and the older name won. Full trap notes live on the row.
   *
   * First origin-forward beat 2. Probe exec 115. SHIPPED 29.52s - FAILED the
   * duration gate, which is what forced the syllable model in the header.
   * Kept here as the immediate precedent for seq 45; retire when 46 ships. */
  44: [
    { t: 'Brontosaurus never existed.',
      q: 'dinosaur toy figure', s: 'dinosaur',
      x: ['person-playing'], p: 0.25 },

    { t: 'One man. 1903.',
      q: 'old typewriter typing paper', s: 'typewriter',
      x: ['in-the-park', 'next-to-a-tree'], p: 0.85, sfx: 'hit' },

    { t: 'Elmer Riggs called it the same animal as Apatosaurus.',
      q: 'fossil bones rock excavation', s: 'fossil', x: [], p: 0.2 },

    { t: 'Apatosaurus was named two years earlier. Older name wins.',
      q: 'antique book open pages', s: 'book',
      x: ['typewriter', 'cover-of-the-book'], p: 0.15 },

    { t: 'It was never fake. It lost on a filing rule.',
      q: 'stack of old papers documents', s: 'documents',
      x: ['clipboard'], p: 0.5 },

    { t: "New York's museum kept the old sign until 1995.",
      q: 'dinosaur skeleton fossil exhibit', s: 'dinosaur',
      x: ['toys', 'miniature', 'model-in-forest'], p: 0.2 },

    { t: 'A 2015 paper put it back. Go check your dinosaur book.',
      q: 'child reading book', s: 'reading',
      x: ['braille'], p: 0.7, sfx: 'soft' }
  ],

  /* seq 45 - CARE LABELS. Lane B, part 20. 'Dry clean' and 'Dry clean only' are
   * two different labels under the FTC Care Labeling Rule, 16 CFR 423.
   *
   * Origin-forward beat 2 HELD CONSTANT from seq 44 - seq 44's 48h read is not in
   * yet, so this week changes the topic and nothing else. The animated priority
   * timeline (anim/scenes/priority-1877.html) is built and proven but does NOT
   * debut here; it waits for a clean two-video read on origin-forward.
   *
   * 64 words / 88 syllables / 2.80s pause -> 26.14s modelled. Gate PASS.
   * 88 not 86: 'FTC' is three syllables spoken and one to a vowel counter.
   *
   * PROBE exec 121, 11 queries (7 beats + 4 alternates), fired from the MCP layer
   * rather than a human click. Beats 1, 3 and 7 all want a garment label and are
   * given THREE different subjects on purpose - seq 44 proved a shared subject
   * hands the same single clip to two beats and trips repeatedClips.
   *   THIN pools, one clip each: label, document, silk. Safe ONLY because no
   *     other beat shares those subjects.
   *   FAIL 0, not used: 'dry cleaner clothes hanging plastic', 'folded laundry
   *     stack clothes'. The two most obvious queries for this topic both returned
   *     nothing - which is why the probe runs before the script, not after.
   *   'collar' passed at 2 and one is a PUPPY wearing a red collar. Excluded by
   *     slug. This is the count-versus-slug rule catching a defect again.
   *
   * TRAP, and it inverts the whole video: NEVER tell a viewer to wash a garment
   * labelled 'Dryclean only'. That was the original angle and it is FALSE - the
   * Rule requires a reasonable basis for BOTH the drycleaning instruction AND the
   * warning against washing. The correction runs soft -> strong: plain 'Dryclean'
   * is one permitted method (the Rule compels exactly one, and it "need not be the
   * only, or even the best, method"), 'only' is the stronger claim. Also: no year
   * anywhere. The Rule's dates were not confirmed to a primary source. */
  45: [
    { t: 'Your label says dry clean.',
      q: 'clothing care label closeup', s: 'label', x: [], p: 0.25 },

    { t: 'The FTC decides that wording.',
      q: 'official document stamp paper', s: 'document',
      x: [], p: 0.85, sfx: 'hit' },

    { t: 'Dry clean and dry clean only are two different labels.',
      q: 'shirt collar tag closeup', s: 'collar',
      x: ['puppy', 'red-collar', 'dog'], p: 0.2 },

    { t: 'The rule only makes them name one safe method.',
      q: 'person reading paperwork closely', s: 'reading',
      x: ['frustrated', 'businessman'], p: 0.15 },

    { t: 'So dry clean may simply be the method they chose to print.',
      q: 'silk fabric flowing closeup', s: 'silk', x: [], p: 0.5 },

    { t: 'Only is the word that means they proved washing destroys it.',
      q: 'washing machine drum spinning', s: 'washing',
      x: ['posing'], p: 0.2 },

    { t: 'Go read the label inside your collar. Look for the word only.',
      q: 'hand holding shirt closeup', s: 'shirt',
      x: ['steamer'], p: 0.65, sfx: 'soft' }
  ]
};

const STOP = new Set(['about','after','again','against','anyone','around','because','been','before','being','between','both','could','ever','every','found','from','have','into','just','more','most','much','only','other','over','same','some','such','than','that','their','them','then','there','these','they','this','those','through','until','were','what','when','where','which','while','with','would','years','your']);

function autoBeats(script) {
  const sentences = script.match(/[^.!?]+[.!?]+/g) || [script];
  const out = [];
  sentences.forEach(function (raw) {
    const t = raw.trim();
    const words = t.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/)
      .filter(function (w) { return w.length > 4 && !STOP.has(w); });
    out.push({ t: t, q: words.slice(0, 2).join(' ') || 'abstract dark', s: words[0] || '' });
  });
  return out;
}

const row = $input.first().json;
const beats = BEATS[row.seq] || autoBeats(row.script);
const words = beats.map(function (b) { return b.t; }).join(' ').split(/\s+/).length;

return beats.map(function (b, i) {
  return { json: { idx: i, text: b.t, query: b.q, subject: b.s || '',
    exclude: b.x || [], sfx: b.sfx || '', seq: row.seq, totalWords: words,
    img: b.u || '', vid: b.v || '', card: b.card || '', cta: b.cta || '',
    ov: b.ov || '', ovsize: b.ovsize || 96, ovcolor: b.ovcolor || 'gold',
    pause: (b.p === undefined || b.p === null) ? 0.15 : b.p } };
});
