

## Tech Deep Dive v4 — Remove all "Layer N" references

Strip the "Layer 1/2/3/4" numbering from the v4 deck so the architecture reads as one platform with named capabilities, not a numbered stack. v3 stays untouched.

### Changes

**1. `PlatformArchitectureDiagramV4.tsx`** — remove "Layer N ·" prefixes from each band's label/eyebrow. Bands become simply:
- DTOP — The System of Work
- Unified Mobile Experience
- Intelligence & Orchestration
- Core Operational Apps (Foundation)

Keep the bracket wrapper and "THE OPERATIONAL PERFORMANCE PLATFORM · ONE INTEGRATED SOLUTION" eyebrow. Drop any "Layers 2–4 / Layer 1" wording — replace with "The Platform / The Foundation".

**2. `TechV4PlatformOverview.tsx`** — remove the "Layers 2–4 = The Platform · Layer 1 = The Foundation" header text; replace with "The Platform · The Foundation". Strip "Layer N ·" from each guide button label so they read as the capability name only.

**3. `TechSlideLayerDivider.tsx`** — hide the "Layer N · Architecture" eyebrow when a new optional `hideLayerNumber` prop (or empty `layerNumber`) is passed. Keep `platformGroupLabel` rendering. v3 unaffected (omits the prop).

**4. `TechnicalDeepDiveV4.tsx` `dividerProps`** — set the new prop on all four dividers (intelligence, mobile, dtop, core) so no "Layer N" eyebrow renders. Rewrite taglines/up-next text to drop any "Layer N" phrasing.

**5. Six v4 slide titles** — remove the "Layer N · " segment from each:
- `TechV4Slide7CoAnalyst`: `The Platform · Intelligence & Orchestration — Insights & Intelligence (CoAnalyst)`
- `TechV4SlideInsights`: `The Platform · Intelligence & Orchestration — Recommendations & Prescriptive Actions`
- `TechV4SlideAutomation`: `The Platform · Intelligence & Orchestration — Automation`
- `TechV4SlideTiersVsAI`: `The Platform · CoAnalyst Intelligence Tiers vs Generic AI`
- `TechV4SlideMobile`: `The Platform · Unified Mobile Experience`
- `TechV4Slide5DTOP`: `The Platform · DTOP — The System of Work`

**6. `ArchitectureLayerBadge.tsx`** — change the "Architecture" prefix label so the row of pills no longer reads "Layer". Each pill keeps the layer name (DTOP, Mobile, Intelligence, Core) but drops any "Layer N" wording. Used by v4 content slides; v3 also uses it but never displayed "Layer N" on the pills, so v3 visual is unchanged.

### Files

**EDITED**
- `src/components/platform-slides/PlatformArchitectureDiagramV4.tsx`
- `src/components/tech-slides/v4/TechV4PlatformOverview.tsx`
- `src/components/tech-slides/TechSlideLayerDivider.tsx` (additive prop — v3 safe)
- `src/pages/TechnicalDeepDiveV4.tsx` (set prop + tagline copy)
- `src/components/tech-slides/v4/TechV4Slide7CoAnalyst.tsx`
- `src/components/tech-slides/v4/TechV4SlideInsights.tsx`
- `src/components/tech-slides/v4/TechV4SlideAutomation.tsx`
- `src/components/tech-slides/v4/TechV4SlideTiersVsAI.tsx`
- `src/components/tech-slides/v4/TechV4SlideMobile.tsx`
- `src/components/tech-slides/v4/TechV4Slide5DTOP.tsx`
- `src/components/tech-slides/ArchitectureLayerBadge.tsx` (label-only tweak — pills already named, no v3 visual regression)

### Not touched

- v3 deck, v3 diagram, v3 slides, v3 page.
- Slide IDs, navigation order, narration, exports.

### QA

- `/pitch-technical-v4`: diagram shows 4 named bands with no "Layer 1/2/3/4" text; bracket and platform eyebrow remain.
- Platform Overview guide buttons read as capability names only.
- All four dividers render without a "Layer N · Architecture" eyebrow; "The Platform" eyebrow still appears on intelligence/mobile/dtop.
- All six content slide titles begin with "The Platform · " (no "Layer N").
- `/pitch-technical` (v3) unchanged — still reads Layer 1–5.

