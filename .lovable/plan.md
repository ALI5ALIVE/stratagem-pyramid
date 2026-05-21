## Goal

Add **one new Week 3 whiteboard slide** that lets a rep sell the **complete platform vision** in a single picture — building from Core Apps up through the Intelligence & Orchestration layer (Insights → Intelligence → Recommendations & Prescriptive Actions → Automation), then anchoring the whole stack to **one DTOP use case** with a per-layer "say this to the customer" script.

Same hand-drawn whiteboard aesthetic as `SEW2CapstoneWhiteboard` (cream board, brown frame, Caveat marker font, DTOP color coding).

## Placement

Insert in Week 3 immediately **after `se-footprint-playbook`** and **before `se-discovery-to-close`**:

```
… se-footprint-playbook                      (3-Move Play — closes the footprint arc)
   se-w3-whole-vision-whiteboard   ← NEW    (sell the whole vision in one picture)
   se-discovery-to-close                    (then drill the discovery motion)
…
```

Rationale: by this point the rep has learned what to sell into one, two, or all three apps. The next teaching beat — before discovery mechanics — is **how to lift the conversation to the full platform vision** as a single board-ready story. It is the W3 analogue of the W2 capstone, but pitched at "complete vision" rather than "every capability in one use case".

## Slide design

Single h-screen `PitchSlideContainer`, header on, no horizontal scroll. Layout:

```text
┌──────────────────────────────────────────────────────────────────────┐
│  Header: "Sell the Whole Vision — One Whiteboard"                    │
│  Subtitle: "Draw the stack bottom-up, anchor it to one use case,     │
│  give the customer one line per layer. 90 seconds, one marker."      │
├──────────────────────────────┬───────────────────────────────────────┤
│                              │  Say-it script · 90 seconds           │
│   WHITEBOARD (col-span 7)    │  (col-span 5)                         │
│                              │                                       │
│  Bottom-up build, SVG:       │  Five numbered beats, one per layer,  │
│                              │  in the same order the rep draws:     │
│   ┌────────────────────────┐ │                                       │
│   │  DTOP loop band (top)  │ │  1. Core Apps — "Today your safety,  │
│   │  D · T · O · P chips   │ │     content and training live in     │
│   ├────────────────────────┤ │     three tools that don't talk."    │
│   │  Unified Mobile band   │ │                                       │
│   ├────────────────────────┤ │  2. Insights — "First, we put your   │
│   │  Automation            │ │     operational data on one          │
│   │  Recommendations & Px  │ │     foundation so trends surface     │
│   │  Intelligence          │ │     themselves."                     │
│   │  Insights              │ │                                       │
│   ├────────────────────────┤ │  3. Intelligence — "Then we sit a    │
│   │  Core Apps (3 cards)   │ │     domain-trained intelligence on   │
│   │  SafetyManager365      │ │     top — ~90% on aviation work vs   │
│   │  ContentManager365     │ │     ~35% for generic AI."            │
│   │  TrainingManager365    │ │                                       │
│   ├────────────────────────┤ │  4. Recommendations & Prescriptive   │
│   │  USE-CASE STRIP:       │ │     Actions — "It doesn't just       │
│   │  Madrid (MAD) unstable │ │     summarise — it tells you what to │
│   │  approach trend → D-T- │ │     do next, with cited evidence."   │
│   │  O-P chips             │ │                                       │
│   └────────────────────────┘ │  5. Automation — "Then Automation     │
│                              │     does it: drafts the revision,   │
│                              │     opens the review, pushes it to  │
│                              │     crew. One loop, closed."        │
│                              │                                       │
│                              │  Close: "That's the whole vision —  │
│                              │  start with one app, the stack lifts │
│                              │  the rest as you grow."             │
└──────────────────────────────┴───────────────────────────────────────┘
```

DTOP color tokens stay canonical: D blue · T amber · O violet · P emerald. Intelligence layer band uses amber (Intelligence Layer brand colour). Core Apps band uses muted neutral so the layers above can do the visual lifting.

## Files

### New
- `src/components/sales-enablement-slides/SEW3WholeVisionWhiteboard.tsx` — the slide. Built from the same primitives as `SEW2CapstoneWhiteboard` (PitchSlideContainer, hand-drawn SVG on cream board, Caveat font, say-it script column).

### Edited
- `src/pages/SalesEnablement.tsx` — import the new component and insert one entry into the `slides` array directly after `se-footprint-playbook` with id `se-w3-whole-vision-whiteboard` and label `W3 · Sell the Whole Vision — Whiteboard`.
- `src/data/salesEnablementNarration.ts` — add a coach-script narration entry for `se-w3-whole-vision-whiteboard` following the existing 5-part coach standard (WHY → CORE MESSAGE → PAIN→VALUE → HOW TO DELIVER → TRANSITION). Single voice (George), no segments. Respects locked terminology (no FOQA/FDM/ASAP, ~90% vs ~35% headline, BrandNumber naming, DTOP wording).

## Out of scope

- Two-voice walkthrough (this is a coach explainer, not a customer simulation).
- Touching W2 capstone or any existing W3 slide.
- New design tokens, fonts, or animations beyond the existing Caveat-on-cream whiteboard look.
- PPTX export changes.

## Risk

Minimal — additive slide, same patterns as the W2 capstone whiteboard, slots cleanly into the existing slide registry and narration map.
