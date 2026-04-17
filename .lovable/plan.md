

## Technical Deep-Dive — Visual Polish Pass

Goal: fix the elongated/stretched cards, unbalanced whitespace, and inconsistent sizing across the 21 slides without losing any copy.

## Diagnosis

After reviewing the slide components and the user's screenshot context (1081×696 viewport, h-screen slides), the recurring issues are:

1. **Vertical stretching** — Many cards use `flex flex-col` inside `flex-1` parents but only have 2–3 lines of text, so they balloon to fill height with content stuck at the top.
2. **Inconsistent card density** — Some slides use `p-3 text-[10px]`, others `p-5 text-sm`. Same deck, different rhythm.
3. **Top-anchored content** — Cards lack `justify-between` or vertical centering, leaving large empty bottoms.
4. **Grid imbalance** — `grid-cols-3` with one short column and two tall ones, or `lg:grid-cols-[1fr_auto_1fr]` collapsing oddly at this viewport.
5. **Container width drift** — `SalesSlideContainer` uses `max-w-7xl`, but some slides override with full-width children, breaking alignment.
6. **Title block heights vary** — Some slides have subtitle, some don't, pushing content area down inconsistently.

## Fix strategy (apply uniformly)

### A. Card layout standard
Every card in a grid row gets:
- `h-full flex flex-col` (fill row height)
- `justify-between` when card has header + body + footer
- Consistent internal padding: **`p-4`** (was mixed p-3 / p-5)
- Consistent border radius: **`rounded-xl`**
- Body text: **`text-sm leading-relaxed`** (was mixed 10px / 11px / sm)
- Headers: **`text-base font-bold`** (was sm / lg mixed)
- Eyebrow/label: **`text-xs uppercase tracking-wider`**

### B. Grid standard
- Equal-height rows via `grid` + `auto-rows-fr` or wrapping cards in `h-full`.
- Use `gap-4` consistently (was 2/3/4 mixed).
- Avoid 4-column grids at this viewport — prefer **2×2** or **3-col** with balanced content.

### C. Vertical rhythm
- Slide content area uses `flex flex-col gap-4` with **major sections sized via `flex-1` only when they need to grow** — short sections stay `shrink-0`.
- Add `items-stretch` on grid containers so cards match heights.
- Footer/disclaimer strips: `mt-auto` so they pin to bottom cleanly.

### D. Container hygiene
- All slides confirm `SalesSlideContainer` wrapper, no `max-w` overrides.
- Remove ad-hoc `min-h-0` / `flex-1` chains that don't actually need to grow.

## Slides to revise (16 of 21)

Title (slide 0) and the merged Why-Comply (slide 19) are already balanced — skip. Remaining 16:

| # | Slide | Primary fix |
|---|---|---|
| 1 | TechSlide1StrategicShift | Equal-height before/after columns; centre arrow; tighten 4-driver row to 2×2 grid |
| 2 | TechSlide2IndustryChallenge | Compress pain-point strip; balance waterfall + total cost panel proportions |
| 3 | TechSlide4Platform | Diagram column and legend column to equal heights; legend cards `justify-between` |
| 4 | TechSlide4aSafetyManager | 6-capability grid → 2×3 with `auto-rows-fr`; flow timeline shrinks to fit |
| 5 | TechSlide4bContentManager | Same as 4a |
| 6 | TechSlide4cTrainingManager | Same as 4a |
| 7 | TechSlideDataFoundation | Top data-flow row to `shrink-0`; 3 pillars equal height with `justify-between`; governance strip pinned bottom |
| 8 | TechSlide6PlatformIntegrations | Two case-study cards to equal height; collapse animation tightened |
| 9 | TechSlide7CoAnalyst | 5-step pipeline to single row with consistent card heights; stats row balanced |
| 10 | TechSlideInsights | 3 capability cards equal height; worked example timeline tightened |
| 11 | TechSlideAutomation | 4-pipeline cards equal width/height; workflow example column-aligned |
| 12 | TechSlideTiersVsAI | 4-tier row + comparison table proportions rebalanced |
| 13 | TechSlideMobile | Phone mock + 4 pillars: phone fixed-width, pillars 2×2 grid |
| 14 | TechSlide5DTOP | DTOP 4-step pipeline cards equal size; audit-trail panel reserved space (no layout shift) |
| 15 | TechSlideUseCases | Tabbed cards uniform height; DTOP timeline rows aligned across cards |
| 16 | TechSlide13LineOfSight, TechSlide14MaturityRoadmap, TechSlide15Roadmap2026, TechSlide18Partnership | Spot fixes — equal-height rows, consistent padding |

## Out of scope

- No copy changes.
- No structural reordering of slides.
- No new components.
- No PDF export.

## Files touched

~17 slide component files in `src/components/tech-slides/`. No data, narration, page wiring, or routing changes.

