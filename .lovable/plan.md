

# Technical Deep-Dive Deck — `/pitch-technical` (18 Slides)

This is the "long" version per the brief — an extended version of the operational pitch with comprehensive use case coverage, CoAnalyst deep-dive, and a 2026 roadmap. All 8 use cases from `lineOfSightData.ts` get dedicated slides.

## Route & Navigation
- **Route:** `/pitch-technical` in `App.tsx`
- **Sidebar entry:** Add "Technical Deep-Dive" with `BookOpen` icon in `AppSidebar.tsx`
- **Page:** `src/pages/TechnicalDeepDive.tsx` (same scroll-snap pattern as ExecutivePitch/OperationalPitch)

## 18 Slide Components — `src/components/tech-slides/`

| # | File | Title | Content |
|---|------|-------|---------|
| 0 | `TechSlide0Title.tsx` | "The Complete Platform Story" | Same hero pattern as ExecSlide0Title + interactive TOC grid (clickable 18-slide overview) |
| 1 | `TechSlide1StrategicShift.tsx` | "The Strategic Shift" | Point tools → OPP. Reuse narrative from Slide1StrategicShift/ExecSlide2Shift but with more category context |
| 2 | `TechSlide2IndustryChallenge.tsx` | "The Industry Challenge" | Combined "Day in the Life" + cost waterfall (merge OpsSlide1 + ExecSlide1 patterns). All 8 use case costs previewed |
| 3 | `TechSlide3BeforeAfter.tsx` | "Before & After" | Full before/after with data flow visualization (reuse OpsSlide3 pattern) |
| 4 | `TechSlide4Platform.tsx` | "The Application Platform" | PlatformEcosystemDiagram + 4 cards (CoAnalyst + 3 modules). Reuse OpsSlide4Platform pattern |
| 5 | `TechSlide5DTOP.tsx` | "Platform Architecture: DTOP" | Full DTOP pipeline with data sources, ecosystem diagram, audit trail examples. Reuse OpsSlide4DTOP pattern with more detail |
| 6 | `TechSlide6Capabilities.tsx` | "Platform Capabilities" | 3-pillar deep-dive: Connected Foundation, Continuous Improvement, Proof at Scale. Each with technical details |
| 7 | `TechSlide7CoAnalyst.tsx` | "CoAnalyst: Aviation Intelligence" | Full 5-step pipeline + hybrid AI architecture + precision gap. Reuse OpsSlide5Intelligence pattern expanded |
| 8 | `TechSlide8IntelligenceTiers.tsx` | "Intelligence Tiers" | Dedicated slide for 4 tiers (Historical/Reactive/Proactive/Predictive) with real examples per tier |
| 9 | `TechSlide9VsGenericAI.tsx` | "CoAnalyst vs Generic AI" | Side-by-side comparison. Hallucination risk, granularity failure, build-vs-buy. Reuse CASlide8 pattern |
| 10 | `TechSlide10SafetyUseCases.tsx` | "Use Cases: Safety" | Go-arounds (uc1), Injuries (uc5), Regulatory (uc6) — full DTOP chain per case with costed outcomes from `lineOfSightData` |
| 11 | `TechSlide11OpsUseCases.tsx` | "Use Cases: Operations" | AOG (uc2), Delays (uc3), Fuel (uc4), Baggage (uc8) — same detailed DTOP + cost format |
| 12 | `TechSlide12FinancialUseCases.tsx` | "Use Cases: Financial" | Insurance (uc7) + combined revenue protection view. CFO-facing metrics |
| 13 | `TechSlide13LineOfSight.tsx` | "Line of Sight: ROI Model" | Simplified value calculator — use case costs → leading measures → executive outcomes. Link to full `/line-of-sight` |
| 14 | `TechSlide14MaturityRoadmap.tsx` | "Maturity Roadmap" | 5-stage curve with interactive details. Reuse OpsSlide8 pattern |
| 15 | `TechSlide15Roadmap2026.tsx` | "2026 Use Case Roadmap" | 3-phase timeline: H1 2026, H2 2026, 2027+ vision. Placeholder content flagged for customer input |
| 16 | `TechSlide16Outcomes.tsx` | "Operational Outcomes" | 4 outcome boxes + time allocation shift (60% → 70%). Reuse OpsSlide9 pattern |
| 17 | `TechSlide17WhyUs.tsx` | "Why Comply365" | 3 differentiators + trust bar + CTA. Reuse ExecSlide6WhyUs pattern |
| 18 | `TechSlide18Partnership.tsx` | "Partnership Model" | Discovery → Pilot → Scale engagement model. Workshop invitation + contact |

## Use Case Slides Detail (Slides 10-12)
These are the key differentiator from the shorter decks. Each use case card will show:
- **Full DTOP chain** from `platformMechanism` field in `lineOfSightData`
- **Costed outcome** calculated from `costMidpoint × baseline × annualisationFactor`
- **Point solution gap** from `pointSolutionGap` field
- **Cost components** breakdown
- Expandable cards in a 2-column (Slide 11) or single-column layout (Slide 12)

All 8 use cases covered across 3 slides grouped by domain:
- **Safety:** Go-arounds, Injuries, Regulatory Fines
- **Operations:** AOG, Delays, Fuel, Baggage
- **Financial:** Insurance Premiums + Revenue Protection summary

## Files to Create (20 files)
- `src/components/tech-slides/TechSlide0Title.tsx` through `TechSlide18Partnership.tsx` (19 slide components)
- `src/pages/TechnicalDeepDive.tsx` (page with scroll-snap navigation)

## Files to Edit (2 files)
- `src/App.tsx` — add route `/pitch-technical` → `TechnicalDeepDive`
- `src/components/AppSidebar.tsx` — add "Technical Deep-Dive" nav item

## Patterns
- All slides use `SalesSlideContainer` with `SlideNarrationProps`
- Use case data pulled from `lineOfSightData.ts` (no duplication)
- Page follows exact same scroll-snap + keyboard nav + sidebar registration pattern as `ExecutivePitch.tsx`

