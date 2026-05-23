Simplify `src/pages/MarketDevelopmentHub.tsx` to mirror the Command Centre layout — a clean header + grouped widget grids, no long-form narrative.

**Keep**
- Header strip with logo + "Stratagem" divider (match HomePage).
- Hero block: `h1` "Market Development" + one-line subtitle ("Research, positioning, messaging, content and brand — the assets that build the category.").
- Five sections (one per workstream from `marketDevelopmentAssets.ts`), each rendered as:
  - `SectionHeader` (title = workstream `label`, subtitle = workstream `eyebrow`)
  - Responsive grid (`sm:grid-cols-2 lg:grid-cols-3` / `lg:grid-cols-4` for brand) of `DeckCardComponent`-style cards.
- Each card uses the same look as HomePage cards: icon tile, badge (= asset `status`), title, purpose, hover "Open →".

**Remove**
- Hero gradient/radial backgrounds and big "We're not selling into a category" headline.
- "Programme map" section with arrow flow.
- Long workstream intro blocks (12-col split with eyebrow / headline / paragraph).
- "Operating rhythm" section.
- Bottom CTA section ("Commission new work", vision session button).
- All workstream accent color logic (`accentMap`) — use the same neutral card styling as HomePage for visual consistency. Status badge keeps a subtle color hint via existing muted style.

**Technical notes**
- Reuse the exact card markup pattern from `HomePage.tsx` (`DeckCardComponent`) so the two pages look identical.
- Map each `MarketAsset` → DeckCard shape: `title`, `description = purpose`, `href`, `icon`, `badge = status`, neutral `accent` (e.g. `from-primary to-comply-teal`).
- No data file changes; `workstreams` and assets stay as-is. `operatingRhythm` export remains (unused by this page now) — leave untouched to avoid scope creep.
- Single file edit: `src/pages/MarketDevelopmentHub.tsx`.