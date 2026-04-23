

## Bring the Executive Pitch PPTX into true parity with the live web deck

### What's actually wrong (audit)

The PPTX exports 12 slides, but the web deck (`/pitch-executive-2`) has 11 — and they don't line up:

| # | Web slide | PPTX slide | Status |
|---|---|---|---|
| 1 | Title | Title | ✅ matches |
| 2 | Before — Disconnected | Before | 🟡 layout OK, silo visual cramped |
| 3 | After — Connected | After | 🟡 OK, but DTOP closed-loop not emphasized |
| 4 | **The Operational Intelligence Layer** (Slide3OperatingModel) | **DTOP — From Signals to Provable Outcomes** | ❌ **wrong slide** — missing platform ecosystem diagram, sources row (65K+ signals/mo), and value-outputs row (OTP +3%, Ready 94%, Audit 2hr, Repeat Zero) |
| 5 | The Platform | The Platform | ✅ matches |
| 6 | Use Cases in Action | Use Cases | ✅ matches (vertical DTOP timeline correct) |
| 7 | The Transformation | The Transformation | ✅ matches |
| 8 | Performance Ladder (Value Pyramid) | Performance Ladder | ❌ **duplicates Maturity stages** — uses Fragmented→Predictive labels instead of the web's actual 5 layers (with time-allocation + ROI proof per layer via `DetailsPanel`) |
| 9 | Intelligence Journey (AI Vision) | Intelligence Journey | ✅ matches |
| 10 | **Maturity Roadmap** (Slide5MaturityCurve) | — | ❌ **missing entirely** — no hockey-stick curve, no per-stage scenario/problem/outcome cards |
| 11 | Customer Outcomes | Customer Outcomes | 🟡 layout cramped, signal/action/result text wraps awkwardly in narrow cells |
| — | — | Why Comply365 | ❌ **not on web** — fabricated slide |
| — | — | CTA | ❌ **not on web** — fabricated slide |

### Fix plan

Edit `src/exporters/pptx/buildExecutiveDeck.ts` only.

#### 1. Replace the DTOP slide (slide 4) with the real "Operational Intelligence Layer"

Rebuild `dtopSpec` to mirror `Slide3OperatingModel.tsx`:
- Title = "The Operational Intelligence Layer", subtitle from the web component verbatim.
- Embed `platform-ecosystem.png` centered (as the web does), ~3.2" × 3.2" at the top.
- Sources strip: "SOURCES:" label + pills (Reports, Ops, Crew, Mx, etc.) + **"65K+ signals/mo"** highlighted pill.
- 4-step DTOP pipeline as horizontal cards with the canonical sky/amber/purple/emerald accents (existing build is fine — keep this part) and the **per-step metric** the web shows.
- Bottom **Value Generated** row: 4 mini-stat cards — OTP +3% / Ready 94% / Audit 2hr / Repeat Zero.

#### 2. Rebuild the Performance Ladder slide (slide 8)

Read the actual web `Slide4ValuePyramid` `layersData` (5 layers with `timeAllocation` and `roiProof` per layer) and use those values — not the maturity stage labels. The pyramid stays (5 stacked trapezoids) but the right-column descriptions become **per-tier time-allocation + ROI-proof bullets**, distinct from the Maturity Roadmap content.

#### 3. Insert the missing Maturity Roadmap slide (new slide 10)

New `maturityRoadmapSpec` modelled on the tech deck's two-slide split pattern (already proven). Single slide for Exec, since it's a summary deck:
- Left half: native hockey-stick curve drawn with `slide.addShape("line", ...)` between 5 control points + 5 stage markers (color-coded dots).
- Right half: 5 stacked `addLabeledCard`s, one per stage, showing **Scenario · Problem · Outcome** from `stagesData` in `Slide5MaturityCurve.tsx`.
- Bottom strip: `MaturitySummaryBanner` text equivalent ("Most ops live at Stage 1–2. The platform moves you to 4–5.").

#### 4. Remove the two fabricated slides

Delete `whyUsSpec` and `ctaSpec` from the `composed` array. They are not in `slides[]` on `/pitch-executive-2`. (The closing message is already implicit in the Customer Outcomes CTA banner pointing to `/line-of-sight`.)

Result: PPTX becomes 11 slides, matching the web deck 1:1.

#### 5. Polish two minor layout issues

- **Before slide silos**: enlarge each silo card to fit the volume label inside (currently the ellipse is centered above text that gets clipped on small widths). Increase `siloH` from 1.6 to 1.85.
- **Customer Outcomes**: widen cards by reducing horizontal gap from 0.18 to 0.12 and increase `bodySize` to 10.5; raise `cH` from 3.7 to 4.1 so signal/action/result rows breathe.

### Files touched

**Edited only**
- `src/exporters/pptx/buildExecutiveDeck.ts` — the 5 fixes above. Imports needed: `stagesData` from `Slide5MaturityCurve` (or copy as local constant if the component doesn't export it — extract to a shared data file if needed), `layersData` from `Slide4ValuePyramid` (same pattern).

**Not touched**
- `src/lib/pptxBrand.ts` — uses existing primitives.
- `src/exporters/pptx/index.ts` — registration unchanged.
- All web slides — unchanged.
- Tech deck builder — unchanged.

### QA gate

After build: render the new `Comply365-Executive-Pitch.pptx` to PDF at 150 DPI and verify slide-by-slide against the live `/pitch-executive-2`:
1. Slide 4 has the platform ecosystem image, sources row with **65K+ signals/mo**, and value-outputs row.
2. Slide 8 (Pyramid) descriptions reference time-allocation + ROI proof — **not** the maturity stage labels.
3. Slide 10 is the Maturity Roadmap with curve + 5 scenario cards.
4. Total slide count = 11.
5. No "Why Comply365" or stand-alone "CTA" slide.
6. DTOP colours (sky/amber/purple/emerald) consistent with tech deck.
7. Logo proportions correct on both dark and light slides.

### Out of scope

- No web slide changes.
- No new branding primitives.
- No PPTX exports for v1 Exec deck (`/pitch-executive`) beyond what the shared builder already produces — same builder serves both pages.
- No copy rewrites; all text lifted from the live web slide components.

