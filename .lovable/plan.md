## Goal
Move the two marketing cards from "Customer Pitch Decks" to "Additional Resources" on the Command Centre home, and password-protect their routes (`/platform` and `/comply365-home`) using the documented CoAnalyst-style client-side gate (password: `comply2025`, sessionStorage unlock).

## Changes

### 1. New reusable component — `src/components/shared/PasswordGate.tsx`
- Wraps children. If unlocked (sessionStorage key `lovable_gate_unlocked = "1"`), renders children.
- Otherwise shows a centered dark card: title "Restricted preview", password input, Unlock button, small "Back to home" link.
- On correct password (`comply2025`) sets sessionStorage and reveals content. Wrong password shows inline error.
- Single shared key so unlocking once unlocks both gated routes for the session (matches existing CoAnalyst behavior described in memory).

### 2. `src/App.tsx` — wrap the two routes
```
<Route path="/platform" element={<PasswordGate><PlatformOverview /></PasswordGate>} />
<Route path="/comply365-home" element={<PasswordGate><Comply365Home /></PasswordGate>} />
```

### 3. `src/pages/HomePage.tsx` — re-shelve the two cards
- Remove the two inline `DeckCardComponent` cards (`Platform Overview — Industry Agnostic` and `Comply365.com Homepage — Redesign`) from the **Customer Pitch Decks** grid.
- Add them to the `additionalResources` array so they render in the **Additional Resources** section. Update each card's `badge` to append a small lock indicator (e.g. `Marketing page · self-serve · 🔒`) and keep their existing icons/accents.

## Out of scope
- No backend auth, no RLS, no DB changes.
- No styling rework of either destination page.
- The CoAnalyst route already references the same gate concept in memory; this plan does not touch CoAnalyst.

## Notes
- Client-side gate is intentionally a soft barrier (already accepted per `mem://security/access-barrier`); not a real security control.