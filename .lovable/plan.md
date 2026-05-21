## Goal

Make the "Frame the Journey — Roadmap Vision" slide the **first content slide of Week 3**, immediately after the Week 3 divider, and update narration transitions so the flow reads cleanly.

## Reorder in `src/pages/SalesEnablement.tsx`

Move the `se-w3-roadmap-vision-frame` row from its current position (between `se-footprint-playbook` and `se-w3-whole-vision-whiteboard`) to sit directly after the Week 3 divider:

```text
se-week-3                       (▸ Week 3 · Sell & Win divider)
se-w3-roadmap-vision-frame      ← NEW POSITION (opener)
se-w3-signals-recap
se-who-to-target
se-footprint-intro
...
se-footprint-playbook
se-w3-whole-vision-whiteboard   ← unchanged
se-discovery-to-close
...
```

## Narration updates in `src/data/salesEnablementNarration.ts`

Only the transition sentences change; coach-script structure and approved terminology stay intact.

1. **`se-w3-roadmap-vision-frame`** — rewrite the closing transition. New ending: leads into the Signals → DTOP recap, not the Whole Vision whiteboard. Example: "Transition: with the curve drawn and the destination agreed, let's recap how signals become orchestrated action through DTOP — then we'll pick the right account, draw their footprint, and finish the week by whiteboarding the full platform that walks them up this curve."

2. **`se-footprint-playbook`** — rewrite the closing transition so it leads into the Whole Vision whiteboard (which now follows it directly), not into Discovery → Close. New ending: "Transition: next, we put every layer of the platform on one whiteboard — each one a deal on its own, stacked into one compounding loop — so you can show the buyer exactly what walks them up the curve you just framed."

3. **`se-w3-whole-vision-whiteboard`** — keep as-is; its existing transition already leads into Discovery, Walkthrough and Close.

4. **`se-week-3`** (divider script, if present) — if it currently previews the Week 3 order, update one sentence so it mentions the roadmap frame opening the week. Verify during implementation; only edit if it lists slide order.

## Memory update

Update `mem/content/sales-enablement/week3-field-kit.md` so the numbered W3 flow reflects the new opener position (Roadmap Vision becomes slide 1 of Week 3 content, before Signals Recap).

## Out of scope

- No visual or copy changes to the slide itself.
- No edits to W1/W2 slides or narrations.
- No PPTX export, registry, or styling changes beyond the single row move.
