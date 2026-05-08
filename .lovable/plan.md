## What I found in the code

The two pages are already on separate routes:

- **Signals 101 playbook** → `/signals-playbook` → `src/pages/SignalsPlaybook.tsx` (the 11-slide deck I built)
- **Event Positioning Brief** → `/events/from-signals-to-control/brief` → `src/pages/events/SignalsEventBrief.tsx` (the long-scroll messaging brief)

Both the homepage "Signals 101" card and the sidebar "Signals 101" item correctly point to `/signals-playbook`. There is no code that redirects one to the other.

You're currently sitting on `/events/from-signals-to-control/brief`, which is the Event Brief — not the playbook. So I suspect what's actually happening is one of:

1. Browser cache / stale tab — the click is going to `/signals-playbook` but the preview is showing a cached brief render.
2. The two pages look thematically similar (both dark, both about "signals"), so the brief is being mistaken for the playbook.
3. A link somewhere outside the homepage/sidebar is pointing at the brief by mistake.

## Plan

### 1. Confirm the routing live
- Hard-refresh `/signals-playbook` in the preview and confirm the deck (slide "Signals 101 — From Noise to Action") renders, not the brief.
- If it does render correctly, the bug is purely visual confusion → go to step 2.
- If it does NOT, audit every `Link`/`href` to `/signals-playbook` and `/events/from-signals-to-control/brief` and fix the offender.

### 2. Make the two pages visually unmistakable
On `SignalsEventBrief.tsx`:
- Keep the existing "Event Positioning & Messaging Brief" chip but make it bigger and pin a sticky "Internal Event Brief — not the Signals 101 playbook" sub-label under the H1.
- Add a prominent CTA card near the top: "Looking for the sales playbook? → Open Signals 101" linking to `/signals-playbook`.

On `SignalsPlaybook.tsx` title slide (`SIGSlide0Title.tsx`):
- Already says "Signals 101 / From Noise to Action" + "Sales Enablement Playbook" pill — leave as-is.
- Add a small footer chip "Playbook · /signals-playbook" so the route is visible.

### 3. Tighten the entry points
- Homepage: keep the Signals 101 card under Capabilities (already correct: `/signals-playbook`).
- Sidebar: keep "Signals 101" under Capabilities (already correct).
- Add the Event Brief as its own labelled entry **only** if you want it discoverable (currently it's only reachable by direct URL). If yes, I'll add a separate "Event Positioning Brief" card under Additional Resources so they sit side-by-side and clearly read as two different items.

### Out of scope
- No content rewrites of either page.
- No route renames (would break existing links).

### Question before I implement
Do you want me to **(a)** keep the Event Brief hidden from nav and just add the visual differentiation + cross-link, or **(b)** also surface the Event Brief as its own card on the homepage / in the sidebar so the two are visibly distinct entries? I'll default to (a) unless you say otherwise.