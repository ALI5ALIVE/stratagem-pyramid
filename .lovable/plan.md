

## Technical Deep-Dive — Layer Context + Slide Reorder

Two fixes: (1) add a small architecture-layer locator to every capability slide so the audience always knows where they are in the stack, (2) move Platform Integrations out of the architecture section and place it next to Use Cases as proof.

## Fix 1 — Reorder slides

Platform Integrations (case studies) is currently slide 8, breaking the Architecture → Intelligence flow. Move it to Act 4 next to Use Cases so customer evidence sits with the use-case story.

```text
Current Act 2:   Platform → Safety → Content → Training → Data Foundation → INTEGRATIONS → (CoAnalyst…)
Revised Act 2:   Platform → Safety → Content → Training → Data Foundation
Revised Act 4:   Mobile → DTOP → Use Cases → INTEGRATIONS (proof)
```

File: `src/pages/TechnicalDeepDive.tsx` — move `tech-slide-6` from position 8 to after `tech-slide-use-cases`. Section comments updated.

## Fix 2 — New `ArchitectureLayerBadge` component

Create `src/components/tech-slides/ArchitectureLayerBadge.tsx`: a compact horizontal mini-stack that renders the 5 layers as small pills with the active layer highlighted. Renders top-right of each capability slide's title area (or as an inline strip below the subtitle on dense slides).

Visual:
```text
[ DTOP ] [ Mobile ] [ Intelligence ] [▣ Data Foundation ] [ Core Apps ]
                                       ^ active (cyan glow, label bold)
```

Props:
```ts
type Layer = "dtop" | "mobile" | "intelligence" | "data" | "core";
interface Props { active: Layer; sublayer?: "coanalyst" | "insights" | "automation" | "content" | "training" | "safety"; }
```

When `sublayer` is set on Intelligence or Core layers, it also highlights the matching sub-pill (CoAnalyst / Insights / Automation, or Content / Training / Safety).

Colour matches the existing `PlatformArchitectureDiagram` palette (emerald=DTOP, violet=Mobile, amber=Intelligence, cyan=Data, blue=Core).

## Fix 3 — Embed badge in 9 capability slides

Add `<ArchitectureLayerBadge>` to each:

| Slide | Active layer | Sublayer |
|---|---|---|
| TechSlide4aSafetyManager | core | safety |
| TechSlide4bContentManager | core | content |
| TechSlide4cTrainingManager | core | training |
| TechSlideDataFoundation | data | — |
| TechSlide7CoAnalyst | intelligence | coanalyst |
| TechSlideInsights | intelligence | insights |
| TechSlideAutomation | intelligence | automation |
| TechSlideTiersVsAI | intelligence | — (whole layer) |
| TechSlideMobile | mobile | — |
| TechSlide5DTOP | dtop | — |

Placement: a thin horizontal strip directly under the slide subtitle inside `SalesSlideContainer`'s children (so the existing title/subtitle and narration controls are untouched). Strip is `~28px` tall, `shrink-0`, doesn't affect existing layouts.

## Out of scope

- No copy or data changes.
- No changes to Act 1 problem slides, Act 5 closing slides, or `TechSlide4Platform` (already shows the full diagram).
- Narration scripts unchanged.

## Files touched

- New: `src/components/tech-slides/ArchitectureLayerBadge.tsx`
- Edit: `src/pages/TechnicalDeepDive.tsx` (reorder only)
- Edit: 10 slide components listed above (one-line badge insertion each)

