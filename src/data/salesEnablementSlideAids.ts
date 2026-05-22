// Per-slide rep-facing aids surfaced on the Field Kit PDF cards.
// Discovery questions and objection/response pairs — all written in approved
// language. No FOQA/FDM/ASAP, no "CoAnalyst" in customer-facing copy, no
// unapproved ROI numbers, BrandNumber rule respected.

export interface SlideObjection {
  pushback: string;
  response: string;
}

export interface SlideMeta {
  dtop?: "D" | "T" | "O" | "P";
  persona: Array<"Exec" | "Ops" | "Tech">;
  connectsTo?: string[]; // human label, e.g. "Slide 03 · DTOP"
  bannedHere?: string[]; // slide-specific landmine phrases
}

/** Hand-curated discovery questions per slide. Used in addition to anything
 *  the paraphraser pulls out of narration quotes. Cap 3 per slide. */
export const SLIDE_DISCOVERY: Record<string, string[]> = {
  "se-slide-shift": [
    "When your regulator last asked for outcome evidence — how long did it take to produce?",
    "Who in your organisation owns 'proof the loop closed', not just 'we delivered the training'?",
  ],
  "se-plain-english-shift": [
    "Which of safety, content, and training is the most disconnected from the other two today?",
    "If a signal surfaces in operations, how many systems does it touch before training updates?",
  ],
  "se-slide-whatis": [
    "Which of these boxes — safety, content, training, intelligence, mobile — do you own today?",
    "Where do signals from the line actually land in your current stack?",
  ],
  "se-slide-dtop": [
    "If you had to pick the weakest step in your loop today — Detect, Trigger, Orchestrate or Prove — which one?",
    "How do you currently prove to a regulator that an action closed an event?",
  ],
  "se-slide-signals": [
    "Which of these four signal sources is hardest for you to act on today?",
    "Where do operational change requests live — and who owns turning them into work?",
  ],
  "se-slide-maturity-roadmap": [
    "Which stage describes you today — and which are you being asked to reach in 12 to 18 months?",
    "What's stopping you moving from your current stage to the next one?",
  ],
  "se-platform-insights-intelligence": [
    "Where does your team spend most of its analyst time — finding signals, or explaining them?",
    "What would change if recommended actions arrived already cited to the source procedure?",
  ],
  "se-slide-coanalyst": [
    "If a domain-trained assistant cited every answer to regulation, procedure and training — what would your team do differently?",
    "Where does generic AI fall down for you today — accuracy, citations, or trust?",
  ],
  "se-slide-insights": [
    "Which operational trends do you wish surfaced themselves before someone had to ask?",
    "How long does it take to produce a trend report leadership actually trusts?",
  ],
  "se-slide-automation": [
    "Which orchestrated step takes the longest today — revision, review, training assignment, or device sync?",
    "If a signal automatically opened the right revision and routed it for review, what would you redeploy that time on?",
  ],
  "se-slide-mobile": [
    "How long between a procedure change and crews having it on their device today?",
    "What percentage of your crew still uses paper or PDFs offline?",
  ],
  "se-discovery-to-close": [
    "What outcome does leadership need evidence of in the next 90 days?",
    "Who else needs to be in the room when we have this conversation again?",
  ],
  "se-discovery-question-bank": [
    "Which of these questions would unlock the most useful answer from your champion this week?",
  ],
  "se-strategy-vision-session": [
    "Would a three-hour session with our team and yours, on your operating model, be useful to your leadership?",
    "Who would you want in the room — and what would 'a good outcome' look like for them?",
  ],
  "se-persona-playbook": [
    "Who in your organisation owns the operating model — and who owns the tooling that supports it?",
    "Which of safety, ops, training or IT will block this, and which will champion it?",
  ],
  "se-who-to-target": [
    "Who in your organisation is being asked outcome-level questions they can't yet answer?",
    "Which leader's roadmap has 'connected operations' on it this year?",
  ],
};

