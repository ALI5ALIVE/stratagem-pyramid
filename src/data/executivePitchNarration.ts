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
      "Every airline generates thousands of operational signals every day. Safety reports, training records, compliance data, maintenance flags. The question isn't whether you have the data. It's whether your systems can act on it before it becomes a cost. Today, I want to show you how the world's leading carriers are closing that gap — turning disconnected signals into predictable, measurable performance. In five minutes, you'll see why this matters to your bottom line.",
  },
  {
    slideId: "exec-slide-1",
    title: "The $47M Problem",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let's start with a number. Forty-seven million dollars. That's the annual cost of operational fragmentation for a mid-size carrier. It's not one dramatic failure. It's thousands of small disconnections — a go-around that wasn't prevented because training didn't see the safety signal. An aircraft grounded because a compliance gap wasn't caught in time. A regulatory finding that cost two million dollars because a procedure update didn't cascade. Each of these events has a price tag. And they compound. The carriers who close these gaps first don't just save money — they fundamentally change their operating economics.",
  },
  {
    slideId: "exec-slide-2",
    title: "The Strategic Shift",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "The industry is moving from managing compliance to managing performance. Regulators are no longer satisfied with evidence that training was completed — they want proof that when a signal was detected, the right action was taken and the outcome was measured. Your competitors who make this shift first gain a compounding advantage. They're not just safer — they're more reliable, more efficient, and more attractive to regulators and investors. The question for your board isn't whether this shift is happening. It's whether you're leading it or following it.",
  },
  {
    slideId: "exec-slide-3",
    title: "How It Works — DTOP",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "We call this operating model Detect, Trigger, Orchestrate, Prove. It's not a feature. It's how your operation runs differently. Detect: your systems are always listening — Foqua data, safety reports, audit findings, ops data — all feeding one signal engine. Trigger: the right workflow starts automatically, no email chains. Orchestrate: training, content, and compliance move together, not in sequence. Prove: every action is logged as it happens — audit-ready by default, not by effort. This is the mechanism that turns signals into outcomes.",
  },
  {
    slideId: "exec-slide-4",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Detect, Trigger, Orchestrate, Prove isn't powered by one application. It's powered by three — working as one. Safety Manager three six five detects the signals. Content Manager three six five orchestrates the response. Training Manager three six five ensures the right people are qualified before the next event. And sitting above all three is CoAnalyst — the intelligence layer that transforms raw data into actionable intelligence. Over sixty-five thousand data points flow through this ecosystem every month. One platform. One version of truth.",
  },
  {
    slideId: "exec-slide-5",
    title: "The Intelligence Layer",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here's the precision gap that matters most. When you use a generic AI tool on aviation operational data, you get roughly thirty-five percent accuracy on domain-specific queries. It doesn't understand your Safety Management System structures, your regulatory frameworks, or your operational context. CoAnalyst delivers over ninety percent accuracy — because it's been trained on millions of aviation reports since twenty twenty-three. It understands the difference between a bird strike report and a bird strike trend. Between a procedure update and a procedure gap. That precision gap is the difference between intelligence you can act on and noise that wastes your team's time.",
  },
  {
    slideId: "exec-slide-6",
    title: "Line of Sight",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every signal your operation generates connects to a boardroom outcome. A single go-around costs eight to twenty-five thousand dollars — but when that trend is detected and the affected crew retrained within forty-eight hours, repeat events drop by seventy-eight percent. That's schedule protection for your COO, cost reduction for your CFO, and regulatory confidence for your CEO. For a mid-size carrier, the total cost avoidance opportunity exceeds forty million dollars annually. And we can build this model with your numbers.",
  },
  {
    slideId: "exec-slide-7",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three things set Comply three six five apart. First, a connected foundation — not integrations bolted together, but one version of truth across sixty-five thousand operational data points. Second, embedded intelligence — CoAnalyst is trained on over ten years of aviation operational data. It understands your context because it grew up in your industry. Third, proof by default — every action logged, every change traced, every decision auditable. You don't prepare for audits. You're always ready. Let's schedule a thirty-minute discovery session to map your operational signals to measurable outcomes.",
  },
];

export const getExecPitchNarration = (slideId: string): ExecNarrationSlide | undefined => {
  return executivePitchNarrations.find((s) => s.slideId === slideId);
};
