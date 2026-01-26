

# Plan: Update AI Vision Slide Title & Subtitle

## Overview

Update the AI Vision slide (Slide 10) with the new title and subtitle to better communicate the credibility of current AI capabilities while showcasing the future roadmap.

---

## Changes

### Current vs New

| Element | Current | New |
|---------|---------|-----|
| **Title** | "The AI-Powered Future" | "Becoming an AI Company" |
| **Subtitle** | "From Operational Intelligence Layer to AI Company — the journey ahead" | "The intelligence layer that's already built — and the roadmap to what's next" |

---

## Files to Update

| File | Change |
|------|--------|
| `src/components/slides/SlideAIVision.tsx` | Update `title` and `subtitle` props in SlideContainer |
| `src/components/slides/Slide0Title.tsx` | Update agenda item title for slide 10 |
| `src/data/slideNarration.ts` | Update `title` field for slideId 10 |

---

## Implementation Details

### 1. SlideAIVision.tsx (Line ~101-102)

Update the SlideContainer props:

```tsx
<SlideContainer
  id="slide-10"
  title="Becoming an AI Company"
  subtitle="The intelligence layer that's already built — and the roadmap to what's next"
  ...
/>
```

### 2. Slide0Title.tsx

Update the agenda item at index 10:

```tsx
{ id: 10, title: "Becoming an AI Company", slideId: "slide-10" }
```

### 3. slideNarration.ts

Update the title for slideId 10:

```tsx
{
  slideId: 10,
  title: "Becoming an AI Company",
  ...
}
```

---

## Summary

| Metric | Count |
|--------|-------|
| Files modified | 3 |
| Lines changed | ~4 |

This update positions the slide with a more grounded, credibility-first message that acknowledges the existing AI foundation while signaling the transformation journey ahead.

