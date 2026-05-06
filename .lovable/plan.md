# Medium Pitch — Talk Track & Slide Fixes (per Kathrina's email)

All changes target the Medium / Executive Pitch 3 deck. Numbering below uses the slide numbers from the email; mapped IDs in this codebase are in parentheses.

## 1. Narration edits — `src/data/executivePitchNarration.ts`

**#11 Insights & Intelligence (`exec3-slide-insights-summary`)**
Strengthen the 90% vs 35% explanation using CoAnalyst playbook language. Add a lay-friendly framing, e.g.:
> "Unlike generic AI tools — which hallucinate at granular aviation categorisation — and unlike competitor bolt-on AI features limited to basic summarisation, CoAnalyst delivers aviation-specific precision built on a hybrid AI architecture, millions of historic reports, and continuous R&D. In plain terms: ask 'show me the bird-strike trend at our top three hubs' and CoAnalyst returns the right answer with sources — where a generic model would mis-classify the events and miss the cluster entirely."

**#12 Domain Intelligence vs Generic AI (`exec3-slide-tiers-vs-ai`)**
Re-weave the Level 1–2–3 vs Level 4–5 description from CoAnalyst playbook slide 8 (stronger framing) into the existing script. Keep the "ends the build-or-buy debate" hook and the closing transition.

**#13 Recommendations & Prescriptive Actions (`exec3-slide-insights`)**
Remove the sentence: *"This is where we are heading on the 2026 roadmap, and it is the difference between a smart platform and a control surface for your operation."* — keep the rest of the script, including the Tuesday-morning scenario.

**#15 Regulation Management (`exec3-slide-regulation`)**
Remove the CoAnalyst reference. Rephrase the line *"CoAnalyst maps it against your procedure library…"* to attribute the mapping to the platform's domain intelligence (without naming CoAnalyst), e.g. "the platform maps it against your procedure library and identifies every affected document."

**#17 2026 Phased Roadmap (`exec3-slide-roadmap-2026`)**
Remove the phrase *"on dates we'll commit to in the contract"* from the closing line.

## 2. Roadmap slide — `src/components/tech-slides/TechSlide15Roadmap2026.tsx`

In the **H1 2026** column, strengthen the POC callouts. Replace the two existing POC items with:
- `✅ Platform Proof of Concept — Automation (Intelligence & Orchestration Layer)`
- `✅ Platform Proof of Concept for Future Vision — Platform-wide Insights & Recommendations (Intelligence & Orchestration Layer)`

(Order/icons unchanged; only text wording updated.)

## 3. Why Comply365 — `src/components/tech-slides/TechSlideWhyComply.tsx`

Under **Connected Foundation**, change `"One data model, three core apps, …"` → `"One Connected Data Model, three core apps, …"`.

Mirror the same wording in the `exec3-slide-why` narration script (`"Safety, content, and training share one data model"` → `"…share one connected data model"`).

## 4. PDF download — Medium Pitch only

The customer reports blank slides + small fonts in the downloaded PDF. Two options to choose between (will ask before implementing):

- **A. Hide the PDF button on the Medium Pitch** (revert ExecutivePitch3 title slide to PPTX-only). Fastest, matches Kathrina's preference ("perhaps we do not provide the PDF download version").
- **B. Investigate & fix** — diagnose blank-slide capture and font scaling in `DeckPDFExportButton` / per-slide off-screen render, then keep the button. Higher effort, unknown root cause until inspected.

Default recommendation: **A** for now (matches stakeholder request), and log a follow-up to fix the PDF exporter for all decks.

## Out of scope
- Changes to other decks (Customer Overview, Operational, CoAnalyst, Roadmap, Sales Enablement) — Kathrina's note is Medium-Pitch-specific.
- Re-recording / pre-generating ElevenLabs audio — narration is fetched at play time, so script edits take effect on next play.
- Memory updates (the 90% vs 35% headline and roadmap dates already match locked memories; no rule changes needed).

## Open question before I implement
Do you want option **A** (hide the PDF button on the Medium Pitch) or option **B** (investigate the PDF blank-slides/font issue)?
