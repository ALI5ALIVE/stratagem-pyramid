

# Maturity Roadmap Layout Redesign

## Problem
The current layout uses a side-by-side split (`grid-cols-[2fr_3fr]`) where the SVG curve is squeezed into a narrow left column (capped at 180px height) and the detail panel dominates the right. The graph feels tiny and the copy box oversized.

## Solution — Stack Vertically: Graph on Top, Details Below

Switch from a 2-column layout to a **vertical stack**: full-width SVG curve across the top, detail panel below. This gives the curve much more horizontal space to breathe and keeps the detail panel compact.

### Layout Structure
```text
┌─────────────────────────────────────┐
│  SVG Curve (full width, ~200px h)   │
│  ● ─── ● ─── ● ─── ● ─── ●        │
│  Stage pills row                    │
├─────────────────────────────────────┤
│  Detail Panel (3-column grid)       │
│  ┌──────────┬───────────┬─────────┐ │
│  │ What it  │ How Work  │ Result  │ │
│  │ looks    │ Changes + │ + Value │ │
│  │ like     │ Time Bar  │ Proof   │ │
│  └──────────┴───────────┴─────────┘ │
└─────────────────────────────────────┘
```

### Changes to Both Files
**`OpsSlide8MaturityRoadmap.tsx`** and **`TechSlide14MaturityRoadmap.tsx`** (identical structure):

1. **Replace** `grid-cols-[2fr_3fr]` with `flex flex-col gap-3`
2. **SVG curve** — remove `max-h-[180px]`, expand viewBox, make it full-width with a wider aspect ratio. Increase dot sizes and add stage sublabels. Enlarge to ~220px height.
3. **Stage pills** — move to a row directly under the curve (stays the same, just full width now)
4. **Detail panel** — reorganize from vertical scroll list into a **3-column horizontal grid**:
   - Column 1: Header + "What it looks like" bullets
   - Column 2: "How Work Changes" (From/To) + Time Allocation bar
   - Column 3: Result + Value Proof metrics
5. Remove `overflow-y-auto` from detail panel — content fits without scrolling in the new layout
6. Cultural marker quote moves to a full-width strip below the 3 columns

### What Stays the Same
- All data arrays, stage definitions, and accent colors
- Stage pill click behavior and SVG dot click behavior
- The `SalesSlideContainer` wrapper

