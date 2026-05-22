import pptxgen from "pptxgenjs";
import { PPTX_BRAND, paintBackground, loadImageAsBase64 } from "@/lib/pptxBrand";
import logoUrl from "@/assets/comply365-logo-white.png";
import {
  aiSolutions,
  noAISolution,
  productColumns,
  solutionColors,
} from "@/data/aiInfographic";
import type { BuildOpts } from "./types";

const W = PPTX_BRAND.size.w; // 13.333
const H = PPTX_BRAND.size.h; // 7.5
const C = PPTX_BRAND.color;

/** Builds a single-slide PPTX matching the source AI Solutions infographic. */
export async function buildAIInfographicDeck(opts: BuildOpts = {}): Promise<Blob> {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pptx.title = "Comply365 — AI Capabilities";
  pptx.author = "Comply365";

  opts.onProgress?.(0, 1, "AI Capabilities");

  const slide = pptx.addSlide();
  paintBackground(slide, "light");

  // Title
  slide.addText("Comply365 — AI Capabilities", {
    x: 0.5, y: 0.35, w: W - 1, h: 0.45,
    fontFace: PPTX_BRAND.font.display, fontSize: 22, bold: true,
    color: C.bg, align: "left",
  });
  slide.addText("AI Solutions mapped to ContentManager365, TrainingManager365 and SafetyManager365 capabilities.", {
    x: 0.5, y: 0.8, w: W - 1, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 11, color: C.subtle, align: "left",
  });

  // Layout grid: 4 columns
  const gridTop = 1.4;
  const gridBottom = H - 0.7;
  const gridH = gridBottom - gridTop;
  const colGap = 0.25;
  const margin = 0.5;
  const colW = (W - margin * 2 - colGap * 3) / 4;

  const columnsX: Record<string, number> = {};
  const headerH = 0.45;
  const cellH = 0.5;
  const cellGap = 0.18;

  // 1) AI Solutions column (left)
  const solX = margin;
  columnsX["solutions"] = solX;
  // outer panel
  slide.addShape("roundRect", {
    x: solX, y: gridTop, w: colW, h: gridH,
    fill: { color: "EFF6FF" }, line: { color: "BFDBFE", width: 1 },
    rectRadius: 0.15,
  });
  // header
  slide.addShape("roundRect", {
    x: solX + 0.15, y: gridTop + 0.15, w: colW - 0.3, h: headerH,
    fill: { color: C.primary }, line: { type: "none" }, rectRadius: 0.1,
  });
  slide.addText("AI Solutions", {
    x: solX + 0.15, y: gridTop + 0.15, w: colW - 0.3, h: headerH,
    fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true,
    color: "FFFFFF", align: "center", valign: "middle",
  });

  // Solution chips
  const solCenters: Record<string, { x: number; y: number }> = {};
  let cy = gridTop + 0.15 + headerH + 0.25;
  aiSolutions.forEach((sol) => {
    const chipX = solX + 0.2;
    const chipW = colW - 0.4;
    slide.addShape("roundRect", {
      x: chipX, y: cy, w: chipW, h: cellH,
      fill: { color: solutionColors[sol.id].pptx },
      line: { type: "none" }, rectRadius: 0.08,
    });
    slide.addText(sol.label, {
      x: chipX, y: cy, w: chipW, h: cellH,
      fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: true,
      color: "FFFFFF", align: "center", valign: "middle",
    });
    solCenters[sol.id] = { x: chipX + chipW, y: cy + cellH / 2 };
    cy += cellH + cellGap;
  });

  // No AI chip near bottom
  const noAiY = gridBottom - 0.2 - cellH;
  const chipX = solX + 0.2;
  const chipW = colW - 0.4;
  slide.addShape("roundRect", {
    x: chipX, y: noAiY, w: chipW, h: cellH,
    fill: { color: solutionColors.noai.pptx },
    line: { type: "none" }, rectRadius: 0.08,
  });
  slide.addText("No AI", {
    x: chipX, y: noAiY, w: chipW, h: cellH,
    fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: true,
    color: "FFFFFF", align: "center", valign: "middle",
  });
  solCenters["noai"] = { x: chipX + chipW, y: noAiY + cellH / 2 };

  // 2-4) Product columns
  const rowCenters: Record<string, { x: number; y: number }> = {};
  productColumns.forEach((col, idx) => {
    const colX = margin + (idx + 1) * (colW + colGap);
    columnsX[col.id] = colX;
    slide.addShape("roundRect", {
      x: colX, y: gridTop, w: colW, h: gridH,
      fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addShape("roundRect", {
      x: colX + 0.15, y: gridTop + 0.15, w: colW - 0.3, h: headerH,
      fill: { color: C.primary }, line: { type: "none" }, rectRadius: 0.1,
    });
    slide.addText(col.product, {
      x: colX + 0.15, y: gridTop + 0.15, w: colW - 0.3, h: headerH,
      fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true,
      color: "FFFFFF", align: "center", valign: "middle",
    });

    let ry = gridTop + 0.15 + headerH + 0.25;
    col.rows.forEach((row) => {
      const rX = colX + 0.2;
      const rW = colW - 0.4;
      slide.addShape("roundRect", {
        x: rX, y: ry, w: rW, h: cellH,
        fill: { color: row.ai ? "DBEAFE" : "E2E8F0" },
        line: { color: row.ai ? "93C5FD" : "CBD5E1", width: 0.75 },
        rectRadius: 0.08,
      });
      slide.addText(row.label, {
        x: rX, y: ry, w: rW, h: cellH,
        fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: true,
        color: row.ai ? "1E3A8A" : "475569", align: "center", valign: "middle",
      });
      rowCenters[row.id] = { x: rX, y: ry + cellH / 2 };
      ry += cellH + cellGap;
    });
  });

  // Connector arrows: from each solution to each target row
  const allSolutions = [...aiSolutions, noAISolution];
  allSolutions.forEach((sol) => {
    const from = solCenters[sol.id];
    if (!from) return;
    const color = sol.tier === "ai" ? "3B82F6" : "94A3B8";
    sol.targets.forEach((tid) => {
      const to = rowCenters[tid];
      if (!to) return;
      slide.addShape("line", {
        x: from.x, y: from.y, w: to.x - from.x, h: to.y - from.y,
        line: { color, width: 1, endArrowType: "triangle" },
      });
    });
  });

  // Footer: logo + page number
  try {
    const logo = await loadImageAsBase64(logoUrl);
    slide.addImage({ data: logo, x: 0.5, y: H - 0.55, w: 1.1, h: 0.32 });
  } catch {
    /* ignore */
  }
  slide.addText("1", {
    x: W - 0.7, y: H - 0.5, w: 0.4, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.subtle, align: "right",
  });

  opts.onProgress?.(1, 1, "AI Capabilities");

  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  return blob;
}