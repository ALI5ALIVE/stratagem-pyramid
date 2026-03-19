

# Remove Auto-Play Narration from All Decks

## Problem
The auto-play effect creates race conditions: when scrolling quickly, `narration.stop()` runs synchronously but the 600ms debounced `narration.play()` fires asynchronously — the previous audio's `fetch` may still be in-flight and creates a new `Audio` element after `stop()` already ran. This causes multiple voices to overlap.

## Fix
Remove the auto-play `useEffect` and `autoPlayTimerRef` from all 7 deck pages. Users will use the manual play button on each slide to start narration. The existing `narration.stop()` calls in scroll handlers and the unmount cleanup remain — ensuring audio stops when scrolling or leaving a deck.

## Files to Change (7 files, same change in each)

1. `src/pages/ExecutivePitch.tsx`
2. `src/pages/OperationalPitch.tsx`
3. `src/pages/TechnicalDeepDive.tsx`
4. `src/pages/CoAnalystDeck.tsx`
5. `src/pages/SlideDeck.tsx`
6. `src/pages/ValueDeck.tsx`
7. `src/pages/ContentStrategyPage.tsx`

### In each file:
- **Delete** the `autoPlayTimerRef` ref declaration
- **Delete** the entire "Auto-play narration with debounce" `useEffect` block

No other changes needed. The manual play/pause buttons on each slide already work correctly.

