/**
 * KIRA Design Ltd — Website Revamp pitch deck
 * Palette taken from the studio itself: lacquer red wall, black lettering,
 * pale oak joinery, and the orange "I" from the wordmark.
 * Motif: a square material chip marks every point. Repeated on all five slides.
 */
const pptxgen = require("pptxgenjs");

const INK       = "131110";
const INK_2     = "1F1A18";
const LACQUER   = "A02C1C";
const VERMILION = "E8621C";
const OAK       = "C9A984";
const CHAMPAGNE = "C6A87C";
const LINEN     = "F5F1EA";
const PAPER     = "FBF9F5";
const MUTED     = "6B6259";
const ON_DARK   = "F2EDE4";
const ON_DARK_2 = "A99C8D";

const SANS  = "Arial";
const SERIF = "Cambria";
const BODY  = "Calibri";

const IMG = __dirname + "/img/";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";              // 13.333 x 7.5 — must precede addSlide
pres.author = "KIRA Design Ltd";
pres.title  = "KIRA Design — Website Revamp";

/** The KIRA wordmark: light, wide-tracked, with the single orange I. */
function wordmark(s, x, y, size, onDark) {
  s.addText(
    [
      { text: "K", options: { color: onDark ? ON_DARK : INK } },
      { text: "I", options: { color: VERMILION } },
      { text: "RA", options: { color: onDark ? ON_DARK : INK } },
    ],
    { x, y, w: 3.2, h: size / 50, fontFace: SANS, fontSize: size,
      charSpacing: size * 0.34, bold: false, margin: 0 }
  );
  s.addText("DESIGN LTD", {
    x, y: y + size / 62, w: 3.2, h: 0.2, fontFace: SANS, fontSize: size * 0.26,
    color: onDark ? ON_DARK_2 : MUTED, charSpacing: size * 0.30, margin: 0,
  });
}

/** The repeated motif — a real material square, used as a marker. */
function chip(s, file, x, y, size) {
  s.addImage({ path: IMG + "chip-" + file + ".jpg", x, y, w: size, h: size });
}

// ══════════════════════════════════════════════════════════════════════
// 1 — TITLE
// ══════════════════════════════════════════════════════════════════════
const s1 = pres.addSlide();
s1.background = { color: INK };
s1.addImage({ path: IMG + "bg-hero.jpg", x: 0, y: 0, w: 13.333, h: 7.5, sizing: { type: "cover", w: 13.333, h: 7.5 } });
s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: INK, transparency: 26 } });
s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 7.6, h: 7.5, fill: { color: INK, transparency: 12 } });

wordmark(s1, 0.85, 0.72, 26, true);

s1.addText("WEBSITE REVAMP  ·  2026", {
  x: 0.85, y: 2.35, w: 8, h: 0.3, fontFace: SANS, fontSize: 11,
  color: OAK, charSpacing: 3.4, margin: 0,
});

s1.addText(
  [
    { text: "紅牆\n", options: { fontFace: SANS, fontSize: 40, color: ON_DARK } },
    { text: "The Red ", options: { fontFace: SANS, fontSize: 54, color: ON_DARK } },
    { text: "Wall", options: { fontFace: SERIF, fontSize: 54, color: "F6C9A8", italic: true } },
  ],
  { x: 0.85, y: 2.9, w: 8.4, h: 2.2, lineSpacing: 58, margin: 0 }
);

s1.addText(
  "A homepage built the way KIRA builds a room — from its own materials, its own light, and its own red wall.",
  { x: 0.85, y: 5.15, w: 6.5, h: 0.9, fontFace: BODY, fontSize: 15, color: ON_DARK_2, lineSpacing: 24, margin: 0 }
);

[["lacquer-red", 0.85], ["fluted-oak", 1.3], ["walnut", 1.75], ["limestone", 2.2],
 ["champagne-metal", 2.65], ["granite", 3.1]].forEach(([c, x]) => chip(s1, c, x, 6.35, 0.36));

s1.addText("Prepared for Kim Wong, Design Director", {
  x: 0.85, y: 6.9, w: 6, h: 0.3, fontFace: BODY, fontSize: 11, color: ON_DARK_2, margin: 0,
});
s1.addNotes("Open here. Don't explain the concept yet — let the red and the oak do the work for a beat. Then: 'This palette isn't something I invented. It's your reception.'");

