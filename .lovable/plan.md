

# Redesign Line of Sight with Real Use Cases and Cost Data

## Overview

Replace the current abstract use cases and leading measures with the 8 real, costed use cases provided. The new model inverts the interaction: users adjust **use case frequency sliders** (e.g., "Go-arounds per month"), which compute **leading operational measures**, which flow up to **executive lagging outcomes** aligned to the 4 cost centres (Fuel, Asset Utilisation, Labour, Irregular Ops).

## New Three-Tier Architecture

```text
TIER 3: USE CASE INPUTS (sliders)         TIER 2: LEADING MEASURES (computed)     TIER 1: EXECUTIVE OUTCOMES (computed)
----------------------------------         ---------------------------------       ----------------------------------
Go-arounds / month: [====12====]    --->   Fuel variance: X%               --->    Fuel Cost Savings: $XM
AOG days / month: [====4====]       --->   Fleet availability: X%          --->    Asset Utilisation Gain: $XM
Delay minutes / day: [====45====]   --->   OTP: X%                         --->    IrOps Cost Reduction: $XM
Fuel variance %: [====3.2====]      --->   Safety event recurrence: X%     --->    Labour Effectiveness: X%
Injuries / quarter: [====2====]     --->   Audit readiness: X hrs          --->    Insurance Savings: $XM
Regulatory findings / year: [===3=] --->   Regulatory compliance: X%       --->    Revenue Protection: $XM
Insurance escalation %: [====5====]
Mishandled bags / 1000: [====8====]
```

## Data Model Changes (`src/data/lineOfSightData.ts`)

### Replace Use Cases with 8 Costed Use Cases

Each use case gains concrete input parameters and cost data:

| # | Use Case | Input Slider | Unit | Baseline | Min | Max | Cost Per Event |
|---|----------|-------------|------|----------|-----|-----|---------------|
| 1 | Go-Around Events | Go-arounds per month | events | 12 | 0 | 30 | $5K-$20K |
| 2 | AOG & Unscheduled Maintenance | AOG days per month | days | 8 | 0 | 20 | $10K-$150K/day |
| 3 | Flight Delays & OTP | Avg delay minutes per day | mins | 45 | 0 | 120 | $75-$200/min |
| 4 | Fuel Performance Degradation | Fuel variance above plan | % | 3.2 | 0 | 8 | 1% = $5M-$20M/yr |
| 5 | Crew & Passenger Injury | Injury incidents per quarter | incidents | 4 | 0 | 12 | $20K-$250K |
| 6 | Regulatory Fines & Findings | Findings per year | findings | 5 | 0 | 15 | $50K-$5M |
| 7 | Insurance Premium Escalation | Premium increase | % | 6 | 0 | 15 | $1M-$10M/yr |
| 8 | Baggage & Passenger Misalignment | Mishandled bags per 1,000 pax | bags | 8 | 0 | 20 | $100-$350/bag |

### New `UseCaseInput` Interface

```typescript
export interface UseCaseInput {
  inputLabel: string;
  unit: string;
  baseline: number;
  min: number;
  max: number;
  step: number;
  costPerEvent: string;        // display string e.g. "$5K-$20K per event"
  costComponents: string[];    // e.g. ["Additional fuel burn", "Crew duty-time impact"]
  severity: string;            // e.g. "Medium", "High", "Very High"
  frequency: string;           // e.g. "High frequency", "Low frequency"
}
```

Each `UseCase` gets an `input` field of this type plus `impactOnMeasures: Record<string, number>` defining weighted contribution to leading measures.

### Redesign Leading Measures (Now Computed, Not Adjustable)

Replace current abstract measures with ones tied to the 4 cost centres:

