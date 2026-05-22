import jsPDF from "jspdf";
import {
  salesEnablementCoachCards,
  type CoachCardWeek,
} from "@/data/salesEnablementCoachCards";
import { getSalesEnablementNarration } from "@/data/salesEnablementNarration";
import {
  SLIDE_DISCOVERY,
  SLIDE_OBJECTIONS,
  WEEK_DISCOVERY_FALLBACK,
  WEEK_OBJECTION_FALLBACK,
  type SlideObjection,
} from "@/data/salesEnablementSlideAids";

// ─── Brand tokens (RGB tuples for jsPDF) ─────────────────────────────────────
const C = {
  ink: [11, 18, 32] as [number, number, number],
  paper: [255, 255, 255] as [number, number, number],
  paperWarm: [250, 251, 253] as [number, number, number],
  navy: [11, 26, 74] as [number, number, number],
  navyDeep: [8, 16, 44] as [number, number, number],
  brand: [0, 102, 255] as [number, number, number],
  slate: [31, 41, 55] as [number, number, number],
  muted: [91, 103, 118] as [number, number, number],
  subtle: [138, 149, 165] as [number, number, number],
  hairline: [229, 234, 240] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  offwhite: [244, 247, 251] as [number, number, number],
  // Field accents
  amber: [217, 119, 6] as [number, number, number],
  amberSoft: [254, 243, 199] as [number, number, number],
  emerald: [5, 150, 105] as [number, number, number],
  emeraldSoft: [209, 250, 229] as [number, number, number],
  rose: [225, 29, 72] as [number, number, number],
  roseSoft: [254, 226, 232] as [number, number, number],
  sky: [2, 132, 199] as [number, number, number],
  skoftSoft: [224, 242, 254] as [number, number, number],
  // DTOP
  dBlue: [61, 139, 255] as [number, number, number],
  tAmber: [245, 158, 11] as [number, number, number],
  oViolet: [139, 92, 246] as [number, number, number],
  pEmerald: [16, 185, 129] as [number, number, number],
};

const setFill = (pdf: jsPDF, c: [number, number, number]) => pdf.setFillColor(c[0], c[1], c[2]);
const setStroke = (pdf: jsPDF, c: [number, number, number]) => pdf.setDrawColor(c[0], c[1], c[2]);
const setText = (pdf: jsPDF, c: [number, number, number]) => pdf.setTextColor(c[0], c[1], c[2]);

