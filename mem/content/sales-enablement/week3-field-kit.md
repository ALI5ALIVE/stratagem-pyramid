---
name: Sales Enablement Week 3 Field Kit
description: Source of truth for Week 3 (Sell & Win) — slide list, data file, and 5-part Coach narrations
type: feature
---
Week 3 (Sell & Win) was upgraded May 2026 to be a "world-class" sales enablement week. All Week 3 content shares one data file: `src/data/week3FieldKit.ts` (discoveryQuestionBank, personaPlaybook, competitiveCheatSheet, dealStageLanguage, expandedObjections, useCaseCheatSheetRows, thirtyDayCalendar + stepColor/stepName for DTOP chips).

Week 3 slide order in `src/pages/SalesEnablement.tsx`:
1. se-w3-capstone-recap (NEW · reuses SEW2CapstoneWhiteboard with W3 title/subtitle override · frames platform value & DTOP loop before the sell-and-win playbook opens)
2. se-w3-signals-recap (NEW · animated DTOP lane · 4 signal sources feed Detect; walks a second use case — crew duty-time anomaly — end-to-end through D/T/O/P with CSS keyframe animation)
3. se-who-to-target (propensityTiers + tier1Signals + whoNotToChaseFirst; anchored on existing Comply365 footprint)
3. se-discovery-to-close
4. se-discovery-question-bank (12 questions grouped by DTOP step, good vs red-flag answers)
5. se-persona-playbook (5 personas × pain/questions/metric/landmine/proof)
6. se-usecase-cheatsheet (7 rows + Listen-for + DTOP chip + Proof artifact)
7. footprint intro → single → two → all → ladder → playbook
8. se-slide-outcomes
9. se-competitive-cheatsheet (6 competitor categories, stops-at-DTOP-step, reframe, trap question)
10. se-slide-objections (8 objections, Acknowledge/Reframe/Bridge + Proof)
11. se-discovery-call-runbook (4 blocks for a 45-min first call with verbatim scripts)
12. se-deal-stage-language (4 deal-stage transitions with scripted next-step lines)
13. se-strategy-vision-session (CLOSING slide · complimentary 3-hour workshop offer; fixed 3-hour agenda + attendees + leave-behind + rep talk track)

Removed Nov 2026: `se-slide-why` (Why Comply365), `se-practice-center-bridge`, `se-slide-closing` (Your First 30 Days) — Week 3 now ends on the Strategy & Vision Session offer. Components remain in `src/components/...` and `slideRegistry.ts` for academy/other deck reuse, but no longer appear in the Sales Enablement deck. `se-deal-stage-language` narration now transitions directly into the Strategy & Vision Session.

Narration entries follow the Coach Script Standard (5-part teaching format) in `src/data/salesEnablementNarration.ts`. estimatedMinutes for w3 is 38.

New data exports in `week3FieldKit.ts` for the bookend slides: `propensityTiers`, `tier1Signals`, `whoNotToChaseFirst`, `visionSessionAgenda`, `visionSessionAttendees`, `visionSessionLeaveBehind`, `visionSessionRepTalkTrack`.

When extending Week 3: add to `week3FieldKit.ts` so both slides and any future PDF Field Kit exporter share one source. Respect terminology rules (no FOQA/FDM/ASAP; use Operational Data + Generative AI), BrandNumber naming, ~90% vs ~35% headline, no "90-day pilot" framing, locked roadmap dates.

Out of scope (deferred): downloadable Week 3 Field Kit PDF (data is ready in `week3FieldKit.ts`, exporter not yet built).

**Transition accuracy (May 2026):** Every Week 3 narration's closing line now names the actual next slide in order (overview → whiteboard drill → next overview, and Customer Outcomes → Competitive Cheat Sheet → Objections). Whiteboard SVG labels were de-overlapped (intelligence band moved to two lines, X/annotation moved off the arrow line, Safety lane extended, "Circle = the sale" caption shifted left).
