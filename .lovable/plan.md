

## Tech Deep Dive v4 — Remove "Up next in this layer" label

The layer dividers show a small "Up next in this layer" eyebrow above the upcoming-items list. Since v4 no longer uses layer terminology, this label needs to change.

### Change

**`src/components/tech-slides/TechSlideLayerDivider.tsx`** — when `hideLayerNumber` is true (v4), render the label as **"Up next"** instead of "Up next in this layer". v3 dividers (which omit `hideLayerNumber`) keep the original wording.

### Files

**EDITED**
- `src/components/tech-slides/TechSlideLayerDivider.tsx` (one-line conditional label swap)

### Not touched

- v3 deck — label unchanged.
- `buildTechnicalDeck.ts` PPTX exporter still says "UP NEXT IN THIS LAYER"; that exports the v3 deck, so leaving it alone preserves v3 parity. (Say if you'd like that changed too.)

### QA

- `/pitch-technical-v4`: Intelligence, Mobile, DTOP, Core dividers show "Up next" only.
- `/pitch-technical` (v3): dividers still show "Up next in this layer".

