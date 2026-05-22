// Per-slide learning-outcome data for the Field Kit one-pagers.
//
// Each slide's one-pager is anchored to a single learning outcome ("by the
// end the rep can <verb> <object> so that <buyer outcome>"). Every other
// block on the page either teaches that outcome, drills it, or proves it.
//
// Voice rules respected: BrandNumber names, no FOQA/FDM/ASAP, no legacy
// "CoAnalyst" in copy, no unapproved ROI numbers. All ASCII — no smart
// quotes, em-dashes, arrows, or bullet glyphs (the PDF builder sanitises
// any that slip through, but data should be clean at source).

export interface TeachBeat {
  label: "Hook" | "Frame" | "Proof";
  text: string;
}

export interface SlideLearning {
  outcome: string;        // "By the end the rep can ..."
  coreIdea: string;       // one sentence, the thing to own
  teachBeats: [TeachBeat, TeachBeat, TeachBeat];
  sayLikeThis: string;    // short, speakable, near-verbatim
  repMistake: string;     // self-coaching, distinct from buyer objection
  checkYourself: string;  // diagnostic question that gates moving on
}

type WeekId = "w1" | "w2" | "w3";

export const SLIDE_LEARNING: Record<string, SlideLearning> = {
  // ── Week 1 ──────────────────────────────────────────────────────────────
  "se-slide-shift": {
    outcome:
      "Open any call by naming the regulator's shift from prescriptive compliance to outcome evidence, so the buyer hears the problem before they hear the product.",
    coreIdea:
      "The market moved. Regulators now ask for outcome evidence on demand. Record-keeping tools were not built for that.",
    teachBeats: [
      { label: "Hook", text: "The regulator's question changed. It is no longer 'did you train them?' It is 'show me the loop closed, with evidence, today.'" },
      { label: "Frame", text: "Tools built for records cannot produce that evidence on demand. The gap is structural, not effort." },
      { label: "Proof", text: "Industry exposure sits at $25-35B in controllable operational cost (Eurocontrol, IATA, SITA)." },
    ],
    sayLikeThis:
      "Your regulator has shifted from prescriptive compliance to outcome evidence. The tools you bought for records can't produce that evidence on demand. That's the gap we close.",
    repMistake:
      "Don't open with product or AI. Open with the regulator's shift. If you lead with features, you've lost the operating-model frame for the rest of the call.",
    checkYourself:
      "Can I deliver the shift in under 30 seconds without naming a product?",
  },

  "se-plain-english-shift": {
    outcome:
      "Explain in plain English why aviation is not short on data but short on signals it can act on, so a non-technical buyer can repeat the idea back.",
    coreIdea:
      "Aviation has three disconnected stacks: safety, content, training. The signal arrives in one, the work happens in another, the proof lives in a third.",
    teachBeats: [
      { label: "Hook", text: "Aviation is not short on data. Every operator has dashboards. Most cannot act on what they show." },
      { label: "Frame", text: "Safety, content and training run as three stacks. A signal in one rarely reaches the others without a human chasing it." },
      { label: "Proof", text: "Ask which of the three is most disconnected today. The answer is the wedge." },
    ],
    sayLikeThis:
      "You're not short on data. You're short on signals you can act on. Safety, content and training run as three stacks today, and a human carries the signal between them.",
    repMistake:
      "Don't quote ROI numbers we haven't signed off. This slide is messaging, not a business case.",
    checkYourself:
      "Can I name the three disconnected stacks and the wedge question that follows?",
  },

  "se-slide-whatis": {
    outcome:
      "Pitch the platform in one sentence and name the five bands in order from the foundation up, without reading from the deck.",
    coreIdea:
      "One Operational Data foundation, three Core Apps (safety, content, training), an intelligence layer on top, Unified Mobile on the device.",
    teachBeats: [
      { label: "Hook", text: "Start at the foundation, not the top. Everything above only works because the data underneath is connected." },
      { label: "Frame", text: "Three Core Apps share one foundation. Intelligence reasons across all three. Mobile is the last mile, not a separate app." },
      { label: "Proof", text: "Five boxes, one foundation. Point to each. End on Unified Mobile so the buyer feels the device in their hand." },
    ],
    sayLikeThis:
      "One foundation. Three Core Apps on top. An intelligence layer that reasons across them. And Unified Mobile as the last mile to the device. That is the platform in one breath.",
    repMistake:
      "Don't read the boxes left to right. Start with the foundation, then build up. If you skip the foundation, the rest sounds like another point-tool suite.",
    checkYourself:
      "Can I draw the five boxes, foundation first, in under 60 seconds?",
  },

  "se-slide-dtop": {
    outcome:
      "Draw the DTOP loop on a whiteboard, in colour and in order, in under 90 seconds, and name what each step is responsible for.",
    coreIdea:
      "DTOP is the only operating loop that includes both a Detect step and a Prove step. Workflow tools have neither.",
    teachBeats: [
      { label: "Hook", text: "Most tools start at Trigger and stop at Orchestrate. DTOP starts earlier and finishes later." },
      { label: "Frame", text: "Detect fuses four signal sources. Trigger turns the signal into the right action. Orchestrate moves the work. Prove closes the loop with evidence a regulator accepts." },
      { label: "Proof", text: "Ask which of the four steps is weakest today. The answer is the wedge for everything that follows." },
    ],
    sayLikeThis:
      "Detect the signal. Trigger the right action. Orchestrate the work across the systems that already exist. Prove the outcome to whoever asks. That's the loop. Workflow has no Detect and no Prove.",
    repMistake:
      "Don't pitch DTOP as workflow with a fancy name. Workflow moves tasks; DTOP closes a loop. If you collapse them, you lose the differentiator.",
    checkYourself:
      "Can I draw D, T, O, P in colour, in order, and name the gap-spotting question after Detect?",
  },

  "se-slide-dtop-whiteboard": {
    outcome:
      "Reproduce the DTOP loop on a real whiteboard without referring to the deck, narrating each step as you draw it.",
    coreIdea:
      "Drawing the loop in front of the buyer earns more trust than the same loop on a slide. Stroke order matters.",
    teachBeats: [
      { label: "Hook", text: "Put the pen in your hand. The moment a rep draws DTOP themselves, the room shifts from 'pitch' to 'working session'." },
      { label: "Frame", text: "Stroke order: D (blue), T (amber), O (violet), P (emerald), then the loop arrow. Pause after each letter for the buyer to react." },
      { label: "Proof", text: "Circle the step the buyer named as weakest. That circle becomes the agenda for the rest of the call." },
    ],
    sayLikeThis:
      "Let me draw this. Detect... Trigger... Orchestrate... Prove. Now, which of these four is weakest for you today?",
    repMistake:
      "Don't draw the loop and move on. The pause after Detect is where discovery happens. If you keep drawing through it, you lose the wedge.",
    checkYourself:
      "Can I draw DTOP, in colour, in 90 seconds, and stop at the right moment to ask the wedge question?",
  },

  "se-slide-signals": {
    outcome:
      "Name the four canonical signal sources in order and convert any one of them into a discovery question.",
    coreIdea:
      "Four signal sources feed Detect: operational, safety, regulatory, training. Point tools cover one at best.",
    teachBeats: [
      { label: "Hook", text: "Most operators can name two of the four. The two they cannot name are usually where the loop breaks." },
      { label: "Frame", text: "Operational data, safety events, regulatory change, training outcomes. All four feed a single Detect layer." },
      { label: "Proof", text: "Anchor each source to a system the customer already runs. Don't list them flat." },
    ],
    sayLikeThis:
      "Four signal sources feed the loop: operational, safety, regulatory, training. Which of these four is hardest for you to act on today?",
    repMistake:
      "Don't list the four signal sources flat. Anchor each to a system the customer already owns or you sound like a feature tour.",
    checkYourself:
      "Can I name the four sources in canonical order and ask the wedge question without pausing?",
  },

  "se-slide-maturity-roadmap": {
    outcome:
      "Diagnose where the buyer sits on the maturity ladder today, and where their leadership is asking them to be in 12 to 18 months.",
    coreIdea:
      "Most operators self-describe at Connected and operate at Managed. The gap between self-rating and reality is the opening for the Strategy & Vision Session.",
    teachBeats: [
      { label: "Hook", text: "Five rungs: Ad-hoc, Managed, Connected, Predictive, Autonomous. Most buyers will skip to rung three. Don't let them." },
      { label: "Frame", text: "Intelligence Layer outcomes anchor at Predictive and Autonomous. The path there is sequenced, not a leap." },
      { label: "Proof", text: "Ask what is stopping them from moving one rung. The answer maps directly to a Core App." },
    ],
    sayLikeThis:
      "Most operators self-rate at Connected and operate at Managed. The Strategy & Vision Session is how we pressure-test where you actually are.",
    repMistake:
      "Don't let the buyer self-rate without pressure-testing. If you accept 'we're at Connected' at face value, you lose the Strategy & Vision Session as the next step.",
    checkYourself:
      "Can I name the five rungs, and ask the one question that surfaces the gap between self-rating and reality?",
  },

  // ── Week 2 ──────────────────────────────────────────────────────────────
  "se-platform-insights-intelligence": {
    outcome:
      "Tell the three-tier intelligence story (Insights, Intelligence, Automation) in 60 seconds, ending on the Operational Data foundation underneath.",
    coreIdea:
      "Three tiers on one foundation. Insights see the signal, Intelligence reasons about it, Automation moves the work. None of them exist without the foundation.",
    teachBeats: [
      { label: "Hook", text: "Buyers ask 'is this AI?' Reframe immediately: it is three tiers, on one foundation, doing different jobs." },
      { label: "Frame", text: "Insights see. Intelligence reasons. Automation acts. The foundation is connected Operational Data, in your tenancy." },
      { label: "Proof", text: "~90% domain accuracy at L4-5 maturity. ~35% accuracy for generic AI on the same questions. The gap is the data, not the model." },
    ],
    sayLikeThis:
      "Three tiers on one foundation. Insights see what's drifting. Intelligence reasons about it, cited to source. Automation moves the work. None of it exists without the connected data underneath.",
    repMistake:
      "Don't show the three tiers without naming the foundation underneath. If you skip the foundation, it sounds like three features instead of a moat.",
    checkYourself:
      "Can I name the three tiers in order, anchor the 90 vs 35 number correctly, and end on the foundation?",
  },

  "se-slide-coanalyst": {
    outcome:
      "Defend the ~90% vs ~35% intelligence headline, including where the number comes from and why generic AI cannot close the gap.",
    coreIdea:
      "Domain-trained Generative AI on connected Operational Data lands at ~90% accuracy at L4-5 maturity. Generic AI on disconnected data lands at ~35%. The gap is the data foundation, not the model.",
    teachBeats: [
      { label: "Hook", text: "Buyers will say 'we'll build it on GPT.' That's a model choice. The 55-point gap is a data choice." },
      { label: "Frame", text: "Every answer is cited to regulation, procedure and training source. Generic AI cannot cite what it isn't connected to." },
      { label: "Proof", text: "Benchmark methodology available under NDA in the Strategy & Vision Session. Their data stays in their tenancy; we run against it, not on it." },
    ],
    sayLikeThis:
      "Generic AI on disconnected data tops out near 35% on aviation work. Domain-trained Generative AI on your connected Operational Data lands near 90%. The gap is the data foundation, not the model. That's the part you'd be rebuilding.",
    repMistake:
      "Don't say 'our AI is better.' Anchor the 90 vs 35 on aviation-domain questions at L4-5 maturity. Vague claims invite vague pushback.",
    checkYourself:
      "Can I cite the 90 vs 35 correctly, name the methodology window, and handle the 'we'll build it' objection without flinching?",
  },

  "se-slide-insights": {
    outcome:
      "Separate Insights from dashboards in one sentence, and name what Insights does that a dashboard cannot.",
    coreIdea:
      "Dashboards show what happened. Insights surface what is drifting and route a Recommended Action into the loop, so it does not sit on a slide.",
    teachBeats: [
      { label: "Hook", text: "Every buyer has dashboards. Almost none have a way to route the action the dashboard implies." },
      { label: "Frame", text: "Insights detects drift, surfaces a Recommended Action, and hands it to Trigger. Dashboards stop at the chart." },
      { label: "Proof", text: "Ask how long it takes to produce a trend report leadership trusts. The answer is the gap." },
    ],
    sayLikeThis:
      "Dashboards show what happened. Insights surface what's drifting and route the Recommended Action into the loop, so it doesn't sit on a slide deck waiting for a human to pick it up.",
    repMistake:
      "Don't conflate Insights with dashboards. If the buyer hears 'BI tool', the conversation stops at price.",
    checkYourself:
      "Can I name what Insights does that a dashboard cannot, in one sentence?",
  },

  "se-slide-automation": {
    outcome:
      "Position Automation as removing busywork from SMEs, not replacing them, and name the four orchestrated steps.",
    coreIdea:
      "Automation moves the work between systems. SMEs keep the decisions; the platform removes the chasing.",
    teachBeats: [
      { label: "Hook", text: "Automation scares SMEs when it's pitched as replacement. Reframe it as 'we remove the chasing, you keep the call.'" },
      { label: "Frame", text: "Four orchestrated steps: revision routing, review assignment, training assignment, device sync." },
      { label: "Proof", text: "Ask which of the four takes the longest today. That's where the time comes back." },
    ],
    sayLikeThis:
      "Automation moves the busywork. Revision routing, review assignment, training assignment, device sync. SMEs keep the decisions. We just remove the chasing.",
    repMistake:
      "Don't say automation replaces SMEs. The room will lose you in one sentence. It removes the chasing; decisions stay with humans.",
    checkYourself:
      "Can I name the four orchestrated steps and frame Automation without using the word 'replace'?",
  },

  "se-slide-mobile": {
    outcome:
      "Position Unified Mobile as the last mile of DTOP, not another EFB reader, and quote the revision-to-device window.",
    coreIdea:
      "Unified Mobile is the device-side last mile of DTOP. The same revision that closed the loop in Orchestrate lands on the device, offline-first, in under 48 hours.",
    teachBeats: [
      { label: "Hook", text: "Buyers will compare this to their reader app. Don't fight the comparison; reposition the category." },
      { label: "Frame", text: "Reader apps show the document. Unified Mobile lands the revision, with read-receipt and training context, as part of the loop." },
      { label: "Proof", text: "Revision-to-device in under 48 hours. Offline-first by design. Sync on next connection." },
    ],
    sayLikeThis:
      "Unified Mobile isn't a reader. It's the last mile of DTOP. The same revision that closed the loop in Orchestrate lands on the crew's device, offline-first, in under 48 hours, with the training context attached.",
    repMistake:
      "Don't position it as another EFB reader. It is the last mile of DTOP. If the buyer hears 'reader', you've lost the loop story.",
    checkYourself:
      "Can I name the 48-hour window and explain offline-first in one sentence each?",
  },

  // ── Week 3 ──────────────────────────────────────────────────────────────
  "se-footprint-single": {
    outcome:
      "Land a single-Core-App footprint as a wedge, not a smaller deal, and name the upgrade path on the same foundation.",
    coreIdea:
      "Most customers start with one Core App. The platform makes the second and third land in weeks, not quarters, because the foundation is already in place.",
    teachBeats: [
      { label: "Hook", text: "Single-app is not a smaller deal. It is the wedge that earns the right to the second and third." },
      { label: "Frame", text: "One Core App on the foundation. Two empty slots visible. The upgrade path is structural, not commercial." },
      { label: "Proof", text: "Second and third Core Apps land in weeks because the data foundation is already connected." },
    ],
    sayLikeThis:
      "Most customers start with one Core App. The foundation is what makes the second and third land in weeks instead of quarters. That's the compounding part.",
    repMistake:
      "Don't oversell a multi-app rollout when the wedge is one app. Land the wedge first; the rest compounds.",
    checkYourself:
      "Can I name the single-app wedge and the upgrade path in one breath?",
  },

  "se-footprint-all": {
    outcome:
      "Defend a three-Core-App footprint as less change than three point solutions, not more.",
    coreIdea:
      "Three Core Apps land on one foundation, in one rollout. That is less change than buying three point solutions and integrating them later.",
    teachBeats: [
      { label: "Hook", text: "Buyers will recoil at 'three apps at once.' Reframe immediately: three on one foundation is less change than three point tools plus integration." },
      { label: "Frame", text: "One rollout, one foundation, one operating model. Point solutions create three rollouts and an integration project." },
      { label: "Proof", text: "Cross out '3 point tools + integration' on the whiteboard. Show the simpler shape." },
    ],
    sayLikeThis:
      "Three Core Apps on one foundation in one rollout is less change than buying three point tools and stitching them together later. We do the integration at the foundation, not in your project plan.",
    repMistake:
      "Don't apologise for the scope. If you flinch, the buyer flinches. Three on one foundation is the simpler shape.",
    checkYourself:
      "Can I reframe 'three at once' as less change, with the cross-out on the whiteboard?",
  },

  "se-discovery-to-close": {
    outcome:
      "Close any discovery call on the Strategy & Vision Session as the next step, not on procurement.",
    coreIdea:
      "The next step is never a quote. It is a three-hour, complimentary, fixed-agenda session with the buyer's leadership.",
    teachBeats: [
      { label: "Hook", text: "Buyers brace for a procurement ask. Hand them a working session instead." },
      { label: "Frame", text: "Three hours, fixed agenda, run by the domain team, scoped before we walk in. Outcome is clarity, not a contract." },
      { label: "Proof", text: "Ask who else needs to be in the room. The names you get back are the deal map." },
    ],
    sayLikeThis:
      "The next step isn't a quote and isn't a workshop. It's a three-hour Strategy & Vision Session. Your leadership, our domain team, your operating model. Complimentary, fixed agenda, scoped in advance.",
    repMistake:
      "Don't close on a procurement step. Close on the Strategy & Vision Session. If you ask for a commitment, you'll get a 'we need to think about it.'",
    checkYourself:
      "Can I offer the Strategy & Vision Session without scoping it or apologising for it?",
  },

  "se-strategy-vision-session": {
    outcome:
      "Position the Strategy & Vision Session as the natural next step, naming what it is and what it isn't.",
    coreIdea:
      "Three hours, fixed agenda, run by the domain team on the buyer's operating model. The outcome is clarity, not procurement.",
    teachBeats: [
      { label: "Hook", text: "Don't call it a workshop or a demo. Both words signal 'sales process' and lose the room." },
      { label: "Frame", text: "Three boxes on the whiteboard: their operating model, our domain team, the outcome (clarity). No procurement box." },
      { label: "Proof", text: "Run by the domain team, not sales. Free, complimentary, pre-scoped." },
    ],
    sayLikeThis:
      "It's not a workshop and it's not a demo. Three hours, fixed agenda, on your operating model. Our domain team, your leadership. The outcome is clarity on what to do next.",
    repMistake:
      "Don't scope it in the meeting. It is pre-scoped, fixed agenda, complimentary. Scoping in the room turns it into a sales process.",
    checkYourself:
      "Can I offer the session, name what it is and isn't, and refuse to scope it on the call?",
  },
};

