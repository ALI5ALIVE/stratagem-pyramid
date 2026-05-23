## The problem

The agenda block titles and details on `/strategy-vision-session` currently read like a **product walkthrough**, not a strategy session:

| # | Current title | Current detail | Why it reads as product-led |
|---|---|---|---|
| 1 | Where the industry is going | DTOP in plain English | Frames our model, not their world |
| 2 | **The platform story** | One platform, three Core Apps, one Intelligence Layer… | Literally "the platform story" |
| 3 | **Capabilities deep-dive** | Insights, Recommendations, Automation | Feature tour language |
| 4 | Operational Performance Roadmap | L1→L5 maturity curve | Our framework, their slot in it |
| 5 | Their DTOP loop, end-to-end | Walk Detect→Trigger→Orchestrate→Prove | Our acronym leading |
| 6 | Agreed next step | Scope, sponsor, date | Fine |

A safety, ops or compliance head reading this thinks: *"This is a demo with a maturity model wrapped around it."* That kills attendance from the exact personas (Safety, Compliance, Training) we just added persona cards for.

## The principle

Every block title should answer **"what problem of mine are we working on in this hour?"** — not "what part of the product are we showing?" Product names (DTOP, Intelligence Layer, Core Apps) move from titles into the body copy as the *mechanism*, never the headline.

Maturity model and DTOP can still appear — but as the **tool we use on their problem**, not the subject of the hour.

## The rewrite (microsite only)

Reframe each block as **Pain → Working session → Outcome**. Source data in `src/data/week3FieldKit.ts` stays untouched (still used by the internal sales slide). The microsite already overrides outcomes via `agendaOutcomes` — we'll add a parallel `agendaDisplay` override for title + detail.

| # | Time | New title | New detail (pain-anchored) |
|---|---|---|---|
| 1 | 0:00–0:20 | **The shift you're being measured on** | Why regulators, boards and insurers are moving from "did you comply?" to "can you prove performance?" — and what that means for your team's next 12 months. |
| 2 | 0:20–0:50 | **The gap between your systems and your decisions** | Where safety, training, ops and compliance data already lives in your business — and why it still takes weeks to answer a single board question. We map your real stack on the whiteboard. |
| 3 | 0:50–1:25 | **The signals you're sitting on but not using** | Working through three operational pains you brought into the room — fatigue, repeat findings, training decay, runway excursions, whatever's live — and where the leading indicators actually are. |
| 4 | 1:25–1:35 | Break | (unchanged) |
| 5 | 1:35–2:05 | **Where you are vs. where your peers are heading** | An honest read of your current maturity against the industry — and what a Level 4 predictive posture would change for your safety, training and compliance leaders specifically. |
| 6 | 2:05–2:45 | **One of your real problems, end-to-end** | Pick a live use case from your operation. We whiteboard it from the weak signal through the targeted intervention to the evidence pack a regulator can read. No slides. |
| 7 | 2:45–3:00 | **What you'd action on Monday** | A named exec sponsor, the first use case worth proving, and a date — so the session converts into movement, not a follow-up email. |

Outcome lines ("You leave with…") get a light pass to match:

- Block 1 → *Shared language with your board for the oversight shift — in their words, not ours.*
- Block 2 → *A whiteboard map of where your decision-grade data actually lives today.*
- Block 3 → *Three live pains, each tied to a signal you already own.*
- Block 5 → *A plotted point on the maturity curve — and what L4 changes for each function head in the room.*
- Block 6 → *One real use case walked end-to-end, with the evidence trail named.*
- Block 7 → *A sponsor, a use case, and a date.*

## Supporting copy changes (small)

- Section eyebrow: **"The fixed 3-hour agenda"** → **"How we'll spend the three hours"** (less timetable, more working-session).
- Section H2: *"Designed so every minute earns its place."* → **"Built around your operation — not a product tour."**
- Section sub: *"Seven blocks. One short break…"* → **"Six working blocks and a short break. By hour three, one of your real use cases is on the whiteboard end-to-end — and you've agreed who owns what next."**
- Hero CTA label: *"See the 3-hour agenda"* → **"See how the 3 hours work"** (keeps anchor `#agenda`).

## Out of scope

- No changes to `week3FieldKit.ts` (internal sales deck keeps its product-shaped titles for the AE flow).
- No changes to the DTOP loop section, persona cards, deliverables, oversight band, or CTA.
- No new components, no layout shifts — purely a copy override map + four micro-edits.

## Technical detail

- Edit only `src/pages/StrategyVisionSession.tsx`.
- Add a `const agendaDisplay: Record<string, { title: string; detail: string }>` keyed on the existing `b.title` from `visionSessionAgenda`, sitting next to `agendaOutcomes`.
- In the map render, resolve `const display = agendaDisplay[b.title] ?? { title: b.title, detail: b.detail };` and use `display.title` / `display.detail` in the JSX. Break block falls through unchanged (no key match).
- Update the four eyebrow/H2/sub/CTA strings inline.
- Update the page `<meta name="description">` only if the current one references "agenda walkthrough"-style language; otherwise leave.

## Expected effect

Lifts the Safety, Compliance and Training personas' read of the agenda from *"product demo dressed as a session"* to *"three hours on my actual problems."* This is the single highest-leverage copy change for the personas whose EMCS scores were dragged down by Credibility/Role-relevance — without touching the underlying field-kit data the AE team relies on.
