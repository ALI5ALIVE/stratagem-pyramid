

# Stop Narration on Slide Change and Deck Navigation

## Problem
When navigating **between decks** (e.g., Executive → Operational), the previous deck's audio keeps playing because no cleanup calls `narration.stop()` on component unmount. Within a deck, scrolling does stop narration, but the auto-play effect's cleanup only clears the debounce timer — not the active audio.

## Fix
Add a **component unmount cleanup effect** to every deck page that calls `narration.stop()`. This is a one-line `useEffect` addition to each of the 8 deck pages.

### Pattern (same for all pages)
```typescript
// Stop narration when leaving this deck
useEffect(() => {
  return () => narration.stop();
}, []);
```

### Files to Change
1. `src/pages/ExecutivePitch.tsx` — add unmount cleanup
2. `src/pages/OperationalPitch.tsx` — add unmount cleanup
3. `src/pages/TechnicalDeepDive.tsx` — add unmount cleanup
4. `src/pages/CoAnalystDeck.tsx` — add unmount cleanup
5. `src/pages/SlideDeck.tsx` — add unmount cleanup
6. `src/pages/ValueDeck.tsx` — add unmount cleanup
7. `src/pages/ContentStrategyPage.tsx` — add unmount cleanup
8. `src/pages/LineOfSightPage.tsx` — add unmount cleanup

Each file gets one new `useEffect` near the existing effects. No other changes needed. Within-deck slide changes already call `narration.stop()` via the scroll handler — that part works correctly.

