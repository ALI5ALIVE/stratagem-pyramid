

## Overlay DTOP onto Regulation Management — consistently across summary + playbook

### Why

The Regulation Management story today doesn't visibly map to the platform's master operating model (Detect → Trigger → Orchestrate → Prove). That makes it feel like a standalone product rather than a first-class expression of DTOP. Fixing this in two places — the **Tech Deep Dive summary slide** and the **RM Playbook itself** — gives one consistent story.

### The DTOP overlay for Regulation Management

Map RM's existing capabilities to the four DTOP steps. This becomes the canonical mapping reused everywhere:

| DTOP step | RM expression | Source data |
|---|---|---|
| **Detect** (sky) | Continuous monitoring of EASA/FAA/ICAO/CAA changes; structured regulation ingestion | Layer 1 + Pillar "Proactive Change Readiness" |
| **Trigger** (amber) | Automated impact alerts when a regulation change hits a linked procedure / syllabus / risk assessment | Pillar "Connected Cross-System Intelligence" |
| **Orchestrate** (purple) | Cascade updates into ContentManager365, TrainingManager365, SafetyManager365 — the right people get the right action | Layer 2 |
| **Prove** (emerald) | Real-time compliance dashboard, audit-ready evidence, CoAnalyst impact reports | Pillar "Real-Time Compliance Visibility" + Layer 3 |

### 1. Tech Deep Dive — `TechSlideRegulationSummary.tsx`

Currently: 2-column "Problem | Value Pillars" with footer. No DTOP.

Change: insert a **slim DTOP strip** between the elevator-pitch banner and the two-column grid. 4 equal cards, one per step, each with:
- Coloured letter chip (`D` `T` `O` `P`) using the canonical DTOP colours (sky/amber/purple/emerald — same as `OpsSlide4DTOP`, `ExecSlide3DTOP`, `TechSlide5DTOP`)
- Step label
- One-line RM-specific expression (~12 words) from the mapping above

Keep the existing problem/pillars grid below it but reduce to 2 problems + 2 pillars to make room (currently 3+3). Footer + DeepDiveLink unchanged.

Net effect: the summary slide now reads "here's the problem → here's how DTOP solves it for regulation → here are the value pillars → deep dive" in one frame.

### 2. RM Playbook — new dedicated DTOP slide

Insert a new slide between the existing **Slide 4 (Value Pillars)** and **Slide 5 (How It Works)** so the narrative becomes:

```
Title → Overview → Problem → Positioning → Value Pillars
   → DTOP Mapping ← NEW
→ How It Works (3 layers) → Use Cases → Personas → Commercial → Objections → Roadmap
```

**New file**: `src/components/regmgmt-slides/RMSlide4bDTOP.tsx`

Layout:
- `SlideContainer` titled **"Regulation Management on the DTOP Operating Model"**, subtitle **"How always-current regulation data flows through Detect → Trigger → Orchestrate → Prove"**
- 4-column grid (responsive to 2×2 on smaller widths), each column = one DTOP step:
  - Letter chip (large, coloured)
  - Step label
  - **What happens** (2-3 sentences specific to RM)
  - **Connected modules** (small pill row, e.g., for Orchestrate: ContentManager365 · TrainingManager365 · SafetyManager365)
  - **Evidence** line (one outcome metric or audit artefact)
- Bottom callout: *"Every regulatory change generates a complete audit trail — from detection to closure — across every connected module."*

**Data source**: Add a new exported constant `dtopMapping` to `src/data/regulationManagementPlaybook.ts` with the 4-step structure above. Keeps the slide thin and re-usable.

**Wire-up**:
- `src/pages/RegulationManagementPlaybook.tsx` — import `RMSlide4bDTOP`, add to `slides` array (`{ id: "rm-dtop", label: "DTOP Mapping" }` between value-pillars and how-it-works), and render it in the JSX in the same position.

### 3. RM Playbook — light DTOP visual cue on existing slides

Two small additions for narrative consistency, not new slides:

- **`RMSlide5HowItWorks.tsx`** — add a tiny DTOP-step badge in the top-right of each of the 3 layer cards (`Layer 1 → Detect`, `Layer 2 → Orchestrate`, `Layer 3 → Trigger + Prove`) so the reader sees the layer-to-DTOP mapping. Single coloured pill, no layout change.
- **`RMSlide6UseCases.tsx`** — replace the "Scenario / Outcome" pair inside each card with a 4-line micro-DTOP arc (`D:` short / `T:` short / `O:` short / `P:` short), reusing the use-case copy already in `regulationManagementPlaybook.ts` (no copy rewrite — split existing scenario+outcome into 4 beats). This mirrors the standardized vertical DTOP timeline used in `OpsSlide6NearTermUseCases` and elsewhere — and matches the **Use Case Timeline Standardization** memory.

### 4. Out of scope

- No copy rewrites of Pillars, Personas, Objections, Roadmap, or Commercial slides.
- No PPTX exporter changes (RM playbook isn't currently in the PPTX export pipeline).
- No changes to the canonical DTOP colour tokens.
- Tech deck DTOP slide (`TechSlide5DTOP`) is unchanged — it remains the master DTOP definition; the RM summary just *applies* it.

### Files touched

**New**
- `src/components/regmgmt-slides/RMSlide4bDTOP.tsx`

**Edited**
- `src/data/regulationManagementPlaybook.ts` — add `dtopMapping` constant + interface.
- `src/pages/RegulationManagementPlaybook.tsx` — register and render the new slide.
- `src/components/regmgmt-slides/RMSlide5HowItWorks.tsx` — add DTOP badge per layer.
- `src/components/regmgmt-slides/RMSlide6UseCases.tsx` — restructure card body to a 4-step DTOP micro-timeline.
- `src/components/tech-slides/TechSlideRegulationSummary.tsx` — insert DTOP strip; trim problem/pillars to 2+2.

**Not touched**
- Other RM slides, all other decks, PPTX exporters, narration data.

### QA

After implementation: scroll the RM playbook end-to-end and confirm DTOP appears (a) explicitly on its own slide, (b) as a layer-mapping badge on How It Works, (c) as the structure of each Use Case card, and (d) in the Tech Deep Dive summary. Same four colours used everywhere.

