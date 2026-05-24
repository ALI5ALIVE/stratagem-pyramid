## Goal

Take every number in the keynote that a skeptical buyer or investor would isolate, and either (a) re-scope it so the claim matches the source, (b) demote it from headline to supporting, or (c) reframe it as a relative claim that is easier to defend. The narrative arc and the DTOP framing stay intact — only the numbers and their captions change.

This addresses the six soft underbellies from the stress-test: false-precision on per-operator signal volume, undefined "orphaned" rate, ambiguous scope on $25–35B, weak n on the 3-week cycle, the 18–24 interview range, and the 90/35 accuracy framing.

## Numbers to revise

### 1. Per-operator signal volume — drop false precision
- **Before:** "65K+ Operational signals per Tier-1 operator per year"
- **After:** "50–100K reports, observations & operational flags per year — Tier-1 operator range"
- **Source caption:** "IATA SMS Implementation Survey 2023 (maturity data) scaled against Comply365 customer baselines. Range, not point estimate — varies by reporting culture and fleet size."

### 2. Orphaned-signal rate — add an explicit definition
- **Before:** "~40% Orphaned — captured but never closed"
- **After:** "~40% of operational reports without documented closure within 90 days"
- **Source caption:** unchanged (FSF 2023 SMS Maturity Study + IATA SMS 2023 + Comply365 baselines), with the 90-day definition added inline so the chip and the headline agree.

### 3. Investigation cycle — demote and qualify
- **Before:** "3 weeks Mean investigation cycle, signal → decision" (headline)
- **After:** moved out of the headline cluster into a single supporting beat under the cost panel, reworded as: "2–4 weeks typical signal-to-decision time across Comply365 customer baselines (composite, anonymised — n disclosed in appendix)."
- Headline slot replaced by the 90/35 accuracy stat reframed as a relative claim (see #5) so the headline cluster remains four cards.

### 4. $25–35B exposure — scope it explicitly
- **Before:** "$25–35B Annual industry exposure from disconnected operations"
- **After:** "$25–35B Addressable controllable-cost envelope, industry-wide"
- **Source caption** gets a third sentence: "This is the addressable cost envelope across controllable safety, maintenance, OTP, fuel and insurance — not total industry P&L, and not Comply365's serviceable market. Built bottom-up from per-operator baselines applied across IATA's reporting carriers."
- The same scope sentence is added to the "Master message" pill row near the hero so the framing is consistent on both surfaces.

### 5. 90% vs 35% AI accuracy — keep the headline, add the guardrails
Per the locked memory ("CoAnalyst Accuracy Headline · canonical 90% vs 35% framing") the absolute numbers stay. What changes is the **definition** around them, on the slide and in the script:
- **Slide caption (new):** "Recommendation accuracy on a representative operational decision set at severity L4–L5. Benchmarked against a human-expert reference panel. Methodology published in the appendix on keynote day."
- **Script line added** in the Intelligence Layer act, immediately after the 90/35 reveal: *"That's recommendation accuracy on a defined operational decision set, scored against a human-expert panel. The benchmark methodology is published — we want it challenged."*
- **Appendix slide (new)** — see #7.

### 6. Research sample — lock the interview number
- **Before:** "18–24 executive interviews"
- **After:** placeholder `RESEARCH_INTERVIEW_N` constant defaulting to **21** ("21 executive interviews across 5 countries and 3 industries"), used in all three places it currently appears in the script and the beats. Single source of truth so the final number is updated in one place before keynote day.
- The methodology badge stays as "Modelled, not measured."

### 7. New "What we're not claiming" appendix block
Add a small, sober section near the Companion Assets block at the bottom of `SilosToSignalsKeynote.tsx`. Six lines, each one explicit:
- We are not claiming the $25–35B figure is our addressable market.
- We are not claiming 90% accuracy on all AI tasks — only L4–5 recommendation on the defined set.
- We are not claiming 100% signal capture — closure rate is the target, not capture rate.
- We are not claiming customer baselines generalise without segmentation.
- We are not claiming regulatory endorsement of DTOP as a category.
- We are not claiming the founding-12 programme is a paid pilot — it is unfunded partnership.

This buys back trust faster than any additional positive claim.

## Files to change

- `src/data/silosToSignalsScript.ts` — update `todayEvidence` values, labels and source captions; rewrite the silo-era and research paragraphs to match the revised scoping (drop "65K", drop "18–24" range, add the 90-day definition, add the addressable-cost-envelope sentence, add the recommendation-accuracy guardrail line in the intelligence act); export a new `RESEARCH_INTERVIEW_N` constant and a new `notClaiming: string[]` array.
- `src/pages/keynote/SilosToSignalsKeynote.tsx` — update silo-era `beats[]` to match the new stats; update the headline pill row ("~65% lost signals", "$25–35B exposure", "90% vs 35% accuracy") to the revised wording; render a new `NotClaiming` section above the closing line; add the recommendation-accuracy caption to the intelligence act's beats.
- `src/components/keynote/KeynoteFragmentationCost.tsx` — retitle the Top-Cost-Drivers panel to "Annual envelope for a representative 50-aircraft narrowbody operator" and add a single line under it explaining how industry-wide $25–35B builds from this baseline.

## What does NOT change

- The DTOP framing, the Tuesday-morning story, the master message ("From event to control"), the call-to-arms, the hero film, downloads section, and the locked CoAnalyst accuracy headline numbers (90 / 35) themselves.
- No data-layer or backend changes. No new sources introduced — every revision uses citations already in the project.
- No edits to memory; the existing CoAnalyst Accuracy Headline memory still rules the absolute numbers, this plan only adds the guardrail copy around them.

## Open question

For the 90/35 framing, do you want me to (a) keep the absolute headline and add the guardrail caption as above, or (b) additionally surface a parallel "~3x improvement on the defined decision set" framing as a secondary pill that's easier for non-technical investors to repeat? My recommendation is (a) only — adding (b) muddies the headline.
