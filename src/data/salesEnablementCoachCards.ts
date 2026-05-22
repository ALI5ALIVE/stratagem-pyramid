// Sales Enablement Coach Cards — rep-facing takeaways.
// Distinct from narration: short, scannable, printable. 4 fields per slide.
// Hard cap ~320 chars per card across all 4 fields so a card fits on a phone.

export interface CoachCard {
  /** The one thing the rep must internalise. One sentence. */
  remember: string;
  /** Verbatim line the rep can repeat to a customer. */
  sayItLikeThis: string;
  /** Terminology landmine, forbidden phrase, or objection trap to avoid. */
  watchOutFor: string;
  /** One-line bridge into the next slide. */
  bridge: string;
}

export const salesEnablementCoachCards: Record<string, CoachCard> = {
  // ───────────────── Week 1 · Foundation ─────────────────
  "se-slide-0": {
    remember: "Your job is to sell the operating model, not the software. DTOP is the loop that makes it real.",
    sayItLikeThis: "Three weeks: foundation, capabilities, sell & win.",
    watchOutFor: "Don't pitch features in week 1 — earn the right with the operating model first.",
    bridge: "Open with the strategic shift the industry is going through right now.",
  },
  "se-week-1": {
    remember: "By end of Week 1 you can pitch the platform in one sentence and draw DTOP on a whiteboard.",
    sayItLikeThis: "One platform, three Core Apps, intelligence on top, mobile on the device, DTOP wrapping it.",
    watchOutFor: "Don't move to Week 2 until the recap talk track sounds natural.",
    bridge: "Start with why prospects take the meeting — the regulatory shift.",
  },
  "se-slide-shift": {
    remember: "Regulators moved from 'did you tick the box' to 'can you prove the loop closed'.",
    sayItLikeThis: "The question used to be 'did you do the training' — now it's 'did the behaviour change'.",
    watchOutFor: "Don't list regulators. Don't say AI or transformation.",
    bridge: "Next: the same shift in three plain-English lines.",
  },
  "se-plain-english-shift": {
    remember: "Aviation isn't short on data — it's short on signals it can act on, and proof the action worked.",
    sayItLikeThis: "Three stacks today: safety, content, training. We unify them with intelligence on top.",
    watchOutFor: "No unapproved ROI numbers. This slide is messaging, not modelling.",
    bridge: "Next: the platform itself, in plain English.",
  },
  "se-slide-whatis": {
    remember: "First platform to join safety, content, training onto one data foundation with intelligence on top.",
    sayItLikeThis: "One foundation means signals from operations actually reach procedures and training — and back.",
    watchOutFor: "Don't dive into any one box. Land the shape, not the features.",
    bridge: "Next: DTOP — the loop that makes the platform worth buying.",
  },
  "se-slide-dtop": {
    remember: "DTOP is the operating model, not a feature. Detect, Trigger, Orchestrate, Prove — in colour, in order.",
    sayItLikeThis: "Point solutions cover one signal source at best; only we fuse all four into one Detect layer.",
    watchOutFor: "Never say FOQA, FDM, ASAP. Use Operational Data, Generative AI, Recommended Actions.",
    bridge: "Next: drill the loop on a whiteboard in 90 seconds.",
  },
  "se-slide-dtop-whiteboard": {
    remember: "Six strokes, ninety seconds. The rep who can draw DTOP wins the room.",
    sayItLikeThis: "Detect (blue), Trigger (amber), Orchestrate (violet), Prove (emerald), loop back, four signal chips.",
    watchOutFor: "Don't draw silently and don't draw out of order — the colour story matches every deck diagram.",
    bridge: "Next: how to use this drill in a live customer meeting.",
  },
  "se-slide-dtop-whiteboard-runbook": {
    remember: "Use the whiteboard the moment they say 'show me' or 'I don't get how this connects'.",
    sayItLikeThis: "Can I take ninety seconds at the board — it'll save us an hour of slides.",
    watchOutFor: "After you ask 'which step breaks first?' — shut up. Whoever speaks first loses.",
    bridge: "Next: zoom into Detect — the four signal sources.",
  },
  "se-slide-signals": {
    remember: "Four signal sources: Regulation, Anomalies, Operational Change Requests, Macro/Geopolitical.",
    sayItLikeThis: "Which of these four is hardest for you to act on today?",
    watchOutFor: "Their answer almost always points at Anomalies or Operational Change — that's your wedge.",
    bridge: "Next: the value this loop unlocks.",
  },
  "se-slide-value": {
    remember: "Platform value compounds — one shared foundation, closed by DTOP, lifts every workflow on top.",
    sayItLikeThis: "Pick one number that fits the room (safety / ops / CFO) — don't read every metric.",
    watchOutFor: "Don't use ROI numbers we haven't signed off.",
    bridge: "Next: where they sit on the Operational Performance Roadmap.",
  },
  "se-slide-maturity-roadmap": {
    remember: "Five stages: Fragmented, Managed, Connected, Proactive, Predictive. Most buyers live at 1.5.",
    sayItLikeThis: "Which stage describes you today, and which are you being asked to reach in 12–18 months?",
    watchOutFor: "Be honest about Stage 5 — Predictive is direction of travel, not a feature you can sell today.",
    bridge: "Next: draw the curve on a whiteboard.",
  },
  "se-slide-maturity-whiteboard": {
    remember: "Six strokes, ninety seconds. Plant the YOU ARE HERE flag between Fragmented and Managed.",
    sayItLikeThis: "Does that feel about right for where you are today?",
    watchOutFor: "Don't sell Stage 5 — sell the next stage. Then stop talking.",
    bridge: "Next: the Week 1 recap in three sentences.",
  },
  "se-slide-recap-m2": {
    remember: "Three one-sentence answers: what is it, how is it different, what's the one thing to remember.",
    sayItLikeThis: "Point solutions can Detect. Only we Detect, Trigger, Orchestrate, and Prove.",
    watchOutFor: "Don't move on until all three feel natural. If you stumble, replay.",
    bridge: "Week 2 goes capability by capability.",
  },

  // ───────────────── Week 2 · Capabilities ─────────────────
  "se-week-2": {
    remember: "Every capability ties back to a customer outcome and a step in the DTOP loop.",
    sayItLikeThis: "One platform, three Core Apps, one Intelligence Layer, one Unified Mobile, all wired by DTOP.",
    watchOutFor: "Approved terms only: Generative AI, Recommended Actions, Operational Data. No FOQA/FDM/ASAP.",
    bridge: "Open with the platform map.",
  },
  "se-week-2-overview": {
    remember: "Before any capability drill-down, the whole-platform picture must be in the rep's head.",
    sayItLikeThis: "One Operational Performance Platform — Core Apps, Intelligence, Mobile, all wired by DTOP.",
    watchOutFor: "Say 'one platform', not 'modules' or 'suite'. Avoid raw acronyms.",
    bridge: "Next: the capability that makes us different — Platform Insights & Intelligence.",
  },
  "se-platform-insights-intelligence": {
    remember: "Any user asks an operational question in plain English; the platform returns cross-domain answers in seconds.",
    sayItLikeThis: "~90% domain accuracy on aviation operational questions vs ~35% for generic AI on the same data.",
    watchOutFor: "Never call it a chatbot. Lead with tenant isolation + source citations to defuse security.",
    bridge: "Next: the three platform-wide use cases only this layer can answer.",
  },
  "se-platform-wide-intelligence-usecases": {
    remember: "Three cross-domain questions no single Core App can answer — Safety×Training, DG manual loop, Part 145 audit.",
    sayItLikeThis: "Which of these three questions does your leadership ask most often without a straight answer?",
    watchOutFor: "Pick the one card that fits the room. Don't walk all three.",
    bridge: "Next: open the box — the Intelligence Layer itself.",
  },
  "se-slide-coanalyst": {
    remember: "One intelligence layer, three doorways. SafetyManager365 live now, Content & Training next.",
    sayItLikeThis: "Same engine, different scope — that's how we defuse 'is this real or roadmap?'",
    watchOutFor: "Don't quote the 90% vs 35% stat here — save it for the vs-Generic-AI slide.",
    bridge: "Next: the Monday-morning chores it clears inside each Core App.",
  },
  "se-slide-coanalyst-usecases": {
    remember: "Same engine that answers board-level questions also clears the day-to-day spreadsheet chores.",
    sayItLikeThis: "What's the report your team rebuilds every month that should already exist?",
    watchOutFor: "Pick the one card that matches the prospect's role, then stop talking.",
    bridge: "Next: Insights — how trust is earned before anything is automated.",
  },
  "se-slide-insights": {
    remember: "Insights watches continuously, surfaces patterns, attaches evidence. Human in the loop, always.",
    sayItLikeThis: "When the system writes the first draft with the evidence attached, analysts become decision-makers.",
    watchOutFor: "POC H1 2026, production H2 2026 — keep the distinction crisp. Don't promise Recommendations here.",
    bridge: "Next: what happens when the watchtower starts recommending action.",
  },
  "se-slide-insights-usecases": {
    remember: "Every recommendation cites its evidence and closes a step in DTOP.",
    sayItLikeThis: "Where in your week do you want a prioritised list of next actions instead of another dashboard?",
    watchOutFor: "Recommendations is 2027+. Sell direction, not next quarter's invoice.",
    bridge: "Next: Automation — the controlled second step.",
  },
  "se-slide-automation": {
    remember: "Insights earns trust → Recommendations proves judgement → Automation closes the loop. Human-in-the-loop on any change.",
    sayItLikeThis: "Which handoff in your operation takes the longest and adds the least judgement?",
    watchOutFor: "Frame guardrails as the headline, not speed. Automation POC April 2026, rollout H2 2026.",
    bridge: "Next: three concrete Automation use cases.",
  },
  "se-slide-automation-usecases": {
    remember: "Real value sits at the platform layer — only it closes a loop across all three Core Apps.",
    sayItLikeThis: "Human-in-the-loop on anything that changes a procedure or a training plan.",
    watchOutFor: "Don't oversell per-solution automation — say the platform-layer cards are where it lands.",
    bridge: "Next: the defensive cut against generic-AI pilots.",
  },
  "se-slide-tiers-vs-ai": {
    remember: "Grounded in aviation operational data + the customer's schema, not the public internet.",
    sayItLikeThis: "~90% domain accuracy on aviation operational questions vs ~35% for generic AI on the same data.",
    watchOutFor: "Don't name competitors. Say 'general-purpose tools' or 'chat assistants'.",
    bridge: "Next: the cleanest end-to-end proof — Regulation Management.",
  },
  "se-slide-regmgmt": {
    remember: "Cleanest end-to-end demo: Intelligence + Insights + Recommendations + Automation, closed by DTOP.",
    sayItLikeThis: "When was the last regulatory change your team absorbed end-to-end, and how many people did it take?",
    watchOutFor: "Anchor on a recent regulatory change relevant to this prospect — that turns a walkthrough into proof.",
    bridge: "Next: where it lands in crew hands — Unified Mobile.",
  },
  "se-slide-mobile": {
    remember: "One app for the frontline — every tap from the line becomes a signal back into DTOP.",
    sayItLikeThis: "How many separate apps does your frontline juggle today?",
    watchOutFor: "Phased: Training H1 2026, Safety Reporting H2 2026, full unified shell 2027+. Don't over-promise.",
    bridge: "Next: the capability talk track — the page you study before every call.",
  },
  "se-slide-talktrack": {
    remember: "One plain-English line and one discovery question per capability. Five rows, memorised.",
    sayItLikeThis: "Read each row aloud now. In a real call you deliver the lines from memory, not this slide.",
    watchOutFor: "This is the page you study before every call for the first month — not a slide to walk.",
    bridge: "Next: Week 3 — how we actually sell it.",
  },
  "se-w2-capstone-whiteboard": {
    remember: "One use case, every capability, one DTOP loop — in 60 seconds without looking at the slide.",
    sayItLikeThis: "Madrid unstable-approach trend: Detect day 1, Trigger day 2, Orchestrate day 3, Prove day 5.",
    watchOutFor: "Don't list capabilities — let the use case name them. End on Prove, then pause.",
    bridge: "Next: Week 3 turns this capstone into discovery, walkthrough, close.",
  },

  // ───────────────── Week 3 · Sell & Win ─────────────────
  "se-week-3": {
    remember: "By end of Week 3 you can run a real discovery call, handle any objection, and book the next step in the room.",
    sayItLikeThis: "We say walkthrough, not demo — a focused session on the prospect's highest-cost use case.",
    watchOutFor: "Never use the word 'pilot'. Use 'focused walkthrough' or 'focused use-case session'.",
    bridge: "Open Week 3 by framing the journey on a whiteboard.",
  },
  "se-w3-roadmap-vision-frame": {
    remember: "Buyers who agree on the destination first buy bigger and longer. Plant the flag at 1.5.",
    sayItLikeThis: "We give you the tools and the mechanism to walk this curve — that's what this session covers.",
    watchOutFor: "Be honest about Stage 5 — direction of travel, not something you can sell today.",
    bridge: "Next: stay on the whiteboard and draw the whole vision.",
  },
  "se-w3-whole-vision-whiteboard": {
    remember: "Five stages bottom-up. Core Apps · Insights/Detect · Intelligence/Trigger · Automation+Mobile/Orchestrate · Insights/Prove.",
    sayItLikeThis: "Every layer is a deal on its own; stacked, they're the only loop that closes itself.",
    watchOutFor: "Call out each stage by number so the buyer never loses the count.",
    bridge: "Hand straight off to the Signals→DTOP recap.",
  },
  "se-w3-signals-recap": {
    remember: "Signals are the fuel; DTOP is the engine. Answer both in under a minute.",
    sayItLikeThis: "Point solutions stop at Detect. Only we do all four — D, T, O, P.",
    watchOutFor: "Walk one anomaly end-to-end. Don't list capabilities; the use case names them.",
    bridge: "Next: who to target — where the loop lands fastest.",
  },
  "se-who-to-target": {
    remember: "Pipeline dies on the wrong accounts. Start where we already have permission to talk.",
    sayItLikeThis: "Tier 1: one app live, renewal in 12 months. The renewal is the trojan horse.",
    watchOutFor: "If it isn't Tier 1/2/3 on this slide, deprioritise it.",
    bridge: "Next: map which apps the customer already owns — the footprint.",
  },
  "se-footprint-intro": {
    remember: "Almost no conversation is greenfield. Your job is to sell the loop they can't yet close.",
    sayItLikeThis: "Never sell what they already have — sell what they're missing and the loop it would close.",
    watchOutFor: "Don't default to pitching what you know best. Map the footprint first.",
    bridge: "Next: the three single-app scenarios.",
  },
  "se-footprint-single": {
    remember: "Intelligence Layer, Insights, Automation already work inside whatever app they own — scope is what's gated.",
    sayItLikeThis: "You have intelligence — but it's confined to one lane. The lane is narrower than the problem.",
    watchOutFor: "Never tell single-app customers they get nothing intelligent until they buy more.",
    bridge: "Next: put it on the whiteboard — the buyer only feels the gap when you draw it.",
  },
  "se-footprint-single-whiteboard": {
    remember: "Six strokes: one lit lane, two dark, intelligence band labelled 'confined to this lane', broken DTOP arrow.",
    sayItLikeThis: "When Safety flags a risk, who owns the procedure and training change?",
    watchOutFor: "When you write the discovery question — stop talking. The silence is the unlock.",
    bridge: "Next: the Two-Apps footprint — the half-loop.",
  },
  "se-footprint-two": {
    remember: "Two apps = a half-loop. Intelligence already operates across both — they're buying scope, not features.",
    sayItLikeThis: "Name the missing app by the loop it would close, never by the SKU.",
    watchOutFor: "Don't claim intelligence arrives with the third app — they already have it.",
    bridge: "Next: draw the half-loop — most powerful selling moment in the academy.",
  },
  "se-footprint-two-whiteboard": {
    remember: "Highest-leverage drawing in the academy. The half-loop is the moment the buyer admits the gap.",
    sayItLikeThis: "When a procedure changes, how do you know every crew is trained on it before the next shift?",
    watchOutFor: "Let the buyer name the missing lane. If they say it first, the third app sells itself.",
    bridge: "Next: all three apps — where the loop closes.",
  },
  "se-footprint-all": {
    remember: "Three apps closes the loop. What changes isn't whether intelligence exists — it's the scope it reasons across.",
    sayItLikeThis: "You've bought the instruments; the intelligence layer is the conductor.",
    watchOutFor: "Never claim Intelligence is brand new at this stage — the buyer will catch you.",
    bridge: "Next: draw it — sell the conductor, not the apps.",
  },
  "se-footprint-all-whiteboard": {
    remember: "Six strokes: three lit lanes, closed DTOP loop, intelligence band reaching across all three.",
    sayItLikeThis: "Which decisions in your operation still rely on a human stitching three systems together?",
    watchOutFor: "Be precise: scope changes, capabilities don't. Then stop talking — whoever speaks first loses.",
    bridge: "Next: the value ladder — renewal conversations only.",
  },
  "se-footprint-ladder": {
    remember: "Value compounds, doesn't add. 1 app ≈25%, 2 ≈55%, 3 ≈75%, +Intelligence Layer = 100%.",
    sayItLikeThis: "Here's the loop you can't close yet, and here's what closing it is worth to you.",
    watchOutFor: "Directional sales modelling, not a contractual commitment. Say that out loud if pushed.",
    bridge: "Next: the three-move play.",
  },
  "se-footprint-playbook": {
    remember: "Three moves: audit the footprint, name the broken loop, anchor the next purchase to closing it.",
    sayItLikeThis: "Loop language beats SKU language in every single conversation.",
    watchOutFor: "Don't go straight to the product pitch — that's why cross-sells stall at procurement.",
    bridge: "Next: take this into a real first call — Discovery → Walkthrough → Close.",
  },
  "se-discovery-to-close": {
    remember: "Three words, one motion: discover, walk, close. Their words become your walkthrough script.",
    sayItLikeThis: "We say walkthrough, not demo — we walk you through how DTOP would close your loop.",
    watchOutFor: "Disciplined discovery stops the guessing. Don't over-pitch.",
    bridge: "Next: the verbatim 45-minute discovery-call runbook.",
  },
  "se-discovery-call-runbook": {
    remember: "45-min runbook on a second monitor. Frame signals first, then ask, then shut up and take notes.",
    sayItLikeThis: "Most carriers we work with aren't short on data — they're short on signals they can act on.",
    watchOutFor: "When they ask for the deck, counter with a 30-min working session — don't just send the file.",
    bridge: "Next: the question bank — pick four before the call, ask one at a time.",
  },
  "se-discovery-question-bank": {
    remember: "12 questions grouped by D, T, O, P. Red-flag answers are the gaps DTOP closes.",
    sayItLikeThis: "Pick four before the call, ask one, then shut up. Take notes. The silence does the work.",
    watchOutFor: "Prove is where the audit pain is loudest — easiest yes you'll get.",
    bridge: "Next: read the room — the persona playbook.",
  },
  "se-persona-playbook": {
    remember: "Five rooms, five different conversations, one platform underneath. Mirror their metric in five minutes.",
    sayItLikeThis: "Pick the persona row before the call. End with the proof artifact within the hour.",
    watchOutFor: "Never say FOQA/FDM/ASAP to Safety. Never pitch an SMS replacement — we extend theirs.",
    bridge: "Next: customer outcomes — in their language.",
  },
  "se-slide-outcomes": {
    remember: "Four outcomes in their language: schedule holds, revenue holds, costs come down, customers come back.",
    sayItLikeThis: "Connect safety signals to the operation and four things move — and you get them in that order.",
    watchOutFor: "Never claim a customer outcome you can't defend with a named example offline.",
    bridge: "Next: the Strategy & Vision Session — the offer that changes the conversation.",
  },
  "se-strategy-vision-session": {
    remember: "Complimentary 3-hour workshop, fixed agenda. The meeting that changes the conversation.",
    sayItLikeThis: "Your leadership is being asked roadmap-level questions — this is the right venue to answer them.",
    watchOutFor: "Never offer it cold. Never scope it — the fixed agenda is the point.",
    bridge: "Next: the capstone — your first 30 days as a rep.",
  },
  "se-w3-capstone": {
    remember: "Six moves in order: pick the account, run the call, pick the use case, handle the objection, close, book the SVS.",
    sayItLikeThis: "60-second self-test: name the account, the call, the use case, the objection, the close, the session.",
    watchOutFor: "If any move breaks, rehearse it in Practice Center before your next real call.",
    bridge: "Now go run it.",
  },
};

