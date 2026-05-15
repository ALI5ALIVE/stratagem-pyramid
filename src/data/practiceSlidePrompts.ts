export interface SlidePrompts {
  /** One line the rep can say to land on the slide */
  opener: string;
  /** 2–3 short bullets — the message the rep should land */
  talkingPoints: string[];
  /** 2–3 questions the rep can ask the AI buyer to provoke engagement */
  buyerQuestions: string[];
}

/**
 * Persona-tuned prompts. Outer key = personaId from practiceScenarios.ts,
 * inner key = slide.id from execPitch3Slides.ts. Transition / divider
 * slides are intentionally omitted.
 */
export const practiceSlidePrompts: Record<string, Record<string, SlidePrompts>> = {
  // ─────────────────────────────────────────────────────────────────────
  "ceo-coo": {
    "exec3-slide-0": {
      opener:
        "Thanks for the time. I want to use the next twenty minutes to show you how operators like you are turning operational predictability into competitive separation.",
      talkingPoints: [
        "Frame this as a strategic conversation, not a product demo.",
        "Three sections: the shift, the platform, the proof — then the commercial path.",
        "Anchor on revenue protection and predictable operations, not features.",
      ],
      buyerQuestions: [
        "What was the one thing that made this conversation worth your time today?",
        "When the board asks you about operational risk, what's the answer you wish you had?",
        "Who else needs to be in the room when this goes from interesting to a decision?",
      ],
    },
    "exec3-slide-1": {
      opener:
        "Every operator we talk to is sitting on more data than ever and making decisions slower than ever — and that gap is where revenue leaks.",
      talkingPoints: [
        "The strategic shift is from collecting data to closing the loop on it.",
        "Point tools made the gap worse — every silo costs you money and speed.",
        "Predictable operations is the new competitive moat.",
      ],
      buyerQuestions: [
        "Where does that gap show up on your P&L most painfully?",
        "If you could close one loop tomorrow, which one would protect the most revenue?",
        "How much of your operating cost today is spent reconciling tools that should talk to each other?",
      ],
    },
    "exec3-slide-outcomes": {
      opener:
        "Before I show you the platform, I want to ground this in what real operators have actually achieved — and what your CFO can take to a board.",
      talkingPoints: [
        "Lead with the outcome that matches their P&L pressure — disruption cost, audit cost, or training cost.",
        "These are anonymised composite results across deployed carriers — not marketing claims.",
        "Offer a named reference call — that's usually the fastest way to move this forward.",
      ],
      buyerQuestions: [
        "Which of these would have the biggest impact on your scorecard this year?",
        "Would a reference call with an operator your size move this forward?",
        "What would your CFO need to see to believe a number like this?",
      ],
    },
    "exec3-slide-platform": {
      opener:
        "This is the platform on a single page — one connected foundation where today you're paying for five to seven disconnected tools.",
      talkingPoints: [
        "Three core apps on one shared foundation — not three integrations.",
        "The total cost story matters: rationalising tools, not adding one.",
        "Strategic moat: competitors running point tools cannot catch up to a platform-led operator.",
      ],
      buyerQuestions: [
        "How many of these capabilities are you paying separate vendors for today?",
        "If you could rationalise one tool in the next twelve months, which one goes first?",
        "What does your competitive set look like — and how would predictable operations change your position?",
      ],
    },
    "exec3-slide-dtop": {
      opener:
        "This is the operating model that makes the rest of it real — Detect, Trigger, Orchestrate, Prove.",
      talkingPoints: [
        "DTOP is what closes the loop your point tools can't.",
        "Every loop ends in auditable proof — that's how predictability becomes a board-level claim.",
        "This is the operational equivalent of a closed financial-controls system.",
      ],
      buyerQuestions: [
        "Where does the loop break down most often in your operation today?",
        "If you had to name one operational risk that keeps you up at night, where would DTOP have to land?",
        "Who in your leadership team would own the 'closing the loop' mandate?",
      ],
    },
    "exec3-slide-mobile": {
      opener:
        "None of this matters if the crew doesn't actually use it — that's why everything lands in one trusted mobile shell they already open every shift.",
      talkingPoints: [
        "Adoption is the ROI lever — under-used software is a write-off.",
        "One app for crew vs three — measurable productivity gain per shift.",
        "Frees your COO from chasing crew compliance manually.",
      ],
      buyerQuestions: [
        "What does crew adoption of your current mobile tools actually look like?",
        "If we cut clicks-per-task in half on the top three workflows, what does that unlock?",
        "How much of your operational cost is currently lost to manual workarounds in the field?",
      ],
    },
    "exec3-slide-automation": {
      opener:
        "Automation is where the platform stops describing the work and starts doing it — under controls your auditors will recognise.",
      talkingPoints: [
        "Automates the predictable handoffs that today eat headcount.",
        "Human-in-the-loop on every consequential action — board-defensible governance.",
        "Every automated action is auditable — controllable, traceable, reversible.",
      ],
      buyerQuestions: [
        "Which repeatable handoff costs you the most operating time today?",
        "Where would your audit committee insist on a human in the loop?",
        "What would freeing five FTE of manual chase-work change for you next year?",
      ],
    },
    "exec3-slide-insights-summary": {
      opener:
        "Insights is natural-language access to your operational data — for the people who actually run the business, not just the analysts.",
      talkingPoints: [
        "Anyone authorised can ask in plain English — no BI ticket queue.",
        "Answers are grounded in your data, with citations — board-defensible.",
        "Closes the gap between executive question and credible answer from days to seconds.",
      ],
      buyerQuestions: [
        "How long does it take today to get an answer to a question your board didn't expect?",
        "Who in your team is currently being asked questions the data should answer?",
        "What's a question you'd want to ask of your operational data tomorrow morning?",
      ],
    },
    "exec3-slide-coanalyst": {
      opener:
        "This is the slide that separates us from every generic AI demo your team has been pitched this year.",
      talkingPoints: [
        "Domain-tuned on aviation taxonomy — not the open web.",
        "~90% accuracy at L4–5 reasoning vs ~35% generic — measured, not claimed.",
        "Tenant-isolated — your operational data never trains anyone else's model.",
      ],
      buyerQuestions: [
        "Has your team tried plugging a generic AI into your operational data — what did you find?",
        "Where would you want to point Intelligence Layer first to prove the difference?",
        "What would have to be true for you to bet your reputation on an AI-generated answer?",
      ],
    },
    "exec3-slide-tiers-vs-ai": {
      opener:
        "Generic AI is great at general knowledge and dangerous on your operation — and here's why that matters at a board level.",
      talkingPoints: [
        "L1–L3 reasoning is commodity. L4–L5 is where decisions get made — and where generic models break.",
        "We measure publicly against the same prompts — no demo theatre.",
        "Operational AI without domain tuning is a liability your insurers will eventually price.",
      ],
      buyerQuestions: [
        "What's your current organisational policy on AI in safety-critical decisions?",
        "Has anyone ever shown your team where their generic AI was confidently wrong?",
        "Who owns AI risk on your executive team today?",
      ],
    },
    "exec3-slide-insights": {
      opener:
        "Recommendations and prescriptive actions are how the intelligence layer stops being a dashboard and starts driving outcomes.",
      talkingPoints: [
        "Every recommendation is traceable to the data that produced it.",
        "Prescriptive actions go through approval, audit, and rollback — board-grade controls.",
        "Turns insight into orchestrated work without losing oversight.",
      ],
      buyerQuestions: [
        "What's your appetite for letting a system recommend an action vs take one?",
        "Where would prescriptive action have prevented a costly event in the last twelve months?",
        "Who would own the policy for what the system can and cannot do autonomously?",
      ],
    },
    "exec3-slide-regulation": {
      opener:
        "Regulation Management turns a stream of regulatory change into traceable in-app updates — without slowing the operation or hiring more compliance staff.",
      talkingPoints: [
        "Reg in → impact analysis → procedure update → training reassignment → audit trail.",
        "Cuts the lag from published reg to flying crew from weeks to days.",
        "Audit-readiness becomes a default, not a project.",
      ],
      buyerQuestions: [
        "What does an unplanned regulatory inspection cost you today, in time and people?",
        "How much of your compliance headcount is spent assembling evidence vs preventing risk?",
        "What would clean audit-readiness be worth to your insurance and certification posture?",
      ],
    },
    "exec3-slide-roadmap-2026": {
      opener:
        "Here's what's already committed for 2026 — locked dates, named phases, no vapourware.",
      talkingPoints: [
        "Insights, Automation, Mobile each have committed POC and phase dates.",
        "POC vs GA is named explicitly — so your team can plan against real timing.",
        "A POC fits in your roadmap, not around it.",
      ],
      buyerQuestions: [
        "Of these tracks, which one would you want to be in the first POC cohort for?",
        "What does your internal cycle look like to greenlight a POC like this?",
        "What would have to be true in 90 days for you to expand it?",
      ],
    },
    "exec3-slide-why": {
      opener:
        "If you remember three things from today, remember these.",
      talkingPoints: [
        "One connected platform — not another point tool.",
        "Detect → Trigger → Orchestrate → Prove — the only model that closes the loop.",
        "550+ airlines — proven in operation, not promised on a roadmap.",
      ],
      buyerQuestions: [
        "Of those three, which matters most to your decision?",
        "What's the right next step — a deeper session, a reference call, or a scoped POC?",
        "Who else needs to see this before we can move it forward?",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  "vp-safety": {
    "exec3-slide-0": {
      opener:
        "Thanks for the time. I want to spend twenty minutes on how operators are moving their SMS from reactive investigation to proactive hazard intelligence — without breaking what your team already does well.",
      talkingPoints: [
        "Frame this around SMS maturity, not software.",
        "Be explicit: not here to replace your safety team's judgement, but to amplify it.",
        "Invite interruption — safety leaders trust dialogue more than monologue.",
      ],
      buyerQuestions: [
        "Where would you say your SMS sits today — Level 2, Level 3, somewhere in between?",
        "What's the one thing your safety team is being asked for that the data isn't giving you?",
        "Who else in your safety org should see this?",
      ],
    },
    "exec3-slide-1": {
      opener:
        "The shift the regulator is driving — and the shift your auditors are now scoring you on — is from reactive investigation to predictive hazard intelligence.",
      talkingPoints: [
        "Every operator collects more reports than ever; few connect the dots in time.",
        "L4 SMS isn't a software claim — it's evidence of weak-signal detection.",
        "Point tools fragment the safety picture; that's the gap we close.",
      ],
      buyerQuestions: [
        "When was the last time a weak signal in your reports surfaced before the event?",
        "How many systems does an investigator touch in a single ASR follow-up?",
        "What would moving from L2 to L4 actually unlock for your team?",
      ],
    },
    "exec3-slide-outcomes": {
      opener:
        "Let me ground this in safety-specific outcomes other operators have actually achieved.",
      talkingPoints: [
        "Lead with investigation cycle time and audit prep time — those are your KPIs.",
        "Anonymised composite figures — be honest about that.",
        "Offer a peer reference inside another safety org — that lands hardest.",
      ],
      buyerQuestions: [
        "Which of these outcomes would matter most in your next regulator audit?",
        "Would a peer-to-peer call with another VP Safety help here?",
        "What's your investigation cycle time today — and what would halving it free up?",
      ],
    },
    "exec3-slide-platform": {
      opener:
        "This is the platform on a single page — and the reason it matters for safety is that hazard intelligence only works when reports, ops data, training and procedures live on one foundation.",
      talkingPoints: [
        "SafetyManager365 sits on the same foundation as content and training — lessons flow automatically.",
        "Hazard signals correlate across data sources you can't connect today.",
        "Audit evidence assembles itself because it lives in one system.",
      ],
      buyerQuestions: [
        "How many separate systems does a safety investigation currently pull from?",
        "Where do lessons learned die today — between investigation and procedure update, or between procedure and training?",
        "What would 'one safety picture' actually be worth to your team?",
      ],
    },
    "exec3-slide-dtop": {
      opener:
        "DTOP is the safety operating model in software — Detect a hazard, Trigger the right action, Orchestrate the response across the org, Prove the loop closed.",
      talkingPoints: [
        "Detect listens across reports, operational data, maintenance, crew, regulatory and audit.",
        "Orchestrate fires procedure updates and training reassignment — automatically, with audit trail.",
        "Prove gives the regulator the closed-loop evidence they're now asking for.",
      ],
      buyerQuestions: [
        "Walk me through how a hazard detected today actually reaches your frontline crew.",
        "Where in that loop do you lose time, fidelity, or evidence today?",
        "Who owns 'closing the loop' in your SMS — and what gets in their way?",
      ],
    },
    "exec3-slide-mobile": {
      opener:
        "Your safety culture lives or dies in the field — that's why crew read, acknowledge and report inside one trusted mobile shell.",
      talkingPoints: [
        "One app for crew — content, training, safety reporting — not three.",
        "Offline-first: crew can submit a report from the ramp, the cabin, or a hangar with no signal.",
        "Higher reporting volume = better weak-signal detection upstream.",
      ],
      buyerQuestions: [
        "What's your current friction-to-report — how many taps from suspicion to submitted ASR?",
        "How would your reporting volume change if it took 30 seconds instead of three minutes?",
        "Where do crew currently work around your safety tooling?",
      ],
    },
    "exec3-slide-automation": {
      opener:
        "Automation in safety isn't about removing the investigator — it's about removing the chase, the spreadsheet, and the manual reassignment.",
      talkingPoints: [
        "Automates the handoffs: report → impact → procedure update → training reassignment.",
        "Investigator stays in control of the call; the platform does the chase.",
        "Every automated step is auditable — your regulator sees the full chain.",
      ],
      buyerQuestions: [
        "How much of your safety team's week is spent chasing other departments?",
        "Where would you absolutely want a human investigator in the loop?",
        "What's the most repetitive safety handoff you wish would just happen?",
      ],
    },
    "exec3-slide-insights-summary": {
      opener:
        "Insights gives your investigators and managers natural-language access to the safety data they're already drowning in.",
      talkingPoints: [
        "Ask in plain English — 'show me cabin smoke events at hub X in the last 90 days'.",
        "Every answer cites the source ASRs — fully auditable.",
        "Your investigators get hours back per week.",
      ],
      buyerQuestions: [
        "What questions does your team ask the data weekly that take days to answer today?",
        "Where would faster answers change a safety decision?",
        "Who in your team would be the first to use this?",
      ],
    },
    "exec3-slide-coanalyst": {
      opener:
        "Your safety team is the one that has to trust the answer this thing gives — so let me show you why ours is built differently from generic AI.",
      talkingPoints: [
        "Tuned on ICAO taxonomy and operational reporting standards — not the open web.",
        "~90% accuracy at L4–5 reasoning vs ~35% generic — measured on the same prompts.",
        "Every answer cites the source report — your investigators can audit the chain.",
      ],
      buyerQuestions: [
        "Has anyone on your safety team tried a generic AI on a real ASR? What happened?",
        "What would have to be true for your investigators to trust an AI-generated narrative?",
        "Where in your SMS would a 90%-accurate answer engine save the most hours?",
      ],
    },
    "exec3-slide-tiers-vs-ai": {
      opener:
        "Generic AI on safety data is a regulatory exposure waiting to happen — and here's why.",
      talkingPoints: [
        "Generic models hallucinate aviation context because they were trained on the open web.",
        "L4–L5 reasoning — exactly what your investigators do — is where generic models break.",
        "We publish accuracy on the same prompts — no demo theatre.",
      ],
      buyerQuestions: [
        "What would your regulator say about an AI-generated narrative in an investigation?",
        "Has a generic AI ever given your team a confidently wrong safety answer?",
        "Where in your SMS is hallucination an unacceptable risk?",
      ],
    },
    "exec3-slide-insights": {
      opener:
        "This is where the intelligence layer stops describing hazards and starts orchestrating the safety response.",
      talkingPoints: [
        "Every recommendation is traceable to the source ASRs and operational data.",
        "Prescriptive actions — procedure update, training reassignment, comms — go through approval and audit.",
        "Investigator stays in command; the system does the assembly.",
      ],
      buyerQuestions: [
        "How much of your investigator's time today goes to writing the recommendation vs implementing it?",
        "Where do your safety actions get stuck after the investigation is closed?",
        "What's your tolerance for the system suggesting an action vs taking one?",
      ],
    },
    "exec3-slide-regulation": {
      opener:
        "Regulation Management is how a published reg becomes a procedure, a training assignment and an audit trail — without your safety team chasing it manually.",
      talkingPoints: [
        "Reg in → impact analysis → procedure update → training reassignment → audit trail.",
        "Cuts the lag from published reg to flying crew from weeks to days.",
        "Audit-readiness becomes a continuous state, not an event.",
      ],
      buyerQuestions: [
        "How long does it take today from a published reg to your frontline crew operating against it?",
        "Who owns reg change in your safety org — and how many tools do they touch?",
        "What would continuous audit-readiness mean for your last finding?",
      ],
    },
    "exec3-slide-roadmap-2026": {
      opener:
        "Here's what's committed for 2026 — and where your safety org could land in the first cohort.",
      talkingPoints: [
        "Insights, Automation and Mobile each have committed POC and phase dates.",
        "Be honest: POC vs GA is named — don't oversell timing.",
        "Safety POCs typically anchor on weak-signal detection or audit prep.",
      ],
      buyerQuestions: [
        "Which of these tracks would matter most to your SMS next year?",
        "What does your internal process look like to greenlight a safety POC?",
        "What would a successful 90-day POC look like in your safety org?",
      ],
    },
    "exec3-slide-why": {
      opener:
        "If you remember three things from today, remember these — they're the three reasons safety leaders pick us.",
      talkingPoints: [
        "One platform — your safety, content and training data on one foundation.",
        "Detect → Trigger → Orchestrate → Prove — the only model that gives you regulator-grade closed-loop evidence.",
        "Aviation-tuned, not generic — your investigators will trust the output.",
      ],
      buyerQuestions: [
        "Of those three, which matters most to your SMS roadmap?",
        "What's the right next step — a technical deep-dive, a peer reference, or a scoped safety POC?",
        "Who else in your safety org needs to be in this conversation?",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  "vp-ops": {
    "exec3-slide-0": {
      opener:
        "I know your time is short — twenty minutes, and I'll show you how operators are preventing tomorrow's disruption with what they already have today.",
      talkingPoints: [
        "Get to the point fast — VP Ops have low tolerance for warm-up.",
        "Anchor on OTP, completion factor and disruption — their scoreboard.",
        "No rip-and-replace — works with the OCC and crew systems they already run.",
      ],
      buyerQuestions: [
        "What's the disruption metric you're being measured on this quarter?",
        "Where does your OCC lose visibility most often?",
        "What would I have to show you in twenty minutes to make this worth a follow-up?",
      ],
    },
    "exec3-slide-1": {
      opener:
        "The shift that hits ops first is this: the data to predict tomorrow's disruption exists today, but it's stuck in tools that don't talk to your OCC.",
      talkingPoints: [
        "Operational data, safety reports, maintenance and crew systems all carry leading indicators — separately.",
        "By the time the OCC sees a problem, the cost has already cascaded.",
        "Connecting those signals is what closes the gap to predictive ops.",
      ],
      buyerQuestions: [
        "What's the last preventable disruption that hurt your OTP — and what was the earliest signal you could've caught?",
        "How many systems does your OCC reconcile manually in a typical day?",
        "Where does a cascading delay usually start in your operation?",
      ],
    },
    "exec3-slide-outcomes": {
      opener:
        "Real ops outcomes — OTP, completion factor, disruption recovery — from operators running this today.",
      talkingPoints: [
        "Lead with the metric on their scoreboard — usually OTP or completion.",
        "Anonymised composite figures across deployed carriers — be straight about that.",
        "Offer a peer reference at OCC level — VP Ops trust other VP Ops.",
      ],
      buyerQuestions: [
        "Which of these would land hardest on your operating scorecard?",
        "What's a one-point OTP improvement worth to you annually?",
        "Would a peer call with another VP Ops move this forward?",
      ],
    },
    "exec3-slide-platform": {
      opener:
        "This is the platform — but the part that matters for you is that it sits alongside your OCC and crew systems, not on top of them.",
      talkingPoints: [
        "No rip-and-replace: integrates with your existing OCC and crew systems.",
        "Operational signals correlate across silos your tools can't bridge today.",
        "One foundation behind safety, content, training — so disruption causes don't disappear into another department.",
      ],
      buyerQuestions: [
        "What systems does your OCC absolutely have to keep — and what could go away?",
        "Where's the integration tax hurting you most in the OCC?",
        "When safety identifies a hazard today, how long before your OCC sees the operational impact?",
      ],
    },
    "exec3-slide-dtop": {
      opener:
        "DTOP is the operating model — and for an OCC it means turning the noise of operational signals into a single, prioritised next action.",
      talkingPoints: [
        "Detect listens across operational data, maintenance, crew, safety, regulatory.",
        "Trigger and Orchestrate fire the right action — procedure, comms, training — without manual chase.",
        "Prove gives you the post-event evidence chain you currently rebuild manually.",
      ],
      buyerQuestions: [
        "Where in your day does your OCC team get overwhelmed by signal volume?",
        "Walk me through your last cascading disruption — where did the loop break?",
        "Who in your OCC would own DTOP if you brought it in tomorrow?",
      ],
    },
    "exec3-slide-mobile": {
      opener:
        "Crew adoption is your unlock — one trusted mobile shell instead of three apps means faster decisions and fewer calls back to the OCC.",
      talkingPoints: [
        "Crew get content, training and safety in one app — fewer support calls.",
        "Offline-first — works on the ramp, in the cabin, in the hangar.",
        "Faster crew acknowledgement = faster turn = better OTP.",
      ],
      buyerQuestions: [
        "How many crew calls into your ops centre are 'I can't find the latest procedure'?",
        "What's a typical crew adoption rate on your current mobile tools?",
        "If we cut clicks-per-task in half on the top three workflows, what would that do to your turn times?",
      ],
    },
    "exec3-slide-automation": {
      opener:
        "Automation in ops is about removing the manual reconciliation that eats your OCC's day — under controls you set.",
      talkingPoints: [
        "Automates predictable handoffs: signal → action → notification → audit.",
        "Human-in-the-loop on every consequential action — your OCC stays in command.",
        "Frees your OCC team to make decisions, not chase status updates.",
      ],
      buyerQuestions: [
        "Where in your OCC's day is the most manual reconciliation happening?",
        "Which handoffs would you want automated tomorrow?",
        "What would freeing two FTE worth of chase-work mean for your OCC?",
      ],
    },
    "exec3-slide-insights-summary": {
      opener:
        "Insights gives your duty managers natural-language access to operational data — for the questions they ask in the middle of a disruption.",
      talkingPoints: [
        "Ask in plain English — 'which crews are timing out at hub X tonight?'",
        "Answers cite the source data — auditable for post-event review.",
        "Cuts time-to-answer in disruption from minutes to seconds.",
      ],
      buyerQuestions: [
        "What's the question your duty manager asks every shift that takes too long to answer?",
        "Where would faster answers change a real-time disruption call?",
        "Who in your OCC would use this first?",
      ],
    },
    "exec3-slide-coanalyst": {
      opener:
        "I want to show you why this is fundamentally different from any generic AI tool your IT team has been pitched.",
      talkingPoints: [
        "Tuned on aviation operational taxonomy — not the open web.",
        "~90% accuracy at L4–5 reasoning vs ~35% generic — measured on the same prompts.",
        "Tenant-isolated — your operational data stays yours.",
      ],
      buyerQuestions: [
        "Has anyone on your team tried a generic AI on operational data — what did you find?",
        "Where would a 90%-accurate answer engine change how you run a shift?",
        "What's the operational question you'd want Intelligence Layer to answer first?",
      ],
    },
    "exec3-slide-tiers-vs-ai": {
      opener:
        "Generic AI is fine for emails — and dangerous on an OCC desk. Here's why that matters.",
      talkingPoints: [
        "Generic models break at exactly the reasoning tier your duty managers operate at.",
        "L4–L5 means understanding crew rules, MEL implications, fatigue limits — none of which the open web teaches.",
        "We publish accuracy benchmarks on the same prompts.",
      ],
      buyerQuestions: [
        "Has a generic AI ever given your team a confidently wrong operational answer?",
        "What would be the cost of one bad AI-suggested call on a disruption night?",
        "Where would you draw the line on AI in the OCC?",
      ],
    },
    "exec3-slide-insights": {
      opener:
        "This is where intelligence becomes orchestrated work — recommendations turn into prepared actions your OCC can execute or veto.",
      talkingPoints: [
        "Every recommendation is traceable to the data behind it.",
        "Prescriptive actions — procedure update, crew comms, training reassignment — go through OCC approval.",
        "Audit and rollback are first-class — nothing irreversible.",
      ],
      buyerQuestions: [
        "Where would you want a system to recommend an action vs take one?",
        "What action does your OCC repeat most often that you'd hand to the system?",
        "Where would prescriptive action have prevented a real event in the last quarter?",
      ],
    },
    "exec3-slide-regulation": {
      opener:
        "Regulation Management is how reg change reaches the flying crew without your ops team becoming the courier.",
      talkingPoints: [
        "Reg change in → impact analysis → procedure update → crew notification → audit trail.",
        "Cuts the lag from published reg to flying crew from weeks to days.",
        "Removes the reg-change scramble from your duty managers' workload.",
      ],
      buyerQuestions: [
        "How does your OCC find out about a reg change today — and how long does it take?",
        "What's the last reg change that disrupted a shift?",
        "Where does compliance creep into your duty managers' day?",
      ],
    },
    "exec3-slide-roadmap-2026": {
      opener:
        "Here's what's already committed for 2026 — and where your OCC could land in the first cohort.",
      talkingPoints: [
        "Insights, Automation and Mobile each have committed POC and phase dates.",
        "Ops POCs typically anchor on disruption prevention or duty-manager workload.",
        "Be explicit: POC vs GA, no oversell on timing.",
      ],
      buyerQuestions: [
        "Of these tracks, which would have the fastest impact on your OCC?",
        "What does your internal cycle look like to greenlight an ops POC?",
        "What would 'POC success' look like to you in 90 days?",
      ],
    },
    "exec3-slide-why": {
      opener:
        "Three things to remember — they're the reasons VP Ops pick us over best-of-breed point tools.",
      talkingPoints: [
        "One platform alongside your OCC — no rip-and-replace.",
        "Detect → Trigger → Orchestrate → Prove — closes the disruption loop.",
        "Quantified OTP and completion-factor improvement, not vapour.",
      ],
      buyerQuestions: [
        "Of those three, which matters most to your operation right now?",
        "What's the right next step — an OCC walk-through, a peer call, or a scoped POC?",
        "Who else in your ops leadership should see this?",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  "training-director": {
    "exec3-slide-0": {
      opener:
        "Thanks for the time. I want to spend twenty minutes on how training stops being the last team to find out — and starts driving demonstrable competency, not just completion.",
      talkingPoints: [
        "Frame this as closing the safety→training loop.",
        "Be honest: this isn't about replacing your LMS, it's about connecting it.",
        "Anchor on competency and adoption, not features.",
      ],
      buyerQuestions: [
        "What's the gap between your training completion rate and your competency confidence?",
        "How does your team find out today when a safety event should drive a training change?",
        "Who else from L&D should be in this conversation?",
      ],
    },
    "exec3-slide-1": {
      opener:
        "Every training team I talk to has the same problem — you're the last to hear about a hazard, and the first to be blamed when crew aren't ready.",
      talkingPoints: [
        "The shift is from completion-tracking to closed-loop competency.",
        "Point tools keep training disconnected from the events that should drive it.",
        "Modern audits ask for evidence of effectiveness, not just attendance.",
      ],
      buyerQuestions: [
        "When was the last time a safety event triggered a training change in days, not months?",
        "How much of your team's time is spent reconciling LMS records with operational reality?",
        "What does 'competency' look like in your audit responses today?",
      ],
    },
    "exec3-slide-outcomes": {
      opener:
        "Real training outcomes from operators running this — closed-loop training, faster reassignment, evidence of effectiveness.",
      talkingPoints: [
        "Lead with safety→training cycle time and audit prep time.",
        "Anonymised composite figures across deployed carriers.",
        "Peer reference inside another L&D org lands hardest.",
      ],
      buyerQuestions: [
        "Which of these outcomes matters most for your next audit?",
        "Would a peer reference call with another Training Director help?",
        "What's your safety→training cycle time today, and what would halving it free up?",
      ],
    },
    "exec3-slide-platform": {
      opener:
        "This is the platform on a single page — and the reason it matters for you is that TrainingManager365 sits on the same foundation as safety and content.",
      talkingPoints: [
        "Hazard in safety = automatic procedure update + automatic training reassignment.",
        "One foundation removes the manual handoffs that today eat your team's week.",
        "Audit evidence — completion AND competency — assembles itself.",
      ],
      buyerQuestions: [
        "Where do safety→training handoffs break down for you today?",
        "How much of your team's week is reconciliation vs design?",
        "What would 'one shared learner record' across safety, content and training be worth?",
      ],
    },
    "exec3-slide-dtop": {
      opener:
        "DTOP is the operating model — and the part you should care about is the O: Orchestrate. That's where training gets pulled into the loop the moment a hazard is detected.",
      talkingPoints: [
        "Detect surfaces hazards across reports and operational data.",
        "Orchestrate fires the procedure update AND the training reassignment automatically.",
        "Prove gives you closed-loop evidence the regulator now expects.",
      ],
      buyerQuestions: [
        "Where in that loop does your team currently get bypassed?",
        "What would automatic reassignment of affected crew change for your team's workload?",
        "Who owns 'closed-loop training proof' in your org?",
      ],
    },
    "exec3-slide-mobile": {
      opener:
        "Adoption is everything for training — that's why content, safety and training all live in one trusted mobile shell crew already use.",
      talkingPoints: [
        "One app crew open every shift — not a training app they only open quarterly.",
        "Microlearning and refresher prompts land in the same shell as procedures.",
        "Offline-first — training completes in the field, not just at base.",
      ],
      buyerQuestions: [
        "What's your true crew adoption rate on training-only apps?",
        "Where do crew currently complete refresher training — at base, in the field, or never?",
        "If training appeared inside the app crew already use, what would that do to completion?",
      ],
    },
    "exec3-slide-automation": {
      opener:
        "Automation in training means crew get reassigned the moment a procedure changes — without your team manually mapping it.",
      talkingPoints: [
        "Automates the affected-population mapping that today is a spreadsheet exercise.",
        "Human-in-the-loop on the curriculum decision; automation handles the assignment chase.",
        "Frees your team to design training, not chase compliance.",
      ],
      buyerQuestions: [
        "How long does it take today to identify affected crew after a procedure change?",
        "Where would you absolutely want a human L&D decision in the loop?",
        "What would freeing your team from manual reassignment work unlock?",
      ],
    },
    "exec3-slide-insights-summary": {
      opener:
        "Insights lets your team ask training questions in plain English — without a BI ticket.",
      talkingPoints: [
        "Ask: 'which fleet has the lowest competency on the new MEL update?'",
        "Answers cite the underlying records — fully auditable.",
        "Closes the gap between training question and credible answer.",
      ],
      buyerQuestions: [
        "What training questions does your team ask weekly that take days to answer?",
        "Where would faster competency answers change a training decision?",
        "Who in your L&D team would use this first?",
      ],
    },
    "exec3-slide-coanalyst": {
      opener:
        "Here's why Intelligence Layer matters for L&D — it understands aviation context the way your senior trainers do, and it never gives a confidently wrong answer about a procedure.",
      talkingPoints: [
        "Tuned on aviation taxonomy — recognises procedure references, fleet codes, role authorities.",
        "~90% accuracy at L4–5 reasoning vs ~35% generic — your team can trust the output.",
        "Citations on every answer — your trainers can verify before they act.",
      ],
      buyerQuestions: [
        "Has your team ever tried a generic AI on training content — what happened?",
        "Where would a 90%-accurate answer engine save your team the most hours?",
        "What's the question you'd want to ask of your competency data tomorrow?",
      ],
    },
    "exec3-slide-tiers-vs-ai": {
      opener:
        "Generic AI on training content sounds great in a demo and falls apart on a regulator's audit — here's why that matters.",
      talkingPoints: [
        "Generic models hallucinate procedure references — a hard fail in a regulated environment.",
        "L4–L5 reasoning is where trainer judgement lives — and where generic AI breaks.",
        "We measure publicly on the same prompts — no demo theatre.",
      ],
      buyerQuestions: [
        "What would your auditor say about a training answer that misquoted a procedure?",
        "Where in your training content is hallucination an unacceptable risk?",
        "Has a generic AI ever produced training content that needed correction?",
      ],
    },
    "exec3-slide-insights": {
      opener:
        "This is where intelligence drives orchestrated training — recommendations become prepared assignments your team approves or rejects.",
      talkingPoints: [
        "Recommendations are traceable to the safety and operational data behind them.",
        "Prescriptive actions — assignments, refresher pushes, comms — go through L&D approval.",
        "Rollback and audit are first-class — nothing irreversible.",
      ],
      buyerQuestions: [
        "Where would you want a system to recommend a training action vs take one?",
        "What's the most repetitive training assignment your team makes that could be system-prepared?",
        "Where would prescriptive action have closed a competency gap faster last year?",
      ],
    },
    "exec3-slide-regulation": {
      opener:
        "Regulation Management closes the loop your team is usually at the end of — reg in, procedure updated, training reassigned, audit trail ready.",
      talkingPoints: [
        "Your team stops being notified last and gets pulled in automatically.",
        "Cuts the reg-to-training cycle from weeks to days.",
        "Audit-readiness on training response becomes a continuous state.",
      ],
      buyerQuestions: [
        "When a reg changes, how long before your team is in the loop today?",
        "How much of your team's week is consumed by reg-driven retraining?",
        "What would continuous audit-readiness mean for your last finding?",
      ],
    },
    "exec3-slide-roadmap-2026": {
      opener:
        "Here's what's committed for 2026 — and where your training org could land in the first cohort.",
      talkingPoints: [
        "Insights, Automation and Mobile each have committed POC and phase dates.",
        "Training POCs typically anchor on closed-loop reassignment or competency reporting.",
        "Be explicit on POC vs GA — don't oversell timing.",
      ],
      buyerQuestions: [
        "Of these tracks, which would matter most to your training roadmap?",
        "What does your internal cycle look like to greenlight a training POC?",
        "What would a successful 90-day POC look like for your team?",
      ],
    },
    "exec3-slide-why": {
      opener:
        "Three things to remember — and they're the reasons Training Directors pick us over their LMS upgrade path.",
      talkingPoints: [
        "Closed-loop safety→training in days, not months.",
        "Competency evidence, not just completion records — audit-grade.",
        "Unified Mobile means crew actually engage — adoption is the real ROI.",
      ],
      buyerQuestions: [
        "Of those three, which matters most to your training programme?",
        "What's the right next step — a deeper L&D session, a peer call, or a scoped POC?",
        "Who else in your team needs to see this?",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  "cio-it": {
    "exec3-slide-0": {
      opener:
        "Thanks for the time. I'll keep this twenty minutes — three sections: the architectural shift, the platform, and the integration / TCO story. I'll leave time for your questions on identity, isolation and APIs.",
      talkingPoints: [
        "Lead with respect for their time and architecture — CIOs hate fluff.",
        "Signal early that integration, identity and security will get covered.",
        "Frame this as tool rationalisation, not another tool to integrate.",
      ],
      buyerQuestions: [
        "What does your current operational tool footprint look like in this space?",
        "What's your stance on AI in operational data today?",
        "Who else from architecture or security should see this?",
      ],
    },
    "exec3-slide-1": {
      opener:
        "The shift you're seeing across operators is fewer, deeper platforms — not more best-of-breed point tools — because the integration tax has stopped paying back.",
      talkingPoints: [
        "Five to seven point tools = an integration tax your team services every quarter.",
        "Data quality dies in the gaps between tools, not inside them.",
        "Platform consolidation is the architecturally cleaner answer.",
      ],
      buyerQuestions: [
        "What's your current integration spend on this estate, ballpark?",
        "Where does data quality break down across your operational tools today?",
        "What's your tolerance for adding another vendor vs rationalising?",
      ],
    },
    "exec3-slide-outcomes": {
      opener:
        "Beyond the operational outcomes, the IT story is real — fewer integrations, lower TCO, and a credible AI governance posture.",
      talkingPoints: [
        "Lead with TCO and integration reduction — that's your CIO's scoreboard.",
        "Anonymised composite figures across deployed carriers — be straight about that.",
        "Offer a peer reference at CIO level — peer-to-peer trust matters most here.",
      ],
      buyerQuestions: [
        "Which of these outcomes would matter most to your next budget cycle?",
        "Would a CIO peer reference move this forward?",
        "What does 'predictable TCO' actually mean in your environment?",
      ],
    },
    "exec3-slide-platform": {
      opener:
        "This is the platform on a single page — and the part that matters for you is that it consolidates five to seven point tools into one foundation with one identity model.",
      talkingPoints: [
        "One identity surface — SSO/SAML, role-based access — across all capabilities.",
        "One data foundation — fewer ETL jobs, fewer reconciliation pipelines.",
        "Tool rationalisation is a real TCO story, not a marketing line.",
      ],
      buyerQuestions: [
        "How many of these capabilities are you running on separate vendors today?",
        "What does your identity surface look like across operational tools?",
        "Where's the integration tax hurting your team most?",
      ],
    },
    "exec3-slide-dtop": {
      opener:
        "DTOP is the operating model — but for IT, the important part is that orchestration is event-driven and fully auditable, not RPA-style screen scraping.",
      talkingPoints: [
        "Event-driven architecture — clean APIs, not brittle scripts.",
        "Every action is auditable end to end — your security team will recognise the pattern.",
        "Human-in-the-loop boundaries are configurable, not hard-coded.",
      ],
      buyerQuestions: [
        "What's your current architectural pattern for cross-system orchestration?",
        "Where are you using RPA or screen scraping today that should be event-driven?",
        "What audit and observability requirements do you have on cross-system actions?",
      ],
    },
    "exec3-slide-mobile": {
      opener:
        "One mobile shell instead of three means one MDM target, one identity surface, and one set of security controls — not three.",
      talkingPoints: [
        "MDM-friendly: one app to certify, one to patch, one to manage.",
        "SSO/SAML support from day one — no separate auth surface.",
        "Offline-first with secure sync — works on the ramp without leaking data.",
      ],
      buyerQuestions: [
        "How many separate mobile apps does your MDM team currently certify?",
        "What's your identity story across crew mobile today?",
        "Where does mobile security audit pressure hit your team hardest?",
      ],
    },
    "exec3-slide-automation": {
      opener:
        "Automation here is event-driven and fully auditable — not RPA-style fragility — and every action goes through your governance controls.",
      talkingPoints: [
        "Event-driven, API-led — no brittle screen scraping.",
        "Governance and audit are first-class — every action traceable, reversible.",
        "Human-in-the-loop boundaries are policy-configurable, not hard-coded.",
      ],
      buyerQuestions: [
        "What governance requirements do you have on automated cross-system actions?",
        "Where are you currently using RPA that should be event-driven?",
        "Who owns the policy for what the system can do autonomously?",
      ],
    },
    "exec3-slide-insights-summary": {
      opener:
        "Insights is natural-language access to operational data — under your existing identity, RBAC and audit controls.",
      talkingPoints: [
        "Inherits SSO/SAML and role-based access — no parallel permissions model.",
        "Every prompt and response is logged — auditable end to end.",
        "Answers cite source records — no hallucinated narratives.",
      ],
      buyerQuestions: [
        "What's your AI governance policy require before pointing a model at operational data?",
        "How would you want prompts and responses logged for audit?",
        "Who in your security team would need to bless this deployment?",
      ],
    },
    "exec3-slide-coanalyst": {
      opener:
        "I want to spend a minute on how this is architected — the difference from generic AI is mostly an integration and isolation story.",
      talkingPoints: [
        "Tenant-isolated — your operational data never trains a shared model.",
        "Domain tuning sits in your tenant; SSO/SAML and RBAC from day one.",
        "Auditable prompt and response trail — every answer traceable end to end.",
      ],
      buyerQuestions: [
        "What does your AI governance policy require before pointing a model at operational data?",
        "Who in your team owns the line between AI assistant and autonomous action?",
        "Would a tenant-isolated deployment satisfy your data-residency constraints?",
      ],
    },
    "exec3-slide-tiers-vs-ai": {
      opener:
        "Generic AI looks attractive on a budget line and ugly on a security review — here's why the architecture matters.",
      talkingPoints: [
        "Generic models share training surface across tenants — a hard fail in regulated estates.",
        "L4–L5 reasoning needs domain tuning — and that requires data your generic vendor won't isolate.",
        "We publish accuracy benchmarks on the same prompts.",
      ],
      buyerQuestions: [
        "Has your security team reviewed a generic AI deployment on operational data — what came back?",
        "What's your data-residency posture for AI training and inference?",
        "Who in your team owns AI risk policy?",
      ],
    },
    "exec3-slide-insights": {
      opener:
        "Recommendations and prescriptive actions are designed to fit a controls-and-audit organisation — nothing happens without policy.",
      talkingPoints: [
        "Every recommendation is traceable to the data behind it — full lineage.",
        "Prescriptive actions go through approval, audit, and rollback — controls-first.",
        "Policy-configurable boundaries — your security team sets the line.",
      ],
      buyerQuestions: [
        "What governance pattern would you want on prescriptive actions?",
        "Where would your audit committee insist on human approval?",
        "What rollback and observability requirements do you have on automated changes?",
      ],
    },
    "exec3-slide-regulation": {
      opener:
        "Regulation Management is event-driven, traceable and integrates cleanly — not yet another compliance tool to add to your estate.",
      talkingPoints: [
        "Open APIs let it integrate with your existing GRC and document tooling.",
        "Every reg-driven change carries lineage — audit chain is automatic.",
        "Replaces multiple compliance tools, not an add-on.",
      ],
      buyerQuestions: [
        "What does your current regulatory tracking estate look like?",
        "Where are you maintaining duplicate compliance records today?",
        "What integration constraints do you have with existing GRC tools?",
      ],
    },
    "exec3-slide-roadmap-2026": {
      opener:
        "Here's what's already committed for 2026 — locked dates, named phases, and a phased POC path that fits a CIO's planning cycle.",
      talkingPoints: [
        "Insights, Automation and Mobile each have committed POC and phase dates.",
        "POC vs GA is named explicitly — your architecture team can plan against real timing.",
        "Phased POC: SafetyManager365 / ContentManager365 / TrainingManager365 — pick your starting point.",
      ],
      buyerQuestions: [
        "Of these tracks, which fits your architectural roadmap first?",
        "What does your POC governance process look like?",
        "What would architectural success in a 90-day POC look like to you?",
      ],
    },
    "exec3-slide-why": {
      opener:
        "Three things to remember — they're the reasons CIOs greenlight us over best-of-breed sprawl.",
      talkingPoints: [
        "One platform replaces five-to-seven point tools — real integration tax reduction.",
        "Tenant-isolated AI with SSO/SAML and RBAC from day one — your security team will recognise it.",
        "Predictable TCO — phased POC path, no surprise.",
      ],
      buyerQuestions: [
        "Of those three, which matters most to your next planning cycle?",
        "What's the right next step — an architecture deep-dive, a security review, or a scoped POC?",
        "Who else from architecture or security needs to be in this conversation?",
      ],
    },
  },
};

/** Generic fallback used if a persona/slide pair is missing. */
export const defaultSlidePrompts: Record<string, SlidePrompts> =
  practiceSlidePrompts["ceo-coo"];

export const getSlidePrompts = (
  personaId: string | undefined,
  slideId: string,
): SlidePrompts | undefined => {
  if (personaId && practiceSlidePrompts[personaId]?.[slideId]) {
    return practiceSlidePrompts[personaId][slideId];
  }
  return defaultSlidePrompts[slideId];
};