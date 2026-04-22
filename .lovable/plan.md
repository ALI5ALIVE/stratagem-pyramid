

## Fix: Rebuild PPTX export with full editable content + better visuals

### What's wrong today

`buildTechnicalDeck.ts` uses `imageFallbackSlide(...)` for **17 of 22 slides**. That captures the React component to a 2× PNG via html2canvas and embeds it as a single locked image with a caption. Result:

- Most slides are flattened screenshots — no editable text in PowerPoint.
- Captures are often blurry, clipped, or missing typography because off-screen html2canvas misrenders.
- Brand styling is inconsistent (image bleed, dark caption strip, no real grid).

The user wants **real content** in every slide — bullets, cards, stats, tables, DTOP pills — selectable and editable in PowerPoint.

### Approach

Rewrite **every slide** in `buildTechnicalDeck.ts` as a native pptxgenjs composition. Pull the source-of-truth content arrays directly from each `TechSlide*.tsx` (and shared data files like `lineOfSightData.ts`) and reproduce them with brand-styled rectangles, text boxes, pills, and stat tiles. Drop `renderComponentToPng` and `imageFallbackSlide` entirely from this deck.

### Visual upgrades to the brand kit

Edit `src/lib/pptxBrand.ts` to add:

- `addEyebrow(slide, x, y, w, text, color)` — uppercase tracked label.
- `addSectionTitle(slide, ...)` — consistent 28pt display titles across all slides.
- `addIconBadge(slide, x, y, size, color, glyph)` — coloured rounded square with a unicode glyph (replaces lucide icons for native rendering).
- `addLabeledCard(slide, x, y, w, h, { eyebrow, title, body, accent })` — single card primitive used by ~12 slides.
- `addPillRow(slide, x, y, w, items)` — horizontal pill row (used for data sources, tags).
- `addCheckRow(slide, x, y, w, label, ok)` — green check / red X rows (Tiers vs Generic AI).
- `addStepArrow(slide, x, y)` — 0.3" right-pointing chevron between cards.
- Add a subtle gradient background option `paintBackground(slide, "dark-grad")` for hero slides.

### Slide-by-slide native rebuild

| # | Slide | Native composition |
|---|---|---|
| 0 | Title | Hero typography + 3 trust stats + DTOP pill row at bottom (already native — refine spacing) |
| 1 | Strategic Shift | Two-column "Today vs Tomorrow" with bullet lists + 4-card driver grid below |
| 2 | Industry Challenge | 4 pain-point cards row + cost-waterfall as native horizontal bars (computed from `lineOfSightData.useCases`) + total banner |
| 3 | Platform Overview | 5-layer architecture stack (rect per layer with color band) + 3 module cards + DTOP pill row |
| 4 | SafetyManager365 | 2-col: capability cards grid (left) + numbered data-flow steps with chevrons (right) |
| 5 | ContentManager365 | Same template as #4, content swapped |
| 6 | TrainingManager365 | Same template as #4, content swapped |
| 7 | Data Foundation | 4 source pills → unified DB block → 3 capability pillar cards → governance row |
| 8 | CoAnalyst | Master message banner + 5 pipeline cards + 3 architecture rows + 2 stat tiles (already partially native — extend) |
| 9 | Insights | 3 capability cards + 4-step worked example timeline with chevrons |
| 10 | Automation | 4 pipeline cards with chevrons + worked example bar + 2 callouts |
| 11 | Mobile | 3-col layout: hero device card + capability checklist + offline/AR features |
| 12 | DTOP | 4 step cards + audit trail strip (already native — refine) |
| 13 | Tiers vs Generic AI | Capability comparison **table** (native pptx table) + accuracy stats + risk callout |
| 14 | Use Cases | 3-column grid by tier (Reactive/Proactive/Predictive) with 3-4 cards each |
| 15 | Platform Integrations | 3 case-study cards with metrics |
| 16 | Line of Sight Calculator | 3-column cascade table from `lineOfSightData` (use cases → leading measures → outcomes) + total exposure banner. **No live calculator** — replaced with static cost-avoidance summary |
| 17 | Maturity Roadmap | 5-stage horizontal swimlane with stage cards |
| 18 | 2026 Roadmap | 3-phase column cards with checklist items |
| 19 | Why Comply365 | 3 differentiator cards + trust metrics row + CTA banner |
| 20 | Partnership | Hero + 3 stage cards (Discover / Pilot / Scale) with timelines + closing question |

### Files

**Edited**
- `src/lib/pptxBrand.ts` — add `addEyebrow`, `addIconBadge`, `addLabeledCard`, `addPillRow`, `addCheckRow`, `addStepArrow`, gradient bg.
- `src/exporters/pptx/buildTechnicalDeck.ts` — full rewrite: 21 native slide builders, drop `imageFallbackSlide` and `renderComponentToPng` imports.

**Untouched**
- `src/exporters/pptx/renderToImage.ts` — kept for future decks.
- `src/components/DeckPPTXExportButton.tsx`, `src/exporters/pptx/index.ts` — unchanged.
- All `TechSlide*.tsx` source components — only read for content extraction.

### Verification

1. `/pitch-technical` → click **Download Editable PowerPoint**.
2. Toast progresses through all 21 slides without "Slide failed to render" errors.
3. Open `Comply365-Technical-Deep-Dive.pptx` in PowerPoint:
   - Every text element is **selectable and editable** — no flattened screenshots.
   - Brand dark theme on every slide; primary blue + DTOP step colours present.
   - Logo top-right, footer with deck label and `01 / 21` slide counter on every page.
   - Cost waterfall (slide 2), capability table (slide 13), and Line-of-Sight cascade (slide 16) render as real PowerPoint tables/shapes.
4. Run a quick PDF export of the `.pptx` (LibreOffice) and visually QA all 21 slides for: overlap, text overflow, footer collisions, low-contrast text, uneven spacing. Fix any issues found and re-verify.

### Out of scope

- Other decks (Executive, Operational, CoAnalyst) — phase 2 after this passes review.
- Live ROI calculator interactivity inside PowerPoint (not technically possible).
- Restoring `imageFallbackSlide` for any tech slide.
- Embedding the React-rendered PlatformArchitectureDiagram / Pyramid3D / InfinityLoop SVGs — replaced with native equivalents using shapes.

