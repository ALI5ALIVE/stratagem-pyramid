
# Merge Right-Side Slide Navigation into the Left Sidebar

## Overview
Combine the page-level sidebar navigation with the per-page slide/section navigation into a single unified left sidebar. The right-side dot navigation in SlideDeck and SalesDeck will be removed, and its functionality will move into the sidebar.

## How It Will Work
- The sidebar will show page-level links (Strategy Deck, Sales Deck, Line of Sight) at the top
- Below that, it will show the slides/sections for whichever page is currently active
- Clicking a slide item scrolls to that slide within the deck
- The active slide is highlighted with a dot or accent style
- For Line of Sight, the sub-items will be Calculator, KPI Tree, and Scorecard

## Architecture: Slide Navigation Context
Since the sidebar lives in the layout but the slide data and scroll functions live inside each page, we need a way to connect them. A lightweight React context will handle this.

### New file: `src/contexts/SlideNavigationContext.tsx`
- Creates a context that each page can register into with:
  - `slides`: array of `{ id, label }` 
  - `activeSlide`: current slide index
  - `scrollToSlide`: callback function to navigate to a specific slide
- The sidebar reads from this context to render sub-items
- When a page unmounts, it automatically unregisters

### Updated file: `src/components/AppSidebar.tsx`
- Keep the three page-level nav items at the top
- Add a new section below that reads from the SlideNavigationContext
- Render the registered slides as a vertical list of small buttons/dots with labels
- Highlight the active slide
- On click, call the `scrollToSlide` callback from context
- When the sidebar is collapsed (icon-only mode), the slide items are hidden -- they only show when expanded

### Updated file: `src/components/AppLayout.tsx`
- Wrap the layout with the `SlideNavigationProvider`

### Updated file: `src/pages/SlideDeck.tsx`
- Call the context's register function on mount, passing in the `slides` array, `activeSlide`, and `scrollToSlide`
- Remove the right-side dot `<nav>` element (lines 157-180)
- Keep the bottom-right arrow navigation buttons (they're useful for quick up/down)

### Updated file: `src/pages/SalesDeck.tsx`
- Same pattern: register slides into context on mount
- Remove the right-side dot `<nav>` element (lines 207-224)

### Updated file: `src/pages/LineOfSightPage.tsx`
- Register three "slides": Calculator, KPI Tree, Scorecard
- The `scrollToSlide` callback switches the view state instead of scrolling
- The current view maps to the active slide index

## Technical Details

### Context shape:
```text
SlideNavigationContext {
  slides: { id: string; label: string }[]
  activeIndex: number
  onNavigate: (index: number) => void
  register(slides, activeIndex, onNavigate): void
  unregister(): void
}
```

### Sidebar slide list rendering:
- Each slide shown as a compact row with a small dot indicator and label text
- Active slide gets `bg-sidebar-accent` highlight
- Separated from page links with a thin divider
- Only visible when sidebar is in expanded state

### What gets removed:
- Right-side dot nav in `SlideDeck.tsx` (lines 157-180)
- Right-side dot nav in `SalesDeck.tsx` (lines 207-224)
- The top progress bar in SlideDeck can remain as a subtle indicator

### Files changed:
1. **New**: `src/contexts/SlideNavigationContext.tsx` -- context + provider
2. **Edit**: `src/components/AppLayout.tsx` -- wrap with provider
3. **Edit**: `src/components/AppSidebar.tsx` -- add slide sub-navigation section
4. **Edit**: `src/pages/SlideDeck.tsx` -- register slides, remove right nav
5. **Edit**: `src/pages/SalesDeck.tsx` -- register slides, remove right nav
6. **Edit**: `src/pages/LineOfSightPage.tsx` -- register views as slides
