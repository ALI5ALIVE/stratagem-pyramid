import { useEffect, useState, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { DeckProvider } from "@/contexts/DeckContext";

import RMSlide0Title from "@/components/regmgmt-slides/RMSlide0Title";
import RMSlide1Overview from "@/components/regmgmt-slides/RMSlide1Overview";
import RMSlide2Problem from "@/components/regmgmt-slides/RMSlide2Problem";
import RMSlide3Positioning from "@/components/regmgmt-slides/RMSlide3Positioning";
import RMSlide4ValuePillars from "@/components/regmgmt-slides/RMSlide4ValuePillars";
import RMSlide5HowItWorks from "@/components/regmgmt-slides/RMSlide5HowItWorks";
import RMSlide6UseCases from "@/components/regmgmt-slides/RMSlide6UseCases";
import RMSlide7Personas from "@/components/regmgmt-slides/RMSlide7Personas";
import RMSlide8Commercial from "@/components/regmgmt-slides/RMSlide8Commercial";
import RMSlide9Objections from "@/components/regmgmt-slides/RMSlide9Objections";
import RMSlide10Roadmap from "@/components/regmgmt-slides/RMSlide10Roadmap";

const slides = [
  { id: "rm-title", label: "Title" },
  { id: "rm-overview", label: "Solution Overview" },
  { id: "rm-problem", label: "The Problem Today" },
  { id: "rm-positioning", label: "Solution Positioning" },
  { id: "rm-value-pillars", label: "Value Pillars" },
  { id: "rm-how-it-works", label: "How It Works" },
  { id: "rm-use-cases", label: "Use Cases" },
  { id: "rm-personas", label: "Persona Relevance" },
  { id: "rm-commercial", label: "Commercial Model" },
  { id: "rm-objections", label: "Objection Handling" },
  { id: "rm-roadmap", label: "Roadmap & Talking Points" },
];

const RegulationManagementPlaybook = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();

  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slideHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({ top: index * slideHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    register(slides, activeSlide, scrollToSlide);
    return () => unregister();
  }, []);

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
    <DeckProvider deckId="regulation-management">
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
        <RMSlide0Title />
        <RMSlide1Overview />
        <RMSlide2Problem />
        <RMSlide3Positioning />
        <RMSlide4ValuePillars />
        <RMSlide5HowItWorks />
        <RMSlide6UseCases />
        <RMSlide7Personas />
        <RMSlide8Commercial />
        <RMSlide9Objections />
        <RMSlide10Roadmap />
      </div>
    </div>
  );
};

export default RegulationManagementPlaybook;
