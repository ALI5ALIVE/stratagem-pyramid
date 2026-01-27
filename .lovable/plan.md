
## Goal
Make the Competitive Positioning charts large on a large monitor, but never so large that they get clipped inside the slide (the slide uses `h-screen` + `overflow-hidden`).

## What’s causing the cut-off
- `SlideContainer` locks each slide to one viewport (`h-screen`) and hides overflow (`overflow-hidden`).
- The charts are currently sized primarily by width (`max-w-4xl` / `max-w-3xl`) with `aspect-square`.
- On some viewport heights, a square at those widths becomes taller than the remaining vertical space (after title/subtitle, tabs, padding, and the takeaway banner), so the bottom gets cut off.

## Fix strategy (keep charts square, but height-aware)
Instead of fixed `max-w-*`, we’ll size the square using CSS `min()` with a viewport-height-based cap:
- Width becomes: `min(<desired max width>, calc(100vh - <reserved space>))`
- Because it’s `aspect-square`, height matches width, so the chart will always fit vertically.

This keeps the charts “as big as possible” without clipping.

## Planned code changes

### 1) Strategic Matrix: replace `max-w-4xl` with a height-capped square
**File:** `src/components/slides/Slide8PositioningMap.tsx`

**Change:**
```tsx
// From:
<div className="w-full max-w-4xl aspect-square mx-auto">

// To (example values, tuned to fit within the slide header + tabs + padding):
<div className="w-[min(56rem,calc(100vh-18rem))] max-w-full aspect-square mx-auto">
```

- `56rem` ~= 896px (same target as `max-w-4xl`)
- `calc(100vh-18rem)` reserves space for the header, tabs, container padding, and takeaway so the square can’t exceed available height.

### 2) Radar view: use a slightly stricter height cap (because chips + quick actions take space)
**Change:**
```tsx
// From:
<div className="w-full max-w-3xl aspect-square mx-auto">

// To:
<div className="w-[min(48rem,calc(100vh-24rem))] max-w-full aspect-square mx-auto">
```

- `48rem` ~= 768px (same as `max-w-3xl`)
- `calc(100vh-24rem)` reserves extra room for vendor chips + quick action row so the chart doesn’t get cut off.

### 3) (If needed) reclaim a little vertical space without shrinking the chart
If anything is still tight after the height-aware sizing, we’ll make small spacing tweaks that don’t harm readability:
- Reduce radar view wrapper gap from `gap-4` → `gap-3`
- Reduce chart container padding from `p-3` → `p-2` (only if still necessary)
These are “last-mile” adjustments and only needed if the reserved-space estimate is slightly off in your exact browser zoom/OS scaling.

## How we’ll verify
1. Open Slide 8 in the deck.
2. Toggle between “Strategic Matrix” and “Capability Radar”.
3. Confirm:
   - The full square chart is visible (no bottom clipping).
   - Labels and chips are still readable.
   - On large monitors, the chart expands up to the intended max size.

## Notes / tunables (fast follow if you want it even bigger)
If you tell me your typical presentation resolution (e.g., 2560×1440, 3440×1440, 4K), we can fine-tune the reserved space numbers (`18rem`, `24rem`) to maximize chart size while guaranteeing no cut-off.
