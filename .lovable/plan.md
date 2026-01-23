
# Plan: Fix Text Cutoff in Messaging House Roof (Slide 12)

## Problem

On slide 12 (Messaging House), the category name "Operational Performance & Readiness Platform" is being cut off at the edges because the triangular roof shape clips the text.

The current implementation uses a CSS `clipPath: polygon(50% 0%, 100% 100%, 0% 100%)` which creates a steep triangle where the text area is too narrow.

## Solution

Apply multiple fixes to ensure the text fits within the roof visual:

1. **Increase roof height** - Make the triangle taller so the text sits at a level where there's more horizontal space
2. **Adjust the clip path** - Use a less steep triangle shape (wider at the apex)
3. **Reduce text size** - Make the category name slightly smaller
4. **Increase top padding** - Push the text lower into the triangle where it's wider

---

## File to Modify

**`src/components/slides/SlideMessagingHouse.tsx`** (lines 203-217)

---

## Current Code (Lines 203-217)

```jsx
{/* Rooftop: Category Position */}
<div className="relative">
  <div 
    className="bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border border-primary/40 rounded-lg p-4"
    style={{
      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)"
    }}
  >
    <div className="pt-6 pb-2 text-center">
      <div className="text-xs uppercase tracking-widest text-primary/80 mb-1">Category Position</div>
      <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">
        {categoryPosition.name}
      </h3>
    </div>
  </div>
</div>
```

---

## Updated Code

```jsx
{/* Rooftop: Category Position */}
<div className="relative">
  <div 
    className="bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border border-primary/40 rounded-lg p-4 min-h-[100px]"
    style={{
      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)"
    }}
  >
    <div className="pt-10 pb-2 text-center px-8">
      <div className="text-[10px] uppercase tracking-widest text-primary/80 mb-1">Category Position</div>
      <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
        {categoryPosition.name}
      </h3>
    </div>
  </div>
</div>
```

---

## Changes Summary

| Element | Current | Updated | Reason |
|---------|---------|---------|--------|
| Outer div | No min-height | `min-h-[100px]` | Makes triangle taller so text sits where it's wider |
| Inner div padding-top | `pt-6` | `pt-10` | Pushes text lower into the triangle where there's more width |
| Inner div horizontal padding | None | `px-8` | Adds horizontal padding to keep text away from clipped edges |
| "Category Position" label | `text-xs` | `text-[10px]` | Slightly smaller to give more room |
| Category name heading | `text-sm sm:text-base` | `text-xs sm:text-sm` | Reduce font size by one step to fit better |

---

## Visual Effect

```text
BEFORE:                           AFTER:
      ▲                                 ▲
     /█\  ← Text clipped           /     \
    /███\    at edges             /       \
   /█████\                       /  TEXT   \
  ─────────                     /   HERE    \
                               ─────────────
                               ↑ Taller triangle
                                 Text positioned lower
                                 where it's wider
```

---

## Verification

After implementation:
- Navigate to slide 12 (Messaging House)
- Confirm "Operational Performance & Readiness Platform" (or "Operational Intelligence & Readiness Platform" after rename) displays fully without cutoff
- Verify the roof shape still looks like a triangle/house roof
- Check responsiveness on mobile and desktop views
