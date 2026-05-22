## What's wrong with the current 1-pager

The current `renderSlidePagePortrait` (in `src/lib/fieldKitPdf.ts`) builds a portrait A4 with 7 stacked sections plus 56pt margins. The visual result is loose because:

- **Fixed reserves, elastic middle.** The bottom is hard-reserved for the 2×2 grid (138pt) + check band (60pt) + footer. The "Ideas you must own" block in the middle stretches to absorb whatever is left, so when curated content is short, ideas get over-spaced and the whole page reads empty.
- **Heading-heavy.** Every section has its own SECTION LABEL + accent rule + 14pt of padding. Seven of them stacked = ~100pt of pure labelling chrome.
- **Round-rect cards with thick padding** (`splitBlockH = 116`, `rowH ~63`) waste vertical space because text inside is only 8.5pt — most cards sit half-empty.
- **No use of the right margin** — the title row, takeaway, and ideas all run full-width even when the text is short.
- **No transcript** of the narration is included anywhere; reps only get a 1-line italic echo.

---

## Proposed redesign — denser editorial 1-pager + transcript page

### Page 1 — the study sheet (single page, no white-space sag)

Switch from "stacked sections with reserves" to a **two-column editorial layout** with a fixed left rail and a flowing right column. Margins drop from 56pt to 40pt (sides) / 44pt (top/bottom). All section labels become inline mini-tags on the left rail rather than full-width banners.

```text
┌──────────────────────────────────────────────────────────────┐
│ COMPLY365 · ACADEMY                W1 · Slide 04 / 18 · DTOP │
├──────────────────────────────────────────────────────────────┤
│ 04                                                           │
│ ─── DTOP — DETECT TRIGGER ORCHESTRATE PROVE                  │
│                                                              │
│ ┌── LEFT RAIL (38%) ────┐ ┌── RIGHT COLUMN (62%) ──────────┐│
│ │ TAKEAWAY              │ │ WHAT'S ON THE SLIDE            ││
│ │ DTOP is the closed    │ │ • 4 connected stages D→T→O→P   ││
│ │ loop from signal to   │ │ • Closed loop arrow back       ││
│ │ verified outcome…     │ │ • Signal-source inputs feed D  ││
│ │                       │ │                                ││
│ │ WHY A BUYER CARES     │ │ THE IDEAS YOU MUST OWN         ││
│ │ Workflow tools move   │ │ 01 Detect fuses 4 signal srcs  ││
│ │ tasks but don't fuse  │ │ 02 Trigger turns signal → cited││
│ │ signals or produce    │ │    next action                 ││
│ │ regulator-ready proof │ │ 03 Prove closes the loop       ││
│ │                       │ │                                ││
│ │ WATCH-OUT             │ │ KEY TERMS                      ││
│ │ Don't pitch DTOP as   │ │ Detect · …    Trigger · …      ││
│ │ "workflow with a      │ │ Orchestrate · … Prove · …      ││
│ │ fancy name". Never    │ │                                ││
│ │ FOQA/FDM/ASAP.        │ │ DEFENSIBLE FACTS               ││
│ │                       │ │ • Only loop with Detect+Prove  ││
│ │ CONNECTS              │ │ • Point tools cover 1/4 sources││
│ │ ← Signal Sources      │ │ • Whiteboard colours D/T/O/P   ││
│ │ → Whiteboard Drill    │ │                                ││
│ │ → Value Unlocked      │ │                                ││
│ └───────────────────────┘ └────────────────────────────────┘│
├──────────────────────────────────────────────────────────────┤
│ CHECK YOURSELF  ☐ q1     ☐ q2     ☐ q3                       │
│ W1 · Foundation · Study Notes                Page 6 · 1 of 2 │
└──────────────────────────────────────────────────────────────┘
```

Key density moves:

