

# Fix Use Case Expansion Bug and Resize Measures/Cards

## Problems

1. **Parallel card expansion bug**: When expanding a use case card in a 4-column grid, the expanded content pushes adjacent cards but the grid layout means a card in the same row may stretch vertically with empty space (appearing as "opening with no text"). The fix is to make expanded cards span the full width below the grid row, so only one card expands at a time in an isolated area.

2. **Leading Measure pills too small**: The inline pills (e.g., "Fuel Variance 2.8%") are tiny at `text-[11px]` with minimal padding. Need to increase size.

3. **Use case cards too large**: Cards currently use `text-sm` for titles and generous padding. Need to reduce slightly.

## Changes

### File: `src/components/slides/SlideLineOfSight.tsx`

**1. Fix expansion — render expanded detail outside the grid**

- Remove the expanded detail section from inside each card (lines 394-456)
- Instead, render the expanded card's detail as a full-width panel below the grid (after line 460)
- This ensures only one card expands, and it doesn't distort adjacent cards in the grid
- The card itself just toggles the `expandedUseCase` state; the detail renders separately

**2. Enlarge Leading Measure pills**

- Increase pill text from `text-[11px]` to `text-xs` (12px)
- Increase padding from `px-2 py-0.5` to `px-3 py-1`
- Increase value font from `font-bold` at current size to `text-sm font-bold`
- Add the measure icon or a small indicator dot for visual weight

**3. Shrink Use Case cards slightly**

- Reduce title from `text-sm` to `text-xs`
- Reduce card padding from `p-2` to `p-1.5`
- Reduce slider label text and spacing
- Reduce cost impact line spacing

## Technical Details

The key architectural change is separating the expanded detail from the card grid. The pattern becomes:

```text
[Card 1] [Card 2] [Card 3] [Card 4]
[Card 5] [Card 6] [Card 7] [Card 8]
[======= Expanded Detail Panel (full width) =======]
```

The expanded panel renders conditionally based on `expandedUseCase` state, finding the matching use case data and rendering the same detail content (description, cost components, measures impacted, DTOP mechanism, point solution gap) in a full-width card below the grid.

This completely eliminates the "parallel card opens with no text" issue since the expansion never affects grid cell sizing.

