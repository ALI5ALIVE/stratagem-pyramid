## Problem

On `Frame the Journey — Sell the Vision` (`SEW3RoadmapVisionFrame.tsx`), the "YOU ARE HERE" flag has two issues:
- The flag polygon spans y=245–275 (only 30px tall), but contains two text lines: "YOU ARE HERE" at y=262 (inside) and "most buyers, honestly" at y=290 (**outside / below** the flag).
- The result is the subtitle text floating under the flag instead of inside it.

The W1 version (`SERoadmapWhiteboardDrill.tsx`) has the same bug, but the user only flagged the W3 slide — scope stays on W3.

## Fix

In `src/components/sales-enablement-slides/SEW3RoadmapVisionFrame.tsx`, enlarge the flag polygon so both text lines sit inside it:

- Flag polygon: grow vertically from `165,245 255,245 245,260 255,275 165,275` to roughly `165,240 260,240 250,260 260,300 165,300` (taller, ~60px, keeps the notched right edge).
- Dashed pole line: extend `y2` from `245` to `240` to meet the new top edge.
- Keep "YOU ARE HERE" at ~y=262 and "most buyers, honestly" at ~y=285 so both are clearly inside the yellow flag fill.

No other changes (no narration, no W1 slide, no neighbouring slides).

## File touched

- `src/components/sales-enablement-slides/SEW3RoadmapVisionFrame.tsx` — single SVG `<g>` block for the flag.
