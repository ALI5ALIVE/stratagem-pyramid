
# Fix: Logo Size on Title and Next Steps Slides

## Problem

Two sales deck slides render their own Comply365 logo instead of using `SalesSlideContainer`, and still have the old larger size (`h-6 sm:h-8`, `opacity-90`).

## Changes

### 1. `src/components/sales-slides/SalesSlide0Title.tsx` (line 43)
- Change `className="h-6 sm:h-8 w-auto opacity-90"` to `className="h-5 sm:h-6 w-auto opacity-80"`

### 2. `src/components/sales-slides/SalesSlide9NextSteps.tsx` (line 54)
- Change `className="h-6 sm:h-8 w-auto opacity-90"` to `className="h-5 sm:h-6 w-auto opacity-80"`

Both changes match the already-fixed `SalesSlideContainer.tsx` values so all slides are consistent.
