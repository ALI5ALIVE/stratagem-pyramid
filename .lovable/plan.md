## Goal
Remove the slide chip rail (numbered list of slide labels) under the slide preview in the Practice Center — it adds no value and crowds the layout.

## Change
In `src/pages/PracticeCenter.tsx`, delete the entire chip rail block (the `<div>` containing `execPitch3Slides.map(...)` rendered as buttons under the Prev/Next bar). Keep Prev/Next + arrow-key navigation as the sole way to move between slides.

The freed vertical space lets the slide stage grow further within its column.

## Out of scope
- No changes to slide data, navigation logic, or right-column cards.
