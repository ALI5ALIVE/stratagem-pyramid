---
name: Sales Enablement Week 3 Field Kit
description: Source of truth for Week 3 (Sell & Win) — slide list, data file, and 5-part Coach narrations
type: feature
---
Week 3 (Sell & Win) was upgraded May 2026 to be a "world-class" sales enablement week. All Week 3 content shares one data file: `src/data/week3FieldKit.ts` (discoveryQuestionBank, personaPlaybook, competitiveCheatSheet, dealStageLanguage, expandedObjections, useCaseCheatSheetRows, thirtyDayCalendar + stepColor/stepName for DTOP chips).

Week 3 slide order in `src/pages/SalesEnablement.tsx`:
1. se-who-to-target (NEW · propensityTiers + tier1Signals + whoNotToChaseFirst; anchored on existing Comply365 footprint)
2. se-discovery-to-close
3. se-discovery-question-bank (12 questions grouped by DTOP step, good vs red-flag answers)
4. se-persona-playbook (5 personas × pain/questions/metric/landmine/proof)
5. se-usecase-cheatsheet (7 rows + Listen-for + DTOP chip + Proof artifact)
6. footprint intro → single → two → all → ladder → playbook
7. se-slide-outcomes
8. se-competitive-cheatsheet (6 competitor categories, stops-at-DTOP-step, reframe, trap question)
9. se-slide-objections (8 objections, Acknowledge/Reframe/Bridge + Proof)
10. se-discovery-call-runbook (4 blocks for a 45-min first call with verbatim scripts)
11. se-deal-stage-language (4 deal-stage transitions with scripted next-step lines)
12. se-slide-why
13. se-practice-center-bridge (links 3 Practice Center scenarios to Week 3)
14. se-slide-closing (30-day calendar Read/Shadow/Practice/Lead, Day-30 readiness checklist)
15. se-strategy-vision-session (NEW · complimentary half-day workshop offer; fixed 4-hour agenda + attendees + leave-behind + rep talk track. The CLOSING slide of Week 3 — every rep ends the week with the offer they're meant to put in market.)

Narration entries follow the Coach Script Standard (5-part teaching format) in `src/data/salesEnablementNarration.ts`. Week 3 divider script + use-case + objections + closing scripts were rewritten to match the new content. estimatedMinutes for w3 is 48.

New data exports in `week3FieldKit.ts` for the bookend slides: `propensityTiers`, `tier1Signals`, `whoNotToChaseFirst`, `visionSessionAgenda`, `visionSessionAttendees`, `visionSessionLeaveBehind`, `visionSessionRepTalkTrack`.

When extending Week 3: add to `week3FieldKit.ts` so both slides and any future PDF Field Kit exporter share one source. Respect terminology rules (no FOQA/FDM/ASAP; use Operational Data + Generative AI), BrandNumber naming, ~90% vs ~35% headline, no "90-day pilot" framing, locked roadmap dates.

Out of scope (deferred): downloadable Week 3 Field Kit PDF (data is ready in `week3FieldKit.ts`, exporter not yet built).

**Transition accuracy (May 2026):** Every Week 3 narration's closing line now names the actual next slide in order (overview → whiteboard drill → next overview, and Customer Outcomes → Competitive Cheat Sheet → Objections). Whiteboard SVG labels were de-overlapped (intelligence band moved to two lines, X/annotation moved off the arrow line, Safety lane extended, "Circle = the sale" caption shifted left).
