import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useCoAnalystNarration } from "@/hooks/useCoAnalystNarration";
import CASlide0Title from "@/components/coanalyst-slides/CASlide0Title";
import CASlide1ExecutiveSummary from "@/components/coanalyst-slides/CASlide1ExecutiveSummary";
import CASlide2CategoryNarrative from "@/components/coanalyst-slides/CASlide2CategoryNarrative";
import CASlide3StrategicNarrative from "@/components/coanalyst-slides/CASlide3StrategicNarrative";
import CASlide4ProductPositioning from "@/components/coanalyst-slides/CASlide4ProductPositioning";
import CASlide5MessagingArchitecture from "@/components/coanalyst-slides/CASlide5MessagingArchitecture";
import CASlide6HowItWorks from "@/components/coanalyst-slides/CASlide6HowItWorks";
import CASlide7BusinessOutcomes from "@/components/coanalyst-slides/CASlide7BusinessOutcomes";
import CASlide8VsGenericAI from "@/components/coanalyst-slides/CASlide8VsGenericAI";
import CASlide9PersonaMessaging from "@/components/coanalyst-slides/CASlide9PersonaMessaging";
import CASlide10ObjectionHandling from "@/components/coanalyst-slides/CASlide10ObjectionHandling";
import CASlide11Taglines from "@/components/coanalyst-slides/CASlide11Taglines";
import CASlide12WebsiteMessaging from "@/components/coanalyst-slides/CASlide12WebsiteMessaging";
import CASlide13VisualNarrative from "@/components/coanalyst-slides/CASlide13VisualNarrative";
import CASlide14DeckStructure from "@/components/coanalyst-slides/CASlide14DeckStructure";

const slides = [
  { id: "ca-title", label: "Contents" },
  { id: "ca-exec-summary", label: "Executive Summary" },
  { id: "ca-category-narrative", label: "The Intelligence Gap" },
  { id: "ca-strategic-narrative", label: "Strategic Narrative" },
  { id: "ca-product-positioning", label: "Product Positioning" },
  { id: "ca-messaging-architecture", label: "Messaging Architecture" },
  { id: "ca-how-it-works", label: "How It Works" },
  { id: "ca-business-outcomes", label: "Business Outcomes" },
  { id: "ca-vs-generic-ai", label: "vs Generic AI" },
  { id: "ca-persona-messaging", label: "Persona Messaging" },
  { id: "ca-objection-handling", label: "Objection Handling" },
  { id: "ca-taglines", label: "Taglines & Lines" },
  { id: "ca-website-messaging", label: "Website Messaging" },
  { id: "ca-visual-narrative", label: "Visual Narrative" },
  { id: "ca-deck-structure", label: "Deck Structure" },
];

const CoAnalystDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const narration = useCoAnalystNarration();
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const { open, setOpen } = useSidebar();

  const getNarrationProps = (slideId: number) => ({
    isPlaying: narration.currentSlide === slideId && narration.isPlaying,
    isLoading: narration.currentSlide === slideId && narration.isLoading,
    progress: narration.currentSlide === slideId ? narration.progress : 0,
    hasCompleted: narration.currentSlide === slideId && narration.hasCompleted,
    onPlay: () => {
      narration.play(slideId);
      narration.preloadNext(slideId);
    },
    onPause: () => narration.pause(),
    onNextSlide: slideId < slides.length - 1 ? () => scrollToSlide(slideId + 1) : undefined,
    onPrevSlide: slideId > 0 ? () => scrollToSlide(slideId - 1) : undefined,
  });

  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slideHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * slideHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    register(slides, activeSlide, scrollToSlide);
    return () => unregister();
  }, []);

  // Auto-play narration with debounce for fast scrolling
  useEffect(() => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    narration.stop();
    autoPlayTimerRef.current = setTimeout(() => {
      narration.play(activeSlide);
      narration.preloadNext(activeSlide);
    }, 600);
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [activeSlide]);

  useEffect(() => {
  }, [activeSlide, updateActiveIndex]);

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
        <CASlide0Title {...getNarrationProps(0)} />
        <CASlide1ExecutiveSummary {...getNarrationProps(1)} />
        <CASlide2CategoryNarrative {...getNarrationProps(2)} />
        <CASlide3StrategicNarrative {...getNarrationProps(3)} />
        <CASlide4ProductPositioning {...getNarrationProps(4)} />
        <CASlide5MessagingArchitecture {...getNarrationProps(5)} />
        <CASlide6HowItWorks {...getNarrationProps(6)} />
        <CASlide7BusinessOutcomes {...getNarrationProps(7)} />
        <CASlide8VsGenericAI {...getNarrationProps(8)} />
        <CASlide9PersonaMessaging {...getNarrationProps(9)} />
        <CASlide10ObjectionHandling {...getNarrationProps(10)} />
        <CASlide11Taglines {...getNarrationProps(11)} />
        <CASlide12WebsiteMessaging {...getNarrationProps(12)} />
        <CASlide13VisualNarrative {...getNarrationProps(13)} />
        <CASlide14DeckStructure {...getNarrationProps(14)} />
      </div>
    </div>
  );
};

export default CoAnalystDeck;
