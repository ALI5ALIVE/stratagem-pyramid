
# Plan: Fix Transformation Slide and Positioning Map Layout

## Overview

This plan addresses two specific layout issues:
1. **Transformation Slide**: "Point Tools" and "Platform" labels are being cut off at the top
2. **Positioning Map**: Charts have been over-compressed and need to be restored to proper aspect ratios

---

## Issue 1: Transformation Slide (Slide4Transformation.tsx)

### Problem
- The labels "Point Tools" and "Platform" use `absolute -top-2.5` positioning, which places them above their container boundaries
- This causes them to be clipped by the parent container's `overflow-hidden`
- The content is also too compressed vertically

### Solution

**File: `src/components/slides/Slide4Transformation.tsx`**

| Change | Current | Proposed |
|--------|---------|----------|
| Main container | `gap-3` | `gap-4` |
| Before/After grid | `pt-4` | `pt-5` (more room for labels) |
| Label positioning | `absolute -top-2.5` | `absolute -top-3` (move labels up less) |
| Content grid | `gap-4 items-start` | `gap-6 items-start` |
| Add top padding | No wrapper padding | Add `pt-4` to the grid wrapper to prevent label clipping |

**Specific Changes:**
1. Add `pt-4` to the outer grid container (line 75) to provide space for the floating labels
2. Change the label position from `-top-2.5` to `top-0 -translate-y-1/2` for better positioning relative to card borders
3. Increase `gap-3` to `gap-4` for better spacing
4. Ensure the card containers have `pt-5` to accommodate the labels inside

---

## Issue 2: Positioning Map (Slide8PositioningMap.tsx)

### Problem
- The Strategic Matrix chart was changed from `aspect-square` to `max-h-[380px]`
- The Radar chart was changed from `aspect-square` to `max-h-[340px]`
- This caused both charts to appear squashed/compressed

### Solution

**File: `src/components/slides/Slide8PositioningMap.tsx`**

**Revert chart containers to use aspect-square with max-width constraints:**

| Chart | Current | Proposed |
|-------|---------|----------|
| Matrix (line 197) | `max-h-[380px] aspect-square` | `aspect-square` (remove max-h) |
| Radar (line 373) | `max-h-[340px] aspect-square` | `aspect-square` (remove max-h) |

**Additional adjustments:**
- Matrix container: Change from `max-w-[600px] max-h-[380px]` to `max-w-[500px]` with `aspect-square`
- Radar container: Change from `max-w-[480px] max-h-[340px]` to `max-w-[420px]` with `aspect-square`
- Reduce chart margins slightly to reclaim space while maintaining proportions

---

## File Summary

| File | Changes |
|------|---------|
| `src/components/slides/Slide4Transformation.tsx` | Add padding for labels, adjust spacing |
| `src/components/slides/Slide8PositioningMap.tsx` | Restore `aspect-square`, remove `max-h` constraints |

---

## Visual Impact

### Transformation Slide
- "Point Tools" and "Platform" labels will be fully visible
- Content will have slightly more breathing room
- All copy will be readable without clipping

### Positioning Map
- Charts will return to their proper square proportions
- Quadrant labels and vendor positions will be properly spaced
- Interactive elements will be fully accessible
