## Problem

After adding the MAD opener, the right column of `SEW3WholeVisionWhiteboard` got tall enough that the grid's intrinsic content exceeded the `h-full` row. The parent content area uses `justify-center`, so the oversized grid centred itself — pushing the whiteboard up and the Close card down behind the fixed narration bar. The whiteboard SVG is no longer fully visible.

## Fix (single file: `src/components/sales-enablement-slides/SEW3WholeVisionWhiteboard.tsx`)

Make the slide strictly fit the available height and keep the whiteboard fully visible.

### 1. Lock the grid to the available height
On the outer grid wrapper change:
- `h-full grid grid-cols-12 gap-5 px-8 pt-4 pb-6 max-w-[1700px] mx-auto`
→ `h-full min-h-0 overflow-hidden grid grid-cols-12 gap-4 px-8 pt-2 pb-2 max-w-[1700px] mx-auto`

This prevents the grid from being centred/pushed by overflow and tightens vertical padding (the container already reserves `pb-24` for the narration bar).

### 2. Whiteboard column — keep SVG fully visible
- Add `min-h-0 overflow-hidden flex` to the whiteboard wrapper.
- Reduce padding `p-6` → `p-4` so more room is given to the SVG.
- Add `preserveAspectRatio="xMidYMid meet"` to the SVG (explicit) and wrap it so it fills available space without being clipped.

### 3. Right column — make it self-contained and scrollable
On the `col-span-5` flex column:
- Add `min-h-0 overflow-y-auto pr-1` so any overflow scrolls inside the column instead of stretching the grid.
- Reduce the outer `gap-2` → `gap-1.5`.

### 4. Tighten MAD opener so it usually fits without scroll at 786px viewport
- MAD card: padding `p-2.5` → `p-2`; intro paragraph `text-[12px]` → `text-[11px]` with `mb-1.5`.
- Timeline rows: padding `px-2 py-1.5` → `px-2 py-1`; body text `text-[11px]` → `text-[10.5px]` (use `text-[11px] leading-tight`); reduce row gap `gap-1` → `gap-0.5`.
- Remove the standalone bridge divider line ("Now build the stack that made that possible…") — fold it into the "Say-it script" kicker as a single muted subtitle to save vertical space.
- Beats: keep current `p-2` and `text-[12px]`; reduce list `gap-1` → `gap-0.5`.
- Close card: drop `mt-auto` (no longer needed once column scrolls) and reduce padding `px-3 py-2.5` → `px-3 py-2`, `text-xs` → `text-[11px]`.

### 5. Verification
After edits, screenshot the slide at the user's current 1141×786 viewport (route `/sales-enablement`, this slide) and confirm:
- The whiteboard SVG (top-of-board use-case strip down through the Core Apps row with SafetyManager365 / ContentManager365 / TrainingManager365) is fully visible.
- The narration play bar at the bottom does not overlap the whiteboard or the right-column Close card.
- Right column either fits entirely or scrolls internally — never pushes the grid.

## Out of scope
- No narration script changes.
- No content changes to beats, Close text, or whiteboard SVG drawing.
- No changes to `PitchSlideContainer` or other slides.
