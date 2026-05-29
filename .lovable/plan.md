# Goal

Make every page of `Comply365-Positioning-Playbook.pdf` look like a designed document page: balanced content, no awkward whitespace at the bottom, no cards split across pages, no zoomed-in or zoomed-out content, consistent margins, and the brand chrome (header, footer, page numbers) on every page.

# Why the current output looks wrong

`PositioningPlaybookPDFButton.tsx` today renders the live `<main>` once at width 1400px, scales it to fit the content rect, then slices the master canvas in fixed-height chunks with a "snap to nearest section break" rule. Three structural problems fall out of that:

1. **One global zoom level.** The whole document is scaled so 1400 CSS px equals the inner content width (~1856 px). Short sections get the same scale as long ones, so a short section becomes a tiny island of content at the top of a near-empty page.
2. **Slice-first, snap-second.** The slicer only snaps backward to a section top. So a section that's slightly taller than one page becomes "page 1 = mostly full" + "page 2 = a thin tail," and short sections that follow are pushed into half-empty pages.
3. **No layout reflow per page.** Cards and grids are sized for the live web layout (lg:grid-cols-4, etc.), not for a 1920×1080 page after chrome. On some sections this leaves big gutters; on others it pushes content right to the footer.

# Approach

Switch from "capture the whole page, slice it" to "render each section into a sized print frame, fit it to one page, split only when truly overflowing." Keep the existing dark brand chrome (cover + header/footer/page numbers).

## 1. Print stage: an off-DOM, fixed-size render host

Build a hidden host sized to the inner content rect (1856 × 920 px at 1× — same numbers used today for `CONTENT_W` / `CONTENT_H`). For each section in order:

- Clone the section's DOM node into the host (deep clone, preserve classes so Tailwind tokens still apply).
- Force a print-tuned class on the host root (`data-pdf-stage`) so a small CSS block can:
  - Drop sticky/transform effects and reduce vertical paddings used for web rhythm (`mb-10` → `mb-6`, hero `pb-6` → `pb-4`).
  - Force pillar tab grids to a balanced 4×n layout that fits 1856px (lg:grid-cols-5 cards already fit; we just need to guarantee equal heights via `items-stretch`).
  - Hide anything marked `data-pdf-hide` inside the section (e.g. the pillar tab strip — already hidden, but enforce here too).
- Wait for fonts/images, then measure the host's `scrollHeight`.

## 2. One-page fit logic

For each prepared section:

- If `scrollHeight ≤ CONTENT_H` (920) → render as a single page. Vertically center the content in the page rect (top-align if `scrollHeight ≥ 0.85 × CONTENT_H`, otherwise add equal top/bottom padding so short sections don't float at the top).
- If `scrollHeight > CONTENT_H` → split into N equal-ish pages by walking the host's **top-level children** (the cards/grids inside the section after the hero). Pack children into a page until the next child would overflow, then start a new page. This guarantees no card is ever cut.
  - The hero (section title + kicker + intro paragraph) is rendered on the first split page only; on continuation pages, show a subtle "Section X · continued" line in the same slot so the reader keeps context.

## 3. Per-page capture

For each packed page, render only the chosen children into a fresh stage of size 1856 × 920, html2canvas it at `scale: 2`, then composite into the existing dark frame:

- Cover page: unchanged (already correct).
- Content pages: existing `drawFrame` (outer hairline, header band with playbook name + section label, footer with version, "Internal GTM use only", "Page X of Y") — but the inner image is now exactly content-sized, never stretched, never sliced mid-card, and never leaves a large empty band.

## 4. Section-aware header label (kept, simpler)

Because we now render section-by-section, the header label is just the current section's `data-pdf-title` — no Y-range mapping needed. Removes a class of off-by-one bugs where the header showed the previous section near a page break.

## 5. Per-section layout tweaks (CSS only, scoped to `[data-pdf-stage]`)

Small overrides so dense sections breathe and sparse sections fill:

- Pillars × Personas: force `grid-cols-5` even at <lg in the stage; equal-height cards.
- Product story: keep `grid-cols-[200px_1fr_auto]` but tighten vertical rhythm.
- Master narrative: cap "master message" font at the same size used on web (already big enough); ensure the two Today/Tomorrow cards equal-height.
- Pillar matrix: when exporting, render all four pillars stacked (already implemented), but each pillar becomes its own packable unit so each pillar tends to land on its own page or pair of pages instead of two pillars cramming one page and the next two being almost empty.

# Files touched

- `src/components/PositioningPlaybookPDFButton.tsx` — replace the single-capture + slice loop with the section-stage + packer described above. Keep `drawCover`, `drawFrame`, dimensions, brand colors, and the `data-pdf-export` toggle exactly as they are.
- `src/pages/PositioningPlaybook.tsx` — add a scoped `<style>` block for `[data-pdf-stage]` rules (tighten paddings, force grid columns, equal heights, hide controls). No copy or component changes. `data-pdf-title` and `data-pdf-section` markers stay as-is.

# Out of scope

- No new sections, no copy edits, no light/print theme.
- No TOC or divider pages.
- No change to the cover page design.
- No change to filename or button placement.

# Acceptance

Open `/positioning-playbook` → click **Download PDF**:

- Page 1: branded cover (unchanged).
- Pages 2+: every page is visually balanced — content occupies roughly the full content rect with consistent top/bottom breathing room, never a sliver of one card at the top of an otherwise empty page.
- No card or grid row is ever split across pages.
- Header shows the correct section title on every page, including continuation pages (which show "· continued").
- Footer shows version, "Internal GTM use only", and "Page X of Y" correctly.
- Pillars × Personas renders all four pillars, each pillar's 5-card row stays on one page.
