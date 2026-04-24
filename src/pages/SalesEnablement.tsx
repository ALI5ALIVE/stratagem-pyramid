import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import SpeakerNotesPanel from "@/components/shared/SpeakerNotesPanel";
import { useSalesEnablementNarration } from "@/hooks/useSalesEnablementNarration";
import { getSalesEnablementNarration } from "@/data/salesEnablementNarration";

import SESlide0Title from "@/components/sales-enablement-slides/SESlide0Title";
import SEModuleDivider from "@/components/sales-enablement-slides/SEModuleDivider";
import SERecapSlide from "@/components/sales-enablement-slides/SERecapSlide";
import SELayerTalkTrack from "@/components/sales-enablement-slides/SELayerTalkTrack";
import SEObjections from "@/components/sales-enablement-slides/SEObjections";
import SEClosingForReps from "@/components/sales-enablement-slides/SEClosingForReps";

import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import PFSlide9Value from "@/components/platform-slides/PFSlide9Value";
import TechV4PlatformOverview from "@/components/tech-slides/v4/TechV4PlatformOverview";
import TechV4Slide4aSafetyManager from "@/components/tech-slides/v4/TechV4Slide4aSafetyManager";
import TechV4Slide4bContentManager from "@/components/tech-slides/v4/TechV4Slide4bContentManager";
import TechV4Slide4cTrainingManager from "@/components/tech-slides/v4/TechV4Slide4cTrainingManager";
import TechV4Slide7CoAnalyst from "@/components/tech-slides/v4/TechV4Slide7CoAnalyst";
import TechV4SlideInsights from "@/components/tech-slides/v4/TechV4SlideInsights";
import TechV4SlideAutomation from "@/components/tech-slides/v4/TechV4SlideAutomation";
import TechV4SlideTiersVsAI from "@/components/tech-slides/v4/TechV4SlideTiersVsAI";
import TechV4SlideMobile from "@/components/tech-slides/v4/TechV4SlideMobile";
import TechV4Slide5DTOP from "@/components/tech-slides/v4/TechV4Slide5DTOP";
import TechSlideRegulationSummary from "@/components/tech-slides/TechSlideRegulationSummary";
import Slide4Transformation from "@/components/slides/Slide4Transformation";
import SlideUseCases from "@/components/slides/SlideUseCases";
import Slide5MaturityCurve from "@/components/slides/Slide5MaturityCurve";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import TechSlide10SafetyUseCases from "@/components/tech-slides/TechSlide10SafetyUseCases";
import TechSlide11OpsUseCases from "@/components/tech-slides/TechSlide11OpsUseCases";
import TechSlide12FinancialUseCases from "@/components/tech-slides/TechSlide12FinancialUseCases";

const moduleProps = {
  m2: {
    moduleNumber: 2,
    title: "What the platform is, in plain English",
    learningGoal: "By the end of this module you can give the one-sentence pitch and name the four capability bands without reading them off a slide.",
    estimatedMinutes: 6,
    upNext: ["Plain-English definition", "The platform at a glance", "Value unlocked", "Recap talk track"],
  },
  m3: {
    moduleNumber: 3,
    title: "How the capabilities fit together",
    learningGoal: "By the end of this module you can describe each capability in 60 seconds and ask one good discovery question per capability.",
    estimatedMinutes: 12,
    upNext: ["Core Apps", "Intelligence & Orchestration", "Mobile", "DTOP", "Capability cheat sheet"],
  },
  m4: {
    moduleNumber: 4,
    title: "How we sell it",
    learningGoal: "By the end of this module you understand the discovery → demo → close motion and where the maturity roadmap fits the conversation.",
    estimatedMinutes: 4,
    upNext: ["Before vs After", "Maturity roadmap"],
  },
  m5: {
    moduleNumber: 5,
    title: "Use cases & value through DTOP",
    learningGoal: "By the end of this module you can pick the right use case for the prospect's pain and walk them through Detect → Trigger → Orchestrate → Prove with a defensible cost figure.",
    estimatedMinutes: 12,
    upNext: ["DTOP framework", "Safety use cases", "Operations use cases", "Financial use cases", "Regulation Management", "Customer outcomes"],
  },
  m6: {
    moduleNumber: 6,
    title: "Why we win",
    learningGoal: "By the end of this module you can handle the top 5 objections and walk a prospect to a 90-day pilot.",
    estimatedMinutes: 6,
    upNext: ["Objections cheat sheet", "Why Comply365", "Your first 7 days"],
  },
};

