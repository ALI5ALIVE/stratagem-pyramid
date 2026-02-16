
# New "Value Deck" — Combined Strategy + ROI Slides

## Overview
Create a new slide deck at `/value-deck` that cherry-picks slides from the Strategy Deck and embeds the interactive Line of Sight components as full-screen slides. The deck will have 9 slides total.

## Slide Sequence

| # | Label | Source | Component |
|---|-------|--------|-----------|
| 0 | Title | New | New title slide for this deck |
| 1 | Strategic Shift | Strategy Deck | `Slide1StrategicShift` |
| 2 | Before & After | Strategy Deck | `Slide2BeforeAfter` |
| 3 | Operational Intelligence Layer | Strategy Deck | `Slide3OperatingModel` |
| 4 | Use Cases in Action | Strategy Deck | `SlideUseCases` |
| 5 | Operational Performance Ladder | Strategy Deck | `Slide4ValuePyramid` |
| 6 | What This Means for Customers | Strategy Deck | `Slide7Customers` |
| 7 | Line of Sight Calculator | Line of Sight | `SlideLineOfSight` |
| 8 | Balanced Scorecard | Line of Sight | `BalancedScorecard` |
| 9 | Performance Shift | Line of Sight | `PerformanceShiftCurve` |

## Technical Details

### New Files

1. **`src/pages/ValueDeck.tsx`**
   - Scroll-snap deck container (same pattern as `SlideDeck.tsx` and `SalesDeck.tsx`)
   - Manages shared state for the interactive slides (slides 7-9): `useCaseValues`, `airlineProfile`, `leadingValues`, `totalCostAvoidance` -- same logic currently in `LineOfSightPage.tsx`
   - Slides 0-6 are standard full-screen slide components rendered directly
   - Slides 7-9 are wrapped in full-height snap containers so the Calculator, Scorecard, and Bell Curve each occupy one full viewport
   - Registers slides with `SlideNavigationContext` for sidebar sub-navigation
   - Includes narration support via `useSimpleNarration`
   - Keyboard navigation (Arrow keys) and scroll-snap behavior

2. **`src/components/value-slides/ValueSlide0Title.tsx`**
   - Title slide branded with the Comply365 logo
   - Title: "Operational Performance Platform" (or similar, avoiding "OPP")
   - Subtitle referencing the value/ROI focus
   - Interactive agenda grid listing the 9 slides, clickable to navigate

### Modified Files

3. **`src/App.tsx`**
   - Add route: `/value-deck` pointing to the new `ValueDeck` page

4. **`src/components/AppSidebar.tsx`**
   - Add a new sidebar nav item: "Value Deck" with a suitable icon (e.g., `DollarSign` or `Target`) linking to `/value-deck`

### No Changes Needed
- All existing slide components (`Slide1StrategicShift`, `Slide2BeforeAfter`, etc.) are reused as-is -- they already accept narration props
- The Line of Sight components (`SlideLineOfSight`, `BalancedScorecard`, `PerformanceShiftCurve`) are reused as-is with their existing props interfaces
- The shared state logic is copied from `LineOfSightPage.tsx` into the new deck page

### Key Considerations
- The Calculator slide (slide 7) is interactive with sliders; user adjustments will flow through to the Scorecard (slide 8) and Performance Shift curve (slide 9) since they share state
- Each interactive slide occupies a full viewport height with `snap-start` for smooth deck-style navigation
- The title slide will include an `onNavigateToSlide` handler for the clickable agenda items, matching the pattern in the Strategy Deck's title slide
