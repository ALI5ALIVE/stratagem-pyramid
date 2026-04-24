

## Technical Deep Dive v4 — Final 4-layer cleanup

Three small fixes to make v4 visually consistent with the 4-layer story.

### Changes

1. **Remove the "Layer 2 · Data Substrate" slide** from the v4 deck.
   - File: `src/pages/TechnicalDeepDiveV4.tsx`
   - Drop the `tech-slide-intelligence-substrate` entry from the `slides` array.
   - Remove the corresponding "Data substrate (taxonomy · graph · LLMs)" item from the Intelligence divider's `upNext` list.
   - Soften the Intelligence divider tagline to no longer promise a dedicated substrate slide: *"Insights, Recommendations and Automation — one layer that turns operational data into action."*

2. **Relabel Mobile and DTOP dividers** so Layer 3 reads correctly.
   - Already done in v4 (`mobile.layerNumber = 3`, `dtop.layerNumber = 4`). Re-verify after the slide removal — no further change expected.

3. **Remove "Operational Data Foundation" from the technical diagram (v4 only).**
   - Create a new component `src/components/platform-slides/PlatformArchitectureDiagramV4.tsx` — a copy of `PlatformArchitectureDiagram` with the cyan "Operational Data Foundation" band deleted. Remaining bands: DTOP (top) → Unified Mobile → Intelligence & Orchestration → Core Operational Apps.
   - Update `src/components/tech-slides/v4/TechV4PlatformOverview.tsx` to import and render `PlatformArchitectureDiagramV4` instead of the 5-layer original.
   - v3 (`/pitch-technical`) keeps the original 5-layer diagram — fully untouched.

### Files touched

**NEW**
- `src/components/platform-slides/PlatformArchitectureDiagramV4.tsx`

**EDITED**
- `src/pages/TechnicalDeepDiveV4.tsx` — remove substrate slide entry; update Intelligence divider `upNext` and tagline.
- `src/components/tech-slides/v4/TechV4PlatformOverview.tsx` — swap to `PlatformArchitectureDiagramV4`.

**NOT TOUCHED**
- `TechV4SlideIntelligenceSubstrate.tsx` — left in the codebase (orphaned), harmless. Can be deleted in a future pass.
- v3 page, original diagram, all other slides.

### QA

- `/pitch-technical-v4`: confirm the substrate slide no longer appears between the Intelligence divider and the Insights slide.
- Confirm the Platform Overview slide's diagram shows exactly 4 bands (DTOP, Mobile, Intelligence, Core) — no cyan Data Foundation band.
- Confirm Mobile divider still reads "Layer 3" and DTOP still reads "Layer 4".
- `/pitch-technical` (v3) unchanged — still shows 5 bands and the Data Foundation slide.

