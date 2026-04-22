import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SlideNavigationProvider } from "@/contexts/SlideNavigationContext";

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

    // On-viewport but invisible host so html2canvas captures correctly
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "0";
    host.style.top = "0";
    host.style.width = `${FRAME_W}px`;
    host.style.height = `${FRAME_H}px`;
    host.style.overflow = "hidden";
    host.style.background = "#0a0f1c";
    host.style.opacity = "0";
    host.style.pointerEvents = "none";
    host.style.zIndex = "-1";
    document.body.appendChild(host);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [FRAME_W, FRAME_H],
      hotfixes: ["px_scaling"],
    });

    let warnings = 0;

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
        slideHost.style.position = "relative";
        slideHost.style.background = "#0a0f1c";
        host.appendChild(slideHost);

        const root = createRoot(slideHost);
        const SlideComponent = slide.component;

        try {
          root.render(
            <BrowserRouter>
              <SidebarProvider>
                <SlideNavigationProvider>
                  <div style={{ width: FRAME_W, height: FRAME_H, position: "relative" }}>
                    <SlideComponent slideNumber={i} />
                  </div>
                </SlideNavigationProvider>
              </SidebarProvider>
            </BrowserRouter>
          );

          // Wait for React commit + paint
          await new Promise<void>((r) =>
            requestAnimationFrame(() => requestAnimationFrame(() => r()))
          );
          if ((document as any).fonts?.ready) {
            await (document as any).fonts.ready;
          }
          await waitForImages(slideHost);
          // Settle gradients/SVG
          await new Promise((r) => setTimeout(r, 120));

          const canvas = await html2canvas(slideHost, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#0a0f1c",
            width: FRAME_W,
            height: FRAME_H,
            windowWidth: FRAME_W,
            windowHeight: FRAME_H,
            logging: false,
          });

          const imgData = canvas.toDataURL("image/jpeg", 0.92);
          if (i > 0) pdf.addPage([FRAME_W, FRAME_H], "landscape");
          pdf.addImage(imgData, "JPEG", 0, 0, FRAME_W, FRAME_H);
        } catch (slideErr) {
          console.error(`Slide ${i + 1} (${slide.label}) failed to render:`, slideErr);
          warnings += 1;
          if (i > 0) pdf.addPage([FRAME_W, FRAME_H], "landscape");
          pdf.setFillColor(10, 15, 28);
          pdf.rect(0, 0, FRAME_W, FRAME_H, "F");
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(48);
          pdf.text(`Slide ${i + 1} failed to render`, FRAME_W / 2, FRAME_H / 2 - 20, { align: "center" });
          pdf.setFontSize(24);
          pdf.setTextColor(180, 180, 180);
          pdf.text(slide.label, FRAME_W / 2, FRAME_H / 2 + 30, { align: "center" });
        } finally {
          try { root.unmount(); } catch {}
          slideHost.remove();
        }
      }

      pdf.save(filename);
      if (warnings > 0) {
        toast.warning(`${deckLabel} exported with ${warnings} warning${warnings > 1 ? "s" : ""}`, { id: toastId });
      } else {
        toast.success(`${deckLabel} exported (${slides.length} slides)`, { id: toastId });
      }
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