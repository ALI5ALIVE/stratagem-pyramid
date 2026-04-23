import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useExecPitch2Narration } from "@/hooks/useExecPitch2Narration";

import ExecSlide0Title from "@/components/exec-slides/ExecSlide0Title";
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import TechSlide4Platform from "@/components/tech-slides/TechSlide4Platform";
import TechSlideLayerDivider from "@/components/tech-slides/TechSlideLayerDivider";
import TechSlide7CoAnalyst from "@/components/tech-slides/TechSlide7CoAnalyst";
import TechSlide5DTOP from "@/components/tech-slides/TechSlide5DTOP";
import Slide4Transformation from "@/components/slides/Slide4Transformation";
import SlideUseCases from "@/components/slides/SlideUseCases";
import Slide5MaturityCurve from "@/components/slides/Slide5MaturityCurve";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import TechSlide6Capabilities from "@/components/tech-slides/TechSlide6Capabilities";
import TechSlideDataFoundation from "@/components/tech-slides/TechSlideDataFoundation";
import TechSlideMobile from "@/components/tech-slides/TechSlideMobile";
import ExecCoreAppsSummary from "@/components/exec-slides/ExecCoreAppsSummary";

const dividerProps = {
  core: {
    layerNumber: 1,
    layerName: "Core Operational Apps",
    tagline:
      "Table stakes — the system of record. ContentManager365 · TrainingManager365 · SafetyManager365 — built right, so the layers above can do something new.",
    active: "core" as const,
    upNext: ["Core Operational Apps summary"],
  },
  data: {
    layerNumber: 2,
    layerName: "Operational Data Foundation",
    tagline:
      "One unified data lake — the substrate every layer above reasons over. No silos, no exports, no reconciliation.",
    active: "data" as const,
    upNext: ["Operational Data Foundation"],
  },
  intelligence: {
    layerNumber: 3,
    layerName: "Intelligence & Orchestration",
    tagline:
      "Insights & Intelligence · Recommendations & Prescriptive Actions · Automation — turning data into action.",
    active: "intelligence" as const,
    upNext: ["Insights & Intelligence"],
  },
  mobile: {
    layerNumber: 4,
    layerName: "Unified Mobile Experience",
    tagline:
      "One trusted shell for the frontline — Content, Training and Safety in a single app the crew already uses every shift.",
    active: "mobile" as const,
    upNext: ["Unified Mobile Experience"],
  },
  dtop: {
    layerNumber: 5,
    layerName: "DTOP — The System of Work",
    tagline:
      "Detect → Trigger → Orchestrate → Prove. The operating model that wraps the whole stack.",
    active: "dtop" as const,
    upNext: ["DTOP Operating Model"],
  },
};

const slides = [
  { id: "exec3-slide-0", label: "Title", component: ExecSlide0Title },
  { id: "exec3-slide-1", label: "Strategic Shift", component: TechSlide1StrategicShift },
  { id: "exec3-slide-2", label: "Industry Challenge", component: TechSlide2IndustryChallenge },
  { id: "exec3-divider-core", label: "▸ Core Apps", component: TechSlideLayerDivider, dividerProps: dividerProps.core },
  { id: "exec3-slide-4", label: "The Platform", component: TechSlide4Platform },
  { id: "exec3-slide-core", label: "Core Operational Apps", component: TechSlide6Capabilities },
  { id: "exec3-slide-core-modules", label: "Content · Safety · Training", component: ExecCoreAppsSummary },
  { id: "exec3-divider-data", label: "▸ Data Foundation", component: TechSlideLayerDivider, dividerProps: dividerProps.data },
  { id: "exec3-slide-data", label: "Operational Data Foundation", component: TechSlideDataFoundation },
  { id: "exec3-divider-intelligence", label: "▸ Intelligence Layer", component: TechSlideLayerDivider, dividerProps: dividerProps.intelligence },
  { id: "exec3-slide-intelligence", label: "Insights & Intelligence", component: TechSlide7CoAnalyst },
  { id: "exec3-divider-mobile", label: "▸ Mobile", component: TechSlideLayerDivider, dividerProps: dividerProps.mobile },
  { id: "exec3-slide-mobile", label: "Unified Mobile", component: TechSlideMobile },
  { id: "exec3-divider-dtop", label: "▸ DTOP", component: TechSlideLayerDivider, dividerProps: dividerProps.dtop },
  { id: "exec3-slide-dtop", label: "DTOP — System of Work", component: TechSlide5DTOP },
  { id: "exec3-slide-transformation", label: "The Transformation", component: Slide4Transformation },
  { id: "exec3-slide-usecases", label: "Use Cases in Action", component: SlideUseCases },
  { id: "exec3-slide-maturity", label: "Maturity Roadmap", component: Slide5MaturityCurve },
  { id: "exec3-slide-outcomes", label: "Customer Outcomes", component: CustomerOutcomesSlide },
  { id: "exec3-slide-why", label: "Why Comply365", component: TechSlideWhyComply },
];

const ExecutivePitch3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = useExecPitch2Narration();

  const navigateToSlide = useCallback((index: number) => {
    const slideElement = document.getElementById(slides[index].id);
    if (slideElement) {
      narration.stop();
      slideElement.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
    }
  }, [narration.stop]);

  useEffect(() => {
    return () => narration.stop();
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
        narration.stop();
        setCurrentSlide(newSlide);
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentSlide, open, setOpen, narration.stop]);

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

  const handleNextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) navigateToSlide(currentSlide + 1);
  }, [currentSlide, navigateToSlide]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlide > 0) navigateToSlide(currentSlide - 1);
  }, [currentSlide, navigateToSlide]);

  return (
    <div className="relative min-h-screen bg-background">
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
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
            <SlideComponent
              key={slide.id}
              slideNumber={index}
              id={slide.id}
              {...((slide as any).dividerProps ?? {})}
              {...(index === 0 ? { exportSlides: slides } : {})}
              {...narrationProps}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExecutivePitch3;