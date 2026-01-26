
# Plan: Rename Category to "Operational Performance Platform" (Drop "& Readiness")

## Overview

This plan updates all slides 1-12 to focus on **"Operational Performance Platform"** by removing "& Readiness" from the category name throughout. This is a strategic shift that simplifies the category positioning to emphasize measurable performance outcomes.

---

## Summary

| Metric | Count |
|--------|-------|
| Files to modify | 14 |
| UI text replacements | ~60 instances |
| Narration script updates | 13 slides (0-12) |
| Visual/copy changes | Multiple slides |

---

## Files to Update

### 1. Narration Scripts (Source of Truth)

**File: `src/data/slideNarration.ts`**

| Slide | Current Text | Updated Text |
|-------|--------------|--------------|
| 0 (line 16) | "Operational Performance and Readiness Platform" | "Operational Performance Platform" |
| 1 (line 22) | "Operational Performance and Readiness Platform" (2x) | "Operational Performance Platform" |
| 6 (line 50) | "Operational Readiness Ladder" | "Operational Performance Ladder" |
| 6 (line 52) | "operational performance" | Keep as is |
| 7 (line 56) | "Operational Performance Roadmap" | Keep as is |
| 10 (line 76) | "Operational Performance and Readiness Platform" | "Operational Performance Platform" |
| 11 (line 82) | Full script rewrite - remove all "Readiness" references | Complete rewrite explaining "Performance" choice |
| 12 (line 88) | "Operational Performance and Readiness Platform" (2x), "operational performance and readiness" | "Operational Performance Platform" |

**New Slide 11 Narration Script:**
```text
"Why 'Operational Performance Platform'? Because the name captures exactly what COOs and boards care about: measurable outcomes.

COO Clarity: 'Operational Performance' focuses on the results that matter — reliability, efficiency, and execution. It's the language boards use to measure operational success.

Outcome Focus: The name emphasizes what the platform delivers: improved on-time performance, reduced disruptions, faster change cycles, and audit-ready proof. These are measurable, reportable outcomes.

Cross-Industry Applicability: The name applies cleanly across aviation, rail, defense, maritime, and other regulated operations. It's not niche — it's horizontal and outcome-focused.

Differentiation: The name avoids module traps — we're not a manuals tool, a safety tool, or an LMS. And it avoids ops-control confusion — we're not a dashboard or monitoring platform.

Analyst Legibility: AI is an accelerator inside the platform, not the category itself. This positions us safely with analysts and regulators who are wary of AI-first categories.

We considered adding 'Readiness' but determined that 'Performance' already encompasses what matters: the operational outcomes that prove teams are ready, capable, and executing. 'Operational Performance Platform' is the clearest executive frame that captures what makes Comply three six five different: connecting Safety, Content, and Training into a governed operating system that turns signals into outcomes and proof."
```

---

### 2. Slide Components

**File: `src/components/slides/Slide0Title.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 82-88 | "Operational Performance" + "& Readiness Category" | "Operational Performance" + "Platform" |
| 94 | "operational performance" | Keep as is |

**File: `src/components/slides/Slide1StrategicShift.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 77-79 | "Operational Performance" + "& Readiness Platform" | "Operational Performance" + "Platform" |
| 107-108 | "Operational Performance & Readiness Platform" | "Operational Performance Platform" |

**File: `src/components/slides/Slide2BeforeAfter.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 166 | "Operational Performance & Readiness Platform" | "Operational Performance Platform" |

**File: `src/components/slides/Slide3OperatingModel.tsx`**

No category name changes needed - focuses on "Operational Intelligence Layer"

**File: `src/components/slides/SlidePlatformCapabilities.tsx`**

No category name changes needed - focuses on capabilities

**File: `src/components/slides/Slide4Transformation.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 233 | "Operational performance as competitive advantage" | Keep as is (lowercase "performance" is fine) |

**File: `src/components/slides/Slide4ValuePyramid.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 292 | "Operational Readiness Ladder" title | "Operational Performance Ladder" |
| 293 | subtitle reference | Update to remove "readiness" |

**File: `src/components/slides/Slide5MaturityCurve.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 270 | "The Operational Performance Roadmap" | Keep as is |
| 271 | subtitle | Keep as is |

**File: `src/components/slides/Slide6Investors.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 59 | "Operational Performance & Readiness Platform" | "Operational Performance Platform" |

**File: `src/components/slides/Slide7Customers.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 66-67 | subtitle with "readiness" | Update to focus on "performance" |
| 28-39 | "Readiness & Execution" category | Rename to "Execution & Speed" |

**File: `src/components/slides/Slide9CategoryRationale.tsx`**

This slide requires significant content updates since "Operational Performance Platform" is now the recommended name:

| Section | Current | Updated |
|---------|---------|---------|
| Hero banner (line 89) | "Operational Performance & Readiness Platform" | "Operational Performance Platform" |
| Subtitle (line 73) | "measurable outcomes and defines the category" | Update for "Performance" focus |
| Criteria checks | References to "Readiness" | Remove or reframe criteria |
| Alternatives array | Update to include "& Readiness" as alternative | Add as considered option |
| Closing statement | References to both | Focus on "Performance" |