// ─── Per-week fallbacks ────────────────────────────────────────────────────
// Used when a slide has no hand-written entry. Generic enough to be useful,
// specific enough that the page still reads as teaching.

export const WEEK_LEARNING_FALLBACK: Record<WeekId, SlideLearning> = {
  w1: {
    outcome:
      "Anchor this slide to the Week 1 foundation: the market shift, the platform in plain English, the DTOP loop.",
    coreIdea:
      "Every Week 1 slide earns the right to the operating-model conversation. Don't skip ahead to product.",
    teachBeats: [
      { label: "Hook", text: "Tie the slide back to the regulator's shift from compliance to outcome evidence." },
      { label: "Frame", text: "Use plain English. One foundation, three Core Apps, intelligence on top, mobile on the device." },
      { label: "Proof", text: "End on the DTOP loop. Detect, Trigger, Orchestrate, Prove." },
    ],
    sayLikeThis:
      "One platform, three Core Apps, intelligence on top, mobile on the device. DTOP wraps it all into a loop with both a Detect and a Prove step.",
    repMistake:
      "Don't pitch features in Week 1 territory. Earn the right with the operating model first.",
    checkYourself:
      "Can I tie this slide back to DTOP without naming a feature?",
  },
  w2: {
    outcome:
      "Anchor this slide to the Week 2 capability story: Insights see, Intelligence reasons, Automation acts, Unified Mobile lands.",
    coreIdea:
      "Capabilities only matter when anchored to a use case the customer already owns. Tour with intent.",
    teachBeats: [
      { label: "Hook", text: "Start with the use case the buyer named in discovery, not the capability band." },
      { label: "Frame", text: "Place the capability on the DTOP loop. Which step does it strengthen?" },
      { label: "Proof", text: "Anchor the 90 vs 35 intelligence headline whenever the conversation touches AI." },
    ],
    sayLikeThis:
      "Insights see the signal, Intelligence reasons about it, Automation moves the work, Mobile lands it on the device. One foundation underneath all four.",
    repMistake:
      "Don't tour capabilities flat. Anchor each one to a use case the customer owns or it sounds like a feature list.",
    checkYourself:
      "Can I anchor this capability to a use case the buyer named in discovery?",
  },
  w3: {
    outcome:
      "Anchor this slide to the Week 3 close: pick the account, pick the use case, handle the objection, book the Strategy & Vision Session.",
    coreIdea:
      "Every Week 3 slide moves the conversation toward the Strategy & Vision Session. Don't accept a procurement step as a close.",
    teachBeats: [
      { label: "Hook", text: "Name the footprint pattern the buyer is in: single, two, or all three Core Apps." },
      { label: "Frame", text: "Use the three differentiators as the anchor: connected data, cited AI, closed loop." },
      { label: "Proof", text: "Close on the Strategy & Vision Session. Three hours, fixed agenda, complimentary, on their operating model." },
    ],
    sayLikeThis:
      "Pick the account, run the call, pick the use case, handle the objection, close on the Strategy & Vision Session.",
    repMistake:
      "Don't ask for a commitment. Ask for the Strategy & Vision Session.",
    checkYourself:
      "Can I move this conversation one step closer to the Strategy & Vision Session?",
  },
};

