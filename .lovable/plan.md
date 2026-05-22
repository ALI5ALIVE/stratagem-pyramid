
## Why the current one-pagers feel repetitive and amateurish

After reading `fieldKitPdf.ts` and `salesEnablementLearningOutcomes.ts` end-to-end, there are two real problems — both structural.

### 1. Six blocks all say the same sentence

For every slide page we currently render, in this order:

- Title hero (navy)
- **Core Idea** (left col)
- **3 × Teach Beats** Hook / Frame / Proof (left col)
- **Say It Like This** (left col, emerald)
- Whiteboard recipe (left col, violet)
- Key Questions (right col)
- Objections × 2 (right col)
- Proof Points (right col, emerald)
- **Common Rep Mistake** (right col, rose)
- **Check Yourself** (full-width band)
- **4 × Coach Chips**: Remember / Say it / Watch out / Bridge (full-width strip)
- Connects-to / Banned-here footer

For the DTOP slide that means the buyer reads "DTOP is the only loop with a Detect and a Prove step" or a one-word variant of it **six separate times**: in coreIdea, in the Frame beat, in sayLikeThis, in the proof points, in the REMEMBER chip, and again in the SAY IT chip. Same for repMistake vs the WATCH OUT chip — they're literally synonyms. That's the "repeating the same information" the user is seeing.

The root cause: the legacy coach-card data (`remember`, `sayItLikeThis`, `watchOutFor`, `bridge`) and the new learning-outcome data (`coreIdea`, `teachBeats`, `sayLikeThis`, `repMistake`, `checkYourself`) **both render on the same page**. We added the new model without retiring the old one.

### 2. The layout is dense and noisy, not editorial

- 11 distinct visual blocks on one landscape page
- 7 accent colours in play (navy, brand blue, emerald, rose, amber, sky, violet)
- Three different "boxed" treatments (rounded card, accent block, chip)
- Tiny 7–9pt body type packed into narrow columns
- The 4-chip strip at the bottom is the worst offender: four bright boxes shouting the same content as the left column

That's why it reads as "amateurish" — there is no hierarchy. Everything is equally loud.

## The fix

Two parallel changes: dedupe the content model, redesign the page as one clean editorial spread.

### Content model — one block per idea, no duplication

Drop the legacy coach-chip strip and proof-point list from the slide pages entirely. The learning-outcome data already covers all of it more precisely. Final per-slide content surface becomes exactly **six blocks**, each with a different job:

| Block | Job | Source |
|---|---|---|
| Outcome | What the rep can do after this slide | `outcome` |
| Core Idea | The one sentence to own | `coreIdea` |
| Three Beats | Hook / Frame / Proof — the teach sequence | `teachBeats` |
| Say It Like This | The verbatim line | `sayLikeThis` |
| Two Objections | Buyer pushback + approved answer | `SLIDE_OBJECTIONS` |
| Discovery Question | The one wedge question | top of `SLIDE_DISCOVERY` |

`repMistake`, the coach chips, the proof-point list, the whiteboard recipe and the "Check Yourself" band all get **removed from the per-slide page**. They survive in two new home pages so nothing is lost:

- **Coach's Sidebar** (new single page at end of each week) — collects every slide's `repMistake` + `checkYourself` as a checklist
- **Whiteboard & Proof Appendix** (new single page) — collects every whiteboard recipe and proof-point set in one reference table

This kills the duplication and gives the rep a cleaner pocket reference.

### Layout — editorial two-column, generous whitespace

Switch the slide page from "11 boxes on landscape" to a confident editorial spread:

