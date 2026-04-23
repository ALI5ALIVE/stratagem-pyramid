

## PPTX export polish — pinpoint visuals + deeper Comply365 brand

### Goal

Keep everything that already works in the Technical Deep Dive `.pptx` and layer on three things:

1. **Pinpoint-accurate visualisations** — every diagram (Platform stack, DTOP loop, Maturity curve, Line-of-Sight cascade, Cost waterfall, Tiers comparison) matches the on-screen React component beat-for-beat.
2. **Deeper Comply365 brand identity** — real brand fonts, real logo, brand-coloured master template applied to every slide, and a recurring visual motif so the deck feels designed, not generated.
3. **No regressions** — every native, editable element stays editable; nothing gets flattened to an image.

### 1. Brand identity upgrade (`src/lib/pptxBrand.ts`)

**Typography**
- Replace `Calibri` placeholders with the real brand pairing: `Space Grotesk` (display) and `Inter` (body), with `Calibri` as the auto-fallback PowerPoint will substitute on machines without the brand fonts. Embed both fonts as base64 in the pptx via `pptx.theme` so PowerPoint renders them correctly even off-network.

**Colour system — extend, don't replace**
- Keep all existing tokens. Add: `gridLine` (faint surface grid), `glow` (primary @ 20% for accent washes), `tier1/tier2/tier3` (Reactive / Proactive / Predictive), `gradStart` / `gradEnd` for hero gradients, `dataViz1–6` for chart series so colours are deterministic.

**New shared chrome**
- `addBrandMaster(slide, variant)` — paints background, top hairline, top-right Comply365 logo, bottom footer, faint dotted grid in the safe area. One call replaces the 4 separate calls every builder makes today.
- `addBrandHero(slide)` — gradient bg + large Comply365 wordmark watermark at 8% opacity for title and section dividers.
- `addSectionDivider(slide, eyebrow, title)` — full-bleed dark slide that introduces an act (Foundations / Intelligence / Outcomes / Roadmap). Adds 4 of these to break the deck into chapters.
- `addBrandStatBlock(slide, x, y, w, h, value, label, accent)` — refined stat tile with subtle accent bar on the left.
- `addCalloutBanner(slide, x, y, w, h, text, accent)` — replaces the inconsistent "callout" rects used today.

**Visual motif (the new repeated brand element)**
- A 0.04" left accent bar in the brand primary on every card. Tiny, consistent, immediately recognisable. Carries across all 21 slides + future decks.

### 2. Pinpoint visualisation upgrades (`src/exporters/pptx/buildTechnicalDeck.ts`)

For each diagram, redraw natively to match the React source 1:1. No image fallback returns.

| Slide | Today | Upgrade |
|---|---|---|
| **3 Platform Overview** | 5 plain rects | Full architecture stack: 5 rounded layer bands with icon badges, layer numbers, capability sub-pills inside each layer (mirrors `PlatformArchitectureDiagram.tsx`) + DTOP "way of working" ribbon overlay on the right edge. |
| **2 Industry Challenge** | Bullet bars | True horizontal **waterfall** computed from `lineOfSightData.useCases`: each bar width proportional to `computescaledCostMidpoint`, sorted desc, value labels right-aligned, total bar in primary at the bottom, citation chip row beneath. |
| **8 CoAnalyst** | Pipeline cards | Add the 4-tier intelligence ladder (Historical → Reactive → Proactive → Predictive) as a stacked staircase with tier accuracy stats (35% generic AI vs 90% CoAnalyst) on the right. |
| **12 DTOP** | 4 step cards | Closed-loop visualisation: 4 step cards arranged in a rounded-rectangle loop with curved arrows between them and a centre "Continuous Improvement" hub. Audit-trail strip below each card stays. |
| **13 Tiers vs Generic AI** | Native table | Keep table, add capability heat-map cells (✓ in tier accent green, ✕ in danger red, "partial" in amber half-fill) and an accuracy gauge row at the bottom. |
| **16 Line of Sight** | Cascade table | True 3-tier **cascade diagram**: use-case nodes (left) → leading-measure nodes (middle) → executive-outcome nodes (right) connected by weighted Bezier-style segments built from `executiveOutcomes[].metrics[].weights`. Total exposure banner stays. |
| **17 Maturity Roadmap** | Swimlane | Curved 5-stage maturity arc (rises from Stage 1 to Stage 5) with stage cards docked beneath each plotted point — mirrors `MaturityCurveVisualization.tsx`. |
| **18 2026 Roadmap** | 3 columns | Add a horizontal timeline ruler across the top with H1/H2/2027+ markers, then drop the 3 phase cards onto it. |
| **0 Title** | Hero + stats | Add the Comply365 wordmark watermark, refine stat block to use new `addBrandStatBlock`, add subtle DTOP loop motif bottom-right at 15% opacity. |
| **All slides** | Mixed chrome | Apply `addBrandMaster` everywhere → consistent grid, footer, logo, and the new 0.04" left accent bar on every card. |

### 3. Structural polish

- Insert 4 lightweight **section divider slides** (Foundations / Intelligence / Outcomes / Roadmap) using `addBrandHero` — gives the 21-slide deck visible chapters without bloating it (final deck = 25 slides).
- Add a **"Sources & methodology"** appendix slide pulling from `sourceCitations` + `methodologyNote` in `lineOfSightData.ts` so every stat is traceable in the exported file.
- Footer gains a faint Comply365 mark left of the deck label for stronger brand presence on every page.

### 4. Quality assurance (mandatory)

After regenerating:

1. Trigger export from `/pitch-technical`.
2. Convert the `.pptx` to PDF (LibreOffice headless) → `pdftoppm` → JPEGs at 150 dpi.
3. Visually inspect every slide for: text overflow, card collisions, label overlap on cascade/waterfall, footer collisions, contrast on dark cards, alignment of the new accent bar.
4. Fix anything found, re-render, re-inspect. Repeat until a full pass is clean.
5. Confirm in PowerPoint that all text remains selectable and the new section dividers + cascade + waterfall + maturity arc are real shapes (not images).

### Files

**Edited**
- `src/lib/pptxBrand.ts` — new master/hero/divider/stat/banner helpers, font embedding, expanded colour tokens, accent-bar motif on existing card helpers.
- `src/exporters/pptx/buildTechnicalDeck.ts` — upgrade the 8 diagram slides above, add 4 section dividers, add appendix slide, swap every `paintBackground + footer + logo` trio for `addBrandMaster`.

**Untouched**
- `src/components/DeckPPTXExportButton.tsx`, `src/exporters/pptx/index.ts`, `src/exporters/pptx/renderToImage.ts`, all `TechSlide*.tsx` source components, the existing PDF exporter.

### Out of scope

- Other decks (Executive / Operational / CoAnalyst) — phase 2 once you sign off on the Tech deck visuals.
- Animations / transitions / speaker notes.
- Replacing any currently-working slide's content — this plan only enhances visuals and brand chrome.
- Re-introducing image fallbacks.

