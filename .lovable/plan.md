

# Fit Calculator and Scorecard to Single Viewport

## Problem

Both the Calculator and Scorecard views scroll vertically because they render all content in a tall column layout. The goal is to make each fit within `100vh` minus the top nav bar (~40px).

## Approach

### Calculator View (`SlideLineOfSight.tsx`)

The calculator currently stacks vertically: header, airline profile panel, tabs with 3 tiers of content. The key insight is that the user is already filtered to one stakeholder tab at a time, so we only need to fit one tab's content.

Changes:

1. **Remove the header** ("Line of Sight" h1 + subtitle) -- the page nav bar already identifies the view
2. **Collapse the airline profile by default** (`profileOpen` initial state from `true` to `false`) -- it shows a compact summary when collapsed
3. **Use viewport-height container** -- change the outer wrapper from `overflow-y-auto` to `h-[calc(100vh-40px)] overflow-hidden` and use `flex flex-col` to distribute space
4. **Reduce spacing** -- cut `py-6` to `py-3`, `mb-6` to `mb-3`, `gap-3` to `gap-2` throughout
5. **Make Tier 3 (Use Cases) a 4-column grid on desktop** instead of 2-column, and reduce each card's vertical padding -- the sliders and cost info stay but become more compact
6. **Remove the source footnote bar** at the bottom (or move it into a tooltip) to reclaim vertical space
7. **Shrink Tier 1 and Tier 2 card padding** from `p-4`/`p-3` to `p-2.5`/`p-2`

### Scorecard View (`BalancedScorecard.tsx`)

The scorecard stacks 4 perspective cards vertically with 2-3 KPI tiles each. This creates too much height.

Changes:

1. **Use viewport-height container** -- wrap in `h-[calc(100vh-40px)] flex flex-col overflow-hidden`
2. **Switch to a 2x2 grid for perspectives** -- `grid grid-cols-2 gap-3` instead of stacking vertically. Each perspective card becomes more compact
3. **Reduce the header** from `text-2xl` to `text-lg` and cut `mb-2` and `py-8` spacing
4. **Shrink the Overall Improvement strip** padding from `p-4` to `p-2`
5. **Make KPI tiles horizontal within each perspective** -- use `grid-cols-3` on all screen sizes (each perspective has 2-3 KPIs so they fit in one row)
6. **Reduce KPI tile value size** from `text-2xl` to `text-lg`
7. **Merge the Cost Avoidance banner into the header strip** (side-by-side with Overall Improvement) instead of a separate full-width block
8. **Remove the source footnote** or make it a single-line inside the header area

### Page Container (`LineOfSightPage.tsx`)

- Change the outer `min-h-screen` to `h-screen overflow-hidden` so the page itself never scrolls

## Technical Details

### Files to modify

| File | Key changes |
|------|------------|
| `src/pages/LineOfSightPage.tsx` | `min-h-screen` to `h-screen overflow-hidden` |
| `src/components/slides/SlideLineOfSight.tsx` | Remove header, collapse profile default, viewport-height container, tighter spacing, 4-col use case grid |
| `src/components/slides/BalancedScorecard.tsx` | 2x2 perspective grid, merged cost banner, tighter spacing, viewport-height container |

### No data file changes

All changes are purely layout/CSS -- no modifications to `lineOfSightData.ts` or computation logic.

### Responsive considerations

- The 2x2 scorecard grid and 4-col use case grid apply only on `lg:` breakpoints and above
- On smaller screens, the layout will remain scrollable (mobile users expect scrolling)
- The `h-screen overflow-hidden` constraint applies only on `md:` and above via a media-query class approach

