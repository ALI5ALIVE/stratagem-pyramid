

# Plan: Swap Slide 9 (Customers) and Slide 10 (AI Journey)

## Current Order

| Position | Label | Component |
|----------|-------|-----------|
| 9 | Customers | `Slide9Customers` |
| 10 | AI Journey | `SlideAIVision` |

## New Order

| Position | Label | Component |
|----------|-------|-----------|
| 9 | AI Journey | `SlideAIVision` |
| 10 | Customers | `Slide9Customers` |

---

## Changes to `src/pages/SlideDeck.tsx`

### 1. Update slides array (lines 34-35)

```tsx
// Before
{ id: "slide-9", label: "Customers" },
{ id: "slide-10", label: "AI Journey" },

// After
{ id: "slide-9", label: "AI Journey" },
{ id: "slide-10", label: "Customers" },
```

### 2. Update component render order (lines 213-214)

```tsx
// Before
<Slide9Customers {...getNarrationProps(8)} />
<SlideAIVision {...getNarrationProps(9)} />

// After
<SlideAIVision {...getNarrationProps(8)} />
<Slide9Customers {...getNarrationProps(9)} />
```

---

## Rationale

This places "Your Intelligence Journey" (AI Vision) before the "Customers" slide, allowing the audience to understand the platform's intelligence roadmap before seeing social proof from existing customers.

---

## Files Changed

| File | Change |
|------|--------|
| `src/pages/SlideDeck.tsx` | Swap order in slides array and component render |

