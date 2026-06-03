# Populate Content Strategy + Briefs

Right now the Editorial Suite has the 4 quarterly pillars seeded but **0 items** and **0 briefs**. This plan fills it end-to-end so the team opens `/editorial` and finds a fully-built Q1–Q4 plan with an approved brief per asset, ready to generate.

## What gets created

**55 content items**, distributed by pillar and persona, with a sensible weekly cadence across 2026:

| Quarter | Pillar | Items | Mix |
|---|---|---|---|
| Q1 | DTOP Education | 14 | 4 long-form, 4 social, 3 enablement, 3 script |
| Q2 | Intelligence Layer Proof | 14 | 4 long-form, 4 social, 3 enablement, 3 script |
| Q3 | Industry Solutions (Aviation / Defense / Rail) | 15 | 5 long-form, 4 social, 3 enablement, 3 script |
| Q4 | Sales Enablement & Demand | 12 | 3 long-form, 3 social, 4 enablement, 2 script |

Each item has: title, pillar, quarter, persona (exec / ops / tech), channel, asset_type, status=`brief`, target due_date (week-by-week), notes.

**55 approved briefs**, one per item, each containing:
- Objective (one sentence outcome)
- Audience (persona + buying stage)
- Key message (DTOP-anchored, one line)
- 5-beat spine pre-filled per persona arc (Shift → Platform → Loop → Proof → Differentiators) with bullet content unique to that asset
- 3–5 proof points selected from canonical library
- Format / length / tone presets for the asset type
- CTA (matched to funnel stage: educate / convert / enable)
- Reference links to existing decks and playbooks already in the codebase
- `playbook_snapshot` JSON captured at approval
- `status = 'approved'`, `approved_at = now()`

## How it gets built

A single seeding pipeline driven by a typed catalogue in code, then loaded into the database. No new UI — the existing Calendar / Briefs / Assets tabs render everything.

1. **`src/data/editorialCatalog.ts`** — typed array of 55 items. Each entry declares pillar slug, persona, channel, asset_type, week, title, objective, key_message, 5-beat bullets, proof_point ids, CTA, reference_links.
2. **`scripts/seedEditorialCatalog.ts`** — one-shot Node script. Resolves pillar UUIDs, upserts items by title, upserts approved briefs by `content_item_id`. Idempotent (safe to re-run).
3. **Migration**: add `UNIQUE (content_item_id)` on `briefs` to make the upsert deterministic, and add a `slug` column to `content_pillars` so the catalogue can reference pillars by stable key instead of UUID.
4. **Insert** (via the data-insert tool, not migration): run after the migration to load all 55 items + 55 briefs in a single transaction.

## Generation strategy (not in this step)

This plan stops at approved briefs. It does **not** auto-trigger asset generation for all 55 — that would be ~55 LLM calls and produce drafts no one has reviewed. Instead, the user clicks "Generate" per item from the Calendar, exactly as designed. The briefs being pre-approved means every generate click is one tap.

If the user wants bulk generation too, that becomes a follow-up plan (with a "Generate all Q1" batch button + concurrency limit).

## Out of scope

- Editing the playbook itself (already locked).
- Building the bulk-generate UI.
- Producing the actual asset drafts.
- Importing from an external CSV — catalogue lives in code so it's reviewable in PRs.

## Open question

Persona split — confirm the default mix you want across the 55: **40% exec / 35% ops / 25% tech** (matches the 3 pitch decks), or weight differently? If you don't answer, I'll use that 40/35/25 split.
