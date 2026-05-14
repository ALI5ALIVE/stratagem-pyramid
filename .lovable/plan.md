## Plan

Swap the routes in `src/App.tsx`:

- `/` → `<HomePage />` (the original command center, currently at `/home-legacy`)
- `/platform` → `<OperationalPlatformHome />` (the new marketing homepage, currently at `/`)
- Remove the `/home-legacy` route

Also update internal links inside the new homepage components (`TopNav`, `Hero`, `FinalCTA`, `Footer`, etc.) so any self-references to `/` point to `/platform` instead, keeping the marketing page self-consistent on its new route.

No other components, content, or styling change. No backend, no new files.

### Out of scope
- No edits to the command center (`HomePage`) itself.
- No changes to pitch decks, Practice Center, or playbook routes.
- No content rewrites on the marketing homepage.
