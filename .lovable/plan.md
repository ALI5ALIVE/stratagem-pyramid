# Week 3 (Sell & Win) — Review and Upgrade Plan

## What Week 3 looks like today

Current slide order:

1. Discovery → Demo → Close (3 stages × 1 say / 1 ask)
2. Use Case Cheat Sheet (5 use cases × 1 question)
3. Customer Footprint — Intro (S / C / T)
4. Footprint — One App + Whiteboard
5. Footprint — Two Apps + Whiteboard
6. Footprint — All Three + Whiteboard
7. Footprint — Value Ladder
8. Footprint — 3-Move Play
9. Customer Outcomes
10. Objections (top 3 only)
11. Why Comply365
12. Your Enablement Plan

### Strengths
- Strong "footprint" arc — that S/C/T mental model is unique to us and is the best half of Week 3.
- Each slide already pairs "say this" + "ask this", which is the right teaching pattern.
- The 3-Move Play and Whiteboard drills give reps something to *do*, not just read.
- Mappings to Exec Pitch 3 are wired in (pill on top of slides).

### Gaps that hold it back from world-class
1. **Discovery is too thin.** One question per stage is not enough. There is no qualification framework (MEDDICC / pain-chain / "who else needs to be in the room"), no question bank by persona, and no triggers for *when* to ask each question.
2. **Use Case Cheat Sheet is single-axis.** It is a list of 5 use cases with one question each — there's no "what to listen for", "red flag phrase that means this use case is live", or "which capability/DTOP step to anchor on".
3. **No persona-aware playbook in Week 3.** Personas exist on the homepage (`personaConfig.ts`, `PersonaTabs`) but the rep never gets a Week 3 slide that says *"if you're talking to the VP Safety / CIO / Training Director, ask THIS, avoid THAT, prove with THIS metric."*
4. **Objections slide is explicitly truncated** ("Top 3 · final wording pending review"). World-class reps need 6–8 objections with a one-line acknowledge / reframe / bridge and a *proof artifact* to point at.
5. **No competitive cheat sheet.** Reps will be asked "how is this different from Vistair / Comply365 legacy / Web Manuals / Coruson / Ideagen / FlightLogger". Today there is no Week 3 slide that arms them.
6. **No discovery-call runbook.** A first call with a prospect has a shape (open, frame, discover, qualify, next step). Reps need a 1-pager they can keep open on a second monitor.
7. **No deal-stage map / next-step language.** "Book a 20-minute walkthrough" is the only CTA pattern. We need scripted next-step language per stage (first call → working session → exec readout → focused use-case session).
8. **Practice Center is not stitched into Week 3.** It exists at /practice-center but Week 3 doesn't *send the rep there* with a specific scenario at the end of each module.
9. **No downloadable artifacts.** Everything is on-screen only. A rep walking into a customer needs a printable 1-pager (Discovery, Footprint, Objections, Competitive) — same content, exportable.
10. **No "first 30 days as a Comply365 seller" closing.** The current closing slide is generic ("read the deck, practice, find collateral"). It does not give a rep a calendar.

---

## Proposed Week 3 upgrade — 6 new slides + 2 enhancements + downloadable kit

New Week 3 deck order (additions in **bold**):

1. Discovery → Walkthrough → Close *(keep)*
2. **NEW · Discovery Question Bank** — 18–24 questions, grouped by DTOP step (Detect / Trigger / Orchestrate / Prove). Each question tagged with "what good sounds like" and "what a red-flag answer sounds like".
3. **NEW · Persona Playbook** — 5 personas (CEO/COO, VP Safety, VP Ops, Training Director, CIO/IT). For each: their pain in one line, the 2 questions only they can answer, the 1 metric they care about, the terminology landmine to avoid, the proof artifact to point at.
4. Use Case Cheat Sheet *(upgrade — see below)*
5. Customer Footprint Intro → 3-Move Play *(keep all 8 footprint slides — strongest section)*
6. Customer Outcomes *(keep)*
7. **NEW · Competitive Cheat Sheet** — 4–6 competitors. For each: how they position, where they stop in the DTOP loop, the one-sentence reframe, and the trap question to ask the prospect.
8. Objections *(upgrade — expand from 3 to 6–8, add "proof artifact" column)*
9. **NEW · Discovery-Call Runbook** — single slide structured like a real first call: 0–2m open, 2–10m frame, 10–35m discover, 35–45m qualify + book next step. Verbatim scripts for opener, transition, and close.
10. **NEW · Deal-Stage Next-Step Language** — what to say to advance from first call → working session → exec readout → focused use-case session → contract. Scripted language per transition, with the "right person to bring next" prompt.
11. Why Comply365 *(keep)*
12. **NEW · Practice Center Bridge** — 3 named scenarios mapped to Week 3 (e.g. "VP Safety, footprint = S+C, has Vistair on training"). One-click into /practice-center with the scenario pre-selected.
13. Your Enablement Plan *(upgrade — replace generic checklist with a 30-day calendar: Week 1 read, Week 2 shadow, Week 3 lead a discovery call, Week 4 run a focused use-case session)*

