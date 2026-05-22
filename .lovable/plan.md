## Goals

Polish the Sales Enablement Field Kit PDF on four specific issues:
1. Stop shouting — fix copy that is wrongly upper-cased.
2. Move "Check Yourself" higher on the study sheet so reps see it before the fold.
3. Reformat the Contents ("Week at a glance") page so it's scannable, not a flat list.
4. Reformat each transcript page so it reads as structured paragraphs, not a wall of text.

Scope is `src/lib/fieldKitPdf.ts` only. No data files change.

---

## 1. Copy casing pass

Today, every slide title is force-`toUpperCase()`'d on both the study sheet (line 1310) and the transcript page (line 1679, 1702). Section labels are also forced caps. That looks like shouting and breaks BrandNumber casing rules (e.g. "Comply365").

Changes:
- **Slide titles** — render in Title Case as authored (drop `title.toUpperCase()` in `renderSlidePagePortrait` and `renderSlideTranscriptPage`). Keep the numeral big and brand-blue; title goes 14pt bold ink, sentence case as written.
- **Header strip** — replace `"COMPLY365 · SALES ENABLEMENT ACADEMY"` (line 1278, 1647) with `"Comply365 · Sales Enablement Academy"` at 7.5pt tracked (use letter-spacing illusion via spaced separator, not real caps).
- **Section labels** (`TAKEAWAY`, `WHY A BUYER CARES`, `WATCH-OUT`, `CONNECTS`, `WHAT'S ON THE SLIDE`, `THE IDEAS YOU MUST OWN`, `KEY TERMS`, `DEFENSIBLE FACTS`, `CHECK YOURSELF`, `TRANSCRIPT · COACH NARRATION (VERBATIM)`) — keep as small-caps style (these are intentional eyebrow labels) BUT shorten and soften:
  - `THE IDEAS YOU MUST OWN` → `Ideas to own`
  - `WHAT'S ON THE SLIDE` → `What's on screen`
  - `WHY A BUYER CARES` → `Why the buyer cares`
  - `DEFENSIBLE FACTS` → `Proof points`
  - `TRANSCRIPT · COACH NARRATION (VERBATIM)` → `Coach transcript · verbatim`
  - `CHECK YOURSELF` → `Check yourself`
  - All rendered at 7pt bold, 0.6pt letter spacing via the existing `drawRailLabel`, no `.toUpperCase()` on the underlying string.
- **Footer lines** — change `"Rep-facing · Not for customer distribution"` and `"Read once to memorise · do not read live on a call"` to sentence case (already are). Audit `Week ${n} · Study sheet` etc. — already fine.
- **Cover page** — change `WEEK ${n}  ·  FIELD KIT` (line 550) and `HOW TO USE THIS KIT` (line 575), `CARD LEGEND` (line 603), `LOCKED TERMINOLOGY — USE THESE, NEVER THE OTHERS` (line 628) to softer Title/sentence case eyebrows. Keep "Comply365" cased correctly (line 541 currently `"COMPLY365"`).

Acceptance: zero `.toUpperCase()` calls applied to user-authored copy (titles, body, narration). The only caps that remain are intentional 7pt eyebrow labels via the helper.

---

## 2. Lift "Check Yourself" up the page

Today, Check Yourself is pinned to `footerY - checkH - 6` — bottom of page, below the entire 2-column body (lines 1438–1467). On a short slide, it floats far below the content; on a dense slide, reps don't see it until they finish reading.

Change in `renderSlidePagePortrait`:
- Promote Check Yourself to sit **immediately under the title rule** (after the brand 28×2 underline, before the 2-column body).
- New stack: header → numeral + title → brand rule → **Check Yourself strip (compact, 26pt)** → 2-column body (rail + right column) → footer.
- The strip is one row: small "Check yourself" eyebrow, then 3 inline checkboxes with truncated question text (max 2 lines, clipped). Background switches from `C.offwhite` panel to a hairline-bordered light rule (`0.5pt` top + bottom, no fill) so it doesn't dominate above the body.
- `bodyTop` becomes `y + checkH + 12`. `bodyBottom = footerY - 12` (the bottom reserve is freed because Check Yourself moved up). Body now uses the full vertical span.
- Keep the same 3-question slot logic; recompute `labelW` against the new shorter eyebrow.

Acceptance: Check Yourself sits in the top ~25% of every page directly under the title, never below the rail/column content.

---

## 3. Contents page reformat ("Week at a glance")

Today (lines 654–711) it's a flat vertical list of 18 rows, each row: 2-digit index + title + 2-line `remember` line + hairline. By slide 12+ it pages over and looks like a spreadsheet.

Change to a **two-column scannable index** with grouping:
- Header unchanged: "Week at a glance" + brand rule.
- Intro line stays.
- Body splits into 2 columns. Each entry becomes a compact tile (no fill, hairline left rule in brand colour 2pt wide):
  - Top row: `01` (8pt subtle) · slide title (10.5pt bold ink, Title Case, clipped to 2 lines)
  - Below: one-line takeaway (9pt muted, 1 line clipped, ellipsis)
  - Bottom-right of tile: a tiny DTOP/footprint chip when `meta.dtop` exists (7pt brand chip)
