## Fix Persona Playbook → Customer Outcomes transition

The Persona Playbook narration currently closes by teeing up "the use case cheat sheet," but the next slide in the Sales Enablement deck order is actually **Customer Outcomes** (`se-slide-outcomes`, labelled "W3 · Customer Outcomes"). That mismatch is what the user is hearing as a broken transition.

**File:** `src/data/salesEnablementNarration.ts` (slide `se-persona-playbook`, line 391)

**Change the closing sentence:**
- From: *"Next we move into the use case cheat sheet — same discipline, applied to which use case to surface for which buyer."*
- To: *"Next we move into customer outcomes — what this actually changes for their business, in their language: schedule holds, revenue holds, costs come down, customers come back."*

This keeps the persona framing intact and hands cleanly into the four-card Signal → Action → Result walk on the Customer Outcomes slide. No other narrations need to change (the Customer Outcomes intro already opens on its own terms).