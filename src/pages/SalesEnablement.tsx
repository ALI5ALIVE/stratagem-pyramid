import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useSalesEnablementNarration } from "@/hooks/useSalesEnablementNarration";

import SESlide0Title from "@/components/sales-enablement-slides/SESlide0Title";
import SEModuleDivider from "@/components/sales-enablement-slides/SEModuleDivider";
import SERecapSlide from "@/components/sales-enablement-slides/SERecapSlide";
import SELayerTalkTrack from "@/components/sales-enablement-slides/SELayerTalkTrack";
import SEObjections from "@/components/sales-enablement-slides/SEObjections";
import SEClosingForReps from "@/components/sales-enablement-slides/SEClosingForReps";
import SEPlainEnglishShift from "@/components/sales-enablement-slides/SEPlainEnglishShift";
import SEDiscoveryToClose from "@/components/sales-enablement-slides/SEDiscoveryToClose";
import SEUseCaseCheatSheet from "@/components/sales-enablement-slides/SEUseCaseCheatSheet";
import SEDtopWhiteboardDrill from "@/components/sales-enablement-slides/SEDtopWhiteboardDrill";
import SEDtopWhiteboardRunbook from "@/components/sales-enablement-slides/SEDtopWhiteboardRunbook";
import SERoadmapWhiteboardDrill from "@/components/sales-enablement-slides/SERoadmapWhiteboardDrill";
import SEFootprintIntro from "@/components/sales-enablement-slides/SEFootprintIntro";
import SEFootprintSingleApp from "@/components/sales-enablement-slides/SEFootprintSingleApp";
import SEFootprintTwoApps from "@/components/sales-enablement-slides/SEFootprintTwoApps";
import SEFootprintAllThree from "@/components/sales-enablement-slides/SEFootprintAllThree";
import SEFootprintValueLadder from "@/components/sales-enablement-slides/SEFootprintValueLadder";
import SEFootprintPlaybook from "@/components/sales-enablement-slides/SEFootprintPlaybook";
import SEFootprintSingleWhiteboard from "@/components/sales-enablement-slides/SEFootprintSingleWhiteboard";
import SEFootprintTwoWhiteboard from "@/components/sales-enablement-slides/SEFootprintTwoWhiteboard";
import SEFootprintAllThreeWhiteboard from "@/components/sales-enablement-slides/SEFootprintAllThreeWhiteboard";
import SEWeek2PlatformOverview from "@/components/sales-enablement-slides/SEWeek2PlatformOverview";
import SEPlatformInsightsIntelligence from "@/components/sales-enablement-slides/SEPlatformInsightsIntelligence";
import SEPlatformWideIntelligenceUseCases from "@/components/sales-enablement-slides/SEPlatformWideIntelligenceUseCases";
import SEW2CapstoneWhiteboard from "@/components/sales-enablement-slides/SEW2CapstoneWhiteboard";
import SEDiscoveryQuestionBank from "@/components/sales-enablement-slides/SEDiscoveryQuestionBank";
import SEPersonaPlaybook from "@/components/sales-enablement-slides/SEPersonaPlaybook";
import SECompetitiveCheatSheet from "@/components/sales-enablement-slides/SECompetitiveCheatSheet";
import SEDiscoveryCallRunbook from "@/components/sales-enablement-slides/SEDiscoveryCallRunbook";
import SEDealStageLanguage from "@/components/sales-enablement-slides/SEDealStageLanguage";
import SEPracticeCenterBridge from "@/components/sales-enablement-slides/SEPracticeCenterBridge";
import SEWhoToTarget from "@/components/sales-enablement-slides/SEWhoToTarget";
import SEStrategyVisionSession from "@/components/sales-enablement-slides/SEStrategyVisionSession";

