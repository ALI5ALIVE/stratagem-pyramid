## Goal
Make the AI Solutions column and its 6 solution chips visually dominant in the downloadable PPTX so they read as the hero of the slide.

## Changes (PPTX only — `src/exporters/pptx/buildAIInfographicDeck.ts`)

### 1. Promote the AI Solutions column container
- Give the solutions column a distinct treatment vs. the three product columns:
  - Fill with `C.primarySoft` (subtle blue tint) instead of plain `C.surface`.
  - Thicker border in `C.primary` (1.5pt) with larger radius (0.2).
  - Add a soft glow effect via a slightly larger offset rectangle behind the card (faux shadow using a `C.primary` rect at low-alpha-like darker tone).
- Replace the flat blue header bar with a bolder header: taller (0.6), `C.primary` fill, white uppercase tracked title "AI SOLUTIONS" at 16pt bold, with a small white underline accent.

### 2. Make the 6 solution chips pop
- Increase chip height from 0.46 → 0.6 and reduce gap so column still fits.
- Switch chip background from `C.surfaceAlt` to white (`FFFFFF`) for maximum contrast against the tinted column.
- Widen the colored accent bar from 0.09 → 0.18 and add a small filled circle/dot (solution color) to the left of the label.
- Label: bump font from 11 → 13, bold, color `C.bg` (dark) so it reads strongly on white.
- Add subtle drop-shadow effect via a 1px offset duplicate rect behind each chip in `C.border`.

### 3. De-emphasize product columns slightly (relative contrast)
- Keep product column headers but switch their header fill from `C.primary` to `C.surfaceAlt` with `C.muted` text, so the only blue headers on the slide belong to AI Solutions.
- Product capability rows: keep current style but drop label weight to regular (non-bold) so solution chips dominate.

### 4. Keep unchanged
- Layout grid, 4-column structure, column widths, arrow logic (`drawArrow` with flipH/flipV), legend, "No AI" chip placement, data, web route, and `AICapabilitiesMatrix` component.

## QA
After build, render the single slide to JPG via LibreOffice + pdftoppm and visually confirm:
- AI Solutions column is the clear focal point.
- All 6 chip labels are legible with strong contrast.
- Arrows still land on the correct ContentManager365 rows.
- Nothing clips at column bottom (chip height increase fits within `gridH`).
