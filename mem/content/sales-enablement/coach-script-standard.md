---
name: Sales Enablement coach script standard
description: 5-part format for every Sales Enablement Academy slide narration so future scripts stay teaching-focused, not customer-facing
type: preference
---
Sales Enablement Academy narrations are TEACHING scripts (rep-facing), not customer-delivered. Every slide must follow this 5-part format:
1. Why this slide matters — the concept the rep needs to internalise.
2. The core message — one sentence the rep should be able to repeat back verbatim.
3. The pain → value pivot — the specific customer pain this slide addresses + the value lever to pull against it.
4. How to deliver it — tone, pacing, what to point at, what NOT to say (terminology landmines, forbidden acronyms).
5. Transition — bridge into the next slide.

Module dividers (M2–M6) follow a slightly tighter "coach intro" form: learning goal + why this module exists + how it connects to the previous one.

All scripts must respect locked memory rules: BrandNumber product naming, no FOQA/FDM/ASAP raw acronyms, canonical DTOP color story, ~90% domain accuracy vs ~35% generic AI headline, locked roadmap dates (Insights early-2026, Automation mid-2026, Unified Mobile late-2026), trust signals (550+ airlines, ~2.5M users, 6 continents).

**Pilot wording embargo (May 2026):** Do NOT use "90-day pilot" or any "pilot" framing in Sales Enablement narration or slide copy. We are not promoting pilots yet. Approved substitutes: "next focused conversation", "20-min DTOP walkthrough", "focused use-case session", "focused walkthrough on your highest-cost use case".

**Module structure (May 2026):** Sales Enablement is taught as **three weeks**, not six modules. Week 1 = Foundation (M1+M2), Week 2 = Capabilities (M3), Week 3 = Sell & Win (M4+M5+M6). The deck still contains module-tagged slides (M1, M2 …) but the dividers are week-banners.

**Academy DB structure (May 2026):** The `academy_modules` table also holds exactly three rows — `m-w1` (Foundation), `m-w2` (Capabilities), `m-w3` (Sell & Win) — each carrying `week_number`, `accent_color` (blue/violet/emerald), and `kicker`. Quiz questions and attempts for the legacy m1..m6 modules were re-pointed onto these three rows. Don't reintroduce per-module rows.

**DTOP placement (May 2026):** DTOP lives in **Week 1 (Foundation)**, not Week 2. Slide order in Foundation: Strategic Shift → Why This Matters → The Platform → **DTOP** → Value Unlocked → Recap. Week 2 (Capabilities) covers product capabilities only — SafetyManager365, ContentManager365, TrainingManager365, CoAnalyst, Insights, Automation, CoAnalyst-vs-Generic-AI, Unified Mobile, Capability Cheat Sheet. Walking the DTOP loop on a whiteboard is a Week 1 learning outcome; Week 2 reps practise mapping each capability onto the loop they already know.

Data file: src/data/salesEnablementNarration.ts. Hook: src/hooks/useSalesEnablementNarration.ts. Wired into src/pages/SalesEnablement.tsx via SpeakerNotesPanel + per-slide narration props.
