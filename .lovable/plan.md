## Goal

Add a "Download PDF" button to `/positioning-playbook` that produces a pixel-perfect mirror of the rendered page — exact same fonts, colors, dark theme, gradients, cards, tabs and layout the user sees on screen.

## Approach

The Positioning Playbook is a single long scrollable page (~13 sections, all rendered at once in `src/pages/PositioningPlaybook.tsx`). Because every section is already in the DOM, we can capture the live page itself instead of re-rendering slides in a hidden host (the pattern used for fixed-frame decks like `DeckPDFExportButton`).

### New component: `src/components/PositioningPlaybookPDFButton.tsx`

- Button styled to match the existing top-bar chips (small, ghost/outline, with Download icon + spinner during export).
- On click:
  1. Toast "Preparing PDF…"
  2. Temporarily expand the Pillars × Personas section so all 4 pillar tabs export (render all pillars stacked, not just the active one) — restored after capture.
  3. Force-hide the sticky header and the Download button itself during capture via a transient `data-pdf-export` flag on `<html>` plus one small CSS rule.
  4. Wait for `document.fonts.ready` + all `<img>` loads + 150ms settle.
  5. Capture the main content container (`<main>`) with `html2canvas` at `scale: 2`, `backgroundColor` = page background, `useCORS: true`, `windowWidth` pinned to the container's render width (1400 max) so the desktop layout is captured regardless of viewport.
  6. Slice the resulting tall canvas into letter-landscape pages (1920×1080 px, matching existing deck PDFs for visual consistency) using `jsPDF` with `hotfixes: ["px_scaling"]`. Each page = a vertical crop of the master canvas drawn onto a fresh page; avoids cutting cards in half by snapping page breaks to the nearest section boundary (use `data-pdf-section` markers on each `<section>` and the hero).
  7. Save as `Comply365-Positioning-Playbook.pdf`.
  8. Toast success / error.

### Small edits to `src/pages/PositioningPlaybook.tsx`

- Add the button next to the existing version chip in the sticky header.
- Add `data-pdf-section` to each top-level `<section>` (hero + sections 1–13) so the slicer can snap page breaks cleanly.
- Add `data-pdf-root` to the `<main>` element so the exporter targets it precisely.
- Add `data-pdf-hide` to the sticky `<header>` so it's hidden during capture (kept visible in normal use).
- For the Pillars × Personas tabs, render all four pillar blocks when `document.documentElement.dataset.pdfExport === "true"` (small conditional, no behavior change otherwise) so the PDF includes every pillar matrix.

### Page-break logic (technical detail)

- After `html2canvas` returns the master canvas at `scale: 2`, measure each `[data-pdf-section]` element's offsetTop and height (in CSS px), multiply by 2 for canvas px.
- Page height target = canvas width × (1080 / 1920). Walk sections; start a new page whenever adding the next section would overflow the page; if a single section is taller than one page, allow it to span pages but break at its internal card rows where possible (fallback: hard-cut at the page boundary).
- Draw each page slice via `pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), …)` with negative Y offset and clipping, identical to the existing deck exporter math.

### Dependencies

`html2canvas` and `jspdf` are already used by `DeckPDFExportButton` — no new packages.

## Out of scope

- No PPTX export, no narration audio, no separate print stylesheet.
- No changes to the copy in `src/data/positioningPlaybook.ts`.
- No changes to other playbooks.

## Acceptance

- Visiting `/positioning-playbook` shows a new "Download PDF" button in the top bar.
- Clicking it produces `Comply365-Positioning-Playbook.pdf` whose pages, when viewed side-by-side with the live page, match pixel-for-pixel (same dark background, Space Grotesk titles, Inter body, primary blue accents, card borders/gradients, DTOP color tokens) with no clipped cards and all four pillar matrices included.
