import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Slide1StrategicShift from "@/components/slides/Slide1StrategicShift";
import Slide2BeforeAfter from "@/components/slides/Slide2BeforeAfter";
import Slide3OperatingModel from "@/components/slides/Slide3OperatingModel";
import Slide4ValuePyramid from "@/components/slides/Slide4ValuePyramid";
import Slide5MaturityCurve from "@/components/slides/Slide5MaturityCurve";
import Slide6Investors from "@/components/slides/Slide6Investors";
import Slide7Customers from "@/components/slides/Slide7Customers";
import Slide8PositioningMap from "@/components/slides/Slide8PositioningMap";

const slides = [
  { id: "slide-1", label: "Strategic Shift" },
  { id: "slide-2", label: "Before & After" },
  { id: "slide-3", label: "Operating Model" },
  { id: "slide-4", label: "Value Pyramid" },
  { id: "slide-5", label: "Maturity Curve" },
  { id: "slide-6", label: "Positioning" },
  { id: "slide-7", label: "Customers" },
  { id: "slide-8", label: "Investors" },
];

const SlideDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress * 100);

      // Calculate active slide
      const slideHeight = containerRef.current.clientHeight;
      const currentSlide = Math.round(scrollTop / slideHeight);
      setActiveSlide(Math.min(currentSlide, slides.length - 1));
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
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

          <div className="w-20" />
        </div>
      </header>

      {/* Slide navigation dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => scrollToSlide(index)}
            className="group flex items-center gap-2 transition-all duration-200"
          >
            <span className={`
              text-xs opacity-0 group-hover:opacity-100 transition-opacity text-right
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
        <Slide1StrategicShift />
        <Slide2BeforeAfter />
        <Slide3OperatingModel />
        <Slide4ValuePyramid />
        <Slide5MaturityCurve />
        <Slide8PositioningMap />
        <Slide7Customers />
        <Slide6Investors />
      </div>
    </div>
  );
};

export default SlideDeck;
