

# Add "What This Means for Customers" Slide to All Pitch Decks

## Approach

Create a new shared component that repackages the existing `Slide7Customers` content using `PitchSlideContainer` (the wrapper used by all pitch decks), then insert it into the Executive, Operational, and Technical decks.

## Changes

### 1. New file: `src/components/shared/CustomerOutcomesSlide.tsx`
- Copy the content (value outcomes grid, cost-center-to-revenue progression, benchmarking callout) from `Slide7Customers.tsx`
- Use `PitchSlideContainer` instead of `SlideContainer`
- Accept `id` and `slideNumber` as props so each deck can assign its own slide ID

### 2. `src/pages/ExecutivePitch.tsx`
- Import `CustomerOutcomesSlide`
- Insert as a new slide entry before "Why Comply365" (after "Line of Sight"):
  `{ id: "exec-slide-6b", label: "Customer Outcomes", component: CustomerOutcomesSlide }`

### 3. `src/pages/OperationalPitch.tsx`
- Import `CustomerOutcomesSlide`
- Insert before "Why Comply365" (after "Outcomes"):
  `{ id: "ops-slide-9b", label: "Customer Outcomes", component: CustomerOutcomesSlide }`

### 4. `src/pages/TechnicalDeepDive.tsx`
- Import `CustomerOutcomesSlide`
- Insert before "Why Comply365" (after "Outcomes"):
  `{ id: "tech-slide-16b", label: "Customer Outcomes", component: CustomerOutcomesSlide }`

**4 files: 1 new, 3 modified. No routing changes.**

