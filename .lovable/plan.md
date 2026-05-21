## Goal

Remove three Week 3 slides from the Sales Enablement training: **Why Comply365**, **Practice Center Bridge**, and **Your First 30 Days**. The Strategy & Vision Session becomes the closing slide of Week 3.

## Edits

### 1. `src/pages/SalesEnablement.tsx`
- Delete the three entries from the `slides` array:
  - `se-slide-why` (W3 · Why Comply365)
  - `se-practice-center-bridge` (W3 · Practice Center Bridge)
  - `se-slide-closing` (W3 · Your First 30 Days)
- Remove `"se-slide-why"` from the `execPitchMapping` object.
- Update the `weekProps.w3` block:
  - Drop `"Why Comply365"`, `"Practice Center bridge"`, `"Your first 30 days"` from `upNext`.
  - Reduce `estimatedMinutes` from 48 to ~38.

### 2. `src/data/salesEnablementNarration.ts`
- Delete narration entries for `se-slide-why`, `se-practice-center-bridge`, and `se-slide-closing`.
- Rewrite the closing line of `se-deal-stage-language` so its transition leads into the **Strategy & Vision Session** (the new closing slide), instead of "Next: Why Comply365".

### 3. Sanity sweep
- `rg` for any other references to those three slide IDs (academy slide registry, exporters, quiz banks, deep-link buttons). If references exist, plan delta:
  - `src/components/academy/slideRegistry.ts` — drop entries if present.
  - Anywhere else — remove and report.

### 4. Memory
- Update `mem/content/sales-enablement/week3-field-kit.md` Week 3 slide order list to reflect the three removed slides and the new ending on Strategy & Vision Session.

## Out of scope
- No new slides added.
- No changes to Week 1, Week 2, or to the Strategy & Vision Session itself.
- The `SEClosingForReps`, `SEPracticeCenterBridge`, and `TechSlideWhyComply` component files are left in place (still used elsewhere or harmless dead code in the Enablement context) unless the sweep shows they're orphaned and exclusively used here — in which case I'll leave the files anyway, since they may be referenced by other decks.