### Use Case Cheat Sheet upgrade
Add three columns to the existing 5 rows (and add 2 more use cases for 7 total):
- "What to listen for" — the actual phrase a prospect says that means this use case is live.
- "DTOP step to anchor on" — D / T / O / P chip, so the rep ties it back to Week 1.
- "Proof artifact" — which slide / playbook / customer story to send after the call.

### Objections upgrade
- Expand from 3 to 8 (cover: "we have an SMS", "we have Vistair / legacy Comply365", "AI is not allowed by our security team", "our regulators won't approve", "we just bought a TMS", "budget is locked for the year", "we tried this two years ago and it failed", "we're a small operator, this is overkill").
- Add a 4th column to each row: "Proof artifact" (link to specific Intelligence Layer slide, customer outcome, regulation management playbook section).
- Remove "pending review" footer.

### Downloadable rep kit (Week 3 artifact)
One PDF, 4 pages, generated from the same data files used by the slides:
- p1 Discovery Question Bank
- p2 Persona Playbook
- p3 Footprint 3-Move Play
- p4 Objections + Competitive cheat sheet

Exposed as a single "Download Week 3 Field Kit (PDF)" button on the Closing slide. Uses the existing PPTX/PDF exporter pattern in `src/exporters/`.

---

## Technical notes (for the team)

- **New slide components** under `src/components/sales-enablement-slides/`: `SEDiscoveryQuestionBank.tsx`, `SEPersonaPlaybook.tsx`, `SECompetitiveCheatSheet.tsx`, `SEDiscoveryCallRunbook.tsx`, `SEDealStageLanguage.tsx`, `SEPracticeCenterBridge.tsx`. Each wraps `PitchSlideContainer` exactly like existing Week 3 slides and accepts the standard `SlideNarrationProps`.
- **Data**: persona content reuses `src/data/personaProfiles.ts` + `personaConfig.ts`. Objections extend `src/data/dtopPlaybook.ts` (`objections` array). New file `src/data/week3FieldKit.ts` for discovery bank + competitive + deal-stage language so the PDF exporter and slides share one source of truth.
- **Page wiring**: register the 6 new slides in the Week 3 block inside `src/pages/SalesEnablement.tsx`, update the `weekProps.w3.upNext` list and `estimatedMinutes` (~40m), and add narration entries in `src/data/salesEnablementNarration.ts` following the 5-part Coach Script Standard.
- **Practice bridge**: scenarios already supported by `src/data/practiceScenarios.ts` — just add 3 named Week 3 scenarios and deep-link with a query param.
- **PDF kit**: new exporter `src/exporters/pdf/buildWeek3FieldKit.ts` reusing the brand tokens in `src/lib/pptxBrand.ts` / `printBrand.ts`. Button component lives next to existing `DeckPDFExportButton.tsx`.
- All copy continues to respect locked memory rules: BrandNumber product names, no FOQA/FDM/ASAP raw acronyms, no "90-day pilot" language, ~90% vs ~35% Intelligence Layer headline, locked roadmap dates.

## Out of scope
- Re-recording Week 1 / Week 2 narrations.
- Changing the Practice Center engine itself (only adding scenarios).
- New customer stories / case studies (assumes existing Customer Outcomes content is the source of truth).

---

## Suggested sequencing

1. Build the 3 highest-leverage slides first: **Discovery Question Bank**, **Persona Playbook**, **Objections upgrade**. These three alone close ~70% of the gap.
2. Then add **Competitive Cheat Sheet** and **Discovery-Call Runbook**.
3. Then **Deal-Stage Language** + **Practice Center Bridge** + **30-day Enablement Plan** rewrite.
4. Finally, ship the **Downloadable Field Kit PDF**.

Each step is independently shippable and adds value on its own.
