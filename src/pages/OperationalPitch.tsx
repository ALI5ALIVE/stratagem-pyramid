import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useOpsPitchNarration } from "@/hooks/useOpsPitchNarration";

import OpsSlide0Title from "@/components/ops-slides/OpsSlide0Title";
import OpsSlide1DailyReality from "@/components/ops-slides/OpsSlide1DailyReality";
import OpsSlide2CostOfFragmentation from "@/components/ops-slides/OpsSlide2CostOfFragmentation";
import OpsSlide3BeforeAfter from "@/components/ops-slides/OpsSlide3BeforeAfter";
import OpsSlide4DTOP from "@/components/ops-slides/OpsSlide4DTOP";
import OpsSlide5Intelligence from "@/components/ops-slides/OpsSlide5Intelligence";

import OpsSlide7SteppingStones from "@/components/ops-slides/OpsSlide7SteppingStones";
import OpsSlide8MaturityRoadmap from "@/components/ops-slides/OpsSlide8MaturityRoadmap";
import OpsSlide9Outcomes from "@/components/ops-slides/OpsSlide9Outcomes";
import OpsSlide10WhyUs from "@/components/ops-slides/OpsSlide10WhyUs";
import OpsSlide11GettingStarted from "@/components/ops-slides/OpsSlide11GettingStarted";

const slides = [
  { id: "ops-slide-0", label: "Title", component: OpsSlide0Title },
  { id: "ops-slide-1", label: "Your Daily Reality", component: OpsSlide1DailyReality },
  { id: "ops-slide-2", label: "Cost of Fragmentation", component: OpsSlide2CostOfFragmentation },
  { id: "ops-slide-3", label: "Before & After", component: OpsSlide3BeforeAfter },
  { id: "ops-slide-4", label: "DTOP + Platform", component: OpsSlide4DTOP },
  { id: "ops-slide-5", label: "Intelligence Layer — CoAnalyst", component: OpsSlide5Intelligence },
  { id: "ops-slide-6", label: "Near-Term Use Cases", component: OpsSlide6NearTermUseCases },
  { id: "ops-slide-7", label: "Stepping Stones", component: OpsSlide7SteppingStones },
  { id: "ops-slide-8", label: "Maturity Roadmap", component: OpsSlide8MaturityRoadmap },
  { id: "ops-slide-9", label: "Outcomes", component: OpsSlide9Outcomes },
  { id: "ops-slide-10", label: "Why Comply365", component: OpsSlide10WhyUs },
  { id: "ops-slide-11", label: "Getting Started", component: OpsSlide11GettingStarted },
];

const OperationalPitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = useOpsPitchNarration();

  const navigateToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slideElement = document.getElementById(slides[index].id);
    if (slideElement) {
      narration.stop();
      slideElement.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
    }
  }, [narration.stop]);

  // Stop narration when leaving this deck
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
    <div className="relative min-h-screen bg-background">
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {slides.map((slide, index) => {
          const SlideComponent = slide.component;
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

          return <SlideComponent key={slide.id} slideNumber={index} {...narrationProps} />;
        })}
      </div>
    </div>
  );
};

export default OperationalPitch;
