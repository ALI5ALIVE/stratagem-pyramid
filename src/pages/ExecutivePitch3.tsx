import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useExec3PitchNarration } from "@/hooks/useExec3PitchNarration";

import TechSlideOpener from "@/components/tech-slides/TechSlideOpener";
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import TechSlideLayerDivider from "@/components/tech-slides/TechSlideLayerDivider";
import Slide4Transformation from "@/components/slides/Slide4Transformation";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import TechV4PlatformOverview from "@/components/tech-slides/v4/TechV4PlatformOverview";
import TechV4Slide7CoAnalyst from "@/components/tech-slides/v4/TechV4Slide7CoAnalyst";
import TechV4SlideInsights from "@/components/tech-slides/v4/TechV4SlideInsights";
import TechV4SlideAutomation from "@/components/tech-slides/v4/TechV4SlideAutomation";
import TechV4SlideTiersVsAI from "@/components/tech-slides/v4/TechV4SlideTiersVsAI";
import TechV4SlideMobile from "@/components/tech-slides/v4/TechV4SlideMobile";
import TechV4Slide5DTOP from "@/components/tech-slides/v4/TechV4Slide5DTOP";
import TechSlideRegulationSummary from "@/components/tech-slides/TechSlideRegulationSummary";
import TechSlide15Roadmap2026 from "@/components/tech-slides/TechSlide15Roadmap2026";

const dividerProps = {
  intelligence: {
    layerName: "Intelligence & Orchestration",
    tagline:
      "Automation · Insights & Intelligence · CoAnalyst (Recommendations & Prescriptive Actions) — turning operational data into action.",
    active: "intelligence" as const,
    hideLayerNumber: true,
    platformGroupLabel: "The Platform · Part of One Integrated Solution",
    upNext: ["Automation", "Insights & Recommendations", "CoAnalyst", "CoAnalyst vs Generic AI"],
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

const slides = [
  { id: "exec3-slide-0", label: "Title", component: TechSlideOpener },
  { id: "exec3-slide-1", label: "Strategic Shift", component: TechSlide1StrategicShift },
  { id: "exec3-slide-2", label: "Industry Challenge", component: TechSlide2IndustryChallenge },
  { id: "exec3-slide-platform", label: "The Platform", component: TechV4PlatformOverview },
  { id: "exec3-divider-intelligence", label: "▸ Intelligence Layer", component: TechSlideLayerDivider, dividerProps: dividerProps.intelligence },
  { id: "exec3-slide-automation", label: "Automation", component: TechV4SlideAutomation },
  { id: "exec3-slide-insights", label: "Insights & Recommendations", component: TechV4SlideInsights },
  { id: "exec3-slide-coanalyst", label: "CoAnalyst", component: TechV4Slide7CoAnalyst },
  { id: "exec3-slide-tiers-vs-ai", label: "CoAnalyst vs Generic AI", component: TechV4SlideTiersVsAI },
  { id: "exec3-divider-mobile", label: "▸ Mobile", component: TechSlideLayerDivider, dividerProps: dividerProps.mobile },
  { id: "exec3-slide-mobile", label: "Unified Mobile", component: TechV4SlideMobile },
  { id: "exec3-divider-dtop", label: "▸ DTOP", component: TechSlideLayerDivider, dividerProps: dividerProps.dtop },
  { id: "exec3-slide-dtop", label: "DTOP — System of Work", component: TechV4Slide5DTOP },
  { id: "exec3-slide-regulation", label: "Regulation Management", component: TechSlideRegulationSummary },
  { id: "exec3-slide-transformation", label: "The Transformation", component: Slide4Transformation },
  { id: "exec3-slide-roadmap-2026", label: "2026 Phased Roadmap", component: TechSlide15Roadmap2026 },
  { id: "exec3-slide-outcomes", label: "Customer Outcomes", component: CustomerOutcomesSlide },
  { id: "exec3-slide-why", label: "Why Comply365", component: TechSlideWhyComply },
];

const ExecutivePitch3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = useExec3PitchNarration();

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
              {...(index === 0
                ? {
                    exportSlides: slides,
                    pptxDeckId: "executive-pitch-3" as const,
                    pdfFilename: "Comply365-Executive-Pitch-Medium.pdf",
                    deckLabel: "Executive Pitch · Medium",
                  }
                : {})}
              {...narrationProps}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExecutivePitch3;