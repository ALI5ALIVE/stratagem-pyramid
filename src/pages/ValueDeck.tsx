import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useSimpleNarration } from "@/hooks/useSimpleNarration";

import ValueSlide0Title from "@/components/value-slides/ValueSlide0Title";
import Slide1StrategicShift from "@/components/slides/Slide1StrategicShift";
import Slide2BeforeAfter from "@/components/slides/Slide2BeforeAfter";
import Slide3OperatingModel from "@/components/slides/Slide3OperatingModel";
import SlideUseCases from "@/components/slides/SlideUseCases";
import Slide4ValuePyramid from "@/components/slides/Slide4ValuePyramid";
import Slide7Customers from "@/components/slides/Slide7Customers";
import SlideLineOfSight from "@/components/slides/SlideLineOfSight";
import BalancedScorecard from "@/components/slides/BalancedScorecard";
import PerformanceShiftCurve from "@/components/slides/PerformanceShiftCurve";

import {
  useCases,
  leadingMeasures,
  computeLeadingMeasure,
  computeUseCaseCostImpact,
  defaultProfile,
  type AirlineProfile,
} from "@/data/lineOfSightData";

const slides = [
  { id: "value-slide-0", label: "Title" },
  { id: "value-slide-1", label: "Strategic Shift" },
  { id: "value-slide-2", label: "Before & After" },
  { id: "value-slide-3", label: "Operating Model" },
  { id: "value-slide-4", label: "Use Cases" },
  { id: "value-slide-5", label: "Value Ladder" },
  { id: "value-slide-6", label: "Customers" },
  { id: "value-slide-7", label: "Line of Sight" },
  { id: "value-slide-8", label: "Scorecard" },
  { id: "value-slide-9", label: "Performance Shift" },
];

const ValueDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const narration = useSimpleNarration();
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();

  // Stop narration when leaving this deck
  useEffect(() => {
    return () => narration.stop();
  }, []);

  // --- Shared state for interactive slides (7-9) ---
  const [useCaseValues, setUseCaseValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    useCases.forEach((uc) => {
      initial[uc.id] = uc.input.baseline;
    });
    return initial;
  });

  const [airlineProfile, setAirlineProfile] = useState<AirlineProfile>({ ...defaultProfile });

  const leadingValues = useMemo(() => {
    const values: Record<string, number> = {};
    leadingMeasures.forEach((lm) => {
      values[lm.id] = computeLeadingMeasure(lm, useCaseValues, useCases);
    });
    return values;
  }, [useCaseValues]);

  const totalCostAvoidance = useMemo(() => {
    return useCases.reduce(
      (sum, uc) => sum + computeUseCaseCostImpact(uc, useCaseValues[uc.id] ?? uc.input.baseline, airlineProfile),
      0
    );
  }, [useCaseValues, airlineProfile]);

  // --- Narration helper ---
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

  // Register with sidebar
  useEffect(() => {
    register(slides, activeSlide, scrollToSlide);
    return () => unregister();
  }, []);


  // Scroll tracking
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
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
      const slideHeight = containerRef.current.clientHeight;
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        const nextSlide = Math.min(activeSlide + 1, slides.length - 1);
        containerRef.current.scrollTo({ top: nextSlide * slideHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevSlide = Math.max(activeSlide - 1, 0);
        containerRef.current.scrollTo({ top: prevSlide * slideHeight, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide]);

  return (
    <div className="h-screen w-full bg-background overflow-hidden relative">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
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
      <div ref={containerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <ValueSlide0Title onNavigateToSlide={scrollToSlide} {...getNarrationProps(0)} />
        <Slide1StrategicShift {...getNarrationProps(1)} />
        <Slide2BeforeAfter {...getNarrationProps(2)} />
        <Slide3OperatingModel {...getNarrationProps(3)} />
        <SlideUseCases {...getNarrationProps(4)} />
        <Slide4ValuePyramid {...getNarrationProps(5)} />
        <Slide7Customers {...getNarrationProps(6)} />

        {/* Interactive ROI slides — full viewport snap containers */}
        <div className="min-h-screen w-full snap-start flex flex-col">
          <SlideLineOfSight
            useCaseValues={useCaseValues}
            setUseCaseValues={setUseCaseValues}
            airlineProfile={airlineProfile}
            setAirlineProfile={setAirlineProfile}
            leadingValues={leadingValues}
            totalCostAvoidance={totalCostAvoidance}
          />
        </div>
        <div className="min-h-screen w-full snap-start flex flex-col">
          <BalancedScorecard
            useCaseValues={useCaseValues}
            leadingValues={leadingValues}
            totalCostAvoidance={totalCostAvoidance}
            airlineProfile={airlineProfile}
          />
        </div>
        <div className="min-h-screen w-full snap-start flex flex-col">
          <PerformanceShiftCurve
            useCaseValues={useCaseValues}
            leadingValues={leadingValues}
            totalCostAvoidance={totalCostAvoidance}
            airlineProfile={airlineProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default ValueDeck;
