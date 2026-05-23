// Category Research Programme — copy lives here

export type Method = "Survey" | "Interview" | "Secondary" | "All three";

export const hypotheses: Array<{ id: string; claim: string; method: Method; rationale: string }> = [
  {
    id: "H1",
    claim: "Operational fragmentation is universal across Tier-1 operators in safety-critical industries.",
    method: "All three",
    rationale: "If true, the category exists by definition — buyers feel the same pain regardless of vendor mix.",
  },
  {
    id: "H2",
    claim: "Generic AI underperforms at L4–5 operational decisions; domain accuracy is the binding constraint.",
    method: "Survey",
    rationale: "Validates the ~90% vs ~35% intelligence-layer claim independent of vendor framing.",
  },
  {
    id: "H3",
    claim: "Budget is shifting from point tools to platforms that span compliance, safety and ops.",
    method: "Interview",
    rationale: "Conjoint trade-off and exec interviews surface real procurement behaviour, not stated preference.",
  },
  {
    id: "H4",
    claim: "Regulators are moving from prescriptive compliance to performance-based oversight.",
    method: "Secondary",
    rationale: "Evidenced by EASA, FAA, ICAO Annex 19 publications; survey corroborates buyer awareness.",
  },
  {
    id: "H5",
    claim: "A named category accelerates buying — unnamed problems do not get funded.",
    method: "Survey",
    rationale: "Category-language test measures comprehension lift and purchase intent vs unnamed framing.",
  },
];

export const surveyBlocks: Array<{ block: string; construct: string; qType: string; tests: string }> = [
  { block: "1. Screener & firmographics", construct: "Eligibility, role, budget authority", qType: "Single-select", tests: "Sample integrity" },
  { block: "2. Current stack & fragmentation", construct: "Tool count, hand-offs, time-to-decision", qType: "Likert + numeric", tests: "H1" },
  { block: "3. Decision quality at L4–5", construct: "Confidence, rework, AI usage", qType: "Likert + MaxDiff", tests: "H2" },
  { block: "4. Budget & procurement", construct: "Spend allocation today vs 24 months", qType: "Constant sum + conjoint", tests: "H3" },
  { block: "5. Regulatory pressure", construct: "Awareness of performance-based oversight", qType: "Likert + open", tests: "H4" },
  { block: "6. Category language test", construct: "Label comprehension, preference, intent", qType: "Randomised forced-choice + NPS", tests: "H5" },
  { block: "7. Maturity self-assessment", construct: "L1–L5 across 6 capability dimensions", qType: "Rubric-anchored Likert", tests: "Segmentation" },
  { block: "8. Brand-lift (held to end)", construct: "Aided/unaided awareness, fit-to-need", qType: "Single-select + Likert", tests: "Report appendix only" },
];

export const quotaMatrix = {
  total: 300,
  regions: [
    { name: "North America", n: 110 },
    { name: "Europe", n: 110 },
    { name: "APAC", n: 50 },
    { name: "MEA", n: 30 },
  ],
  industries: [
    { name: "Airlines", n: 140 },
    { name: "Defense", n: 90 },
    { name: "Rail", n: 70 },
  ],
  roles: [
    { name: "CEO / COO", n: 45 },
    { name: "Head of Safety", n: 60 },
    { name: "Head of Compliance / Reg", n: 60 },
    { name: "Head of Training & L&D", n: 45 },
    { name: "Ops / Flight Ops", n: 50 },
    { name: "CTO / Head of Digital", n: 40 },
  ],
};

export const interviewGuide: Array<{ section: string; probes: [string, string]; tests: string }> = [
  {
    section: "1. Context",
    probes: ["Walk me through your remit and the three KPIs you're judged on.", "Who else owns a slice of operational performance with you?"],
    tests: "Frame, not a hypothesis",
  },
  {
    section: "2. Current stack & pain",
    probes: ["Where does data live but take weeks to reach a decision?", "What's the last incident where systems were technically compliant but operationally late?"],
    tests: "H1",
  },
  {
    section: "3. Decision triggers",
    probes: ["What had to be true for your last platform purchase to get signed?", "What would make you replace a tool you bought in the last 18 months?"],
    tests: "H3",
  },
  {
    section: "4. Category language test",
    probes: ["When you describe this problem to your CFO, what words do you use?", "If I said 'operational intelligence layer' — what would you assume that means?"],
    tests: "H5",
  },
  {
    section: "5. Buying process & budget",
    probes: ["Where does the money come from — safety, compliance, ops, IT?", "Who can kill the deal who isn't in the room?"],
    tests: "H3",
  },
  {
    section: "6. Future state",
    probes: ["If the regulator moved to performance-based oversight tomorrow, what breaks first?", "What would 'good' look like in 24 months?"],
    tests: "H4",
  },
];