export const getCoachCard = (slideId: string): CoachCard | undefined =>
  salesEnablementCoachCards[slideId];

// Week groupings for the per-week field-kit PDF download.
export interface CoachCardWeek {
  id: "w1" | "w2" | "w3";
  number: 1 | 2 | 3;
  title: string;
  slideIds: string[];
}

export const coachCardWeeks: CoachCardWeek[] = [
  {
    id: "w1",
    number: 1,
    title: "Foundation",
    slideIds: [
      "se-slide-0",
      "se-week-1",
      "se-slide-shift",
      "se-plain-english-shift",
      "se-slide-whatis",
      "se-slide-dtop",
      "se-slide-dtop-whiteboard",
      "se-slide-dtop-whiteboard-runbook",
      "se-slide-signals",
      "se-slide-value",
      "se-slide-maturity-roadmap",
      "se-slide-maturity-whiteboard",
      "se-slide-recap-m2",
    ],
  },
  {
    id: "w2",
    number: 2,
    title: "Capabilities",
    slideIds: [
      "se-week-2",
      "se-week-2-overview",
      "se-platform-insights-intelligence",
      "se-platform-wide-intelligence-usecases",
      "se-slide-coanalyst",
      "se-slide-coanalyst-usecases",
      "se-slide-insights",
      "se-slide-insights-usecases",
      "se-slide-automation",
      "se-slide-automation-usecases",
      "se-slide-tiers-vs-ai",
      "se-slide-regmgmt",
      "se-slide-mobile",
      "se-slide-talktrack",
      "se-w2-capstone-whiteboard",
    ],
  },
  {
    id: "w3",
    number: 3,
    title: "Sell & Win",
    slideIds: [
      "se-week-3",
      "se-w3-roadmap-vision-frame",
      "se-w3-whole-vision-whiteboard",
      "se-w3-signals-recap",
      "se-who-to-target",
      "se-footprint-intro",
      "se-footprint-single",
      "se-footprint-single-whiteboard",
      "se-footprint-two",
      "se-footprint-two-whiteboard",
      "se-footprint-all",
      "se-footprint-all-whiteboard",
      "se-footprint-ladder",
      "se-footprint-playbook",
      "se-discovery-to-close",
      "se-discovery-call-runbook",
      "se-discovery-question-bank",
      "se-persona-playbook",
      "se-slide-outcomes",
      "se-strategy-vision-session",
      "se-w3-capstone",
    ],
  },
];