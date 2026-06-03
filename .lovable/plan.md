# Upgrade: Editorial Suite → Best-Practice Content Engine

Right now the generator follows Comply365's 5-beat spine and DTOP rules but doesn't apply established content-craft frameworks, doesn't carry a deliberate **voice**, and has no objective **scoring** to drive a review/reflection cycle. This upgrade closes those gaps.

## What changes

### 1. Codify world-class craft frameworks
Add `src/data/editorialCraft.ts` with named authorities and frameworks the generator must apply per asset type:

- **Long-form** — Ann Handley (*Everybody Writes* — TRUTH: Truthful · Rare · Useful · Tested · Human), Andy Crestodina (originality + research-backed), Nielsen Norman (F-pattern, scannability), BLUF (Bottom Line Up Front).
- **Social** — Justin Welsh / Dickie Bush hook-deck patterns, Cialdini's persuasion (specificity + authority), AIDA, "1 idea per line."
- **Enablement** — April Dunford positioning, Challenger Sale (teach-tailor-take control), problem→cost→solution→proof→ask one-pager structure.
- **Script** — StoryBrand 7-part (Donald Miller), 3-act narrative, Aristotle's ethos/pathos/logos, "show don't tell," visual-script parallelism.

Plus universal craft rules: active voice, sentence length variance, concrete > abstract, no filler adverbs, evidence per claim, sensory verbs.

### 2. Voice selection (thought-leader vs corporate)
Add `VOICES` to the playbook:

- **thought_leader** — first-person where relevant, contrarian POV, lived-experience anchors, named opinions, signature phrasing. Used for exec/ops persona long-form & social.
- **corporate** — third-person, brand-led, "we/Comply365," measured authority, enterprise-safe. Used for enablement, RFP-adjacent material, official announcements.
- **hybrid** — corporate frame, thought-leader pull-quotes. Used for scripts, webinars.

Voice is selected per brief and locked at approval. The generator's system prompt swaps in the matching style guide.

### 3. Per-asset-type scoring rubric (review & reflection loop)
Each asset type gets a weighted rubric (5–8 dimensions, 0–10 each). The generator returns BOTH the markdown body AND a JSON scorecard in one call.

Rubric examples:
- **Long-form (100 pts)** — Hook (15) · Originality (15) · Evidence density (15) · DTOP spine fidelity (15) · Scannability/NN guidelines (10) · Voice fit (10) · CTA strength (10) · Terminology compliance (10).
- **Social (100 pts)** — Hook (25) · Specificity (15) · Single idea (10) · Pattern interrupt (10) · Authority signal (10) · Voice fit (15) · CTA/question (10) · Terminology (5).
- **Enablement (100 pts)** — Problem clarity (15) · Differentiator framing (15) · Proof density (15) · Scannability (15) · Sales-ready (15) · Voice fit (10) · CTA (10) · Terminology (5).
- **Script (100 pts)** — Opening hook (15) · Story arc (15) · Visual/script parallelism (15) · Pacing (10) · DTOP spine (15) · Voice fit (10) · CTA (10) · Terminology (10).

For every dimension the AI must return: `score`, `rationale`, `improvement` (one concrete fix). Total + grade band (A 90+, B 80+, C 70+, Rework <70) drive a clear reflection step.

### 4. Reflection loop in the UI
In `ItemDetail.tsx` per asset version show:
- Score gauge (total + band) and a bars chart per dimension.
- "Top 3 improvements" panel from the rationales.
- One-click **"Regenerate addressing low scores"** that pre-fills the refine note with the sub-70 dimensions and their suggested fixes.
- Voice picker on the brief.

### 5. Brief upgrades
- New **Voice** dropdown (thought_leader / corporate / hybrid) with a default per asset_type.
- New **Craft frameworks** read-only chips showing which authorities will be applied (based on asset type).
- Approval snapshot now also captures voice + craft framework IDs so reproductions are deterministic.

## Technical details

### Database migration
```sql
ALTER TABLE public.briefs
  ADD COLUMN IF NOT EXISTS voice text NOT NULL DEFAULT 'corporate';

ALTER TABLE public.assets
  ADD COLUMN IF NOT EXISTS scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS score_total integer,
  ADD COLUMN IF NOT EXISTS score_band text;
```
No RLS changes needed (existing policies cover the columns).

### Files
- **new** `src/data/editorialCraft.ts` — VOICES, FRAMEWORKS_BY_TYPE, RUBRICS_BY_TYPE, helpers `getRubric()`, `getFrameworks()`, `getDefaultVoice()`.
- **edit** `src/data/editorialPlaybook.ts` — re-export VOICES; extend `buildPlaybookSnapshot()` to embed voice + craft IDs.
- **edit** `supabase/functions/generate-asset/index.ts` — request body adds `voice`; prompt composition pulls in framework instructions + rubric; instructs the model to return a fenced ```json``` block at the end containing the scorecard. Parse it, persist `body` (markdown sans json block), `scores`, `score_total`, `score_band`. Keep Gemini 2.5 Pro for long-form/script/enablement; Gemini 3 Flash for social.
- **edit** `src/components/editorial/ItemDetail.tsx` — Voice select, frameworks chips, scoring panel with bar visualisation, "Regenerate addressing low scores" button.
- **edit** `src/pages/EditorialSuite.tsx` — minor: surface average score on Assets cards.
- **migration** add the three columns above.

### Out of scope
- Bulk re-scoring of the 55 existing items (each will pick up scoring on next generate).
- External integrations (Grammarly, Hemingway API).
- Editing or extending the 5-beat spine itself.
- Multi-language voices.

## Open question
Default voice mapping — confirm or adjust:
- Exec persona → **thought_leader** for long-form & social, **corporate** for enablement.
- Ops persona → **hybrid** for long-form, **thought_leader** for social, **corporate** for enablement.
- Tech persona → **corporate** across the board (precision over personality).
- All scripts → **hybrid**.

I'll use this mapping unless you tell me otherwise — say the word and I'll build it.
