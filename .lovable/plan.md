
# Category Research Programme — `/category-research-programme`

A new single-page microsite that designs and justifies a **mixed-methods research programme** (quant survey + qual executive interviews + secondary synthesis) whose explicit purpose is to evidence the **new category positioning** that will land as a thought-leadership report. Modelled on how McKinsey Global Institute and Forrester Wave / Opportunity Snapshot programmes are scoped: hypothesis-led, triangulated, defensible, and built to publish.

Pure additive page. No changes to existing routes, data, or memory. Honors all brand rules (DTOP order, 90/35, BrandNumber naming, dark theme, asymmetrical h-screen sections).

---

## 1. Route & file structure

- New route `/category-research-programme` registered in `src/App.tsx` (inside `AppLayout`, public — no PasswordGate).
- New page `src/pages/CategoryResearchProgramme.tsx` — single file, section-banded, same layout grammar as `StrategyVisionSession.tsx`.
- New data file `src/data/categoryResearchProgramme.ts` — all copy (hypotheses, segments, instrument blocks, interview guide, sample frame, analysis plan, timeline, deliverables, governance) lives here so copy edits don't touch JSX.
- Sidebar entry under a new group **"Research & Category"** in `src/components/AppSidebar.tsx` (icon: `FlaskConical` or `ClipboardList`), badge "New".
- Homepage card under existing "Positioning & Messaging" section, sitting beside the Positioning Playbook card.

No changes to backend, auth, or any other page.

---

## 2. Page narrative (top to bottom)

Each band is a full `min-h-screen` section with asymmetrical padding, eyebrow + H2 + sub, and a typed visual artefact (table, matrix, timeline, or framework diagram) — never prose-only.

1. **Hero — "Evidence the category before we name it"**
   Eyebrow: "Category research programme". H1: "Prove the category exists before we claim leadership of it." Sub: positions the programme as the evidence base for the thought-leadership report, not a marketing survey. Two CTAs: "See the methodology" / "Download the brief" (brief is a stub PDF link, not built here).

2. **Why this programme exists** — three-up: (a) the positioning is new, so it must be earned with data, not asserted; (b) buyers will only adopt a category their peers validate; (c) analysts (Gartner/Forrester/IDC) require independent evidence before they'll write about a new category. Each with a one-line source chip.

3. **Research objectives & hypotheses** — McKinsey-style **hypothesis tree**. One root claim ("A new operational-intelligence category is forming at the intersection of compliance, safety and ops"), branching into 4–5 testable sub-hypotheses (e.g. *fragmentation pain is universal across T1 operators*, *generic AI underperforms at L4–5 decisions*, *budget is shifting from point tools to platform*, *regulators are moving from prescriptive to performance-based oversight*, *a named category accelerates buying*). Each sub-hypothesis tagged with the method that will test it (Survey / Interview / Secondary / All three).

4. **Methodology overview — the triangulation model** — visual: three overlapping circles (Quant survey · Qual interviews · Secondary synthesis) with the intersection labelled "Defensible category claim". One-line rationale for why no single method is sufficient (Forrester-style).

5. **Quantitative survey design**
   - **Sample frame & quotas**: target n=300 completes, stratified by region (NA/EU/APAC/MEA), industry (Airlines / Defense / Rail), role (Exec / Ops / Safety / Compliance / Training / Tech), and operator tier (T1/T2/T3). Quota table rendered as a grid.
   - **Sampling method**: panel + named-account outreach + association partner lists; screening criteria (must own or influence safety/ops/compliance budget ≥ $250k).
   - **Instrument structure**: 8 blocks × ~5 questions each, ~18 min median, with question types per block (Likert, MaxDiff, constant sum, conjoint for budget trade-off, NPS-style for category labels). Show as a table: Block · Construct measured · Q-type · Hypothesis tested.
   - **Statistical power**: n=300 gives ±5.7% margin at 95% CI overall, ±9% per industry cut — stated explicitly.
   - **Anti-bias controls**: blinded vendor, randomised option order, attention checks, neutral framing of category terms, no leading "Comply365" mentions until the final brand-lift module.

