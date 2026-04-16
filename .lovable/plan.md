

# DTOP Operating Model — Sales Enablement Playbook

## Summary

Create a new `/dtop-playbook` slide deck (same format as CoAnalyst and Regulation Management playbooks) that serves as the definitive internal sales enablement asset for explaining the DTOP operating model. Password-gated, snap-scroll, 12 slides.

## Slide Structure (12 slides)

0. **Title** — "The DTOP Operating Model: Detect → Trigger → Orchestrate → Prove" with tagline "The only closed-loop operating model in aviation"
1. **Why DTOP Exists** — The industry problem: siloed safety, content, and training systems create an accountability gap. Point solutions detect but can't prove. The cost of fragmentation ($4.1B industry exposure).
2. **What DTOP Is** — Definition and positioning statement. A continuous improvement operating model that turns operational signals into orchestrated action and auditable proof. Visual: the 4-step pipeline with descriptions.
3. **How Each Step Works** — Deep-dive into D, T, O, P with expanded descriptions, data sources, actions taken, and outputs per step. Interactive click-to-expand cards.
4. **DTOP in Action: Use Case 1** — Dangerous Goods incident scenario. Signal detected → procedure review triggered → crew retrained → 72% incident reduction proved. Vertical DTOP timeline.
5. **DTOP in Action: Use Case 2** — Regulatory change management scenario. New EASA directive detected → impact analysis triggered → procedures and training updated → compliance evidence generated.
6. **DTOP in Action: Use Case 3** — Training effectiveness scenario. Recurring crew errors detected → competency gap triggered → targeted simulation assigned → performance improvement proved.
7. **The Value DTOP Unlocks** — Four value categories: Risk Reduction, Operational Efficiency, Continuous Compliance, Performance Improvement. Each with defensible metrics.
8. **How to Talk About DTOP** — Persona-specific messaging: what to say to a CEO vs VP Safety vs Head of Training vs IT Director. Discovery questions per persona.
9. **Why Only Comply365 Can Deliver This** — Competitive moat: requires all three modules (Safety, Content, Training) connected by an intelligence layer. Point solutions can detect but can't orchestrate or prove. Positioning matrix.
10. **Objection Handling** — "We already have an SMS", "Our LMS handles training", "We use SharePoint for docs", "We're not ready for AI" — with strategic responses.
11. **Key Talking Points & Closing** — The 3 anchor statements, elevator pitch, and recommended next steps (discovery call → workshop → 90-day pilot).

## Changes

### 1. New data file: `src/data/dtopPlaybook.ts`
All structured content — step definitions, use cases, value metrics, persona messaging, objections, competitive positioning. Single source of truth.

### 2. New slide components: `src/components/dtop-slides/`
12 slide components (DTOPSlide0Title through DTOPSlide11Closing), each using `SlideContainer`. Dense card-based layouts matching the CoAnalyst playbook style.

### 3. New page: `src/pages/DTOPPlaybook.tsx`
Deck shell with password gate (`comply2025`), snap-scroll, progress bar, keyboard nav, sidebar slide list integration.

### 4. `src/App.tsx` — Add route `/dtop-playbook`

### 5. `src/components/AppSidebar.tsx` — Add "DTOP Playbook" to toolItems

### 6. `src/pages/HomePage.tsx` — Add card to Tools section

**14 new files, 3 files modified.**

