

## Bring the Executive Pitch into the PPTX export — same quality bar as the Technical Deep Dive

### Current state

The existing PPTX pipeline (`src/exporters/pptx/buildTechnicalDeck.ts` + `src/exporters/pptx/index.ts` + `src/lib/pptxBrand.ts`) ships **only one deck**: `tech-deep-dive`. The Executive Pitch (`/pitch-executive`) and Executive Pitch v2 (`/pitch-executive-2`) have no PPTX download path, even though they share several slides with the tech deck (Operating Model, Use Cases, Maturity Curve, etc.).

The user wants the Exec deck exported as PPTX with the **same fidelity** the tech deck has today — branded chrome, native vector content (cards, pills, stat tiles, DTOP overlays), no flat screenshot dumps.

### Scope: which Exec deck?

Two pages exist. They share ~70% of slides. To avoid duplicating effort, we ship **one Exec PPTX builder** that mirrors the **v2 deck (`/pitch-executive-2`)** because v2 is the current active pitch and is broader (11 slides vs 9, includes Before/After, Operating Model, Platform, Use Cases, Transformation, Value Pyramid, AI Vision, Maturity, Customer Outcomes). v1's unique slides (Problem waterfall, Shift, DTOP grid) are added as optional inserts so a single builder can satisfy both narratives.

### Approach — exact same pattern as the tech deck

Follow the tech-deck blueprint to the letter:

1. **One builder file**, `src/exporters/pptx/buildExecutiveDeck.ts`, structured identically to `buildTechnicalDeck.ts`:
   - Imports from `@/lib/pptxBrand` (`addBrandMaster`, `addCard`, `addStatTile`, `addCalloutBanner`, `addDtopPills`, `addLabeledCard`, `addPillRow`, `addIconBadge`, `addSectionDivider`, `addGlowWash`, etc.)
   - Same `SlideSpec` shape, same `chrome()` helper, same `header()` helper, same `CONTENT_TOP/BOTTOM` rails.
   - Both light + dark logo variants loaded via `loadImageAsBase64`, threaded through `ctx`.
   - `composed: SlideSpec[]` final order to mirror the live web deck exactly.
2. **Register the deck** in `src/exporters/pptx/index.ts`:
   - Extend `DeckId` to `"tech-deep-dive" | "executive-pitch"`.
   - Add `"executive-pitch": { filename: "Comply365-Executive-Pitch.pptx", label: "Executive Pitch", build: buildExecutiveDeck }`.
3. **Wire the download button** into both Executive Pitch pages by adding `<DeckPPTXExportButton deckId="executive-pitch" />` (and the existing PDF button) to the title slide in the same way `TechSlideOpener` exposes them on the tech deck — passed through `exportSlides` so the same component handles both PPTX and PDF.

### Per-slide rebuild plan (native vector, not screenshots)

Each slide is rebuilt natively in pptxgen using the same primitives the tech deck uses. No `renderToImage`/screenshot fallback — that's how we keep parity with the tech deck quality.

| # | Web slide | PPTX strategy |
|---|---|---|
| 1 | **Title** (`ExecSlide0Title`) | `addBrandHero`-style cover: eyebrow "The Operational Performance Platform", display headline with `title-accent` analogue (primary-coloured "performance"), subline, and 3-tile trust bar (`addStatTile` for 550+ Airlines / ~2.5M Users / 6 Continents). |
| 2 | **Before — Strategic Shift** (`Exec2Slide1Before`) | 2-column: left = stat block "Disconnected operations", right = bulleted `addLabeledCard` of `beforeItems`. Replace SVG fragmentation graphic with a `addGlowWash` + 4 small dotted-line shapes drawn natively (4 shapes, no image). |
| 3 | **After** (`Exec2Slide2After`) | Mirror of slide 2, emerald accent. Native cards + connector arrows via `addStepArrow`. |
| 4 | **DTOP Operating Model** (`Slide3OperatingModel`) | Reuse the **existing tech-deck DTOP block** pattern: 4 horizontal cards (D/T/O/P) with `addIconBadge` letter chips in canonical sky/amber/purple/emerald, plus the operating-model narrative as `addCalloutBanner`. Same look as `regulationSummarySpec` strip. |
| 5 | **The Platform** (`ExecSlide3Platform`) | Embed `platform-ecosystem.png` (already a static PNG per memory) on the left at proportional size; right column = 4 `addLabeledCard`s for Intelligence Layer + 3 modules with their canonical accent colours. |
| 6 | **Use Cases** (`SlideUseCases`) | Reuse the tech deck's `byLabel("Use Cases")` spec verbatim — already a polished native layout. Cleanest possible parity. |
| 7 | **The Transformation** (`Slide4Transformation`) | 3-column "From → To" cards using `addLabeledCard` with accent strip; bottom `addCalloutBanner` for the transformation tagline. |
| 8 | **Performance Ladder / Value Pyramid** (`Slide4ValuePyramid`) | Native pyramid drawn with 4 stacked `triangle`/`trapezoid` shapes (pptxgen supports `shape: "trapezoid"`); right column = tier descriptions via `addLabeledCard`. |
| 9 | **Intelligence Journey / AI Vision** (`SlideAIVision`) | Same pattern as the tech deck's Insights & Intelligence spec — 4 tier cards across with accent badges + a `addCalloutBanner`. |
| 10 | **Maturity Roadmap** (`Slide5MaturityCurve`) | Reuse the tech deck's existing **two-slide split** (`Maturity Roadmap · Curve & Behaviour` + `Maturity Roadmap · Results & Value`) — already the gold-standard PPTX representation of this animated web slide. |
| 11 | **Customer Outcomes** (`CustomerOutcomesSlide`) | 4-card grid: each card uses `addIconBadge` + headline + 3-line "signal → action → result" stack (`addCheckRow`-style rows). Bottom CTA banner linking to the Calculator (text only). |
| + | **Closing / Why Comply365** | Reuse tech deck's `whyOnlyComply365Spec` + `ctaSpec` for a consistent close. |

