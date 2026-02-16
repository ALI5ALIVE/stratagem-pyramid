

# Fix: Bell Curves Not Rendering in Cost Savings Distribution

## Root Cause

After normalizing the Gaussian values (previous fix), the data is correct (values 0 to 1), but the chart still produces **zero SVG path elements**. Two issues remain:

1. **XAxis type is "category" (default)** -- With 200 data points containing large numeric x values (e.g. 40,000,000 to 60,000,000), Recharts' category axis can fail to generate Area paths. The XAxis needs `type="number"` to treat x values as a continuous numeric scale.

2. **YAxis has no domain** -- The YAxis is hidden but has no explicit `domain`. Recharts auto-detection with normalized 0-1 values and a hidden axis may produce an incorrect or zero-height domain.

## Fix

### File: `src/components/slides/PerformanceShiftCurve.tsx`

**Change 1 -- XAxis (line 210):** Add `type="number"` and an explicit `domain` so Recharts interprets x as a continuous numeric axis:

```tsx
<XAxis
  dataKey="x"
  type="number"
  domain={[chartMin, chartMax]}
  stroke="hsl(var(--muted-foreground))"
  // ... rest unchanged
/>
```

**Change 2 -- YAxis (line 225):** Add an explicit `domain` so the Y-axis range is well-defined:

```tsx
<YAxis hide domain={[0, 1]} />
```

These two changes ensure Recharts has proper numeric axes with defined ranges, allowing it to generate the SVG path elements for the Area curves.

## Technical Details

- `chartMin` and `chartMax` are already computed in the component's `useMemo` and represent the x-axis bounds (e.g., baseline mean +/- 4 standard deviations).
- Y values are normalized to 0-1 in the `chartData` memo, so `domain={[0, 1]}` is the correct range.
- No changes to the data computation, normalization, or visual styling.

Two-line change in one file.

