# Sales Rep Activity Tracking

Combine page-view tracking (C) with a unified admin dashboard (A) so owners can see what every rep has been doing across the workspace.

## What you'll get

A new owner-only page at **`/admin/activity`** showing one row per rep with:
- Display name, email, last sign-in, total sign-ins
- Academy: modules passed / total, best average score, last attempt
- Pages viewed: total views, unique decks visited, last activity, top 3 decks
- Comments posted (count + last)
- CSV export of the full table
- Click a rep → drill-down: full page-view timeline + academy attempts + comments

## Implementation

### 1. New table: `page_views`
Captures every route visit by an authenticated user.

```text
page_views
- id              uuid
- user_id         uuid  (auth.uid())
- route           text  (e.g. /pitch-executive)
- deck_id         text  (nullable — derived from route)
- viewed_at       timestamptz
- session_id      text  (per-tab, for grouping)
- duration_ms     int   (nullable — sent on unload)
```

RLS:
- INSERT: any authenticated user, only with their own `user_id`
- SELECT: own rows OR `has_role(auth.uid(),'owner')`
- No UPDATE/DELETE for users; owners can delete

GRANTs for `authenticated` + `service_role` (no `anon`).

### 2. Tracking hook
- `src/hooks/usePageViewTracker.ts` — listens to `useLocation()`, debounces, inserts a row on route change when `user` is signed in. Generates a `session_id` in `sessionStorage`. Sends `duration_ms` on `beforeunload` / route change via a lightweight update of the prior row.
- Mounted once inside `AppLayout` (or `App.tsx`) so it covers every authenticated route. Anonymous visits are ignored.
- A small `DECK_LABELS` map (reuse the one in `ReviewDashboard.tsx`) derives `deck_id` from the route prefix.

### 3. Auth sign-in stats
Supabase `auth.users` already has `last_sign_in_at`. To surface it without exposing the auth table, add a SECURITY DEFINER RPC:

```text
get_user_activity_summary() → owner-only
returns: user_id, display_name, email, last_sign_in_at, sign_in_count,
         academy_modules_passed, academy_best_avg, academy_last_attempt,
         page_views_total, decks_visited, last_page_view,
         comments_total, last_comment_at
```

Function checks `has_role(auth.uid(),'owner')` and joins `auth.users`, `profiles`, `academy_progress_per_user`, `page_views`, `slide_comments`. Sign-in count is best-effort via `auth.audit_log_entries` if accessible, else null.

### 4. New page: `/admin/activity`
- `src/pages/admin/SalesRepActivity.tsx` — table view, owner-gated like `AdminDashboard.tsx` (checks `user_roles.role = 'owner'`)
- Sortable columns, search by name, CSV export (reuse pattern from `AdminDashboard.tsx`)
- Row click → `/admin/activity/:userId` drill-down showing:
  - Page-view timeline (last 100, grouped by day)
  - Top decks bar chart (simple counts)
  - Academy attempt history
  - Comments list with links to the slide

### 5. Sidebar entry
Add "Rep Activity" under the admin/owner section in `AppSidebar.tsx` (visible only when the current user has the `owner` role — pattern already exists for Academy Admin).

## Notes / trade-offs

- **Privacy:** only owners can read aggregated activity. Reps see only their own rows.
- **Volume:** page-view inserts are cheap; if traffic grows we can later batch via an edge function. Fine for current scale.
- **Sign-in count:** `auth.audit_log_entries` access is limited; if unavailable we'll display `last_sign_in_at` only and note it in the UI.
- **No behaviour changes** to existing pages — tracker is passive.

## Files touched

New:
- `supabase/migrations/<ts>_page_views_and_activity.sql` (table + RPC + grants + policies)
- `src/hooks/usePageViewTracker.ts`
- `src/pages/admin/SalesRepActivity.tsx`
- `src/pages/admin/SalesRepActivityDetail.tsx`

Edited:
- `src/App.tsx` — routes + mount tracker
- `src/components/AppSidebar.tsx` — owner-only nav entry
