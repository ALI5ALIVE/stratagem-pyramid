

# Executive, Operational & Technical Pitch Feedback — Action Plan

This covers all feedback points across the three decks, organized by theme.

---

## Theme 1: Trust Bar Stats (Exec 00 + 07)
**Feedback**: "7/10 US carriers" may alienate non-customers. Numbers need revalidation.

**Changes**:
- **`ExecSlide0Title.tsx`** (lines 5-9): Replace trust stats with more inclusive framing — e.g., "500+ Customers", "20+ Years Aviation", "300K+ Frontline Users" (or mark as TBC). Remove "7/10 NA Carriers."
- **`ExecSlide6WhyUs.tsx`** (lines 33-37): Same trust stats in footer — mirror the title slide changes.

---

## Theme 2: Exec 01 — "Not Exhaustive" Caveat
**Feedback**: Flag that the cost waterfall is a sample of highest-cost, most addressable issues — not an exhaustive list.

**Changes**:
- **`ExecSlide1Problem.tsx`** (line 89): Update the bottom callout text to add: "A sample of the highest-cost, most addressable operational issues — not an exhaustive list. Customisable to your operation."

---

## Theme 3: Replace Hard Landing Example with Dangerous Goods (Exec 03, Ops 06, Tech 05)
**Feedback**: Hard landing uses FOQA (not integrated today), implies targeting individuals (union pushback). Replace with "Dangerous Goods Incidents" — detection of procedural pattern (e.g., cold weather), trigger is procedure review, orchestrate updates and training, prove decline in incidents.

**Changes**:
- **`ExecSlide3DTOP.tsx`** (lines 9-38): Replace all 4 DTOP steps with Dangerous Goods example:
  - Detect: "Pattern of dangerous goods procedural non-compliance identified — correlated with seasonal/cold weather conditions"
  - Trigger: "Procedural review initiated for DG handling procedures"
  - Orchestrate: "Updated procedures published, targeted training assigned to ground handling and cabin crew"
  - Prove: "Measurable decline in DG incidents within 90 days"
  - Update the use case label pill (line 68) from "Hard Landing → Retraining" to "Dangerous Goods → Procedure Update → Reduced Incidents"

- **`OpsSlide6NearTermUseCases.tsx`** (lines 11-21): Replace "Hard Landing → Retraining" card with "Dangerous Goods → Procedure Update":
  - detect: "Pattern of DG handling issues identified — correlated with seasonal conditions"
  - trigger: "Procedural review initiated for DG handling SOPs"
  - orchestrate: "Updated procedures published, ground crew retrained"
  - prove: "Measurable decline in DG incidents within 90 days"

- **`TechSlide5DTOP.tsx`** (lines 10-13): Replace hard landing audit trail examples with Dangerous Goods equivalents throughout all 4 steps.

---

## Theme 4: Remove/Replace FOQA References Where We Can't Demonstrate It
**Feedback**: We don't integrate with FOQA today. Remove FOQA from detect sections and data source lists where it implies current capability.

**Changes**:
- **`OpsSlide4DTOP.tsx`** (line 15): Safety Manager desc — change "SMS reporting, FOQA/FDM ingestion, audit & hazard management" → "SMS reporting, flight data analysis, audit & hazard management"
- **`OpsSlide4DTOP.tsx`** (line 43): Detect step description — remove "flight data" from signal list or soften to "safety reports, operational data, maintenance logs, crew feedback, and regulatory changes"
- **`TechSlide5DTOP.tsx`** (line 10): Detect description — change "FOQA, safety reports" → "safety reports, operational data"
- **`TechSlide5DTOP.tsx`** (line 16): Remove "FOQA/FDM" from dataSources array, replace with "Operational Data"
- **`TechSlide1StrategicShift.tsx`** (line 25): Change "12K+ monthly signals across FOQA, reports, audits" → "12K+ monthly signals across safety reports, audits, training records"
- **`TechSlide4aSafetyManager.tsx`**: Change "FOQA/FDM Ingestion" capability label to "Flight Data Analysis" (keeps the capability without implying current FOQA integration)

---

