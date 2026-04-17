import { useEffect, useState, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";

import PFSlide0Title from "@/components/platform-slides/PFSlide0Title";
import PFSlide1WhyExists from "@/components/platform-slides/PFSlide1WhyExists";
import PFSlide2WhatIs from "@/components/platform-slides/PFSlide2WhatIs";
import PFSlide3Architecture from "@/components/platform-slides/PFSlide3Architecture";
import PFSlide4CoreApps from "@/components/platform-slides/PFSlide4CoreApps";
import PFSlide5Intelligence from "@/components/platform-slides/PFSlide5Intelligence";
import PFSlide6Mobile from "@/components/platform-slides/PFSlide6Mobile";
import PFSlide7DTOP from "@/components/platform-slides/PFSlide7DTOP";
import PFSlide8FlagshipUseCase from "@/components/platform-slides/PFSlide8FlagshipUseCase";
import PFSlide9Value from "@/components/platform-slides/PFSlide9Value";
import PFSlide10Personas from "@/components/platform-slides/PFSlide10Personas";
import PFSlide11Competitive from "@/components/platform-slides/PFSlide11Competitive";
import PFSlide12Closing from "@/components/platform-slides/PFSlide12Closing";

const slides = [
  { id: "pf-title", label: "Title" },
  { id: "pf-why", label: "Why It Exists" },
  { id: "pf-what", label: "What It Is" },
  { id: "pf-architecture", label: "The Architecture" },
  { id: "pf-core", label: "Operational Core" },
  { id: "pf-intelligence", label: "Intelligence Layer" },
  { id: "pf-mobile", label: "Unified Mobile" },
  { id: "pf-dtop", label: "DTOP Operating Model" },
  { id: "pf-usecase", label: "Platform Firing Together" },
  { id: "pf-value", label: "Value Unlocked" },
  { id: "pf-personas", label: "How to Talk About It" },
  { id: "pf-competitive", label: "Why Only Comply365" },
  { id: "pf-closing", label: "Talking Points & Close" },
];

const PlatformPlaybook = () => {
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
        <PFSlide0Title />
        <PFSlide1WhyExists />
        <PFSlide2WhatIs />
        <PFSlide3Architecture />
        <PFSlide4CoreApps />
        <PFSlide5Intelligence />
        <PFSlide6Mobile />
        <PFSlide7DTOP />
        <PFSlide8FlagshipUseCase />
        <PFSlide9Value />
        <PFSlide10Personas />
        <PFSlide11Competitive />
        <PFSlide12Closing />
      </div>
    </div>
  );
};

export default PlatformPlaybook;
