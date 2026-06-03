# Bulk-enrich all 55 briefs

Goal: populate `angle`, `core_insight`, `outline`, `takeaways`, `sources`, `alt_titles`, `distribution`, `success_metric` (and refreshed `spine_beats`) on every brief by running the existing `draft-brief` edge function — without overwriting any human-edited content and without hitting rate limits.

## 1. New edge function: `bulk-draft-briefs`

A server-side orchestrator so the work survives browser refresh and respects gateway limits.

Inputs (all optional):
- `quarter`: limit to Q1/Q2/Q3/Q4
- `pillarId`: limit to one pillar
- `onlyEmpty` (default `true`): skip briefs where `angle <> ''` (preserves human edits)
- `voice`: `corporate` (default) | `thought_leader` | `hybrid`
- `concurrency` (default `2`, max `4`)
- `dryRun` (default `false`): return the target list without calling the model

Behaviour:
- Auth: editor/owner only (same gate as `draft-brief`).
- Loads target `content_items` grouped by `pillar_id` so sibling context is consistent.
- Calls the **existing `draft-brief` logic** per item (refactor its core into a shared `draftBriefForItem(itemId, voice)` helper imported by both functions — no duplication).
- Throttle: process items in batches of `concurrency`, with a 1.2s gap between batches to stay well under Lovable AI gateway limits.
- Per-item error isolation: one failure does not abort the run.
- Returns a JSON summary: `{ attempted, succeeded, failed: [{itemId, title, error}], skipped }`.
- Emits progress rows to a new lightweight `brief_jobs` table so the UI can poll.

## 2. New table: `brief_jobs`

Tracks each bulk run for visibility and resumability.

```text
brief_jobs
- id uuid pk
- created_by uuid
- status text  (queued | running | done | error)
- total int, succeeded int, failed int
- filters jsonb, voice text
- errors jsonb  (array of {itemId, title, message})
- started_at, finished_at timestamptz
```

RLS: editors/owners can read/insert/update their own jobs. Standard GRANTs.

## 3. UI: Bulk-draft drawer on `/editorial`

Add a **"Bulk draft briefs"** button in the Editorial Suite header that opens a drawer:

- Filters: Quarter (All / Q1–Q4), Pillar (All / list), Voice (Corporate / Thought leader / Hybrid).
- Toggle: **"Only enrich empty briefs"** (default on).
- "Preview targets" → calls `bulk-draft-briefs` with `dryRun: true` and shows the count + titles.
- "Start enrichment" → kicks off the real run, opens a live progress panel polling `brief_jobs` every 2s.
- On completion: summary card with succeeded/failed counts, a list of failures with retry buttons, and a "Review enriched briefs" link that filters the calendar to recently updated items.

## 4. Safety & idempotency

- `onlyEmpty=true` is the default so re-running never clobbers human work.
- A small **"Re-draft this brief"** action already exists per item — unchanged. The bulk path uses the same write path, so behaviour stays consistent.
- All writes go through the existing `briefs` upsert in `draft-brief` (now in the shared helper). No new write surface.

## 5. Sibling-awareness (already in `draft-brief`)

`draft-brief` already loads sibling items by `pillar_id` and instructs the model to differentiate the angle. The bulk function preserves this — siblings are read fresh per item, so as the run progresses later items see the updated pillar context.

## 6. Out of scope

- No changes to the asset writer (`generate-asset`).
- No automatic regeneration of assets after briefs change — user explicitly approves each.
- No model upgrade; keeps `google/gemini-2.5-pro` as in `draft-brief`.

## Technical notes

Files:
- New: `supabase/functions/bulk-draft-briefs/index.ts`
- New: `supabase/functions/_shared/draftBrief.ts` (extracted from `draft-brief/index.ts`)
- Edit: `supabase/functions/draft-brief/index.ts` to import the shared helper
- New migration: `brief_jobs` table + GRANTs + RLS
- New: `src/components/editorial/BulkDraftDrawer.tsx`
- Edit: `src/pages/EditorialSuite.tsx` to mount the button + drawer

Estimated runtime for full 55-item run at concurrency 2: ~3–4 minutes.

## Open question

For the **5 briefs that already have human edits** (if any exist when you run it) — confirm default `onlyEmpty=true` is correct, or do you want a "Force re-draft all" override available in the drawer too? I'll include both controls unless you say otherwise.