export const buildSlideLearning = (
  slideId: string,
  weekId: WeekId,
): SlideLearning => SLIDE_LEARNING[slideId] ?? WEEK_LEARNING_FALLBACK[weekId];

// Per-slide fallback derived from the curated coach-card. Used when a slide
// has no hand-written SLIDE_LEARNING entry — keeps every page distinct
// rather than repeating the same week-level fallback across 10 slides.
export const buildSlideLearningFromCoachCard = (
  slideId: string,
  weekId: WeekId,
  cc: { remember: string; sayItLikeThis: string; watchOutFor: string; bridge: string } | undefined,
): SlideLearning => {
  const curated = SLIDE_LEARNING[slideId];
  if (curated) return curated;
  if (!cc) return WEEK_LEARNING_FALLBACK[weekId];

  const weekFallback = WEEK_LEARNING_FALLBACK[weekId];
  return {
    outcome: cc.remember,
    coreIdea: cc.sayItLikeThis,
    teachBeats: weekFallback.teachBeats,
    sayLikeThis: cc.sayItLikeThis,
    repMistake: cc.watchOutFor,
    checkYourself: weekFallback.checkYourself,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// SlideOnePager — what the rewritten Field Kit one-pager actually renders.
//
// Distinct from SlideLearning (kept for the appendices). This shape exists
// because the previous slide page repeated the same idea across outcome /
// coreIdea / teachBeats / sayLikeThis. The one-pager now shows four blocks
// only, each with a different job:
//
//   summary       — 2-3 sentence digest of what the slide actually says
//   keyMessages   — the 3 buyer-facing takeaways
//   sayLikeThis   — one speakable line for the rep
//   (discovery + objections come from SLIDE_DISCOVERY / SLIDE_OBJECTIONS)
// ─────────────────────────────────────────────────────────────────────────────

export interface SlideOnePager {
  summary: string;
  keyMessages: [string, string, string];
  sayLikeThis: string;
}

// Phrases inside narration scripts we want to strip when summarising.
const SUMMARY_OPENERS: RegExp[] = [
  /^this slide matters because[^.]*\.\s*/i,
  /^why this slide matters[:.]?\s*/i,
  /^why this matters[:.]?\s*/i,
  /^why this drill exists[:.]?\s*/i,
  /^this slide is[^.]*\.\s*/i,
  /^this is the[^.]*and it does the heavy lifting[^.]*\.\s*/i,
];

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

const stripOpeners = (s: string): string => {
  let out = s;
  SUMMARY_OPENERS.forEach((re) => { out = out.replace(re, ""); });
  return out.trim();
};

const splitSentences = (s: string): string[] => {
  // Split on sentence terminators, keep terminator.
  const parts = s.match(/[^.!?]+[.!?]+/g);
  return (parts ?? [s]).map(norm).filter(Boolean);
};

const takeAfter = (script: string, marker: RegExp): string | undefined => {
  const m = script.match(marker);
  if (!m || m.index === undefined) return undefined;
  const tail = script.slice(m.index + m[0].length);
  const sent = tail.match(/^[^.!?]+[.!?]/);
  return sent ? norm(sent[0]) : undefined;
};

const dedupePreserving = (items: string[]): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of items) {
    const k = norm(raw).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 90);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(norm(raw));
  }
  return out;
};

