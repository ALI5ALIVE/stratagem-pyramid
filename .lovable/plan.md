## Move the MAD use case to the top, mapped under each DTOP step

Right now the Madrid (MAD) unstable-approach use case is a one-liner stuck at the bottom of the whiteboard. Lift it to the top so the viewer sees the worked example *before* they read the stack — and split it across Detect / Trigger / Orchestrate / Prove so each pill carries its own MAD beat.

### Edits in `src/components/sales-enablement-slides/SEW3WholeVisionWhiteboard.tsx`

**1. New use-case header band at the top of the SVG** (above the DTOP loop)
- Title strip: `use case · Madrid (MAD) unstable approach trend · closed in 5 days` (blue dashed border, like today's bottom strip)
- Just below it, a 4-column row of micro-cards aligned with the four DTOP pills:
  - **Detect (blue)** — "14-day MAD unstable-approach trend surfaces"
  - **Trigger (amber)** — "Recommended Actions: revise OMA, retrain 4 crews — cited"
  - **Orchestrate (violet)** — "OMA draft + reviews + training assigned · pushed to devices in 48h"
  - **Prove (green)** — "MAD trend flat in 5 days · audit pack one click"

**2. Reorder the SVG vertically** (viewBox stays `0 0 700 500`):
  - `y 30–66` — Use-case title strip
  - `y 70–126` — 4 MAD micro-cards (one per DTOP step), each ~150px wide
  - `y 132–178` — DTOP loop band (existing, shifted down)
  - `y 184–224` — Unified Mobile band
  - `y 230–406` — Intelligence & Orchestration Layer (4 sub-boxes, slightly shorter to fit)
  - `y 412–490` — Core Apps band
  - Remove the old bottom use-case strip

**3. Visual link** — under each DTOP pill add a small downward connector tick into its matching MAD micro-card, so the eye reads "Detect → this is what Detect does for MAD" immediately.

No changes to the right-column say-it script or the narration file — the right column already walks the same MAD beat top-to-bottom and now mirrors the use-case row on the board.