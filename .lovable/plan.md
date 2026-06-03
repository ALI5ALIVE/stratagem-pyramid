## Review: briefs vs. strategy

There are two different narratives in the project — and they don't match.

### What the **Content Strategy slide** (`SlideContentStrategy.tsx`) says
A customer-led, buyer-journey narrative organised around the *Flying High* programme:

| Q | Theme | Customer message |
|---|---|---|
| Q1 (Apr–Jun) | **Build the Foundation** | "You cannot raise performance on fragmented foundations." Awareness of fragmentation. |
| Q2 (Jul–Sep) | **From Signals to Action** | "Performance improves when signals lead to action." DTOP introduced *here*, not Q1. |
| Q3 (Oct–Dec) | **Make Readiness Continuous** | "Readiness is a condition of performance." Role-based readiness, training+compliance+ops. |
| Q4 (Jan–Mar) | **Prove Performance at Scale** | "Performance only scales when progress can be proved." Evidence, ROI, expansion. |

Each quarter is anchored by a *Flying High* chapter, a campaign guide, a webinar, a decision asset, education briefs, thought-leadership pieces, practical tools, a nurture sequence, and a social pack — written for safety, compliance, training, IT, and exec audiences in a problem-first voice.

### What the **55 briefs in the database** say
A product/sales-led narrative organised around DTOP and the Intelligence Layer:

| Q | DB Pillar | What the briefs actually do |
|---|---|---|
| Q1 | DTOP Education | 14 pieces explaining DTOP mechanics ("4 letters replacing your dashboard", battle cards vs dashboard vendors). |
| Q2 | Intelligence Layer Proof | 14 pieces hammering "90% vs 35%" accuracy. |
| Q3 | Industry Solutions | 14 pieces on Aviation / Defense / Rail verticals. |
| Q4 | Sales Enablement & Demand | 13 pieces of battle cards, one-pagers, kickoff scripts. |

### The misalignment, from a customer's perspective
1. **Voice is product-out, not customer-in.** Customers don't wake up wanting to learn "DTOP" or "90/35". They wake up to fragmentation, response lag, decaying readiness, and pressure to prove progress. The strategy slide names those problems; the briefs name our acronyms.
2. **Sequencing is inverted.** The strategy *earns the right* to talk about DTOP in Q2 by first naming the fragmentation pain in Q1. The current Q1 briefs lead with the answer before the audience accepts the problem.
3. **Q3 is the biggest gap.** Strategy = continuous readiness (training, role-based competence, decay). Briefs = vertical industry plays. These are unrelated conversations.
4. **Q4 is the second biggest gap.** Strategy = proof, evidence, board-ready ROI. Briefs = internal sales enablement (kickoff scripts, partner one-pagers) that customers never see.
5. **Audiences are too narrow.** Strategy speaks to safety + compliance + training + IT + exec as a *buying group*; briefs over-index on exec and ops, under-serve training/compliance/IT.
6. **Anchor assets are missing.** No *Flying High* chapters, no campaign guides, no nurture sequences, no decision assets, no practical tools (checklists, canvases, templates). These are the spine of the strategy.

### What to do — realign the briefs to the strategy

**Approach:** rewrite the pillars and the 55 briefs in three passes, all customer-language first.

#### Pass 1 — Rewrite the four pillars
Replace the current pillar names/descriptions with the strategy's themes so the calendar headers match the campaign:
- Q1 → **Build the Foundation** — fragmentation, connected foundations.
- Q2 → **From Signals to Action** — DTOP introduced as the answer.
- Q3 → **Make Readiness Continuous** — role-based readiness, decay, competence.
- Q4 → **Prove Performance at Scale** — evidence, ROI, expansion.

#### Pass 2 — Re-cast the 55 existing briefs
For each item, keep the channel/asset_type/persona shape but rewrite `title`, `angle`, `core_insight`, `outline`, `takeaways`, `sources`, `distribution`, `success_metric` so they live inside the new quarter's theme. Examples:

- *"Why Reactive Operations Cost Aviation $25–35B a Year"* (Q1) → keep, reframe as **"The Hidden Cost of Disconnected Workflows"** — fragmentation pain, not DTOP pitch.
- *"LinkedIn: The 4 Letters Replacing Your Dashboard"* (Q1) → **"Five Signs Your Performance Model Is Fragmented"** — diagnostic, not acronym.
- *"DTOP Battle Card vs Dashboard Vendors"* (Q1) → move to Q4, restage as Master Battle Card.
- All Q2 *"90 vs 35"* pieces → keep the proof point but route it through *signals → action*, not raw accuracy.
- All Q3 *Aviation / Defense / Rail* pieces → either (a) re-themed under readiness (e.g. "Role-Based Readiness on the Ramp"), or (b) moved to a separate Industry track outside the four-quarter spine.
- All Q4 internal sales pieces → move to a non-customer Enablement track; replace with **proof / evidence / ROI** briefs from the strategy slide.

#### Pass 3 — Add the missing anchor briefs
Create the items the strategy *requires* but the calendar doesn't yet have:
- 4 × **Flying High Report** chapters (one per quarter, flagship long-form).
- 4 × **Campaign Guide** (the quarterly anchor).
- 4 × **Webinar** (one per quarter, customer-language titles).
- 4 × **Decision Asset** (self-assessment, diagnostic, scorecard, business case).
- 4 × **Practical Tool** sets (checklists, canvases, templates).
- 4 × **Nurture Sequence** + 4 × **Social Pack** per quarter.

### How this gets executed

1. **Pillar rewrite** — one migration updates `content_pillars` names/descriptions/colors to match the four strategy themes.
2. **Brief re-mapping** — extend `supabase/functions/bulk-draft-briefs` (or add a sibling `realign-briefs` function) that takes a mapping `{ item_id → new_quarter, new_pillar, new_title, strategy_theme }` and regenerates angle/insight/outline/etc. against the strategy snapshot, not the legacy DTOP-first prompt.
3. **Prompt change** — update `draft-brief/index.ts` so the system prompt anchors on the *quarter theme* (`quarterMessage` + `narrative` + `messageTerritory` from `SlideContentStrategy.tsx`) and writes in customer voice (problem → implication → resolution), not product voice.
4. **Strategy snapshot** — lift the Q1–Q4 themes out of the slide into `src/data/editorialPlaybook.ts` as `QUARTER_THEMES`, then snapshot them into each brief at draft time so generated assets stay on-message.
5. **New items** — seed the ~20 missing anchor briefs via a one-off insert script so the calendar matches the strategy slide 1:1.
6. **Review UI** — add a "Strategy alignment" badge on each calendar card that compares the brief's `pillar_id` + `quarter` + `angle` keywords to the active `QUARTER_THEMES` and flags drift.

### Open questions before I build

1. **Industry plays (Aviation / Defense / Rail).** Keep them as a parallel *Industry* track outside the four-quarter spine, or fold them into Q3 as readiness use-cases?
2. **Internal sales enablement (battle cards, kickoff scripts).** Move to a hidden *Enablement* track (not part of the customer calendar), or delete?
3. **Scope of regeneration.** Rewrite all 55 in place (destructive), or fork into a new "v2 — Strategy-Aligned" set and leave the originals for reference?
