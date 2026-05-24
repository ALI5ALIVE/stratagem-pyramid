## Goal

The keynote's "What the research told us" act and the Silo Era stats currently read as directionally true but thinly evidenced. Three of the four headline numbers (~65% orphaned signals, $25–35B exposure, 90 vs 35) repeat without being tied back to *where customers actually are today*, *what fragmentation costs them*, or *which challenges sit at the top of their list*. This plan grounds those numbers using assets that already exist in the project (`lineOfSightData.ts`, `categoryResearchProgramme.ts`, `OpsSlide2CostOfFragmentation`, methodology note + StatSourceChip pattern) and weaves the evidence into the narrative so each finding lands with a named source and a named cost.

## What changes (and why)

### 1. Replace generic stats with a "Where customers are today" evidence block
In `silosToSignalsScript.ts` → `silo-era` act and the `acts[]` array in `SilosToSignalsKeynote.tsx`, swap the three loose stats for a sourced cluster that mirrors `OpsSlide2CostOfFragmentation`:
- **65K+ signals/yr per Tier-1 operator** — IATA SMS Implementation Survey 2023
- **~40% orphaned** (no closure action) — Flight Safety Foundation 2023 SMS Maturity Study
- **3-week mean investigation cycle** — Comply365 customer baseline composite
- **Top 4 cost drivers** pulled live from `useCases` in `lineOfSightData.ts` (AOG, Go-Arounds, plus the next two highest annualised costs), shown as $/yr per operator with the same `formatCost` helper.

This anchors "fragmentation" in dollars, not adjectives, and re-uses the methodology note already trusted elsewhere in the deck.

### 2. Rewrite the three research findings around the Top Challenges
In `silosToSignalsScript.ts` → `research` act, restructure each finding so it opens with the customer challenge it answers, then states the finding, then names the source. Map them to the hypotheses already in `categoryResearchProgramme.ts`:
- **Finding 01 — "I can't see the operation I'm responsible for."** → H1 fragmentation universality → buyer language is "line of sight", not "compliance". (n=300 survey + 18–24 interviews.)
- **Finding 02 — "I'm done buying islands."** → H3 budget shift → willingness-to-pay clusters on connected operations. (Conjoint trade-off from survey block 4 + exec interviews.)
- **Finding 03 — "Same four verbs, three industries."** → H5 named category → Detect/Trigger/Orchestrate/Prove convergence. (18–24 exec interviews across aviation, defence, rail.)

Each finding gets an explicit "what customers told us" pull-quote line and the methodology badge ("Modelled, not measured · n=300 · 18–24 interviews · secondary triangulation") so credibility is visible, not implied.

### 3. Add a "Top challenges" beat strip to the Silo Era act
New `topChallenges` array in `silosToSignalsScript.ts`, surfaced as a small grid in the `silo-era` `ActSection` (mirrors the `IRSlide1WhyExists` problem-grid pattern):
1. Signals captured but never closed
2. Investigation cycles measured in weeks
3. Crew/eng/ops working from different versions of the truth
4. Audit evidence reconstructed after the fact
5. Generic AI accuracy too low to trust at L4–5
6. Budget locked in point tools that don't speak to each other

Each challenge ties to a DTOP letter (D/T/O/P) using the canonical colour mapping so the audience sees the bridge from problem → operating model before the "name the game" act lands.

### 4. Thread the evidence into the spoken script
Update the `paragraphs` in the `silo-era`, `research`, and `intelligence` acts of `silosToSignalsScript.ts` so the CEO speaks the sources out loud once (IATA, FSF, Eurocontrol, customer composite) — short, citation-style, not a footnote dump. The 90 vs 35 framing already in the `intelligence` act gets a one-line bridge back to the fragmentation cost: *"Compress detection-to-decision from weeks to minutes and you take the $25–35B exposure off the table."*

### 5. Add a sourced "Cost of fragmentation" panel to the keynote page
New component (`KeynoteFragmentationCost.tsx`) rendered between the Silo Era and Research `ActSection`s on `SilosToSignalsKeynote.tsx`. Re-uses:
- `useCases` from `lineOfSightData.ts` for the top cost drivers
- `methodologyNote` from the same file as the footer
- `StatSourceChip` for each headline number

This gives the speaker a visible, on-screen evidence wall during the silo-era beat without rebuilding what `OpsSlide2CostOfFragmentation` already proves.

## Files touched

- `src/data/silosToSignalsScript.ts` — rewrite silo-era + research paragraphs; add `topChallenges` export
- `src/pages/keynote/SilosToSignalsKeynote.tsx` — update `acts[]` beats for silo-era and research; render top-challenges grid; mount new fragmentation panel
- `src/components/keynote/KeynoteFragmentationCost.tsx` — new, sourced cost panel built from existing `lineOfSightData`
- (no changes to `lineOfSightData.ts`, `categoryResearchProgramme.ts`, or the hero film)

## Out of scope

- No changes to the film, the DTOP act, the call-to-arms, or the downloads section.
- No new research data — everything cites assets already in the project or already-approved memory figures ($25–35B, 90/35, BrandNumber naming).
- No backend or schema changes.

## Open question (optional)

Do you want the Top Challenges grid to stay generic across aviation/defence/rail, or should I render an industry-tabbed version (Airlines / Defense / Rail) so the CEO can localise the act to the room?
