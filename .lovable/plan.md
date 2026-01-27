

# Plan: Narrative Review and Animation Sync Audit

## Overview

This plan addresses a comprehensive review of all slide narration scripts to ensure they:
1. Accurately reflect what each slide is trying to convey (using copy as a guide, not reading verbatim)
2. Properly sync with any animations/transitions on each slide

---

## Current State Analysis

### Slides with Animation Sync

| Slide | Component | Animation Type | Current Timings |
|-------|-----------|----------------|-----------------|
| 3 - Operating Model | `Slide3OperatingModel.tsx` | Step highlighting (Detect/Trigger/Orchestrate/Prove) | 10%, 25%, 40%, 55% |
| 4 - Platform Capabilities | `SlidePlatformCapabilities.tsx` | Capability card expansion | 12%, 35%, 55% |
| 6 - Performance Ladder | `Slide4ValuePyramid.tsx` | Pyramid layer highlighting | 8%, 22%, 35%, 52%, 70% |
| 7 - Performance Roadmap | `Slide5MaturityCurve.tsx` | Stage marker highlighting | 5%, 20%, 35%, 52%, 70% |
| 10 - AI Vision | `SlideAIVision.tsx` | AI stage timeline | 15%, 35%, 55%, 75% |
| 12 - Messaging House | `SlideMessagingHouse.tsx` | Persona tab switching | 72%, 78%, 83%, 88% |

---

## Slide-by-Slide Review

### Slide 0: Title
**Current Narration**: Introduces category definition, problem with fragmented tools, and deck overview
**Slide Content**: Title, logo, and 13-item agenda grid
**Assessment**: Good - sets up the narrative arc
**Changes**: None required

---

### Slide 1: Strategic Shift
**Current Narration**: Lists the 5 operational gaps, introduces "Operational Performance Platform"
**Slide Content**: 
- Visual: Category shift (Safety Tool + Manuals Tool + LMS → Operational Performance Platform)
- 5 bullet points on operational gaps
- Category definition box
**Assessment**: Strong alignment - narration already incorporates the bullets
**Changes**: Minor refinement to match the visual transformation (point tools → platform)

**Updated Script Focus**:
- Mention the visual transformation explicitly ("What you see on screen...")
- Ensure pacing allows viewer to process the category shift visual

---

### Slide 2: Before & After
**Current Narration**: Describes fragmentation metrics (12K, 8K, 45K), transformation outcomes
**Slide Content**:
- Before: 12K scattered, 8K orphaned, 45K disconnected
- After: 65K+ connected, +3.2% OTP, 94% Ready, 2hr Audit
- "Unlike" callout at bottom
**Assessment**: Good metric alignment
**Changes**: 
- Ensure "disconnected from operational signals" language is used (already updated)
- Add brief explanation of "Workforce readiness" metric

---

### Slide 3: Operating Model ⚠️ ANIMATION SYNC
**Current Narration**: Describes Detect → Trigger → Orchestrate → Prove flow
**Current Timings**: 10%, 25%, 40%, 55%
**Slide Content**:
- Infinity model visual
- 4-step pipeline with metrics (12K, 850, 340, 100%)
- Value outputs (OTP, Ready, Audit, Repeat)

**Script Analysis**:
Looking at the script, the timing mentions are:
- "First, Detect. We capture twelve thousand signals..." → Should start at ~10%
- "Then, Trigger. Those signals automatically trigger..." → Should start at ~25%
- "Next, Orchestrate. Controlled procedural change..." → Should start at ~40%
- "Finally, Prove. Every action creates audit-ready evidence..." → Should start at ~55%

**Assessment**: Timings appear reasonable but script pacing should be verified
**Changes**:
- Adjust timings to: 12%, 28%, 45%, 62% for better distribution
- Add transition phrases that signal visual changes

---

