
# Plan: Make Competitive Positioning Map Much Larger

## Problem

The Strategic Matrix and Radar charts are currently constrained to small max-widths:
- Matrix: `max-w-[500px]`  
- Radar: `max-w-[420px]`

This makes both charts appear squashed and too small for the available viewport space.

## Solution

Significantly increase the chart container sizes to use more of the available screen real estate.

**File: `src/components/slides/Slide8PositioningMap.tsx`**

| Chart | Current | Proposed |
|-------|---------|----------|
| Strategic Matrix (line 197) | `max-w-[500px]` | `max-w-[700px]` |
| Radar Chart (line 373) | `max-w-[420px]` | `max-w-[600px]` |

**Additional adjustments:**
- Reduce chart container padding from `p-4` to `p-3` to give more room to the chart itself
- Reduce outer gap from `gap-3` to `gap-2` to maximize chart area
- Reduce bottom takeaway padding from `py-3` to `py-2`

## Specific Changes

### Line 179: Reduce outer container gap
```tsx
// From:
<div className="flex flex-col gap-3">

// To:
<div className="flex flex-col gap-2">
```

### Line 195: Reduce chart container padding
```tsx
// From:
<div className="bg-card rounded-xl border border-border p-4">

// To:
<div className="bg-card rounded-xl border border-border p-3">
```

### Line 197: Increase Matrix size
```tsx
// From:
<div className="w-full max-w-[500px] aspect-square mx-auto">

// To:
<div className="w-full max-w-[700px] aspect-square mx-auto">
```

### Line 373: Increase Radar size
```tsx
// From:
<div className="w-full max-w-[420px] aspect-square mx-auto">

// To:
<div className="w-full max-w-[600px] aspect-square mx-auto">
```

### Line 409: Reduce takeaway banner padding
```tsx
// From:
<div className="bg-primary/10 border border-primary/30 rounded-lg px-5 py-3 max-w-2xl text-center">

// To:
<div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 max-w-2xl text-center">
```

## Visual Impact

- Charts will be approximately 40% larger (500px → 700px for Matrix)
- Both charts will maintain their square aspect ratio
- More of the viewport will be utilized for the visual content
- Quadrant labels and vendor positions will be easier to read
- The key takeaway banner will remain visible but more compact
