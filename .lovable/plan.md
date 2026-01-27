
# Plan: Comprehensive Slide Deck Feedback Implementation

## Overview

This plan addresses all feedback points from the review, organized by slide page number. The changes span talk track updates, visual adjustments, metric alignment, and narration synchronization fixes.

---

## Page-by-Page Changes

### Page 2: Strategic Shift (Slide 1)

**Feedback**: The bullets on the right are more powerful than the talk track. Use more of the bullets in talk track.

| File | Change |
|------|--------|
| `src/data/slideNarration.ts` | Enhance script for slideId 1 to incorporate the stronger bullet points verbatim |

**Current bullets in code** (`Slide1StrategicShift.tsx`):
- "Signals scattered across siloed systems — no unified view of operational risk"
- "No automated trigger when a procedure, training, or safety gap is detected"
- "Manual coordination slows change — handoffs, spreadsheets, email approvals"
- "Procedural drift between what's documented, trained, and actually done"
- "Audit evidence gathered reactively — duplicated effort, incomplete proof"

**Updated script** will include these exact phrases for more impact.

---

### Page 3: Before & After (Slide 2)

**Feedback**:
1. Should we have more compelling value generated (like revenue protection)?
2. "Workforce readiness" unclear as a metric
3. Training records are disconnected, not "stale"
4. Talk track pauses between "Comply" and "365" — it's one word

| File | Change |
|------|--------|
| `src/components/slides/Slide2BeforeAfter.tsx` | Change "45K stale" to "45K disconnected"; update metrics to include revenue protection language |
| `src/data/slideNarration.ts` | Update slideId 2: Change "forty-five thousand records going stale" to "disconnected from operational signals"; explain "Workforce readiness" means "trained and assessed for current procedures"; confirm "Comply three six five" pronunciation is correct (already is) |

**Visual updates**:
- Change Training silo label from "45K stale" → "45K disconnected"
- Add "disconnected from operational signals" sub-label

---

### Page 4: Operating Model (Slide 3)

**Feedback**:
1. Talk track should not spell out FOQA and ASAP letter by letter — use their names
2. Talk track does not match when Detect/Trigger/Orchestrate/Prove light up
3. Metrics consistency question

| File | Change |
|------|--------|
| `src/data/slideNarration.ts` | Update slideId 3: Change "F-O-Q-A, A-S-A-P" to "Flight Ops Quality Assurance" and "Aviation Safety Action Program" (or simply speak naturally without spelling); adjust timing references to match step timings |
| `src/components/slides/Slide3OperatingModel.tsx` | Adjust `stepTimings` array to better sync with narration content |

**Current timings**:
```tsx
const stepTimings = [
  { index: 0, startPercent: 15 },  // Detect
  { index: 1, startPercent: 30 },  // Trigger
  { index: 2, startPercent: 50 },  // Orchestrate
  { index: 3, startPercent: 70 },  // Prove
];
```

Will adjust to align with where each step is mentioned in the script.

---

### Page 5: Platform Capabilities (Slide 4)

**Feedback**:
1. Talk track and boxes sync to be fixed
2. Did we use any science behind the benefits or are these hypotheses?

| File | Change |
|------|--------|
| `src/components/slides/SlidePlatformCapabilities.tsx` | Adjust `capabilityTimings` to better sync with narration |
| Consider adding footnote | "Based on customer outcomes and industry benchmarks" or similar disclaimer |

**Current timings**:
```tsx
const capabilityTimings = [
  { index: 0, startPercent: 15 },  // Data That Connects
  { index: 1, startPercent: 40 },  // Automation That Adapts
  { index: 2, startPercent: 65 },  // AI That Drives
];
```

Will analyze script to realign.

---

### Page 6: Transformation (Slide 5)

**Feedback**:
- AI finding weak signals 70% faster — would change to "infinitely faster"

