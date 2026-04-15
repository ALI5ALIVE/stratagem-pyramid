

# Regulation Management — Messaging & Positioning Playbook Page

## Summary

Create a new `/regulation-management` page in the app — a comprehensive, interactive playbook for the Regulation Management solution, structured for the commercial team to reference during sales conversations. Built using the same design patterns as the Persona Deep-Dive hub (cards, accordions, badges, scroll area).

## Content Architecture

Drawn from the PPM document and the transcript with Paul/Kathrina/Alistair/Pete, the page will have these scrollable sections:

1. **Solution Overview** — Elevator pitch, three-phase roadmap (POC → Production → Cross-Platform Entity), and the "system of record → system of work" narrative arc
2. **The Problem Today** — Current state pain points extracted from transcript: legacy infrastructure, 1,400+ regulations managed manually, fragmented tooling (spreadsheets, Access databases, tribal knowledge), no cross-system linkage, reactive-only compliance, BA example of ~1,100 people doing this daily
3. **Solution Positioning** — Role, audience, problem, unique value, positioning statement. Framing as a managed service + platform capability (not just a "use case" — a self-contained solution, as clarified in the call)
4. **Value Pillars** (card grid) — Real-Time Compliance Visibility, Connected Cross-System Intelligence, Proactive Change Readiness, AI-Driven Insights & Automation, Future-Proof Scalable Foundation
5. **How It Works** — Three-layer model: (1) Managed Service — regulation data assurance, (2) Platform Integration — structured data at point of need across CM365/TM365/SM365, (3) Intelligence Layer — CoAnalyst complex queries, scenario planning
6. **Use Cases & Scenarios** (expandable accordion) — Connected Compliance, Real-Time Readiness, Regulatory Change Management, AI-Driven Insights, Scenario Planning & Future Readiness, Executive-Level Assurance
7. **Persona Relevance** — Who buys this and why: Procedure Owners / Dept Heads, Auditors, Training Managers, COO/Form 4 Holders, Head of Compliance — with tailored messages per persona
8. **Commercial Model** — Subscription per regulation, standalone value per solution (SM365/CM365/TM365), cross-sell multiplier, API/data-only option
9. **Objection Handling** — Key objections from transcript: "Too much effort to migrate", "We're only a small operation", "We just need the data, not the platform", etc. with strategic responses
10. **Phased Roadmap** — Visual timeline: Phase 1 (Q2 2026 POC), Phase 2 (2027 Production), Phase 3 (2027+ Cross-Platform Entity) with outcomes per phase
11. **Key Talking Points & Discovery Questions** — Ready-to-use conversation starters and probing questions for sales meetings

## Changes

### 1. New data file: `src/data/regulationManagementPlaybook.ts`
All structured content for the page — elevator pitch, pain points, value pillars, use cases, persona relevance, objections, roadmap phases, discovery questions. Single source of truth.

### 2. New page: `src/pages/RegulationManagementPlaybook.tsx`
- Scrollable single-page layout with section anchors
- Uses existing UI primitives: `Card`, `Badge`, `Accordion`, `ScrollArea`
- Section navigation chips at top for quick jump
- Dark theme matching existing app aesthetic
- Back-to-home link

### 3. `src/App.tsx` — Add route
- `/regulation-management` route

### 4. `src/components/AppSidebar.tsx` — Add nav item
- Add to `toolItems` or create a new "Solutions" nav group

### 5. `src/pages/HomePage.tsx` — Add card
- Link card in the Tools section

**2 new files, 3 files modified.**

