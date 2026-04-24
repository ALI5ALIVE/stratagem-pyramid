import { useState, useEffect, useCallback, useRef } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";

import SESlide0Title from "@/components/sales-enablement-slides/SESlide0Title";
import SEModuleDivider from "@/components/sales-enablement-slides/SEModuleDivider";
import SERecapSlide from "@/components/sales-enablement-slides/SERecapSlide";
import SELayerTalkTrack from "@/components/sales-enablement-slides/SELayerTalkTrack";
import SEObjections from "@/components/sales-enablement-slides/SEObjections";
import SEClosingForReps from "@/components/sales-enablement-slides/SEClosingForReps";

import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import PFSlide9Value from "@/components/platform-slides/PFSlide9Value";
import TechV4PlatformOverview from "@/components/tech-slides/v4/TechV4PlatformOverview";
import TechV4Slide4aSafetyManager from "@/components/tech-slides/v4/TechV4Slide4aSafetyManager";
import TechV4Slide4bContentManager from "@/components/tech-slides/v4/TechV4Slide4bContentManager";
import TechV4Slide4cTrainingManager from "@/components/tech-slides/v4/TechV4Slide4cTrainingManager";
import TechV4Slide7CoAnalyst from "@/components/tech-slides/v4/TechV4Slide7CoAnalyst";
import TechV4SlideInsights from "@/components/tech-slides/v4/TechV4SlideInsights";
import TechV4SlideAutomation from "@/components/tech-slides/v4/TechV4SlideAutomation";
import TechV4SlideTiersVsAI from "@/components/tech-slides/v4/TechV4SlideTiersVsAI";
import TechV4SlideMobile from "@/components/tech-slides/v4/TechV4SlideMobile";
import TechV4Slide5DTOP from "@/components/tech-slides/v4/TechV4Slide5DTOP";
import Slide4Transformation from "@/components/slides/Slide4Transformation";
import SlideUseCases from "@/components/slides/SlideUseCases";
import Slide5MaturityCurve from "@/components/slides/Slide5MaturityCurve";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";

const moduleProps = {
  m2: {
    moduleNumber: 2,
    title: "What the platform is, in plain English",
    learningGoal: "By the end of this module you can give the one-sentence pitch and name the four capability bands without reading them off a slide.",
    estimatedMinutes: 6,
    upNext: ["Plain-English definition", "The platform at a glance", "Value unlocked", "Recap talk track"],
  },
  m3: {
    moduleNumber: 3,
    title: "How the capabilities fit together",
    learningGoal: "By the end of this module you can describe each capability in 60 seconds and ask one good discovery question per capability.",
    estimatedMinutes: 12,
    upNext: ["Core Apps", "Intelligence & Orchestration", "Mobile", "DTOP", "Capability cheat sheet"],
  },
  m4: {
    moduleNumber: 4,
    title: "How we sell it",
    learningGoal: "By the end of this module you understand the discovery → demo → close motion, and which proof points land where.",
    estimatedMinutes: 8,
    upNext: ["Before vs After", "Use cases", "Maturity roadmap", "Customer outcomes"],
  },
  m5: {
    moduleNumber: 5,
    title: "Why we win",
    learningGoal: "By the end of this module you can handle the top 5 objections and walk a prospect to a 90-day pilot.",
    estimatedMinutes: 6,
    upNext: ["Objections cheat sheet", "Why Comply365", "Your first 7 days"],
  },
};

const slides = [
  // MODULE 1
  { id: "se-slide-0", label: "Title", component: SESlide0Title },
  { id: "se-slide-shift", label: "M1 · Strategic Shift", component: TechSlide1StrategicShift },
  { id: "se-slide-challenge", label: "M1 · Industry Challenge", component: TechSlide2IndustryChallenge },
  // MODULE 2
  { id: "se-module-2", label: "▸ Module 2", component: SEModuleDivider, dividerProps: moduleProps.m2 },
  { id: "se-slide-whatis", label: "M2 · What It Is", component: PFSlide2WhatIs },
  { id: "se-slide-5layer", label: "M2 · 5-Layer Map", component: TechSlide4Platform },
  { id: "se-slide-value", label: "M2 · Value Unlocked", component: PFSlide9Value },
  { id: "se-slide-recap-m2", label: "M2 · Recap", component: SERecapSlide },
  // MODULE 3
  { id: "se-module-3", label: "▸ Module 3", component: SEModuleDivider, dividerProps: moduleProps.m3 },
  { id: "se-slide-l1", label: "M3 · Layer 1 — Core Apps", component: ExecCoreAppsSummary },
  { id: "se-slide-l2", label: "M3 · Layer 2 — Data", component: TechSlideDataFoundation },
  { id: "se-slide-l3", label: "M3 · Layer 3 — Intelligence", component: TechSlide7CoAnalyst },
  { id: "se-slide-l4", label: "M3 · Layer 4 — Mobile", component: TechSlideMobile },
  { id: "se-slide-l5", label: "M3 · Layer 5 — DTOP", component: TechSlide5DTOP },
  { id: "se-slide-talktrack", label: "M3 · Layer Talk Track", component: SELayerTalkTrack },
  // MODULE 4
  { id: "se-module-4", label: "▸ Module 4", component: SEModuleDivider, dividerProps: moduleProps.m4 },
  { id: "se-slide-transform", label: "M4 · Before vs After", component: Slide4Transformation },
  { id: "se-slide-usecases", label: "M4 · Use Cases", component: SlideUseCases },
  { id: "se-slide-maturity", label: "M4 · Maturity Roadmap", component: Slide5MaturityCurve },
  { id: "se-slide-outcomes", label: "M4 · Customer Outcomes", component: CustomerOutcomesSlide },
  // MODULE 5
  { id: "se-module-5", label: "▸ Module 5", component: SEModuleDivider, dividerProps: moduleProps.m5 },
  { id: "se-slide-objections", label: "M5 · Objections", component: SEObjections },
  { id: "se-slide-why", label: "M5 · Why Comply365", component: TechSlideWhyComply },
  { id: "se-slide-closing", label: "M5 · Your First 7 Days", component: SEClosingForReps },
];

const SalesEnablement = () => {
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
              {...((slide as any).dividerProps ?? {})}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SalesEnablement;