## Problem

The Editorial Suite calendar (`content_items` + `briefs`) and the Content Strategy slide (`SlideContentStrategy.tsx`) have drifted apart. The strategy slide is the source of truth and defines, per quarter, an exact set of 17 named assets with title, format, audience, and summary. The current Q1 calendar contains different items (e.g. "Sales Deck Script: The Fragmentation Opening", "From Inbox to Coordination", "Battle Card: Connected Foundations vs Point Tools", "Why Reactive Operations Cost Aviation $25–35B") that are not in the strategy. Q2–Q4 have the same drift.

## Goal

Make the editorial calendar a 1:1 reflection of the Content Strategy slide. Same titles, same formats, same audiences, same per-quarter narrative. Briefs regenerate cleanly against the new items.

## Approach

Single source of truth: lift the four `quarters[]` arrays out of `SlideContentStrategy.tsx` into a shared `src/data/contentStrategy.ts` so the slide and the editorial seed read from one file. Then reset and reseed `content_items` for Q1–Q4 to exactly mirror those 17 assets per quarter (68 total). Existing Industry Solutions and Sales Enablement pillars stay as parallel tracks, untouched.

### 1. Extract strategy data
- New `src/data/contentStrategy.ts` exporting `STRATEGY_QUARTERS` (the same shape as today's `quarters[]`).
- `SlideContentStrategy.tsx` imports from it (no visual change).

### 2. Format → editorial field mapping
Map each strategy asset to an editorial item:

| Strategy `format` | `asset_type` | `channel` |
|---|---|---|
| Flagship Report | long_form | ebook |
| Campaign Guide | enablement | one-pager |
| Webinar | script | webinar |
| Decision Asset | enablement | one-pager |
| Education Brief | long_form | blog |
| Thought Leadership | long_form | blog |
| Practical Tool | enablement | one-pager |
| Nurture Content | enablement | email-sequence |
| Social Content | social | linkedin |

`persona` derived from `audience` string: contains "Executive/CFO/board" → `exec`; contains "IT/Architect/Technical" → `tech`; otherwise → `ops`. Strategy `summary` goes into `content_items.notes` so the brief generator has the strategy-authored angle to anchor on.

### 3. Database reset (Q1–Q4 only)
- Delete `briefs` and `assets` rows whose `content_item_id` belongs to a Q1–Q4 pillar (the four strategy pillars). Industry Solutions + Sales Enablement rows are untouched.
- Delete those `content_items`.
- Insert 17 fresh `content_items` per quarter, pillar set to that quarter's strategy pillar, status `idea`, no briefs yet.

### 4. Brief generation
The existing `supabase/functions/draft-brief/index.ts` already enforces quarter themes via `QUARTER_THEMES`. With the new items + strategy-authored `notes`, run **Bulk draft briefs (onlyEmpty=true)** from the UI to generate briefs for all 68 new items. No code change to the function.

### 5. Optional UI cue
Add a small "Mirrors Content Strategy" badge next to the quarter chips on the calendar so the team knows the calendar is locked to the slide.

## Out of scope

- No change to the strategy slide visuals.
- No change to Industry Solutions or Sales Enablement pillars/items.
- No change to `editorialPlaybook.ts` quarter themes — those already match the slide narrative.
- Briefs/assets are regenerated, not migrated — destructive reset of the Q1–Q4 calendar is intentional (matches earlier "rewrite in place" decision).

## Risks

- Any in-flight Q1–Q4 draft will be lost. Q1 currently has 1 draft ("Why Reactive Operations Cost Aviation $25–35B") — confirm OK to discard.
- 68 brief generations via the bulk runner will consume LLM budget; user triggers manually after seed.

## Files touched

- new: `src/data/contentStrategy.ts`
- edit: `src/components/slides/SlideContentStrategy.tsx` (import from new file)
- edit: `src/components/editorial/CalendarView.tsx` (optional alignment badge)
- migration-free DB work: one `supabase--insert` script that deletes Q1–Q4 briefs/assets/items, then inserts 68 new items.
