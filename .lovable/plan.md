## Restructure "Sell the Whole Vision" whiteboard

Two changes to `SEW3WholeVisionWhiteboard.tsx` only. Narration and slide registry untouched.

### SVG layout (Intelligence & Orchestration Layer block)

Currently three side-by-side cards (Insights · Intelligence · Recommendations) with Automation as a separate purple band underneath. New structure inside the same amber-framed block:

```text
┌─ Intelligence & Orchestration Layer ───────────────────────────┐
│ ┌──────────────────────┐ ┌─────────────────┐ ┌──────────────┐  │
│ │ Insights &           │ │ Recommendations │ │ Automation   │  │
│ │ Intelligence         │ │ + Prescriptive  │ │ runs the play│  │
│ │ domain-trained       │ │ Actions         │ │ draft·review │  │
│ │ ~90% vs ~35% generic │ │ what to do next │ │ assign·push  │  │
│ └──────────────────────┘ └─────────────────┘ └──────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

- Merge `Insights` + `Intelligence` into one wider emerald/amber card titled "Insights & Intelligence" — trends surface themselves AND domain-trained ~90% vs ~35% cited.
- Move the standalone purple `Automation` band into the layer as the third card (violet stroke retained for DTOP color coding).
- Remove the old separate Automation band row; reclaim that vertical space so Core Apps and the use-case strip shift up — keeps the board within the existing 500-unit viewBox without clipping.

### Say-it script (right column beats)

- Collapse beats #2 (Insights) and #3 (Intelligence) into a single beat: "Insights & Intelligence — trends surface themselves, and a domain-trained layer (~90% vs ~35%) cites the regulation, procedure and training."
- Keep Recommendations beat.
- Keep Automation beat but reframe DTOP tag as "owns Orchestrate" (Unified Mobile keeps Prove).
- Result: 5 beats → 4 beats, all inside the unified Intelligence & Orchestration story.

### Out of scope

- No edits to `salesEnablementNarration.ts`, `SalesEnablement.tsx`, or other slides.
- No new tokens, no PPTX export changes.