### Slide 4: Platform Capabilities ⚠️ ANIMATION SYNC
**Current Narration**: Describes 3 capabilities (Data, Automation, AI)
**Current Timings**: 12%, 35%, 55%
**Slide Content**:
- Platform ecosystem image
- 3 expandable capability cards
- 3 outcome metrics at bottom

**Script Analysis**:
- "First: Data That Connects..." → Card 1 expands at ~12%
- "Second: Automation That Adapts..." → Card 2 expands at ~35%
- "Third: AI That Drives..." → Card 3 expands at ~55%

**Assessment**: Timings need adjustment - script mentions outcomes after capabilities
**Changes**:
- Adjust to: 15%, 38%, 58% to allow outcome discussion at end
- Ensure footnote about "customer outcomes and industry benchmarks" is mentioned

---

### Slide 5: Transformation
**Current Narration**: Describes before/after shift, time allocation, new possibilities
**Slide Content**:
- Before/After comparison boxes
- Time Allocation Shift bars (60%/30%/10% → 10%/20%/70%)
- 4 "New Possibilities" cards with metrics
**Assessment**: Good alignment
**Changes**:
- Confirm "∞ earlier" language for AI detection is in script (already updated)

---

### Slide 6: Performance Ladder ⚠️ ANIMATION SYNC
**Current Narration**: Walks through 5 stages bottom-to-top
**Current Timings**: 8%, 22%, 35%, 52%, 70%
**Slide Content**:
- Pyramid3D visualization with 5 layers
- Details panel with stage information
- Stage 2 note about individual C365 products

**Script Analysis**:
- "At the bottom is Stage One: Fragmented and Reactive..." → 8%
- "Stage Two: Managed but Siloed..." → 22%
- "Stage Three: Connected Governance..." → 35%
- "Stage Four: Closed-Loop Improvement..." → 52%
- "And at the apex — Stage Five: Predictive and Agentic..." → 70%

**Assessment**: Script needs to emphasize key bullets from each stage
**Changes**:
- Adjust timings to: 10%, 24%, 38%, 55%, 72%
- Add "Training is targeted, personalized, and triggered by change" for Stage 4
- Change "accelerates this journey" to "makes this journey possible" (already done)

---

### Slide 7: Performance Roadmap ⚠️ ANIMATION SYNC
**Current Narration**: Describes the hockey stick curve and stage progression
**Current Timings**: 5%, 20%, 35%, 52%, 70%
**Slide Content**:
- Hockey stick curve visualization
- PLATFORM SHIFT marker at Stage 3
- INFLECTION POINT marker above Stage 3
- Stage 2 annotation about C365 products
- Summary banner

**Script Analysis**:
The script mentions:
- Stage 1/2 entry points
- "Stage Three is the critical inflection point"
- Stage 4/5 acceleration

**Assessment**: Needs emphasis on new visual elements
**Changes**:
- Adjust timings to match curve animation
- Add explicit reference to "inflection point" visual
- Reference Stage 2 C365 annotation

---

### Slide 8: Positioning
**Current Narration**: Describes competitive landscape, quadrant positioning
**Slide Content**:
- Tabbed view (Matrix/Radar)
- 2x2 strategic matrix with quadrants
- Competitor positions (adjusted lower/left)
**Assessment**: Good alignment
**Changes**:
- Competitor sizes have been reduced - script should reflect this subtly

---

### Slide 9: Customers
**Current Narration**: Describes 3 KPI categories, executive value prop, benchmarking
**Slide Content**:
- Executive Value Proposition banner
- Cost Center → Performance → Revenue flow
- 3 gauge visualizations
- Benchmarking Program section
**Assessment**: Good structure
**Changes**: None required

---

### Slide 10: AI Vision ⚠️ ANIMATION SYNC
**Current Narration**: Describes AI evolution (Today → Near-term → Future)
**Current Timings**: 15%, 35%, 55%, 75%
**Slide Content**:
- AI Evolution Journey timeline (3 stages)
- Operating Model callback (Detect→Trigger→Orchestrate→Prove)
- "Already Deployed Today" section (new)
- Connection to Performance Ladder

