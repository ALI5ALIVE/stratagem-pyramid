import { useEffect, useRef, useState, ReactNode } from "react";
import { useSidebar } from "@/components/ui/sidebar";

interface Props {
  slideIds: string[];
  children: ReactNode;
}

/**
 * Vertical snap scroller used by both the full Sales Enablement deck
 * and per-module lesson views in the Academy.
 * The container expects each direct child to be a full-viewport section.
 */
export default function LessonScroller({ slideIds, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { open, setOpen } = useSidebar();
  const [, setCurrent] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const slideHeight = container.clientHeight;
      if (open) setOpen(false);
      setCurrent(Math.round(container.scrollTop / slideHeight));
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [open, setOpen]);

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
      const container = containerRef.current;
      if (!container) return;
      const idx = Math.round(container.scrollTop / container.clientHeight);
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        const next = Math.min(idx + 1, slideIds.length - 1);
        const el = document.getElementById(slideIds[next]);
        el?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const next = Math.max(idx - 1, 0);
        const el = document.getElementById(slideIds[next]);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideIds]);

  return (
    <div className="relative min-h-screen bg-background">
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}