import { useState, useEffect, useRef, useCallback } from "react";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useRoadmapNarration } from "@/hooks/useRoadmapNarration";
import { DeckProvider } from "@/contexts/DeckContext";
import { roadmapUseCases, phaseOrder, phaseMeta, useCasesByPhase } from "@/data/roadmapUseCases";

import RDSlide0Title from "@/components/roadmap-slides/RDSlide0Title";
import RDSlide1Overview from "@/components/roadmap-slides/RDSlide1Overview";
import RDPhaseDivider from "@/components/roadmap-slides/RDPhaseDivider";
import RDUseCaseSlide from "@/components/roadmap-slides/RDUseCaseSlide";
import RDClosing from "@/components/roadmap-slides/RDClosing";

type SlideEntry = {
  id: string;
  label: string;
  render: (props: any) => JSX.Element;
};

const buildSlides = (): SlideEntry[] => {
  const list: SlideEntry[] = [
    {
      id: "rd-slide-title",
      label: "Title — Use Cases & Roadmap",
      render: (p) => <RDSlide0Title {...p} />,
    },
    {
      id: "rd-slide-overview",
      label: "Roadmap at a Glance",
      render: (p) => <RDSlide1Overview {...p} />,
    },
  ];

  phaseOrder.forEach((phase) => {
    const meta = phaseMeta[phase];
    const dividerId = `rd-divider-${phase}`;
    list.push({
      id: dividerId,
      label: `▸ ${meta.label} — ${meta.theme}`,
      render: (p) => <RDPhaseDivider id={dividerId} phase={phase} {...p} />,
    });
    useCasesByPhase(phase).forEach((uc) => {
      const id = `rd-uc-${uc.id}`;
      list.push({
        id,
        label: uc.title,
        render: (p) => <RDUseCaseSlide id={id} useCase={uc} {...p} />,
      });
    });
  });

  list.push({
    id: "rd-slide-closing",
    label: "Closing — One Direction of Travel",
    render: (p) => <RDClosing {...p} />,
  });

  // Prefix every sidebar label with its positional number so the list reads in order
  return list.map((s, i) => ({
    ...s,
    label: `${String(i + 1).padStart(2, "0")} · ${s.label}`,
  }));
};

const slides = buildSlides();

const RoadmapDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register } = useSlideNavigation();
  const { open, setOpen } = useSidebar();
  const narration = useRoadmapNarration();

  const navigateToSlide = useCallback(
    (index: number) => {
      const el = document.getElementById(slides[index]?.id);
      if (el) {
        narration.stop();
        el.scrollIntoView({ behavior: "smooth" });
        setCurrentSlide(index);
      }
    },
    [narration.stop]
  );

  useEffect(() => () => narration.stop(), []);

  useEffect(() => {
    register(
      slides.map((s) => ({ id: s.id, label: s.label })),
      currentSlide,
      navigateToSlide
    );
  }, [register, currentSlide, navigateToSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (open) setOpen(false);
      const scrollTop = container.scrollTop;
      const slideHeight = container.clientHeight;
      const index = Math.round(scrollTop / slideHeight);
      const newSlide = Math.min(index, slides.length - 1);
      if (newSlide !== currentSlide) {
        narration.stop();
        setCurrentSlide(newSlide);
      }
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [open, setOpen, currentSlide, narration.stop]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide, navigateToSlide]);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) navigateToSlide(currentSlide + 1);
  }, [currentSlide, navigateToSlide]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlide > 0) navigateToSlide(currentSlide - 1);
  }, [currentSlide, navigateToSlide]);

  return (
    <DeckProvider deckId="roadmap-deck">
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        {slides.map((slide, index) => {
          const isCurrentSlide = index === currentSlide;
          const slideId = slide.id;
          const narrationProps = {
            isPlaying:
              isCurrentSlide && narration.currentSlide === slideId ? narration.isPlaying : false,
            isLoading:
              isCurrentSlide && narration.currentSlide === slideId ? narration.isLoading : false,
            progress:
              isCurrentSlide && narration.currentSlide === slideId ? narration.progress : 0,
            hasCompleted:
              isCurrentSlide && narration.currentSlide === slideId ? narration.hasCompleted : false,
            onPlay: () => narration.play(slideId),
            onPause: narration.pause,
            onNextSlide: handleNextSlide,
            onPrevSlide: handlePrevSlide,
            slideNumber: index,
          };
          return (
            <div key={slide.id} className="snap-start">
              {slide.render(narrationProps)}
            </div>
          );
        })}
      </div>
    </DeckProvider>
  );
};

// Touch reference to satisfy unused warnings if any
void roadmapUseCases;

export default RoadmapDeck;