## Deliverable

One board-ready PDF — `Comply365_AI_Naming_Brief_v1.pdf` — saved to `/mnt/documents/` and surfaced as a downloadable artifact. No app/code changes.

### Structure (≈8 pages)

**1. Executive memo (1 page)** — forwardable to Kathrina / Chris / Neil
- Situation: UK TM opposition on "Comply365 CoAnalyst" + open Board question on AI brand architecture
- Recommendation: retire "CoAnalyst" externally; standardise on "Intelligence Layer" architecturally; land a proper persona name on top; keep DTOP as capabilities and slot Jobs-To-Be-Done agents under each DTOP stage
- Why now: market shift from "Co-" prefixes to named personas (Einstein, Joule, Now Assist, Opal)
- Ask: approval for a 60–90 day naming sprint under the convention in §2

**2. Three-tier naming convention (1 page + 1 diagram page)**
- Tier 1 — Platform: **Comply365**
- Tier 2 — Applications: SafetyManager365 · ContentManager365 · TrainingManager365
- Tier 3a — Intelligence Layer: one persona name (the AI brand)
- Tier 3b — Capabilities (the four DTOP stages of the layer):
  - **Detect** (Insights) · **Trigger** (Intelligence & Recommendations) · **Orchestrate** (Automation) · **Prove** (Outcomes & Audit)
- Tier 3c — **Agents = Jobs-To-Be-Done, slotted under the DTOP stage where the job lives**
- Rules: no "Co-" prefixes; no sub-brand collisions with applications; persona never verbed; DTOP stages are capabilities (never agents); every agent is named after the job, mapped to one DTOP stage, with an owning application

**3. Capabilities vs Agents — the JTBD model (1 page)**
- Capabilities = stages of the pipeline (what the layer *does*)
- Agents = named workers doing a Job-To-Be-Done a human would otherwise do
- Test: "Would a customer staff this role today?" Yes → agent. No → capability.
- Why DTOP stays as capabilities: it's the operating model, not a SKU shelf

**4. Agents under DTOP — worked examples (1 page, table)**

| DTOP stage | JTBD agent | The job (in 1 line) | Owning app |
|---|---|---|---|
| **Detect** | Safety Signal Agent | Surface emerging risk patterns across reports before they become events | SafetyManager365 |
| **Detect** | Fleet Risk Agent | Monitor operational data streams and flag fleet-level anomalies | SafetyManager365 |
| **Detect** | Reg Change Agent | Watch regulator feeds and flag changes that affect live manuals | ContentManager365 |
| **Trigger** | Root Cause Agent | Classify and cite the cause/root cause of an event at L4–5 accuracy | SafetyManager365 |
| **Trigger** | Compliance Review Agent | Assess a change against the regulatory framework and recommend actions | ContentManager365 |
| **Trigger** | Competency Gap Agent | Match incident patterns to training records and surface skill gaps | TrainingManager365 |
| **Orchestrate** | Authoring Agent | Draft the procedure/manual update from the recommended action | ContentManager365 |
| **Orchestrate** | Training Update Agent | Generate the matching training delta and route it to affected crew | TrainingManager365 |
| **Orchestrate** | Workflow Agent | Route the right task to the right person/system with SLAs | Platform |
| **Prove** | Audit Trail Agent | Assemble end-to-end evidence pack: signal → decision → change → outcome | Platform |
| **Prove** | Outcomes Agent | Quantify the value delivered and feed it back into the next Detect cycle | Platform |

Naming pattern locked: `[Job] Agent` — short, descriptive, role-based. Family name: "Comply365 Agents". Starter set above is the v1 catalogue.

**5. Naming shortlist for the Intelligence Layer (2 pages)**
- 12–15 candidates screened on ownability, sector fit, pronounceability, intelligence connotation, initial TM-class-9/42 desk risk
- Pools: navigation (Vector, Atlas, Beacon, Compass, Orbit, Tower, Horizon) · signal (Pulse, Sentry, Halo, Lumen, Echo) · crew (Crew, Captain, Cadre)
- Each: 1-line rationale + Green/Amber/Red risk flag
- Top 3 recommendation + 60–90 day path to formal UK/EU/US/Madrid clearance

**6. Appendix (1 page)**
- Competitor AI brand architectures (Salesforce/Einstein+Agentforce, SAP/Joule, ServiceNow/Now Assist, Optimizely/Opal) — table
- Risk register for staying with "CoAnalyst"

### How it will be produced

- Build with `reportlab` for tight control on the DTOP-agent matrix table
- Comply365 palette: dark navy background, `#0066FF` primary, DTOP colour bars (blue/amber/violet/emerald) on the agent table
- QA: render every page to JPG at 150 DPI, inspect for overflow/clipping/contrast, iterate until clean
- Output: `/mnt/documents/Comply365_AI_Naming_Brief_v1.pdf` with `<presentation-artifact>` tag

### Out of scope

- Formal legal TM clearance (flagged as required next step)
- In-product copy or deck edits
- Picking a final persona name — brief shortlists and recommends, Board/ELT decides
