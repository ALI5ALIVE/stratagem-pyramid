import { useState, useEffect, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useTechPitchNarration } from "@/hooks/useTechPitchNarration";
import { DeckProvider } from "@/contexts/DeckContext";

// Frame the problem
import TechSlideOpener from "@/components/tech-slides/TechSlideOpener";
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import TechSlideWhyExists from "@/components/tech-slides/TechSlideWhyExists";
import TechSlidePlatformSnapshot from "@/components/tech-slides/TechSlidePlatformSnapshot";

// Architecture
import TechV4PlatformOverview from "@/components/tech-slides/v4/TechV4PlatformOverview";
import TechSlide4aSafetyManager from "@/components/tech-slides/v4/TechV4Slide4aSafetyManager";
import TechSlide4bContentManager from "@/components/tech-slides/v4/TechV4Slide4bContentManager";
import TechSlide4cTrainingManager from "@/components/tech-slides/v4/TechV4Slide4cTrainingManager";

// Intelligence & Orchestration (now includes data substrate)
import TechSlide7CoAnalyst from "@/components/tech-slides/v4/TechV4Slide7CoAnalyst";
import TechSlideInsights from "@/components/tech-slides/v4/TechV4SlideInsights";
import TechSlideAutomation from "@/components/tech-slides/v4/TechV4SlideAutomation";
import TechSlideTiersVsAI from "@/components/tech-slides/v4/TechV4SlideTiersVsAI";

// Delivery & operating model
import TechSlideMobile from "@/components/tech-slides/v4/TechV4SlideMobile";
import TechSlide5DTOP from "@/components/tech-slides/v4/TechV4Slide5DTOP";
import TechSlideUseCases from "@/components/tech-slides/TechSlideUseCases";
import TechSlide6PlatformIntegrations from "@/components/tech-slides/TechSlide6PlatformIntegrations";

// Regulation Solution
import TechSlideRegulationSummary from "@/components/tech-slides/TechSlideRegulationSummary";

// Value & close
import TechSlideCalculator from "@/components/tech-slides/TechSlideCalculator";
import TechSlide14MaturityRoadmap from "@/components/tech-slides/TechSlide14MaturityRoadmap";
import TechSlide15Roadmap2026 from "@/components/tech-slides/TechSlide15Roadmap2026";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import TechSlideWhyOnlyComply365 from "@/components/tech-slides/TechSlideWhyOnlyComply365";
import TechSlideCTA from "@/components/tech-slides/TechSlideCTA";

// Dividers
import TechSlideLayerDivider from "@/components/tech-slides/TechSlideLayerDivider";
import TechSlideJourneyDivider from "@/components/tech-slides/TechSlideJourneyDivider";
import SpeakerNotesPanel from "@/components/shared/SpeakerNotesPanel";
import { getTechPitchNarration } from "@/data/technicalPitchNarration";

