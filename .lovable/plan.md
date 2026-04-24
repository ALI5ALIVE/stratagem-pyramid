

## Align ExecutivePitch3, CustomerOverview, and SalesEnablement to Tech Deep Dive v4

Use `TechnicalDeepDiveV4` as the canonical source for architecture framing, slide components, divider props, and naming. Three other decks still reference v3 architecture slides ("5-Layer", "Layer 1/2/3/4/5", `PFSlide2WhatIs`, `TechSlide4Platform`, `TechSlide6Capabilities`, `TechSlideDataFoundation`, v3 `TechSlide7CoAnalyst`, v3 `TechSlideMobile`, v3 `TechSlide5DTOP`). This pass swaps them to v4 components and removes layer numbering.

### v4 reference (do not change)

- **Architecture overview**: `TechV4PlatformOverview`
- **Core apps**: `TechV4Slide4aSafetyManager`, `TechV4Slide4bContentManager`, `TechV4Slide4cTrainingManager`
- **Intelligence & Orchestration** (data substrate folded in): `TechV4Slide7CoAnalyst`, `TechV4SlideInsights`, `TechV4SlideAutomation`, `TechV4SlideTiersVsAI`
- **Mobile**: `TechV4SlideMobile`
- **DTOP**: `TechV4Slide5DTOP`
- **Dividers**: `TechSlideLayerDivider` with `hideLayerNumber: true` and `platformGroupLabel: "The Platform · Part of One Integrated Solution"`
- **Framing**: 4 named bands (Core Apps · Intelligence & Orchestration · Mobile · DTOP). No "Layer N", no "5-layer", no separate Data Foundation slide.

### Changes per deck

**1. `src/pages/ExecutivePitch3.tsx`**

- Replace imports:
  - `TechSlide4Platform` → `TechV4PlatformOverview`
  - `TechSlide6Capabilities` (Core Operational Apps) → remove (covered by `TechV4PlatformOverview` + core dividers)
  - `ExecCoreAppsSummary` → replace the 3 core-app slides with `TechV4Slide4aSafetyManager`, `TechV4Slide4bContentManager`, `TechV4Slide4cTrainingManager`
  - `TechSlideDataFoundation` → remove (folded into Intelligence in v4)
  - v3 `TechSlide7CoAnalyst` → `TechV4Slide7CoAnalyst` (also add `TechV4SlideInsights`, `TechV4SlideAutomation`, `TechV4SlideTiersVsAI`)
  - v3 `TechSlideMobile` → `TechV4SlideMobile`
  - v3 `TechSlide5DTOP` → `TechV4Slide5DTOP`
- Rewrite `dividerProps` to mirror v4: drop `data` divider; for `core`/`intelligence`/`mobile`/`dtop` set `hideLayerNumber: true`, drop `layerNumber`, add `platformGroupLabel` on intelligence/mobile/dtop, update taglines to v4 wording, update `upNext` lists.
- Update slide list to v4 order: Title → Strategic Shift → Industry Challenge → Platform Overview → Core divider → 3 core-app slides → Intelligence divider → CoAnalyst → Insights → Automation → Tiers vs Generic AI → Mobile divider → Mobile → DTOP divider → DTOP → Transformation → Use Cases → Maturity → Outcomes → Why Comply365.
- Rename labels to drop "Layer N" wording.

**2. `src/pages/CustomerOverview.tsx`**

- Replace `PFSlide2WhatIs` ("What the Platform Is") with `TechV4PlatformOverview` (canonical v4 architecture slide).
- Keep the rest of the deck (TechSlide2IndustryChallenge, TechSlide1StrategicShift, Slide4Transformation, PFSlide9Value, SlideUseCases, CustomerOutcomesSlide, Slide5MaturityCurve, COClosingFirst90Days) — these are persona-summary slides, not architecture slides.
- Update slide label `"What the Platform Is"` → `"The Platform"`.

**3. `src/pages/SalesEnablement.tsx`**

- **Module 2** (What it is):
  - `PFSlide2WhatIs` → `TechV4PlatformOverview`
  - `TechSlide4Platform` ("5-Layer Map") → remove (replaced by Platform Overview); rename module copy: drop "5-layer" terms — change `moduleProps.m2.title` to `"What the platform is, in plain English"` (already correct) and change `learningGoal` from "five layers" to `"four named capability bands"`. Update `upNext` accordingly: replace `"The 5-layer mental model"` with `"The platform at a glance"`.
