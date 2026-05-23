## Goal

On `/category-research-programme`: (1) write and surface the **full survey question set** and **full qualitative discussion guide**, (2) **remove the budget section** entirely, (3) **reduce interview sample** from 30–40 down to a tighter 18–24 (n=20 target).

## Changes

### 1. Survey question set (new data + new section)

Add `surveyQuestions` to `src/data/categoryResearchProgramme.ts`: for each of the 8 instrument blocks, the actual question wording, answer scale, and which hypothesis/segmentation it serves. ~30 questions total (~18 min completion preserved).

Example shape per question:
```
{ id: "Q2.3", block: 2, text: "...", scale: "5-pt Likert", maps: "H1" }
```

Coverage per block:
- B1 Screener & firmographics — 4 (industry, role, fleet/network size, budget authority)
- B2 Stack & fragmentation — 5 (tool count, hand-offs, time-to-decision, data trust, friction)
- B3 Decision quality at L4–5 — 4 (confidence, rework rate, AI usage, AI trust)
- B4 Budget & procurement — 4 (today vs 24-mo allocation, conjoint trade-off, signing authority)
- B5 Regulatory pressure — 3 (awareness of performance-based oversight, readiness, audit pain)
- B6 Category language test — 4 (label comprehension, preference between 3 labels, intent-to-explore, willingness-to-pay)
- B7 Maturity self-assessment — 6 (one rubric question per capability dimension)
- B8 Brand-lift — 2 (aided/unaided)

New page section **"Survey question set"** rendered as accordion-style blocks (one per instrument block) with the question text + scale + hypothesis chip. Sits immediately after the existing "Quantitative survey" block.

### 2. Qualitative discussion guide (new data + new section)

Add `interviewQuestions` to data: for each of the 6 sections (already defined), full primary question + 2–3 follow-up probes + listening-fors.

Shape:
```
{ section: "Context", primary: "...", probes: ["...","...","..."], listenFors: ["...","..."], tests: "Frame" }
```

New page section **"Interview discussion guide"** rendered as numbered cards showing primary question, probes (bulleted), and listening-fors (chips). Sits after the existing "Qualitative interviews" block.

The existing `interviewGuide` array (sample probes only) stays for the summary table; the new `interviewQuestions` powers the full guide section. No duplication of content visible to user — the summary table becomes a one-line index, then the full guide expands below.

### 3. Reduce interview sample size

Change every reference from `30–40` → `18–24` (target n=20). Touchpoints:
- `src/pages/CategoryResearchProgramme.tsx` hero stat tile, "Triangulation" copy line, qual section title, qual section sub-copy
- `src/data/marketDevelopmentAssets.ts` Category Research Programme card description
- Saturation gate copy already references "stop when the last two add no new themes" — keep but reinforce that 18–24 is the design range

### 4. Remove budget

- Delete the entire **Budget & resourcing** section in `CategoryResearchProgramme.tsx` (lines ~436–458)
- Remove `budgetBands` from the imports
- Remove `budgetBands` export from `categoryResearchProgramme.ts`
- Remove the `Wallet` lucide import if unused
- Remove the "Fieldwork overrun" risk line that references parallelisation cost — keep, it's about scope not money

## Files

- `src/data/categoryResearchProgramme.ts` (edit) — add `surveyQuestions`, add `interviewQuestions`, delete `budgetBands`, update interview-count references
- `src/pages/CategoryResearchProgramme.tsx` (edit) — add 2 new sections, delete budget section, update count references
- `src/data/marketDevelopmentAssets.ts` (edit) — update interview count in card description

## Out of scope

- No change to hypothesis tree, secondary sources, timeline, deliverables, advisory panel, risks (except removing any cost-flavoured wording)
- No backend, no PDF export, no new routes
