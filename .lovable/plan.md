## Goal

Restyle the AI Infographic PPTX export so it visually matches the **Executive Pitch · Medium** deck (the dark-themed branded look used across `buildTechnicalDeck` / `buildExecutivePitch3Deck`), instead of the current standalone light layout.

## What changes

Only `src/exporters/pptx/buildAIInfographicDeck.ts` is rewritten. Data, web route, and the `AICapabilitiesMatrix` component stay as-is.

### Adopt the shared deck chrome

- Import `chrome`, `header`, `CONTENT_TOP`, `CONTENT_BOTTOM` from `./buildTechnicalDeck` and `PPTX_BRAND`, `addCard`, `addEyebrow` helpers from `@/lib/pptxBrand`.
- Replace the hand-rolled background / title / footer with:
  - `paintBackground(slide, "dark")` via `chrome()` (dark brand master with grid, logo, page count, deck label).
  - `header(slide, "Platform", "AI Capabilities", "AI Solutions mapped to ContentManager365, TrainingManager365 and SafetyManager365 capabilities.")`.
- Pass `{ logo, logoLight, index: 0, total: 1 }` into `chrome()` after loading both logos (mirrors Exec3 builder).
- Deck label constant `"AI Capabilities"` so the footer label matches.

### Re-skin the 4-column matrix to dark brand

Same 4-column grid (AI Solutions + 3 product columns), but using brand tokens from `PPTX_BRAND.color` (`C.bg`, `C.surface`, `C.surfaceAlt`, `C.primary`, `C.ink`, `C.muted`, `C.border`):

- Column panels: `addCard(...)` with `fill: C.surface`, `border: C.border`, `radius` matching other decks.
- Column headers: filled pill in `C.primary` with white text (kept) but using `PPTX_BRAND.font.display` and the medium-deck font sizes (`fontSize: 13, bold`).
- AI solution chips: keep per-solution accent colors from `solutionColors[*].pptx` but render as `addCard` with a colored left border + dark fill (`C.surfaceAlt`) and white label, matching the "stat block" style used elsewhere in Exec3.
- Capability rows: `addCard` with `fill: C.surfaceAlt`, label in `C.ink` for AI rows and `C.muted` for non-AI rows; non-AI rows get a dashed/lighter border (`C.border`).
- Connector arrows: keep the existing `drawArrow` logic (with `flipH`/`flipV` fix) but recolor — AI arrows use `C.primary`, "No AI" stub uses `C.muted`.

### Legend + footnote

- Add a small legend row just above `CONTENT_BOTTOM`: two swatches ("AI-enabled capability" in `C.primary`, "Standard capability" in `C.muted`) — matches the web page footer and the medium-deck legend pattern.

### No behavior changes

- Still a single-slide deck, still registered as `"ai-infographic"` in `DECK_BUILDERS`, filename unchanged.
- `onProgress` calls unchanged.
- Web route and matrix component untouched.

## File touched

- `src/exporters/pptx/buildAIInfographicDeck.ts` — full rewrite to use shared dark chrome + brand tokens.