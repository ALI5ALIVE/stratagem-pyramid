## Goal

Give every Specialist Playbook (DTOP, Automation, Insights, Mobile, Platform, Regulation Management, Signals) a coach-style talk track, and make those talk tracks playable both on the standalone Playbook page and inside the Academy lesson scroller.

## What gets built

### 1. Seven new narration data files

One per playbook, written in the **Sales Enablement Coach Script Standard** (5-part teaching format: why this slide matters → core message → pain→value pivot → how to deliver → transition):

- `src/data/dtopPlaybookNarration.ts` (12 slides)
- `src/data/automationPlaybookNarration.ts` (~11 slides)
- `src/data/insightsPlaybookNarration.ts` (~11 slides)
- `src/data/mobilePlaybookNarration.ts` (~11 slides)
- `src/data/platformPlaybookNarration.ts` (~13 slides)
- `src/data/regulationManagementPlaybookNarration.ts` (~11 slides)
- `src/data/signalsPlaybookNarration.ts` (~10 slides)

Each file mirrors the existing `coanalystNarration.ts` shape: a `*Narration` interface and an exported array keyed by slide `id` (string, matching the slide IDs already used in each playbook page), plus a `get*Narration(slideId)` helper. Default voice id reused from existing files (`JBFqnCBsd6RMkjVDRZzb`).

All scripts respect locked memory rules: BrandNumber product naming, no FOQA/FDM/ASAP raw acronyms, canonical DTOP color story, ~90% vs ~35% CoAnalyst headline, locked roadmap dates, trust signals, no "pilot" framing.

### 2. Seven new narration hooks

One per playbook, each a thin clone of `useCoAnalystNarration.ts` (cache by slide id, single audio element, manual start, no auto-play, hits the existing `elevenlabs-tts` edge function):

- `src/hooks/useDTOPPlaybookNarration.ts`
- `src/hooks/useAutomationPlaybookNarration.ts`
- `src/hooks/useInsightsPlaybookNarration.ts`
- `src/hooks/useMobilePlaybookNarration.ts`
- `src/hooks/usePlatformPlaybookNarration.ts`
- `src/hooks/useRegulationManagementPlaybookNarration.ts`
- `src/hooks/useSignalsPlaybookNarration.ts`

(Keys are strings — same shape as `useSalesEnablementNarration`, not the numeric variant.)

### 3. Wire each Playbook page to its hook

For each of the 7 playbook pages (`DTOPPlaybook.tsx`, `AutomationPlaybook.tsx`, `InsightsPlaybook.tsx`, `MobilePlaybook.tsx`, `PlatformPlaybook.tsx`, `RegulationManagementPlaybook.tsx`, `SignalsPlaybook.tsx`):

- Import and call the new hook.
- Track `activeSlide` (already exists in each).
- Pass `SlideNarrationProps` (`isActive`, `isPlaying`, `isLoading`, `progress`, `hasCompleted`, `onPlay`, `onPause`) to each slide component, exactly like `SalesEnablement.tsx` does today.

The slide components themselves already accept `SlideNarrationProps` because they're rendered inside `PitchSlideContainer`, which surfaces the glassmorphism control bar. No slide-component edits needed.

### 4. Wire the Academy lesson scroller to play narration

`LessonScroller` is currently presentation-only and passes no narration props. Update it so Academy lessons get the same control bar:

- `LessonScroller` accepts an optional `narration` prop (a generic narration controller object with `play(id)`, `pause()`, `isPlaying`, `isLoading`, `progress`, `hasCompleted`, `currentSlide`).
- When provided, it tracks the active slide index and clones each child element via `React.Children.map` to inject the matching `SlideNarrationProps` (so we don't need to refactor every Academy module page).
- `ModuleLesson.tsx` selects the right narration hook based on the module's playbook (DTOP, Signals, etc.), or falls back to `useSalesEnablementNarration` for the three Core week modules. A small map keyed by `module.id` → hook resolves which to use.

### 5. Memory updates

- Update `mem://content/sales-enablement/coach-script-standard.md` to note that the Coach Script Standard now applies to all 7 Specialist Playbook narration files as well, not just Sales Enablement.
- Update `mem://index.md` core line so future loops know every playbook has narration.

## Out of scope

- No changes to slide visual components.
- No changes to quiz or certification flow.
- No edge function changes — reuses existing `elevenlabs-tts`.
- No DB changes.

## Technical notes

- ~80 new narration scripts total. They will be written in the same teaching tone as the existing Sales Enablement scripts, not customer-delivered marketing copy.
- ElevenLabs cost: scripts cache per slide per session (Map in the hook), and audio is only fetched on the first manual play of each slide — same pattern as today.
- Hook duplication is intentional and matches the existing per-deck-hook convention in this codebase. A future refactor could collapse them into a single generic `useDeckNarration(slideMap)` factory, but that's a separate cleanup, not part of this scope.
