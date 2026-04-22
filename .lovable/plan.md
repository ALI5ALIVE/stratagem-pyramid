

## Move Download Deck PDF button to top-left

Move the export toolbar from the top-right to the top-left of the Technical Deep Dive page.

### Change

In `src/pages/TechnicalDeepDive.tsx`, the fixed toolbar wrapper:
- Change `right-4` → `left-4`
- Change `items-end text-right` → `items-start text-left`
- Keep `z-[60]` so it sits above the `SidebarTrigger` (which lives at `top-2 left-2`); the slightly larger `top-4 left-4` offset keeps it clear of the trigger.

### Files

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — class changes only.

### Out of scope

- No change to `DeckPDFExportButton`, `AppLayout`, or `SidebarTrigger`.

