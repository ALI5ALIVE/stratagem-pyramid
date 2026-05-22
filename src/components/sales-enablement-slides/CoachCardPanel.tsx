import { useMemo, useState } from "react";
import { ChevronRight, Download, GraduationCap, Lightbulb, MessageSquareQuote, AlertTriangle, ArrowRightCircle, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  coachCardWeeks,
  getCoachCard,
  salesEnablementCoachCards,
  type CoachCardWeek,
} from "@/data/salesEnablementCoachCards";
import { getSalesEnablementNarration } from "@/data/salesEnablementNarration";

interface CoachCardPanelProps {
  activeSlideId: string | undefined;
  /** Number of the active slide in the deck (1-based for display). */
  activeSlideNumber?: number;
}

const fieldStyles = {
  remember: { icon: Lightbulb, label: "Remember this", color: "text-amber-300", ring: "ring-amber-500/30" },
  sayItLikeThis: { icon: MessageSquareQuote, label: "Say it like this", color: "text-emerald-300", ring: "ring-emerald-500/30" },
  watchOutFor: { icon: AlertTriangle, label: "Watch out for", color: "text-rose-300", ring: "ring-rose-500/30" },
  bridge: { icon: ArrowRightCircle, label: "Bridge", color: "text-sky-300", ring: "ring-sky-500/30" },
} as const;

const detectWeek = (slideId: string | undefined): CoachCardWeek | undefined => {
  if (!slideId) return undefined;
  return coachCardWeeks.find((w) => w.slideIds.includes(slideId));
};