import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import PFSlide9Value from "@/components/platform-slides/PFSlide9Value";
import TechV4PlatformOverview from "@/components/tech-slides/v4/TechV4PlatformOverview";
import TechV4Slide7CoAnalyst from "@/components/tech-slides/v4/TechV4Slide7CoAnalyst";
import TechV4SlideInsights from "@/components/tech-slides/v4/TechV4SlideInsights";
import TechV4SlideAutomation from "@/components/tech-slides/v4/TechV4SlideAutomation";
import SECapabilityUseCases from "@/components/sales-enablement-slides/SECapabilityUseCases";
import TechV4SlideTiersVsAI from "@/components/tech-slides/v4/TechV4SlideTiersVsAI";
import TechV4SlideMobile from "@/components/tech-slides/v4/TechV4SlideMobile";
import TechV4Slide5DTOP from "@/components/tech-slides/v4/TechV4Slide5DTOP";
import TechSlideRegulationSummary from "@/components/tech-slides/TechSlideRegulationSummary";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import SIGSlide3SignalSources from "@/components/signals-slides/SIGSlide3SignalSources";
import Slide5MaturityCurve from "@/components/slides/Slide5MaturityCurve";

const weekProps = {
  w1: {
    moduleNumber: 1,
    weekNumber: 1,
    kicker: "Foundation",
    title: "Set the scene — and put the platform in plain English",
    learningGoal:
      "By the end of Week 1 you can explain why the market is shifting, give the one-sentence platform pitch, walk the DTOP loop (Detect → Trigger → Orchestrate → Prove) on a whiteboard, and name the four signal sources behind Detect — without jargon, without reading off a slide.",
    estimatedMinutes: 19,
    upNext: ["Plain-English definition", "The platform at a glance", "DTOP — the operating loop", "DTOP whiteboard drill", "Signal sources", "Value unlocked", "Operational Performance Roadmap", "Operational Performance Roadmap whiteboard", "Recap talk track"],
  },
  w2: {
    moduleNumber: 2,
    weekNumber: 2,
    kicker: "Capabilities",
    title: "How the capabilities fit together",
    learningGoal:
      "By the end of Week 2 you can walk the platform map, land Insights & Intelligence as a platform-wide capability, name the cross-domain use cases only this layer can answer, explain the Intelligence Layer stack (Insights → Recommendations → Automation) and why it beats generic AI (~90% vs ~35%), anchor on Regulation Management as your end-to-end proof, show how Unified Mobile closes the loop on the device — and tell the whole story as one DTOP loop in 60 seconds using the W2 capstone.",
    estimatedMinutes: 16,
    upNext: ["The Platform map", "Insights & Intelligence", "Platform-wide use cases", "Intelligence Layer", "Per-solution use cases", "Insights", "Recommendations use cases", "Automation", "Automation use cases", "Intelligence Layer vs Generic AI", "Regulation Management (end-to-end proof)", "Unified Mobile", "Capability cheat sheet", "Capstone — one use case, every capability, one DTOP loop"],
  },
  w3: {
    moduleNumber: 3,
    weekNumber: 3,
    kicker: "Sell & Win",
    title: "Sell it, prove it, win it",
    learningGoal:
      "By the end of Week 3 you can pick the right account to chase, run a real discovery call, pull the right questions for the room, read the persona, handle the top 8 objections, position against any competitor in the DTOP loop, end every conversation with the scripted next-step line, and put the complimentary 3-hour Strategy & Vision Session on the table.",
    estimatedMinutes: 38,
    upNext: [
      "Who to target (high-propensity accounts)",
      "Discovery → walkthrough → close",
      "Discovery question bank (DTOP)",
      "Persona playbook",
      "Use case cheat sheet",
      "Customer footprint scenarios + whiteboards",
      "Customer outcomes",
      "Competitive cheat sheet",
      "Objections (8 + proof)",
      "Discovery-call runbook",
      "Deal-stage next-step language",
      "Strategy & Vision Session (the offer)",
    ],
  },
};

// Maps Enablement slide IDs → corresponding Executive Pitch 3 slide name
const execPitchMapping: Record<string, string> = {
  "se-slide-shift": "The Shift",
  "se-plain-english-shift": "What This Means for Customers",
  "se-slide-whatis": "The Platform",
  "se-slide-value": "What This Means for Customers",
  "se-slide-dtop": "DTOP / Operating Model",
  "se-slide-coanalyst": "Intelligence Layer",
  "se-slide-outcomes": "Proof & Outcomes",
};

