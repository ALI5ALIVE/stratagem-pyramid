

# Plan: Swap Slide 5 (Transformation) and Slide 6 (Use Cases)

## Current Order

| Position | Label | Component |
|----------|-------|-----------|
| 5 | Transformation | `Slide5Transformation` |
| 6 | Use Cases | `SlideUseCases` |

## New Order

| Position | Label | Component |
|----------|-------|-----------|
| 5 | Use Cases | `SlideUseCases` |
| 6 | Transformation | `Slide5Transformation` |

---

## Changes to `src/pages/SlideDeck.tsx`

### 1. Update slides array (lines 29-30)

```tsx
// Before
{ id: "slide-5", label: "Transformation" },
{ id: "slide-6", label: "Use Cases" },

// After
{ id: "slide-5", label: "Use Cases" },
{ id: "slide-6", label: "Transformation" },
```

### 2. Update component render order (lines 210-211)

```tsx
// Before
<Slide5Transformation {...getNarrationProps(4)} />
<SlideUseCases {...getNarrationProps(5)} />

// After
<SlideUseCases {...getNarrationProps(4)} />
<Slide5Transformation {...getNarrationProps(5)} />
```

---

## Rationale

This reordering places concrete "Use Cases in Action" examples before the abstract "Transformation" value boxes, following a "show, then tell" narrative flow - letting the audience see real-world scenarios before presenting the summary of value areas.

---

## Files Changed

| File | Change |
|------|--------|
| `src/pages/SlideDeck.tsx` | Swap order in slides array and component render |

