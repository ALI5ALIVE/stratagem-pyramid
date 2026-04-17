
Add the existing Platform Playbook (`/platform-playbook`) to the Home page so users can launch it from the Command Centre, and promote it in the sidebar.

## Changes (2 files)

### 1. `src/pages/HomePage.tsx`
- Add a new `DeckCardComponent` for **Platform Playbook** in the "Tools & Reference" section (first card, since it's the master/overarching playbook).
  - Title: "Platform Playbook"
  - Description: "Master positioning for the Operational Performance Platform — core apps, data foundation, intelligence layer, mobile, and DTOP."
  - Href: `/platform-playbook`
  - Icon: `Layers`
  - Badge: "13 slides"
  - Accent: `from-primary to-comply-teal`
- Import `Layers` from lucide-react.
- Optionally also add the missing **Insights**, **Automation**, and **Unified Mobile** cards to Tools & Reference (currently in sidebar but not on Home) for consistency.

### 2. `src/components/AppSidebar.tsx`
- Move "Platform Playbook" to the **top** of `toolItems` (currently last) so it leads the Tools group as the master playbook.

No other files affected. No route changes (route already exists).