## Theme 5: "Generic AI" → "Generative AI" (Exec 05, Ops 05)
**Feedback**: The comparison should be against "Generative AI" not "Generic AI."

**Changes**: Global find-and-replace across all slides that say "Generic AI" → "Generative AI":
- **`ExecSlide4Intelligence.tsx`** (lines 51, 57, 89-90)
- **`OpsSlide5Intelligence.tsx`** (lines 44, 49, 97)
- **`OpsSlide10WhyUs.tsx`** (line 21)
- **`TechSlide7CoAnalyst.tsx`**, **`TechSlide8IntelligenceTiers.tsx`**, **`TechSlide9VsGenericAI.tsx`**
- **`CASlide8VsGenericAI.tsx`**, **`CASlide10ObjectionHandling.tsx`**, multiple other CoAnalyst slides
- Subtitle text on intelligence slides: "that generic tools can't replicate" → "that generative AI can't replicate"

---

## Theme 6: Exec 06 — Fuel Cost Avoidance in Line of Sight Slide
**Feedback**: The CFO outcome card still references fuel cost avoidance and FOQA-to-training pipelines.

**Changes**:
- **`ExecSlide5Value.tsx`** (lines 14-17): Replace CFO "Fuel Cost Avoidance" outcome with a more defensible framing — e.g., "Compliance Cost Avoidance" or "Operational Cost Reduction" with scenario referencing regulatory findings, incident costs, and training efficiency rather than fuel.

---

## Theme 7: Ops 01 — Reframe Inbox with Internal Platform Signals
**Feedback**: The inbox should show cross-departmental requests coming from within the platform, not external signals. Examples: "Procedure revision requires approval", "Overdue audit finding notification", "Training renewal — bid for simulator slots", etc.

**Changes**:
- **`OpsSlide1DailyReality.tsx`** (lines 11-17): Replace the 5 `inboxItems` with internal platform-originated requests:
  1. "Procedure Revision" / "SOP-ENG-42 revision update requires your approval" / Content Manager365
  2. "Overdue Audit Finding" / "Finding #2847 — corrective action overdue by 12 days" / Safety Manager365
  3. "Training Renewal" / "Type rating renewal due — bid for simulator slots required" / Training Manager365
  4. "Risk Control Review" / "Your input required for risk control effectiveness review" / Safety Manager365
  5. "Regulation Revision" / "EASA AD 2026-0034 — new update requires review for applicability" / Content Manager365

  Update source badges from "SMS/Email/Spreadsheet" to module names. Update the pain points strip to reflect cross-departmental coordination friction rather than external system chaos.

---

## Theme 8: Tech 05 — "Corrective Action" → "Recommended Action"
**Feedback**: Implies autonomous action without human in the loop. Should be "Recommended Action."

**Changes**:
- **`TechSlide5DTOP.tsx`** (line 13): Change "corrective action cycle" → "recommended action cycle"
- **`TechSlide4aSafetyManager.tsx`** (line 20): Change "Corrective Action" → "Recommended Action" in the CoAnalyst pipeline step
- **`TechSlide4cTrainingManager.tsx`** (line 20): Change "proving corrective action worked" → "proving recommended action worked"
- **`TechSlide6Capabilities.tsx`** (line 16): Change "Automated corrective action workflows" → "Automated recommended action workflows"
- **`TechSlide14MaturityRoadmap.tsx`** (line 66): Change "Corrective actions drive controlled change" → "Recommended actions drive controlled change"
- **`OpsSlide4DTOP.tsx`**: Update CoAnalyst description (line 111) — change "corrective action" → "recommended action"

---

## Summary

| # | Theme | Files Affected |
|---|-------|----------------|
| 1 | Trust bar revalidation | 2 files |
| 2 | "Not exhaustive" caveat | 1 file |
| 3 | Hard Landing → Dangerous Goods | 3 files |
| 4 | Remove FOQA references | 4 files |
| 5 | Generic → Generative AI | ~12 files |
| 6 | Fuel cost avoidance reframe | 1 file |
| 7 | Inbox reframe (internal signals) | 1 file |
| 8 | Corrective → Recommended Action | 6 files |

**~20 files modified. No routing or structural changes.**

