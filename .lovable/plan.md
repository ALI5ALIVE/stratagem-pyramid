

# Replace ExecSlide5Value with Sales Deck's "Cost of Every Signal" Layout

## Change
Replace the content of `src/components/exec-slides/ExecSlide5Value.tsx` with the same 3-tier grid layout from `SalesSlide8LineOfSight.tsx` — Executive Outcomes → Leading Measures → Use Cases with connecting dashed lines and the bottom $40M+ banner with interactive calculator link.

## File: `src/components/exec-slides/ExecSlide5Value.tsx`
- Update title to "The Cost of Every Signal" and subtitle to "From operational event to boardroom impact — every signal has a price tag."
- Replace the current stakeholder cards + total cost footer with the 3-tier layout: Executive Outcomes grid (with stakeholder context like "1% fuel variance = $5M–$20M/yr"), dashed connecting lines, Leading Measures grid (with direction arrows and "how" descriptions), dashed lines, Use Cases grid (with cost-per-event badges and scenario descriptions)
- Add the bottom banner with "$40M+" total and Link to `/line-of-sight` interactive calculator
- Import `ExternalLink` from lucide-react, `Link` from react-router-dom, and `leadingMeasures` from lineOfSightData
- Add the same helper constants (`stakeholderColors`, `stakeholderContext`, `measureHow`, `ucScenario`, `selectedUCIds`, `selectedLMIds`)
- Keep the slide ID as `exec-slide-5` and export name as `ExecSlide5Value`

