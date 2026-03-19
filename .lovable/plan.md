

# Rearrange Intelligence Tiers Slide Layout

## New Layout (top to bottom)
```text
┌────────────────────────────┬──────────────────────┐
│ Capability Comparison      │ Accuracy by Depth    │
│ (table)                    │ (amber box)          │
└────────────────────────────┴──────────────────────┘
┌───────────┬───────────┬───────────┬───────────────┐
│ Historical│ Reactive  │ Proactive │ Predictive    │
└───────────┴───────────┴───────────┴───────────────┘
```

## Changes in `src/components/tech-slides/TechSlide8IntelligenceTiers.tsx`

Replace the current `grid-cols-5` layout with a vertical flex layout:

1. **Top section** — horizontal split with capability table (left, ~60%) and accuracy box (right, ~40%), using `grid-cols-5` with `col-span-3` and `col-span-2`
2. **Bottom section** — 4 tier cards in a single horizontal row using `grid-cols-4`, compact height

Same data, same styling per card — just repositioned.