export const secondarySources: Array<{ class: string; examples: string; triangulates: string }> = [
  { class: "Regulator publications", examples: "EASA SMS guidance, FAA Part 5, ICAO Annex 19, CAA CAP 795", triangulates: "H4 — performance-based shift" },
  { class: "Analyst notes", examples: "Gartner, Forrester, IDC, Verdantix EHS/Ops", triangulates: "H5 — category framing precedent" },
  { class: "Industry bodies", examples: "IATA, A4A, Eurocontrol, SITA", triangulates: "H1, H2 — fragmentation and AI accuracy benchmarks" },
  { class: "Operator filings", examples: "Top-20 carrier 10-K / annual reports", triangulates: "H3 — budget shift signals" },
  { class: "Job-posting analysis", examples: "LinkedIn, Indeed, internal recruiter feeds", triangulates: "H1, H3 — demand signal for combined roles" },
  { class: "Competitive review", examples: "~15 adjacent vendors across EHS, SMS, EFB, LMS, GRC", triangulates: "H5 — white space mapping" },
];

export const timelinePhases: Array<{ weeks: string; phase: string; bucket: "D" | "T" | "O" | "P"; detail: string }> = [
  { weeks: "W1–2", phase: "Design & instrument", bucket: "D", detail: "Hypotheses locked, survey + guide drafted, advisory panel review." },
  { weeks: "W3", phase: "Pilot (n=20)", bucket: "D", detail: "Cognitive testing, drop-off analysis, final wording." },
  { weeks: "W4–7", phase: "Fieldwork", bucket: "T", detail: "Quant and qual run in parallel through blinded partner." },
  { weeks: "W8–9", phase: "Analysis & synthesis", bucket: "O", detail: "Segmentation, conjoint, thematic coding, evidence ledger." },
  { weeks: "W10", phase: "Report draft", bucket: "O", detail: "First-draft category report + methodology appendix." },
  { weeks: "W11", phase: "Internal + analyst preview", bucket: "P", detail: "Pre-brief 2–3 named analysts under embargo." },
  { weeks: "W12", phase: "Publish", bucket: "P", detail: "Report live, briefing deck out, interactive benchmark ungated." },
];

export const deliverables = [
  { n: "01", title: "Category positioning report", detail: "~40pp, public, analyst-grade. The thought-leadership artefact." },
  { n: "02", title: "Methodology & data appendix", detail: "Sampling, instrument, weighting, response rates — published with the report." },
  { n: "03", title: "Executive briefing deck", detail: "15-slide sales-enablement cut for AE-led conversations." },
  { n: "04", title: "Interactive maturity benchmark", detail: "Lead-gen asset — buyers self-score and see peer distribution." },
];

export const risks = [
  { risk: "Small sample in Defense segment", mitigation: "Boost quota +20%, apply post-stratification weights." },
  { risk: "Vendor-bias perception", mitigation: "Blinded fieldwork partner; no brand mentions until block 8." },
  { risk: "Category label rejected", mitigation: "Three fallback labels tested in instrument; report leads with the winner." },
  { risk: "Fieldwork overrun", mitigation: "Quant and qual parallelised; weekly checkpoint with kill criteria." },
  { risk: "Analyst dismisses as marketing", mitigation: "Independent advisory panel signs off methodology; raw data retained for audit." },
];

export const advisoryPanel = [
  { role: "Ex-Forrester / Gartner analyst", purpose: "Methodology credibility & analyst-language fluency." },
  { role: "Academic — survey methodology", purpose: "Instrument design, bias control, weighting review." },
  { role: "Operator-side practitioner (ex-CSO/COO)", purpose: "Face-validity of constructs and interview probes." },
];

export const budgetBands = [
  { line: "Fieldwork partner (blinded panel + recruiting)", range: "£120k – £180k" },
  { line: "Qual interviews (recruit + honoraria + transcription)", range: "£45k – £70k" },
  { line: "Advisory panel (3 × honoraria)", range: "£15k – £25k" },
  { line: "Design, analysis, report production", range: "£60k – £90k" },
  { line: "Analyst pre-brief programme", range: "£10k – £20k" },
];