// ══════════════════════════════════════════════════════════════════════
// 2 — THE DIAGNOSIS
// ══════════════════════════════════════════════════════════════════════
const s2 = pres.addSlide();
s2.background = { color: LINEN };

s2.addText("01 — WHERE WE ARE", {
  x: 0.85, y: 0.62, w: 6, h: 0.3, fontFace: SANS, fontSize: 11,
  color: LACQUER, charSpacing: 3.2, margin: 0,
});
s2.addText(
  [
    { text: "The work is better than the ", options: { fontFace: SANS, fontSize: 38, color: INK } },
    { text: "website.", options: { fontFace: SERIF, fontSize: 38, color: LACQUER, italic: true } },
  ],
  { x: 0.85, y: 1.06, w: 7.4, h: 0.75, margin: 0 }
);

const findings = [
  ["walnut",          "Awards sit on top of the photography",  "Four badges cover the rooms you were awarded for. They shrink the work they're meant to prove."],
  ["limestone",       "Projects are thumbnails, not evidence", "No developer, area, scope or year. A buyer can't assess capability from a caption in brackets."],
  ["granite",         "Your best clients are a footnote",      "Henderson, Chinachem, Wheelock, Grand Ming, Poly, K&K — the strongest credential you own, set in small grey text."],
  ["champagne-metal", "The categories don't match the grid",   "Commercial / Residential / Art Collection read as columns, but the projects beneath them ignore it."],
];
findings.forEach(([c, head, body], i) => {
  const y = 2.2 + i * 1.16;
  chip(s2, c, 0.85, y + 0.04, 0.32);
  s2.addText(head, { x: 1.35, y, w: 6.5, h: 0.32, fontFace: SANS, fontSize: 15, bold: true, color: INK, margin: 0 });
  s2.addText(body, { x: 1.35, y: y + 0.36, w: 6.6, h: 0.66, fontFace: BODY, fontSize: 12.5, color: MUTED, lineSpacing: 17, margin: 0 });
});

s2.addShape(pres.ShapeType.rect, { x: 8.9, y: 2.2, w: 3.6, h: 3.55, fill: { color: LACQUER } });
s2.addText("IN YOUR OWN WORDS", {
  x: 9.3, y: 2.6, w: 2.9, h: 0.28, fontFace: SANS, fontSize: 9.5,
  color: "F0C4B8", charSpacing: 2.4, margin: 0,
});
s2.addText(
  [
    { text: "“Minimal, but it does not bring out the ", options: { fontFace: SERIF, fontSize: 19, color: "FFF8F0", italic: true } },
    { text: "Interior Design", options: { fontFace: SERIF, fontSize: 19, color: "FFD9C4", italic: true, bold: true } },
    { text: " advantage.”", options: { fontFace: SERIF, fontSize: 19, color: "FFF8F0", italic: true } },
  ],
  { x: 9.3, y: 3.08, w: 2.9, h: 1.6, lineSpacing: 27, margin: 0 }
);
s2.addText("That is the whole brief. Restraint only reads as confidence when something is being withheld.", {
  x: 9.3, y: 4.85, w: 2.9, h: 0.8, fontFace: BODY, fontSize: 11, color: "F2C9BC", lineSpacing: 15, margin: 0,
});
s2.addNotes("Lead with the compliment — the work is genuinely award-winning. The problem is presentation, not practice. The red card is Kim's own sentence; let him read it.");

// ══════════════════════════════════════════════════════════════════════
// 3 — THE IDEA
// ══════════════════════════════════════════════════════════════════════
const s3 = pres.addSlide();
s3.background = { color: INK };
s3.addImage({ path: IMG + "bg-board.jpg", x: 6.9, y: 0, w: 6.43, h: 7.5, sizing: { type: "cover", w: 6.43, h: 7.5 } });
s3.addShape(pres.ShapeType.rect, { x: 6.9, y: 0, w: 6.43, h: 7.5, fill: { color: INK, transparency: 42 } });