- Tile height ~52pt. 2 columns × ~9 tiles = 18 slides on one A4 page. W2 (8 slides) and W3 (15 slides) also fit.
- If a week ever exceeds 18, second contents page is added with the same grid.
- One-liner takeaway sourced from `studyNote.inOneSentence` (preferred) falling back to `cc.remember`, sanitised and clipped.

Acceptance: contents page reads as a 2-column scannable grid, every slide visible on a single page for W1 (18), W2 (8), W3 (15).

---

## 4. Transcript page — break up the wall of text

Today (lines 1748–onwards) paragraphs are dumped at 10pt with 14pt leading, full content width (~515pt). Long paragraphs become wall-of-text blocks.

Changes in `renderSlideTranscriptPage`:
- **Narrower measure for readability** — use a single column constrained to ~440pt (centered) instead of full ~515pt. Better reading line length (~70 chars).
- **Paragraph break sweetener** — after each paragraph add 8pt vertical air (currently only line leading carries over).
- **Drop cap for paragraph 1** — first paragraph gets a 2-line drop initial in brand blue (16pt bold), rest of body at 10pt slate. Visually anchors the start.
- **Pull quote every ~4 paragraphs** — extract the first sentence of paragraph index 3 (and 7 if present) and render it as a 12pt italic ink pull-quote with a 2pt brand left bar, 10pt padding either side. Pulls air into the page and breaks the grey block.
- **Section dividers** — when a paragraph starts with a coach-script cue word (the existing `CUE_OPENERS` like `"core message:"`, `"say it like this:"`, `"watch out for:"`, `"bridge to next:"`, `"why this matters:"`), strip the cue and render a one-line eyebrow above the paragraph (`Core message`, `Say it like this`, etc.) in 7pt brand. This converts the 5-part coach format into visible sections instead of running prose.
- **Justification** — left-aligned (current). Do NOT justify, that creates rivers at this width.
- **Continuation page** — already supported; header eyebrow becomes "Coach transcript · continued" (sentence case).

Acceptance: a typical 350-word transcript page now reads as a narrow column with a drop cap, 1–2 eyebrow section labels, and at most one pull quote; no paragraph runs more than ~6 lines without visual relief.

---

## Technical changes

`src/lib/fieldKitPdf.ts` only. No data files touched.

1. **`renderSlidePagePortrait`**
   - Remove `title.toUpperCase()`; render title as-is.
   - Move Check Yourself block above the body; replace `roundedRect` fill with hairline rule-only style.
   - Recompute `bodyTop` / `bodyBottom`; drop the bottom reserve.
   - Rename eyebrow labels per §1.

2. **`renderSlideTranscriptPage`**
   - Remove `title.toUpperCase()` (two places).
   - Switch body to a centered ~440pt column.
   - Add `drawDropCap(pdf, x, y, char)` helper; apply to paragraph 0.
   - Add `drawPullQuote(pdf, x, y, w, text)` helper; apply on para 3 (and 7 if exists).
   - Detect cue-opener paragraphs (reuse the existing `CUE_OPENERS` regex set), strip the cue, prepend a 7pt brand eyebrow.
   - Add 8pt paragraph spacing.

3. **Week at a glance (lines 651–713)**
   - Rewrite as a 2-column tile grid (`tileW = contentW/2 - 8`, `tileH ≈ 52`).
   - Use `studyNote.inOneSentence` (already imported via `buildStudyNote`) as the takeaway line per tile.
   - Add a small DTOP/footprint chip when `meta.dtop` is set (reuse existing `SLIDE_META` lookup — already loaded for slide pages).

4. **Cover page (lines 540–648)**
   - Re-case the brand wordmark, eyebrow chips, and section labels per §1 (`Comply365`, `Week ${n} · Field Kit`, `How to use this kit`, `Card legend`, `Locked terminology — use these, never the others`).

5. **Out of scope**
   - `salesEnablementStudyNotes.ts`, `salesEnablementNarration.ts`, `salesEnablementCoachCards.ts`, `salesEnablementSlideAids.ts` — untouched.
   - Glossary appendix, Sell & Win appendix — untouched.
   - PPTX exporters, slide React components — untouched.

---

## Validation

1. Generate W1, W2, W3 PDFs via `scripts/genpdf.ts` (or the UI download buttons on `/sales-enablement`).
2. Render each page to PNG at 150 dpi and inspect:
   - No accidental ALL-CAPS in titles or body copy on any page.
   - Check Yourself sits directly under the title strip on every slide page.
   - Contents page fits on one A4 for W1/W2/W3 with no overflow.
   - Transcript pages have a drop cap, visible section eyebrows where cues exist, no paragraph blob exceeds ~6 lines.
3. Spot-check Comply365 / SafetyManager365 / ContentManager365 casing in titles and contents.
