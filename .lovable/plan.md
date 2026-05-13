## Goal
Make the slide preview stretch to the full height of the right column so the workspace feels balanced — no more squat slide card with a tall stack of cards beside it.

## Changes (UI only, `src/pages/PracticeCenter.tsx`)

1. **Lock the workspace to the viewport.**
   Wrap the two-column grid in a `flex flex-col` shell sized to the remaining viewport height (e.g. `h-[calc(100vh-220px)] min-h-[640px]`). The grid becomes `h-full` so both columns share the exact same height.

2. **Slide card fills its column.**
   - Drop the fixed `aspectRatio: 16/9` on the stage wrapper.
   - Card becomes `flex h-full flex-col`; the stage div becomes `flex-1` (fills remaining space above the Prev/Next bar and chip rail).
   - The existing 1280×720 scaler already uses `Math.min(w/1280, h/720)` so it will letterbox correctly into whatever height it's given — no logic change needed.
   - Chip rail stays at the bottom but caps at `max-h-16` with `flex-wrap` removed (keeps horizontal scroll) so it can't push the slide upward.

3. **Right column matches height and scrolls internally.**
   - Right column wrapper: `flex h-full flex-col gap-4 overflow-hidden`.
   - Transcript card: replace fixed `h-[560px]` with `flex-1 min-h-0` so it grows/shrinks with the column.
   - Prep checklist + Score CTA + Scorecard wrap in an `overflow-y-auto` region below the transcript so they never blow out the column. (Pre-call: checklist visible, scorecard hidden — fits easily. Post-call: scorecard scrolls within the column.)

4. **Tighten the side cards' visual weight** (proportion fix):
   - Prep checklist: reduce padding `p-4` → `p-3`, list `space-y-1.5` → `space-y-1`.
   - "How this works" block inside the empty transcript: `p-4` → `p-3`, items `space-y-2` → `space-y-1.5`, font `text-xs` retained.
   - Score CTA card padding `p-4` → `p-3`.

## Out of scope
- No changes to scoring logic, persona data, or the embedded slide components.
- No responsive rework below `lg`; on small screens the columns still stack as today (height cap only applies at `lg` and up via `lg:h-[calc(...)]`).

## Files touched
- `src/pages/PracticeCenter.tsx` (single file)
