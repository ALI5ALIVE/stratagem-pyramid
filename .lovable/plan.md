## Goal

Apply the same whiteboard fix from `SEW3WholeVisionWhiteboard` to every other whiteboard slide in `src/components/sales-enablement-slides/` so the SVG is top-aligned (no blank band), the artwork is wider/taller, and no overlay chips clip the top.

## Files & changes (identical surgical pattern in each)

For each file below, in its whiteboard column:
1. Replace `col-span-7` with `col-span-8` on the whiteboard wrapper.
2. Replace `col-span-5` with `col-span-4` on the adjacent script column.
3. On the whiteboard wrapper, replace `p-6 relative overflow-hidden` with `p-3 relative min-h-0 overflow-hidden flex flex-col` (keep the rest of the classes: `rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl`).
4. Remove the absolute label chip(s) (`<div className="absolute top-2 left-3 …">whiteboard · …</div>` and any matching `top-2 right-3` chip).
5. On the `<svg viewBox="0 0 700 460" …>` add `preserveAspectRatio="xMidYMin meet"` and change `className="w-full h-full"` to `className="w-full h-full flex-1"`.
6. Clean up any newly unused icon imports (e.g. `Sparkles`).

### Files
- `src/components/sales-enablement-slides/SEDtopWhiteboardDrill.tsx`
- `src/components/sales-enablement-slides/SEFootprintAllThreeWhiteboard.tsx`
- `src/components/sales-enablement-slides/SEFootprintSingleWhiteboard.tsx`
- `src/components/sales-enablement-slides/SEFootprintTwoWhiteboard.tsx`
- `src/components/sales-enablement-slides/SERoadmapWhiteboardDrill.tsx`
- `src/components/sales-enablement-slides/SEW2CapstoneWhiteboard.tsx` (also remove the second `top-2 right-3` chip and drop the now-unused `Sparkles` import)

`SEDtopWhiteboardRunbook.tsx` has no SVG whiteboard — skip.

## Out of scope
- No SVG artwork changes (viewBox/contents preserved).
- No narration or copy changes.
- No changes to script columns beyond the width swap.
