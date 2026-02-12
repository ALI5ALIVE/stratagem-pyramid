

# Sales Deck Narration Overhaul

## Issues Found

### 1. Broken Navigation and Narration (from slide reorder)
When Line of Sight was moved to position 6, three components still render hardcoded DOM IDs that no longer match the slides array. This breaks both scroll-to navigation and narration playback.

| Slides Array ID | Component | Hardcoded DOM ID | Narration Text |
|----------------|-----------|-----------------|----------------|
| sales-slide-6 | SalesSlide8LineOfSight | sales-slide-8 | Maturity journey (wrong!) |
| sales-slide-7 | SalesSlide6Journey | sales-slide-6 | Outcomes text (wrong!) |
| sales-slide-8 | SalesSlide7Outcomes | sales-slide-7 | Line of sight text (wrong!) |

### 2. Narration reads verbatim instead of selling

The current narration describes what's on screen ("Our platform follows a simple but powerful operating model..."). It needs to sell the pain an airline stakeholder feels, the value the platform delivers, and the ways of working that make it real.

---

## Changes

### A. Fix hardcoded DOM IDs (3 files)

**`src/components/sales-slides/SalesSlide8LineOfSight.tsx`** (line 44)
- Change `id="sales-slide-8"` to `id="sales-slide-6"`

**`src/components/sales-slides/SalesSlide6Journey.tsx`** (line 89)
- Change `id="sales-slide-6"` to `id="sales-slide-7"`

**`src/components/sales-slides/SalesSlide7Outcomes.tsx`** (line 74)
- Change `id="sales-slide-7"` to `id="sales-slide-8"`

### B. Rewrite narration scripts (1 file)

**`src/data/salesDeckNarration.ts`** -- complete rewrite of all 11 slide narration texts.

The new narration follows these principles:
- Never describe what's on screen -- the visual does that
- Lead with the stakeholder's pain or aspiration
- Use concrete airline scenarios (hard landings, fatigue, FOQA, crew scheduling)
- Keep the conversational tone optimised for TTS "George" voice
- Target ~850 words total for a 7-minute delivery at natural pace
- Use "Comply three six five" and "Foqua" for correct TTS pronunciation

### New slide order with narration summaries

| # | Slide | Narration Approach |
|---|-------|-------------------|
| 0 | Title | Open with the stakeholder's daily frustration -- the gap between knowing a risk exists and being able to act on it. Hook with the promise of closing that gap. |
| 1 | Problem | Paint a vivid Monday morning: FOQA flags something, but by the time training hears about it, it's already happened again. Make the audience feel the frustration of disconnected teams. |
| 2 | Why Now | Shift from frustration to urgency -- regulators are no longer accepting paperwork, they want connected evidence. Every week without a connected system widens the exposure. |
| 3 | Before/After | Don't list bullet points. Tell the story of a single signal flowing through the old way (weeks, emails, spreadsheets) vs. the new way (hours, automated, proven). |
| 4 | Solution (DTOP) | Explain DTOP as a way of working, not a product feature. Each step is what the airline's own teams do differently -- Detect isn't software, it's awareness; Prove isn't a report, it's confidence. |
| 5 | Use Case | Walk through the hard landing scenario as if telling a real customer story. Make it tangible -- "forty-seven pilots, within forty-eight hours, seventy-eight percent reduction." |
| 6 | Line of Sight | Connect the use cases to money. Every go-around, every delay, every regulatory finding has a cost. Show that this isn't theoretical -- it maps directly to what their CFO, CEO, and COO measure. |
| 7 | Journey | Position the maturity curve as a mirror -- "where are you today?" Most are at Stage 1 or 2. The inflection point is Stage 3, and that's where the platform takes them. Compress the traditional 5-7 year timeline to 18-24 months. |
| 8 | Outcomes | Translate platform capabilities into executive language -- schedule protection, revenue protection, cost reduction. Use the Signal-Action-Result pattern. |
| 9 | Why Us | Three sharp differentiators: connected (not siloed), intelligent (not bolted on), provable (not after-the-fact). Close with "point solutions manage silos, we close the loop." |
| 10 | Next Steps | Personal and forward-looking. Their operation has unique signals. Offer to build a custom ROI model. End with the DTOP framework and "your journey starts now." |

### Word count target
- ~75-85 words per slide average
- Shorter for Title (slide 0) and Next Steps (slide 10)
- Longer for Use Case (slide 5) and Line of Sight (slide 6) where the detail sells
- Total: ~850 words for 7-minute delivery