| File | Change |
|------|--------|
| `src/components/slides/Slide4Transformation.tsx` | Update `possibilities[0]` from "70%" and "faster" to a qualitative statement like "∞" with "earlier" or reframe as "Impossible without AI" |
| `src/data/slideNarration.ts` | Update slideId 5 to match new language |

---

### Page 7: Operational Performance Ladder (Slide 6)

**Feedback**:
1. Increase font size of "where time goes"
2. Say that one or two products from Comply365 can take you to Stage 2
3. In Stage 4, says Training is targeted and personalized
4. Align talk track with clicks
5. Final sentence — "makes this journey possible" (not "accelerate")
6. Each stage has valuable bullets that talk track skips — consider expanding

| File | Change |
|------|--------|
| `src/components/slides/Slide4ValuePyramid.tsx` | Increase font sizes in time allocation section |
| `src/components/slides/Slide4ValuePyramid.tsx` | Add note to Stage 2 data: "Individual best-in-class products from Comply365 can get you here" |
| `src/components/slides/Slide4ValuePyramid.tsx` | Stage 4 already mentions "Training is targeted and triggered by change" — verify personalization language |
| `src/data/slideNarration.ts` | Update slideId 6: Change "accelerates this journey" to "makes this journey possible"; expand to cover more stage-specific bullets; adjust timing sync |

---

### Page 8: Operational Performance Roadmap (Slide 7)

**Feedback**:
1. Are pages 7 and 8 additive or alternative?
2. Continue green line above Stage 3 and add "Inflection Point" box
3. In Stage 2, note that individual Comply365 systems can get you there
4. Include "where teams spend time" graphic if alternative

| File | Change |
|------|--------|
| `src/components/slides/Slide5MaturityCurve.tsx` | Add "INFLECTION POINT" marker above Stage 3 (similar to "PLATFORM SHIFT" but positioned above the curve) |
| `src/components/slides/Slide5MaturityCurve.tsx` | Add annotation to Stage 2: "Best-in-class Comply365 products" |
| Consider | Add time allocation bars to this slide as well (duplicating from Slide 6) |
| `src/data/slideNarration.ts` | Update slideId 7 to reference Stage 2 annotation and inflection point |

---

### Page 9: Competitive Positioning (Slide 8)

**Feedback**:
- Making some competitors bigger than they are (Web Manuals, Hinfact, Centrik, Ideagen). Revise and resize.
- Page 9 is for potential investors and lower priority.

| File | Change |
|------|--------|
| `src/components/slides/Slide8PositioningMap.tsx` | Adjust vendor positions to be more realistic |

**Current positions**:
```tsx
{ name: "Comply365", breadth: 8, depth: 8 },
{ name: "Ideagen", breadth: 7.5, depth: 4.2 },
{ name: "TrustFlight Centrik", breadth: 6.0, depth: 3.4 },
{ name: "Hinfact", breadth: 4.5, depth: 4.0 },
{ name: "Web Manuals", breadth: 4.0, depth: 4.4 },
```

**Revised positions** (smaller/lower):
```tsx
{ name: "Ideagen", breadth: 5.5, depth: 3.5 },
{ name: "TrustFlight Centrik", breadth: 4.5, depth: 2.8 },
{ name: "Hinfact", breadth: 3.0, depth: 3.2 },
{ name: "Web Manuals", breadth: 2.8, depth: 3.0 },
```

---

### Page 10: Customers (Slide 9)

**Feedback**:
1. Talk track says audit prep time reduces by 30% but graph shows 80%
2. What is the idea behind Benchmarking program — do we offer it today?

| File | Change |
|------|--------|
| `src/data/slideNarration.ts` | Update slideId 9: Change "thirty percent" to "eighty percent" to match visual, OR update visual to 30% |
| `src/components/slides/Slide7Customers.tsx` | Add clarifying note to Benchmarking section: "(Available now)" or "(Coming soon)" |

**Decision needed**: Which metric is correct — 30% or 80%? Plan will align both to same value.

---

### Page 11: AI Vision / Becoming an AI Company (Slide 10)

