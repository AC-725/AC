// One item per beat: text to speak, Pexels query, the SUBJECT string the chosen
// clip's page slug must contain, EXCLUDE fragments that disqualify a clip, and an
// optional SFX cue ('hit' or 'soft').
//
// FORMAT RULES (standing, revised 16 Aug 2026 off the daily board):
//   - ONE cut. Render 22-26s, which YouTube reports as 25-28s. Ceiling <=28s. The
//     two best videos in the catalog are both 22s (camel 1,962, strawberries 1,675).
//   - ~57-60 words. Calibrated on four renders: bread 60w/23.84s, smell 57w/24.96s,
//     Model T 65w/26.0s, cards 58w/21.96s. Word LENGTH moves it +-3s - short common
//     words run fast, multisyllabic numbers run slow.
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
// PACKAGING - the template is 4-for-4 and the debut floor is RISING (bread 1,854,
// Model T 1,145, smell 1,264, cards 1,378 @12h - fastest pace yet). Ship every short
// with an explicit `en` audio-language tag AND a full sourced description.
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
// BEAT 7 HISTORY. Human-interest line (to 11 Aug) -> send-request (12-14 Aug, ran on
// three videos, Instagram still on day 15 of zero saves and zero shares) -> explicit
// subscribe close (15 Aug, seq 36, still running) -> COMMENT QUESTION (16 Aug,
// seq 37). The channel has ZERO comments across 17,241 YouTube views and had never
// once asked a question in a video.
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
//   A generic noun can pass the count and still be unusable.
//
//   REGISTER CAN DISQUALIFY A DEEP SUBJECT TOO. 15 Aug: 'casino' 9 and 'poker' 6,
//   both genuine and on-topic, both dropped - gambling b-roll pushes an ad-supported
//   short toward limited ads for no gain. 16 Aug: 'mirror' 10 and 'eyeglass' 3, both
//   genuine, both dropped - every clip is a person looking at themselves, and the
//   person pulls focus off the object.
const BEATS = {
  // --------------------------------------------------------------------------
  // seqs 2-40 REMOVED FROM THIS NODE, 22 Aug 2026. They were 44KB of the 70KB
  // file - roughly two thirds - and none of them is reachable: `Get Next Ready
  // Script` filters `seq > 41`, so nothing below 41 can ever be selected again.
  //
  // Nothing is lost. The complete pre-trim file, with every historical beat
  // array and every sourcing/incident comment intact, is archived in the
  // project doc `zoneout-build-beats-archive-22aug.js`, and n8n's own version
  // history holds it too. Read either before assuming a past decision is gone.
  //
  // Why it was worth doing: those comments are DOCUMENTATION, and documentation
  // belongs in project docs, not inside a production Code node. Carrying them
  // here made every edit to this node a 70KB rewrite, and a rewrite that large
  // is where silent transcription errors live - the kind `node --check` cannot
  // catch, because a corrupted comment still parses.
  //
  // Keep this node lean. When 44 ships, consider retiring 41.
  // --------------------------------------------------------------------------
  // ==========================================================================
  // seq 41 - SAP ASCENT.  FIRST VIDEO IN THE EVIDENCE-ON-SCREEN FORMAT.
  //
  // Format rebuilt 19 Aug 2026 on AC's verdict that all four layers were dead:
  // decorative Pexels footage, the flat TTS read, the metronomic edit, and
  // "correct but unwanted" topics.  NEW BEAT FIELDS:
  //   u    archive image URL - Build Movie emits an image element and ignores
  //        q/s/x entirely for that beat.
  //   p    seconds of silence AFTER the line ('extra-time').  Replaces the flat
  //        0.15 that made every scene cut on the last syllable.  THE pacing
  //        lever - vary it or the edit reads as a metronome again.
  //   ov   a text OVERLAY on top of the image, using JSON2Video's DOCUMENTED
  //        minimal text pattern only - settings{} with vertical-position and
  //        horizontal-position, and NO x/y/width/z-index.  See the incident
  //        note below.
  //   card a JSON2Video text composition.  No asset hosting needed.  A card
  //        must show what the VOICE DOES NOT SAY - the captions already print
  //        the spoken line, so a card that echoes it is doubled on screen.
  //
  // *** PICTURE SLATE APPLIED, 20 Aug - AC's picks ***
  // Brief was "mixed, weighted to pictures": real imagery throughout, ONE
  // document at the evidence beat. Previous cut ran four dense text pages in a
  // row and read flat. Final mix is FIVE pictures and TWO documents.
  //   1 LoC fsa 8e01549  "Sequoia National Park, California. Group of Sequoia
  //     gigantea trees at Round Meadow", 1935-45. US Gov, portrait 826x1024.
  //   2 LoC Highsmith 11900  "Muir Woods, California" - old-growth coast
  //     redwood, 4x5 colour transparency. IIIF, master 3354x4350, so this is
  //     the ONLY asset needing no upscale. 1935 monochrome -> saturated colour
  //     is the hardest cut in the video and it lands on the turn.
  //   3 Dixon & Joly 1895, first page. No verified leaf-structure candidate
  //     was found - LoC has autumn-leaf prints but no composition description,
  //     and BHL 403s from the build sandbox. Gap stated, not padded.
  //   4 Dixon & Joly 1895, interior. Same gap: no verified xylem cross-section.
  //     Leads for whoever can see images: archive.org/details/bub_gb_BxsaAAAAYAAJ
  //     (Ettingshausen 1858, nature-printed leaf skeletons) for beat 3, and
  //     archive.org/details/anatomyofwoodypl00jeff (Jeffrey 1917, wood
  //     photomicrographs) for beat 4.
  //   5 LoC ppmsca 53299  "Mariposa Grove of big trees. 'Three graces'", c.1900.
  //     Catalogue SUMMARY confirms "with man standing next to it and a
  //     horse-drawn carriage driving nearby" - the only asset in the slate
  //     where human scale is verified by the archive rather than assumed, which
  //     is exactly what the ten-metres-versus-116 beat needs.
  //   6 USGS Water Science School evapotranspiration diagram. The actual
  //     graphic from the page the script is arguing with. US Gov, public
  //     domain. NOTE: the ?itok= is a Drupal image-style token and CAN be
  //     regenerated - if this 404s, drop the query string.
  //   7 LoC matpc 23263  "Giant redwood tree poised on mammoth boulder", 1957.
  //     Loops back to beat 1 for the go-check close.
  //
  // *** DESIGN CALL, 20 Aug - NO ON-SCREEN OVERLAYS ON THIS VIDEO ***
  // A preflight sheet of three treatments went to AC and he chose the clean
  // one: archive document plus the burned-in caption, nothing else. Two of the
  // three overlays had been echoing the voice anyway ("A PUMP 10.33 m" while
  // the caption printed "A PUMP QUITS AT"), which is doubled text and against
  // this file's own card rule. The floating box also sat directly above the
  // caption band, so every frame carried two competing text blocks.
  // SUBSCRIBE moves to the YouTube description and the pinned comment. The ov/
  // cta machinery stays in Build Movie - it is correct now and cheap to reuse -
  // but seq 41 carries no text elements at all, which also means zero exposure
  // to the text-element failure below.
  //
  // *** INCIDENT, execution 79 - THREE CARD SCENES RENDERED BLACK ***
  // 0:08-0:20 of the first render had no picture at all.  Those twelve seconds
  // were beats 4, 5 and 6 - every one of them a text-only 'card' scene.  The
  // four archive-image beats rendered correctly, so the images are fine and the
  // TEXT ELEMENTS were the failure.  The beat-7 subscribe CTA used the same
  // helper and also never appeared.
  //   CAUSE: the helper mixed two positioning systems and buried the text.  It
  //   set x/y/width AND settings.horizontal-position, and gave the elements
  //   z-index 5 - underneath the movie-level frame overlay at z-index 20.
  //   JSON2Video's docs show exactly ONE working text example and it uses
  //   settings{} alone: font-family, font-size, font-weight, color,
  //   background-color, text-align, vertical-position, horizontal-position.
  //   No x, no y, no width, no z-index.  Default style is "001", which the
  //   docs say carries "a unique animation" - another reason not to fight it.
  //   FIX, and it is structural, not cosmetic: EVERY BEAT NOW CARRIES A REAL
  //   IMAGE.  Text is only ever an overlay on top of one.  A text failure can
  //   now cost legibility; it can never cost the picture again.
  //   Replacement images were drawn from the two families that demonstrably
  //   rendered - archive.org/philtrans08428777 and ids.si.edu SIL-SIL28-200.
  //
  // CUT AGAINST THE 19 AUG BOARD.  Three changes forced by the numbers:
  //   1. LENGTH.  First draft was 69 words -> modelled 35.3s.  Board: "Stay
  //      22-28s. Both 30s+ cuts remain frozen at the bottom of both
  //      platforms" (coffee 33s: 9 IG / 1,735 YT; Carthage 30s: 38 / 613).
  //      Re-cut to 52 words -> 26.5s at speed 0.92 with 2.85s total pause.
  //   2. THE CLOSE IS NOW A PHYSICAL GO-CHECK, not an open question.  Board:
  //      "End with a physical do-it-now action. Glass's 'go look at your
  //      window' is still the only share ever." One share across 25 reels,
  //      and a go-check produced it.  Wedding's "send this" got 0.  Starlings
  //      asked nothing and got nothing.  Beat 7 sends them to the USGS page.
  //   3. SUBSCRIBE.  Seven debuts, ~7,600 debut views, zero subs, nine flat
  //      runs at 755.  Board calls it the cheapest untested lever.  It rides
  //      as an on-screen element in beat 7 rather than a spoken line, so it
  //      costs no seconds against the 28s ceiling.
  //   POSTING: board's #1 experiment is slot, not content - push this 8-12h
  //   off the usual 03:30-05:00 UTC window.  Debut 400+ = slot fatigue.
  //   Another sub-150 crawl = account-level throttle.  One upload settles it.
  //
  // THE CLAIM, every number checked to a primary source:
  //   - Midday xylem pressure -1.5 to -2.5 MPa; past -13 MPa in arid shrubs
  //     (Holbrook & Zwieniecki, Physics Today, Jan 2008; Venturas, Sperry &
  //     Hacke, J Integr Plant Biol 59(6):356-389, 2017; Jacobsen et al. 2007
  //     measured -13.1 MPa in Ceanothus cuneatus).
  //   - Those are GAUGE pressures.  At -2 MPa gauge the ABSOLUTE pressure is
  //     -1.9 MPa - about 19x more negative than a perfect vacuum.  That is
  //     what makes beat 4 true rather than hype.
  //   - Suction-pump ceiling 10.33 m (Holbrook & Zwieniecki, verbatim).
  //     Hyperion ~116 m (Guinness 116.07 m, 2019).  Koch et al., Nature
  //     428:851, 2004 put the theoretical maximum at 122-130 m.
  //   - Dixon & Joly, Phil Trans R Soc B 186:563-576, read 15 Nov 1894.
  //
  // TRAPS - cut any of these and the video is FALSE:
  //   1. NEVER say "it is not capillary action".  Holbrook & Zwieniecki:
  //      "Plants supply water to their leaves using nothing more mysterious
  //      than capillary forces, albeit ingeniously deployed."  Capillarity is
  //      real; it acts at few-nanometre pores in LEAF CELL WALLS, not in the
  //      wide xylem.  Capillary rise in a real 50-100 um conduit is 0.3-0.6 m.
  //      The script only ever says WHERE the pull happens, never WHETHER.
  //   2. ROOT PRESSURE IS REAL - 10-100 kPa in grapevine, lifts ~10 m,
  //      refills embolised vessels in spring (Sperry et al., Plant Physiol
  //      83:414, 1987).  Beat 1 kills "roots pump it ALL the way up".
  //   3. DO NOT cite maple spring sap as root pressure.  It is freeze-thaw
  //      STEM pressure (Zarrinderakht et al., Tree Physiol 44(4), 2024).
  //      Caught before scripting; would have shipped false.
  //   4. Say "below a vacuum" / "under tension", NEVER "stronger than a
  //      vacuum" - that implies suction, which is the wrong picture.
  //   5. Cohesion-tension is SETTLED (48 scientists co-signed Angeles et al.,
  //      New Phytol 163:451, 2004).  Never imply nobody knows how sap rises.
  //
  // DEMAND GATE - the new gate seqs 33-40 all failed:
  //   Biology StackExchange #11044, "How do trees lift water higher than 10
  //   meters?" - 18,598 views, and the asker rejects five expert answers over
  //   five successive edits.  Physics SE #268.  Physics Forums, Feb 2025.
  //   And the wrong answer is LIVE on a US federal page, which is beat 6 and
  //   makes beat 7's go-check checkable in ten seconds on the viewer's phone.
  //
  // LICENSING - two assets killed before build:
  //   Royal Society scans of RR/12/89 (Francis Darwin's referee report, 27 Dec
  //   1894, "not recommended for publication... the conclusion to be too
  //   speculative") and AP/71/1 are UNUSABLE - the Society asserts copyright
  //   over its scans and gates commercial reuse behind written permission.
  //   The facts are free to state; the images are not free to show.
  //   USGS celery photographs are credited to named individuals with no PD
  //   mark - killed.  USGS TEXT is a US Government work, which beat 6 quotes.
  // ==========================================================================
  41: [
    { t: 'Roots pump water up a tree.',
      q: 'giant redwood forest low angle', s: 'redwood', x: [],
      u: 'https://tile.loc.gov/storage-services/service/pnp/fsa/8e01000/8e01500/8e01549v.jpg', p: 0.35 },

    { t: 'Nothing pushes it.',
      q: 'antique botanical engraving', s: 'engraving', x: [],
      u: 'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:11900:11900/full/pct:50/0/default.jpg', p: 0.75, sfx: 'hit' },

    { t: 'The leaves pull it up.',
      q: 'old scientific paper page', s: 'paper', x: [],
      u: 'https://archive.org/download/philtrans08428777/page/n0_medium.jpg', p: 0.15 },

    { t: 'Inside the trunk, water is stretched below a vacuum.',
      q: 'tree trunk bark close up', s: 'trunk', x: [],
      u: 'https://archive.org/download/philtrans08428777/page/n2_medium.jpg',
      p: 0.5 },

    { t: 'A pump quits at ten metres. Redwoods reach a hundred and sixteen.',
      q: 'tall tree canopy', s: 'tree', x: [],
      u: 'https://tile.loc.gov/storage-services/service/pnp/ppmsca/53200/53299v.jpg',
      p: 0.25 },

    { t: 'A US Geological Survey page still puts it in the trunk.',
      q: 'government document text', s: 'document', x: [],
      u: 'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/wss-cycle-evapotranspiration-diagram.jpg?itok=uAhcq3yh',
      p: 0.35 },

    { t: 'Go read it. Still there today.',
      q: 'old book page text', s: 'book', x: [],
      u: 'https://tile.loc.gov/storage-services/service/pnp/matpc/23200/23263v.jpg', p: 0.5, sfx: 'soft' }
  ],

  // ==========================================================================
  // SEQ 42 - WROUGHT IRON GATES ARE MILD STEEL, 22 Aug 2026.  Lane B.
  // Adversarial pass caught: Wikipedia's own two pages disagree (Wrought iron
  // page says 1973/world's-last; Thomas Walmsley and Sons page says
  // 1975/UK's-last only). Going with 1973, corroborated independently by
  // designingbuildings.co.uk's Chris Topp entry. Also caught: Ironbridge Gorge
  // Museum (Blists Hill) still hand-forges small demonstration batches on the
  // relocated Atlas Forge machinery, so "hasn't been made" needed
  // "commercially" added or it would have been false.
  //
  // Duration model at speed 0.92: 55 words -> ~25.05s speech + 2.15s pause =
  // ~27.2s. Within 22-28s.
  //
  // PICTURES: Mixed, weighted to pictures (AC's pick via AskUserQuestion,
  // 22 Aug). Beats 3 and 6 use verified Geograph Britain and Ireland photos
  // (CC-BY-SA 2.0) of the actual Atlas Forge site, Bolton - the "one document"
  // moment picture-gate.md calls for, doubled up since two good photos existed.
  // Beats 1,2,4,5,7 are footage-probed Pexels (executions 102-103, all SAFE).
  // Exclude lists steer around a cemetery-cross gate, a Halloween clip and a
  // delivery-boy clip that all substring-matched "gate" but were wrong
  // register - caught by reading the returned slugs, not just the count.
  //
  // FIX, 22 Aug - execution 104 failed: Pexels Search 400s on ANY empty query,
  // even for a beat that carries an image URL. Pexels Search fires per-beat
  // unconditionally - Build Movie is what ignores it downstream when u/v is
  // set, and the query also serves as the documented 404-fallback (see seq41
  // beat 6 comment). Beats 3 and 6 keep q:'steel rolling mill industrial'/
  // s:'mill' for exactly that reason, even though Pexels' result goes unused.
  //
  // MINIMAX, 22 Aug (executions 106-108) - beats 3 and 6 upgraded from a
  // static archive photo to a MiniMax-animated version of that same photo
  // (image-to-video, subtle push-in/parallax, 4s/2K). Direct Geograph URLs,
  // and even a Library of Congress URL in an earlier isolated test, both
  // 403'd MiniMax's fetcher - a datacenter-IP block, same class as every
  // archive host in this pipeline. Re-hosting the source photo on
  // zoneout-bg-2.austin-itsac.workers.dev cleared it (that host was already
  // proven reachable by MiniMax). v: below is the resulting clip; full
  // writeup in production.md. Original stills, for provenance: Geograph
  // Britain and Ireland photos 3174903 and 404170 (CC-BY-SA 2.0, Atlas Forge
  // site, Bolton) - no longer referenced by u: since v: takes priority.
  // ==========================================================================
  42: [
    { t: "That's a real wrought iron gate.",
      q: 'ornate iron gate entrance closeup', s: 'gate', x: ['cross-design'], p: 0.2 },

    { t: 'Almost certainly not.',
      q: 'iron gate close up detail', s: 'gate', x: ['cross-design'], p: 0.6, sfx: 'hit' },

    { t: "Real wrought iron hasn't been made commercially since 1973.",
      q: 'steel rolling mill industrial', s: 'mill', x: [],
      v: 'https://video-product.cdn.minimax.io/inference_output/rollout/2026-08-22/bf20cc5e-bb1c-4fe9-ba6c-a6c9769541ac/output.mp4', p: 0.15 },

    { t: 'Everything since is mild steel, shaped to look old.',
      q: 'black iron gate modern home', s: 'gate', x: ['cross-design', 'boy-receiving'], p: 0.15 },

    { t: 'Cheaper, faster, easier to mass produce.',
      q: 'steel rolling mill industrial', s: 'mill', x: [], p: 0.15 },

    { t: 'Atlas Forge in Bolton closed. Sellers kept the old name anyway.',
      q: 'steel rolling mill industrial', s: 'mill', x: [],
      v: 'https://video-product.cdn.minimax.io/inference_output/rollout/2026-08-22/ceb222bd-07c7-4444-a8bc-707bbae3c0e1/output.mp4', p: 0.3 },

    { t: "Go look at your gate. It's not what the label says.",
      q: 'ornate iron gate closing', s: 'gate',
      x: ['cross-design', 'dark-artistic', 'boy-receiving', 'elegant-gate-entrance'], p: 0.6, sfx: 'soft' }
  ],

  // ==========================================================================
  // SEQ 43 - the Telstar. 22 Aug 2026, brainstormed with AC off the World Cup
  // having just ended. Lane B, part 18.
  //
  // The origin sits at beats 3-5, not 6. Deliberate: SKILL.md's "Investigator
  // posture" note says the origin beat is the product and its problem is
  // living at beat 6 where two-thirds of viewers never arrive. This script
  // front-loads it (who built it, when, why, what they named it) and leaves
  // beat 6 to carry the twist instead. First video to try that ordering -
  // worth reading against seq 41/42 retention before it becomes a habit.
  //
  // All 7 beats footage-probed SAFE, execution 111. Exclusions are defensive:
  // Pexels reorders between calls, so every steer is written down rather than
  // relying on the first result staying first. b2/b4 both want a retro TV and
  // are kept visually apart by hand - b2 gets a stack of dead sets, b4 gets
  // one set showing static. Their subjects ('television' vs 'tv') return
  // overlapping shoots, and 6976210/6976215 are near-twins from the same one.
  //
  // Beat 3 is the evidence beat: a MiniMax-animated photo of the actual 1970
  // Telstar (AC's pick, 22 Aug: mixed + animate). Execution 113, 4s/2K, ~$0.52.
  //
  // The source photo needed real work before it was usable, and the reasons
  // generalise. It is a museum-cased ball shot through acrylic: (a) the supplied
  // file was 960x640, a 3x upscale to fill 1080x1920, so a larger 1280x853 copy
  // was requested; (b) at 1.5 landscape, JSON2Video's cover crop keeps only the
  // centre 37.5% of the width, which threw away BOTH "OFFICIAL WORLDCUP MEXICO
  // 1970" blocks - the date, i.e. the fact; (c) translucent display-case bars
  // ran vertically across the ball at roughly x230-330 and x890-960.
  // Fixed by hand-cropping to 447x795 (a true 9:16) centred on the clean
  // TELSTAR / DURLAST / adidas column, then upscaling to 1080x1920 before AC
  // re-hosted it. Because the source now matches the output frame exactly,
  // JSON2Video crops nothing further. Lesson worth keeping: for a round object
  // in a 9:16 frame, decide which text has to survive and crop to THAT, rather
  // than handing the renderer a wide shot and letting it choose.
  //
  // Provenance, since v: no longer points at it: Wikimedia Commons, the Adidas
  // Telstar Durlast in a display case, gold lettering reading TELSTAR /
  // OFFICIAL WORLDCUP MEXICO 1970 / DURLAST / adidas. Not verified from this
  // sandbox - Wikimedia is cache-only here, so neither the image nor its
  // caption could be read; AC checked it. OPEN QUESTION he was told about and
  // accepted: the leather is bright and unaged and there is retail packaging in
  // frame, so this may be one of Adidas's later collector reissues rather than
  // a 1970 original. The script never claims this ball played in Mexico, so
  // nothing said is false either way - but a commenter may raise it.
  // ==========================================================================
  43: [
    { t: 'A real football has black pentagons.',
      q: 'soccer ball close up grass', s: 'ball',
      x: ['argentinian', 'backpack'], p: 0.2 },

    { t: 'That was a TV trick.',
      q: 'vintage television set retro', s: 'television',
      x: ['static-display', 'room-with-a-television', 'television-with-no-reception'],
      p: 0.6, sfx: 'hit' },

    { t: 'Adidas designed that pattern in 1970.',
      q: 'football on pitch close up', s: 'football', x: [],
      v: 'https://video-product.cdn.minimax.io/inference_output/rollout/2026-08-22/1a88a164-3314-4621-8ad6-5b1807c56ccc/output.mp4', p: 0.15 },

    { t: 'So it showed up on black and white television.',
      q: 'old tv static screen noise', s: 'tv',
      x: ['powered-on-tv', 'man-sitting-near'], p: 0.15 },

    { t: 'They called it Telstar. Television star.',
      q: 'satellite dish antenna sky', s: 'satellite', x: [], p: 0.15 },

    { t: 'It was the real ball for two World Cups only.',
      q: 'football stadium crowd night', s: 'stadium', x: [], p: 0.3 },

    { t: 'Check the emoji on your phone. Still 1970.',
      q: 'hand holding phone screen', s: 'phone',
      x: ['icons-on-screen', 'in-a-store'], p: 0.6, sfx: 'soft' }
  ],

  // ==========================================================================
  // seq 44 - THE PRIORITY RULE. Brontosaurus was not a mistake, it was a filing
  // rule: Marsh named Apatosaurus 1877 and Brontosaurus 1879, Riggs judged them
  // one animal in 1903, and the older name won. Full trap notes live on the row.
  //
  // WEEK'S VARIABLE: origin-forward beat 2. It spends its words on WHO and WHEN
  // instead of announcing the correction, so provenance lands at ~4s not ~19s.
  // Baseline to beat: 30.8% stayed-to-watch, read at 48h. Nothing else moved.
  //
  // PROBE exec 115, 23 Aug. Counts alone would have shipped two defects:
  //   'handwritten' 0 FAIL -> 'typewriter' (13, all genuine).
  //   'archive'     0 FAIL -> 'documents' (2).
  //   'cabinet'     1 THIN and it is a plain wooden cabinet. Dropped.
  //   'dinosaur'    4 SAFE on paper - but three are a TOY, a MINIATURE CARVING
  //     and a MODEL IN A FOREST. And b6's own query returned 1, the SAME clip
  //     b1 already matched: a guaranteed repeat. Split the pool instead - b1
  //     takes the toy (the childhood dinosaur, which sets up beat 7), b6 takes
  //     the museum exhibit, and per-beat `x` holds them apart.
  //
  // SOFT REPEAT, accepted: b3 and b6 are different clips (repeatedClips passes)
  // but both are skeletons in a glass atrium, three beats apart. Watch on screen.
  //
  // DURATION: 54 words, speed 0.92, pause 2.85 -> 27.45s modelled. The model
  // runs 2.4-2.9s long here (42: 27.2->24.84, 43: 24.93->22.04), so expect
  // ~24.8s: inside 22-28 and off the 22s floor seq 43 nearly hit.
  // ==========================================================================
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

  /* seq 45 - care labels, lane B (everyone gets this wrong), part 20.
   * Origin-forward beat 2 HELD CONSTANT from seq 44 - seq 44's 48h read is not in
   * yet, so this week changes the topic and nothing else.
   *
   * Probed live in execution 121 (11 queries, 7 beats + 4 alternates).
   * Beats 1, 3 and 7 all want a garment label and are given THREE different
   * subjects on purpose - seq 44 proved a shared subject hands the same single
   * clip to two beats and trips repeatedClips.
   *
   * THIN pools (one clip each): label, document, silk. Safe only because no other
   * beat shares those subjects. 'cleaner' and 'laundry' both probed FAIL 0 and are
   * not used. 'collar' probed 2 but one is a PUPPY wearing a collar - excluded by
   * slug, which is why the x list matters more than the count.
   *
   * NEVER tell a viewer to wash a garment labelled 'Dryclean only'. That is the
   * inverted version of this script and it destroys clothes. The correction runs
   * soft -> strong: plain 'Dryclean' is one permitted method, 'only' is the
   * stronger claim that needs a basis for warning against washing. */
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