```text
+------------------------------------------------------------------+
|  COMPLY365 · ACADEMY      Wk2 · Slide 04 of 07     [DTOP·O chip] |
|  ──────────────────────────────────────────────────────────────  |
|                                                                  |
|  04  /  THE INTELLIGENCE LAYER                                   |
|  ──                                                              |
|                                                                  |
|  OUTCOME                                                         |
|  By the end the rep can tell the three-tier story in 60s,        |
|  ending on the Operational Data foundation.                      |
|                                                                  |
|  ────────────────────────────────────────                        |
|                                                                  |
|  LEFT COLUMN (60%)                RIGHT COLUMN (40%)             |
|                                                                  |
|  Core idea                        Discovery wedge                |
|  One sentence, 14pt slate.        "Where does your team..."      |
|                                   Italic, 11pt, indented.        |
|  Teach the slide                                                 |
|  01  Hook · one line              Objections                     |
|  02  Frame · one line             [pushback]                     |
|  03  Proof · one line             > [approved answer]            |
|                                                                  |
|  Say it like this                 [pushback]                     |
|  | Pull quote, serif-styled       > [approved answer]            |
|  | left rule in brand blue.                                      |
|                                                                  |
|  ──────────────────────────────────────────────────────────────  |
|  Connects to: X · Y      Banned here: term · term      pg 4/22  |
+------------------------------------------------------------------+
```

Key visual decisions:

- **Portrait A4, not landscape.** Reads like a briefing, not a slide.
- **Numeral-led title** ("04 / THE INTELLIGENCE LAYER"), thin rule under it. No navy hero box.
- **Outcome promoted to a single full-width opening paragraph** in 13pt slate — the one thing the rep should read first.
- **Two columns from there down**, 60/40 split. Left is the teach. Right is the room (questions + objections).
- **Three palette roles only**: ink (navy), brand blue accent, slate body. No more rose / amber / sky / violet competing for attention.
- **Section labels in 7pt all-caps tracked muted grey** — they recede; the content speaks.
- **Hook/Frame/Proof rendered as numbered prose**, not three coloured boxes. Single-column rhythm.
- **Say-it-like-this rendered as a pull-quote** with a 2pt left rule in brand blue, no fill, no box.
- **Objections rendered as Q-and-A typography** (bold pushback, indented response with a "›" lead) — no rounded boxes.
- **DTOP stage and persona moved up into a single right-aligned chip in the header**, not a separate meta strip.
- **One hairline rule between sections.** No fills, no shadows, no rounded cards.

### Files to change

1. `src/lib/fieldKitPdf.ts`
   - Delete `drawCoachChip` usage on slide pages and the 4-chip strip block
   - Delete the proof-points block and Common Rep Mistake block from slide pages
   - Delete the full-width Check Yourself band from slide pages
   - Delete the meta strip; fold DTOP chip + persona into header line
   - Rewrite the slide-page builder as the portrait layout above (new `renderSlidePagePortrait` helper)
   - Add two new appendix-page builders: `renderCoachSidebarPage(week)` and `renderWhiteboardAppendixPage(week)`
   - Reduce colour palette use on slide pages to ink / brand / slate / muted / hairline

2. `src/data/salesEnablementLearningOutcomes.ts`
   - No data deletions. `repMistake` and `checkYourself` still get used — on the appendix pages, not the slide page.

3. `src/data/salesEnablementSlideAids.ts`
   - No changes. `SLIDE_PROOFS`, `SLIDE_WHITEBOARD`, `SLIDE_MISTAKE` now feed the appendix pages.

Cover page, Week-at-a-glance, and Closing-drill pages: **unchanged**. Problem is isolated to the per-slide cards.

### Verification

Generate the Week 2 PDF (highest slide count), then convert and inspect pages 3, 5, 7, 9, 11, 13. Confirm:

- No idea appears more than once on a page
- Each page reads top-to-bottom as: outcome → teach → say it → answer pushback
- No more than three accent colours per page
- Appendix pages render and pick up every slide's mistake/whiteboard/proofs without truncation
- No glyph boxes, no clipped text at column boundaries

### What I'm NOT changing

- Cover page, Week-at-a-glance summary, Closing drill page
- Narration data, coach-card data (still feeds the Week-at-a-glance "remember" line)
- Cover legend and locked-terminology block
- Any non-PDF rendering of these slides in the app

### Open question (one)

The new Coach's Sidebar appendix collects `repMistake` + `checkYourself` per slide. Two options for placement:

1. **One sidebar page per week**, at the end of the slide cards, before the Closing drill. Reps see it as a "before the next call" checklist.
2. **One sidebar page per slide**, immediately after each slide page. Heavier book, but each slide's reference stays adjacent.

Recommendation: **option 1**. Lighter book, reinforces the weekly cadence, the slide page stays clean.
