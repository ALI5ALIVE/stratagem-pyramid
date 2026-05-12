## Goal

Add a **Practice Center** where a salesperson can role-play a pitch (Executive Medium, Operational, Technical, CoAnalyst, or any playbook scenario) against an ElevenLabs Conversational AI agent that plays a customer stakeholder (CFO, COO, Head of Safety, IT Director, etc.). The agent is grounded in this app's existing pitch and playbook content so its objections, questions, and personality stay on-message.

## Yes — this is a great fit

ElevenLabs Conversational AI supports exactly this pattern:
- **Dynamic prompt injection** per session via `overrides.agent.prompt.prompt` and `firstMessage`
- **Client tools** so the agent can trigger UI actions (e.g. "show me the ROI slide", "end scenario", "score me")
- **WebRTC low-latency voice** with the existing `@elevenlabs/react` `useConversation` hook
- The `ELEVENLABS_API_KEY` secret is **already configured** in this project

## Architecture

```text
Practice Center page
   │
   ├── Scenario picker  (pitch deck × stakeholder persona × difficulty)
   │
   ├── Context builder  (assembles system prompt from existing narration + playbook data)
   │
   ├── Edge function: elevenlabs-roleplay-token
   │     - mints short-lived WebRTC conversation token
   │     - sends prompt overrides + firstMessage
   │
   └── Live session UI
         - mic + transcript + agent state
         - "End & Score" → second AI call rates the rep
         - optional save to Supabase for review
```

## Scenarios (initial set)

Built by combining one **deck** with one **persona**:

| Deck source | Personas (already in `personaProfiles.ts`) |
|---|---|
| Executive Pitch (Medium) | CFO, CEO, Chief Risk Officer |
| Operational Pitch | COO, Head of Safety, Head of Ops |
| Technical Deep Dive | CIO, Head of IT, Enterprise Architect |
| CoAnalyst Deck | Head of Safety + skeptical Data Officer |
| Any Playbook (DTOP, Insights, Mobile, Signals, Reg Mgmt, Automation, Platform) | Matching role from playbook |

Each combo has a **difficulty**: Friendly / Skeptical / Hostile — changes objection density and interruption style.

## Context grounding (no fine-tuning needed)

Build the agent system prompt at session start from existing files:
- Persona traits → `src/data/personaProfiles.ts`
- Pitch narrative + key claims → matching `*Narration.ts` file
- Product/positioning rules → memory: trust signals, terminology, CoAnalyst 90/35, DTOP, roadmap dates
- Forbidden terms → memory `terminology-rules`

The prompt is assembled client-side, sent through the edge function, and injected via `overrides`. This keeps the ElevenLabs agent generic and makes scenarios fully data-driven.

## New files

- `src/pages/PracticeCenter.tsx` — scenario picker + launcher
- `src/pages/PracticeSession.tsx` — live voice UI (mic, transcript, end/score)
- `src/components/practice/ScenarioCard.tsx`
- `src/components/practice/PersonaPicker.tsx`
- `src/components/practice/DifficultyToggle.tsx`
- `src/components/practice/LiveTranscript.tsx`
- `src/components/practice/SessionScorecard.tsx`
- `src/data/practiceScenarios.ts` — deck × persona × difficulty matrix
- `src/lib/practice/buildAgentPrompt.ts` — assembles system prompt from narrations + memory rules
- `src/hooks/useRoleplaySession.ts` — wraps `useConversation`
- `supabase/functions/elevenlabs-roleplay-token/index.ts` — mints WebRTC token (uses existing `ELEVENLABS_API_KEY`)
- Optional: `supabase/functions/elevenlabs-roleplay-score/index.ts` — sends transcript to Lovable AI Gateway for rubric-based scoring

## ElevenLabs setup (one-time, done by user in ElevenLabs dashboard)

1. Create one **Conversational Agent** (e.g. "Comply365 Sales Practice Partner")
2. Enable **Overrides**: `agent.prompt.prompt`, `agent.firstMessage`, `tts.voiceId`
3. Enable **Client tools**: `endScenario`, `requestScorecard` (optional)
4. Copy the `agent_id` → store as `VITE_ELEVENLABS_PRACTICE_AGENT_ID` build var (or hardcode publishable id)

## Live session flow

1. User picks deck + persona + difficulty → click **Start**
2. App builds system prompt and `firstMessage` (e.g. *"You're the CFO. Open by pushing back on cost…"*)
3. Edge function returns conversation token
4. `useConversation.startSession({ conversationToken, connectionType: "webrtc", overrides: { agent: { prompt, firstMessage }, tts: { voiceId } } })`
5. Real-time mic + transcript on screen
6. **End & Score** → transcript + rubric sent to Lovable AI (`google/gemini-2.5-flash`) → returns scorecard: discovery, objection handling, message accuracy, terminology compliance, next-step ask

## Optional persistence (Supabase)

Two tables (only if user wants history):
- `practice_sessions` (id, user_id, scenario_key, persona_key, difficulty, started_at, ended_at, score)
- `practice_transcripts` (session_id, role, text, ts)

With RLS: user reads/writes own; managers (`has_role(...,'admin')`) read team. Skipped in v1 unless requested.

## Navigation

Add **Practice Center** to the existing top nav next to Sales Enablement.

## Memory updates after build

- New memory: `mem://features/practice-center` — describes scenario matrix and grounding rules so future edits stay consistent

## Out of scope (v1)

- Multi-stakeholder calls (one persona at a time)
- Video / avatar
- Manager analytics dashboard
- Auto-graded certification

## Open questions to confirm before building

1. **Persistence**: save sessions + scores to Supabase, or v1 ephemeral only?
2. **Scoring**: include the auto-scorecard in v1, or just record + transcript?
3. **Access**: gate Practice Center behind login, or open like the rest of the decks?
4. **Agent voices**: one neutral voice for all personas, or map each persona to a distinct ElevenLabs voice id?
