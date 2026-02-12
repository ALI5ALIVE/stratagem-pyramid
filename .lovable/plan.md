
# Redesign Balanced Scorecard to Eliminate Wasted Space

## Problem
The current 2x2 grid of perspective cards uses `flex-1` on the KPI tile area, which stretches each card to fill half the viewport height. Since KPI tiles are compact, this leaves large empty areas below them -- especially in the "Learning & Growth" card which only has 2 KPIs instead of 3.

## Solution
Redesign the layout so cards size to their content rather than stretching to fill space, and use the available space more efficiently.

## Key Changes

### 1. Remove flex-stretch on KPI grid
- Change perspective cards from `flex flex-col` with `flex-1` on the KPI area to auto-sizing based on content
- KPI tiles will sit snugly within each card with no empty space below

### 2. Make KPI tiles denser
- Reduce padding inside KPI tiles from `p-2` to `p-1.5`
- Tighten the vertical spacing (`space-y-1` to `space-y-0.5`)
- Make the metric value slightly smaller (`text-lg` to `text-base`) so tiles are more compact

### 3. Adapt the grid for uneven KPI counts
- Learning & Growth has only 2 KPIs -- switch its inner grid to `grid-cols-2` instead of forcing `grid-cols-3` with an empty cell
- Use dynamic column count: `grid-cols-{kpiResults.length}` capped at 3

### 4. Fill reclaimed space with perspective-level context
- Add a subtle "target" or baseline reference row at the bottom of each card showing the strategic objective more prominently, so the card feels purposeful rather than empty
- Alternatively, let the 2x2 grid use `auto` row sizing so cards only take the height they need, and the grid naturally compresses

### 5. Overall container adjustment
- Change the grid from `flex-1` (which forces it to fill remaining viewport) to `auto` height with the outer container allowing the cards to sit naturally
- Reduce the `gap-2` between cards to `gap-1.5` for tighter packing

## Technical Details

### File: `src/components/slides/BalancedScorecard.tsx`

**Grid container (line 112):**
- Change from `flex-1 grid ... min-h-0` to remove `flex-1` and let grid rows auto-size
- Use `grid-rows-[auto_auto]` so rows shrink to fit content

**Perspective card (lines 114-167):**
- Remove `flex flex-col` and `flex-1` on the KPI grid div
- Cards will naturally size to their content

**KPI tile grid (line 139):**
- Change from fixed `grid-cols-3` to dynamic based on KPI count
- Reduce padding and spacing inside tiles

**KPI tiles (lines 141-164):**
- Tighten padding from `p-2` to `p-1.5`
- Reduce `space-y-1` to `space-y-0.5`
- Shrink metric font from `text-lg` to `text-base`

These changes will make each perspective card only as tall as its content requires, eliminating the large empty spaces while keeping all the data clearly readable.
