

## Restore Line of Sight standalone deck; keep new calculator only in Tech deck

You want the standalone `/line-of-sight` deck reverted to its previous state (CFO + CEO + COO tabs, % gain badges, no citation chips, no methodology popover) while the Technical Deep-Dive keeps the new COO-only, dollar-value, citation-backed calculator.

## Approach

The cleanest split is to stop sharing `SlideLineOfSight` between the two surfaces. The Tech deck wrapper (`TechSlideCalculator`) will get its own dedicated calculator component with the new behaviour, and the original `SlideLineOfSight` (used by `/line-of-sight`) is reverted to its prior multi-stakeholder, percentage-based form.

### Fix 1 — Revert shared data + components to pre-change state

- `src/data/lineOfSightData.ts` — restore the original `executiveOutcomes` array (CFO, CEO, COO with their original metric mix of `$M` and `%/pts`). Keep the new helpers (`computeUseCaseDollarContribution`, `computeLeadingMeasureDollars`) since they're additive and only consumed by the new Tech calculator — they don't affect the old deck.
- `src/components/slides/SlideLineOfSight.tsx` — revert to the pre-change version: 3-tab `Tabs` wrapper (CFO/CEO/COO), `↓ X%` / `↑ X pts` leading-measure badges, no `[i] Source` chips, no Methodology & Sources popover, original tab colour switching.
- `src/components/slides/LineOfSightTree.tsx` — restore CFO and CEO grid cards alongside COO.
- `src/components/slides/BalancedScorecard.tsx` and `PerformanceShiftCurve.tsx` — restore any CFO/CEO references that were stripped.

Net effect: `/line-of-sight` looks and behaves exactly as it did before the last change.

### Fix 2 — Move the new calculator behaviour into a dedicated Tech component

- New file `src/components/slides/TechCalculatorView.tsx` — a copy of the *new* (post-change) `SlideLineOfSight`: COO-only, no Tabs wrapper, `−$XXXk/yr` dollar badges on use-case cards, `[i] Source` tooltip chips, `Methodology & Sources` popover header button, sky/blue COO palette pinned. Same props shape as `SlideLineOfSight` so the wrapper change is one import swap.
- `src/components/tech-slides/TechSlideCalculator.tsx` — change the import from `SlideLineOfSight` to the new `TechCalculatorView`. No other changes; state, helpers, and `SalesSlideContainer` wrapping stay as-is.
- `src/pages/TechnicalDeepDive.tsx` — already references `TechSlideCalculator`. No change needed.

### Fix 3 — Verify no regressions

- `code--search_files` for any remaining cross-imports between Tech deck files and the reverted `SlideLineOfSight` to confirm clean separation.
- Confirm `/line-of-sight` route still renders the original 4-view switcher (Calculator / KPI Tree / Scorecard / Performance Shift) with all three stakeholders intact.
- Confirm the Tech deck calculator slide still renders the COO-only dollar view with citations.

## Out of scope

- No narration script changes.
- No new data, sources, or copy.
- The static `TechSlide13LineOfSight` summary slide stays removed from the Tech deck (the new interactive calculator replaces it, as previously approved).

## Files touched

**New**
- `src/components/slides/TechCalculatorView.tsx` — owns the new COO-only $-value calculator UI.

**Edited (reverted to prior state)**
- `src/data/lineOfSightData.ts` — restore CFO/CEO `executiveOutcomes` entries; keep additive helpers.
- `src/components/slides/SlideLineOfSight.tsx` — restore Tabs, % badges, drop chips/popover.
- `src/components/slides/LineOfSightTree.tsx` — restore CFO/CEO cards.
- `src/components/slides/BalancedScorecard.tsx`, `PerformanceShiftCurve.tsx` — restore CFO/CEO references if removed.

**Edited (one-line swap)**
- `src/components/tech-slides/TechSlideCalculator.tsx` — import `TechCalculatorView` instead of `SlideLineOfSight`.

