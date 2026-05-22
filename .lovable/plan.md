## Goal
Rebuild the Coach transcript page as a **Beat Sheet** — what a rep actually wants when memorising a slide. Stop pretending it's a document. It's a script broken into bite-sized, self-contained beats they can rehearse one at a time.

## The mental model (think like a rep)
A rep doesn't read the transcript top-to-bottom. They:
1. Skim it once to get the shape of the argument
2. Rehearse it in chunks until each chunk lands
3. Glance down mid-call only to grab a phrase, a stat, or a question to ask
4. Want exact words for the hard bits; a paraphrase is fine for the rest

The current page (chips + bold first sentence + dividers) is still document-shaped. The Beat Sheet flips it into rehearsal-shaped.

## Anatomy of a Beat
Each beat is a self-contained card stacked vertically down the page:

```text
┌──────────────────────────────────────────────────────────┐
│ 03   THE PAIN · ~25s · amber rail                        │
│ ──────────────────────────────────────────────────────── │
│ Intent · One line: why this beat exists.                 │
│                                                          │
│ ▸ SAY                                                    │
│   "The verbatim words to say, with stats like 90%       │
│   and product names like Comply365 highlighted          │
│   so the eye catches them."                              │
│                                                          │
│ Watch for · One short coaching note. Pause cue if any.   │
└──────────────────────────────────────────────────────────┘
```

Five fixed parts per beat — same order every time, so the rep's eye learns the rhythm:
1. **Number + label + duration** in a coloured rail header (so they know where they are)
2. **Intent** — one muted line: *why* this beat exists in the argument
3. **SAY block** — the verbatim words, tinted background, larger type (10.5pt), stats/numbers/product names auto-bolded in ink
4. **Watch for** — one line of coaching: objection, pause, pitfall, or bridge cue (only if present)
5. Hairline gap to the next beat

## How beats are derived from the existing script
No copy changes required. The script's existing cue prefixes drive the split:
- `Why this matters:` / `Core message:` → **anchor** beats (brand blue rail)
- `The pain:` / `Watch out for:` → **risk** beats (amber rail)
- `The value lever:` / `Say it like this:` → **value** beats (emerald rail)
- `Bridge to next:` / `Delivery tip:` → **bridge** beats (slate rail)
- Untagged paragraphs become unlabelled beats with no header rail, just a number

The first sentence after the cue becomes the **Intent** line. The remainder becomes the **SAY block**. If the paragraph contains a quoted phrase (`"…"`), that quoted phrase becomes the SAY block verbatim and the prose around it becomes Intent. `Watch out for` and `Delivery tip` paragraphs render their body as the **Watch for** line (no SAY block — they're coaching, not script).

Per-beat duration estimate = `Math.max(8, round(words / 2.5))` seconds at ~150 wpm. Shown in the rail header so the rep can pace.

## Auto-highlighting inside the SAY block
The SAY block draws as wrapped lines, but specific tokens render in **bold ink** instead of slate so they jump off the page:
- Percentages and ratios: `90%`, `~35%`, `2.5×`
- Whole-number stats: `$25–35B`, `40 hours`
- Product/brand names: `Comply365`, `SafetyManager365`, `ContentManager365`, `DTOP`, `Insights & Intelligence`, `Regulation Management`, `Unified Mobile`
- Quoted phrases: anything inside `"…"` or `"…"`

Implementation: split the SAY string into tokens, render token-by-token with `getTextWidth` for x-advance, switching font weight on matches. Line-wrap manually (track current x, break when next token would exceed `colW`).

## Page-level structure
- **Header** stays as-is (week · slide · "Coach transcript · 2 of 2"), but the meta line becomes: `~X min · Y words · N beats · Pace: conversational`.
- **Drop the TL;DR strip and money line** — they were trying to solve the same problem the Beat Sheet now solves natively. The first 1–2 beats *are* the TL;DR.
- **Beats stack** down the page in script order. Each beat is its own visual block, never split mid-block across pages — if it won't fit, push to the next page.
- **Footer** keeps the rotating coaching tip but adds the beat range: `Beats 1–4 of 8` on page 1, `Beats 5–8` on continuation.

## Typography & rhythm
- Intent: 9pt italic, muted
- SAY block: 10.5pt / 15pt leading, slate body with bold-ink highlights, on a `#F5F8FD` tint with a 3pt left rail in the beat's accent colour
- Watch for: 8.5pt, amber if risk-derived, muted otherwise, with a small `!` glyph
- Rail header: 7pt bold caps-free label + 7pt muted duration on the right
- Beat-to-beat gap: 14pt

## What gets deleted from the current code
Inside `renderSlideTranscriptPage` in `src/lib/fieldKitPdf.ts`:
- `drawTldr` and its parsed/coreP/sayP/bridgeP scaffolding
- `drawMoneyLine` and the `moneyLine` regex extraction
- `drawChip` (replaced by rail header inside each beat)
- `renderParagraph` with its first-sentence-bold logic
- The numbered tick in the left margin (number now lives in the rail header)

## What gets added
- `type Beat = { n; label?; group?; accent; intent; say?; watchFor?; durationSec }`
- `parseBeats(paragraphs): Beat[]` — applies the cue regexes, slices intent/say/watchFor as described
- `HIGHLIGHT_TERMS` array (product names) + regexes for stats/percentages
- `drawHighlightedLine(tokens, x, y, maxW)` — token-walker that switches weight per token and returns next y
- `drawBeat(beat): height` — renders one self-contained block, measures first so we can page-break cleanly
- `measureBeat(beat): number` — pure measurement pass for the page-break decision

## Out of scope
- Study sheet (page 1 of each slide pair) — already good
- Narration copy, cover, contents, week dividers
- Adding new highlight terms beyond the list above (extend later if needed)

## Files touched
- `src/lib/fieldKitPdf.ts` only

## QA
Regenerate the kit, rasterise pages 4, 6, 8, 10 at 150dpi, and check:
- No beat is split across a page break
- Highlights actually hit on a slide that mentions `Comply365`, `90%`, `~35%`
- A slide whose script has no cue prefixes still renders cleanly as unlabelled beats
- Beat duration sums roughly match the header `~X min` value
- Continuation page footer shows correct beat range
