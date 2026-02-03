

# Plan: Resize Platform Diagram and DTOP Cards on Operating Model Slide

## Current State

The Operating Model slide (Slide 3) currently has:
- **Platform diagram**: `w-48 h-48 lg:w-56 lg:h-56` (relatively small)
- **DTOP cards**: `p-3` padding with various elements inside taking up significant space

## Proposed Changes

### File: `src/components/slides/Slide3OperatingModel.tsx`

#### Change 1: Make Platform Ecosystem Diagram Larger (line 128)

Increase the diagram container size from `w-48 h-48 lg:w-56 lg:h-56` to `w-64 h-64 lg:w-80 lg:h-80`:

**Current:**
```tsx
<div className="w-48 h-48 lg:w-56 lg:h-56">
```

**New:**
```tsx
<div className="w-64 h-64 lg:w-80 lg:h-80">
```

#### Change 2: Reduce DTOP Card Size (lines 183-230)

Make the DTOP cards more compact:
1. Reduce padding from `p-3` to `p-2`
2. Reduce icon size from `w-8 h-8` to `w-6 h-6`
3. Reduce inner icon from `w-4 h-4` to `w-3 h-3`
4. Reduce label font from `text-sm` to `text-xs`
5. Reduce metric font from `text-lg` to `text-sm`
6. Tighten margins throughout

---

## Visual Comparison

| Element | Current | New |
|---------|---------|-----|
| Platform diagram | 192px / 224px (lg) | 256px / 320px (lg) |
| Card padding | 12px | 8px |
| Icon container | 32px | 24px |
| Label font | 14px (text-sm) | 12px (text-xs) |
| Metric font | 18px (text-lg) | 14px (text-sm) |

---

## Files Changed

| File | Changes |
|------|---------|
| `src/components/slides/Slide3OperatingModel.tsx` | Increase platform diagram size, reduce DTOP card dimensions |

