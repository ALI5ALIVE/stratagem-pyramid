## Fix

Global replace **LMS → TMS** across every occurrence in the deck (user confirmed: all of them, including competitor/objection contexts).

**Files to update** (15 occurrences across 8 files):

- `src/exporters/pptx/buildTechnicalDeck.ts` (1)
- `src/data/week3FieldKit.ts` (5)
- `src/data/salesEnablementNarration.ts` (2)
- `src/data/practiceSlidePrompts.ts` (3)
- `src/data/dtopPlaybook.ts` (5)
- `src/data/insightsPlaybook.ts` (1)
- `src/data/personaProfiles.ts` (3)
- `src/components/tech-slides/TechSlide1StrategicShift.tsx` (1)

Done via a single `sed -i 's/LMS/TMS/g'` pass over those files, then `rg -n "LMS" src/` to confirm zero remaining.

No other content changes.
