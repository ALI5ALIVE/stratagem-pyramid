## Fix "YOU ARE HERE" flag sizing

The flag polygon in `SEW3RoadmapVisionFrame.tsx` (lines 75–81) is too narrow — the "YOU ARE HERE" and "most buyers, honestly" text overflows the right edge of the yellow banner.

### Change

In `src/components/sales-enablement-slides/SEW3RoadmapVisionFrame.tsx`, widen the flag polygon and notch so both text lines sit comfortably inside:

- Polygon: extend right edge from `260` → `310`, adjust notch points accordingly (`300,270 310,300`).
- Keep text x positions (`172`) and left edge (`165`) unchanged.

Result: flag becomes ~145px wide instead of ~95px, fully containing both labels with padding.