

# Plan: Fix Pyramid Timings and Align Homepage Agenda with Deck Structure

## Issues Identified

### Issue 1: Pyramid Stage Timings Bug

In `Slide4ValuePyramid.tsx`, the `stageTimings` array references a stage ID that doesn't exist:

```typescript
// Current (BROKEN)
const stageTimings = [
  { stage: "FRAGMENTED", startPercent: 10 },
  { stage: "MANAGED", startPercent: 24 },
  { stage: "CONNECTED", startPercent: 38 },
  { stage: "CLOSED_LOOP", startPercent: 55 },  // ❌ This ID doesn't exist!
  { stage: "PREDICTIVE", startPercent: 72 },
];
```

The layer IDs are: `FRAGMENTED`, `MANAGED`, `CONNECTED`, `INTELLIGENT`, `PREDICTIVE`

**Fix**: Change `CLOSED_LOOP` to `INTELLIGENT`

---

### Issue 2: Title Slide Agenda Mismatch

The agenda items in `Slide0Title.tsx` don't match the actual slide sequence in `SlideDeck.tsx`.

**Current Agenda (Slide0Title.tsx):**
| # | Label | Summary |
|---|-------|---------|
| 1 | Strategic Shift | Why we're defining the category |
| 2 | Before & After | Fragmentation vs. connected operations |
| 3 | Operating Model | Detect → Trigger → Orchestrate → Prove |
| 4 | Platform Capabilities | The intelligent operating layer |
| 5 | Transformation | From cost center to value driver |
| 6 | Value Ladder | How value compounds with maturity |
| 7 | Maturity Roadmap | The measurable performance journey |
| 8 | Positioning | Competitive landscape & differentiation |
| 9 | Customers | Real-world measurable outcomes |
| 10 | Investors | Building shareholder value |
| 11 | AI Vision | The intelligence layer roadmap |
| 12 | Messaging House | Complete positioning framework |
| 13 | Campaign Ideas | Category leadership campaigns |
| 14 | Messaging in Context | How positioning applies across domains |
| 15 | Homepage Experience | Category positioning in the product |

**Actual Deck Order (SlideDeck.tsx slides array):**
| Index | ID | Label | Component |
|-------|-----|-------|-----------|
| 0 | slide-0 | Title | Slide0Title |
| 1 | slide-1 | Strategic Shift | Slide1StrategicShift |
| 2 | slide-2 | Before & After | Slide2BeforeAfter |
| 3 | slide-3 | Operating Model | Slide3OperatingModel |
| 4 | slide-5 | Use Cases | SlideUseCases |
| 5 | slide-6 | Transformation | Slide5Transformation |
| 6 | slide-7 | Value Ladder | Slide6ValuePyramid |
| 7 | slide-8 | Maturity Roadmap | Slide7MaturityCurve |
| 8 | slide-9 | AI Journey | SlideAIVision |
| 9 | slide-10 | Customers | Slide9Customers |
| 10 | slide-11 | Messaging House | SlideMessagingHouse |
| 11 | slide-12 | Campaign Ideas | SlideCampaignIdeas |
| 12 | slide-13 | Messaging in Context | SlideMessagingContext |
| 13 | slide-14 | Platform Experience | SlidePlatformExperience |
| 14 | slide-15 | Next Steps | SlideConclusion |

**Mismatches:**
- Item 4: Agenda says "Platform Capabilities" but deck has "Use Cases"
- Item 8: Agenda says "Positioning" but that slide is hidden
- Item 9: Agenda says "Customers" but that's now at position 10
- Item 10: Agenda says "Investors" but that slide is hidden
- Item 11: Agenda says "AI Vision" but that's now at position 9
- Item 15: Agenda says "Homepage Experience" but deck says "Next Steps"

---

## Technical Changes

### File 1: `src/components/slides/Slide4ValuePyramid.tsx`

**Change**: Fix the stage ID mismatch in `stageTimings` (line 198)

```typescript
// Before
{ stage: "CLOSED_LOOP", startPercent: 55 },

// After
{ stage: "INTELLIGENT", startPercent: 55 },
```

---

### File 2: `src/components/slides/Slide0Title.tsx`

**Change**: Update `agendaItems` array to match actual deck structure (lines 6-22)

```typescript
const agendaItems = [
  { num: 1, label: "Strategic Shift", summary: "Why we're defining the category" },
  { num: 2, label: "Before & After", summary: "Fragmentation vs. connected operations" },
  { num: 3, label: "Operating Model", summary: "Detect → Trigger → Orchestrate → Prove" },
  { num: 4, label: "Use Cases", summary: "DTOP in action across real scenarios" },
  { num: 5, label: "Transformation", summary: "From cost center to value driver" },
  { num: 6, label: "Value Ladder", summary: "How value compounds with maturity" },
  { num: 7, label: "Maturity Roadmap", summary: "The measurable performance journey" },
  { num: 8, label: "AI Journey", summary: "Your intelligence acceleration path" },
  { num: 9, label: "Customers", summary: "Real-world measurable outcomes" },
  { num: 10, label: "Messaging House", summary: "Complete positioning framework" },
  { num: 11, label: "Campaign Ideas", summary: "Category leadership campaigns" },
  { num: 12, label: "Messaging in Context", summary: "How positioning applies across domains" },
  { num: 13, label: "Homepage Experience", summary: "Category positioning in the product" },
  { num: 14, label: "Next Steps", summary: "Your path forward" },
];
```

**Note**: The grid layout may need adjustment from `grid-cols-4` to accommodate 14 items cleanly.

---

## Summary of Changes

| File | Change |
|------|--------|
| `src/components/slides/Slide4ValuePyramid.tsx` | Fix `CLOSED_LOOP` → `INTELLIGENT` in stageTimings |
| `src/components/slides/Slide0Title.tsx` | Update agendaItems to match actual 14-slide deck structure |

---

## Expected Outcome

1. **Pyramid narration sync**: Stage 4 (Intelligent Operations) will now correctly highlight when the narration mentions it
2. **Agenda alignment**: Title slide clickable items will navigate to the correct slides and show accurate labels

