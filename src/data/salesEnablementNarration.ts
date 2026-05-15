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
      "Week 2 is the longest week because the capabilities are where the walkthrough lives. By the end of it you should be able to give a sixty-second walk-through of each capability and ask one good discovery question per capability. We go in this order: Core Apps — SafetyManager365, ContentManager365, TrainingManager365 — then the Intelligence layer with Intelligence Layer, Insights and Recommendations, and Automation, then how Intelligence Layer differs from generic AI, then the Unified Mobile App, and we close with the capability cheat sheet. DTOP itself you already learned in Week 1 — this week you map each capability onto the loop. Take it slowly. This is the week reps under-prepare for and lose deals over.",
  },
  {
    slideId: "se-slide-4a",
    title: "Week 2 · SafetyManager365",
    voiceId: VOICE,
    script:
      "SafetyManager365 is your entry point in safety-led conversations. The core message: it captures, investigates, and acts on operational safety signals — and because it shares the foundation, every signal can trigger a procedure or training change automatically. The pain it addresses: today their safety team writes recommendations that vanish into someone else's backlog. The value lever: SafetyManager365 doesn't just record — it triggers. When delivering, never use the raw acronyms FOQA, FDM, or ASAP — say flight data signals and crew-reported events instead. Discovery question: when a recurring safety signal lands today, how long until it actually changes a procedure or a training module? Their honest answer is usually weeks or months — that gap is your wedge. Next: ContentManager365.",
  },
  {
    slideId: "se-slide-4b",
    title: "Week 2 · ContentManager365",
    voiceId: VOICE,
    script:
      "ContentManager365 is the procedural backbone. The core message: it manages every operational manual and procedure with version control, regulatory traceability, and one-tap publishing to the crew. The pain it addresses: today a procedure change takes weeks to ripple from authoring to the device in the cockpit or cabin. The value lever: when ContentManager365 sits on the shared foundation, a safety signal can author a redline automatically and push it to the crew on the next sync. Delivery tip — do not call it a document management system. That's how losers describe it. Call it the procedural source of truth that drives action. Discovery question: when a regulator changes a rule tomorrow, how do you know every crew has the updated procedure? Next: TrainingManager365.",
  },
  {
    slideId: "se-slide-4c",
    title: "Week 2 · TrainingManager365",
    voiceId: VOICE,
    script:
      "TrainingManager365 closes the human side of the loop. The core message: targeted, evidence-based training — assigned because a signal said this crew, this base, this aircraft type needs it — not because the calendar said so. The pain it addresses: today training is calendar-driven and one-size-fits-all, so high-risk crews get the same module as low-risk crews. The value lever: targeted retraining costs less and demonstrably reduces repeat events. Delivery tip — anchor on the right training, to the right crew, at the right moment. Discovery question: how much of your training spend is calendar-driven versus signal-driven today? The honest answer is almost always over ninety percent calendar-driven — that's the opportunity. Next we move into the Intelligence layer.",
  },
  {
    slideId: "se-slide-coanalyst",
    title: "Week 2 · Intelligence Layer",
    voiceId: VOICE,
    script:
      "Intelligence Layer is the most strategic slide in the entire deck. The core message: Intelligence Layer is the intelligence layer that lives on top of the connected platform — it turns operational data into insights, recommendations, and triggered actions. The pain it addresses: customers are drowning in dashboards and starving for answers. The value lever — and you must land this exactly — Intelligence Layer delivers approximately ninety percent domain accuracy on aviation operational questions, versus around thirty-five percent for generic AI tools pointed at the same data. That gap exists because Intelligence Layer is grounded in the customer's own operational schema and our aviation taxonomy. Delivery tip — never call it a chatbot. Call it an analyst that lives inside your operation. Discovery question: who in your team spends the most time pulling reports that should already exist? Next: Insights and Recommendations.",
  },
  {
    slideId: "se-slide-insights",
    title: "Week 2 · Insights & Recommendations",
    voiceId: VOICE,
    script:
      "Insights and Recommendations is how Intelligence Layer earns trust before it ever automates anything. The core message: it surfaces patterns, flags emerging risk, and — in the long run — recommends the next operational action with the evidence that supports the recommendation. The pain it addresses: today their analysts spend the majority of their week building decks instead of making decisions. The value lever: when the system writes the first draft with the evidence attached, the analyst's role shifts from report-builder to decision-maker. Delivery tip — emphasise that the answer always carries its evidence. That's the trust currency. On the roadmap, be precise — and be honest about the distinction between a POC and production. Insights is in POC in H1 2026 — that is an internal prototype we use to prove the approach, not a feature customers can buy or use yet. Production rollout for Insights is H2 2026. Recommendations and prescriptive actions are 2027 and beyond — that is the vision, not the near-term commitment. If a prospect pushes for Recommendations now, say plainly: Insights first, in H2 next year; Recommendations is the year after. Next: Automation.",
  },
  {
    slideId: "se-slide-automation",
    title: "Week 2 · Automation",
    voiceId: VOICE,
    script:
      "Automation is the controlled second step. The core message: once the customer trusts the system's answers, we automate the safe routines — routing, assignment, notifications, evidence assembly — with a human in the loop on anything that changes a procedure or a training plan. The pain it addresses: their best people spend hours every day on tasks that have a deterministic right answer. The value lever: hours back to where judgement actually matters. Delivery tip — always frame automation as human-in-the-loop by default. Customers fear runaway automation; you defuse it by making the guardrails the headline. On the roadmap — and keep the POC-versus-production distinction crisp — the Automation POC is targeted for April 2026; platform-wide rollout is H2 2026. POC means internal prototype, not something a customer can use yet. Next: how Intelligence Layer differs from generic AI.",
  },
  {
    slideId: "se-slide-tiers-vs-ai",
    title: "Week 2 · Intelligence Layer vs Generic AI",
    voiceId: VOICE,
    script:
      "This is your defensive slide and it wins deals where the prospect is already running a generic AI pilot. The core message: Intelligence Layer is grounded in aviation operational data and the customer's own schema — generic AI is grounded in the public internet. The pain it addresses: their generic-AI pilot returned plausible-sounding answers that didn't survive scrutiny, and now their team is sceptical of anything called AI. The value lever — say it word-for-word — approximately ninety percent domain accuracy versus around thirty-five percent for generic AI on the same questions. Delivery tip — do not bash the competitor by name. Say general-purpose tools or chat assistants. Then land the line: the difference between a chat assistant and an analyst is whether it knows your operation. Next: Unified Mobile.",
  },
  {
    slideId: "se-slide-mobile",
    title: "Week 2 · Unified Mobile App",
    voiceId: VOICE,
    script:
      "The All-in-One Mobile Experience is the slide that changes the room when the operations leader is present. The core message: one app for the frontline — content, training, and safety reporting in the same shell, same login, same offline behaviour. The pain it addresses: their crews juggle three to five separate apps today, each with its own login and its own quirks, and adoption suffers. The value lever: one app means real adoption, real signal capture, and a real feedback loop from the line. Delivery tip — show, don't tell. If you have a device, hand it over. Discovery question: how many separate apps does your frontline juggle today? On the roadmap, be precise and phased: Phase 1 — Training screens in the Comply iOS Mobile app — is H1 2026. Phase 2 — Safety Reporting in the same app — is H2 2026. Phase 3 — the fully unified experience across content, training and safety — is 2027 and beyond. Do not promise the full unified shell next year. Next: the capability talk track — one plain-English line and one discovery question per capability, ready to rehearse.",
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
      "This is the cheat-sheet rehearsal slide. The core message: every capability has one plain-English line and one discovery question. Read each row out loud now and practise the discovery question — those questions are how you stop pitching and start listening. Delivery tip — in a real meeting you will not deliver this slide; you will deliver the four lines from memory. Treat this slide as the page you study before every call for the first month. Next we move into Week 3: how we sell it.",
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
    title: "Week 3 · Discovery → Walkthrough → Close",
    voiceId: VOICE,
    script:
      "This is the motion in plain English. The core message: discovery finds the disconnected loop, the walkthrough shows the loop close on their data shape, close scopes the next focused conversation around their highest-cost use case. A deliberate language choice — we say walkthrough, not demo. We are not running a polished customer demo today; we are walking a prospect through how DTOP would close their loop. The pain you're addressing: most reps over-pitch because they're guessing what matters; the three discovery questions stop the guessing. The value lever: outcome-based conversations beat feature checklists every time. Delivery tip — say the three lines, ask the three questions, write down their answers verbatim. Their words become your walkthrough script and the scope of the next session. Next: use cases.",
  },
  {
    slideId: "se-usecase-cheatsheet",
    title: "Week 3 · Use Case Cheat Sheet",
    voiceId: VOICE,
    script:
      "This is the page you study before every customer call. The core message: five plain-English use cases — safety signal to procedure update, regulation change to targeted training, fatigue trend to roster intervention, ops disruption to crew comms, audit prep to continuous proof. Each one carries the discovery question that surfaces it. The pain you're addressing: reps over-rotate on a single use case and miss the buyer's actual pain. The value lever: pattern-match the prospect's words to the cheat sheet, then run that use case as a DTOP story. Delivery tip — never run all five in one meeting. Pick one, tell it end-to-end in Detect, Trigger, Orchestrate, Prove order, and ask the discovery question on the others to qualify the next conversation. Avoid the dollar figures we have not signed off; this slide is messaging, not modelling. Next: the Regulation Management use case.",
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
      "This is the most common footprint you will inherit, and it's also the most under-sold. The core message: a single app captures real value in its own lane — and the platform capabilities work on it — but everything stays confined to that lane until the foundation widens. Be precise about what the customer already has. Intelligence Layer, Insights and Recommendations, and Automation all run on whatever app they own — they're not gated behind buying more apps. What's gated is scope. Intelligence Layer on a Safety-only customer answers safety questions brilliantly, but it can't reason across to a procedure or a training assignment. Insights surfaces patterns inside Safety, but it can't recommend a content update or a targeted retraining. Automation routes a safety report, but it can't trigger a procedure revision or assign training. The pain you're naming, lane by lane. Safety only — recommendations get written and then vanish, because there's no Content to update and no Training to assign. Content only — procedure changes stay calendar-driven and complaint-driven, never signal-driven, and you can't prove anyone was retrained. Training only — high-risk crews get the same module as low-risk crews, with no link back to the procedure or signal that justified it. The value lever: every cross-sell here is a loop-close, not a SKU-add. Delivery tip — never tell a single-app customer they get nothing intelligent until they buy more. They already get Intelligence Layer, Insights and Automation — inside the lane they own. Your job is to show them the lane is narrower than the problem. Lead with the loop, never with the SKU. Next: the two-app scenarios — where the half-loop becomes visible.",
  },
  {
    slideId: "se-footprint-single-whiteboard",
    title: "Week 3 · Footprint — One App Whiteboard",
    voiceId: VOICE,
    script:
      "Why this drill exists: the one-app slide is good context, but the buyer only feels the gap when you draw it. Six strokes, ninety seconds, no slide behind you. The core message: one lit lane, two dark lanes, and a DTOP arrow that dies at Orchestrate because there's nowhere for the procedure or training change to land. Stroke one — draw the lit lane, the app they own — Safety in our example. Stroke two — draw Content and Training as dotted, empty boxes, the dark lanes. Stroke three — inside the lit lane write Intelligence Layer, Insights, Automation, then add the small italic label 'confined to this lane.' That single label is what stops you sounding like every other vendor. The pain you're showing them: they already have intelligence, but it has nowhere to go. Stroke four — draw the broken DTOP arrow that stops at Orchestrate. Stroke five — write the discovery question: when Safety flags a risk, who owns the procedure and training change? Stroke six — circle the dark lanes. That circle is the sale. Delivery tip — when you write the discovery question, stop talking. The silence is the unlock. Practise this three times before your next single-app account meeting. Next: the two-app drill.",
  },
  {
    slideId: "se-footprint-two",
    title: "Week 3 · Footprint — Two Apps",
    voiceId: VOICE,
    script:
      "Two apps is the most strategic footprint to sell from, because the half-loop is visible to the customer the moment you draw it. The core message: two apps gets you a half-loop — and platform capabilities now operate across two lanes, not one — the third app closes the loop and widens the lane to all three. Be explicit with the buyer: Intelligence Layer, Insights and Automation already work across whichever two apps they own. They're not buying intelligence with the third app — they're buying scope. The pain, by combination. Safety plus Content but no Training — intelligence reasons across signals and procedures, but the training lane stays dark, so behaviour doesn't shift and repeat events stay repeat events. Safety plus Training but no Content — intelligence reasons across signals and competency, but procedures stay static, so you retrain crews on stale content and the audit trail breaks down. Content plus Training but no Safety — intelligence reasons across procedures and competency, but Detect is missing entirely and the system stays reactive. The value lever: name the missing app by the loop it would close and the lane it would widen, never by the SKU. Delivery tip — draw their current half-loop on a whiteboard, then add the missing third in a different colour and watch the buyer lean in. That is the single most powerful selling moment in this entire academy. Next: the all-three customers — where you sell the platform vision, not the apps.",
  },
  {
    slideId: "se-footprint-two-whiteboard",
    title: "Week 3 · Footprint — Two Apps Whiteboard",
    voiceId: VOICE,
    script:
      "Why this drill exists: this is the highest-leverage drawing in the academy. The half-loop is the moment the buyer admits the gap themselves. Six strokes, ninety seconds. The core message: two lit lanes, one dark lane, a half-loop arrow, and an intelligence band that already reaches across the two lanes they own. Stroke one — draw the two lit lanes side by side; we use Safety and Content as the example, but the same drill works for any two-of-three. Stroke two — draw the third lane as a dotted, empty box. Stroke three — draw the half-loop arrow: Detect, Trigger, Orchestrate the procedures only, an X at Training, Prove partial. Stroke four — above the lit lanes draw the intelligence band — Intelligence Layer, Insights, Automation — labelled 'across two lanes, still confined.' That label is what keeps you honest with a buyer who already owns two apps. The pain you're showing: behaviour doesn't shift, because procedures change but crews don't get retrained before the next shift. Stroke five — write the discovery question: when a procedure changes, how do you know every crew is trained on it before the next shift? Stroke six — circle the missing lane. That circle is the loop-close, and it's almost always the cheapest path to the full DTOP loop. Delivery tip — let the buyer name the missing lane. If they say it first, the third app sells itself. Next: the all-three drill — where you stop selling apps and start selling the conductor.",
  },
  {
    slideId: "se-footprint-all",
    title: "Week 3 · Footprint — All Three + Platform",
    voiceId: VOICE,
    script:
      "If the customer already owns all three apps, your job changes completely. The core message: three apps closes the loop — and what changes at this stage isn't whether the intelligence layer exists, it's the scope it can operate over. Intelligence Layer, Insights and Automation aren't new arrivals here. They've been running on whichever apps the customer already owned. What's new at three apps is that they can now reason and act across the whole DTOP loop, not one lane of it. Make that crystal clear with the buyer or you'll lose credibility — they know they already have these capabilities. The pain you're addressing: all-three customers still feel the platform is being underused, because the foundation is closed but the system doesn't yet learn from itself end-to-end. The value lever, layer by layer — Intelligence Layer delivers approximately ninety percent domain accuracy on aviation operational questions versus around thirty-five percent for generic AI; Insights surfaces patterns with evidence attached, POC in H1 2026 and production in H2 2026; Automation handles deterministic tasks with a human in the loop, POC targeted for April 2026; the Unified Mobile shell brings content, training, and safety into one app, Phase 1 in H1 2026. Be honest about the POC versus production distinction — never promise production for a POC date. Delivery tip — say the coach line slowly: you've bought the instruments; the intelligence layer is the conductor — without it the orchestra plays, but no one is listening for the next note. Next: the value ladder.",
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
      "This is the playbook itself, and it's the one slide from this section you should be able to recite from memory by the end of Week 3. The core message: three moves — audit the footprint, name the broken loop, anchor the next purchase to closing it. Move one — audit. Three discovery questions to find which of S, C, T they own and where the loop currently stops. Move two — name. Use their own words from move one, draw the half-loop on a whiteboard, and show them where it stops, plus what 'stops' costs them in repeat events, audit prep, or training rework. Move three — anchor. Never sell the SKU; sell the loop the missing app would close. Loop language beats SKU language in every single conversation. The pain you're addressing: most reps go straight to the product pitch and miss the loop framing entirely, which is why cross-sells stall at procurement. The value lever: when the loop is named, the next purchase scopes itself — and the customer becomes your champion because they helped name the gap. Delivery tip — pair up after this slide, run the role-play with one of the seven footprints, and book ninety seconds per role. Then take the same scenarios into Practice Center against the AI buyer. Next: Regulation Management — your highest-conviction use case for the compliance and quality leaders you'll meet in these accounts.",
  },
  {
    slideId: "se-slide-regmgmt",
    title: "Week 3 · Regulation Management",
    voiceId: VOICE,
    script:
      "Regulation Management is your highest-conviction use case for compliance and quality leaders. The core message: when a regulator publishes a change, the platform identifies every affected procedure and training module, drafts the redlines, and pushes the updated content to the right crew with auditable proof of receipt. The pain it addresses: today this is a many-week manual exercise across four or five teams, and the audit trail is reconstructed after the fact. The value lever: weeks compress into days, and the audit trail assembles itself. Delivery tip — always anchor on a real recent regulatory change relevant to the prospect — that's the difference between a demo and a proof. Next: customer outcomes.",
  },
  {
    slideId: "se-slide-outcomes",
    title: "Week 3 · Customer Outcomes",
    voiceId: VOICE,
    script:
      "Customer outcomes is your social-proof slide and it does more work than any feature slide. The core message: the trust signals you must land — five hundred and fifty plus airlines worldwide, around two and a half million users, six continents. Always cite those exactly. The pain it addresses: nobody wants to be a reference customer; everybody wants to be the next in a long line. The value lever: the long line already exists. Delivery tip — never claim a customer outcome you cannot defend with a named example offline. The figures on this slide are defensible; specific named claims must be cleared before being used. Next: the three objections every prospect raises, and how to answer them in three steps.",
  },
  {
    slideId: "se-slide-objections",
    title: "Week 3 · Objections Cheat Sheet",
    voiceId: VOICE,
    script:
      "Objections cheat sheet — read this slide aloud, every line, and practise the responses until they sound like yours, not ours. The core message: every objection follows the same three-step pattern — Acknowledge, Reframe, Bridge. Acknowledge what they said without defending. Reframe to the part of their pain the objection actually exposes. Bridge to a concrete next step — usually a twenty-minute focused walkthrough on their highest-cost use case. The pain you're addressing in this slide: most reps argue with objections instead of using them as discovery. The value lever: a well-handled objection is a faster path to the next conversation than no objection at all. Delivery tip — never escalate. The customer's objection is information, not opposition. Three on the slide, intentionally; final wording is still under Marketing review. Next: why we win.",
  },
  {
    slideId: "se-slide-why",
    title: "Week 3 · Why Comply365",
    voiceId: VOICE,
    script:
      "Why Comply365 is your closing argument. The core message — three differentiators, in this order: connected foundation, the intelligence layer with approximately ninety percent domain accuracy, and proven scale at five hundred and fifty plus airlines and around two and a half million users across six continents. The pain it addresses: at the close, the customer is choosing between feeling safe and feeling visionary — this slide lets them feel both. The value lever: foundation gives them the safe choice, intelligence gives them the visionary choice, scale removes the career risk. Delivery tip — pick the one differentiator that matches the room and lead with it — don't read all three with equal weight. Then ask the close: can we set up a focused walkthrough on your highest-cost use case? Silence after that question is your friend. Next: your enablement plan.",
  },
  {
    slideId: "se-slide-closing",
    title: "Week 3 · Your First 7 Days",
    voiceId: VOICE,
    script:
      "This slide is the rep's commitment, not the customer's. The order matters. Step one — read the Enablement deck end to end, Week 1 first. Step two — only then read the Medium Pitch, Executive Pitch 3, because every Enablement slide is teaching you a slide in that deck. Step three — practise the we already have an SMS role-play using Acknowledge, Reframe, Bridge, and end by booking a twenty-minute focused walkthrough on the prospect's highest-cost use case. Step four — bookmark the Command Centre as your single source of truth, and use the Persona Deep-Dive and Signals 101 Playbook as your reference shelves. The pain this addresses: most new reps wait to be pulled into deals; the ones who win are the ones who ramp themselves. The value lever: when you can tick every line of the readiness checklist honestly, you're ready for the next conversation. Final delivery tip — the closing line of this academy is the same line you should carry into every customer meeting: you're not selling software, you're selling the first connected operating model in aviation. Now go practise.",
  },
];

export const getSalesEnablementNarration = (slideId: string): SESlideNarration | undefined =>
  salesEnablementNarrations.find((n) => n.slideId === slideId);
