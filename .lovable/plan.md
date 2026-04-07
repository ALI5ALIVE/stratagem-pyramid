

# Make DTOP Steps Stand Out on "The Operational Intelligence Layer" Slide

## Problem
The Detect / Trigger / Orchestrate / Prove step cards in `Slide3OperatingModel` are too small and muted — they don't visually stand out on the slide, especially at the current viewport size.

## Changes

### `src/components/slides/Slide3OperatingModel.tsx`

**Step cards (lines ~183-230)** — increase visual weight:
- Increase padding from `p-2` to `p-3`
- Increase icon container from `w-6 h-6` to `w-8 h-8`, icon from `w-3 h-3` to `w-4 h-4`
- Increase label from `text-xs` to `text-sm`
- Increase metric value from `text-sm` to `text-lg`
- Make step cards always show their color styling (not just when active) — set default state to use each step's own `bgColor` and `borderColor` instead of the current grey `bg-card/30 border-border`
- Increase step number badge from `w-5 h-5 text-[10px]` to `w-6 h-6 text-xs`
- Add a subtle shadow to each card: `shadow-md`

**Description text** — bump from `text-[10px]` to `text-xs` and always show as `text-foreground` (not muted when inactive)

**Metric** — always show at full opacity instead of `opacity-50` when inactive

This makes the DTOP pipeline the dominant visual element on the slide without changing content or layout structure.

**1 file modified.**

