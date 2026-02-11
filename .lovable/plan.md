

# Add Balanced Scorecard Tab

## Overview

Add a third tab -- "Scorecard" -- to the Line of Sight page that presents a classic Balanced Scorecard view. Instead of being organized by stakeholder role (CFO/CEO/COO), it is organized by **four strategic perspectives**: Financial, Customer, Internal Processes, and Learning & Growth. Each perspective contains strategic objectives with KPIs that are computed from the existing use case and leading measure data.

## Balanced Scorecard Perspectives

| Perspective | Strategic Objectives | KPIs (computed from existing data) |
|---|---|---|
| **Financial** | Reduce operating cost per ASK; Protect revenue | Fuel Cost Savings ($M) driven by lm1; IrOps Cost Avoidance ($M) driven by lm2+lm3; Insurance Savings ($M) driven by lm4+lm5 |
| **Customer** | Improve schedule reliability; Enhance passenger experience | On-Time Performance (%) driven by lm3; Pax Experience Score (pts) driven by lm6; Mishandled baggage rate (from uc8 input) |
| **Internal Processes** | Increase fleet utilisation; Reduce safety event recurrence; Accelerate compliance readiness | Fleet Availability (%) driven by lm2; Safety Recurrence Rate (%) driven by lm4; Audit Readiness (hrs) driven by lm5 |
| **Learning & Growth** | Shift from reactive to predictive operations; Close the detect-to-action loop | Fuel Variance (%) driven by lm1; Regulatory Standing (%) driven by lm5+lm4 |

## UI Design

Each perspective is a card with a coloured left border:
- **Financial** -- emerald
- **Customer** -- blue
- **Internal Processes** -- amber
- **Learning & Growth** -- purple

Inside each card:
- Perspective title and 1-line description
- A row of KPI tiles, each showing: KPI name, baseline value, current computed value, improvement delta (with green/red arrow), and a small progress bar showing % improvement from baseline

At the top of the scorecard, a summary strip shows overall improvement across all four perspectives as a simple average percentage.

## Layout

```text
+-----------------------------------------------------------+
| OVERALL IMPROVEMENT: +14.2%                                |
+-----------------------------------------------------------+
| [green] FINANCIAL                                          |
|  Objective: Reduce operating cost, protect revenue         |
|  +------------+ +------------+ +------------+              |
|  |Fuel Savings| |IrOps Avoid | |Insurance   |              |
|  |  $4.2M     | |  $8.1M     | |  $1.9M     |              |
|  | +$4.2M     | | +$8.1M     | | +$1.9M     |              |
|  +------------+ +------------+ +------------+              |
+-----------------------------------------------------------+
| [blue] CUSTOMER                                            |
|  Objective: Improve reliability & passenger experience     |
|  +------------+ +------------+ +------------+              |
|  |OTP         | |Pax Score   | |Bag Rate    |              |
|  |  82.3%     | |  76.1 pts  | |  5.2/1000  |              |
|  | +4.3pp     | | +4.1 pts   | | -2.8       |              |
|  +------------+ +------------+ +------------+              |
+-----------------------------------------------------------+
| [amber] INTERNAL PROCESSES                                 |
|  ...                                                       |
+-----------------------------------------------------------+
| [purple] LEARNING & GROWTH                                 |
|  ...                                                       |
+-----------------------------------------------------------+
```

## Technical Details

### Data (`src/data/lineOfSightData.ts`)

Add a new exported `balancedScorecardPerspectives` array defining the four perspectives. Each perspective references existing leading measures and use case data by ID, plus has its own set of KPI definitions with weights mapping to leading measures (reusing the existing `LaggingMetric` interface pattern).

### New Component (`src/components/slides/BalancedScorecard.tsx`)

- Receives the same shared props as the other views: `useCaseValues`, `leadingValues`, `totalCostAvoidance`, `airlineProfile`
- Computes KPI values using the existing `computeMetricValue` function from `lineOfSightData.ts`
- Renders four perspective cards with KPI tiles
- Each KPI tile shows baseline, current value, delta, and a progress bar

### Page (`src/pages/LineOfSightPage.tsx`)

- Add a third view option: `"calculator" | "tree" | "scorecard"`
- Add a "Scorecard" button to the toggle bar (using `LayoutGrid` icon from lucide)
- Render `BalancedScorecard` when selected, passing the same shared state

## Files Changed

| File | Change |
|------|--------|
| `src/data/lineOfSightData.ts` | Add `balancedScorecardPerspectives` data definition |
| `src/components/slides/BalancedScorecard.tsx` | **Create** -- Scorecard component with four perspective cards |
| `src/pages/LineOfSightPage.tsx` | Add third tab button and render scorecard view |

