

# Redesign Line of Sight Sales Slide — Simplified KPI Tree with 4 Use Cases

## Problem

The current slide tries to cram all 8 use cases, 6 leading measures, and 3 executive outcomes into a horizontal three-column grid. This overflows the viewport and is visually cluttered for a presentation slide.

## New Approach

Replace the three-column list layout with a simplified **top-down KPI tree** inspired by the interactive `LineOfSightTree` component. Instead of SVG paths (too complex for a static slide), use a clean vertical cascade with simple connecting lines via CSS.

Show only the **4 most impactful use cases** that best demonstrate the DTOP value chain:

1. **Go-Around Events** (UC1) — classic FOQA-to-training DTOP loop
2. **AOG and Unscheduled Maintenance** (UC2) — highest per-event cost ($300k/day)
3. **Fuel Performance Degradation** (UC4) — largest annual impact ($37.5M)
4. **Regulatory Fines** (UC6) — strongest compliance/content alignment

## Visual Layout (top to bottom)

```text
+--------------------------------------------------+
|  EXECUTIVE OUTCOMES (Tier 1)                      |
|  [CFO card]    [CEO card]    [COO card]           |
+--------------------------------------------------+
           |           |           |
+--------------------------------------------------+
|  LEADING MEASURES (Tier 2)                        |
|  4 most relevant measures in a row                |
+--------------------------------------------------+
           |           |           |
+--------------------------------------------------+
|  USE CASES (Tier 3)                               |
|  4 cards in a row with cost badge                 |
+--------------------------------------------------+
|                                                    |
|  [  $40M+ Annual Cost Avoidance  ] [Calculator]   |
+--------------------------------------------------+
```

## Technical Changes

### File: `src/components/sales-slides/SalesSlide8LineOfSight.tsx`

Complete rewrite of the slide content:

- **Top row (Executive Outcomes)**: 3 stakeholder cards (CFO, CEO, COO) with 1-2 key metrics each — compact, color-coded
- **Middle row (Leading Measures)**: Show only the 4 measures most connected to the selected use cases: Safety Event Rate (lm1), Asset Availability (lm2), OTP (lm3), Fuel Efficiency Index (lm4)
- **Bottom row (Use Cases)**: 4 cards showing UC1, UC2, UC4, UC6 with their cost-per-event badge
- **Connecting lines**: Simple CSS vertical dashed lines between tiers (no SVG complexity)
- **Bottom banner**: Same as current — $40M+ headline + Interactive Calculator CTA
- Filter the `useCases` and `leadingMeasures` arrays inline to only show the selected 4 use cases and their connected measures
- Keep the "+4 more use cases" note on the bottom banner to indicate this is a subset

No changes to any other files — this is a visual redesign of the single slide component only.

