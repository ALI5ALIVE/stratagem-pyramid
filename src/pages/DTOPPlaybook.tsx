import { useEffect, useState, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";

import DTOPSlide0Title from "@/components/dtop-slides/DTOPSlide0Title";
import DTOPSlide1WhyExists from "@/components/dtop-slides/DTOPSlide1WhyExists";
import DTOPSlide2WhatIs from "@/components/dtop-slides/DTOPSlide2WhatIs";
import DTOPSlide3HowStepsWork from "@/components/dtop-slides/DTOPSlide3HowStepsWork";
import DTOPSlide4UseCase1 from "@/components/dtop-slides/DTOPSlide4UseCase1";
import DTOPSlide5UseCase2 from "@/components/dtop-slides/DTOPSlide5UseCase2";
import DTOPSlide6UseCase3 from "@/components/dtop-slides/DTOPSlide6UseCase3";
import DTOPSlide7Value from "@/components/dtop-slides/DTOPSlide7Value";
import DTOPSlide8Personas from "@/components/dtop-slides/DTOPSlide8Personas";
import DTOPSlide9Competitive from "@/components/dtop-slides/DTOPSlide9Competitive";
import DTOPSlide10Objections from "@/components/dtop-slides/DTOPSlide10Objections";
import DTOPSlide11Closing from "@/components/dtop-slides/DTOPSlide11Closing";

const slides = [
  { id: "dtop-title", label: "Title" },
  { id: "dtop-why", label: "Why DTOP Exists" },
  { id: "dtop-what", label: "What DTOP Is" },
  { id: "dtop-how-steps", label: "How Each Step Works" },
  { id: "dtop-uc1", label: "Use Case: DG Incident" },
  { id: "dtop-uc2", label: "Use Case: Regulatory Change" },
  { id: "dtop-uc3", label: "Use Case: Training Loop" },
  { id: "dtop-value", label: "Value DTOP Unlocks" },
  { id: "dtop-personas", label: "How to Talk About DTOP" },
  { id: "dtop-competitive", label: "Why Only Comply365" },
  { id: "dtop-objections", label: "Objection Handling" },
  { id: "dtop-closing", label: "Talking Points & Close" },
];

const DTOPPlaybook = () => {
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
        <DTOPSlide0Title />
        <DTOPSlide1WhyExists />
        <DTOPSlide2WhatIs />
        <DTOPSlide3HowStepsWork />
        <DTOPSlide4UseCase1 />
        <DTOPSlide5UseCase2 />
        <DTOPSlide6UseCase3 />
        <DTOPSlide7Value />
        <DTOPSlide8Personas />
        <DTOPSlide9Competitive />
        <DTOPSlide10Objections />
        <DTOPSlide11Closing />
      </div>
    </div>
  );
};

export default DTOPPlaybook;
