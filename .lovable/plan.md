

## Tech Deep Dive v4 — Remove "Intelligence & Orchestration —" from slide titles

A few v4 slides still carry the legacy "Intelligence & Orchestration —" prefix in their titles. Strip it so titles read as the capability name only.

### Changes

| File | Current title | New title |
|---|---|---|
| `TechV4Slide7CoAnalyst.tsx` | `The Platform · Intelligence & Orchestration — Insights & Intelligence (CoAnalyst)` | `The Platform · Insights & Intelligence (CoAnalyst)` |
| `TechV4SlideInsights.tsx` | `The Platform · Intelligence & Orchestration — Recommendations & Prescriptive Actions` | `The Platform · Recommendations & Prescriptive Actions` |
| `TechV4SlideAutomation.tsx` | (audit — remove prefix if present) | `The Platform · Automation` |
| `TechV4SlideTiersVsAI.tsx` | (audit — remove prefix if present) | prefix removed |
| `TechV4SlideIntelligenceSubstrate.tsx` | (audit — remove prefix if present) | prefix removed |

### Files

**EDITED**
- `src/components/tech-slides/v4/TechV4Slide7CoAnalyst.tsx`
- `src/components/tech-slides/v4/TechV4SlideInsights.tsx`
- Any other v4 slide whose title contains "Intelligence & Orchestration —" (audit pass)

### Not touched

- v3 slides (`/pitch-technical`) — titles unchanged.
- Slide IDs, subtitles, navigation, narration, exports.

### QA

- `/pitch-technical-v4`: no slide title contains "Intelligence & Orchestration —".
- `/pitch-technical` (v3): titles unchanged.

