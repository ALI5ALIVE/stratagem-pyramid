import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useSimpleNarration } from "@/hooks/useSimpleNarration";
import SlideContentStrategyTitle from "@/components/slides/SlideContentStrategyTitle";
import SlideStrategyOverview from "@/components/slides/SlideStrategyOverview";
import SlideOperatingModel from "@/components/slides/SlideOperatingModel";
import SlideContentStrategy from "@/components/slides/SlideContentStrategy";
import SlideContentArchitecture from "@/components/slides/SlideContentArchitecture";
import SlideContentInventory from "@/components/slides/SlideContentInventory";
import SlideSalesEnablement from "@/components/slides/SlideSalesEnablement";

const slides = [
  { id: "slide-cs-title", label: "Contents" },
  { id: "slide-strategy-overview", label: "Strategy Overview" },
  { id: "slide-operating-model", label: "Messaging House" },
  { id: "slide-content-architecture", label: "Content Architecture" },
  { id: "slide-content-strategy", label: "Quarterly Strategy" },
  { id: "slide-sales-enablement", label: "Sales Enablement" },
  { id: "slide-content-inventory", label: "Content Inventory" },
];

const ContentStrategyPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const narration = useSimpleNarration();
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();

  const getNarrationProps = (slideId: number) => ({
    isPlaying: narration.currentSlide === slideId && narration.isPlaying,
    isLoading: narration.currentSlide === slideId && narration.isLoading,
    progress: narration.currentSlide === slideId ? narration.progress : 0,
    hasCompleted: narration.currentSlide === slideId && narration.hasCompleted,
    onPlay: () => {
      narration.play(slideId);
      narration.preloadNext(slideId);
    },
    onPause: () => narration.pause(),
    onNextSlide: slideId < slides.length - 1 ? () => scrollToSlide(slideId + 1) : undefined,
    onPrevSlide: slideId > 0 ? () => scrollToSlide(slideId - 1) : undefined,
  });

  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slideHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * slideHeight,
      behavior: "smooth",
    });
  }, []);

  // Stop narration when leaving this deck
  useEffect(() => {
    return () => narration.stop();
  }, []);

  useEffect(() => {
    register(slides, activeSlide, scrollToSlide);
    return () => unregister();
  }, []);

  // Auto-play narration with debounce for fast scrolling
  useEffect(() => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    narration.stop();
    autoPlayTimerRef.current = setTimeout(() => {
      narration.play(activeSlide);
      narration.preloadNext(activeSlide);
    }, 600);
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [activeSlide]);

  useEffect(() => {
  }, [activeSlide, updateActiveIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress * 100);

      if (open) setOpen(false);

      const slideHeight = containerRef.current.clientHeight;
      const currentSlide = Math.round(scrollTop / slideHeight);
      setActiveSlide(Math.min(currentSlide, slides.length - 1));
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    if (container) {
      const slideHeight = container.clientHeight;
      const currentSlide = Math.round(container.scrollTop / slideHeight);
      setActiveSlide(Math.min(currentSlide, slides.length - 1));
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const slideHeight = containerRef.current.clientHeight;
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        const next = Math.min(activeSlide + 1, slides.length - 1);
        containerRef.current.scrollTo({ top: next * slideHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(activeSlide - 1, 0);
        containerRef.current.scrollTo({ top: prev * slideHeight, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide]);

  return (
    <div className="h-screen w-full bg-background overflow-hidden relative">
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="fixed top-1 left-0 right-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <span className="text-xs text-muted-foreground">{activeSlide + 1} / {slides.length}</span>
        </div>
      </header>

      <div ref={containerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <SlideContentStrategyTitle {...getNarrationProps(0)} onNavigateToSlide={scrollToSlide} />
        <SlideStrategyOverview {...getNarrationProps(1)} />
        <SlideOperatingModel {...getNarrationProps(2)} />
        <SlideContentArchitecture {...getNarrationProps(3)} />
        <SlideContentStrategy {...getNarrationProps(4)} />
        <SlideSalesEnablement {...getNarrationProps(5)} />
        <SlideContentInventory {...getNarrationProps(6)} />
      </div>
    </div>
  );
};

export default ContentStrategyPage;
