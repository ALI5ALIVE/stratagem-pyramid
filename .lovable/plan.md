

## Remove second title slide from Technical Deep Dive

The deck currently opens with two title slides back-to-back:

1. `tech-slide-opener` — the new platform-hero ("One platform. One operating model. One entry point.")
2. `tech-slide-0` — "The Complete Platform Story / Operational Performance Platform" with trust stats

The user wants the second one (`tech-slide-0` / `TechSlide0Title`) removed so the deck opens cleanly with the platform hero and goes straight into Strategic Shift.

### Changes

**1. `src/pages/TechnicalDeepDive.tsx`**
- Remove the import for `TechSlide0Title`.
- Remove the `{ id: "tech-slide-0", label: "Title", component: TechSlide0Title }` entry from the `slides` array.
- The `exportSlides` prop currently passed into `TechSlide0Title` (which renders the deck-level PDF + PPTX download buttons) needs to move to the new opener so users can still export the deck from the first slide.

**2. `src/components/tech-slides/TechSlideOpener.tsx`**
- Accept an optional `exportSlides` prop (same shape used today by `TechSlide0Title`).
- When provided, render the same bottom-right export cluster (`DeckPPTXExportButton` + `DeckPDFExportButton` + the small "Interactive slides export in their default view." caption) in the lower-right corner of the hero slide.
- Hero copy, layout, and status pill are unchanged.

**3. `src/exporters/pptx/buildTechnicalDeck.ts`**
- Remove the spec that renders the "Complete Platform Story / Operational Performance Platform / trust stats" slide from the `composed` array so the PPTX matches the web deck.
- The new platform-hero `openerSpec` remains as slide 1.

### Files touched

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — drop `TechSlide0Title` import + entry, pass `exportSlides` to `TechSlideOpener` instead.
- `src/components/tech-slides/TechSlideOpener.tsx` — accept and render the optional `exportSlides` download cluster.
- `src/exporters/pptx/buildTechnicalDeck.ts` — drop the `tech-slide-0` spec from `composed`.

**Not touched**
- `TechSlide0Title.tsx` is left in place (unused by the Tech deck) so other decks/links that may reference it keep working; it just no longer appears in the Technical Deep Dive sequence.

### Out of scope

- No copy or visual changes to the platform-hero opener itself.
- No narration regeneration.
- No changes to other decks.