/** Hand-curated objection/response pairs per slide. */
export const SLIDE_OBJECTIONS: Record<string, SlideObjection[]> = {
  "se-slide-dtop": [
    {
      pushback: "Isn't this just workflow with a fancy name?",
      response:
        "Workflow moves tasks. DTOP closes a loop — Detect a signal, Trigger the right action, Orchestrate the work, Prove the outcome. Workflow has no Detect and no Prove.",
    },
    {
      pushback: "We already have a CMS and a training system.",
      response:
        "Both are systems of record. DTOP makes them a system of action — one signal reaches both, and the loop is closed with evidence a regulator accepts.",
    },
  ],
  "se-slide-coanalyst": [
    {
      pushback: "We'll build it ourselves on top of GPT.",
      response:
        "Generic AI lands at roughly 35% accuracy on aviation work. Domain-trained Generative AI on connected Operational Data lands at roughly 90%. The gap is the training data — not the model.",
    },
    {
      pushback: "What about data security — are you training on our data?",
      response:
        "Your Operational Data stays in your tenancy. The intelligence layer runs against it, not on it — no training, no model leakage, audit trail per answer.",
    },
  ],
  "se-platform-insights-intelligence": [
    {
      pushback: "How is this different from a generic LLM?",
      response:
        "Three differences: aviation-trained, cited to regulation and procedure for every answer, and connected to your Operational Data — not just to the public web.",
    },
    {
      pushback: "Prove the 90% number.",
      response:
        "Benchmarked on aviation-domain questions at maturity levels four and five — independent evaluation methodology available under NDA in the Strategy & Vision Session.",
    },
  ],
  "se-slide-mobile": [
    {
      pushback: "Our crews already have iPads with another EFB / reader.",
      response:
        "Unified Mobile isn't a reader — it's the last mile of DTOP. Same revision that closed the loop in Orchestrate lands on the device within 48 hours, with read-receipt and training context.",
    },
    {
      pushback: "We need it to work offline.",
      response:
        "Designed offline-first. Crews keep working through the flight; sync and acknowledgement happen on next connection.",
    },
  ],
  "se-slide-automation": [
    {
      pushback: "Automation scares our SMEs — they'll lose control.",
      response:
        "Automation moves the busywork — revision routing, review assignment, device sync. SMEs keep the decisions; we remove the chasing.",
    },
  ],
  "se-slide-insights": [
    {
      pushback: "We already have dashboards.",
      response:
        "Dashboards show what happened. Insights surface what's drifting — and route the right Recommended Action into the loop, so it doesn't sit on a slide deck.",
    },
  ],
  "se-strategy-vision-session": [
    {
      pushback: "We're not ready for a workshop.",
      response:
        "It isn't a workshop — it's three hours, fixed agenda, your leadership on your operating model. The outcome is clarity on what to do next, not a procurement step.",
    },
    {
      pushback: "Who'd run it from your side?",
      response:
        "Our domain team, not sales — the same people who built the operating model. Free, complimentary, scoped before we walk in.",
    },
  ],
  "se-slide-maturity-roadmap": [
    {
      pushback: "We're already at Connected.",
      response:
        "Most operators describe themselves at Connected and operate at Managed. The Strategy & Vision Session pressure-tests where you actually are.",
    },
  ],
  "se-footprint-single": [
    {
      pushback: "We only need one of the Core Apps today.",
      response:
        "That's where most customers start. The platform makes the second and third app land in weeks, not quarters — because the foundation is already in place.",
    },
  ],
  "se-footprint-all": [
    {
      pushback: "Three apps at once is too much change.",
      response:
        "Three apps land on one foundation, with one rollout — that's less change than buying three point solutions and integrating them later.",
    },
  ],
  "se-w3-roadmap-vision-frame": [
    {
      pushback: "Your roadmap dates look ambitious.",
      response:
        "Dates are committed phase-by-phase, with the POC partners named. Available under NDA in the Strategy & Vision Session.",
    },
  ],
};

/** Per-week fallback discovery questions when a slide has none curated and
 *  none can be extracted from narration. */
export const WEEK_DISCOVERY_FALLBACK: Record<"w1" | "w2" | "w3", string[]> = {
  w1: [
    "Which part of this story most matches what your leadership is being asked for?",
    "If you had to pick the weakest step of your loop today, which one would it be?",
  ],
  w2: [
    "Which of these capabilities would change the most for your team in the next 90 days?",
    "Where would you want this to plug in first — and where last?",
  ],
  w3: [
    "Who else needs to be in the room when we take this further?",
    "What outcome would make this conversation worth having again next week?",
  ],
};

