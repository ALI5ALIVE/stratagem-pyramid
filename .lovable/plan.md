

## Executive Pitch 3 — Swap slides 4 and 5

Move the **Core Apps divider** (currently slide 5) to appear **before** the **Platform Overview** (currently slide 4).

### New order (slides 4 & 5 only)

```text
Before:                              After:
4. Platform Overview (5-layer)       4. ▸ Core Apps divider
5. ▸ Core Apps divider               5. Platform Overview (5-layer)
```

All other slides (1-3 and 6-20) remain in their current positions.

### File touched

- `src/pages/ExecutivePitch3.tsx` — reorder two entries in the `slides` array: move `exec3-divider-core` before `exec3-slide-4`.

### Not touched

- All slide components.
- `HomePage.tsx` — slide count unchanged at 20.

### QA

- Open `/pitch-executive-3`, confirm the Core Apps divider appears immediately after Industry Challenge and before the 5-layer Platform Overview.
- Sidebar slide navigator reflects the new order.

