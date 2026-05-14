## Issue

Sales Enablement slides built on `PitchSlideContainer` (`src/components/shared/PitchSlideContainer.tsx`) get clipped at the bottom by the fixed `PlaybookNarrationBar`.

- Narration bar height: ~72px (h-12 button + py-2.5/3 + h-1 progress + border).
- `PitchSlideContainer` currently sets `pb-10 sm:pb-12` (40–48px) — not enough clearance, so card footers, CTAs, and shift lines render under the play bar.
- For comparison, `SlideContainer` (used by other playbooks) already uses `pb-16 sm:pb-20` and renders fine.

This affects every SE slide that uses `PitchSlideContainer` / `SalesSlideContainer` (re-export): `SEPlainEnglishShift`, `SELayerTalkTrack`, `SEDtopWhiteboardDrill`, `SEDtopWhiteboardRunbook`, `SERoadmapWhiteboardDrill`, `SEUseCaseCheatSheet`, `SEObjections`, `SEDiscoveryToClose`, `SEClosingForReps`, `SERecapSlide`, plus exec/tech slides reused in the SE deck.

## Fix scope (single file, frontend only)

Edit `src/components/shared/PitchSlideContainer.tsx`:

1. Increase bottom padding on the root container from `pb-10 sm:pb-12` to `pb-24 sm:pb-28` so a ~96–112px safe area sits above the narration bar.
2. Move the optional bottom-right slide-number pill from `bottom-4 sm:bottom-6` to `bottom-20 sm:bottom-24` so it isn't hidden behind the bar either.

That's it — no per-slide edits, no narration-bar changes, no data changes.

## Out of scope

- Narration bar layout/height (shared across all decks; changing it would shift other decks).
- Individual slide internals (they use `h-full` inside the container, so the new padding cascades automatically).
- Routing, narration logic, or content edits.