6. **Qualitative interview programme**
   - **Sample**: 30–40 × 60-min executive interviews. Quota by persona (CEO/COO, Head of Safety, Head of Compliance, Head of Training, CTO/Head of Digital) and by buyer journey stage (evaluating / piloting / scaled / churned).
   - **Recruiting**: 60% customer/prospect base, 30% cold outreach via industry associations, 10% lapsed/lost — to avoid confirmation bias.
   - **Discussion guide**: 6 sections (Context · Current stack & pain · Decision triggers · Category language test · Buying process & budget · Future state). Each section shown with 2 sample probes and the hypothesis it interrogates.
   - **Analysis**: thematic coding in two passes (open then axial), inter-rater reliability target κ ≥ 0.7, anonymised quote bank for the report.

7. **Secondary & desk research** — list of source classes with examples: regulator publications (EASA, FAA, ICAO Annex 19), analyst notes (Gartner, Forrester, IDC, Verdantix), industry bodies (IATA, A4A, Eurocontrol), public 10-Ks of T1 operators, job-posting analysis as a demand signal, and a competitive review of ~15 adjacent vendors. Each with what it will be used to triangulate.

8. **Analysis & synthesis plan** — McKinsey-style:
   - Hypothesis-by-hypothesis evidence ledger (quant stat + qual quote + secondary source for each).
   - Segmentation analysis (latent-class or k-means on pain + maturity variables) to size the category.
   - Conjoint output → willingness-to-pay curves for the platform vs point tools.
   - Maturity index scoring (L1–L5) per respondent → industry distribution chart for the report.
   - Category-language test → preferred label, comprehension score, purchase-intent lift.

9. **Programme timeline (12 weeks)** — vertical timeline using DTOP colour coding (D=design, T=fieldwork, O=analysis, P=publish):
   W1–2 Design & instrument · W3 Pilot (n=20) · W4–7 Fieldwork (survey + interviews in parallel) · W8–9 Analysis & synthesis · W10 Report draft · W11 Internal review + analyst preview · W12 Publish.

10. **Governance & quality bar** — independent advisory panel (3 ex-analysts / academics), ethics & consent (GDPR-compliant, opt-in, no PII in report), methodology appendix published with the report, raw data retained for analyst audit. This is the bit that makes it Forrester-credible, not a vendor whitepaper.

11. **Deliverables** — four numbered tiles with CSS thumbnail mockups (same pattern used on `/strategy-vision-session`):
    1. **Category positioning report** (~40pp, public)
    2. **Methodology & data appendix** (analyst-grade)
    3. **Executive briefing deck** (sales-enablement use)
    4. **Interactive maturity benchmark** (lead-gen asset on the site)

12. **Budget & resourcing** — indicative ranges only (panel costs, interview honoraria, design partner, analyst review), shown as a banded estimate not a single number, with a note that the final number depends on partner selection.

13. **Risks & mitigations** — table: small-sample-in-defense → boost quota + weight; vendor-bias perception → blinded fieldwork partner; category-label rejection → built-in fallback labels tested in instrument; long fieldwork → parallelise qual and quant.

14. **CTA band** — "Approve the brief · Select fieldwork partner · Kick off Week 1." Mirrors the Strategy Vision Session CTA pattern.

---

## 3. Visual & component reuse

- Reuse `StatSourceChip`, existing card primitives, DTOP colour tokens (D blue · T amber · O violet · P emerald) for the timeline.
- Hypothesis tree, triangulation Venn, and quota grid built as inline SVG / CSS grid — no new dependencies.
- Dark theme, Space Grotesk headings, Inter body, primary `#0066FF` — per core memory.
- Every section is `h-screen` with asymmetrical padding per layout standard.

## 4. Out of scope (explicitly)

- No actual survey tooling, no Typeform/Qualtrics embed, no backend tables, no auth.
- No edits to existing pages, data files, or memory entries.
- No PDF generation — "Download the brief" is a placeholder anchor for now.
- No copy in `week3FieldKit.ts` or any sales-enablement data.

## 5. Technical notes

- `src/data/categoryResearchProgramme.ts` exports typed objects: `hypotheses`, `surveyBlocks`, `quotaMatrix`, `interviewGuide`, `secondarySources`, `timelinePhases`, `deliverables`, `risks`. Page maps over them.
- New sidebar group requires a small addition to `AppSidebar.tsx` (new `NavGroup` + items array). Keep group ordering: insert after "Sales Enablement".
- Homepage card insertion: locate the "Positioning & Messaging" section in `src/components/home/` and add a sibling card — confirm exact file during build.
