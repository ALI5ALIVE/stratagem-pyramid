## Change

Rename the Intelligence & Orchestration Layer pill label from **"System of action"** → **"System of intelligence"** in the platform diagram and matching PPTX export. (The DTOP "System of Work" and Core Apps "System of record" labels are NOT touched — only the intelligence layer pill, which is what's referenced in your message.)

## Files to update

1. **`src/components/platform-slides/PlatformArchitectureDiagramV4.tsx`** (line 51)
   - Pill on Intelligence & Orchestration Layer: `System of action` → `System of intelligence`
   - This propagates to every slide using the diagram (Exec3 Platform, Tech v4 Platform, Platform Architecture, etc.)

2. **`src/exporters/pptx/buildTechnicalDeck.ts`** (line 1036)
   - PPTX pill render: `"System of action"` → `"System of intelligence"`
   - Keeps the downloadable Technical deck and Exec3 deck (which reuses this layout) in sync.

## Out of scope (no change)

- `DTOP — The System of Work` (emerald pill / DTOP layer) — unchanged
- `System of record` (Core Apps pill) — unchanged
- Existing references to "System of Intelligence" already used in `RMSlide0Title`, `regulationManagementPlaybook`, and `insightsPlaybook` — already consistent with the new label.

## Verification

After the edits, `rg -ni "system of action"` should return zero results across the repo.
