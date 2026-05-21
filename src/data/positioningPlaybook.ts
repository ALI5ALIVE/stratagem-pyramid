// Comply365 Positioning & Messaging Playbook — canonical copy source
// All messaging here is authoritative for GTM use. Edits should be reviewed
// against project memory (DTOP, Intelligence Layer 90/35, terminology rules,
// trust signals, product naming, roadmap dates).

export const playbookMeta = {
  version: "1.0",
  updated: "May 2026",
  owners: "Product Marketing · Sales Enablement",
};

export const audienceMap = [
  {
    role: "Sales",
    grab: "Sections 3, 5, 9, 10, 11 — narrative, pillars × personas, competitive, objections, sales kit.",
  },
  {
    role: "Marketing & PMM",
    grab: "Sections 2, 4, 5, 8, 12 — category, positioning, pillars, Intelligence Layer, terminology & boilerplate.",
  },
  {
    role: "Customer Success",
    grab: "Sections 3, 6, 7, 11 — narrative, platform story, DTOP, sales kit (vision session).",
  },
  {
    role: "Executives",
    grab: "Sections 2, 3, 7, 9 — POV, master narrative, DTOP, competitive frame.",
  },
];

export const thirtySecondPitch = `Comply365 is the Operational Performance Platform for safety-critical industries. We turn the everyday signals from your operation — content, training, safety events, mobile activity — into recommended actions your people actually take, using a domain-tuned Intelligence Layer that hits ~90% accuracy where generic AI lands near 35%. The result is a closed loop from event to control, run on one platform instead of ten.`;

export const category = {
  name: "Operational Performance Platform",
  enemy: "Fragmented tools and generic AI that produce dashboards instead of decisions.",
  shift:
    "From a stack of disconnected compliance, training and safety systems — to one operating model that detects what matters, triggers the right work, orchestrates it across teams, and proves the outcome.",
  manifesto: [
    "Operations don't fail from a lack of data. They fail from a lack of control.",
    "Generic AI is a tourist in your operation. Domain intelligence is a resident.",
    "Compliance is the floor. Performance is the ceiling. We're built for the ceiling.",
    "Every signal should end in an action. Every action should leave evidence.",
  ],
};

export const masterNarrative = {
  today:
    "Operators sit on a decade of operational data trapped in disconnected systems. Safety, training, content and ops each have their own tool, their own truth, and their own queue. Generic AI bolted on top produces fluent summaries that miss the operation by a mile.",
  tomorrow:
    "One platform unifies the operational record. Domain-tuned intelligence reads it the way an experienced operator would. Every signal becomes a recommended action, every action becomes evidence, and the loop closes — measurably — between event and control.",
  oneParagraph:
    "Comply365 is the Operational Performance Platform for safety-critical industries. We bring content, training, safety and frontline mobile into one operational record, then apply a domain-tuned Intelligence Layer that turns signals into Recommended Actions at ~90% accuracy. Our DTOP operating model — Detect, Trigger, Orchestrate, Prove — gives leaders a closed loop from event to control, with the evidence chain regulators expect.",
  masterMessage: "From event to control — on one platform, with domain intelligence, in one loop.",
  versions: {
    thirty: thirtySecondPitch,
    two: `Most operators have spent a decade buying point tools — one for safety, one for training, one for manuals, one for the frontline. The result is a stack that creates work instead of removing it, and a layer of generic AI on top that's a tourist in your operation. Comply365 is built differently. We unify the operational record across content, training, safety and mobile. Then our Intelligence Layer — tuned on your domain — turns the signals in that record into Recommended Actions at ~90% accuracy, versus the ~35% you get from generic models. We wrap it in the DTOP operating model: Detect what matters, Trigger the right work, Orchestrate it across teams, Prove the outcome with an audit trail. That's how event becomes control. On one platform, not ten.`,
    ten: `Boardroom-grade version: see Executive Pitch deck. Full operational walkthrough: see Operational Pitch deck. Technical depth: see Technical Deep Dive v4.`,
  },
};

