

## Align all deep-dive slide titles to the architecture diagram

### Problem

The architecture diagram on Slide 4 names 5 layers crisply:

1. **Layer 1 · Core Operational Apps** (ContentManager365 · TrainingManager365 · SafetyManager365)
2. **Layer 2 · Operational Data Foundation**
3. **Layer 3 · Intelligence & Orchestration Layer** (Insights & Intelligence · Recommendations & Prescriptive Actions · Automation)
4. **Layer 4 · Unified Mobile Experience**
5. **Layer 5 · DTOP — The System of Work**

Today's deep-dive slide titles use inconsistent wording — some say "Core Operational Apps —", some say "Operating Model: DTOP", "The Operational Data Foundation", "Intelligence & Orchestration Layer — Automation & Orchestration". A viewer cannot scan a slide title and instantly know which layer of the diagram they're inside.

### Solution: one consistent title pattern across every deep-dive slide

**Pattern:** `Layer N · <Layer Name> — <Specific Topic>`

This mirrors the exact wording on the diagram tile, prefixed with the layer number for instant cross-reference. Subtitles stay as-is (they explain *what* the slide covers).

### Title changes

| Slide | Current title | New title |
|---|---|---|
| `tech-slide-4a` SafetyManager | Core Operational Apps — SafetyManager365 | **Layer 1 · Core Operational Apps — SafetyManager365** |
| `tech-slide-4b` ContentManager | Core Operational Apps — ContentManager365 + CoAuthor | **Layer 1 · Core Operational Apps — ContentManager365 + CoAuthor** |
| `tech-slide-4c` TrainingManager | Core Operational Apps — TrainingManager365 + CoTrainer | **Layer 1 · Core Operational Apps — TrainingManager365 + CoTrainer** |
| `tech-slide-data-foundation` | The Operational Data Foundation | **Layer 2 · Operational Data Foundation** |
| `tech-slide-coanalyst` Insights | Intelligence & Orchestration Layer — Insights & Intelligence | **Layer 3 · Intelligence & Orchestration — Insights & Intelligence** |
| `tech-slide-insights` Recommendations | Intelligence & Orchestration Layer — Recommendations & Prescriptive Actions | **Layer 3 · Intelligence & Orchestration — Recommendations & Prescriptive Actions** |
| `tech-slide-automation` | Intelligence & Orchestration Layer — Automation & Orchestration | **Layer 3 · Intelligence & Orchestration — Automation** |
| `tech-slide-tiers-vs-ai` | Intelligence Tiers & Why Generic AI Falls Short | **Layer 3 · Intelligence & Orchestration — Tiers vs Generic AI** |
| `tech-slide-mobile` | (current "Unified Mobile Experience") | **Layer 4 · Unified Mobile Experience** |
| `tech-slide-5` DTOP | Operating Model: DTOP | **Layer 5 · DTOP — The System of Work** |

Notes:
- Drop the redundant word "Layer" from Layer 3 titles (the prefix already says "Layer 3"); keep the diagram's wording "Intelligence & Orchestration".
- "Automation & Orchestration" → just "Automation" to match the diagram tile exactly.
- "Operating Model: DTOP" → "DTOP — The System of Work" to match the diagram's tagline.
- Slide 4 itself keeps its current title (`The Operational Performance Platform`) — it's the index slide, not a layer slide.

### Slides not in any layer (left unchanged)

These are framing, value, or close slides — they shouldn't pretend to be architecture layers:

- Title, Strategic Shift, Industry Challenge
- Use Cases, Platform Integration Case Studies
- Line of Sight Calculator, Maturity Roadmap, 2026 Roadmap, Why Comply365, Partnership

### Layer divider slides (already exist) — wording polish

The 5 architecture dividers added in the previous pass already say `Layer N · Architecture` as the eyebrow and the layer name as the title. Two small consistency tweaks:

- Layer 3 divider title: `Intelligence & Orchestration Layer` → **`Intelligence & Orchestration`** (drop trailing "Layer" — it's redundant after "Layer 3 · Architecture").
- Layer 5 divider title: keep `DTOP — The System of Work` (already correct).

### Sidebar labels (`TechnicalDeepDive.tsx`)

Update the per-slide sidebar labels so the navigator reads cleanly grouped under each `▸ Layer N` divider:

| Current sidebar label | New |
|---|---|
| SafetyManager365 | L1 · SafetyManager365 |
| ContentManager365 | L1 · ContentManager365 |
| TrainingManager365 | L1 · TrainingManager365 |
| Data Foundation | L2 · Data Foundation |
| Insights & Intelligence | L3 · Insights & Intelligence |
| Recommendations & Prescriptive Actions | L3 · Recommendations & Prescriptive Actions |
| Automation | L3 · Automation |
| Tiers vs Generic AI | L3 · Tiers vs Generic AI |
| Unified Mobile | L4 · Unified Mobile |
| DTOP Operating Model | L5 · DTOP |

The `▸ Layer N · …` divider rows stay as-is so each group reads as a header followed by its members.

### PPTX export mirror

In `src/exporters/pptx/buildTechnicalDeck.ts`, update the title strings passed to each layer-specific slide builder to match the new titles above. No structural changes — only the title strings change.

### Files

**Edited**
- `src/components/tech-slides/TechSlide4aSafetyManager.tsx` — title prefix `Layer 1 · `
- `src/components/tech-slides/TechSlide4bContentManager.tsx` — title prefix `Layer 1 · `
- `src/components/tech-slides/TechSlide4cTrainingManager.tsx` — title prefix `Layer 1 · `
- `src/components/tech-slides/TechSlideDataFoundation.tsx` — title `Layer 2 · Operational Data Foundation`
- `src/components/tech-slides/TechSlide7CoAnalyst.tsx` — title `Layer 3 · Intelligence & Orchestration — Insights & Intelligence`
- `src/components/tech-slides/TechSlideInsights.tsx` — title `Layer 3 · Intelligence & Orchestration — Recommendations & Prescriptive Actions`
- `src/components/tech-slides/TechSlideAutomation.tsx` — title `Layer 3 · Intelligence & Orchestration — Automation`
- `src/components/tech-slides/TechSlideTiersVsAI.tsx` — title `Layer 3 · Intelligence & Orchestration — Tiers vs Generic AI`
- `src/components/tech-slides/TechSlideMobile.tsx` — title `Layer 4 · Unified Mobile Experience`
- `src/components/tech-slides/TechSlide5DTOP.tsx` — title `Layer 5 · DTOP — The System of Work`
- `src/pages/TechnicalDeepDive.tsx` — sidebar labels prefixed `L1·…L5·`; tweak divider props (Layer 3 name)
- `src/exporters/pptx/buildTechnicalDeck.ts` — mirror all new titles in the PPTX header strings

**Untouched**
- All other slides (title/framing/value/close).
- Architecture diagram on Slide 4 (already canonical wording).

### Verification

1. `/pitch-technical` — every layer-specific slide title starts with `Layer N · <Layer Name>` matching the diagram on Slide 4.
2. Sidebar reads as 5 grouped sections (each `▸ Layer N` divider followed by `L N · …` children).
3. Download Editable PowerPoint — every layer slide header in the `.pptx` matches the new convention; nothing overflows the title bar.
4. PDF QA: convert pptx → PDF → JPEGs at 150 dpi; visually confirm no title clipping on the longest line (Layer 3 · Intelligence & Orchestration — Recommendations & Prescriptive Actions).

### Out of scope

- Changing slide content/layouts.
- Other decks.
- Renaming the layers themselves.

