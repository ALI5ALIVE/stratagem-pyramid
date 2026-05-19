---
name: Sales Enablement Week 3 Field Kit
description: Source of truth for Week 3 (Sell & Win) — slide list, data file, and 5-part Coach narrations
type: feature
---
Week 3 (Sell & Win) was upgraded May 2026 to be a "world-class" sales enablement week. All Week 3 content shares one data file: `src/data/week3FieldKit.ts` (discoveryQuestionBank, personaPlaybook, competitiveCheatSheet, dealStageLanguage, expandedObjections, useCaseCheatSheetRows, thirtyDayCalendar + stepColor/stepName for DTOP chips).

Week 3 slide order in `src/pages/SalesEnablement.tsx`:
1. se-discovery-to-close
2. se-discovery-question-bank (NEW · 12 questions grouped by DTOP step, good vs red-flag answers)
3. se-persona-playbook (NEW · 5 personas × pain/questions/metric/landmine/proof)
4. se-usecase-cheatsheet (UPGRADED · 7 rows + Listen-for + DTOP chip + Proof artifact)
5. footprint intro → single → two → all → ladder → playbook (UNCHANGED · strongest section)
6. se-slide-outcomes
7. se-competitive-cheatsheet (NEW · 6 competitor categories, stops-at-DTOP-step, reframe, trap question)
8. se-slide-objections (UPGRADED · 8 objections, Acknowledge/Reframe/Bridge + Proof column, no "pending review" footer)
9. se-discovery-call-runbook (NEW · 4 blocks for a 45-min first call with verbatim scripts)
10. se-deal-stage-language (NEW · 4 deal-stage transitions with scripted next-step lines)
11. se-slide-why
12. se-practice-center-bridge (NEW · links 3 Practice Center scenarios to Week 3)
13. se-slide-closing (UPGRADED · 30-day calendar Read/Shadow/Practice/Lead, Day-30 readiness checklist)

Narration entries follow the Coach Script Standard (5-part teaching format) in `src/data/salesEnablementNarration.ts`. Week 3 divider script + use-case + objections + closing scripts were rewritten to match the new content. estimatedMinutes for w3 is 42.

When extending Week 3: add to `week3FieldKit.ts` so both slides and any future PDF Field Kit exporter share one source. Respect terminology rules (no FOQA/FDM/ASAP; use Operational Data + Generative AI), BrandNumber naming, ~90% vs ~35% headline, no "90-day pilot" framing, locked roadmap dates.

Out of scope (deferred): downloadable Week 3 Field Kit PDF (data is ready in `week3FieldKit.ts`, exporter not yet built).
