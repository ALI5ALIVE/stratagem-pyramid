

# Align Use Cases to Comply365 Connected Platform Value Proposition

## The Problem

Several use case methodologies currently describe generic operational improvements that don't clearly map to what Comply365 actually does (Safety, Content, and Training orchestration via DTOP). This undermines credibility — an airline VP would ask "how does a content and training platform reduce my AOG days?"

## Assessment: Each Use Case vs Comply365 Capabilities

| Use Case | Current Methodology | Alignment | Issue |
|---|---|---|---|
| UC1 Go-Arounds | "crew procedure orchestration and real-time decision support" | Partial | "Real-time decision support" implies cockpit systems — outside scope |
| UC2 AOG | "orchestrating cross-functional response" | Weak | Sounds like an OCC/MCC capability, not Safety/Content/Training |
| UC3 Flight Delays | "connected schedule, crew, and maintenance orchestration" | Weak | This is dispatch/OCC territory |
| UC4 Fuel Performance | "flight data monitoring to procedure and training orchestration" | Strong | Perfect DTOP example |
| UC5 Crew Injury | "proactive risk orchestration — detecting patterns" | Strong | Core safety management |
| UC6 Regulatory Fines | "gap between regulatory change and operational compliance" | Strong | Core content + compliance |
| UC7 Insurance | "compliance provable by default" | Strong | Core proof capability |
| UC8 Baggage | "ground operations, crew coordination, passenger systems" | Weak | Sounds like a ground ops system |

## Proposed Changes

### 1. Reframe Weak Methodologies

Rewrite UC1, UC2, UC3, and UC8 methodologies to explain how Comply365 creates the *conditions* for improvement through better procedures, targeted training, and safety signal closure — not through operational control.

### 2. Add `platformMechanism` Field to Each Use Case

A new string field that explicitly names the Comply365 capability chain, making the connected value clear. This maps each use case to the DTOP steps and the three domains (Safety, Content, Training).

### 3. Add `pointSolutionGap` Field

A string explaining what a point solution misses — demonstrating the incremental value of the connected platform.

## Detailed Rewrites

### UC1: Go-Around Events
- **Current methodology**: "We reduce go-around frequency through improved crew procedure orchestration and real-time decision support."
- **New methodology**: "We reduce go-around frequency by connecting FOQA trend detection to procedure updates and targeted crew training — closing the loop between what's detected and what's trained."
- **platformMechanism**: "Detect (FOQA exceedance trends) -> Trigger (procedure review) -> Orchestrate (targeted sim training for high-risk crews) -> Prove (reduced recurrence rate)"
- **pointSolutionGap**: "A standalone safety tool detects the trend. A standalone LMS delivers training. Only the connected platform ensures the right crews get the right training based on the specific procedural gap identified."

### UC2: AOG and Unscheduled Maintenance
- **Current methodology**: "We accelerate recovery by orchestrating cross-functional response — reducing grounding duration and cost impact."
- **New methodology**: "We reduce unscheduled groundings by ensuring maintenance procedures reflect latest airworthiness directives, engineers are trained on current MEL/CDL changes, and compliance gaps are detected before they ground aircraft."
- **platformMechanism**: "Detect (AD/SB compliance gap or recurring MEL item) -> Trigger (procedure and job card update) -> Orchestrate (engineer competency verification) -> Prove (airworthiness compliance evidence)"
- **pointSolutionGap**: "A content system publishes the updated procedure. A TMS tracks who completed training. Only the connected platform verifies the procedure was updated, the right engineers were trained, and the compliance evidence is audit-ready — before the aircraft is grounded."

### UC3: Flight Delays and OTP
- **Current methodology**: "We reduce delay propagation through connected schedule, crew, and maintenance orchestration."
- **New methodology**: "We reduce procedural and training-driven delays by ensuring ground handling, turnaround, and dispatch procedures are current, crew are trained on latest SOPs, and deviations trigger corrective action automatically."
- **platformMechanism**: "Detect (delay root cause analysis reveals procedural non-compliance) -> Trigger (SOP update for ground ops) -> Orchestrate (crew briefing and training update) -> Prove (reduced recurrence of same-cause delays)"
- **pointSolutionGap**: "An OTP dashboard shows you're late. Only the connected platform traces delay causes back to procedural gaps, triggers the right SOP update, retrains affected crews, and proves the fix worked."

