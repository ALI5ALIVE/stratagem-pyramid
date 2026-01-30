

# Plan: Remove Narration Button and Sync Hero Copy on Slide 15

## Summary

This plan removes the play/narration button from the Homepage Experience slide (Slide 15) and updates the mini-preview hero copy to exactly match the actual homepage mockup.

---

## Files to Modify

### `src/components/slides/SlidePlatformExperience.tsx`

**Change 1: Remove narration imports and props (Lines 2-4, 36-44)**

Remove the SlidePlayButton import and SlideNarrationProps type since they're no longer needed:

```tsx
// REMOVE these imports
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";
```

Simplify the component props (no longer needs narration props):

```tsx
// CHANGE FROM:
const SlidePlatformExperience = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {

// CHANGE TO:
const SlidePlatformExperience = () => {
```

**Change 2: Remove play button JSX (Lines 53-64)**

Remove the entire play button block:

```tsx
// REMOVE this entire block
{/* Play button */}
{onPlay && (
  <SlidePlayButton
    isPlaying={isPlaying}
    isLoading={isLoading}
    progress={progress}
    hasCompleted={hasCompleted}
    onPlay={onPlay}
    onPause={onPause ?? (() => {})}
    onNextSlide={onNextSlide}
  />
)}
```

**Change 3: Update hero copy to match homepage mockup (Lines 96-108)**

Update the mini-preview hero section to match the homepage:

```tsx
{/* Hero Preview */}
<div className="text-center mb-6">
  <h2 className="text-xl font-display font-bold text-foreground mb-1">
    The Operational Performance Platform
  </h2>
  <p className="text-xs text-primary font-medium mb-3">
    for Safety, Content, and Training
  </p>
  <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
    Connect safety, content, and training into an intelligent operating platform.{" "}
    <span className="text-foreground font-medium">Turn signals into orchestrated change and measurable outcomes.</span>
  </p>
  <div className="flex items-center justify-center gap-2">
    <div className="px-3 py-1 bg-primary rounded text-xs text-primary-foreground">See the Platform</div>
    <div className="px-3 py-1 border border-border rounded text-xs text-foreground">Calculate Your Impact</div>
  </div>
</div>
```

---

## Side-by-Side Comparison

| Element | Current (Slide) | Updated (Matches Homepage) |
|---------|-----------------|---------------------------|
| Headline | "The Operational Performance Platform" | "The Operational Performance Platform" |
| Scope line | *(missing)* | "for Safety, Content, and Training" |
| Description | "Connect Safety, Content, and Training into one governed system." | "Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes." |
| Button 1 | "See Platform" | "See the Platform" |
| Button 2 | "Calculate Impact" | "Calculate Your Impact" |

---

## Impact on SlideDeck.tsx

The parent component `SlideDeck.tsx` currently passes narration props via `getNarrationProps(15)`. After this change, those props will simply be ignored (React handles unused props gracefully), so no changes are required there. The slide will render without the play button.

---

## User Experience

- Slide 15 will no longer show the circular play/pause button
- Users simply click the "View Full Homepage Mockup" button to navigate to the full experience
- The mini-preview now accurately reflects what users will see on the actual homepage mockup
- Cleaner slide design without the narration controls competing for attention

