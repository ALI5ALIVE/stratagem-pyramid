

# Add KPI Connection Tree Visualization

## Overview

Create a new visual slide that renders the entire Line of Sight cascade as an interactive **tree diagram** -- use cases at the bottom, leading measures in the middle, executive outcomes at the top -- with animated connection lines showing exactly how each use case flows through to executive KPIs. This becomes a companion view to the existing calculator, accessible via a toggle or tab on the same page.

## Layout

```text
                     +------------------+
                     | EXECUTIVE        |
                     | OUTCOMES         |
                     |  CFO  CEO  COO   |
                     +--------+---------+
                              |
                    connection lines (SVG)
                              |
              +------+------+------+------+------+------+
              | Fuel | Fleet| OTP  |Safety|Audit |Pax   |
              | Var  | Avail|      |Recur |Ready |Exp   |
              +--+---+--+---+--+---+--+---+--+---+--+---+
                 |        |        |        |        |
               connection lines (SVG, weighted thickness)
                 |        |        |        |        |
     +-----+-----+-----+-----+-----+-----+-----+-----+
     |Go   |AOG  |Delay|Fuel |Injry|Reg  |Ins  |Bags |
     |Arnd |     |& OTP|Perf |     |Fine |Prem |     |
     +-----+-----+-----+-----+-----+-----+-----+-----+
```

## What Gets Built

### 1. New Component: `src/components/slides/LineOfSightTree.tsx`

A full-screen SVG + HTML hybrid visualization:

**Three horizontal rows of nodes:**
- **Top row**: 3 stakeholder cards (CFO, CEO, COO), each containing their 3 lagging metrics
- **Middle row**: 6 leading measure nodes (compact pills showing label + current value)
- **Bottom row**: 8 use case nodes (compact cards showing label + current input value)

**Connection lines (SVG):**
- Lines from use case nodes to leading measure nodes, based on `impactOnMeasures` weights
- Lines from leading measure nodes to executive outcome nodes, based on `metric.weights`
- Line thickness proportional to the weight value
- Line color reflects the stakeholder (emerald for CFO connections, amber for CEO, sky for COO)
- Lines animate/highlight on hover of any node, dimming unrelated paths

**Interactive behavior:**
- Hovering a use case highlights all paths upward to the executive outcomes it impacts
- Hovering an executive metric highlights all paths downward to the use cases that drive it
- Hovering a leading measure highlights both directions
- Current computed values display on each node (reusing the same state from the calculator)
- Nodes with improvement from baseline show a green glow

### 2. Modified: `src/pages/LineOfSightPage.tsx`

Add a view toggle (two buttons: "Calculator" / "Tree View") at the top of the page. Both views share the same `useCaseValues` and `airlineProfile` state, so adjustments in the calculator are reflected in the tree and vice versa.

### 3. Modified: `src/components/slides/SlideLineOfSight.tsx`

Extract the state management (`useCaseValues`, `airlineProfile`, computed values) up to the page level so both the calculator and tree views can share it. The component receives these as props instead of managing them internally.

## Technical Approach

**Node positioning**: Use a responsive grid layout. Each row is a flex container. Nodes are positioned with refs, and a `useLayoutEffect` reads their bounding rects to compute SVG line endpoints.

**SVG overlay**: An absolutely-positioned SVG layer sits behind the nodes, drawing curved paths (`<path>` with cubic bezier) between connected nodes. Lines use `stroke-width` proportional to weight (e.g., weight 0.5 = 3px, weight 0.1 = 1px).

**Hover highlighting**: On hover, set a `highlightedNode` state. All connections involving that node get full opacity; others fade to 10% opacity. A CSS transition makes this smooth.

**Responsiveness**: On smaller screens, the tree scrolls horizontally or scales down. The SVG recalculates on window resize.

## Files Changed

| File | Change |
|------|--------|
| `src/components/slides/LineOfSightTree.tsx` | **Create** -- Tree visualization component (~250 lines) |
| `src/pages/LineOfSightPage.tsx` | **Modify** -- Lift state up, add Calculator/Tree toggle |
| `src/components/slides/SlideLineOfSight.tsx` | **Modify** -- Accept shared state as props instead of internal state |

## State Architecture

```text
LineOfSightPage (owns state)
  |-- useCaseValues: Record<string, number>
  |-- airlineProfile: AirlineProfile
  |-- computed leadingValues, totalCostAvoidance
  |
  +-- [Calculator View] SlideLineOfSight (receives props)
  +-- [Tree View] LineOfSightTree (receives props)
```

Both views stay in sync because they share the same state from the parent.

