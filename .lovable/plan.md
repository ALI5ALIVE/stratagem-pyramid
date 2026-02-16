

# Fix: Use Cases Cards Side by Side on More Screen Sizes

## Current Behavior
The Use Cases slide already displays cards side by side at `lg` (1024px+) breakpoints. Below that, they stack vertically. With the sidebar taking up space, the content area may drop below the `lg` threshold.

## Fix
In `src/components/slides/SlideUseCases.tsx` (line 188), change the grid breakpoint from `lg:grid-cols-3` to `md:grid-cols-3` so cards go horizontal at 768px+ instead of 1024px+.

## Technical Details

### File: `src/components/slides/SlideUseCases.tsx`

**Line 188 — change:**
```
grid-cols-1 lg:grid-cols-3
```
**to:**
```
grid-cols-1 md:grid-cols-3
```

One-line change.

