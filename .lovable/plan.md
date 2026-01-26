

# Plan: Fix Narration for Category Comparison Slides (13-15)

## Problem Summary

The play button on slides 13, 14, and 15 throws errors because no narration scripts exist for these slides. The console logs show:
- "No narration found for slide 13"
- "No narration found for slide 14"  
- "No narration found for slide 15"

## Root Cause

The `slideNarrations` array in `src/data/slideNarration.ts` only contains entries for slides 0-12. The three category comparison slides have no narration scripts defined.

---

## Files to Update

| File | Change |
|------|--------|
| `src/data/slideNarration.ts` | Add narration scripts for slides 13, 14, 15 |
| `src/hooks/useSimpleNarration.ts` | Update preload limit from 12 to 15 |
| `src/components/slides/category-options/SlideCategoryAssurance.tsx` | Fix slide ID from 16 to 15 |

---

## Narration Scripts to Add

### Slide 13: Category Option - Excellence

```text
"This slide presents an alternative category positioning: the 'Operational Excellence Platform'.

The core framing centers on philosophy and culture. The narrative spine is: Aspire, Embed, Sustain, Excel.

The point of view: Excellence is no longer optional — it's the foundation of competitive advantage. Point solutions focus on tasks, not culture. The opportunity is a platform that makes excellence systematic, measurable, and embedded into every workflow.

Pros of this positioning: Executive resonance — 'Excellence' is CEO and Board-level language. It supports cultural transformation narratives. It differentiates from tactical tool vendors. And it aligns with Lean and Six Sigma methodologies.

Cons: 'Excellence' is subjective and hard to measure directly. It competes with consulting firms for mindshare. It may feel aspirational rather than actionable. And it lacks specificity.

Executive rationale: Use 'Operational Excellence Platform' when the conversation is about culture change, strategic transformation, or board-level strategy. This frame works best when buyers are thinking long-term competitive advantage, not immediate operational fixes.

The category promise: Make operational excellence systematic, sustainable, and provable."
```

### Slide 14: Category Option - Orchestration

```text
"This slide presents an alternative category positioning: the 'Operational Orchestration Platform'.

The core framing centers on coordination and workflow automation. The narrative spine is: Connect, Coordinate, Execute, Verify.

The point of view: Operations are increasingly complex. Success depends on coordination, not just individual tool performance. Siloed systems create handoff gaps, delays, and errors. The opportunity is a platform that owns the coordination layer.

Pros of this positioning: Clear technical differentiation — 'Orchestration' is a defined market. It appeals to IT leaders and process owners. It's action-oriented and emphasizes execution. And it positions the platform as the coordination layer.

Cons: Technical language that may not resonate with the C-suite. Risk of being categorized as middleware. 'Orchestration' implies complexity that may intimidate smaller teams. And it's purely functional positioning — less emotional.

Executive rationale: Use 'Operational Orchestration Platform' when buyers are focused on process efficiency, system integration, and workflow coordination. This frame works best with IT leaders and organizations struggling with tool sprawl.

The category promise: Orchestrate every operational workflow from signal to proof."
```

### Slide 15: Category Option - Assurance

```text
"This slide presents an alternative category positioning: the 'Operational Assurance Platform'.

The core framing centers on compliance, governance, and proof. The narrative spine is: Govern, Control, Verify, Assure.

The point of view: Regulatory scrutiny is intensifying. Organizations need continuous assurance, not point-in-time audits. Current compliance tools are reactive and siloed. The opportunity is a platform that provides continuous assurance and audit-readiness by default.

Pros of this positioning: Strong regulatory and compliance resonance. It appeals to risk, legal, and compliance buyers. 'Assurance' implies trust and confidence. And it clearly differentiates in regulated industries.

Cons: Backward-looking perception — focuses on proof, not improvement. It may pigeonhole the platform as a 'compliance tool'. Less appealing to forward-looking COOs focused on growth. And 'Assurance' sounds like audit, not operations.

Executive rationale: Use 'Operational Assurance Platform' when the buyer's primary concern is regulatory compliance, audit preparation, or risk management. This frame works best with compliance officers, legal teams, and organizations facing regulatory pressure.

The category promise: Deliver continuous assurance and audit-ready proof by default."
```

---

## Code Changes

### 1. `src/data/slideNarration.ts`

Add three new entries to the `slideNarrations` array after slide 12:

```typescript
{
  slideId: 13,
  title: "Category: Excellence",
  voiceId: DEFAULT_VOICE_ID,
  script: "..." // Excellence narration script
},
{
  slideId: 14,
  title: "Category: Orchestration", 
  voiceId: DEFAULT_VOICE_ID,
  script: "..." // Orchestration narration script
},
{
  slideId: 15,
  title: "Category: Assurance",
  voiceId: DEFAULT_VOICE_ID,
  script: "..." // Assurance narration script
},
```

### 2. `src/hooks/useSimpleNarration.ts`

Update the preload function limit:

```diff
- if (nextSlideId <= 12 && !cacheRef.current.has(nextSlideId)) {
+ if (nextSlideId <= 15 && !cacheRef.current.has(nextSlideId)) {
```

### 3. `src/components/slides/category-options/SlideCategoryAssurance.tsx`

Update the slide ID and number to match the new position:

```diff
- id="slide-16"
+ id="slide-15"

- slideNumber={16}
+ slideNumber={15}
```

---

## Summary

| Metric | Count |
|--------|-------|
| Files modified | 3 |
| Narration scripts added | 3 |
| Line changes | ~30 |

After these changes, clicking the play button on slides 13, 14, and 15 will properly trigger narration that explains each alternative category option, including its pros, cons, and when to use it.

