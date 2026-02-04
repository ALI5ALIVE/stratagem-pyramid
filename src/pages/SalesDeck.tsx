import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSalesNarrationBySlideId } from "@/data/salesDeckNarration";

// Sales slides
import SalesSlide0Title from "@/components/sales-slides/SalesSlide0Title";
import SalesSlide1Problem from "@/components/sales-slides/SalesSlide1Problem";
import SalesSlide2WhyNow from "@/components/sales-slides/SalesSlide2WhyNow";
import SalesSlide3BeforeAfter from "@/components/sales-slides/SalesSlide3BeforeAfter";
import SalesSlide4Solution from "@/components/sales-slides/SalesSlide4Solution";
import SalesSlide5UseCase from "@/components/sales-slides/SalesSlide5UseCase";
import SalesSlide6Journey from "@/components/sales-slides/SalesSlide6Journey";
import SalesSlide7Outcomes from "@/components/sales-slides/SalesSlide7Outcomes";
import SalesSlide8WhyUs from "@/components/sales-slides/SalesSlide8WhyUs";
import SalesSlide9NextSteps from "@/components/sales-slides/SalesSlide9NextSteps";

const slides = [
  { id: "sales-slide-0", label: "Title", component: SalesSlide0Title },
  { id: "sales-slide-1", label: "Problem", component: SalesSlide1Problem },
  { id: "sales-slide-2", label: "Why Now", component: SalesSlide2WhyNow },
  { id: "sales-slide-3", label: "Before/After", component: SalesSlide3BeforeAfter },
  { id: "sales-slide-4", label: "Solution", component: SalesSlide4Solution },
  { id: "sales-slide-5", label: "Use Case", component: SalesSlide5UseCase },
  { id: "sales-slide-6", label: "Journey", component: SalesSlide6Journey },
  { id: "sales-slide-7", label: "Outcomes", component: SalesSlide7Outcomes },
  { id: "sales-slide-8", label: "Why Us", component: SalesSlide8WhyUs },
  { id: "sales-slide-9", label: "Next Steps", component: SalesSlide9NextSteps },
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const SalesDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());

  // Fetch and play audio for a slide
  const fetchAndPlayAudio = async (slideId: string) => {
    // Check cache first
    if (cacheRef.current.has(slideId)) {
      return cacheRef.current.get(slideId)!;
    }

    const narration = getSalesNarrationBySlideId(slideId);
    if (!narration) {
      throw new Error(`No narration found for slide ${slideId}`);
    }

    const response = await fetch(`${SUPABASE_URL}/functions/v1/elevenlabs-tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        text: narration,
        voiceId: "JBFqnCBsd6RMkjVDRZzb", // George voice
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS request failed: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Cache the URL
    cacheRef.current.set(slideId, audioUrl);
    
    return audioUrl;
  };

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
    setProgress(0);
  }, []);

  const play = useCallback(async () => {
    const slideId = slides[currentSlide].id;
    
    // Stop any current audio
    stop();

    setIsLoading(true);
    setHasCompleted(false);

    try {
      const audioUrl = await fetchAndPlayAudio(slideId);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        if (audio.duration) {
          const prog = (audio.currentTime / audio.duration) * 100;
          setProgress(prog);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setProgress(100);
        setHasCompleted(true);
      };

      audio.onerror = () => {
        console.error("Audio playback error");
        setIsPlaying(false);
        setIsLoading(false);
      };

      await audio.play();
      
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to play narration:", error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [currentSlide, stop]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Track scroll position to update current slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const slideHeight = container.clientHeight;
      const newSlide = Math.round(scrollTop / slideHeight);
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < slides.length) {
        stop(); // Stop audio when changing slides
        setCurrentSlide(newSlide);
        setHasCompleted(false);
        setProgress(0);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentSlide, stop]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [currentSlide]);

  const navigateToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const slideElement = document.getElementById(slides[index].id);
    if (slideElement) {
      stop();
      slideElement.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
      setHasCompleted(false);
      setProgress(0);
    }
  }, [stop]);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      navigateToSlide(currentSlide + 1);
    }
  }, [currentSlide, navigateToSlide]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Dot navigation */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => navigateToSlide(i)}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "bg-primary scale-125"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to ${slide.label}`}
          >
            <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground whitespace-nowrap bg-background/80 px-2 py-1 rounded">
              {slide.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Slides container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {slides.map((slide, index) => {
          const SlideComponent = slide.component;
          const isCurrentSlide = index === currentSlide;

          // Common narration props
          const commonProps = {
            isPlaying: isCurrentSlide ? isPlaying : false,
            isLoading: isCurrentSlide ? isLoading : false,
            progress: isCurrentSlide ? progress : 0,
            hasCompleted: isCurrentSlide ? hasCompleted : false,
            onPlay: play,
            onPause: pause,
            onNextSlide: handleNextSlide,
          };

          // Title slide (index 0) and NextSteps (index 9) have their own slideNumber handling
          if (index === 0 || index === slides.length - 1) {
            return (
              <SlideComponent
                key={slide.id}
                slideNumber={index}
                {...commonProps}
              />
            );
          }

          // Regular slides
          return (
            <SlideComponent
              key={slide.id}
              slideNumber={index}
              {...commonProps}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SalesDeck;
