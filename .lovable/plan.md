# Plan: Align Sidebar Navigation with Home Page

Mirror the sidebar exactly to the four sections shown on the home page (`/`). Remove the "Reference" group (Line of Sight, Homepage Mockup) and the "Collaboration" group (Reviews) so the sidebar reflects only what the home page advertises.

## Result — sidebar after change

```text
Home

TARGET AUDIENCE
  · Personas

PITCH DECKS
  · Short — Customer Overview        →  /customer-overview
  · CEO Overview                     →  /pitch-executive-2
  · Medium — Executive Pitch         →  /pitch-executive-3
  · Long — Technical Deep Dive       →  /pitch-technical-v4

SALES ENABLEMENT
  · Sales Enablement Academy   [New] →  /academy
  · Sales Enablement Training        →  /sales-enablement

CAPABILITIES
  · Platform Playbook        [Master] →  /platform-playbook
  · CoAnalyst Playbook                →  /coanalyst
  · Regulation Management             →  /regulation-management
  · DTOP Operating Model              →  /dtop-playbook
  · Insights & Recommendations        →  /insights-playbook
  · Automation                        →  /automation-playbook
  · Unified Mobile App                →  /mobile-playbook

[ Sign in / profile ]
```

## What changes

1. **Remove "Reference" group** from sidebar — Line of Sight (`/line-of-sight`) and Homepage Mockup (`/homepage-mockup`) are no longer surfaced in primary navigation. Routes still exist; they're just not in the sidebar.
2. **Remove "Collaboration" group** — drop the "Reviews" link (`/review`). Route remains accessible by URL.
3. **Reorder Capabilities** to match the home page card order: Platform → CoAnalyst → Regulation → DTOP → Insights → Automation → Mobile.
4. **Rename two items** to match the home page wording exactly:
   - "CoAnalyst" → "CoAnalyst Playbook"
   - "Insights & Recs" → "Insights & Recommendations"
   - "Unified Mobile" → "Unified Mobile App"
   - "Regulation Mgmt" → "Regulation Management"
5. **Rename Academy item** "Academy (Modules + Quiz)" → "Sales Enablement Academy" so sidebar matches the home page card title.

## Technical changes

Single file edit:

- **`src/components/AppSidebar.tsx`**
  - Delete `referenceItems` and `collaborationItems` arrays.
  - Remove the two `<NavGroup>` renders + their `<SidebarSeparator />` for those groups.
  - Reorder `capabilityItems`; update titles as listed above.
  - Update `salesEnablementItems[0].title` to "Sales Enablement Academy".
  - Drop now-unused icons from the lucide-react import (`Target`, `Globe`, `MessageSquare`).

No route, page, or data changes. Home page (`HomePage.tsx`) is already the source of truth — no edits needed there.
