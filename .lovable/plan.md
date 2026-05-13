## Plan

1. **Fix the Practice Center Start failure**
   - Update `src/hooks/useRoleplaySession.ts` so the ElevenLabs session no longer sends the `firstMessage` override.
   - Keep the dynamic scenario prompt override, because the current error is specifically: `Override for field 'first_message' is not allowed by config.`

2. **Keep the buyer opening behavior**
   - Move the opening instruction into the system prompt only, so the agent still knows to greet the rep naturally without requiring the ElevenLabs agent to allow a `first_message` override.
   - Remove the now-unused `buildFirstMessage` import/call if it is no longer needed by the hook.

3. **Reduce user confusion in setup copy**
   - Update the Practice Center setup text so it only asks users to enable the prompt override, not `firstMessage` or `tts.voiceId`.

4. **Validate the fix**
   - Re-check the changed files and confirm the start flow no longer includes the disallowed override.
   - The expected result is that clicking Start should proceed past the current immediate rejection instead of showing `Override for field 'first_message' is not allowed by config.`