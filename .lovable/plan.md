

# Tighten DTOP, Intelligence Tiers & Differentiation Slides

## Problem
Three slides (`TechSlide5DTOP`, `TechSlide8IntelligenceTiers`, `TechSlide9VsGenericAI`) wrap content in large `rounded-xl` bordered boxes with generous padding, making the actual text look tiny inside oversized containers. Too much border/background chrome, not enough content density.

## Changes

### 1. `TechSlide5DTOP.tsx`
- Reduce card padding from `p-4` to `p-3`
- Reduce card border radius from `rounded-xl` to `rounded-lg`
- Bump text sizes: step letter from `text-2xl` to `text-xl`, label from `text-base` to `text-sm`, description from `text-[11px]` to `text-xs`
- Reduce gap between cards from `gap-3` to `gap-2`
- Slim down the bottom callout padding from `p-3` to `p-2`
- Reduce outer gap from `gap-4` to `gap-3`

### 2. `TechSlide8IntelligenceTiers.tsx`
- Reduce tier card padding from `p-3` to `p-2.5`, radius from `rounded-xl` to `rounded-lg`
- Bump tier description from `text-[10px]` to `text-xs`, capability from `text-[9px]` to `text-[10px]`
- Reduce comparison table cell padding, bump table text from `text-[10px]`/`text-[9px]` to `text-xs`/`text-[10px]`
- Reduce accuracy box padding from `p-2.5` to `p-2`, bump text from `text-[9px]` to `text-[10px]`
- Tighten gap between right-side panels from `gap-2` to `gap-1.5`
- Switch tier grid from `gap-2` to `gap-1.5`

### 3. `TechSlide9VsGenericAI.tsx`
- Reduce all box padding from `p-3` to `p-2.5`, radius from `rounded-xl` to `rounded-lg`
- Bump table text from `text-[11px]`/`text-[10px]` to `text-xs`
- Bump right-panel text from `text-[10px]` to `text-[11px]`
- Tighten right column gap from `gap-2` to `gap-1.5`
- Remove `flex-1` from the quote box so it doesn't stretch to fill remaining space — use auto height instead

### What stays the same
- All data arrays, colors, icons, and interactive behavior
- The `SalesSlideContainer` wrapper and its padding
- Overall grid proportions (3/2 split for tiers and differentiation, 4-col for DTOP)

