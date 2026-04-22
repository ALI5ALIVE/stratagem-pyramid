

## Per-Slide Comments & Approval Workflow

Add a lightweight commenting + approval layer to the Technical Deep Dive, all playbooks (Platform, CoAnalyst, Insights, Automation, Mobile, DTOP, Regulation Mgmt), and the Persona Deep Dive. Reviewers can leave threaded comments on any slide, mark slides as Approved / Changes Requested / Pending, and the deck owner sees a consolidated review dashboard.

## Approach

A single reusable `SlideCommentLayer` component is rendered on every eligible slide. It posts/reads comments from Lovable Cloud (Supabase) keyed by `(deck_id, slide_id)`. No layout disruption — it lives in a fixed side panel toggled by a comment icon in the existing top-right area, next to the Comply365 logo.

### Authentication

- Email + password sign-in (no email confirmation, so reviewers get in instantly).
- Optional Google sign-in.
- A `profiles` table stores display name + avatar colour so comments show "Sarah K." not a UUID.
- Unauthenticated users see slides as today; the comment icon prompts sign-in.

### Data model (Lovable Cloud)

```text
profiles
  id (uuid, FK auth.users)         display_name (text)
  avatar_color (text)              created_at

user_roles                          -- separate table, never on profiles
  user_id (uuid)  role (app_role: 'owner' | 'reviewer')

slide_comments
  id  deck_id (text)  slide_id (text)
  user_id (uuid)  body (text)  resolved (bool)
  parent_id (uuid, nullable)        -- threading
  created_at  updated_at

slide_approvals
  id  deck_id (text)  slide_id (text)
  user_id (uuid)
  status (enum: 'approved' | 'changes_requested' | 'pending')
  note (text, nullable)  updated_at
  unique (deck_id, slide_id, user_id)
```

RLS: any authenticated user can read all comments/approvals (review is collaborative); users can insert/update/delete only their own rows; owners (via `has_role`) can delete any.

### UI pieces

1. **`SlideCommentLayer`** — fixed comment bubble button top-right of each slide showing unread/total count. Click opens a right-hand drawer with:
   - Threaded comment list (newest at bottom, @mention-style display name + colour dot + timestamp).
   - Reply input + "Resolve thread" toggle.
   - Approval control: three-state segmented button (Approve / Request changes / Pending) with optional note. Shows the current user's status plus a stacked avatar row of other reviewers' statuses.

2. **Slide wrapper integration** — add an optional `<SlideCommentLayer deckId="tech-deep-dive" slideId={slide.id} />` inside `SlideContainer`, `SalesSlideContainer`, and `PitchSlideContainer`. Rendered only when `deckId` prop is supplied by the parent page, so other decks are unaffected.

3. **Review dashboard** at `/review` — table of every (deck, slide) with: total comments, unresolved count, approval tally, last activity. Click row → deep-links to that slide with the drawer pre-opened.

4. **Top-bar indicator** in `AppSidebar` — small "Reviews" item under a new "Collaboration" group linking to `/review`, plus a global unread-comment badge.

### Pages wired in this change

- `/pitch-technical` (TechnicalDeepDive) — `deckId="tech-deep-dive"`
- `/platform-playbook`, `/coanalyst`, `/insights-playbook`, `/automation-playbook`, `/mobile-playbook`, `/dtop-playbook`, `/regulation-management` — each with its own `deckId`
- `/personas` (PersonaDeepDive) — uses `personaId` as `slideId`

Each page passes `deckId` down to its slide wrappers; slide IDs already exist in the `slides` arrays.

### Realtime

Enable Supabase Realtime on `slide_comments` and `slide_approvals` so reviewers see new comments/status changes live without refresh.

### Out of scope

- Drawing/markup over slide visuals (sticky-note overlays only, not freehand annotation).
- Email notifications — surfaced as a future enhancement once SMTP/Resend is wired.
- Export of comments to PDF.
- Editing slide content from comments — comments are advisory only.

## Technical notes

- Auth: `supabase.auth.signUp` with `emailRedirectTo: window.location.origin`, auto-confirm enabled so reviewers don't get blocked.
- Roles: `app_role` enum + `has_role()` SECURITY DEFINER function per the standard pattern.
- Drawer: shadcn `Sheet` component, right side, 400px wide, doesn't shift slide content.
- Comment counts fetched once per page load via a single aggregated query, then kept in sync via realtime subscription.
- All comment writes are validated client-side (zod: body 1–2000 chars, trimmed) and server-side via RLS + a length check trigger.

## Files touched

**New**
- `src/pages/Auth.tsx` — sign in / sign up
- `src/pages/ReviewDashboard.tsx` — `/review` overview
- `src/components/comments/SlideCommentLayer.tsx` — bubble + drawer
- `src/components/comments/CommentThread.tsx`
- `src/components/comments/ApprovalControl.tsx`
- `src/hooks/useSlideComments.ts` — fetch + realtime
- `src/hooks/useSlideApproval.ts`
- `src/hooks/useAuth.ts` — session + profile
- `src/contexts/AuthContext.tsx`

**Edited**
- `src/components/slides/SlideContainer.tsx`, `src/components/shared/SalesSlideContainer.tsx`, `src/components/shared/PitchSlideContainer.tsx` — accept optional `deckId`, render `SlideCommentLayer`
- `src/pages/TechnicalDeepDive.tsx`, `PlatformPlaybook.tsx`, `CoAnalystDeck.tsx`, `InsightsPlaybook.tsx`, `AutomationPlaybook.tsx`, `MobilePlaybook.tsx`, `DTOPPlaybook.tsx`, `RegulationManagementPlaybook.tsx`, `PersonaDeepDive.tsx` — pass `deckId` into slides
- `src/components/AppSidebar.tsx` — add Collaboration group with Reviews link + auth status
- `src/App.tsx` — add `/auth` and `/review` routes

**Database migrations**
- Create `app_role` enum, `profiles`, `user_roles`, `slide_comments`, `slide_approvals` tables
- `has_role()` SECURITY DEFINER function
- RLS policies on all four tables
- Trigger to auto-create profile row on signup
- Add `slide_comments` and `slide_approvals` to `supabase_realtime` publication

