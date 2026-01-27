

# Plan: Address Feedback on Metrics Mitigation and LMS→TMS Changes

## Overview

This plan addresses four categories of feedback:
1. **Metrics mitigation** - How to present compelling numbers responsibly
2. **Play button placement** - Move from center to corner
3. **LMS → TMS terminology** - Update across 4 files
4. **Training records clarification** - Update "disconnected" to "manual/semi-manual"

---

## 1. Metrics Mitigation Strategy

### The Concern
The presentation includes specific KPIs and percentages (e.g., +3.2% OTP, 70% faster change cycles, 80% audit prep reduction) that currently cannot be fully demonstrated or validated.

### Recommended Approach

**Option A: Add Disclaimers (Recommended)**
Add subtle but clear qualifiers throughout:
- Replace hard numbers with ranges or directional language where appropriate
- Add footnotes: "Based on customer projections and industry benchmarks"
- Use language like "target outcomes" or "potential improvement"

**Option B: Present as Vision with Current Proof Points**
- Separate metrics into "demonstrated today" vs "projected outcomes"
- Lead with efficiency improvements (provable) and present OTP/revenue metrics as vision

**Specific Changes by Slide:**

| Slide | Current Metric | Suggested Change |
|-------|---------------|------------------|
| Slide 2 | +3.2% OTP, 94% Ready, 2hr Audit | Add footnote: "Target outcomes based on customer projections" |
| Slide 3 | 3% OTP improvement | Change to "OTP improvement" (directional) or add qualifier |
| Slide 4 | 70% faster, 40% less admin | Add footnote reference |
| Slide 7 | 15% OTP, 40% delay reduction | Present as "Stage 5 potential outcomes" |

**Files to Update:**
- `src/components/slides/Slide2BeforeAfter.tsx` - Add footnote
- `src/components/slides/Slide3OperatingModel.tsx` - Add qualifier
- `src/components/slides/SlidePlatformCapabilities.tsx` - Already has footnote reference
- `src/components/slides/Slide5MaturityCurve.tsx` - Add "projected" language
- `src/data/slideNarration.ts` - Update narration to include qualifiers

---

## 2. Play Button Placement

### Current State
The play button is positioned at absolute center of the slide:
```tsx
className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
```

### Proposed Change
Move to bottom-right corner (opposite the slide number):

**File: `src/components/SlidePlayButton.tsx`**
```tsx
// Change from:
className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"

// Change to:
className="absolute bottom-24 right-6 sm:bottom-28 sm:right-10"
```

**Also update `src/components/slides/SlideContainer.tsx`** to ensure z-index layering is correct.

---

## 3. LMS → TMS Terminology Changes

"TMS" (Training Management System) is a broader category that includes LMS. Update all occurrences:

| File | Location | Current | New |
|------|----------|---------|-----|
| `src/components/slides/Slide1StrategicShift.tsx` | Line 57 | `LMS` | `TMS` |
| `src/components/slides/Slide9CategoryRationale.tsx` | Line 32 | `manuals/safety/LMS` | `manuals/safety/TMS` |
| `src/data/slideNarration.ts` | Slide 11 script | `or an LMS` | `or a TMS` |
| `src/components/FragmentationIllustration.tsx` | Line 13 | `label: "LMS"` | `label: "TMS"` |

---

## 4. Training Records Clarification (Page 3 / Slide 2)

### Feedback
Training records are not "stale" or simply "disconnected" — they are manual/semi-manual and not close to online, even though in many cases they are connected to operational signals.

### Current State
- Visual shows "45K disconnected"
- Narration says "disconnected from operational signals and underutilized"

### Proposed Update

**File: `src/components/slides/Slide2BeforeAfter.tsx`**
- Change line 131 from `disconnected` to `manual`
- Update the data locked description

**File: `src/data/slideNarration.ts`**
- Update slideId 2 script: Change "disconnected from operational signals" to "managed manually — connected to risk signals but not automated or online"

---

## File Summary

| File | Changes |
|------|---------|
| `src/components/SlidePlayButton.tsx` | Move button to bottom-right corner |
| `src/components/slides/SlideContainer.tsx` | Adjust z-index if needed |
| `src/components/slides/Slide1StrategicShift.tsx` | LMS → TMS |
| `src/components/slides/Slide2BeforeAfter.tsx` | "disconnected" → "manual"; add metrics footnote |
| `src/components/slides/Slide9CategoryRationale.tsx` | LMS → TMS in differentiation description |
| `src/components/FragmentationIllustration.tsx` | LMS → TMS in node label |
| `src/data/slideNarration.ts` | LMS → TMS in Slide 11; update Slide 2 training records language; add metric qualifiers |

---

## Questions for Clarification

1. **Metrics approach**: Should we use Option A (add disclaimers/footnotes) or Option B (separate demonstrated vs. projected)? Or a hybrid?

2. **Play button corner**: Bottom-right is suggested (consistent with modern video players), but would you prefer bottom-left or top-left/right?

3. **Training records nuance**: The proposed language is "managed manually — connected to risk signals but not automated or online." Does this accurately capture the reality?

---

## Summary

| Change Category | Files Affected | Complexity |
|----------------|----------------|------------|
| Play button position | 1-2 files | Low |
| LMS → TMS | 4 files | Low |
| Training records | 2 files | Low |
| Metrics mitigation | 4-5 files | Medium |

