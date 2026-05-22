## Root cause
In `src/exporters/pptx/buildAIInfographicDeck.ts`, the 6 AI solution chips at 0.5" each + 0.12" gaps exactly fill the column's inner height (3.6"). The "No AI" chip is then placed near the bottom and **overlaps** the last 1–2 colored chips. That's the squashing/overlay you're seeing.

## Fix

### Render all 7 chips in one pass (no separate bottom placement)
- Build `const allChips = [...aiSolutions, noAISolution]` and render them in a single loop.
- Compute chip height dynamically so all 7 fit cleanly:
  - `available = gridBottom - (gridTop + 0.15 + solHeaderH + 0.25)` (≈ 3.6")
  - `solChipGap = 0.1`
  - `solChipH = (available - solChipGap * 6) / 7` (≈ 0.43")
- For `tier === "noai"`: render with `C.surfaceAlt` fill + dashed `C.muted` border + muted center label (current "No AI" treatment), no white dot.
- For `tier === "ai"`: keep filled colored chip + white dot + white bold label.

### Spacing safety
- Drop label font from 12 → 11.5 (still bold) so it never clips the smaller chip height. Keep dot at 0.16 to match.
- Keep "AI SOLUTIONS" header at 14pt and the 0.5" header bar.

### Remove dead code
- Delete the standalone "No AI chip near bottom" block entirely.
- `solCenters["noai"]` is now populated inside the unified loop, so arrows still resolve.

## Verification
1. Build the PPTX via the existing route, convert to PDF/JPG with LibreOffice + pdftoppm, and inspect slide-01.
2. Confirm: 7 chips evenly spaced, no overlap, no element extends past the column bottom, "No AI" visually distinct from AI chips, arrows still land on correct product rows.

## Out of scope
Web component, data, product columns, arrows, legend, header — unchanged.
