import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGlobalDataNarration } from "@/hooks/useGlobalDataNarration";
import GDSlide0Title from "@/components/globaldata-slides/GDSlide0Title";
import GDSlide1GrowthReality from "@/components/globaldata-slides/GDSlide1GrowthReality";
import GDSlide2IntelligenceGap from "@/components/globaldata-slides/GDSlide2IntelligenceGap";
import GDSlide3BeforeAfter from "@/components/globaldata-slides/GDSlide3BeforeAfter";
import GDSlide4Proposition from "@/components/globaldata-slides/GDSlide4Proposition";
import GDSlide5ValueChain from "@/components/globaldata-slides/GDSlide5ValueChain";
import GDSlide6ValuePyramid from "@/components/globaldata-slides/GDSlide6ValuePyramid";
import GDSlide7MaturityCurve from "@/components/globaldata-slides/GDSlide7MaturityCurve";
import GDSlide8ROI from "@/components/globaldata-slides/GDSlide8ROI";
import GDSlide9WhyGlobalData from "@/components/globaldata-slides/GDSlide9WhyGlobalData";

const slides = [
  { id: "gd-slide-0", label: "Title" },
  { id: "gd-slide-1", label: "Growth Reality" },
  { id: "gd-slide-2", label: "Intelligence Gap" },
  { id: "gd-slide-3", label: "Before & After" },
  { id: "gd-slide-4", label: "The Proposition" },
  { id: "gd-slide-5", label: "Value Chain" },
  { id: "gd-slide-6", label: "Value Pyramid" },
  { id: "gd-slide-7", label: "Maturity Roadmap" },
  { id: "gd-slide-8", label: "ROI" },
  { id: "gd-slide-9", label: "Why GlobalData" },
];

const GlobalDataDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const narration = useGlobalDataNarration();

  // Helper to get narration props for a slide
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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress * 100);

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
    
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      const slideHeight = containerRef.current.clientHeight;
      
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        const nextSlide = Math.min(activeSlide + 1, slides.length - 1);
        containerRef.current.scrollTo({
          top: nextSlide * slideHeight,
          behavior: "smooth",
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevSlide = Math.max(activeSlide - 1, 0);
        containerRef.current.scrollTo({
          top: prevSlide * slideHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide]);

  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slideHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * slideHeight,
      behavior: "smooth",
    });
  }, []);

  const navigateSlide = (direction: "up" | "down") => {
    if (direction === "up" && activeSlide > 0) {
      scrollToSlide(activeSlide - 1);
    } else if (direction === "down" && activeSlide < slides.length - 1) {
      scrollToSlide(activeSlide + 1);
    }
  };

  return (
    <div className="h-screen w-screen bg-background overflow-hidden relative">
      {/* Progress bar - emerald theme */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          className="h-full bg-emerald-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-1 left-0 right-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <span className="text-xs text-muted-foreground">
            {activeSlide + 1} / {slides.length}
          </span>
        </div>
      </header>

      {/* Slide navigation dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => scrollToSlide(index)}
            className="group relative flex items-center justify-end transition-all duration-200"
          >
            <span className={`
              absolute right-5 whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity
              ${activeSlide === index ? 'text-emerald-400' : 'text-muted-foreground'}
            `}>
              {slide.label}
            </span>
            <div
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${activeSlide === index
                  ? "bg-emerald-500 scale-150"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}
              `}
            />
          </button>
        ))}
      </nav>

      {/* Navigation arrows */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <button
          onClick={() => navigateSlide("up")}
          disabled={activeSlide === 0}
          className="w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigateSlide("down")}
          disabled={activeSlide === slides.length - 1}
          className="w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Slides container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        <GDSlide0Title onNavigateToSlide={scrollToSlide} {...getNarrationProps(0)} />
        <GDSlide1GrowthReality {...getNarrationProps(1)} />
        <GDSlide2IntelligenceGap {...getNarrationProps(2)} />
        <GDSlide3BeforeAfter {...getNarrationProps(3)} />
        <GDSlide4Proposition {...getNarrationProps(4)} />
        <GDSlide5ValueChain {...getNarrationProps(5)} />
        <GDSlide6ValuePyramid {...getNarrationProps(6)} />
        <GDSlide7MaturityCurve {...getNarrationProps(7)} />
        <GDSlide8ROI {...getNarrationProps(8)} />
        <GDSlide9WhyGlobalData {...getNarrationProps(9)} />
      </div>
    </div>
  );
};

export default GlobalDataDeck;
