

# Plan: Fix Slide 16 Pronunciation & Recommend Optimal Placement

## Problem Summary

The slide 16 narration script has pronunciation issues with:
1. **".AI" domain suffix** - TTS may pronounce "AI" as a word instead of spelling it "A I"
2. **Lowercase "comply"** - Some instances don't match the capitalized "Comply" pattern used elsewhere
3. **Domain pronunciation** - "dot AI" should be "dot A I" for proper letter-by-letter pronunciation

## Current vs Fixed Script Comparison

| Current Text | Fixed Text |
|--------------|------------|
| `comply three six five dot AI` | `Comply three six five dot A I` |
| `comply dot AI` | `Comply dot A I` |
| `comply three six five dot com` | `Comply three six five dot com` |

---

## Script Fix Details

### File: `src/data/slideNarration.ts` (lines 109-113)

**Changes to make:**

1. Replace `comply three six five dot AI` with `Comply three six five dot A I`
2. Replace `comply dot AI` with `Comply dot A I`  
3. Replace `comply three six five dot com` with `Comply three six five dot com` (already correct)
4. Ensure consistent capitalization of "Comply" throughout

**Updated script:**

```text
"Let's talk about the future — and how Comply three six five becomes an A I company.

The foundation is already in place. The Operational Intelligence Layer — Detect, Trigger, Orchestrate, Prove — isn't just a workflow model. It's an A I model. Every stage is powered by embedded intelligence that learns from operational data, detects patterns, and recommends actions.

Today, we're at Stage Three and Four capability. A I detects weak signals from FOQA, ASAP, and crew reports. It recommends prioritised interventions. It assists with change execution and ensures governance-aware automation.

Near-term — Stage Four to Five — we move to predictive operations. A I identifies risks before they become incidents. Proactive interventions replace reactive firefighting. Forecasting models compress decision cycles.

The future is Stage Five and beyond: Agentic Reliability. A I handles routine orchestration autonomously. Humans govern exceptions. Continuous proof is generated automatically. Reliability becomes embedded — not enforced.

This positions Comply three six five as more than a platform company. It positions us as an A I company.

Should the brand reflect this? Consider: Comply three six five dot A I. A clear signal that intelligence is core to what we do. Or Comply dot A I — shorter, premium, unmistakably A I first. Or keep Comply three six five dot com and layer the A I story through the Operational Intelligence positioning.

The domain is a choice. But the direction is clear. The Operational Intelligence Layer is our A I story. And this journey — from embedded intelligence to agentic reliability — is how we take customers up the Performance Ladder and position Comply three six five as a leader in A I powered operational performance."
```

---

## Slide Placement Recommendation

### Current Position: Slide 16 (end of deck, after category alternatives)

### Recommended Position: Slide 10 (after Customers, before Investors)

**Rationale:**

| Position | Reasoning |
|----------|-----------|
| **After Customers (Slide 9)** | Customer value has been proven; now show future trajectory |
| **Before Investors (Slide 10 → 11)** | A I vision directly supports investor narrative about growth and defensibility |
| **Before Category Name (Slide 11 → 12)** | A I positioning informs why "Performance Platform" is the right category |

**Recommended New Slide Order:**

```text
 0. Title
 1. Strategic Shift
 2. Before & After
 3. Operating Model
 4. Platform Capabilities
 5. Transformation
 6. Operational Performance Ladder
 7. Operational Performance Roadmap
 8. Positioning
 9. Customers
10. AI Vision & Future  ← MOVED HERE
11. Investors (was 10)
12. Category Name (was 11)
13. Messaging House (was 12)
14. Category: Excellence (was 13)
15. Category: Orchestration (was 14)
16. Category: Assurance (was 15)
```

**Narrative Arc with New Position:**

1. **Slides 0-9**: Problem → Solution → Proof of customer value
2. **Slide 10 (A I Vision)**: Future trajectory — "where we're going"
3. **Slides 11-13**: Investor value → Category rationale → Complete messaging framework
4. **Slides 14-16**: Alternative category options for discussion

This placement makes the A I Vision slide a pivot point between "what we've delivered" and "why investors should believe in our future" — strengthening the investment narrative.

---

## Files to Update

| File | Change |
|------|--------|
| `src/data/slideNarration.ts` | Fix pronunciation in slide 16 script (replace "AI" with "A I") |

### Optional: Slide Reordering (if you want to move the slide)

If you approve moving the slide to position 10:

| File | Change |
|------|--------|
| `src/data/slideNarration.ts` | Update `slideId` values for slides 10-16 |
| `src/pages/SlideDeck.tsx` | Reorder components in slides array and render block |
| `src/components/slides/Slide0Title.tsx` | Reorder agendaItems to match new sequence |
| All affected slide components | Update `id` and `slideNumber` props |

---

## Summary

| Metric | Count |
|--------|-------|
| Pronunciation fixes | ~12 instances of "AI" → "A I" |
| Files modified (pronunciation only) | 1 |
| Files modified (if reordering) | 4+ |

**Recommendation:** Start with the pronunciation fix. The slide reordering is optional and can be done as a follow-up if you agree with the placement recommendation.