s3.addText("02 — THE IDEA", {
  x: 0.85, y: 0.62, w: 5, h: 0.3, fontFace: SANS, fontSize: 11,
  color: OAK, charSpacing: 3.2, margin: 0,
});
s3.addText(
  [
    { text: "Your palette was already in your ", options: { fontFace: SANS, fontSize: 34, color: ON_DARK } },
    { text: "reception.", options: { fontFace: SERIF, fontSize: 34, color: CHAMPAGNE, italic: true } },
  ],
  { x: 0.85, y: 1.06, w: 5.7, h: 1.5, lineSpacing: 42, margin: 0 }
);

s3.addText(
  "A lacquer-red wall. Black lettering. Pale oak battens. An orange bench — the same orange as the I in your wordmark. Nothing needed inventing; it needed noticing.",
  { x: 0.85, y: 2.75, w: 5.5, h: 1.2, fontFace: BODY, fontSize: 14, color: ON_DARK_2, lineSpacing: 22, margin: 0 }
);

const swatches = [
  ["lacquer-red",     "Lacquer",   "#A02C1C"],
  ["fluted-oak",      "Oak",       "#C9A984"],
  ["walnut",          "Walnut",    "#4A3324"],
  ["limestone",       "Limestone", "#E4DED2"],
  ["champagne-metal", "Champagne", "#C6A87C"],
  ["granite",         "Granite",   "#3A3733"],
];
swatches.forEach(([c, name, hex], i) => {
  const x = 0.85 + i * 0.92;
  chip(s3, c, x, 4.35, 0.78);
  s3.addText(name, { x: x - 0.06, y: 5.24, w: 0.95, h: 0.24, fontFace: SANS, fontSize: 9.5, color: ON_DARK, margin: 0 });
  s3.addText(hex,  { x: x - 0.06, y: 5.45, w: 0.95, h: 0.22, fontFace: BODY, fontSize: 8.5, color: ON_DARK_2, margin: 0 });
});

s3.addText(
  [
    { text: "Almost nobody in Hong Kong luxury interiors uses red. ", options: { fontFace: BODY, fontSize: 13.5, color: ON_DARK } },
    { text: "It is auspicious, and it is unmistakably yours.", options: { fontFace: BODY, fontSize: 13.5, color: CHAMPAGNE } },
  ],
  { x: 0.85, y: 6.0, w: 5.7, h: 1.2, lineSpacing: 20, margin: 0 }
);
s3.addNotes("This is the emotional centre of the pitch. The point to land: the identity was already in the building — I only read it back. Pause on the swatch row.");

// ══════════════════════════════════════════════════════════════════════
// 4 — THE SITE
// ══════════════════════════════════════════════════════════════════════
const s4 = pres.addSlide();
s4.background = { color: PAPER };

s4.addText("03 — THE NEW HOMEPAGE", {
  x: 0.85, y: 0.55, w: 6, h: 0.3, fontFace: SANS, fontSize: 11,
  color: LACQUER, charSpacing: 3.2, margin: 0,
});
s4.addText(
  [
    { text: "Built, not ", options: { fontFace: SANS, fontSize: 34, color: INK } },
    { text: "sketched.", options: { fontFace: SERIF, fontSize: 34, color: LACQUER, italic: true } },
  ],
  { x: 0.85, y: 0.97, w: 6, h: 0.62, margin: 0 }
);

s4.addImage({ path: IMG + "page-hero.jpg", x: 0.85, y: 1.85, w: 7.75, h: 4.84,
              shadow: { type: "outer", color: "000000", blur: 18, offset: 4, angle: 90, opacity: 0.18 } });
s4.addText("Live, responsive, bilingual EN / 繁體中文 — not a mockup.", {
  x: 0.85, y: 6.82, w: 7.75, h: 0.3, fontFace: BODY, fontSize: 11, color: MUTED, margin: 0,
});

