## Goal
Make the Teaching Summary on each Field Kit one-pager easier to scan by rendering it as bullet points instead of a justified paragraph.

## Why
Today the summary is a 6–12 line wall of small (9pt) prose. Reps skimming between calls can't pick out the beats. Bullets force one idea per line, mirror the rest of the page (Questions, Objections, Proofs are already bulleted), and make the "core message / pain / value lever" structure visible.

## Approach

**1. Convert paraphrase output to an array of bullets** (`src/lib/fieldKitPdf.ts`, around `paraphraseNarration`)

Add a sibling helper `paraphraseNarrationBullets(script, maxBullets = 7)` that:
- Runs the same filler stripping + voice shift as today.
- Splits into sentences, dedupes, drops fragments < 25 chars.
- Promotes the labelled sentences (`Core message:`, `Pain:`, `Value lever:`) to the top, in that order — and strips the label prefix so the bullet reads cleanly (the label becomes a **bold lead-in** rendered separately).
- Returns `Array<{ lead?: "Core" | "Pain" | "Value" | "Proof"; text: string }>`.
- Caps at ~7 bullets, each trimmed to ~140 chars with a soft ellipsis if needed.

Keep the existing `paraphraseNarration` for any other caller, but the PDF will switch to the new bullet version.

**2. Render bullets in the Teaching Summary block** (same file, lines ~710–723)

Replace the `pdf.splitTextToSize` paragraph render with a small bullet renderer:
- For each bullet, draw a 3pt filled square (brand colour) at `leftX`, vertically centred on the first line.
- If the bullet has a `lead` ("Core" / "Pain" / "Value"), draw it bold in `C.ink` followed by ` — `, then the body in `C.slate` regular. Wrap onto a 2nd line if needed (max 2 lines per bullet).
- Use 9.5pt, lineHeight 1.3, ~5pt gap between bullets.
- Height-fit: compute `availH = summaryBottom - ly`, then drop the lowest-ranked bullets until the stack fits. Never overflow into the Whiteboard block.
- If fewer bullets than space allows, slightly increase gap so the block still reaches `summaryBottom` (keeps the no-white-space rule).

**3. Label tweak**

Rename the section header from `TEACHING SUMMARY` to `TEACHING SUMMARY — KEY BEATS` so the bullet format reads as intentional.

## Out of scope
- No changes to data files, narration content, right column, meta strip, or any other slide block.
- No font swaps, no new colours.
- Cover page, week-at-a-glance, and closing page unchanged.

## Files touched
- `src/lib/fieldKitPdf.ts` — new `paraphraseNarrationBullets` helper + bullet renderer in the left column.

## Verification
Regenerate the Week 1 Field Kit PDF, rasterise slides 1, 4, 6, 10 to PNG, and visually confirm:
- Bullets render with square markers and bold leads where applicable.
- No overflow into the Whiteboard block.
- Left column still reaches the bottom (no dead band).
