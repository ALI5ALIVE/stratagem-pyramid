## Update Executive Pitch · Medium PPTX export to match the new on-screen flow

### Why
The on-screen `ExecutivePitch3` deck (`/pitch-executive-3`) has been reordered and reshaped over the last several edits, but the PPTX exporter (`src/exporters/pptx/buildExecutivePitch3Deck.ts`) still produces the old deck. Result: the downloadable PowerPoint no longer matches what users see on screen — wrong order, missing/extra slides, wrong "Insights" slide variant, and an outdated "What This Means for Customers" position.

### Current on-screen order (source of truth — `src/pages/ExecutivePitch3.tsx`)

```text
 1. Title (TechSlideOpener)
 2. Strategic Shift
 3. Customer Outcomes  ← "What This Means for Customers"
 4. The Platform (Platform Overview)
 5. ▸ DTOP (divider)
 6. DTOP — System of Work
 7. ▸ Mobile (divider)
 8. Unified Mobile
 9. ▸ Intelligence Layer (divider)
10. Automation
11. Insights — Just Ask  (IRSlide2WhatIs, showWorkflow=true,
                          title "The Platform · Insights & Intelligence")
12. CoAnalyst
13. CoAnalyst vs Generic AI
14. Recommendations & Prescriptive Actions
15. ▸ Regulation Management (section divider)
16. Regulation Management
17. ▸ 2026 Phased Roadmap (section divider)
18. 2026 Phased Roadmap
19. Why Comply365
```

### Current PPTX exporter order (wrong)
The current `composed[]` in `buildExecutivePitch3Deck.ts` produces 18 slides in a stale sequence:
- Customer Outcomes is at the END (should be #3, right after Strategic Shift).
- "Industry Challenge" is included (no longer in the deck).
- Includes a `transformationSpec` ("The Transformation") slide that isn't in the on-screen deck.
- DTOP is placed AFTER the Intelligence Layer (should be FIRST layer after Platform).
- Mobile is placed AFTER DTOP (should be SECOND layer).
- Intelligence Layer ordering inside is wrong: should be Automation → Insights ("Just Ask") → CoAnalyst → CoAnalyst vs Generic AI → Recommendations.
- Uses generic "Insights & Intelligence" tech-deck spec instead of the new "Insights — Just Ask" workflow slide (`IRSlide2WhatIs` with `showWorkflow`).
- Missing the Regulation Management section divider.
- Missing the 2026 Phased Roadmap section divider.

### Changes

Edit only `src/exporters/pptx/buildExecutivePitch3Deck.ts`.

#### 1. Reorder and prune the `composed` array to exactly mirror the 19-slide on-screen flow above.

Remove:
- `byLabel("Industry Challenge")`
- `transformationSpec` (and its export — keep the function defined for now but stop including it; safe either way)

Add / reposition:
- Move `customerOutcomesSpec` to position #3 (after Strategic Shift).
- Reorder layer dividers: DTOP first, then Mobile, then Intelligence.
- Reorder Intelligence-layer slides to: Automation, Insights (Just Ask), CoAnalyst, CoAnalyst vs Generic AI, Recommendations & Prescriptive Actions.
- Add a Regulation Management section divider before the regulation summary.
- Add a 2026 Phased Roadmap section divider before the roadmap slide.

#### 2. Renumber and re-caption the layer dividers
The on-screen dividers no longer expose layer numbers (`hideLayerNumber: true`). Update the three exec3 divider definitions so their `layerNumber` values reflect the new presentation order (DTOP=1, Mobile=2, Intelligence=3) and rely on the existing `layerDividerSpec` which already supports `hideLayerNumber`. If `layerDividerSpec` does not currently support hiding the number, pass through `hideLayerNumber: true` (verified during implementation in build mode by reading `buildTechnicalDeck.ts`).

#### 3. Add two new section divider specs (Regulation, Roadmap)
Mirror `TechSlideSectionDivider`'s look used on screen:
- Regulation: eyebrow "Section · Regulation in motion", title "Regulation Management", tagline about turning regulatory change into traceable updates, accent violet.
- Roadmap: eyebrow "Section · What's next", title "2026 Phased Roadmap", tagline about Insights/Automation/Mobile through 2026, accent amber.

These can be small inline `SlideSpec`s in `buildExecutivePitch3Deck.ts` reusing `chrome`, `paintBackground`, `addEyebrow`, and existing brand helpers — no new shared module needed.

#### 4. Render the "Insights — Just Ask" slide as its own spec
The current generic "Insights & Intelligence" spec in the tech registry doesn't represent the new on-screen workflow card grid. Add a new local `insightsJustAskSpec: SlideSpec` in `buildExecutivePitch3Deck.ts` that renders:
- Header: title "The Platform · Insights & Intelligence" / subtitle "A platform-wide intelligence capability — just by asking".
- The one-liner pitch card.
- The Ask / Get back two-column example block.
- The 6-stage "How it works · behind the answer" workflow row (Plain-English question → Connected operational data → Domain knowledge graph → Domain-trained reasoning → Guardrails & audit trail → Insight + Recommended Action) using the same color tokens used in `IRSlide2WhatIs.tsx`.

This keeps the PPTX visually faithful to the on-screen slide.

#### 5. Update progress labels & deck title
- `pptx.title` already says "Executive Pitch (Medium)" — keep.
- Make sure `opts.onProgress` labels reflect the new slide labels (handled automatically since each spec carries its own `label`).

### Files edited
- `src/exporters/pptx/buildExecutivePitch3Deck.ts` — reorder `composed[]`, add Regulation + Roadmap section divider specs, add `insightsJustAskSpec`, drop `Industry Challenge` and the unused `transformationSpec` from the composition, adjust divider numbering.

### QA plan
After implementation, in build mode:
1. Click "Download Editable PowerPoint" on the Executive Pitch · Medium title slide.
2. Convert the resulting `.pptx` → PDF → JPGs and visually inspect each slide.
3. Verify slide count = 19 and order matches the table above.
4. Verify the Insights slide shows the 6-stage workflow row and correct title.
5. Verify Customer Outcomes appears as slide #3.
6. Verify Regulation and Roadmap section dividers render with the correct accents.

### Out of scope
- No changes to the on-screen React deck.
- No changes to the shared Tech V4 specs or other decks (Exec, Customer Overview, Tech Deep Dive).
