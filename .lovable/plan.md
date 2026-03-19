

# Add CoAnalyst Intelligence Layer Card to OpsSlide4DTOP

## Change
In `src/components/ops-slides/OpsSlide4DTOP.tsx`, insert a full-width CoAnalyst card **between** the 3 module cards and the arrow/DTOP pipeline. This card will span all 3 columns, styled consistently with the CoAnalyst cards in the other platform slides (primary border/bg, Brain icon).

## Layout (top to bottom)
```text
┌─────────────────┬─────────────────┬─────────────────┐
│ Safety Manager  │ Content Manager │ Training Manager│
└─────────────────┴─────────────────┴─────────────────┘
┌─────────────────────────────────────────────────────┐
│ 🧠 CoAnalyst — Intelligence Layer                   │
│ The key that unlocks data intelligence across your  │
│ operation. Surfaces patterns, predicts risks, and   │
│ drives closed-loop corrective action.               │
└─────────────────────────────────────────────────────┘
                         ↓
┌────────┬────────┬────────────┬──────────┐
│ Detect │Trigger │ Orchestrate│  Prove   │
└────────┴────────┴────────────┴──────────┘
```

## Technical details
- Import `Brain` from `lucide-react`
- Add a `div` with `border-primary/30 bg-primary/10` styling, containing the Brain icon, "CoAnalyst — Intelligence Layer" heading, and a one-line description
- Place it after the module cards grid, before the arrow connector

