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
