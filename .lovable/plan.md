

# Make Bell Curve More Granular and Responsive

## Problem
The chart X-axis spans from $0 to ~1.3x the baseline mean (e.g. $0 to $20M). With standard deviations at 8-12% of the mean, the two curves occupy only a small portion of the chart. Small slider adjustments produce tiny, barely visible shifts.

## Solution
Two changes to make the curves more responsive and visually distinct:

### 1. Tighten the Standard Deviations
Reduce the spread of both curves so they are sharper peaks. This makes even small shifts between Current and Improved clearly visible.

- Baseline: change from `0.12` to `0.05` (was 12% of mean, now 5%)
- Improved: change from `0.08` to `0.03` (was 8% of mean, now 3%)
- Lower the minimum floor values accordingly

### 2. Zoom the Chart to the Action Zone
Instead of spanning $0 to 1.3x baseline, zoom into just the region around the two curves:

- `chartMin` = the lower of the two means minus 4 standard deviations
- `chartMax` = the higher of the two means plus 4 standard deviations

This ensures the curves always fill the chart area and any shift from slider changes is immediately obvious.

## Technical Details

### File: `src/components/slides/PerformanceShiftCurve.tsx`

Lines 66-82 -- update standard deviations and chart range:

```typescript
// Tighter curves for more granular visibility
const bStdDev = Math.max(bMean * 0.05, 50_000);
const iStdDev = Math.max(iMean * 0.03, 25_000);

// Zoom into the region around the curves
const cMin = Math.max(0, Math.min(iMean, bMean) - bStdDev * 4);
const cMax = Math.max(iMean, bMean) + bStdDev * 4;
```

This is a ~5-line change in one file.
