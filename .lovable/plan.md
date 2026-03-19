

# Replace Play Button with Bottom Narration Control Bar

## Overview
Replace the floating circular play button (`SlidePlayButton`) with a fixed bottom control bar that provides play/pause, skip forward/back, a progress bar, and auto-advances to the next slide when narration completes.

## Component Design
```text
┌──────────────────────────────────────────────────────────────────┐
│ ◀ Prev  │  ▶ Play / ⏸ Pause / ↺ Replay  │  ▶▶ Next  │ ━━━━━━ │
│          │                                 │           │progress│
└──────────────────────────────────────────────────────────────────┘
```
- Full-width bar fixed to bottom of each slide, with `backdrop-blur` glass effect
- Left: Previous slide button (skip back)
- Center: Play/Pause/Replay button with loading spinner state
- Right: Next slide button (skip forward)
- Below buttons: thin progress bar showing narration progress
- Supports `variant="dark" | "light"` like current button

## Auto-Advance Behavior
- When narration completes (`hasCompleted` becomes true), automatically call `onNextSlide` after a short 1.5s delay
- User can cancel by clicking pause or navigating manually

## Files to Change

### 1. Rewrite `src/components/SlidePlayButton.tsx` → `NarrationControlBar`
- Same props interface (backward compatible export name)
- Horizontal bar layout instead of floating circle
- Add previous slide callback (`onPrevSlide` optional prop)
- Add auto-advance `useEffect` on `hasCompleted`
- Keep the same default export name so all 12 consumer files work without import changes

### 2. Update `src/types/slideProps.ts`
- Add optional `onPrevSlide` to `SlideNarrationProps`

### 3. Update container components positioning
- `SlideContainer.tsx`, `PitchSlideContainer.tsx`: adjust positioning from `absolute bottom-24 right-6` to `absolute bottom-0 left-0 right-0`
- No changes needed to the containers themselves since they just pass through to SlidePlayButton

### 4. Update page-level decks to wire auto-advance
- `ExecutivePitch.tsx`, `OperationalPitch.tsx`, `TechnicalDeepDive.tsx`, `SlideDeck.tsx`, `CoAnalystDeck.tsx`, `ContentStrategyPage.tsx`, `ValueDeck.tsx`, `LineOfSightPage.tsx`: add `onPrevSlide` callback alongside existing `onNextSlide`

## No breaking changes
The component keeps the same file path and default export, so all 12 consumer files that import `SlidePlayButton` will automatically get the new control bar.

