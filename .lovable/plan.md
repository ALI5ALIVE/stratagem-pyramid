

## Tighten layout & spacing on DTOP and Persona PDF one-pagers

Both PDFs render at landscape letter (1056×816 px). Two issues:

1. **DTOP** — the "What It Unlocks" tile row has `flex: 1` + `justifyContent: flex-end`, which shoves it to the very bottom and leaves a large empty band between Proof and Unlocks.
2. **Persona** — too much vertical stacking (medallion title → summary → vignette → meta strip → 4 paired grids → footer). Sections feel squashed; line-heights and inter-section margins are uneven; the bottom grid uses `flex: 1` so it stretches awkwardly.

Goal: same content, same structure, but rebalanced rhythm so each section breathes evenly and nothing is pushed to an extreme edge.

### 1. `src/components/print/DTOPPrintablePage.tsx`

- Remove the `flex: 1` + `justifyContent: "flex-end"` wrapper around "What It Unlocks". Place it as a normal block in document flow so it sits directly under "Proof — Three Closed Loops" with consistent spacing.
- Standardise inter-section spacing: every major block uses `marginBottom: 14` (or `12` for tight pairs). Drop the inconsistent 14/14/14/14 + flex push.
- Pipeline cards: bump card padding from `10px 12px 11px` → `12px 14px 13px`, and increase the In/Out micro-text from `9px` → `9.5px` with `lineHeight: 1.5` so the lines don't read as squashed.
- "Why It Exists" stat strip: increase vertical padding from `12px 0` → `14px 0` and add a touch more space (`gap: 24`) between the stat and the description.
- "Proof — Three Closed Loops": increase card left-padding from `12` → `14`, raise the metric font from `18` → `20` (the headline figure currently feels small relative to the DTOP letters above), and bump body line-height to `1.5`.
- "What It Unlocks": render as a proper closing block with its own top hairline and `paddingTop: 12`, then a normal `marginBottom: 14` before the footer (no flex stretching). Tile body text moves from `9px` → `10px` so it matches the rest of the body copy.
- Footer: keep the brand-blue rule but tighten `marginTop` from `12` → `10` so it hugs the unlocks block rather than floating.
- Page padding: change from `24px 36px 22px` → `28px 40px 24px` to give the whole page more breathing room from the edges (executive feel).

Net result: content fills the page evenly top-to-bottom, the closing tiles sit right under the proof loops with hairline separation, and the footer lands at the natural bottom rather than being chased there by `flex: 1`.

### 2. `src/components/PersonaPrintablePage.tsx`

- Page padding: from `22px 36px 20px` → `26px 40px 22px`.
- Remove `flex: 1` from the "Discovery + Objection" grid — it's currently stretching the grid to fill leftover space, creating the squashed feel above and a big air pocket below. Let it sit at its natural height; footer sits naturally beneath.
- Standardise vertical rhythm: every major block uses `marginBottom: 14` (currently a mix of 10/12/12/12/12). Consistent rhythm fixes the "squashed" perception.
- Title block: increase `marginTop` 16 → 18 and `marginBottom` 12 → 14. Headline font 30 → 28 (with `lineHeight: 1.1`) so longer titles like "Chief Information Officer / IT Director" don't crowd the medallion.
- Executive summary paragraph: bump font 12 → 11.5 with `lineHeight: 1.6` (currently 1.5), and remove `maxWidth: 92%` so the line measure matches the rest of the page.
- Persona vignette: bump padding `10px 14px` → `12px 16px`, body `lineHeight` 1.35 → 1.45, and add `marginBottom: 14`.
- Meta strip: vertical padding 9 → 11, value font 10.5 → 11 with `lineHeight: 1.5`.
- All four 2-column grids (Priorities/Pains, Triggers/Criteria, Key Messages/Metrics, Discovery/Objection): unify gap `28` → `32`, bullet font 10.5 → 11 with `lineHeight: 1.55`, and bullet `marginBottom` 5 → 6 so each list item has equal breathing room.
- Section labels: increase `marginBottom` from 8 → 10 so the label doesn't sit on top of the first bullet.
- Value-proposition pull-quote: increase vertical padding from `12px 0` → `14px 0`, font `14` → `15` with `lineHeight: 1.5`.
- Hairlines around the value prop: keep one above and one below, but give each `margin: 6px 0` so they read as deliberate dividers rather than collapsed lines.
- Footer: `marginTop: 12` → `14`.

Net result: the content occupies the page in five evenly-spaced bands (title → summary+vignette → meta → 4 grids → value prop → 2 grids → footer) with consistent gaps, no stretched section, and no squashed text.

### 3. `src/components/print/printBrand.ts`

No changes needed — the colour palette is fine, only the layout/typography of the two print components needs rebalancing.

### Files touched

**Edited**
- `src/components/print/DTOPPrintablePage.tsx` — remove `flex: 1` push, standardise spacing & type sizes.
- `src/components/PersonaPrintablePage.tsx` — remove `flex: 1` stretch, standardise spacing, bump line-heights and gaps.

**Not touched**
- `printBrand.ts`, both download buttons (no logic changes), PPTX exporters, slide components, all other decks.

### QA

After implementation, generate both PDFs, convert to images at 150 DPI (`pdftoppm`), and visually verify: (a) no section pushed to an edge by `flex: 1`, (b) consistent spacing between all blocks, (c) no clipped or squashed text, (d) footer sits naturally at the bottom on both pages.

### Out of scope

- No content edits — same copy as today.
- No new sections; no removed sections.
- No theme/colour changes.

