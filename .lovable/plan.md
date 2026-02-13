

# Fix: Cost Reduction Label Overlapping X-Axis

## Problem
The "Cost Reduction" arrow annotation (`← Cost Reduction →`) is positioned with `dy: 15` and `position: "insideBottom"`, which pushes it down onto the X-axis labels, making both unreadable.

## Solution
Change the `dy` value from `15` to `-15` so the label sits above the bottom of the chart area instead of overlapping the axis.

## Technical Details

### File: `src/components/slides/PerformanceShiftCurve.tsx`

In the "Cost Reduction" `ReferenceLine` label config (around line 256), change:

```typescript
// Before
dy: 15,

// After
dy: -15,
```

One-line change.

