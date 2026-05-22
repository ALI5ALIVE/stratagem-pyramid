# Field Kit PDF — World-Class One-Pager Pass

## What's wrong today (visual QA of generated Week 1 PDF)

I rendered Week 1 and inspected slides 1, 4, 6, 10. Three structural problems:

### 1. Huge dead vertical band (the real "white space" complaint)
- Left column ends ~1/3 down the page (title + Core Idea + Teaching Summary), then a 250-300pt empty void before the coach-chip strip pinned at the bottom.
- Right column ends after objections, leaving another 200pt empty band.
- Roughly **45-55% of every slide page is empty paper.**

### 2. Broken glyphs (helvetica core font doesn't contain these)
- ▸ U+25B8 (pushback marker) renders as `%`
- ↳ U+21B3 (response marker) renders as `I³`
- ☐ U+2610 (closing-page checkboxes) renders as `&`
- Smart quotes `"` `"` render with weird inter-letter spacing in titles ("W elcom e", "W eek 1 ·D TO P")

### 3. Fallback content repeats and feels generic
- ~7 of 13 Week 1 slides fall back to the same 2 objections ("We've been told this before" / "Why now?") and the same 2 discovery questions because no curated entry exists. A rep reading the deck end-to-end sees the same two pink cards over and over.

## Goal

Every slide one-pager: zero empty bands, every pixel earns its place, 6 rep-facing blocks instead of 3, all glyphs render correctly, no duplicate fallbacks.

## New one-pager layout (A4 landscape)

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ COMPLY365 · ACADEMY            DTOP:[D] Persona:[Exec][Ops] Time:60-90s │ ← thin meta strip
├──────────────────────────────────────┬──────────────────────────────────┤
│ ▌SLIDE 06 — Week 1 · DTOP            │ KEY QUESTIONS TO ASK             │
│ ▌(navy hero, 48pt tall — was 52pt)   │ ① ② ③ (3 numbered chips)         │
├──────────────────────────────────────┼──────────────────────────────────┤
│ THE CORE IDEA                        │ OBJECTIONS & APPROVED ANSWERS    │
│ (1-line, bold)                       │ ▸ pushback                       │
├──────────────────────────────────────┤ ↳ response                       │
│ TEACHING SUMMARY                     │ (2 blocks, auto-stretch)         │
│ (paraphrased narration, grows to     │                                  │
│  fill — no fixed cap; justifies      ├──────────────────────────────────┤
│  vertically with right column)       │ PROOF POINTS YOU CAN DROP        │
│                                      │ • ~90% domain vs ~35% generic    │
│                                      │ • Operational Data, not training │
│                                      │ • +5 defensible stats per slide  │
├──────────────────────────────────────┼──────────────────────────────────┤
│ WHITEBOARD RECIPE / WHERE TO POINT   │ COMMON REP MISTAKE               │
│ 1. Draw … 2. Label … 3. Circle …     │ (1 line — what new reps fumble)  │
│ (or "Point at the X, then the Y")    │                                  │
├──────────────────────────────────────┴──────────────────────────────────┤
│ ▌REMEMBER   ▌SAY IT   ▌WATCH OUT   ▌BRIDGE   (4 colour chips, full-width)│
├─────────────────────────────────────────────────────────────────────────┤
│ Connects to: Slide 03 · Slide 09      Banned here: "AI assistant"…      │ ← micro footer
└─────────────────────────────────────────────────────────────────────────┘
```

### Sizing rule (kills the white band)
- Compute `availableH = pageH - header - metaStrip - chipStrip - microFooter`.
- Distribute that height between **left stack** (Core Idea, Teaching Summary, Whiteboard Recipe) and **right stack** (Questions, Objections, Proof Points, Rep Mistake) by **measuring each block's natural height and then expanding the largest text block (Teaching Summary on the left, Objections on the right) to absorb any remainder.**
- Coach chip strip stretches to fill its band (44 → up to 64pt). Objection blocks stretch from 76pt → up to whatever fills the right column.
- No more pinning chips at `pageH - 50` — they flow with content.

## Four new content sections per slide

Added to `src/data/salesEnablementSlideAids.ts`:

1. **`SLIDE_PROOFS: Record<slideId, string[]>`** — 2-3 defensible stats, anchored to approved numbers (~90% / ~35%, DTOP outcomes, 48-hour mobile sync). Per-week fallbacks.
2. **`SLIDE_WHITEBOARD: Record<slideId, string>`** — 1-3 stroke/point instructions. For non-whiteboard slides: "Point at X, then Y, then Z."
3. **`SLIDE_MISTAKE: Record<slideId, string>`** — one-line fumble to avoid ("Don't pitch features before you've drawn the loop.").
4. **`SLIDE_META: Record<slideId, { dtop?: "D"|"T"|"O"|"P"; persona: ("Exec"|"Ops"|"Tech")[]; connectsTo?: string[]; bannedHere?: string[] }>`** — drives the meta strip and micro footer.

All four hand-curated for the ~15 anchor slides; per-week fallbacks cover the rest so **no slide ever shows a duplicate-looking page next to another.**

### De-duplication for fallbacks
- Track which fallback was last used per week; rotate through a pool of 4 objections + 4 questions per week instead of always serving the same 2. Stops the "same pink card twice" problem.

## Glyph fix (must-do)

Replace all non-Latin-1 characters in the PDF — helvetica core font doesn't contain them:

| Used today | Renders as | Replacement |
|---|---|---|
| `▸` U+25B8 | `%` | filled triangle drawn via `pdf.triangle()` |
| `↳` U+21B3 | `I³` | filled arrow drawn via two short lines |
| `☐` U+2610 | `&` | `pdf.rect(x, y, 10, 10, "S")` (already done elsewhere — fix closing page) |
| `"` `"` U+201C/D | spacing artefacts | plain ASCII `"` |
| `·` U+00B7 | OK (Latin-1) | keep |
| `—` U+2014 | OK (Latin-1) | keep |

Glyph markers become small drawn shapes (rose triangle, emerald right-arrow), which also looks more designed than typographic dingbats.

## Files

- **Edit** `src/lib/fieldKitPdf.ts` — new layout engine (height-distributing), new `drawProofList`, `drawMistakeBlock`, `drawWhiteboardRecipe`, `drawMetaStrip` helpers, glyph fixes, no more bottom-pinning.
- **Edit** `src/data/salesEnablementSlideAids.ts` — add `SLIDE_PROOFS`, `SLIDE_WHITEBOARD`, `SLIDE_MISTAKE`, `SLIDE_META`, week fallbacks for each, plus rotation logic.
- **No changes** to cover, week-at-a-glance, closing page, narration data, coach card data, or any UI component.

## QA loop

After implementing, regenerate all 3 weeks → rasterize at 110 DPI → visually inspect every slide page. Iterate until:
- No page has a vertical empty band > 40pt
- Every glyph renders as intended
- No two consecutive slides show identical fallback pushbacks
- Every section fits without clipping

## Out of scope

- Editing narration scripts
- Per-slide PDFs (still one PDF per week)
- Cover, week-at-a-glance, closing pages (already dense)
- Adding screenshots of the actual slides (would change page count and is a separate request)