**Feedback**:
1. What's the objective? Seems disconnected from prior slides
2. Consider changing platform name to "ComplAI.365"
3. Delete the Brand Evolution section so slide can be used
4. Some Stage 5+ items we're already doing — communicate this
5. Don't spell out FOQA and ASAP

| File | Change |
|------|--------|
| `src/components/slides/SlideAIVision.tsx` | Remove the "Brand Evolution" section (right column domain options) |
| `src/components/slides/SlideAIVision.tsx` | Update "Today" stage to highlight capabilities already deployed |
| `src/data/slideNarration.ts` | Update slideId 10: Remove domain discussion; add connection to prior slides; don't spell out FOQA/ASAP |

**New slide layout**: Remove domain options grid, expand AI Evolution Journey to full width, add stronger connection to prior content.

---

### Page 12: Category Rationale (Slide 11)

**Feedback**:
- Quarter circles do not match the square being discussed

| File | Change |
|------|--------|
| `src/components/slides/Slide9CategoryRationale.tsx` | Review visual elements to ensure shapes align with content discussion |

Need to review specific visual issue — may be referring to the criteria check icons or alternative table layout.

---

### Page 14: Messaging House (Slide 13 - actually labeled as slide 12)

**Feedback**:
1. Add "personalized training" to key messages for Training Leader
2. If we add value KPIs and change title, it can become a nice conclusion page

| File | Change |
|------|--------|
| `src/components/slides/SlideMessagingHouse.tsx` | Add "Personalized training based on role and risk" to Training Leader key messages |
| Consider | Add value KPI summary banner at bottom and consider retitling as conclusion slide |

---

## File Summary

| File | Changes |
|------|---------|
| `src/data/slideNarration.ts` | Major updates to scripts for slides 1, 2, 3, 5, 6, 7, 9, 10 |
| `src/components/slides/Slide2BeforeAfter.tsx` | Change "stale" → "disconnected", update metric labels |
| `src/components/slides/Slide3OperatingModel.tsx` | Adjust step timings for sync |
| `src/components/slides/Slide4Transformation.tsx` | Update 70% → "∞" or qualitative statement |
| `src/components/slides/SlidePlatformCapabilities.tsx` | Adjust capability timings, add metrics footnote |
| `src/components/slides/Slide4ValuePyramid.tsx` | Increase font sizes, add Stage 2 note |
| `src/components/slides/Slide5MaturityCurve.tsx` | Add inflection point marker, Stage 2 annotation |
| `src/components/slides/Slide7Customers.tsx` | Align audit metric, clarify benchmarking availability |
| `src/components/slides/Slide8PositioningMap.tsx` | Reduce competitor sizes/positions |
| `src/components/slides/SlideAIVision.tsx` | Remove Brand Evolution section |
| `src/components/slides/Slide9CategoryRationale.tsx` | Fix visual alignment issue |
| `src/components/slides/SlideMessagingHouse.tsx` | Add personalized training message |

---

## Implementation Priority

| Priority | Changes |
|----------|---------|
| **High** | Talk track pronunciation fixes (FOQA/ASAP), metric alignment (30% vs 80%), competitor sizing |
| **Medium** | Animation sync fixes, content updates (stale→disconnected, 70%→∞), Stage 2 annotations |
| **Lower** | Brand Evolution removal (slide 10), font size increases, conclusion slide consideration |

---

## Questions for Clarification

1. **Page 10 audit metric**: Should it be 30% or 80%? Plan will align both to whichever is correct.
2. **Benchmarking program**: Is this currently available or coming soon?
3. **Pages 7 & 8**: Should both slides remain (additive), or should one be removed (alternative)?
4. **Benefits science**: Should we add a footnote indicating "Based on customer outcomes" or similar?

---

## Summary

| Metric | Count |
|--------|-------|
| Files to update | 12 |
| Talk track scripts to revise | 8 |
| Visual components to adjust | 9 |
| Timing syncs to fix | 3 |
| Competitor positions to revise | 4 |

