

# Plan: Hide the "Why 'Operational Performance Platform'" Slide

## Summary

Remove the Category Name slide (Slide9CategoryRationale.tsx) from the active deck while preserving the component file for future use. This reduces the deck from 15 slides to 14 slides.

---

## Current vs. Updated Slide Sequence

| Position | Current | Updated |
|----------|---------|---------|
| 0 | Title | Title |
| 1 | Strategic Shift | Strategic Shift |
| 2 | Before & After | Before & After |
| 3 | Operating Model | Operating Model |
| 4 | Platform Capabilities | Platform Capabilities |
| 5 | Transformation | Transformation |
| 6 | Operational Performance Ladder | Operational Performance Ladder |
| 7 | Operational Performance Roadmap | Operational Performance Roadmap |
| 8 | Positioning | Positioning |
| 9 | Customers | Customers |
| 10 | Investors | Investors |
| 11 | AI Vision & Future | AI Vision & Future |
| 12 | **Category Name** | Messaging House |
| 13 | Messaging House | Campaign Ideas |
| 14 | Campaign Ideas | — |

---

## Technical Changes

### File: `src/pages/SlideDeck.tsx`

**Change 1: Remove Import (Line 15)**
Remove the Category Rationale import:
```tsx
// Remove this line:
import Slide11CategoryRationale from "@/components/slides/Slide9CategoryRationale";
```

**Change 2: Update Slides Array (Lines 20-36)**
Remove the Category Name entry and renumber:
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
  { id: "slide-10", label: "Investors" },
  { id: "slide-11", label: "AI Vision & Future" },
  { id: "slide-12", label: "Messaging House" },
  { id: "slide-13", label: "Campaign Ideas" },
];
```

**Change 3: Update Slide Container (Lines 201-215)**
Remove the Category Rationale component and renumber narration props:
```tsx
<Slide0Title onNavigateToSlide={scrollToSlide} {...getNarrationProps(0)} />
<Slide1StrategicShift {...getNarrationProps(1)} />
<Slide2BeforeAfter {...getNarrationProps(2)} />
<Slide3OperatingModel {...getNarrationProps(3)} />
<Slide4PlatformCapabilities {...getNarrationProps(4)} />
<Slide5Transformation {...getNarrationProps(5)} />
<Slide6ValuePyramid {...getNarrationProps(6)} />
<Slide7MaturityCurve {...getNarrationProps(7)} />
<Slide8PositioningMap {...getNarrationProps(8)} />
<Slide9Customers {...getNarrationProps(9)} />
<Slide10Investors {...getNarrationProps(10)} />
<SlideAIVision {...getNarrationProps(11)} />
<SlideMessagingHouse {...getNarrationProps(12)} />
<SlideCampaignIdeas {...getNarrationProps(13)} />
```

---

### File: `src/components/slides/Slide0Title.tsx`

**Change 4: Update Agenda Items**
Remove the "Category Name" entry and renumber:
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
  { num: 10, label: "Investors", summary: "Why this builds shareholder value" },
  { num: 11, label: "Becoming an AI Company", summary: "The intelligence layer & roadmap" },
  { num: 12, label: "Messaging House", summary: "Complete positioning framework" },
  { num: 13, label: "Campaign Ideas", summary: "Cementing category leadership" },
];
```

---

## Result

After implementation, the deck will have **14 slides** (0-13). The "Why 'Operational Performance Platform'" slide will be hidden from the active presentation but the component file (`Slide9CategoryRationale.tsx`) will be preserved in the codebase for potential future use.