const slides = [
  // WEEK 1
  { id: "se-slide-0", label: "Title", component: SESlide0Title },
  { id: "se-slide-shift", label: "W1 · Strategic Shift", component: TechSlide1StrategicShift },
  { id: "se-plain-english-shift", label: "W1 · Why This Matters (Plain English)", component: SEPlainEnglishShift },
  { id: "se-slide-whatis", label: "W1 · The Platform", component: TechV4PlatformOverview },
  { id: "se-slide-dtop", label: "W1 · DTOP", component: TechV4Slide5DTOP },
  { id: "se-slide-dtop-whiteboard", label: "W1 · DTOP Whiteboard Drill", component: SEDtopWhiteboardDrill },
  { id: "se-slide-dtop-whiteboard-runbook", label: "W1 · Whiteboard Runbook", component: SEDtopWhiteboardRunbook },
  { id: "se-slide-signals", label: "W1 · Signal Sources", component: SIGSlide3SignalSources },
  { id: "se-slide-value", label: "W1 · Value Unlocked", component: PFSlide9Value },
  { id: "se-slide-maturity-roadmap", label: "W1 · Operational Performance Roadmap", component: Slide5MaturityCurve },
  { id: "se-slide-maturity-whiteboard", label: "W1 · Roadmap Whiteboard Drill", component: SERoadmapWhiteboardDrill },
  { id: "se-slide-recap-m2", label: "W1 · Recap", component: SERecapSlide },
  // WEEK 2
  { id: "se-week-2", label: "▸ Week 2 · Capabilities", component: SEModuleDivider, dividerProps: weekProps.w2 },
  { id: "se-week-2-overview", label: "W2 · The Platform (map)", component: SEWeek2PlatformOverview },
  { id: "se-platform-insights-intelligence", label: "W2 · Platform · Insights & Intelligence", component: SEPlatformInsightsIntelligence },
  { id: "se-platform-wide-intelligence-usecases", label: "W2 · Intelligence & Insights — Platform-Wide Use Cases", component: SEPlatformWideIntelligenceUseCases },
  { id: "se-slide-coanalyst", label: "W2 · Intelligence — Intelligence Layer", component: TechV4Slide7CoAnalyst },
  { id: "se-slide-coanalyst-usecases", label: "W2 · Intelligence & Insights — Per-Solution Use Cases", component: SECapabilityUseCases, componentProps: { capability: "intelligence" } },
  { id: "se-slide-insights", label: "W2 · Intelligence — Insights", component: TechV4SlideInsights },
  { id: "se-slide-insights-usecases", label: "W2 · Recommendations — Use Cases", component: SECapabilityUseCases, componentProps: { capability: "recommendations" } },
  { id: "se-slide-automation", label: "W2 · Intelligence — Automation", component: TechV4SlideAutomation },
  { id: "se-slide-automation-usecases", label: "W2 · Automation — Use Cases", component: SECapabilityUseCases, componentProps: { capability: "automation" } },
  { id: "se-slide-tiers-vs-ai", label: "W2 · Intelligence Layer vs Generic AI", component: TechV4SlideTiersVsAI },
  { id: "se-slide-regmgmt", label: "W2 · Regulation Management Use Case", component: TechSlideRegulationSummary },
  { id: "se-slide-mobile", label: "W2 · Mobile", component: TechV4SlideMobile },
  { id: "se-slide-talktrack", label: "W2 · Capability Talk Track", component: SELayerTalkTrack },
  { id: "se-w2-capstone-whiteboard", label: "W2 · Capstone — One Use Case, Every Capability, One DTOP Loop", component: SEW2CapstoneWhiteboard },
  // WEEK 3
  { id: "se-week-3", label: "▸ Week 3 · Sell & Win", component: SEModuleDivider, dividerProps: weekProps.w3 },
  { id: "se-who-to-target", label: "W3 · Who to Target", component: SEWhoToTarget },
  { id: "se-discovery-to-close", label: "W3 · Discovery → Demo → Close", component: SEDiscoveryToClose },
  { id: "se-discovery-question-bank", label: "W3 · Discovery Question Bank", component: SEDiscoveryQuestionBank },
  { id: "se-persona-playbook", label: "W3 · Persona Playbook", component: SEPersonaPlaybook },
  { id: "se-usecase-cheatsheet", label: "W3 · Use Case Cheat Sheet", component: SEUseCaseCheatSheet },
  { id: "se-footprint-intro", label: "W3 · Customer Footprint — Intro", component: SEFootprintIntro },
  { id: "se-footprint-single", label: "W3 · Footprint — One App", component: SEFootprintSingleApp },
  { id: "se-footprint-single-whiteboard", label: "W3 · Footprint — One App Whiteboard", component: SEFootprintSingleWhiteboard },
  { id: "se-footprint-two", label: "W3 · Footprint — Two Apps", component: SEFootprintTwoApps },
  { id: "se-footprint-two-whiteboard", label: "W3 · Footprint — Two Apps Whiteboard", component: SEFootprintTwoWhiteboard },
  { id: "se-footprint-all", label: "W3 · Footprint — All Three + Platform", component: SEFootprintAllThree },
  { id: "se-footprint-all-whiteboard", label: "W3 · Footprint — All Three Whiteboard", component: SEFootprintAllThreeWhiteboard },
  { id: "se-footprint-ladder", label: "W3 · Footprint — Value Ladder", component: SEFootprintValueLadder },
  { id: "se-footprint-playbook", label: "W3 · Footprint — 3-Move Play", component: SEFootprintPlaybook },
  { id: "se-slide-outcomes", label: "W3 · Customer Outcomes", component: CustomerOutcomesSlide },
  { id: "se-competitive-cheatsheet", label: "W3 · Competitive Cheat Sheet", component: SECompetitiveCheatSheet },
  { id: "se-slide-objections", label: "W3 · Objections", component: SEObjections },
  { id: "se-discovery-call-runbook", label: "W3 · Discovery-Call Runbook", component: SEDiscoveryCallRunbook },
  { id: "se-deal-stage-language", label: "W3 · Deal-Stage Next-Step Language", component: SEDealStageLanguage },
  { id: "se-strategy-vision-session", label: "W3 · Strategy & Vision Session", component: SEStrategyVisionSession },
];

