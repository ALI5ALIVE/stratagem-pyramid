## Feedback source

Kathrina forwarded Paul's review of the **Medium / Executive Pitch deck** (`/pitch-executive-3`, file `src/pages/ExecutivePitch3.tsx`). Slide numbers below are Paul's numbering (Title not counted; dividers count as their own slide), which maps cleanly to that deck.

## Changes

### Slide 7 — Unified Mobile (`TechV4SlideMobile.tsx`)
Add a visible link to the interactive mock-up `https://mobile-app-mockup.lovable.app/`. Place a small "View interactive mock-up ↗" anchor next to the existing `DeepDiveLink` (top-right of the slide, opens in a new tab). No layout change.

### Slide 8 — Intelligence & Orchestration intro (divider)
Source: `src/pages/ExecutivePitch3.tsx` `dividerProps.intelligence.tagline` and matching narration in `src/data/executivePitchNarration.ts` (`exec3-divider-intelligence`).

- Sub-heading new value: `"Automation · Insights & Intelligence — turning operational data into action."` (drop the `· CoAnalyst (Recommendations & Prescriptive Actions)` clause).
- Update `upNext` to remove the standalone "CoAnalyst" entry.
- Voiceover: rewrite to drop the explicit "CoAnalyst" callout while keeping the same beats — automation, insights, ask-anything-in-plain-English. (Bridge into Automation unchanged.)

### Slide 9 — Automation
No change (content + VO approved).

### Slides 10, 11, 12 — Voiceover only: remove "2023" references
File: `src/data/executivePitchNarration.ts`

- `exec3-slide-insights-summary` (Paul's #10) — remove the clause "millions of historic reports going back to twenty twenty-three, and continuous R&D" → replace with "millions of historic operational reports and continuous R&D".
- `exec3-slide-coanalyst` (Paul's #11) — remove "going back to twenty-twenty-three" → "We've taken millions of aviation reports and trained a hybrid architecture…".
- `exec3-slide-tiers-vs-ai` (Paul's #12) — remove "trained on millions of aviation reports going back to twenty twenty-three" → "trained on millions of aviation reports".

### Slide 13 — Recommendations & Prescriptive Actions (`TechV4SlideInsights.tsx`)
Add an inline "DG = Dangerous Goods" legend chip on the slide (same pattern as `TechV4Slide5DTOP.tsx`, bottom-right small pill). Slide copy that uses "DG SOP" stays as-is; the chip provides the gloss.

### Slide 14 — Reg Management intro
No change.

### Slide 15 — Regulation Management (`TechSlideRegulationSummary.tsx` + `regulationManagementPlaybook.ts`)
Per Paul: drop "Reactive only compliance" pain point, drop "no more quarterly audits discovering gaps" line, change "Risk Assessments" → "Risk Control", reduce to **two** value pillars.

Implementation (kept localised so the standalone Reg Management playbook keeps its richer source data):

- In `TechSlideRegulationSummary.tsx`, change the slice to skip the "Reactive-Only Compliance" pain point. Switch from `painPoints.slice(0, 2)` to an explicit pick: `[painPoints[0] /* Manual, Fragmented Tracking */, painPoints[2] /* No Cross-System Linkage */]`.
- Update the column heading from "The Three Value Pillars" → "The Two Value Pillars".
- Render the first two pillars (already `slice(0, 2)`), but rewrite the first pillar's `description` on this slide to drop the "No more quarterly audits discovering gaps." sentence. Done by mapping the pillar copy locally inside the component (no edit to playbook source so the standalone playbook remains intact).
- Globally rename the **operational term**: in `regulationManagementPlaybook.ts` line 255 ("Regulations connected to risk assessments…") and the matching narration string in `technicalPitchNarration.ts` and `customerOverviewNarration.ts` ("…procedures, training and risk assessments it touches"), change "risk assessments" → "risk control" so the wording is consistent across decks. (The platformPlaybook "Risk assessments" feed item stays — that's a SafetyManager365 product feed label, not the Reg Management pillar.)

### Slide 16 — Roadmap intro
No change.

### Slide 17 — Phased Roadmap (voiceover only)
File: `src/data/executivePitchNarration.ts` `exec3-slide-roadmap-2026`. Replace the script with Paul's wording verbatim (lightly normalised for TTS):

> "The Comply365 platform is built on real operational needs, with significant progress made on foundational capabilities and platform proof of concepts during the first half of this year — and even more innovation planned in the months ahead. Through a phased delivery approach, each stage builds on proven value and expanding capability. Whether your organisation is currently evaluating a Safety Management System, Training Management System, or Operational Content Management System, partnering with Comply365 today positions you to take full advantage of the powerful connected platform capabilities emerging for the future."

### Slide 18 — Why Comply365 (voiceover only)
File: `src/data/executivePitchNarration.ts` `exec3-slide-why`. Rewrite to:

- Drop "since twenty twenty-three" from the embedded-intelligence pillar (keep ~90% vs ~35% framing).
- Drop the "give us a half-day with your safety, training, and operations leads" workshop ask.
- Replace the close with the generic CTA: *"To learn more about the power of the Comply365 Operational Performance Platform for your organisation, contact us today."*

### General — LMS → TMS in Sales Enablement Portal
File: `src/components/sales-enablement-slides/SEObjections.tsx` line 21 — change "Can I walk you through how the LMS gets smarter…" → "Can I walk you through how the TMS gets smarter…". Other LMS references in `dtopPlaybook.ts` / `personaProfiles.ts` are competitor labels ("Generic LMS", "Your LMS already handles…") and stay — Kathrina scoped this to the SE portal only.

### Apply to other decks (Kathrina's note: "make sure it is applied against the other slides too")
Same edits applied to equivalent slides where they exist:

- "2023" removed from any narration that mirrors the CoAnalyst/intelligence pitch in other decks: `executivePitchNarration.ts` (exec1 versions), `executivePitch2Narration.ts`, `customerOverviewNarration.ts`, `technicalPitchNarration.ts`, `operationalPitchNarration.ts`, `coanalystNarration.ts`, `salesEnablementNarration.ts` — sweep for "twenty twenty-three" / "since 2023" / "going back to 2023" and remove the year clause only.
- "Risk assessments" → "Risk Control" in the regulation narrative strings only (the Reg Management cascade sentence in tech & customer-overview narrations).
- "Half-day workshop" / "half-day with your…" CTA replaced with the generic "contact us today" close in the equivalent Why-Comply / closing slides across decks (`executivePitchNarration.ts`, `executivePitch2Narration.ts`, etc.).

## Out of scope

- No structural / visual redesign of any slide except the small additions above (mobile mock-up link, DG legend chip).
- No edit to PPTX exporters — they read from the same data sources, so narration changes flow through naturally and slide-copy changes flow through component-derived spec text. The two component-only changes (mobile link, DG chip) are screen-only; the PPTX equivalents (`buildTechnicalDeck.ts` / `buildExecutivePitch3Deck.ts`) will get the same micro-additions in the same pass to keep parity.
- No change to the Reg Management playbook deck itself (it keeps the full 5-pillar narrative); only the summary slide and shared narration strings are trimmed.
- No change to competitor-context "LMS" mentions outside the Sales Enablement portal.
