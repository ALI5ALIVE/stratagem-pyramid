## Plan: Tidy sidebar items

**Changes in `src/components/AppSidebar.tsx`**
1. Remove the **Use Cases & Roadmap** entry from `pitchItems` (the `/roadmap` row with `Map` icon).
2. Remove the `badge: "New"` from **Sales Enablement Academy** in `salesEnablementItems`.
3. Remove the `badge: "New"` from **Signals 101** in `capabilityItems`.
4. Drop now-unused `Map` import from lucide-react.

**Not changed**
- The `/roadmap` route itself remains in `App.tsx` (only the sidebar shortcut is removed). Say if you also want the route deleted.
- Other badges (`Master`) stay as-is.