export const positioningStatement = {
  forWho: "For operators in safety-critical industries (aviation, rail, defense)",
  who: "who are accountable for closing the loop between operational events and operational control,",
  category: "Comply365 is the Operational Performance Platform",
  benefit:
    "that turns content, training, safety and frontline signals into recommended actions — backed by a domain-tuned Intelligence Layer.",
  unlike: "Unlike generic AI platforms, point compliance tools, or in-house data projects,",
  proof:
    "we deliver ~90% domain accuracy at L4–L5, a single operational record, and the DTOP loop — Detect → Trigger → Orchestrate → Prove — with evidence the regulator accepts.",
};

export const pillars = [
  {
    id: "control",
    name: "Operational Control",
    one: "Close the loop from event to action — every time.",
    why: "Operators don't lack data. They lack the muscle to act on it with confidence and proof.",
  },
  {
    id: "intelligence",
    name: "Domain Intelligence",
    one: "~90% accuracy on your domain — not ~35% from a generic model.",
    why: "Domain-tuned intelligence reads the operation the way an experienced operator would.",
  },
  {
    id: "dtop",
    name: "The DTOP Loop",
    one: "Detect · Trigger · Orchestrate · Prove — one operating model across the business.",
    why: "A shared loop removes hand-off gaps between safety, ops, training and content.",
  },
  {
    id: "platform",
    name: "One Unified Platform",
    one: "Content, Training, Safety, Mobile — and the Intelligence Layer above them.",
    why: "Fewer tools, one record, lower TCO, faster time to a decision.",
  },
] as const;

export const personas = [
  { id: "exec", short: "CEO / COO", title: "Accountable Executive" },
  { id: "safety", short: "Safety / Compliance", title: "Head of Safety" },
  { id: "ops", short: "Operations", title: "VP / Director Ops" },
  { id: "it", short: "IT / Data", title: "CIO · CDO · Architecture" },
  { id: "frontline", short: "Frontline", title: "Pilots · Crew · Engineers" },
] as const;

// 4 pillars × 5 personas
export const pillarPersonaMatrix: Record<string, Record<string, { line: string; proof: string }>> = {
  control: {
    exec: { line: "Fewer surprises, faster recovery, board-ready evidence.", proof: "Closed-loop event → action coverage reported monthly." },
    safety: { line: "Every signal lands as an action with an owner and a clock.", proof: "Trigger queue with SLAs and audit chain." },
    ops: { line: "Disruption recovery measured in hours, not days.", proof: "Orchestrated workflows across crew, content and training." },
    it: { line: "One control plane instead of integration spaghetti.", proof: "Single platform, documented data contracts." },
    frontline: { line: "Tasks arrive prioritised — with the right manual, the right training.", proof: "Unified mobile app, role-aware queue." },
  },
  intelligence: {
    exec: { line: "AI you can put in front of a regulator.", proof: "~90% domain accuracy at L4–L5 vs ~35% generic." },
    safety: { line: "Reads the signal the way your best investigator would.", proof: "Domain-tuned models on your operational record." },
    ops: { line: "Recommended Actions that fit how the operation actually runs.", proof: "Suggestions grounded in your data, not the open web." },
    it: { line: "Tenant-isolated, evidence-tracked, no rogue model risk.", proof: "Per-tenant tuning, full lineage on every output." },
    frontline: { line: "Plain-English next steps — not search results.", proof: "Recommended Actions rendered in-app." },
  },
  dtop: {
    exec: { line: "One operating model the whole business can run on.", proof: "Detect → Trigger → Orchestrate → Prove, end-to-end." },
    safety: { line: "Detection feeds the right trigger, every time.", proof: "Mapped triggers for the events that matter." },
    ops: { line: "Orchestration removes the hand-off gaps that cost hours.", proof: "Cross-team workflows on a single timeline." },
    it: { line: "Replace ad-hoc automations with a shared loop.", proof: "DTOP as a reference architecture." },
    frontline: { line: "Less chasing — the work finds you with the context.", proof: "Triggered tasks land in the mobile app." },
  },
  platform: {
    exec: { line: "Consolidate three to five vendors into one record of truth.", proof: "Content, Training, Safety, Mobile + Intelligence Layer." },
    safety: { line: "Safety isn't a silo — it's wired into training and content.", proof: "Same record, same loop." },
    ops: { line: "Ops sees what safety sees, in time to act on it.", proof: "Shared operational data foundation." },
    it: { line: "Lower TCO, fewer integrations, cleaner audit story.", proof: "One platform footprint, documented APIs." },
    frontline: { line: "One app for the things you actually do every day.", proof: "Unified mobile shell for Content · Training · Safety." },
  },
};

