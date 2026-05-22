## AI Infographic Page

Add a new route `/ai-infographic` that recreates the uploaded Comply365 AI Solutions infographic as a polished, dark-themed web page, with a button to download the original 1-slide PPTX.

### Content (from the uploaded slide)

Four columns mapped left-to-right with arrows from AI Solutions into the matching capability rows:

- **AI Solutions** — CoAnalyst, CoAuthor, Qvery BI & Dashboards, AI Assistant, CoTrainer, AI Agents, plus a "No AI" tier at the bottom
- **ContentManager365** — Forms, Authoring, Reporting, Distribution
- **TrainingManager365** — Training Records, Reporting, Scheduling, Learning Manager, Qualifications
- **SafetyManager365** — Safety Reports, Quality Management, Risk Management, Change Management

Mapping arrows (preserved from source):
- CoAnalyst → Forms / Training Records / Safety Reports
- CoAuthor → Authoring
- Qvery BI & Dashboards → Reporting (both)
- AI Assistant → Distribution
- CoTrainer → Scheduling
- AI Agents → Learning Manager

"No AI" tier groups: Qualifications, Quality Management, Risk Management, Change Management.

Names kept exactly as in the source PPTX per your answer (overriding the usual memory rule for this page only).

### Page structure

1. Header: kicker "Comply365 Platform", H1 "AI Capabilities", short subtitle, and a `Download PPTX` button (top right).
2. Four-column responsive grid recreating the infographic with SVG connector arrows between AI Solutions and each product column. Collapses to a stacked accordion on mobile.
3. Footer with Comply365 logo and small legend (AI tiers vs No AI).

### PPTX export

Clicking `Download PPTX` triggers a `pptxgenjs` build (`src/exporters/pptx/buildAIInfographicDeck.ts`) that renders a single 16:9 slide matching the source layout — same four columns, same labels, same arrow connectors, same Comply365 footer. Registered as a new `DeckId` (`"ai-infographic"`) in `src/exporters/pptx/index.ts` and downloaded via the existing `DeckPPTXExportButton`.

### Files

- `src/pages/AIInfographic.tsx` — new page
- `src/components/ai-infographic/AICapabilitiesMatrix.tsx` — the 4-column visual
- `src/exporters/pptx/buildAIInfographicDeck.ts` — PPTX builder
- `src/exporters/pptx/index.ts` — register new `DeckId`
- `src/App.tsx` — add `<Route path="/ai-infographic" element={<AIInfographic />} />`
- `src/components/AppSidebar.tsx` — add nav link (if sidebar lists similar pages)

### Out of scope

- Per-solution detail pages
- Narration / audio
- Editing or rewriting the source labels (kept verbatim)
