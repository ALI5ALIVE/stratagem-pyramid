## Goal

Align the Week 2 use-case slide copy verbatim with the source the user supplied. Visuals stay; only string content changes.

## Audit vs. source

**Intelligence & Insights — Per-Solution** (`SECapabilityUseCases`, capability `intelligence`): already matches. No change.

**Automation — Use Cases** (`SECapabilityUseCases`, capability `automation`):
- Card 1 "Trigger Training Updates on Procedure Revision" — expand body to: *"When a new revision of a procedure is published, send a notification to owners of linked training modules to inform them of the revision. Create a task in TrainingManager365 to perform a review and carry out updates."* Keep the "One step in the DTOP cycle." note.
- Card 2 "Trigger Document Updates on Regulation Amendment" — expand body to: *"When a new revision of a regulation is published, trigger a new draft of related procedures with AI-generated content updates — which in turn triggers a document-owner review."* Keep the "Another step in the DTOP cycle." note.
- Card 3 "Trigger Risk Control Review on Deteriorating Training Results" — adjust body to: *"When training evaluations fall below a pre-determined threshold, trigger a risk review in SafetyManager365 for the risk controls linked to the associated training module."* No DTOP note (user didn't supply one).

**Recommendations & Prescriptive Actions** (`SECapabilityUseCases`, capability `recommendations`):
- Per-Solution Content card — change to: *"Based on how users are searching our OMA, what updates do you recommend to make search quicker and easier?"*
- Per-Solution Training card — change to: *"What updates would you recommend to our Dangerous Goods training to improve engagement statistics?"*
- Per-Solution Safety card — change to: *"What risk controls would you recommend to mitigate against unstable approach at location X?"* (adds "against").
- Platform cards already match — no change.

**Intelligence & Insights — Platform-Wide Use Cases** (`SEPlatformWideIntelligenceUseCases`): all three cards already match the user's source. No change.

## Edits

Single file: `src/components/sales-enablement-slides/SECapabilityUseCases.tsx` — update the `body` strings for the 3 Automation cards and 3 Recommendations per-solution cards as listed above.

## Out of scope

- No layout, narration, slide order, Week 1, Week 3 or PPTX exporter changes.
- Narration scripts already reference these use cases at the conceptual level; no script rewrite needed.
