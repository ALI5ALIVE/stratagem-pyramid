import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { playbookMeta } from "@/data/positioningPlaybook";

const PAGE_W = 1920;
const PAGE_H = 1080;
const RENDER_W = 1400; // matches max-w-[1400px] on the page

// Chrome dimensions (in PDF page px = canvas px)
const FRAME_INSET = 32;
const HEADER_H = 64;
const FOOTER_H = 48;
const CONTENT_GUTTER = 20;
const CONTENT_X = FRAME_INSET + CONTENT_GUTTER;
const CONTENT_Y = FRAME_INSET + HEADER_H + CONTENT_GUTTER;
const CONTENT_W = PAGE_W - 2 * CONTENT_X;
const CONTENT_H = PAGE_H - CONTENT_Y - FRAME_INSET - FOOTER_H - CONTENT_GUTTER;

const BG = "#0a0f1c";
const INK = "#e6ecf5";
const MUTED = "#7d8aa1";
const PRIMARY = "#3D8BFF";
const HAIRLINE = "rgba(255,255,255,0.10)";

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

const FONT_DISPLAY = "'Space Grotesk', 'Inter', sans-serif";
const FONT_BODY = "'Inter', 'Helvetica Neue', sans-serif";

function makePageCanvas() {
  const c = document.createElement("canvas");
  c.width = PAGE_W;
  c.height = PAGE_H;
  return c;
}

function drawFrame(ctx: CanvasRenderingContext2D, sectionLabel: string, pageNum: number, totalPages: number) {
  // background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);

  // outer hairline
  ctx.strokeStyle = HAIRLINE;
  ctx.lineWidth = 1;
  const r = 12;
  const x = FRAME_INSET, y = FRAME_INSET, w = PAGE_W - 2 * FRAME_INSET, h = PAGE_H - 2 * FRAME_INSET;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.stroke();

  // header text
  const headerBaseY = FRAME_INSET + HEADER_H - 20;
  ctx.fillStyle = INK;
  ctx.font = `600 18px ${FONT_BODY}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Comply365  ·  Positioning & Messaging Playbook", FRAME_INSET + 24, headerBaseY);

  ctx.fillStyle = PRIMARY;
  ctx.font = `600 16px ${FONT_BODY}`;
  ctx.textAlign = "right";
  ctx.fillText(sectionLabel, PAGE_W - FRAME_INSET - 24, headerBaseY);

  // header rule
  ctx.strokeStyle = HAIRLINE;
  ctx.beginPath();
  ctx.moveTo(FRAME_INSET + 16, FRAME_INSET + HEADER_H);
  ctx.lineTo(PAGE_W - FRAME_INSET - 16, FRAME_INSET + HEADER_H);
  ctx.stroke();

  // footer rule
  ctx.beginPath();
  ctx.moveTo(FRAME_INSET + 16, PAGE_H - FRAME_INSET - FOOTER_H);
  ctx.lineTo(PAGE_W - FRAME_INSET - 16, PAGE_H - FRAME_INSET - FOOTER_H);
  ctx.stroke();

  // footer text
  const footerY = PAGE_H - FRAME_INSET - 18;
  ctx.fillStyle = MUTED;
  ctx.font = `500 13px ${FONT_BODY}`;

  ctx.textAlign = "left";
  ctx.fillText(`v${playbookMeta.version}  ·  Updated ${playbookMeta.updated}`, FRAME_INSET + 24, footerY);

  ctx.textAlign = "center";
  ctx.fillText("Internal GTM use only", PAGE_W / 2, footerY);

  ctx.textAlign = "right";
  ctx.fillStyle = INK;
  ctx.fillText(`Page ${pageNum} of ${totalPages}`, PAGE_W - FRAME_INSET - 24, footerY);
}

function drawCover(ctx: CanvasRenderingContext2D) {
  // background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);

  // gradient orbs
  const orb1 = ctx.createRadialGradient(PAGE_W * 0.7, PAGE_H * 0.3, 50, PAGE_W * 0.7, PAGE_H * 0.3, 600);
  orb1.addColorStop(0, "rgba(61,139,255,0.28)");
  orb1.addColorStop(1, "rgba(61,139,255,0)");
  ctx.fillStyle = orb1;
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);

  const orb2 = ctx.createRadialGradient(PAGE_W * 0.2, PAGE_H * 0.8, 30, PAGE_W * 0.2, PAGE_H * 0.8, 500);
  orb2.addColorStop(0, "rgba(139,92,246,0.18)");
  orb2.addColorStop(1, "rgba(139,92,246,0)");
  ctx.fillStyle = orb2;
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);

  // outer hairline
  ctx.strokeStyle = HAIRLINE;
  ctx.lineWidth = 1;
  ctx.strokeRect(FRAME_INSET, FRAME_INSET, PAGE_W - 2 * FRAME_INSET, PAGE_H - 2 * FRAME_INSET);

  // kicker
  ctx.fillStyle = PRIMARY;
  ctx.font = `700 18px ${FONT_BODY}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.letterSpacing = "4px" as any;
  ctx.fillText("POSITIONING & MESSAGING PLAYBOOK", FRAME_INSET + 80, FRAME_INSET + 120);

  // hero title
  ctx.fillStyle = INK;
  ctx.font = `700 110px ${FONT_DISPLAY}`;
  ctx.fillText("From event to control.", FRAME_INSET + 80, PAGE_H / 2 - 20);

  // subline accent
  ctx.fillStyle = PRIMARY;
  ctx.font = `600 64px ${FONT_DISPLAY}`;
  ctx.fillText("On one platform.", FRAME_INSET + 80, PAGE_H / 2 + 70);

  // tagline
  ctx.fillStyle = MUTED;
  ctx.font = `400 24px ${FONT_BODY}`;
  ctx.fillText(
    "The canonical positioning, messaging, competitive frame and field kit for Comply365.",
    FRAME_INSET + 80,
    PAGE_H / 2 + 140
  );

  // bottom-left meta
  const metaY = PAGE_H - FRAME_INSET - 80;
  ctx.fillStyle = MUTED;
  ctx.font = `500 14px ${FONT_BODY}`;
  ctx.fillText(`v${playbookMeta.version}  ·  Updated ${playbookMeta.updated}`, FRAME_INSET + 80, metaY);
  ctx.fillText(playbookMeta.owners, FRAME_INSET + 80, metaY + 24);

  // bottom-right wordmark
  ctx.fillStyle = INK;
  ctx.font = `700 22px ${FONT_DISPLAY}`;
  ctx.textAlign = "right";
  ctx.fillText("Comply365", PAGE_W - FRAME_INSET - 80, metaY + 12);
}

