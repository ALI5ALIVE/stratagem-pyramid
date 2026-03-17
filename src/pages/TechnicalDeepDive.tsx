import { useState, useEffect, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";

import TechSlide0Title from "@/components/tech-slides/TechSlide0Title";
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import TechSlide3BeforeAfter from "@/components/tech-slides/TechSlide3BeforeAfter";
import TechSlide4Platform from "@/components/tech-slides/TechSlide4Platform";
import TechSlide4aSafetyManager from "@/components/tech-slides/TechSlide4aSafetyManager";
import TechSlide4bContentManager from "@/components/tech-slides/TechSlide4bContentManager";
import TechSlide4cTrainingManager from "@/components/tech-slides/TechSlide4cTrainingManager";
import TechSlide5DTOP from "@/components/tech-slides/TechSlide5DTOP";
import TechSlide6Capabilities from "@/components/tech-slides/TechSlide6Capabilities";
import TechSlide7CoAnalyst from "@/components/tech-slides/TechSlide7CoAnalyst";
import TechSlide8IntelligenceTiers from "@/components/tech-slides/TechSlide8IntelligenceTiers";
import TechSlide9VsGenericAI from "@/components/tech-slides/TechSlide9VsGenericAI";
import TechSlide10SafetyUseCases from "@/components/tech-slides/TechSlide10SafetyUseCases";
import TechSlide11OpsUseCases from "@/components/tech-slides/TechSlide11OpsUseCases";
import TechSlide12FinancialUseCases from "@/components/tech-slides/TechSlide12FinancialUseCases";
import TechSlide13LineOfSight from "@/components/tech-slides/TechSlide13LineOfSight";
import TechSlide14MaturityRoadmap from "@/components/tech-slides/TechSlide14MaturityRoadmap";
import TechSlide15Roadmap2026 from "@/components/tech-slides/TechSlide15Roadmap2026";
import TechSlide16Outcomes from "@/components/tech-slides/TechSlide16Outcomes";
import TechSlide17WhyUs from "@/components/tech-slides/TechSlide17WhyUs";
import TechSlide18Partnership from "@/components/tech-slides/TechSlide18Partnership";

const slides = [
  { id: "tech-slide-0", label: "Title", component: TechSlide0Title },
  { id: "tech-slide-1", label: "Strategic Shift", component: TechSlide1StrategicShift },
  { id: "tech-slide-2", label: "Industry Challenge", component: TechSlide2IndustryChallenge },
  { id: "tech-slide-3", label: "Before & After", component: TechSlide3BeforeAfter },
  { id: "tech-slide-4", label: "The Platform", component: TechSlide4Platform },
  { id: "tech-slide-5", label: "DTOP Architecture", component: TechSlide5DTOP },
  { id: "tech-slide-6", label: "Capabilities", component: TechSlide6Capabilities },
  { id: "tech-slide-7", label: "CoAnalyst Intelligence", component: TechSlide7CoAnalyst },
  { id: "tech-slide-8", label: "Intelligence Tiers", component: TechSlide8IntelligenceTiers },
  { id: "tech-slide-9", label: "vs Generic AI", component: TechSlide9VsGenericAI },
  { id: "tech-slide-10", label: "Safety Use Cases", component: TechSlide10SafetyUseCases },
  { id: "tech-slide-11", label: "Ops Use Cases", component: TechSlide11OpsUseCases },
  { id: "tech-slide-12", label: "Financial Use Cases", component: TechSlide12FinancialUseCases },
  { id: "tech-slide-13", label: "Line of Sight", component: TechSlide13LineOfSight },
  { id: "tech-slide-14", label: "Maturity Roadmap", component: TechSlide14MaturityRoadmap },
  { id: "tech-slide-15", label: "2026 Roadmap", component: TechSlide15Roadmap2026 },
  { id: "tech-slide-16", label: "Outcomes", component: TechSlide16Outcomes },
  { id: "tech-slide-17", label: "Why Comply365", component: TechSlide17WhyUs },
  { id: "tech-slide-18", label: "Partnership", component: TechSlide18Partnership },
];

const TechnicalDeepDive = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, updateActiveIndex } = useSlideNavigation();
  const { open, setOpen } = useSidebar();

  const navigateToSlide = useCallback((index: number) => {
    const el = document.getElementById(slides[index]?.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
    }
  }, []);

  useEffect(() => {
    register(
      slides.map((s) => ({ id: s.id, label: s.label })),
      currentSlide,
      navigateToSlide
    );
  }, [register, currentSlide, navigateToSlide]);

  useEffect(() => {
    updateActiveIndex(currentSlide);
  }, [currentSlide, updateActiveIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (open) setOpen(false);
      const scrollTop = container.scrollTop;
      const slideHeight = container.clientHeight;
      const index = Math.round(scrollTop / slideHeight);
      setCurrentSlide(Math.min(index, slides.length - 1));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [open, setOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {slides.map((slide, index) => {
        const SlideComponent = slide.component as React.ComponentType<any>;
        return (
          <div key={slide.id} className="snap-start">
            <SlideComponent
              slideNumber={index}
              onNavigateToSlide={index === 0 ? navigateToSlide : undefined}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TechnicalDeepDive;
