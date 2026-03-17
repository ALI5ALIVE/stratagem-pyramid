

# Operational Case — 12 Slides at `/pitch-operational`

## Overview
A 15-minute presentation for operational leadership (Heads of Safety, Operations, Engineering, Compliance) and customers evaluating next-gen solutions. More depth than Executive, but still visual-first. The critical differentiator: **near-term use cases achievable this year** that build into platform value.

**Story arc:** Empathy → Quantified Pain → Transformation → Platform Mechanism → Intelligence Engine → Near-Term Wins → Stepping Stones → Maturity Vision → Outcomes → Conviction → Action

**Narrative through-line:** *"You know the pain of disconnected operations. We'll show you how a connected platform — with aviation-specific intelligence at its core — transforms your daily reality, starting with use cases you can achieve this year."*

---

## Files to Create

### 1. Page + Route
- `src/pages/OperationalPitch.tsx` — follows `ExecutivePitch.tsx` pattern (scroll-snap, sidebar registration, keyboard nav)
- Add route `/pitch-operational` in `App.tsx`
- Add sidebar entry in `AppSidebar.tsx` with `Briefcase` icon

### 2. Slide Components (`src/components/ops-slides/`)
All use `SalesSlideContainer` for branding. All accept `SlideNarrationProps`.

| # | File | Title | Content |
|---|------|-------|---------|
| 0 | `OpsSlide0Title.tsx` | "From Signals to Outcomes" | Hero headline, subtitle "The Operational Performance Platform for Safety, Operations & Training", trust bar, subtle gradient |
| 1 | `OpsSlide1DailyReality.tsx` | "Your Daily Reality" | "Day in the Life" timeline (reuse pattern from `SalesSlide1Problem`). 5 pain points with icons. Empathy-first — show we understand the operational chaos. Quote: "Every disconnected system is a risk you can't see." |
| 2 | `OpsSlide2CostOfFragmentation.tsx` | "The Cost of Fragmentation" | Three animated stat callouts: "65K+ signals/year", "40% orphaned — no action taken", "3-week average investigation cycle". Risk compounding visual: small gap → cascading failure. Uses cost data from `lineOfSightData.ts` to show top 4 use case costs |
| 3 | `OpsSlide3BeforeAfter.tsx` | "Before & After" | Two-column: Fragmented (red) vs Connected (green). Left: siloed icons (Safety, Content, Training, Ops) with broken connections. Right: DTOP loop connecting all. Three outcome metrics at bottom. Reuse particle visualization pattern from `SalesSlide3BeforeAfter` |
| 4 | `OpsSlide4DTOP.tsx` | "The Platform: DTOP in Action" | Full DTOP pipeline with `PlatformEcosystemDiagram`. Data sources strip at top. Four interactive steps (click to expand detail + audit trail example). Richer than Exec version — shows the ecosystem diagram and data flow |
| 5 | `OpsSlide5Intelligence.tsx` | "CoAnalyst: The Intelligence Engine" | Positioned as what powers DTOP. 5-step pipeline: Ingest → Enrich → Detect → Intelligence → Activate (horizontal flow). Precision Gap callout (90% vs 30-40%). Four intelligence tiers as cards: Historical, Reactive, Proactive, Predictive — each with one real aviation example |
| 6 | `OpsSlide6NearTermUseCases.tsx` | "What You Can Achieve This Year" | **Critical slide** — 4 use case cards in 2x2 grid: (1) Hard landing → retraining, (2) Smoke & fumes → procedure change, (3) Regulatory change → cascade update, (4) Crew fatigue → pattern detection. Each card shows: Signal → Platform Action → Outcome in a compact DTOP mini-flow. Data sourced from `lineOfSightData.ts` use cases |
| 7 | `OpsSlide7SteppingStones.tsx` | "The Journey: From Quick Wins to Platform Value" | Three-phase horizontal timeline: **Year 1** "Quick Wins" (near-term use cases from Slide 6), **Year 2** "Connected Operations" (cross-department workflows), **Year 3** "Intelligent Operations" (predictive + proactive). Each phase shows 2-3 concrete capabilities. Arrow progression with growing intensity |
| 8 | `OpsSlide8MaturityRoadmap.tsx` | "The Maturity Roadmap" | Simplified maturity curve (5 stages). "You are here" marker at Stage 1-2. Each stage with one concrete use case. Reuse stage data pattern from `MaturityCurveVisualization`. Compact — curve on left, active stage detail on right |
| 9 | `OpsSlide9Outcomes.tsx` | "Operational Outcomes" | Four outcome cards: Schedule Protection, Revenue Protection, Cost Savings, Customer Loyalty. Each with Signal → Action → Result. Time allocation shift bar: "From 60% coordination → 70% improvement". Total cost avoidance number from `lineOfSightData` |
| 10 | `OpsSlide10WhyUs.tsx` | "Why Comply365" | Three differentiator cards (Connected Foundation, Embedded Intelligence, Proof by Default). Trust bar. Category promise: "Predictable, measurable, provable." Compact version of `ExecSlide6WhyUs` with slightly more detail |
| 11 | `OpsSlide11GettingStarted.tsx` | "Getting Started" | Discovery workshop CTA. Three-step engagement model: Discover → Pilot → Scale. "What does your first use case look like?" prompt. Contact/next steps |

---

## Key Implementation Details

- **Pattern:** Follow `ExecutivePitch.tsx` exactly for page structure (scroll-snap, sidebar registration, keyboard nav)
- **Container:** All slides use `SalesSlideContainer` from `src/components/sales-slides/SalesSlideContainer.tsx`
- **Data:** Import `useCases`, `executiveOutcomes` from `lineOfSightData.ts` for cost calculations and outcome metrics
- **Reuse:** Leverage existing components where possible — `FragmentationIllustration`, `PlatformEcosystemDiagram`, `TimeAllocationBar` patterns
- **Design:** Dark variant throughout. More content density than Executive but still visual-first. Each slide should work at 887x628 viewport
- **No narration data yet** — infrastructure wired via `SlideNarrationProps` but no TTS scripts

## Sidebar Addition
```
{ title: "Operational Pitch", url: "/pitch-operational", icon: Briefcase }
```