// Inject Week 1 divider right after the title slide.
slides.splice(1, 0, {
  id: "se-week-1",
  label: "▸ Week 1 · Foundation",
  component: SEModuleDivider,
  dividerProps: weekProps.w1,
} as any);

const SalesEnablement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = useSalesEnablementNarration();

  const navigateToSlide = useCallback((index: number) => {
    const slideElement = document.getElementById(slides[index].id);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
    }
  }, []);

  useEffect(() => {
    register(slides, currentSlide, navigateToSlide);
    return () => unregister();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const slideHeight = container.clientHeight;
      if (open) setOpen(false);
      const newSlide = Math.round(scrollTop / slideHeight);
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < slides.length) {
        setCurrentSlide(newSlide);
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentSlide, open, setOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable ||
          target.closest("[data-radix-popper-content-wrapper]") ||
          target.closest("[role=dialog]"))
      ) {
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        navigateToSlide(Math.min(currentSlide + 1, slides.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigateToSlide(Math.max(currentSlide - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, navigateToSlide]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Maps-to-Exec-Pitch-3 pill for the currently active slide */}
      {execPitchMapping[slides[currentSlide]?.id] && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="px-3 py-1 rounded-full border border-primary/40 bg-background/80 backdrop-blur text-[10px] uppercase tracking-wider text-muted-foreground">
            Maps to <span className="text-primary font-semibold">Exec Pitch 3</span> · {execPitchMapping[slides[currentSlide].id]}
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {slides.map((slide, index) => {
          const SlideComponent = slide.component as React.ComponentType<any>;
          const isActive = index === currentSlide;
          const slideNarrationProps = {
            isActive,
            isPlaying: isActive && narration.isPlaying,
            isLoading: isActive && narration.isLoading,
            progress: isActive ? narration.progress : 0,
            hasCompleted: isActive && narration.hasCompleted,
            onPlay: () => narration.play(slide.id),
            onPause: () => narration.pause(),
          };
          const extraProps = slide.id === "se-slide-0" ? { slideCount: slides.length } : {};
          return (
            <SlideComponent
              key={slide.id}
              slideNumber={index}
              id={slide.id}
              {...((slide as any).dividerProps ?? {})}
              {...((slide as any).componentProps ?? {})}
              {...slideNarrationProps}
              {...extraProps}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SalesEnablement;