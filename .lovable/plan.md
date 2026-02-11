

# Make Leading Measures Use-Case-Specific

## The Problem

Currently, the leading measures are abstract sliders (e.g., "Change Cycle: 45 days") disconnected from specific use cases. The user wants each **use case to have its own concrete input** (e.g., "Number of Hard Landings per month") that then drives the leading measures, which in turn flow up to lagging executive outcomes.

## New Three-Tier Flow

```text
USE CASE INPUTS (new)          LEADING MEASURES (computed)       LAGGING OUTCOMES (computed)
-------------------------------  ----------------------------     --------------------------
Hard Landings / month: [slider]  --> Repeat Events: X%            --> Cost Reduction: Y%
Smoke Events / month: [slider]   --> Response Time: X hrs         --> Revenue Protection: $YM
Procedure Changes / qtr: [slider]--> Change Cycle: X days         --> On-Time Performance: Y%
...                               --> Training Gap: X%            --> Fleet Readiness: Y%
```

## Data Model Changes (lineOfSightData.ts)

### New Interface: `UseCaseInput`
Each use case gets a concrete, adjustable input with a slider:

| Use Case | Input Label | Unit | Baseline | Min | Max |
|----------|-------------|------|----------|-----|-----|
| Smoke & Fumes | Smoke/fumes events per month | events | 8 | 0 | 20 |
| Hard Landing | Hard landings per month | events | 6 | 0 | 15 |
| Procedure Change | Procedure changes per quarter | changes | 12 | 0 | 30 |
| Crew Training | Untrained crew per cycle | crew | 45 | 0 | 100 |
| AOG Response | AOG events per month | events | 3 | 0 | 10 |
| Flight Data Monitoring | FOQA exceedances per month | events | 15 | 0 | 40 |
| Regulatory Change | Regulatory changes per quarter | changes | 8 | 0 | 20 |
| Cabin Safety | Outstanding cabin findings | findings | 22 | 0 | 50 |

### New: `impactOnMeasures` per UseCase
Each use case input defines how reducing it improves the leading measures. For example, Hard Landing Response reducing from 6 to 3 events/month would improve "Repeat Events" by a weighted amount and "Response Time" by another weighted amount.

### Leading Measures Become Computed
Leading measures are no longer directly adjustable -- they are **computed from** the use case inputs. The existing `computeMetricValue` continues to compute lagging metrics from leading measures, creating a clean three-tier cascade.

## UI Changes (SlideLineOfSight.tsx)

### Tier 3 (bottom): Use Case Inputs with Sliders
- Replace the static use case buttons with **slider cards** -- each showing the use case name, a concrete input label, and an adjustable slider
- Example: "Hard Landing Response -- Hard landings per month: [====6====]"
- Connected/dimmed logic stays the same per stakeholder tab

### Tier 2 (middle): Leading Measures Become Read-Only Gauges
- Remove sliders from leading measures
- Show them as computed values with improvement deltas (similar to current lagging metrics display)
- They update automatically when use case inputs change

### Tier 1 (top): Lagging Outcomes -- No Change
- Continue showing computed executive outcomes with delta indicators
- Still uses existing `computeMetricValue` weighted formula

### Detail Panel
- Clicking a use case card still opens the detail panel with description, methodology, and connected measures

## Computation Flow

1. User adjusts a use case input (e.g., hard landings from 6 to 2)
2. Each use case's `impactOnMeasures` weights are used to compute new leading measure values
3. Multiple use cases can contribute to the same leading measure (contributions are summed)
4. Leading measure values feed into `computeMetricValue` to produce lagging outcomes
5. All three tiers update in real-time

## Files Changed

| File | Change |
|------|--------|
| `src/data/lineOfSightData.ts` | Add `UseCaseInput` interface, add `input` and `impactOnMeasures` fields to each use case, add `computeLeadingMeasure` function |
| `src/components/slides/SlideLineOfSight.tsx` | Tier 3 becomes slider cards for use case inputs; Tier 2 becomes read-only computed gauges; state tracks use case input values instead of leading measure values |

