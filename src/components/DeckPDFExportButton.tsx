import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface SlideDef {
  id: string;
  label: string;
  component: React.ComponentType<any>;
}

interface DeckPDFExportButtonProps {
  slides: SlideDef[];
  filename: string;
  deckLabel: string;
  className?: string;
}

const FRAME_W = 1920;
const FRAME_H = 1080;

const waitForImages = async (root: HTMLElement) => {
  const imgs = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          })
    )
  );
};

const DeckPDFExportButton: React.FC<DeckPDFExportButtonProps> = ({
  slides,
  filename,
  deckLabel,
  className,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    setIsExporting(true);
    const toastId = toast.loading(`Preparing ${deckLabel} export…`);

    // Offscreen capture container fixed at design resolution
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-20000px";
    host.style.top = "0";
    host.style.width = `${FRAME_W}px`;
    host.style.height = `${FRAME_H}px`;
    host.style.overflow = "hidden";
    host.style.background = "#000";
    host.style.zIndex = "-1";
    document.body.appendChild(host);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [FRAME_W, FRAME_H],
      hotfixes: ["px_scaling"],
    });

    try {
      // Ensure fonts are loaded once up front
      if ((document as any).fonts?.ready) {
        await (document as any).fonts.ready;
      }

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        toast.loading(`Exporting slide ${i + 1} of ${slides.length} — ${slide.label}`, {
          id: toastId,
        });

        const slideHost = document.createElement("div");
        slideHost.style.width = `${FRAME_W}px`;
        slideHost.style.height = `${FRAME_H}px`;
        host.appendChild(slideHost);

        const root = createRoot(slideHost);
        const SlideComponent = slide.component;

        await new Promise<void>((resolve) => {
          root.render(
            <BrowserRouter>
              <div style={{ width: FRAME_W, height: FRAME_H }}>
                <SlideComponent slideNumber={i} />
              </div>
            </BrowserRouter>
          );
          // Allow React to commit + layout
          setTimeout(resolve, 250);
        });

        // Wait for fonts (again, in case of late swaps) and images
        if ((document as any).fonts?.ready) {
          await (document as any).fonts.ready;
        }
        await waitForImages(slideHost);
        // Small extra settle for gradients/SVG
        await new Promise((r) => setTimeout(r, 150));

        const target = slideHost.firstElementChild as HTMLElement;
        const canvas = await html2canvas(target ?? slideHost, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#000000",
          width: FRAME_W,
          height: FRAME_H,
          windowWidth: FRAME_W,
          windowHeight: FRAME_H,
          logging: false,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage([FRAME_W, FRAME_H], "landscape");
        pdf.addImage(imgData, "JPEG", 0, 0, FRAME_W, FRAME_H);

        root.unmount();
        slideHost.remove();
      }

      pdf.save(filename);
      toast.success(`${deckLabel} exported (${slides.length} slides)`, { id: toastId });
    } catch (err) {
      console.error("PDF export failed:", err);
      toast.error("PDF export failed. See console for details.", { id: toastId });
    } finally {
      host.remove();
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={exportPDF}
      disabled={isExporting}
      variant="outline"
      size="sm"
      className={className}
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Exporting…
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Download Deck PDF
        </>
      )}
    </Button>
  );
};

export default DeckPDFExportButton;