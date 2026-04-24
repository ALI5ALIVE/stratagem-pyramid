---
name: Sales Enablement coach script standard
description: 5-part format for every Sales Enablement Academy slide narration so future scripts stay teaching-focused, not customer-facing
type: preference
---
Sales Enablement Academy narrations are TEACHING scripts (rep-facing), not customer-delivered. Every slide must follow this 5-part format:
1. Why this slide matters — the concept the rep needs to internalise.
2. The core message — one sentence the rep should be able to repeat back verbatim.
3. The pain → value pivot — the specific customer pain this slide addresses + the value lever to pull against it.
4. How to deliver it — tone, pacing, what to point at, what NOT to say (terminology landmines, forbidden acronyms).
5. Transition — bridge into the next slide.

Module dividers (M2–M6) follow a slightly tighter "coach intro" form: learning goal + why this module exists + how it connects to the previous one.

All scripts must respect locked memory rules: BrandNumber product naming, no FOQA/FDM/ASAP raw acronyms, canonical DTOP color story, ~90% domain accuracy vs ~35% generic AI headline, locked roadmap dates (Insights early-2026, Automation mid-2026, Unified Mobile late-2026), trust signals (550+ airlines, ~2.5M users, 6 continents).

Data file: src/data/salesEnablementNarration.ts. Hook: src/hooks/useSalesEnablementNarration.ts. Wired into src/pages/SalesEnablement.tsx via SpeakerNotesPanel + per-slide narration props.
