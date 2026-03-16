

# Fix CoAnalyst Slides Overflowing Viewport

## Problem
Several slides have content that extends beyond the viewport height, getting cut off by the `h-screen overflow-hidden` constraint on `SlideContainer`. The slides using `!h-auto !min-h-screen !overflow-visible` break the snap-scroll system entirely.

**Affected slides:**
- **Slide 4 (Product Positioning)** — 6 framework cards + large positioning statement overflow
- **Slide 5 (Messaging Architecture)** — 5 pillar columns too tall
- **Slide 11 (Taglines)** — uses overflow hack, breaks snap scrolling
- **Slide 13 (Visual Narrative)** — uses overflow hack, breaks snap scrolling

## Approach
Reduce content density and font sizes so everything fits within a single viewport (`h-screen`). Remove all `!h-auto !min-h-screen !overflow-visible` overrides — every slide must snap properly.

### Slide 4 — Product Positioning
- Reduce framework card padding from `p-4` to `p-3`
- Reduce text sizes to `text-[11px]`
- Shrink the positioning statement box padding and font sizes

### Slide 5 — Messaging Architecture
- Reduce master message padding
- Shrink pillar card padding and text sizes
- Keep the 5-column grid but make content more compact

### Slide 11 — Taglines
- **Remove** `!h-auto !min-h-screen !overflow-visible`
- Reduce tagline/headline text to `text-xs`
- Shrink elevator pitch cards with smaller padding and text
- Use tighter spacing throughout

### Slide 13 — Visual Narrative
- **Remove** `!h-auto !min-h-screen !overflow-visible`
- Switch from 2-column to 4-column grid
- Drastically reduce card content — show only title, purpose, and headline (drop "What It Shows" and "Suggested Layout")
- Use smaller text and tighter padding

## Files to edit
- `src/components/coanalyst-slides/CASlide4ProductPositioning.tsx`
- `src/components/coanalyst-slides/CASlide5MessagingArchitecture.tsx`
- `src/components/coanalyst-slides/CASlide11Taglines.tsx`
- `src/components/coanalyst-slides/CASlide13VisualNarrative.tsx`

