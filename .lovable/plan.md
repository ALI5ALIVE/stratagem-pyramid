

# Operational Deck Improvements — Keep Maturity Roadmap

## Overview
4 changes to tighten the narrative flow while preserving the Maturity Roadmap slide as-is.

---

## 1. Merge Platform + DTOP into one slide

**File:** `src/components/ops-slides/OpsSlide4DTOP.tsx`

Combine the Platform modules (Safety Manager, Content Manager, Training Manager) as data source cards feeding into the DTOP pipeline below. Remove the separate `OpsSlide4Platform` from the deck.

- Replace the plain "Data Sources" pill strip with 3 compact module cards (icon + name + 2-line capability) arranged horizontally above the DTOP pipeline
- Keep the existing 4-column DTOP pipeline grid below
- Title becomes "The Platform: Detect → Trigger → Orchestrate → Prove"
- This removes one slide and connects product to workflow in a single view

**File:** `src/pages/OperationalPitch.tsx`

Remove `OpsSlide4Platform` from imports and the `slides` array. Renumber subsequent slide IDs.

New order (12 slides → 11):
Title → Daily Reality → Cost of Fragmentation → Before & After → **DTOP + Platform** → Intelligence → Near-Term Use Cases → Stepping Stones → Maturity Roadmap → Outcomes → Why Us → Getting Started

---

## 2. Simplify Intelligence slide — connect to use cases

**File:** `src/components/ops-slides/OpsSlide5Intelligence.tsx`

Current layout has a 5-step pipeline + precision bars + 4 intelligence tiers — too much overlap with the DTOP slide.

New layout:
- **Remove** the 5-step pipeline row (now redundant with the merged DTOP slide)
- **Keep** the Precision Gap bar chart (left column) — it's the strongest proof point
- **Replace** the "Four Levels of Intelligence" tiers (right column) with 4 mini-cards that directly reference the 4 near-term use cases from Slide 7, each showing the intelligence tier that powers it (e.g., "Hard Landing Detection → Proactive tier, 90% accuracy")
- This creates a bridge: Intelligence slide previews the use cases, and the next slide (Near-Term Use Cases) delivers the detail

---

## 3. Sharpen CTA on Getting Started slide

**File:** `src/components/ops-slides/OpsSlide11GettingStarted.tsx`

- Change CTA heading from "What does your first use case look like?" to **"Start With a 90-Day Pilot"**
- Update subtext to: "Pick one use case — hard landing retraining, regulatory change cascade, or crew fatigue detection — and prove measurable outcomes in 90 days."
- Add a styled button element with "Book a Discovery Workshop" text to make the CTA visually actionable

---

## 4. Reorder: Move Near-Term Use Cases earlier

**File:** `src/pages/OperationalPitch.tsx`

Swap Near-Term Use Cases and Stepping Stones so the concrete wins land immediately after the Intelligence slide.

Final slide order:
0. Title
1. Daily Reality
2. Cost of Fragmentation
3. Before & After
4. DTOP + Platform (merged)
5. Intelligence Engine
6. **Near-Term Use Cases** (moved up)
7. **Stepping Stones** (moved down)
8. Maturity Roadmap (kept as-is)
9. Outcomes
10. Why Us
11. Getting Started (sharpened CTA)

---

## Files changed

| File | Change |
|------|--------|
| `OpsSlide4DTOP.tsx` | Add platform module cards above DTOP pipeline |
| `OpsSlide5Intelligence.tsx` | Remove pipeline row, replace tiers with use-case-linked cards |
| `OpsSlide11GettingStarted.tsx` | Sharpen CTA to "90-Day Pilot" with button |
| `OperationalPitch.tsx` | Remove Platform import, reorder slides array |

