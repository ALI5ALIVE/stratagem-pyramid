# Rewrite discovery-runbook narration as a two-voice played-out discovery session

Goal: turn the `se-discovery-call-runbook` narration from a coach explainer into a **dramatised, two-voice discovery call** — rep voice + customer voice, no timing references ("0–2 minutes", "10–35 minutes" etc.), compressed to ~2–3 minutes of audio.

## Scope

Three files. No UI/visual changes. No other slides touched.

### 1. `supabase/functions/elevenlabs-tts/index.ts`

Extend the existing endpoint to optionally accept a multi-voice script while keeping the current single-voice contract fully backward-compatible.

- Accept an optional `segments: Array<{ voiceId: string; text: string }>` in the request body **in addition to** the existing `{ text, voiceId }`.
- If `segments` is present: call ElevenLabs once per segment in sequence (same model + voice_settings as today), then concatenate the returned MP3 byte buffers into a single response body. MP3 frames concatenate losslessly, which is fine for our usage (manual-start playback bar, single `<audio>` element).
- Apply the same `DTOP` / `FOQA` text preprocessing per segment.
- If `segments` is absent, behave exactly as today.
- Return one `audio/mpeg` response either way.

### 2. `src/data/salesEnablementNarration.ts`

Extend the data shape and add a customer voice constant, then rewrite only the `se-discovery-call-runbook` entry to use segments.

- Add `CUSTOMER_VOICE` constant: ElevenLabs voice `XB0fDUnXU5powFXDhCwa` (Charlotte — distinct female voice, clear contrast with George).
- Extend `SESlideNarration` interface with an optional `segments?: Array<{ voiceId: string; text: string }>`. Keep `script` + `voiceId` required so nothing else breaks (used as fallback / for the speaker-notes panel display).
- For the discovery runbook entry:
  - Keep `script` as a single readable transcript (used by the speaker-notes panel) — but rewrite it as a played-out dialogue with `Rep:` / `Customer:` line prefixes, **no timings**, ending on a clear next step on the calendar.
  - Add `segments` mirroring that dialogue, alternating George (rep) and Charlotte (customer).

The dialogue compresses the runbook's five blocks into a single believable ~2-min call: open → frame (with the new "what's a signal?" definition baked in) → three discovery questions with realistic customer answers (decision lag, audit-evidence pain) → one objection ("just send a deck first") handled by trading → close with a named next step and date. No stage directions in audio, no "block headers", no minute markers.

### 3. `src/hooks/useSalesEnablementNarration.ts`

Update `fetchAudio` so that when the narration entry has `segments`, it posts `{ segments }` instead of `{ text, voiceId }`. Existing single-voice path unchanged.

## Out of scope

- Slide visuals / layout / the on-screen runbook itself
- Any other slide's narration
- Voice settings tuning
- Caching / streaming changes beyond what already exists
- New UI affordance for the dual-voice indicator

## Risk notes

- MP3 concat across separate ElevenLabs requests can leave a faint seam between speakers. Acceptable for this teaching context; if it sounds bad, fallback is to fold the dialogue into one voice with `Customer says:` framing — but we try the real two-voice version first.
- Total request latency scales with segment count (sequential calls). Dialogue is ~10–14 segments, so expect first-play to take a few extra seconds; cached thereafter via existing `cacheRef`.
