export interface SlidePrompts {
  /** One line the rep can say to land on the slide */
  opener: string;
  /** 2–3 short bullets — the message the rep should land */
  talkingPoints: string[];
  /** 2–3 questions the rep can ask the AI buyer to provoke engagement */
  buyerQuestions: string[];
}

export const practiceSlidePrompts: Record<string, SlidePrompts> = {
  "exec3-slide-0": {
    opener:
      "Thanks for the time today — I want to use the next twenty minutes to show you how operators like you are closing the gap between data and decisions.",
    talkingPoints: [
      "Set expectation: 20 minutes, three sections — the shift, the platform, the proof.",
      "Make it conversational — invite them to interrupt at any point.",
      "Anchor on outcomes, not features — you are here to talk about their operation, not our software.",
    ],
    buyerQuestions: [
      "Before I dive in — what was the one thing that made this conversation worth your time today?",
      "Where would you say your operation sits today on the curve from reactive to predictive?",
      "Who else needs to be in the room when this goes from interesting to a decision?",
    ],
  },

  "exec3-slide-1": {
    opener:
      "Every operator we talk to has the same problem — the data is there, the decisions aren't keeping up.",
    talkingPoints: [
      "Name the operational gap: data volume is exploding, decision speed isn't.",
      "Point tools made it worse — every system added another silo to chase.",
      "The shift is from collecting data to closing the loop on it.",
    ],
    buyerQuestions: [
      "Where does that gap hurt you most today — safety, ops, training, or compliance?",
      "How many separate systems does a frontline crew member touch in a single shift?",
      "If you could close one loop tomorrow, which one would move the needle the most?",
    ],
  },

  "exec3-slide-outcomes": {
    opener:
      "Before I show you the platform, I want to ground this in what real customers have actually achieved.",
    talkingPoints: [
      "Lead with named outcomes — investigation time, procedure cycle, audit prep.",
      "Pick the one metric that matches their lens — don't read the whole list.",
      "Be honest: these are anonymised composite results across deployed carriers.",
    ],
    buyerQuestions: [
      "Which of these outcomes would have the biggest impact on your scorecard this year?",
      "If I gave you a reference call with an operator your size, would that move this forward?",
      "What would have to be true for your CFO to believe a number like this?",
    ],
  },

  "exec3-slide-platform": {
    opener:
      "This is the platform on a single page — one connected foundation instead of five to seven disconnected tools.",
    talkingPoints: [
      "Three core apps — SafetyManager365, ContentManager365, TrainingManager365 — on one shared foundation.",
      "Intelligence and orchestration sit across the apps, not bolted on the side.",
      "Mobile is the unified shell crews already use — not another app to download.",
    ],
    buyerQuestions: [
      "How many of these capabilities are you running on separate tools today?",
      "Where does the integration tax hurt you most — IT cost, data quality, or change cycles?",
      "If you could rationalise one of these tools in the next twelve months, which one goes first?",
    ],
  },

  "exec3-slide-dtop": {
    opener:
      "This is the operating model that wraps the whole stack — Detect, Trigger, Orchestrate, Prove.",
    talkingPoints: [
      "Detect: signals from safety reports, operational data, maintenance, crew, regulatory, audit.",
      "Trigger and Orchestrate: the right action fires across procedures, training and comms — automatically.",
      "Prove: every loop closes with auditable evidence — no spreadsheets, no scramble.",
    ],
    buyerQuestions: [
      "Walk me through how a hazard detected today would reach your frontline crew — what's the path?",
      "Where does that loop break down for you most often — at detect, trigger, orchestrate, or prove?",
      "Who owns 'closing the loop' in your organisation today — and what gets in their way?",
    ],
  },

  "exec3-slide-mobile": {
    opener:
      "The platform only delivers if the crew actually uses it — that's why everything lands in one trusted mobile shell.",
    talkingPoints: [
      "One app for content, training, safety — not three separate downloads.",
      "Offline-first — works on the ramp, in the cabin, in the hangar, with no signal.",
      "Adoption is the ROI lever — clicks per task, not features per screen.",
    ],
    buyerQuestions: [
      "How many separate apps does a pilot or technician open in a typical shift today?",
      "What does crew adoption of your current mobile tools actually look like — daily, weekly, never?",
      "If we cut clicks-per-task in half on the top three workflows, what does that unlock for you?",
    ],
  },

  "exec3-slide-automation": {
    opener:
      "Automation is where the platform stops describing the work and starts doing it — with a human-in-the-loop boundary you control.",
    talkingPoints: [
      "Automates the predictable handoffs — procedure update triggers training assignment triggers audit evidence.",
      "Human-in-the-loop on every consequential action — nothing fires without approval where you say so.",
      "Every automated action is auditable end to end — what fired, why, who approved.",
    ],
    buyerQuestions: [
      "What's the most repetitive handoff in your operation that you wish would just happen?",
      "Where would you want a human absolutely in the loop — and where would you happily let the system run?",
      "Who in your team currently spends their week chasing other people for the next step?",
    ],
  },

  "exec3-slide-insights-summary": {
    opener:
      "Insights is natural-language access to your operational data — for the people who actually need the answers, not just the analysts.",
    talkingPoints: [
      "Anyone authorised can ask in plain English — no SQL, no BI ticket queue.",
      "Answers come back grounded in your data, with citations, not hallucinations.",
      "Role-based access — a Director sees what a Director should see, no more, no less.",
    ],
    buyerQuestions: [
      "Who in your team is currently being asked questions that the data should answer?",
      "How long does it take today to get an answer to a question your CEO didn't expect?",
      "What's a question you'd want to ask of your operational data tomorrow morning?",
    ],
  },

  "exec3-slide-coanalyst": {
    opener:
      "This is the slide that separates us from every generic AI demo you've seen this year.",
    talkingPoints: [
      "Domain-tuned on aviation taxonomy — ICAO, ASR, MOR — not the open web.",
      "~90% accuracy at L4–5 reasoning vs ~35% for generic models on the same prompts.",
      "Tenant-isolated — your operational data never trains anyone else's model.",
    ],
    buyerQuestions: [
      "Where would you want to point CoAnalyst first — safety reports, ops data, or training records?",
      "Who in your team is currently being asked to answer questions the data should answer?",
      "If we benchmarked your current AI tool against CoAnalyst on five of your real questions, would that be useful?",
    ],
  },

  "exec3-slide-tiers-vs-ai": {
    opener:
      "Generic AI is great at general knowledge and terrible at your operation — and here's why.",
    talkingPoints: [
      "Generic models hallucinate on aviation context because they were trained on the open internet.",
      "Reasoning tiers L1–L3 are easy for any model — L4–L5 is where the gap opens up.",
      "We measure accuracy publicly against the same prompts — not vibes, not demos.",
    ],
    buyerQuestions: [
      "Has your team tried plugging a generic AI into your safety or ops data — what did you find?",
      "Would your safety team trust an answer from a model that can't cite a source?",
      "What's a question you've asked a generic AI where the answer was confidently wrong?",
    ],
  },

  "exec3-slide-insights": {
    opener:
      "Recommendations and prescriptive actions are how the intelligence layer stops being a dashboard and starts driving work.",
    talkingPoints: [
      "Every recommendation is traceable to the data that produced it — full lineage.",
      "Prescriptive actions go through approval, audit, and rollback — nothing irreversible.",
      "The user always sees what the system will do before it does it.",
    ],
    buyerQuestions: [
      "How comfortable would your team be with a system that recommends an action vs takes one?",
      "What's your current process for approving and rolling back a procedural change?",
      "Where would a prescriptive action have saved you from an incident in the last year?",
    ],
  },

  "exec3-slide-regulation": {
    opener:
      "Regulation Management is how a regulatory change becomes an in-app procedure update — without slowing the operation.",
    talkingPoints: [
      "Reg change in → impact analysis → procedure update → training reassignment → audit trail.",
      "Cuts the lag between a published reg and a flying crew knowing about it from weeks to days.",
      "Every step is traceable — when the auditor asks, the answer assembles itself.",
    ],
    buyerQuestions: [
      "How long does it take you today from a published reg change to your frontline crew operating against it?",
      "Who owns reg change management in your organisation — and how many tools do they touch?",
      "What would a clean audit trail be worth to you the next time a regulator walks in?",
    ],
  },

  "exec3-slide-roadmap-2026": {
    opener:
      "Here's what's already committed for 2026 — locked dates, named phases, no vapourware.",
    talkingPoints: [
      "Insights, Automation and Mobile each have committed POC and phase dates.",
      "Be clear what's POC vs GA — don't oversell timing.",
      "Show how a POC for them slots into the roadmap, not around it.",
    ],
    buyerQuestions: [
      "Of these three tracks, which one would you want to be in the first POC cohort for?",
      "What does your internal cycle look like to greenlight a POC like this?",
      "What would have to be true in the first 90 days for you to expand it?",
    ],
  },

  "exec3-slide-why": {
    opener:
      "If you remember three things from today, remember these.",
    talkingPoints: [
      "One connected operating platform — not another point tool.",
      "Detect → Trigger → Orchestrate → Prove — the only model that closes the loop.",
      "550+ airlines — proven in operation, not promised on a roadmap.",
    ],
    buyerQuestions: [
      "Of those three, which one matters most to your decision?",
      "What's the right next step on your side — a deeper technical session, a reference call, or a scoped POC?",
      "Who else needs to see this before we can move it forward?",
    ],
  },
};

export const getSlidePrompts = (slideId: string): SlidePrompts | undefined =>
  practiceSlidePrompts[slideId];