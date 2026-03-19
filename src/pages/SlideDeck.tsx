import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useSimpleNarration } from "@/hooks/useSimpleNarration";
import Slide0Title from "@/components/slides/Slide0Title";
import Slide1StrategicShift from "@/components/slides/Slide1StrategicShift";
import Slide2BeforeAfter from "@/components/slides/Slide2BeforeAfter";
import Slide3OperatingModel from "@/components/slides/Slide3OperatingModel";
// import Slide4PlatformCapabilities from "@/components/slides/SlidePlatformCapabilities"; // HIDDEN - consolidated into Operating Model
import Slide5Transformation from "@/components/slides/Slide4Transformation";
import SlideUseCases from "@/components/slides/SlideUseCases";
import Slide6ValuePyramid from "@/components/slides/Slide4ValuePyramid";
import Slide7MaturityCurve from "@/components/slides/Slide5MaturityCurve";
// import Slide8PositioningMap from "@/components/slides/Slide8PositioningMap"; // HIDDEN - too internal
import Slide9Customers from "@/components/slides/Slide7Customers";
// import Slide10Investors from "@/components/slides/Slide6Investors"; // HIDDEN - not for customer presentations
import SlideMessagingHouse from "@/components/slides/SlideMessagingHouse";
import SlideCampaignIdeas from "@/components/slides/SlideCampaignIdeas";
import SlideAIVision from "@/components/slides/SlideAIVision";
import SlideMessagingContext from "@/components/slides/SlideMessagingContext";
import SlidePlatformExperience from "@/components/slides/SlidePlatformExperience";
import SlideConclusion from "@/components/slides/SlideConclusion";

const slides = [
  { id: "slide-0", label: "Title" },
  { id: "slide-1", label: "Strategic Shift" },
  { id: "slide-2", label: "Before & After" },
  { id: "slide-3", label: "Operating Model" },
  { id: "slide-5", label: "Use Cases" },
  { id: "slide-6", label: "Transformation" },
  { id: "slide-7", label: "Value Ladder" },
  { id: "slide-8", label: "Maturity Roadmap" },
  { id: "slide-9", label: "AI Journey" },
  { id: "slide-10", label: "Customers" },
  { id: "slide-11", label: "Messaging House" },
  { id: "slide-12", label: "Campaign Ideas" },
  { id: "slide-13", label: "Messaging in Context" },
  { id: "slide-14", label: "Platform Experience" },
  { id: "slide-15", label: "Next Steps" },
];

const SlideDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const narration = useSimpleNarration();
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();

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

  // Register slides with sidebar context
  useEffect(() => {
    register(slides, activeSlide, scrollToSlide);
    return () => unregister();
  }, []);

  // Keep sidebar in sync with active slide
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

      // Auto-collapse sidebar on scroll
      if (open) {
        setOpen(false);
      }

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

  

  return (
    <div className="h-screen w-full bg-background overflow-hidden relative">
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

      {/* Slides container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        <Slide0Title onNavigateToSlide={scrollToSlide} {...getNarrationProps(0)} />
        <Slide1StrategicShift {...getNarrationProps(1)} />
        <Slide2BeforeAfter {...getNarrationProps(2)} />
        <Slide3OperatingModel {...getNarrationProps(3)} />
        {/* HIDDEN: <Slide4PlatformCapabilities {...getNarrationProps(4)} /> - consolidated into Operating Model */}
        <SlideUseCases {...getNarrationProps(4)} />
        <Slide5Transformation {...getNarrationProps(5)} />
        <Slide6ValuePyramid {...getNarrationProps(6)} />
        <Slide7MaturityCurve {...getNarrationProps(7)} />
        <SlideAIVision {...getNarrationProps(8)} />
        <Slide9Customers {...getNarrationProps(9)} />
        <SlideMessagingHouse {...getNarrationProps(10)} />
        <SlideCampaignIdeas {...getNarrationProps(11)} />
        <SlideMessagingContext {...getNarrationProps(12)} />
        <SlidePlatformExperience />
        <SlideConclusion {...getNarrationProps(13)} />
      </div>
    </div>
  );
};

export default SlideDeck;
