

# Convert Performance Shift to Cost Savings Profile

## Why This Change
The current bell curve uses an abstract 0-100 "performance score" that has no real-world meaning. Switching the X-axis to dollar-denominated cost avoidance makes every point on the chart traceable to the calculator's use case models, which are grounded in EUROCONTROL, IATA, and A4A benchmarks.

## What the User Will See
- X-axis changes from "Operational Performance Score" to "Annual Cost Avoidance ($)"
- Baseline curve centred at $0 (current state)
- Improved curve shifts right toward the total cost avoidance figure from the calculator
- Curve width represents a realistic range of outcomes (conservative to optimistic), not an abstract standard deviation
- Summary metrics remain: Total Cost Avoidance, Use Cases Improved, Average Leading Shift, and Overall Improvement %
- Labels updated: "Current State" at $0, "Expected Outcome" at the computed total

## How the Calculation Changes

**Current approach (abstract score):**
- Normalise each use case slider to 0-100
- Average all normalised scores for the mean
- Fixed standard deviation

**New approach (cost-based):**
- Baseline mean = $0 (no improvement)
- Improved mean = total cost avoidance from the calculator (already computed, sum of all use case cost impacts)
- Standard deviation = percentage of the improved mean (e.g., 25%), representing the range from conservative to optimistic outcomes
- X-axis range: dynamically scaled from $0 to ~2x the improved mean
- Both curves generated using the same Gaussian function, just with dollar values instead of abstract scores

## Technical Changes

### File: `src/components/slides/PerformanceShiftCurve.tsx`

1. **Replace the mean calculation logic** (lines 48-95):
   - Remove the normalisation loop over use cases
   - Set `baselineMean = 0`
   - Set `improvedMean = totalCostAvoidance` (already passed as a prop)
   - Set `baselineStdDev` to a percentage of the max range (e.g., 10% of the chart width) to show a narrow "no savings" baseline
   - Set `improvedStdDev` to 25% of `totalCostAvoidance` to represent outcome variability
   - Keep `useCasesImproved` count and `avgLeadingShift` calculations unchanged

2. **Update the chart data generation** (lines 97-106):
   - Change the X-axis range from 0-100 to a dynamic dollar range: from a small negative buffer to ~1.8x the improved mean
   - Generate points at regular intervals across this range

3. **Update the X-axis label and formatting** (lines 202-214):
   - Change label from "Operational Performance Score" to "Annual Cost Avoidance"
   - Add a tick formatter to display values as "$0", "$500K", "$1M", etc.

4. **Update ReferenceLine labels** (lines 222-248):
   - Baseline label: "Current: $0"
   - Improved label: "Expected: $X.XM" (using the existing formatCost helper)

5. **Update the "Performance Shift" badge** (lines 162-167):
   - Change from percentage to dollar value: "Shift: +$X.XM"

6. **Update the summary metrics panel** (lines 270-285):
   - Replace "Overall Improvement" with "Expected Outcome" showing the dollar figure
   - Keep "Cost Avoidance", "Use Cases Improved", and "Avg Leading Shift" as-is

7. **Update tooltip** (lines 216-225):
   - Format the X value as a dollar amount
   - Show "Probability Density" for the Y value

### File: `src/data/lineOfSightNarration.ts`

Update the "curve" narration script to reference cost savings rather than an abstract performance score. The narrative should explain:
- "The grey curve represents your current state -- zero incremental savings"
- "The green curve shows the expected cost avoidance based on the improvements you've modelled"
- "The width of the curve represents the range of likely outcomes"
- Connect to defensibility: "Every dollar on this chart traces back to the use case models grounded in industry benchmarks"

## Summary of Files Changed
1. **Edit**: `src/components/slides/PerformanceShiftCurve.tsx` -- switch from abstract score to dollar-based distribution
2. **Edit**: `src/data/lineOfSightNarration.ts` -- update narration script for cost-based framing
