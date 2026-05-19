Rewrite the Week 2 module divider `learningGoal` (and `upNext`) in `src/pages/SalesEnablement.tsx` so it matches the actual Week 2 deck flow and ends on the capstone — not on Unified Mobile.

## New copy

**learningGoal** (replaces current sentence at line 65):

> "By the end of Week 2 you can walk the platform map, land Insights & Intelligence as a platform-wide capability, name the cross-domain use cases only this layer can answer, explain the Intelligence Layer stack (Insights → Recommendations → Automation) and why it beats generic AI (~90% vs ~35%), anchor on Regulation Management as your end-to-end proof, show how Unified Mobile closes the loop on the device — and tell the whole story as one DTOP loop in 60 seconds using the W2 capstone."

**upNext** (replaces line 67) — aligned to the 13 capability/closer slides in deck order:

```
[
  "The Platform map",
  "Insights & Intelligence",
  "Platform-wide use cases",
  "Intelligence Layer",
  "Per-solution use cases",
  "Insights",
  "Recommendations use cases",
  "Automation",
  "Automation use cases",
  "Intelligence Layer vs Generic AI",
  "Regulation Management (end-to-end proof)",
  "Unified Mobile",
  "Capability cheat sheet",
  "Capstone — one use case, every capability, one DTOP loop",
]
```

## Why these edits

- Old goal said "close on the Unified Mobile experience" — Week 2 now closes on the **W2 Capstone whiteboard** (`se-w2-capstone-whiteboard`).
- Old goal said "Intelligence Layer (Insights · Automation)" — the actual stack taught is **Insights → Recommendations → Automation**.
- Adds the canonical **~90% vs ~35%** framing per memory rules.
- Adds the new capstone slide title to `upNext` and reorders Regulation Management / Mobile to match real deck order.
- Uses approved terminology: Intelligence Layer, Generative AI, Recommendations, Unified Mobile. No legacy "CoAnalyst", no forbidden acronyms.

## Scope

- Single file edit: `src/pages/SalesEnablement.tsx` — `weekProps.w2.learningGoal` and `weekProps.w2.upNext`.
- No slide component, narration, quiz, or DB changes.