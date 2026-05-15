# DTOP Deep-Dive Section — Replace cards with 4 text+image rows

On `/platform-mockup`, replace the existing 4-card DTOP grid (Section 5) with **4 alternating text+image rows** — one per step — that bring the operating loop to life using capability language (Insight & Intelligence, Automation, Recommendations & Prescriptive Actions, Evidence).

## Section structure

Keep the section header ("How the Loop Closes" / "Detect → Trigger → Orchestrate → Prove") and intro paragraph. Below it, render 4 alternating rows (image left / image right, zigzag) with a vertical accent bar in the step's color (D blue · T amber · O violet · P emerald).

Each row contains:
- Step letter badge + step name + capability sub-label
- Headline (what happens in plain English)
- Body paragraph (what the platform actually does)
- 3 bullet capabilities tied to that step
- Mini outcome chip (the "so what")
- Image (1200×800, generated)

## Copy

### D — Detect · Insight & Intelligence
**Headline:** Always-on sensing across every operational signal.
**Body:** Operational data, safety reports, audits, ops feeds, training records and content updates flow into one connected data model. The Intelligence Layer — trained on your domain, not the open web — reads them in context at ~90% accuracy and surfaces the signals that actually matter.
**Capabilities:**
- Cross-source signal fusion (ops · safety · training · content)
- Domain-trained classification at L4–5 maturity
- Pattern detection across fleets, bases and time windows
**Outcome chip:** From noise to a ranked list of what to act on.
**Image brief:** Dark UI cockpit-style dashboard, multiple incoming signal streams converging into a ranked alert list, blue accent glow.

### T — Trigger · Automation
**Headline:** The right workflow starts itself.
**Body:** When a signal crosses threshold, the platform doesn't email someone — it instantiates the response. Tasks are routed to the right role, with the right context, on the right device, with the right SLA clock running. No inbox archaeology, no waiting for the weekly meeting.
**Capabilities:**
- Policy-driven workflow instantiation
- Role- and competency-aware routing
- SLA, escalation and cross-team handoff built in
**Outcome chip:** Hours, not weeks, from signal to first action.
**Image brief:** Workflow canvas with a glowing trigger node firing into branching task cards routed to pilot, ops controller and trainer avatars, amber accent.

### O — Orchestrate · Recommended Actions & Prescriptive Guidance
**Headline:** Content, training and compliance move together — not in sequence.
**Body:** The Intelligence Layer recommends the next best action and orchestrates it across modules: ContentManager365 issues the bulletin, TrainingManager365 assigns the micro-module to the affected crew, SafetyManager365 opens the investigation — all linked to the same root signal, all running in parallel.
**Capabilities:**
- Cross-module recommended actions with prescriptive guidance
- Parallel execution across content, training, safety
- Human-in-the-loop approval at every step
**Outcome chip:** One signal, one coordinated response, three modules in lockstep.
**Image brief:** Three module windows (Content, Safety, Training) connected by a single violet thread of light, each window showing a synchronized action card.

### P — Prove · Evidence by Default
**Headline:** Every action logged as it happens. Audit-ready by default.
**Body:** Detection, decision, action and outcome are stitched into a single timeline per signal. When the regulator asks "what did you do and when," the answer is one click — not a six-week scramble through five systems.
**Capabilities:**
- Immutable signal-to-outcome timeline
- Regulator-ready exports (EASA, FAA, MoD, ORR formats)
- Closed-loop measurement: did the action move the metric?
**Outcome chip:** Compliance becomes a by-product of operating well.
**Image brief:** Vertical timeline UI showing a single signal traced across Detect → Trigger → Orchestrate → Prove with timestamps, an "Audit-ready" badge and an emerald accent.

## Technical changes

- Edit `src/pages/PlatformMockup.tsx` — Section 5 only
  - Remove the 4-card grid (lines ~146–158)
  - Add 4 alternating text+image rows below the section header
  - Keep header/intro
- Generate 4 images into `src/assets/platform-mockup/`:
  - `dtop-detect.jpg` (1200×800)
  - `dtop-trigger.jpg` (1200×800)
  - `dtop-orchestrate.jpg` (1200×800)
  - `dtop-prove.jpg` (1200×800)
- Use existing semantic tokens; per-step accent borders use the locked DTOP color mapping (blue/amber/violet/emerald) consistent with the rest of the project.
- Lazy-load all 4 images.
- No nav, route, data or business-logic changes.

## Out of scope

- No edits to the Intelligence Layer section further down (it stays as the ~90% vs ~35% block).
- No changes to the platform diagram or Three Modules section.
- No PPTX exporter changes.
