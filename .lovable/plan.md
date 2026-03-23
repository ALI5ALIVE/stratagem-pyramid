

# Split Calculator into Simple & Advanced Tabs

## What Changes

Add a **Simple / Advanced** toggle to the Calculator view that filters which use cases are shown:

- **Simple** (default): Shows only **Flight Delays & OTP** (`uc3`) and **Insurance Premium Escalation** (`uc7`) — the two most defensible, easy-to-explain cases
- **Advanced**: Shows all 8 use cases for deeper modeling

## How

### File: `src/components/slides/SlideLineOfSight.tsx`

1. Add a `calculatorMode` state (`"simple" | "advanced"`) defaulting to `"simple"`
2. Define `simpleUseCaseIds = ["uc3", "uc7"]`
3. Filter `useCases` by mode before rendering the use case slider grid (around line 319): in simple mode only show matching IDs, in advanced show all
4. Add a toggle bar above the use case grid — two pills/buttons: "Quick View (2 Use Cases)" and "Full Model (8 Use Cases)"
5. The executive outcomes tabs, leading measures, and cost totals still compute from **all** use cases — but in simple mode, only the two visible sliders are adjustable; the others stay at baseline
6. Alternatively (simpler UX): compute totals only from visible use cases in simple mode so the numbers aren't confusing — flag this with a note "Showing 2 of 8 use cases"

### File: `src/pages/LineOfSightPage.tsx`
- No changes needed — the mode lives inside the calculator component

### Visual Design
- Small segmented control above the slider grid, matching existing button styling
- In simple mode, the grid shows 2 cards side-by-side (single row)
- A subtle label: "Showing 2 of 8 use cases — switch to Full Model for complete analysis"

