

# Executive Pitch — 7 Slides at `/pitch-executive`

## Overview
A high-impact, 5-minute executive pitch for C-suite audiences. Every slide earns its place. Large type, bold visuals, minimal text. CoAnalyst is woven in as the intelligence layer, not a separate product.

**Story arc:** Hook → Provocation ($47M) → Category Shift → Mechanism (DTOP) → Intelligence (CoAnalyst) → Value (Line of Sight) → Close

## Files to Create

### 1. Page + Route
- `src/pages/ExecutivePitch.tsx` — follows `SalesDeck.tsx` pattern (scroll-snap, sidebar registration, narration infrastructure)
- Add route `/pitch-executive` in `App.tsx`
- Add sidebar entry in `AppSidebar.tsx`

### 2. Slide Components (`src/components/exec-slides/`)
All use `SalesSlideContainer` for consistent branding. All accept `SlideNarrationProps`.

| # | File | Title | Content |
|---|------|-------|---------|
| 0 | `ExecSlide0Title.tsx` | "What if operational performance was predictable?" | Hero headline, trust bar (50+ airlines, 7/10 NA carriers, 1M+ frontline), subtle gradient background. Category line: "The Operational Performance Platform" |
| 1 | `ExecSlide1Problem.tsx` | "The $47M Problem" | Calculate total annual cost from `lineOfSightData.ts` use case baselines × costMidpoints × annualisationFactors. Show 8 use cases as compact cost pills rolling up to one staggering number. Visual: cost waterfall or stacked bar |
| 2 | `ExecSlide2Shift.tsx` | "The Shift" | Before/After in one visual. "Point tools → Connected platform." "From reactive event management → proactive control management." Two-column with red (fragmented) vs green (connected) styling |
| 3 | `ExecSlide3DTOP.tsx` | "How It Works" | DTOP in 30 seconds with ONE use case threaded through (Hard Landing → Retraining → Reduced recurrence). Four horizontal steps with icons, brief text, and the example flowing through |
| 4 | `ExecSlide4Intelligence.tsx` | "The Intelligence Layer" | CoAnalyst as "the mic drop." Precision Gap visual: Generic AI 30-40% at granular levels vs CoAnalyst 90% across 4,000+ categories. Four intelligence tiers as compact row. Hybrid AI architecture callout |
| 5 | `ExecSlide5Value.tsx` | "Line of Sight to Value" | Three executive stakeholder cards (COO, CFO, CEO) with 2 metrics each, pulled from `executiveOutcomes` in lineOfSightData. Simplified cascade visual. Total cost avoidance number |
| 6 | `ExecSlide6WhyUs.tsx` | "Why Comply365" | Three differentiator cards (Connected Foundation, Embedded Intelligence, Proof by Default). Category promise: "Predictable, measurable, provable." Clear CTA. Trust bar repeat |

## Key Implementation Details

- **$47M Calculation:** Import `useCases` from `lineOfSightData.ts`, sum `baseline × costMidpoint × annualisationFactor` across all 8 use cases, format as `$XXM`. This makes it data-driven and defensible.
- **Reuse existing patterns:** `SalesSlideContainer` for layout, `SlideNarrationProps` interface, `SalesDeck.tsx` scroll/keyboard/sidebar pattern.
- **Design:** Dark variant throughout (matches brand). Large type sizes for executive scanning. Max 3-4 content elements per slide.
- **No narration data yet** — infrastructure wired but no TTS scripts. Can be added later.

## Sidebar Addition
Add to `AppSidebar.tsx` items array:
```
{ title: "Executive Pitch", url: "/pitch-executive", icon: Rocket }
```

