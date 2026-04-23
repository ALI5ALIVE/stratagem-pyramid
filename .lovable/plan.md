

## Align architecture diagram layers to the slides that follow

### Problem

Slide 4 (The Operational Performance Platform) shows a 5-layer stack: **DTOP · Unified Mobile · Intelligence & Orchestration · Operational Data Foundation · Core Operational Apps**. The slides that follow drill into each layer (Safety/Content/Training apps, Data Foundation, Insights & Intelligence, Recommendations & Prescriptive Actions, Automation, Mobile, DTOP), but there's no visual handshake between the diagram tile and the deep-dive slide. The viewer loses the thread.

### Solution: layer-coded section dividers + a recurring "you are here" badge

Two reinforcing devices, both reusing brand chrome that already exists.

### 1. Insert 5 lightweight **layer divider slides** before each deep-dive group

One full-bleed dark divider per architecture layer, in the same top-down order the diagram reads. Each divider is the visual "chapter card" for the slides that follow it.

Each divider contains:
- **Eyebrow**: `LAYER N · ARCHITECTURE` in the layer's accent colour (emerald / violet / amber / cyan / blue — same tokens as the diagram).
- **Title**: layer name (e.g. `Intelligence & Orchestration Layer`).
- **One-line tagline**: pulled straight from the diagram's sub-label (e.g. `Insights & Intelligence · Recommendations & Prescriptive Actions · Automation`).
- **Mini-stack on the right**: a compact 5-row replica of the architecture stack with the active layer lit up in its accent colour and the other 4 dimmed to 20% opacity. Same visual grammar as the main diagram, so the viewer instantly recognises "we're now inside this layer."
- **Footer**: `Up next: <list of slide titles in this layer>`.

Divider sequence (inserted into `TechnicalDeepDive.tsx` slide registry):

| # | Divider | Slides it introduces |
|---|---|---|
| A | Layer 5 · DTOP — System of Work | DTOP slide |
| B | Layer 4 · Unified Mobile Experience | Mobile slide |
| C | Layer 3 · Intelligence & Orchestration | Insights & Intelligence, Recommendations & Prescriptive Actions, Automation, Tiers vs Generic AI |
| D | Layer 2 · Operational Data Foundation | Data Foundation slide |
| E | Layer 1 · Core Operational Apps | Safety Manager, Content Manager, Training Manager |

Order in the deck stays the same as today; only the 5 dividers are slotted in front of their respective groups.

### 2. Add a persistent **"You are here" architecture badge** to every deep-dive slide

Reuse the existing `ArchitectureLayerBadge` component (already in the codebase). On every layer-specific slide, place the badge top-right, just under the slide header:

- 5 layer pills in the same top-down order as the diagram.
- Active layer pill lit in its accent colour; others dimmed.
- For Layer 3 slides, the badge also shows the active sublayer pill (Insights & Intelligence / Recommendations & Prescriptive Actions / Automation) — matching the sublayer the slide is about.

This means the viewer can glance at any slide and instantly map it back to the diagram on Slide 4.

### 3. Light tweak to Slide 4 itself

On the architecture diagram slide, add a tiny `→ deep dive` chevron on each layer band that hints the deck will visit that layer. Subtle — same accent colour as the layer, ~10px, right edge of the band. No layout change.

### 4. PPTX export mirror

In `src/exporters/pptx/buildTechnicalDeck.ts`:
- Add 5 native section divider slides (using the existing `addSectionDivider` helper) in the same positions.
- Each divider gets the layer accent colour, the eyebrow/title/tagline, and a small native 5-rect stack on the right with the active layer highlighted.
- Add a small native version of the architecture badge (5 pills) to the header strip of every deep-dive slide builder. Same accent rule — active pill lit, others dimmed.

Final deck length: ~26 slides today → ~31 slides after dividers. Acceptable; dividers are scannable and add navigability rather than density.

### Files

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — register the 5 new divider slides in the correct slots; sidebar labels prefixed with `▸ Layer N` to group visually.
- `src/components/tech-slides/` — new `TechSlideLayerDivider.tsx` component (props: `layerNumber`, `layerName`, `tagline`, `accentColor`, `upNext: string[]`); add `<ArchitectureLayerBadge active=… sublayer=… />` to the header of each layer-specific deep-dive slide that doesn't already render one.
- `src/components/tech-slides/TechSlide4Platform.tsx` — add the small `→ deep dive` chevron on each layer band.
- `src/exporters/pptx/buildTechnicalDeck.ts` — insert the 5 native divider slides; add the native 5-pill architecture badge to every deep-dive slide header.
- `src/data/technicalPitchNarration.ts` — add 5 short narration entries for the dividers (~10 seconds each: "We're now entering Layer 3. This is where data becomes action…").

**Untouched**
- `PlatformArchitectureDiagram.tsx` (already correct after the previous rename pass).
- `ArchitectureLayerBadge.tsx` (already supports the new sublayer IDs).
- All other decks.

### Verification

1. `/pitch-technical` — sidebar now visibly groups slides under 5 layer headings; each deep-dive slide shows the architecture badge top-right with the active layer/sublayer lit.
2. Scroll the deck end-to-end — every layer transition is announced by a divider in that layer's colour with a mini-stack showing where you are.
3. Download Editable PowerPoint — confirm the 5 native dividers appear in the right slots and every deep-dive slide carries the 5-pill native badge in the header.
4. PDF QA: convert pptx → PDF → JPEGs at 150 dpi; visually check divider colour coding is consistent with the main diagram and that the badge doesn't collide with slide titles.

### Out of scope

- Other decks (Executive, Operational, CoAnalyst Playbook, Platform Playbook). Phase 2 once you sign off here.
- Reordering existing deep-dive slides.
- Renaming layers or sublayers.

