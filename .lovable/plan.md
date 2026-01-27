

# Plan: Hide Investor Slide and Category Alternatives

## Overview

Remove the Investor slide and the three Category Alternative slides from the deck while preserving the code files for potential future use. This will reduce the deck from 18 slides to 14 slides.

---

## Slides to Remove

| Current Position | Slide ID | Label | Action |
|------------------|----------|-------|--------|
| 11 | slide-11 | Investors | Hide |
| 15 | slide-15 | Category: Excellence | Hide |
| 16 | slide-16 | Category: Orchestration | Hide |
| 17 | slide-17 | Category: Assurance | Hide |

---

## New Slide Sequence

After removal, the deck will have **14 slides** (0-13):

| New Position | Label |
|--------------|-------|
| 0 | Title |
| 1 | Strategic Shift |
| 2 | Before & After |
| 3 | Operating Model |
| 4 | Platform Capabilities |
| 5 | Transformation |
| 6 | Operational Performance Ladder |
| 7 | Operational Performance Roadmap |
| 8 | Positioning |
| 9 | Customers |
| 10 | AI Vision & Future |
| 11 | Category Name |
| 12 | Messaging House |
| 13 | Campaign Ideas |

---

## Files to Update

### 1. `src/pages/SlideDeck.tsx`

**Changes:**
- Remove Investor slide import (`Slide10Investors`)
- Remove Category Alternative imports (`SlideCategoryExcellence`, `SlideCategoryOrchestration`, `SlideCategoryAssurance`)
- Update `slides` array to remove the 4 entries
- Update slide ID numbering to maintain sequential order (11-13 instead of 12-14)
- Remove the 4 slide component renderings from JSX

### 2. `src/components/slides/Slide0Title.tsx`

**Changes:**
- Remove agenda items 11 (Investors), 15, 16, 17 from `agendaItems` array
- Renumber remaining agenda items to be sequential (1-13)

### 3. `src/data/slideNarration.ts`

**Changes:**
- Remove narration entry for slideId 11 (Investors)
- Remove narration entries for slideIds 15, 16, 17
- Update slideId numbers for slides after the removed Investor slide:
  - Category Name: 12 → 11
  - Messaging House: 13 → 12
  - Campaign Ideas: 14 → 13

---

## Technical Details

### SlideDeck.tsx - Updated slides array

```tsx
const slides = [
  { id: "slide-0", label: "Title" },
  { id: "slide-1", label: "Strategic Shift" },
  { id: "slide-2", label: "Before & After" },
  { id: "slide-3", label: "Operating Model" },
  { id: "slide-4", label: "Platform Capabilities" },
  { id: "slide-5", label: "Transformation" },
  { id: "slide-6", label: "Operational Performance Ladder" },
  { id: "slide-7", label: "Operational Performance Roadmap" },
  { id: "slide-8", label: "Positioning" },
  { id: "slide-9", label: "Customers" },
  { id: "slide-10", label: "AI Vision & Future" },
  { id: "slide-11", label: "Category Name" },
  { id: "slide-12", label: "Messaging House" },
  { id: "slide-13", label: "Campaign Ideas" },
];
```

### Slide0Title.tsx - Updated agendaItems

```tsx
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
  { num: 10, label: "Becoming an AI Company", summary: "The intelligence layer & roadmap" },
  { num: 11, label: "Category Name", summary: "Why this name wins" },
  { num: 12, label: "Messaging House", summary: "Complete positioning framework" },
  { num: 13, label: "Campaign Ideas", summary: "Cementing category leadership" },
];
```

---

## Summary

| Metric | Before | After |
|--------|--------|-------|
| Total slides | 18 | 14 |
| Agenda items | 17 | 13 |
| Narration entries | 18 | 14 |
| Files updated | - | 3 |

**Note:** The component files for the hidden slides (`Slide6Investors.tsx`, `SlideCategoryExcellence.tsx`, `SlideCategoryOrchestration.tsx`, `SlideCategoryAssurance.tsx`) will be preserved in the codebase and can be easily restored if needed in the future.