type SectionRange = { topPx: number; bottomPx: number; label: string };

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

      const canvas = await html2canvas(root, {
        scale: 2,
        useCORS: true,
        backgroundColor: BG,
        width: RENDER_W,
        windowWidth: RENDER_W,
        logging: false,
      });

      // Map each Y range to a section label
      const rootRect = root.getBoundingClientRect();
      const sectionEls = Array.from(root.querySelectorAll<HTMLElement>("[data-pdf-section]"));
      const sectionRanges: SectionRange[] = sectionEls.map((el, i) => {
        const r = el.getBoundingClientRect();
        const top = Math.max(0, Math.floor((r.top - rootRect.top) * 2));
        const bottom = Math.floor((r.bottom - rootRect.top) * 2);
        const label = el.dataset.pdfTitle || `Section ${i}`;
        return { topPx: top, bottomPx: bottom, label };
      });
      const labelFor = (midY: number) => {
        const hit = sectionRanges.find((s) => midY >= s.topPx && midY < s.bottomPx);
        return hit?.label || "Positioning & Messaging Playbook";
      };
      const breakpoints = [0, ...sectionRanges.map((s) => s.topPx).filter((v) => v > 0), canvas.height];

      // Compute slice height in source canvas px so it fits inside the inner content rect
      // at content rect aspect (CONTENT_W × CONTENT_H), scaled by canvas.width / CONTENT_W.
      const scale = canvas.width / CONTENT_W;
      const sliceHeightPx = Math.floor(CONTENT_H * scale);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [PAGE_W, PAGE_H],
        hotfixes: ["px_scaling"],
      });

      // PASS 1: compute page count for "Page X of Y"
      const planned: { start: number; end: number }[] = [];
      let cursor = 0;
      while (cursor < canvas.height) {
        const desiredEnd = cursor + sliceHeightPx;
        let snap = desiredEnd;
        if (desiredEnd < canvas.height) {
          const candidate = [...breakpoints].reverse().find((b) => b > cursor + sliceHeightPx * 0.4 && b <= desiredEnd);
          if (candidate) snap = candidate;
        } else {
          snap = canvas.height;
        }
        planned.push({ start: cursor, end: snap });
        cursor = snap;
        if (planned.length > 200) break;
      }

      const totalPages = planned.length + 1; // +1 cover

      // PASS 2: cover
      {
        const cover = makePageCanvas();
        const ctx = cover.getContext("2d")!;
        drawCover(ctx);
        pdf.addImage(cover.toDataURL("image/jpeg", 0.94), "JPEG", 0, 0, PAGE_W, PAGE_H);
      }

      // PASS 3: content pages with chrome
      planned.forEach((slice, i) => {
        const pageCanvas = makePageCanvas();
        const ctx = pageCanvas.getContext("2d")!;
        const midY = (slice.start + slice.end) / 2;
        const label = labelFor(midY);
        drawFrame(ctx, label, i + 2, totalPages);

        const sliceH = slice.end - slice.start;
        // Scale slice to fit inside content rect width-preserving
        const drawW = CONTENT_W;
        const drawH = sliceH / scale;
        ctx.drawImage(
          canvas,
          0, slice.start, canvas.width, sliceH,
          CONTENT_X, CONTENT_Y, drawW, drawH
        );

        pdf.addPage([PAGE_W, PAGE_H], "landscape");
        pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, PAGE_W, PAGE_H);
      });

      pdf.save("Comply365-Positioning-Playbook.pdf");
      toast.success(`Exported ${totalPages} pages`, { id: toastId });
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