

# Executive Deck Improvements — 3 Changes

## 1. Reorder slides: Move "The Platform" after "How It Works"

**File:** `src/pages/ExecutivePitch.tsx`

Current order: Title → Problem → Shift → **Platform** → **How It Works** → Intelligence → Value → Why Us

New order: Title → Problem → Shift → **How It Works** → **Platform** → Intelligence → Value → Why Us

The DTOP pipeline story (hard landing → retraining → outcome) should land first so the audience understands the *workflow* before seeing the product architecture. This makes the Platform slide feel like a natural "here's what powers that" reveal.

Change: swap lines 18–19 in the `slides` array.

---

## 2. Simplify the Intelligence Layer slide

**File:** `src/components/exec-slides/ExecSlide4Intelligence.tsx`

Current state: Two-column layout with a 4-row precision bar chart on the left AND a hybrid architecture callout + 4-tier grid on the right. Too much for a 5-minute exec deck.

New layout — single focused message:
- **One visual**: The Precision Gap bar chart (keep, it's the strongest proof point) — but simplify to just show Level 4–5 comparison (90% vs 35%) as the hero stat, with the full 4-level breakdown as smaller supporting bars below
- **Remove**: The "Hybrid AI Architecture" callout and "Four Levels of Intelligence" grid (these belong in the Technical deck, where they already exist)
- **Add**: A single sentence callout below the chart: "90% accuracy across 4,000+ categories — where generic AI drops to 35%"
- Keep the same component name and slide ID

---

## 3. Simplify "Cost of Every Signal" into 3 executive outcome cards

**File:** `src/components/exec-slides/ExecSlide5Value.tsx`

Current state: Dense 3-tier grid (Executive Outcomes → Leading Measures → Use Cases) with tiny 8–10px text, dashed connector lines, and a bottom banner. Too granular for a C-suite audience.

New layout — outcome-focused:
- **Remove**: The Leading Measures tier and Use Cases tier entirely (these live in the Sales deck and Line of Sight page)
- **Replace with**: 3 large outcome cards (one per stakeholder: CFO, CEO, COO), each showing:
  - Stakeholder icon + role
  - One headline metric (e.g., "Fuel Cost Avoidance: $5M–$20M/yr")
  - One real-world scenario sentence
- **Keep**: The bottom "$40M+" banner with the Link to `/line-of-sight` for the detailed breakdown
- Title stays "The Cost of Every Signal", subtitle simplified to "Every operational signal has a price tag. Here's what yours are worth."

---

## 4. Sharpen the CTA on "Why Comply365"

**File:** `src/components/exec-slides/ExecSlide6WhyUs.tsx`

Current state: Vague CTA — "Let's explore what your first use case looks like" with trust stats.

Changes:
- Replace CTA text with a specific ask: **"30-Minute Discovery Session"** with subtext "We'll map your top 3 operational signals to measurable outcomes"
- Add a styled button/link element to make the CTA visually distinct (primary colored, larger)
- Keep the 3 differentiator cards and trust stats as-is — they score well

---

## Summary of file changes

| File | Change |
|------|--------|
| `ExecutivePitch.tsx` | Swap Platform and How It Works in slides array |
| `ExecSlide4Intelligence.tsx` | Strip right column; focus on Precision Gap hero stat |
| `ExecSlide5Value.tsx` | Replace 3-tier grid with 3 large stakeholder outcome cards |
| `ExecSlide6WhyUs.tsx` | Update CTA to "30-Minute Discovery Session" with specific ask |

