

## Add Regulation Management use case to SalesEnablement and CustomerOverview

The Regulation Management solution is currently absent from both `/sales-enablement` and `/customer-overview`. Add it as a dedicated slide in each deck using the existing summary slide already used by Tech Deep Dive v4.

### Slide to use

`TechSlideRegulationSummary` (`src/components/tech-slides/TechSlideRegulationSummary.tsx`) — already exists, summarizes the Regulation Management solution with elevator pitch, DTOP mapping, problem/value pillars, and a `DeepDiveLink` to the full `/regulation-management` playbook. Same component used in Tech v4, so all three decks stay aligned.

### Changes

**1. `src/pages/SalesEnablement.tsx`**

- Import `TechSlideRegulationSummary`.
- Insert into **Module 4 (How we sell it)** as a use-case anchor, immediately after `se-slide-usecases` and before `se-slide-maturity`:
  - `{ id: "se-slide-regmgmt", label: "M4 · Use Case — Regulation Management", component: TechSlideRegulationSummary }`
- Update `moduleProps.m4.upNext` to include "Regulation Management use case" so the Module 4 divider previews it.

**2. `src/pages/CustomerOverview.tsx`**

- Import `TechSlideRegulationSummary`.
- Insert as a flagship use-case slide, placed after `SlideUseCases` (the generic use-cases slide) and before `CustomerOutcomesSlide`, with id `co-slide-regmgmt` and label `"Use Case — Regulation Management"`.

### Files

**EDITED**
- `src/pages/SalesEnablement.tsx`
- `src/pages/CustomerOverview.tsx`

**NOT TOUCHED**
- `TechSlideRegulationSummary.tsx` itself (reused as-is)
- `/regulation-management` playbook (already linked from the summary slide via `DeepDiveLink`)
- `/pitch-technical-v4`, `/pitch-executive-3`, all other decks

### QA

- `/sales-enablement`: Module 4 contains a Regulation Management use-case slide between Use Cases and Maturity Roadmap; M4 divider lists it under "Up next".
- `/customer-overview`: Regulation Management slide appears between generic Use Cases and Customer Outcomes.
- Deep-dive link on the slide still routes to `/regulation-management`.
- No changes to navigation/narration registration logic — slides flow into existing scroll/keyboard handlers automatically.

