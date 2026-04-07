

# Executive Pitch 2 — Revised Plan (Reusing Strategy Deck Components)

## Overview

Create a new 11-slide deck at `/pitch-executive-2` that primarily reuses existing components from the Strategy deck and current Executive pitch, as directed in the PDF feedback. Only 2 new components are needed; the rest are direct reuses.

## Slide Map

| # | PDF Slide | Existing Component | Action |
|---|-----------|-------------------|--------|
| 0 | Title | `ExecSlide0Title` (exec-slides) | **Reuse** |
| 1 | Strategic Shift — Before | `Slide1StrategicShift` (strategy deck) | **Reuse** — PDF says "from original strategy deck" |
| 2 | After — Operational Performance Platform | New | **Create** `Exec2Slide2After.tsx` — this specific "After" zoom with DTOP tagline and illustrative target outcomes doesn't exist in either deck |
| 3 | DTOP Operating Model | `Slide3OperatingModel` (strategy deck) | **Reuse** — PDF says "Add this DTOP slide from original Strategy Deck" |
| 4 | Platform Overview | `ExecSlide3Platform` (exec-slides) | **Reuse** — PDF says "Add this Platform overview slide (slide 3) from new Exec Deck" |
| 5 | Use Cases in Action | `SlideUseCases` (strategy deck) | **Reuse** — same 3 expandable DTOP use cases already built |
| 6 | The Transformation | `Slide4Transformation` (strategy deck) | **Reuse** — already has Point Tools vs Platform, value boxes, and time allocation shift |
| 7 | Operational Performance Ladder | `Slide4ValuePyramid` (strategy deck) | **Reuse** — PDF says "From original strategy deck"; this is the interactive 5-stage pyramid with stage details, time allocation, value proof |
| 8 | Intelligence Journey / AI Vision | `SlideAIVision` (strategy deck) | **Reuse** — PDF says "Add this AI journey slide from original strategy deck"; has Stage 3/4/5 roadmap with DTOP columns and precision gap |
| 9 | Maturity Roadmap | `Slide5MaturityCurve` (strategy deck) | **Reuse** — the 5-stage interactive curve with use-case details per stage |
| 10 | What This Means for Customers | `CustomerOutcomesSlide` (shared) | **Reuse** — PDF says "Add this slide from original Strategy Deck" |

## New Files (3)

### 1. `src/components/exec2-slides/Exec2Slide2After.tsx`
The only slide that doesn't exist — the "After" zoom showing:
- Category definition: "Operational Performance Platform"
- DTOP tagline: "Detect → Trigger → Orchestrate → Prove"
- Illustrative target outcomes grid (+3.2% OTP, 94% Ready, Months→2hr Audit Prep)
- Uses `SalesSlideContainer` wrapper

### 2. `src/pages/ExecutivePitch2.tsx`
Page component following the same pattern as `ExecutivePitch.tsx` (scroll-snap, keyboard nav, sidebar registration). Imports strategy deck components directly — they accept `SlideNarrationProps` which is compatible.

### 3. `src/data/executivePitch2Narration.ts`
Narration data file with placeholder scripts (can be populated later).

## Modified Files (2)

### 1. `src/App.tsx`
Add route: `<Route path="/pitch-executive-2" element={<ExecutivePitch2 />} />`

### 2. `src/components/AppSidebar.tsx`
Add "Executive Pitch 2" to `pitchItems` array.

## Technical Notes

- Strategy deck slides use `SlideContainer`; pitch decks use `SalesSlideContainer`. Both accept `SlideNarrationProps` so reuse is seamless — the only visual difference is the wrapper chrome.
- The narration hook will follow the same pattern as `useExecPitchNarration.ts`.
- KG notes from PDF incorporated: product name spacing (ContentManager365), editable aircraft number CTA on Customer Outcomes, and CTA to link to interactive calculator.

**1 new slide component, 1 new page, 1 new narration file. 2 files modified. 9 existing components reused directly.**