export const productStory = [
  {
    name: "Core Apps",
    what: "Content, Training and Safety apps that already run safety-critical operations.",
    why: "Proven systems of record — the foundation the loop is built on.",
    line: "The operational systems of record, modernised and wired together.",
    link: "/platform-playbook",
  },
  {
    name: "Operational Data Foundation",
    what: "A unified record of operational signals across the apps and the frontline.",
    why: "Domain intelligence needs domain data. This is where it lives.",
    line: "One operational record — not five disconnected exports.",
    link: "/platform-playbook",
  },
  {
    name: "Intelligence Layer",
    what: "Domain-tuned Generative AI delivering Recommended Actions on operational data.",
    why: "~90% accuracy at L4–L5 vs ~35% from generic AI is the moat.",
    line: "AI you can put in front of a regulator.",
    link: "/coanalyst",
  },
  {
    name: "Unified Mobile App",
    what: "One frontline shell for Content, Training and Safety.",
    why: "Closes the loop where the work actually happens.",
    line: "One trusted door for the frontline.",
    link: "/mobile-playbook",
  },
  {
    name: "DTOP Operating Model",
    what: "Detect · Trigger · Orchestrate · Prove — the loop the platform runs on.",
    why: "Shared operating model across safety, ops, training and content.",
    line: "From event to control — measurably.",
    link: "/dtop-playbook",
  },
];

export const dtopSteps = [
  { letter: "D", name: "Detect", color: "text-blue-400 border-blue-400/40 bg-blue-500/10", desc: "Identify the signals that matter — across content, training, safety and mobile." },
  { letter: "T", name: "Trigger", color: "text-amber-400 border-amber-400/40 bg-amber-500/10", desc: "Convert each signal into a Recommended Action with an owner and a clock." },
  { letter: "O", name: "Orchestrate", color: "text-violet-400 border-violet-400/40 bg-violet-500/10", desc: "Run the work across teams on one timeline — no email tennis." },
  { letter: "P", name: "Prove", color: "text-emerald-400 border-emerald-400/40 bg-emerald-500/10", desc: "Evidence the outcome with a full audit chain regulators accept." },
];

export const intelligenceLayer = {
  headline: "~90% domain accuracy at L4–L5 vs ~35% generic AI.",
  whyDefensible: [
    "Tuned on the operational record — not on the open web.",
    "Per-tenant isolation: your data stays yours, your model stays yours.",
    "Evidence chain on every Recommended Action — inputs, reasoning, sources.",
    "Operator-in-the-loop by design — never a black box that decides alone.",
  ],
  say: [
    "Recommended Actions",
    "Domain-tuned",
    "Operational Data",
    "Generative AI",
    "Evidence chain",
  ],
  neverSay: [
    "Autonomous AI",
    "Self-flying / self-deciding",
    "FOQA / FDM / ASAP",
    "CoAnalyst (legacy internal name)",
    "AGI / general AI",
  ],
};

export const competitiveMatrix = [
  {
    competitor: "Generic AI platforms",
    theirPitch: "Plug our LLM into your data and ask questions.",
    ourWin: "~90% domain accuracy at L4–L5 vs their ~35%. Tuned on your operation, not the open web.",
    trapQ: "What's your accuracy on a real operational signal — not a benchmark?",
  },
  {
    competitor: "Point compliance / safety tools",
    theirPitch: "Best-of-breed for this one workflow.",
    ourWin: "One operational record across content, training, safety, mobile. The loop closes here — there it doesn't.",
    trapQ: "How many tools does an incident touch before you can prove it's closed?",
  },
  {
    competitor: "In-house AI / data projects",
    theirPitch: "We'll build it ourselves on our data lake.",
    ourWin: "Two-year build to L3. We're already at L4–L5 with the evidence chain regulators accept.",
    trapQ: "When are you due to show the regulator the audit trail on an AI-driven decision?",
  },
  {
    competitor: "Status quo (spreadsheets + email)",
    theirPitch: "It works today.",
    ourWin: "Today's cost shows up as recovery time, repeat findings and missed signals. DTOP closes that gap.",
    trapQ: "What was the controllable cost of your last three operational disruptions?",
  },
];

