## Plan

Two scoped edits, homepage only (`/operational-platform`).

### 1. Replace the static platform PNG with the 4-layer architecture diagram

In `src/components/home/PlatformPicture.tsx`:
- Remove the `comply365-platform-ecosystem.png` import and `<img>` tag.
- Render `<PlatformArchitectureDiagramV4 />` from `@/components/platform-slides/PlatformArchitectureDiagramV4` inside the existing framed container, using the `compact` prop where it helps the homepage scale.
- Keep the surrounding caption, padding, and section layout unchanged.

This is the same 4-layer (Core Apps → Intelligence & Orchestration → Mobile → DTOP) visual used in OpsSlide4Platform / the medium pitch.

### 2. Rename "CoAnalyst" → "System of Intelligence" on the homepage

Scope: `src/components/home/*` and `src/pages/OperationalPlatformHome.tsx` only. No changes to pitch decks, playbooks, or other routes.

Files and edits:
- `Hero.tsx` — answer-card chip label "CoAnalyst · Generative AI" → "System of Intelligence · Generative AI"; comment updated for clarity.
- `CoAnalystSpotlight.tsx` — chip "CoAnalyst" → "System of Intelligence"; CTA "See CoAnalyst in action" → "See the System of Intelligence in action"; answer-card label "CoAnalyst · Answer" → "System of Intelligence · Answer". Internal `/coanalyst` link kept (route unchanged). File and component name kept to avoid touching the page import.
- `ProductPillars.tsx` — pillar name "CoAnalyst — Intelligence Layer" → "System of Intelligence". `href` unchanged.
- `WhyComply365.tsx` — "CoAnalyst is trained on your operational taxonomy…" → "Our System of Intelligence is trained on your operational taxonomy…".
- `ResourcesStrip.tsx` — title rewritten: "Inside the System of Intelligence: domain tuning, tenant isolation, evidence chain."
- `Footer.tsx` — link label "CoAnalyst" → "System of Intelligence"; href unchanged.
- `HomeFooter.tsx` — same label swap (it appears unused on `/operational-platform`, included only because it lives in `home/`; skip if not rendered).

Out of scope:
- `UnifiedPlatformDiagram.tsx` and `CustomerQuotes.tsx` mentions of CoAnalyst are inside attributions/quotes — leave verbatim to preserve source integrity.
- No route, file rename, or component rename.
- No backend, no other pages.

### Verification
- Visit `/operational-platform`, confirm the 4-layer diagram renders crisply at 1381px and on mobile, and that no "CoAnalyst" text remains on the page outside cited quotes.