/** Per-week fallback objections when a slide has no curated pushback. */
export const WEEK_OBJECTION_FALLBACK: Record<"w1" | "w2" | "w3", SlideObjection[]> = {
  w1: [
    {
      pushback: "We've been told this story before.",
      response:
        "Most operators have heard the operating-model story — few have seen it joined up across safety, content and training on one foundation. That's the difference.",
    },
    {
      pushback: "Why now?",
      response:
        "Regulators have shifted from prescriptive compliance to outcome evidence. Tools built for records can't produce that evidence on demand.",
    },
  ],
  w2: [
    {
      pushback: "How is this different from what we already use?",
      response:
        "Point solutions cover one band at best. We unify Insights, Intelligence, Automation and Unified Mobile on one Operational Data foundation — that's the moat.",
    },
    {
      pushback: "We'd rather build internally.",
      response:
        "Generic AI on disconnected data tops out near 35% domain accuracy. The gap to ~90% is the connected data foundation, not the model — that's the part you'd be rebuilding.",
    },
  ],
  w3: [
    {
      pushback: "We're not ready to commit.",
      response:
        "The next step isn't a commitment — it's the complimentary Strategy & Vision Session: three hours, fixed agenda, your leadership on your operating model.",
    },
    {
      pushback: "We need to think about it.",
      response:
        "Fair. What would you need to see in the next two weeks to make this worth bringing to your leadership?",
    },
  ],
};

// ─── Proof points (defensible stats the rep can drop in-meeting) ─────────────
export const SLIDE_PROOFS: Record<string, string[]> = {
  "se-slide-shift": [
    "Regulators have shifted from prescriptive compliance to outcome evidence.",
    "Industry exposure: $25–35B in controllable operational cost (Eurocontrol, IATA, SITA).",
  ],
  "se-slide-dtop": [
    "DTOP is the only loop that includes both a Detect and a Prove step.",
    "Point tools cover one of four signal sources at best.",
  ],
  "se-slide-coanalyst": [
    "~90% accuracy on aviation-domain questions at L4–5 maturity.",
    "~35% accuracy when generic AI runs on disconnected data.",
    "Every answer cited to regulation, procedure and training source.",
  ],
  "se-platform-insights-intelligence": [
    "Three intelligence tiers — Insights, Intelligence, Automation — on one foundation.",
    "~90% domain vs ~35% generic on the same questions.",
  ],
  "se-slide-insights": [
    "Trends route a Recommended Action into the loop — not a slide.",
    "Detect layer fuses four signal sources into one stream.",
  ],
  "se-slide-automation": [
    "Orchestrate step: routing, review, training assignment, device sync.",
    "SMEs keep decisions; the platform removes the chasing.",
  ],
  "se-slide-mobile": [
    "Revision-to-device in under 48 hours, offline-first.",
    "Read-receipt and training context land with the same revision.",
  ],
  "se-slide-signals": [
    "Four canonical signal sources: operational, safety, regulatory, training.",
    "Wedge question after Detect: 'Which of these four is hardest to act on today?'",
  ],
  "se-slide-maturity-roadmap": [
    "Most operators self-describe at Connected; operate at Managed.",
    "Intelligence Layer outcomes anchor at L4–5.",
  ],
  "se-strategy-vision-session": [
    "Three hours, fixed agenda, your leadership on your operating model.",
    "Run by the domain team, not sales — complimentary, scoped in advance.",
  ],
  "se-w3-roadmap-vision-frame": [
    "Phase dates committed; POC partners named under NDA.",
    "Insights, Automation, Mobile — sequenced, not simultaneous.",
  ],
  "se-footprint-single": [
    "Most customers start with one Core App; second and third land in weeks.",
    "One foundation, three Core Apps — the moat compounds.",
  ],
  "se-footprint-all": [
    "Three apps land on one foundation, in one rollout.",
    "Less change than buying three point solutions and integrating later.",
  ],
  "se-plain-english-shift": [
    "Aviation isn't short on data — it's short on signals it can act on.",
    "Three disconnected stacks today: safety, content, training.",
  ],
  "se-slide-whatis": [
    "Five boxes: safety, content, training, intelligence, mobile.",
    "One Operational Data foundation underneath all five.",
  ],
};

export const WEEK_PROOF_FALLBACK: Record<"w1" | "w2" | "w3", string[][]> = {
  w1: [
    [
      "DTOP loop: Detect → Trigger → Orchestrate → Prove.",
      "One foundation under safety, content and training.",
    ],
    [
      "Four signal sources fused at the Detect layer.",
      "Outcome evidence on demand, not on request.",
    ],
  ],
  w2: [
    [
      "~90% domain vs ~35% generic AI accuracy.",
      "Every answer cited to source — regulation, procedure, training.",
    ],
    [
      "Insights · Intelligence · Automation on one Operational Data layer.",
      "Unified Mobile is the last mile, not a separate app.",
    ],
  ],
  w3: [
    [
      "Strategy & Vision Session: 3 hours, complimentary, fixed agenda.",
      "Three differentiators: connected data, cited AI, closed loop.",
    ],
    [
      "Footprint patterns: 1, 2, or all 3 Core Apps — same foundation.",
      "Land first app in weeks; second and third compound from there.",
    ],
  ],
};

