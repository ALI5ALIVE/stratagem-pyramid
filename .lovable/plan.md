# Practice Center — embedded slides + slide-aware AI buyer

Everything lives in `/practice-center`. We stop reusing `/pitch-executive-3` via iframe and instead mount the Medium pitch slides directly inside the Practice Center page, with our own minimal navigation. Nothing changes on the standalone `/pitch-executive-3` route.

## 1. Extract the slide list to a shared module

Move the `slides[]` array (and its `dividerProps` / `sectionDividerProps`) out of `src/pages/ExecutivePitch3.tsx` into a new file:

- `src/data/execPitch3Slides.ts` — exports `execPitch3Slides`, `dividerProps`, `sectionDividerProps`.

`ExecutivePitch3.tsx` keeps working by importing from there. No behaviour change on that route.

## 2. Mount the slides inside Practice Center

Rewrite the left panel of `src/pages/PracticeCenter.tsx`:

- Remove the iframe entirely.
- Add local state `currentSlide` (number) and render only `execPitch3Slides[currentSlide]` into a 16:9 container (`aspect-ratio: 16/9`, `overflow-hidden`, scaled to fit the column).
- Render the slide component WITHOUT narration props (no `onPlay`, `onPause`, `progress`, etc.) so the floating play / progress bar never appears. The salesperson delivers the slide themselves — no narrative audio, no auto-play.
- Do NOT pass the slide-0 `exportSlides` / `pptxDeckId` / `deckLabel` props, so the title slide's PDF/PPTX/back-to-deck chrome does not render in Practice Center.
- Add a single, minimal nav row directly under the slide:
  - `Prev` button, `Slide X / N — {label}` indicator, `Next` button.
  - This is the ONLY navigation in the practice view — no duplicate play buttons, no scroll-snap deck, no in-slide chrome.
- Bind `←` / `→` keys (when focus is inside the slide column and not in a text input) to prev/next.
- Keep the existing `Open deck full screen` link in the page header pointing at `/pitch-executive-3` for reference.

## 3. Make the AI buyer's questions follow the current slide

Expose a `sendContext` from the session hook and call it on every slide change.

- `src/hooks/useRoleplaySession.ts`: add `sendContext: (text: string) => void` to the returned API. Implementation calls `conversationRef.current?.sendContextualUpdate(text)` when status is `connected`, otherwise no-ops. The existing initial persona prompt path (`contextSentRef`) is unchanged.
- `src/pages/PracticeCenter.tsx`: in a `useEffect` that depends on `currentSlide` and `session.status`, when connected, call:
  ```
  session.sendContext(
    `The rep just moved to slide ${currentSlide + 1} of ${total}: "${slide.label}". ` +
    `Ask ONE short buyer-style question that probes THIS slide's topic specifically. Stay in character.`
  );
  ```
- One-line addition to `HOUSE_RULES` in `src/lib/practice/buildAgentPrompt.ts`:
  > "When you receive a system note that the rep moved to a new slide, anchor your next question to that slide's topic."

## Acceptance criteria

- `/practice-center` shows the Medium pitch slides directly, one at a time, with a single Prev / Next / counter row — no floating play buttons, no progress bars, no audio narration, no duplicate navigation.
- Arrow keys and the Prev/Next buttons move between slides; the counter and label update.
- After each slide change, within ~1–2s the AI buyer asks a question tied to that slide (e.g. on the DTOP slide it asks about Detect/Trigger/Orchestrate/Prove; on CoAnalyst it asks about the 90% vs 35% accuracy claim).
- `/pitch-executive-3` standalone route is unchanged — narration bar, play buttons, scroll-snap deck and export chrome all still work.
- Scoring flow is unchanged.

## Out of scope

- No changes to other decks (Operational, Technical, etc.) or to the scoring edge function.
- No auto-advancing slides based on transcript content — the rep drives slide changes manually.
