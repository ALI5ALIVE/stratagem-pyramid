## Goal

Open the Week 3 "Sell the Whole Vision" section with the **Operational Performance Roadmap whiteboard** so reps frame the customer journey first, then use the existing Whole Vision whiteboard to show the capabilities that move the customer along that journey. This positions the session as a vision-led, differentiate / upsell / cross-sell conversation.

## Placement in Week 3

Insert a new roadmap-framing slide as the **first content slide of the Whole Vision arc**, right before `se-w3-whole-vision-whiteboard` (currently slide 161 in `SalesEnablement.tsx`).

```text
... se-footprint-playbook
NEW  se-w3-roadmap-vision-frame      ← Operational Roadmap, reframed for W3
     se-w3-whole-vision-whiteboard   ← existing
     se-discovery-to-close ...
```

Rationale: the footprint arc ends on the 3-Move Play (where the customer is today). The roadmap then shows where they need to go. The Whole Vision whiteboard then shows the toolset that moves them there. Discovery → Close follows.

## New slide

Create `src/components/sales-enablement-slides/SEW3RoadmapVisionFrame.tsx` that **reuses the existing `SERoadmapWhiteboardDrill` visual** (same 6-stroke whiteboard SVG, same color coding) but reframed for the W3 selling motion:

- Header: "Frame the Journey — Sell the Vision"
- Subtitle: "Before you sell capabilities, sell the curve. This is how you differentiate, upsell, and cross-sell."
- Left: same whiteboard with the curve, 5 stages and YOU ARE HERE flag (visual parity with W1 drill so reps recognise it).
- Right (replaces the W1 6-stroke script): a **selling-motion panel** with three short blocks:
  1. **Differentiate** — only platform that runs the whole curve on one connected foundation closed by DTOP.
  2. **Up-sell** — every stage compounds on the one below; moving up the curve = expanding the same platform.
  3. **Cross-sell** — each Core App is a foothold; the curve makes the case for the next app and the Intelligence Layer.
- Footer line: "We give them the tools and the mechanism to walk the curve — that's what the rest of this session covers."

No new visual concepts, no new SVG work — lift the SVG block from `SERoadmapWhiteboardDrill` into the new component so we don't fork the design.

## Narration

Add one new entry to `src/data/salesEnablementNarration.ts` for `se-w3-roadmap-vision-frame`, following the 5-part Coach Script Standard (WHY → CORE MESSAGE → PAIN→VALUE → HOW TO DELIVER → TRANSITION). Approved terminology only. About 75–90 seconds.

Core beats:
- Why: Week 3 is about selling the vision. Reps who open with the roadmap win larger, longer deals because the buyer agrees on the destination before anyone debates features.
- Core message: five-stage journey, one connected platform, one DTOP loop. Differentiation, upsell and cross-sell all live on this single curve.
- Pain → value: buyers think they're at Stage 3 because they bought tools sold as Stage 3 — they're at one-point-five. The curve gives them permission to admit it and gives you the scope of every follow-up.
- Delivery: draw the curve, plant YOU ARE HERE, then say "we give you the tools and the mechanism to walk this — that's what the rest of this session covers."
- Transition: "now let's whiteboard the platform that moves them along the curve" → leads into `se-w3-whole-vision-whiteboard`.

## Registry wiring

`src/pages/SalesEnablement.tsx`:
- Import `SEW3RoadmapVisionFrame`.
- Insert one row immediately above the existing `se-w3-whole-vision-whiteboard` entry:
  `{ id: "se-w3-roadmap-vision-frame", label: "W3 · Frame the Journey — Roadmap Vision", component: SEW3RoadmapVisionFrame },`

## Memory update

Append one line to `mem/content/sales-enablement/week3-field-kit.md` recording the new slide as the opener of the Whole Vision arc, so the W3 flow list stays accurate.

## Out of scope

- No edits to the existing W1 `SERoadmapWhiteboardDrill` or its narration.
- No changes to `SEW3WholeVisionWhiteboard` content or its narration.
- No SVG redesign, no new tokens, no PPTX export changes, no other slides.
