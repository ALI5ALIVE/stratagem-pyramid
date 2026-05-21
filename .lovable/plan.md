## Comply365 Positioning & Messaging Playbook — Plan

A new **canonical-grade, additive** interactive web playbook at `/positioning-playbook` that consolidates the strategic story for the whole GTM org (sales, marketing, product marketing, CS, exec). Existing playbooks remain untouched — this asset links to them as deep-dives.

### Approach

- **Single-page, long-scroll** experience with a sticky left nav (anchor links per section), section-jump shortcuts, "On this page" mini-TOC, and copy-to-clipboard on every messaging block (one-liners, talk tracks, boilerplate).
- **Dark Comply365 theme**, Space Grotesk / Inter, semantic tokens. Each section gets a numbered hero band so it reads like a published playbook, not a wiki dump.
- **Print-friendly CSS** so the same page can be exported to PDF later without rework.
- **Data-driven**: all messaging lives in `src/data/positioningPlaybook.ts` so it can be reused by other decks/exports later.

### Sections (12)

1. **How to Use This Playbook** — audience map (sales / marketing / CS / exec), what to grab where, "30-second pitch" callout.
2. **Category & POV** — the category we're creating ("Operational Performance Platform"), the manifesto, the enemy (fragmentation + generic AI), the shift we stand for.
3. **Master Narrative** — Today → Tomorrow, the one-paragraph story, the 30-sec / 2-min / 10-min versions, master message ("From event to control").
4. **Positioning Architecture** — market category, target customer, alternatives, unique value, proof, single positioning statement (Moore-style).
5. **Messaging Pillars × Personas** — 4 pillars (Operational Control · Domain Intelligence · DTOP Loop · Unified Platform) × 5 personas (CEO/COO, Safety, Ops, IT, Frontline) grid with one-liner, value prop, proof point per cell.
6. **Platform & Product Story** — Apps · Data Foundation · Intelligence Layer · Mobile · DTOP, each as a "what it is / why it matters / one-liner / link to deep-dive playbook".
7. **The DTOP Operating Model** — Detect→Trigger→Orchestrate→Prove summary with the canonical D/T/O/P color tokens and "when to use this frame" guidance.
8. **Intelligence Layer Positioning** — ~90% domain vs ~35% generic AI headline, why-it's-defensible, evidence chain, what to say / never say.
9. **Competitive Frame** — leader matrix, win themes vs (generic platforms, point solutions, in-house AI, status quo), trap-setting questions.
10. **Top 12 Objections** — objection · reframe · proof · close (cards, copyable).
11. **Sales Kit** — discovery question bank by stage, 3 email templates (cold/warm/exec), demo flow, half-day Strategy & Vision session offer summary, "who to target" tiers.
12. **Brand & Terminology Rules** — approved/forbidden words, product naming (Comply365/SafetyManager365/ContentManager365), trust signals, boilerplate (short/medium/long), citation stack for the $25–35B figure, ROI disclaimer language.

Plus an **Appendix**: changelog, owners, version, "where this came from" links to existing playbooks (DTOP, Intelligence Layer, Platform, Signals 101, Personas, Sales Enablement Academy, Practice Center).

### New files

- `src/pages/PositioningPlaybook.tsx` — page shell + sticky nav + sections.
- `src/components/positioning/` — `SectionHero.tsx`, `CopyableBlock.tsx`, `PillarPersonaMatrix.tsx`, `ObjectionCard.tsx`, `MessageStack.tsx` (30s/2m/10m tabs), `TerminologyTable.tsx`, `CompetitiveMatrix.tsx`, `DiscoveryAccordion.tsx`.
- `src/data/positioningPlaybook.ts` — all copy (pillars, personas, objections, terminology, boilerplate, win themes, discovery, emails).
- Route added in `src/App.tsx`.
- Card added to `src/pages/HomePage.tsx` under a new top section **"Positioning & Messaging"** above "Customer Pitch Decks" (or as a featured single card).
- Memory: new entry `mem://content/positioning-playbook` + index line.

### Out of scope (this turn)

- PDF / PPTX export (page will be print-styled and exportable later).
- Editing/refactoring existing playbooks.
- Net-new copy that contradicts memory — all messaging pulled from existing canonical memory (DTOP, Intelligence Layer 90/35, terminology rules, trust signals, roadmap dates, product naming).
- Auth gating (open route, like other playbooks).

### Guardrails honored

Dark theme + semantic tokens · Space Grotesk/Inter · BrandNumber naming · DTOP color tokens (D blue · T amber · O violet · P emerald) · "Generative AI / Recommended Actions / Operational Data" only (no FOQA/FDM/ASAP) · Intelligence Layer never called "CoAnalyst" in user-facing copy · 90% vs 35% framing exact · ROI disclaimer language present · $25–35B figure carries citation chip.
