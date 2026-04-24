

## Tech Deep Dive v4 — Visually unify Layers 2–4 as "The Platform"

Reframe Layers 2, 3, and 4 in the v4 deck so they read as **one integrated platform** (Intelligence + Mobile + DTOP), with Layer 1 (Core Apps) as the foundation it sits on. Visual treatment: a shared "Platform" wrapper/bracket around L2–L4 in the diagram and a unifying eyebrow label across the divider/title slides.

### Concept

```text
┌─────────────────────────────────────────────────┐
│  THE OPERATIONAL PERFORMANCE PLATFORM           │
│  ┌───────────────────────────────────────────┐  │
│  │  Layer 4 · DTOP — System of Work          │  │
│  ├───────────────────────────────────────────┤  │
│  │  Layer 3 · Unified Mobile Experience      │  │
│  ├───────────────────────────────────────────┤  │
│  │  Layer 2 · Intelligence & Orchestration   │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
   Layer 1 · Core Operational Apps  (foundation)
```

A single labelled bracket visually wraps L2–L4, signalling "these three layers ARE the platform — sold and delivered as one." L1 sits beneath as the system-of-record foundation that feeds it.

### Changes

**1. `PlatformArchitectureDiagramV4.tsx`** — wrap L2–L4 in a bracketed container
- Group the DTOP, Mobile, and Intelligence cards inside a single outer container with:
  - A subtle gradient border (emerald → violet → amber spanning the three layer accents)
  - A top-left eyebrow label: **"THE OPERATIONAL PERFORMANCE PLATFORM · ONE INTEGRATED SOLUTION"**
  - A right-side vertical "platform" bracket/spine
- Keep Core Apps (L1) visually separate below the bracket with a small "Foundation · Systems of Record" label.
- Preserve all 4 layer numbers, colours, and icons.

**2. `TechV4PlatformOverview.tsx`** — update the right-hand guide
- Add a short header above the 4 jump-buttons: **"Layers 2–4 = The Platform · Layer 1 = The Foundation"**
- Visually group the L2/L3/L4 buttons inside a soft bordered container (matching the diagram's bracket treatment); leave the L1 button sitting just outside/below.
- Keep all jump targets and copy unchanged.

**3. Divider slides for L2, L3, L4** (`TechnicalDeepDiveV4.tsx` `dividerProps`) — add a unifying eyebrow
- Add a new optional prop `platformGroupLabel` to `TechSlideLayerDivider` rendered above the existing "Layer N · Architecture" eyebrow, e.g. **"THE PLATFORM · PART OF ONE INTEGRATED SOLUTION"** in muted uppercase.
- Pass this prop on the `intelligence`, `mobile`, and `dtop` divider entries only. Omit on `core` so the foundation reads distinctly.
- Update each L2/L3/L4 divider tagline with a short shared phrasing cue, e.g. prepend *"Part of the platform —"* (kept short to preserve existing taglines).

**4. Title bar on the 6 v4 content slides** (`TechV4Slide7CoAnalyst`, `TechV4SlideInsights`, `TechV4SlideAutomation`, `TechV4SlideTiersVsAI`, `TechV4SlideMobile`, `TechV4Slide5DTOP`)
- No structural change. Optional micro-edit: shorten existing titles' "Layer N · …" prefix to read **"The Platform · Layer N · …"** so every L2–L4 slide visibly carries the unified frame. L1 slides keep "Layer 1 · …".

### Files

**EDITED**
- `src/components/platform-slides/PlatformArchitectureDiagramV4.tsx` — bracket wrapper around L2–L4 + platform eyebrow.
- `src/components/tech-slides/v4/TechV4PlatformOverview.tsx` — group L2–L4 buttons + header label.
- `src/components/tech-slides/TechSlideLayerDivider.tsx` — add optional `platformGroupLabel` prop rendered above the layer eyebrow. (Safe: v3 dividers omit the prop and stay unchanged.)
- `src/pages/TechnicalDeepDiveV4.tsx` — set `platformGroupLabel` on `intelligence`, `mobile`, `dtop` divider props; tweak taglines.
- 6 v4 slide titles (`TechV4Slide7CoAnalyst`, `TechV4SlideInsights`, `TechV4SlideAutomation`, `TechV4SlideTiersVsAI`, `TechV4SlideMobile`, `TechV4Slide5DTOP`) — prefix with **"The Platform · "**.

### Not touched

- v3 deck and v3 diagram — fully unchanged.
- Layer 1 (Core Apps) divider, slides, and styling — kept distinct as the foundation.
- Slide IDs, navigation, narration, exports.

### QA

- `/pitch-technical-v4` Platform Overview: a single bracketed container visibly wraps Intelligence, Mobile, and DTOP with the "Operational Performance Platform · One Integrated Solution" label; Core Apps sits separately below.
- L2, L3, L4 dividers each show the new "The Platform" eyebrow above the layer number; L1 divider does not.
- L2–L4 content slide titles read "The Platform · Layer N · …"; L1 slides read "Layer 1 · …".
- v3 (`/pitch-technical`) unchanged.

