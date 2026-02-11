

# Replace Timeline Boxes with Use Case Detail Card

## What's Changing

The bottom of the "Your Operational Performance Roadmap" slide currently shows two boxes ("Traditional Path" vs "With Platform"). These will be replaced with a **use case detail card** that updates based on the active stage -- matching the main deck's maturity curve slide.

## How It Works

When a user clicks a stage marker on the curve (or the default stage 3 is shown), the bottom section displays the corresponding use case card with:

- **Stage badge + headline** (e.g. "1 - Fragmented & Reactive")
- **Scenario title** (e.g. "Crew Fatigue Incident")
- **Problem description** (the detailed text)
- **Outcome statement**

## Use Case Data (from main deck)

| Stage | Scenario | Problem (summary) | Outcome |
|-------|----------|-------------------|---------|
| 1 | Crew Fatigue Incident | Reports scattered, pattern missed, 3-week investigation | Reactive, fragmented, slow |
| 2 | Runway Incursion Investigation | Safety team investigates but training never updated, issue recurs | Strong depts, no connection |
| 3 | MEL Procedure Update | Platform auto-triggers procedure revision + training + audit trail | No manual handoffs, full traceability |
| 4 | Hard Landing Detection | FOQA flags trend, 47 pilots get targeted sim training automatically | 78% reduction in repeat events |
| 5 | Smoke & Fumes Prevention | AI detects weak signal cluster, de-icing SOP revised proactively | Zero incidents, prevention not reaction |

## Technical Details

### File: `src/components/sales-slides/SalesSlide6Journey.tsx`

1. Add a `useCases` data array with the 5 use case objects (scenario, problem, outcome) matching the main deck's `Slide5MaturityCurve.tsx` data.

2. Remove the "Timeline comparison" section (lines 176-201) -- the two-column grid with Traditional Path and With Platform boxes.

3. Replace with a single card that reads from `useCases[activeStage - 1]`:
   - Left-border accent in the stage color
   - Stage number badge + headline + sublabel
   - Scenario title with Target icon
   - Problem text (stages 1-2 get AlertTriangle icon, stages 3-5 get CheckCircle)
   - Outcome text separated by a colored border

4. Keep the existing bottom note (lines 203-209) as-is.

5. Add `Target, AlertTriangle, CheckCircle` to the lucide-react imports (remove `Zap`).

