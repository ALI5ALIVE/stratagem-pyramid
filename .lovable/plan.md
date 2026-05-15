## Goal

Replace user-facing references to "CoAnalyst" with "Intelligence Layer" across the entire app — every deck, every narration, every playbook, the Practice Center, and the Sales Enablement academy — so the product is consistently positioned as a capability ("Intelligence Layer") rather than a sub-brand.

## Scope (text replacement only)

90 files / ~342 occurrences. The change is **strings only** — no file renames, no route changes, no symbol/import renames, no DB schema changes. This keeps imports, URLs, IDs, and audio caches working while flipping every visible label.

### What gets rewritten

- All slide titles, subtitles, headings, body copy and chip labels in:
  - `src/components/coanalyst-slides/*` (the dedicated deep-dive deck)
  - `src/components/exec-slides/*`, `exec2-slides/*`, `ops-slides/*`, `tech-slides/*`, `platform-slides/*`, `signals-slides/*`, `sales-enablement-slides/*`, `slides/SlideAIVision.tsx`, `mobile-slides`, `insights-slides`, `automation-slides`, `regmgmt-slides` (only files in the rg list)
  - Home / public site components in `src/components/home/*` (`CoAnalystSpotlight`, `Hero`, `Footer`, `ProductPillars`, `UnifiedPlatformDiagram`, `CustomerQuotes`) — already partly aligned per the homepage terminology memory; finish the job
  - `src/components/PlatformEcosystemDiagram.tsx`, `AppSidebar.tsx`, `personas/personaConfig.ts`
- All narration scripts in `src/data/*Narration.ts`, `playbookNarrations.ts`, `*Playbook.ts`, `personaProfiles.ts`, `execPitch3Slides.ts`, `coanalystNarration.ts`, `salesEnablementNarration.ts`, `practiceScenarios.ts`, `practiceSlidePrompts.ts`
- Practice Center plumbing: `src/lib/practice/buildAgentPrompt.ts`, `buildKnowledgeDocs.ts` (knowledge doc titles, headlines and instruction lines)
- PPTX exporters: `buildExecutiveDeck.ts`, `buildExecutivePitch3Deck.ts` (string content used for slide rendering)
- Pages with inline copy: `Comply365Home.tsx`, `HomePage.tsx`, `OperationalPlatformHome.tsx`, `OperationalPitch.tsx`, `TechnicalDeepDive.tsx`, `TechnicalDeepDiveV4.tsx`, `SalesEnablement.tsx` (menu labels), `ReviewDashboard.tsx`, `events/SignalsEvent.tsx`, `events/SignalsEventBrief.tsx`, `CoAnalystPreview.tsx`, `CoAnalystDeck.tsx`
- Route-mounted titles in `App.tsx` (page/document titles only)
- Memory files: rewrite `mem://strategy/coanalyst-positioning-v2`, `mem://content/coanalyst/*`, `mem://content/homepage/terminology` (no longer needed as a constraint — fold into a single rule), and update `mem://index.md` Core line "CoAnalyst headline …" → "Intelligence Layer headline …"

### What is NOT changed

- File names containing "CoAnalyst" (e.g. `TechV4Slide7CoAnalyst.tsx`, `CoAnalystDeck.tsx`, `useCoAnalystNarration.ts`, the `coanalyst-slides/` and `CASlide*` files). Renaming would cascade through dozens of imports for zero user benefit.
- React component identifiers, variable names, object keys, slide `id` strings (`se-slide-coanalyst`, `ca-slide-*`), CSS classes, narration map keys.
- Routes (`/coanalyst`, `/coanalyst-preview`). Existing shared links keep working.
- Supabase migration files (read-only) and `tsconfig.app.tsbuildinfo` (generated).
- The `useCoAnalystNarration` hook name and narration cache key.
- `mem://content/sales-enablement/coach-script-standard.md` lone reference if it just describes existing behaviour — re-checked during edit.

### Phrasing rules

- Default: **Intelligence Layer** (Title Case, treated as a capability name).
- "CoAnalyst answers / decides / recommends" → "The Intelligence Layer answers / decides / recommends".
- "CoAnalyst, Insights and Automation" → "The Intelligence Layer, Insights and Automation" — but where the original sentence already lists the layer's *components*, rewrite to "Intelligence Layer capabilities — CoAnalyst-style Q&A, Insights, Automation" only if removing CoAnalyst would lose meaning. Default is the straight swap; exceptions resolved per-occurrence with a simple "does this still parse?" check.
- "CoAnalyst headline: ~90% vs ~35%" → "Intelligence Layer headline: ~90% vs ~35%".
- "CoAnalyst Playbook" (Practice Center knowledge doc title) → "Intelligence Layer Playbook".
- Menu label `"W2 · Intelligence — CoAnalyst"` → `"W2 · Intelligence Layer"`. `"W2 · CoAnalyst vs Generic AI"` → `"W2 · Intelligence Layer vs Generic AI"`.

### Side effects to verify

- ElevenLabs narration audio is cached by slide id, but the *text* sent to TTS changes — first replay of every affected slide will re-fetch audio. Expected and acceptable.
- Practice Center agent prompt and knowledge docs are built at session start, so the next role-play session picks the new wording up automatically.
- PPTX exports regenerate from current strings — no rebuild step needed beyond running the export.

## Execution order

1. Update memory: rewrite the four CoAnalyst memory files + index Core line, and retire the homepage-only constraint (it becomes the global rule).
2. Sweep `src/data/*` (narration + playbook copy) — highest content density, lowest risk of breaking imports.
3. Sweep `src/components/**` slide files (coanalyst-slides, exec, ops, tech, platform, signals, home, sales-enablement, mobile/insights/automation/regmgmt where listed).
4. Sweep `src/pages/*` and `src/lib/practice/*` and `src/exporters/pptx/*`.
5. Sweep `src/App.tsx` and `AppSidebar.tsx` (labels only).
6. Verify: `rg -n "CoAnalyst" src` should return only intentional residue (file paths in imports, identifiers, IDs, route strings). Hand-review any remaining hits.
7. Spot-check the preview on `/sales-enablement` (Week 2 + footprint slides), `/coanalyst` deep-dive deck, `/`, `/operational-platform`, and `/practice-center` to confirm no leftover "CoAnalyst" wording.

## Out of scope

- Renaming the dedicated `/coanalyst` deck route or its files.
- Visual redesign of any slide.
- Changing the 90 % vs 35 % accuracy figure or any other metric.
- Editing supabase migration history.
