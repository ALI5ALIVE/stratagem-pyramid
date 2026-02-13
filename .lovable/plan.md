

# Fix Bell Curve: Show Current Costs vs Improved Costs (No Negatives)

## Problem
The chart currently starts at $0 (baseline) and extends into negative values on the left side, which doesn't represent anything meaningful. The user wants the two curves to show:
- **Current State**: The airline's total annual cost exposure (a real dollar figure)
- **Improved State**: That cost reduced by the savings from the calculator

This way the green curve sits to the **left** of the grey curve (lower costs = better), and nothing goes negative.

## What Changes

### File: `src/components/slides/PerformanceShiftCurve.tsx`

1. **Compute total baseline cost exposure** -- sum each use case's `baseline * scaledCostMidpoint * annualisationFactor` to get the airline's current annual cost exposure across all eight use cases
2. **Set the two means**:
   - `baselineMean` = total baseline cost exposure (e.g. ~$15M)
   - `improvedMean` = baseline cost exposure minus totalCostAvoidance (e.g. ~$12M)
3. **Chart X-axis range**: from $0 to ~1.3x the baseline mean (all positive, no negatives)
4. **Standard deviations**: baseline gets a wider spread (more variability in current costs), improved gets a narrower spread (more predictable after platform adoption)
5. **Update labels**:
   - Baseline reference line: "Current: $X.XM"
   - Improved reference line: "Improved: $X.XM"
   - Shift badge: "Savings: $X.XM" (the difference)
6. **Update subtitle** to: "How platform adoption reduces and stabilises your annual cost exposure"
7. **Update summary metrics**: "Expected Outcome" becomes the savings figure; add "Outcome Range" showing the spread of the improved curve

### File: `src/data/lineOfSightNarration.ts`

Update the narration script to match: "The grey curve represents your current annual cost exposure... the green curve shows your reduced, more predictable cost profile after platform adoption."

## Files Changed
1. `src/components/slides/PerformanceShiftCurve.tsx` -- reframe from $0-baseline to current-vs-improved costs
2. `src/data/lineOfSightNarration.ts` -- update narration to match new framing
