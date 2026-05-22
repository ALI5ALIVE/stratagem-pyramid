## Full audit of the Field Kit PDF + plan to make it world-class

I scanned every page type. Below are the concrete defects I found, grouped by where they hurt, and the changes I’ll make to fix them. All changes stay in `src/lib/fieldKitPdf.ts` (the renderer); the source data and the in-app UI are untouched.

### A. Defects found (page by page)

**Cover (p1)**
- Huge dead space between the hero title and the "How to use this kit" card.
- Hero has no metric, no visual, no anchor — looks like a draft.
- Navy band is decorative only at the top-left edge; not used as a real masthead.
- "Card legend" and "Locked terminology" sit floating at the bottom with no relationship to the hero.

**Week at a glance (p2)**
- Two-column slide list wraps mid-title in the wider rows (e.g. "Running the Whiteboard in the Room", "Operational Performance Roadmap").
- Inconsistent "D" / "T" / "O" / "P" chips — only some rows get one; reads like a bug.
- Every row uses the same blue left rail — no rhythm or grouping by week phase.

**Study sheet (p3, 5, 7, 10, 15, etc.)**
- Bottom ~40% of every study sheet is blank — page is built for A4 but content stops two-thirds down.
- "Check yourself" questions across the top are cramped 3-up with awkward wrapping.
- Key-terms hanging indent produces deep orphan lines.
- Takeaway is bold body, Key terms labels are also bold and same colour — no clear hierarchy.
- Left rail sections (Takeaway / Why the buyer cares / Watch-out / Connects) are flat — no colour coding tying back to the cover legend.

**Transcript (p4, 6, 8–9, 12–13, 16–17, etc.)**
- Generic beats display a meaningless `BEAT` chip and a generic `SAY THIS.` intent — adds noise on the very first beat which is the most-read.
- Continuation page ("beats continued") drops the meta strip (word count, pace, beats remaining) — feels orphaned.
- The accent rail inside the card (2.5pt) duplicates the giant number+chip outside the card.
- The "Listen for" tag, label and body run together and wrap with a strange hanging indent.
- Coach (red) beats use a bullet glyph and a denser body — visually clashes with anchor/pain/value cards.
- Coach card label `PAIN` letter-spacing makes it read as `PAN` at small sizes.

**Glossary (p33–34)**
- Plain single-column list — no two-column flow, no letter dividers, no chip system. Feels like a different document.

**Closing drill (p35)**
- Practice Center callout sits with a wall of white below it — page is ~35% full.
- Self-check is a flat checkbox list — no grouping by competency.

**Cross-cutting issues**
- No week colour code — a rep can’t identify which week’s kit they’re holding without reading.
- Title row x-position drifts because it depends on numeral width — titles never align across pages.
- Eyebrow text is 7pt — too small to scan in print.
- Helvetica core only; bold at small sizes looks blurry.
- Footer is functional but the page number is a tiny "n / N" — could be a real chip.

---

### B. The redesign

#### 1. Establish a real system, not just decoration
- **Week colour token**: every Field Kit gets one week accent (W1 brand blue, W2 violet, W3 emerald). Used on the masthead bar, page number chip, every left rail, and the hero numeral.
- **Masthead band**: every page gets a thin (10pt) coloured band at the very top edge with the week wordmark and slide locator inside it (replaces today’s grey text + hairline).
- **Section chips**: introduce a single chip component (rounded 2pt, all caps, 7.5pt) used on study-sheet sections, transcript beats, and the legend. Colour-coded the same way everywhere.
- **Typographic scale**: lock to title 24 / section 11 / body 10 / eyebrow 8 / meta 7. Bump eyebrows from 7→8 so they’re actually readable. Increase body line-height for breathing room.
- **Title alignment**: titles always start at the same x (fixed numeral column), regardless of digit width — every page lines up.

#### 2. Cover — make it feel like a binder front
- Centre the hero block vertically; add a faint platform diagram silhouette behind it.
- Add a 3-stat strip under the hero (slides count, total transcript minutes, drill questions) — gives the cover a reason to exist.
- Move "Locked terminology" into the masthead area as a permanent watermark on every page; remove from cover.
- Tighten the "How to use this kit" card with numbered chips matching the new chip system.

#### 3. Contents — make it a real index
- Two-column slide list with a stable title column (no mid-title wraps).
- Every row gets a DTOP letter chip OR a phase chip (Intro / Capability / Recap) — never an empty space.
- Group rows visually under three subheaders: Anchor • Diagram • Recap.

#### 4. Study sheet — use the whole page
- Bring back a third row at the bottom: a wide "Money line" card and a "First 30 seconds" cue card so the page is full of useful rehearsal content, not whitespace.
- Replace the 3-up cramped "Check yourself" header with a single horizontal "Drill" strip — 3 chips, full width, generous padding.
- Colour-chip the left-rail sections (Takeaway / Why / Watch / Connects) to match the cover legend.
- Two-column key terms with no hanging indent.

#### 5. Transcript — finish the beat sheet
- First beat never shows the generic `BEAT/SAY THIS` chip; it always reads `OPEN`, with intent "Land the opening line" (or, if a cue is present, use the cue label).
- Remove the inner accent bar; the rail’s number+chip is the single accent.
- "Listen for" becomes its own footer row inside the card with a small left rail, label on its own line, body underneath — never collides with the body.
- Continuation pages get a slim meta strip: "Beats X–Y of N · Z words remaining".
- Coach beats use the same card shape; only the chip colour changes — no bullet glyph.
- Card label letter-spacing reduced so `PAIN` reads as `PAIN`, not `PAN`, at any size.
- If a single beat is taller than half the page, allow it to split between Say and Listen-for blocks with a continuation marker.

#### 6. Glossary — bring it inside the system
- Two-column A–Z list with letter dividers.
- Each term gets a left rail in the week colour and the same chip styling as study sheets.
- Page header matches the rest of the kit (masthead band + locator).

#### 7. Closing drill — make it feel like the finish line
- Self-check grouped into three buckets (Pitch / Diagram / Discovery) with a chip header per group.
- Add a "Sign-off" row at the bottom: "Rep ____ · Manager ____ · Date ____" — gives the page weight and a real reason to print it.
- Practice Center callout becomes a full-width hero strip with a single CTA line.

#### 8. Footer
- Footer hairline kept, but page number becomes a small pill with the week colour: "W1 · 12 / 35".
- Right-side coaching tip stays as today.

### C. Out of scope
- No changes to the source narration scripts, coach cards, study notes, or the React app.
- No font swap (still Helvetica core) — the upgrade is in scale, hierarchy and colour, not in switching fonts (would require embedding fonts and balloon the PDF size).

### D. Validation
After each section is rebuilt I’ll regenerate the W1 kit, rasterize every page, and visually QA for: overlap, clipped text, broken alignment, orphan whitespace, and any low-contrast hits. I’ll report the before/after page count and a short pass/fail per page type.