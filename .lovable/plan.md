

# Remove "Operational Outcomes" Slides from Ops and Tech Decks

The Executive deck doesn't have a separate Outcomes slide — only the Ops and Tech decks do. Both already have the "Customer Outcomes" slide which covers the same ground.

## Changes

### 1. `src/pages/OperationalPitch.tsx`
- Remove the import of `OpsSlide9Outcomes` (line 16)
- Remove `{ id: "ops-slide-9", label: "Outcomes", component: OpsSlide9Outcomes }` from the slides array (line 32)

### 2. `src/pages/TechnicalDeepDive.tsx`
- Remove the import of `TechSlide16Outcomes` (line 26)
- Remove `{ id: "tech-slide-16", label: "Outcomes", component: TechSlide16Outcomes }` from the slides array (line 52)

**2 files modified. No new files. The component files themselves (`OpsSlide9Outcomes.tsx`, `TechSlide16Outcomes.tsx`) are left in place as dead code — can be deleted in a cleanup pass if desired.**

