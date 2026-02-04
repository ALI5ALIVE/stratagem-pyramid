

# Plan: 10-Slide Sales Pitch Deck on Separate Route

## Executive Summary

Create a high-impact, 7-minute B2B sales pitch deck on a new `/sales-deck` route that distills the Comply365 Operational Performance Platform story into 10 slides following world-class sales storytelling principles.

---

## B2B Sales Deck Best Practices Applied

| Principle | Application |
|-----------|-------------|
| **Start with the customer's world** | Open with the pain they feel, not your solution |
| **Create tension before resolution** | Slides 1-3 build the problem before offering the answer |
| **One idea per slide** | Each slide has a single takeaway |
| **Show transformation, not features** | Before/After and value outcomes, not product specs |
| **Prove it with evidence** | Customer outcomes, use cases, metrics |
| **End with clear action** | Single CTA, not menu of options |

---

## 10-Slide Story Arc (7 minutes)

| Slide | Title | Purpose | Time |
|-------|-------|---------|------|
| **0** | Title | Hook with category promise | 15s |
| **1** | The Problem | Name the pain they feel | 45s |
| **2** | Why Now | Market forces making this urgent | 45s |
| **3** | Before & After | Visualize the transformation | 45s |
| **4** | The Solution | Introduce DTOP operating model | 60s |
| **5** | Proof: Use Case | One concrete example with metrics | 60s |
| **6** | The Journey | 5-stage maturity roadmap | 45s |
| **7** | Customer Outcomes | 4 value pillars with proof | 45s |
| **8** | Why Us | Defensible differentiation | 30s |
| **9** | Next Steps | Single clear CTA | 30s |

**Total: ~7 minutes**

---

## Slide Content Design

### Slide 0: Title
- **Headline**: "The Operational Performance Platform"
- **Subhead**: "Connected. Intelligent. Predictive."
- **Visual**: Comply365 logo + tagline
- **Narration hook**: "Today, we're not presenting a product. We're defining a category."

### Slide 1: The Problem
- **Headline**: "Point Tools Can't Close the Loop"
- **Visual**: Three disconnected silos (Safety, Content, Training) with broken connections
- **5 pain points**: Scattered signals, no triggers, manual coordination, procedural drift, audit scrambles
- **Emotional hook**: "Sound familiar?"

### Slide 2: Why Now
- **Headline**: "The Cost of Fragmentation"
- **Visual**: Metrics showing the cost
  - 12K safety signals scattered monthly
  - 8K orphaned content items
  - 3-week average investigation time
  - Months of audit prep
- **Key insight**: "Regulators expect connection. Operations demand speed. Point tools can't deliver either."

### Slide 3: Before & After
- **Headline**: "From Fragmentation to Connected Operations"
- **Visual**: Side-by-side comparison
- **Left (Before)**: Scattered data silos, manual, reactive
- **Right (After)**: Connected platform, automated, proactive
- **Bottom metrics**: OTP +3.2% | 94% Ready | Audit: Months → 2hr

### Slide 4: The Solution
- **Headline**: "Detect → Trigger → Orchestrate → Prove"
- **Visual**: Platform ecosystem diagram with DTOP flow
- **Four-step pipeline**: Each stage with icon, label, and one-line description
- **Key message**: "Signals become outcomes. By default."

### Slide 5: Proof - Use Case
- **Headline**: "From Signal to Outcome"
- **Feature one case**: Hard Landing Detection (most relatable)
  - **Detect**: FOQA flags hard landing trend
  - **Trigger**: Platform identifies 47 affected pilots
  - **Orchestrate**: Targeted simulator training deployed
  - **Prove**: 78% reduction in repeat events
- **Bottom callout**: "This is what closing the loop looks like."

### Slide 6: The Journey
- **Headline**: "Your Operational Performance Roadmap"
- **Visual**: Simplified 5-stage maturity curve
- **Stages**: Fragmented → Managed → Connected → Intelligent → Predictive
- **Key message**: "18-24 months vs. 5-7 years"

### Slide 7: Customer Outcomes
- **Headline**: "Measurable Value Across Four Pillars"
- **4 boxes**:
  1. Schedule Protection: Fewer disruptions, protected departures
  2. Revenue Protection: Protected revenue through reliability
  3. Cost Savings: Reduced rework, fewer claims
  4. Customer Loyalty: Trust through consistent operations
- **Signal → Action → Result** story format in each

### Slide 8: Why Comply365
- **Headline**: "Point Solutions Manage Silos. We Close the Loop."
- **3 differentiators**:
  1. Connected Foundation: One version of truth
  2. Embedded Intelligence: AI that's trusted, not bolted on
  3. Proof by Default: Audit-ready evidence, always
- **Category promise**: "Make operational performance predictable, measurable, and provable."

