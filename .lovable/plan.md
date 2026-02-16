

# Fix: Bell Curves Not Rendering in Cost Savings Distribution

## Root Cause

The `gaussian()` function produces raw probability density values. When `stdDev` is in the hundreds of thousands (e.g. $2.5M * 0.05 = $125K), the peak density is approximately `1 / (125000 * 2.507)` which equals roughly **3.2e-6**. These values are so tiny that Recharts effectively renders them as flat lines at y=0, producing no visible SVG paths.

## Fix

Normalize the `baseline` and `improved` values in `chartData` so they range from 0 to 1 (relative to the tallest peak). This makes the curves large enough for Recharts to render while preserving the correct shape and relative proportions.

## Technical Details

### File: `src/components/slides/PerformanceShiftCurve.tsx`

In the `chartData` useMemo (around lines 96-107), after generating the raw gaussian points, find the maximum Y value across both curves and divide all values by it:

```typescript
const chartData = useMemo(() => {
  const points: { x: number; baseline: number; improved: number }[] = [];
  const step = (chartMax - chartMin) / 200;
  for (let x = chartMin; x <= chartMax; x += step) {
    points.push({
      x: Math.round(x),
      baseline: gaussian(x, baselineMean, baselineStdDev),
      improved: gaussian(x, improvedMean, improvedStdDev),
    });
  }

  // Normalize to 0-1 range so Recharts can render visible curves
  const maxVal = Math.max(
    ...points.map((p) => Math.max(p.baseline, p.improved))
  );
  if (maxVal > 0) {
    return points.map((p) => ({
      x: p.x,
      baseline: p.baseline / maxVal,
      improved: p.improved / maxVal,
    }));
  }
  return points;
}, [baselineMean, improvedMean, baselineStdDev, improvedStdDev, chartMin, chartMax]);
```

This is a self-contained change in one file. The visual shape of the curves stays identical; only the invisible Y-axis scale changes.

