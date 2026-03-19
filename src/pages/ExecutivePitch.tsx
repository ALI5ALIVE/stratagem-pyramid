import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useExecPitchNarration } from "@/hooks/useExecPitchNarration";

import ExecSlide0Title from "@/components/exec-slides/ExecSlide0Title";
import ExecSlide1Problem from "@/components/exec-slides/ExecSlide1Problem";
import ExecSlide2Shift from "@/components/exec-slides/ExecSlide2Shift";
import ExecSlide3Platform from "@/components/exec-slides/ExecSlide3Platform";
import ExecSlide4DTOP from "@/components/exec-slides/ExecSlide3DTOP";
import ExecSlide5Intelligence from "@/components/exec-slides/ExecSlide4Intelligence";
import ExecSlide6Value from "@/components/exec-slides/ExecSlide5Value";
import ExecSlide7WhyUs from "@/components/exec-slides/ExecSlide6WhyUs";

const slides = [
  { id: "exec-slide-0", label: "Title", component: ExecSlide0Title },
  { id: "exec-slide-1", label: "The $47M Problem", component: ExecSlide1Problem },
  { id: "exec-slide-2", label: "The Shift", component: ExecSlide2Shift },
  { id: "exec-slide-3", label: "How It Works", component: ExecSlide4DTOP },
  { id: "exec-slide-4", label: "The Platform", component: ExecSlide3Platform },
  { id: "exec-slide-5", label: "Intelligence Layer", component: ExecSlide5Intelligence },
  { id: "exec-slide-6", label: "Line of Sight", component: ExecSlide6Value },
  { id: "exec-slide-7", label: "Why Comply365", component: ExecSlide7WhyUs },
];

const ExecutivePitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = useExecPitchNarration();

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

  // Register slides with sidebar
  useEffect(() => {
    register(slides, currentSlide, navigateToSlide);
    return () => unregister();
  }, []);

  useEffect(() => {
    updateActiveIndex(currentSlide);
  }, [currentSlide, updateActiveIndex]);

  // Scroll tracking
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

  // Keyboard navigation
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

export default ExecutivePitch;
