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
    title: "The $110M Problem",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "One hundred and ten million dollars. That's what operational fragmentation costs a mid-size carrier every year. Not one catastrophic event — thousands of small disconnections. A go-around that wasn't prevented because training never saw the safety signal. An aircraft grounded because a compliance gap wasn't flagged. These aren't hypotheticals. They're line items hiding across your P&L. The carriers closing these gaps are fundamentally changing their cost structure.",
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
      "We call it Detect, Trigger, Orchestrate, Prove. Detect — your systems listen continuously across Foqua, safety, and ops data. Trigger — the right workflow fires automatically, no email chains. Orchestrate — training, procedures, and compliance move together, not in sequence. Prove — every action logged, audit-ready by default. One example: a hard landing trend detected Tuesday, affected crews retrained by Thursday, repeat events down seventy-eight percent. That's the loop.",
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
      "Every signal connects to an outcome you own. Go-around trends detected and addressed within forty-eight hours — that's schedule protection. Procedure gaps closed before the audit — that's regulatory confidence. Crew retrained before the next rotation — that's operational readiness. For a mid-size carrier, the total annual exposure exceeds one hundred and ten million dollars — and the cost avoidance opportunity exceeds thirty million. We can model this with your numbers. So what makes us the right partner to deliver this?",
  },
  {
    slideId: "exec-slide-7",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Connected foundation — one version of truth. Embedded intelligence — built in aviation, not bolted on. Proof by default — always audit-ready. Let's schedule thirty minutes to map your operational signals to measurable outcomes.",
  },
];

export const getExecPitchNarration = (slideId: string): ExecNarrationSlide | undefined => {
  return executivePitchNarrations.find((s) => s.slideId === slideId);
};
