

# Plan: Update Slide 4 Visual and Hide Slide 5

## Goal

1. Replace the "CoreSolutionsInfinity" component (3 circles with infinity loop) on Slide 4 "The Operational Intelligence Layer" with the `PlatformEcosystemDiagram` SVG component from the homepage mockup
2. Hide Slide 5 "The Platform That Powers It" (`SlidePlatformCapabilities`) from the deck

---

## Current State

### Slide 4: The Operational Intelligence Layer
- **File**: `src/components/slides/Slide3OperatingModel.tsx`
- **Current Visual**: Uses `CoreSolutionsInfinity` component (3 circles: Safety, Content, Training with infinity loop and DTOP stages)
- **Location in deck**: Position 4 (slide-3 in code)

### Slide 5: The Platform That Powers It  
- **File**: `src/components/slides/SlidePlatformCapabilities.tsx`
- **Current Visual**: Uses static ecosystem diagram image + capability cards
- **Location in deck**: Position 5 (slide-4 in code)

### Homepage Visual
- **Component**: `PlatformEcosystemDiagram` from `src/components/PlatformEcosystemDiagram.tsx`
- **Features**: Interactive SVG with Safety/Content/Training cards, AI assistant labels, animated flowing dots along circular arrows, central Comply365 hub

---

## Changes

### 1. Update `src/components/slides/Slide3OperatingModel.tsx`

**Replace the CoreSolutionsInfinity import and usage with PlatformEcosystemDiagram:**

```tsx
// Before
import CoreSolutionsInfinity from "../CoreSolutionsInfinity";

// After
import PlatformEcosystemDiagram from "../PlatformEcosystemDiagram";
```

**Update the visual section (around line 127-129):**

```tsx
// Before
<div className="mb-2">
  <CoreSolutionsInfinity />
</div>

// After
<div className="mb-2 flex justify-center">
  <div className="w-48 h-48 lg:w-56 lg:h-56">
    <PlatformEcosystemDiagram />
  </div>
</div>
```

**Keep everything else intact:**
- Data Sources row
- DTOP Pipeline cards (Detect → Trigger → Orchestrate → Prove)
- Value Generated metrics row

---

### 2. Update `src/pages/SlideDeck.tsx`

**Comment out or remove Slide 5 from the deck:**

**Update slides array (around lines 23-40):**
```tsx
const slides = [
  { id: "slide-0", label: "Title" },
  { id: "slide-1", label: "Strategic Shift" },
  { id: "slide-2", label: "Before & After" },
  { id: "slide-3", label: "Operating Model" },
  // { id: "slide-4", label: "Platform Capabilities" }, // HIDDEN
  { id: "slide-5", label: "Transformation" },
  { id: "slide-6", label: "Use Cases" },
  // ... rest of slides renumbered
];
```

**Comment out the component render (around line 209):**
```tsx
<Slide3OperatingModel {...getNarrationProps(3)} />
{/* HIDDEN: <Slide4PlatformCapabilities {...getNarrationProps(4)} /> */}
<Slide5Transformation {...getNarrationProps(4)} />
```

**Update slide numbering for narration props** to maintain correct sequence.

---

## Summary of File Changes

| File | Change |
|------|--------|
| `src/components/slides/Slide3OperatingModel.tsx` | Replace `CoreSolutionsInfinity` with `PlatformEcosystemDiagram` |
| `src/pages/SlideDeck.tsx` | Comment out `SlidePlatformCapabilities` from slides array and render |

---

## Visual Result

**Before**: Slide 4 shows a horizontal infinity loop with 3 circles and DTOP stage indicators

**After**: Slide 4 shows the circular platform ecosystem diagram with:
- Dark outer ring with "AI-POWERED" text
- AI assistant labels (CoAuthor, CoAnalyst, CoTrainer)
- Safety/Content/Training product cards with flowing arrow animations
- Central Comply365 hub

The new visual better represents the platform ecosystem and matches the homepage branding while keeping all the DTOP pipeline content and metrics below it.