### UC4: Fuel Performance -- No Change Needed
Already well-aligned. Perfect DTOP example.

### UC5: Crew and Passenger Injury -- Minor Refinement
- **New methodology**: "We reduce injury recurrence by connecting safety reports to root-cause analysis, triggering procedure updates and targeted crew training — with full evidentiary proof of the corrective action cycle."
- **platformMechanism**: "Detect (ASAP/injury report pattern) -> Trigger (hazard assessment and procedure review) -> Orchestrate (crew safety briefing and competency check) -> Prove (corrective action closure with audit trail)"
- **pointSolutionGap**: "A safety tool logs the incident. Only the connected platform ensures the corrective action flows through to updated procedures, verified crew training, and documented proof of closure."

### UC6: Regulatory Fines -- Minor Refinement
- **New methodology**: "We eliminate the gap between regulatory change and operational compliance by automatically triggering procedure updates, retraining affected personnel, and generating audit-ready evidence of implementation."
- **platformMechanism**: "Detect (regulatory change or audit finding) -> Trigger (affected procedure identification) -> Orchestrate (content update, training assignment, acknowledgement tracking) -> Prove (complete implementation evidence for regulator)"
- **pointSolutionGap**: "A compliance tracker flags the change. Only the connected platform cascades it through every affected procedure, retrains every affected person, and proves it to the regulator — automatically."

### UC7: Insurance Premiums -- Minor Refinement
- **New methodology**: "We reduce premium escalation by providing insurers with continuous, auditable proof of safety management effectiveness — not just incident data, but evidence of corrective action closure and training compliance."
- **platformMechanism**: "Detect (claims trend or risk indicator) -> Trigger (safety programme review) -> Orchestrate (enhanced training and procedure controls) -> Prove (portfolio of evidence for underwriter review)"
- **pointSolutionGap**: "Insurers see incident counts from any safety tool. Only the connected platform shows them the closed loop: what you detected, what you changed, who you retrained, and that it worked."

### UC8: Baggage and Passenger Misalignment
- **Current methodology**: "We connect ground operations, crew coordination, and passenger systems to reduce mishandling at source."
- **New methodology**: "We reduce mishandling by ensuring ground handling procedures are current, ramp crews are trained on latest processes, and deviations detected through operational reports trigger targeted retraining."
- **platformMechanism**: "Detect (mishandling trend in operational reports) -> Trigger (ground handling SOP review) -> Orchestrate (ramp crew training on updated procedures) -> Prove (reduced mishandling rate with training completion evidence)"
- **pointSolutionGap**: "A baggage tracking system tells you bags are lost. Only the connected platform traces it to a procedural or training gap and closes the loop."

## Technical Implementation

### File: `src/data/lineOfSightData.ts`

1. Add two new fields to the `UseCase` interface:
   - `platformMechanism: string` -- the DTOP chain
   - `pointSolutionGap: string` -- what point solutions miss

2. Update `methodology` text for UC1, UC2, UC3, UC5, UC6, UC7, UC8

3. Populate `platformMechanism` and `pointSolutionGap` for all 8 use cases

### File: `src/components/slides/SlideLineOfSight.tsx`

Display the new fields in the use case detail/expanded view:
- Show `platformMechanism` as a small DTOP chain visual (four steps with arrow connectors)
- Show `pointSolutionGap` as a subtle callout below the methodology text
- Keep the layout compact — these are secondary detail, not primary

### File: `src/components/slides/BalancedScorecard.tsx`

No changes needed — the scorecard consumes computed values, not methodology text.

## Summary

This alignment ensures every use case in the Line of Sight model answers: "How does Comply365 specifically improve this, and why can't a point solution do the same?" — grounding the entire value calculator in the connected platform's actual capabilities across Safety, Content, and Training.

