## Editorial Suite — Plan

A new authenticated workspace at `/editorial` that takes an idea from Calendar → Brief → Draft → Review → Final, with every asset inheriting the messaging playbook (DTOP, 5-beat spine, 90% vs 35% proof, canonical differentiators, terminology rules).

Scope: ~55 assets across Q1–Q4 2026, multi-user marketing team, 4 asset families (long-form, social, sales enablement, video/deck scripts).

---

### 1. Information architecture

New top-level route `/editorial` (owner + new `editor` role can access), four sub-views:

```text
/editorial
├── /calendar      Quarter grid · 55 planned assets · filters
├── /briefs        Brief builder + library of approved briefs
├── /assets        Generated drafts, versions, exports
└── /playbook      Read-only view of canonical messaging rules
```

### 2. Data model (Lovable Cloud)

Five new tables, all RLS-protected:

- `content_pillars` — Q1–Q4 themes (e.g. "DTOP Education", "Intelligence Layer Proof"), color, quarter, owner.
- `content_items` — one row per planned asset: title, pillar_id, quarter, target_week, persona (exec/ops/tech), channel, asset_type, status (idea | brief | draft | review | final), owner, due_date.
- `briefs` — 1:1 with `content_items`: objective, audience, key_message, proof_points[], cta, tone, length, format, references[], spine_beats (jsonb), playbook_snapshot (jsonb captured at approval time), approved_by, approved_at.
- `assets` — generated outputs: content_item_id, brief_id, version, body (markdown/jsonb), generation_prompt, model, status, created_by.
- `asset_comments` — reuse pattern from existing `slide_comments`.

Add `editor` to the `app_role` enum.

### 3. Calendar view

- Default view: 4-column quarter grid (Q1/Q2/Q3/Q4), cards grouped by pillar.
- Alternate views: list (sortable table), Gantt-lite by week.
- Filters: persona, channel, asset_type, status, owner.
- Create/edit item inline; bulk-create from a CSV import on first load to seed all 55.
- Status badges color-coded; click card → opens brief if exists, else "Create brief".

### 4. Brief Builder

Structured form, not a blank textbox. Sections:

1. **Context** — pulled from `content_item` (title, persona, channel).
2. **Objective** — single sentence.
3. **5-beat spine** — required fields for each beat (Shift / Platform / Loop / Proof / Differentiators), pre-filled from playbook for the selected persona.
4. **Proof points** — multi-select from a canonical proof library (90% vs 35%, customer logos, ROI stats).
5. **Tone & length** — preset chips per asset_type.
6. **References** — link to existing decks/slides.
7. **Approve** — locks the brief, snapshots playbook rules into `playbook_snapshot`, enables "Generate".

Briefs are reusable templates — duplicate-and-edit supported.

### 5. Asset Generator

Lovable AI Gateway via an edge function `generate-asset`:

- Input: brief_id.
- Builds a system prompt from `playbook_snapshot` + brief fields + asset_type-specific output spec (blog = markdown, LinkedIn = ≤1,300 chars, one-pager = sectioned JSON, video script = scene-by-scene).
- Default model: `google/gemini-2.5-pro` for long-form, `google/gemini-3-flash-preview` for social.
- Streams response into a draft `asset` row.
- "Regenerate", "Refine with note", and "Manual edit" all create new versions; previous versions retained.
- Export buttons: copy markdown, download .md / .docx (long-form), .txt (social), .pdf (one-pager via existing pptx/print pipeline).

### 6. Review & approval

- Per-asset comment thread (reuses `slide_comments` pattern).
- Status transitions: draft → review → final (final requires editor or owner role).
- Final assets appear in `/assets` library with search and filter by pillar/persona/channel.

### 7. Roles

- `owner` — everything.
- `editor` (new) — full CRUD on items/briefs/assets, can approve briefs and finalize assets.
- `reviewer` (existing) — read + comment.

### 8. Build sequence

1. Migration: tables, enum value, RLS, GRANTs, trigger functions, role seed for current owner.
2. `/editorial` shell + nav guard.
3. Calendar (seed 55-row CSV importer included).
4. Brief Builder + playbook snapshot logic.
5. `generate-asset` edge function + AI Gateway wiring.
6. Asset viewer, version history, comments, exports.
7. Playbook read-only view (renders from existing mem-derived data file).

### 9. Out of scope (for v1)

- Real-time collaborative editing on briefs (single-editor lock instead).
- Auto-publishing to LinkedIn/CMS (export only).
- Image/video generation (text + script only; deck builds stay in existing slide system).
- Analytics on published asset performance.

### 10. Technical notes

- Edge function uses `streamText` from AI SDK with the Lovable AI Gateway provider helper; structured outputs via `Output.object` for one-pagers and battle cards.
- Brief→prompt assembly lives server-side so the playbook snapshot can't be tampered with from the client.
- All new tables follow existing RLS + GRANT pattern used by `slide_comments` / `academy_modules`.
- Reuses existing dark theme, Space Grotesk + Inter, `#0066FF` primary — no new design tokens.

---

**Direct answer to your "is it best just to prompt" question:** for 55 assets across a team, no — ad-hoc prompting will drift in voice, lose audit trail, and force you to re-explain the playbook every time. The suite above pays for itself by asset ~10 because every brief inherits the playbook automatically and every generated draft starts at 70% quality instead of 30%.
