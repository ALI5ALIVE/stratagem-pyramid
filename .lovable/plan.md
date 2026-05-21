Move the "Positioning & Messaging Playbook" card from its own top section on the Home page into the existing "Additional Resources" section.

## Changes

**`src/pages/HomePage.tsx`**
- Remove the standalone `Positioning & Messaging` section (currently the first section under the hero).
- Add the Positioning & Messaging Playbook card into the `additionalResources` array so it renders inside the existing "Additional Resources" grid alongside CEO Overview and Long — Technical Deep Dive.
- Keep the same copy, icon (BookOpen), badge ("New · 13 sections"), and accent (`from-primary to-comply-plum`).

No other files change. Sidebar placement is untouched (the playbook is not currently in the sidebar, and the request is scoped to the home page layout).