

## Move "Regulation Mgmt" into Platform & Capabilities group

In `src/components/AppSidebar.tsx`, move the `Regulation Mgmt` entry out of the `referenceItems` array and into the `platformItems` array so it sits alongside the other playbooks (Platform, CoAnalyst, Insights, Automation, Mobile, DTOP).

### Change

- Remove from `referenceItems`: `{ title: "Regulation Mgmt", url: "/regulation-management", icon: ScrollText }`.
- Append to `platformItems` (after DTOP, at the bottom of the playbook list): `{ title: "Regulation Mgmt", url: "/regulation-management", icon: ScrollText }`.
- `ScrollText` import stays (still used).

### Out of scope

- No route changes, no label/icon changes, no reordering of other items.
- Build errors flagged in the message (`SlideLineOfSight` missing imports in `LineOfSightPage.tsx` and `ValueDeck.tsx`) are unrelated to this request and will be addressed separately if you flag them.

### Files touched

- Edit: `src/components/AppSidebar.tsx` — move one nav item between two arrays.

