## Problem

Two issues on `SEW3WholeVisionWhiteboard`:

1. **Empty band at the top of the whiteboard.** The SVG uses `viewBox="0 0 700 500"` with `preserveAspectRatio="xMidYMid meet"`. The whiteboard container is taller than the SVG's 7:5 ratio, so the SVG is letterboxed and the empty space splits equally top and bottom — producing a visible blank stripe at the top.
2. **Bottom of the whiteboard still clips.** The container's `col-span-7` width forces the SVG height = width × 5/7, leaving the Core Apps row (SafetyManager365 / ContentManager365 / TrainingManager365 at y≈390–476 in the viewBox) sitting near the bottom edge and partially hidden behind the wrapper padding + narration bar reservation.

Two absolute-positioned label chips inside the whiteboard wrapper ("whiteboard · whole vision · build bottom-up" and the Sparkles "one marker · 90 seconds") also overlap the SVG's top area.

## Fix (single file: `src/components/sales-enablement-slides/SEW3WholeVisionWhiteboard.tsx`)

### 1. Top-align the SVG inside the whiteboard
- Change `preserveAspectRatio` from `xMidYMid meet` to `xMidYMin meet` so any letterbox space falls to the bottom, not the top.

### 2. Remove the absolute label chips
- Delete both `absolute top-2 …` divs (`whiteboard · whole vision · build bottom-up` and `Sparkles · one marker · 90 seconds`). They overlap the SVG's use-case strip and add no value the headline doesn't already convey.

### 3. Give the whiteboard more width (and therefore more height)
- Grid columns: `col-span-7` (whiteboard) → `col-span-8`; `col-span-5` (right column) → `col-span-4`.
- This widens the SVG so its height (= width × 500/700) increases, eliminating most/all letterboxing at the user's 1141 px viewport, and the Core Apps row sits well clear of the bottom.

### 4. Tighten whiteboard wrapper padding
- `p-4` → `p-3` to give the SVG a bit more space without changing the artwork itself.

### 5. Verification
- Reload `/sales-enablement`, scroll to the "Sell the Whole Vision — One Whiteboard" slide at 1141×786.
- Confirm: no blank band at the top of the whiteboard; the use-case strip is the first thing visible; the bottom Core Apps row (SafetyManager365 / ContentManager365 / TrainingManager365) is fully visible above the narration bar; right column (MAD opener + beats + Close) still fits or scrolls internally.

## Out of scope
- No changes to the SVG artwork itself (viewBox, internal layout, content).
- No narration changes.
- No changes to other slides or `PitchSlideContainer`.
