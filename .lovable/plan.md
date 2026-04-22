

## Fix: Comments post but never appear ("No comments yet")

### Root cause

`useSlideComments.ts` requests:
```
.select("*, profile:profiles!slide_comments_user_id_fkey(...)")
```
but `slide_comments` has no foreign key to `profiles`. PostgREST returns `400 PGRST200` for every load, so `comments` stays `[]` and the UI always shows the empty state — even though inserts succeed (you can see them in the database).

### Fix (two parts)

**1. Add the missing foreign key (migration)**
Add `slide_comments.user_id → profiles.id` so PostgREST can resolve the embedded join. This also lets the existing query keep working with no code change to other call sites.

```sql
ALTER TABLE public.slide_comments
  ADD CONSTRAINT slide_comments_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS slide_comments_user_id_idx
  ON public.slide_comments(user_id);
```

Note: `profiles.id` already mirrors `auth.users.id` (set on signup), so every existing `slide_comments.user_id` already has a matching `profiles.id`. The constraint will apply cleanly. If a stray row is missing a profile, the migration will create the missing profile rows first as a safety step.

**2. Harden the hook (defensive)**
In `src/hooks/useSlideComments.ts`:
- Surface the error to the console (`console.error("Failed to load comments", error)`) instead of swallowing it, so future schema mismatches are visible.
- Keep the existing `profile:profiles!slide_comments_user_id_fkey(...)` join (now valid).
- No other changes needed.

### Files

**Edited**
- `src/hooks/useSlideComments.ts` — add `console.error` on load failure.

**New**
- `supabase/migrations/<timestamp>_slide_comments_profile_fk.sql` — backfill any missing profiles + add FK + index.

### Verification

1. Reload `/pitch-technical`, open any slide's comment panel.
2. Network tab: `slide_comments` GET returns `200` with rows.
3. Previously posted "test 2" comment now appears with the author avatar/name.
4. Post a new comment → it appears immediately (realtime subscription already wired).

### Out of scope

- No UI redesign of the comment panel.
- No changes to RLS policies (existing policies already allow authenticated reads).
- No change to the `ReviewDashboard` aggregation query (it doesn't use the join).

