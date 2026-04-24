

## Tech Deep Dive v4 — Strip remaining "Layer" references from Core Apps + sidebar

The previous pass missed the three Core Operational App slide titles (SafetyManager365, ContentManager365, TrainingManager365) and several v4 page sidebar labels, all of which still say "Layer 1" or "L1". Because those three slide files are also used by v3 (`/pitch-technical`), they must be cloned into `v4/` rather than edited in place.

### Changes

**1. Clone the 3 core app slides into `src/components/tech-slides/v4/`** with title prefix removed:

| New v4 file | Source | Title change |
|---|---|---|
| `TechV4Slide4aSafetyManager.tsx` | `TechSlide4aSafetyManager.tsx` | `Layer 1 · Core Operational Apps — SafetyManager365` → `Core Operational Apps — SafetyManager365` |
| `TechV4Slide4bContentManager.tsx` | `TechSlide4bContentManager.tsx` | `Layer 1 · Core Operational Apps — ContentManager365 + CoAuthor` → `Core Operational Apps — ContentManager365 + CoAuthor` |
| `TechV4Slide4cTrainingManager.tsx` | `TechSlide4cTrainingManager.tsx` | `Layer 1 · Core Operational Apps — TrainingManager365 + CoTrainer` → `Core Operational Apps — TrainingManager365 + CoTrainer` |

Slide IDs (`tech-slide-4a/4b/4c`) preserved so jump-links still resolve. ` ArchitectureLayerBadge` usage retained — already de-numbered in the previous pass.

**2. `src/pages/TechnicalDeepDiveV4.tsx`** — clean up sidebar labels and imports
- Swap the 3 imports above to the new `v4/` versions.
- Sidebar `label` strings: `L1 · SafetyManager365` → `SafetyManager365` (same for ContentManager365, TrainingManager365).
- Sidebar label for Platform Overview: `Platform Overview (4-layer)` → `Platform Overview`.
- Remove the `// (4-layer)` and `// — v4 renumbered (Layer 2)` / `(Layer 3, Layer 4)` comments in the import section.

**3. Audit pass — search v4 surface for stragglers** and clean any remaining "Layer N" / "L1/L2/L3/L4" / "(4-layer)" text in:
- `TechV4PlatformOverview.tsx` (any leftover button labels or copy)
- `TechV4SlideIntelligenceSubstrate.tsx` — only if still imported anywhere on v4 (it should be unused; if so, leave the file alone).
- `dividerProps` taglines/`upNext` strings in `TechnicalDeepDiveV4.tsx`.

### Files

**NEW**
- `src/components/tech-slides/v4/TechV4Slide4aSafetyManager.tsx`
- `src/components/tech-slides/v4/TechV4Slide4bContentManager.tsx`
- `src/components/tech-slides/v4/TechV4Slide4cTrainingManager.tsx`

**EDITED**
- `src/pages/TechnicalDeepDiveV4.tsx` (imports, sidebar labels, comments)
- `src/components/tech-slides/v4/TechV4PlatformOverview.tsx` (only if any "Layer" text remains)

### Not touched

- v3 page, v3 core app slide files, v3 sidebar labels — fully unchanged.
- All other v4 slides already cleaned in the previous pass.
- Slide IDs, navigation, narration, exports.

### QA

- `/pitch-technical-v4`: SafetyManager365, ContentManager365, TrainingManager365 slide titles no longer contain "Layer 1".
- v4 sidebar contains zero "Layer N" / "L1/L2/L3/L4" / "(4-layer)" strings.
- `/pitch-technical` (v3) Core App slides still read "Layer 1 · Core Operational Apps — …".

