## Move "Customer Outcomes" slide after Strategic Shift

### Change
Relocate the `exec3-slide-outcomes` slide ("What This Means for Customers — Connecting safety signals to measurable business outcomes") so it sits **immediately after `exec3-slide-1` (Strategic Shift)** and **before `exec3-slide-platform` (The Platform)**.

### New deck order (top excerpt)
```text
Title
Strategic Shift
Customer Outcomes  ← moved here
The Platform
▸ DTOP (divider)
DTOP — System of Work
... (rest unchanged)
```

This frames the business outcomes up front — right after the strategic shift sets the "why" and before the deck dives into platform architecture.

### Files to edit
- `src/pages/ExecutivePitch3.tsx` — reorder the `slides` array only. No component or content changes.