// ─── Per-week metadata (curated; kept inline to avoid editing data file) ─────
interface WeekMeta {
  subtitle: string;
  outcomes: string[];
  closingLine: string;
  drillQuestions: string[];
  practiceCue: string;
}
const WEEK_META: Record<CoachCardWeek["id"], WeekMeta> = {
  w1: {
    subtitle: "Foundation — the market shift, the platform in plain English, and the DTOP loop.",
    outcomes: [
      "Pitch the platform in one sentence — and name the four bands in order.",
      "Draw the DTOP loop on a whiteboard in 90 seconds, in colour, without notes.",
      "Name the four signal sources and convert them into a discovery question.",
    ],
    closingLine:
      "One platform, three Core Apps, intelligence on top, mobile on the device, DTOP wrapping it all.",
    drillQuestions: [
      "Can I deliver the one-sentence platform pitch without reading?",
      "Can I draw DTOP in colour, in order, in under 90 seconds?",
      "Can I name the four signal sources in the canonical order?",
      "Can I ask the wedge question after Detect without pausing?",
      "Do I know which terms are banned (FOQA, FDM, ASAP) and what to say instead?",
    ],
    practiceCue: "Run the 'whiteboard DTOP' scenario in Practice Center against the Operational persona.",
  },
  w2: {
    subtitle: "Capabilities — how the four bands fit together and why the intelligence layer is the moat.",
    outcomes: [
      "Explain the difference between Insights, Intelligence, and Automation in plain English.",
      "Anchor the 90% vs 35% accuracy headline correctly — and defend it.",
      "Tour the capability stack and end with Unified Mobile as the last mile.",
    ],
    closingLine:
      "Insights see the signal, Intelligence reasons about it, Automation moves the work, Mobile lands it on the device.",
    drillQuestions: [
      "Can I tell the three intelligence tiers apart without using product names?",
      "Can I cite ~90% domain vs ~35% generic accuracy correctly?",
      "Do I know one use case per capability band and can I tell it in 60 seconds?",
      "Can I handle the 'we'll build it internally' objection without flinching?",
      "Can I close Week 2 with the capstone whiteboard?",
    ],
    practiceCue: "Run the 'capability tour' scenario in Practice Center against the Technical persona.",
  },
  w3: {
    subtitle: "Sell & Win — discovery, footprint, objections, and the Strategy & Vision Session close.",
    outcomes: [
      "Map any account to a footprint pattern (single / two / all three Core Apps).",
      "Run a discovery call that surfaces the wedge in under 20 minutes.",
      "Land the Strategy & Vision Session as the natural next step.",
    ],
    closingLine:
      "Pick the account, run the call, pick the use case, handle the objection, close, book the Strategy & Vision Session.",
    drillQuestions: [
      "Can I diagnose a footprint pattern from three discovery answers?",
      "Do I have a question bank entry ready for every persona?",
      "Can I offer the Strategy & Vision Session without scoping it?",
      "Can I name the three differentiators that anchor every close?",
      "Can I run the 30-day capstone end-to-end without prompts?",
    ],
    practiceCue: "Run the 'discovery to close' scenario in Practice Center across all three personas.",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Extract a "core idea" line from a slide's narration script. */
const extractCoreLine = (slideId: string): string | undefined => {
  const n = getSalesEnablementNarration(slideId);
  if (!n) return undefined;
  // Look for "core message:" / "core message you must internalise:" patterns
  const m = n.script.match(/core message[^.:]*[:.]\s*([^.]+\.)/i);
  if (m) return m[1].trim();
  // Fallback: first sentence
  const first = n.script.split(/\.\s/)[0];
  return first ? first.trim().replace(/\.$/, "") + "." : undefined;
};

const FIELD_STYLES = {
  remember: {
    label: "REMEMBER THIS",
    accent: C.amber,
    soft: C.amberSoft,
  },
  sayItLikeThis: {
    label: "SAY IT LIKE THIS",
    accent: C.emerald,
    soft: C.emeraldSoft,
  },
  watchOutFor: {
    label: "WATCH OUT FOR",
    accent: C.rose,
    soft: C.roseSoft,
  },
  bridge: {
    label: "BRIDGE TO NEXT",
    accent: C.sky,
    soft: C.skoftSoft,
  },
} as const;

type FieldKey = keyof typeof FIELD_STYLES;

// ─── Narration paraphrasing ──────────────────────────────────────────────────
const FILLER_OPENERS = [
  /^this slide matters because[^.]*\.\s*/i,
  /^why this matters[^.:]*[:.]\s*/i,
  /^this is the[^.]*and it does the heavy lifting[^.]*\.\s*/i,
  /^this slide[^.]*\.\s*/i,
];

const FILLER_SENTENCES = [
  /when you deliver this[^.]*\./gi,
  /slow down[^.]*\./gi,
  /delivery tip[^.:]*[:.][^.]*\./gi,
  /^next[^.]*\.\s*$/gim,
];

/** Deterministic paraphrase of a teaching script → coaching summary. */
const paraphraseNarration = (script: string): string => {
  let s = script.trim();
  FILLER_OPENERS.forEach((re) => { s = s.replace(re, ""); });
  FILLER_SENTENCES.forEach((re) => { s = s.replace(re, ""); });

  // Voice shift: 2nd person teaching → 3rd person coaching
  const subs: Array<[RegExp, string]> = [
    [/\byou must internalise\b/gi, "reps should internalise"],
    [/\byou must\b/gi, "reps need to"],
    [/\byour job is\b/gi, "the rep's job is"],
    [/\byour job\b/gi, "the rep's job"],
    [/\byou're addressing\b/gi, "this addresses"],
    [/\byou are\b/gi, "the rep is"],
    [/\byou'll\b/gi, "reps will"],
    [/\byou can\b/gi, "reps can"],
    [/\byou\b/gi, "the rep"],
    [/\byour\b/gi, "the rep's"],
    [/\bthe core message[^.:]*[:.]\s*/gi, "Core message: "],
    [/\bthe pain[^.:]*[:.]\s*/gi, "Pain: "],
    [/\bthe value lever[^.:]*[:.]\s*/gi, "Value lever: "],
  ];
  subs.forEach(([re, repl]) => { s = s.replace(re, repl); });

  // Split into sentences, dedupe, drop short fragments, dropt next-slide cues
  const sentences = s
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 25 && !/^next[\s,]/i.test(x) && !/^then\s/i.test(x));

  // Prefer sentences anchored to core/pain/value
  const ranked = [
    ...sentences.filter((x) => /^Core message:/i.test(x)),
    ...sentences.filter((x) => /^Pain:/i.test(x)),
    ...sentences.filter((x) => /^Value lever:/i.test(x)),
    ...sentences.filter(
      (x) => !/^(Core message|Pain|Value lever):/i.test(x),
    ),
  ];

  let out = "";
  for (const sent of ranked) {
    if ((out + " " + sent).length > 540) break;
    out = out ? `${out} ${sent}` : sent;
  }
  // Tidy spacing
  out = out.replace(/\s{2,}/g, " ").trim();
  // Ensure ends with .
  if (out && !/[.!?]$/.test(out)) out += ".";
  return out;
};

/** Pull customer-signal cues from narration; fallback to generic per-week. */
const extractListenFor = (script: string, weekId: CoachCardWeek["id"]): string[] => {
  const out: string[] = [];
  // Discovery questions framed in quotes or starting with "which/how/what"
  const qMatch = script.match(/['"]([^'".?]{15,120}\?)['"]/g);
  if (qMatch) {
    qMatch.slice(0, 1).forEach((q) => {
      out.push(`They ask ${q.replace(/^['"]|['"]$/g, "").trim()}`);
    });
  }
  // "their answer almost always points at X" pattern
  const wedge = script.match(/(?:their answer|the wedge)[^.]{10,140}\./i);
  if (wedge) out.push(wedge[0].replace(/^./, (c) => c.toUpperCase()));

  const fallback: Record<CoachCardWeek["id"], string[]> = {
    w1: [
      "They lean in when DTOP is drawn — not when features are listed.",
      "They name a stack they've already tried to stitch together themselves.",
    ],
    w2: [
      "They ask how the intelligence layer differs from a generic chatbot.",
      "They start naming internal data sources they want connected.",
    ],
    w3: [
      "They volunteer the names of two stakeholders who should be in the next meeting.",
      "They ask what the Strategy & Vision Session would actually cover.",
    ],
  };
  while (out.length < 2) out.push(fallback[weekId][out.length]);
  return out.slice(0, 2);
};

/** Soft-clip text to fit a max line count for splitTextToSize results. */
const clipLines = (lines: string[], max: number): string[] => {
  if (lines.length <= max) return lines;
  const kept = lines.slice(0, max);
  const last = kept[max - 1];
  kept[max - 1] = last.replace(/[\s,.;:]*$/, "") + "…";
  return kept;
};

/** Merge narration-extracted + curated discovery questions, dedupe, cap 3. */
const buildDiscoveryQuestions = (
  script: string | undefined,
  slideId: string,
  weekId: CoachCardWeek["id"],
): string[] => {
  const fromScript: string[] = [];
  if (script) {
    const qMatch = script.match(/['"]([^'".?]{15,140}\?)['"]/g);
    if (qMatch) {
      qMatch.forEach((q) => fromScript.push(q.replace(/^['"]|['"]$/g, "").trim()));
    }
  }
  const curated = SLIDE_DISCOVERY[slideId] ?? [];
  const merged: string[] = [];
  const seen = new Set<string>();
  [...curated, ...fromScript].forEach((q) => {
    const norm = q.toLowerCase().replace(/[^a-z0-9? ]/g, "").trim();
    if (!seen.has(norm) && q.length <= 160) {
      seen.add(norm);
      merged.push(q);
    }
  });
  if (merged.length === 0) merged.push(...WEEK_DISCOVERY_FALLBACK[weekId]);
  return merged.slice(0, 3);
};

/** Per-slide objections with per-week fallback. */
const buildObjections = (slideId: string, weekId: CoachCardWeek["id"]): SlideObjection[] => {
  const curated = SLIDE_OBJECTIONS[slideId];
  if (curated && curated.length) return curated.slice(0, 2);
  return WEEK_OBJECTION_FALLBACK[weekId].slice(0, 2);
};

// ─── PDF Builder ─────────────────────────────────────────────────────────────
export const buildWeekFieldKitPdf = (week: CoachCardWeek): jsPDF => {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const meta = WEEK_META[week.id];

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;

  // ── Chrome helpers ─────────────────────────────────────────────────────────
  const drawHeader = (label: string) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setText(pdf, C.subtle);
    pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 28);
    pdf.setFont("helvetica", "normal");
    setText(pdf, C.muted);
    pdf.text(label, pageW - margin, 28, { align: "right" });
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 36, pageW - margin, 36);
  };

  const drawFooter = () => {
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(margin, pageH - 32, pageW - margin, pageH - 32);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    setText(pdf, C.subtle);
    pdf.text(
      `Comply365 · Week ${week.number} Field Kit · ${week.title}`,
      margin,
      pageH - 18,
    );
    pdf.text("Rep-facing · Not for customer distribution", pageW - margin, pageH - 18, {
      align: "right",
    });
  };

  const stampPageNumbers = () => {
    const total = pdf.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      pdf.setPage(i);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      setText(pdf, C.subtle);
      pdf.text(`${i} / ${total}`, pageW / 2, pageH - 18, { align: "center" });
    }
  };

  // ── 1. COVER PAGE ──────────────────────────────────────────────────────────
  // Dark navy hero
  setFill(pdf, C.navyDeep);
  pdf.rect(0, 0, pageW, pageH * 0.46, "F");
  // Brand accent bar
  setFill(pdf, C.brand);
  pdf.rect(0, pageH * 0.46 - 6, pageW * 0.32, 6, "F");

  // Wordmark
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  setText(pdf, [180, 200, 230]);
  pdf.text("COMPLY365", margin, 64);
  pdf.setFont("helvetica", "normal");
  setText(pdf, [120, 140, 175]);
  pdf.text("SALES ENABLEMENT ACADEMY", margin + 78, 64);

  // Title block
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  setText(pdf, [120, 160, 220]);
  pdf.text(`WEEK ${week.number}  ·  FIELD KIT`, margin, pageH * 0.22);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(40);
  setText(pdf, C.white);
  pdf.text(week.title, margin, pageH * 0.22 + 44);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(13);
  setText(pdf, [200, 215, 235]);
  const subLines = pdf.splitTextToSize(meta.subtitle, contentW * 0.78);
  pdf.text(subLines, margin, pageH * 0.22 + 78);

  // Outcomes block (white card overlap)
  const cardY = pageH * 0.46 - 24;
  const cardX = margin;
  const cardH = 168;
  const cardW = contentW;
  setFill(pdf, C.white);
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(1);
  pdf.roundedRect(cardX, cardY, cardW, cardH, 8, 8, "FD");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.brand);
  pdf.text("WHAT YOU'LL BE ABLE TO DO BY FRIDAY", cardX + 20, cardY + 26);
  let oy = cardY + 50;
  meta.outcomes.forEach((o, i) => {
    // Number chip
    setFill(pdf, C.brand);
    pdf.circle(cardX + 26, oy - 4, 9, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setText(pdf, C.white);
    pdf.text(String(i + 1), cardX + 26, oy - 1, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    setText(pdf, C.slate);
    const lines = pdf.splitTextToSize(o, cardW - 70);
    pdf.text(lines, cardX + 44, oy);
    oy += lines.length * 14 + 12;
  });

  // Legend
  const legY = cardY + cardH + 28;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.muted);
  pdf.text("CARD LEGEND", margin, legY);
  const legend: Array<[string, [number, number, number]]> = [
    ["Remember this", C.amber],
    ["Say it like this", C.emerald],
    ["Watch out for", C.rose],
    ["Bridge to next", C.sky],
  ];
  const colW = contentW / 4;
  legend.forEach(([label, color], i) => {
    const x = margin + i * colW;
    setFill(pdf, color);
    pdf.rect(x, legY + 10, 16, 4, "F");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    setText(pdf, C.slate);
    pdf.text(label, x + 22, legY + 14);
  });

  // Locked terminology mini-ref
  const termY = legY + 38;
  setFill(pdf, C.offwhite);
  pdf.roundedRect(margin, termY, contentW, 78, 6, 6, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.muted);
  pdf.text("LOCKED TERMINOLOGY — USE THESE, NEVER THE OTHERS", margin + 16, termY + 18);
  const terms: Array<[string, string]> = [
    ["Operational Data", "not FOQA / FDM / ASAP"],
    ["Generative AI", "not 'the AI' / LLM"],
    ["Recommended Actions", "not 'suggestions'"],
    ["BrandNumber names", "Comply365, SafetyManager365 (no spaces)"],
  ];
  const tColW = contentW / 2;
  terms.forEach((t, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = margin + 16 + col * tColW;
    const y = termY + 38 + row * 18;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    setText(pdf, C.slate);
    pdf.text(t[0], x, y);
    pdf.setFont("helvetica", "normal");
    setText(pdf, C.muted);
    pdf.text(t[1], x + pdf.getTextWidth(t[0]) + 6, y);
  });

  // ── 2. WEEK AT A GLANCE ────────────────────────────────────────────────────
  pdf.addPage();
  drawHeader(`Week ${week.number} · ${week.title}`);

  let y = 70;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setText(pdf, C.ink);
  pdf.text("Week at a glance", margin, y);
  y += 8;
  setFill(pdf, C.brand);
  pdf.rect(margin, y, 36, 3, "F");
  y += 24;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  setText(pdf, C.muted);
  const intro = `${week.slideIds.length} slides — each one a teaching moment. The bold line is the one thing you must internalise before the next call.`;
  const introLines = pdf.splitTextToSize(intro, contentW);
  pdf.text(introLines, margin, y);
  y += introLines.length * 13 + 18;

  week.slideIds.forEach((slideId, idx) => {
    const cc = salesEnablementCoachCards[slideId];
    const narration = getSalesEnablementNarration(slideId);
    if (!cc) return;
    const title = narration?.title ?? slideId;

    const rowH = 38;
    if (y + rowH > pageH - 60) {
      drawFooter();
      pdf.addPage();
      drawHeader(`Week ${week.number} · ${week.title}`);
      y = 70;
    }

    // Index
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setText(pdf, C.subtle);
    pdf.text(String(idx + 1).padStart(2, "0"), margin, y + 4);

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    setText(pdf, C.ink);
    const titleLines = pdf.splitTextToSize(title, contentW - 36);
    pdf.text(titleLines, margin + 28, y + 4);

    // Remember (one-liner)
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    setText(pdf, C.muted);
    const remLines = pdf.splitTextToSize(cc.remember, contentW - 36);
    pdf.text(remLines.slice(0, 2), margin + 28, y + 4 + titleLines.length * 13);

    const used = titleLines.length * 13 + Math.min(remLines.length, 2) * 12 + 12;
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(margin + 28, y + used, pageW - margin, y + used);
    y += used + 8;
  });

  drawFooter();

  // ── 3. SLIDE CARDS ─────────────────────────────────────────────────────────
  week.slideIds.forEach((slideId, idx) => {
    const cc = salesEnablementCoachCards[slideId];
    if (!cc) return;
    const narration = getSalesEnablementNarration(slideId);
    const title = narration?.title ?? slideId;
    const coreLine = extractCoreLine(slideId);
    const summary = narration ? paraphraseNarration(narration.script) : "";
    const questions = buildDiscoveryQuestions(narration?.script, slideId, week.id);
    const objections = buildObjections(slideId, week.id);

    // Landscape page for slide cards
    pdf.addPage("a4", "landscape");
    const lPageW = pdf.internal.pageSize.getWidth();
    const lPageH = pdf.internal.pageSize.getHeight();
    const lMargin = 36;
    const lContentW = lPageW - lMargin * 2;

    // Header (landscape variant)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setText(pdf, C.subtle);
    pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", lMargin, 22);
    pdf.setFont("helvetica", "normal");
    setText(pdf, C.muted);
    pdf.text(
      `Week ${week.number} · ${week.title}  ·  Slide ${idx + 1} of ${week.slideIds.length}`,
      lPageW - lMargin,
      22,
      { align: "right" },
    );
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(lMargin, 30, lPageW - lMargin, 30);

    // ── LEFT COLUMN ──────────────────────────────────────────────────────────
    const leftX = lMargin;
    const colGap = 18;
    const leftW = lContentW * 0.5;
    const rightX = leftX + leftW + colGap;
    const rightW = lContentW - leftW - colGap;

    // Title block (compact)
    const tbY = 42;
    const tbH = 52;
    setFill(pdf, C.navyDeep);
    pdf.rect(leftX, tbY, leftW, tbH, "F");
    setFill(pdf, C.brand);
    pdf.rect(leftX, tbY, 3, tbH, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    setText(pdf, [140, 175, 230]);
    pdf.text(`SLIDE ${String(idx + 1).padStart(2, "0")}`, leftX + 14, tbY + 17);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    setText(pdf, C.white);
    const tLines = clipLines(pdf.splitTextToSize(title, leftW - 28), 2);
    pdf.text(tLines, leftX + 14, tbY + 34);

    let ly = tbY + tbH + 16;

    // Core idea
    if (coreLine) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      setText(pdf, C.brand);
      pdf.text("THE CORE IDEA", leftX, ly);
      ly += 12;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      setText(pdf, C.ink);
      const coreLines = clipLines(pdf.splitTextToSize(coreLine, leftW), 2);
      pdf.text(coreLines, leftX, ly);
      ly += coreLines.length * 12 + 14;
    }

    // Teaching summary
    if (summary) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      setText(pdf, C.muted);
      pdf.text("TEACHING SUMMARY", leftX, ly);
      ly += 12;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      setText(pdf, C.slate);
      // Reserve room for the coach chip strip at bottom of left col
      const chipStripH = 44;
      const availableH = lPageH - 60 - ly - chipStripH - 10;
      const maxLines = Math.max(6, Math.floor(availableH / 11));
      const sumLines = clipLines(pdf.splitTextToSize(summary, leftW), maxLines);
      pdf.text(sumLines, leftX, ly, { lineHeightFactor: 1.35 });
      ly += sumLines.length * 11 + 12;
    }

    // ── Coach chip strip (bottom of left column) ─────────────────────────────
    const chipY = lPageH - 50 - 44;
    const chipDefs: Array<{ key: FieldKey; label: string; text: string }> = [
      { key: "remember", label: "REMEMBER", text: cc.remember },
      { key: "sayItLikeThis", label: "SAY IT", text: cc.sayItLikeThis },
      { key: "watchOutFor", label: "WATCH OUT", text: cc.watchOutFor },
      { key: "bridge", label: "BRIDGE", text: cc.bridge },
    ];
    const chipGap = 6;
    const chipW = (leftW - chipGap * 3) / 4;
    chipDefs.forEach((chip, i) => {
      drawCoachChip(
        pdf,
        leftX + i * (chipW + chipGap),
        chipY,
        chipW,
        44,
        chip.key,
        chip.label,
        chip.text,
      );
    });

    // ── RIGHT COLUMN: Questions + Objections ─────────────────────────────────
    let ry = tbY;

    // KEY QUESTIONS TO ASK
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setText(pdf, C.brand);
    pdf.text("KEY QUESTIONS TO ASK", rightX, ry + 8);
    setFill(pdf, C.brand);
    pdf.rect(rightX, ry + 12, 18, 2, "F");
    ry += 24;

    questions.forEach((q, i) => {
      // Numbered chip
      setFill(pdf, C.brand);
      pdf.circle(rightX + 7, ry + 3, 7, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      setText(pdf, C.white);
      pdf.text(String(i + 1), rightX + 7, ry + 5.5, { align: "center" });
      // Question text
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(9);
      setText(pdf, C.slate);
      const lines = clipLines(
        pdf.splitTextToSize(`\u201C${q}\u201D`, rightW - 24),
        3,
      );
      pdf.text(lines, rightX + 20, ry + 6, { lineHeightFactor: 1.3 });
      ry += lines.length * 11 + 8;
    });

    ry += 8;
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(rightX, ry, rightX + rightW, ry);
    ry += 14;

    // OBJECTIONS YOU'LL HEAR
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setText(pdf, C.rose);
    pdf.text("OBJECTIONS YOU'LL HEAR — AND THE APPROVED ANSWER", rightX, ry);
    setFill(pdf, C.rose);
    pdf.rect(rightX, ry + 4, 18, 2, "F");
    ry += 18;

    const objAvail = lPageH - 60 - ry;
    const objH = Math.min(76, (objAvail - 8) / objections.length);
    objections.forEach((o) => {
      drawObjectionBlock(pdf, rightX, ry, rightW, objH, o);
      ry += objH + 8;
    });

    // Micro footer strip
    const mfY = lPageH - 38;
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(lMargin, mfY, lPageW - lMargin, mfY);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    setText(pdf, C.subtle);
    pdf.text(
      `Comply365 · Week ${week.number} Field Kit · ${week.title}`,
      lMargin,
      mfY + 14,
    );
    pdf.text(
      "Time on slide ~60–90s   ·   Drill rating: ☐ 1  ☐ 2  ☐ 3  ☐ 4  ☐ 5",
      lPageW - lMargin,
      mfY + 14,
      { align: "right" },
    );
  });

  // ── 4. CLOSING PAGE ────────────────────────────────────────────────────────
  pdf.addPage();
  drawHeader(`Week ${week.number} · ${week.title}`);

  let zy = 70;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setText(pdf, C.ink);
  pdf.text("Closing drill", margin, zy);
  zy += 8;
  setFill(pdf, C.brand);
  pdf.rect(margin, zy, 36, 3, "F");
  zy += 26;

  // 60-second elevator
  setFill(pdf, C.navyDeep);
  pdf.roundedRect(margin, zy, contentW, 76, 8, 8, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, [140, 175, 230]);
  pdf.text("60-SECOND ELEVATOR — SAY THIS OUT LOUD", margin + 20, zy + 22);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  setText(pdf, C.white);
  const elev = pdf.splitTextToSize(`"${meta.closingLine}"`, contentW - 40);
  pdf.text(elev, margin + 20, zy + 44);
  zy += 76 + 24;

  // Self-check
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.muted);
  pdf.text("SELF-CHECK — TICK EACH ONE BEFORE YOUR NEXT CALL", margin, zy);
  zy += 18;
  meta.drillQuestions.forEach((q) => {
    // checkbox
    setStroke(pdf, C.muted);
    pdf.setLineWidth(0.8);
    pdf.rect(margin, zy - 9, 11, 11, "S");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    setText(pdf, C.slate);
    const lines = pdf.splitTextToSize(q, contentW - 24);
    pdf.text(lines, margin + 20, zy);
    zy += lines.length * 13 + 8;
  });

  zy += 12;
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, zy, pageW - margin, zy);
  zy += 20;

  // Practice cue
  setFill(pdf, C.offwhite);
  pdf.roundedRect(margin, zy, contentW, 60, 6, 6, "F");
  setFill(pdf, C.brand);
  pdf.rect(margin, zy, 3, 60, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.brand);
  pdf.text("PRACTICE CENTER", margin + 16, zy + 20);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  setText(pdf, C.slate);
  const pcLines = pdf.splitTextToSize(meta.practiceCue, contentW - 32);
  pdf.text(pcLines, margin + 16, zy + 38);

  drawFooter();
  stampPageNumbers();

  return pdf;

  // ── Inner: field panel ─────────────────────────────────────────────────────
  function drawFieldPanel(
    pdfInner: jsPDF,
    x: number,
    yPos: number,
    w: number,
    h: number,
    key: FieldKey,
    text: string,
  ) {
    const style = FIELD_STYLES[key];
    // soft background
    setFill(pdfInner, style.soft);
    pdfInner.roundedRect(x, yPos, w, h, 6, 6, "F");
    // left accent bar
    setFill(pdfInner, style.accent);
    pdfInner.rect(x, yPos, 4, h, "F");
    // border
    setStroke(pdfInner, C.hairline);
    pdfInner.setLineWidth(0.5);
    pdfInner.roundedRect(x, yPos, w, h, 6, 6, "S");
    // label
    pdfInner.setFont("helvetica", "bold");
    pdfInner.setFontSize(8);
    setText(pdfInner, style.accent);
    pdfInner.text(style.label, x + 14, yPos + 20);
    // body
    const isQuote = key === "sayItLikeThis";
    pdfInner.setFont("helvetica", isQuote ? "bolditalic" : "normal");
    pdfInner.setFontSize(11);
    setText(pdfInner, C.slate);
    const body = isQuote ? `\u201C${text}\u201D` : text;
    const lines = pdfInner.splitTextToSize(body, w - 28);
    pdfInner.text(lines, x + 14, yPos + 40);
  }
};

function drawFieldPanelCompact(
  pdfInner: jsPDF,
  x: number,
  yPos: number,
  w: number,
  h: number,
  key: FieldKey,
  text: string,
) {
  const style = FIELD_STYLES[key];
  setFill(pdfInner, style.soft);
  pdfInner.roundedRect(x, yPos, w, h, 5, 5, "F");
  setFill(pdfInner, style.accent);
  pdfInner.rect(x, yPos, 3, h, "F");
  setStroke(pdfInner, C.hairline);
  pdfInner.setLineWidth(0.4);
  pdfInner.roundedRect(x, yPos, w, h, 5, 5, "S");

  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(7);
  setText(pdfInner, style.accent);
  pdfInner.text(style.label, x + 10, yPos + 14);

  const isQuote = key === "sayItLikeThis";
  pdfInner.setFont("helvetica", isQuote ? "bolditalic" : "normal");
  pdfInner.setFontSize(9);
  setText(pdfInner, C.slate);
  const body = isQuote ? `\u201C${text}\u201D` : text;
  const lines = clipLines(pdfInner.splitTextToSize(body, w - 22), Math.floor((h - 24) / 11));
  pdfInner.text(lines, x + 10, yPos + 28, { lineHeightFactor: 1.3 });
}

function drawCoachChip(
  pdfInner: jsPDF,
  x: number,
  yPos: number,
  w: number,
  h: number,
  key: FieldKey,
  label: string,
  text: string,
) {
  const style = FIELD_STYLES[key];
  setFill(pdfInner, style.soft);
  pdfInner.roundedRect(x, yPos, w, h, 4, 4, "F");
  setFill(pdfInner, style.accent);
  pdfInner.rect(x, yPos, w, 2, "F");
  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(6.5);
  setText(pdfInner, style.accent);
  pdfInner.text(label, x + 6, yPos + 12);
  pdfInner.setFont("helvetica", "normal");
  pdfInner.setFontSize(7.5);
  setText(pdfInner, C.slate);
  const lines = clipLines(pdfInner.splitTextToSize(text, w - 12), 3);
  pdfInner.text(lines, x + 6, yPos + 22, { lineHeightFactor: 1.25 });
}

function drawObjectionBlock(
  pdfInner: jsPDF,
  x: number,
  yPos: number,
  w: number,
  h: number,
  o: { pushback: string; response: string },
) {
  // Container
  setFill(pdfInner, [253, 242, 245]);
  pdfInner.roundedRect(x, yPos, w, h, 4, 4, "F");
  setFill(pdfInner, C.rose);
  pdfInner.rect(x, yPos, 3, h, "F");

  // Pushback row
  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(8);
  setText(pdfInner, C.rose);
  pdfInner.text("\u25B8", x + 10, yPos + 12);
  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(8.5);
  setText(pdfInner, C.ink);
  const pLines = clipLines(pdfInner.splitTextToSize(o.pushback, w - 26), 2);
  pdfInner.text(pLines, x + 20, yPos + 12);
  const afterPushY = yPos + 12 + pLines.length * 10 + 4;

  // Response row
  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(8);
  setText(pdfInner, C.emerald);
  pdfInner.text("\u21B3", x + 10, afterPushY);
  pdfInner.setFont("helvetica", "normal");
  pdfInner.setFontSize(8);
  setText(pdfInner, C.slate);
  const maxRespLines = Math.max(2, Math.floor((h - (afterPushY - yPos) - 6) / 10));
  const rLines = clipLines(pdfInner.splitTextToSize(o.response, w - 26), maxRespLines);
  pdfInner.text(rLines, x + 20, afterPushY, { lineHeightFactor: 1.3 });
}

export const downloadWeekFieldKit = (week: CoachCardWeek) => {
  const pdf = buildWeekFieldKitPdf(week);
  pdf.save(`Comply365-Week-${week.number}-${week.title.replace(/\s+/g, "-")}-Field-Kit.pdf`);
};
