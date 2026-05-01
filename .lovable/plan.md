## Goal
Add a PDF export button to the Customer Overview deck title slide so it matches the Medium pitch pattern (PPTX + PDF side-by-side), and ensure the PDF always reflects the current `slides` array.

## Changes

### 1. `src/components/customer-overview-slides/COSlide0Title.tsx`
- Import `DeckPDFExportButton` alongside the existing `DeckPPTXExportButton`.
- Extend props to accept (all optional, only passed on slide index 0):
  - `exportSlides?: { id: string; label: string; component: React.ComponentType<any> }[]`
  - `pdfFilename?: string` (default `"Comply365-Customer-Overview.pdf"`)
  - `deckLabel?: string` (default `"Customer Overview"`)
- In the bottom-right export cluster, when `exportSlides?.length`, render `DeckPDFExportButton` next to the PPTX button (same vertical stack, PPTX on top, PDF below — mirroring Medium pitch).
- Keep the existing helper text chip ("Interactive slides export in their default view.").

### 2. `src/pages/CustomerOverview.tsx`
- On the title slide only (`index === 0`), spread:
  ```ts
  exportSlides: slides,
  pdfFilename: "Comply365-Customer-Overview.pdf",
  deckLabel: "Customer Overview",
  ```
  using the same conditional-spread pattern used in `ExecutivePitch3.tsx`.

## Why this approach
- Passing `exportSlides: slides` (the same array used for navigation) guarantees the PDF stays aligned to whatever slides are currently in the deck — no separate list to maintain.
- `DeckPDFExportButton` already handles 1920×1080 off-screen rendering, font loading, image waiting, and per-slide error fallback, so no new export logic is needed.
- PPTX deckId remains `"customer-overview"` (already wired in the exporter registry).

## Out of scope
- Operational, CoAnalyst, Roadmap, Sales Enablement decks (can be a follow-up if you want them).
- Any change to the PPTX export builder (`buildCustomerOverviewDeck.ts`).
- Visual restyle of the title slide.