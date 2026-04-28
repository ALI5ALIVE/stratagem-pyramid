## Goal

Reorder the **Intelligence & Orchestration Layer** in the Executive Pitch · Medium deck so the sequence is:

1. **Automation** (first)
2. **Insights & Intelligence** (second — labelled "Insights & Recommendations" in the deck)
3. **Recommendations & Prescriptive Actions** / **CoAnalyst vs Generic AI** (third)

Currently the order is: CoAnalyst → Insights → Automation → CoAnalyst vs Generic AI.

The user wants Automation first, Insights second, Recommendations third. The existing slide labelled "CoAnalyst" (Slide 7 conversational layer) is the deeper "Recommendations & Prescriptive Actions" deep-dive in this deck — and the closing tier slide ("CoAnalyst vs Generic AI") follows naturally as the proof. So new order within the layer:

1. Automation
2. Insights & Recommendations
3. CoAnalyst (Recommendations & Prescriptive Actions)
4. CoAnalyst vs Generic AI (proof slide stays last)

## Changes

### 1. `src/pages/ExecutivePitch3.tsx`
Reorder the four intelligence-layer entries in the `slides` array so the new sequence after `exec3-divider-intelligence` is:
- `exec3-slide-automation` — Automation
- `exec3-slide-insights` — Insights & Recommendations
- `exec3-slide-coanalyst` — CoAnalyst (Recommendations & Prescriptive Actions)
- `exec3-slide-tiers-vs-ai` — CoAnalyst vs Generic AI

Also update `dividerProps.intelligence.upNext` to match: `["Automation", "Insights & Recommendations", "CoAnalyst", "CoAnalyst vs Generic AI"]`. Update the divider `tagline` to lead with Automation.

### 2. `src/exporters/pptx/buildExecutivePitch3Deck.ts`
- Reorder the `composed` array (lines 504–508) to match the new on-screen order:
  ```
  exec3IntelligenceDivider,
  byLabel("Automation"),
  byLabel("Insights & Intelligence"),
  byLabel("Recommendations & Prescriptive Actions"),
  byLabel("Tiers vs Generic AI"),
  ```
- Update `exec3IntelligenceDivider`'s `tagline` and `upNext` to mirror the new order (Automation first).

### 3. `src/data/executivePitchNarration.ts`
- Reorder the narration entries for the four slides so their position in the file matches the new visual order (entries are looked up by `slideId` so functionality is preserved, but file order should follow story flow).
- Update bridge sentences:
  - **Intelligence divider**: lead with Automation ("…Automation for cross-product workflows, Insights and Recommendations for proactive direction, and CoAnalyst for natural-language deep dive…"), end with "Bridge: let's start with Automation."
  - **Automation script**: change closing bridge to lead into Insights ("Bridge: automation runs the plays — Insights surfaces which plays to run. Next slide.").
  - **Insights script**: change closing bridge to lead into CoAnalyst/Recommendations ("Bridge: insights surface what to ask — CoAnalyst answers in plain English with prescriptive next steps. Next slide.").
  - **CoAnalyst script**: change closing bridge to lead into the Tiers slide ("Bridge: this is why generic AI alone can't replace this — let me show you the precision gap. Next slide.").
  - **Tiers vs Generic AI script**: closing bridge unchanged (still leads into Mobile divider).

### 4. Page numbers
Page numbers are derived automatically from the `slides` array index (passed as `slideNumber={index}` in `ExecutivePitch3.tsx`) and from the PPTX `composed` array index. Reordering both arrays updates page numbers automatically — no manual numeric edits needed.

## Out of scope

- No changes to the slide components themselves (TechV4SlideAutomation, TechV4SlideInsights, TechV4Slide7CoAnalyst, TechV4SlideTiersVsAI) — their internal content remains intact.
- No changes to the Tech Deep Dive deck (which uses a different order intentionally).
- No changes to other decks' intelligence-layer ordering.

## Verification

- Scroll through `/pitch-executive-3` and confirm the sequence after the Intelligence divider is Automation → Insights → CoAnalyst → CoAnalyst vs Generic AI.
- Confirm slide numbers in the chrome footer update accordingly (4-divider becomes slide 5, Automation 6, Insights 7, CoAnalyst 8, Tiers 9, Mobile divider 10, …).
- Download the PPTX from the title slide and confirm the same order with footer label "Executive Pitch · Medium".
- Play narration on each reordered slide and confirm bridges flow into the next slide naturally.
