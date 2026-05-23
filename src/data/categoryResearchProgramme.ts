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


// -----------------------------------------------------------------------------
// FULL SURVEY QUESTION SET
// -----------------------------------------------------------------------------

export type SurveyQuestion = {
  id: string;
  text: string;
  scale: string;
  maps: string;
};

export type SurveyBlockFull = {
  block: string;
  intent: string;
  questions: SurveyQuestion[];
};

export const surveyQuestions: SurveyBlockFull[] = [
  {
    block: "Block 1 — Screener & firmographics",
    intent: "Confirm eligibility and quota fit; capture baseline segmentation variables.",
    questions: [
      { id: "Q1.1", text: "Which best describes your organisation?", scale: "Single-select: Airline · Defense operator · Rail operator · MRO · Other (screen-out)", maps: "Quota" },
      { id: "Q1.2", text: "Which best describes your role?", scale: "Single-select: CEO/COO · Head of Safety · Head of Compliance / Reg · Head of Training & L&D · Ops / Flight Ops leader · CTO / Head of Digital · Other (screen-out)", maps: "Quota" },
      { id: "Q1.3", text: "What is the approximate size of the operation you are responsible for? (fleet / network / unit count)", scale: "Single-select bands", maps: "Segmentation" },
      { id: "Q1.4", text: "What is your level of decision-making authority over software or platform purchases above $250k?", scale: "Single-select: Sole signer · Co-signer · Recommender · No authority (screen-out)", maps: "Quota" },
    ],
  },
  {
    block: "Block 2 — Current stack & fragmentation",
    intent: "Measure operational fragmentation and the gap between data availability and decision velocity.",
    questions: [
      { id: "Q2.1", text: "Roughly how many distinct systems do safety, compliance, training and operations rely on day-to-day?", scale: "Numeric input (capped at 50)", maps: "H1" },
      { id: "Q2.2", text: "When a regulatory change is published, how long does it typically take to reach the operational teams it affects?", scale: "Single-select: <1 day · 1–7 days · 1–4 weeks · 1–3 months · >3 months", maps: "H1" },
      { id: "Q2.3", text: "How strongly do you agree: \"Critical operational decisions in our business are delayed by data sitting in disconnected systems.\"", scale: "5-pt Likert (Strongly disagree → Strongly agree)", maps: "H1" },
      { id: "Q2.4", text: "How much of your team's week is spent reconciling, exporting or re-entering data between systems?", scale: "Single-select bands: <10% · 10–25% · 25–50% · >50% · Don't know", maps: "H1" },
      { id: "Q2.5", text: "How much do you trust the operational data you report upward to be complete and timely?", scale: "5-pt Likert (Not at all → Completely)", maps: "H1" },
    ],
  },
  {
    block: "Block 3 — Decision quality at L4–5",
    intent: "Test the binding-constraint claim that domain accuracy — not generic AI — drives operational decision quality.",
    questions: [
      { id: "Q3.1", text: "How confident are you that the most important operational decisions in your business are taken with the right evidence in front of the right person at the right time?", scale: "5-pt Likert", maps: "H2" },
      { id: "Q3.2", text: "In the last 12 months, roughly what share of significant operational decisions required rework, reversal or escalation?", scale: "Single-select bands: <5% · 5–15% · 15–30% · >30% · Don't know", maps: "H2" },
      { id: "Q3.3", text: "How is generic AI (e.g. ChatGPT-style assistants) currently being used in your operational decisions?", scale: "MaxDiff across 6 use cases (most/least valuable forced choice)", maps: "H2" },
      { id: "Q3.4", text: "How much would you trust generic AI to recommend a course of action in a Level 4 or Level 5 operational decision (high-stakes, time-pressured)?", scale: "5-pt Likert (No trust → Complete trust)", maps: "H2" },
    ],
  },
  {
    block: "Block 4 — Budget & procurement",
    intent: "Surface real procurement direction — point tools vs. integrated platforms — through forced trade-offs, not stated preference.",
    questions: [
      { id: "Q4.1", text: "Across safety, compliance, training and operations technology, how is your budget allocated today vs. how you expect it to be allocated in 24 months?", scale: "Constant-sum (100 points) × today / 24-mo across 4 buckets", maps: "H3" },
      { id: "Q4.2", text: "If you had to choose, which would you prioritise for net-new investment in the next 12 months?", scale: "Conjoint: best-fit-point-tool vs. integrated-platform across 4 paired scenarios", maps: "H3" },
      { id: "Q4.3", text: "Who owns the budget line that would fund a platform spanning safety, compliance and operations?", scale: "Single-select: Safety · Compliance/Reg · Ops · IT/Digital · Shared · No owner yet", maps: "H3" },
      { id: "Q4.4", text: "What is the largest single deal size you can sign without further executive approval?", scale: "Single-select bands ($k)", maps: "Segmentation" },
    ],
  },
  {
    block: "Block 5 — Regulatory pressure",
    intent: "Calibrate awareness of and readiness for the shift from prescriptive compliance to performance-based oversight.",
    questions: [
      { id: "Q5.1", text: "How familiar are you with regulator moves toward performance-based oversight in your industry (e.g. EASA SMS, FAA Part 5, ICAO Annex 19)?", scale: "5-pt Likert (Not familiar → Deeply familiar)", maps: "H4" },
      { id: "Q5.2", text: "How ready is your current operating model to evidence performance — not just compliance — to a regulator on demand?", scale: "5-pt Likert (Not ready → Fully ready)", maps: "H4" },
      { id: "Q5.3", text: "What single change in regulator behaviour would put the most pressure on your current systems?", scale: "Open-text (coded post-fieldwork)", maps: "H4" },
    ],
  },
  {
    block: "Block 6 — Category language test",
    intent: "Measure comprehension, preference and purchase intent for the new category name against control labels.",
    questions: [
      { id: "Q6.1", text: "When you read this description [shown], how clearly does it describe a problem you experience? [Description rotates across 3 candidate category labels.]", scale: "5-pt Likert per label, randomised order", maps: "H5" },
      { id: "Q6.2", text: "Of these three labels for the category, which best describes the space you'd most want to invest in?", scale: "Forced-choice between 3 labels (rotated)", maps: "H5" },
      { id: "Q6.3", text: "How likely are you to actively explore vendors in this category in the next 12 months?", scale: "11-pt purchase-intent / NPS-style", maps: "H5" },
      { id: "Q6.4", text: "Compared to your current technology spend in this area, what would you be willing to pay for a platform that delivered the outcomes described?", scale: "Single-select bands: Less · Same · 10–25% more · 25–50% more · >50% more", maps: "H5" },
    ],
  },
  {
    block: "Block 7 — Maturity self-assessment",
    intent: "Score each respondent on a 5-level rubric across 6 capability dimensions to segment the market.",
    questions: [
      { id: "Q7.1", text: "Operational data — From siloed spreadsheets (L1) to a unified, real-time operational data substrate (L5).", scale: "Rubric-anchored L1–L5 single-select", maps: "Maturity" },
      { id: "Q7.2", text: "Content & manuals — From PDF-bound revisions (L1) to queryable, version-controlled living knowledge (L5).", scale: "Rubric-anchored L1–L5", maps: "Maturity" },
      { id: "Q7.3", text: "Safety & risk — From reactive event logging (L1) to prescriptive, closed-loop risk control (L5).", scale: "Rubric-anchored L1–L5", maps: "Maturity" },
      { id: "Q7.4", text: "Training & competency — From compliance records (L1) to readiness tied to operational signals (L5).", scale: "Rubric-anchored L1–L5", maps: "Maturity" },
      { id: "Q7.5", text: "Decision support — From dashboards (L1) to AI-driven recommended actions in operational workflow (L5).", scale: "Rubric-anchored L1–L5", maps: "Maturity" },
      { id: "Q7.6", text: "Evidence & assurance — From manual audit prep (L1) to continuous, regulator-grade evidence on demand (L5).", scale: "Rubric-anchored L1–L5", maps: "Maturity" },
    ],
  },
  {
    block: "Block 8 — Brand-lift (held to end)",
    intent: "Measure aided/unaided awareness and perceived fit. Held to the final block so it cannot bias earlier responses.",
    questions: [
      { id: "Q8.1", text: "Which vendors come to mind when you think about the category we've just been discussing? (unaided)", scale: "Open-text (coded post-fieldwork)", maps: "Brand-lift" },
      { id: "Q8.2", text: "How well does each of the following vendors fit the outcomes you described as most important? [list shown, randomised]", scale: "5-pt Likert per vendor", maps: "Brand-lift" },
    ],
  },
];