const CoachCardPanel = ({ activeSlideId, activeSlideNumber }: CoachCardPanelProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const card = activeSlideId ? getCoachCard(activeSlideId) : undefined;
  const week = useMemo(() => detectWeek(activeSlideId), [activeSlideId]);

  const downloadWeekKit = async (target: CoachCardWeek) => {
    setDownloading(target.id);
    const toastId = toast.loading(`Building Week ${target.number} Field Kit…`);
    try {
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 48;
      const contentW = pageW - margin * 2;
      let y = margin;

      const ensureSpace = (needed: number) => {
        if (y + needed > pageH - margin) {
          pdf.addPage();
          y = margin;
        }
      };

      // Cover
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(120);
      pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, y);
      y += 28;
      pdf.setFontSize(28);
      pdf.setTextColor(20);
      pdf.text(`Week ${target.number} Field Kit`, margin, y);
      y += 26;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(14);
      pdf.setTextColor(80);
      pdf.text(target.title, margin, y);
      y += 22;
      pdf.setFontSize(10);
      pdf.setTextColor(120);
      pdf.text(
        "Coach Cards — what to remember, what to say, what to avoid, how to bridge.",
        margin,
        y,
      );
      y += 14;
      pdf.text("Rep-facing reference. Not for customer distribution.", margin, y);
      y += 24;
      pdf.setDrawColor(220);
      pdf.line(margin, y, pageW - margin, y);
      y += 18;

      target.slideIds.forEach((slideId, idx) => {
        const cc = salesEnablementCoachCards[slideId];
        if (!cc) return;
        const narration = getSalesEnablementNarration(slideId);
        const title = narration?.title ?? slideId;

        ensureSpace(160);

        // Slide header
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.setTextColor(120);
        pdf.text(`${String(idx + 1).padStart(2, "0")}`, margin, y);
        pdf.setFontSize(13);
        pdf.setTextColor(20);
        const titleLines = pdf.splitTextToSize(title, contentW - 30);
        pdf.text(titleLines, margin + 28, y);
        y += titleLines.length * 16 + 4;

        const rows: Array<[string, string]> = [
          ["Remember", cc.remember],
          ["Say it", cc.sayItLikeThis],
          ["Watch out", cc.watchOutFor],
          ["Bridge", cc.bridge],
        ];

        pdf.setFont("helvetica", "normal");
        rows.forEach(([label, text]) => {
          const lines = pdf.splitTextToSize(text, contentW - 90);
          const blockH = Math.max(14, lines.length * 12) + 4;
          ensureSpace(blockH + 4);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(9);
          pdf.setTextColor(120);
          pdf.text(label.toUpperCase(), margin + 4, y + 10);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.setTextColor(30);
          pdf.text(lines, margin + 88, y + 10);
          y += blockH;
        });

        y += 6;
        pdf.setDrawColor(235);
        pdf.line(margin, y, pageW - margin, y);
        y += 14;
      });

      // Footer page numbers
      const total = pdf.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        pdf.setPage(i);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(160);
        pdf.text(
          `Comply365 · Week ${target.number} Field Kit · ${target.title}`,
          margin,
          pageH - 18,
        );
        pdf.text(`${i} / ${total}`, pageW - margin, pageH - 18, { align: "right" });
      }

      pdf.save(`Comply365-Week-${target.number}-Field-Kit.pdf`);
      toast.success(`Week ${target.number} Field Kit downloaded`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Field Kit export failed", { id: toastId });
    } finally {
      setDownloading(null);
    }
  };

  // Hidden state — small reopen tab
  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group flex items-center gap-1.5 px-2 py-3 rounded-l-lg border border-r-0 border-border bg-background/90 backdrop-blur hover:bg-background"
        aria-label="Show Coach Card"
      >
        <GraduationCap className="h-4 w-4 text-primary" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground hidden group-hover:inline">
          Coach
        </span>
      </button>
    );
  }

  return (
    <aside className="fixed right-3 top-1/2 -translate-y-1/2 z-40 w-[300px] max-h-[78vh] flex flex-col rounded-xl border border-border bg-background/95 backdrop-blur shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border bg-muted/40">
        <div className="flex items-center gap-1.5 min-w-0">
          <GraduationCap className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Coach Card</span>
          {week && (
            <span className="text-[10px] text-primary font-medium truncate">
              · W{week.number} {week.title}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
          aria-label="Hide Coach Card"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Card body */}
      <div className="px-3 py-3 overflow-y-auto flex-1 space-y-2.5">
        {!card && (
          <p className="text-[11px] text-muted-foreground italic">
            No coach card for this slide yet.
          </p>
        )}
        {card &&
          (Object.keys(fieldStyles) as Array<keyof typeof fieldStyles>).map((key) => {
            const style = fieldStyles[key];
            const Icon = style.icon;
            return (
              <div
                key={key}
                className={cn(
                  "rounded-lg border border-border bg-card/60 px-2.5 py-2 ring-1 ring-inset",
                  style.ring,
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={cn("h-3 w-3", style.color)} />
                  <span className={cn("text-[9px] uppercase tracking-wider font-semibold", style.color)}>
                    {style.label}
                  </span>
                </div>
                <p className="text-[11.5px] leading-snug text-foreground/90">{card[key]}</p>
              </div>
            );
          })}
      </div>

      {/* PDF downloads */}
      <div className="border-t border-border bg-muted/30 px-3 py-2.5 space-y-1.5">
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1">
          Field Kit (PDF)
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {coachCardWeeks.map((w) => (
            <Button
              key={w.id}
              size="sm"
              variant={week?.id === w.id ? "default" : "outline"}
              className="h-7 px-1 text-[10px]"
              disabled={downloading !== null}
              onClick={() => downloadWeekKit(w)}
            >
              {downloading === w.id ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  <Download className="h-2.5 w-2.5 mr-1" />W{w.number}
                </>
              )}
            </Button>
          ))}
        </div>
        {activeSlideNumber !== undefined && (
          <p className="text-[9px] text-muted-foreground text-center pt-0.5">
            Slide {activeSlideNumber}
          </p>
        )}
      </div>
    </aside>
  );
};

export default CoachCardPanel;