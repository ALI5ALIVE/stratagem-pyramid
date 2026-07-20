## Goal
Produce a folder of static HTML files (one per slide + index) for the Medium Executive Pitch, so it can be uploaded/rebuilt into the WordPress site. No React, no interactivity — just clean static markup, CSS, and image assets.

## Approach
Add a **"Download HTML bundle"** button on the Medium Pitch title slide (next to the existing PPTX export). Clicking it:

1. Renders each of the 16 slides at 1920×1080 into a hidden host (reusing `src/exporters/pptx/renderToImage.ts` pattern) and captures a high-res PNG per slide.
2. Builds one HTML page per slide containing:
   - The slide PNG as a full-bleed responsive `<img>`
   - Extracted slide title + narration script (from `executivePitchNarration.ts` where present) as real HTML text below the image — so WordPress has editable copy, alt text, and SEO content, not just a picture.
   - Prev/Next links between slides.
3. Generates an `index.html` with a thumbnail grid linking to each slide.
4. Ships a small shared `styles.css` (dark theme matching the deck) and an `assets/` folder with the PNGs.
5. Zips the whole thing via `jszip` and triggers a browser download as `comply365-medium-pitch-html.zip`.

## Folder structure produced
```text
comply365-medium-pitch-html/
├── index.html              (thumbnail grid, deck title, intro)
├── styles.css              (shared dark theme, responsive)
├── slides/
│   ├── 01-title.html
│   ├── 02-strategic-shift.html
│   ├── ...
│   └── 16-why-comply365.html
└── assets/
    ├── 01-title.png
    ├── 02-strategic-shift.png
    └── ...
```

Each slide HTML: semantic `<article>` with `<h1>` title, `<img>` slide render, `<section class="narration">` with the voiceover script as paragraphs, and prev/next nav. Fully standalone — open any file directly in a browser or paste the markup into a WordPress Custom HTML block.

## WordPress rebuild options this gives you
- **Fastest:** upload the whole folder via SFTP/File Manager to `/wp-content/uploads/medium-pitch/` and link to `index.html`.
- **Editable in WP:** copy the `<img>` + narration text from each slide file into a Gutenberg Image + Paragraph block. Titles become real headings for SEO.
- **Assets only:** grab just the PNGs from `assets/` and rebuild layouts natively in WP.

## Easier alternative worth considering
If the aim is just to *show* the deck on the WP site (not rebuild it), the fastest path is a single-line embed:
```html
<iframe src="https://stratagem-pyramid.lovable.app/pitch-executive-medium"
        width="100%" height="720" style="border:0"></iframe>
```
Zero rebuild, always in sync with edits here. The HTML bundle above is the right choice if you want the content living inside WordPress (for SEO, editing, or independence from Lovable hosting).

## Technical notes
- Reuses existing `renderComponentToPng` — no changes to slide components.
- Adds `jszip` dependency for client-side zipping.
- New files: `src/exporters/html/buildMediumPitchHtml.ts`, `src/components/DeckHtmlExportButton.tsx`. Wired into `TechSlideOpener` behind a `htmlBundleDeckId` prop, same pattern as `pptxDeckId`.
- Narration copy is pulled from `src/data/executivePitchNarration.ts` (matching slide IDs) so each HTML file has real body text, not just an image.
- Approx bundle size: 16 PNGs × ~400KB ≈ 6–8 MB zipped.
