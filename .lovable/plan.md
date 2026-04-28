# Roadmap Amends — Apply KG/PS v2 Across All References

## What changed in the uploaded doc

The amends, reconciled against today's roadmap:

**H1 2026** (no structural change, naming refinements)
- Rename in-flight mobile item to: **"All-in-One Mobile Experience — Phase 1: Training screens in the Comply iOS Mobile app"**

**H2 2026** (largest set of changes)
- Rename safety mobile item to: **"All-in-One Mobile Experience — Phase 2: Safety Reporting in the Comply iOS Mobile app"**
- UI Standardisation layer becomes **"Unified Web Experience"** (was "Unified Experience")
- **Remove** "Platform-wide Automation — POC" (struck through in the source)
- Keep "Platform-wide Business Intelligence — POC"
- **Move into H2**: "Next-Phase Regulation Management Integration" (was 2027+)
- **Move into H2**: "Platform-wide Automation — Rollout" (was 2027+)

**2027 and Beyond** (rename + content shuffle)
- Phase label becomes **"2027 and Beyond"** (was "2027+")
- Keep: Platform-wide BI Rollout, Contextual Document Viewing from TM365, Platform-wide Insights & Recommendations Rollout (tagged as "Future Vision")
- Rename Mobile Unification → **"All-in-One Mobile Experience — Phase 3: Unified User Experience across OCM, Training & Safety"**
- **Add** new item: **"Continued roll-out of Platform-wide Automation capability (more connectors, more conditions, more actions)"**
- **Add** new item: **"Future Platform PoCs — to be determined with customer input"**

## Files to update

### 1. `src/data/roadmapUseCases.ts` — single source of truth
- Add a new `PlatformLayer` value `"Unified Web Experience"` alongside existing layers.
- Rename `phaseMeta["2027-plus"].label` from `"2027+"` to `"2027 and Beyond"` (keep key `2027-plus` so URLs/IDs don't break; window stays "2027 onwards").
- **H1 2026 — `training-mobile`**: rename title to `"All-in-One Mobile Experience — Phase 1: Training in the Comply iOS Mobile App"`.
- **H2 2026 — `ui-standardisation`**: change `layer` to `"Unified Web Experience"`.
- **H2 2026 — `safety-mobile`**: rename title to `"All-in-One Mobile Experience — Phase 2: Safety Reporting in the Comply iOS Mobile App"`.
- **Remove `automation-platform-poc`** (the H2 POC entry) entirely.
- **Move `regmgmt-next-phase`** from `2027-plus` → `h2-2026`; keep id stable.
- **Move `automation-platform-rollout`** from `2027-plus` → `h2-2026`; keep id stable.
- **Rename `mobile-unified`** title to `"All-in-One Mobile Experience — Phase 3: Unified Experience across OCM, Training & Safety"`; refresh `oneLiner` and `whatWereDelivering` to match.
- **Add new use case** `automation-continued-rollout` (phase `2027-plus`, layer `Intelligence & Orchestration Layer`, status `planned`): "Continued roll-out of Platform-wide Automation capability — more connectors, more conditions, more actions". Include realistic problemToday/whatWereDelivering/dtop/customerOutcomes fields consistent with the existing tone.
- **Add new use case** `future-platform-pocs` (phase `2027-plus`, layer `Intelligence & Orchestration Layer`, status `planned`): "Future Platform PoCs — defined with customer input". Same shape.

### 2. `src/data/roadmapNarration.ts`
- Update use-case count in `overviewScript` and `closingScript` (currently "seventeen named use cases" → recompute: 11 existing remain + 2 new − 1 removed → **18**; actually verify after edits and use the resulting integer). Update phrasing of 2027 phase to "twenty twenty-seven and beyond".
- Update `titleScript` "2027 plus, intelligent operations" → "2027 and beyond, intelligent operations".

### 3. `src/components/tech-slides/TechSlide15Roadmap2026.tsx` (on-screen Tech Deck slide 15)
- Replace hard-coded H2 items list to drop the Platform-wide Automation POC line and add:
  - "🔄 Next-Phase Regulation Management Integration (Operational Data Foundation)" — moved into H2
  - "📋 Platform-wide Automation — Rollout (Intelligence & Orchestration Layer)" — moved into H2
- Update H1 mobile line wording to "All-in-One Mobile Experience — Phase 1…".
- Update H2 mobile line wording to "All-in-One Mobile Experience — Phase 2…".
- Update H2 UI line layer label to "Unified Web Experience".
- Update 2027+ block:
  - Change `phase` label to **"2027 and Beyond"**.
  - Remove the Next-Phase Regulation item (now in H2).
  - Remove the Platform-wide Automation Rollout item (now in H2).
  - Rename mobile unification line to "All-in-One Mobile Experience — Phase 3…".
  - Add "Continued roll-out of Platform-wide Automation capability (more connectors, conditions, actions)".
  - Add "Future Platform PoCs — defined with customer input".
  - Tag Insights line with "(Future Vision)" suffix to mirror the source.

### 4. `src/exporters/pptx/buildTechnicalDeck.ts` (lines ~2140–2210)
- Mirror the same list/label changes in the native PPTX 2026 Roadmap slide.
- Update tick label `"2027+"` → `"2027 and Beyond"` (and widen the tick text frame slightly so it doesn't clip).
- Trim H2 list to ~5–6 items max to keep the card readable; prioritise the new H2 entries.

### 5. `mem://product/roadmap-dates`
- Add a clarifying line: "Platform-wide Automation moves from POC to **rollout in H2 2026** (POC step is collapsed)."
- Add: "Phase 3 mobile label = 'All-in-One Mobile Experience — Phase 3: Unified Experience across OCM, Training & Safety' (2027+)."
- Rename phase 3 reference to **"2027 and Beyond"**.
- Append the new 2027+ items: continued automation roll-out and Future Platform PoCs.
- Refresh `mem://index.md` description for this entry if needed (no new file required).

### 6. Verify (no changes expected)
- `RDSlide1Overview`, `RDPhaseDivider`, `RDUseCaseSlide` — these read from the data layer, so they auto-update once `roadmapUseCases.ts` changes. Visually confirm the H2 column doesn't overflow with the two added cards (h2 grows from 5 → 7 use cases). If overflow, reduce gap or allow vertical scroll inside the divider's downstream slides (each use case is its own slide, so this is fine — the divider just lists them).
- `RoadmapDeck` page builder — auto-derives slides from data; new use cases appear automatically; removed `automation-platform-poc` slide drops out cleanly. Sidebar numbering re-sequences automatically.

## Out of scope
- The maturity/value pyramid roadmap copy in other slides (Slide5MaturityCurve, etc.) — unrelated narrative arc, not part of the H1/H2/2027 use case roadmap.
- `buildExecutiveDeck.ts` "Maturity Roadmap" — different concept, not the use-case roadmap.

## Acceptance check
- `/roadmap` deck renders with H2 showing 7 cards (UI Std, RegDB Rollout, Mobile Phase 2, BI POC, Next-Phase RegMgmt, Automation Rollout) and 2027 and Beyond shows 5 cards (BI Rollout, Mobile Phase 3, Contextual Doc, Insights Rollout (Future Vision), Continued Automation, Future PoCs — recount: 6).
- `/pitch-technical-v4` slide 15 mirrors the same lists with correct emojis and the "2027 and Beyond" header.
- PPTX export of the technical deck slide 15 reflects the same content; tick label reads "2027 and Beyond".
- Narration counts and phrasing match the new totals.
