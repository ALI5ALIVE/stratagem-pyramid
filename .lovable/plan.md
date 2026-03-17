

# Remove Contents Cards from CoAnalyst Title Slide

## Change

**File:** `src/components/coanalyst-slides/CASlide0Title.tsx`

- Remove the `sections` array (lines 6–21) and all related icon imports
- Remove the grid of 14 section cards (lines 75–89)
- Remove the `onNavigateToSlide` prop since it's only used by the cards
- Keep: headline, subtitle, tagline, logo, play button, scroll indicator, background effects

This simplifies the title slide to a clean hero layout matching the style of the other deck title slides (e.g., OpsSlide0Title).

