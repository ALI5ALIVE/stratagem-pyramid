import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useExecPitch2Narration } from "@/hooks/useExecPitch2Narration";

import ExecSlide0Title from "@/components/exec-slides/ExecSlide0Title";
import Exec2Slide1Before from "@/components/exec2-slides/Exec2Slide1Before";
import Exec2Slide2After from "@/components/exec2-slides/Exec2Slide2After";
import Slide3OperatingModel from "@/components/slides/Slide3OperatingModel";
import ExecSlide3Platform from "@/components/exec-slides/ExecSlide3Platform";
import SlideUseCases from "@/components/slides/SlideUseCases";
import Slide4Transformation from "@/components/slides/Slide4Transformation";
import Slide4ValuePyramid from "@/components/slides/Slide4ValuePyramid";
import SlideAIVision from "@/components/slides/SlideAIVision";
import Slide5MaturityCurve from "@/components/slides/Slide5MaturityCurve";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";

const slides = [
  { id: "exec2-slide-0", label: "Title", component: ExecSlide0Title },
  { id: "exec2-slide-1", label: "Before", component: Exec2Slide1Before },
  { id: "exec2-slide-2", label: "The After", component: Exec2Slide2After },
  { id: "exec2-slide-3", label: "DTOP Operating Model", component: Slide3OperatingModel },
  { id: "exec2-slide-4", label: "The Platform", component: ExecSlide3Platform },
  { id: "exec2-slide-5", label: "Use Cases in Action", component: SlideUseCases },
  { id: "exec2-slide-6", label: "The Transformation", component: Slide4Transformation },
  { id: "exec2-slide-7", label: "Performance Ladder", component: Slide4ValuePyramid },
  { id: "exec2-slide-8", label: "Intelligence Journey", component: SlideAIVision },
  { id: "exec2-slide-9", label: "Maturity Roadmap", component: Slide5MaturityCurve },
  { id: "exec2-slide-10", label: "Customer Outcomes", component: CustomerOutcomesSlide },
];

const ExecutivePitch2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = useExecPitch2Narration();

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

          return (
            <SlideComponent
              key={slide.id}
              slideNumber={index}
              {...narrationProps}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExecutivePitch2;
