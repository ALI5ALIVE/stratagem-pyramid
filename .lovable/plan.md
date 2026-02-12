

# Fix Calculator Viewport Fit — Compress Tier 2 and Reveal Use Case Expand

## Problem

Two issues on the Calculator view:
1. **Leading Measures (Tier 2)** use full card layouts with icon, value, delta, and baseline -- taking ~156px of vertical space for what is essentially read-only computed numbers
2. **Use Case expand buttons** (chevron icons on Tier 3 cards) are clipped below the viewport fold

## Solution

### 1. Convert Tier 2 from cards to inline pills

Replace the `grid-cols-3` card layout with a **single horizontal row of compact pills**. Each pill shows just the label and current value inline (e.g., "Fuel Variance 2.8%") with a subtle improvement colour. This reduces Tier 2 from ~156px to ~40px -- saving over 100px.

Before:
```text
Leading Operational Measures (header)
[Card: icon + label]  [Card: icon + label]  [Card: icon + label]
[     value + delta ]  [     value + delta ]  [     value + delta ]
[     baseline      ]  [     baseline      ]  [     baseline      ]
```

After:
```text
Leading Measures:  [Fuel Variance 2.8%]  [Fleet Avail 92.1%]  [OTP 79.3%]  ...
```

Each pill is a small rounded badge with the value. Baseline and delta details move into a tooltip on hover -- keeping the information accessible without the vertical cost.

### 2. Merge Cost Banner into Tier 1 row

Move the "Estimated Annual Cost Avoidance" from a separate full-width banner into the **Tier 1 grid** as a 4th card (alongside the 3 executive outcome cards). This saves ~80px of vertical space. The grid becomes `grid-cols-4` with the cost avoidance card using the existing emerald styling.

### 3. Reduce Tier 3 card internal spacing

- Cut card padding from `p-2.5` to `p-2`
- Reduce slider margin from `mb-2` to `mb-1.5`
- Shrink the slider min/max labels row spacing
- Make the expand chevron more visible by adding a subtle `hover:bg-muted/30` to the header button

These small tweaks recover another ~30px across the 2 rows of use case cards.

### 4. Remove Tier section headers

The "Executive Outcomes", "Leading Operational Measures", and "Platform Use Cases" headers each take ~28px (text + margin). Remove the standalone headers and integrate labels into the inline elements:
- Tier 1 label becomes part of the tab content (already identified by the stakeholder tab)
- Tier 2 label becomes a small prefix before the pills ("Measures:")
- Tier 3 label is removed (the cards are self-explanatory)

This saves ~84px total.

## Space Budget After Changes

| Section | Before | After |
|---------|--------|-------|
| Airline profile (collapsed) | 48px | 48px |
| Tab bar | 40px | 40px |
| Tier 1 section header | 28px | 0px |
| Tier 1 cards (3 outcomes) | 100px | ~85px (now grid-cols-4 with cost banner merged) |
| Cost banner | 80px | 0px (merged into Tier 1) |
| Tier 2 section header | 28px | 0px |
| Tier 2 measure cards | 140px | ~36px (inline pills) |
| Tier 3 section header | 28px | 0px |
| Tier 3 use case cards (2 rows) | 300px | ~260px (tighter padding) |
| Gaps and padding | ~80px | ~50px |
| **Total** | **~872px** | **~519px** |

This leaves ~480px of breathing room on a 1080p display, ensuring the expand chevrons are fully visible and there is space for one expanded use case detail panel without scrolling.

## Technical Details

### File: `src/components/slides/SlideLineOfSight.tsx`

**Tier 2 rewrite (lines 289-325):** Replace the grid of cards with a flex-wrap row of pill badges. Each pill:
- Shows `shortLabel` and computed value with unit
- Uses emerald text colour when improved vs baseline
- Wraps in a `TooltipProvider` showing baseline and delta on hover
- Prefixed with a small "Measures:" label

**Cost banner merge (lines 272-287):** Remove the standalone banner div. Add a 4th card to the Tier 1 grid showing the cost avoidance total. Change grid from `grid-cols-3` to `grid-cols-4` (with the cost card spanning same width).

**Remove section headers (lines 228-229, 291-292, 329-330):** Delete the `h3` elements for all three tiers.

**Tier 3 tightening (lines 341-485):** Reduce `p-2.5` to `p-2`, `mb-2` to `mb-1.5`, and add `hover:bg-muted/20 rounded` to the expand button for better discoverability.

### No data file changes

All modifications are layout-only in `SlideLineOfSight.tsx`. No changes to `lineOfSightData.ts` or other files.