export const objections = [
  { q: "Our data isn't clean enough for AI.", r: "Domain tuning works on operational signal, not a perfect lake. Start with one DTOP loop on the data you already have.", p: "Live tenants running on the existing operational record today.", c: "Pick one loop. We'll stand it up on the data you have." },
  { q: "We're already invested in a generic AI platform.", r: "Keep it for general productivity. The Intelligence Layer is for safety-critical decisions — ~90% vs ~35%.", p: "Domain accuracy gap is the difference between a suggestion and a Recommended Action.", c: "Run both on the same operational question. Compare." },
  { q: "Security and tenant isolation.", r: "Per-tenant models, your data never trains anyone else's tenant. Evidence chain on every output.", p: "Architecture deep dive in the Technical Deep Dive v4.", c: "We'll bring the security architect to the next call." },
  { q: "AI in safety-critical contexts feels risky.", r: "Operator-in-the-loop by design. AI recommends, humans decide, the audit chain proves it.", p: "Every Recommended Action carries inputs, reasoning and sources.", c: "Walk a real signal end-to-end on your data." },
  { q: "We can build this ourselves.", r: "Two-year build to L3 — we're at L4–L5 with the evidence chain. You'd be rebuilding what's already running.", p: "Roadmap dates locked for Insights, Automation and Mobile.", c: "Compare your in-house plan to a 90-day DTOP loop in production." },
  { q: "Too many vendors already.", r: "We consolidate three to five. Content, Training, Safety and Mobile on one record.", p: "TCO model in the Line of Sight calculator.", c: "Map your current stack — we'll show what collapses." },
  { q: "ROI is hard to prove.", r: "DTOP makes outcomes measurable — controllable cost, recovery time, repeat findings. ROI modelling is illustrative, validated in the loop.", p: "Line of Sight ROI calculator with industry benchmarks.", c: "Run the calculator together on your numbers." },
  { q: "Change management will kill it.", r: "We start with one loop, one team, one outcome. The platform earns the next one.", p: "Half-day Strategy & Vision session as the entry point.", c: "Book the complimentary workshop." },
  { q: "Integration with our existing systems.", r: "Documented data contracts, established connectors, no rip-and-replace required.", p: "Architecture footprint in the Technical Deep Dive.", c: "Run an integration scoping in week one." },
  { q: "What's different from your competitors?", r: "Domain intelligence, one operational record, the DTOP loop. Three things, none of them generic.", p: "Competitive matrix in this playbook.", c: "Side-by-side on a real use case." },
  { q: "We need this approved by the regulator.", r: "Evidence chain on every Recommended Action is the regulator-grade story. Operator-in-the-loop, not autonomous.", p: "Customer references in regulated environments.", c: "Bring your compliance lead to the next session." },
  { q: "Pricing feels high.", r: "Compare against the controllable cost of disruption, not the line items on your current stack.", p: "Line of Sight calculator shows the gap.", c: "Build the business case in the half-day session." },
];

export const discoveryByStage = {
  Discover: [
    "Walk me through the last operational disruption you owned end-to-end — where did time go?",
    "How many tools does a single safety event touch before you can call it closed?",
    "Where does your team currently lose evidence between systems?",
    "What's the regulator going to ask you about AI in the next 12 months?",
  ],
  Qualify: [
    "Who owns operational performance as a metric — not safety, not training, performance?",
    "What budget moves if you collapse three tools into one?",
    "Is there a board-level mandate on operational AI? When?",
    "Which renewal in the next 12 months is the natural trigger?",
  ],
  Vision: [
    "If every operational signal landed as a Recommended Action, what changes for your team?",
    "What does 'event to control' look like in your operation today vs in 12 months?",
    "Which loop, closed first, would matter most to the COO?",
  ],
  Proof: [
    "Can we run a real signal end-to-end on your data in the next session?",
    "Who needs to see the evidence chain to sign off?",
    "What's the success metric we agree on for a 90-day loop?",
  ],
  Close: [
    "What stops us starting the 90-day loop next month?",
    "Who else needs to be in the room for the half-day session?",
    "What's the renewal/contract trigger we should align to?",
  ],
};

