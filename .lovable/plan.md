## Goal

Every customer-facing pitch deck gets a "Download Editable PowerPoint" button on its title slide that produces a native, hand-built, branded PPTX — same quality bar as the existing Technical Deep Dive (`buildTechnicalDeck.ts`) and Executive Pitch (`buildExecutiveDeck.ts`).

## Scope — 5 decks

The two decks already covered are kept as-is (verified against current on-screen content). New builders to add:

| Deck | Page | Slides | New builder |
|---|---|---|---|
| Technical Deep Dive **V4** | `/pitch-technical-v4` | 28 | `buildTechnicalV4Deck.ts` |
| Executive Pitch **2** | `ExecutivePitch2.tsx` | 11 | `buildExecutivePitch2Deck.ts` |
| Executive Pitch **3** (Medium) | `ExecutivePitch3.tsx` | 18 | `buildExecutivePitch3Deck.ts` |
| Operational Pitch | `OperationalPitch.tsx` | 12 | `buildOperationalPitchDeck.ts` |
| CoAnalyst Deck | `CoAnalystDeck.tsx` | 15 | `buildCoAnalystDeck.ts` |

Plus refresh passes on the existing two:

| Deck | Existing builder | Refresh work |
|---|---|---|
| Technical Deep Dive (V1) | `buildTechnicalDeck.ts` | Audit against current on-screen slides; reconcile any drift (e.g. `TechSlideWhyComply`, Insights, Mobile recently edited). |
| Executive Pitch (V1) | `buildExecutiveDeck.ts` | Same audit — confirm DTOP framing, CoAnalyst 90% vs 35% headline, roadmap dates and trust signals all match memory. |

Out of scope (no PPTX): the internal playbooks — Platform Playbook, DTOP Playbook, Insights / Automation / Mobile Playbooks, Regulation Management Playbook, Roadmap Deck, Persona Deep Dive, Sales Enablement / Academy. (Per your selection of "customer-facing pitch decks only".)

## Approach — pattern reused from Technical Deep Dive

Each new builder mirrors the proven structure in `buildTechnicalDeck.ts`:

- `pptxgenjs` 13.33×7.5" 16:9, branded master via `addBrandMaster` (dark / light variants, page numbers, deck label, footer).
- Reusable helpers from `src/lib/pptxBrand.ts`: `addCard`, `addLabeledCard`, `addPillRow`, `addStatTile`, `addBrandStatBlock`, `addCalloutBanner`, `addGlowWash`, `addEyebrow`, `addSectionTitle`, `addDtopPills`, `addDivider`, `loadImageAsBase64`.
- Section-divider slides for multi-act decks (Layer dividers in Tech V4, Journey dividers in Operational Pitch).
- DTOP color tokens locked to memory (D blue · T amber · O violet · P emerald).
- Trust signals, accuracy stats and roadmap dates pulled from the same `src/data/*` modules the React slides use, so PPTX and on-screen never drift.
- Image assets (`platform-ecosystem.png`, logos) embedded as base64 via `loadImageAsBase64` — never path references.

Each builder is registered in `src/exporters/pptx/index.ts` under a new `DeckId`:

```text
"tech-deep-dive-v4" | "executive-pitch-2" | "executive-pitch-3"
| "operational-pitch" | "coanalyst"
```

The shared `<DeckPPTXExportButton deckId="…" />` component is dropped into each deck's title/opener slide, next to the existing `DeckPDFExportButton` (same pattern as `TechSlideOpener.tsx`).

## File-level changes

**New**
- `src/exporters/pptx/buildTechnicalV4Deck.ts`
- `src/exporters/pptx/buildExecutivePitch2Deck.ts`
- `src/exporters/pptx/buildExecutivePitch3Deck.ts`
- `src/exporters/pptx/buildOperationalPitchDeck.ts`
- `src/exporters/pptx/buildCoAnalystDeck.ts`

**Edited**
- `src/exporters/pptx/index.ts` — register the 5 new builders, expand the `DeckId` union.
- `src/exporters/pptx/buildTechnicalDeck.ts` — content audit (no structural rewrite).
- `src/exporters/pptx/buildExecutiveDeck.ts` — content audit.
- Title slides for the new decks (one button per deck):
  - `src/pages/TechnicalDeepDiveV4.tsx` — pass `deckId="tech-deep-dive-v4"` to the opener.
  - `src/components/exec-slides/v2/Exec2Slide0Title.tsx` (or wherever its title is) — add button.
  - `src/components/exec-slides/v3/...Title.tsx` — add button.
  - `src/components/ops-slides/OpsSlide0Title.tsx` — add button.
  - `src/components/coanalyst/CoAnalystTitleSlide.tsx` — add button.

## Testing & QA process per deck

Because two of these builders will end up multi-thousand-line files, I'll verify each one before moving on, not in a big-bang at the end. For every deck:

1. Build the deck in-app, download the `.pptx`.
2. Save to `/mnt/documents/`, then convert to PDF with LibreOffice and PDF→JPG with `pdftoppm` (per the pptx skill QA workflow).
3. Read every slide image and check for: text overflow, overlapping shapes, missing logos/images, wrong DTOP colors, stale stats, broken layouts, missing page numbers.
4. Cross-check headline numbers against memory (CoAnalyst 90% vs 35%, $25–35B exposure, roadmap dates, trust signals — no spaces in product names).
5. Fix issues, re-export, re-verify until a clean pass.
6. Report per-deck QA summary back to you (issues found + fixes applied).

A deck is not marked done until step 6 completes with zero open issues.

## Effort & sequencing

These are large, content-dense builders. I'll deliver them in this order so the highest-stakes ones land first and you can review incrementally:

1. **Executive Pitch 3 (Medium)** — your current "send to a CXO" deck; reuses many V4 slide concepts so groundwork carries forward.
2. **Technical Deep Dive V4** — biggest deck; benefits from groundwork laid by #1.
3. **Operational Pitch** — middle-management narrative.
4. **CoAnalyst Deck** — long but mostly text/messaging slides, fast to build once helpers are in place.
5. **Executive Pitch 2** — older variant, smallest scope.
6. **Audit pass on the existing Tech V1 + Exec V1 builders** to make sure they still match on-screen content.

Each deck will land as its own change so you can review and download-test before I move on.

## Notes / risks

- These builders are static native PPTX. They mirror the on-screen design but won't reproduce live interactivity (e.g. the Line of Sight Calculator, Daily Reality email-client). Those slides will show the default/expanded state, same as the existing Tech deck handles them.
- Builders pull copy from shared data modules (`lineOfSightData`, `platformPlaybook`, `coanalystData`, etc.) wherever those exist. Any slide whose copy is hardcoded in the React component will have its strings duplicated into the builder — those are the slides most likely to drift, and they're the ones I'll re-audit on every future content change.
- No backend, schema, auth, or routing changes. Pure client-side export work.
