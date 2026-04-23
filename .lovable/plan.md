

## Executive Pitch 3 — Move Core Apps divider after Platform Capabilities

Move the **▸ Core Apps divider** so it appears **after** the **Platform Capabilities** slide (`TechSlide6Capabilities`), not before it.

### New order (slides 4–7)

```text
Before:                                  After:
4. ▸ Core Apps divider                   4. The Platform (5-layer)
5. The Platform (5-layer)                5. Platform Capabilities
6. Platform Capabilities                 6. ▸ Core Apps divider
7. Content · Safety · Training           7. Content · Safety · Training
```

All other slides unchanged.

### File touched

- `src/pages/ExecutivePitch3.tsx` — move the `exec3-divider-core` entry from its current position (before `exec3-slide-4`) to immediately after `exec3-slide-core` (Platform Capabilities) and before `exec3-slide-core-modules` (Content/Safety/Training summary).

### QA

- Open `/pitch-executive-3`, confirm order: Industry Challenge → The Platform → Platform Capabilities → ▸ Core Apps divider → Content/Safety/Training summary → ▸ Data Foundation divider.
- Sidebar reflects new order; total stays at 20 slides.

