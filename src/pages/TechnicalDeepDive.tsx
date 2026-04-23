import { useState, useEffect, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useTechPitchNarration } from "@/hooks/useTechPitchNarration";
import { DeckProvider } from "@/contexts/DeckContext";

// Frame the problem
import TechSlideOpener from "@/components/tech-slides/TechSlideOpener";
import TechSlide0Title from "@/components/tech-slides/TechSlide0Title";
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import TechSlideWhyExists from "@/components/tech-slides/TechSlideWhyExists";
import TechSlidePlatformSnapshot from "@/components/tech-slides/TechSlidePlatformSnapshot";

// Architecture
import TechSlide4Platform from "@/components/tech-slides/TechSlide4Platform";
import TechSlide4aSafetyManager from "@/components/tech-slides/TechSlide4aSafetyManager";
import TechSlide4bContentManager from "@/components/tech-slides/TechSlide4bContentManager";
import TechSlide4cTrainingManager from "@/components/tech-slides/TechSlide4cTrainingManager";
import TechSlideDataFoundation from "@/components/tech-slides/TechSlideDataFoundation";

// Intelligence & Orchestration
import TechSlide7CoAnalyst from "@/components/tech-slides/TechSlide7CoAnalyst";
import TechSlideInsights from "@/components/tech-slides/TechSlideInsights";
import TechSlideAutomation from "@/components/tech-slides/TechSlideAutomation";
import TechSlideTiersVsAI from "@/components/tech-slides/TechSlideTiersVsAI";

// Delivery & operating model
import TechSlideMobile from "@/components/tech-slides/TechSlideMobile";
import TechSlide5DTOP from "@/components/tech-slides/TechSlide5DTOP";
import TechSlideUseCases from "@/components/tech-slides/TechSlideUseCases";
import TechSlide6PlatformIntegrations from "@/components/tech-slides/TechSlide6PlatformIntegrations";

// Regulation Solution section (cloned from RM playbook)
import RMSlide0Title from "@/components/regmgmt-slides/RMSlide0Title";
import RMSlide1Overview from "@/components/regmgmt-slides/RMSlide1Overview";
import RMSlide2Problem from "@/components/regmgmt-slides/RMSlide2Problem";
import RMSlide4ValuePillars from "@/components/regmgmt-slides/RMSlide4ValuePillars";
import RMSlide5HowItWorks from "@/components/regmgmt-slides/RMSlide5HowItWorks";
import RMSlide6UseCases from "@/components/regmgmt-slides/RMSlide6UseCases";

// Value & close
import TechSlideCalculator from "@/components/tech-slides/TechSlideCalculator";
import TechSlide14MaturityRoadmap from "@/components/tech-slides/TechSlide14MaturityRoadmap";
import TechSlide15Roadmap2026 from "@/components/tech-slides/TechSlide15Roadmap2026";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import TechSlideWhyOnlyComply365 from "@/components/tech-slides/TechSlideWhyOnlyComply365";
import TechSlideCTA from "@/components/tech-slides/TechSlideCTA";

// Layer dividers — one per architecture layer, slotted before each layer's deep-dive group
import TechSlideLayerDivider from "@/components/tech-slides/TechSlideLayerDivider";
// Journey-ahead dividers — for non-architectural roadmap sections
import TechSlideJourneyDivider from "@/components/tech-slides/TechSlideJourneyDivider";