const dividerProps = {
  core: {
    layerName: "Core Operational Apps",
    tagline: "ContentManager365 · TrainingManager365 · SafetyManager365 — the systems of record that emit every operational event.",
    active: "core" as const,
    hideLayerNumber: true,
    upNext: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
  intelligence: {
    layerName: "Intelligence & Orchestration",
    tagline: "Part of the platform — Insights, Recommendations and Automation that turn operational data into action.",
    active: "intelligence" as const,
    hideLayerNumber: true,
    platformGroupLabel: "The Platform · Part of One Integrated Solution",
    upNext: [
      "Insights & Intelligence",
      "Recommendations & Prescriptive Actions",
      "Automation",
      "Tiers vs Generic AI",
    ],
  },
  mobile: {
    layerName: "Unified Mobile Experience",
    tagline: "Part of the platform — one trusted shell for the frontline: Procedures, Training and Safety in a single app.",
    active: "mobile" as const,
    hideLayerNumber: true,
    platformGroupLabel: "The Platform · Part of One Integrated Solution",
    upNext: ["Unified Mobile"],
  },
  dtop: {
    layerName: "DTOP — The System of Work",
    tagline: "Part of the platform — Detect → Trigger → Orchestrate → Prove. The operating model that wraps the stack.",
    active: "dtop" as const,
    hideLayerNumber: true,
    platformGroupLabel: "The Platform · Part of One Integrated Solution",
    upNext: ["DTOP Operating Model"],
  },
};

const journeyProps = {
  maturity: {
    title: "Maturity Roadmap",
    tagline: "Where customers are today and how Comply365 moves them forward — from fragmented to predictive in 12–18 months.",
    activeStage: "today" as const,
    upNext: ["Maturity Roadmap"],
  },
  roadmap2026: {
    title: "2026 Use Case Roadmap",
    tagline: "Phased delivery — each phase builds on proven value, layering capability without disrupting operations.",
    activeStage: "near" as const,
    upNext: ["2026 Roadmap"],
  },
};

const slides = [
  // Frame the problem
  { id: "tech-slide-opener", label: "Hero — Operational Performance Platform", component: TechSlideOpener },
  { id: "tech-slide-1", label: "Strategic Shift", component: TechSlide1StrategicShift },
  { id: "tech-slide-2", label: "Industry Challenge", component: TechSlide2IndustryChallenge },
  { id: "tech-slide-why-exists", label: "Why It Exists", component: TechSlideWhyExists },
  { id: "tech-slide-3b-platform-snapshot", label: "Platform Snapshot", component: TechSlidePlatformSnapshot },
  // Architecture
  { id: "tech-slide-4", label: "Platform Overview", component: TechV4PlatformOverview },
  { id: "tech-divider-core", label: "▸ Core Apps (Foundation)", component: TechSlideLayerDivider, dividerProps: dividerProps.core },
  { id: "tech-slide-4a", label: "SafetyManager365", component: TechSlide4aSafetyManager },
  { id: "tech-slide-4b", label: "ContentManager365", component: TechSlide4bContentManager },
  { id: "tech-slide-4c", label: "TrainingManager365", component: TechSlide4cTrainingManager },
  // Intelligence & Orchestration (data substrate folded in)
  { id: "tech-divider-intelligence", label: "▸ Intelligence & Orchestration", component: TechSlideLayerDivider, dividerProps: dividerProps.intelligence },
  { id: "tech-slide-coanalyst", label: "Insights & Intelligence", component: TechSlide7CoAnalyst },
  { id: "tech-slide-insights", label: "Recommendations & Prescriptive Actions", component: TechSlideInsights },
  { id: "tech-slide-automation", label: "Automation", component: TechSlideAutomation },
  { id: "tech-slide-tiers-vs-ai", label: "Tiers vs Generic AI", component: TechSlideTiersVsAI },
  // Mobile
  { id: "tech-divider-mobile", label: "▸ Unified Mobile", component: TechSlideLayerDivider, dividerProps: dividerProps.mobile },
  { id: "tech-slide-mobile", label: "Unified Mobile", component: TechSlideMobile },
  // DTOP
  { id: "tech-divider-dtop", label: "▸ DTOP", component: TechSlideLayerDivider, dividerProps: dividerProps.dtop },
  { id: "tech-slide-5", label: "DTOP", component: TechSlide5DTOP },
  { id: "tech-slide-use-cases", label: "Use Cases", component: TechSlideUseCases },
  { id: "tech-slide-6", label: "Platform Integrations", component: TechSlide6PlatformIntegrations },
  // Regulation Solution
  { id: "tech-slide-regulation", label: "Regulation Management", component: TechSlideRegulationSummary },
  // Value & close
  { id: "tech-slide-calculator", label: "Line of Sight Calculator", component: TechSlideCalculator },
  { id: "tech-divider-journey-maturity", label: "▸ Journey Ahead · Maturity", component: TechSlideJourneyDivider, dividerProps: journeyProps.maturity },
  { id: "tech-slide-14", label: "Maturity Roadmap", component: TechSlide14MaturityRoadmap },
  { id: "tech-divider-journey-2026", label: "▸ Journey Ahead · 2026 Use Cases", component: TechSlideJourneyDivider, dividerProps: journeyProps.roadmap2026 },
  { id: "tech-slide-15", label: "2026 Roadmap", component: TechSlide15Roadmap2026 },
  { id: "tech-slide-why-comply", label: "Why Comply365", component: TechSlideWhyComply },
  { id: "tech-slide-why-only-comply365", label: "Why Only Comply365", component: TechSlideWhyOnlyComply365 },
  { id: "tech-slide-cta", label: "CTA — Find Out More", component: TechSlideCTA },
];

const TechnicalDeepDiveV4 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, updateActiveIndex } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = useTechPitchNarration();

  const navigateToSlide = useCallback((index: number) => {
    const el = document.getElementById(slides[index]?.id);
    if (el) {
      narration.stop();
      el.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
    }
  }, [narration.stop]);

  useEffect(() => {
    return () => narration.stop();
  }, []);

  useEffect(() => {
    register(
      slides.map((s) => ({ id: s.id, label: s.label })),
      currentSlide,
      navigateToSlide
    );
  }, [register, currentSlide, navigateToSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (open) setOpen(false);
      const scrollTop = container.scrollTop;
      const slideHeight = container.clientHeight;
      const index = Math.round(scrollTop / slideHeight);
      const newSlide = Math.min(index, slides.length - 1);
      if (newSlide !== currentSlide) {
        narration.stop();
        setCurrentSlide(newSlide);
      }
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [open, setOpen, currentSlide, narration.stop]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide, navigateToSlide]);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      navigateToSlide(currentSlide + 1);
    }
  }, [currentSlide, navigateToSlide]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      navigateToSlide(currentSlide - 1);
    }
  }, [currentSlide, navigateToSlide]);

  return (
    <DeckProvider deckId="tech-deep-dive-v4">
    <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {slides.map((slide, index) => {
        const SlideComponent = slide.component as React.ComponentType<any>;
        const isCurrentSlide = index === currentSlide;
        const slideId = slide.id;

        const narrationProps = {
          isPlaying: isCurrentSlide && narration.currentSlide === slideId ? narration.isPlaying : false,
          isLoading: isCurrentSlide && narration.currentSlide === slideId ? narration.isLoading : false,
          progress: isCurrentSlide && narration.currentSlide === slideId ? narration.progress : 0,
          hasCompleted: isCurrentSlide && narration.currentSlide === slideId ? narration.hasCompleted : false,
          onPlay: () => narration.play(slideId),
          onPause: narration.pause,
          onNextSlide: handleNextSlide,
          onPrevSlide: handlePrevSlide,
        };

        return (
          <div key={slide.id} className="snap-start">
            <SlideComponent
              slideNumber={index}
              onNavigateToSlide={index === 0 ? navigateToSlide : undefined}
              exportSlides={index === 0 ? slides : undefined}
              id={slide.id}
              {...((slide as any).dividerProps ?? {})}
              {...narrationProps}
            />
          </div>
        );
      })}
    </div>
    <SpeakerNotesPanel
      title={slides[currentSlide]?.label ?? ""}
      script={getTechPitchNarration(slides[currentSlide]?.id ?? "")?.script}
      slideNumber={currentSlide}
      totalSlides={slides.length}
    />
    </DeckProvider>
  );
};

export default TechnicalDeepDiveV4;