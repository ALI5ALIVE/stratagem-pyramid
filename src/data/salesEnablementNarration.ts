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
      "Welcome to the Sales Enablement Academy. Before we touch a single deck, let's set expectations. Your job is not to sell software — it is to sell the first connected operating model in aviation. The platform is the proof, the operating model is the story, and DTOP — Detect, Trigger, Orchestrate, Prove — is the loop that makes it real for the customer. The academy is structured as three weeks of study. Week one is the foundation — the market shift and the platform in plain English. Week two is the capabilities — how the four bands fit together. Week three is sell and win — discovery, walkthrough, close, use cases, and objections, ending with a clear next step in the conversation. Take notes, repeat the core lines out loud, and treat every recap slide as a real rehearsal. Let's begin with the strategic shift the industry is going through right now.",
  },
  {
    slideId: "se-slide-shift",
    title: "M1 · The Strategic Shift",
    voiceId: VOICE,
    script:
      "This slide matters because it tells you why prospects are willing to take this meeting at all. The core message: regulators have shifted from prescriptive compliance — did you tick the box — to performance-based oversight — can you prove the loop closed. The pain you're addressing: their leadership is being asked for outcome evidence they don't have, because their tools were built for records, not for closing loops. The value lever: we are the only platform built for the new model. When you deliver this, slow down. Don't list regulators. Say one sentence: the question used to be did you do the training, the question now is did the behaviour change — then pause. Don't say AI. Don't say transformation. The next slide quantifies what it costs them to live in the old model.",
  },
  {
    slideId: "se-plain-english-shift",
    title: "M1 · Why This Matters (Plain English)",
    voiceId: VOICE,
    script:
      "This slide replaces the dollar-figure cost-of-inaction with three plain-English lines you can say to any prospect, in any room. The core message: aviation isn't short on data — it's short on signals it can act on, and proof that the action worked. The pain you're naming: operators run safety, content, and training in three disconnected stacks; we unify them with domain-trained intelligence on top. The value lever: a measurable shift from reactive to controlled — Detect, Trigger, Orchestrate, Prove. Deliver each line slowly and pause for the discovery question — those questions are what stop you pitching and start them describing their own problem. Avoid the ROI numbers we have not signed off; this slide is messaging, not modelling. Then transition into Module 2, where we make the platform itself plain English.",
  },
  {
    slideId: "se-week-1",
    title: "Week 1 · Foundation",
    voiceId: VOICE,
    script:
      "Week 1 is the foundation. The job this week is simple: set the scene, put the platform in plain English, and learn the operating loop that makes the whole story land — DTOP. By the end of Week 1 you can explain why the market is shifting, give the one-sentence platform pitch, and walk the DTOP loop on a whiteboard — Detect, Trigger, Orchestrate, Prove — without jargon, without reading off a slide. The four capability bands you must also name from memory, in order: Core Apps, Intelligence and Orchestration, Unified Mobile, and DTOP. Slow down on the recap slide at the end of the week — that's the rehearsal, not a content slide. Once Week 1 sounds natural, move into Week 2 — the capabilities.",
  },
  {
    slideId: "se-slide-whatis",
    title: "M2 · The Platform",
    voiceId: VOICE,
    script:
      "This is the platform diagram and it does the heavy lifting in almost every customer meeting. The core message you must internalise: this is the first platform that joins safety, content, and training onto one operational data foundation, with an intelligence layer on top. The pain you're solving: today they pay for five to seven tools that don't share data and they integrate them with brittle point-to-point connections. The value lever: one foundation means signals from operations actually reach procedures and training — and back. When you deliver this, point to the foundation first, then the apps, then the intelligence layer, then mobile, then DTOP wrapping it all. Resist the urge to dive into any one box. Customers ask for the deep-dive when they're ready — your job here is to land the shape, not the features. Next we go straight into DTOP — the loop that makes this platform worth buying.",
  },
  {
    slideId: "se-slide-value",
    title: "M2 · Value Unlocked",
    voiceId: VOICE,
    script:
      "Now that the DTOP loop is on the whiteboard, this slide turns it into money and time. The core message: when the foundation is shared and the loop is closed, you get faster procedure cycles, lower investigation cost, and audit evidence that assembles itself. The pain it addresses: their finance team has stopped believing point-tool ROI claims because every tool sells in isolation. The value lever you pull: platform value compounds — one shared foundation, closed by DTOP, lifts every workflow on top of it. When delivering, name three numbers and stop — don't list every metric on the slide. Pick the one most relevant to the prospect: if they're safety-led, use the investigation time; if they're ops-led, use procedure cycle time; if they're CFO-led, use the leakage recovery figure. Then bridge to the recap.",
  },
  {
    slideId: "se-slide-recap-m2",
    title: "M2 · Recap Talk Track",
    voiceId: VOICE,
    script:
      "This is a rehearsal slide, not a content slide. The core message: there are three questions every prospect asks, and you need a clean one-sentence answer for each. What is it — the first connected operating platform for safety, content, and training. How is it different — one foundation instead of five to seven disconnected tools. What's the one thing to remember — point solutions can detect, only we can Detect, Trigger, Orchestrate, and Prove. Read each one out loud right now. If you stumble, replay this slide. Don't move on until all three feel natural. Module 3 goes capability by capability.",
  },
  {
    slideId: "se-week-2",
    title: "Week 2 · Capabilities",
    voiceId: VOICE,
    script:
      "Week 2 is the longest week because the capabilities are where the walkthrough lives. By the end of it you should be able to give a sixty-second walk-through of each capability and ask one good discovery question per capability. We go in this order: Core Apps — SafetyManager365, ContentManager365, TrainingManager365 — then the Intelligence layer with CoAnalyst, Insights and Recommendations, and Automation, then how CoAnalyst differs from generic AI, then the Unified Mobile App, and we close with the capability cheat sheet. DTOP itself you already learned in Week 1 — this week you map each capability onto the loop. Take it slowly. This is the week reps under-prepare for and lose deals over.",
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
      "Insights and Recommendations is how CoAnalyst earns trust before it ever automates anything. The core message: it surfaces patterns, flags emerging risk, and — in the long run — recommends the next operational action with the evidence that supports the recommendation. The pain it addresses: today their analysts spend the majority of their week building decks instead of making decisions. The value lever: when the system writes the first draft with the evidence attached, the analyst's role shifts from report-builder to decision-maker. Delivery tip — emphasise that the answer always carries its evidence. That's the trust currency. On the roadmap, be precise — and be honest about the distinction between a POC and production. Insights is in POC in H1 2026 — that is an internal prototype we use to prove the approach, not a feature customers can buy or use yet. Production rollout for Insights is H2 2026. Recommendations and prescriptive actions are 2027 and beyond — that is the vision, not the near-term commitment. If a prospect pushes for Recommendations now, say plainly: Insights first, in H2 next year; Recommendations is the year after. Next: Automation.",
  },
  {
    slideId: "se-slide-automation",
    title: "M3 · Automation",
    voiceId: VOICE,
    script:
      "Automation is the controlled second step. The core message: once the customer trusts the system's answers, we automate the safe routines — routing, assignment, notifications, evidence assembly — with a human in the loop on anything that changes a procedure or a training plan. The pain it addresses: their best people spend hours every day on tasks that have a deterministic right answer. The value lever: hours back to where judgement actually matters. Delivery tip — always frame automation as human-in-the-loop by default. Customers fear runaway automation; you defuse it by making the guardrails the headline. On the roadmap — and keep the POC-versus-production distinction crisp — the Automation POC is targeted for April 2026; platform-wide rollout is H2 2026. POC means internal prototype, not something a customer can use yet. Next: how CoAnalyst differs from generic AI.",
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
      "The All-in-One Mobile Experience is the slide that changes the room when the operations leader is present. The core message: one app for the frontline — content, training, and safety reporting in the same shell, same login, same offline behaviour. The pain it addresses: their crews juggle three to five separate apps today, each with its own login and its own quirks, and adoption suffers. The value lever: one app means real adoption, real signal capture, and a real feedback loop from the line. Delivery tip — show, don't tell. If you have a device, hand it over. Discovery question: how many separate apps does your frontline juggle today? On the roadmap, be precise and phased: Phase 1 — Training screens in the Comply iOS Mobile app — is H1 2026. Phase 2 — Safety Reporting in the same app — is H2 2026. Phase 3 — the fully unified experience across content, training and safety — is 2027 and beyond. Do not promise the full unified shell next year. Next: the capability cheat sheet — your study page before every call.",
  },
  {
    slideId: "se-slide-dtop",
    title: "M2 · DTOP",
    voiceId: VOICE,
    script:
      "DTOP is not a feature, it is the operating model that makes everything else worth buying — and that's exactly why it lives in the foundation week, not buried with the capabilities. The core message: Detect, Trigger, Orchestrate, Prove — the closed loop from operational signal to verified outcome. Use the canonical colour cues when whiteboarding it: Detect, Trigger, Orchestrate, Prove — keep them in that order, every time. The pain it addresses: today their loop is broken between any two of those four steps — usually between Trigger and Orchestrate. The value lever: point solutions cover one or two steps; only this platform closes the full loop with auditable proof. Delivery tip — draw it on a whiteboard if you can, even on a Zoom call. Drawing it earns the right to ask: which step breaks first for you today? Their answer is your walkthrough. Next: the value this loop unlocks.",
  },
  {
    slideId: "se-slide-talktrack",
    title: "M3 · Capability Talk Track",
    voiceId: VOICE,
    script:
      "This is the cheat-sheet rehearsal slide. The core message: every capability has one plain-English line and one discovery question. Read each row out loud now and practise the discovery question — those questions are how you stop pitching and start listening. Delivery tip — in a real meeting you will not deliver this slide; you will deliver the four lines from memory. Treat this slide as the page you study before every call for the first month. Next we move into Module 4: how we sell it.",
  },
  {
    slideId: "se-week-3",
    title: "Week 3 · Sell & Win",
    voiceId: VOICE,
    script:
      "Week 3 is sell and win. By the end of this week you can run the discovery, walkthrough, and close motion in plain English, pick the right use case for the room, and handle the top three objections — every time ending with a clear next step. We move through the discovery-to-close cheat sheet, the use case cheat sheet, the Regulation Management use case, customer outcomes, objections, why Comply365, and your enablement plan as a rep. A note on language — we say walkthrough, not demo. We are not yet at the point of running a polished customer demo; what we run today is a focused walkthrough on the prospect's highest-cost use case. This is the week where messaging becomes value — slow down on the cheat sheets and learn the three lines and three questions cold.",
  },
  {
    slideId: "se-discovery-to-close",
    title: "M4 · Discovery → Walkthrough → Close",
    voiceId: VOICE,
    script:
      "This is the motion in plain English. The core message: discovery finds the disconnected loop, the walkthrough shows the loop close on their data shape, close scopes the next focused conversation around their highest-cost use case. A deliberate language choice — we say walkthrough, not demo. We are not running a polished customer demo today; we are walking a prospect through how DTOP would close their loop. The pain you're addressing: most reps over-pitch because they're guessing what matters; the three discovery questions stop the guessing. The value lever: outcome-based conversations beat feature checklists every time. Delivery tip — say the three lines, ask the three questions, write down their answers verbatim. Their words become your walkthrough script and the scope of the next session. Next: use cases.",
  },
  {
    slideId: "se-module-5",
    title: "M5 · Module Intro",
    voiceId: VOICE,
    script:
      "Module 5 is where messaging becomes value. By the end of it you can pick the right plain-English use case for the prospect's pain and walk them through Detect, Trigger, Orchestrate, Prove. We move through the use case cheat sheet, the Regulation Management use case, and customer outcomes. Pick the use case that matches the room — never run all of them.",
  },
  {
    slideId: "se-usecase-cheatsheet",
    title: "M5 · Use Case Cheat Sheet",
    voiceId: VOICE,
    script:
      "This is the page you study before every customer call. The core message: five plain-English use cases — safety signal to procedure update, regulation change to targeted training, fatigue trend to roster intervention, ops disruption to crew comms, audit prep to continuous proof. Each one carries the discovery question that surfaces it. The pain you're addressing: reps over-rotate on a single use case and miss the buyer's actual pain. The value lever: pattern-match the prospect's words to the cheat sheet, then run that use case as a DTOP story. Delivery tip — never run all five in one meeting. Pick one, tell it end-to-end in Detect, Trigger, Orchestrate, Prove order, and ask the discovery question on the others to qualify the next conversation. Avoid the dollar figures we have not signed off; this slide is messaging, not modelling. Next: the Regulation Management use case.",
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
      "This is the closing arc of Week 3. By the end of it you handle the top three objections and walk a prospect to a clear next step. Three slides: the objections cheat sheet — three objections, not five — why Comply365 wins, and your enablement plan as a rep. The list is intentionally three for now — final wording is being reviewed by Marketing.",
  },
  {
    slideId: "se-slide-objections",
    title: "M6 · Objections Cheat Sheet",
    voiceId: VOICE,
    script:
      "Objections cheat sheet — read this slide aloud, every line, and practise the responses until they sound like yours, not ours. The core message: every objection follows the same three-step pattern — Acknowledge, Reframe, Bridge. Acknowledge what they said without defending. Reframe to the part of their pain the objection actually exposes. Bridge to a concrete next step — usually a twenty-minute focused walkthrough on their highest-cost use case. The pain you're addressing in this slide: most reps argue with objections instead of using them as discovery. The value lever: a well-handled objection is a faster path to the next conversation than no objection at all. Delivery tip — never escalate. The customer's objection is information, not opposition. Three on the slide, intentionally; final wording is still under Marketing review. Next: why we win.",
  },
  {
    slideId: "se-slide-why",
    title: "M6 · Why Comply365",
    voiceId: VOICE,
    script:
      "Why Comply365 is your closing argument. The core message — three differentiators, in this order: connected foundation, the intelligence layer with approximately ninety percent domain accuracy, and proven scale at five hundred and fifty plus airlines and around two and a half million users across six continents. The pain it addresses: at the close, the customer is choosing between feeling safe and feeling visionary — this slide lets them feel both. The value lever: foundation gives them the safe choice, intelligence gives them the visionary choice, scale removes the career risk. Delivery tip — pick the one differentiator that matches the room and lead with it — don't read all three with equal weight. Then ask the close: can we set up a focused walkthrough on your highest-cost use case? Silence after that question is your friend. Next: your enablement plan.",
  },
  {
    slideId: "se-slide-closing",
    title: "M6 · Your First 7 Days",
    voiceId: VOICE,
    script:
      "This slide is the rep's commitment, not the customer's. The order matters. Step one — read the Enablement deck end to end, Week 1 first. Step two — only then read the Medium Pitch, Executive Pitch 3, because every Enablement slide is teaching you a slide in that deck. Step three — practise the we already have an SMS role-play using Acknowledge, Reframe, Bridge, and end by booking a twenty-minute focused walkthrough on the prospect's highest-cost use case. Step four — bookmark the Command Centre as your single source of truth, and use the Persona Deep-Dive and Signals 101 Playbook as your reference shelves. The pain this addresses: most new reps wait to be pulled into deals; the ones who win are the ones who ramp themselves. The value lever: when you can tick every line of the readiness checklist honestly, you're ready for the next conversation. Final delivery tip — the closing line of this academy is the same line you should carry into every customer meeting: you're not selling software, you're selling the first connected operating model in aviation. Now go practise.",
  },
];

export const getSalesEnablementNarration = (slideId: string): SESlideNarration | undefined =>
  salesEnablementNarrations.find((n) => n.slideId === slideId);