1. **Two-column body** — left rail (≈38% width) carries the four "buyer-facing" anchors (Takeaway, Why a buyer cares, Watch-out, Connects). Right column (≈62%) carries the three "rep-facing" study blocks (What's on the slide, Ideas you must own, Terms + Facts).
2. **Inline mini-tags** — small caps 7pt label flush left with a 2pt brand-coloured square instead of full-width accent rules. Saves ~80pt.
3. **No box chrome.** Replace round-rect cards with single 0.5pt hairline dividers between blocks. The current `drawStudyBlock` filled cards are dropped.
4. **Tighter type rhythm.** Body 9pt / 11.5pt line. Headings 11pt. Takeaway sits at 12pt bold ink (down from 11pt bold but with much less whitespace around it).
5. **Check-yourself becomes a single horizontal strip** at the bottom (3 inline checkboxes) — drops from 60pt to ~28pt.
6. **Page indicator gains "1 of 2"** to signal the transcript continuation.

A height-aware overflow rule pre-measures content and trims in this order before clipping: `facts → terms → connects → keyIdeas → whatsOnSlide`. Takeaway, Why-it-matters, Watch-out, and Check-yourself are never trimmed.

### Page 2 — full narration transcript

New page added **immediately after** every slide 1-pager (so the PDF runs: slide-1 study, slide-1 transcript, slide-2 study, slide-2 transcript, …).

```text
┌──────────────────────────────────────────────────────────────┐
│ COMPLY365 · ACADEMY                W1 · Slide 04 / 18 · DTOP │
├──────────────────────────────────────────────────────────────┤
│ 04 / DTOP — DETECT TRIGGER ORCHESTRATE PROVE                 │
│ TRANSCRIPT — COACH NARRATION (verbatim)                      │
│                                                              │
│ ~3 min · spoken script                                       │
│ ────────────────────────────────────────────                 │
│                                                              │
│ This is the operating model that turns every signal into a   │
│ verified outcome. Detect fuses four signal sources…          │
│                                                              │
│ [continues, paragraph-broken, 10pt slate, 1.45 leading,      │
│  two columns if it spills past 600pt, page-break with        │
│  "Transcript continued ·" header on overflow]                │
│                                                              │
│ ────────────────────────────────────────────                 │
│ Tip — read this once before you record yourself; don't read  │
│ it on the call.                                              │
│                                                              │
│ W1 · Foundation · Transcript                  Page 7 · 2 of 2│
└──────────────────────────────────────────────────────────────┘
```

Behaviour:

- Pulls `getSalesEnablementNarration(slideId).script` (already exists, used elsewhere in this file).
- Sanitised through the existing `sanitize()` helper, split on blank lines into paragraphs, justified left, 10pt slate, 14pt leading.
- If the script overflows one page, automatically wrap to a second transcript page with `Transcript continued` header — natural paragraph break only, never mid-sentence.
- If a slide has **no narration script** (rare), the transcript page is skipped silently (no blank page, no "no transcript available" stub).
- Header reuses the same brand bar as page 1 so the spread reads as a single chapter.

### Cover-page copy update

Update the "How to use this kit" block in `buildWeekFieldKitPdf` cover page to say:

> Every slide has two pages: a one-page study sheet (takeaway, what's on the slide, ideas, terms, facts, watch-out, self-check) followed by the full coach transcript for memorisation and self-recording.

---

## Technical changes

**1. `src/lib/fieldKitPdf.ts`**

- Rewrite `renderSlidePagePortrait` to the 2-column layout above. Drop `drawStudyBlock` (round-rect cards) and replace its callers with a new `drawRailBlock(pdf, x, y, w, label, accent, body)` helper that draws a 7pt label + 2pt accent square + body text and returns the consumed height.
- Replace the fixed `splitBlockH = 116` / `gridH = 138` / `checkBandH = 60` reserves with a **measure-then-place** pass: pre-measure each block at target font sizes, allocate from a single content budget, apply the trim order above only if total exceeds budget.
- Add `renderSlideTranscriptPage(pdf, { week, slideIndex, slideCount, title, script })`. Called from the same loop where `renderSlidePagePortrait` is invoked (around line 724), only when `getSalesEnablementNarration(slideId)?.script` exists.
- Update the page-number footer to render `Page N · 1 of 2` / `Page N+1 · 2 of 2`.
- `drawBottomBlock` is retained but only used by appendices (Glossary, Sell & Win) — those pages don't change.

**2. Cover page (`buildWeekFieldKitPdf`)**

- Update the instructional sub-copy to mention the two-page-per-slide structure.
- Update the estimated page count line if one exists.

**3. Out of scope**

- `salesEnablementStudyNotes.ts` — no data shape change. `whatsOnSlide`, `keyIdeas`, `terms`, etc. stay as they are.
- `salesEnablementNarration.ts` — no change.
- `CoachCardPanel.tsx`, slide components, other PDF exports (DTOP, exec, customer-overview, tech) — no change.
- Glossary and W3 Sell & Win appendices — no change.

---

## Validation

1. Generate W1 / W2 / W3 PDFs.
2. Convert to images at 150dpi and inspect every slide spread (study page + transcript page) for:
   - No white-space sag — content fills the page edge to edge.
   - Transcript page never starts mid-sentence; overflow page header reads "Transcript continued".
   - Check-yourself strip never gets cut.
   - Page numbering `1 of 2` / `2 of 2` is correct for slides with and without narration.
3. Spot-check 6 slides across the three weeks (cover-adjacent, DTOP, capability tour, footprint, objections, capstone).
4. Confirm the appendices (Glossary, Sell & Win) still render unchanged.
