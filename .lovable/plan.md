## Problem

The Market Development Hub links to assets like `/category-research-programme`, `/positioning-playbook`, `/content-strategy`, `/ai-infographic`, `/events/from-signals-to-control`, etc. In `src/App.tsx`, all of those routes are registered under `AppLayout` (which renders `AppSidebar` — the "Command Center" sidebar). Only `/market-development` and `/keynote/silos-to-signals` sit under `MarketDevLayout`.

Result: clicking any asset card from `/market-development` swaps the sidebar from `MarketDevSidebar` to `AppSidebar`, so the Market Development navigation visually "disappears" and the user lands in what looks like Command Center.

## Fix

Move every route referenced by the Market Development Hub (and the MarketDevSidebar nav items) under the `MarketDevLayout` route group in `src/App.tsx`, so `MarketDevSidebar` stays mounted while the user moves between them.

Routes to relocate from `AppLayout` → `MarketDevLayout`:

- `/category-research-programme`
- `/strategy-vision-session`
- `/positioning-playbook`
- `/dtop-packaging-pov`
- `/content-strategy`
- `/ai-infographic`
- `/events/from-signals-to-control`
- `/events/from-signals-to-control/brief`
- `/keynote/silos-to-signals` (already there — leave)

`/market-development` stays in `MarketDevLayout`.

No page component changes; no data changes. The pages themselves render fine inside either layout — only the surrounding sidebar differs.

## Side effects to confirm

- These same routes are also listed in `AppSidebar`. After the move, the routes still resolve (React Router doesn't care which layout group declared them, as long as the path is unique). The AppSidebar links will navigate to the page but switch the chrome to `MarketDevLayout` — which is the desired behavior, since these pages belong to the Market Development workstream.
- No code outside `src/App.tsx` needs to change.

## Files touched

- `src/App.tsx` — reorder `<Route>` entries between the two layout groups.
