import { useEffect, useState, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { DeckProvider } from "@/contexts/DeckContext";

import IRSlide0Title from "@/components/insights-slides/IRSlide0Title";
import IRSlide1WhyExists from "@/components/insights-slides/IRSlide1WhyExists";
import IRSlide2WhatIs from "@/components/insights-slides/IRSlide2WhatIs";
import IRSlide3HowItWorks from "@/components/insights-slides/IRSlide3HowItWorks";
import IRSlide4UseCase1 from "@/components/insights-slides/IRSlide4UseCase1";
import IRSlide5UseCase2 from "@/components/insights-slides/IRSlide5UseCase2";
import IRSlide6UseCase3 from "@/components/insights-slides/IRSlide6UseCase3";
import IRSlide7Value from "@/components/insights-slides/IRSlide7Value";
import IRSlide8Personas from "@/components/insights-slides/IRSlide8Personas";
import IRSlide9Competitive from "@/components/insights-slides/IRSlide9Competitive";
import IRSlide10Closing from "@/components/insights-slides/IRSlide10Closing";

const slides = [
  { id: "ir-title", label: "Title" },
  { id: "ir-why", label: "Why It Exists" },
  { id: "ir-what", label: "What It Is" },
  { id: "ir-how", label: "How It Works" },
  { id: "ir-uc1", label: "Use Case: DG Risk Query" },
  { id: "ir-uc2", label: "Use Case: Audit Readiness" },
  { id: "ir-uc3", label: "Use Case: Faster Investigations" },
  { id: "ir-value", label: "Value Unlocked" },
  { id: "ir-personas", label: "How to Talk About It" },
  { id: "ir-competitive", label: "Why Only Comply365" },
  { id: "ir-closing", label: "Talking Points & Close" },
];

const InsightsPlaybook = () => {
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
    <DeckProvider deckId="insights-playbook">
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
        <IRSlide0Title />
        <IRSlide1WhyExists />
        <IRSlide2WhatIs />
        <IRSlide3HowItWorks />
        <IRSlide4UseCase1 />
        <IRSlide5UseCase2 />
        <IRSlide6UseCase3 />
        <IRSlide7Value />
        <IRSlide8Personas />
        <IRSlide9Competitive />
        <IRSlide10Closing />
      </div>
    </div>
    </DeckProvider>
  );
};

export default InsightsPlaybook;
