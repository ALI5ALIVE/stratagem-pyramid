
# Plan: Fix Use Cases Slide Overflow Issue

## Problem

The "Outcome Proven" (final benefit box) section is being cut off at the bottom of each use case card. This happens because:

1. The slide uses `h-screen` with `overflow-hidden` to constrain content to viewport
2. Each card now has 4 DTOP steps (after adding Orchestrate), increasing content height
3. The cards use `flex-1` which doesn't guarantee enough space for all content
4. The bottom callout takes additional vertical space

## Solution

Reduce vertical spacing and text sizes to fit all content, and make the cards scrollable as a fallback.

---

## Changes to `src/components/slides/SlideUseCases.tsx`

### 1. Reduce spacing in the card flow sections

Change `space-y-3` to `space-y-2` for tighter step spacing:

```tsx
// Line 225
// Before
<div className="space-y-3">

// After
<div className="space-y-2">
```

### 2. Reduce header margin

```tsx
// Line 209
// Before
<div className="flex items-center gap-3 mb-4">

// After
<div className="flex items-center gap-3 mb-3">
```

### 3. Add overflow handling to the grid

Make the grid area scrollable if content still overflows:

```tsx
// Line 187
// Before
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

// After
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-y-auto">
```

### 4. Ensure cards don't overflow internally

Add `overflow-visible` to cards to prevent internal clipping:

```tsx
// Line 198
// Before
"bg-card/50 backdrop-blur-sm border rounded-xl p-4 cursor-pointer transition-all duration-500",

// After
"bg-card/50 backdrop-blur-sm border rounded-xl p-3 cursor-pointer transition-all duration-500 overflow-visible",
```

### 5. Reduce DTOP legend spacing

```tsx
// Line 164
// Before
<div className="flex items-center justify-center gap-3 mb-2">

// After
<div className="flex items-center justify-center gap-2 mb-1">
```

### 6. Reduce bottom callout padding

```tsx
// Line 321
// Before
<div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-3">

// After
<div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-2">
```

---

## Summary of Changes

| Location | Change |
|----------|--------|
| Card padding | Reduce from `p-4` to `p-3` |
| Header margin | Reduce from `mb-4` to `mb-3` |
| Step spacing | Reduce from `space-y-3` to `space-y-2` |
| DTOP legend | Reduce gap from `gap-3` to `gap-2`, margin from `mb-2` to `mb-1` |
| Grid container | Add `min-h-0 overflow-y-auto` for fallback scrolling |
| Bottom callout | Reduce padding from `p-3` to `p-2` |

These changes reclaim approximately 40-50px of vertical space, ensuring the "Outcome Proven" section with its metric badge is fully visible without scrolling on most screens.

---

## File Changed

| File | Change |
|------|--------|
| `src/components/slides/SlideUseCases.tsx` | Reduce spacing throughout to prevent content cutoff |
