export interface ExecNarrationSlide {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George

export const executivePitchNarrations: ExecNarrationSlide[] = [
  {
    slideId: "exec-slide-0",
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Your operation generates thousands of signals every day. Most never reach the right person in time. In four minutes, I'll show you how leading carriers are turning those signals into predictable operational performance — and what that's worth to your bottom line.",
  },
  {
    slideId: "exec-slide-1",
    title: "The Human-Factor Cost",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every airline has costs hiding in the gap between what people know and what they do. Go-arounds that weren't prevented because training never saw the safety signal. An aircraft grounded because a compliance gap wasn't flagged. Crew technique variance adding fuel burn that no dashboard catches. These are human-factor costs — the portion of operational spend your people and processes can directly influence. We've modelled eight categories of operational disconnection. The total is significant. But the methodology is the point — we help you identify your biggest human-factor cost driver and show you what even a small improvement is worth.",
  },
  {
    slideId: "exec-slide-2",
    title: "The Shift",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "The industry is shifting from managing compliance to managing performance. Regulators now expect proof that when a signal was detected, the right action followed and the outcome improved. Your competitors who make this shift first don't just get safer — they get more predictable. Fewer disruptions, faster recovery, better crew readiness. For a COO, that's the difference between reacting to yesterday and controlling tomorrow.",
  },
  {
    slideId: "exec-slide-3",
    title: "The New Operating Model",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "We call it Detect, Trigger, Orchestrate, Prove. Detect — your systems listen continuously across flight operational data, safety, and ops data. Trigger — the right workflow fires automatically, no email chains. Orchestrate — training, procedures, and compliance move together, not in sequence. Prove — every action logged, audit-ready by default. One example: a hard landing trend detected Tuesday, affected crews retrained by Thursday, repeat events down seventy-eight percent. That's the loop.",
  },
  {
    slideId: "exec-slide-4",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This loop is powered by three applications working as one. Safety Manager detects the signals. Content Manager orchestrates the procedural response. Training Manager ensures crew readiness before the next event. And CoAnalyst — our intelligence layer — connects all three, transforming sixty-five thousand monthly data points into decisions you can act on. One platform. One version of truth.",
  },
  {
    slideId: "exec-slide-5",
    title: "Intelligence Layer",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here's why this matters. Generic AI gives you thirty-five percent accuracy on aviation queries. It can't distinguish a bird strike report from a bird strike trend. CoAnalyst delivers over ninety percent — trained on ten years of aviation operational data. That precision gap is the difference between intelligence that drives action and noise that wastes your safety team's time.",
  },
  {
    slideId: "exec-slide-6",
    title: "Line of Sight",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every signal connects to an outcome you own. Go-around trends detected and addressed within forty-eight hours — that's schedule protection. Procedure gaps closed before the audit — that's regulatory confidence. Crew retrained before the next rotation — that's operational readiness. The total human-factor cost exposure is significant — and the cost avoidance opportunity runs into the tens of millions. We can model this with your specific numbers. So what makes us the right partner to deliver this?",
  },
  {
    slideId: "exec-slide-7",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three things set Comply three six five apart — and they're the reason leading carriers across North America trust us with their operations today. First, a connected foundation. We're not stitching point solutions together. Safety, content, and training share one data model, one version of truth. The largest carriers in North America rely on this every day. Second, embedded intelligence. CoAnalyst wasn't built as a generic AI with an aviation skin. It's been trained from the ground up on ten years of aviation operational data — delivering over ninety percent accuracy where general-purpose tools plateau at thirty-five. That precision is the difference between actionable intelligence and noise. Third, proof by default. Every action is logged automatically. Every change is traced. Every decision is auditable. You don't prepare for regulators — you're always ready. Let's schedule a thirty-minute discovery session to map your operational signals to measurable outcomes — and build a custom cost avoidance model with your numbers.",
  },
];

export const getExecPitchNarration = (slideId: string): ExecNarrationSlide | undefined => {
  return executivePitchNarrations.find((s) => s.slideId === slideId);
};

// ---------------------------------------------------------------------------
// Medium Executive Pitch (Exec 3) — sales-coach speaker notes / TTS scripts
// PURPOSE → TALK TRACK → PROOF POINT → TRANSITION on every slide.
// ---------------------------------------------------------------------------
export const exec3PitchNarrations: ExecNarrationSlide[] = [
  {
    slideId: "exec3-slide-0",
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every airline I talk to is sitting on a quiet, expensive problem. Your operation generates thousands of signals every single day — a hard landing, a deferred defect, a procedure update, a near-miss in a station you've never heard of. Most of them never reach the right person in time to change the next flight. That gap — between detection and action — is the silent tax on your operation. It shows up as repeat events, as on-time performance drag, as audit findings you should have closed weeks earlier. In the next twenty minutes I'm going to show you how leading carriers are closing that gap, and what closing it is worth to your bottom line.",
  },
  {
    slideId: "exec3-slide-1",
    title: "Strategic Shift",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here's what's changed, and why this conversation matters now. Your regulators have stopped asking, did you complete the checklist. They're asking, when you saw the signal, did you act, and did the outcome actually improve. Your board is asking the same question in a different language — they want predictable performance, not heroic recovery. The carriers who build that closed loop first don't just get safer. They get more predictable, more profitable, and they set the benchmark everyone else gets measured against. The ones who wait spend the next three years catching up. Let's start with the outcomes that loop produces — the numbers your board actually cares about.",
  },
  {
    slideId: "exec3-slide-outcomes",
    title: "Customer Outcomes",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "These are the four outcomes that show up in every board pack — schedule protection, revenue protection, controllable cost reduction, and customer trust. Today, every one of these is being eroded by the same root cause: signals that arrive too late, or never reach the team that could act on them. A go-around trend that wasn't caught until the third event. A procedure update that took six weeks to reach the line. An audit finding that cost you a slot. The ranges you see here are what we observe across customer deployments — not guarantees, but the operational lift that becomes possible when the loop actually closes. Now let me show you the architecture that delivers them.",
  },
  {
    slideId: "exec3-slide-platform",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the architecture in one picture, and it's deliberately simple. At the foundation, three core applications sharing one operational data model — SafetyManager365 for occurrences and assurance, ContentManager365 for procedures and manuals, TrainingManager365 for competency and recurrent training. Above them, the intelligence and orchestration layer — automation, insights, and CoAnalyst — turning that shared data into action. Above that, one unified mobile shell so the frontline only ever opens one app. And wrapping the whole stack, DTOP — the operating model that makes it all move together. Most of your current vendors sell you one of these boxes. We give you all four, on one platform, one data foundation, one place to prove it worked. Let's walk through how it actually works in your operation, starting with that operating model.",
  },
  {
    slideId: "exec3-divider-dtop",
    title: "Layer divider — DTOP",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Before we go inside any individual product, let me show you the operating model that makes the whole thing work. We call it DTOP — Detect, Trigger, Orchestrate, Prove. It's the loop your operation is trying to run today, but doing it manually, in email, across four different vendors. Here's what it looks like when the platform runs it for you.",
  },
  {
    slideId: "exec3-slide-dtop",
    title: "DTOP — System of Work",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Four steps. Detect — operational data flows in continuously across safety, content, training and your external feeds. Trigger — when a pattern crosses the threshold you set, the right workflow fires automatically, no email chain, no chase list. Orchestrate — the safety investigation, the procedure update, the targeted training assignment all move in parallel rather than waiting in sequence. Prove — every action is logged and traced, audit-ready by default. The example we see again and again: a hard-landing trend detected on Tuesday, the affected crews retrained by Thursday, repeat events down dramatically across the next quarter. Same teams, same data, completely different outcome — because the wiring changed, not the people. Now let's look at how that loop reaches the people who actually fly the aircraft.",
  },
  {
    slideId: "exec3-divider-mobile",
    title: "Layer divider — Unified Mobile",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "None of this matters if it doesn't reach the frontline in the app they already trust. So before we go up into the intelligence layer, let me show you how the platform lands on the iPad in the cockpit and the phone on the ramp.",
  },
  {
    slideId: "exec3-slide-mobile",
    title: "Unified Mobile",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Today your crews juggle three different apps a shift — one for procedures, one for training, a third to file a safety report. Two of those three only get opened when something goes wrong, which is exactly when you can't afford an unfamiliar interface. We collapse that into one. The Comply365 mobile app — already in daily frontline use through ContentManager365, with millions of crew sessions behind it — becomes the single shell. Procedures live there today. TrainingManager365 arrives in the app in mid-2026. SafetyManager365 reporting in late-2026. Single sign-on, unified notifications, one device-management footprint for your IT team. Three apps a shift becomes one app every shift, in the tool your crews already trust. Now let's go into the layer that makes all of this actually intelligent.",
  },
  {
    slideId: "exec3-divider-intelligence",
    title: "Layer divider — Intelligence & Orchestration",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the layer that separates a connected platform from a smart one. Three capabilities sit here — automation that runs the workflows, insights that tell you what to look at, and CoAnalyst that lets your team ask anything in plain English and get a defensible answer. Together, this is what turns your operational data into action — and into the outcomes we showed you up front. Let's start with automation.",
  },
  {
    slideId: "exec3-slide-automation",
    title: "Automation",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Think about how many handoffs in your operation today happen in someone's inbox. A procedure gets published — somebody emails training to assign a recurrent module. Training updates a syllabus — somebody emails safety to flag the new compliance checkpoint. Each of those handoffs is a place where things slow down, get missed, or fall on the floor. Automation replaces those email chains with one orchestration layer that spans every product on the platform. Triggers fire from native events, webhooks, schedules, or your third-party systems. Workflows are reusable, no-code, versioned, observable, and you keep human-in-the-loop gates wherever you need them. A procedure publishes in ContentManager365, training is auto-assigned, the SafetyManager365 compliance checkpoint opens, the team is notified — zero manual handoffs. Now let's look at how your team finds the right thing to act on in the first place.",
  },
  {
    slideId: "exec3-slide-insights-summary",
    title: "Insights & Intelligence",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This capability is about one thing — when somebody in your business has a question, they get an answer they can act on, today. Right now, that loop is broken. Your COO asks a question on Monday, the BI team builds a report, and three weeks later the answer arrives after the operation has already moved on. We close that gap. Anyone — a duty manager, a safety lead, a chief pilot — types a question in plain English, in the platform, and in under a minute they get a cited answer with the source data, the reasoning, and the single next best step tied to that question. This is reactive intelligence — you ask, the platform answers — and it is live today on SafetyManager365, with content and training following. The engine behind it is CoAnalyst. The next slide is what comes when your platform stops waiting to be asked.",
  },
  {
    slideId: "exec3-slide-coanalyst",
    title: "CoAnalyst",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "CoAnalyst is the intelligence layer of the platform — and the master message I want you to leave the room with is this: from events to control. We've taken millions of aviation reports going back to twenty-twenty-three and trained a hybrid architecture — domain models doing the heavy classification work, with a generative AI layer on top for natural-language interaction, and continuous learning so it gets sharper every quarter. The reason this matters commercially is precision. At deep classification — the level of cause and root cause — CoAnalyst delivers around ninety percent accuracy, where generic AI plateaus around thirty-five percent. That precision is the difference between an analyst trusting the recommendation and an analyst re-doing the work by hand. Let me put a sharper number on that.",
  },
  {
    slideId: "exec3-slide-tiers-vs-ai",
    title: "CoAnalyst vs Generic AI",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the chart that ends the build-or-buy debate inside your IT team. At the surface level — broad occurrence categories — generic AI is roughly comparable, and that's where most demos stop. Go one level deeper, into the hundreds of subcategories your safety team actually uses, and generic AI drops to around sixty percent. Go to the level that matters operationally — cause and root cause — and generic AI collapses into the thirty to forty percent range. CoAnalyst holds around ninety. In practical terms, generic AI will call a repeated bird strike a one-off and miss the cluster that signals a runway hazard trend. That's the precision gap, and it's why our customers stopped trying to wrap a chatbot around their safety database. Now let's look at what the platform does with that intelligence — turning patterns into prescriptive next steps.",
  },
  {
    slideId: "exec3-slide-insights",
    title: "Recommendations & Prescriptive Actions",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Insights answers the questions you think to ask. This — Recommendations and Prescriptive Actions — is the platform asking the questions for you. This is where we are heading on the 2026 roadmap, and it is the difference between a smart platform and a control surface for your operation. Picture a Tuesday morning where nobody asked anything. The platform — running continuously across safety, training, content and ops — flags a signal: dangerous-goods handling risk is rising at three hubs over the next thirty days. Step one, detect — ninety days of correlated data surface the emerging pattern. Step two, prioritise — three hubs ranked by predicted incident likelihood and operational exposure, with two stations the volume dashboards would have flagged correctly deprioritised. Step three, prescribe — a sequenced action plan, not a single suggestion: retrain a hundred and eighty ground crew in week one, republish the dangerous-goods SOP in week one, targeted station audits in week three, named owners on each line. Step four, prove — a forecast of sixty to seventy percent incident reduction over ninety days, with the loop closed back into DTOP for tracking and audit evidence. From signal to sequenced plan, before the first incident. The pay-off lands first in regulatory change — let me show you that next.",
  },
  {
    slideId: "exec3-divider-regulation",
    title: "Section divider — Regulation Management",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Regulation is the use case where everything we've shown you compounds — the data foundation, the intelligence layer, the automation, the mobile shell — all working on the single hardest, most repetitive problem your compliance team faces. Let me show you the difference it makes.",
  },
  {
    slideId: "exec3-slide-regulation",
    title: "Regulation Management",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Today, when a new directive lands, your team starts a four-to-six-week scramble — read the directive, find every affected manual, draft the changes, route to SMEs, push to the fleet, chase acknowledgements, then prepare the audit thread. Most of that time is plumbing, not judgement. With this platform, the directive arrives, CoAnalyst maps it against your procedure library and identifies every affected document. Updates are queued for the right SME, automation tracks the cascade, every affected crew member receives the updated version and acknowledges it on the same mobile shell they already use, and the audit trail builds itself. Weeks of work compressed to days, and your compliance team gets to focus on judgement instead of chasing inboxes. Now — what's locked and committed for next year.",
  },
  {
    slideId: "exec3-divider-roadmap",
    title: "Section divider — 2026 Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "One question I always get from a buying committee: what am I actually buying today, and what am I being asked to wait for. Here is exactly what's locked and what's coming, with committed dates — no roadmap theatre.",
  },
  {
    slideId: "exec3-slide-roadmap-2026",
    title: "2026 Phased Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three commitments, three dates. Insights and Recommendations — the natural-language layer across the platform — proof of concept early twenty twenty-six. Cross-product Automation — the orchestration layer we just walked through — mid twenty twenty-six. Unified Mobile — TrainingManager365 in the shell mid twenty twenty-six, SafetyManager365 reporting late twenty twenty-six. Everything underneath is live today and in daily use across our customer base. So you're not buying a roadmap — you're buying a platform that already runs your operation, with three additions arriving on dates we'll commit to in the contract. Now — why us to deliver it.",
  },
  {
    slideId: "exec3-slide-why",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three reasons leading carriers trust Comply365 with their operation, and they're the three reasons you should consider us too. First — a connected foundation. We don't stitch point solutions together. Safety, content, and training share one data model, one version of truth. Five hundred and fifty plus airlines, around two and a half million users, across six continents already operate on it. Second — embedded intelligence. CoAnalyst was built from the ground up on aviation operational data since twenty twenty-three — around ninety percent accuracy at the depth that matters, where generic AI plateaus at thirty-five. That precision is what makes the recommendations defensible. Third — proof by default. Every action logged, every change traced, every decision auditable. You don't prepare for regulators anymore — you're always ready. The ask is simple: give us a half-day with your safety, training, and operations leads. We'll map your top three operational signals to measurable outcomes and put your numbers on the cost-avoidance model. That's how we'll know — together — whether this is real for you.",
  },
];

export const getExec3PitchNarration = (slideId: string): ExecNarrationSlide | undefined => {
  return exec3PitchNarrations.find((s) => s.slideId === slideId);
};
