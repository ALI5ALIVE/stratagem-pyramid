## Problem

ElevenLabs rejects the session with `Override for field 'voice_id' is not allowed by config.` because `useRoleplaySession.start()` passes `overrides: { tts: { voiceId: scenario.voiceId } }` but the configured ConvAI agent does not have the **TTS → Voice ID** override enabled. ElevenLabs requires every overridden field to be explicitly whitelisted in the agent's "Security / Overrides" settings, otherwise the whole session is refused.

We have two ways to make practice work again:

1. **Code-side fix (immediate, no dashboard change):** stop sending the `tts.voiceId` override. Every persona then speaks with the agent's default voice configured in ElevenLabs. We lose per-persona voices until the dashboard toggle is flipped.
2. **Dashboard fix (preserves per-persona voices):** in ElevenLabs → Agents → *(your agent)* → Security → Overrides, enable **TTS → Voice ID**. No code change needed.

Plan does both: ship the resilient code path now, document the dashboard toggle so per-persona voices come back as soon as it's enabled.

## Changes

### 1. `src/hooks/useRoleplaySession.ts`
- Read an opt-in flag from `localStorage` (`elevenlabs.allowVoiceOverride`, default `false`).
- Only include `overrides.tts.voiceId` when the flag is `true`. Otherwise call `Conversation.startSession({ connectionType, signedUrl, ... })` with **no `overrides` block** so ElevenLabs cannot reject it.
- When the SDK still surfaces an "Override for field … not allowed" error in `onError` / catch, set `errorCode = "OVERRIDE_BLOCKED"` and a friendly message: *"This ElevenLabs agent does not allow voice overrides. Ask an admin to enable TTS → Voice ID in the agent's Security settings, or continue with the default voice."*

### 2. `src/pages/PracticeCenter.tsx` (Settings panel)
- Add a small checkbox under the existing Agent ID input: **"Use per-persona voices (requires Voice ID override enabled in ElevenLabs)"**, bound to the same `localStorage` key.
- When `errorCode === "OVERRIDE_BLOCKED"`, render an inline alert in the live-session panel with a one-line instruction and a link-style hint to the ElevenLabs Security settings.

### 3. `mem/features/practice-center.md`
- Add a one-liner under the agent setup notes: *"To get per-persona voices, enable Security → Overrides → TTS → Voice ID on the agent. Otherwise leave 'Use per-persona voices' unchecked."*

## Out of scope

- No edge-function changes — the rejection happens client-side during the SDK handshake.
- No change to the persona/voice catalog itself.
- No automatic detection of which overrides the agent permits (ElevenLabs has no public endpoint for this today).

## How to verify

1. Reload `/practice-center` with the checkbox **off** → start a session → call connects, agent speaks with its default voice.
2. Enable **TTS → Voice ID** in the ElevenLabs agent dashboard, tick the checkbox, restart the session → buyer speaks in the per-persona voice.
3. Disable the dashboard toggle while the checkbox is still on → friendly `OVERRIDE_BLOCKED` alert appears instead of the raw SDK error.
