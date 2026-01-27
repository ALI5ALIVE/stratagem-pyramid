

# Plan: Add Investor Slide Back to the Deck

## Summary

Re-add the Investor slide (`Slide6Investors.tsx`) to the slide deck. Based on the previous structure and the memory context noting it was "previously 11", the logical placement is after the Customers slide and before the AI Vision slide, making it the new slide 10 (with subsequent slides renumbered).

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
| 10 | AI Vision & Future | **Investors** ← NEW |
| 11 | Category Name | AI Vision & Future |
| 12 | Messaging House | Category Name |
| 13 | Campaign Ideas | Messaging House |
| 14 | — | Campaign Ideas |

---

## Technical Changes

### File: `src/pages/SlideDeck.tsx`

**Change 1: Add Import (Line 14)**
Add the Investor slide component import:
```tsx
import Slide10Investors from "@/components/slides/Slide6Investors";
```

**Change 2: Update Slides Array (Lines 19-34)**
Add the Investors slide entry and renumber subsequent slides:
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
  { id: "slide-10", label: "Investors" },  // ← NEW
  { id: "slide-11", label: "AI Vision & Future" },
  { id: "slide-12", label: "Category Name" },
  { id: "slide-13", label: "Messaging House" },
  { id: "slide-14", label: "Campaign Ideas" },
];
```

**Change 3: Update Slide Container (Lines 199-212)**
Add the Investors slide component and renumber narration props:
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
<Slide10Investors {...getNarrationProps(10)} />  {/* NEW */}
<SlideAIVision {...getNarrationProps(11)} />
<Slide11CategoryRationale {...getNarrationProps(12)} />
<SlideMessagingHouse {...getNarrationProps(13)} />
<SlideCampaignIdeas {...getNarrationProps(14)} />
```

---

### File: `src/components/slides/Slide6Investors.tsx`

**Change 4: Update SlideContainer Props (Lines 133-137)**
Update the slide ID and number to match the new position:
```tsx
<SlideContainer
  id="slide-10"
  title="Why the Platform + New Category Builds Shareholder Value"
  subtitle="How category leadership compounds into shareholder value"
  slideNumber={11}  // Visual display: slide 11 of 15
  ...
```

---

### File: `src/components/slides/Slide0Title.tsx`

**Change 5: Update Agenda Items (Lines 6-20)**
Add the Investors item to the navigation grid and renumber:
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
  { num: 10, label: "Investors", summary: "Why this builds shareholder value" },  // NEW
  { num: 11, label: "Becoming an AI Company", summary: "The intelligence layer & roadmap" },
  { num: 12, label: "Category Name", summary: "Why this name wins" },
  { num: 13, label: "Messaging House", summary: "Complete positioning framework" },
  { num: 14, label: "Campaign Ideas", summary: "Cementing category leadership" },
];
```

---

## Result

After implementation, the deck will have **15 slides** (0-14) with the Investors slide restored at position 10, featuring the interactive Shareholder Value flywheel that syncs with narration progress to highlight each of the four value pillars: Growth, Revenue Quality, Defensibility, and AI Multiplier.