- **Module 3** (How layers fit together) → rename to **"How the platform fits together"**:
  - Update `moduleProps.m3.title` to `"How the capabilities fit together"`, learningGoal to `"… describe each capability in 60 seconds and ask one good discovery question per capability"`, `upNext` to `["Core Apps", "Intelligence & Orchestration", "Mobile", "DTOP", "Capability cheat sheet"]`.
  - Replace slide entries:
    - `se-slide-l1` "M3 · Layer 1 — Core Apps" (`ExecCoreAppsSummary`) → split into 3 slides: `TechV4Slide4aSafetyManager`, `TechV4Slide4bContentManager`, `TechV4Slide4cTrainingManager` (or keep one summary + drop layer label — see option below).
    - `se-slide-l2` "M3 · Layer 2 — Data" (`TechSlideDataFoundation`) → **remove** (folded into Intelligence in v4).
    - `se-slide-l3` "M3 · Layer 3 — Intelligence" (v3 CoAnalyst) → `TechV4Slide7CoAnalyst`; also add `TechV4SlideInsights`, `TechV4SlideAutomation`, `TechV4SlideTiersVsAI`.
    - `se-slide-l4` "M3 · Layer 4 — Mobile" (v3 Mobile) → `TechV4SlideMobile`.
    - `se-slide-l5` "M3 · Layer 5 — DTOP" (v3 DTOP) → `TechV4Slide5DTOP`.
  - Rename all M3 slide labels to drop "Layer N" — e.g. `"M3 · Core Apps — SafetyManager365"`, `"M3 · Intelligence — CoAnalyst"`, `"M3 · Mobile"`, `"M3 · DTOP"`.
- **`SELayerTalkTrack.tsx`**: edit content to map 4 capability bands (Core Apps, Intelligence & Orchestration, Mobile, DTOP) instead of 5 layers; remove "Layer 1–5" labels and the Data Foundation row. Title becomes `"Capability talk track"`.
- **`SERecapSlide.tsx`** (M2 recap): audit Q&A copy; replace any "five layers" mention with "four capabilities".

### Files

**EDITED**
- `src/pages/ExecutivePitch3.tsx`
- `src/pages/CustomerOverview.tsx`
- `src/pages/SalesEnablement.tsx`
- `src/components/sales-enablement-slides/SELayerTalkTrack.tsx`
- `src/components/sales-enablement-slides/SERecapSlide.tsx` (only if it mentions 5 layers/Data Foundation)

**NOT TOUCHED**
- `src/pages/TechnicalDeepDiveV4.tsx` (the reference)
- `src/pages/TechnicalDeepDive.tsx` (v3) and all v3 slide components — preserved for the original 5-layer deck
- `src/pages/ExecutivePitch.tsx`, `ExecutivePitch2.tsx`, `OperationalPitch.tsx`, `PlatformPlaybook.tsx` — out of scope for this request
- All v4 slide components themselves (already aligned)
- Slide IDs are kept where possible to preserve narration mapping; new IDs use `…-4a/4b/4c/insights/automation/tiers-vs-ai` to match v4 naming.

### Open question

For SalesEnablement Module 3 Core Apps coverage, two options:
- **A (recommended, matches v4)**: Three separate slides — SafetyManager365, ContentManager365, TrainingManager365 (mirrors Tech v4).
- **B (compact for reps)**: Keep `ExecCoreAppsSummary` as a single "Core Apps" slide and skip the three deep-dive slides.

Plan above assumes **option A**. If you'd prefer option B for rep training brevity, say so and I'll swap.

### QA

- `/pitch-executive-3`: 4-band architecture only (Core, Intelligence, Mobile, DTOP); no "Layer N" labels; no Data Foundation slide; v4 slide components rendered.
- `/customer-overview`: "What the Platform Is" replaced with `TechV4PlatformOverview`; no other regressions.
- `/sales-enablement`: M2 uses `TechV4PlatformOverview`; M3 uses v4 components in 4 capability sections; no "Layer 1–5" copy; talk track and recap match 4-band model.
- `/pitch-technical-v4` (reference) and `/pitch-technical` (v3): unchanged.

