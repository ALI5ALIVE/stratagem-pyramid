

## Move Download Deck PDF into Slide 0 only

The fixed top-left toolbar overlaps the sidebar trigger and persists across all 22 slides. Better solution: **render the download button inside the title slide (`TechSlide0Title`) only**, so it appears once on the opening slide and disappears as soon as the user scrolls.

### Change

**`src/pages/TechnicalDeepDive.tsx`**
- Remove the `fixed top-4 left-4` toolbar wrapper entirely.
- Pass the `slides` array down to `TechSlide0Title` via a new prop (e.g. `exportSlides`) — only slide 0 needs it.

**`src/components/tech-slides/TechSlide0Title.tsx`**
- Accept optional `exportSlides` prop.
- Render `<DeckPDFExportButton>` inside the slide's existing layout, positioned in a non-intrusive spot (bottom-right corner of the slide content, above the narration bar — `absolute bottom-24 right-8`), with the small caption underneath.
- Because it lives inside the slide, it scrolls away naturally on slide 2+, never overlapping the sidebar trigger or any other slide's content.

### Why this is better than the fixed toolbar

- No z-index fight with `SidebarTrigger` (top-left) or narration bar (bottom).
- Discoverable: title slide is the natural "deck cover" — download lives with the deck title.
- Zero impact on the other 21 slides' layouts.

### Files

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — drop fixed toolbar, pass `exportSlides={slides}` to slide 0.
- `src/components/tech-slides/TechSlide0Title.tsx` — accept `exportSlides`, render `DeckPDFExportButton` + caption inside the slide.

### Out of scope

- No changes to `DeckPDFExportButton` itself.
- No changes to other slides or layout primitives.

