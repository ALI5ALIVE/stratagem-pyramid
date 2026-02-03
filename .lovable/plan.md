
# Plan: Update Use Cases Narration Script and Align Slide-Narration Indices

## Problem Analysis

After reviewing the transcript and codebase, I identified two issues:

1. **Index Mismatch**: The `SlideUseCases` component receives `getNarrationProps(4)`, but the narration script has `slideId: 6` for "Use Cases in Action". This means the narration isn't playing correctly for this slide.

2. **Narration Script Content**: While the current script mentions all three use cases, the transcript feedback suggests:
   - Emphasize the DTOP framework more explicitly throughout each use case
   - Add cost savings and revenue protection language
   - Make the connection to tangible business outcomes clearer
   - Ground each example in the "Signal → Action → Outcome" pattern

---

## Current Deck Structure vs Narration Index

| Deck Position | Component | getNarrationProps | Expected slideId |
|---------------|-----------|-------------------|------------------|
| 0 | Slide0Title | 0 | 0 |
| 1 | Slide1StrategicShift | 1 | 1 |
| 2 | Slide2BeforeAfter | 2 | 2 |
| 3 | Slide3OperatingModel | 3 | 3 |
| 4 | SlideUseCases | 4 | **Should be 4** |
| 5 | Slide5Transformation | 5 | 5 |
| ... | ... | ... | ... |

The narration data currently has Use Cases at `slideId: 6`, but the component expects index 4.

---

## Technical Changes

### File 1: `src/data/slideNarration.ts`

#### Change 1: Update slideId for Use Cases from 6 to 4

Update the entry at lines 48-53 to change `slideId: 6` to `slideId: 4`.

#### Change 2: Rewrite Use Cases narration script

Replace the current script with a DTOP-aligned version that:
- Opens with the DTOP framework context
- Walks through each use case following the Detect → Trigger → Orchestrate → Prove pattern
- Emphasizes cost savings and revenue protection outcomes
- Uses the specific details from the transcript (Charlotte hub, 92% reduction, etc.)

**New script:**

```
"Let me show you what the DTOP operating model looks like in practice — three real examples that demonstrate how signals become outcomes.

First: Personalized Pilot Training. Detect: FOQA data reveals elevated hard landing rates for specific pilots at specific airports. Trigger: The platform cross-references training records and identifies forty-seven affected crew. Orchestrate: Personalized competency modules are created and assigned — not generic refresher courses, but targeted training addressing the exact issue. Prove: Seventy-eight percent reduction in repeat events. And the hidden benefit? Less tire wear, less landing gear damage, fewer maintenance delays — cost savings that protect both the schedule and the bottom line.

Second: Smoke and Fumes Detection. Detect: AI analyzes thousands of smoke and fumes reports and uncovers a cluster around Charlotte hub during de-icing operations — a pattern no human analyst had time to find. Trigger: A procedure review is initiated automatically. Orchestrate: The de-icing SOP is updated with new ventilation protocols. One hundred twenty ground crew are retrained within forty-eight hours. Prove: Ninety-two percent reduction in reports. Workers' compensation claims drop. Aircraft damage incidents eliminated. Revenue protected.

Third: Hydraulic Switch Error. Detect: Safety reports show recurring confusion about the hydraulic switch sequence on seven-thirty-sevens during preflight. Trigger: Before any incident occurs, the platform flags the pattern and initiates a procedure review. Orchestrate: The content team rewrites the checklist with clearer step sequence and confirmation checkpoints. All affected crew are retrained proactively. Prove: One hundred percent incident prevention. Zero hydraulic failures. Zero disruptions.

Notice the pattern: each use case follows Detect, Trigger, Orchestrate, Prove. And each delivers the same outcomes — protected schedules, reduced costs, and revenue that stays in your pocket instead of paying for preventable damage. This is what a platform — not point tools — makes possible."
```

#### Change 3: Shift subsequent slideIds to maintain correct sequencing

After Use Cases moves to slideId 4, the following slides need to shift:
- Transformation: slideId 5 (stays same)
- Operational Performance Ladder: slideId 6 (was 7)
- Operational Performance Roadmap: slideId 7 (was 8)
- Customers: slideId 8 (was 9)
- Your Intelligence Journey: slideId 9 (was 10)
- Messaging House: slideId 10 (was 11)
- Campaign Ideas: slideId 11 (was 12)
- Messaging in Context: slideId 12 (was 13)
- Next Steps: slideId 13 (was 15)

---

## Alignment Verification

After changes, the narration indices will correctly map to deck positions:

| Deck Position | Slide Label | slideId in Narration |
|---------------|-------------|----------------------|
| 0 | Title | 0 |
| 1 | Strategic Shift | 1 |
| 2 | Before & After | 2 |
| 3 | Operating Model | 3 |
| 4 | Use Cases | 4 |
| 5 | Transformation | 5 |
| 6 | Value Ladder | 6 |
| 7 | Maturity Roadmap | 7 |
| 8 | AI Journey | 8 |
| 9 | Customers | 9 |
| 10 | Messaging House | 10 |
| 11 | Campaign Ideas | 11 |
| 12 | Messaging in Context | 12 |
| 13 | Platform Experience | — |
| 14 | Next Steps | 13 |

---

## Summary of Script Improvements

| Current Script Element | Updated Script Element |
|------------------------|------------------------|
| Generic "three real examples" intro | DTOP framework context opening |
| Result metrics only at end | Metrics + business outcomes (cost savings, revenue protection) |
| Linear description | Explicit Detect → Trigger → Orchestrate → Prove structure for each |
| Smoke/Fumes: generic "specific hub" | Charlotte hub specifically named |
| No cost savings language | Workers' comp, tire wear, damage prevention emphasized |
| Ends with "closed-loop response" | Ends with platform differentiator and outcomes summary |

---

## Files Changed

| File | Changes |
|------|---------|
| `src/data/slideNarration.ts` | Update slideId for Use Cases to 4; rewrite script with DTOP pattern; shift subsequent slideIds |
