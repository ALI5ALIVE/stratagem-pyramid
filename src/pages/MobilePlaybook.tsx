import { useEffect, useState, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { DeckProvider } from "@/contexts/DeckContext";
import BackToDeckButton from "@/components/shared/BackToDeckButton";

import MOSlide0Title from "@/components/mobile-slides/MOSlide0Title";
import MOSlide1WhyExists from "@/components/mobile-slides/MOSlide1WhyExists";
import MOSlide2WhatIs from "@/components/mobile-slides/MOSlide2WhatIs";
import MOSlide3HowItWorks from "@/components/mobile-slides/MOSlide3HowItWorks";
import MOSlide4UseCase1 from "@/components/mobile-slides/MOSlide4UseCase1";
import MOSlide5UseCase2 from "@/components/mobile-slides/MOSlide5UseCase2";
import MOSlide6UseCase3 from "@/components/mobile-slides/MOSlide6UseCase3";
import MOSlide7Value from "@/components/mobile-slides/MOSlide7Value";
import MOSlide8Personas from "@/components/mobile-slides/MOSlide8Personas";
import MOSlide9Competitive from "@/components/mobile-slides/MOSlide9Competitive";
import MOSlide10Closing from "@/components/mobile-slides/MOSlide10Closing";

const slides = [
  { id: "mo-title", label: "Title" },
  { id: "mo-why", label: "Why It Exists" },
  { id: "mo-what", label: "What It Is" },
  { id: "mo-how", label: "How It Works" },
  { id: "mo-uc1", label: "Use Case: Training in Hand" },
  { id: "mo-uc2", label: "Use Case: Safety in the Moment" },
  { id: "mo-uc3", label: "Use Case: Fully Unified" },
  { id: "mo-value", label: "Value Unlocked" },
  { id: "mo-personas", label: "How to Talk About It" },
  { id: "mo-competitive", label: "Why Only Comply365" },
  { id: "mo-closing", label: "Talking Points & Close" },
];

const MobilePlaybook = () => {
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
    <DeckProvider deckId="mobile-playbook">
    <BackToDeckButton />
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
        <MOSlide0Title />
        <MOSlide1WhyExists />
        <MOSlide2WhatIs />
        <MOSlide3HowItWorks />
        <MOSlide4UseCase1 />
        <MOSlide5UseCase2 />
        <MOSlide6UseCase3 />
        <MOSlide7Value />
        <MOSlide8Personas />
        <MOSlide9Competitive />
        <MOSlide10Closing />
      </div>
    </div>
    </DeckProvider>
  );
};

export default MobilePlaybook;
