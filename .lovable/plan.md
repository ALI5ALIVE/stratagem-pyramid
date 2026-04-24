

## Tech Deep Dive v4 — Renumber Layers 3→2, 4→3, 5→4

The four CoAnalyst/Intelligence slides currently say "Layer 3", Mobile says "Layer 4", and DTOP says "Layer 5" — these were inherited from v3's 5-layer model. v4 has only 4 layers, so they need to read **Layer 2** (Intelligence), **Layer 3** (Mobile), **Layer 4** (DTOP) to match the v4 diagram and dividers.

### Approach

Clone the 6 affected slides into `src/components/tech-slides/v4/` with renumbered titles only. v3 (`/pitch-technical`) stays fully untouched and continues to use the original Layer 3/4/5 labels.

### Files

**NEW** (each is a near-identical copy of its v3 sibling, with only the `title` string changed):

| New v4 file | Source | Title change |
|---|---|---|
| `src/components/tech-slides/v4/TechV4Slide7CoAnalyst.tsx` | `TechSlide7CoAnalyst.tsx` | `Layer 3 · …` → `Layer 2 · Intelligence & Orchestration — Insights & Intelligence (CoAnalyst)` |
| `src/components/tech-slides/v4/TechV4SlideInsights.tsx` | `TechSlideInsights.tsx` | `Layer 3 · …` → `Layer 2 · Intelligence & Orchestration — Recommendations & Prescriptive Actions` |
| `src/components/tech-slides/v4/TechV4SlideAutomation.tsx` | `TechSlideAutomation.tsx` | `Layer 3 · …` → `Layer 2 · Intelligence & Orchestration — Automation` |
| `src/components/tech-slides/v4/TechV4SlideTiersVsAI.tsx` | `TechSlideTiersVsAI.tsx` | `Layer 3 · …` → `Layer 2 · Intelligence & Orchestration — CoAnalyst Intelligence Tiers vs Generic AI` |
| `src/components/tech-slides/v4/TechV4SlideMobile.tsx` | `TechSlideMobile.tsx` | `Layer 4 · Unified Mobile Experience` → `Layer 3 · Unified Mobile Experience` |
| `src/components/tech-slides/v4/TechV4Slide5DTOP.tsx` | `TechSlide5DTOP.tsx` | `Layer 5 · DTOP — The System of Work` → `Layer 4 · DTOP — The System of Work` |

Slide IDs are preserved (e.g. `tech-slide-coanalyst`, `tech-slide-mobile`, `tech-slide-5`) so existing jump-target links from `TechV4PlatformOverview` continue to resolve.

**EDITED**

- `src/pages/TechnicalDeepDiveV4.tsx` — swap the 6 imports from the originals to the new `v4/` versions. No changes to slide order, ids, dividers, or `upNext` (already correct: Intelligence divider is `layerNumber: 2`, Mobile `3`, DTOP `4`).

### Not touched

- v3 page, v3 slides, `TechSlideLayerDivider` stack constants, `TechSlide4Platform` (v3 platform overview) — all unchanged.
- `ArchitectureLayerBadge`, `PlatformArchitectureDiagramV4`, all other v4 components — already correct.

### QA

- `/pitch-technical-v4`: confirm CoAnalyst, Insights, Automation, TiersVsAI all read **"Layer 2 · Intelligence & Orchestration — …"**; Mobile reads **"Layer 3 · Unified Mobile Experience"**; DTOP reads **"Layer 4 · DTOP — The System of Work"**.
- Confirm sequence Layer 1 → 2 → 3 → 4 matches the 4-band v4 diagram.
- `/pitch-technical` (v3): unchanged — still reads Layer 3/4/5.

