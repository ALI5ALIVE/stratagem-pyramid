
# Plan: Rename Category from "Operational Excellence" to "Operational Performance & Readiness"

## Overview

This plan covers all changes required to update the category name from **"Operational Excellence & Readiness Platform"** to **"Operational Performance & Readiness Platform"** throughout the Comply365 slide deck and related components.

---

## Summary

| Metric | Count |
|--------|-------|
| Files to modify | 12 |
| UI text replacements | ~45 instances |
| Narration script updates | 12 slides |

---

## Files to Update

### 1. Narration Data (Priority - Source of Truth)

**File: `src/data/slideNarration.ts`**

| Slide | Line | Current | Updated |
|-------|------|---------|---------|
| 0 | 16 | "Operational Excellence and Readiness Platform" | "Operational Performance and Readiness Platform" |
| 1 | 22 | "Operational Excellence and Readiness Platform" | "Operational Performance and Readiness Platform" |
| 6 | 52 | "operational excellence" | "operational performance" |
| 7 | 56, 58 | "Operational Excellence Roadmap", "predictive excellence" | "Operational Performance Roadmap", "predictive performance" |
| 10 | 76 | "Operational Excellence and Readiness Platform" | "Operational Performance and Readiness Platform" |
| 11 | 82 | Full script rewrite - "Operational Excellence" references | "Operational Performance" throughout |
| 12 | 88 | "Operational Excellence and Readiness Platform" (2x) | "Operational Performance and Readiness Platform" |

---

### 2. Slide Components

**File: `src/components/slides/Slide1StrategicShift.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 77-78 | "Operational Excellence" | "Operational Performance" |
| 107-108 | "Operational Excellence & Readiness Platform" | "Operational Performance & Readiness Platform" |

**File: `src/components/slides/Slide2BeforeAfter.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 166 | "Operational Excellence & Readiness Platform" | "Operational Performance & Readiness Platform" |

**File: `src/components/slides/Slide4Transformation.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 233 | "Operational excellence as competitive advantage" | "Operational performance as competitive advantage" |

**File: `src/components/slides/Slide6Investors.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 59 | "Operational Excellence & Readiness Platform" | "Operational Performance & Readiness Platform" |

**File: `src/components/slides/Slide9CategoryRationale.tsx`**

This slide requires structural content updates since "Operational Performance" is now the recommended name:

| Line | Current | Updated |
|------|---------|---------|
| 17 | "'Operational Excellence' is how COOs talk" | "'Operational Performance' focuses on measurable outcomes COOs report to boards" |
| 42-47 | "Operational Performance & Readiness Platform" listed as alternative | Swap: "Operational Excellence & Readiness Platform" becomes the alternative with verdict "Previous consideration" |
| 73 | "Why 'Operational Excellence & Readiness Platform'" | "Why 'Operational Performance & Readiness Platform'" |
| 90 | "Operational Excellence & Readiness Platform" | "Operational Performance & Readiness Platform" |
| 147-149 | Closing statement referencing "Operational Excellence" | Update to "Operational Performance" |

**File: `src/components/slides/SlideMessagingHouse.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 22 | `name: "Operational Excellence & Readiness Platform"` | `name: "Operational Performance & Readiness Platform"` |
| 187 | `subtitle: "...Operational Excellence & Readiness"` | `subtitle: "...Operational Performance & Readiness"` |
| 368 | "operational excellence and readiness" | "operational performance and readiness" |

---

### 3. Page Components

**File: `src/pages/SlideDeck.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 26 | "Operational Excellence Roadmap" | "Operational Performance Roadmap" |

**File: `src/pages/MaturityCurve.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 14 | "Operational Excellence &" | "Operational Performance &" |
| 15 | "The Operational Excellence Roadmap" | "The Operational Performance Roadmap" |
| 30 | "Operational Excellence & Readiness Platform" | "Operational Performance & Readiness Platform" |

**File: `src/components/CategoryPyramid.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 264 | "Operational Excellence &" | "Operational Performance &" |
| 371 | "Operational Excellence & Readiness Platform" | "Operational Performance & Readiness Platform" |

---

## Slide 9 Content Restructure

Since "Operational Performance" is now the recommended name, the alternatives table needs updating:

```text
Current alternatives array:
1. "Operational Performance & Readiness Platform" - "Acceptable alternate"
2. "Operational Performance Platform" - "Outcome language only"
3. "Operational Assurance Platform" - "Supporting pillar"
4. "Operational Performance & Resilience Platform" - "Campaign theme"
5. "Continuous Improvement Operating System" - "Operating model name"

Updated alternatives array:
1. "Operational Excellence & Readiness Platform" - "Previous consideration" 
   Risk: "Philosophy language; less measurable than 'performance'"
2. "Operational Performance Platform" - "Outcome language only"
3. "Operational Assurance Platform" - "Supporting pillar"  
4. "Operational Performance & Resilience Platform" - "Campaign theme"
5. "Continuous Improvement Operating System" - "Operating model name"
```

---

## Narration Script Updates (Slide 11 - Category Name)

The narration script for slide 11 needs a complete rewrite to explain why "Operational Performance" was chosen:

```text
"Why 'Operational Performance and Readiness Platform'? Because the name emphasizes measurable outcomes while protecting what makes us different.

COO Clarity: 'Operational Performance' focuses on the measurable outcomes that COOs report to their boards. The language is results-oriented and executive-native.

Scope Protection: 'Readiness' keeps training, competency, and proof central to the category. It prevents collapse into pure analytics or dashboard solutions.

Cross-Industry Applicability: The name applies cleanly across aviation, rail, defense, maritime, and other regulated operations. It's not niche. It's horizontal.

Differentiation: The name avoids module traps — we're not a manuals tool, a safety tool, or an LMS. And it avoids ops-control confusion — we're not a dashboard or monitoring platform.

Analyst Legibility: AI is an accelerator inside the platform, not the category itself. This positions us safely with analysts and regulators.

We considered 'Operational Excellence' but 'Performance' better captures the measurable outcomes focus. 'Operational Performance and Readiness Platform' is the clearest executive frame that still protects what makes Comply three six five different: connecting Safety, Content, and Training into a governed operating system that turns signals into outcomes and proof."
```

---

## Evidence Trail

After implementation, the category name change can be evidenced by:

1. **Slide 11 (Category Rationale)** - Explicit discussion of why "Operational Performance" was chosen over alternatives including "Operational Excellence"
2. **Consistent terminology** - Same name appears in Title, Strategic Shift, Before/After, Investors, Messaging House, and all narration scripts
3. **Navigation labels** - TOC and page headers reflect the new terminology
4. **Footers** - All page footers show the updated platform name

---

## Implementation Order

1. Update `src/data/slideNarration.ts` (narration scripts - source of truth)
2. Update `src/components/slides/Slide9CategoryRationale.tsx` (restructure alternatives)
3. Update remaining slide components (Slide1, Slide2, Slide4, Slide6, SlideMessagingHouse)
4. Update page components (SlideDeck, MaturityCurve, CategoryPyramid)
5. Verify all instances replaced with codebase search

---

## Verification

After implementation, run these searches to verify completeness:
- `"Operational Excellence"` should return 0 matches (except in alternatives/historical references)
- `"Operational Performance"` should return ~50+ matches

---

## Technical Details

- No dependency changes required
- No API changes required  
- No database changes required
- Changes are purely text/content updates
- Build will succeed after all file updates
