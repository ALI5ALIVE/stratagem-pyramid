
# Plan: Update Title Slide Navigation to Match All 16 Slides

## Problem Summary

The title slide (Slide 0) agenda grid is out of sync with the actual slide deck:
1. **Slide 6 label outdated**: Shows "Operational Readiness Ladder" but should be "Operational Performance Ladder"
2. **Missing slides 13-15**: The three category comparison slides (Excellence, Orchestration, Assurance) are not in the navigation

## Current vs Expected State

| Slide | Current Title Slide Label | Expected Label |
|-------|---------------------------|----------------|
| 1 | Strategic Shift | Strategic Shift |
| 2 | Before & After | Before & After |
| 3 | Operating Model | Operating Model |
| 4 | Platform Capabilities | Platform Capabilities |
| 5 | Transformation | Transformation |
| 6 | Operational Readiness Ladder | **Operational Performance Ladder** |
| 7 | Operational Performance Roadmap | Operational Performance Roadmap |
| 8 | Positioning | Positioning |
| 9 | Customers | Customers |
| 10 | Investors | Investors |
| 11 | Category Name | Category Name |
| 12 | Messaging House | Messaging House |
| 13 | (missing) | **Category: Excellence** |
| 14 | (missing) | **Category: Orchestration** |
| 15 | (missing) | **Category: Assurance** |

---

## Changes Required

### File: `src/components/slides/Slide0Title.tsx`

**1. Update the agendaItems array (lines 6-19):**

```typescript
const agendaItems = [
  { num: 1, label: "Strategic Shift", summary: "Why we're redefining the category" },
  { num: 2, label: "Before & After", summary: "What's broken — and how we fix it" },
  { num: 3, label: "Operating Model", summary: "Detect → Trigger → Orchestrate → Prove" },
  { num: 4, label: "Platform Capabilities", summary: "The platform that powers it" },
  { num: 5, label: "Transformation", summary: "Cost center to value driver" },
  { num: 6, label: "Operational Performance Ladder", summary: "Building blocks of performance" },
  { num: 7, label: "Operational Performance Roadmap", summary: "The measurable journey" },
  { num: 8, label: "Positioning", summary: "Where we stand vs. competitors" },
  { num: 9, label: "Customers", summary: "Measurable value delivery" },
  { num: 10, label: "Investors", summary: "Shareholder value creation" },
  { num: 11, label: "Category Name", summary: "Why this name wins" },
  { num: 12, label: "Messaging House", summary: "Complete positioning framework" },
  { num: 13, label: "Category: Excellence", summary: "Alternative: philosophy & culture" },
  { num: 14, label: "Category: Orchestration", summary: "Alternative: coordination & workflow" },
  { num: 15, label: "Category: Assurance", summary: "Alternative: compliance & proof" },
];
```

**2. Update the grid layout (line 104):**

Change from `grid-cols-2 sm:grid-cols-4` to `grid-cols-3 sm:grid-cols-5` to accommodate 15 items in a cleaner arrangement:

```diff
- <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
+ <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
```

This creates:
- Mobile: 3 columns × 5 rows = 15 items
- Desktop: 5 columns × 3 rows = 15 items

---

## Visual Layout Preview

### Desktop (5 columns)
```text
Row 1: [01] [02] [03] [04] [05]
Row 2: [06] [07] [08] [09] [10]
Row 3: [11] [12] [13] [14] [15]
```

### Mobile (3 columns)
```text
Row 1: [01] [02] [03]
Row 2: [04] [05] [06]
Row 3: [07] [08] [09]
Row 4: [10] [11] [12]
Row 5: [13] [14] [15]
```

---

## Summary

| Metric | Count |
|--------|-------|
| Files modified | 1 |
| Items updated | 1 (Slide 6 label) |
| Items added | 3 (Slides 13, 14, 15) |
| Grid layout change | Yes |

After this change, clicking any of the 15 agenda items on the title slide will navigate directly to the corresponding slide, and all labels will match the actual slide content.