### Slide 9: Next Steps
- **Headline**: "Let's Build Your Roadmap"
- **Single CTA**: "Schedule Discovery Session"
- **Supporting options** (smaller): ROI Assessment | Maturity Assessment
- **Closing hook**: "Detect → Trigger → Orchestrate → Prove. Your journey starts now."

---

## Technical Implementation

### File 1: `src/pages/SalesDeck.tsx`
Create new page component that:
- Uses the existing slide infrastructure (SlideContainer, navigation, progress bar)
- Imports or creates 10 focused sales slides
- Implements keyboard navigation and dot navigation
- Supports narration hooks for each slide

### File 2: `src/components/sales-slides/` directory
Create 10 new slide components (can reuse elements from existing slides):
- `SalesSlide0Title.tsx`
- `SalesSlide1Problem.tsx`
- `SalesSlide2WhyNow.tsx`
- `SalesSlide3BeforeAfter.tsx`
- `SalesSlide4Solution.tsx`
- `SalesSlide5UseCase.tsx`
- `SalesSlide6Journey.tsx`
- `SalesSlide7Outcomes.tsx`
- `SalesSlide8WhyUs.tsx`
- `SalesSlide9NextSteps.tsx`

### File 3: `src/data/salesDeckNarration.ts`
Create narration scripts optimized for 7-minute total runtime:
- Each slide gets ~30-60 seconds of narration
- Scripts are tighter and more direct than the full deck
- Same voice (George) for consistency

### File 4: `src/App.tsx`
Add route: `/sales-deck` → `<SalesDeck />`

---

## Visual Design Principles

1. **Aggressive simplicity**: Fewer words per slide than the full deck
2. **Strong visual hierarchy**: One hero visual per slide, not multiple diagrams
3. **Consistent color language**:
   - Red/destructive: Problem state
   - Primary: Solution/Comply365
   - Emerald: Success/outcomes
4. **Animations**: Subtle entrance animations, no complex timelines
5. **Mobile responsive**: Works on tablet for in-person presentations

---

## Narration Script Summary (7 minutes)

| Slide | Duration | Word Count |
|-------|----------|------------|
| 0: Title | 15s | ~40 words |
| 1: Problem | 45s | ~90 words |
| 2: Why Now | 45s | ~90 words |
| 3: Before/After | 45s | ~90 words |
| 4: Solution | 60s | ~120 words |
| 5: Use Case | 60s | ~120 words |
| 6: Journey | 45s | ~90 words |
| 7: Outcomes | 45s | ~90 words |
| 8: Why Us | 30s | ~60 words |
| 9: Next Steps | 30s | ~60 words |
| **Total** | **7 min** | **~850 words** |

---

## Files to Create

| File | Description |
|------|-------------|
| `src/pages/SalesDeck.tsx` | Main page component with navigation |
| `src/components/sales-slides/SalesSlideContainer.tsx` | Wrapper for sales slides (simpler than full deck) |
| `src/components/sales-slides/SalesSlide0Title.tsx` | Title slide |
| `src/components/sales-slides/SalesSlide1Problem.tsx` | Problem slide |
| `src/components/sales-slides/SalesSlide2WhyNow.tsx` | Why Now slide |
| `src/components/sales-slides/SalesSlide3BeforeAfter.tsx` | Before/After transformation |
| `src/components/sales-slides/SalesSlide4Solution.tsx` | DTOP operating model |
| `src/components/sales-slides/SalesSlide5UseCase.tsx` | Proof through use case |
| `src/components/sales-slides/SalesSlide6Journey.tsx` | Maturity roadmap |
| `src/components/sales-slides/SalesSlide7Outcomes.tsx` | Customer value pillars |
| `src/components/sales-slides/SalesSlide8WhyUs.tsx` | Differentiation |
| `src/components/sales-slides/SalesSlide9NextSteps.tsx` | CTA slide |
| `src/data/salesDeckNarration.ts` | Narration scripts |
| `src/hooks/useSalesDeckNarration.ts` | Narration hook (can reuse existing) |
| `src/App.tsx` | Add `/sales-deck` route |

---

## Key Differences from Full Deck

| Aspect | Full Deck (15 slides) | Sales Deck (10 slides) |
|--------|----------------------|------------------------|
| Audience | Internal strategy team | Customer/prospect |
| Purpose | Complete positioning framework | Drive to discovery call |
| Tone | Comprehensive, educational | Urgent, outcome-focused |
| Detail level | High (all pillars, all campaigns) | Essential proof points only |
| CTA | Multiple options | Single action |
| Messaging slides | Yes (House, Campaigns, Context) | No — those are internal |
| Investor content | Yes | No |

---

## Expected Outcome

A dedicated `/sales-deck` route with:
- 10 focused slides optimized for customer-facing presentations
- 7-minute narration with voice-over support
- Strong problem-solution narrative arc
- Single clear CTA driving to discovery
- Mobile/tablet responsive for in-person use
- Same visual quality and brand consistency as full deck

