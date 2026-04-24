

## Technical Deep Dive v4 — 4-layer mirror (Data Foundation folded into Intelligence)

A mirror of the Technical Deep Dive with the architecture compressed from **5 layers to 4**. Layer 2 (Operational Data Foundation) is removed as a standalone layer; its substance — unified taxonomy, knowledge graph, and aviation LLMs — is folded into the **Intelligence & Orchestration** layer as its data substrate.

### New layer model (4 layers)

```text
v3 (5 layers)                          v4 (4 layers)
─────────────────────────              ─────────────────────────
L1  Core Operational Apps              L1  Core Operational Apps
L2  Operational Data Foundation        — (folded into L2)
L3  Intelligence & Orchestration       L2  Intelligence & Orchestration
                                            (incl. data substrate)
L4  Unified Mobile Experience          L3  Unified Mobile Experience
L5  DTOP — System of Work              L4  DTOP — System of Work
```

### Slide order — `/pitch-technical-v4`

Same arc as v3, with two changes:
- Remove the **▸ Layer 2 · Data Foundation** divider
- Remove the **L2 · Data Foundation** standalone slide (`TechSlideDataFoundation`)
- Renumber every divider's `layerNumber` (Core stays 1; Intelligence becomes 2; Mobile becomes 3; DTOP becomes 4)
- Update the Intelligence divider tagline to call out the data substrate it now owns
- Update the Intelligence divider `upNext` to include "Data substrate (taxonomy · graph · LLMs)" as the first item

Final v4 sequence:
1. Hero · Strategic Shift · Industry Challenge · Why It Exists · Platform Snapshot
2. Platform Overview (4-layer)
3. ▸ L1 · Core Apps → SafetyManager365 · ContentManager365 · TrainingManager365
4. ▸ L2 · Intelligence & Orchestration *(data substrate folded in)* → Insights · Recommendations · Automation · Tiers vs Generic AI
5. ▸ L3 · Unified Mobile → Mobile slide
6. ▸ L4 · DTOP → DTOP · Use Cases · Platform Integrations
7. Regulation Management · Calculator · Maturity · 2026 Roadmap · Why Comply365 · Why Only Comply365 · CTA

### Key edits

**NEW files**
- `src/pages/TechnicalDeepDiveV4.tsx` — clone of `TechnicalDeepDive.tsx` with:
  - `DeckProvider deckId="tech-deep-dive-v4"`
  - 4-layer `dividerProps` (no `data` entry; renumbered 1–4)
  - Intelligence divider tagline: *"The data substrate — unified taxonomy, knowledge graph and aviation LLMs — plus Insights, Recommendations and Automation. One layer that turns operational data into action."*
  - Intelligence divider `upNext`: `["Data substrate (taxonomy · graph · LLMs)", "Insights & Intelligence", "Recommendations & Prescriptive Actions", "Automation", "Tiers vs Generic AI"]`
  - `slides` array drops `tech-divider-data` and `tech-slide-data-foundation`
- `src/components/tech-slides/v4/TechV4Slide4PlatformDiagram.tsx` — a small wrapper that renders `TechSlide4Platform`'s content with a 4-layer label set, OR (simpler) reuse `TechSlide4Platform` as-is and rely on the in-slide jump targets that still resolve. **Decision: reuse `TechSlide4Platform` as-is** — it already lists 5 layers in its right-hand jump nav. To keep v4 honest visually, we instead create:
- `src/components/tech-slides/v4/TechV4PlatformOverview.tsx` — a v4-specific platform overview slide that shows a 4-layer guide (Core · Intelligence (with data substrate sub-line) · Mobile · DTOP) on the right, and reuses `PlatformArchitectureDiagram compact` on the left. Each row jumps to the v4 divider id.
- `src/components/tech-slides/v4/TechV4SlideIntelligenceSubstrate.tsx` — a single new slide inserted at the **top of the Intelligence layer (right after the Intelligence divider, before the Insights slide)** that condenses the Data Foundation story into one focused panel:
  - 3 pillar cards: *Unified Aviation Taxonomy (4,000+ categories)*, *Operational Knowledge Graph (multi-hop reasoning)*, *Custom Aviation LLMs (90% vs 35%)*
  - Bottom strip: *Customer-Owned · Real-Time · Open APIs*
  - Tagline: *"The substrate every intelligence capability reasons over."*
  - Reuses copy verbatim from `TechSlideDataFoundation` (just compressed and reframed as part of L2).

**EDITED**
- `src/App.tsx` — add route `/pitch-technical-v4` → `TechnicalDeepDiveV4`.
- `src/pages/HomePage.tsx` — add a card under the Pitch Decks section: title *"Technical Deep Dive v4"*, badge *"4-layer model · ~30 slides"*, subtle tag *"Compressed architecture · Data substrate folded in"*. Place it immediately after the existing Technical Deep Dive card.

### Slides intentionally **left untouched**

- `ArchitectureLayerBadge` — still supports a `data` Layer value; we simply never pass it in v4. Existing slides that hardcode `active="data"` (only `TechSlideDataFoundation`, which v4 doesn't include) are unaffected.
- All other existing tech slides (`TechSlide7CoAnalyst`, `TechSlideInsights`, `TechSlideAutomation`, `TechSlideTiersVsAI`, `TechSlideMobile`, `TechSlide5DTOP`, etc.) — reused as-is. They already render correctly without the data divider preceding them.
- `PlatformArchitectureDiagram` — kept as-is (it shows 5 layers with the data layer visible). v4's narration acknowledges the data substrate sits inside Intelligence; the diagram remains the canonical platform visual.
  > *Trade-off: the diagram still shows 5 colored bands, but the v4 deck's story collapses two of them. If you'd prefer a true 4-layer diagram, say the word and we'll add a v4 variant of `PlatformArchitectureDiagram` that merges the Data + Intelligence bands into a single two-tier amber band. Default plan above keeps the diagram untouched to minimize risk.*

### Out of scope

- PPTX exporter for v4.
- Narration scripts for the new substrate slide (uses existing tech narration map; new slide will simply have no audio in v1).
- Editing the shared `PlatformArchitectureDiagram` (see trade-off above).
- Touching v3 (`/pitch-technical`) — fully unchanged.

### QA

- Open `/pitch-technical-v4`. Confirm:
  - No "Data Foundation" divider appears.
  - No standalone Data Foundation slide appears.
  - The Intelligence divider reads **"Layer 2 · Intelligence & Orchestration"** with a tagline that names the data substrate.
  - A new substrate summary slide appears immediately after the Intelligence divider, before the Insights slide.
  - Mobile divider reads **"Layer 3"**, DTOP divider reads **"Layer 4"**.
- Sidebar slide navigator lists the v4 entries in order; v3 sidebar (when on `/pitch-technical`) is unchanged.
- Home Page shows the new v4 card alongside the existing Technical Deep Dive card.

