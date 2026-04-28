# Customer Overview — Editable PowerPoint Export

## Goal
Bring Customer Overview to parity with the other PPTX-enabled decks (Technical Deep Dive, Executive Pitch, Executive Pitch · Medium): a "Download Editable PowerPoint" button on the title slide that builds a native, brand-consistent .pptx mirroring the on-screen deck slide-for-slide.

## Why this is small
The Customer Overview is built almost entirely from slides that already have native PPTX builders in the shared Tech registry (`slideSpecs` in `buildTechnicalDeck.ts`) plus the two unique reusable specs from Exec3 (`transformationSpec`, `customerOutcomesSpec`). Only **two CO-specific slides** (`COSlide0Title`, `COClosingFirst90Days`) need brand-new PPTX specs.

## Slide-by-slide mapping (11 slides, in CO order)

| # | On-screen slide | PPTX source |
|---|---|---|
| 0 | `COSlide0Title` (Title — "From cost centre to performance engine") | **NEW** `coTitleSpec` (mirror of Title slide layout) |
| 1 | `TechSlide2IndustryChallenge` | `byLabel("Industry Challenge")` |
| 2 | `TechSlide1StrategicShift` | `byLabel("Strategic Shift")` |
| 3 | `TechV4PlatformOverview` | `byLabel("Platform Overview")` |
| 4 | `Slide4Transformation` | `transformationSpec` (export from Exec3 builder) |
| 5 | `PFSlide9Value` | reuse Exec3 `valueSpec` if present, else use `byLabel("2026 Roadmap")` substitute → **see note below** |
| 6 | `SlideUseCases` | `byLabel("Use Cases")` |
| 7 | `TechSlideRegulationSummary` | `regulationSummarySpec` (already exported) |
| 8 | `CustomerOutcomesSlide` | `customerOutcomesSpec` (export from Exec3 builder) |
| 9 | `Slide5MaturityCurve` | `byLabel("Maturity Roadmap · Curve & Behaviour")` (use the existing maturity curve spec) |
| 10 | `COClosingFirst90Days` | **NEW** `co90DaysSpec` (3 phase cards + CTA) |

**Note on PFSlide9Value (slide 5):** I'll search the Tech registry for an existing "Value" / "Value Pillars" spec; if none exists with the right framing, I'll add one new minimal `valueSpec` modelled on the on-screen `PFSlide9Value`. This is a safe, contained addition.

## Technical changes

### 1. Promote two reusable specs from Exec3
In `src/exporters/pptx/buildExecutivePitch3Deck.ts`, change `const transformationSpec` and `const customerOutcomesSpec` to **`export const`** so the new CO builder can import them directly. No behaviour change.

### 2. New file `src/exporters/pptx/buildCustomerOverviewDeck.ts`
- Pattern after `buildExecutivePitch3Deck.ts` (compose specs by label, override deck label in footer to "Customer Overview").
- Imports `slideSpecs`, `regulationSummarySpec`, `chrome`, `header`, `CONTENT_TOP/BOTTOM`, `BuildOpts` from `buildTechnicalDeck`.
- Imports `transformationSpec`, `customerOutcomesSpec` from `buildExecutivePitch3Deck`.
- Defines two new `SlideSpec`s inline:
  - `coTitleSpec` — eyebrow ("THE OPERATIONAL PERFORMANCE PLATFORM"), large two-line title with accent, "Prepared for [Customer Name]" chip, three trust stats (550+, ~2.5M, 6) — same content as `COSlide0Title`.
  - `co90DaysSpec` — three phase cards (Days 1–30 Discovery, 31–60 Pilot, 61–90 Prove & Expand) using `addCard` + bullets, then a single full-width CTA card "Book a 60-minute discovery workshop". Reuses `addIconBadge` for the small step icons.
- Composes the 11 slides in the exact CO page order.
- Title doc metadata: `pptx.title = "Comply365 — Customer Overview"`.

### 3. Register builder in `src/exporters/pptx/index.ts`
- Extend `DeckId` union with `"customer-overview"`.
- Add a lazy entry to `DECK_BUILDERS`:
  ```
  "customer-overview": {
    filename: "Comply365-Customer-Overview.pptx",
    label: "Customer Overview",
    build: async (opts) => {
      const { buildCustomerOverviewDeck } = await import("./buildCustomerOverviewDeck");
      return buildCustomerOverviewDeck(opts);
    },
  }
  ```
- Keeps the lazy-load architecture intact (no preview regression).

### 4. Wire the download button into the CO title slide
- Update `src/components/customer-overview-slides/COSlide0Title.tsx`:
  - Import `DeckPDFExportButton` and `DeckPPTXExportButton`.
  - Below the trust stats, add a small action row identical in style to `ExecSlide0Title`:
    ```
    <DeckPDFExportButton ... />
    <DeckPPTXExportButton deckId="customer-overview" />
    ```
  - Hide via `print:hidden` so PDF/print export of the slide doesn't include the button (matches existing pattern).
- No changes needed in `src/pages/CustomerOverview.tsx` — the button lives inside the title slide.

## QA checklist
- `/customer-overview` renders unchanged; new buttons appear on the title slide and only trigger network/JS work on click (lazy-loaded).
- Click "Download Editable PowerPoint" → toast progresses through 11 slides → file downloads as `Comply365-Customer-Overview.pptx`.
- Open in PowerPoint and verify:
  - Slide 1 (Title) matches the on-screen layout (eyebrow, title with accent, stats row, "Prepared for [Customer Name]" chip).
  - Slides 2–4, 7, 10 (reused Tech specs) render with correct content and the bottom-left footer reads **"Customer Overview"** (overpaint pattern from Exec3).
  - Slide 5 (Transformation) and Slide 9 (Customer Outcomes) reuse the Exec3 specs cleanly.
  - Slide 11 (90 Days) shows three phase cards + CTA; no clipping.
- Other decks (`/pitch-technical-v4`, `/pitch-executive-3`, `/pitch-executive`) still export correctly — no shared-state regressions.

## Out of scope
- Changing on-screen Customer Overview content or layout.
- Updating the PDF export path (already works via `DeckPDFExportButton`; we only confirm it's present).
- Adding PPTX export for Operational Pitch / other persona decks (separate ask).
