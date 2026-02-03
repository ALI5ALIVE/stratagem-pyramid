
# Plan: Align Animation and Narration Timings on Operational Performance Roadmap

## Analysis

The current narration script for Slide 7 (slideId: 7) has this structure:

| Section | Content Start | Approximate Word Count |
|---------|---------------|------------------------|
| Introduction | "This roadmap shows..." | ~20 words |
| Stage 1 | "Stage One: Fragmented and Reactive" | ~45 words |
| Stage 2 | "Stage Two: Managed but Siloed" | ~40 words |
| Stage 3 | "Stage Three: Connected Governance" | ~40 words |
| Stage 4 | "Stage Four: Intelligent Operations" | ~40 words |
| Stage 5 | "Stage Five: Predictive Operations" | ~45 words |
| Closing | "Without the platform..." | ~35 words |

**Total: ~265 words (~100 seconds at natural pace)**

## Refined Timing Calculation

Based on word distribution and natural speech pacing:

| Stage | Current % | New % | Trigger Point |
|-------|-----------|-------|---------------|
| 1 | 8% | 5% | "Stage One: Fragmented" |
| 2 | 22% | 22% | "Stage Two: Managed" |
| 3 | 38% | 40% | "Stage Three: Connected" |
| 4 | 55% | 58% | "Stage Four: Intelligent" |
| 5 | 73% | 75% | "Stage Five: Predictive" |

---

## Technical Changes

### File: `src/components/slides/Slide5MaturityCurve.tsx`

#### Update `stageTimings` array (lines 93-99)

Adjust the timing percentages to better align with when each stage is verbally mentioned:

**Current:**
```typescript
const stageTimings = [
  { stage: 1, startPercent: 8 },
  { stage: 2, startPercent: 22 },
  { stage: 3, startPercent: 38 },
  { stage: 4, startPercent: 55 },
  { stage: 5, startPercent: 73 },
];
```

**New:**
```typescript
const stageTimings = [
  { stage: 1, startPercent: 5 },   // "Stage One: Fragmented..."
  { stage: 2, startPercent: 22 },  // "Stage Two: Managed..."
  { stage: 3, startPercent: 40 },  // "Stage Three: Connected..."
  { stage: 4, startPercent: 58 },  // "Stage Four: Intelligent..."
  { stage: 5, startPercent: 75 },  // "Stage Five: Predictive..."
];
```

---

## Updated Memory Reference

The existing memory at `features/narration-animation-sync-timings` should be updated to reflect:
- Slide 7 (Roadmap) timings: [5%, 22%, 40%, 58%, 75%]

---

## Expected Behavior

| Narration Progress | Visual Animation |
|--------------------|------------------|
| 0-5% | Introduction - Stage 1 pre-selected |
| 5-22% | Stage 1 highlighted (Crew Fatigue use case) |
| 22-40% | Stage 2 highlighted (Runway Incursion use case) |
| 40-58% | Stage 3 highlighted (MEL Procedure use case) |
| 58-75% | Stage 4 highlighted (Hard Landing use case) |
| 75-95% | Stage 5 highlighted (Smoke & Fumes use case) |
| 95-100% | Closing summary |

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/slides/Slide5MaturityCurve.tsx` | Update `stageTimings` percentages to 5%, 22%, 40%, 58%, 75% |
