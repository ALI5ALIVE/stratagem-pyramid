

# Fix: Ops Slides Layout — Content Sizing and Visibility

## Problem Summary
Multiple slides have content that is too small for the viewport, leaving large empty gaps. The maturity roadmap SVG is distorted and stage dots get clipped. Cards across several slides don't expand to fill their flex containers.

## Slides to Fix (7 files)

### 1. OpsSlide4DTOP.tsx — DTOP cards too small
- Change DTOP card grid from `grid grid-cols-4 gap-3 flex-1` — cards need vertical expansion
- Add `min-h-0` to flex container and make cards stretch with `h-full` on the button elements
- Increase padding from `p-3` to `p-4`, icon from `w-8 h-8` to `w-10 h-10`, text from `text-sm`/`text-xs` to `text-base`/`text-sm`
- Remove broken arrow connector (has `absolute` without a `relative` parent)

### 2. OpsSlide7SteppingStones.tsx — cards small, floating
- Make phase cards expand: add `h-full` to card div, increase padding from `p-4` to `p-5`
- Increase typography: title `text-base` → `text-lg`, capabilities `text-xs` → `text-sm`
- Add `flex-1` to grid wrapper so cards fill vertical space

### 3. OpsSlide8MaturityRoadmap.tsx — SVG distorted, stages clipped
- Replace the absolute-positioned SVG + percentage-margin approach with a 2-column layout: left = SVG curve (properly sized with `xMidYMid meet`), right = stage detail panel
- Use a horizontal stage selector row below the curve instead of dots overlaying it
- Ensure "Fragmented" stage is fully visible and clickable

### 4. OpsSlide5Intelligence.tsx — pipeline cards cramped
- Increase pipeline step padding and icon sizes
- Make the 2-column grid (Precision Gap + Intelligence Tiers) use `flex-1` properly

### 5. OpsSlide9Outcomes.tsx — outcome cards have wasted space
- Cards already use `flex-1` on grid — increase inner padding from `p-3` to `p-4`
- Increase text sizes: title `text-sm` → `text-base`, content `text-xs` → `text-sm`

### 6. OpsSlide10WhyUs.tsx — differentiator cards half-empty
- Increase card padding and text sizes to fill viewport
- Make cards expand to fill available height

### 7. OpsSlide11GettingStarted.tsx — engagement cards small
- Increase card padding, text sizes, and ensure vertical fill

## Design Principles Applied
- All content fills the available viewport (h-screen minus header/footer)
- Minimum text size: 12px for body, 14px for labels
- Cards use `h-full` or `flex-1` to expand into their grid/flex containers
- No content clipped or overlaid by other elements

