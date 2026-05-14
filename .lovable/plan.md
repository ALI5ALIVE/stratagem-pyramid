## Issue

My previous fix removed the description paragraph and trimmed bullets — that wasn't what you asked for. The real problem was: the card uses `mt-auto` on the bullets list, which pushes everything to the top and bottom edges, leaving a big empty gap in the middle when the card is tall.

## Fix scope (single file)

Edit `src/components/platform-slides/PFSlide9Value.tsx`:

1. **Restore the description paragraph** that was removed.
2. **Restore all bullets** (drop the `.slice(0, 2)` cap).
3. **Remove `mt-auto`** on the `<ul>` so content stacks naturally from the top with no mid-card gap.
4. **Make the card auto-size to content** instead of stretching to the row height: change the grid container to use `items-start` so cards take only the height they need rather than equalising.
5. Keep current padding/icon/title sizes (the previous tightening stays, just no content removal).

Result: each card hugs its own content; no "copy at top, big gap, copy at bottom" effect; nothing is hidden behind the narration bar (still inside `PitchSlideContainer`'s safe area).

## Out of scope

- No data changes in `platformPlaybook.ts`.
- No changes to other Value Unlocked slides or the narration bar.