import { roadmapUseCases, phaseMeta } from "./roadmapUseCases";

export interface RoadmapNarrationSlide {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

const titleScript =
  "This deck is a single story: every use case on the 2026 roadmap, in the order we will deliver it, with the customer outcome it unlocks. We will move through three phases — H1 2026 in production and quick wins, H2 2026 connected operations, and 2027 plus, intelligent operations. Each slide answers the same three questions: what is the problem today, what are we delivering, and what does the customer get.";

const overviewScript =
  "Here is the roadmap at a glance. Three phases, seventeen named use cases, every one mapped to a platform layer. Notice the shape: H1 is about removing the seams in the operational data foundation and proving the intelligence and orchestration patterns. H2 standardises the experience and rolls out the proven patterns at platform scale. 2027 plus is where the platform behaves as a single, intelligent system of work.";

const phaseDividerScript = (phase: keyof typeof phaseMeta) => {
  const meta = phaseMeta[phase];
  return `${meta.label} — ${meta.theme}. ${meta.window}. The next set of slides walks through every use case landing in this phase, in delivery order, each with its DTOP flow and the customer outcome it unlocks.`;
};

const closingScript =
  "That is the full roadmap, end to end. Three phases, seventeen named use cases, one direction of travel: from a connected platform, to connected operations, to intelligent operations. Every step is sized to deliver value on its own and to compound the value of everything that comes after it. Where would you like to go deeper.";

const useCaseScript = (uc: typeof roadmapUseCases[number]) => {
  const phaseLabel = phaseMeta[uc.phase].label;
  const statusLine =
    uc.status === "done"
      ? "This is in production today."
      : uc.status === "in-progress"
      ? "This is actively in flight."
      : "This is on the committed plan.";
  return [
    `${uc.title}. ${phaseLabel}, in the ${uc.layer}. ${statusLine}`,
    `The problem today: ${uc.problemToday}`,
    `What we are delivering: ${uc.whatWereDelivering.join("; ")}.`,
    `Mapped to DTOP — Detect: ${uc.dtop.detect}. Trigger: ${uc.dtop.trigger}. Orchestrate: ${uc.dtop.orchestrate}. Prove: ${uc.dtop.prove}.`,
    `For the customer, this means ${uc.customerOutcomes.join("; ")}.`,
  ].join(" ");
};

export const roadmapNarrations: RoadmapNarrationSlide[] = [
  { slideId: "rd-slide-title", title: "Title", script: titleScript, voiceId: VOICE_ID },
  { slideId: "rd-slide-overview", title: "Roadmap at a Glance", script: overviewScript, voiceId: VOICE_ID },
  { slideId: "rd-divider-h1-2026", title: "H1 2026 Divider", script: phaseDividerScript("h1-2026"), voiceId: VOICE_ID },
  { slideId: "rd-divider-h2-2026", title: "H2 2026 Divider", script: phaseDividerScript("h2-2026"), voiceId: VOICE_ID },
  { slideId: "rd-divider-2027-plus", title: "2027+ Divider", script: phaseDividerScript("2027-plus"), voiceId: VOICE_ID },
  ...roadmapUseCases.map((uc) => ({
    slideId: `rd-uc-${uc.id}`,
    title: uc.title,
    script: useCaseScript(uc),
    voiceId: VOICE_ID,
  })),
  { slideId: "rd-slide-closing", title: "Closing", script: closingScript, voiceId: VOICE_ID },
];

export const getRoadmapNarration = (slideId: string): RoadmapNarrationSlide | undefined =>
  roadmapNarrations.find((s) => s.slideId === slideId);