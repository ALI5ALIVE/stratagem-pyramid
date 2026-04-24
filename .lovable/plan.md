

## Tech Deep Dive v4 — Remove the architecture pill row from all slides

The small "Platform · DTOP › Mobile › Intelligence › Data Foundation › Core Apps · Insights & Intelligence Recommendations Automation" strip on each v4 slide comes from the shared `ArchitectureLayerBadge` component. Since v4 has dropped the layered/architecture framing, remove the badge from every v4 slide.

### Change

In each of the 10 v4 slides below, delete the `ArchitectureLayerBadge` import and its JSX usage. Where the badge sits inside a flex row with a `DeepDiveLink` (Mobile, Automation, Insights, CoAnalyst, DTOP), keep the link but simplify the wrapper so the link sits naturally on its own.

### Files

**EDITED**
- `src/components/tech-slides/v4/TechV4Slide4aSafetyManager.tsx`
- `src/components/tech-slides/v4/TechV4Slide4bContentManager.tsx`
- `src/components/tech-slides/v4/TechV4Slide4cTrainingManager.tsx`
- `src/components/tech-slides/v4/TechV4Slide5DTOP.tsx`
- `src/components/tech-slides/v4/TechV4Slide7CoAnalyst.tsx`
- `src/components/tech-slides/v4/TechV4SlideAutomation.tsx`
- `src/components/tech-slides/v4/TechV4SlideInsights.tsx`
- `src/components/tech-slides/v4/TechV4SlideMobile.tsx`
- `src/components/tech-slides/v4/TechV4SlideTiersVsAI.tsx`
- `src/components/tech-slides/v4/TechV4SlideIntelligenceSubstrate.tsx` (only if still rendered anywhere; otherwise leave as-is)

### Not touched

- `ArchitectureLayerBadge.tsx` itself — still used by v3 slides at `/pitch-technical`.
- All v3 slides — unchanged.
- Slide IDs, titles, navigation, narration, exports.

### QA

- `/pitch-technical-v4`: no slide shows the "Platform · DTOP › Mobile › …" pill row.
- DeepDiveLink buttons still appear on Mobile, Automation, Insights, CoAnalyst, DTOP slides.
- `/pitch-technical` (v3): pill row still present on the original tech slides.

