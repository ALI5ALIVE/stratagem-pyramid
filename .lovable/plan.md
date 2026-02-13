

# Make the Bell Curve Height Difference Intuitive for Non-Technical Users

## Problem
The improved curve being taller than the baseline is mathematically correct but confusing to laypeople who don't understand Gaussian distributions. Users may think "taller = more cost" rather than "taller = more predictable."

## Solution
Add clear visual annotations directly on the chart that translate the statistical concept into plain business language.

### Changes to `src/components/slides/PerformanceShiftCurve.tsx`

1. **Add inline annotations near each curve peak** using Recharts `ReferenceLine` labels or custom positioned elements:
   - Next to the baseline (grey) curve peak: **"Wide spread = unpredictable costs"**
   - Next to the improved (green) curve peak: **"Narrow spread = predictable costs"**

2. **Add a horizontal double-arrow annotation** between the two dashed mean lines with the label **"Cost Reduction"** to make the horizontal shift (the actual savings) the primary visual message.

3. **Update the legend text** from generic "Current State" / "Improved State" to more descriptive labels:
   - "Current State (variable)" 
   - "Improved State (predictable)"

4. **Add a one-line explanation** below the subtitle: *"A taller, narrower curve means your costs become more predictable and reliable."*

These are small text/label additions within the existing component -- no structural changes needed.