Optional extras pulled from v1 deck (insertable behind the same builder):
- **The $47M Problem** (`ExecSlide1Problem`) — native horizontal bar waterfall using `slide.addShape("rect")` per use case with values from `useCases` (same data already imported in the tech builder).
- **Why Comply365** (`ExecSlide6WhyUs`) — 3 differentiator cards + 3 trust stats. Reuse tech deck's "Why Comply365" spec.

### Visual fidelity rules (carried from the tech deck)

- All cards = `addCard`/`addLabeledCard` with semantic fills.
- All step pills (DTOP, layer, status) = `addPill` / `addPillRow` / `addDtopPills`.
- All stat callouts = `addBrandStatBlock`.
- All hero/banners = `addCalloutBanner` + `addGlowWash`.
- Section dividers = `addSectionDivider` with eyebrow/index.
- Chrome on every slide = `addBrandMaster` (variant-aware logo, footer, slide N of M, optional grid).
- Section dividers and any light-variant slides use `logoLight` (the proportion + variant fix already shipped).
- **No screenshots, no rasterised slide images.** Anywhere a web slide uses an SVG illustration we substitute a native pptxgen recreation — except `platform-ecosystem.png`, which is already a PNG asset and embeds cleanly.

### Files touched

**New**
- `src/exporters/pptx/buildExecutiveDeck.ts` — full builder, ~1500 lines, pattern-identical to `buildTechnicalDeck.ts`.

**Edited**
- `src/exporters/pptx/index.ts` — add `"executive-pitch"` to `DeckId` and `DECK_BUILDERS`.
- `src/pages/ExecutivePitch.tsx` — add a small toolbar (or pass `exportSlides`) to surface `<DeckPPTXExportButton deckId="executive-pitch" />` + the existing PDF export button on the title slide.
- `src/pages/ExecutivePitch2.tsx` — same wiring on the v2 title slide.
- `src/components/exec-slides/ExecSlide0Title.tsx` — accept and render optional export buttons (mirroring `TechSlideOpener`).

**Not touched**
- `src/lib/pptxBrand.ts` — no new primitives needed; existing helpers cover every Exec slide.
- `buildTechnicalDeck.ts` — unchanged; the Exec builder reuses *patterns*, not the file.
- All web slides — rendered output stays identical.

### QA (mandatory, mirrors the tech-deck QA gate)

1. Build `Comply365-Executive-Pitch.pptx`, convert to PDF via LibreOffice, render every slide at 150 DPI.
2. For each slide, verify against the live web slide: layout, hierarchy, accents, footer/logo position, no clipping or overlap.
3. Confirm DTOP cards use canonical colours (sky `#0EA5E9` / amber `#F59E0B` / purple `#A855F7` / emerald `#10B981`) — same tokens as the tech deck.
4. Confirm logo proportions (9.65:1) on dark **and** light slides; no squashing, no invisible white-on-white.
5. Confirm slide number / footer chrome consistent across all slides.
6. Run a content-text check (`markitdown`) for typos or missing copy vs the web `slides[]`.

### Out of scope

- No PPTX export for Operational Pitch, Technical Deep Dive (already shipped), or any playbook (Regulation, CoAnalyst, etc.).
- No copy rewrites — every string lifted from the existing slide components / data files.
- No new brand primitives in `pptxBrand.ts`.
- No animated transitions (PPTX cannot reliably reproduce them — the static native layout is the substitute, same approach used for the Maturity Roadmap split).