export const emailTemplates = [
  {
    name: "Cold — exec",
    subject: "Event → control, in 90 days",
    body: `Hi {{first}},\n\nMost operators I speak with run three to five tools to close a single safety event. The cost shows up as recovery time, repeat findings, and AI that's a tourist in your operation.\n\nComply365 is the Operational Performance Platform: one record across Content, Training, Safety and Mobile — and an Intelligence Layer that hits ~90% domain accuracy where generic AI lands near 35%.\n\nWorth a 30-minute call to walk the loop on your operation?\n\n{{sig}}`,
  },
  {
    name: "Warm — operations lead",
    subject: "From signal to Recommended Action",
    body: `Hi {{first}},\n\nFollowing our last conversation — the gap you described between safety detection and ops orchestration is exactly the loop DTOP is built for: Detect → Trigger → Orchestrate → Prove.\n\nI'd like to bring one of our solution architects to walk a live signal on data that looks like yours. 45 minutes, no slides.\n\n{{sig}}`,
  },
  {
    name: "Strategy & Vision invite",
    subject: "Complimentary half-day: Operational Performance Vision",
    body: `Hi {{first}},\n\nWe run a complimentary half-day Strategy & Vision session for operators thinking about the next three years of operational performance. Fixed 4-hour agenda — your operation today, the platform story, DTOP deep dive, the roadmap, and an agreed next step.\n\nOn-site or virtual, your call. Pick a date and I'll send the prep brief.\n\n{{sig}}`,
  },
];

export const demoFlow = [
  { step: 1, title: "Frame the operation", time: "5 min", what: "Set the lens — event to control, on one platform." },
  { step: 2, title: "Walk a live signal", time: "15 min", what: "Detect the event in the operational record, on screen." },
  { step: 3, title: "Trigger a Recommended Action", time: "10 min", what: "Show the action, the owner, the clock, the evidence chain." },
  { step: 4, title: "Orchestrate across teams", time: "10 min", what: "Cross-functional workflow on one timeline." },
  { step: 5, title: "Prove the outcome", time: "5 min", what: "Audit chain, regulator-grade view." },
  { step: 6, title: "Tie back to their loop", time: "5 min", what: "Which loop would they close first?" },
];

export const whoToTarget = [
  { tier: "Tier 1", who: "Existing Comply365 customer · 1 app live · renewal in <12 months.", why: "Highest propensity — they already trust the platform.", action: "Lead with Strategy & Vision session." },
  { tier: "Tier 2", who: "Existing customer · 2+ apps live.", why: "Strongest expansion ground for the Intelligence Layer.", action: "Lead with DTOP loop on the data already in the platform." },
  { tier: "Tier 3", who: "Strategic / multi-BU prospect in aviation, rail, defense.", why: "Net-new platform play — long cycle, big prize.", action: "Lead with the master narrative and exec pitch." },
];

export const visionSessionAgenda = [
  { time: "0:00", item: "Your operation today — fragmentation map" },
  { time: "0:45", item: "The Operational Performance Platform — story & shift" },
  { time: "1:30", item: "Intelligence Layer — domain vs generic AI" },
  { time: "2:15", item: "DTOP loop — walk a real signal end-to-end" },
  { time: "3:00", item: "Operational Performance Roadmap — what's possible in 12–24 months" },
  { time: "3:30", item: "Candidate first loop + agreed next step" },
];

