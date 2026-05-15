## Goal

Give reps a repeatable whiteboard motion for each customer footprint scenario, so they can draw the missing-loop story live on a call instead of reading slides.

## What gets added

Three new whiteboard drill slides in **Week 3 · Sell & Win**, each placed immediately after its scenario slide:

```text
SEFootprintSingleApp           →  SEFootprintSingleWhiteboard      (NEW)
SEFootprintTwoApps             →  SEFootprintTwoWhiteboard         (NEW)
SEFootprintAllThree            →  SEFootprintAllThreeWhiteboard    (NEW)
SEFootprintValueLadder         (unchanged)
SEFootprintPlaybook            (unchanged)
```

Each drill follows the same visual + pedagogical pattern as `SEDtopWhiteboardDrill`:
- Cream/wood-framed whiteboard panel (left, 7/12 cols) with a hand-drawn SVG using the Caveat font
- Numbered "stroke script" panel (right, 5/12 cols) — what to say as you draw each stroke
- 90-second time-box footer

### Drill 1 — One App (e.g. Safety only)
Strokes:
1. Draw the lit lane (Safety box, blue, "lit")
2. Draw the two dark lanes (Content, Training — dotted, "dark")
3. Inside the lit lane, write `CoAnalyst · Insights · Automation` with a small "confined" label
4. Draw the broken DTOP arrow that dies at Orchestrate
5. Write the one discovery question: *"When Safety flags a risk, who owns the procedure and training change?"*
6. Circle the gap — that's the sale

### Drill 2 — Two Apps (e.g. Safety + Content)
Strokes:
1. Draw the two lit lanes side by side
2. Draw the one dark lane
3. Show the half-loop arrow: Detect → Trigger → Orchestrate (procedures only) → ✗ no Training → Prove partial
4. Label intelligence as "across two lanes — still confined"
5. Discovery question: *"When a procedure changes, how do you know every crew is trained on it before the next shift?"*
6. Circle the missing lane

### Drill 3 — All Three + Platform Vision
Strokes:
1. Draw the closed DTOP loop with all three lanes lit
2. Above the loop, draw the intelligence layer band (CoAnalyst · Insights · Automation · Mobile)
3. Arrow from the intelligence band reaching across all three lanes ("scope, not new features")
4. Write the compounding metric callout: *~90% domain accuracy vs ~35% generic*
5. Vision line: *"You bought the instruments — this is the conductor"*
6. Discovery question: *"Which decisions in your operation still rely on a human stitching three systems together?"*

### Narration

Add 3 new entries to `src/data/salesEnablementNarration.ts` keyed by the new slide IDs, following the standard 5-part coach-script format (Why → Core message → Pain → Value pivot → Delivery tip → Transition). ~45–60 sec each.

### Registration

In `src/pages/SalesEnablement.tsx`:
- Insert the three new components into the slides array directly after their matching scenario slides
- Bump Week 3 `estimatedMinutes` from 22 → 26
- Extend Week 3 `upNext` to mention "Footprint whiteboard drills"

## Files

New:
- `src/components/sales-enablement-slides/SEFootprintSingleWhiteboard.tsx`
- `src/components/sales-enablement-slides/SEFootprintTwoWhiteboard.tsx`
- `src/components/sales-enablement-slides/SEFootprintAllThreeWhiteboard.tsx`

Edited:
- `src/data/salesEnablementNarration.ts` (3 new entries)
- `src/pages/SalesEnablement.tsx` (register slides, update Week 3 metadata)

## Out of scope

- No changes to the existing footprint scenario slides, value ladder, or 3-move playbook
- No changes to Week 1 / Week 2, Academy quizzes, PPTX exporters, or memory
