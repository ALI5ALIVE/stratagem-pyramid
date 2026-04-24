

## Move Target Audience above Customer Pitch Decks

Reorder the home page and sidebar so Target Audience (Personas) appears first, before the Customer Pitch Decks section.

### New order

| # | Section |
|---|---|
| 1 | **Target Audience** (moved up) |
| 2 | Customer Pitch Decks |
| 3 | Sales Enablement & Training |
| 4 | Capabilities |
| 5 | Reference (sidebar only) |
| 6 | Strategy & Positioning |
| 7 | Collaboration (sidebar only) |

### Changes

**1. `src/pages/HomePage.tsx`**
- Move the `<section>` containing the Target Audience header + Persona Deep-Dive card to the top of the content stack, above Customer Pitch Decks.

**2. `src/components/AppSidebar.tsx`**
- Move the `<NavGroup label="Target Audience" …>` block (and its preceding `<SidebarSeparator />`) to render immediately after the Home group, before Pitch Decks.

### Files

**EDITED**
- `src/pages/HomePage.tsx`
- `src/components/AppSidebar.tsx`

**NOT TOUCHED**
- Routing, slide components, persona data, all other sections' contents.

### QA

- `/` shows Target Audience as the first section.
- Sidebar order: Home → Target Audience → Pitch Decks → Sales Enablement → Capabilities → Reference → Strategy → Collaboration.

