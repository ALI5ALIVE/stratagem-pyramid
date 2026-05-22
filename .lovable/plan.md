## Fix PPTX arrows

The downloaded PPTX shows arrows that don't match the source slide. Two issues:

### 1. Wrong arrow targets

The source slide only draws one short arrow per AI solution, pointing right into the ContentManager365 column. My data file added cross-column targets (Training Records, Safety Reports, etc.) that aren't visible in the source.

Correct source mapping (1 arrow each):
- CoAnalyst → Forms
- CoAuthor → Authoring
- Qvery BI & Dashboards → Reporting (ContentManager365)
- AI Assistant → Distribution
- CoTrainer → (no target — arrow stub only)
- AI Agents → (no target — arrow stub only)
- No AI → (no arrow)

### 2. pptxgenjs line bug

`slide.addShape("line", { w: dx, h: dy })` fails when `dx` or `dy` is negative — the arrow renders backwards or invisibly. Fix by using absolute `w`/`h` plus `flipH` / `flipV` based on direction sign.

### Changes

- `src/data/aiInfographic.ts` — reduce each solution's `targets` to the single matching ContentManager365 row; CoTrainer / AI Agents / No AI get `targets: []`.
- `src/exporters/pptx/buildAIInfographicDeck.ts` — rewrite arrow drawing helper to use abs dimensions + `flipH`/`flipV`. Also draw a short "stub" arrow for solutions with no target (matches source visual).
- `src/components/ai-infographic/AICapabilitiesMatrix.tsx` — web matrix already uses SVG paths so it will update automatically from the data change. No other code edits needed.

### Out of scope

Visual styling of the page; only the arrow mapping + PPTX rendering bug.
