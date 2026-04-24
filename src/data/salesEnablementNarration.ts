// Sales Enablement Academy — sales-coach training voice-over scripts.
// These are TEACHING scripts: rep-facing, not customer-facing.
// Format per slide: WHY THIS MATTERS -> CORE MESSAGE -> PAIN->VALUE PIVOT -> HOW TO DELIVER -> TRANSITION.
// All scripts comply with terminology, BrandNumber naming, DTOP color story,
// the canonical ~90% vs ~35% accuracy headline, and locked roadmap dates.

export interface SESlideNarration {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const VOICE = "JBFqnCBsd6RMkjVDRZzb"; // George — warm trainer tone

export const salesEnablementNarrations: SESlideNarration[] = [
  {
    slideId: "se-slide-0",
    title: "Welcome",
    voiceId: VOICE,
    script:
      "Welcome to the Sales Enablement Academy. Before we touch a single deck, let's set expectations. Your job is not to sell software — it is to sell the first connected operating model in aviation. The platform is the proof, the operating model is the story, and DTOP — Detect, Trigger, Orchestrate, Prove — is the loop that makes it real for the customer. Across the next six modules you will internalise the platform in plain English, the four capability bands, the value math against customer pain, and the objection handling that gets you to a ninety-day pilot. Take notes, repeat the core lines out loud, and treat every recap slide as a real rehearsal. Let's begin with the strategic shift the industry is going through right now.",
  },
  {
    slideId: "se-slide-shift",
    title: "M1 · The Strategic Shift",
    voiceId: VOICE,
    script:
      "This slide matters because it tells you why prospects are willing to take this meeting at all. The core message: regulators have shifted from prescriptive compliance — did you tick the box — to performance-based oversight — can you prove the loop closed. The pain you're addressing: their leadership is being asked for outcome evidence they don't have, because their tools were built for records, not for closing loops. The value lever: we are the only platform built for the new model. When you deliver this, slow down. Don't list regulators. Say one sentence: the question used to be did you do the training, the question now is did the behaviour change — then pause. Don't say AI. Don't say transformation. The next slide quantifies what it costs them to live in the old model.",
  },
  {
    slideId: "se-slide-challenge",
    title: "M1 · The Industry Challenge",
    voiceId: VOICE,
    script:
      "This is your cost-of-inaction slide. The core message: the industry leaks twenty-five to thirty-five billion dollars a year because operational signals never make it into procedure changes or targeted training. The pain you're naming: their five-to-seven disconnected tools generate signals that die in inboxes. The value lever: every percentage point of leakage you recover funds the platform many times over. Deliver it as math, not drama — point to the figure, give the source stack in one breath — EUROCONTROL, IATA, SITA, A4A — and ask one discovery question: of those buckets, where do you think you leak the most? Their answer is your demo path. Never paraphrase the figure. Always say twenty-five to thirty-five billion. Then transition into Module 2, where we make the platform itself plain English.",
  },
  {
    slideId: "se-module-2",
    title: "M2 · Module Intro",
    voiceId: VOICE,
    script:
      "Module 2 exists for one reason: most reps over-explain the platform because they're nervous. By the end of this module you will give the one-sentence pitch and name the four capability bands without reading them off a slide. The four bands, in order: Core Apps, Intelligence and Orchestration, Unified Mobile, and DTOP. If you can say that sequence cleanly under pressure, you're already ahead of most of the field. We move next into the platform diagram itself.",
  },
  {
    slideId: "se-slide-whatis",
    title: "M2 · The Platform",
    voiceId: VOICE,
    script:
      "This is the platform diagram and it does the heavy lifting in almost every customer meeting. The core message you must internalise: this is the first platform that joins safety, content, and training onto one operational data foundation, with an intelligence layer on top. The pain you're solving: today they pay for five to seven tools that don't share data and they integrate them with brittle point-to-point connections. The value lever: one foundation means signals from operations actually reach procedures and training — and back. When you deliver this, point to the foundation first, then the apps, then the intelligence layer, then mobile, then DTOP wrapping it all. Resist the urge to dive into any one box. Customers ask for the deep-dive when they're ready — your job here is to land the shape, not the features. Next slide quantifies the value this shape unlocks.",
  },
  {
    slideId: "se-slide-value",
    title: "M2 · Value Unlocked",
    voiceId: VOICE,
    script:
      "This slide turns the diagram into money and time. The core message: when the foundation is shared, you get faster procedure cycles, lower investigation cost, and audit evidence that assembles itself. The pain it addresses: their finance team has stopped believing point-tool ROI claims because every tool sells in isolation. The value lever you pull: platform value compounds — one shared foundation lifts every workflow on top of it. When delivering, name three numbers and stop — don't list every metric on the slide. Pick the one most relevant to the prospect: if they're safety-led, use the investigation time; if they're ops-led, use procedure cycle time; if they're CFO-led, use the leakage recovery figure. Then bridge to the recap.",
  },
  {
    slideId: "se-slide-recap-m2",
    title: "M2 · Recap Talk Track",
    voiceId: VOICE,
    script:
      "This is a rehearsal slide, not a content slide. The core message: there are three questions every prospect asks, and you need a clean one-sentence answer for each. What is it — the first connected operating platform for safety, content, and training. How is it different — one foundation instead of five to seven disconnected tools. What's the one thing to remember — point solutions can detect, only we can Detect, Trigger, Orchestrate, and Prove. Read each one out loud right now. If you stumble, replay this slide. Don't move on until all three feel natural. Module 3 goes capability by capability.",
  },
  {
    slideId: "se-module-3",
    title: "M3 · Module Intro",
    voiceId: VOICE,
    script:
      "Module 3 is the longest module because the capabilities are where the demo lives. By the end of it you should be able to give a sixty-second walk-through of each capability and ask one good discovery question per capability. We go in this order: Core Apps — SafetyManager365, ContentManager365, TrainingManager365 — then the Intelligence layer with CoAnalyst, Insights and Recommendations, and Automation, then how CoAnalyst differs from generic AI, then the Unified Mobile App, then DTOP itself, and we close with a capability cheat sheet. Take it slowly. This is the module reps under-prepare for and lose deals over.",
  },
  {
    slideId: "se-slide-4a",
    title: "M3 · SafetyManager365",
    voiceId: VOICE,
    script:
      "SafetyManager365 is your entry point in safety-led conversations. The core message: it captures, investigates, and acts on operational safety signals — and because it shares the foundation, every signal can trigger a procedure or training change automatically. The pain it addresses: today their safety team writes recommendations that vanish into someone else's backlog. The value lever: SafetyManager365 doesn't just record — it triggers. When delivering, never use the raw acronyms FOQA, FDM, or ASAP — say flight data signals and crew-reported events instead. Discovery question: when a recurring safety signal lands today, how long until it actually changes a procedure or a training module? Their honest answer is usually weeks or months — that gap is your wedge. Next: ContentManager365.",
  },
  {
    slideId: "se-slide-4b",
    title: "M3 · ContentManager365",
    voiceId: VOICE,
    script:
      "ContentManager365 is the procedural backbone. The core message: it manages every operational manual and procedure with version control, regulatory traceability, and one-tap publishing to the crew. The pain it addresses: today a procedure change takes weeks to ripple from authoring to the device in the cockpit or cabin. The value lever: when ContentManager365 sits on the shared foundation, a safety signal can author a redline automatically and push it to the crew on the next sync. Delivery tip — do not call it a document management system. That's how losers describe it. Call it the procedural source of truth that drives action. Discovery question: when a regulator changes a rule tomorrow, how do you know every crew has the updated procedure? Next: TrainingManager365.",
  },
  {
    slideId: "se-slide-4c",
    title: "M3 · TrainingManager365",
    voiceId: VOICE,
    script:
      "TrainingManager365 closes the human side of the loop. The core message: targeted, evidence-based training — assigned because a signal said this crew, this base, this aircraft type needs it — not because the calendar said so. The pain it addresses: today training is calendar-driven and one-size-fits-all, so high-risk crews get the same module as low-risk crews. The value lever: targeted retraining costs less and demonstrably reduces repeat events. Delivery tip — anchor on the right training, to the right crew, at the right moment. Discovery question: how much of your training spend is calendar-driven versus signal-driven today? The honest answer is almost always over ninety percent calendar-driven — that's the opportunity. Next we move into the Intelligence layer.",
  },
  {
    slideId: "se-slide-coanalyst",
    title: "M3 · CoAnalyst",
    voiceId: VOICE,
    script:
      "CoAnalyst is the most strategic slide in the entire deck. The core message: CoAnalyst is the intelligence layer that lives on top of the connected platform — it turns operational data into insights, recommendations, and triggered actions. The pain it addresses: customers are drowning in dashboards and starving for answers. The value lever — and you must land this exactly — CoAnalyst delivers approximately ninety percent domain accuracy on aviation operational questions, versus around thirty-five percent for generic AI tools pointed at the same data. That gap exists because CoAnalyst is grounded in the customer's own operational schema and our aviation taxonomy. Delivery tip — never call it a chatbot. Call it an analyst that lives inside your operation. Discovery question: who in your team spends the most time pulling reports that should already exist? Next: Insights and Recommendations.",
  },
  {
    slideId: "se-slide-insights",
    title: "M3 · Insights & Recommendations",
    voiceId: VOICE,
    script:
      "Insights and Recommendations is how CoAnalyst earns trust before it ever automates anything. The core message: it surfaces patterns, flags emerging risk, and recommends the next operational action — with the evidence that supports the recommendation. The pain it addresses: today their analysts spend the majority of their week building decks instead of making recommendations. The value lever: when the system writes the first draft of the recommendation with the evidence attached, the analyst's role shifts from report-builder to decision-maker. Delivery tip — emphasise the recommendation always carries its evidence. That's the trust currency. Roadmap-wise, this lands in the early-2026 phase — keep that date locked, do not slip it. Next: Automation.",
  },
  {
    slideId: "se-slide-automation",
    title: "M3 · Automation",
    voiceId: VOICE,
    script:
      "Automation is the controlled second step. The core message: once the customer trusts the recommendations, we automate the safe ones — routing, assignment, notifications, evidence assembly — with a human in the loop on anything that changes a procedure or a training plan. The pain it addresses: their best people spend hours every day on tasks that have a deterministic right answer. The value lever: hours back to where judgement actually matters. Delivery tip — always frame automation as human-in-the-loop by default. Customers fear runaway automation; you defuse it by making the guardrails the headline. Roadmap-wise, this is the mid-2026 phase. Next: how CoAnalyst differs from generic AI.",
  },
  {
    slideId: "se-slide-tiers-vs-ai",
    title: "M3 · CoAnalyst vs Generic AI",
    voiceId: VOICE,
    script:
      "This is your defensive slide and it wins deals where the prospect is already running a generic AI pilot. The core message: CoAnalyst is grounded in aviation operational data and the customer's own schema — generic AI is grounded in the public internet. The pain it addresses: their generic-AI pilot returned plausible-sounding answers that didn't survive scrutiny, and now their team is sceptical of anything called AI. The value lever — say it word-for-word — approximately ninety percent domain accuracy versus around thirty-five percent for generic AI on the same questions. Delivery tip — do not bash the competitor by name. Say general-purpose tools or chat assistants. Then land the line: the difference between a chat assistant and an analyst is whether it knows your operation. Next: Unified Mobile.",
  },
  {
    slideId: "se-slide-mobile",
    title: "M3 · Unified Mobile App",
    voiceId: VOICE,
    script:
      "The Unified Mobile App is the slide that changes the room when the operations leader is present. The core message: one app for the frontline — content, training, and safety reporting in the same shell, same login, same offline behaviour. The pain it addresses: their crews juggle three to five separate apps today, each with its own login and its own quirks, and adoption suffers. The value lever: one app means real adoption, real signal capture, and a real feedback loop from the line. Delivery tip — show, don't tell. If you have a device, hand it over. Discovery question: how many separate apps does your frontline juggle today? Roadmap-wise, the unified mobile experience is the late-2026 phase — keep the date locked. Next: DTOP itself.",
  },
  {
    slideId: "se-slide-dtop",
    title: "M3 · DTOP",
    voiceId: VOICE,
    script:
      "DTOP is not a feature, it is the operating model that makes everything else worth buying. The core message: Detect, Trigger, Orchestrate, Prove — the closed loop from operational signal to verified outcome. Use the canonical colour cues when whiteboarding it: Detect, Trigger, Orchestrate, Prove — keep them in that order, every time. The pain it addresses: today their loop is broken between any two of those four steps — usually between Trigger and Orchestrate. The value lever: point solutions cover one or two steps; only this platform closes the full loop with auditable proof. Delivery tip — draw it on a whiteboard if you can, even on a Zoom call. Drawing it earns the right to ask: which step breaks first for you today? Their answer is your demo. Next: the capability cheat sheet.",
  },
  {
    slideId: "se-slide-talktrack",
    title: "M3 · Capability Talk Track",
    voiceId: VOICE,
    script:
      "This is the cheat-sheet rehearsal slide. The core message: every capability has one plain-English line and one discovery question. Read each row out loud now and practise the discovery question — those questions are how you stop pitching and start listening. Delivery tip — in a real meeting you will not deliver this slide; you will deliver the four lines from memory. Treat this slide as the page you study before every call for the first month. Next we move into Module 4: how we sell it.",
  },
  {
    slideId: "se-module-4",
    title: "M4 · Module Intro",
    voiceId: VOICE,
    script:
      "Module 4 is short and high-leverage. By the end of it you understand the discovery, demo, and close motion, and where the maturity roadmap fits the conversation. The two slides are Before versus After — your value framing — and the maturity roadmap — your pacing tool. Together they answer the customer's two unspoken questions: what changes for me, and how fast can it realistically happen. Let's begin.",
  },
  {
    slideId: "se-slide-transform",
    title: "M4 · Before vs After",
    voiceId: VOICE,
    script:
      "Before versus After is your value-framing slide. The core message: today is fragmented, manual, and reactive — tomorrow is connected, automated, and proactive. The pain it addresses: customers can describe today vividly but they struggle to picture tomorrow concretely. The value lever: this slide gives them concrete language for tomorrow so they can sell it internally after you leave the room. Delivery tip — never read both columns. Read the after line and ask, how would your week change if that were true? Then shut up and listen. Their answer becomes the proof story you bring to the next meeting. Next: the maturity roadmap.",
  },
  {
    slideId: "se-slide-maturity",
    title: "M4 · Maturity Roadmap",
    voiceId: VOICE,
    script:
      "The maturity roadmap is your pacing tool — and your insurance against the customer biting off more than they can absorb. The core message: there is a defined path from connected foundation, to insights, to automation, to a fully closed loop — and the customer can start anywhere and step through deliberately. The pain it addresses: leadership has been burned by big-bang transformation programmes that overran. The value lever: deliberate stepping stones with a measurable outcome at each stage. Delivery tip — always anchor the first stage in their current pain, not in our roadmap. Use the locked phase dates: Insights early-2026, Automation mid-2026, Unified Mobile late-2026. Do not slip those dates in conversation — they are the same in every deck. Next module: use cases.",
  },
  {
    slideId: "se-module-5",
    title: "M5 · Module Intro",
    voiceId: VOICE,
    script:
      "Module 5 is where messaging becomes value. By the end of it you can pick the right use case for the prospect's stated pain and walk them through Detect, Trigger, Orchestrate, Prove with a defensible cost figure attached. We move through the DTOP framework, then safety use cases, operations use cases, financial use cases, the Regulation Management use case, and finally customer outcomes. Pick the use case that matches the room — never run all of them.",
  },
  {
    slideId: "se-slide-usecases",
    title: "M5 · Use Case Framework (DTOP)",
    voiceId: VOICE,
    script:
      "This slide gives you the lens for every use case in the deck. The core message: every use case follows the same DTOP shape — Detect the signal, Trigger the response, Orchestrate the change across procedures and training, Prove the outcome. The pain it addresses: customers see use cases as disconnected demos; this lens makes them feel like one operating model. The value lever: when every use case is the same shape, the platform feels inevitable. Delivery tip — always introduce the use case in DTOP terms before showing the screen. Then walk the screen in the same four beats. Repetition is the point — by the third use case the customer is finishing the sentence with you.",
  },
  {
    slideId: "se-slide-safety-uc",
    title: "M5 · Safety Use Cases",
    voiceId: VOICE,
    script:
      "Safety use cases are your highest-conviction opener for safety-led prospects. The core message: signals from flight data and crew reports become procedural and training changes within days, not months — with auditable proof for the regulator. The pain it addresses: their safety team's recommendations sit unimplemented because no one owns the orchestration. The value lever: compounded reduction in repeat events because retraining is targeted to the actual at-risk cohort. Delivery tip — never use the raw acronyms; say flight data signals and crew-reported events. Pick one use case from the slide and tell it as a story end-to-end — never list all three. Next: operations use cases.",
  },
  {
    slideId: "se-slide-ops-uc",
    title: "M5 · Operations Use Cases",
    voiceId: VOICE,
    script:
      "Operations use cases land best with the COO, the Head of Operations, or the Director of Flight Ops. The core message: when operational signals — disruption, weather, crew availability, fleet status — feed the same intelligence layer as safety and content, the response is faster and the procedure changes are propagated automatically. The pain it addresses: every operational disruption today triggers a manual scramble across teams that don't share data. The value lever: faster recovery, lower disruption cost, fewer downstream knock-ons. Delivery tip — use their last public disruption as the anchor, never a hypothetical. Next: financial use cases.",
  },
  {
    slideId: "se-slide-financial-uc",
    title: "M5 · Financial Use Cases",
    voiceId: VOICE,
    script:
      "Financial use cases are the slide you bring when finance is in the room — and they always end up in the room before contract. The core message: the platform replaces five to seven point tools, recovers operational leakage, and turns audit prep from weeks of manual evidence-gathering into minutes of automated assembly. The pain it addresses: finance has stopped believing point-tool ROI because every tool claims its own savings. The value lever: platform value is consolidation savings plus operational recovery plus audit cost reduction — three sources, one platform. Delivery tip — always present a range, not a single number, and always cite the source stack: EUROCONTROL, IATA, SITA, A4A. The disclaimer matters here — call out that the use cases shown are a sample of the highest-cost categories, not an exhaustive model. Credibility scales with caveats. Next: Regulation Management.",
  },
  {
    slideId: "se-slide-regmgmt",
    title: "M5 · Regulation Management",
    voiceId: VOICE,
    script:
      "Regulation Management is your highest-conviction use case for compliance and quality leaders. The core message: when a regulator publishes a change, the platform identifies every affected procedure and training module, drafts the redlines, and pushes the updated content to the right crew with auditable proof of receipt. The pain it addresses: today this is a many-week manual exercise across four or five teams, and the audit trail is reconstructed after the fact. The value lever: weeks compress into days, and the audit trail assembles itself. Delivery tip — always anchor on a real recent regulatory change relevant to the prospect — that's the difference between a demo and a proof. Next: customer outcomes.",
  },
  {
    slideId: "se-slide-outcomes",
    title: "M5 · Customer Outcomes",
    voiceId: VOICE,
    script:
      "Customer outcomes is your social-proof slide and it does more work than any feature slide. The core message: the trust signals you must land — five hundred and fifty plus airlines worldwide, around two and a half million users, six continents. Always cite those exactly. The pain it addresses: nobody wants to be a reference customer; everybody wants to be the next in a long line. The value lever: the long line already exists. Delivery tip — never claim a customer outcome you cannot defend with a named example offline. The figures on this slide are defensible; specific named claims must be cleared before being used. Next module: why we win.",
  },
  {
    slideId: "se-module-6",
    title: "M6 · Module Intro",
    voiceId: VOICE,
    script:
      "Module 6 is the closing module. By the end of it you handle the top five objections and walk a prospect to a ninety-day pilot. Three slides: the objections cheat sheet, why Comply365 wins, and your first seven days as a rep. This is the module to revisit before every customer call for the first month — these are the moments that decide deals.",
  },
  {
    slideId: "se-slide-objections",
    title: "M6 · Objections Cheat Sheet",
    voiceId: VOICE,
    script:
      "Objections cheat sheet — read this slide aloud, every line, and practise the responses until they sound like yours, not ours. The core message: every objection follows the same three-step pattern — Acknowledge, Reframe, Bridge. Acknowledge what they said without defending. Reframe to the part of their pain the objection actually exposes. Bridge to a concrete next step — usually a twenty-minute DTOP walkthrough or a focused use-case session. The pain you're addressing in this slide: most reps argue with objections instead of using them as discovery. The value lever: a well-handled objection is a faster path to the pilot than no objection at all. Delivery tip — never escalate. The customer's objection is information, not opposition. Next: why we win.",
  },
  {
    slideId: "se-slide-why",
    title: "M6 · Why Comply365",
    voiceId: VOICE,
    script:
      "Why Comply365 is your closing argument. The core message — three differentiators, in this order: connected foundation, the intelligence layer with approximately ninety percent domain accuracy, and proven scale at five hundred and fifty plus airlines and around two and a half million users across six continents. The pain it addresses: at the close, the customer is choosing between feeling safe and feeling visionary — this slide lets them feel both. The value lever: foundation gives them the safe choice, intelligence gives them the visionary choice, scale removes the career risk. Delivery tip — pick the one differentiator that matches the room and lead with it — don't read all three with equal weight. Then ask the close: can we put a focused ninety-day pilot together for your highest-cost use case? Silence after that question is your friend. Next: your first seven days.",
  },
  {
    slideId: "se-slide-closing",
    title: "M6 · Your First 7 Days",
    voiceId: VOICE,
    script:
      "This slide is the rep's commitment, not the customer's. The core message: in your first seven days you will watch three demos — Executive Pitch 3, the DTOP Playbook, and the CoAnalyst Playbook — shadow two live calls, run one role-play on the we already have an SMS objection, and bookmark the Command Centre as your single source of truth for collateral. The pain this addresses: most new reps wait to be pulled into deals; the ones who win are the ones who ramp themselves. The value lever: the day-seven readiness checklist on this slide is your bar — when you can tick all five honestly, you're ready for a real discovery call. Final delivery tip — the closing line of this academy is the same line you should carry into every customer meeting: you're not selling software, you're selling the first connected operating model in aviation. Now go practise.",
  },
];

export const getSalesEnablementNarration = (slideId: string): SESlideNarration | undefined =>
  salesEnablementNarrations.find((n) => n.slideId === slideId);
