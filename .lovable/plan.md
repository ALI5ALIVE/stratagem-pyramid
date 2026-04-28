## Problem

The "Operational Performance Platform" architecture is currently rendered three different ways across the app, so the same concept looks different depending on which deck you're viewing:

1. **`PlatformArchitectureDiagramV4`** (new, updated) — `The Platform · One Integrated Solution` wrapper, DTOP at top, Intelligence layer with data substrate folded in, Core Apps as foundation. **Currently used only by Tech V4 / Exec Pitch 3.**
2. **`PlatformArchitectureDiagram`** (older, 5-layer) — separate "Operational Data Foundation" layer, no Platform wrapper. Used by:
   - `PFSlide3Architecture.tsx` (Platform Playbook)
   - `TechSlide4Platform.tsx` (Tech V1 deep dive)
3. **`PlatformEcosystemDiagram`** (static PNG) — used by:
   - `ExecSlide3Platform.tsx` (Exec Pitch V1)
   - `OpsSlide4Platform.tsx` (Operational Pitch)
   - `Slide3OperatingModel.tsx` (legacy Slide Deck)
   - `HomepageMockup.tsx` (homepage hero)

Result: the diagram on Exec Pitch 3 / Tech V4 doesn't match what an exec sees on the Operational Pitch, Exec V1, or homepage.

## Fix — single source of truth

Promote `PlatformArchitectureDiagramV4` to be **the** canonical platform diagram, and route every other surface to it.

### Step 1 — Rename / consolidate (no behavior change)

- Keep `PlatformArchitectureDiagramV4.tsx` as the source of truth.
- Delete the older `PlatformArchitectureDiagram.tsx` (5-layer variant).
- Re-export `PlatformArchitectureDiagramV4` as `PlatformArchitectureDiagram` from a single index for cleaner imports going forward (optional polish — not strictly required).

### Step 2 — Switch all consumers to V4

Update these slides to import and render `PlatformArchitectureDiagramV4` (with `compact` prop where space is tight):

| File | Current | After |
|---|---|---|
| `src/components/platform-slides/PFSlide3Architecture.tsx` | `PlatformArchitectureDiagram` | `PlatformArchitectureDiagramV4` |
| `src/components/tech-slides/TechSlide4Platform.tsx` | `PlatformArchitectureDiagram` | `PlatformArchitectureDiagramV4 compact` |
| `src/components/exec-slides/ExecSlide3Platform.tsx` | `PlatformEcosystemDiagram` (PNG) | `PlatformArchitectureDiagramV4` |
| `src/components/ops-slides/OpsSlide4Platform.tsx` | `PlatformEcosystemDiagram` (PNG) | `PlatformArchitectureDiagramV4` |
| `src/components/slides/Slide3OperatingModel.tsx` | `PlatformEcosystemDiagram` (PNG) | `PlatformArchitectureDiagramV4` |

For each swap, lightly adjust the surrounding grid/padding so the taller V4 diagram fits without clipping (the slides currently constrain the PNG to ~500px width; V4 is a flex column that wants full available height).

### Step 3 — Homepage decision

`HomepageMockup.tsx` uses the marketing PNG in a hero. Two options:

- **(A, recommended)** Leave the homepage PNG alone — it's a polished marketing asset, not a deck slide. Mark it explicitly as the "marketing" variant in a code comment so it's clear it's intentional.
- **(B)** Also swap to the V4 React diagram for full consistency.

Default to (A) unless you say otherwise.

### Step 4 — Update PPTX exporters to match

`src/exporters/pptx/buildTechnicalDeck.ts` already renders a hand-built platform slide tuned to the older 5-layer diagram. Update its layer specs so the exported PPTX matches V4:

- DTOP at top (emerald)
- Unified Mobile (violet)
- Intelligence & Orchestration with substrate text + 3 capability tiles (Automation, Insights, Recommendations-as-Future-Vision)
- Core Operational Apps as foundation (no separate Operational Data Foundation row)
- Wrap L2–L4 in a "The Operational Performance Platform · One Integrated Solution" frame

Apply the same shape to `buildExecutivePitch3Deck.ts` if/where it renders the platform slide (it currently reuses the tech registry, so a single fix in `buildTechnicalDeck.ts` covers both).

### Step 5 — QA

- Walk every affected deck (Platform Playbook, Tech V1, Tech V4, Exec V1, Exec Pitch 3, Operational Pitch, legacy SlideDeck) and confirm the platform slide renders the same V4 diagram with no clipping at 1148×781 and at 1920×1080.
- Re-export the Tech V1 / Exec Pitch 3 PPTX and visually QA the platform slide page.

## Open question

Confirm the homepage choice:

- (A) Keep the marketing PNG on the homepage, swap everywhere else. *(recommended)*
- (B) Swap the homepage too, retire the PNG entirely.

If you don't reply, I'll go with (A).
