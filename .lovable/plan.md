

# Technical Deck: Remove Capabilities, Merge Intelligence Tiers + vs Generic AI

## Changes

### 1. Merge slides 08 and 09 into a single slide
**File:** `src/components/tech-slides/TechSlide8IntelligenceTiers.tsx`

Combine the 4 intelligence tiers (left) with the comparison table and accuracy data (right) into one slide titled "Intelligence Tiers & Differentiation."

- **Left column (60%):** Keep the 4 tier cards (Historical, Reactive, Proactive, Predictive) but make them more compact — remove the example boxes, keep only icon + tier name + one-line description + capability footnote. 2×2 grid.
- **Right column (40%):** Pull in the comparison table from `TechSlide9VsGenericAI` (capability rows with check/X) plus the "Accuracy by Depth" mini-card below it.
- Drop the "Build vs Buy" card and quote block (redundant with CoAnalyst slide 07).

### 2. Remove slide 12 (Capabilities)
**File:** `src/pages/TechnicalDeepDive.tsx`

- Remove `TechSlide6Capabilities` import and its entry from the `slides` array.
- Remove `TechSlide9VsGenericAI` import and its entry (now merged into slide 08).
- Resulting deck: 22 → 20 slides.

### Files changed

| File | Change |
|------|--------|
| `TechSlide8IntelligenceTiers.tsx` | Merge tiers + comparison table into one slide |
| `TechnicalDeepDive.tsx` | Remove Capabilities and VsGenericAI entries |

