Build a new in-app page that mirrors the AI Naming & Architecture Brief PDF, styled consistently with the other Market Development pages (PositioningPlaybook pattern), and replace the embedded PDF viewer with a prominent "Download PDF" button.

## Page

Route: `/ai-naming-brief` (already added) — replace the `AiNamingBriefViewer` PDF embed with a fully typeset content page.

## Layout & style (matches PositioningPlaybook / MarketDev family)

- Background `bg-background`, sticky top bar with back link to `/market-development`, version chip (v1 · Board-ready · Confidential), and a primary "Download PDF" button (downloads `Comply365_AI_Naming_Brief_v1.pdf` via the Vite asset import).
- Numbered `SectionHero` blocks (01–07) with kicker + display heading + lede, matching the existing pattern.
- `max-w-[1400px]` container, semantic tokens only (primary, muted-foreground, border, card), Space Grotesk display headings, Inter body.
- DTOP colour coding for the agent catalogue: Detect=blue, Trigger=amber, Orchestrate=violet, Prove=emerald.

## Sections (mirror the PDF 1:1)

1. Situation / Recommendation / Why now / The ask — exec memo card with 5-bullet recommendation list.
2. The Three-Tier Naming Convention — table (Tier 1 Platform, Tier 2 Apps, Tier 3a Persona, Tier 3b Capabilities DTOP, Tier 3c Agents) + non-negotiable naming rules list.
3. Architecture at a Glance — visual diagram: Platform → 3 Apps → Intelligence Layer band (with 90% vs 35% stat) → 4 DTOP capability columns → Agents row grouped under each stage.
4. Capabilities vs Agents — comparison table + "Why DTOP must stay as capabilities" and "Why agents must be JTBD" bullet groups.
5. Comply365 Agents v1 Catalogue — full table of 11 agents (DTOP stage badge, JTBD agent, job line, owning app), with locked naming pattern note.
6. Naming Shortlist — 12-candidate table (Candidate, Pool, Rationale, Initial risk traffic light), Top 3 recommendation block, 60–90 day path to launch timeline.
7. Appendix — A. Competitor AI brand architectures table (Salesforce, SAP, ServiceNow, Optimizely, Microsoft). B. Risk register table for staying with CoAnalyst. Out of scope note.

## Linkage

- Market Development card already points to `/ai-naming-brief` — no change needed there.
- Replace `src/pages/AiNamingBriefViewer.tsx` content entirely with the new structured page (keep filename to avoid route churn).

## Technical notes

- Data lives inline in the page file (small, static, copy-of-record).
- Download button uses `<a href={namingBriefPdf} download="…">` with the existing Vite `?url` import.
- Use existing `cn`, lucide icons (FileBadge, Download, ArrowLeft, etc.), no new deps.