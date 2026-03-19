

# Tighten Slide Layouts — Remove Wasted Space

## Problem

Cards and content sections stretch to fill the full viewport height because of a cascading `flex-1` pattern: the container gives children `flex-1`, and child slides repeat `flex-1` on inner wrappers and card grids. A card with 3 lines of text ends up taking half the screen height.

## Root Cause

Two layers both force vertical stretching:

1. **PitchSlideContainer** (line 107): `<div className="flex-1 flex flex-col">{children}</div>` — makes the content area fill all remaining space
2. **Individual slides**: inner wrappers use `flex-1` and grids use `flex-1 min-h-0`, which stretches cards to fill that space

## Solution

Change the content area in `PitchSlideContainer` to **vertically center** content instead of stretching it. This single change propagates to all ~40 slides across all three decks.

### `src/components/shared/PitchSlideContainer.tsx`
- Change the content wrapper from `flex-1 flex flex-col` to `flex-1 flex flex-col justify-center`
- This centers the children vertically in the available space rather than stretching them

### Individual slide cleanup (batch edit across ~15 files)
Remove `flex-1` from inner card grids that shouldn't stretch. Key offenders:

- **TechSlide1StrategicShift** — remove `flex-1` from the before/after grid (line 33)
- **TechSlide3BeforeAfter** — remove `flex-1` from the grid (line 30)
- **TechSlide6Capabilities** — remove `flex-1` from the pillar grid (line 27)
- **TechSlide18Partnership** — remove `flex-1` from step grid (line 16) and outer wrapper (line 15)
- **TechSlide15Roadmap2026** — remove `flex-1` from phase grid
- **OpsSlide10WhyUs** — remove `flex-1` from differentiator grid (line 53) and outer wrapper (line 51)
- **OpsSlide11GettingStarted** — same pattern
- **ExecSlide2Shift** — already uses `flex items-center` which is fine, no change needed
- **ExecSlide6WhyUs** — remove `flex-1` from card grid if present
- **TechSlide17WhyUs** — already uses `justify-center`, just remove any `flex-1` on inner grids

### What stays the same
- Slides that genuinely need full-height content (maturity roadmap with SVG, interactive use-case expanders) keep their `flex-1` since they have enough content to fill the space
- The `h-screen` on the outer section stays — slides still fill the viewport, content just sits centered within it

## Impact
- All three pitch decks (Executive, Operational, Technical) benefit
- Cards size to their content, centered vertically in the slide
- No content clipping — just elimination of empty stretched space