const slides = [
  // MODULE 1
  { id: "se-slide-0", label: "Title", component: SESlide0Title },
  { id: "se-slide-shift", label: "M1 · Strategic Shift", component: TechSlide1StrategicShift },
  { id: "se-slide-challenge", label: "M1 · Industry Challenge", component: TechSlide2IndustryChallenge },
  // MODULE 2
  { id: "se-module-2", label: "▸ Module 2", component: SEModuleDivider, dividerProps: moduleProps.m2 },
  { id: "se-slide-whatis", label: "M2 · The Platform", component: TechV4PlatformOverview },
  { id: "se-slide-value", label: "M2 · Value Unlocked", component: PFSlide9Value },
  { id: "se-slide-recap-m2", label: "M2 · Recap", component: SERecapSlide },
  // MODULE 3
  { id: "se-module-3", label: "▸ Module 3", component: SEModuleDivider, dividerProps: moduleProps.m3 },
  { id: "se-slide-4a", label: "M3 · Core Apps — SafetyManager365", component: TechV4Slide4aSafetyManager },
  { id: "se-slide-4b", label: "M3 · Core Apps — ContentManager365", component: TechV4Slide4bContentManager },
  { id: "se-slide-4c", label: "M3 · Core Apps — TrainingManager365", component: TechV4Slide4cTrainingManager },
  { id: "se-slide-coanalyst", label: "M3 · Intelligence — CoAnalyst", component: TechV4Slide7CoAnalyst },
  { id: "se-slide-insights", label: "M3 · Intelligence — Insights", component: TechV4SlideInsights },
  { id: "se-slide-automation", label: "M3 · Intelligence — Automation", component: TechV4SlideAutomation },
  { id: "se-slide-tiers-vs-ai", label: "M3 · CoAnalyst vs Generic AI", component: TechV4SlideTiersVsAI },
  { id: "se-slide-mobile", label: "M3 · Mobile", component: TechV4SlideMobile },
  { id: "se-slide-dtop", label: "M3 · DTOP", component: TechV4Slide5DTOP },
  { id: "se-slide-talktrack", label: "M3 · Capability Talk Track", component: SELayerTalkTrack },
  // MODULE 4
  { id: "se-module-4", label: "▸ Module 4", component: SEModuleDivider, dividerProps: moduleProps.m4 },
  { id: "se-slide-transform", label: "M4 · Before vs After", component: Slide4Transformation },
  { id: "se-slide-maturity", label: "M4 · Maturity Roadmap", component: Slide5MaturityCurve },
  // MODULE 5
  { id: "se-module-5", label: "▸ Module 5", component: SEModuleDivider, dividerProps: moduleProps.m5 },
  { id: "se-slide-usecases", label: "M5 · Use Case Framework (DTOP)", component: SlideUseCases },
  { id: "se-slide-safety-uc", label: "M5 · Safety Use Cases", component: TechSlide10SafetyUseCases },
  { id: "se-slide-ops-uc", label: "M5 · Operations Use Cases", component: TechSlide11OpsUseCases },
  { id: "se-slide-financial-uc", label: "M5 · Financial Use Cases", component: TechSlide12FinancialUseCases },
  { id: "se-slide-regmgmt", label: "M5 · Regulation Management Use Case", component: TechSlideRegulationSummary },
  { id: "se-slide-outcomes", label: "M5 · Customer Outcomes", component: CustomerOutcomesSlide },
  // MODULE 6
  { id: "se-module-6", label: "▸ Module 6", component: SEModuleDivider, dividerProps: moduleProps.m6 },
  { id: "se-slide-objections", label: "M6 · Objections", component: SEObjections },
  { id: "se-slide-why", label: "M6 · Why Comply365", component: TechSlideWhyComply },
  { id: "se-slide-closing", label: "M6 · Your First 7 Days", component: SEClosingForReps },
];

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
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {slides.map((slide, index) => {
          const SlideComponent = slide.component as React.ComponentType<any>;
          const isActive = index === currentSlide;
          const slideNarrationProps = (slide as any).dividerProps
            ? {}
            : {
                isActive,
                isPlaying: isActive && narration.isPlaying,
                isLoading: isActive && narration.isLoading,
                progress: isActive ? narration.progress : 0,
                hasCompleted: isActive && narration.hasCompleted,
                onPlay: () => narration.play(slide.id),
                onPause: () => narration.pause(),
              };
          return (
            <SlideComponent
              key={slide.id}
              slideNumber={index}
              id={slide.id}
              {...((slide as any).dividerProps ?? {})}
              {...slideNarrationProps}
            />
          );
        })}
      </div>
      <SpeakerNotesPanel
        title={slides[currentSlide]?.label ?? ""}
        script={getSalesEnablementNarration(slides[currentSlide]?.id)?.script}
        slideNumber={currentSlide}
        totalSlides={slides.length}
      />
    </div>
  );
};

export default SalesEnablement;