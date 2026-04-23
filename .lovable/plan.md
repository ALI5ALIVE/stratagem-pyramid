

## Executive Pitch 3 — Consolidate Core App modules into one summary slide + remove Operating Model slide

### Two changes to `src/pages/ExecutivePitch3.tsx`

**1. Remove slide — "DTOP Operating Model" (`Slide3OperatingModel`)**
Redundant: the DTOP layer already has its own divider + summary later in the deck.

**2. Add ONE consolidated Core Apps module summary slide after `TechSlide6Capabilities`**
Instead of three separate slides (Content / Safety / Training), create a single executive-level summary slide showing all three modules side-by-side. This keeps the executive arc tight and avoids the engineering-level depth of the Tech Deep Dive.

### New slide: `ExecCoreAppsSummary` (new file)

`src/components/exec-slides/ExecCoreAppsSummary.tsx` — a new slide component built from existing patterns (`SalesSlideContainer` + `ArchitectureLayerBadge`). Three-column layout, one column per module:

| Column | Module | Accent | Content |
|---|---|---|---|
| 1 | **ContentManager365 + CoAuthor** | blue | Icon + 1-line definition + 3 bullets (Procedure authoring · Revision cascades · Regulatory change impact) |
| 2 | **SafetyManager365** | red | Icon + 1-line definition + 3 bullets (SMS event reporting · Investigation workflows · Risk & audit management) |
| 3 | **TrainingManager365 + CoTrainer** | emerald | Icon + 1-line definition + 3 bullets (Competency-based training · Recurrent automation · Gap analysis) |

Footer line: *"Three best-in-class apps on one shared data foundation — the table stakes done right, so every layer above can do something new."*

Pulls bullet content directly from existing `TechSlide4a/4b/4cSafety/Content/TrainingManager.tsx` files (no new copy).

### New slide order (20 slides)

```text
1. Title
2. Strategic Shift
3. Industry Challenge
4. Platform Overview (5-layer)
5. ▸ Core Apps divider
6. Core Operational Apps summary (TechSlide6Capabilities)
7. Core Apps — Content / Safety / Training (NEW consolidated slide)
8. ▸ Data Foundation divider
9. Operational Data Foundation
10. ▸ Intelligence divider
11. Insights & Intelligence
12. ▸ Mobile divider
13. Unified Mobile Experience
14. ▸ DTOP divider
15. DTOP — System of Work
16. The Transformation
17. Use Cases in Action
18. Maturity Roadmap
19. Customer Outcomes
20. Why Comply365 + CTA
```

Total: **20 slides** (removed 1 Operating Model, added 1 consolidated Core Apps module slide — net zero vs current 20).

### Files touched

- **NEW** `src/components/exec-slides/ExecCoreAppsSummary.tsx` — three-column module summary slide.
- **EDITED** `src/pages/ExecutivePitch3.tsx`:
  - Remove `Slide3OperatingModel` import + slide entry.
  - Import `ExecCoreAppsSummary`.
  - Insert it after `exec3-slide-core` (Layer 1 capabilities).
- **No change** to `src/pages/HomePage.tsx` — slide count stays at 20.

### Not touched

- `TechSlide4a/4b/4cSafety/Content/TrainingManager.tsx` — left intact for the Tech Deep Dive.
- All other slide components, narration, PPTX exporters.

### QA

- Open `/pitch-executive-3`, confirm no "Operating Model" slide in act 1.
- Confirm Layer 1 reads: divider → capabilities summary → 3-column module summary → Data Foundation divider.
- Confirm new slide renders all 3 modules side-by-side at 1132px viewport without overflow.
- Sidebar nav lists 20 slides.

### Out of scope

- PPTX exporter updates.
- Narration scripts for the new slide.
- Any edits to existing Tech Deep Dive module slides.

