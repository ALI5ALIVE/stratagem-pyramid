

# Fix: Chart Too Close to Top, Wasted Space at Bottom

## Problem
The chart is fixed at 350px height while the outer container (`flex-1`) has room to grow. This leaves unused space at the bottom of the slide.

## Solution
Make the `ResponsiveContainer` fill its parent using `height="100%"`, while ensuring the parent div has a concrete height via flex layout (`flex-1 min-h-0`). The previous attempt with `height="100%"` failed because the parent lacked `min-h-0` (needed in flex children to allow proper height resolution). Adding `min-h-0` instead of `min-h-[350px]` fixes this.

Also reduce the header's bottom margin and chart's top margin so the curve doesn't crowd the top.

## Technical Details

### File: `src/components/slides/PerformanceShiftCurve.tsx`

**Line 164** — add `justify-center` so the content block is vertically centered in the slide:
```
<div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-4 sm:px-6 py-4">
```

**Line 177** — change chart container from `flex-1 min-h-[350px]` to `min-h-[400px]` (fixed height, no flex-grow, taller chart):
```
<div className="min-h-[400px] h-[400px] bg-card/50 rounded-xl border border-border/30 p-4 relative">
```

**Line 199** — update `ResponsiveContainer` to match:
```
<ResponsiveContainer width="100%" height={400}>
```

**Line 200** — reduce top margin in `AreaChart` so curve doesn't crowd the top:
```
<AreaChart data={chartData} margin={{ top: 40, right: 20, bottom: 20, left: 20 }}>
```

These changes center the content vertically in the viewport and give the chart more room, eliminating the wasted space at the bottom while keeping the curve away from the top edge.
