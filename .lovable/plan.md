## Problem

The Executive Pitch · Medium PPTX export ships an outdated **Platform Overview** slide. The on-screen V4 deck now uses `PlatformArchitectureDiagramV4`, which collapses the old 5-layer stack into a **4-layer "platform group"** with the data substrate folded into the Intelligence layer. The PPTX still draws the legacy 5-layer stack (Layer 5 DTOP / Layer 4 Mobile / Layer 3 Intelligence / **Layer 2 Operational Data Foundation** / Layer 1 Core Apps) plus a 5-row right-side guide.

Slide order, divider captions, roadmap content, transformation, customer outcomes, and Why Comply365 already match. Only the architecture diagram is out of sync — but because the Tech V4 PPTX and the Customer Overview PPTX both reuse the same `byLabel("Platform Overview")` spec, the same drift exists in those two exports as well.

## Verified differences (on-screen vs PPTX)

| Element | On-screen V4 (current) | PPTX spec (stale) |
|---|---|---|
| Layer count | 4 (3 wrapped as "The Platform" + Foundation) | 5 separate layers |
| Data layer | Folded into Intelligence (substrate caption) | Standalone "Layer 2 · Operational Data Foundation" |
| Layer numbers | Hidden / unnumbered | "LAYER 5/4/3/2/1" labels |
| Group framing | "The Operational Performance Platform · One Integrated Solution" wrapping L4–L2 | None |
| Intelligence sub-cards | Automation · Insights & Intelligence · **Recommendations & Prescriptive Actions (Future Vision)** | Insights · Recommendations · Automation (no Future Vision treatment) |
| Right-side guide | 4 rows | 5 rows |
| Pill labels | System of work / Delivery / System of action / System of record | Same + extra "Substrate" row |

Order across all 18 slides of Exec3 already matches the page; no reordering needed.

## Plan

1. **Rewrite `Platform Overview` spec** in `src/exporters/pptx/buildTechnicalDeck.ts` to mirror `PlatformArchitectureDiagramV4`:
   - Outer rounded "platform group" rectangle wrapping the top three layers, with eyebrow text "THE OPERATIONAL PERFORMANCE PLATFORM · ONE INTEGRATED SOLUTION".
   - Inside the group, top-to-bottom:
     - **DTOP** strip — emerald accent, "System of work" pill, tagline "Detect → Trigger → Orchestrate → Prove · wraps the whole stack".
     - **Unified Mobile Experience** strip — violet accent, "Delivery" pill, tagline "One trusted shell · SSO · Procedures · Training · Safety".
     - **Intelligence & Orchestration** card (taller) — amber accent, "System of action" pill, substrate caption "Built on a unified data substrate · taxonomy · knowledge graph · aviation LLMs", and three sub-tiles:
       - Automation (violet) — "Cross-product workflows"
       - Insights & Intelligence (amber) — "Ask anything in plain English"
       - Recommendations & Prescriptive Actions (cyan, with small "FUTURE VISION" eyebrow) — "Patterns + prescriptive next steps"
   - Below the group: small "FOUNDATION · SYSTEMS OF RECORD" eyebrow, then the **Core Operational Apps** card (blue accent, "System of record" pill) with three sub-tiles for ContentManager365 (blue), TrainingManager365 (emerald), SafetyManager365 (rose).
   - Right-hand guide reduced to **4 rows** (DTOP / Unified Mobile / Intelligence & Orchestration / Core Operational Apps) using the same colors, with descriptions matching the on-screen `guide` array in `TechSlide4Platform.tsx`.
   - Header line stays "The Operational Performance Platform" with subtitle "One integrated platform. Wired together by DTOP."

2. **No other code changes required.** The Exec3 builder's `byLabel("Platform Overview")` lookup and footer override already work — they will pick up the new diagram automatically. The Customer Overview and Tech V4 exports inherit the fix as a bonus, which is the intended behaviour (their on-screen decks use the same V4 diagram).

3. **QA pass** — build all three decks (`tech-deep-dive`, `executive-pitch-3`, `customer-overview`), open the Platform Overview slide in each, confirm:
   - 4-layer layout renders without overflow on the 16:9 canvas.
   - Right-side guide aligns vertically with the left stack.
   - "Recommendations" sub-tile shows the FUTURE VISION eyebrow.
   - Footer label still reads correctly per deck ("Technical Deep Dive", "Executive Pitch · Medium", "Customer Overview").

## Files to edit

- `src/exporters/pptx/buildTechnicalDeck.ts` — replace the `build` function of the `Platform Overview` slide spec (lines ~945–1057). Everything else stays as-is.

## Out of scope

- No changes to slide order, divider captions, roadmap, transformation, customer outcomes, or Why Comply365 — they already match the on-screen Exec3 deck.
- No changes to the Customer Overview or Tech V4 builders themselves; they automatically benefit from the shared spec update.
