

# Fix: Operational Performance Roadmap Graph Overflow

## Problem

The SVG chart uses `flex-1` which lets it expand to fill all available space, pushing the timeline comparison boxes below it out of the viewport.

## Changes

### File: `src/components/sales-slides/SalesSlide6Journey.tsx`

1. **Line 74** — Replace `flex-1` on the SVG wrapper with a max-height constraint so the chart doesn't greedily consume all vertical space:
   - Change `className="flex-1 flex justify-center items-center"` to `className="flex justify-center items-center max-h-[50vh]"`

2. **Line 75** — Add a max-height to the SVG itself:
   - Change `className="w-full max-w-3xl h-auto"` to `className="w-full max-w-3xl h-auto max-h-[320px]"`

These two constraints cap the chart at a reasonable size, ensuring the timeline comparison boxes and bottom note always remain visible within the viewport.

