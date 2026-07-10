Grant `pete@tomorrow-people.com` the `owner` role so they have full editorial access (plan, brief, generate, approve).

## Steps
1. Look up the user id for `pete@tomorrow-people.com` in `auth.users`.
2. Run a migration inserting `(user_id, 'owner')` into `public.user_roles` with `ON CONFLICT DO NOTHING`. (Keeps existing `reviewer` row; `useEditorialRole` prefers owner.)

## Notes
- If the email doesn't exist yet, ask Pete to sign up at `/auth` first, then re-run.
- Using `owner` (not `editor`) so they can also see admin-only surfaces. Confirm if you'd prefer `editor` instead.