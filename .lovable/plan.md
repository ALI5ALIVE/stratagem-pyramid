

# Add Performance Distribution Bell Curve View

## Overview
Add a fourth tab to the Line of Sight page called "Performance Shift" that displays an animated bell curve showing how the airline's overall operational performance distribution shifts from current state to improved state as use case sliders are adjusted.

## What the User Will See
- A new "Performance Shift" button in the top navigation bar (after Scorecard)
- Two overlapping bell curves on a single chart:
  - **Grey/muted curve**: The baseline distribution (where the airline starts)
  - **Green curve**: The improved distribution (reflecting current slider positions)
- As sliders are adjusted on the Calculator, the green curve shifts rightward and narrows, visually showing the entire operation moving toward better, more consistent performance
- Key annotations on the chart:
  - Baseline mean and improved mean marked with vertical dashed lines
  - The gap between them labelled as the "Performance Shift"
  - Total cost avoidance displayed prominently
  - A percentage improvement indicator
- A summary panel below the curve with four key metrics: Overall Improvement %, Cost Avoidance, Number of Use Cases Improved, and Average Leading Measure Shift

## How the Bell Curve Is Computed
The bell curve represents the aggregate operational performance across all use cases, normalised to a 0-100 scale:
- **Baseline mean**: Calculated from the baseline values of all use cases (each normalised as a percentage of their range)
- **Improved mean**: Calculated from the current slider values
- **Standard deviation**: Starts wider at baseline (representing inconsistent operations) and narrows as improvements are made (representing more predictable performance)
- The curve is generated using the Gaussian probability density function, plotted as an AreaChart using Recharts (already installed)

## Architecture

### New file: `src/components/slides/PerformanceShiftCurve.tsx`
A new component that:
- Accepts `useCaseValues`, `leadingValues`, `totalCostAvoidance`, `airlineProfile`, and optional `narration` props (same interface as the other views)
- Computes baseline and improved means from use case data
- Generates two bell curve datasets (baseline and improved) using a Gaussian function
- Renders them as overlapping area charts with Recharts
- Shows annotation lines for the two means
- Includes a summary metrics row at the bottom
- Renders the SlidePlayButton when narration props are provided

### Updated file: `src/pages/LineOfSightPage.tsx`
- Add a fourth view entry: `{ id: "curve", label: "Performance Shift" }`
- Import and render `PerformanceShiftCurve` when `view === "curve"`
- Pass the same shared state (useCaseValues, leadingValues, etc.)
- Wire narration props with "curve" as the view ID
- Update the Scorecard's `onNextSlide` to navigate to the curve view

### Updated file: `src/data/lineOfSightNarration.ts`
- Add a fourth narration entry for `viewId: "curve"` explaining the bell curve visualisation
- Script covers: what the two curves represent, how the shift relates to slider adjustments, the connection between distribution narrowing and operational predictability, and the cost savings summary

### Updated file: `src/hooks/useLineOfSightNarration.ts`
- No structural changes needed -- the hook already supports arbitrary string view IDs, so "curve" will work automatically

### Updated file: `src/contexts/SlideNavigationContext.tsx`
- No changes needed -- the views array in LineOfSightPage already feeds this context

## Technical Details

### Gaussian curve generation:
```text
function gaussian(x, mean, stdDev):
  return (1 / (stdDev * sqrt(2 * PI))) * exp(-0.5 * ((x - mean) / stdDev)^2)

// Generate 100 points from x=0 to x=100
// Baseline: mean ~40, stdDev ~15 (wide, lower performance)
// Improved: mean shifts right proportionally to improvement, stdDev narrows
```

### Mean calculation from use cases:
```text
For each use case:
  baseline_normalised = (baseline - min) / (max - min) * 100
  current_normalised = (current - min) / (max - min) * 100
  // For "lower is better" metrics, invert so improvement = rightward shift
  
Overall baseline_mean = average of all baseline_normalised values
Overall improved_mean = average of all current_normalised values
```

### Standard deviation scaling:
- Baseline stdDev: 15 (represents inconsistent, unpredictable operations)
- Improved stdDev: scales down proportionally to improvement (min 8), representing the "predictable performance" messaging

### Chart rendering with Recharts:
- Uses `AreaChart` with two `Area` components (baseline and improved)
- Baseline area: grey fill with low opacity
- Improved area: emerald/green fill
- `ReferenceLine` components for the two means
- Custom tooltip showing the performance score and probability density

### Narration script theme:
The script will explain that the bell curve represents the airline's entire operational performance distribution -- not individual metrics, but the holistic picture. It connects to the "predictable, measurable, and provable" messaging by showing how the curve narrows (more predictable) and shifts right (measurably better), with the cost avoidance figure proving the financial impact.

## Files Changed
1. **New**: `src/components/slides/PerformanceShiftCurve.tsx` -- bell curve visualisation component
2. **Edit**: `src/pages/LineOfSightPage.tsx` -- add fourth view, wire props and narration
3. **Edit**: `src/data/lineOfSightNarration.ts` -- add narration script for curve view
