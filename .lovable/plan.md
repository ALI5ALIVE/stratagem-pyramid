## Plan

Add Practice Center to the home command center's Sales Enablement section.

### `src/pages/HomePage.tsx`
- Import `Mic` from `lucide-react` (alongside existing icons).
- In the "Sales Enablement & Training" section (after the Sales Enablement Training card), add a third `DeckCardComponent`:
  - title: "Practice Center"
  - description: "Live voice role-play with AI-driven buyer personas. Reps rehearse discovery, objection handling, and closing — scored on the spot."
  - href: `/practice-center`
  - icon: `Mic`
  - badge: "New · voice role-play"
  - accent: `from-primary to-violet-500`

### Nav
`AppSidebar.tsx` already lists Practice Center under the "Sales Enablement" group at `/practice-center` with the `Mic` icon and "New" badge. No change needed.

### Out of scope
No changes to `/sales-enablement` deck content, no route changes, no auth changes (Practice Center already gated by `RequireAuth`).
