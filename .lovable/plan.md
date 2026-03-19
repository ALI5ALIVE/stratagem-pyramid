

# Add Intelligence Tiers to OpsSlide5Intelligence

## Problem
The narration for ops-slide-5 describes four intelligence tiers (Historical, Reactive, Proactive, Predictive) but the slide only shows the "CoAnalyst vs Generic AI" precision gap comparison. The visual doesn't match what the narrator is saying.

## Solution
Restructure the slide into a two-column layout:
- **Left column**: The four intelligence tiers as a vertical progression (matching the narration)
- **Right column**: The precision gap comparison (condensed from the current full-width layout)

Keep the hero stat (90% vs 35%) at the top spanning full width, and the R&D investment footer at the bottom.

## Changes

### File: `src/components/ops-slides/OpsSlide5Intelligence.tsx`

**New layout:**

```text
┌─────────────────────────────────────────┐
│         90%  vs  35%  (hero stat)       │
│   "Accuracy at 4,000+ categories..."   │
├───────────────────┬─────────────────────┤
│  Intelligence     │  The Precision Gap  │
│  Tiers            │                     │
│  ┌─────────────┐  │  Level 1: ████ 95%  │
│  │ Historical  │  │          ███  90%   │
│  │ What happened│  │  Level 2: ████ 93%  │
│  ├─────────────┤  │          ██   75%   │
│  │ Reactive    │  │  Level 3: ████ 92%  │
│  │ What's now  │  │          █    55%   │
│  ├─────────────┤  │  Level 4: ████ 90%  │
│  │ Proactive   │  │          ▌    35%   │
│  │ Watch for   │  │                     │
│  ├─────────────┤  │                     │
│  │ Predictive  │  │                     │
│  │ What's next │  │                     │
│  └─────────────┘  │                     │
├───────────────────┴─────────────────────┤
│  7-figure R&D investment since 2023...  │
└─────────────────────────────────────────┘
```

**Intelligence tiers data:**
- Historical: "What happened and why?"
- Reactive: "What's happening now?"
- Proactive: "What should we watch?"
- Predictive: "What's likely next?"

Each tier styled as a card with an icon, label, and question — using a visual progression (e.g., increasing opacity/color intensity from top to bottom). The precision gap bars are condensed into the right column with smaller spacing.

One file changed. No narration or routing changes needed.

