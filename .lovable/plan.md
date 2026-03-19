

# Fix Slide Content Clipping — Bottom Control Bar Overlap

## Problem
The `SlidePlayButton` control bar is absolutely positioned at `bottom-0` inside each slide, overlapping the last ~50px of content. Slide containers use `h-screen` with fixed padding (`py-10 sm:py-14`) that doesn't account for this bar. The slide number badge is also hidden behind the control bar.

## Root Cause
Three slide container components all have the same issue — they apply padding that doesn't reserve space for the bottom control bar:
- `src/components/shared/PitchSlideContainer.tsx` (used by all pitch decks)
- `src/components/slides/SlideContainer.tsx` (used by strategy/CoAnalyst decks)

## Fix

### 1. Add bottom padding to both slide containers
In both `PitchSlideContainer.tsx` and `SlideContainer.tsx`, increase the bottom padding on the `<section>` to account for the control bar (~56px). Change from `py-10 sm:py-14` to `pt-10 sm:pt-14 pb-16 sm:pb-20` so content has breathing room above the control bar.

### 2. Move slide number above the control bar
The slide number is currently at `bottom-6` / `bottom-8`, which sits behind the control bar. Move it up to `bottom-16` / `bottom-20` so it's visible above the narration controls.

### Files to Change
- `src/components/shared/PitchSlideContainer.tsx` — adjust section padding, slide number position
- `src/components/slides/SlideContainer.tsx` — same adjustments

This is a 2-file fix that resolves the clipping across all decks since every slide uses one of these two containers.

