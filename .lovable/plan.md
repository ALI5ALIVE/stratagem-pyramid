
# Add a Navigation Sidebar for Page-Level Navigation

## Overview
Add a collapsible sidebar using the existing Shadcn Sidebar component that lets users navigate between the three main tools: Strategy Deck (/), Sales Deck (/sales-deck), and Line of Sight (/line-of-sight).

## What It Will Look Like
- A slim sidebar on the left with icons and labels for each destination
- Starts collapsed (icon-only, ~3rem wide) so it doesn't compete with slide content
- Expands on hover or via a toggle button to show full labels
- Highlights the currently active route
- Uses the dark theme to match the slide deck aesthetic

## Changes

### 1. New file: `src/components/AppSidebar.tsx`
Create a sidebar component with three navigation items:
- **Strategy Deck** (Presentation icon) -- links to `/`
- **Sales Deck** (Megaphone icon) -- links to `/sales-deck`
- **Line of Sight** (Calculator icon) -- links to `/line-of-sight`

Uses the existing `NavLink` component for active-route highlighting and the Shadcn `Sidebar` primitives already installed in the project.

### 2. New file: `src/components/AppLayout.tsx`
A layout wrapper that combines the `SidebarProvider`, `AppSidebar`, and a `SidebarTrigger` button with a main content area. All routed pages will render inside this layout.

### 3. Update: `src/App.tsx`
Wrap the `<Routes>` block inside the new `AppLayout` so the sidebar appears on every page. The three main routes (/, /sales-deck, /line-of-sight) plus the homepage mockup and solution pages will all share the sidebar.

### 4. Minor adjustment to page containers
The SlideDeck, SalesDeck, and LineOfSightPage currently use `h-screen w-full`. These will need a small tweak to use `h-screen w-full` within the flex layout provided by the sidebar, ensuring the content fills the remaining space after the sidebar. This is handled naturally by the `flex-1` on the main content area in the layout.

## Technical Notes
- The sidebar defaults to **collapsed** (`defaultOpen={false}`) so it stays as a narrow icon strip and doesn't obscure slide content
- The `SidebarTrigger` button sits at the top of the sidebar for toggling
- On mobile, the sidebar renders as a slide-out sheet (built into the Shadcn Sidebar component)
- No new dependencies required -- everything uses existing installed components
