import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSimpleNarration } from "@/hooks/useSimpleNarration";
import Slide0Title from "@/components/slides/Slide0Title";
import Slide1StrategicShift from "@/components/slides/Slide1StrategicShift";
import Slide2BeforeAfter from "@/components/slides/Slide2BeforeAfter";
import Slide3OperatingModel from "@/components/slides/Slide3OperatingModel";
import Slide4PlatformCapabilities from "@/components/slides/SlidePlatformCapabilities";
import Slide5Transformation from "@/components/slides/Slide4Transformation";
import Slide6ValuePyramid from "@/components/slides/Slide4ValuePyramid";
import Slide7MaturityCurve from "@/components/slides/Slide5MaturityCurve";
import Slide8PositioningMap from "@/components/slides/Slide8PositioningMap";
import Slide9Customers from "@/components/slides/Slide7Customers";
import Slide10Investors from "@/components/slides/Slide6Investors";
import SlideMessagingHouse from "@/components/slides/SlideMessagingHouse";
import SlideCampaignIdeas from "@/components/slides/SlideCampaignIdeas";
import SlideAIVision from "@/components/slides/SlideAIVision";
import SlideMessagingContext from "@/components/slides/SlideMessagingContext";
import SlidePlatformExperience from "@/components/slides/SlidePlatformExperience";

const slides = [
  { id: "slide-0", label: "Title" },
  { id: "slide-1", label: "Strategic Shift" },
  { id: "slide-2", label: "Before & After" },
  { id: "slide-3", label: "Operating Model" },
  { id: "slide-4", label: "Platform Capabilities" },
  { id: "slide-5", label: "Transformation" },
  { id: "slide-6", label: "Operational Performance Ladder" },
  { id: "slide-7", label: "Operational Performance Roadmap" },
  { id: "slide-8", label: "Positioning" },
  { id: "slide-9", label: "Customers" },
  { id: "slide-10", label: "Investors" },
  { id: "slide-11", label: "AI Vision & Future" },
  { id: "slide-12", label: "Messaging House" },
  { id: "slide-13", label: "Campaign Ideas" },
  { id: "slide-14", label: "Messaging in Context" },
  { id: "slide-15", label: "Platform Experience" },
];

const SlideDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const narration = useSimpleNarration();

  // Helper to get narration props for a slide
  const getNarrationProps = (slideId: number) => ({
    isPlaying: narration.currentSlide === slideId && narration.isPlaying,
    isLoading: narration.currentSlide === slideId && narration.isLoading,
    progress: narration.currentSlide === slideId ? narration.progress : 0,
    hasCompleted: narration.currentSlide === slideId && narration.hasCompleted,
    onPlay: () => {
      narration.play(slideId);
      // Preload next slide's audio in background
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
    
    // Set initial active slide on mount
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
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          className="h-full bg-primary transition-all duration-150"
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
              ${activeSlide === index ? 'text-primary' : 'text-muted-foreground'}
            `}>
              {slide.label}
            </span>
            <div
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${activeSlide === index
                  ? "bg-primary scale-150"
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
          className="w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigateSlide("down")}
          disabled={activeSlide === slides.length - 1}
          className="w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Slides container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        <Slide0Title onNavigateToSlide={scrollToSlide} {...getNarrationProps(0)} />
        <Slide1StrategicShift {...getNarrationProps(1)} />
        <Slide2BeforeAfter {...getNarrationProps(2)} />
        <Slide3OperatingModel {...getNarrationProps(3)} />
        <Slide4PlatformCapabilities {...getNarrationProps(4)} />
        <Slide5Transformation {...getNarrationProps(5)} />
        <Slide6ValuePyramid {...getNarrationProps(6)} />
        <Slide7MaturityCurve {...getNarrationProps(7)} />
        <Slide8PositioningMap {...getNarrationProps(8)} />
        <Slide9Customers {...getNarrationProps(9)} />
        <Slide10Investors {...getNarrationProps(10)} />
        <SlideAIVision {...getNarrationProps(11)} />
        <SlideMessagingHouse {...getNarrationProps(12)} />
        <SlideCampaignIdeas {...getNarrationProps(13)} />
        <SlideMessagingContext {...getNarrationProps(14)} />
        <SlidePlatformExperience />
      </div>
    </div>
  );
};

export default SlideDeck;
