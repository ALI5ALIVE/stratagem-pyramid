# Add "confined intelligence" nuance to Customer Footprint slides

## Problem

The new Week 3 footprint slides (`SEFootprintSingleApp`, `SEFootprintTwoApps`, `SEFootprintAllThree`, `SEFootprintValueLadder`) currently imply that platform capabilities — **Insights & Recommendations**, **Automation**, **CoAnalyst**, **Unified Mobile** — only become available once the customer owns all three foundation apps. That's wrong and undersells the proposition.

Reality: a single-app or two-app customer **does** get those capabilities — but **confined to the discipline(s) they own**. CoAnalyst on a Safety-only footprint answers safety questions brilliantly but can't reason across to procedure or training. Insights surface patterns inside Safety but can't recommend a procedure update or a targeted retraining. Automation can route a safety report but can't trigger a content revision or a training assignment. That nuance is both more honest and a stronger expansion narrative: *"You're already getting platform-grade intelligence — you're just getting it inside one lane. The next app widens the lane."*

## Changes

### 1. `SEFootprintSingleApp.tsx` — add a "Platform capabilities you DO get (confined)" row to each of the 3 columns

Insert a new block between **Value captured today** and **Loop that won't close**:

- **Safety only** — "CoAnalyst answers safety questions on your safety data. Insights surface patterns in your reports. Automation routes and assigns within Safety. All confined to the safety lane — they can't reach procedures or crews."
- **Content only** — "CoAnalyst answers procedural and regulatory questions. Insights surface content gaps and version drift. Automation handles distribution and acknowledgement. All confined to the content lane — no signal layer feeding it, no training loop closing behind it."
- **Training only** — "CoAnalyst answers competency and qualification questions. Insights surface training gaps and risk concentrations. Automation handles assignment and reminders. All confined to the training lane — disconnected from the procedures and signals that should drive what's trained."

Keep existing **Loop that won't close** + **Discovery questions** + **Left on the table** intact. Tighten copy density slightly so the column still fits without scroll on 1379×865.

### 2. `SEFootprintTwoApps.tsx` — same pattern, "confined to two lanes"

Add a "Platform capabilities you DO get (across two lanes)" block per column:

- **Safety + Content** — "CoAnalyst, Insights and Automation operate across signals and procedures. The training lane is dark — no targeted retraining, no competency evidence."
- **Safety + Training** — "CoAnalyst, Insights and Automation operate across signals and competency. Procedures stay static — intelligence can't update the manual."
- **Content + Training** — "CoAnalyst, Insights and Automation operate across procedures and competency. The signal layer is missing — intelligence has nothing operational to react to."

### 3. `SEFootprintAllThree.tsx` — reframe so it doesn't imply capabilities arrive only now

Add one short banner above the four-layer grid:

> "These capabilities aren't new at this stage — your customer already has them inside whichever apps they own. What changes at three apps is **scope**: now CoAnalyst, Insights and Automation can reason and act across the whole DTOP loop, not one lane of it."

No structural change to the four-layer grid.

### 4. `SEFootprintValueLadder.tsx` — clarify rung labels

Update the rung sub-labels so the ladder doesn't read as "no intelligence until rung 4":

- 1 app (~25%) — "Foundation in one lane + platform capabilities **confined to that lane**"
- 2 apps (~55%) — "Half-loop + platform capabilities across **two lanes**"
- 3 apps (~75%) — "DTOP loop closed + platform capabilities across **all three lanes**"
- 3 apps + Intelligence layer (100%) — "Loop closes **and learns** — cross-lane reasoning, recommendations, automated orchestration"

Keep the disclaimer ("directional, not contractual") in place.

### 5. Narration updates in `src/data/salesEnablementNarration.ts`

For `se-footprint-single`, `se-footprint-two`, `se-footprint-all`, `se-footprint-ladder`: amend the **Pain → Value pivot** and **How to deliver it** sections to coach the rep on this nuance explicitly. Key teaching line to add to all four:

> "Don't tell a single-app customer they get nothing intelligent until they buy more. They already get CoAnalyst, Insights and Automation — inside the lane they own. Your job is to show them the lane is narrower than the problem."

Keep the 5-part structure, ~60–90s per slide.

## Out of scope

- No changes to `SEFootprintIntro` or `SEFootprintPlaybook` (concepts already neutral on this point).
- No changes to Week 1/Week 2 slides.
- No Academy quiz changes — current questions don't conflict with the nuance.
- No PPTX exporter or memory updates needed.

## Files touched

- `src/components/sales-enablement-slides/SEFootprintSingleApp.tsx`
- `src/components/sales-enablement-slides/SEFootprintTwoApps.tsx`
- `src/components/sales-enablement-slides/SEFootprintAllThree.tsx`
- `src/components/sales-enablement-slides/SEFootprintValueLadder.tsx`
- `src/data/salesEnablementNarration.ts`