**Script Analysis**:
- Timeline stages highlighted progressively
- Brand Evolution section has been removed (already done)

**Assessment**: Script updated to remove brand discussion; needs to emphasize deployed capabilities
**Changes**:
- Ensure script references "Already Deployed Today" section
- Timing adjustments: 18%, 40%, 60% for 3 stages
- Remove domain discussion (already done)

---

### Slide 11: Category Rationale
**Current Narration**: Explains why "Operational Performance Platform"
**Slide Content**:
- Hero banner with category name
- 5 criteria checks (COO Clarity, Outcome Focus, etc.)
- Alternatives table
- Closing statement
**Assessment**: Good alignment
**Changes**: None required

---

### Slide 12: Messaging House ⚠️ ANIMATION SYNC
**Current Narration**: Describes complete positioning architecture
**Current Timings**: 72%, 78%, 83%, 88% (for persona tabs)
**Slide Content**:
- House structure (roof → pillars → foundation)
- Operating model spine
- 5 persona value propositions
- Differentiation statement

**Script Analysis**:
Persona mentions appear late in script - need to verify alignment with timings

**Assessment**: Persona timing may need adjustment
**Changes**:
- Verify persona mentions occur at: 72% (CEO/COO), 78% (Safety), 83% (Compliance), 88% (Training)
- Add "personalized training" mention for Training Leader (already added to component)

---

### Slide 13: Campaign Ideas
**Current Narration**: Describes 10 campaigns organized by funnel stage
**Slide Content**:
- Campaign Hierarchy Strip (3 funnel stages)
- 3 Flagship Campaign cards
- 7 Supporting Campaign cards
- Internal Rule banner
**Assessment**: Good alignment - comprehensive coverage
**Changes**: None required

---

## Summary of Changes Required

### Timing Adjustments

| Slide | Component | Current | Proposed |
|-------|-----------|---------|----------|
| 3 | `Slide3OperatingModel.tsx` | 10%, 25%, 40%, 55% | 12%, 28%, 45%, 62% |
| 4 | `SlidePlatformCapabilities.tsx` | 12%, 35%, 55% | 15%, 38%, 58% |
| 6 | `Slide4ValuePyramid.tsx` | 8%, 22%, 35%, 52%, 70% | 10%, 24%, 38%, 55%, 72% |
| 7 | `Slide5MaturityCurve.tsx` | 5%, 20%, 35%, 52%, 70% | 8%, 22%, 38%, 55%, 73% |
| 10 | `SlideAIVision.tsx` | 15%, 35%, 55%, 75% | 18%, 40%, 62% |

### Script Refinements

| Slide | Change Description |
|-------|-------------------|
| 1 | Add reference to visual transformation on screen |
| 3 | Add transition phrases between steps |
| 6 | Expand stage descriptions; emphasize Stage 2 C365 note |
| 7 | Add explicit inflection point reference |
| 10 | Emphasize "Already Deployed Today" capabilities |
| 12 | Verify persona timing alignment |

---

## Files to Update

| File | Changes |
|------|---------|
| `src/data/slideNarration.ts` | Refine scripts for slides 1, 3, 6, 7, 10 |
| `src/components/slides/Slide3OperatingModel.tsx` | Adjust stepTimings array |
| `src/components/slides/SlidePlatformCapabilities.tsx` | Adjust capabilityTimings array |
| `src/components/slides/Slide4ValuePyramid.tsx` | Adjust stageTimings array |
| `src/components/slides/Slide5MaturityCurve.tsx` | Adjust stageTimings array |
| `src/components/slides/SlideAIVision.tsx` | Adjust getActiveStageIndex thresholds |

---

## Implementation Priority

| Priority | Items |
|----------|-------|
| **High** | Animation timing sync (Slides 3, 4, 6, 7) |
| **Medium** | Script refinements for missing content (Slides 6, 7, 10) |
| **Low** | Minor phrasing improvements (Slides 1, 12) |

