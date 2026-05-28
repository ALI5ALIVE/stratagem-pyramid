## Goal

Upgrade the Positioning Playbook PDF from raw bleed-to-edge page captures into a properly formatted, branded document with a cover page, page margins, repeating header/footer, and page numbers — while keeping the dark brand look (Space Grotesk, primary blue, dark background) so it still mirrors the live page visually.

## Current problem

`PositioningPlaybookPDFButton.tsx` captures `<main>` and tiles it edge-to-edge across 1920×1080 landscape pages. Result: no margins, no header band, no footer, no page numbers, no cover — looks like raw screenshots, not a document.

## Approach

Keep the live-DOM capture (preserves pixel-perfect fidelity) but composite each page inside a branded frame painted directly onto the PDF page. No new template to maintain — just a frame layer drawn around the captured slice.

### Page chrome (drawn on every content page)

- Page size: 1920×1080 landscape, dark background `hsl(222 47% 6%)`.
- Outer hairline border at 32px inset, color `rgba(255,255,255,0.10)`.
- Header band (top 64px inside the border):
  - Left: "Comply365 · Positioning & Messaging Playbook" (Inter 18px, foreground/80).
  - Right: current section name (e.g. "03 · Master narrative") (Inter 16px, primary blue).
  - Thin hairline rule under the band.
- Footer band (bottom 48px inside the border):
  - Left: `v{playbookMeta.version} · Updated {playbookMeta.updated}`.
  - Center: confidentiality line `Internal GTM use only`.
  - Right: `Page X of Y`.
- Content area: the slice from html2canvas, drawn inside the inner box (≈ 1856×920 after chrome) with 16px gutter so card borders aren't kissing the frame.

### Cover page (page 1)

Single full-bleed page drawn programmatically (no DOM capture) with:
- Top-left small kicker: "Positioning & Messaging Playbook".
- Centered hero title (Space Grotesk 96px): "From event to control."
- Subline (Inter 32px, muted): "On one platform."
- Bottom-left meta block: version, updated date, owners.
- Bottom-right: "Comply365" wordmark.
- Subtle radial gradient orb behind title using `ctx.createRadialGradient` with primary blue at low alpha.

### Section tracking

To label each page's header with the right section name:
- Before capture, walk `[data-pdf-section]` and read its visible title (already in the H2 inside `SectionHero`, or fall back to `data-pdf-title` we set on each section).
- Map every Y-pixel range on the master canvas to a section name. When emitting each page, pick the section whose range covers the page's mid-point and pass that label into the header drawer.

### Slicing improvements

- Recompute slice height to `1080 - chromeTop(96) - chromeBottom(80) - gutters(32) = ~872` px target inside chrome; the master canvas slice is scaled to fit the inner content rect, preserving aspect ratio.
- Keep the existing "snap to section boundary" logic so cards never split across pages.
- Add a 24px bottom gutter inside content rect so the last card on a page never touches the footer rule.

### Files touched

- `src/components/PositioningPlaybookPDFButton.tsx` — replace the slicing/output block with: cover-page draw + per-page chrome draw + section-aware header label. Pull `playbookMeta` for footer text. No public API change.
- `src/pages/PositioningPlaybook.tsx` — add `data-pdf-title="…"` to each `[data-pdf-section]` so the exporter can label headers without parsing DOM (small additive change to existing markers).

### Technical detail (drawing chrome)

All chrome drawn on a per-page `<canvas>` we already create before `pdf.addImage`:
- Fill background with dark hex.
- Stroke outer rounded rect (radius 12) at inset 32 with 1px hairline.
- Set canvas font to `"600 18px Inter"` etc. (fonts are loaded by `document.fonts.ready` before export).
- `ctx.drawImage` the source slice into the inner content rect.
- `ctx.fillText` for header left/right + footer left/center/right.
- Convert to JPEG and add as the page image (one image per page, identical to current path).

## Out of scope

- No light/print stylesheet variant.
- No TOC page, no per-section divider pages.
- No changes to copy or any other playbook export.

## Acceptance

- Click "Download PDF" on `/positioning-playbook` → `Comply365-Positioning-Playbook.pdf` with:
  - Page 1: branded cover.
  - Pages 2+: dark page with hairline border, header showing playbook name + current section, footer with version, "Internal GTM use only", and "Page X of Y".
  - Content unchanged in fidelity (same cards, colors, fonts) but framed with consistent margins and no edge-bleed.
  - No card split across pages.
