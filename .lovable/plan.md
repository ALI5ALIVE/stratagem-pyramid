
# Fix Sidebar Colour, Slide Alignment, and Auto-Collapse on Scroll

## Problem
Three issues with the current sidebar and slide layout:
1. The sidebar has no explicit grey colour -- it inherits the dark theme background and blends in
2. Slides use `w-screen` which ignores the sidebar width, causing content to extend behind/under the sidebar
3. The sidebar stays open when scrolling through slides, wasting presentation space

## Changes

### 1. Add grey sidebar CSS variables (`src/index.css`)
Add sidebar-specific CSS custom properties in the `:root` block to give the sidebar a distinct medium-grey appearance:
- `--sidebar-background`: a neutral grey (e.g. `220 15% 18%`)
- `--sidebar-foreground`: light text (`0 0% 90%`)
- `--sidebar-accent`: slightly lighter grey for hover/active states
- `--sidebar-border`: subtle border tone

### 2. Fix slide alignment (`src/pages/SlideDeck.tsx`)
Change the outer container from `w-screen` to `w-full` so slides fill only the available space next to the sidebar rather than the full viewport width. The same fix applies to `SalesDeck.tsx` if it uses `w-screen`.

### 3. Auto-collapse sidebar on scroll (`src/pages/SlideDeck.tsx`)
In the existing scroll handler, detect when the user starts scrolling and call the sidebar's `setOpen(false)` to collapse it automatically. This keeps the presentation clean during navigation. The user can always re-expand via the trigger button.

Implementation approach:
- Import `useSidebar` from the sidebar component in SlideDeck
- In the scroll event handler, if `open` is true and scrollTop changes, call `setOpen(false)`
- Use a small debounce or threshold to avoid collapsing on tiny scroll movements

### 4. Same scroll-collapse for SalesDeck (`src/pages/SalesDeck.tsx`)
Apply the same auto-collapse logic so it works consistently across both decks.

## Files Changed
1. `src/index.css` -- add sidebar CSS variables for grey theme
2. `src/pages/SlideDeck.tsx` -- fix `w-screen` to `w-full`, add auto-collapse on scroll
3. `src/pages/SalesDeck.tsx` -- fix `w-screen` to `w-full`, add auto-collapse on scroll

## Technical Details

### CSS variables to add:
```text
--sidebar-background: 220 15% 18%;
--sidebar-foreground: 0 0% 90%;
--sidebar-primary: 217 100% 50%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 220 15% 24%;
--sidebar-accent-foreground: 0 0% 95%;
--sidebar-border: 220 15% 25%;
--sidebar-ring: 217 100% 50%;
```

### Scroll-collapse logic (pseudocode):
```text
const { open, setOpen } = useSidebar();

// Inside scroll handler:
if (open) {
  setOpen(false);
}
```

This will instantly collapse the sidebar the moment the user scrolls, keeping slides front and centre.
