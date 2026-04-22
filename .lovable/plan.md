

## Move Download Deck PDF button to top-right

The export button currently sits at `top-4 right-4` in `TechnicalDeepDive.tsx`, but the `SidebarTrigger` in `AppLayout.tsx` is at `top-2 left-2` — so visually the button is already on the right. From the screenshot the user is seeing it on the left, which means the fixed toolbar is being overlapped/pushed by the sidebar trigger or the sidebar itself.

### Change

In `src/pages/TechnicalDeepDive.tsx`, the fixed toolbar wrapper:
- Keep `fixed top-4 right-4 z-50`
- Add explicit right-anchored alignment: `items-end text-right`
- Bump `z-50` to ensure it sits above the `SidebarTrigger` (which is also `z-50`) by using `z-[60]`
- Ensure the helper caption (`Interactive slides export in their default view.`) wraps under the button on the right, not pushing it left — wrap the caption in a `max-w-[220px]` block

Result: the **Download Deck PDF** button and its caption render flush to the top-right corner of the viewport, clear of the sidebar trigger on the top-left.

### Files

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — adjust the fixed toolbar classes only. No logic changes.

### Out of scope

- No change to `DeckPDFExportButton` itself.
- No change to `AppLayout` / `SidebarTrigger` placement.

