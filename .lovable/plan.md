

# Plan: Enlarge Competitive Positioning Map and Fix Vendor Chip Overlap

## Problems Identified

1. **Chart too small** - The 700px max-width is still constraining the chart on large monitors
2. **Vendor chips overlapping** - The vendor selector chips on the Radar view are overlapping each other

---

## Solution Overview

### 1. Make Chart Much Larger

Since you're on a large monitor, we'll significantly increase the chart size:

| Element | Current | Proposed |
|---------|---------|----------|
| Strategic Matrix container | `max-w-[700px]` | `max-w-4xl` (896px) |
| Radar Chart container | `max-w-[600px]` | `max-w-3xl` (768px) |

We'll also use CSS utility classes instead of fixed pixel values for better responsiveness.

### 2. Fix Vendor Chip Overlap

The vendor chips are using `flex-wrap justify-center gap-2` which can cause overlap on certain screen sizes. We'll:

| Change | Current | Proposed |
|--------|---------|----------|
| Chip gap | `gap-2` | `gap-3` (more spacing) |
| Chip padding | `px-3 py-1.5` | `px-2.5 py-1` (slightly smaller) |
| Font size | `text-xs` | Keep `text-xs` |
| Max container width | None | Add `max-w-3xl` to constrain wrapping |

---

## File Changes

**File: `src/components/slides/Slide8PositioningMap.tsx`**

### Change 1: Increase Matrix Chart Size (Line 197)
```tsx
// From:
<div className="w-full max-w-[700px] aspect-square mx-auto">

// To:
<div className="w-full max-w-4xl aspect-square mx-auto">
```

### Change 2: Increase Radar Chart Size (Line 373)
```tsx
// From:
<div className="w-full max-w-[600px] aspect-square mx-auto">

// To:
<div className="w-full max-w-3xl aspect-square mx-auto">
```

### Change 3: Fix Vendor Chip Overlap (Line 349)
```tsx
// From:
<div className="flex flex-wrap justify-center gap-2">

// To:
<div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
```

### Change 4: Adjust Chip Button Styling (Line 354)
```tsx
// From:
className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2 ${...}`}

// To:
className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all border-2 whitespace-nowrap ${...}`}
```

Adding `whitespace-nowrap` prevents the chip text from wrapping internally, which can contribute to overlap issues.

---

## Size Comparison

| Tailwind Class | Pixel Width | Improvement |
|----------------|-------------|-------------|
| `max-w-[700px]` | 700px | Current |
| `max-w-4xl` | 896px | +28% larger |
| `max-w-[600px]` | 600px | Current |
| `max-w-3xl` | 768px | +28% larger |

---

## Visual Impact

- **Strategic Matrix**: ~28% larger, filling more of the large monitor viewport
- **Radar Chart**: ~28% larger with better visibility
- **Vendor Chips**: Properly spaced with no overlapping, constrained to a readable width
- Both charts maintain square aspect ratio for proper visual proportions

