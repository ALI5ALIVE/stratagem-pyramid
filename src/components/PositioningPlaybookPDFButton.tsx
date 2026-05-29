import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { playbookMeta } from "@/data/positioningPlaybook";

const PAGE_W = 1920;
const PAGE_H = 1080;

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

const PositioningPlaybookPDFButton = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    setIsExporting(true);
    const toastId = toast.loading("Preparing PDF…");

    document.documentElement.dataset.pdfExport = "true";

    // Off-screen stage host
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-100000px";
    host.style.top = "0";
    host.style.width = `${CONTENT_W}px`;
    host.style.background = BG;
    host.style.zIndex = "-1";
    document.body.appendChild(host);

    try {
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      if ((document as any).fonts?.ready) await (document as any).fonts.ready;

      const root = document.querySelector<HTMLElement>("[data-pdf-root]");
      if (!root) throw new Error("PDF root not found");

      const sectionEls = Array.from(root.querySelectorAll<HTMLElement>("[data-pdf-section]"));
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [PAGE_W, PAGE_H],
        hotfixes: ["px_scaling"],
      });

      // PASS 1: Build pages by packing each section's children into stage-sized pages.
      type PagePlan = { label: string; nodes: HTMLElement[]; isContinuation: boolean; hero: HTMLElement | null };
      const plans: PagePlan[] = [];

      for (let s = 0; s < sectionEls.length; s++) {
        const sec = sectionEls[s];
        const label = sec.dataset.pdfTitle || `Section ${s + 1}`;

        // Clone section into stage to measure
        const stage = document.createElement("div");
        stage.setAttribute("data-pdf-stage", "");
        stage.style.width = `${CONTENT_W}px`;
        stage.style.padding = "0";
        stage.style.boxSizing = "border-box";
        host.innerHTML = "";
        host.appendChild(stage);

        const clone = sec.cloneNode(true) as HTMLElement;
        // Identify hero (first child of section) vs body children
        const childArr = Array.from(clone.children) as HTMLElement[];
        const hero = childArr[0] || null;
        const bodyChildren = childArr.slice(1);

        // Try whole section first
        clone.style.width = "100%";
        stage.appendChild(clone);
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        const fullH = stage.scrollHeight;

        if (fullH <= CONTENT_H || bodyChildren.length === 0) {
          plans.push({ label, nodes: [clone], isContinuation: false, hero: null });
        } else {
          // Pack body children across pages; hero on first page only
          stage.innerHTML = "";
          let currentNodes: HTMLElement[] = [];
          let isFirst = true;
          const flush = () => {
            if (currentNodes.length === 0) return;
            plans.push({
              label,
              nodes: currentNodes,
              isContinuation: !isFirst,
              hero: isFirst && hero ? (hero.cloneNode(true) as HTMLElement) : null,
            });
            isFirst = false;
            currentNodes = [];
          };

          // Build a fresh measurement page
          const newPage = () => {
            stage.innerHTML = "";
            if (isFirst && hero) {
              stage.appendChild(hero.cloneNode(true) as HTMLElement);
            } else if (!isFirst) {
              const cont = document.createElement("div");
              cont.style.cssText = `font-family:${FONT_BODY};font-size:11px;color:${MUTED};letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;`;
              cont.textContent = `${label} · continued`;
              stage.appendChild(cont);
            }
          };
          newPage();

          for (const child of bodyChildren) {
            const c = child.cloneNode(true) as HTMLElement;
            stage.appendChild(c);
            await new Promise<void>((r) => requestAnimationFrame(() => r()));
            if (stage.scrollHeight > CONTENT_H && currentNodes.length > 0) {
              stage.removeChild(c);
              flush();
              newPage();
              stage.appendChild(c);
              await new Promise<void>((r) => requestAnimationFrame(() => r()));
            }
            currentNodes.push(c);
          }
          flush();
        }
      }

      const totalPages = plans.length + 1; // +1 cover

      // Cover
      {
        const cover = makePageCanvas();
        drawCover(cover.getContext("2d")!);
        pdf.addImage(cover.toDataURL("image/jpeg", 0.94), "JPEG", 0, 0, PAGE_W, PAGE_H);
      }

      // Render each page
      for (let i = 0; i < plans.length; i++) {
        const plan = plans[i];
        toast.loading(`Rendering page ${i + 2} of ${totalPages}`, { id: toastId });

        // Build stage for this page
        const stage = document.createElement("div");
        stage.setAttribute("data-pdf-stage", "");
        stage.style.width = `${CONTENT_W}px`;
        stage.style.minHeight = `${CONTENT_H}px`;
        stage.style.background = BG;
        stage.style.boxSizing = "border-box";
        stage.style.display = "flex";
        stage.style.flexDirection = "column";
        host.innerHTML = "";
        host.appendChild(stage);

        if (plan.hero) stage.appendChild(plan.hero);
        if (plan.isContinuation) {
          const cont = document.createElement("div");
          cont.style.cssText = `font-family:${FONT_BODY};font-size:11px;color:${MUTED};letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;`;
          cont.textContent = `${plan.label} · continued`;
          stage.appendChild(cont);
        }
        for (const n of plan.nodes) stage.appendChild(n);

        await waitForImages(stage);
        if ((document as any).fonts?.ready) await (document as any).fonts.ready;
        await new Promise((r) => setTimeout(r, 50));

        const measuredH = Math.min(stage.scrollHeight, CONTENT_H);
        // Vertically center short content
        if (measuredH < CONTENT_H * 0.85) {
          stage.style.justifyContent = "center";
          stage.style.height = `${CONTENT_H}px`;
        }

        const snap = await html2canvas(stage, {
          scale: 2,
          useCORS: true,
          backgroundColor: BG,
          width: CONTENT_W,
          height: CONTENT_H,
          windowWidth: CONTENT_W,
          windowHeight: CONTENT_H,
          logging: false,
        });

        const pageCanvas = makePageCanvas();
        const ctx = pageCanvas.getContext("2d")!;
        drawFrame(ctx, plan.label, i + 2, totalPages);
        ctx.drawImage(snap, 0, 0, snap.width, snap.height, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H);

        pdf.addPage([PAGE_W, PAGE_H], "landscape");
        pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, PAGE_W, PAGE_H);
      }

      pdf.save("Comply365-Positioning-Playbook.pdf");
      toast.success(`Exported ${totalPages} pages`, { id: toastId });
    } catch (err) {
      console.error("Positioning PDF export failed:", err);
      toast.error("PDF export failed. See console.", { id: toastId });
    } finally {
      host.remove();
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