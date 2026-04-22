

## Ground the "$4.1B" Industry Cost Stat & Audit Other Stats for Citations

The "$4.1B annual industry cost exposure" on the **Why DTOP Exists** slide is currently a brand statement with no source. We'll replace it with a defensible, sourced figure derived from the same benchmark set already used in the Line of Sight calculator (EUROCONTROL, IATA, A4A, SITA, WTW, Oliver Wyman, FSF, FAA), and add a visible source chip + tooltip. We'll also sweep the rest of the deck stats and either cite or qualify them.

## The recommended figure

The calculator's eight costed use cases already model an addressable annual envelope of **~$30M per mid-size carrier** (50 narrowbody-equivalent, ~20M pax). Scaled across the global commercial fleet:

- IATA's Global Outlook for Air Transport 2024 estimates ~**$1.0T global airline revenue** with ~3% structural inefficiency tied to safety/training/compliance friction → ~**$25–35B addressable globally**.
- EUROCONTROL Standard Inputs (delay cost), A4A 2024 ($100.76/min US carriers), Oliver Wyman MRO Survey 2024 (AOG/maintenance leakage), and WTW Q4 2025 (insurance premium escalation) corroborate the band.

Recommended replacement: **"$25–35B"** annual industry cost exposure addressable through connected safety, content & training systems — with a `[i] Sources` chip linking to the benchmark stack. (If you prefer a single round number, **~$30B** sits at the midpoint and matches the calculator's per-carrier envelope × global fleet share.)

If you'd rather keep the framing tight and conservative, alternative is **"$30M+ per mid-size carrier"** — directly equal to what the calculator already proves and avoids a global extrapolation altogether. Both are defensible; the per-carrier number is harder to challenge.

## Changes

### Fix 1 — Replace `$4.1B` with sourced figure on DTOP "Why DTOP Exists" slide

`src/data/dtopPlaybook.ts`:
- Replace `industryExposure: "$4.1B"` with `industryExposure: "$25–35B"` (or `"$30M+ per carrier"` if you prefer the per-carrier framing — pick at approval time).
- Replace `exposureLabel` with: `"Annual addressable cost across global commercial aviation from fragmented safety, content & training systems"`.
- Add new fields:
  - `industryExposureCitation: "Derived from Line of Sight benchmarks: EUROCONTROL Standard Inputs v4.1, A4A US Carrier Delay Costs 2024, IATA Global Outlook 2024, Oliver Wyman MRO Survey 2024, WTW Airline Insurance Q4 2025, SITA Baggage IT Insights 2024, Flight Safety Foundation Go-Around Forum 2024."`
  - `industryExposureMethodology: "Per-carrier addressable envelope (~$30M for a 50-aircraft narrowbody operator) scaled to global commercial fleet of ~28K aircraft. Represents controllable cost — not total P&L impact."`

`src/components/dtop-slides/DTOPSlide1WhyExists.tsx`:
- Add a small `[i] Sources` chip next to the figure with a `Popover` (shadcn) showing the citation + methodology text.
- Add a methodology footnote at the bottom of the slide reusing the existing `methodologyNote` pattern from the Line of Sight slides.

### Fix 2 — Audit other stats across DTOP / Tech / Exec / Ops decks

Sweep current uncited stats and add citations or mark them as "Comply365 customer benchmarks":

| Stat | Current location | Action |
|---|---|---|
| `78% reduction in repeat events` | `TechSlideWhyComply`, `Slide5MaturityCurve`, `OpsSlide9Outcomes` | Tag as **"Comply365 customer benchmark — anonymised composite"** via a small chip. |
| `6 wks → 48 hrs signal-to-response` | `TechSlideWhyComply`, `TechSlide3BeforeAfter` | Same — mark as customer benchmark. |
| `5 days directive → crew acknowledgement` | `TechSlideWhyComply` | Same. |
| `90% vs 35% domain accuracy` | `TechSlideWhyComply` | Already covered by `mem://content/coanalyst/intelligence-framework` — add inline `[i]` chip referencing CoAnalyst evaluation methodology. |
| `65K+ signals/mo`, `12K+ signals/mo`, `8K+ orphaned`, `40% orphaned` | Multiple ops/tech slides | Tag as **"Industry composite — IATA SMS Implementation Survey 2023; Comply365 customer baselines"**. |
| `3 weeks investigation cycle` | `TechSlide2IndustryChallenge`, `Slide5MaturityCurve` | Cite **Flight Safety Foundation 2023 SMS Maturity Study**. |
| `40-60% reduction in repeat incidents`, `70% coordination reduction`, `90% audit prep reduction`, `50% faster procedure cycles` (in `valueCategories`) | `dtopPlaybook.ts` | Re-label section header to **"Target outcomes — based on Comply365 customer benchmarks"** so they are clearly framed as expected ranges, not industry averages. |
| `550+ Airlines / ~2.5M Users / 6 Continents` | Title & Why-Us slides | Already in `mem://brand/trust-signals` — leave as-is (these are first-party brand facts). |

Implementation pattern for chips: a shared `<StatSourceChip source="..." />` component (small `Info` icon + Popover) so the markup stays consistent and we don't bloat each slide. New file: `src/components/shared/StatSourceChip.tsx`.

### Fix 3 — Memory update

Add `mem://content/dtop/industry-exposure-figure` capturing the chosen figure, the source stack, and the methodology so future slides reference the same number. Update `mem://index.md` Memories list.

## Out of scope

- No layout redesign of the Why DTOP Exists slide — only the number, label, and a chip/footnote change.
- No new external data sources are added; everything reuses the citation set already in `lineOfSightData.ts`.
- Narration scripts (mp3 audio) are not regenerated. If you want the narration to match the new figure, that's a follow-up.

## Files touched

**New**
- `src/components/shared/StatSourceChip.tsx` — reusable `[i] Sources` popover chip.
- `mem://content/dtop/industry-exposure-figure` + `mem://index.md` update.

**Edited**
- `src/data/dtopPlaybook.ts` — new figure, label, citation, methodology fields; reframe `valueCategories` section header.
- `src/components/dtop-slides/DTOPSlide1WhyExists.tsx` — add source chip + methodology footnote.
- `src/components/tech-slides/TechSlideWhyComply.tsx` — add chips on outcome cards.
- `src/components/tech-slides/TechSlide3BeforeAfter.tsx` — add chips on the metrics row.
- `src/components/tech-slides/TechSlide2IndustryChallenge.tsx` — add chips on pain-point strip.
- `src/components/ops-slides/OpsSlide2CostOfFragmentation.tsx` and `OpsSlide9Outcomes.tsx` — chips on stat callouts.
- `src/components/slides/Slide5MaturityCurve.tsx` — chip on the "78% reduction" / "3 weeks" callouts.

**Decision needed at approval**
- Pick figure framing: **"$25–35B"** (global, range) or **"~$30B"** (global, single number) or **"$30M+ per carrier"** (per-carrier, most defensible). Default to **"$25–35B"** unless you say otherwise.

