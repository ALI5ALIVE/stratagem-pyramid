## Issue

`SERoadmapWhiteboardDrill` renders 6 stroke-script cards plus a footer in the right column, on top of an h-full whiteboard. Combined with the slide header and the narration-bar safe area in `PitchSlideContainer`, the right column overflows and the bottom footer ("Practice 3× · 90 seconds") plus the last stroke get clipped behind the narration bar.

## Fix (single file: `src/components/sales-enablement-slides/SERoadmapWhiteboardDrill.tsx`)

Tighten the right column so all 6 strokes and the footer fit within the available height. No data or whiteboard SVG changes.

1. Inner grid wrapper: change `pt-4 pb-6` → `pt-2 pb-2`, `gap-5` → `gap-4`, and add `min-h-0` so children can shrink inside the flex parent.
2. Right column (`col-span-5`): add `min-h-0 overflow-hidden`, reduce `gap-2` → `gap-1.5`.
3. Stroke list inner wrapper `flex flex-col gap-2` → `gap-1.5 min-h-0`.
4. Each stroke card:
   - `p-2.5` → `p-2`
   - dot circle `w-7 h-7 text-sm` → `w-6 h-6 text-xs`
   - quoted line `text-sm` → `text-xs leading-snug`
   - label `text-xs` → `text-[10px]`
5. Footer pill: `px-3 py-2 text-xs` → `px-2.5 py-1.5 text-[11px]`, keep `mt-auto`.

Result: all 6 strokes + footer fit cleanly above the narration bar at the SE viewport.

## Out of scope

- No changes to whiteboard SVG, narration logic, or other slides.