export const terminology = {
  approved: [
    { term: "Operational Performance Platform", note: "The category name. Always capitalised." },
    { term: "Intelligence Layer", note: "User-facing name for the domain-tuned AI layer." },
    { term: "Recommended Actions", note: "The output unit of the Intelligence Layer." },
    { term: "Operational Data", note: "Use instead of any acronym for source signals." },
    { term: "Generative AI", note: "Approved umbrella term." },
    { term: "DTOP", note: "Detect · Trigger · Orchestrate · Prove. Always in this order." },
    { term: "Comply365 · SafetyManager365 · ContentManager365", note: "BrandNumber format. No space." },
  ],
  forbidden: [
    { term: "CoAnalyst", note: "Legacy internal name. Never in user-facing copy." },
    { term: "FOQA · FDM · ASAP", note: "Industry acronyms — use 'Operational Data' instead." },
    { term: "Autonomous AI · self-deciding", note: "Operator-in-the-loop is the message." },
    { term: "Compliance365 / Safety 365 / Content 365 (with space)", note: "Wrong format." },
    { term: "AGI · general AI", note: "Off-message and undefensible." },
  ],
};

export const trustSignals = [
  "Trusted by safety-critical operators in aviation, rail and defense.",
  "Per-tenant data isolation — your data, your model.",
  "Evidence chain on every Recommended Action — inputs, reasoning, sources.",
  "Operator-in-the-loop by design — never autonomous decisions.",
  "$25–35B annual industry exposure to operational disruption (Eurocontrol · IATA · SITA).",
];

export const boilerplate = {
  short:
    "Comply365 is the Operational Performance Platform for safety-critical industries — unifying content, training, safety and mobile under a domain-tuned Intelligence Layer that turns signals into Recommended Actions.",
  medium:
    "Comply365 is the Operational Performance Platform for safety-critical industries. We bring content, training, safety and frontline mobile into one operational record, and apply a domain-tuned Intelligence Layer that delivers Recommended Actions at ~90% accuracy. Our DTOP operating model — Detect, Trigger, Orchestrate, Prove — closes the loop from operational event to operational control, with the evidence chain regulators accept.",
  long:
    "Comply365 is the Operational Performance Platform for safety-critical industries. Operators in aviation, rail and defense have spent a decade buying point tools — one for safety, one for training, one for manuals, one for the frontline — and bolting generic AI on top. The result is a stack that creates work and an AI layer that's a tourist in their operation. Comply365 is built differently. We unify the operational record across Content, Training, Safety and Mobile. Our Intelligence Layer is tuned on that record, hitting ~90% domain accuracy at L4–L5 where generic models land near 35%. And we wrap it in the DTOP operating model: Detect what matters, Trigger the right work, Orchestrate it across teams, Prove the outcome with an audit trail regulators accept. From event to control — on one platform, with domain intelligence, in one loop.",
};

export const roiDisclaimer =
  "ROI figures presented in this playbook and supporting calculators are illustrative models grounded in published industry benchmarks (Eurocontrol, IATA, SITA). They are not customer guarantees and should be validated against the customer's own operational data in a Strategy & Vision session or a 90-day loop.";

export const appendixLinks = [
  { label: "DTOP Operating Model Playbook", href: "/dtop-playbook" },
  { label: "Intelligence Layer Playbook", href: "/coanalyst" },
  { label: "Platform Playbook", href: "/platform-playbook" },
  { label: "Signals 101", href: "/signals-playbook" },
  { label: "Persona Deep-Dive", href: "/personas" },
  { label: "Sales Enablement Training", href: "/sales-enablement" },
  { label: "Sales Enablement Academy", href: "/academy" },
  { label: "Practice Center", href: "/practice-center" },
  { label: "Line of Sight ROI", href: "/line-of-sight" },
];

export const sections = [
  { id: "use", n: 1, title: "How to use this playbook" },
  { id: "category", n: 2, title: "Category & POV" },
  { id: "narrative", n: 3, title: "Master narrative" },
  { id: "positioning", n: 4, title: "Positioning architecture" },
  { id: "pillars", n: 5, title: "Messaging pillars × personas" },
  { id: "product", n: 6, title: "Platform & product story" },
  { id: "dtop", n: 7, title: "DTOP operating model" },
  { id: "intelligence", n: 8, title: "Intelligence Layer positioning" },
  { id: "competitive", n: 9, title: "Competitive frame" },
  { id: "objections", n: 10, title: "Top 12 objections" },
  { id: "saleskit", n: 11, title: "Sales kit" },
  { id: "brand", n: 12, title: "Brand & terminology rules" },
  { id: "appendix", n: 13, title: "Appendix" },
];
