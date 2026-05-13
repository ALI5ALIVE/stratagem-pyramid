## Goal

Teach reps the word "signals" in Week 1 of Sales Enablement so DTOP's "Detect" step has concrete vocabulary, and so reps know the Signals Specialist Playbook exists.

Lightweight approach — no new slide, no new component. The DTOP slide (`TechV4Slide5DTOP`) already shows the six signal sources visually. We just arm the rep through narration + a one-line recap mention.

## Changes

### 1. Update DTOP narration in Week 1 (`src/data/salesEnablementNarration.ts`)

Rewrite the `se-slide-dtop` script to keep the existing 5-part Coach Script Standard but explicitly teach the "signals" vocabulary in parts 2–4:

- Part 2 (core message): keep DTOP closed-loop framing but add: *"Detect is the signals layer — the operational events the platform listens to."*
- Part 3 (pain → value): name the six signal sources reps will see on the slide chips — Safety Reports, Operational Data, Maintenance, Crew Logs, Regulatory, Audit — and frame the customer question they answer ("what data do you actually use?").
- Part 4 (delivery tip): tell reps to **point at the Data Sources chip row** while saying the word "signals" out loud, and to give the canonical one-liner: *"Signals = the operational events we detect and correlate — the input to the loop."*
- Part 5 (transition): mention that Signals goes deeper as a Specialist Playbook for reps who want to specialise.

Keep all locked terminology rules (no FOQA/FDM/ASAP, no "pilot", DTOP color order, etc.).

### 2. Update Week 1 Recap script (`se-slide-recap-m2` in same file)

Add one line to the existing recap so "Signals" is named as a Week 1 takeaway:

> *"You can also name the six signal sources Detect listens to — that's the answer to 'what data do you use?' on every discovery call."*

Plus one closing line pointing reps to the **Signals Specialist Playbook** (`m-signals`) as their next step if they want to go deeper.

### 3. Update Week 1 learning outcomes (`weekProps.w1` in `src/pages/SalesEnablement.tsx`)

Append "…and name the six signal sources behind Detect" to the existing Week 1 outcome sentence so the Week 1 divider banner reflects the new teaching point.

## Out of scope

- No new slide component.
- No changes to `TechV4Slide5DTOP.tsx` itself (the visual chip row is already correct).
- No changes to Week 2 / Week 3.
- No changes to the Specialist `m-signals` playbook content or quiz bank.
- No changes to other decks (Exec, Tech, Ops) — this is a Sales Enablement-only narration update.

## Acceptance criteria

- Playing the Week 1 DTOP narration teaches the word "signals" and names the six sources.
- Week 1 Recap narration mentions signals and points to the Signals Specialist Playbook.
- Week 1 banner outcome sentence references signals.
- No TypeScript or build errors. No layout/visual changes.

## Memory update

After implementation, append a one-line note to `mem://content/sales-enablement/coach-script-standard` recording that Week 1 DTOP narration is the canonical place reps are taught the "signals" vocabulary (so future edits don't strip it out).