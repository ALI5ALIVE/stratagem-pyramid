Enable the narration play button on Week module divider slides in `src/pages/SalesEnablement.tsx`.

## Root cause

In the slide map (lines 228–238), divider slides explicitly receive **no** narration props:

```ts
const slideNarrationProps = (slide as any).dividerProps
  ? {}                       // ← dividers get nothing, so no onPlay → no play button
  : { isActive, isPlaying, isLoading, progress, hasCompleted, onPlay, onPause };
```

`PitchSlideContainer` only renders `SlidePlayButton` when `onPlay` is defined, so Week 1 / Week 2 / Week 3 dividers never show one — even though narration entries already exist for `se-week-1`, `se-week-2`, and `se-week-3`.

## Change

Remove the divider exclusion so every slide gets narration props:

```ts
const slideNarrationProps = {
  isActive,
  isPlaying: isActive && narration.isPlaying,
  isLoading: isActive && narration.isLoading,
  progress: isActive ? narration.progress : 0,
  hasCompleted: isActive && narration.hasCompleted,
  onPlay: () => narration.play(slide.id),
  onPause: () => narration.pause(),
};
```

`SEModuleDivider` already spreads `...narrationProps` into `PitchSlideContainer`, so the play button will appear automatically on all three week dividers.

## Scope

- One-line conditional removed in `src/pages/SalesEnablement.tsx`.
- No component, narration, or DB changes.