

# Update Customer Outcomes Slide & Interactive Calculator

## Summary

Two changes: (1) Replace the "Benchmarking Program" section on the Customer Outcomes slide with a CTA linking to the Interactive Calculator, and (2) make the aircraft number field editable on the Interactive Calculator.

## Changes

### 1. `src/components/shared/CustomerOutcomesSlide.tsx`

- **Remove** the "Benchmarking Program" section (lines 174-190)
- **Replace** with a prominent CTA card linking to `/line-of-sight`:
  - Text: "Learn More about the Platform ROI"
  - Subtitle: "Explore the Interactive Calculator to model cost avoidance with your airline's numbers"
  - Styled as a gradient card with arrow icon, using `Link` from `react-router-dom`

### 2. `src/components/slides/Slide7Customers.tsx`

- Apply the same change: **remove** the "Benchmarking Program" section (lines 185-201) and **replace** with the same CTA linking to `/line-of-sight`

### 3. `src/components/slides/SlideLineOfSight.tsx`

- The `fleetSize` (Aircraft) field is already in `profileInputs` and rendered as an editable `<Input type="number">` — but the airline profile panel is collapsed by default. The issue is likely that `fleetSize` appears as the first field and may seem fixed because the panel starts collapsed showing it as read-only text in the summary line (line 171).
- **No structural change needed** — the field is already editable when the panel is expanded. However, to make it more accessible: change `profileOpen` default from `false` to `true` so the profile panel starts expanded, making it immediately clear that aircraft count is editable.

**2 files modified (CustomerOutcomesSlide.tsx, Slide7Customers.tsx), 1 file tweaked (SlideLineOfSight.tsx).**

