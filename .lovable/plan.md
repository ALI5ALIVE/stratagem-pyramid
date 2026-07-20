# Comply365 Explainer — v1 Script & Storyboard

**Format:** ≤2 min animated product/solution explainer, isometric layered stack (Amdocs Cognitive Core reference), ~180–200 spoken words to leave room for intro sting, breaths, and outro.

**Deliverable of this task:** A written v1 (Markdown doc) — script + shot-by-shot storyboard — saved into the app as a shareable page under `/editorial` so Kathrina and team can review Wednesday. No animation rendering yet.

---

## 1. Narrative spine (product/solution explainer best practice)

Follows the proven 5-beat explainer arc (Problem → Stakes → Solution → How it works → Payoff), tuned to Comply365 messaging playbook (DTOP, Intelligence Layer, 90% vs 35%, three differentiators).

| Beat | Time | Purpose | Visual mode |
|---|---|---|---|
| 1. Hook — The fragmented reality | 0:00–0:15 | Establish the pain: siloed tools, orphaned signals | Scattered flat icons drifting apart |
| 2. Stakes — Why it matters now | 0:15–0:30 | Regulatory + cost + AI-maturity pressure | Pressure gauges / data streams |
| 3. Reveal — The Platform | 0:30–0:50 | Isometric stack assembles layer-by-layer | **Hero isometric build** |
| 4. How it works — DTOP loop | 0:50–1:25 | Detect → Trigger → Orchestrate → Prove wrapping the stack | Loop animates around the stack |
| 5. Payoff — Outcomes + close | 1:25–2:00 | Schedule / revenue / cost / loyalty + logo outro | Outcome tiles + endframe |

---

## 2. Script (v1 — 195 words, timed)

> **[0:00 · Hook]** Every day, aviation operations generate thousands of signals — safety reports, training gaps, procedure changes, audit findings. Most of them go nowhere.
>
> **[0:15 · Stakes]** Regulators want proactive evidence. Costs are rising. And the tools meant to help — safety systems, document platforms, training records — sit in silos, disconnected from each other and from the outcome.
>
> **[0:30 · Reveal]** This is Comply365 — the Operational Performance Platform. One foundation for content, training and safety. One intelligence layer that reads across all of them. One trusted mobile shell for the frontline.
>
> **[0:50 · How it works]** Wrapping it all: DTOP — our operating model. We **Detect** every signal, **Trigger** the right response, **Orchestrate** the work across procedures, training and safety, and **Prove** it with an auditable evidence chain.
>
> **[1:25 · Payoff]** The result: protected schedules. Protected revenue. Lower cost of operations. And crews that trust the system they use every shift.
>
> **[1:45 · Close]** From fragmented operations to closed-loop performance. **Comply365. One platform. One operating model. One entry point.**

*(Speaking pace ~105 wpm allows 15s of breathing room for sting + endframe.)*

---

## 3. Storyboard (12 shots, isometric-first)

Each shot: **timecode · VO cue · visual · motion note**.

1. **0:00–0:05** — "Every day…" — Dark hero canvas; small icons (report, manual, training cert, audit) drift on-screen from all sides. *Slow parallax drift.*
2. **0:05–0:15** — "Most go nowhere." — Icons dim/grey out; thin dotted paths trail off-frame. *Desaturate to communicate loss.*
3. **0:15–0:25** — "Regulators… costs… tools in silos." — Three pressure meters rise on left; three siloed slabs (SMS / Docs / TMS) appear disconnected on right. *Meters tick up; slabs stay apart.*
4. **0:25–0:30** — Beat/transition — Slabs magnetise together; camera pushes in and rotates to **isometric 3/4 view**.
5. **0:30–0:38** — "This is Comply365…" — **Layer 1 slides in** (Core Operational Apps: Procedures · Competence · Occurrences). Label pins on.
6. **0:38–0:44** — "One foundation…" — **Layer 2** (Operational Data Foundation) drops on top with data-mesh pattern flowing between apps.
7. **0:44–0:50** — "One intelligence layer…" — **Layer 3** (Intelligence & Orchestration) lands with three sub-tiles (Automation · Insights · Recommendations) glowing.
8. **0:50–0:55** — "One trusted mobile shell." — **Layer 4** (Unified Mobile) lands; phone silhouette dockable on the layer, showing Procedures / Training / Safety tabs.
9. **0:55–1:25** — "Wrapping it all: DTOP…" — **Layer 5 DTOP ribbon** wraps around all four layers. Four labelled arcs light in sequence — **Detect (blue) → Trigger (amber) → Orchestrate (violet) → Prove (emerald)** — synced to the four verbs in VO. A single signal dot travels the full loop.
10. **1:25–1:40** — "Protected schedules… revenue… cost… loyalty." — Four outcome tiles pop above the stack, each with a micro-icon and the metric line from the deck.
11. **1:40–1:50** — "Crews that trust the system…" — Camera pulls back; frontline crew silhouette taps the mobile shell; ripple animates back down through the stack.
12. **1:50–2:00** — Endframe — "One platform. One operating model. One entry point." Logo lock-up on Comply365 dark background with `comply365.com`.

---

## 4. Art direction notes

- **Style:** Isometric 3/4 layered stack, matching Amdocs Cognitive Core — soft depth shadows, thin luminous edges, subtle grid pattern on each slab.
- **Palette (from playbook memory):** bg `hsl(222 47% 6%)`, primary `#0066FF`, DTOP `#3B82F6 / #F59E0B / #8B5CF6 / #10B981`, ink `#F5F7FA`.
- **Type:** Space Grotesk display / Inter body — labels only, no long copy on-screen.
- **Motion language:** springs on layer-drops, linear ease on the DTOP ribbon travel, single signal dot as the recurring motif tying every scene.
- **Terminology guardrails:** "Operational Performance Platform", "Intelligence Layer", "DTOP", "Recommended Actions". Never use CoAnalyst / FOQA / FDM.

---

## 5. Where the v1 lives in the app

Add a single new page **`/editorial/comply365-explainer-v1`** rendering the script + storyboard above as a shareable, printable brief (Word/PDF download reusing the existing Client Package export pattern). This keeps it inside the Editorial Suite so Kathrina/Pete can comment and iterate before we commit to animation production.

---

## 6. Out of scope for v1 (flag for later)

- Actual animatic / motion tests (would be a follow-on using Remotion + Rive/Lottie).
- Voice casting and music bed selection.
- Localised versions.

## Technical implementation (if approved)

1. Add `src/data/comply365ExplainerV1.ts` with the script beats + storyboard shots as structured data.
2. Add `src/pages/editorial/Comply365ExplainerV1.tsx` — read-only presentation of script (timed table) + storyboard (numbered cards with visual/motion columns).
3. Reuse `ItemDetail`'s docx export helper to add a "Download brief (.docx)" button.
4. Register the route in `src/App.tsx` and link from `EditorialSuite.tsx` header.
