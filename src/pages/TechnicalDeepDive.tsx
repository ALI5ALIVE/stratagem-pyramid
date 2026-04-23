import { useState, useEffect, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useTechPitchNarration } from "@/hooks/useTechPitchNarration";
import { DeckProvider } from "@/contexts/DeckContext";

// Act 1 — Frame the problem
import TechSlide0Title from "@/components/tech-slides/TechSlide0Title";
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";

// Act 2 — Architecture
import TechSlide4Platform from "@/components/tech-slides/TechSlide4Platform";
import TechSlide4aSafetyManager from "@/components/tech-slides/TechSlide4aSafetyManager";
import TechSlide4bContentManager from "@/components/tech-slides/TechSlide4bContentManager";
import TechSlide4cTrainingManager from "@/components/tech-slides/TechSlide4cTrainingManager";
import TechSlideDataFoundation from "@/components/tech-slides/TechSlideDataFoundation";

// Act 3 — Intelligence layer
import TechSlide7CoAnalyst from "@/components/tech-slides/TechSlide7CoAnalyst";
import TechSlideInsights from "@/components/tech-slides/TechSlideInsights";
import TechSlideAutomation from "@/components/tech-slides/TechSlideAutomation";
import TechSlideTiersVsAI from "@/components/tech-slides/TechSlideTiersVsAI";

// Act 4 — Delivery & operating model
import TechSlideMobile from "@/components/tech-slides/TechSlideMobile";
import TechSlide5DTOP from "@/components/tech-slides/TechSlide5DTOP";
import TechSlideUseCases from "@/components/tech-slides/TechSlideUseCases";
import TechSlide6PlatformIntegrations from "@/components/tech-slides/TechSlide6PlatformIntegrations";

// Act 5 — Value & close
import TechSlideCalculator from "@/components/tech-slides/TechSlideCalculator";
import TechSlide14MaturityRoadmap from "@/components/tech-slides/TechSlide14MaturityRoadmap";
import TechSlide15Roadmap2026 from "@/components/tech-slides/TechSlide15Roadmap2026";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import TechSlide18Partnership from "@/components/tech-slides/TechSlide18Partnership";

const slides = [
  // Act 1
  { id: "tech-slide-0", label: "Title", component: TechSlide0Title },
  { id: "tech-slide-1", label: "Strategic Shift", component: TechSlide1StrategicShift },
  { id: "tech-slide-2", label: "Industry Challenge", component: TechSlide2IndustryChallenge },
  // Act 2 — Architecture
  { id: "tech-slide-4", label: "Platform Overview", component: TechSlide4Platform },
  { id: "tech-slide-4a", label: "SafetyManager365", component: TechSlide4aSafetyManager },
  { id: "tech-slide-4b", label: "ContentManager365", component: TechSlide4bContentManager },
  { id: "tech-slide-4c", label: "TrainingManager365", component: TechSlide4cTrainingManager },
  { id: "tech-slide-data-foundation", label: "Data Foundation", component: TechSlideDataFoundation },
  // Act 3 — Intelligence
  { id: "tech-slide-coanalyst", label: "Insights & Intelligence", component: TechSlide7CoAnalyst },
  { id: "tech-slide-insights", label: "Recommendations & Prescriptive Actions", component: TechSlideInsights },
  { id: "tech-slide-automation", label: "Automation", component: TechSlideAutomation },
  { id: "tech-slide-mobile", label: "Unified Mobile", component: TechSlideMobile },
  // Act 4 — Delivery & operating model
  { id: "tech-slide-5", label: "DTOP Operating Model", component: TechSlide5DTOP },
  { id: "tech-slide-tiers-vs-ai", label: "Tiers vs Generic AI", component: TechSlideTiersVsAI },
  { id: "tech-slide-use-cases", label: "Use Cases", component: TechSlideUseCases },
  { id: "tech-slide-6", label: "Platform Integrations", component: TechSlide6PlatformIntegrations },
  // Act 5 — Value & close
  { id: "tech-slide-calculator", label: "Line of Sight Calculator", component: TechSlideCalculator },
  { id: "tech-slide-14", label: "Maturity Roadmap", component: TechSlide14MaturityRoadmap },
  { id: "tech-slide-15", label: "2026 Roadmap", component: TechSlide15Roadmap2026 },
  { id: "tech-slide-why-comply", label: "Why Comply365", component: TechSlideWhyComply },
  { id: "tech-slide-18", label: "Partnership", component: TechSlide18Partnership },
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
