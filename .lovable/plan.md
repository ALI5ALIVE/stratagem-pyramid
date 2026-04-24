## Remove Speaker Notes + Universal Narration Controls

### 1. Delete
- `src/components/shared/SpeakerNotesPanel.tsx`

### 2. Create new narration hooks (clones of `useOpsPitchNarration`)
- `src/hooks/useCustomerOverviewNarration.ts` — reads from `getCustomerOverviewNarration` in `src/data/customerOverviewNarration.ts`
- `src/hooks/useExec3PitchNarration.ts` — reads from `getExec3PitchNarration` in `src/data/executivePitchNarration.ts`

Both follow the existing pattern: fetch script → POST to `/functions/v1/elevenlabs-tts` → cache blob URL per slide → expose `{ isPlaying, isLoading, currentSlide, progress, hasCompleted, play, pause, stop, resetCompleted }`.

### 3. Fix data ID mismatch
- `src/data/customerOverviewNarration.ts`: rename `"co-slideregmgmt"` → `"co-slide-regmgmt"` to match the slide ID in `CustomerOverview.tsx`.

### 4. Wire each deck page
For each page below:
- Remove `SpeakerNotesPanel` import + JSX
- Import the corresponding narration hook
- Stop narration on slide-change, scroll-change, and unmount
- Pass `narrationProps` (`isPlaying`, `isLoading`, `progress`, `hasCompleted`, `onPlay`, `onPause`, `onNextSlide`, `onPrevSlide`) into each slide component (per-slide gating using `narration.currentSlide === slideId`)

Pages:
- `src/pages/CustomerOverview.tsx` → `useCustomerOverviewNarration`
- `src/pages/ExecutivePitch3.tsx` → `useExec3PitchNarration` (replaces stale exec2 hook reference)
- `src/pages/TechnicalDeepDiveV4.tsx` → existing `useTechPitchNarration`
- `src/pages/OperationalPitch.tsx` → existing `useOpsPitchNarration` (already wired; just remove `SpeakerNotesPanel`)
- `src/pages/CoAnalystDeck.tsx` → existing `useCoAnalystNarration` (already wired; just remove `SpeakerNotesPanel`)
- `src/pages/SalesEnablement.tsx` → existing `useSalesEnablementNarration` (already wired; just remove `SpeakerNotesPanel`)

### 5. Result
Universal `SlidePlayButton` (fixed bottom bar — play/pause/replay, prev/next, progress) becomes the single narration interface across every deck. No floating speaker-notes panel anywhere. Audio overlap prevented via `narration.stop()` on slide change (per `mem://logic/narration-playback-logic`).