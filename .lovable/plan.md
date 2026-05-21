## Fix LMS → TMS in narration

One remaining mention of "L-M-S" in the sales enablement narration segments needs to be changed to "T-M-S" so the spoken audio matches the rest of the deck (which uses TMS throughout).

**File:** `src/data/salesEnablementNarration.ts` (line 362)

**Change:**
- `"...then our content system, then the L-M-S..."` → `"...then our content system, then the T-M-S..."`

Note: the parent narration script on line 332 already says "TMS" — only the per-voice customer segment on line 362 still says L-M-S. After this fix, no other LMS/learning-management references remain in `src/`.