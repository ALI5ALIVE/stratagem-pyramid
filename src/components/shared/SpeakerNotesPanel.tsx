import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakerNotesPanelProps {
  title: string;
  script?: string;
  slideNumber?: number;
  totalSlides?: number;
}

/**
 * Sales-coach speaker notes panel.
 * Shows the current slide's narration script as on-screen rehearsal copy.
 * Mirrors the glassmorphism style of the narration bar (mem://ui/narration-control-bar).
 * Toggle: button in the panel, or "N" key.
 * Hidden in print (so PDF/PPTX exports stay clean).
 */
const SpeakerNotesPanel = ({ title, script, slideNumber, totalSlides }: SpeakerNotesPanelProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable ||
          target.closest("[role=dialog]"))
      ) {
        return;
      }
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="fixed bottom-20 left-4 z-40 print:hidden max-w-md w-[min(28rem,calc(100vw-2rem))]">
      <div
        className={cn(
          "rounded-xl border border-border/40 bg-background/70 backdrop-blur-md shadow-lg",
          "transition-all duration-200",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-2 px-3 py-2 text-left"
          title="Toggle speaker notes (N)"
        >
          <NotebookPen className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/80 shrink-0">
            Speaker Notes
          </span>
          <span className="text-[11px] text-muted-foreground truncate flex-1">
            · {title}
            {slideNumber !== undefined && totalSlides !== undefined
              ? ` · ${slideNumber + 1}/${totalSlides}`
              : ""}
          </span>
          {open ? (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          ) : (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          )}
        </button>
        {open && (
          <div className="border-t border-border/30 px-3 py-3 max-h-[40vh] overflow-y-auto">
            {script ? (
              <p className="text-xs leading-relaxed text-foreground/85 whitespace-pre-wrap">
                {script}
              </p>
            ) : (
              <p className="text-xs italic text-muted-foreground">
                No speaker notes for this slide yet.
              </p>
            )}
            <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/60">
              Press N to toggle · Use the play bar to hear it spoken
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakerNotesPanel;
