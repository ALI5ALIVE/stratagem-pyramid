## Practice Center — Robustness & 20-user concurrency review

I reviewed `PracticeCenter.tsx`, `useRoleplaySession.ts`, the three edge functions (`elevenlabs-roleplay-token`, `elevenlabs-kb-sync`, `elevenlabs-roleplay-score`), and the persona/scenario data. Below are the concrete risks and the changes I propose. Nothing here changes the look of the page — it hardens it.

---

### Findings ranked by severity

**1. The token endpoint is unauthenticated → cost & abuse risk (HIGH).**
`elevenlabs-roleplay-token` accepts any `agentId` and mints an ElevenLabs signed URL. With 20 reps and no auth, anyone with the page URL (or anyone scraping it) can spin up unlimited voice sessions on our ElevenLabs bill.

**2. Knowledge-base sync is a destructive global action exposed to every user (HIGH).**
"Sync knowledge base" lists → deletes → recreates → patches the agent. If two reps click it within ~30s, one deletes documents the other just created and the agent ends up with a broken KB mid-call for everyone. This must not be in the rep UI.

**3. ElevenLabs concurrency cap is not surfaced (HIGH for 20 users).**
A single ConvAI agent has a workspace concurrency limit. If the plan caps at e.g. 10 concurrent calls, reps 11–20 get a cryptic "signed-url error 429/402" with no recovery path.

**4. Scoring fan-out can 429 the AI gateway (MEDIUM).**
If a class of 20 reps finishes within a minute and all click "Score session", `elevenlabs-roleplay-score` calls Lovable AI 20× simultaneously with no retry/backoff. Failures today surface as raw error strings.

**5. Page reload mid-session leaks an ElevenLabs slot (MEDIUM).**
There is no `beforeunload` handler — the WebSocket dies eventually but the slot stays warm for ~30s, blocking another rep.

**6. Scorecard is lost on refresh (MEDIUM UX).**
No persistence. A rep who refreshes after scoring loses their feedback. With 20 reps this is a guaranteed support ask.

**7. Layout is locked to `100vh - 260px` (MEDIUM UX).**
On laptops at 768–800px height the slide is squeezed; on mobile the column heights collapse. Needs a sane minimum.

**8. Mic-permission failure path is generic (LOW UX).**
A `NotAllowedError` shows "Failed to start session" rather than telling the rep how to enable the mic.

**9. No automated test of the flow (LOW).**
The hook has logic worth a unit test (start gating, transcript append, slide tracking, scoring guard).

---

### Plan (in this order)

**A. Lock down the token endpoint (HIGH).**
- Add JWT verification to `elevenlabs-roleplay-token`. The function reads the caller's `Authorization` bearer, calls `supabase.auth.getUser`, and rejects unauthenticated requests with 401.
- Wire Practice Center behind the existing app auth (the project already has `auth.users` + profiles + roles). If a visitor isn't signed in, the page shows a "Sign in to practice" gate instead of the workspace.
- This single change shuts down anonymous abuse.

**B. Move KB sync out of the rep UI (HIGH).**
- Remove the "Sync knowledge base" dropdown item from `PracticeCenter.tsx`.
- Gate `elevenlabs-kb-sync` to `has_role(auth.uid(), 'admin')` (the role table already exists). Only admins can touch the agent's KB.
- Add a thin admin-only page (or a simple button in an existing admin area) that calls the same function. Out of scope: building a full admin console — just the one button.

**C. Friendly error mapping for ElevenLabs failures (HIGH).**
- In `elevenlabs-roleplay-token`, classify ElevenLabs error responses:
  - 429 / "concurrency" → return `{ code: "BUSY", message: "All practice lines are in use right now — try again in a minute." }` (HTTP 503).
  - 402 / quota → return `{ code: "QUOTA", message: "Practice quota reached — please contact your admin." }` (HTTP 402).
  - other → return raw with HTTP 502.
- `useRoleplaySession.start` reads `code` and surfaces a one-line, actionable message with a "Retry" button in the transcript card.

**D. Scoring resilience (MEDIUM).**
- Add a small retry-with-jitter wrapper inside `elevenlabs-roleplay-score` (3 attempts on 429/5xx from the AI gateway, 0.5s/1s/2s + jitter).
- On the client, replace the raw `scoreError` text with a retry button + the same friendly classification.

**E. Page-unload cleanup (MEDIUM).**
- In `useRoleplaySession`, add `useEffect` that registers `beforeunload` and `pagehide` listeners that call `conversation.endSession()` synchronously and stop the mic tracks. Removes orphan slots.

**F. Persist the scorecard locally (MEDIUM).**
- Cache the latest scorecard + scenario id in `localStorage` keyed by `userId+scenarioId` so a refresh after scoring still shows it. No DB schema needed.
- Out of scope: server-side history/leaderboards (call out as a follow-up).

**G. Layout robustness (MEDIUM).**
- Replace `lg:h-[calc(100vh-260px)]` with `lg:h-[min(calc(100vh-220px),900px)] lg:min-h-[560px]` so very tall and very short laptops both look right.
- Below `lg`, restore the natural stacked flow (currently the heights collapse).

**H. Better mic-permission UX (LOW).**
- Catch `DOMException` from `getUserMedia` in `useRoleplaySession.start`; if `name === "NotAllowedError"` show: "Microphone blocked — click the lock icon in your address bar to allow microphone access, then try again."

**I. Smoke tests (LOW).**
- Add `useRoleplaySession.test.ts` (vitest) covering: start gating (no double-start), transcript append on `user`/`ai` source, `scoreSession` blocks on empty transcript, `trackSlide` dedupes consecutive duplicates.
- Add `PracticeCenter.test.tsx` rendering the page and asserting the "Start" button enables only when disconnected and the prep checklist hides during a connected session.

---

### Files touched

- `src/pages/PracticeCenter.tsx` — auth gate, remove KB-sync menu item, friendly error UI + retry, layout heights, scorecard restored from localStorage.
- `src/hooks/useRoleplaySession.ts` — beforeunload cleanup, mic-permission classification, error code handling, scorecard persistence.
- `supabase/functions/elevenlabs-roleplay-token/index.ts` — JWT verify, ElevenLabs error classification.
- `supabase/functions/elevenlabs-kb-sync/index.ts` — admin role check via `has_role`.
- `supabase/functions/elevenlabs-roleplay-score/index.ts` — retry-with-jitter on AI gateway calls.
- New: `src/pages/AdminKnowledgeBase.tsx` — single-button admin re-sync page (route protected by `has_role`).
- New: `src/hooks/useRoleplaySession.test.ts`, `src/pages/PracticeCenter.test.tsx`.

### Out of scope (call out, don't build now)

- Server-side session history table (would let managers see all reps' scores). Worth doing if the user wants leaderboards.
- ElevenLabs plan upgrade — a code change can't add concurrency; the user will need to confirm their plan supports ≥20 simultaneous ConvAI calls. I will surface this in the chat after step C ships.
- Audio recording playback.
- Per-user rate limiting on starts (per project guidance, no backend rate limiting primitives yet).

### Verification

- After A+B+C: try to invoke `elevenlabs-roleplay-token` with no auth → expect 401; admin-only KB sync → 403 for non-admins.
- After D+E+H: simulate denied mic, simulate 429 from EL by passing an invalid agentId, refresh during session.
- Run vitest suite from step I.