**Updated criteriaChecks array:**
```javascript
const criteriaChecks = [
  {
    label: "COO Clarity",
    description: "'Operational Performance' focuses on measurable outcomes COOs report to boards",
    icon: Target,
  },
  {
    label: "Outcome Focus",
    description: "Emphasizes what matters: reliability, efficiency, execution — not abstract concepts",
    icon: TrendingUp,
  },
  {
    label: "Cross-Industry",
    description: "Applies cleanly across aviation, rail, defense, maritime, and other regulated operations",
    icon: Building2,
  },
  {
    label: "Differentiation",
    description: "Avoids module traps (manuals/safety/LMS) and ops-control/dashboard confusion",
    icon: Sparkles,
  },
  {
    label: "Analyst Legibility",
    description: "Leaves room for AI as accelerator, not the category - safer for analysts and regulators",
    icon: BarChart3,
  },
];
```

**Updated alternatives array:**
```javascript
const alternatives = [
  {
    name: "Operational Performance & Readiness Platform",
    verdict: "Previous consideration",
    risk: "'Readiness' adds scope complexity; 'Performance' already encompasses outcomes",
  },
  {
    name: "Operational Excellence Platform",
    verdict: "Philosophy language",
    risk: "Less measurable; sounds like consulting methodology",
  },
  {
    name: "Operational Intelligence Platform",
    verdict: "AI-forward option",
    risk: "May trigger AI skepticism with regulators; category not yet established",
  },
  {
    name: "Operational Assurance Platform",
    verdict: "Supporting pillar",
    risk: "Pulls perception back to compliance checking; backward-looking",
  },
  {
    name: "Continuous Improvement Operating System",
    verdict: "Operating model name",
    risk: "Sounds like methodology or consulting, not a product category",
  },
];
```

**File: `src/components/slides/SlideMessagingHouse.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 22 | `name: "Operational Performance & Readiness Platform"` | `name: "Operational Performance Platform"` |
| 187 | subtitle reference | Update to remove "Readiness" |
| 367-368 | "operational performance and readiness" | "operational performance" |

---

### 3. Page Components

**File: `src/pages/SlideDeck.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 29 | "Operational Readiness Ladder" label | "Operational Performance Ladder" |
| 30 | "Operational Performance Roadmap" | Keep as is |

**File: `src/pages/MaturityCurve.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 14 | "Operational Performance &" | "Operational Performance" |
| 15 | "The Operational Performance Roadmap" | Keep as is |
| 30 | "Operational Performance & Readiness Platform" | "Operational Performance Platform" |

**File: `src/components/CategoryPyramid.tsx`**

| Line | Current | Updated |
|------|---------|---------|
| 264 | "Operational Performance &" | "Operational Performance" |
| 265 | "Readiness Platform" | "Platform" |
| 371 | "Operational Performance & Readiness Platform" | "Operational Performance Platform" |

---

## Visual/Copy Changes Summary

### Key Messaging Changes

| Element | Current | Updated |
|---------|---------|---------|
| Category Name | "Operational Performance & Readiness Platform" | "Operational Performance Platform" |
| Ladder Title | "Operational Readiness Ladder" | "Operational Performance Ladder" |
| Category Promise | "Make operational performance and readiness predictable, measurable, and scalable" | "Make operational performance predictable, measurable, and provable" |
| Differentiation | "Point solutions manage silos. Comply365 closes the loop." | Keep as is |

### Slides with Visual Updates

1. **Slide 0 (Title)**: Update headline from "& Readiness Category" to "Platform"
2. **Slide 1 (Strategic Shift)**: Update category box text
3. **Slide 2 (Before & After)**: Update "After" panel label
4. **Slide 6 (Value Pyramid)**: Rename "Operational Readiness Ladder" to "Operational Performance Ladder"
5. **Slide 9 (Customers)**: Rename "Readiness & Execution" to "Execution & Speed"
6. **Slide 11 (Category Rationale)**: Complete content rewrite for "Performance" rationale
7. **Slide 12 (Messaging House)**: Update roof, definition, and category promise

---

## Implementation Order

1. **Narration scripts** (`src/data/slideNarration.ts`) - Source of truth for all messaging
2. **Category Rationale slide** (`Slide9CategoryRationale.tsx`) - Strategic explanation of name choice
3. **Title slide** (`Slide0Title.tsx`) - First impression
4. **Strategic Shift slide** (`Slide1StrategicShift.tsx`) - Category definition
5. **Messaging House slide** (`SlideMessagingHouse.tsx`) - Complete positioning architecture
6. **Value Pyramid slide** (`Slide4ValuePyramid.tsx`) - Rename ladder
7. **Customers slide** (`Slide7Customers.tsx`) - Update category reference
8. **Remaining slide components** (Slide2, Slide6Investors)
9. **Page components** (SlideDeck, MaturityCurve, CategoryPyramid)
10. **Verification search** to confirm all instances updated

---

## Verification

After implementation, run these searches to verify completeness:

| Search Term | Expected Matches |
|-------------|------------------|
| `"& Readiness"` | 0 matches (except in alternatives list on Slide 11) |
| `"Readiness Platform"` | 0 matches |
| `"Operational Performance Platform"` | ~15+ matches |
| `"Readiness Ladder"` | 0 matches |
| `"Performance Ladder"` | ~3 matches |

---

## Technical Notes

- No dependency changes required
- No API changes required
- No database changes required
- Build will succeed after all file updates
- Changes are purely text/content updates
- The 4 category comparison slides (13-16) are NOT affected as they showcase different category options
