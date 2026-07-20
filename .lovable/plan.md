# Comply365 Explainer — v2 (Product & Value-Led) — New Page

Keep v1 exactly as it is at `/editorial/comply365-explainer-v1`. Publish the product-led revision as **v2** on a brand-new page so both versions can be compared side-by-side for Wednesday.

## New narrative shape (≤2 min, ~195 words) — product-first

| Beat | Time | Purpose | On-screen |
|---|---|---|---|
| 1. Name the product | 0:00–0:12 | Introduce Comply365 as the Operational Performance Platform | Logo + one-line definition, isometric base plate lands |
| 2. What it replaces | 0:12–0:25 | Fragmented SMS / Docs / TMS → one platform | 3 legacy slabs snap into the base plate |
| 3. The stack (product tour) | 0:25–1:05 | Layer-by-layer reveal with a **value line per layer** | Isometric build: Core Apps → Data Foundation → Intelligence Layer → Unified Mobile |
| 4. DTOP in motion | 1:05–1:30 | How the layers work together | DTOP ribbon wraps the stack, signal dot travels loop |
| 5. Value & proof | 1:30–1:50 | Quantified outcomes + trust signals | Outcome tiles + "550+ operators" strip |
| 6. Close | 1:50–2:00 | One-line promise + logo | Endframe |

Key shift vs v1: product name and value proposition appear in the **first 12 seconds**; each stack layer carries a **capability + benefit line**; payoff beat uses specific outcomes from `lineOfSightData.ts`.

## Draft script (v2, ~195 words)

> **[0:00 · Name]** This is Comply365 — the Operational Performance Platform for safety-critical operations. One connected system for content, training, safety and compliance.
>
> **[0:12 · Replaces]** It replaces the disconnected mix of document tools, safety systems and training records most operators still run today — with a single, purpose-built platform.
>
> **[0:25 · Stack]** At the base, Core Operational Apps run your procedures, competence and occurrences. Above them, an Operational Data Foundation connects every signal, document and record. On top, the Intelligence Layer reads that data with domain-trained AI — around 90% accuracy on operational language, versus about 35% for generic tools. And a Unified Mobile shell puts it all in the hands of the frontline.
>
> **[1:05 · DTOP]** Around the stack runs our operating model — DTOP. Detect every signal. Trigger the right response. Orchestrate work across procedures, training and safety. And Prove it with an auditable evidence chain.
>
> **[1:30 · Value]** The result: protected schedules, protected revenue, lower cost of operations, and a frontline that trusts the system. Trusted today by 550+ operators.
>
> **[1:50 · Close]** Comply365. One platform. One operating model. One entry point.

## Storyboard (12 shots) — product-led re-cast
- Shots 1–2: **Product intro** — logo + base plate lands, product definition types in.
- Shot 3: Legacy slabs (SMS · Docs · TMS) snap into the base plate.
- Shot 4: Camera rotates to isometric 3/4.
- Shots 5–8: Layer build (Core Apps → Data Foundation → Intelligence Layer → Unified Mobile), each with a **floating value caption** (e.g. Layer 3 shows "90% domain accuracy vs 35%").
- Shot 9: DTOP ribbon wraps the stack, signal dot travels the loop.
- Shot 10: Outcome tiles with **specific numbers** from `lineOfSightData.ts`.
- Shot 11: Add **"550+ operators"** trust strip.
- Shot 12: Endframe — logo lock-up.

## Content sources (already in-app)
- `src/data/positioningPlaybook.ts` — three differentiators
- `src/data/lineOfSightData.ts` — quantified outcomes
- `src/components/exec-slides/ExecSlide3Platform.tsx` + `ExecSlide4Intelligence.tsx` — layer definitions & value lines
- Memory: DTOP colours, 90% vs 35% accuracy, forbidden terms

## Technical implementation
1. **Create `src/data/comply365ExplainerV2.ts`** — mirrors v1's structure and exports the v2 beats/script/storyboard, plus a new `LAYER_VALUE_LINES` array for the per-layer capability + benefit captions. `EXPLAINER_META.version = "v2 · product-led"`.
2. **Create `src/pages/editorial/Comply365ExplainerV2.tsx`** — copies v1's layout, imports from `comply365ExplainerV2.ts`, and renders `LAYER_VALUE_LINES` as an extra caption under Visual for storyboard shots 5–8. Adds a small header link back to v1 for comparison. Includes the same `.docx` download button (filename `Comply365-Explainer-v2.docx`).
3. **Register route** `/editorial/comply365-explainer-v2` in `src/App.tsx`.
4. **Link from v1 page and Editorial Suite header** — a "View v2 (product-led)" link on v1's header, and a second badge/button on `EditorialSuite.tsx` alongside the existing v1 link.
5. **Leave v1 completely untouched** so both versions remain reviewable in parallel.

## Out of scope
- Animation rendering — v2 stays a written brief.
- Voice casting, music bed, localisation.
