

## Editable, branded PowerPoint export — `.pptx` generation

### Why not Figma

Figma can't produce editable PowerPoint — it exports PNG/PDF/SVG only, and the Lovable Figma connector is read-only. Round-tripping Figma → PPTX requires paid third-party tools (Pitchdeck, DeckRobot) and still flattens most content to images.

The right approach is to **author native `.pptx` files in-browser** using `pptxgenjs`. Every title, bullet, shape, table, and brand color becomes a real PowerPoint object that your team can edit in PowerPoint, Keynote, or Google Slides.

### What you'll get

- A new **"Download Editable PowerPoint"** button next to the existing PDF button on each deck (Technical, Executive, Operational, CoAnalyst, etc.).
- Output: `Comply365-Technical-Deep-Dive.pptx` (16:9, 13.33"×7.5") with one slide per source slide.
- Native, editable PowerPoint elements:
  - Title + subtitle text boxes
  - Bullet/body text blocks
  - Coloured shape "cards" matching the dark Comply365 theme
  - DTOP step pills (Detect / Trigger / Orchestrate / Prove) as real shapes
  - Tables for use-case timelines and metric grids
  - Brand-coloured rectangles, dividers, and the Comply365 logo as an embedded image
- A persistent footer on every slide: deck name, slide number, brand mark.

### Honest scope limits

`pptxgenjs` cannot replicate every React component pixel-perfectly. Two-tier delivery:

1. **Native rebuild (editable)** — Title, body, bullets, simple cards, DTOP pills, tables, logo. Covers ~80% of slides cleanly.
2. **High-res image fallback (locked)** — For complex visuals (`PlatformEcosystemDiagram`, `MaturityCurveVisualization`, `LineOfSightTree`, `Pyramid3D`, calculator charts), we render the live React component to a 2× PNG and place it as a single image on the slide. Editable surrounding text, locked image in the middle. Each such image gets a small "edit in source app" caption.

The final `.pptx` opens cleanly in PowerPoint with brand fonts, brand colors, and editable text on every slide.

### Brand system (centralised)

New file `src/lib/pptxBrand.ts`:

```ts
export const PPTX_BRAND = {
  size: { w: 13.333, h: 7.5 },              // 16:9 inches
  color: {
    bg:        "0A0F1C",  // dark theme background
    surface:   "121A2E",
    hairline:  "1F2A44",
    ink:       "F8FAFC",
    muted:     "94A3B8",
    primary:   "0066FF",  // Comply365 blue
    accent:    "00B4D8",
    detect:    "60A5FA",
    trigger:   "F59E0B",
    orchestrate:"A78BFA",
    prove:     "10B981",
  },
  font: { display: "Space Grotesk", body: "Inter" },
};
```

Helpers: `addBrandedFooter(slide, n, total, deckLabel)`, `addTitle()`, `addBulletList()`, `addDtopPills()`, `addImageFallback()`, `loadLogoBase64()`.

### Per-deck slide builders

Each deck gets a builder file under `src/exporters/pptx/`:

```text
src/exporters/pptx/
  pptxBrand.ts                  # tokens + helpers (above lives in src/lib but re-exported here)
  buildTechnicalDeck.ts         # 22 slide builders for Tech Deep Dive
  buildExecutiveDeck.ts         # Exec Pitch
  buildOperationalDeck.ts
  buildCoAnalystDeck.ts
  index.ts                      # registry: deckId -> builder
  renderToImage.ts              # html2canvas helper for fallback slides
```

Each builder maps source content (already in `src/data/*.ts` or hard-coded in the slide components) to native pptxgenjs calls. For fallback slides, it briefly mounts the React component into the same hidden 1920×1080 host that `DeckPDFExportButton` uses, captures a 2× PNG, and embeds it.

### New shared component

`src/components/DeckPPTXExportButton.tsx` — twin of `DeckPDFExportButton` but calls the deck's pptxgenjs builder, shows a per-slide progress toast, and saves the `.pptx`.

Wired into the same toolbar locations the PDF button currently lives (Tech, Exec, Ops, CoAnalyst title slides). Persona and DTOP one-pagers stay PDF-only since they're already executive print artefacts.

### Files

**Created**
- `src/lib/pptxBrand.ts` — brand tokens and shared shape/text helpers.
- `src/exporters/pptx/renderToImage.ts` — hidden-host React→PNG capture (reuses provider stack from `DeckPDFExportButton`).
- `src/exporters/pptx/buildTechnicalDeck.ts` — first deck builder (22 slides).
- `src/exporters/pptx/index.ts` — deck registry.
- `src/components/DeckPPTXExportButton.tsx` — shared export button.

**Edited**
- `src/components/tech-slides/TechSlide0Title.tsx` — add the new PPTX button next to the existing PDF button.
- `package.json` — add `pptxgenjs` dependency.

**Phase 2 (after you approve the Tech deck output)**
- Add `buildExecutiveDeck.ts`, `buildOperationalDeck.ts`, `buildCoAnalystDeck.ts` and wire buttons into their title slides.

### Verification

1. `/pitch-technical` → click **Download Editable PowerPoint**.
2. Toast progresses through all 22 slides, then saves `Comply365-Technical-Deep-Dive.pptx`.
3. Open in PowerPoint: every text element is selectable and editable; brand colours and fonts present; logo on every slide; footer with slide number; complex visuals appear as crisp images with editable surrounding text.
4. Existing PDF export remains untouched and still works.

### Out of scope

- Figma round-trip / Figma plugin.
- Pixel-perfect editable rebuild of charts, 3D pyramid, infinity loop, and ecosystem diagram (these stay as embedded images).
- `.key` (Keynote) or `.gslides` direct export — the generated `.pptx` opens in both.
- Per-user OAuth to push the deck into Microsoft 365 / Google Slides automatically (possible later via the Microsoft PowerPoint or Google Slides connector if you want it).

