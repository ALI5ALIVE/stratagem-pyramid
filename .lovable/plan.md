
# Sales Enablement & Academy — Update Plan

Based on Kathrina's 7 May email and a slide-by-slide map of `/sales-enablement` (the deck currently has 32 slides, 0-indexed in the player so "Slide 17" = Capability Talk Track, which matches the screenshot in her email).

## 1. Slide map → feedback decisions

| # | Slide | Action | Source |
|---|---|---|---|
| 2 | M1 · Industry Challenge ($33M…) | **Remove from deck** (move to archive folder) | 3a |
| 17 | M3 · Capability Talk Track | **Keep + use as the style template** | 2 |
| 19 | M4 · Before vs After (Transformation) | **Remove for now** (ROI not signed off) | 3b |
| 20 | M4 · Maturity Roadmap | **Skip for now** | 3c |
| 22 | M5 · Use Case Framework (DTOP) | **Archive** | 3d |
| 23 | M5 · Safety Use Cases | **Archive** | 3d |
| 24 | M5 · Operations Use Cases | **Archive** | 3d |
| 25 | M5 · Financial Use Cases | **Archive** | 3d |
| 29 | M6 · Objections | **Pare back** — placeholder until Kathrina reverts Mon | 3e |
| 31 | M6 · Your First 7 Days | **Re-align to actual seller asks** — placeholder until early next week | 3f |

"Remove" = unregister from the `slides` array in `src/pages/SalesEnablement.tsx` so it doesn't appear in the deck or sidebar. "Archive" = leave the component file in place (so we can restore later), just unwire the route entry. No files deleted.

After cuts the deck goes from **32 → 24 slides** (~35–40 min, fits the May 21 60–90 min slot with Q&A).

## 2. Expand "plain English" talk-track style (point 2)

The Capability Talk Track (Slide 17, `SELayerTalkTrack.tsx`) is the model: per row a **plain-English line + one discovery question**. Weave that pattern into more slides without rewriting the underlying decks.

New / extended slides to add to the SE deck:

- **M1 — "Why this matters in plain English"** (new `SEPlainEnglishShift.tsx`) — one-line market reframe + one discovery question, sits right after Strategic Shift to replace the removed Industry Challenge.
- **M3 — Per-app talk track strips** — light-touch additions on the three Core App slides (Safety/Content/Training) and the CoAnalyst slide: small "Plain English / Ask the prospect" footer band, identical pattern to Slide 17. Implemented as a shared `<TalkTrackStrip>` component overlaid via a wrapper on the existing slides — no edits to the underlying tech-v4 components.
- **M5 replacement (since 22–25 archived) — "Use case cheat sheet"** (new `SEUseCaseCheatSheet.tsx`): 4–5 rows, each a one-line plain-English use case + the discovery question that surfaces it. Keeps M5 alive without the contested figures.
- **M6 — Objections paring** (`SEObjections.tsx`): drop from top-5 to top-3, tighten Acknowledge → Reframe → Bridge to a single line each. Flag the rest as "awaiting Kathrina's revisions".

Style guardrails (already in memory `mem://content/sales-enablement/coach-script-standard`):
- BrandNumber product names (SafetyManager365 / ContentManager365 / TrainingManager365)
- No FOQA/FDM/ASAP — use "Operational Data", "Generative AI", "Recommended Actions"
- ~90% domain accuracy vs ~35% generic AI line stays as the CoAnalyst headline
- DTOP color tokens (D blue · T amber · O violet · P emerald)

## 3. Cross-reference with the Medium pitch

"Medium pitch" = the mid-length deck sellers are being asked to study before May 21. Based on the deck library, the two candidates are **Executive Pitch 3** (`/executive-pitch-3`) and **Customer Overview** (`/customer-overview`). I'll assume **Executive Pitch 3** is "the medium pitch" — please confirm in chat; if it's Customer Overview the same checks apply.

Consistency sweep across these surfaces:
- Headline numbers: ~90% vs ~35%, 550+ airlines, ~2.5M users, 6 continents
- Roadmap dates: Insights early-2026, Automation mid-2026, Unified Mobile late-2026
- DTOP narrative wording (Detect → Trigger → Orchestrate → Prove), color mapping
- No leftover "$33M / $4.1B / FOQA / FDM / ASAP" stats — replace with the approved "$25–35B industry exposure" figure or remove
- CoAnalyst master message: "From event to control"
- Product names use BrandNumber format everywhere

Output: a short consistency report appended to `.lovable/plan.md` listing any drift between SE deck and Medium pitch with file/slide references, plus targeted fixes (text-only) to bring SE deck in line. No edits to the Medium pitch itself unless the user asks.

## 4. Academy impact

`src/components/academy/slideRegistry.ts` and module `slide_ids` in the `academy_modules` table reference the SE slide ids. Removing/archiving slides means:

- Update `slideRegistry.ts` to drop the removed ids.
- Create a migration to update `academy_modules.slide_ids` arrays for M1, M4, M5, M6 to match the new lineup. M5 will reference the new "Use case cheat sheet" instead of the four archived use-case slides.
- Quiz questions referencing archived slide content stay (the concepts are still taught), but I'll spot-check `academy_quiz_questions` rows for any that name a removed slide explicitly and rewrite them.

## 5. Out of scope (this round)

- Final wording for Slide 29 (Objections pare-back) and Slide 31 (Closing) — Kathrina is reverting next week; we'll do a follow-up pass.
- ROI / transformation slide rework — parked until ROI numbers are signed off.
- No changes to Medium pitch deck itself.
- No changes to narration audio files (scripts will be updated to match new copy; regeneration is a separate step on request).

## Technical summary

- `src/pages/SalesEnablement.tsx` — remove 6 entries from `slides[]`; add 2–3 new entries (Plain-English Shift, Use Case Cheat Sheet, optional CoAnalyst talk-track strip wrapper).
- New components under `src/components/sales-enablement-slides/`: `SEPlainEnglishShift.tsx`, `SEUseCaseCheatSheet.tsx`, `SETalkTrackStrip.tsx` (shared).
- `SEObjections.tsx` — slim from 5 → 3 objections, tighter copy.
- `src/data/salesEnablementNarration.ts` — add narration entries for new slides; remove entries for archived slides.
- `src/hooks/useSalesEnablementNarration.ts` — no shape change, just new ids.
- `src/components/academy/slideRegistry.ts` — sync ids.
- New Supabase migration — update `academy_modules.slide_ids` for M1/M4/M5/M6.
- Archived slide components (`Slide4Transformation`, `SlideUseCases`, `Slide5MaturityCurve`, `TechSlide10SafetyUseCases`, `TechSlide11OpsUseCases`, `TechSlide12FinancialUseCases`, `TechSlide2IndustryChallenge`) **left in place** — only unwired from this deck. They're still used by other decks where applicable.

## Open questions (please confirm)

1. **"Medium pitch" = Executive Pitch 3** (`/executive-pitch-3`)? Or Customer Overview / Operational Pitch?
2. For the new M5 "Use Case Cheat Sheet", which 4–5 use cases should headline it (suggested: Safety signal → procedure update; Reg change → training; Fatigue trend → roster; Ops disruption → crew comms; Audit prep)?
3. Hold publishing the changes until Kathrina's Slide 29 + 31 revisions arrive, or ship the cuts now and patch 29/31 next week?
