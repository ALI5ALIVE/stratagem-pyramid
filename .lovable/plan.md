## Goal
Make the Coach transcript pages in the Field Kit PDF easy to scan, chunk, and rehearse — instead of dense, intimidating prose.

## What changes (all in `src/lib/fieldKitPdf.ts`, `renderSlideTranscriptPage`)

### 1. Add a "Read this in 60 seconds" TL;DR strip
Above the transcript body, render a 3-bullet summary derived from the script:
- **Core message** — first sentence of paragraph tagged "Core message" (or paragraph 1 fallback)
- **Say it like this** — sentence from the matching cue (or first quoted phrase in the script)
- **Bridge** — sentence from "Bridge to next" cue (or last sentence)

Compact 3-column or stacked block with brand-tinted background, ~55pt tall. Lets the rep grok the slide before reading the full script.

### 2. Restructure cues as visual section cards, not eyebrows
Currently cues render as a tiny 7pt label above flowing prose. Upgrade to:
- A left-aligned **chip** (rounded rect, brand-tinted fill, 8pt bold caps-free label)
- Followed by the body paragraph in standard prose
- A 6pt vertical gap between sections plus a faint hairline divider so each cue reads as a self-contained "beat"

Cue chips get color-coded by intent:
- Why this matters / Core message → brand blue
- The pain / Watch out for → amber
- The value lever / Say it like this → emerald
- Bridge to next / Delivery tip → muted slate

### 3. Bold the key phrase in each paragraph
After splitting a paragraph into lines, detect the first quoted phrase (`"…"`) or the first em-dash clause and render it in **bold ink** inline. This gives the eye an anchor per paragraph without re-writing copy.

If no natural anchor exists, bold the first 4–6 words of the paragraph (sentence stem) — same effect as a lead-in.

### 4. Replace big pull-quotes with a single "Money line" callout
Drop the auto pull-quotes at paragraphs 3 and 7 (often arbitrary). Instead, pick **one** money line: the sentence from the "Say it like this" cue, or the longest quoted phrase in the script. Render once, near the middle of page 1, as a branded italic callout with a left brand bar. Skip if none found.

### 5. Tighter, more rhythmic typography
- Body: 10.5pt / 15pt leading (was 10/14) — easier on the eye
- Paragraph air: 12pt (was 10)
- Measure: keep ~440pt column
- First-line indent removed; rely on whitespace + cue chips for chunking
- Add a thin numbered tick (`01`, `02`, …) in the left margin next to each cue section so reps can reference "section 3" while rehearsing

### 6. Footer micro-coaching
Replace the static "Read once to memorise…" with a rotating one-line tip per page:
- Page 1: "Read aloud once. Mark the breath points with a slash."
- Page 2+: "Record yourself. Play back at 1.25× — does it still land?"

### 7. Header meta upgrade
Add a small "Difficulty / pacing" indicator next to `~X min spoken · Y words`:
- ≤120 wpm target → "Pace: deliberate"
- 120–160 → "Pace: conversational"
- >160 → "Pace: brisk — slow down"
Computed from word count vs. estimated minutes.

## Out of scope
- Study-sheet (page 1) layout — already refined last pass
- Narration audio, slide content, or `salesEnablementNarration.ts` copy
- Field-kit cover, contents page, week dividers in the PDF

## Files touched
- `src/lib/fieldKitPdf.ts` only (function `renderSlideTranscriptPage` + a couple of small helpers nearby)

## QA
After implementation: regenerate the kit, convert pages 4, 6, 8 (transcript pages) to images at 150dpi, and check: chip alignment, money-line placement, no orphaned cue chips at page bottom, no clipped text, footer tip rotation works.
