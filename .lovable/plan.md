

# Fix Overlapping Baseline/Improved Labels on Performance Shift Chart

## Problem
The two vertical reference lines on the bell curve chart both have their labels positioned at `"top"`. When the baseline and improved means are close together (which they are by default before sliders are adjusted), the two text labels ("Baseline: 62" and "Improved: 62") overlap and become unreadable.

## Solution
Offset the two labels vertically so they never overlap:

### File: `src/components/slides/PerformanceShiftCurve.tsx`

**Change 1 -- Baseline ReferenceLine label (line 228-232)**
- Move the baseline label position to `"insideTop"` and add a vertical offset (`dy: -20`) so it sits higher above the chart area

**Change 2 -- Improved ReferenceLine label (line 239-243)**
- Keep the improved label at `"insideTop"` but with a lower offset (`dy: -6`) so it sits below the baseline label

This creates a clear two-line stacking:
```
Baseline: 62    (higher)
Improved: 65    (lower, in green)
```

Even when the two means are identical, the labels will be vertically separated and fully readable.

## Files Changed
1. `src/components/slides/PerformanceShiftCurve.tsx` -- adjust label positions on the two ReferenceLine components