// ─── Whiteboard recipe / where-to-point ──────────────────────────────────────
export const SLIDE_WHITEBOARD: Record<string, string> = {
  "se-slide-dtop": "Draw four boxes in a loop: D (blue), T (amber), O (violet), P (emerald). Arrow the loop clockwise. Circle the gap they own today.",
  "se-slide-dtop-whiteboard": "Same as the DTOP slide — but draw it yourself, in colour, in under 90 seconds, without looking at the deck.",
  "se-slide-dtop-whiteboard-runbook": "Stroke order: D · T · O · P · loop arrow · 'PROVE' underline. Pause after each letter for the customer to react.",
  "se-slide-signals": "Draw four arrows pointing into a single 'Detect' box: operational, safety, regulatory, training. Ask which arrow is weakest.",
  "se-slide-whatis": "Five stacked bands: safety, content, training (Core Apps) · intelligence · mobile. Underline the foundation.",
  "se-slide-coanalyst": "Two columns: 'Generic AI ~35%' vs 'Domain AI on Operational Data ~90%'. Circle the 55-point gap.",
  "se-slide-maturity-roadmap": "Five rungs: Ad-hoc · Managed · Connected · Predictive · Autonomous. Mark where they are, where they're being asked to be.",
  "se-platform-insights-intelligence": "Three horizontal bands: Insights (see) · Intelligence (reason) · Automation (act). Point to each, then the foundation underneath.",
  "se-slide-mobile": "One arrow from 'Revision approved' to 'Crew device, offline'. Label the arrow '48 hours'.",
  "se-strategy-vision-session": "Three boxes: their operating model · our domain team · the outcome (clarity). No procurement box.",
  "se-footprint-single": "Draw one Core App on the foundation. Show two empty slots — the upgrade path.",
  "se-footprint-two": "Two Core Apps sharing one foundation. Show the third slot.",
  "se-footprint-all": "Three Core Apps on one foundation, one rollout. Cross out '3 point solutions + integration'.",
};

export const WEEK_WHITEBOARD_FALLBACK: Record<"w1" | "w2" | "w3", string> = {
  w1: "Point at the loop, then the foundation, then the signal sources — in that order.",
  w2: "Point at the capability band, then the Operational Data layer it runs on.",
  w3: "Point at the footprint pattern, then the Strategy & Vision Session as the next step.",
};

// ─── Common rep mistake to avoid ─────────────────────────────────────────────
export const SLIDE_MISTAKE: Record<string, string> = {
  "se-slide-shift": "Don't open with product. Open with the regulator's shift to outcome evidence.",
  "se-slide-dtop": "Don't pitch DTOP as workflow. Workflow has no Detect and no Prove.",
  "se-slide-coanalyst": "Don't say 'our AI is better' — anchor the 90% vs 35% on aviation-domain questions at L4–5 maturity.",
  "se-slide-mobile": "Don't position it as another EFB reader — it's the last mile of DTOP.",
  "se-slide-automation": "Don't say automation replaces SMEs. It removes the chasing; SMEs keep the decisions.",
  "se-slide-insights": "Don't conflate Insights with dashboards. Dashboards show what happened; Insights route the action.",
  "se-slide-signals": "Don't list the four signal sources flat. Anchor each to a system the customer already runs.",
  "se-platform-insights-intelligence": "Don't show the three tiers without naming the foundation underneath.",
  "se-slide-maturity-roadmap": "Don't let them self-rate without pressure-testing — most claim Connected, operate at Managed.",
  "se-strategy-vision-session": "Don't scope it in the meeting — it's pre-scoped, complimentary, fixed agenda.",
  "se-slide-whatis": "Don't read the boxes left to right. Start with the foundation, then build up.",
  "se-plain-english-shift": "Don't quote ROI numbers we haven't signed off. This slide is messaging.",
  "se-footprint-single": "Don't oversell a multi-app rollout. Land the wedge first.",
  "se-footprint-all": "Don't apologise for the scope. Three on one foundation is less change than three point tools.",
  "se-discovery-to-close": "Don't close on a procurement step. Close on the Strategy & Vision Session.",
};

