

## Stop slide navigation when typing in comment/reply inputs

When you press Space (or arrow keys) inside the comment textarea, the deck's window-level keyboard listener fires `preventDefault()` and scrolls to the next slide. Fix: each deck's `keydown` handler should ignore key events whose target is an input, textarea, contentEditable element, or anything inside the comment drawer.

### Change

Add a single guard at the top of every deck-level `keydown` handler:

```ts
const target = e.target as HTMLElement | null;
if (
  target &&
  (target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable ||
    target.closest("[data-radix-popper-content-wrapper]") ||
    target.closest("[role=dialog]"))
) {
  return;
}
```

This lets the space/arrow keys behave normally inside the comment textarea, reply box, approval note, sign-in fields, and any popover/sheet — while keeping deck navigation working everywhere else.

### Files touched

- `src/pages/TechnicalDeepDive.tsx`
- `src/pages/PlatformPlaybook.tsx`
- `src/pages/CoAnalystDeck.tsx`
- `src/pages/InsightsPlaybook.tsx`
- `src/pages/AutomationPlaybook.tsx`
- `src/pages/MobilePlaybook.tsx`
- `src/pages/DTOPPlaybook.tsx`
- `src/pages/RegulationManagementPlaybook.tsx`
- `src/pages/ExecutivePitch.tsx`
- `src/pages/ExecutivePitch2.tsx`
- `src/pages/OperationalPitch.tsx`
- `src/pages/ContentStrategyPage.tsx`
- `src/pages/SlideDeck.tsx`
- `src/pages/ValueDeck.tsx`

### Out of scope

- No change to scroll-snap behaviour, narration, or comment UI itself.
- No change to sidebar shortcuts.

