# Briefs → real editorial briefs (not spine fill-in)

You're right: the 5-beat spine is **messaging architecture**, not a brief template. Today the brief form makes every item look the same — fill the same five boxes. A proper editorial brief should be **derived from the content strategy** (pillar, persona, channel, asset type), come pre-loaded with a unique **angle, outline, sources, and takeaways**, and be **reviewable/editable before the asset is written**. The spine remains the messaging guardrail in the background, but it is not the brief.

## New flow

```
Content Item (strategy)
     │
     ▼   AI: "draft me a real brief"
Editorial Brief (unique per asset)
  · working title + angle
  · audience profile
  · core insight / POV
  · outline (asset-type specific)
  · key takeaways
  · proof / sources to cite
  · CTA + distribution notes
  · success metrics
     │   user reviews + edits
     ▼   approve
Asset generation (uses outline as scaffold)
```

Two distinct AI calls: **draft-brief** then **generate-asset**. The user can iterate on the brief without spending tokens on a full draft.

## What the brief actually contains (asset-type aware)

Every brief carries these core sections:
- **Working title & alt titles** (3 options)
- **One-line angle** — the unique POV for this piece, distinct from every other item in the calendar.
- **Audience snapshot** — role, KPI under pressure, what they already believe, what they don't.
- **Core insight** — the non-obvious thing this asset teaches.
- **Outline** — *the shape of the actual asset, see below.*
- **Key takeaways** — 3–5 sentences the reader should be able to repeat after reading.
- **Proof to cite** — specific stats, named customers, Comply365 platform capabilities to weave in (drawn from the playbook).
- **Sources / references** — external citations the writer should ground claims in.
- **Voice** — thought-leader / corporate / hybrid (already implemented).
- **CTA** — single, specific, time-bound.
- **Distribution** — primary channel + 2 repurpose channels.
- **Success metric** — e.g. "≥3% LinkedIn engagement", "≥45s avg read time".
- **Messaging guardrails** (read-only) — the 5-beat spine, DTOP, forbidden terms, differentiators. Shown so the writer/editor sees what the asset will be held to, but not the input form.

**Outline shape by asset type:**

| Asset type | Outline schema |
|---|---|
| Long-form | H2 sections (5–8), each with: heading, 1-line intent, bullets of sub-points, evidence to cite |
| Social | Hook line, body lines (4–7), closing question, hashtags |
| Enablement | Section blocks: Problem · Cost · Solution · How (DTOP) · Proof · Differentiators · Ask. Each with bullets. |
| Script | Scene list (6–10). Each scene: duration, VISUAL note, SCRIPT beats, on-screen text |

Outlines are **structured JSON** so the UI can render section-by-section editing (add/remove/reorder, edit per row) — not one giant textarea.

## Brief generation prompt

A new `draft-brief` edge function asks the model to:
1. Read the content item (title, pillar, persona, channel, asset type, quarter, notes) and the playbook snapshot (spine, proofs, differentiators, terminology, personas).
2. Read the **calendar context** — titles of the other items in the same pillar/quarter — so it can deliberately differentiate the angle from neighbours.
3. Apply the asset-type craft frameworks (Handley, Dunford, Welsh, StoryBrand, etc. — already codified).
4. Return a structured brief JSON conforming to the schema above. No prose dump — schema-shaped output the UI can render and edit.

Voice and persona drive the recommended angle; the spine is enforced as a guardrail in the writer step, not as a form for the user to fill.

## UI changes (ItemDetail panel)

Replace the current "fill 5 spine textareas + 5 brief fields" form with three clear sections:

1. **Strategy header** (read-only, derived from content item) — pillar, persona, quarter, channel, asset type, voice picker, frameworks chips.
2. **Brief** (the new structured form) — title/angle/audience/insight/outline editor/takeaways/proof/sources/CTA/distribution/success-metric. A prominent **"Draft brief with AI"** button at the top fills the whole thing in one call; the user then edits anything before approving. Re-draft is allowed.
3. **Messaging guardrails** (read-only accordion) — collapsed by default. Shows the spine, DTOP, differentiators, forbidden terms. Makes it explicit that these are applied automatically.

After Approve → the **Generate asset** button writes the asset using the approved brief as the scaffold (outline → sections, takeaways → close, proof → citations) while the writer prompt enforces the 5-beat spine and DTOP under the hood.

## Database

```sql
ALTER TABLE public.briefs
  ADD COLUMN IF NOT EXISTS angle text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS core_insight text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS alt_titles jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS outline jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS takeaways jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS distribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS success_metric text NOT NULL DEFAULT '';
```

`spine_beats` stays (still useful as a snapshot of how the writer plans to address each beat — generated by the brief-drafter, not hand-typed by users). `reference_links` stays. No RLS changes.

## Files

- **new** `supabase/functions/draft-brief/index.ts` — accepts `{ contentItemId, voice }`, returns structured brief JSON, persists it as the brief in `draft` status.
- **edit** `supabase/functions/generate-asset/index.ts` — pulls the new fields (`outline`, `core_insight`, `takeaways`, `sources`) into the writer prompt as the asset scaffold; spine/DTOP remain as guardrails.
- **new** `src/components/editorial/BriefEditor.tsx` — structured editor: title/alt titles, angle, audience, insight, **outline editor** (asset-type aware: section editor for long-form/enablement, line editor for social, scene editor for script), takeaways list, proof checkboxes, sources list, distribution, success metric.
- **new** `src/components/editorial/OutlineEditor.tsx` — variant-driven outline editor (sections / lines / scenes).
- **edit** `src/components/editorial/ItemDetail.tsx` — replace inline brief form with Strategy header + `<BriefEditor>` + Messaging guardrails accordion. Wire **"Draft brief with AI"** button to `draft-brief` function.
- **edit** `src/data/editorialPlaybook.ts` / `editorialCraft.ts` — small helpers: `outlineSchemaFor(assetType)` returning the empty outline shape.

## What stays the same

- The 55 existing items and their pillars stay put.
- Existing approved briefs keep their data; their new fields default to empty until "Draft brief with AI" is run to enrich them (one click, idempotent — the user can re-draft).
- Voice, craft frameworks, scoring rubric and reflection loop are unchanged.

## Out of scope

- Bulk brief drafting for all 55 items in one click (follow-up — easy to add once single-item drafting is solid).
- Image/cover art generation per brief.
- Calendar-level "rebalance angles to avoid overlap" pass.

## Open question

Two ways to handle existing briefs:
- **A. Keep them, empty new fields** — user clicks "Draft brief with AI" per item to enrich (recommended, safest).
- **B. Wipe all 55 existing briefs and require re-draft** — clean slate but loses any edits already made.

I'll go with **A** unless you say otherwise.
