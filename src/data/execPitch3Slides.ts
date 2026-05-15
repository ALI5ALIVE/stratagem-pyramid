import TechSlideOpener from "@/components/tech-slides/TechSlideOpener";
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlideLayerDivider from "@/components/tech-slides/TechSlideLayerDivider";
import TechSlideSectionDivider from "@/components/tech-slides/TechSlideSectionDivider";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import TechV4PlatformOverview from "@/components/tech-slides/v4/TechV4PlatformOverview";
import TechV4Slide7CoAnalyst from "@/components/tech-slides/v4/TechV4Slide7CoAnalyst";
import TechV4SlideInsights from "@/components/tech-slides/v4/TechV4SlideInsights";
import IRSlide2WhatIs from "@/components/insights-slides/IRSlide2WhatIs";
import TechV4SlideAutomation from "@/components/tech-slides/v4/TechV4SlideAutomation";
import TechV4SlideTiersVsAI from "@/components/tech-slides/v4/TechV4SlideTiersVsAI";
import TechV4SlideMobile from "@/components/tech-slides/v4/TechV4SlideMobile";
import TechV4Slide5DTOP from "@/components/tech-slides/v4/TechV4Slide5DTOP";
import TechSlideRegulationSummary from "@/components/tech-slides/TechSlideRegulationSummary";
import TechSlide15Roadmap2026 from "@/components/tech-slides/TechSlide15Roadmap2026";

export const dividerProps = {
  intelligence: {
    layerName: "Intelligence & Orchestration",
    tagline:
      "Automation · Insights & Intelligence — turning operational data into action.",
    active: "intelligence" as const,
    hideLayerNumber: true,
    platformGroupLabel: "The Platform · Part of One Integrated Solution",
    upNext: ["Automation", "Insights & Recommendations", "Domain Intelligence vs Generic AI"],
  },
  mobile: {
    layerName: "Unified Mobile",
    tagline:
      "One trusted shell for the frontline — Content, Training and Safety in a single app the crew already uses every shift.",
    active: "mobile" as const,
    hideLayerNumber: true,
    platformGroupLabel: "The Platform · Part of One Integrated Solution",
    upNext: ["Unified Mobile Experience"],
  },
  dtop: {
    layerName: "DTOP — The System of Work",
    tagline:
      "Detect → Trigger → Orchestrate → Prove. The operating model that wraps the whole stack.",
    active: "dtop" as const,
    hideLayerNumber: true,
    platformGroupLabel: "The Platform · Part of One Integrated Solution",
    upNext: ["DTOP Operating Model"],
  },
};

export const sectionDividerProps = {
  regulation: {
    eyebrow: "Section · Regulation in motion",
    sectionTitle: "Regulation Management",
    tagline:
      "Turning a constant stream of regulatory change into traceable, in-app updates — without slowing the operation.",
    upNext: ["Regulation Management Capability Summary"],
    accent: "violet" as const,
  },
  roadmap: {
    eyebrow: "Section · What's next",
    sectionTitle: "2026 Phased Roadmap",
    tagline:
      "How the platform extends across Insights, Automation and Mobile through 2026 — locked dates and committed phases.",
    upNext: ["Insights · Automation · Mobile · Phase Plan"],
    accent: "amber" as const,
  },
};

export const execPitch3Slides = [
  { id: "exec3-slide-0", label: "Title", component: TechSlideOpener, isTransition: true },
  { id: "exec3-slide-1", label: "Strategic Shift", component: TechSlide1StrategicShift, buyerFocus: "the operational gap between data volume and decision speed" },
  { id: "exec3-slide-outcomes", label: "Customer Outcomes", component: CustomerOutcomesSlide, buyerFocus: "named customer outcomes — push for proof and named references", unlocksROI: true },
  { id: "exec3-slide-platform", label: "The Platform", component: TechV4PlatformOverview, buyerFocus: "the unified platform vs point tools — push on integration, not features" },
  { id: "exec3-divider-dtop", label: "▸ DTOP", component: TechSlideLayerDivider, dividerProps: dividerProps.dtop, isTransition: true },
  { id: "exec3-slide-dtop", label: "DTOP — System of Work", component: TechV4Slide5DTOP, buyerFocus: "Detect → Trigger → Orchestrate → Prove and how it lands in the OCC" },
  { id: "exec3-divider-mobile", label: "▸ Mobile", component: TechSlideLayerDivider, dividerProps: dividerProps.mobile, isTransition: true },
  { id: "exec3-slide-mobile", label: "Unified Mobile", component: TechV4SlideMobile, buyerFocus: "one shell for crew — adoption, offline, and clicks per task" },
  { id: "exec3-divider-intelligence", label: "▸ Intelligence Layer", component: TechSlideLayerDivider, dividerProps: dividerProps.intelligence, isTransition: true },
  { id: "exec3-slide-automation", label: "Automation", component: TechV4SlideAutomation, buyerFocus: "what gets automated end-to-end and the human-in-the-loop boundary" },
  { id: "exec3-slide-insights-summary", label: "Insights — Just Ask", component: IRSlide2WhatIs, buyerFocus: "natural-language access to operational data — who can ask what" },
  { id: "exec3-slide-coanalyst", label: "Intelligence Layer", component: TechV4Slide7CoAnalyst, buyerFocus: "~90% domain accuracy at L4–5 vs ~35% generic AI — push on how that's measured" },
  { id: "exec3-slide-tiers-vs-ai", label: "Intelligence Layer vs Generic AI", component: TechV4SlideTiersVsAI, buyerFocus: "why generic AI fails on aviation context — proof, not claims" },
  { id: "exec3-slide-insights", label: "Recommendations & Prescriptive Actions", component: TechV4SlideInsights, buyerFocus: "from recommendation to action — approval, audit, rollback" },
  { id: "exec3-divider-regulation", label: "▸ Regulation Management", component: TechSlideSectionDivider, sectionProps: sectionDividerProps.regulation, isTransition: true },
  { id: "exec3-slide-regulation", label: "Regulation Management", component: TechSlideRegulationSummary, buyerFocus: "tracing a reg change to an in-app procedure update" },
  { id: "exec3-divider-roadmap", label: "▸ 2026 Phased Roadmap", component: TechSlideSectionDivider, sectionProps: sectionDividerProps.roadmap, isTransition: true },
  { id: "exec3-slide-roadmap-2026", label: "2026 Phased Roadmap", component: TechSlide15Roadmap2026, buyerFocus: "locked dates, committed phases, and what's POC vs GA" },
  { id: "exec3-slide-why", label: "Why Comply365", component: TechSlideWhyComply, buyerFocus: "the three differentiators — push for the next step / commercial path" },
];

export type ExecPitch3Slide = (typeof execPitch3Slides)[number];