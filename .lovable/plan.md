

## Executive Pitch 3 — Expand the Platform Story Into Per-Layer Summary Slides

Right now Pitch 3 introduces the 5-layer platform on slide 5 (`TechSlide4Platform`) and then jumps straight to the Intelligence and DTOP layers — skipping Core Apps, Data Foundation, and Mobile. The deck reads as if the platform = Intelligence + DTOP, which undersells the foundation and overweights the top layers.

You're right: the executive arc lands harder if **every layer gets its own summary slide**, with Core Apps framed as **table stakes** and the four upper layers framed as **the new platform capabilities** that differentiate Comply365.

### New narrative arc (18 slides)

```text
ACT 1 — The shift                ACT 2 — The platform, layer by layer       ACT 3 — The proof
1. Title                         5. Platform Overview (5-layer map)         15. Use Cases in Action
2. Strategic Shift               6. ▸ Layer 1 divider — Core Apps           16. Maturity Roadmap
3. Industry Challenge            7. Core Apps (table stakes)                17. Customer Outcomes
4. The DTOP Operating Model      8. ▸ Layer 2 divider — Data Foundation     18. Why Comply365 + CTA
                                 9. Operational Data Foundation
                                10. ▸ Layer 3 divider — Intelligence
                                11. Insights & Intelligence
                                12. ▸ Layer 4 divider — Mobile
                                13. Unified Mobile Experience
                                14. ▸ Layer 5 divider — DTOP
                                14b. DTOP — System of Work
                                14c. The Transformation
```

(Final numbering will be sequential 1–18 in the file; the chapter rhythm above just shows the structure.)

### Slide-by-slide composition

| # | Slide | Component reused | Layer |
|---|---|---|---|
| 1 | Title | `ExecSlide0Title` | — |
| 2 | Strategic Shift | `TechSlide1StrategicShift` | — |
| 3 | Industry Challenge | `TechSlide2IndustryChallenge` | — |
| 4 | DTOP Operating Model | `Slide3OperatingModel` | — |
| 5 | Platform Overview (5-layer map) | `TechSlide4Platform` | All |
| 6 | ▸ Core Apps divider — *"Table stakes — the system of record"* | `TechSlideLayerDivider` (new `core` props) | 1 |
| 7 | Core Operational Apps summary | `TechSlide6Capabilities` | 1 |
| 8 | ▸ Data Foundation divider | `TechSlideLayerDivider` (new `data` props) | 2 |
| 9 | Operational Data Foundation | `TechSlideDataFoundation` | 2 |
| 10 | ▸ Intelligence divider (existing) | `TechSlideLayerDivider` (intelligence) | 3 |
| 11 | Insights & Intelligence | `TechSlide7CoAnalyst` | 3 |
| 12 | ▸ Mobile divider — *"One trusted shell for the frontline"* | `TechSlideLayerDivider` (new `mobile` props) | 4 |
| 13 | Unified Mobile Experience | `TechSlideMobile` | 4 |
| 14 | ▸ DTOP divider (existing) | `TechSlideLayerDivider` (dtop) | 5 |
| 15 | DTOP — System of Work | `TechSlide5DTOP` | 5 |
| 16 | The Transformation | `Slide4Transformation` | — |
| 17 | Use Cases in Action | `SlideUseCases` | — |
| 18 | Maturity Roadmap | `Slide5MaturityCurve` | — |
| 19 | Customer Outcomes | `CustomerOutcomesSlide` | — |
| 20 | Why Comply365 + CTA | `TechSlideWhyComply` | — |

Total: **20 slides**. (If too long for an exec, easiest trim is dropping the Maturity Roadmap or merging Transformation into Customer Outcomes — flag if you want me to keep it under 18.)

### Why the framing works

- **Slide 5 sets the map**, then each layer gets its own divider + summary — exec sees the same structure repeat 5 times, which is memorable.
- **Core Apps are explicitly framed as table stakes** in the divider tagline ("Every operator needs these — we built them right"), so the exec doesn't think "you're selling me a CMS." Then layers 2–5 are positioned as the *net-new platform capabilities* on top of that foundation.
- **No new slide components** — every slide already exists in the Tech Deep Dive; we're just composing them in a tighter executive sequence and dropping the engineering-level module deep-dives (Safety/Content/Training individual slides).

### Implementation

**Edited only**
- `src/pages/ExecutivePitch3.tsx`:
  - Add three new `dividerProps` entries for `core`, `data`, `mobile` matching the existing `intelligence` / `dtop` shape.
  - Import `TechSlide6Capabilities`, `TechSlideDataFoundation`, `TechSlideMobile`.
  - Replace the current `slides` array with the 20-slide ordering above.

**Not touched**
- `TechSlideLayerDivider` already supports all 5 `LayerKey` values (`dtop | mobile | intelligence | data | core`) — no edits needed.
- All slide components — pure reuse.
- Home page card — still says "14 slides"; will update the badge to **"20 slides"**.

**Also edited**
- `src/pages/HomePage.tsx` — bump the Executive Pitch 3 card badge from `14 slides` to `20 slides`.

### QA

- Open `/pitch-executive-3`, scroll all 20 slides, confirm each layer divider lands before its summary slide.
- Confirm the 5 dividers visually mirror each other (same `TechSlideLayerDivider` chrome, different accent per layer).
- Confirm Core Apps divider tagline reads as table-stakes framing, not as a sales pitch for the modules.

### Out of scope

- New PPTX builder for the expanded Pitch 3 (existing Exec PPTX still targets the 11-slide Pitch 2 narrative).
- Per-layer narration scripts.
- Any edits to slide components themselves.

