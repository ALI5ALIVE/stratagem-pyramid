## Issue

On the Sales Enablement deck, the **W1 · Value Unlocked** slide (`PFSlide9Value`, rendered from `src/components/platform-slides/PFSlide9Value.tsx`) shows 5 pillar cards in a single row. Each card stacks: icon → title → description paragraph → 3 bullets → footer "shift" line. At the SE deck's container height the card content overflows top and bottom — the description and the bottom shift line bleed outside the card frame.

## Fix scope (frontend only, single file)

Edit `src/components/platform-slides/PFSlide9Value.tsx` to shrink the card footprint so all 5 cards fit cleanly in the slide area, without changing source data in `platformPlaybook.ts`.

Changes inside each card:
1. Tighter padding (`p-3` → `p-2.5`) and reduced internal `gap-2` → `gap-1.5`.
2. Drop the long description paragraph from the card (keep title, bullets, and shift line — the description duplicates the talk track).
3. Trim bullets to a max of 2 (slice in the component, no data change).
4. Smaller icon (`h-5 w-5` → `h-4 w-4`) and smaller title (`text-xs` retained, `leading-tight`).
5. Footer shift line: keep but remove top border padding to save vertical space (`pt-1` → `pt-1.5` with thinner `border-border/50`).

Container: keep `grid-cols-5` on md+, but on smaller widths fall back to `grid-cols-2` (currently goes 1-col then 5-col, which is what causes the squeeze on the SE viewport).

## Out of scope

- No changes to `valuePillars` data (other playbooks reuse it).
- No changes to other Value Unlocked slides (IRSlide7Value, MOSlide7Value, etc.) — SE only renders `PFSlide9Value`.
- No narration, routing, or layout changes elsewhere.