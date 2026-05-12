---
name: Practice Center
description: ElevenLabs voice role-play feature for sales reps to practice pitches against AI buyers
type: feature
---
Route: /practice-center. Sidebar group: Sales Enablement.

Architecture:
- src/pages/PracticeCenter.tsx — single-page picker + live session + scorecard
- src/data/practiceScenarios.ts — deck × persona × difficulty matrix
- src/lib/practice/buildAgentPrompt.ts — assembles system prompt from personaProfiles + matching narration file (executive/operational/technical/coanalyst/customerOverview/playbook prefix in PLAYBOOK_NARRATIONS)
- src/hooks/useRoleplaySession.ts — wraps @elevenlabs/react useConversation, WebRTC connectionType, injects overrides {agent.prompt, firstMessage, tts.voiceId}
- supabase/functions/elevenlabs-roleplay-token — mints WebRTC conversation token via ElevenLabs API (uses ELEVENLABS_API_KEY)
- supabase/functions/elevenlabs-roleplay-score — scores transcript via Lovable AI Gateway (google/gemini-2.5-flash)

Agent ID: stored in localStorage key `elevenlabs.practiceAgentId`. User must create a Conversational Agent in ElevenLabs dashboard with overrides enabled for prompt/firstMessage/tts.voiceId, then paste the agent_id into the Settings panel.

Persona ids reused from src/data/personaProfiles.ts: ceo-coo, vp-safety, vp-ops, training-director, cio-it.
Voice ids: only from approved ElevenLabs catalog (George/Sarah/Brian/Laura/Eric/Jessica).

When adding new scenarios: update practiceScenarios.ts only — prompt assembly is data-driven.
