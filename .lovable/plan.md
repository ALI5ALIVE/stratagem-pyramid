# Rewrite Medium Executive Pitch Narration

## The problem

The current `exec3PitchNarrations` in `src/data/executivePitchNarration.ts` is written as **internal coaching notes for the rep** — phrases like "This is your reality check", "Walk the before column slowly", "Pick the case that matches…", "Land the proof point". When played as TTS to a customer, it sounds like stage directions, not a pitch.

Two further issues:
1. **Narration is misaligned with the actual deck.** `ExecutivePitch3.tsx` has 19 slides in a specific order (Title → Strategic Shift → Customer Outcomes → Platform → DTOP divider → DTOP → Mobile divider → Mobile → Intelligence divider → Automation → Insights summary → CoAnalyst → CoAnalyst vs Generic AI → Recommendations → Regulation divider → Regulation → Roadmap divider → Roadmap → Why Comply365). The narration file still references old slide IDs (`exec3-slide-2`, `exec3-divider-core`, `exec3-slide-4a/b/c`, `exec3-slide-transformation`, `exec3-slide-usecases`, `exec3-slide-maturity`) that no longer exist in the deck, and is missing scripts for the new ones (`exec3-slide-outcomes` as slide 3, `exec3-slide-insights-summary`, `exec3-slide-regulation`, `exec3-slide-roadmap-2026`, both new section dividers).
3. **Tone is flat.** No pain hooks, no "what this costs you", no buyer-empathy moments, no urgency.

## The fix

Rewrite every script in `exec3PitchNarrations` so it is **spoken to the executive buyer**, not about the slide. Apply a consistent world-class sales arc:

- **Hook** — a one-line pain observation the COO/CFO immediately recognises ("Your safety team is doing heroic work that doesn't scale…").
- **Cost of inaction** — what that pain quietly costs (delayed action, repeat events, audit exposure, fuel/OTP drag).
- **The shift** — what changes when this slide's capability is in place.
- **Proof** — one concrete number or named outcome (DTOP loop time, ~90% vs ~35% accuracy, 550+ airlines, locked roadmap dates).
- **Bridge** — natural handover into the next slide ("…and that's exactly where the next layer comes in").

Strip every stage direction ("walk slowly", "land this", "pick the case", "set tone"). Speak in second person to the buyer. Keep each script ~45–75 seconds when read aloud (roughly 110–180 words) — long enough to land, short enough not to lose them.

## Slide-by-slide narration plan (new IDs aligned to ExecutivePitch3.tsx)

| Order | Slide ID | Narrative beat |
|---|---|---|
| 0 | `exec3-slide-0` | Title — set the stakes: minutes lost between detection and action are the silent tax on every operation. |
| 1 | `exec3-slide-1` | Strategic Shift — regulators and boards moved from "did you comply" to "did you perform". Carriers who close that loop first set the benchmark. |
| 2 | `exec3-slide-outcomes` | Customer Outcomes — start with what they'll actually take to their board: schedule, revenue, cost, trust. |
| 3 | `exec3-slide-platform` | The Platform — the architecture behind those outcomes: one data foundation, intelligence on top, mobile to the frontline, DTOP wrapping it all. |
| 4 | `exec3-divider-dtop` | DTOP divider — name the operating model that makes everything below it move together. |
| 5 | `exec3-slide-dtop` | DTOP — the four-step loop that turns a Tuesday safety signal into a Thursday training intervention. |
| 6 | `exec3-divider-mobile` | Mobile divider — the platform only matters if the frontline actually uses it. |
| 7 | `exec3-slide-mobile` | Unified Mobile — three apps a shift becomes one app every shift; locked roadmap dates Q2/Q4 2026. |
| 8 | `exec3-divider-intelligence` | Intelligence divider — frame the layer that turns operational data into action. |
| 9 | `exec3-slide-automation` | Automation — cross-product workflows replace manual handoffs. |
| 10 | `exec3-slide-insights-summary` | Insights & Intelligence — ask anything in plain English; CoAnalyst across the platform. |
| 11 | `exec3-slide-coanalyst` | CoAnalyst — the intelligence layer; from events to control. |
| 12 | `exec3-slide-tiers-vs-ai` | CoAnalyst vs Generic AI — ~90% vs ~35% at L4–5 ends the build-or-buy debate. |
| 13 | `exec3-slide-insights` | Recommendations & Prescriptive Actions — patterns plus the next move, not just a chart. |
| 14 | `exec3-divider-regulation` | Regulation divider — set up regulation-in-motion as a discrete value story. |
| 15 | `exec3-slide-regulation` | Regulation Management — turn a constant stream of change into traceable in-app updates. |
| 16 | `exec3-divider-roadmap` | Roadmap divider — what's locked and committed for 2026. |
| 17 | `exec3-slide-roadmap-2026` | 2026 Phased Roadmap — Insights early-2026, Automation mid-2026, Unified Mobile late-2026. |
| 18 | `exec3-slide-why` | Why Comply365 — the three differentiators (connected foundation, embedded intelligence, proof by default), trust signals, ask for the next meeting. |

## Memory-locked rules I will respect in every script

- BrandNumber product names — Comply365, SafetyManager365, ContentManager365, TrainingManager365.
- DTOP = Detect → Trigger → Orchestrate → Prove.
- AI terminology: "Generative AI", "Recommended Actions", "Operational Data". No FOQA / FDM / ASAP raw acronyms.
- CoAnalyst headline framing: ~90% domain accuracy at L4–5 vs ~35% generic AI.
- Trust signals: 550+ airlines, ~2.5M users, six continents.
- Roadmap dates locked: Insights early-2026, Automation mid-2026, Unified Mobile late-2026.
- Disclaimers: speak in ranges / "observed across deployments", never as guarantees.

## Technical changes (single file)

- Edit `src/data/executivePitchNarration.ts` — replace the entire `exec3PitchNarrations` array. Keep the export name, interface, and `getExec3PitchNarration` helper unchanged so `useExec3PitchNarration` and `ExecutivePitch3.tsx` continue to work without any other edits.
- Keep `executivePitchNarrations` (the original short Exec deck) untouched.
- No component, hook, or PPTX exporter changes required — slide IDs in the rewrite match the IDs already wired in `ExecutivePitch3.tsx`.

## Out of scope

- No visual / layout changes.
- No PPTX export changes (speaker notes in the PPTX deck, if any, are a follow-up if you want them synced).
- The original `executivePitchNarrations` (short Exec deck) stays as-is.
