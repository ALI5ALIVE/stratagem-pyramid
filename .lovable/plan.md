

# Plan: Replace Abstract Stage Descriptions with Concrete Use Cases on Operational Roadmap

## Overview

Transform the Operational Performance Roadmap slide (Slide 7) so that each maturity stage is illustrated by a **concrete use case** rather than abstract descriptions. As the narration progresses and the user moves through each stage, a specific aviation example will explain what problem is addressed or what becomes achievable at that level.

---

## Use Case Design by Maturity Stage

| Stage | Headline | Use Case Scenario | Problem Addressed / Achievement |
|-------|----------|-------------------|--------------------------------|
| 1 | Fragmented & Reactive | **Crew Fatigue Incident** | Fatigue reports scattered in email threads. No one connects the pattern until an incident occurs. Investigation takes 3 weeks. |
| 2 | Managed (Siloed) | **Runway Incursion Investigation** | Safety team completes investigation, but training isn't updated. Same issue recurs 6 months later with different crew. |
| 3 | Connected Governance | **MEL Procedure Update** | A Minimum Equipment List change automatically triggers procedure revision AND training reassignment. Full audit trail created by default. |
| 4 | Intelligent Operations | **Hard Landing Detection** | FOQA data flags hard landing trend at specific airport. Platform auto-identifies 47 affected pilots and deploys targeted simulator training. 78% reduction. |
| 5 | Predictive Operations | **Smoke & Fumes Prevention** | AI detects weak signal cluster before any reportable event. De-icing SOP revised proactively. Zero incidents occur. |

---

## Technical Changes

### File 1: `src/components/slides/Slide5MaturityCurve.tsx`

#### Change 1: Add `useCase` field to each stage in `stagesData` (lines 9-183)

Extend each stage object with a new `useCase` property containing:
- `scenario`: Short title (e.g., "Crew Fatigue Incident")
- `problem`: What goes wrong at this stage OR what becomes possible
- `outcome`: The result or consequence

**New field structure:**
```typescript
useCase: {
  scenario: string;
  problem: string;
  outcome: string;
}
```

#### Change 2: Update the `MaturityStageDetails` component or add inline rendering (lines 471-480)

Replace the abstract "What it looks like" and "Result" content with the use case story:
- **Scenario** as headline
- **Problem/Achievement** as body text
- **Outcome** as result statement

#### Change 3: Update narration script (slideId 7) in `src/data/slideNarration.ts`

Rewrite the narration to walk through each use case:

**New Script:**
```
"This roadmap shows the measurable journey from reactive to predictive operations — told through real use cases at each stage.

Stage One: Fragmented and Reactive. Picture this: a crew fatigue incident occurs. Reports are scattered across email threads and separate systems. No one connects the pattern until after the fact. The investigation takes three weeks. This is where most organizations start.

Stage Two: Managed but Siloed. After a runway incursion, the safety team completes a thorough investigation. But training never gets updated. Six months later, the same issue recurs with different crew. Strong departments, but no connection between them.

Stage Three: Connected Governance. This is the platform shift. A Minimum Equipment List change is published. Automatically, the platform triggers a procedure revision, reassigns affected training, and creates a complete audit trail — no manual handoffs required.

Stage Four: Intelligent Operations. Flight Ops Quality Assurance data flags a hard landing trend at a specific airport. The platform identifies forty-seven affected pilots and deploys targeted simulator training automatically. Result: seventy-eight percent reduction in repeat events.

Stage Five: Predictive Operations. AI analyzes thousands of reports and detects a weak signal cluster — smoke and fumes incidents clustering around a specific hub. Before any reportable event occurs, the de-icing standard operating procedure is revised proactively. Zero incidents. This is prevention, not reaction.

Without the platform, this journey takes five to seven years. With Comply three six five, we compress it to eighteen to twenty-four months. That's not just faster — it's a fundamentally different trajectory."
```

---

## Visual Design Changes

The current stage details panel shows:
- "What it looks like" (bullet points)
- "Result" (bullet points)
- "Why it matters" (paragraph)

**New design** (per stage):
```
┌─────────────────────────────────────────┐
│ 🎯 [Scenario Title]                     │
├─────────────────────────────────────────┤
│ [Problem/Achievement description]       │
│                                         │
│ ➜ [Outcome statement]                   │
└─────────────────────────────────────────┘
```

---

## Animation/Narration Sync

The existing `stageTimings` will continue to work:
| Stage | Starts at % | Use Case |
|-------|-------------|----------|
| 1 | 8% | Crew Fatigue Incident |
| 2 | 22% | Runway Incursion |
| 3 | 38% | MEL Procedure Update |
| 4 | 55% | Hard Landing Detection |
| 5 | 73% | Smoke & Fumes Prevention |

---

## Files Changed

| File | Changes |
|------|---------|
| `src/components/slides/Slide5MaturityCurve.tsx` | Add `useCase` property to each stage; update detail panel to display scenario/problem/outcome |
| `src/data/slideNarration.ts` | Rewrite slideId 7 script to walk through use cases instead of abstract descriptions |

---

## Benefits of This Approach

1. **Concrete understanding**: Each stage becomes memorable through a specific story
2. **Problem-solution framing**: Stages 1-2 show what goes wrong; Stages 3-5 show what becomes possible
3. **Consistent DTOP pattern**: The use cases reinforce the Detect → Trigger → Orchestrate → Prove model
4. **Progressive improvement narrative**: Users see clear progression from reactive to proactive

