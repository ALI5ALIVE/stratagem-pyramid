

# Auto-Play Narration on Slide Landing

## Problem
Currently narration only plays when the user manually clicks the play button. The request is:
1. When a slide becomes active (scroll settles), auto-start narration
2. When scrolling quickly through multiple slides, stop any playing narration and only auto-start on the slide the user lands on

## Approach
Add a debounced auto-play effect to each deck page. When `currentSlide` changes:
- Stop narration immediately (already happens)
- Set a ~600ms debounce timer to auto-play the new slide's narration
- If the slide changes again before the timer fires, cancel it

This handles rapid scrolling naturally — each scroll event resets the timer, so narration only starts once the user has settled on a slide.

## Files to Change (7 deck pages)

### 1. `src/pages/ExecutivePitch.tsx`
Add a `useEffect` watching `currentSlide`:
- Clear any existing auto-play timer
- Set a 600ms timeout that calls `narration.play(slides[currentSlide].id)`
- Clean up on unmount or slide change

### 2. `src/pages/OperationalPitch.tsx`
Same pattern — debounced auto-play on `currentSlide` change using `narration.play(slides[currentSlide].id)`.

### 3. `src/pages/TechnicalDeepDive.tsx`
Same pattern with string-based slide IDs.

### 4. `src/pages/CoAnalystDeck.tsx`
Same pattern but uses numeric slide IDs: `narration.play(activeSlide)`.

### 5. `src/pages/SlideDeck.tsx`
Same pattern with numeric IDs: `narration.play(activeSlide)`.

### 6. `src/pages/ValueDeck.tsx`
Same pattern with numeric IDs: `narration.play(activeSlide)`.

### 7. `src/pages/ContentStrategyPage.tsx`
Same pattern with numeric IDs: `narration.play(activeSlide)`.

## Implementation Detail
Each page gets one new `useEffect`:
```typescript
// Auto-play narration with debounce for fast scrolling
const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

useEffect(() => {
  // Clear previous timer
  if (autoPlayTimerRef.current) {
    clearTimeout(autoPlayTimerRef.current);
  }
  // Stop current narration immediately
  narration.stop();
  // Debounce: only auto-play after settling on a slide
  autoPlayTimerRef.current = setTimeout(() => {
    narration.play(slideId);
  }, 600);
  return () => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
  };
}, [currentSlide]);
```

The 600ms delay is long enough that snap-scrolling through multiple slides won't trigger multiple TTS requests, but short enough to feel responsive when landing on a slide.

## Existing Auto-Advance Still Works
The `SlidePlayButton` already auto-advances to the next slide 1.5s after narration completes. Combined with this auto-play, the result is: narration finishes → 1.5s pause → scroll to next slide → 600ms settle → narration starts. A smooth, continuous presentation flow.

