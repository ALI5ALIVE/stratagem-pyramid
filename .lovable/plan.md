# Practice Center — declutter pre-call panels + richer scoring

## Part 1 — Trim the right column

Today the right column shows three permanent cards: Setup, Key messages, Scorecard. Concerns:

- **Setup** (one-line description) is redundant — the buyer card you just clicked already conveys the same intent ("CEO/COO · Strategic, revenue & systemic risk").
- **Key messages to land** is genuinely useful as a *prep* aid but if shown during the call it becomes a teleprompter — defeating the practice goal of recalling the messaging under pressure.
- **AI Scorecard** placeholder is just dead space until a session ends.

Change:
- **Remove Setup card entirely** — fold its sentence (if any value remains) into a `title` tooltip on the buyer chip.
- **Convert Key messages into a collapsible "Prep checklist"** that is:
  - Open by default *before* the session starts, so the rep can read the 4–5 messages they need to land.
  - Auto-collapses when the session connects, with a small "Reveal" link if they get stuck. This trains recall without being punitive.
  - After the session ends and the scorecard is generated, it re-opens with a green ✓ next to messages the AI judged "landed" and a red ○ next to ones in `missedKeyMessages`.
- **Hide the Scorecard card until** the session has ended (transcript exists + status is `disconnected`). Replace its placeholder slot with a single "Score session" button inline at the top of the transcript card once the call ends.

Net: right column shows 1 card during the call (transcript), 2 cards before/after (transcript + prep checklist + scorecard).

## Part 2 — Make scoring genuinely useful

The edge function `elevenlabs-roleplay-score` already grades 5 rubrics + strengths/improvements/missed messages via Gemini 2.5 Flash. It works but can be richer. Improvements, all backend-only:

1. **Persona-aware grading.** Pass the persona's `objections` and `decisionCriteria` into the system prompt so the model rewards persona-fit responses (e.g. CIO scenario should grade integration/security answers higher; Training scenario should grade adoption/competency answers higher).
2. **Slide coverage.** Pass the list of slide labels in the deck plus the slides the rep actually presented (we already know `currentSlide` over time — capture a `slidesShown: string[]` and forward it). New rubric line: `slideCoverage` (did they cover the right slides for this persona?).
3. **Per-objection grading.** Add a `objectionsAnswered: Array<{ objection, addressed: boolean, quality: 0-5, comment }>` block so the rep sees which specific pushbacks they handled well or fumbled. Drives the most actionable feedback.
4. **Quote-based evidence.** Ask the model to attach a short rep-quote to each rubric score (`"You said: 'we replace your safety system' — that's wrong, we integrate"`). Concrete > abstract.
5. **Coaching micro-script.** A new `coachingScript: string[]` array — 3 one-line drills the rep should rehearse next time. Practical homework, not just grades.
6. **Persistent history (optional, asks first).** Add a `practice_sessions` table (`user_id`, `scenario_id`, `persona_id`, `difficulty`, `transcript jsonb`, `scorecard jsonb`, `created_at`) so reps can see trend over time. Deferred — call out as a follow-up the user can opt into.

UI surface for the new fields:
- Existing rubric grid extends to include `slideCoverage`.
- New "Objections handled" sub-section under the rubric, one row per persona objection with ✓ / ◐ / ✗ + the model's quality score and one-line comment.
- New "Drill next time" section at the bottom of the scorecard with the 3-line coaching script.
- Each rubric row gets a small italic quote line under the feedback when present.

## Part 3 — Track which slides were shown

Tiny addition: `useRoleplaySession` keeps an internal `slidesShown` array, populated whenever `sendContext` fires from a slide change. Forward it to the scorer. No persistence yet.

## Files to touch
- `src/pages/PracticeCenter.tsx` — remove Setup card, collapsible Prep card with post-score check marks, gate Scorecard rendering, render new objection rows + drill section + quote lines.
- `src/hooks/useRoleplaySession.ts` — track `slidesShown`, forward to score endpoint, expose `slidesShown` in scorecard request.
- `supabase/functions/elevenlabs-roleplay-score/index.ts` — accept `persona`, `objections`, `slides`, `slidesShown`; add `slideCoverage`, `objectionsAnswered`, `coachingScript`, per-rubric `quote`; tighten system prompt for persona-fit.
- `src/lib/practice/buildAgentPrompt.ts` — export a small helper to expose the persona's `objections` to the score caller (or the page imports `personaProfiles` directly).

## Out of scope (call out, do not build)
- Persisting practice sessions in Supabase (Part 2.6) — only build if the user confirms they want history/trending.
- Audio-quality / pacing / filler-word analysis — would need ElevenLabs raw audio, separate scope.
- Leaderboards or team-level rollups.

## Answer to "is this necessary in the UI?"
- **Setup card**: no — remove.
- **Key messages**: yes, but only as a *pre-call* checklist that hides during the call and returns post-score with pass/miss marks.
- **Scorecard placeholder**: no — only show after the call ends.
