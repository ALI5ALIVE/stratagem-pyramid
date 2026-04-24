import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";

import COSlide0Title from "@/components/customer-overview-slides/COSlide0Title";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechV4PlatformOverview from "@/components/tech-slides/v4/TechV4PlatformOverview";
import Slide4Transformation from "@/components/slides/Slide4Transformation";
import PFSlide9Value from "@/components/platform-slides/PFSlide9Value";
import SlideUseCases from "@/components/slides/SlideUseCases";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";
import Slide5MaturityCurve from "@/components/slides/Slide5MaturityCurve";
import COClosingFirst90Days from "@/components/customer-overview-slides/COClosingFirst90Days";

const slides = [
  { id: "co-slide-0", label: "Title", component: COSlide0Title },
  { id: "co-slide-1", label: "The Reality Today", component: TechSlide2IndustryChallenge },
  { id: "co-slide-2", label: "The Strategic Shift", component: TechSlide1StrategicShift },
  { id: "co-slide-3", label: "The Platform", component: TechV4PlatformOverview },
  { id: "co-slide-4", label: "Before vs After", component: Slide4Transformation },
  { id: "co-slide-5", label: "The Value You Unlock", component: PFSlide9Value },
  { id: "co-slide-6", label: "Use Cases in Action", component: SlideUseCases },
  { id: "co-slide-7", label: "Customer Outcomes", component: CustomerOutcomesSlide },
  { id: "co-slide-8", label: "Your Maturity Roadmap", component: Slide5MaturityCurve },
  { id: "co-slide-9", label: "Your First 90 Days", component: COClosingFirst90Days },
];

const CustomerOverview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();

  const navigateToSlide = useCallback((index: number) => {
    const slideElement = document.getElementById(slides[index].id);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
    }
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
        setCurrentSlide(newSlide);
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentSlide, open, setOpen]);

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
          const SlideComponent = slide.component as React.ComponentType<any>;
          return (
            <SlideComponent
              key={slide.id}
              slideNumber={index}
              id={slide.id}
              onNextSlide={handleNextSlide}
              onPrevSlide={handlePrevSlide}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CustomerOverview;