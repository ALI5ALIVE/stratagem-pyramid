

# Fix: Sales Deck Logo Size and Header Spacing

## Problem

The Comply365 logo in the top-right corner is too large (`h-6 sm:h-8`), and the slide title sits too close to it because the content area starts at the same vertical position as the logo without enough top margin.

## Changes

### File: `src/components/sales-slides/SalesSlideContainer.tsx`

Two adjustments:

1. **Reduce logo size** (line 70): Change `h-6 sm:h-8` to `h-5 sm:h-6` and reduce opacity from `0.90` to `0.80` — this matches the memory guideline for sales deck layout separation.

2. **Add top margin to header** (line 89): Add `mt-4 sm:mt-6` to the header `<div>` so the title text clears the logo area and doesn't crowd it.

These two small tweaks will make the logo feel like a subtle brand mark rather than competing with the slide title, and give enough breathing room between the two elements.

