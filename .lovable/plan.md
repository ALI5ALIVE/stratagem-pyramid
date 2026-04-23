

## Executive Pitch 3 — "The Executive Cut of the Platform Story"

A new pitch deck that keeps the executive narrative arc of Pitch 2 but borrows the **strongest visual storytelling components** from the Technical Deep Dive — platform architecture diagram, layer dividers, intelligence depth, calculator, and maturity roadmap — without descending into engineering detail.

### Narrative arc (14 slides, ~12 min)

```text
ACT 1 — The shift                ACT 2 — The platform              ACT 3 — The proof
1. Title (hero)                  5. Platform Overview (5-layer)    11. Use Cases in Action
2. Strategic Shift               6. ▸ Intelligence Layer divider   12. Maturity Roadmap
3. Industry Challenge ($25–35B)  7. Insights & Intelligence        13. Customer Outcomes
4. The DTOP Operating Model      8. ▸ DTOP divider                 14. Why Comply365 + CTA
                                 9. DTOP — Detect→Trigger→...
                                10. The Transformation
```

### Slide-by-slide composition (every slide reuses an existing component — zero new visuals)

| # | Slide | Component reused | Source deck |
|---|---|---|---|
| 1 | Title — Operational Performance Platform | `ExecSlide0Title` | Exec |
| 2 | Strategic Shift (executive framing) | `TechSlide1StrategicShift` | Tech |
| 3 | Industry Challenge — $25–35B exposure | `TechSlide2IndustryChallenge` | Tech |
| 4 | The Operating Model (DTOP narrative) | `Slide3OperatingModel` | Shared |
| 5 | The Platform — 5 layers, click to jump | `TechSlide4Platform` | Tech |
| 6 | ▸ Intelligence Layer divider | `TechSlideLayerDivider` (intelligence) | Tech |
| 7 | Insights & Intelligence (exec-level) | `TechSlide7CoAnalyst` | Tech |
| 8 | ▸ DTOP divider | `TechSlideLayerDivider` (dtop) | Tech |
| 9 | DTOP — System of Work | `TechSlide5DTOP` | Tech |
| 10 | The Transformation (From → To) | `Slide4Transformation` | Shared |
| 11 | Use Cases in Action | `SlideUseCases` | Shared |
| 12 | Maturity Roadmap | `Slide5MaturityCurve` | Shared |
| 13 | Customer Outcomes | `CustomerOutcomesSlide` | Shared |
| 14 | Why Comply365 + CTA | `TechSlideWhyComply` | Tech |

### Why this works for an exec audience

- **Keeps Pitch 2's pacing** (under 15 slides, no engineering deep-dives like SafetyManager365/ContentManager365/TrainingManager365 module pages).
- **Adds the Tech deck's two strongest signature visuals**: the 5-layer Platform Overview (`TechSlide4Platform`) and the Strategic Shift / Industry Challenge framing — both are visually richer than anything in Pitch 2.
- **Uses two layer dividers** (Intelligence + DTOP) to give the deck Tech-deck-style chapter breaks without overwhelming an exec.
- Drops Pitch 2's weaker slides (Performance Ladder, Intelligence Journey AI Vision) in favour of the more defensible `TechSlide7CoAnalyst` + `TechSlide5DTOP`.

### Implementation

**New files**
- `src/pages/ExecutivePitch3.tsx` — pattern-identical to `ExecutivePitch2.tsx` (scroll/snap container, sidebar nav, keyboard nav, narration). Reuses `useExecPitch2Narration` (existing narration map already covers the shared slides; tech slides will simply not auto-play, matching Pitch 2's behaviour for non-mapped slides).

**Edited files**
- `src/App.tsx` — add `<Route path="/pitch-executive-3" element={<ExecutivePitch3 />} />`.
- `src/pages/HomePage.tsx` — add a third card to the **Customer Pitch Decks** section:
  - Title: **"Executive Pitch 3"**
  - Description: *"Executive narrative powered by the platform's strongest visuals — DTOP, 5-layer architecture, and intelligence depth in 14 slides."*
  - Badge: `14 slides`
  - Icon: `Sparkles` (or `Layers` to signal the platform-overview emphasis)
  - Href: `/pitch-executive-3`
  - Accent: `from-comply-teal to-accent`
- `src/components/exec-slides/ExecSlide0Title.tsx` — no change needed; it already accepts `exportSlides` for the download buttons. Pitch 3 will pass its own `slides` array, so the existing PPTX/PDF buttons render without code changes (they target `deckId="executive-pitch"`, which is fine for now — PPTX export parity is **out of scope** for this task).

**Not touched**
- All slide components (zero edits — pure composition).
- Narration data / hooks.
- PPTX exporters (Pitch 3 reuses the existing Exec PPTX button; a dedicated Pitch 3 PPTX builder is a follow-up if needed).
- Tech deep-dive page.

### QA

- Open `/pitch-executive-3`, scroll through all 14 slides, confirm snap behaviour and sidebar navigation work.
- Confirm Home page shows the new card alongside Executive Pitch / Operational Pitch / Technical Deep-Dive (4 cards in the row, grid stays balanced on `lg:grid-cols-3` — may bump to `lg:grid-cols-4` if needed for layout symmetry).
- Confirm keyboard arrows + space advance slides; narration play button on the title works.

### Out of scope

- New PPTX export builder for Pitch 3 (uses the existing Exec one until requested).
- Any new narration scripts; missing slides simply have no audio (same as Pitch 2 behaviour).
- Any edits to existing slide components — all reuse, no rewrites.

