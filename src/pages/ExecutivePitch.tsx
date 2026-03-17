import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";

import ExecSlide0Title from "@/components/exec-slides/ExecSlide0Title";
import ExecSlide1Problem from "@/components/exec-slides/ExecSlide1Problem";
import ExecSlide2Shift from "@/components/exec-slides/ExecSlide2Shift";
import ExecSlide3DTOP from "@/components/exec-slides/ExecSlide3DTOP";
import ExecSlide4Intelligence from "@/components/exec-slides/ExecSlide4Intelligence";
import ExecSlide5Value from "@/components/exec-slides/ExecSlide5Value";
import ExecSlide6WhyUs from "@/components/exec-slides/ExecSlide6WhyUs";

const slides = [
  { id: "exec-slide-0", label: "Title", component: ExecSlide0Title },
  { id: "exec-slide-1", label: "The $47M Problem", component: ExecSlide1Problem },
  { id: "exec-slide-2", label: "The Shift", component: ExecSlide2Shift },
  { id: "exec-slide-3", label: "How It Works", component: ExecSlide3DTOP },
  { id: "exec-slide-4", label: "Intelligence Layer", component: ExecSlide4Intelligence },
  { id: "exec-slide-5", label: "Line of Sight", component: ExecSlide5Value },
  { id: "exec-slide-6", label: "Why Comply365", component: ExecSlide6WhyUs },
];

const ExecutivePitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();

  const navigateToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slideElement = document.getElementById(slides[index].id);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
    }
  }, []);

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
        setCurrentSlide(newSlide);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentSlide, open, setOpen]);

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

  return (
    <div className="relative min-h-screen bg-background">
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {slides.map((slide, index) => {
          const SlideComponent = slide.component;
          return (
            <SlideComponent
              key={slide.id}
              slideNumber={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExecutivePitch;
