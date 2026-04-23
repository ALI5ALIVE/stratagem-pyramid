

## Render the full Maturity Roadmap detail in the PPTX export

### Problem

The interactive web slide (`TechSlide14MaturityRoadmap`) reveals five blocks of detail per stage when clicked:

1. **What it looks like** (3 bullets)
2. **How Work Changes** (from → to + cultural marker quote)
3. **Where Teams Spend Time** (3-segment % bar)
4. **Result** (2 bullets)
5. **Value Proof** (3 metric chips + ROI statement)

The current PPTX export only shows: stage number, label, sublabel, and a single one-line `result` string. The rich detail is invisible because PPTX is static — there's no click reveal.

### Fix: turn the single Maturity Roadmap slide into a 2-slide sequence

Static decks can't do "click to reveal", so we surface everything by laying it out at full size. One slide cannot fit 5 stages × 5 detail blocks legibly at 13.3×7.5". We split into two slides that share the same divider header, so it still reads as one beat in the deck:

#### Slide A — "Maturity Roadmap · The Curve & Behaviour Shift"
Scope: visual arc + per-stage **What it looks like** + **How Work Changes** + **Time Allocation** bar.

Layout (13.33 × 7.5):
- Top band (1.5" tall): the rising-curve arc with 5 numbered nodes, label + sublabel under each — same arc that's there today, kept as the visual anchor.
- Below the arc: 5 columns (≈2.5" wide each), one per stage, top-to-bottom:
  - Coloured stage chip (`1. Fragmented` etc.) — full-bleed top accent already in use.
  - **What it looks like** — eyebrow in stage colour + 3 ✓ bullets at 9pt with 1.35 line-height.
  - Hairline divider.
  - **How Work Changes** — small "from" pill (muted bg) → arrow → "to" pill (stage tint), then italic 8pt cultural marker quote underneath.
  - Hairline divider.
  - **Where Teams Spend Time** — a 3-segment horizontal bar (Coordination / Admin / Improvement) with inline % labels and a 7pt three-swatch legend. Segment colours match the web (red / sky / teal).

#### Slide B — "Maturity Roadmap · Results & Value Proof"
Scope: per-stage **Result** + **Value Proof** (chips + ROI statement), plus a footer band that summarises the journey.

Layout:
- Slim recap strip at top (0.5"): 5 small numbered dots + labels in stage colour, no arc — keeps continuity with Slide A.
- 5 columns, each containing:
  - Stage chip header.
  - **Result** — eyebrow + 2 dot-bullets at 10pt.
  - Hairline divider.
  - **Value Proof** — three pill chips (`Recurrence ↓ 50%` etc.) tinted in the stage colour, then the italic ROI statement at 9pt.
- Bottom callout band (0.55"): "Stage 1 → Stage 5: ~70% admin reduction · ~50% fewer repeat issues · OTP +15%" — single-line summary in brand-blue accent so the deck closes the arc with one quotable line.

Both slides reuse `chrome(slide, ctx)`, `header(...)`, `addCard`, `addPill`, `addBulletList`, and `addDivider` from `pptxBrand.ts` — no new primitives.

### Data source

A single `stages` array in the build function (mirrors the shape of `stages` in `TechSlide14MaturityRoadmap.tsx`) with all five fields per stage. Hard-coded in the exporter so the PPTX is self-contained and matches the web copy exactly.

### Files touched

**Edited**
- `src/exporters/pptx/buildTechnicalDeck.ts`
  - Replace the single `{ label: "Maturity Roadmap", build: ... }` spec (the one starting around line 1708) with two specs: `Maturity Roadmap · Curve & Behaviour` and `Maturity Roadmap · Results & Value`.
  - Add both labels to the `composed` slide order array (around line 2524) immediately after the journey divider, replacing the existing single `byLabel("Maturity Roadmap")` reference.

**Not touched**
- `TechSlide14MaturityRoadmap.tsx` — interactive web slide unchanged.
- `pptxBrand.ts` — uses existing primitives.
- All other decks, narration, and exporters.

### QA

Build the deck, convert these two slides to images at 150 DPI, and verify:
1. Curve + 5 stage cards on Slide A all sit within margins.
2. Time-allocation segments add to 100% with legible inline labels.
3. Slide B columns align under the same x-positions as Slide A so the eye reads them as a continuous spread.
4. No text wraps awkwardly or clips at 9–10pt.
5. Footer summary band on Slide B does not collide with the page footer chrome.

### Out of scope

- No changes to the interactive web slide.
- No copy rewrites — content lifted verbatim from the web `stages` array.
- No animation in PPTX (impossible reliably across PowerPoint versions); using two static slides is the conventional substitute.

