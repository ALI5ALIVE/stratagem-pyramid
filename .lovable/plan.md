## Goal

For Week 2 of Sales Enablement:

1. **Align the Intelligence & Insights use-case copy** with the wording you supplied (per-solution + platform).
2. **Add a dedicated platform-wide use-case slide** so reps land on the three platform questions cleanly, instead of skimming them in the bottom half of the combined slide.
3. **Slot the Regulation Management use case** (from the medium pitch — `TechSlideRegulationSummary`) into Week 2, immediately before the Platform Unified Mobile Experience slide.

## Changes

### 1. Update `SECapabilityUseCases.tsx` — intelligence variant copy

Refresh the `DATA.intelligence` block so per-solution + platform read exactly as you wrote them:

- **Safety** — "Create a list of safety reports associated with a specific aircraft to send to the lessor for their safety records — formatted to the lessor's requirements and sent electronically on a schedule."
- **Content** — "Create a list of flight crew who haven't synched their mobile devices in the past 30 days — passed to fleet captains for follow-up and compliance."
- **Training** — "Create a list of crew with upcoming training renewals for a specific base, to schedule classroom training."
- **Platform questions** (kept on this slide as the "preview" trio):
  - "Show me a correlation between recent safety trends and training deficiencies."
  - "How are we performing with the recent updates to the Dangerous Goods manual? Has the resulting training led to fewer incidents?"
  - "Are we ready for the upcoming Part 145 audit?"

No structural / layout changes — copy only.

### 2. New slide — `SEPlatformWideIntelligenceUseCases.tsx`

A dedicated, full-bleed slide that lets the rep walk the three platform-wide questions one by one without the per-solution cards stealing focus.

- Title: **Intelligence & Insights — Platform-Wide Use Cases**
- Subtitle: **Three questions only the platform layer can answer.**
- Three large cards (one per question), each with:
  - The plain-English question (hero text)
  - One-line "what the platform does" answer underneath
  - DTOP-coloured accent (Detect → Trigger → Orchestrate → Prove ribbon at the bottom of each card showing which DTOP steps fire)
- Footer note: "These cross-domain answers are not available inside any single Core App — they require the unified data substrate + intelligence layer."

### 3. `src/pages/SalesEnablement.tsx` — Week 2 sequence

Insert two new slides into Week 2:

```text
…
W2 · Intelligence & Insights — Use Cases       (existing — per-solution + preview)
W2 · Intelligence & Insights — Platform Wide   (NEW dedicated platform slide)
W2 · Intelligence — Insights
W2 · Recommendations — Use Cases
W2 · Intelligence — Automation
W2 · Automation — Use Cases
W2 · Intelligence Layer vs Generic AI
W2 · Regulation Management Use Case            (NEW — reuses TechSlideRegulationSummary)
W2 · Mobile                                    (unchanged position relative to mobile)
W2 · Capability Talk Track
```

- Remove the existing W3 entry `se-slide-regmgmt` (it now lives in W2), or keep it in W3 too — see "Question" below.
- Update `weekProps.w2.upNext` to include "Platform-wide use cases" and "Regulation Management".
- Update `weekProps.w2.estimatedMinutes` (+~4 min for the two new slides).

### 4. `src/data/salesEnablementNarration.ts`

- Add a coach script entry for the new `se-platform-wide-intelligence-usecases` slide (5-part standard: why it matters → core message → pain→value pivot → how to deliver → transition into Insights).
- Add a coach script for `se-slide-regmgmt-w2` (or reuse the existing one if we keep the slide ID).

## Technical notes

- New slide ID: `se-platform-wide-intelligence-usecases`. Uses `PitchSlideContainer` for visual consistency with `SEPlatformInsightsIntelligence`.
- Regulation slide in W2 will reuse the existing `TechSlideRegulationSummary` component. If we want the same component to appear in both W2 and W3, it needs two distinct slide IDs (e.g. `se-slide-regmgmt-w2` and `se-slide-regmgmt`) so narration and scroll-snap work independently.

## Question (one, before I build)

Do you want the Regulation Management slide to **move** from Week 3 into Week 2 (single appearance, before Mobile), or to **also appear in Week 3** where it sits today (two appearances)?
