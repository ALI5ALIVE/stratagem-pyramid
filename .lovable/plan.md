
# Add Narration Walkthrough to the Line of Sight Calculator

## Overview
Add guided audio narration to each of the three Line of Sight views (Calculator, KPI Tree, Scorecard), following the same pattern used in the Strategy Deck and Sales Deck. Each view will have a play button that walks the user through how to use the tool.

## What the User Will Experience
- A play button (bottom-right corner) appears on each Line of Sight view
- Pressing it plays a spoken walkthrough explaining what the view shows and how to interact with it
- The circular progress ring shows playback position
- After completion, the button switches to a "Replay" icon and a "Next view" button appears to advance to the next view (Calculator -> KPI Tree -> Scorecard)

## Changes

### 1. New file: `src/data/lineOfSightNarration.ts`
Create narration scripts for three views:

- **Calculator**: Explains the three-tier cascade (use case sliders at the bottom feed leading measures in the middle, which roll up to executive outcomes at the top). Walks through the airline profile panel, how to adjust sliders, and how the cost avoidance total updates in real time.
- **KPI Tree**: Explains the visual connection map -- how hovering an executive outcome highlights the connected path, and how the tree shows cause-and-effect from use cases up to board-level KPIs.
- **Scorecard**: Explains the four-perspective balanced scorecard layout, what each quadrant represents, and how the data connects back to the sliders the user adjusted.

Each script uses the same phonetic guidance as the rest of the app (e.g. "Comply three six five", "Foqua", "Detect, Trigger, Orchestrate, Prove").

### 2. New file: `src/hooks/useLineOfSightNarration.ts`
A narration hook tailored for the Line of Sight page. It follows the same architecture as `useSimpleNarration` but uses string-based view IDs ("calculator", "tree", "scorecard") instead of numeric slide IDs. It will:
- Fetch audio via the existing `elevenlabs-tts` edge function
- Cache audio URLs per view ID
- Manage play/pause/progress/completed state
- Preload the next view's audio

### 3. Update: `src/pages/LineOfSightPage.tsx`
- Import and use the new narration hook
- Pass narration props (isPlaying, isLoading, progress, hasCompleted, onPlay, onPause) to each view component
- Wire the "next view" callback to advance from calculator -> tree -> scorecard

### 4. Update: `src/components/slides/SlideLineOfSight.tsx`
- Accept optional narration props (isPlaying, isLoading, progress, hasCompleted, onPlay, onPause, onNextSlide)
- Render the `SlidePlayButton` component when narration props are provided

### 5. Update: `src/components/slides/LineOfSightTree.tsx`
- Same pattern: accept narration props and render `SlidePlayButton`

### 6. Update: `src/components/slides/BalancedScorecard.tsx`
- Same pattern: accept narration props and render `SlidePlayButton`

## Technical Details

### Narration script structure:
```text
{
  viewId: "calculator" | "tree" | "scorecard",
  title: string,
  script: string,
  voiceId: string  // same "George" voice as other decks
}
```

### Hook API:
```text
const { isPlaying, isLoading, progress, hasCompleted, play, pause, stop } = useLineOfSightNarration();

// Usage:
play("calculator")  // fetches TTS, plays audio
pause()             // pauses playback
```

### Play button positioning:
The `SlidePlayButton` component is already built and positioned at `bottom-24 right-6`. Each view component will render it in the same absolute position, consistent with the slide decks.

### Files changed:
1. **New**: `src/data/lineOfSightNarration.ts` -- narration scripts for 3 views
2. **New**: `src/hooks/useLineOfSightNarration.ts` -- narration hook using view IDs
3. **Edit**: `src/pages/LineOfSightPage.tsx` -- wire narration to views
4. **Edit**: `src/components/slides/SlideLineOfSight.tsx` -- add play button
5. **Edit**: `src/components/slides/LineOfSightTree.tsx` -- add play button
6. **Edit**: `src/components/slides/BalancedScorecard.tsx` -- add play button
