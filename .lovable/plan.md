

# Add Line of Sight Interactive Page

## Overview

Add a new standalone page at `/line-of-sight` featuring an interactive three-tier cascade visualization: **Use Cases** → **Leading Measures** (with sliders) → **Executive Outcomes** (CFO/CEO/COO). Users adjust operational leading measures and see real-time impact on executive-level lagging metrics.

## Files to Create

### 1. `src/data/lineOfSightData.ts`
The data file as provided — interfaces, executive outcomes (CFO/CEO/COO), 6 leading measures with slider configs, 8 use cases, and the `computeMetricValue` function. This file is clean and will be used as-is.

### 2. `src/components/slides/SlideLineOfSight.tsx`
The interactive component. Since the JSX was stripped in the paste, I will reconstruct it faithfully from the provided structure:

- **Header**: "Line of Sight" title with subtitle
- **Tabs** (shadcn Tabs): CFO / CEO / COO tabs with color-coded styling (emerald/amber/sky)
- **Tier 1 — Lagging Measures**: Cards showing computed metric values with delta indicators (up/down arrows, green/red coloring based on improvement)
- **Tier 2 — Leading Measures**: Sliders for each connected measure, showing current value and improvement indicator
- **Tier 3 — Use Cases**: Clickable cards for connected use cases, with an expandable detail panel showing description, impacted measures (as badges), and methodology quote
- All existing dependencies are already installed (Tabs, Slider, lucide-react, cn utility)

### 3. `src/pages/LineOfSightPage.tsx`
A simple page wrapper that renders `SlideLineOfSight` full-screen with the dark background theme.

## File to Modify

### 4. `src/App.tsx`
Add route: `<Route path="/line-of-sight" element={<LineOfSightPage />} />`

## Component Behavior

- Selecting a **CFO/CEO/COO tab** filters the view to show only connected leading measures and use cases
- Dragging a **leading measure slider** recalculates all lagging metrics in real-time via the weighted formula in `computeMetricValue`
- Clicking a **use case card** expands a detail panel showing description, connected measure badges, and methodology text
- Dimmed (opacity-30) use case cards indicate they aren't connected to the current stakeholder's measures
- Delta indicators show improvement from baseline with colored arrows

## Technical Details

| File | Action | Lines |
|------|--------|-------|
| `src/data/lineOfSightData.ts` | Create | ~230 lines |
| `src/components/slides/SlideLineOfSight.tsx` | Create | ~300 lines |
| `src/pages/LineOfSightPage.tsx` | Create | ~15 lines |
| `src/App.tsx` | Add import + route | 2 lines |

All dependencies (Tabs, Slider, lucide-react, Tailwind utilities) are already installed. No new packages needed.

