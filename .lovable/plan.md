

## Replace 6 Regulation slides with single summary + deep-dive link

### Current state

The Tech Deep Dive currently embeds 6 cloned slides from the Regulation Management playbook:

```text
tech-rm-title     RMSlide0Title
tech-rm-overview  RMSlide1Overview
tech-rm-problem   RMSlide2Problem
tech-rm-value     RMSlide4ValuePillars
tech-rm-how       RMSlide5HowItWorks
tech-rm-uc        RMSlide6UseCases
```

This duplicates the Regulation Management Playbook and makes the Tech deck overly long.

### Change

Replace all 6 slides with **one** summary slide that previews Regulation Management and links out to the full playbook via the existing `DeepDiveLink` component (same pattern already used for CoAnalyst, Automation, Mobile, Platform).

**1. New component — `src/components/tech-slides/TechSlideRegulationSummary.tsx`**

A single dense summary slide using `SalesSlideContainer`:

- `id="tech-slide-regulation"`, title **"Regulation Management"**, subtitle **"Always Current. Always Connected. Always Compliant."**
- Top banner: elevator pitch (`solutionOverview.elevatorPitch` — one paragraph) + narrative arc tagline ("System of Record → System of Work → System of Intelligence").
- Left column — **The Problem** (3 condensed pain points from `painPoints[0,1,2]`: Manual & Fragmented, Reactive-Only, No Cross-System Linkage), each as an icon row.
- Right column — **The Three Value Pillars** (`valuePillars[0..2]`: Real-Time Visibility, Cross-System Intelligence, Proactive Change Readiness) as icon-led cards with the `metrics` line as the accent.
- Footer strip: small "Key framing" italic line (`positioning.keyFraming`) + a `<DeepDiveLink to="/regulation-management" label="Regulation Management Playbook" returnLabel="Back to Tech Deep Dive" />` chip on the right.

Pulls all copy from `regulationManagementPlaybook.ts` — no new content. Uses the already-implemented `DeepDiveLink` (sessionStorage return path) so `BackToDeckButton` on the Regulation Playbook page sends the user back to `/pitch-technical`.

**2. `src/pages/TechnicalDeepDive.tsx`**

- Remove imports: `RMSlide0Title`, `RMSlide1Overview`, `RMSlide2Problem`, `RMSlide4ValuePillars`, `RMSlide5HowItWorks`, `RMSlide6UseCases`.
- Remove the 6 slide entries from the `slides` array (`tech-rm-title` through `tech-rm-uc`).
- Insert one new entry in the same position (between `tech-slide-6` Platform Integrations and `tech-slide-calculator`):

```ts
{ id: "tech-slide-regulation", label: "Regulation Management", component: TechSlideRegulationSummary },
```

**3. `src/exporters/pptx/buildTechnicalDeck.ts`**

- Remove the 6 RM specs (overview / problem / value / how / use cases / divider) from the `composed` array.
- Add a single `regulationSummarySpec` that mirrors the new web slide: title + subtitle, elevator pitch banner, two-column problem/value layout, and a small "See full playbook" footer (no clickable link in pptx — just text "Full deep dive: Regulation Management Playbook").
- Insert it in the same position the RM block previously occupied.

### Files

**New**
- `src/components/tech-slides/TechSlideRegulationSummary.tsx`

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — drop 6 RM slide entries + imports, add summary entry.
- `src/exporters/pptx/buildTechnicalDeck.ts` — drop 6 RM specs, add `regulationSummarySpec`.

### Out of scope

- The Regulation Management Playbook itself (`/regulation-management`) is unchanged — it already renders all 6 slides in their canonical home and supports `BackToDeckButton`.
- No content rewrites; all copy reused from `regulationManagementPlaybook.ts`.
- No narration regeneration.

