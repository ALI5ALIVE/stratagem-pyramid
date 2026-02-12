
# Convert Use Case Expander to a Centered Dialog Popup

## Problem
The expanded use case detail panel in the Calculator view gets cut off because it renders inline within the constrained `h-screen overflow-hidden` layout. There isn't enough vertical space for both the card grid and the expanded content.

## Solution
Replace the inline expanded panel with a centered Dialog (modal popup) using the existing Radix Dialog component already in the project. When a user clicks a use case card's expand button, it opens a modal overlay in the center of the screen with all the detail content.

## Technical Details

### File: `src/components/slides/SlideLineOfSight.tsx`

**1. Add Dialog imports**
- Import `Dialog, DialogContent, DialogHeader, DialogTitle` from `@/components/ui/dialog`

**2. Replace the inline expanded panel (lines 399-469) with a Dialog**
- Remove the current inline `<div>` expansion block
- Add a `<Dialog>` component that is controlled by `expandedUseCase` state:
  - `open={!!expandedUseCase}`
  - `onOpenChange` sets `expandedUseCase` to `null` when closed
- Move all the existing detail content (description, cost components, measures impacted, DTOP mechanism, point solution gap) into `<DialogContent>`
- Use `max-w-lg` or `max-w-xl` for comfortable reading width
- The dialog's built-in close button (X) and overlay click-to-dismiss handle closing

**3. Keep the card click/chevron behavior**
- The existing `setExpandedUseCase(uc.id)` toggle on card click stays the same -- it now opens the dialog instead of expanding inline
- Clicking the same card again or pressing the dialog X closes it

This approach:
- Eliminates all clipping issues since the dialog renders in a portal above everything
- Requires minimal code changes (just wrapping existing content in Dialog components)
- Uses the project's existing Dialog component -- no new dependencies
