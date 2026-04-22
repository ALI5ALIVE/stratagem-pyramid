import { useEffect, useState, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { DeckProvider } from "@/contexts/DeckContext";

import AUSlide0Title from "@/components/automation-slides/AUSlide0Title";
import AUSlide1WhyExists from "@/components/automation-slides/AUSlide1WhyExists";
import AUSlide2WhatIs from "@/components/automation-slides/AUSlide2WhatIs";
import AUSlide3HowItWorks from "@/components/automation-slides/AUSlide3HowItWorks";
import AUSlide4UseCase1 from "@/components/automation-slides/AUSlide4UseCase1";
import AUSlide5UseCase2 from "@/components/automation-slides/AUSlide5UseCase2";
import AUSlide6UseCase3 from "@/components/automation-slides/AUSlide6UseCase3";
import AUSlide7Value from "@/components/automation-slides/AUSlide7Value";
import AUSlide8Personas from "@/components/automation-slides/AUSlide8Personas";
import AUSlide9Competitive from "@/components/automation-slides/AUSlide9Competitive";
import AUSlide10Closing from "@/components/automation-slides/AUSlide10Closing";

const slides = [
  { id: "au-title", label: "Title" },
  { id: "au-why", label: "Why It Exists" },
  { id: "au-what", label: "What It Is" },
  { id: "au-how", label: "How It Works" },
  { id: "au-uc1", label: "Use Case: Training Onboarding" },
  { id: "au-uc2", label: "Use Case: Cross-Product Workflow" },
  { id: "au-uc3", label: "Use Case: Third-Party Integration" },
  { id: "au-value", label: "Value Unlocked" },
  { id: "au-personas", label: "How to Talk About It" },
  { id: "au-competitive", label: "Why Only Comply365" },
  { id: "au-closing", label: "Talking Points & Close" },
];

const AutomationPlaybook = () => {
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
    <DeckProvider deckId="automation-playbook">
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
        <AUSlide0Title />
        <AUSlide1WhyExists />
        <AUSlide2WhatIs />
        <AUSlide3HowItWorks />
        <AUSlide4UseCase1 />
        <AUSlide5UseCase2 />
        <AUSlide6UseCase3 />
        <AUSlide7Value />
        <AUSlide8Personas />
        <AUSlide9Competitive />
        <AUSlide10Closing />
      </div>
    </div>
    </DeckProvider>
  );
};

export default AutomationPlaybook;
