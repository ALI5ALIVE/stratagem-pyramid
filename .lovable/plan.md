

## Pixel-Perfect PDF Export for the Technical Deep Dive

Add a "Download Deck PDF" button to the Technical Deep Dive (`/pitch-technical`) that exports every slide exactly as it appears on screen — one slide per landscape page, full-bleed, no clipping, no layout drift.

## Why the existing approach won't be pixel-perfect on its own

The current `DownloadButton` / `PersonaDownloadButton` pattern works for one custom-built printable component, but the tech deck has **22 live slides** built with Tailwind, Lucide icons, gradients, SVGs, and `h-screen` layouts. Three things break naive `html2canvas` capture:

1. **Off-screen slides aren't laid out** — scroll-snap parents collapse children that aren't visible, so capturing them yields blank frames.
2. **Viewport-relative units** (`h-screen`, `vh`) render at the user's current window size, so a 1366×700 laptop produces a squashed PDF.
3. **Web fonts + lazy assets** (Space Grotesk, Inter, Lucide SVGs, the platform-ecosystem PNG) aren't always ready when capture fires.

The plan below solves all three.

## How the export will work

1. User clicks **Download Deck PDF** (top-right of the deck, next to the sidebar trigger).
2. A hidden offscreen container (`position: fixed; left: -20000px; width: 1920px; height: 1080px;`) is mounted.
3. For each of the 22 slides, in sequence:
   - Render the slide component into the container at a **fixed 1920×1080** frame (forces `h-screen` to resolve to 1080px regardless of the user's viewport).
   - `await document.fonts.ready` and wait for all `<img>` inside the frame to fire `load` (or error).
   - Capture with `html2canvas` at `scale: 2` → 3840×2160 canvas.
   - Add as a new landscape page to a `jsPDF` doc sized 1920×1080 px (16:9, matches every slide's native aspect).
4. Save as `Comply365-Technical-Deep-Dive.pdf`.
5. Progress toast: "Exporting slide 7 of 22…" so the user knows it's working (full export takes ~30–60s).

This produces a **true pixel-perfect** capture: each PDF page is the slide rendered at its design resolution, with the same fonts, colors, gradients, and spacing the user sees on screen.

## Constraints handled

- **Narration bar / play buttons** — the printable wrapper passes `isPlaying=false` and omits `onPlay`, so `SlidePlayButton` doesn't render in the PDF.
- **Comment bubbles** — the offscreen render is outside `DeckProvider`, so `SlideCommentLayer` is skipped.
- **Interactive sliders / tabs** (Calculator, Use Cases, Safety) — captured in their default state (Quick View + Safety tab). A short note will be added under the button: _"Interactive slides export in their default view."_
- **Scroll-snap** — bypassed entirely because each slide is rendered standalone in the offscreen frame, not inside the snap container.
- **Sidebar collapsed** — capture container has no sidebar context, so slides render full-width.

## Files

**New**
- `src/components/DeckPDFExportButton.tsx` — generic deck exporter. Accepts `{ slides: { id; label; component }[]; filename: string; deckLabel: string }`. Handles offscreen mount, font/image readiness, sequential html2canvas + jsPDF assembly, and a progress toast via the existing `sonner` toaster.

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — import and render `<DeckPDFExportButton slides={slides} filename="Comply365-Technical-Deep-Dive.pdf" deckLabel="Technical Deep Dive" />` in a small fixed top-right toolbar (alongside the sidebar trigger). Reuses the existing `slides` array — zero duplication.

**No changes** to slide components, narration, or the routing layer.

## Out of scope (can be added next)

- Bulk export for the other decks (Executive, Operational, CoAnalyst, etc.) — same button can be dropped into each page once you confirm the tech deck output looks right.
- Capturing alternate states of interactive slides (e.g. Calculator in Full Model + each Use Case tab) — would need a per-slide "states to capture" config.
- Vector PDF (text selectable). Pixel-perfect requires raster capture; selectable text would mean a different rendering path (e.g. `react-pdf`) and would not match the on-screen design.

## QA checklist (run after implementation)

1. Export from a 1366×768 laptop and a 1920×1080 monitor — output PDFs must be byte-identical in dimensions and layout.
2. Open the PDF and confirm: 22 pages, 16:9, no clipped text on Tiers vs AI / Use Cases / Calculator (the densest slides), Space Grotesk headings render correctly, platform-ecosystem PNG appears, Lucide icons appear.
3. File size sanity check (~8–15 MB expected at scale: 2).

