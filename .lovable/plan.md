

## Tech Deep-Dive — Slide Titles + Reorder

Two changes: (1) prefix every capability slide title with its architecture layer name, (2) reorder Mobile and Intelligence Tiers slides.

## Fix 1 — Title prefixes

Update the `title` prop on `SalesSlideContainer` for each capability slide so the layer is always present in the title.

| Slide | Current title | New title |
|---|---|---|
| TechSlide4aSafetyManager | `SafetyManager365` | `Core Operational Apps — SafetyManager365` |
| TechSlide4bContentManager | `ContentManager365 + CoAuthor` | `Core Operational Apps — ContentManager365 + CoAuthor` |
| TechSlide4cTrainingManager | `TrainingManager365 + CoTrainer` | `Core Operational Apps — TrainingManager365 + CoTrainer` |
| TechSlide7CoAnalyst | `CoAnalyst — From Reports to Intelligence` | `Intelligence & Orchestration Layer — From Reports to Intelligence` |
| TechSlideInsights | `Insights & Recommendations` | `Intelligence & Orchestration Layer — Insights & Recommendations` |
| TechSlideAutomation | (current automation title) | `Intelligence & Orchestration Layer — Automation & Orchestration` |

Subtitles unchanged. ArchitectureLayerBadge stays — title text now reinforces the badge.

## Fix 2 — Slide reorder in `TechnicalDeepDive.tsx`

Move two slides:
- **Mobile** (`TechSlideMobile`) → comes **after Automation** (currently sits earlier in Act 4).
- **Intelligence Tiers** (`TechSlideTiersVsAI`) → comes **after the Operating Model / DTOP** slide (currently sits in the Intelligence section).

Resulting Act 2 + Act 4 order:

```text
Act 2 (Architecture):
  Platform → Safety → Content → Training → Data Foundation
Act 3 (Intelligence):
  CoAnalyst → Insights → Automation → Mobile
Act 4 (Operating Model + Use Cases):
  DTOP (Operating Model) → Intelligence Tiers → Use Cases → Integrations
```

(Mobile moves out of Act 4 into the end of the Intelligence section right after Automation per the request; Intelligence Tiers moves into Act 4 right after DTOP.)

## Out of scope

- No copy/body changes, no narration script edits, no badge logic changes.
- Build error in `TechSlideUseCases.tsx(31,58)` is unrelated to this request and will be addressed separately if the user flags it.

## Files touched

- Edit: `TechSlide4aSafetyManager.tsx`, `TechSlide4bContentManager.tsx`, `TechSlide4cTrainingManager.tsx`, `TechSlide7CoAnalyst.tsx`, `TechSlideInsights.tsx`, `TechSlideAutomation.tsx` (title strings only).
- Edit: `src/pages/TechnicalDeepDive.tsx` (reorder two slide entries).

