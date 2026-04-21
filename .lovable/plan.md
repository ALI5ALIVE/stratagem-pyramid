

## Move Line of Sight Calculator into Technical Deep-Dive (COO-only)

Same approach as previously approved, with one change: keep **COO** as the only stakeholder view (drop CFO and CEO).

## Fix 1 — Embed calculator as a Tech deck slide

New `src/components/tech-slides/TechSlideCalculator.tsx`:
- Wraps `SlideLineOfSight` (calculator view only) inside `SalesSlideContainer` with deck title bar, narration controls, slide number, and ArchitectureLayerBadge.
- Owns `useCaseValues` and `airlineProfile` state (same pattern as `LineOfSightPage`).
- Title: `Line of Sight — ROI Calculator`. Subtitle: `Adjust the inputs to model your own cost avoidance, grounded in published industry benchmarks.`

In `src/pages/TechnicalDeepDive.tsx`: replace the existing static `TechSlide13LineOfSight` with `TechSlideCalculator` in Act 5, between `TechSlide6PlatformIntegrations` and `TechSlide14MaturityRoadmap`.

The standalone `/line-of-sight` route stays available.

## Fix 2 — Strip stakeholders down to COO only

In `src/data/lineOfSightData.ts`:
- Remove `cfo` and `ceo` entries from `executiveOutcomes`. Keep `coo`.
- Audit COO metrics so each one outputs a `$M` / `$K` value. Any % or pts metrics on COO get converted to dollar metrics by multiplying their leading-measure delta against the relevant cost driver from `airlineProfile` (e.g. AOG-day reduction × AOG day cost; OTP improvement × delay-minute cost). Add a headline `coo-total-cost-avoidance` metric summing the COO's dollar metrics so the top number is explicit.

In `src/components/slides/SlideLineOfSight.tsx`:
- Remove the `Tabs` wrapper entirely (only one stakeholder remains).
- Pin colour palette to the COO sky/blue tone already defined in `tabColors`.
- Remove `defaultValue` Tabs scaffolding.

In `LineOfSightTree.tsx`, `BalancedScorecard.tsx`, `PerformanceShiftCurve.tsx`: data source is shared, so cards auto-update. `code--search_files` will catch any hardcoded `cfo` / `ceo` strings; remove those references (likely 2 grid cards each).

## Fix 3 — Show $ values instead of % gains, with citations

1. **New helpers** in `lineOfSightData.ts`:
   - `computeUseCaseDollarContribution(uc, currentValue, profile): { savedDollars, baselineDollars }` — cost avoided per use case at slider value vs baseline.
   - `computeLeadingMeasureDollars(measure, useCaseValues, profile)` — sums weighted use-case dollar contributions feeding that measure.

2. **In `SlideLineOfSight.tsx`** per use-case card:
   - Replace the "↓ X%" badge with `−$XXXk/yr` (or `$X.XM/yr` ≥ $1M).
   - Keep slider, baseline marker, severity tag.
   - Add `[i] Source` chip → `Tooltip` showing matching `sourceCitations[uc.id]`.

3. **Leading-measures column**: render dollar translation (e.g. `Fuel variance contribution: $1.2M/yr saved`) via `computeLeadingMeasureDollars`.

4. **COO outcomes column**: each metric already in `$`. Add citation chip per metric linking back to its underlying use-case sources.

5. **Methodology footer**: extend `methodologyNote` block to render `defaultProfileCitation` plus a numbered source list. Add a `<Popover>` "Methodology & Sources" button in the calculator header showing the full bibliography.

## Out of scope

- KPI Tree, Scorecard, and Performance Shift views remain as-is on `/line-of-sight` aside from removing CFO/CEO panels.
- No new external research — citations come from the existing `sourceCitations` map.

## Files touched

**New**
- `src/components/tech-slides/TechSlideCalculator.tsx`

**Edited**
- `src/data/lineOfSightData.ts` — drop CFO/CEO outcomes, convert any COO % metrics to $, add headline COO total, add `computeUseCaseDollarContribution` + `computeLeadingMeasureDollars`.
- `src/components/slides/SlideLineOfSight.tsx` — remove Tabs, swap % badges for $ values, add citation chips/popover.
- `src/components/slides/LineOfSightTree.tsx`, `BalancedScorecard.tsx`, `PerformanceShiftCurve.tsx` — remove CFO/CEO references.
- `src/pages/TechnicalDeepDive.tsx` — replace `TechSlide13LineOfSight` with `TechSlideCalculator`.
- `src/components/tech-slides/TechSlideUseCases.tsx` — fix TS2345 build error (relax `tab.ids` type so `.includes(uc.id)` compiles).