const fixes = [
  ["walnut",          "Awards move off the photography", "Into a typographic honours rail. The rooms are finally uncovered."],
  ["limestone",       "Projects become plates",          "Developer, area, scope, year and award on every one."],
  ["granite",         "Your clients lead",               "Six major Hong Kong developers, given their own section."],
  ["champagne-metal", "Four clear routes",               "Residential · Commercial · Hospitality · Art Collection."],
  ["lacquer-red",     "The form routes itself",          "A developer brief and a private home reach different people."],
];
s4.addText("WHAT CHANGES", {
  x: 9.15, y: 1.85, w: 3.4, h: 0.28, fontFace: SANS, fontSize: 10,
  color: MUTED, charSpacing: 2.6, margin: 0,
});
fixes.forEach(([c, head, body], i) => {
  const y = 2.32 + i * 0.94;
  chip(s4, c, 9.15, y + 0.03, 0.26);
  s4.addText(head, { x: 9.56, y, w: 3.1, h: 0.28, fontFace: SANS, fontSize: 12.5, bold: true, color: INK, margin: 0 });
  s4.addText(body, { x: 9.56, y: y + 0.3, w: 3.15, h: 0.56, fontFace: BODY, fontSize: 11, color: MUTED, lineSpacing: 15, margin: 0 });
});
s4.addNotes("Open the real site here if the room has a screen — the language toggle and the sector filter both land better live than on a slide.");

// ══════════════════════════════════════════════════════════════════════
// 5 — NEXT
// ══════════════════════════════════════════════════════════════════════
const s5 = pres.addSlide();
s5.background = { color: LACQUER };
s5.addImage({ path: IMG + "bg-studio.jpg", x: 0, y: 0, w: 13.333, h: 7.5, sizing: { type: "cover", w: 13.333, h: 7.5 } });
s5.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: LACQUER, transparency: 8 } });

s5.addText("04 — TO GO LIVE", {
  x: 0.85, y: 0.72, w: 6, h: 0.3, fontFace: SANS, fontSize: 11,
  color: "F0C4B8", charSpacing: 3.2, margin: 0,
});
s5.addText(
  [
    { text: "Three things, and it ", options: { fontFace: SANS, fontSize: 38, color: "FFF8F0" } },
    { text: "ships.", options: { fontFace: SERIF, fontSize: 38, color: "FFD9C4", italic: true } },
  ],
  { x: 0.85, y: 1.16, w: 8, h: 0.7, margin: 0 }
);

const asks = [
  ["01", "Your photography",      "Whatever exists, at whatever quality. Every image slot is already sized and labelled for what it needs."],
  ["02", "The hotel projects",    "Names, locations, years and scope. Hospitality becomes a real fourth route the moment they arrive."],
  ["03", "The logo as SVG",       "The wordmark is staying. Real letterforms will tune the spacing of the whole type system."],
];
asks.forEach(([n, head, body], i) => {
  const x = 0.85 + i * 4.05;
  s5.addShape(pres.ShapeType.rect, { x, y: 2.5, w: 3.6, h: 2.5, fill: { color: "7A1F10", transparency: 22 } });
  s5.addText(n, { x: x + 0.35, y: 2.78, w: 1, h: 0.5, fontFace: SERIF, fontSize: 26, color: "FFC9A8", italic: true, margin: 0 });
  s5.addText(head, { x: x + 0.35, y: 3.35, w: 2.9, h: 0.32, fontFace: SANS, fontSize: 15, bold: true, color: "FFF8F0", margin: 0 });
  s5.addText(body, { x: x + 0.35, y: 3.74, w: 2.95, h: 1.05, fontFace: BODY, fontSize: 11.5, color: "F5CFC4", lineSpacing: 16, margin: 0 });
});

s5.addText(
  "Once those land: project pages, the three sector routes, and the Chinese copy read by someone in your office. Two weeks to a site you can send a developer.",
  { x: 0.85, y: 5.35, w: 8.2, h: 0.8, fontFace: BODY, fontSize: 13.5, color: "FFF0E6", lineSpacing: 21, margin: 0 }
);

wordmark(s5, 0.85, 6.45, 20, true);
s5.addText("admin@kiradesign.com.hk   ·   +852 2981 2838", {
  x: 8.4, y: 6.62, w: 4.1, h: 0.3, fontFace: BODY, fontSize: 12, color: "F5CFC4", align: "right", margin: 0,
});
s5.addNotes("Close on the ask, not on the design. Three concrete deliverables and a two-week horizon. Get agreement on who is sending the photography before leaving the room.");

pres.writeFile({ fileName: __dirname + "/KIRA-Design-Website-Revamp.pptx" })
    .then(f => console.log("wrote " + f));