export const WEEK_MISTAKE_FALLBACK: Record<"w1" | "w2" | "w3", string> = {
  w1: "Don't pitch features in week-1 territory. Earn the right with the operating model first.",
  w2: "Don't tour capabilities without anchoring each to a use case the customer owns.",
  w3: "Don't ask for a commitment. Ask for the Strategy & Vision Session.",
};

// ─── Per-slide meta (DTOP stage, persona fit, cross-refs, banned phrases) ────
export const SLIDE_META: Record<string, SlideMeta> = {
  "se-slide-shift": {
    persona: ["Exec"],
    connectsTo: ["DTOP", "Maturity Roadmap"],
    bannedHere: ["digital transformation", "AI-powered"],
  },
  "se-plain-english-shift": {
    persona: ["Exec", "Ops"],
    connectsTo: ["What Is the Platform"],
    bannedHere: ["unapproved ROI numbers"],
  },
  "se-slide-whatis": {
    persona: ["Exec", "Ops", "Tech"],
    connectsTo: ["DTOP", "Signal Sources"],
  },
  "se-slide-dtop": {
    dtop: "D",
    persona: ["Exec", "Ops"],
    connectsTo: ["Signal Sources", "Value Unlocked"],
    bannedHere: ["workflow tool", "FOQA", "FDM", "ASAP"],
  },
  "se-slide-dtop-whiteboard": {
    dtop: "D",
    persona: ["Ops", "Tech"],
    connectsTo: ["DTOP", "Maturity Whiteboard"],
  },
  "se-slide-signals": {
    dtop: "D",
    persona: ["Ops", "Tech"],
    connectsTo: ["DTOP"],
    bannedHere: ["FOQA", "FDM", "ASAP"],
  },
  "se-slide-maturity-roadmap": {
    persona: ["Exec"],
    connectsTo: ["Strategy & Vision Session"],
  },
  "se-platform-insights-intelligence": {
    dtop: "O",
    persona: ["Exec", "Tech"],
    connectsTo: ["CoAnalyst Slide", "Insights", "Automation"],
    bannedHere: ["CoAnalyst", "the AI", "LLM"],
  },
  "se-slide-coanalyst": {
    dtop: "O",
    persona: ["Exec", "Tech"],
    connectsTo: ["Tiers vs AI"],
    bannedHere: ["CoAnalyst", "chatbot", "the AI"],
  },
  "se-slide-insights": {
    dtop: "D",
    persona: ["Ops"],
    connectsTo: ["Automation", "Recommended Actions"],
    bannedHere: ["dashboard tool"],
  },
  "se-slide-automation": {
    dtop: "O",
    persona: ["Ops", "Tech"],
    connectsTo: ["Insights", "Mobile"],
    bannedHere: ["replace SMEs"],
  },
  "se-slide-mobile": {
    dtop: "P",
    persona: ["Ops"],
    connectsTo: ["Automation"],
    bannedHere: ["EFB", "reader app"],
  },
  "se-strategy-vision-session": {
    persona: ["Exec"],
    connectsTo: ["Maturity Roadmap", "Discovery to Close"],
    bannedHere: ["workshop", "demo", "procurement"],
  },
  "se-footprint-single": {
    persona: ["Exec", "Ops"],
    connectsTo: ["Footprint Ladder"],
  },
  "se-footprint-two": {
    persona: ["Exec", "Ops"],
    connectsTo: ["Footprint Ladder"],
  },
  "se-footprint-all": {
    persona: ["Exec"],
    connectsTo: ["Footprint Ladder"],
  },
  "se-discovery-to-close": {
    persona: ["Exec", "Ops", "Tech"],
    connectsTo: ["Strategy & Vision Session"],
  },
  "se-w3-roadmap-vision-frame": {
    persona: ["Exec"],
    connectsTo: ["Strategy & Vision Session"],
  },
};

export const WEEK_META_FALLBACK: Record<"w1" | "w2" | "w3", SlideMeta> = {
  w1: { persona: ["Exec", "Ops"], bannedHere: ["FOQA", "FDM", "ASAP", "CoAnalyst"] },
  w2: { persona: ["Tech", "Ops"], bannedHere: ["CoAnalyst", "the AI", "LLM"] },
  w3: { persona: ["Exec"], bannedHere: ["procurement step", "workshop"] },
};
