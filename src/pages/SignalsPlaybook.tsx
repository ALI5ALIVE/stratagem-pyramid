import { useEffect, useState, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { DeckProvider } from "@/contexts/DeckContext";

import SIGSlide0Title from "@/components/signals-slides/SIGSlide0Title";
import SIGSlide1WhyMatters from "@/components/signals-slides/SIGSlide1WhyMatters";
import SIGSlide2WhatIsSignal from "@/components/signals-slides/SIGSlide2WhatIsSignal";
import SIGSlide3SignalSources from "@/components/signals-slides/SIGSlide3SignalSources";
import SIGSlide4Lifecycle from "@/components/signals-slides/SIGSlide4Lifecycle";
import SIGSlide5StrongVsWeak from "@/components/signals-slides/SIGSlide5StrongVsWeak";
import SIGSlide6UseCaseSafety from "@/components/signals-slides/SIGSlide6UseCaseSafety";
import SIGSlide7UseCaseOps from "@/components/signals-slides/SIGSlide7UseCaseOps";
import SIGSlide8UseCaseContent from "@/components/signals-slides/SIGSlide8UseCaseContent";
import SIGSlide9WhyComply365 from "@/components/signals-slides/SIGSlide9WhyComply365";
import SIGSlide10Closing from "@/components/signals-slides/SIGSlide10Closing";
import PlaybookNarrationBar from "@/components/PlaybookNarrationBar";
import { usePlaybookNarration } from "@/hooks/usePlaybookNarration";

const slides = [
  { id: "sig-title", label: "Title" },
  { id: "sig-why", label: "Why Signals Matter" },
  { id: "sig-what", label: "What Is a Signal?" },
  { id: "sig-sources", label: "Where Signals Come From" },
  { id: "sig-lifecycle", label: "The Signal Lifecycle" },
  { id: "sig-strength", label: "Strong vs Weak Signals" },
  { id: "sig-uc-safety", label: "Use Case: Safety" },
  { id: "sig-uc-ops", label: "Use Case: Operations" },
  { id: "sig-uc-content", label: "Use Case: Content" },
  { id: "sig-why-us", label: "Why Comply365" },
  { id: "sig-closing", label: "Talk Track & Objections" },
];

const SignalsPlaybook = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = usePlaybookNarration();

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
    <DeckProvider deckId="signals-playbook">
      <div className="h-screen w-full bg-background overflow-hidden relative">
        <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <header className="fixed top-1 left-0 right-0 z-40 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <span className="text-xs text-muted-foreground">
              {activeSlide + 1} / {slides.length}
            </span>
          </div>
        </header>

        <div ref={containerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
          <SIGSlide0Title />
          <SIGSlide1WhyMatters />
          <SIGSlide2WhatIsSignal />
          <SIGSlide3SignalSources />
          <SIGSlide4Lifecycle />
          <SIGSlide5StrongVsWeak />
          <SIGSlide6UseCaseSafety />
          <SIGSlide7UseCaseOps />
          <SIGSlide8UseCaseContent />
          <SIGSlide9WhyComply365 />
          <SIGSlide10Closing />
        </div>
      <PlaybookNarrationBar
        narration={narration}
        activeSlideId={slides[activeSlide].id}
        onNextSlide={() => scrollToSlide(Math.min(activeSlide + 1, slides.length - 1))}
        onPrevSlide={activeSlide > 0 ? () => scrollToSlide(activeSlide - 1) : undefined}
      />
      </div>
    </DeckProvider>
  );
};

export default SignalsPlaybook;