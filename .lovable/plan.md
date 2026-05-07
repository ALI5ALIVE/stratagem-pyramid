## Reorder /platform sections to match the architecture diagram (top → bottom)

The architecture diagram reads top-down as:

```text
L4  DTOP — wraps the stack
L3  Unified Mobile Experience
L2  Intelligence & Orchestration
L1  Foundation — 3 Systems of Record
```

The page currently reads bottom-up relative to the diagram (Foundation → DTOP → Intelligence → Mobile), which fights the visual.

### New section order

```text
StickyNav
Hero
Outcomes
Platform Modules        (overview + diagram)
DTOP                    ← L4
Unified Mobile          ← L3
Intelligence            ← L2
Foundation              ← L1
Integrations
Security
Why It Works
CTA
```

### Changes

1. **`src/pages/PlatformOverview.tsx` — render order** in `<PlatformOverview />`:
   reorder to `<DTOPSection /> <Mobile /> <Intelligence /> <Foundation />` between `<PlatformModules />` and `<Integrations />`.

2. **`navItems` array** — reorder to match:
   `outcomes · platform · dtop · mobile · intelligence · foundation · integrations · security · why`.

3. **Copy nudges** so the flow reads as a guided descent down the stack:
   - Foundation eyebrow: `Foundation · Layer 1 · Systems of Record`
   - Intelligence eyebrow: add `Layer 2`
   - Mobile eyebrow: add `Layer 3`
   - DTOP eyebrow: add `Layer 4 · Wraps the stack`
   - Tweak the "Core Operational Apps" tile desc in `PlatformModules` so the "see Foundation below" pointer still reads naturally now that Foundation is further down the page (keep the pointer, just say "covered in the Foundation section").

### Out of scope

- No changes to section internals beyond the eyebrow + the one tile desc.
- No diagram edits.
- No home page changes.
