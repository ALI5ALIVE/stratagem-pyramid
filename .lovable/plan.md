## Goal
Add a Week 2 opener/recap slide to the Sales Enablement deck that uses the canonical **"Operational Performance Platform"** diagram (the one shown on `TechV4PlatformOverview` / `OpsSlide4Platform`) — placed immediately after the Week 2 divider, before reps drop into capability‑by‑capability slides.

This anchors Week 2 in the whole-platform picture so reps "see the map" before walking each capability.

## Changes

### 1. New slide component
Create `src/components/sales-enablement-slides/SEWeek2PlatformOverview.tsx`.

- Wraps `PlatformArchitectureDiagramV4` (already used by Tech V4 + Ops decks — single source of truth) inside `PitchSlideContainer` so it matches the rest of the SE deck chrome.
- Title: **"The Operational Performance Platform"**
- Subtitle: **"One integrated platform. Wired together by DTOP."**
- Layout: diagram on the left (≈60%), right column lists the 4 things they'll learn this week:
  - **Core Apps · Foundation** — SafetyManager365 · ContentManager365 · TrainingManager365
  - **Intelligence & Orchestration** — Intelligence Layer · Insights · Automation
  - **Unified Mobile** — one trusted shell for the frontline
  - **DTOP** — the way of working that wires it all together (already covered in Week 1)
- Small footer label: "Week 2 map · we'll walk each block in turn."
- No interactive jump-to behaviour (that's a Tech-deck feature) — this is a static teaching map.

### 2. Register the slide in the Week 2 sequence
In `src/pages/SalesEnablement.tsx`:
- Import `SEWeek2PlatformOverview`.
- Insert a new entry **immediately after** the `se-week-2` divider and **before** `se-slide-4a`:
  ```
  { id: "se-week-2-overview", label: "W2 · The Platform (map)", component: SEWeek2PlatformOverview },
  ```

### 3. Narration (Coach Script Standard, 5-part)
Add an entry for `se-week-2-overview` in `src/data/salesEnablementNarration.ts` following the locked 5-part teaching format:
1. **Why this slide matters** — reps need the whole-platform picture before drilling into capabilities, so each capability lands as part of one system, not a feature list.
2. **Core message** — "Comply365 is one Operational Performance Platform. Three Core Apps, an Intelligence & Orchestration layer on top, one Unified Mobile shell for the frontline, all wired together by DTOP."
3. **Pain → value pivot** — prospects buy capabilities one at a time and end up with five-to-seven disconnected tools; this slide reframes the conversation around one foundation.
4. **How to deliver it** — point at the diagram in this order: Core Apps → Intelligence layer → Mobile → DTOP wrapping. Don't say "modules" or "suite" — say "one platform". Don't use FOQA / FDM / ASAP.
5. **Transition** — "Now we walk each block in the order shown — starting with SafetyManager365."

## Out of scope
- No changes to the existing capability slides or to the Tech deck.
- No new diagram variant — we reuse `PlatformArchitectureDiagramV4` so the platform picture stays consistent across Tech, Ops and Sales Enablement decks.
- No academy DB rows added — this is a deck slide, not a new module.