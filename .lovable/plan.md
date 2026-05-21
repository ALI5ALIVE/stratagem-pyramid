## Fix

Remove the Vistair row from the W3 Competitive Cheat Sheet, and clean up the Vistair mention in the Objections cheat sheet so the deck no longer names Vistair anywhere.

**Edits — `src/data/week3FieldKit.ts` only:**

1. Delete the Vistair object in `competitiveCheatSheet` (lines 209–215). The remaining rows (Standalone SMS, Web Manuals / legacy Comply365, TMS-only, Generic AI, Build-our-own) stay in their current order.
2. In the Objections cheat sheet entry on line 299, change `"We have Vistair / legacy Comply365 for content."` to `"We have legacy Comply365 for content."` so the Vistair name is dropped without losing the objection. Acknowledge / reframe / bridge / proofArtifact stay as-is.

No component changes — `SECompetitiveCheatSheet` and `SEObjections` render from this data, so they update automatically. Narration scripts don't mention Vistair, so no narration edits needed.
