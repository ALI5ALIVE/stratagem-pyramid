

# Fix: Bell Curve / Cost Savings Distribution Chart Not Showing

## Root Cause
The `PerformanceShiftCurve` component uses Recharts' `ResponsiveContainer` with `height="100%"`, but the chart's parent div has `flex-1 min-h-0` inside a flex column. In the Value Deck, the component sits inside a `min-h-screen flex flex-col` snap container. The combination causes the chart area to collapse to 0px height -- the chart renders but is invisible.

## Fix

### File: `src/components/slides/PerformanceShiftCurve.tsx`

Change the chart container div (line 164) to include a minimum height so the `ResponsiveContainer` always has space to render:

**Before:**
```tsx
<div className="flex-1 min-h-0 bg-card/50 rounded-xl border border-border/30 p-4 relative">
```

**After:**
```tsx
<div className="flex-1 min-h-[350px] bg-card/50 rounded-xl border border-border/30 p-4 relative">
```

This ensures the chart area is at least 350px tall regardless of flex layout context, while still growing with available space via `flex-1`.

One-line change.