const dividerProps = {
  core: {
    layerNumber: 1, layerName: "Core Operational Apps",
    tagline: "ContentManager365 · TrainingManager365 · SafetyManager365 — the systems of record that emit every operational event.",
    active: "core" as const,
    upNext: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
  data: {
    layerNumber: 2, layerName: "Operational Data Foundation",
    tagline: "One unified data lake, taxonomy, knowledge graph and aviation LLMs — the substrate every layer reasons over.",
    active: "data" as const,
    upNext: ["The Operational Data Foundation"],
  },
  intelligence: {
    layerNumber: 3, layerName: "Intelligence & Orchestration",
    tagline: "Insights & Intelligence · Recommendations & Prescriptive Actions · Automation — turning data into action.",
    active: "intelligence" as const,
    upNext: [
      "Insights & Intelligence",
      "Recommendations & Prescriptive Actions",
      "Automation",
      "Tiers vs Generic AI",
    ],
  },
  mobile: {
    layerNumber: 4, layerName: "Unified Mobile Experience",
    tagline: "One trusted shell for the frontline — Procedures, Training and Safety in a single app.",
    active: "mobile" as const,
    upNext: ["Unified Mobile"],
  },
  dtop: {
    layerNumber: 5, layerName: "DTOP — The System of Work",
    tagline: "Detect → Trigger → Orchestrate → Prove. The operating model that wraps the whole stack.",
    active: "dtop" as const,
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
  { id: "tech-slide-0", label: "Title", component: TechSlide0Title },
  { id: "tech-slide-1", label: "Strategic Shift", component: TechSlide1StrategicShift },
  { id: "tech-slide-2", label: "Industry Challenge", component: TechSlide2IndustryChallenge },
  { id: "tech-slide-why-exists", label: "Why It Exists", component: TechSlideWhyExists },
  { id: "tech-slide-3b-platform-snapshot", label: "Platform Snapshot", component: TechSlidePlatformSnapshot },
  // Architecture
  { id: "tech-slide-4", label: "Platform Overview", component: TechSlide4Platform },
  { id: "tech-divider-core", label: "▸ Layer 1 · Core Apps", component: TechSlideLayerDivider, dividerProps: dividerProps.core },
  { id: "tech-slide-4a", label: "L1 · SafetyManager365", component: TechSlide4aSafetyManager },
  { id: "tech-slide-4b", label: "L1 · ContentManager365", component: TechSlide4bContentManager },
  { id: "tech-slide-4c", label: "L1 · TrainingManager365", component: TechSlide4cTrainingManager },
  { id: "tech-divider-data", label: "▸ Layer 2 · Data Foundation", component: TechSlideLayerDivider, dividerProps: dividerProps.data },
  { id: "tech-slide-data-foundation", label: "L2 · Data Foundation", component: TechSlideDataFoundation },
  // Intelligence & Orchestration
  { id: "tech-divider-intelligence", label: "▸ Layer 3 · Intelligence & Orchestration", component: TechSlideLayerDivider, dividerProps: dividerProps.intelligence },
  { id: "tech-slide-coanalyst", label: "L3 · Insights & Intelligence", component: TechSlide7CoAnalyst },
  { id: "tech-slide-insights", label: "L3 · Recommendations & Prescriptive Actions", component: TechSlideInsights },
  { id: "tech-slide-automation", label: "L3 · Automation", component: TechSlideAutomation },
  { id: "tech-slide-tiers-vs-ai", label: "L3 · Tiers vs Generic AI", component: TechSlideTiersVsAI },
  { id: "tech-divider-mobile", label: "▸ Layer 4 · Unified Mobile", component: TechSlideLayerDivider, dividerProps: dividerProps.mobile },
  { id: "tech-slide-mobile", label: "L4 · Unified Mobile", component: TechSlideMobile },
  // Delivery & operating model
  { id: "tech-divider-dtop", label: "▸ Layer 5 · DTOP", component: TechSlideLayerDivider, dividerProps: dividerProps.dtop },
  { id: "tech-slide-5", label: "L5 · DTOP", component: TechSlide5DTOP },
  { id: "tech-slide-use-cases", label: "Use Cases", component: TechSlideUseCases },
  { id: "tech-slide-6", label: "Platform Integrations", component: TechSlide6PlatformIntegrations },
  // Regulation Solution sub-section
  { id: "tech-rm-title", label: "▸ Regulation Solution", component: RMSlide0Title },
  { id: "tech-rm-overview", label: "RM · Solution Overview", component: RMSlide1Overview },
  { id: "tech-rm-problem", label: "RM · The Problem Today", component: RMSlide2Problem },
  { id: "tech-rm-value", label: "RM · Value Pillars", component: RMSlide4ValuePillars },
  { id: "tech-rm-how", label: "RM · How It Works", component: RMSlide5HowItWorks },
  { id: "tech-rm-uc", label: "RM · Use Cases", component: RMSlide6UseCases },
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

const TechnicalDeepDive = () => {
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

  // Stop narration when leaving this deck
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
    <DeckProvider deckId="tech-deep-dive">
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
    </DeckProvider>
  );
};

export default TechnicalDeepDive;
