## Add Forgot Password to Academy Sign-in

### Changes

1. **`src/pages/Auth.tsx`** — Add a "Forgot password?" link below the password field (sign-in mode only). Add a third mode `"forgot"` with an email-only form that calls:
   ```ts
   supabase.auth.resetPasswordForEmail(email, {
     redirectTo: `${window.location.origin}/reset-password`
   })
   ```
   Show a toast confirming the reset email was sent and return to sign-in view.

2. **`src/pages/ResetPassword.tsx`** (new) — Public page that:
   - Detects the recovery session from the URL hash (Supabase handles it via `onAuthStateChange` `PASSWORD_RECOVERY` event).
   - Shows a "new password" + "confirm password" form.
   - Calls `supabase.auth.updateUser({ password })`.
   - On success, signs out and redirects to `/auth` with a success toast.

3. **`src/App.tsx`** — Register `/reset-password` as a public route.

### Notes
- No DB or RLS changes needed.
- Uses existing `Card`, `Input`, `Button`, `Label`, `toast`, and `zod` validation patterns already in `Auth.tsx`.
- The `/reset-password` route must be public (not behind `RequireAuth`) so the recovery link works.