// Convert a curated SlideLearning entry into the new SlideOnePager shape.
// summary = coreIdea (it's already the one-sentence-to-own).
// keyMessages = the 3 teach beats, trimmed of stage directions.
// sayLikeThis = unchanged.
const fromLearning = (l: SlideLearning): SlideOnePager => ({
  summary: l.coreIdea,
  keyMessages: [l.teachBeats[0].text, l.teachBeats[1].text, l.teachBeats[2].text],
  sayLikeThis: l.sayLikeThis,
});

// Derive a one-pager from the narration script + coach card when no curated
// SlideLearning entry exists. Pulls the substantive sentence after each
// signposted block ("core message:", "pain", "value lever:") in the script,
// then falls back to coach-card fields. Dedupes so blocks never repeat.
const fromNarration = (
  script: string,
  cc: { remember: string; sayItLikeThis: string; watchOutFor: string; bridge: string },
  weekFallback: SlideOnePager,
): SlideOnePager => {
  const clean = stripOpeners(script);

  const core =
    takeAfter(script, /core message[^.:]*[:.]\s*/i) ??
    takeAfter(script, /the core message[^.:]*[:.]\s*/i);
  const pain =
    takeAfter(script, /pain (?:you'?re |you are )?(?:addressing|naming|solving)[^.:]*[:.]\s*/i) ??
    takeAfter(script, /the pain[^.:]*[:.]\s*/i);
  const value =
    takeAfter(script, /value lever(?:[^.:]*[:.])\s*/i) ??
    takeAfter(script, /the value[^.:]*[:.]\s*/i);

  // Summary: first two non-filler sentences if no "core message:" anchor.
  let summary: string;
  if (core) {
    summary = core;
    if (pain && norm(pain).toLowerCase() !== norm(core).toLowerCase()) {
      summary = `${core} ${pain}`;
    }
  } else {
    const sentences = splitSentences(clean).slice(0, 2);
    summary = sentences.join(" ") || weekFallback.summary;
  }

  const candidates = dedupePreserving([
    core ?? cc.remember,
    value ?? pain ?? cc.bridge,
    pain && value ? cc.remember : (cc.bridge !== cc.remember ? cc.bridge : cc.watchOutFor),
  ].filter((x): x is string => !!x));

  // Pad to exactly 3 from coach card fields, skipping anything that duplicates
  // sayLikeThis or summary.
  const blockers = [cc.sayItLikeThis, summary].map((s) =>
    norm(s).toLowerCase().slice(0, 60),
  );
  const isDup = (s: string) =>
    blockers.some((b) => b && norm(s).toLowerCase().slice(0, 60) === b);

  const pool = [
    ...candidates,
    cc.remember,
    cc.bridge,
    cc.watchOutFor,
    ...weekFallback.keyMessages,
  ];
  const finalMessages: string[] = [];
  for (const m of pool) {
    if (finalMessages.length === 3) break;
    if (!m || isDup(m)) continue;
    const key = norm(m).toLowerCase().slice(0, 60);
    if (finalMessages.some((x) => norm(x).toLowerCase().slice(0, 60) === key)) continue;
    finalMessages.push(norm(m));
  }
  while (finalMessages.length < 3) {
    finalMessages.push(weekFallback.keyMessages[finalMessages.length] ?? cc.remember);
  }

  return {
    summary: norm(summary),
    keyMessages: [finalMessages[0], finalMessages[1], finalMessages[2]],
    sayLikeThis: cc.sayItLikeThis,
  };
};

const WEEK_ONE_PAGER_FALLBACK: Record<WeekId, SlideOnePager> = {
  w1: {
    summary:
      "Foundation slide. Anchor the conversation to the regulator's shift from prescriptive compliance to outcome evidence, then ground the platform in plain English before naming any feature.",
    keyMessages: [
      "Regulators now ask for outcome evidence on demand; record-keeping tools cannot produce it.",
      "One Operational Data foundation, three Core Apps, an intelligence layer on top, Unified Mobile as the last mile.",
      "DTOP is the loop that makes the platform worth buying: Detect, Trigger, Orchestrate, Prove.",
    ],
    sayLikeThis:
      "One platform, three Core Apps, intelligence on top, mobile on the device. DTOP wraps it into a loop with both a Detect and a Prove step.",
  },
  w2: {
    summary:
      "Capability slide. Place the capability on the DTOP loop the buyer already understands, anchor it to a use case they own, and end on the Operational Data foundation underneath.",
    keyMessages: [
      "Three tiers on one foundation: Insights see, Intelligence reasons, Automation acts.",
      "Domain-trained Generative AI on connected Operational Data lands near 90% accuracy at L4-5; generic AI on disconnected data tops near 35%.",
      "Every capability inherits the foundation; without the connected data underneath it would be another point tool.",
    ],
    sayLikeThis:
      "Insights see the signal, Intelligence reasons about it cited to source, Automation moves the work, Unified Mobile lands it on the device. One foundation underneath all four.",
  },
  w3: {
    summary:
      "Sell-and-win slide. Move the conversation toward the Strategy & Vision Session as the next step, not procurement. Use footprint patterns and the three differentiators as the anchor.",
    keyMessages: [
      "Diagnose the footprint: single Core App, two, or all three. Single is a wedge, not a smaller deal.",
      "The three differentiators that anchor every close: connected data, cited AI, closed loop.",
      "The next step is the Strategy & Vision Session: three hours, fixed agenda, complimentary, on their operating model.",
    ],
    sayLikeThis:
      "It is not a workshop and it is not a demo. Three hours, fixed agenda, on your operating model. Our domain team, your leadership. The outcome is clarity on what to do next.",
  },
};

export const buildSlideOnePager = (
  slideId: string,
  weekId: WeekId,
  narrationScript: string | undefined,
  cc: { remember: string; sayItLikeThis: string; watchOutFor: string; bridge: string } | undefined,
): SlideOnePager => {
  const curated = SLIDE_LEARNING[slideId];
  if (curated) return fromLearning(curated);
  const weekFb = WEEK_ONE_PAGER_FALLBACK[weekId];
  if (narrationScript && cc) return fromNarration(narrationScript, cc, weekFb);
  if (cc) {
    return {
      summary: weekFb.summary,
      keyMessages: [cc.remember, cc.bridge, cc.watchOutFor] as [string, string, string],
      sayLikeThis: cc.sayItLikeThis,
    };
  }
  return weekFb;
};