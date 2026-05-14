## Goal

Add a **whiteboard drill slide** for the Operational Performance Roadmap in Sales Enablement Week 1, so reps can hand-draw the five-stage maturity curve in the room and sell the vision without slides.

## Where it goes

Sales Enablement → Week 1 (Foundation), inserted **immediately after** `se-slide-maturity-roadmap` and **before** `se-slide-recap-m2`.

```text
… Value unlocked
   → Operational Performance Roadmap            (existing)
   → Operational Performance Roadmap Whiteboard (NEW)
   → Recap talk track
```

## What to build

**1. New component** `src/components/sales-enablement-slides/SERoadmapWhiteboardDrill.tsx`

Same visual pattern as `SEDtopWhiteboardDrill.tsx` (cream whiteboard panel + stroke script on the right).

Whiteboard SVG (hand-drawn Caveat font) shows:
- A simple **hockey-stick curve** rising left-to-right
- **5 numbered nodes** along the curve with stage names + DTOP-aligned colours:
  1. Fragmented & Reactive (red)
  2. Managed / Siloed (blue)
  3. Connected Governance (teal) — marked **"INFLECTION · PLATFORM SHIFT"**
  4. Intelligent Operations (violet)
  5. Predictive Operations (amber/gold)
- A **"YOU ARE HERE for most"** flag drawn **between stage 1 (Fragmented) and stage 2 (Managed/Siloed)** — pointing to the flat part of the curve where most buyers actually live
- Y-axis label "value / capability", X-axis label "time / maturity"

Right-hand **stroke script** (6 strokes, ~90 sec):
1. Draw the axes — "value goes up, time goes right"
2. Draw stages 1–2 flat and **plant the YOU ARE HERE flag between them** — "this is where most ops live today: fragmented data, siloed teams, reactive workflows"
3. Draw the inflection at stage 3 — "this is the platform shift; lessons start to flow between safety, training, comms"
4. Draw the curve up through stage 4 — "AI-assisted: weak-signal detection, prioritised interventions"
5. Draw stage 5 at the top — "predictive: prevent the event before it happens"
6. Tap the YOU-ARE-HERE flag again — "your job in the next 12 months isn't stage 5. It's getting from here, across the platform shift, to stage 3."

Footer chip: "Practice 3× · time-box to 90 seconds · this is the vision sale."

**2. Register in** `src/pages/SalesEnablement.tsx`

- Import `SERoadmapWhiteboardDrill`
- Insert slide entry between maturity-roadmap and recap-m2:
  ```ts
  { id: "se-slide-maturity-whiteboard", label: "W1 · Roadmap Whiteboard Drill", component: SERoadmapWhiteboardDrill }
  ```
- Append `"Operational Performance Roadmap whiteboard"` to `weekProps.w1.upNext`
- Bump `weekProps.w1.estimatedMinutes` from 17 → 19

**3. Add narration in** `src/data/salesEnablementNarration.ts`

New `se-slide-maturity-whiteboard` entry following the **5-part Coach Script Standard**:
- **Why this drill exists** — the roadmap slide is a great visual, but executives buy when *you* draw it; it proves you own the model.
- **Core message** — five stages, one inflection. Most buyers live between stage 1 and stage 2 — that's where the YOU-ARE-HERE flag goes. Your job is to sell the *next* stage, not stage 5.
- **Pain** — buyers think they're at stage 3; they're at 1.5. Naming that honestly is the unlock.
- **How to deliver** — 90 seconds, 6 strokes, plant the flag between Fragmented and Managed, end by asking *"does that feel about right for where you are today?"* — then shut up.
- **Transition** — into the Week 1 recap.

Also update `se-slide-maturity-roadmap` closing line to bridge into the whiteboard drill instead of straight to the recap.

## Out of scope

- No changes to `Slide5MaturityCurve.tsx`, exec pitches, academy DB, or PPTX exporters.
- No styling changes to other SE slides.

## Verification

- Sidebar shows "W1 · Roadmap Whiteboard Drill" in correct position
- Slide renders at 1381×865 without clipping
- YOU-ARE-HERE flag visibly sits between stage 1 and stage 2 nodes on the curve
- Narration plays via existing `useSalesEnablementNarration` hook
- Week 1 minutes pill shows 19
