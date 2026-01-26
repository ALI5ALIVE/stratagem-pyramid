

# Plan: Remove Slide 15 (Category: Performance)

## Rationale

Slide 15 (`SlideCategoryPerformance.tsx`) presents "Operational Performance Platform" as a category comparison option. Since the main deck (slides 0-12) is now entirely focused on **Operational Performance Platform**, having it as a comparison slide is redundant. The remaining 3 comparison slides (Excellence, Orchestration, Assurance) provide meaningful alternatives to compare against.

---

## Changes Required

### 1. Update SlideDeck.tsx

**Remove from imports (line 19):**
```diff
- import SlideCategoryPerformance from "@/components/slides/category-options/SlideCategoryPerformance";
```

**Remove from slides array (line 38):**
```diff
  { id: "slide-14", label: "Category: Orchestration" },
- { id: "slide-15", label: "Category: Performance" },
- { id: "slide-16", label: "Category: Assurance" },
+ { id: "slide-15", label: "Category: Assurance" },
```

**Remove component and renumber (lines 218-221):**
```diff
  <SlideCategoryExcellence {...getNarrationProps(13)} />
  <SlideCategoryOrchestration {...getNarrationProps(14)} />
- <SlideCategoryPerformance {...getNarrationProps(15)} />
- <SlideCategoryAssurance {...getNarrationProps(16)} />
+ <SlideCategoryAssurance {...getNarrationProps(15)} />
```

### 2. Delete Component File

**Delete:** `src/components/slides/category-options/SlideCategoryPerformance.tsx`

---

## Summary

| Metric | Before | After |
|--------|--------|-------|
| Total slides | 17 | 16 |
| Category comparison slides | 4 | 3 |
| Files modified | - | 1 |
| Files deleted | - | 1 |

---

## Updated Slide Structure

| # | Slide | Notes |
|---|-------|-------|
| 0-12 | Main deck | Focused on "Operational Performance Platform" |
| 13 | Category: Excellence | Comparison option |
| 14 | Category: Orchestration | Comparison option |
| 15 | Category: Assurance | Renumbered from 16 |

