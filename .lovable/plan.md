

# Fix: Bell Curve Not Updating When Sliders Change

## Problem
The Recharts `Area` components have animation enabled (`animationDuration={800}`), which causes Recharts to try to animate between data states. Recharts often fails to re-render the curves properly on data updates because its internal animation state gets stuck -- the data is recalculated correctly (the tooltip values update) but the visual curves don't redraw.

## Solution
Disable animation on both `Area` components by setting `isAnimationActive={false}`. This ensures the curves redraw immediately whenever the underlying data changes from slider adjustments.

## Technical Details

### File: `src/components/slides/PerformanceShiftCurve.tsx`

1. On the **baseline** `Area` component (line 250-257): replace `animationDuration={800}` with `isAnimationActive={false}`
2. On the **improved** `Area` component (line 259-266): replace `animationDuration={800}` with `isAnimationActive={false}`

This is a two-line change that fixes the root cause -- Recharts animation state preventing visual updates on data changes.

