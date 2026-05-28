import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

const PAGE_W = 1920;
const PAGE_H = 1080;
const RENDER_W = 1400; // matches max-w-[1400px] on the page

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

const PositioningPlaybookPDFButton = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    setIsExporting(true);
    const toastId = toast.loading("Preparing PDF…");

    // Flip page into export mode (expands tabs, hides header/button)
    document.documentElement.dataset.pdfExport = "true";

    try {
      // Allow re-render for [data-pdf-export] conditional content
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      if ((document as any).fonts?.ready) await (document as any).fonts.ready;

      const root = document.querySelector<HTMLElement>("[data-pdf-root]");
      if (!root) throw new Error("PDF root not found");

      await waitForImages(root);
      await new Promise((r) => setTimeout(r, 200));

      toast.loading("Rendering page…", { id: toastId });

      const bg = getComputedStyle(document.body).backgroundColor || "#0a0f1c";

      const canvas = await html2canvas(root, {
        scale: 2,
        useCORS: true,
        backgroundColor: bg,
        width: RENDER_W,
        windowWidth: RENDER_W,
        logging: false,
      });

      // Slice the tall canvas into landscape pages, snapping breaks to section bounds
      const pageRatio = PAGE_H / PAGE_W;
      const sliceHeightPx = Math.floor(canvas.width * pageRatio); // canvas px per page

      // Collect section boundary offsets (canvas px, scale=2)
      const rootRect = root.getBoundingClientRect();
      const sectionEls = Array.from(root.querySelectorAll<HTMLElement>("[data-pdf-section]"));
      const breakpoints: number[] = [0];
      sectionEls.forEach((el) => {
        const top = (el.getBoundingClientRect().top - rootRect.top) * 2;
        if (top > 0) breakpoints.push(Math.floor(top));
      });
      breakpoints.push(canvas.height);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [PAGE_W, PAGE_H],
        hotfixes: ["px_scaling"],
      });

      let cursor = 0;
      let pageIdx = 0;
      while (cursor < canvas.height) {
        const desiredEnd = cursor + sliceHeightPx;
        // Find the largest breakpoint <= desiredEnd that's strictly > cursor
        let snap = desiredEnd;
        if (desiredEnd < canvas.height) {
          const candidate = [...breakpoints].reverse().find((b) => b > cursor + sliceHeightPx * 0.4 && b <= desiredEnd);
          if (candidate) snap = candidate;
        } else {
          snap = canvas.height;
        }
        const sliceH = snap - cursor;

        // Render this slice onto its own canvas at full page width
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeightPx;
        const ctx = pageCanvas.getContext("2d")!;
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0, cursor, canvas.width, sliceH,
          0, 0, canvas.width, sliceH
        );

        const imgData = pageCanvas.toDataURL("image/jpeg", 0.92);
        if (pageIdx > 0) pdf.addPage([PAGE_W, PAGE_H], "landscape");
        pdf.addImage(imgData, "JPEG", 0, 0, PAGE_W, PAGE_H);

        cursor = snap;
        pageIdx += 1;
        if (pageIdx > 200) break; // safety
      }

      pdf.save("Comply365-Positioning-Playbook.pdf");
      toast.success(`Exported ${pageIdx} page${pageIdx > 1 ? "s" : ""}`, { id: toastId });
    } catch (err) {
      console.error("Positioning PDF export failed:", err);
      toast.error("PDF export failed. See console.", { id: toastId });
    } finally {
      delete document.documentElement.dataset.pdfExport;
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={exportPDF}
      disabled={isExporting}
      data-pdf-hide
      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition disabled:opacity-60"
    >
      {isExporting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
      {isExporting ? "Exporting…" : "Download PDF"}
    </button>
  );
};

export default PositioningPlaybookPDFButton;