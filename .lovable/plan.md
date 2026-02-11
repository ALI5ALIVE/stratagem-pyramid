

# Add Line of Sight to Sales Deck

## Placement

The Line of Sight ROI calculator slots in after "Outcomes" (slide 7) and before "Why Us" (currently slide 8). This is the natural narrative moment: after showing what predictable performance delivers, let the prospect model their own numbers.

New deck order (11 slides):
0. Title
1. Problem
2. Why Now
3. Before/After
4. Solution
5. Use Case
6. Journey
7. Outcomes
8. **Line of Sight (NEW)**
9. Why Us (was 8)
10. Next Steps (was 9)

## Approach

The existing `SlideLineOfSight` component is a full-page scrollable calculator — it won't fit inside a snap-scroll slide. Instead of forcing that component into a slide container, we create a **new sales-specific slide** (`SalesSlide8LineOfSight.tsx`) that presents a condensed, viewport-friendly version of the Line of Sight concept, with a link to the full interactive calculator.

The sales slide will show:
- The three-tier cascade (Use Cases -> Leading Measures -> Executive Outcomes) as a compact visual
- Pre-computed headline numbers from default airline profile (not interactive sliders — too complex for a presentation slide)
- A total cost avoidance headline figure
- A CTA button linking to `/line-of-sight` for the full interactive experience

## Technical Changes

### 1. New file: `src/components/sales-slides/SalesSlide8LineOfSight.tsx`

A new slide component that:
- Uses `SalesSlideContainer` with id `sales-slide-8`
- Imports use case data and computation functions from `lineOfSightData.ts`
- Computes default values using `defaultProfile` (no interactive state needed)
- Displays a three-column layout: Use Cases (left) -> Leading Measures (center) -> Executive Outcomes (right)
- Shows the total cost avoidance as a prominent headline
- Includes a "Try the Interactive Calculator" button linking to `/line-of-sight`
- Accepts standard `SlideNarrationProps` for audio narration

### 2. Modified file: `src/pages/SalesDeck.tsx`

- Import the new `SalesSlide8LineOfSight` component
- Insert it into the `slides` array at position 8 with id `sales-slide-8` and label `"Line of Sight"`
- Renumber the existing slide 8 (Why Us) to `sales-slide-9` and slide 9 (Next Steps) to `sales-slide-10`

### 3. Modified files: `src/components/sales-slides/SalesSlide8WhyUs.tsx` and `SalesSlide9NextSteps.tsx`

- Update the `id` prop passed to `SalesSlideContainer` from `sales-slide-8` to `sales-slide-9`, and `sales-slide-9` to `sales-slide-10`, to match the new positions

### 4. Modified file: `src/data/salesDeckNarration.ts`

- Add narration for `sales-slide-8` (Line of Sight): "Every use case we've discussed has a measurable cost impact. Go-arounds, unscheduled maintenance, delays, fuel degradation, injuries, regulatory findings, insurance premiums, baggage mishandling — each one maps to leading operational measures and ultimately to executive outcomes your CFO, CEO, and COO care about. This is our Line of Sight model. For a mid-size carrier, the total cost avoidance opportunity exceeds forty million dollars annually. And this isn't a generic estimate — we can build a custom model using your airline's fleet size, fuel spend, and operational data. Let's make these numbers yours."
- Update the `slideId` for Why Us from `sales-slide-8` to `sales-slide-9`
- Update the `slideId` for Next Steps from `sales-slide-9` to `sales-slide-10`

## Visual Layout for the New Slide

The slide will use a compact three-column cascade:

**Left column — Use Cases (Tier 3)**: 8 compact rows showing each use case name with its cost range badge

**Center column — Leading Measures (Tier 2)**: 6 operational measures with computed improvement percentages

**Right column — Executive Outcomes (Tier 1)**: 3 stakeholder blocks (CEO, CFO, COO) with their key metrics

**Bottom banner**: Total cost avoidance headline + "Explore Interactive Calculator" button

All values are pre-computed from `defaultProfile` so the slide is static and presentation-ready — no sliders or interactive elements that would break the snap-scroll flow.
