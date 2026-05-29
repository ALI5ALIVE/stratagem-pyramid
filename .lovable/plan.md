
# Rebrand Executive Pitch PPTX on Comply365 Template

## What you need to do first

Upload Comply365's official PowerPoint template (`.pptx` or `.potx`) to this chat. Ideally it contains:
- Title / cover slide
- Section divider slide
- Standard content slide (title + body)
- Closing / thank-you slide
- Any "stat" or "quote" layouts you use
- Footer + logo placement
- Brand fonts embedded (or named so we can map them)

If the template only has a cover and one content layout, that's fine — we'll derive the rest.

## Scope (locked)

- **Decks rebranded:** Medium Executive Pitch (16 slides) and Long Executive Pitch (20 slides) only.
- **Out of scope:** Customer Overview, Technical Deep Dive, AI Infographic — untouched.
- **Output:** Fully editable native PowerPoint shapes (no slide-as-image). Buyers' teams can edit every title, bullet, stat, and chart in PowerPoint.

## Approach

### 1. Extract the template (one-time)
- Unpack the uploaded `.pptx` with the PPTX skill scripts.
- Pull out from `ppt/slideMasters/` and `ppt/slideLayouts/`:
  - Theme colors (`a:clrScheme`)
  - Font scheme (major + minor)
  - Logo / footer images (saved into `src/assets/brand/`)
  - Layout geometry: title position, body box, footer y-coordinate, accent bars
- Generate a thumbnail grid of the template so we can visually confirm what each layout looks like.

### 2. Create a Comply365 brand module
New file `src/exporters/pptx/comply365Brand.ts` containing:
- `BRAND_COLORS` — exact hex values from the template's theme (replacing the ad-hoc palette in `pptxBrand.ts` for these two decks)
- `BRAND_FONTS` — `{ heading, body }` matched to the template's font scheme, with safe fallbacks
- `LAYOUT` constants — title x/y/w/h, body x/y/w/h, footer y, accent bar coords — all derived from the template
- `addBrandCover(slide, {title, subtitle, presenter})`
- `addBrandDivider(slide, {section, number})`
- `addBrandContent(slide, {title, eyebrow})` — paints title block + footer chrome; caller fills the body region
- `addBrandCloser(slide, {headline, cta})`
- `addBrandFooter(slide, {pageNumber, totalPages})` — logo + pagination + confidentiality line

These helpers use pptxgenjs's `defineSlideMaster` so PowerPoint sees them as real layouts (editable, not flattened).

### 3. Rewrite the two builders
- `buildExecutivePitch3Deck.ts` (the existing shared internal builder with `long` / `medium` variants) gets reworked to:
  - Call `pptx.defineSlideMaster()` once per layout type using the brand module
  - Walk each slide in `execPitchSlides.ts` / `execPitchMediumSlides.ts` and route to the correct master
  - Map each web slide's content (hero, columns, DTOP loop, roadmap, stats, capability grids) to native pptxgenjs shapes — `addText`, `addShape`, `addTable`, `addChart` — never `addImage` of a rasterised slide
  - Use the brand color tokens for every fill, stroke, and text color
  - Preserve narration-aligned ordering and titles

### 4. Slide-by-slide mapping
For each slide in the two pitches I'll pick the closest template layout:
- Title slide → template cover
- "Strategic Shift", "Why Comply365", section openers → template divider
- All content slides (DTOP, Capabilities, Intelligence, Regulations, Mobile, Roadmap, Outcomes) → template content layout, with internal grids built from native shapes
- Final slide → template closer

Complex visuals (DTOP loop, platform ecosystem, roadmap timeline, capability grids) are rebuilt with pptxgenjs `addShape` + `addText` so they remain editable. The platform ecosystem PNG already in `src/assets/` is the one exception — kept as an embedded image because the web version is also a PNG (per `mem://ui/platform-ecosystem-diagram`).

### 5. QA loop (mandatory, per PPTX skill)
For both decks:
1. Export → convert to PDF via LibreOffice → render each page to JPG at 150 DPI
2. Inspect every slide for: text overflow, low contrast, misaligned footers, missing logos, wrong fonts, leftover template placeholders ("Click to edit…")
3. Run `markitdown` and grep for leftover placeholder strings
4. Fix and re-render until a clean pass
5. Report findings in chat

### 6. Memory update
Add `mem://brand/pptx-template` recording: template file path, extracted color tokens, font names, master layout coordinates — so future deck rebuilds reuse the same source of truth.

## Out of scope / non-goals
- No copy changes. Slide text stays as-is.
- No changes to web slides or narration.
- No changes to the other decks' exporters or to `src/lib/pptxBrand.ts` (left alone so other decks are unaffected).
- No new fonts shipped in the repo — we reference the template's font names and rely on PowerPoint's font fallback / embedded fonts in the source template.

## Technical notes
- pptxgenjs supports `defineSlideMaster({ title, background, objects, slideNumber })` — we'll use it to register cover / divider / content / closer masters extracted from the template.
- For exact geometry we measure in EMU from the unpacked XML and convert to inches (EMU / 914400).
- Editability requirement means no `slide.addImage({ data: ...slideAsPng })` for content; only logos and the ecosystem diagram are images.
- If the template uses a custom font not installed on viewers' machines, we'll set `fontFace` to it and provide a safe fallback (e.g. `'BrandSans, Calibri, Arial'`).

## What I'll deliver
- `src/exporters/pptx/comply365Brand.ts` (new)
- Updated `src/exporters/pptx/buildExecutivePitch3Deck.ts` (both variants)
- Extracted brand assets under `src/assets/brand/`
- QA report: thumbnails of all 16 + 20 slides, list of issues found, fixes applied
- Memory entry `mem://brand/pptx-template`

## Next step
Upload the official Comply365 `.pptx` template and I'll implement this end-to-end.
