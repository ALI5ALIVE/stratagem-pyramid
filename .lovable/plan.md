

## Simplify to Comments-Only (Remove Approval Workflow)

Strip out the approval system entirely. Reviewers can add, edit, reply to, resolve, and delete comments — everyone signed in sees everything in real time. No Approve / Changes Requested / Pending controls anywhere.

## What changes

### Comment drawer (`SlideCommentLayer.tsx`)
- Remove the `ApprovalControl` block from the bottom of the drawer.
- Remove the `useSlideApproval` hook usage.
- Keep: avatar + display name header, comment list, post box, threaded replies, resolve toggle, delete (own).
- Add an **Edit** action on each comment the current user owns — inline textarea, Save / Cancel, with the same 1–2000 char validation.

### Comment thread (`CommentThread.tsx`)
- Add inline edit mode for the comment author (textarea pre-filled with current body, Save updates `body` + `updated_at`).
- Show a small "(edited)" tag when `updated_at > created_at`.
- Keep Reply / Resolve / Delete actions exactly as today.

### Comments hook (`useSlideComments.ts`)
- Add `editComment(id, body)` that updates `body` (RLS already allows authors to update their own rows).

### Review dashboard (`/review`)
- Drop all approval columns (✓ / ✗ / •).
- Keep columns: Deck, Slide, Total comments, Unresolved, Last activity, Open link.
- Stop querying `slide_approvals`.

### Files to delete
- `src/components/comments/ApprovalControl.tsx`
- `src/hooks/useSlideApproval.ts`

### Database cleanup
Migration to drop the now-unused approval objects:
- `DROP TABLE public.slide_approvals;`
- `DROP TYPE public.approval_status;`
- Remove `slide_approvals` from `supabase_realtime` publication first.

Comment tables, profiles, user_roles, and the `has_role` function all stay — `user_roles` is still used by the "owner can delete any comment" RLS policy.

### Side fix bundled in
The current network log shows comments fail to load (`PGRST200` — missing FK from `slide_comments.user_id` → `profiles.id`). Add the foreign key in the same migration so the existing `profile:profiles!slide_comments_user_id_fkey(...)` join actually works and comments render:
- `ALTER TABLE public.slide_comments ADD CONSTRAINT slide_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;`

Without this the drawer will keep showing "No comments yet" even after posting.

## Out of scope

- No change to auth, sidebar, or which decks have commenting enabled.
- No email notifications.
- No change to the comment bubble button position or styling.

## Files touched

**Edited**
- `src/components/comments/SlideCommentLayer.tsx` — remove approval block, wire `editComment`.
- `src/components/comments/CommentThread.tsx` — add inline edit UI + "(edited)" marker.
- `src/hooks/useSlideComments.ts` — add `editComment`.
- `src/pages/ReviewDashboard.tsx` — remove approval columns and query.

**Deleted**
- `src/components/comments/ApprovalControl.tsx`
- `src/hooks/useSlideApproval.ts`

**Migration**
- Drop `slide_approvals` table + `approval_status` enum (after removing from realtime publication).
- Add missing `slide_comments.user_id → profiles.id` foreign key so comments actually load.

