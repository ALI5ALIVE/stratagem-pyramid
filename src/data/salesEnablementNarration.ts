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
    title: "Week 1 · The Strategic Shift",
    voiceId: VOICE,
    script:
      "This slide matters because it tells you why prospects are willing to take this meeting at all. The core message: regulators have shifted from prescriptive compliance — did you tick the box — to performance-based oversight — can you prove the loop closed. The pain you're addressing: their leadership is being asked for outcome evidence they don't have, because their tools were built for records, not for closing loops. The value lever: we are the only platform built for the new model. When you deliver this, slow down. Don't list regulators. Say one sentence: the question used to be did you do the training, the question now is did the behaviour change — then pause. Don't say AI. Don't say transformation. The next slide says it in plain English — why this shift matters to them, in three lines you can repeat in any room.",
  },
  {
    slideId: "se-plain-english-shift",
    title: "Week 1 · Why This Matters (Plain English)",
    voiceId: VOICE,
    script:
      "This slide replaces the dollar-figure cost-of-inaction with three plain-English lines you can say to any prospect, in any room. The core message: aviation isn't short on data — it's short on signals it can act on, and proof that the action worked. The pain you're naming: operators run safety, content, and training in three disconnected stacks; we unify them with domain-trained intelligence on top. The value lever: a measurable shift from reactive to controlled — Detect, Trigger, Orchestrate, Prove. Deliver each line slowly and pause for the discovery question — those questions are what stop you pitching and start them describing their own problem. Avoid the ROI numbers we have not signed off; this slide is messaging, not modelling. Then stay in Week 1 — next we make the platform itself plain English.",
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
    title: "Week 1 · The Platform",
    voiceId: VOICE,
    script:
      "This is the platform diagram and it does the heavy lifting in almost every customer meeting. The core message you must internalise: this is the first platform that joins safety, content, and training onto one operational data foundation, with an intelligence layer on top. The pain you're solving: today they pay for five to seven tools that don't share data and they integrate them with brittle point-to-point connections. The value lever: one foundation means signals from operations actually reach procedures and training — and back. When you deliver this, point to the foundation first, then the apps, then the intelligence layer, then mobile, then DTOP wrapping it all. Resist the urge to dive into any one box. Customers ask for the deep-dive when they're ready — your job here is to land the shape, not the features. Next we go straight into DTOP — the loop that makes this platform worth buying.",
  },
  {
    slideId: "se-slide-signals",
    title: "Week 1 · Signal Sources",
    voiceId: VOICE,
    script:
      "Why this matters: every prospect, in every discovery call, will eventually ask 'what data do you actually use?' — and most reps fumble it. This slide is your answer. The core message: Detect listens across four very different signal sources, and the reason DTOP works is that we fuse all four into one Detect layer instead of leaving them in four different worlds. Name them in this order, every time — Regulation Signals, Anomalies, Operational Change Requests, and Micro, Macro and Geopolitical Influences. The value lever: point solutions cover one of these at best; only this platform unifies all four and turns them into triggers. Delivery tip — when you walk this slide, point at each source and say one sentence: which signals it carries and which downstream action it can trigger. Then ask the discovery question that converts: which of these four is hardest for you to act on today? Their answer is your wedge — and it almost always points at Anomalies or Operational Change Requests. Next: the value this loop unlocks.",
  },
  {
    slideId: "se-slide-value",
    title: "Week 1 · Value Unlocked",
    voiceId: VOICE,
    script:
      "Now that the DTOP loop is on the whiteboard, this slide turns it into money and time. The core message: when the foundation is shared and the loop is closed, you get faster procedure cycles, lower investigation cost, and audit evidence that assembles itself. The pain it addresses: their finance team has stopped believing point-tool ROI claims because every tool sells in isolation. The value lever you pull: platform value compounds — one shared foundation, closed by DTOP, lifts every workflow on top of it. When delivering, name three numbers and stop — don't list every metric on the slide. Pick the one most relevant to the prospect: if they're safety-led, use the investigation time; if they're ops-led, use procedure cycle time; if they're CFO-led, use the leakage recovery figure. Then bridge to the Operational Performance Roadmap — that's where they see themselves on the curve.",
  },
  {
    slideId: "se-slide-maturity-roadmap",
    title: "Week 1 · Operational Performance Roadmap",
    voiceId: VOICE,
    script:
      "Why this slide matters: every prospect already lives somewhere on this curve, and the fastest way to make the conversation real is to let them point at where they are. The core message: operational performance maturity is a five-stage journey — Fragmented and Reactive, Managed, Connected, Proactive, and Predictive and Self-Healing — and this is the only platform built to move customers along the entire curve, because every stage runs on the same connected foundation closed by DTOP. The pain you're addressing: most operators are stuck somewhere between Stage 1 and Stage 2, paying for tools that promised Stage 4 but never delivered, because the foundation underneath was never connected. The value lever: each stage compounds on the one below it — you cannot leap to Predictive without first being Connected, and you cannot be Connected on five disconnected tools. Delivery tip — do not present the curve, navigate it. Walk the five stages out loud, then stop and ask one question: which stage best describes you today, and which stage are you being asked to reach in the next twelve to eighteen months? Their answer is the scope of every follow-up conversation. Be honest about Stage 5 — Predictive and Self-Healing is the roadmap direction, not a feature you can sell today. Transition: next slide we put this curve on a whiteboard so you can draw it from memory in the room.",
  },
  {
    slideId: "se-slide-maturity-whiteboard",
    title: "Week 1 · Operational Performance Roadmap Whiteboard",
    voiceId: VOICE,
    script:
      "Why this drill exists: the roadmap slide is a great visual, but executives buy when you draw it. Sketching the curve on a whiteboard proves you own the model, and it pulls the buyer into the conversation instead of leaving them as a passive audience. The core message: five stages, one inflection. Most buyers live somewhere between Stage 1 — Fragmented — and Stage 2 — Managed and Siloed — and that is exactly where you plant the YOU ARE HERE flag. Your job in the room is to sell the next stage, not Stage 5. The pain you are naming: every buyer thinks they are at Stage 3 because they have bought tools that were sold as Stage 3. Honestly, they are at one-point-five. Putting the flag between Fragmented and Managed gives them permission to admit it — and that admission is the unlock for everything that follows. How to deliver: ninety seconds, six strokes, no slides behind you. Stroke one, draw the axes. Stroke two, draw stages one and two flat and plant the flag between them. Stroke three, bend the curve up at Stage 3 and label it the platform shift. Stroke four, climb to Stage 4. Stroke five, cap it at Stage 5. Stroke six, tap the flag again and ask one question: 'does that feel about right for where you are today?' Then stop talking. Whoever speaks first loses. Practice this three times before your next meeting and time-box yourself to ninety seconds. Transition: now we recap Week 1 in three sentences you can repeat from memory.",
  },
  {
    slideId: "se-slide-recap-m2",
    title: "Week 1 · Recap Talk Track",
    voiceId: VOICE,
    script:
      "This is a rehearsal slide, not a content slide. The core message: there are three questions every prospect asks, and you need a clean one-sentence answer for each. What is it — the first connected operating platform for safety, content, and training. How is it different — one foundation instead of five to seven disconnected tools. What's the one thing to remember — point solutions can detect, only we can Detect, Trigger, Orchestrate, and Prove. Read each one out loud right now. If you stumble, replay this slide. Don't move on until all three feel natural. You already named the four signal sources two slides ago — Regulation, Anomalies, Operational Change Requests, and Micro, Macro and Geopolitical Influences — keep that list ready, it's the answer to 'what data do you actually use?' on every discovery call. Week 2 goes capability by capability.",
  },
  {
    slideId: "se-week-2",
    title: "Week 2 · Capabilities",
    voiceId: VOICE,
    script:
      "Week 2 is the longest week because the capabilities are where the walkthrough lives. Why it matters: by the end of this week you can give a sixty-second walk-through of every capability, ask one good discovery question per capability, and tell the whole story as one DTOP loop without notes. The core message — say it verbatim: one platform, three Core Apps, one Intelligence Layer, one Unified Mobile, all wired together by DTOP. The order matches the deck exactly. One — the Platform map. Two — the platform-wide Insights and Intelligence capability, your headline story. Three — the cross-domain use cases only that layer can answer. Four — the Intelligence Layer deep-dive. Five — the per-solution use cases inside each Core App. Six — Insights. Seven — Recommendations use cases. Eight — Automation. Nine — Automation use cases. Ten — Intelligence Layer versus generic AI — your defensive slide, anchor on roughly ninety percent domain accuracy versus roughly thirty-five percent for generic AI. Eleven — Regulation Management as the cleanest end-to-end proof case. Twelve — Unified Mobile as the device-side close of the loop. Thirteen — the capability cheat sheet. Fourteen — the Week 2 capstone whiteboard, where you tell one use case, every capability, one DTOP loop in sixty seconds. How to deliver it: take it slowly, do not list features — always tie each capability back to a customer outcome and a step in the DTOP loop. Approved terminology only: Generative AI, Recommended Actions, Operational Data — no FOQA, FDM or ASAP. Transition: next we open the platform map.",
  },
  {
    slideId: "se-week-2-overview",
    title: "Week 2 · The Platform Map",
    voiceId: VOICE,
    script:
      "Why this slide matters: before we drill into any single capability, reps need the whole-platform picture in their head, so each capability lands as part of one system instead of a feature list. Core message — say this back verbatim: Comply365 is one Operational Performance Platform. Three Core Apps — SafetyManager365, ContentManager365, TrainingManager365 — an Intelligence and Orchestration layer on top with Intelligence Layer, Insights and Automation, one Unified Mobile shell for the frontline, all wired together by DTOP. The pain this addresses: prospects buy capabilities one at a time and end up with five to seven disconnected tools that don't share data — this slide reframes the conversation around one foundation, which is the only place our differentiation actually shows. How to deliver it: point at the diagram in this order — Core Apps first, then the Intelligence layer sitting on top, then Mobile as the frontline shell, then DTOP wrapping the whole thing. Say one platform, not modules or suite. Do not use FOQA, FDM or ASAP — say flight data signals and crew-reported events. Transition: next we lead with the capability that makes this platform different from any stack on the market — Platform Insights and Intelligence.",
  },
  {
    slideId: "se-platform-insights-intelligence",
    title: "Week 2 · Platform · Insights & Intelligence",
    voiceId: VOICE,
    script:
      "Why this slide matters: this is the single most powerful capability story in the deck — a platform-wide intelligence capability that any user can trigger just by asking a question. Core message: this is not a chatbot bolted onto a dashboard. Any user asks an operational question in plain English — for example, are dangerous goods incidents linked to training gaps — and the platform returns a cross-domain answer with recommended actions in seconds. In the example on the slide, three stations show DG handling spikes, all three correlate with overdue DG recurrent training, and the recommended actions are generated automatically. The pain it addresses: today that question takes a director two weeks, a BI ticket, three exports and a spreadsheet — and the answer still does not connect safety to training. The value lever — and you must land this verbatim — approximately ninety percent domain accuracy on aviation operational questions versus around thirty-five percent for generic AI tools pointed at the same data, because we sit on connected operational data, a four-thousand-plus aviation knowledge graph at five levels, and domain-trained reasoning with cited evidence — not a generic LLM guessing. How to deliver it: walk the Ask and Get-back panels first, then walk the six stages left to right — plain-English question, connected operational data, domain knowledge graph, domain-trained reasoning, guardrails and audit trail, then answer plus recommended actions. Emphasise tenant isolation and source citations every time — that handles the security objection before it is asked. Discovery question: what is the cross-domain question your team can never get a straight answer to today? Transition: that example was one. Next slide, the three platform-wide use cases only this layer can answer — Safety to Training, the Dangerous Goods manual loop, and Part 145 audit readiness.",
  },
  {
    slideId: "se-platform-wide-intelligence-usecases",
    title: "Week 2 · Intelligence & Insights — Platform-Wide Use Cases",
    voiceId: VOICE,
    script:
      "Why this slide matters: this is where Intelligence and Insights stops being a feature pitch and becomes a board-level capability. Three real questions sit on the slide, in this order. Card one — show me a correlation between recent safety trends and training deficiencies; the platform joins safety occurrences with competency and recurrency records and surfaces where rising hazard reports overlap with overdue or under-performing training. Card two — how are we performing with the recent updates to the Dangerous Goods manual, and has the resulting training led to fewer incidents; the platform traces the procedure revision through training assignments and back into safety occurrence trends, closing the loop from content change to operational outcome. Card three — are we ready for the upcoming Part 145 audit; the platform cross-references audit scope against open findings, procedure currency, training compliance and recent safety signals, then flags the gaps and recommends actions to close them in time. Core message — say it verbatim: no single Core App can answer these. They require the unified operational data substrate plus the intelligence layer on top. The pain you are addressing: today these questions take weeks of BI tickets and still come back ambiguous. The value lever: cross-domain answers in seconds, with cited evidence and recommended actions that map directly onto DTOP — and you can point at the DTOP chips on every card to prove it. How to deliver it: pick the card that fits the room — Safety-and-Training for a Director of Safety, the DG manual loop for a Head of Training, Part 145 for a Quality leader — and walk that one card end to end. Discovery question: which of these three cross-domain questions does your leadership ask most often without a straight answer? Transition: that is what the platform-wide intelligence capability does. Next slide, we open the box and look at what powers it — the Intelligence Layer itself.",
  },
  {
    slideId: "se-slide-coanalyst",
    title: "Week 2 · Intelligence Layer",
    voiceId: VOICE,
    script:
      "Why this slide matters: you have just shown what the intelligence layer does platform-wide — across all the operational data at once. This slide is the natural next question every prospect asks — does it also work inside the app my team already lives in? The answer is yes, and the slide proves it with a three-by-three grid. Core message — say this verbatim: one intelligence layer, three doorways — Safety today, Content and Training next — same engine, same guardrails, scoped to the app the user is already in. What is on the slide: the three columns are the Core Apps with rollout chips — SafetyManager365 is available now, ContentManager365 is coming soon, TrainingManager365 is coming soon. The three rows are the capability the layer brings into each app — ask in plain English, cross-domain insight and root cause, and a cited answer with the single next step a human takes inside that app. Read across any row and you see the same capability expressed three different ways, each grounded in that app's own data. The honest limitation — and you must say this out loud: in-product, the layer reasons over that app's own data, single-domain. The platform-wide view you showed two slides ago is what you get when the same layer reasons across all three apps together. Same engine, different scope — that is how we defuse the is-this-real-or-roadmap objection. The pain it addresses: today an analyst leaves the app, opens BI, exports CSVs, builds a deck, and comes back with an answer that is already stale. The value lever: the answer arrives where the work happens, with cited evidence and one next step a human confirms — never an autonomous workflow. How to deliver it: point at the Safety column first and say this is live today, then sweep across to Content and Training and say same pattern, sequenced rollout. Do not quote the ninety-percent-versus-thirty-five-percent accuracy stat here — that lives on the Intelligence-Layer-versus-Generic-AI slide later in this week, and you blunt it if you spend it now. Never call it a chatbot — call it an analyst that lives inside the app your team already uses. Discovery question: which of your three teams — Safety, Content, or Training — loses the most hours per week leaving their app to chase an answer? Transition: next slide, the Monday-morning picture — the specific per-solution use case inside each Core App. The safety-report pull formatted to a lessor's spec inside SafetyManager365, the thirty-day mobile-sync list inside ContentManager365, and the recurrency roster by base inside TrainingManager365 — same engine, three different chores cleared.",
  },
  {
    slideId: "se-slide-coanalyst-usecases",
    title: "Week 2 · Intelligence & Insights — Per-Solution Use Cases",
    voiceId: VOICE,
    script:
      "Why this slide matters: prospects buy capabilities they can picture themselves using on a Monday morning. This is the Monday-morning picture for Intelligence and Insights inside each Core App. Core message: at the solution level the capability does the chores nobody has time for. In Safety — pull a list of safety reports for a specific tail number, formatted to a lessor's requirements and sent electronically on a schedule. In Content — list every flight-crew member who has not synched their mobile device in the past thirty days and pass it to fleet captains for follow-up. In Training — list crew with upcoming training renewals for a specific base, ready to schedule classroom training. The pain you are addressing: today these are spreadsheet jobs that consume a coordinator's week and still ship late. The value lever: the same engine that answers the board-level questions you walked two slides ago also clears the day-to-day chores — same Intelligence Layer, two different audiences. Delivery tip — pick the one card that matches your prospect's role and stop talking. Discovery question: what is the report your team rebuilds every month that should already exist? Transition: next slide, Insights — how the platform earns trust by surfacing patterns from this same data before it ever recommends or automates anything.",
  },
  {
    slideId: "se-slide-insights",
    title: "Week 2 · Insights",
    voiceId: VOICE,
    script:
      "Why this slide matters: this is the slide where the Intelligence Layer stops being reactive — the customer no longer has to ask a question — and starts surfacing what matters on its own. It is also how the platform earns trust before it ever recommends or automates anything. Core message: Insights watches the connected operational data continuously, surfaces patterns, flags emerging risk and presents what changed with the evidence that supports it. No action is taken without a human in the loop. The pain it addresses: today their analysts spend the majority of their week building decks instead of making decisions, and emerging risk only becomes visible after the next incident. The value lever: when the system writes the first draft with the evidence attached, the analyst's role shifts from report-builder to decision-maker. Delivery tip — emphasise that every insight carries its evidence; that is the trust currency, and it is the difference between this and a dashboard. Be precise on the roadmap and keep the POC versus production distinction crisp: Insights is in POC in H1 2026 — an internal prototype, not something a customer can use yet — and production rollout is H2 2026. Do not promise Recommendations on this slide; that is the next capability up the stack and the next slide in this deck. Discovery question: what pattern in your operation do you wish you could see two weeks earlier? Transition: Insights is the watchtower. Next slide, what happens when the watchtower starts telling you what to do — the Recommendations and Prescriptive Actions use cases, per solution and across the platform.",
  },
  {
    slideId: "se-slide-insights-usecases",
    title: "Week 2 · Recommendations & Prescriptive Actions — Use Cases",
    voiceId: VOICE,
    script:
      "Why this slide matters: Recommendations is the capability that draws the most enthusiasm and the most scepticism in the same meeting, and use cases ground both. The slide has two columns — Per Solution on the left, Platform on the right. Walk them in that order. Per Solution. In Safety — what risk controls would you recommend to mitigate unstable approach at location X. In Content — based on how users search the OMA, what updates would make search faster and easier. In Training — what updates would you recommend to our Dangerous Goods training to improve engagement. Platform. One — where should my attention be focused today; the system identifies key and emerging risk patterns and recommends actions. Two — how successful was our Just Culture campaign; the system measures outcomes versus intended benefits, identifies improvement patterns and recommends next actions. Three — if we were audited today, where would attention focus; the system identifies areas of concern and proposes rectification and preventative action. Core message: every recommendation cites its evidence, and every recommendation closes a step in DTOP. The pain it addresses: leadership today gets opinions, not prioritised recommendations with the evidence attached. The value lever: a prioritised list of next actions, with the proof attached, every Monday — at both the coordinator level and the executive level. Delivery tip — be honest about the roadmap. Recommendations and Prescriptive Actions are 2027 and beyond; use these examples to sell the direction, not next quarter's invoice. Discovery question: where in your week do you want a prioritised list of next actions instead of another dashboard? Transition: next slide, Automation — the controlled second step once Insights and Recommendations have earned the trust to act.",
  },
  {
    slideId: "se-slide-automation",
    title: "Week 2 · Automation",
    voiceId: VOICE,
    script:
      "Why this slide matters: Automation is the controlled second step. Insights earns the trust, Recommendations proves the judgement, Automation closes the loop. Core message: once the customer trusts the system's answers, the platform automates the safe, deterministic routines — routing, assignment, notifications, evidence assembly — and keeps a human in the loop on anything that changes a procedure or a training plan. The pain it addresses: their best people spend hours every day on handoffs that have a deterministic right answer, and those handoffs happen by email with no audit trail. The value lever: hours back to where judgement actually matters, and every automated step leaves auditable evidence behind it. Delivery tip — always frame automation as human-in-the-loop by default. Customers fear runaway automation; you defuse it by making the guardrails the headline, not the speed. Be precise on the roadmap and keep the POC-versus-production distinction crisp: the Automation POC is targeted for April 2026 — internal prototype only — and platform-wide rollout is H2 2026. Discovery question: which handoff in your operation today takes the longest and adds the least judgement? Transition: next slide, three concrete platform-layer Automation use cases — the ones to walk into a room.",
  },
  {
    slideId: "se-slide-automation-usecases",
    title: "Week 2 · Automation — Use Cases",
    voiceId: VOICE,
    script:
      "Why this slide matters: Automation is the capability prospects struggle to picture without an example. The slide opens with the honest framing — per-solution automation is not universally available; the real value sits at the platform layer, because only the platform layer can close a loop across SafetyManager365, ContentManager365 and TrainingManager365 in a single DTOP cycle. Walk the three platform cards in order. One — when a new procedure revision is published, notify the owners of every linked training module and create a review-and-update task in TrainingManager365. Two — when a regulation revision is published, draft updated procedures with AI-generated content for document-owner review. Three — when training evaluations fall below threshold, trigger a SafetyManager365 risk control review for the controls linked to that training module. Core message: each of those is one stroke of the DTOP cycle made automatic, with a human in the loop on the change itself. The pain it addresses: today these handoffs happen by email, weeks later, with no audit trail. The value lever: every automation closes a step in the loop and leaves auditable evidence behind it. Delivery tip — always say human-in-the-loop on anything that changes a procedure or a training plan; the automation does the routing and the draft, a human approves the change. Discovery question: which of these three handoffs costs you the most time today? Transition: that is the capability stack — Intelligence Layer, Insights, Recommendations, Automation. Next slide, the defensive cut: how this stack compares to a generic-AI pilot.",
  },
  {
    slideId: "se-slide-tiers-vs-ai",
    title: "Week 2 · Intelligence Layer vs Generic AI",
    voiceId: VOICE,
    script:
      "Why this slide matters: this is your defensive slide, and it wins deals where the prospect is already running a generic-AI pilot. Core message: the Intelligence Layer is grounded in aviation operational data and the customer's own schema; generic AI is grounded in the public internet. That is the entire difference, and the slide lands it in one number. The pain it addresses: their generic-AI pilot returned plausible-sounding answers that did not survive scrutiny, and now their team is sceptical of anything called AI. The value lever — say it word-for-word — approximately ninety percent domain accuracy on aviation operational questions versus around thirty-five percent for generic AI tools pointed at the same data. This is the only slide in Week 2 where that headline belongs. Delivery tip — do not bash the competitor by name. Say general-purpose tools or chat assistants. Then land the line: the difference between a chat assistant and an analyst is whether it knows your operation. Discovery question: what would you do differently if you trusted the answer? Transition: that is the capability stack and the defence. Next slide, the cleanest end-to-end demonstration of all of it working together — Regulation Management.",
  },
  {
    slideId: "se-slide-mobile",
    title: "Week 2 · Unified Mobile App",
    voiceId: VOICE,
    script:
      "Why this slide matters: the Unified Mobile App is the slide that changes the room when the operations leader is present, because this is where the platform stops being abstract and lands in the hands of a crew member. Core message: one app for the frontline — content, training and safety reporting in the same shell, same login, same offline behaviour — and every tap from the line becomes a signal back into DTOP. The pain it addresses: their crews juggle three to five separate apps today, each with its own login and its own quirks, and adoption suffers. The value lever: one app means real adoption, real signal capture from the line, and a real feedback loop into the loop you just walked through capability by capability. Delivery tip — show, do not tell. If you have a device, hand it over. Be precise and phased on the roadmap: Phase 1, Training screens in the Comply iOS Mobile app, is H1 2026. Phase 2, Safety Reporting in the same app, is H2 2026. Phase 3, the fully unified experience across content, training and safety, is 2027 and beyond. Do not promise the full unified shell next year. Discovery question: how many separate apps does your frontline juggle today? Transition: that is the capability picture, end to end. Next slide, the capability talk track — one plain-English line and one discovery question per capability, the page you study before every call.",
  },
  {
    slideId: "se-slide-dtop",
    title: "Week 1 · DTOP",
    voiceId: VOICE,
    script:
      "DTOP is not a feature, it is the operating model that makes everything else worth buying — and that's exactly why it lives in the foundation week, not buried with the capabilities. The core message: Detect, Trigger, Orchestrate, Prove — the closed loop from operational signal to verified outcome. And here is the word to lock in this week: Detect is the signals layer — the operational events the platform listens to and correlates. Use the canonical colour cues when whiteboarding it: Detect, Trigger, Orchestrate, Prove — keep them in that order, every time. The pain it addresses: today their loop is broken between any two of those four steps — usually between Trigger and Orchestrate — and the Detect step is starved because signals live in four very different worlds that no point tool spans. Name the four on the slide: Regulation Signals, Anomalies, Operational Change Requests, and Micro, Macro and Geopolitical Influences. Those four are the answer to the discovery question every prospect asks — what data do you actually use? The value lever: point solutions cover one of these at best; only this platform fuses all four signal streams into one Detect layer and closes the full loop with auditable proof. Delivery tip — when you reach this slide, point at the Data Sources chip row and say the canonical line out loud: signals are the operational events we detect and correlate, and they are the input to the loop. Then draw the loop on a whiteboard if you can, even on a Zoom call — drawing it earns the right to ask: which step breaks first for you today, and which signal source is hardest to reach? Their answer is your walkthrough. Next we drill the loop on a whiteboard — because the rep who can draw DTOP in ninety seconds wins the room. And if you want to go deeper on the signals layer itself, the Signals Specialist Playbook is your next stop after Week 1.",
  },
  {
    slideId: "se-slide-dtop-whiteboard",
    title: "Week 1 · D-T-O-P Whiteboard Drill",
    voiceId: VOICE,
    script:
      "This is the most important drill in Week 1. The reason D-T-O-P wins deals is not because the slide is good — it is because the rep can draw it on any surface in ninety seconds and turn the room into a conversation. Memorise the six strokes in order: Detect in blue, Trigger in amber, Orchestrate in violet, Prove in emerald, the closing loop arrow back to Detect, and the four signal chips below Detect — Regulation, Anomalies, Operational Change Requests, and Micro, Macro and Geopolitical Influences. Each stroke has one sentence — the line on the right of the slide is the line you say out loud as you draw. Do not draw silently. Do not draw out of order. The colour story matters because it matches every diagram in the deck — your whiteboard then matches our slides, and the customer's brain stitches the two together. Practice this three times today. Time yourself. Ninety seconds, end to end. Next slide is how to use this drill in a live customer meeting.",
  },
  {
    slideId: "se-slide-dtop-whiteboard-runbook",
    title: "Week 1 · Running the Whiteboard in the Room",
    voiceId: VOICE,
    script:
      "Setup: use the whiteboard the moment a customer says 'I don't get how this connects' or 'show me'. The pre-line earns you the right to draw — 'can I take ninety seconds at the board, it'll save us an hour of slides'. Customers always say yes. Run: draw the four boxes and the loop, then stop and point and ask the question — which of these four steps breaks first for you today. Then add the four signal chips and ask the second question — which signal source is hardest to reach. Write their answers on the board next to the broken step. That single act — writing their words on your drawing — is what converts a pitch into a discovery. Recover: if you blank, redraw Detect and restart from the signal — it looks deliberate, not lost. If they push for technical depth, hand off to the Signals Specialist Playbook and offer a solutions architect. If they say 'we already have this', ask which of the four steps is actually closed today with auditable proof — almost no-one can answer Prove honestly, and that is your wedge. Practise this drill weekly with your team. The whiteboard is the highest-conviction artefact in this entire academy. Next we zoom into the Detect layer — the four signal sources behind every trigger.",
  },
  {
    slideId: "se-slide-talktrack",
    title: "Week 2 · Capability Talk Track",
    voiceId: VOICE,
    script:
      "Why this slide matters: this is the rehearsal slide that turns everything you just learned in Week 2 into something you can actually say in a customer meeting. Core message: every capability has one plain-English line and one discovery question — Intelligence Layer, Insights, Recommendations, Automation, Mobile. Read each row out loud right now and practise the discovery question; those questions are how you stop pitching and start listening. The pain you are addressing: most reps walk out of Week 2 able to recognise the capabilities but not able to talk through them cold. The value lever: a single line and a single question per capability is enough to run a real conversation. Delivery tip — in a real meeting you will not deliver this slide. You will deliver the five lines from memory. Treat this as the page you study before every call for the first month. Transition: that is Week 2. Next slide opens Week 3 — how we actually sell it.",
  },
  {
    slideId: "se-week-3",
    title: "Week 3 · Sell & Win",
    voiceId: VOICE,
    script:
      "Week 3 is sell and win — and it has been rebuilt to make this a world-class enablement week. By the end of it you can run a real discovery call from a verbatim runbook, pull twelve discovery questions grouped by DTOP step, read any of five personas in the room, handle the top eight objections with a proof artifact to send afterwards, position against any competitor by naming where they stop in the loop, advance the deal with scripted next-step language, and end the month with a focused use-case session booked. A note on language — we say walkthrough, not demo. We are not yet at the point of running a polished customer demo; what we run today is a focused walkthrough on the prospect's highest-cost use case. Slow down on every cheat sheet. Read them aloud. Then go practise in Practice Center before any real call. Next we open Week 3 with a recap of the DTOP loop — one use case, every capability, end-to-end — so you walk into every customer conversation grounded in the value the platform delivers before you ever try to sell it.",
  },
  {
    slideId: "se-discovery-to-close",
    title: "Week 3 · Discovery → Walkthrough → Close",
    voiceId: VOICE,
    script:
      "This is the motion in plain English. The core message: discovery finds the disconnected loop, the walkthrough shows the loop close on their data shape, close scopes the next focused conversation around their highest-cost use case. A deliberate language choice — we say walkthrough, not demo. We are not running a polished customer demo today; we are walking a prospect through how DTOP would close their loop. The pain you're addressing: most reps over-pitch because they're guessing what matters; disciplined discovery stops the guessing. The value lever: outcome-based conversations beat feature checklists every time. Delivery tip — say the three lines, ask three questions, write down their answers verbatim. Their words become your walkthrough script and the scope of the next session. Next: the Discovery Question Bank — twelve questions grouped by DTOP step, with what a good answer sounds like and what a red-flag answer sounds like.",
  },
  {
    slideId: "se-usecase-cheatsheet",
    title: "Week 3 · Use Case Cheat Sheet",
    voiceId: VOICE,
    script:
      "This is the page you study before every customer call. The core message: seven plain-English use cases, each carrying the discovery question that uncovers it, the phrase to listen for that means it's live, the DTOP step to anchor on, and the proof artifact to send after the call. The pain you're addressing: reps over-rotate on a single use case and miss the buyer's actual pain. The value lever: pattern-match the prospect's words to the cheat sheet, then run that use case as a DTOP story. Delivery tip — never run all seven in one meeting. Pick one. Ask the question. Listen for the red-flag phrase in the listen-for column — that's your signal the use case is live. Anchor on the DTOP step, then send the proof artifact within an hour of the call. Avoid dollar figures we have not signed off. Next: customer footprint scenarios.",
  },
  {
    slideId: "se-footprint-intro",
    title: "Week 3 · Customer Footprint — Intro",
    voiceId: VOICE,
    script:
      "This slide matters because almost every conversation you walk into is not a greenfield account — the customer already owns one or more of our core apps, and the deal you're trying to make is a cross-sell or a platform expansion. The core message: there are seven possible footprints — Safety only, Content only, Training only, the three pairs, and all three together — and your first job in any account is to map which one you're in. The pain you're addressing: reps default to pitching whatever they know best, instead of selling what the customer is missing. The value lever: when you sell against a footprint, you stop selling features and start selling the loop the customer can't yet close. Delivery tip — say the coach line out loud right now, because you'll use it in every account review for the rest of your career: your job is never to sell what they already have, it's to sell what they're missing, and the loop they can't close without it. Next we walk the three single-app scenarios.",
  },
  {
    slideId: "se-footprint-single",
    title: "Week 3 · Footprint — One App",
    voiceId: VOICE,
    script:
      "This is the most common footprint you will inherit, and it's also the most under-sold. The core message: a single app captures real value in its own lane — and the platform capabilities work on it — but everything stays confined to that lane until the foundation widens. Be precise about what the customer already has. Intelligence Layer, Insights and Recommendations, and Automation all run on whatever app they own — they're not gated behind buying more apps. What's gated is scope. Intelligence Layer on a Safety-only customer answers safety questions brilliantly, but it can't reason across to a procedure or a training assignment. Insights surfaces patterns inside Safety, but it can't recommend a content update or a targeted retraining. Automation routes a safety report, but it can't trigger a procedure revision or assign training. The pain you're naming, lane by lane. Safety only — recommendations get written and then vanish, because there's no Content to update and no Training to assign. Content only — procedure changes stay calendar-driven and complaint-driven, never signal-driven, and you can't prove anyone was retrained. Training only — high-risk crews get the same module as low-risk crews, with no link back to the procedure or signal that justified it. The value lever: every cross-sell here is a loop-close, not a SKU-add. Delivery tip — never tell a single-app customer they get nothing intelligent until they buy more. They already get Intelligence Layer, Insights and Automation — inside the lane they own. Your job is to show them the lane is narrower than the problem. Lead with the loop, never with the SKU. Next we put the marker down: the One-App Whiteboard drill — six strokes, ninety seconds, no slide behind you — where the buyer actually feels the gap.",
  },
  {
    slideId: "se-footprint-single-whiteboard",
    title: "Week 3 · Footprint — One App Whiteboard",
    voiceId: VOICE,
    script:
      "Why this drill exists: the one-app slide is good context, but the buyer only feels the gap when you draw it. Six strokes, ninety seconds, no slide behind you. The core message: one lit lane, two dark lanes, and a DTOP arrow that dies at Orchestrate because there's nowhere for the procedure or training change to land. Stroke one — draw the lit lane, the app they own — Safety in our example. Stroke two — draw Content and Training as dotted, empty boxes, the dark lanes. Stroke three — inside the lit lane write Intelligence Layer, Insights, Automation, then add the small italic label 'confined to this lane.' That single label is what stops you sounding like every other vendor. The pain you're showing them: they already have intelligence, but it has nowhere to go. Stroke four — draw the broken DTOP arrow that stops at Orchestrate. Stroke five — write the discovery question: when Safety flags a risk, who owns the procedure and training change? Stroke six — circle the dark lanes. That circle is the sale. Delivery tip — when you write the discovery question, stop talking. The silence is the unlock. Practise this three times before your next single-app account meeting. Next we move up a rung — the Two-Apps footprint — where the half-loop becomes visible, and then we'll draw that one too.",
  },
  {
    slideId: "se-footprint-two",
    title: "Week 3 · Footprint — Two Apps",
    voiceId: VOICE,
    script:
      "Two apps is the most strategic footprint to sell from, because the half-loop is visible to the customer the moment you draw it. The core message: two apps gets you a half-loop — and platform capabilities now operate across two lanes, not one — the third app closes the loop and widens the lane to all three. Be explicit with the buyer: Intelligence Layer, Insights and Automation already work across whichever two apps they own. They're not buying intelligence with the third app — they're buying scope. The pain, by combination. Safety plus Content but no Training — intelligence reasons across signals and procedures, but the training lane stays dark, so behaviour doesn't shift and repeat events stay repeat events. Safety plus Training but no Content — intelligence reasons across signals and competency, but procedures stay static, so you retrain crews on stale content and the audit trail breaks down. Content plus Training but no Safety — intelligence reasons across procedures and competency, but Detect is missing entirely and the system stays reactive. The value lever: name the missing app by the loop it would close and the lane it would widen, never by the SKU. Delivery tip — draw their current half-loop on a whiteboard, then add the missing third in a different colour and watch the buyer lean in. That is the single most powerful selling moment in this entire academy. Next we put the marker down: the Two-Apps Whiteboard drill — same six strokes, ninety seconds — where the half-loop becomes undeniable.",
  },
  {
    slideId: "se-footprint-two-whiteboard",
    title: "Week 3 · Footprint — Two Apps Whiteboard",
    voiceId: VOICE,
    script:
      "Why this drill exists: this is the highest-leverage drawing in the academy. The half-loop is the moment the buyer admits the gap themselves. Six strokes, ninety seconds. The core message: two lit lanes, one dark lane, a half-loop arrow, and an intelligence band that already reaches across the two lanes they own. Stroke one — draw the two lit lanes side by side; we use Safety and Content as the example, but the same drill works for any two-of-three. Stroke two — draw the third lane as a dotted, empty box. Stroke three — draw the half-loop arrow: Detect, Trigger, Orchestrate the procedures only, an X at Training, Prove partial. Stroke four — above the lit lanes draw the intelligence band — Intelligence Layer, Insights, Automation — labelled 'across two lanes, still confined.' That label is what keeps you honest with a buyer who already owns two apps. The pain you're showing: behaviour doesn't shift, because procedures change but crews don't get retrained before the next shift. Stroke five — write the discovery question: when a procedure changes, how do you know every crew is trained on it before the next shift? Stroke six — circle the missing lane. That circle is the loop-close, and it's almost always the cheapest path to the full DTOP loop. Delivery tip — let the buyer name the missing lane. If they say it first, the third app sells itself. Next we step up to the all-three footprint — where the loop closes — and then we draw it.",
  },
  {
    slideId: "se-footprint-all",
    title: "Week 3 · Footprint — All Three + Platform",
    voiceId: VOICE,
    script:
      "If the customer already owns all three apps, your job changes completely. The core message: three apps closes the loop — and what changes at this stage isn't whether the intelligence layer exists, it's the scope it can operate over. Intelligence Layer, Insights and Automation aren't new arrivals here. They've been running on whichever apps the customer already owned. What's new at three apps is that they can now reason and act across the whole DTOP loop, not one lane of it. Make that crystal clear with the buyer or you'll lose credibility — they know they already have these capabilities. The pain you're addressing: all-three customers still feel the platform is being underused, because the foundation is closed but the system doesn't yet learn from itself end-to-end. The value lever, layer by layer — Intelligence Layer delivers approximately ninety percent domain accuracy on aviation operational questions versus around thirty-five percent for generic AI; Insights surfaces patterns with evidence attached, POC in H1 2026 and production in H2 2026; Automation handles deterministic tasks with a human in the loop, POC targeted for April 2026; the Unified Mobile shell brings content, training, and safety into one app, Phase 1 in H1 2026. Be honest about the POC versus production distinction — never promise production for a POC date. Delivery tip — say the coach line slowly: you've bought the instruments; the intelligence layer is the conductor — without it the orchestra plays, but no one is listening for the next note. Next we put the marker down one more time: the All-Three Whiteboard drill — where you stop selling apps and start selling the conductor.",
  },
  {
    slideId: "se-footprint-all-whiteboard",
    title: "Week 3 · Footprint — All Three Whiteboard",
    voiceId: VOICE,
    script:
      "Why this drill exists: an all-three customer doesn't need to be sold the apps — they need to be sold the conductor. Drawing it shows them, in ninety seconds, that the next conversation is about scope, not SKUs. Six strokes. Stroke one — draw all three lanes lit: Safety, Content, Training. The foundation is in place. Stroke two — draw the closed DTOP loop underneath: Detect, Trigger, Orchestrate, Prove, back to Detect. Every signal can now reach a procedure, a crew, and an audit trail. Stroke three — above the loop, draw the intelligence band: Intelligence Layer, Insights, Automation, Mobile. As you write it, say out loud: this is scope, not new features — they already had these inside their lanes. That sentence buys you credibility with a customer who knows what they own. Stroke four — draw arrows from the band reaching across all three lanes. Now the intelligence layer can reason across the whole loop. Stroke five — write the headline: approximately ninety percent domain accuracy versus around thirty-five percent generic AI. That's the conductor in front of the orchestra. Stroke six — ask the vision question: which decisions in your operation still rely on a human stitching three systems together? Then stop. Whoever speaks first loses. Delivery tip — never claim the intelligence layer is brand new at this stage. The buyer will catch you and the trust evaporates. Be precise: scope changes, capabilities don't. Practise this three times before your next account review. Next: the value ladder, where the rungs become a renewal conversation.",
  },
  {
    slideId: "se-footprint-ladder",
    title: "Week 3 · Footprint — Value Ladder",
    voiceId: VOICE,
    script:
      "This is the slide you use in account reviews and renewal conversations, not in first meetings. The core message: platform value compounds, it does not add — each rung unlocks the one above it, and you cannot leap rungs. One app captures roughly twenty-five percent of platform value — foundation in one lane plus platform capabilities confined to that lane. Two apps gets to roughly fifty-five percent — a half-loop plus platform capabilities operating across two lanes. Three apps reaches roughly seventy-five percent — the full DTOP loop closes and capabilities now operate across all three lanes. Three apps plus the intelligence layer is one hundred percent — the loop now closes and learns, with cross-lane reasoning and automated orchestration. The important framing: the customer is not buying intelligence at the top rung — they already have it on rung one. They are buying scope, lane by lane, until the system can reason across the whole loop. These percentages are directional sales modelling, not contractual commitments — say that out loud if the customer pushes. Customer-specific value gets modelled in Line-of-Sight before any commercial conversation. The pain you're addressing: customers fixate on what they already paid for and stop seeing what they haven't. The value lever: the three pillars at every rung — controllable cost, systemic risk, and line-of-sight — show the buyer that the gap is operational, not commercial. Delivery tip — never present this as 'you're missing X percent.' Present it as 'here's the loop you can't close yet, and here's what closing it is worth to you.' Next: the three-move play.",
  },
  {
    slideId: "se-footprint-playbook",
    title: "Week 3 · Footprint — 3-Move Play",
    voiceId: VOICE,
    script:
      "This is the playbook itself, and it's the one slide from this section you should be able to recite from memory by the end of Week 3. The core message: three moves — audit the footprint, name the broken loop, anchor the next purchase to closing it. Move one — audit. Three discovery questions to find which of S, C, T they own and where the loop currently stops. Move two — name. Use their own words from move one, draw the half-loop on a whiteboard, and show them where it stops, plus what 'stops' costs them in repeat events, audit prep, or training rework. Move three — anchor. Never sell the SKU; sell the loop the missing app would close. Loop language beats SKU language in every single conversation. The pain you're addressing: most reps go straight to the product pitch and miss the loop framing entirely, which is why cross-sells stall at procurement. The value lever: when the loop is named, the next purchase scopes itself — and the customer becomes your champion because they helped name the gap. Delivery tip — pair up after this slide, run the role-play with one of the seven footprints, and book ninety seconds per role. Then take the same scenarios into Practice Center against the AI buyer. Next: Customer Outcomes — the trust signals you land in every room: 550-plus airlines, around 2.5 million users, six continents.",
  },
  {
    slideId: "se-slide-regmgmt",
    title: "Week 2 · Regulation Management Use Case",
    voiceId: VOICE,
    script:
      "Why this slide matters: Regulation Management is your highest-conviction use case for compliance and quality leaders, and it belongs in Week 2 because it is the cleanest end-to-end demonstration of every capability you just walked — Intelligence Layer reasoning, Insights surfacing the change, Recommendations drafting the redlines, Automation routing the work, all closed by DTOP. Core message: when a regulator publishes a change, the platform identifies every affected procedure and training module, drafts the redlines for human review, and pushes the updated content to the right crew with auditable proof of receipt. The pain it addresses: today this is a many-week manual exercise across four or five teams, and the audit trail is reconstructed after the fact. The value lever: weeks compress into days, and the audit trail assembles itself. Delivery tip — always anchor on a real recent regulatory change relevant to the prospect; that is the difference between a walkthrough and a proof. Map each step of the use case onto the capability that runs it as you walk it. Discovery question: when was the last regulatory change your team absorbed end to end, and how many people did it take? Transition: that is the full capability stack working as one. Next slide, the Unified Mobile App — where all of this lands in the hands of the frontline crew.",
  },
  {
    slideId: "se-slide-outcomes",
    title: "Week 3 · Customer Outcomes",
    voiceId: VOICE,
    script:
      "Customer outcomes is your social-proof slide and it does more work than any feature slide. The core message: the trust signals you must land — five hundred and fifty plus airlines worldwide, around two and a half million users, six continents. Always cite those exactly. The pain it addresses: nobody wants to be a reference customer; everybody wants to be the next in a long line. The value lever: the long line already exists. Delivery tip — never claim a customer outcome you cannot defend with a named example offline. The figures on this slide are defensible; specific named claims must be cleared before being used. Next: the Competitive Cheat Sheet — where every competitor stops in the DTOP loop, the one-sentence reframe, and the trap question that lets the prospect feel the gap themselves.",
  },
  {
    slideId: "se-slide-objections",
    title: "Week 3 · Objections Cheat Sheet",
    voiceId: VOICE,
    script:
      "Objections cheat sheet — read this slide aloud, every line, and practise the responses until they sound like yours, not ours. The core message: every objection follows the same four-step pattern — Acknowledge, Reframe, Bridge, then send the proof artifact within the hour. Eight objections here, covering SMS, legacy content, AI governance, regulator approval, an existing LMS, locked budget, prior failed attempts, and 'we're too small'. The pain you're addressing: most reps argue with objections instead of using them as discovery. The value lever: a well-handled objection is a faster path to the next conversation than no objection at all, and the proof artifact you send afterwards is what keeps the conversation alive between meetings. Delivery tip — never escalate. The customer's objection is information, not opposition. Send the proof artifact within sixty minutes of the call ending. Next: the discovery-call runbook — how to put all of this together inside a real 45-minute first call.",
  },
  {
    slideId: "se-w2-capstone-whiteboard",
    title: "Week 2 · Capstone Whiteboard",
    voiceId: VOICE,
    script:
      "This is the Week 2 capstone — and it's the slide you'll come back to more than any other in this academy. Why it matters: by now you can name each capability in isolation, but customers don't buy capabilities, they buy outcomes. This slide proves the platform delivers one, end-to-end, in five days. The core message — one sentence, learn it verbatim: one use case, every capability, one DTOP loop. The pain you're naming: today the same scenario takes their team three weeks across five disconnected tools, and they still can't prove the loop closed. The value lever: on this platform, an unstable approach trend at Madrid — airport code MAD — is Detected by Operational Data and Insights on day one, Triggered into recommended controls by the Intelligence Layer on day two, Orchestrated by Automation and Unified Mobile through to crew devices by day three, and Proven flat and audit-ready by Insights on day five. How to deliver it: draw the loop first, name the capability inside each cell second, and only then tell the story — point at each box as you speak. Do not list capabilities; let the use case do that work for you. End on Prove, then pause. Practise this until you can do it in sixty seconds without looking at the slide. Next we move into Week 3 — turning this capstone into a discovery, walkthrough and close.",
  },
  {
    slideId: "se-discovery-question-bank",
    title: "Week 3 · Discovery Question Bank",
    voiceId: VOICE,
    script:
      "This slide matters because discovery is where deals are won or lost — and most reps wing it. The core message: every great discovery call pulls four to six questions from the bank, one per DTOP step minimum. The pain you're naming: reps default to pitching when they get nervous; this gives you a script you can fall back to in any room. The value lever: each question comes with what a good answer sounds like, and what a red-flag answer sounds like — so you're listening for the wedge, not just talking. How to deliver it: never read these out loud as a list. Pick four. Ask one. Shut up. Take notes. The red-flag answers are the ones you want — they are the gaps DTOP closes. Avoid stacking questions back-to-back; let silence do the work. Next: the persona playbook — because the same question lands differently depending on the room.",
  },
  {
    slideId: "se-persona-playbook",
    title: "Week 3 · Persona Playbook",
    voiceId: VOICE,
    script:
      "This slide matters because the same pitch crashes against one persona and sings to the next. The core message — five rooms, five different conversations, one platform underneath. For each persona: the pain in one line, the two questions only they can answer, the metric they care about, the terminology landmine to avoid, and the proof artifact to point at. The pain you're addressing: reps tend to give the CEO pitch to everyone — and the VP Safety wants risk evidence while the CIO wants integration and governance. The value lever: when you mirror their metric back in the first five minutes, you earn the next meeting. How to deliver it: before any call, open this slide and pick the row. Internalise the landmine — never say FOQA or FDM or ASAP to safety; use Operational Data and Generative AI. Never pitch an SMS replacement; we extend theirs. End every persona conversation with the proof artifact you'll send within an hour of the call. Next we move into the use case cheat sheet — same discipline, applied to which use case to surface for which buyer.",
  },
  {
    slideId: "se-competitive-cheatsheet",
    title: "Week 3 · Competitive Cheat Sheet",
    voiceId: VOICE,
    script:
      "This slide matters because the question 'how are you different from X' will come — and the worst answer is 'we do everything they do, plus more'. The core message: every competitor stops at a specific point in the DTOP loop. Name the stop, deliver the one-sentence reframe, then ask the trap question that lets the prospect feel the gap themselves. The pain you're naming: reps argue features and lose; you want them to argue scope of the loop. The value lever: when you say 'standalone SMS is great at Detect — and it stops there', you've moved the conversation from feature-by-feature to operating-model. How to deliver it: never disparage the competitor — acknowledge what they're strong at, name where they stop, then drop the trap question and stay silent. The trap question is the one the prospect can't answer without realising their current stack is half a loop. One competitor per call is plenty. Next: objections — same Acknowledge, Reframe, Bridge pattern, but now eight of them with the proof artifact to send afterwards.",
  },
  {
    slideId: "se-discovery-call-runbook",
    title: "Week 3 · Discovery-Call Runbook",
    voiceId: VOICE,
    script:
      "This slide matters because a 45-minute first call has a shape, and reps who improvise the shape lose the room. The core message — four blocks: 0 to 2 minutes Open, 2 to 10 minutes Frame, 10 to 35 minutes Discover, 35 to 45 minutes Qualify and book the next step. The pain you're naming: most first calls die in the Discover block because the rep either pitches too early or asks too many soft questions. The value lever: this runbook is verbatim — opener, transition, close — and you keep it open on a second monitor during real calls. How to deliver it as a coach: practise the opener until it sounds conversational, not scripted. Practise the silence after the discovery questions — silence is what makes a customer fill in the gap. Practise the close line out loud, with a date and a name, before the call so it isn't the first time you say it. Never let a discovery call end without a calendar invite proposed. Next: deal-stage next-step language — the scripted lines that move every stage of the deal forward.",
  },
  {
    slideId: "se-deal-stage-language",
    title: "Week 3 · Deal-Stage Next-Step Language",
    voiceId: VOICE,
    script:
      "This slide matters because deals stall between stages, not inside them — and the unlock is a scripted line, said out loud, with a date and a name. The core message — four transitions: first call to working session, working session to focused use-case session, use-case session to executive readout, readout to commercial scoping. For each, a goal, the right person to bring next, and a scripted line. The pain you're naming: reps over-rely on email and under-rely on a verbal commitment in the room. The value lever: when you propose the next step before you hang up, with the two people you need in it, you close 60 percent more often. How to deliver it: pick the line, customise the date and the names, say it before the call wraps. Avoid generic phrases like 'let's circle back'. Always include who else needs to be in the next room, and why — that's what advances the deal organisationally, not just in your CRM. Next, and last in Week 3 — the Strategy and Vision Session — the complimentary 3-hour workshop you walk into every customer meeting ready to offer.",
  },
  {
    slideId: "se-w3-capstone-recap",
    title: "Week 3 · Recap — One Use Case, Every Capability, One DTOP Loop",
    voiceId: VOICE,
    script:
      "Before we open the sell-and-win playbook, we recap the loop — because everything in Week 3 only works if you can frame the value of the platform and the capabilities inside it in sixty seconds. Why it matters: customers don't buy capabilities, they buy outcomes — and the rep's job in every first conversation is to make sure the customer understands the platform is one loop, not a list of products. The core message — one sentence, learn it verbatim: one use case, every capability, one DTOP loop. Walk the Madrid unstable approach trend end-to-end. Day one — Detect. Operational Data and Insights surface the rising trend; no analyst exported a CSV. Day two — Trigger. The Intelligence Layer answers where attention should be today with three recommended risk controls and cited evidence. Day three — Orchestrate. Automation drafts the OMA revision, opens the SafetyManager365 risk-control review, and notifies training owners; Unified Mobile pushes the revised procedure to crew devices and confirms sync. Day five — Prove. Insights shows the trend flat and the audit pack is one click. That is every capability, inside one loop, end-to-end, in five days. The pain you're framing for the customer: today this same scenario takes their team three weeks across five disconnected tools and they still can't prove the loop closed. The value lever: the platform is the loop — Core Apps for the system of record, the Intelligence Layer for the decision, Automation and Unified Mobile for the action, Insights for the proof. How to deliver it: draw the loop first, name the capability inside each cell second, only then tell the story. End on Prove, then pause. Drill this until you can recite it in sixty seconds without looking at the slide — it is the frame you walk into every Week 3 conversation with. Next: a quick recap on signals — the fuel that feeds the loop — with a second use case animated end-to-end so you can answer the question every customer asks: where does Detect actually come from?",
  },
  {
    slideId: "se-w3-signals-recap",
    title: "Week 3 · Recap — Signals → DTOP",
    voiceId: VOICE,
    script:
      "This is the slide that answers the question every customer asks on the first call: where does Detect actually come from. Why it matters: reps who can name the four signal sources and walk one of them through DTOP in thirty seconds earn the right to keep selling; reps who can't get stuck explaining inputs. The core message — signals are the fuel; DTOP is the engine. Four signal sources feed Detect: regulation signals, anomalies, operational change requests, and macro or geopolitical influences. The platform pulls from all four worlds and routes them through the same loop, every time. Walk the second use case end-to-end — a crew duty-time anomaly. Detect — Operational Data and Generative AI surface a rising anomaly across two bases, no analyst pulled a report. Trigger — the Intelligence Layer answers where attention should be today with three recommended controls and cited evidence: roster reshape, fatigue brief, training nudge. Orchestrate — Automation updates the roster, drafts the brief, assigns the training; Unified Mobile pushes the changes to crew devices and confirms sync. Prove — Insights shows the anomaly flat in seven days and the audit pack is one click. The pain you're framing: today the customer's regulation team, safety team, ops team and planning team each see their own signal in their own tool, and nothing ever joins up. The value lever: the platform is the only one that connects the four signal worlds into one loop. How to deliver it: name the four sources, point at the one you're walking, then narrate the loop one step at a time — do not list capabilities; the use case names them for you. End on Prove, then pause. Two use cases drilled — the Madrid approach trend and this duty-time anomaly — is enough to walk into any first call and prove the loop with whichever signal the customer recognises. Next: who to target — the accounts where this loop lands fastest.",
  },
  {
    slideId: "se-who-to-target",
    title: "Week 3 · Who to Target",
    voiceId: VOICE,
    script:
      "This slide matters because pipeline coverage is built on the wrong accounts more often than the wrong message. The core message: start where we already have permission to talk. There are three tiers of high-propensity accounts, ranked by how easy they are to win, all anchored on one signal — existing Comply365 footprint. Tier 1 — one app live, renewal inside twelve months. Highest propensity. The renewal is the trojan horse — lift the conversation out of price and into platform. Tier 2 — two apps live. They've already proved value twice, integration trust is crossed, and the third app plus the Intelligence Layer is the unlock. Tier 3 — strategic, multi-business-unit customers where the board is asking about AI and operational performance — they're the natural home for the Operational Performance Roadmap conversation. The pain you're naming: most reps chase cold prospects, unshaped RFPs, and single-app POCs against entrenched incumbents — that's where deals go to die. The value lever: footprint is the leading indicator of win rate. How to deliver it: before any pipeline review, walk this slide and tag every account Tier 1, 2 or 3. If it isn't on the slide, deprioritise it. The five Tier 1 signals are your weekly scan — renewal window, named exec sponsor, audit or incident chatter, mobile or training gap, no AI vendor locked in. Once you've picked the account, the next slide tells you how the call runs.",
  },
  {
    slideId: "se-strategy-vision-session",
    title: "Week 3 · Strategy & Vision Session",
    voiceId: VOICE,
    script:
      "This is the slide you should walk into every customer meeting ready to offer. Why it matters: most reps end calls with 'let's circle back' — this gives you a concrete, complimentary, fixed-agenda offer the customer can say yes to in the room. The core message: the Strategy and Vision Session is a complimentary 3-hour workshop, on-site or virtual, with a fixed 3-hour agenda that walks the customer from the industry shift, through the platform story, into the Operational Performance Roadmap, and lands on their own DTOP loop with a real use case. The pain you're addressing: customers are stuck in tickets and renewals and never get the strategic conversation; their leadership is being asked roadmap-level questions and the day-to-day tools can't answer them. The value lever: this is the meeting that changes the conversation — when you put the roadmap on the table, you stop selling features and start selling the operating model. How to deliver it: never offer it cold. Use the three-line talk track — acknowledge the day-to-day request, reframe to the strategic question their leadership is being asked, then propose the session as the right venue. Be clear on what they leave with — a maturity snapshot, a candidate first DTOP use case, and a ninety-day what's-possible view. Be clear on who needs to be in the room — exec sponsor, VP Safety, VP Ops, training lead, IT lead, plus our AE and SE. Avoid scoping it. The agenda is fixed; that's the point. This is the meeting that changes the conversation. Earn the right to run it — then run it.",
  },
];

export const getSalesEnablementNarration = (slideId: string): SESlideNarration | undefined =>
  salesEnablementNarrations.find((n) => n.slideId === slideId);
