

# Revise OpsSlide8 Maturity Roadmap — Rich Detail + Ways of Working

## Problem
Current slide is sparse — just a generic one-liner per stage and a basic SVG curve. No detail on how teams actually change their way of working, no metrics, no behavioral shifts.

## Solution
Rebuild `OpsSlide8MaturityRoadmap.tsx` using the rich data model already defined in `MaturityCurveVisualization.tsx`. Each stage will show:

1. **What it looks like** — 3-4 bullet points describing operations at that stage
2. **Behavioral shift** — "From X → To Y" with cultural marker
3. **Time allocation bar** — visual split of Coordination / Admin / Improvement (shows the shift from 60% coordination to 70% improvement)
4. **Value proof metrics** — concrete KPIs as badges
5. **Result** — what changes as an outcome

## Layout
- **Left column (40%):** Compact SVG maturity curve (keep clickable dots, shrink vertically)
- **Right column (60%):** Rich detail panel for active stage containing all 5 sections above

## Data
Reuse the exact `stagesData` array from `MaturityCurveVisualization.tsx` — import the `MaturityStage` interface and inline the same data (or extract to shared file). This gives us `whatItLooksLike`, `behavioralShift`, `timeAllocation`, `valueProof`, and `result` per stage.

## File Changes
**Edit:** `src/components/ops-slides/OpsSlide8MaturityRoadmap.tsx`
- Replace the thin `stages` array with the full `stagesData` content
- Replace the sparse right panel with a structured detail panel showing all 5 sections
- Add a stacked time-allocation bar (3 colored segments with labels)
- Add behavioral shift "From → To" row with arrow icon
- Add value proof metric badges
- Keep the SVG curve + clickable dots on the left but make it more compact

