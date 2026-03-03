import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useSimpleNarration } from "@/hooks/useSimpleNarration";
import SlideContentStrategyTitle from "@/components/slides/SlideContentStrategyTitle";
import SlideStrategyOverview from "@/components/slides/SlideStrategyOverview";
import SlideOperatingModel from "@/components/slides/SlideOperatingModel";
import SlideBuyerJourney from "@/components/slides/SlideBuyerJourney";
import SlideContentStrategy from "@/components/slides/SlideContentStrategy";
import SlideContentArchitecture from "@/components/slides/SlideContentArchitecture";
import SlideContentInventory from "@/components/slides/SlideContentInventory";
import SlideSalesEnablement from "@/components/slides/SlideSalesEnablement";

const slides = [
  { id: "slide-cs-title", label: "Contents" },
  { id: "slide-strategy-overview", label: "Strategy Overview" },
  { id: "slide-operating-model", label: "Flying High Narrative" },
  { id: "slide-buyer-journey", label: "Content Journey" },
  { id: "slide-content-strategy", label: "Quarterly Strategy" },
  { id: "slide-content-architecture", label: "Content Architecture" },
  { id: "slide-content-inventory", label: "Content Inventory" },
  { id: "slide-sales-enablement", label: "Sales Enablement" },
];

const ContentStrategyPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
  });

  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slideHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * slideHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    register(slides, activeSlide, scrollToSlide);
    return () => unregister();
  }, []);

  useEffect(() => {
    updateActiveIndex(activeSlide);
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

  const navigateSlide = (direction: "up" | "down") => {
    if (direction === "up" && activeSlide > 0) scrollToSlide(activeSlide - 1);
    else if (direction === "down" && activeSlide < slides.length - 1) scrollToSlide(activeSlide + 1);
  };

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

      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <button onClick={() => navigateSlide("up")} disabled={activeSlide === 0} className="w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronUp className="w-5 h-5" />
        </button>
        <button onClick={() => navigateSlide("down")} disabled={activeSlide === slides.length - 1} className="w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      <div ref={containerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <SlideContentStrategyTitle {...getNarrationProps(0)} onNavigateToSlide={scrollToSlide} />
        <SlideStrategyOverview {...getNarrationProps(1)} />
        <SlideOperatingModel {...getNarrationProps(2)} />
        <SlideBuyerJourney {...getNarrationProps(3)} />
        <SlideContentStrategy {...getNarrationProps(4)} />
        <SlideContentArchitecture {...getNarrationProps(5)} />
        <SlideContentInventory {...getNarrationProps(6)} />
        <SlideSalesEnablement {...getNarrationProps(7)} />
      </div>
    </div>
  );
};

export default ContentStrategyPage;
