## Remove gated marketing cards from the homepage

Remove the two gated marketing entries from `src/pages/HomePage.tsx`:

- "Platform Overview — Industry Agnostic" (`/platform`)
- "Comply365.com Homepage — Redesign" (`/comply365-home`)

### Changes

**`src/pages/HomePage.tsx`**
- Delete those two entries from the `additionalResources` array.
- Remove now-unused icon imports (`Sparkles`, `Rocket`) only if no longer referenced — `Rocket` is still used by the "CEO Overview" card, so it stays. `Sparkles` is still used by "Insights & Recommendations", so it also stays. Net: no import changes needed.

### Out of scope (leave intact)
- Routes `/platform` and `/comply365-home` in `src/App.tsx` remain wired and password-gated, so direct links still work.
- `PasswordGate` component and the underlying pages are untouched.
- Sidebar navigation untouched.