| ID | Leading Measure | Unit | Baseline | Driven By |
|----|----------------|------|----------|-----------|
| lm1 | Fuel variance above plan | % | 3.2 | Go-arounds, Fuel degradation, Delays |
| lm2 | Fleet availability rate | % | 91 | AOG, Delays |
| lm3 | On-time performance | % | 78 | Delays, AOG, Go-arounds |
| lm4 | Safety event recurrence rate | % | 12 | Injuries, Go-arounds, Fuel |
| lm5 | Audit & compliance readiness | hrs | 120 | Regulatory findings, Insurance |
| lm6 | Passenger experience score | pts | 72 | Baggage, Delays, Injuries |

### New `computeLeadingMeasure` Function

Computes each leading measure value as a function of use case input reductions:

```typescript
export function computeLeadingMeasure(
  measure: LeadingMeasure,
  useCaseInputValues: Record<string, number>,
  useCases: UseCase[]
): number {
  // Sum weighted improvements from all use cases that impact this measure
  // When a use case input decreases from baseline, it improves the connected leading measure
}
```

### Redesign Executive Outcomes (Lagging Metrics)

Align to the 4 cost centres plus cross-cutting outcomes:

**CFO tab:**
- Fuel Cost Savings ($M) -- driven by lm1
- IrOps Cost Avoidance ($M) -- driven by lm2, lm3
- Insurance Premium Reduction ($M) -- driven by lm4, lm5

**CEO tab:**
- Brand & Reputation Score (pts) -- driven by lm4, lm6
- Regulatory Standing (%) -- driven by lm5, lm4
- Revenue Protection ($M) -- driven by lm3, lm6

**COO tab:**
- On-Time Performance (%) -- driven by lm3, lm2
- Fleet Readiness (%) -- driven by lm2
- Labour Effectiveness (%) -- driven by lm3, lm4

### New: Annualised Cost Impact Display

Add a summary banner showing total estimated annual cost impact based on the use case input reductions. Each use case contributes: `(baseline - current) * midpoint_cost_per_event * 12` (or appropriate annualisation).

## UI Changes (`src/components/slides/SlideLineOfSight.tsx`)

### Tier 3 (Bottom) -- Use Case Input Sliders

Replace the static use case buttons with interactive slider cards:
- Each card shows: use case name, severity/frequency badges, input slider, cost-per-event range, cost components list
- Slider adjusts the use case frequency (lower = improvement)
- Connected/dimmed logic per stakeholder tab remains
- Clicking the card header expands the detail panel (description, methodology, cost breakdown)

### Tier 2 (Middle) -- Leading Measures Become Read-Only Gauges

- Remove sliders from leading measures
- Show as computed cards with current value, baseline, and improvement delta
- Auto-update when any use case input changes

### Tier 1 (Top) -- Executive Outcomes with Cost Impact

- Keep existing card layout but update metrics to match the new cost-centre-aligned outcomes
- Add an annualised dollar-impact estimate where applicable

### New: Cost Impact Summary Banner

A banner between Tier 1 and Tier 2 showing:
- Total estimated annual cost avoidance (sum across all use case reductions)
- Labelled as "Illustrative Target Outcomes*" with a footnote for defensibility

## Files Changed

| File | Change |
|------|--------|
| `src/data/lineOfSightData.ts` | Full rewrite: new interfaces, 8 costed use cases with inputs, redesigned leading measures, new cost-centre-aligned executive outcomes, new computation functions |
| `src/components/slides/SlideLineOfSight.tsx` | Refactor: Tier 3 becomes slider cards with cost data, Tier 2 becomes read-only computed gauges, add cost impact summary banner, state tracks use case inputs |

## Computation Flow

1. User adjusts a use case input (e.g., go-arounds from 12 to 5 per month)
2. Each use case's `impactOnMeasures` weights compute new leading measure values via `computeLeadingMeasure`
3. Leading measure values feed into existing `computeMetricValue` for lagging outcomes
4. Annualised cost impact banner sums: `(baseline - current) * costMidpoint * annualisationFactor` across all use cases
5. All three tiers and the cost banner update in real-time