// -----------------------------------------------------------------------------
// FULL QUALITATIVE DISCUSSION GUIDE
// -----------------------------------------------------------------------------

export type InterviewSectionFull = {
  section: string;
  durationMin: number;
  primary: string;
  probes: string[];
  listenFors: string[];
  tests: string;
};

export const interviewQuestions: InterviewSectionFull[] = [
  {
    section: "1. Context & remit",
    durationMin: 8,
    primary: "Walk me through your remit and the three KPIs you're judged on at the end of the year.",
    probes: [
      "Who else owns a slice of operational performance alongside you?",
      "What's changed in your remit in the last 18 months — and what's coming?",
      "Where do you sit when something operational goes wrong in the middle of the night?",
    ],
    listenFors: ["Split accountability", "Recently expanded remit", "KPIs not aligned to outcomes"],
    tests: "Frame",
  },
  {
    section: "2. Current stack & operational pain",
    durationMin: 12,
    primary: "Where does the data your team needs already exist — but takes days or weeks to reach a decision?",
    probes: [
      "Walk me through the last time you were technically compliant but operationally too late.",
      "What's the workflow you most wish you could rebuild from scratch?",
      "What does the integration map between safety, compliance, training and ops actually look like today?",
    ],
    listenFors: ["Manual reconciliation", "Spreadsheet layer between systems", "Event-to-action lag in days/weeks"],
    tests: "H1",
  },
  {
    section: "3. Decision triggers & buying behaviour",
    durationMin: 10,
    primary: "What had to be true for your last platform purchase above $500k to actually get signed?",
    probes: [
      "Who can kill that kind of deal who isn't usually in the room?",
      "What's the most recent tool you bought and would now replace within 18 months — and why?",
      "How much weight do analyst voices (Gartner, Forrester, Verdantix) carry in your buying committee?",
    ],
    listenFors: ["Procurement gatekeepers", "Buyer's remorse signals", "Analyst influence vs. peer reference"],
    tests: "H3",
  },
  {
    section: "4. Category language test",
    durationMin: 10,
    primary: "When you describe this problem to your CFO or your board, what words do you actually use?",
    probes: [
      "If I said 'operational intelligence layer' to you — what would you assume that meant?",
      "Here are three candidate labels for this category [show]. Which feels most fundable, and why?",
      "What language about this space has been overused to the point of being meaningless?",
    ],
    listenFors: ["CFO-facing vocabulary", "Preferred label vs. control labels", "Burnt-out buzzwords"],
    tests: "H5",
  },
  {
    section: "5. Budget, procurement & politics",
    durationMin: 10,
    primary: "Where does the money come from for a platform that spans safety, compliance, training and ops — and who has to agree?",
    probes: [
      "Is there a budget owner today for something this cross-functional, or does it have to be created?",
      "What's the realistic procurement timeline from first conversation to PO in your business?",
      "What's the security or data-residency hurdle most likely to slow this down?",
    ],
    listenFors: ["Orphan budget line", "Security/IT veto points", "Multi-quarter procurement reality"],
    tests: "H3",
  },
  {
    section: "6. Future state & regulatory horizon",
    durationMin: 10,
    primary: "If your regulator moved formally to performance-based oversight in the next 24 months, what breaks first in your current operating model?",
    probes: [
      "What would 'good' actually look like for you in 24 months — describe a normal Tuesday.",
      "Where do you expect generative AI to be genuinely useful in your operation by then — and where do you expect it to fail?",
      "What would have to be true for you to consolidate three or four current vendors into one platform?",
    ],
    listenFors: ["Evidence-on-demand readiness", "AI use cases trusted at L4–5", "Consolidation appetite"],
    tests: "H4 + H2",
  },
];
