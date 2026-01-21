import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useSlideNarration } from "@/hooks/useSlideNarration";
import NarrationControls from "@/components/NarrationControls";
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
import Slide11CategoryRationale from "@/components/slides/Slide9CategoryRationale";
import SlideMessagingHouse from "@/components/slides/SlideMessagingHouse";

const slides = [
  { id: "slide-0", label: "Title" },
  { id: "slide-1", label: "Strategic Shift" },
  { id: "slide-2", label: "Before & After" },
  { id: "slide-3", label: "Operating Model" },
  { id: "slide-4", label: "Platform Capabilities" },
  { id: "slide-5", label: "Transformation" },
  { id: "slide-6", label: "Readiness Ladder" },
  { id: "slide-7", label: "Operational Excellence Roadmap" },
  { id: "slide-8", label: "Positioning" },
  { id: "slide-9", label: "Customers" },
  { id: "slide-10", label: "Investors" },
  { id: "slide-11", label: "Category Name" },
  { id: "slide-12", label: "Messaging House" },
];

const SlideDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Narration hook for auto-play voiceover
  const narration = useSlideNarration(activeSlide);

  // Debounced slide setter - only updates after scroll settles
  const debouncedSetActiveSlide = useCallback((slide: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setActiveSlide(slide);
    }, 300);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress * 100);

      // Calculate active slide with debounce
      const slideHeight = containerRef.current.clientHeight;
      const currentSlide = Math.round(scrollTop / slideHeight);
      debouncedSetActiveSlide(Math.min(currentSlide, slides.length - 1));
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [debouncedSetActiveSlide]);

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

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const slideHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * slideHeight,
      behavior: "smooth",
    });
  };

  const navigateSlide = (direction: "up" | "down") => {
    if (direction === "up" && activeSlide > 0) {
      scrollToSlide(activeSlide - 1);
    } else if (direction === "down" && activeSlide < slides.length - 1) {
      scrollToSlide(activeSlide + 1);
    }
  };

  return (
    <div className="h-screen w-screen bg-background overflow-hidden relative">
      {/* Progress bar - Comply365 blue */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-1 left-0 right-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          
          <div className="text-center">
            <span className="text-xs text-muted-foreground">
              {activeSlide + 1} / {slides.length}
            </span>
          </div>

          <NarrationControls
            isPlaying={narration.isPlaying}
            isMuted={narration.isMuted}
            isLoading={narration.isLoading}
            progress={narration.progress}
            error={narration.error}
            onToggleMute={narration.toggleMute}
          />
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
        <Slide0Title 
          onNavigateToSlide={scrollToSlide}
          isActive={activeSlide === 0}
          isPlaying={narration.isPlaying && narration.currentSlide === 0}
          isLoading={narration.isLoading && narration.currentSlide === 0}
          progress={narration.currentSlide === 0 ? narration.progress : 0}
          onPlay={() => narration.playNarration(0)}
          onPause={narration.stopNarration}
        />
        <Slide1StrategicShift 
          isActive={activeSlide === 1}
          isPlaying={narration.isPlaying && narration.currentSlide === 1}
          isLoading={narration.isLoading && narration.currentSlide === 1}
          progress={narration.currentSlide === 1 ? narration.progress : 0}
          onPlay={() => narration.playNarration(1)}
          onPause={narration.stopNarration}
        />
        <Slide2BeforeAfter 
          isActive={activeSlide === 2}
          isPlaying={narration.isPlaying && narration.currentSlide === 2}
          isLoading={narration.isLoading && narration.currentSlide === 2}
          progress={narration.currentSlide === 2 ? narration.progress : 0}
          onPlay={() => narration.playNarration(2)}
          onPause={narration.stopNarration}
        />
        <Slide3OperatingModel 
          isActive={activeSlide === 3}
          isPlaying={narration.isPlaying && narration.currentSlide === 3}
          isLoading={narration.isLoading && narration.currentSlide === 3}
          progress={narration.currentSlide === 3 ? narration.progress : 0}
          onPlay={() => narration.playNarration(3)}
          onPause={narration.stopNarration}
        />
        <Slide4PlatformCapabilities 
          isActive={activeSlide === 4}
          isPlaying={narration.isPlaying && narration.currentSlide === 4}
          isLoading={narration.isLoading && narration.currentSlide === 4}
          progress={narration.currentSlide === 4 ? narration.progress : 0}
          onPlay={() => narration.playNarration(4)}
          onPause={narration.stopNarration}
        />
        <Slide5Transformation 
          isActive={activeSlide === 5}
          isPlaying={narration.isPlaying && narration.currentSlide === 5}
          isLoading={narration.isLoading && narration.currentSlide === 5}
          progress={narration.currentSlide === 5 ? narration.progress : 0}
          onPlay={() => narration.playNarration(5)}
          onPause={narration.stopNarration}
        />
        <Slide6ValuePyramid 
          isActive={activeSlide === 6}
          isPlaying={narration.isPlaying && narration.currentSlide === 6}
          isLoading={narration.isLoading && narration.currentSlide === 6}
          progress={narration.currentSlide === 6 ? narration.progress : 0}
          onPlay={() => narration.playNarration(6)}
          onPause={narration.stopNarration}
        />
        <Slide7MaturityCurve 
          isActive={activeSlide === 7}
          isPlaying={narration.isPlaying && narration.currentSlide === 7}
          isLoading={narration.isLoading && narration.currentSlide === 7}
          progress={narration.currentSlide === 7 ? narration.progress : 0}
          onPlay={() => narration.playNarration(7)}
          onPause={narration.stopNarration}
        />
        <Slide8PositioningMap 
          isActive={activeSlide === 8}
          isPlaying={narration.isPlaying && narration.currentSlide === 8}
          isLoading={narration.isLoading && narration.currentSlide === 8}
          progress={narration.currentSlide === 8 ? narration.progress : 0}
          onPlay={() => narration.playNarration(8)}
          onPause={narration.stopNarration}
        />
        <Slide9Customers 
          isActive={activeSlide === 9}
          isPlaying={narration.isPlaying && narration.currentSlide === 9}
          isLoading={narration.isLoading && narration.currentSlide === 9}
          progress={narration.currentSlide === 9 ? narration.progress : 0}
          onPlay={() => narration.playNarration(9)}
          onPause={narration.stopNarration}
        />
        <Slide10Investors 
          isActive={activeSlide === 10}
          isPlaying={narration.isPlaying && narration.currentSlide === 10}
          isLoading={narration.isLoading && narration.currentSlide === 10}
          progress={narration.currentSlide === 10 ? narration.progress : 0}
          onPlay={() => narration.playNarration(10)}
          onPause={narration.stopNarration}
        />
        <Slide11CategoryRationale 
          isActive={activeSlide === 11}
          isPlaying={narration.isPlaying && narration.currentSlide === 11}
          isLoading={narration.isLoading && narration.currentSlide === 11}
          progress={narration.currentSlide === 11 ? narration.progress : 0}
          onPlay={() => narration.playNarration(11)}
          onPause={narration.stopNarration}
        />
        <SlideMessagingHouse 
          isActive={activeSlide === 12}
          isPlaying={narration.isPlaying && narration.currentSlide === 12}
          isLoading={narration.isLoading && narration.currentSlide === 12}
          progress={narration.currentSlide === 12 ? narration.progress : 0}
          onPlay={() => narration.playNarration(12)}
          onPause={narration.stopNarration}
        />
      </div>
    </div>
  );
};

export default SlideDeck;
