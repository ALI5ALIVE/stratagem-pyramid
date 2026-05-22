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
  SLIDE_PROOFS,
  WEEK_PROOF_FALLBACK,
  SLIDE_WHITEBOARD,
  WEEK_WHITEBOARD_FALLBACK,
  SLIDE_MISTAKE,
  WEEK_MISTAKE_FALLBACK,
  SLIDE_META,
  WEEK_META_FALLBACK,
  type SlideMeta,
} from "@/data/salesEnablementSlideAids";
import {
  buildSlideLearning,
  buildSlideLearningFromCoachCard,
  type SlideLearning,
  buildSlideOnePager,
  type SlideOnePager,
} from "@/data/salesEnablementLearningOutcomes";
import {
  buildStudyNote,
  collectWeekGlossary,
  type SlideOnePager as StudyNote,
  type StudyTerm,
} from "@/data/salesEnablementStudyNotes";

// ─── Glyph sanitiser ─────────────────────────────────────────────────────────
// helvetica core (jsPDF default) is Latin-1 only. Smart quotes, em-dashes,
// bullets, arrows etc. render as boxes or wrong glyphs. Sanitise at the
// write site so data files can stay readable.
const GLYPH_MAP: Array<[RegExp, string]> = [
  [/[\u2018\u2019\u02BC]/g, "'"],   // smart single quotes
  [/[\u201C\u201D]/g, '"'],         // smart double quotes
  [/[\u2013\u2014]/g, "-"],         // en/em dash
  [/\u2026/g, "..."],               // ellipsis
  [/[\u2022\u25CF\u25AA\u25A0]/g, "·"], // bullets to middle dot (Latin-1 safe)
  [/[\u2192\u27A1]/g, ">"],         // right arrows
  [/\u21B3/g, ">"],                 // turn arrow
  [/\u00A0/g, " "],                 // nbsp
];
const sanitize = (s: string | undefined): string => {
  if (!s) return "";
  let out = s;
  GLYPH_MAP.forEach(([re, rep]) => { out = out.replace(re, rep); });
  // strip anything still outside Latin-1
  out = out.replace(/[^\x00-\xFF]/g, "");
  return out;
};

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
const paraphraseNarration = (script: string, maxChars = 540): string => {
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
    if ((out + " " + sent).length > maxChars) break;
    out = out ? `${out} ${sent}` : sent;
  }
  // Tidy spacing
  out = out.replace(/\s{2,}/g, " ").trim();
  // Ensure ends with .
  if (out && !/[.!?]$/.test(out)) out += ".";
  return out;
};

/** Pull a representative "verbatim lift" — first quoted sentence, or first
 *  declarative line after stripping filler. */
const extractVerbatimLift = (script: string): string | undefined => {
  const q = script.match(/['"]([^'"\n]{20,180}[.!?])['"]/);
  if (q) return q[1].trim();
  // pull the first sentence anchored to "Core message"
  const core = script.match(/core message[^.:]*[:.]\s*([^.]{20,160}[.!?])/i);
  if (core) return core[1].trim();
  return undefined;
};

/** Bullet-form of the teaching summary. Splits into prioritized beats,
 *  promoting Core/Pain/Value-labelled sentences with a bold lead-in. */
type TeachingBullet = { lead?: string; text: string };
const paraphraseNarrationBullets = (
  script: string,
  maxBullets = 7,
): TeachingBullet[] => {
  let s = script.trim();
  FILLER_OPENERS.forEach((re) => { s = s.replace(re, ""); });
  FILLER_SENTENCES.forEach((re) => { s = s.replace(re, ""); });
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

  const sentences = s
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 25 && !/^next[\s,]/i.test(x) && !/^then\s/i.test(x));

  const seen = new Set<string>();
  const tagged: TeachingBullet[] = [];
  const push = (lead: string | undefined, text: string) => {
    const key = text.toLowerCase().replace(/[^a-z0-9 ]/g, "").slice(0, 60);
    if (!key || seen.has(key)) return;
    seen.add(key);
    let t = text.trim();
    if (t.length > 180) t = t.slice(0, 177).replace(/[,;:\s]+\S*$/, "") + "…";
    if (!/[.!?…]$/.test(t)) t += ".";
    tagged.push({ lead, text: t });
  };

  const labelMap: Array<[RegExp, string]> = [
    [/^Core message:\s*/i, "Core"],
    [/^Pain:\s*/i, "Pain"],
    [/^Value lever:\s*/i, "Value"],
  ];
  // Priority pass: labelled
  for (const [re, lead] of labelMap) {
    sentences
      .filter((x) => re.test(x))
      .forEach((x) => push(lead, x.replace(re, "")));
  }
  // Then unlabelled
  sentences
    .filter((x) => !labelMap.some(([re]) => re.test(x)))
    .forEach((x) => push(undefined, x));

  return tagged.slice(0, maxBullets);
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

/** Rotate fallback pools so consecutive slides don't show identical content. */
const rotatePool = <T,>(pool: T[], idx: number, take: number): T[] => {
  if (!pool.length) return [];
  const out: T[] = [];
  for (let i = 0; i < take && i < pool.length; i++) {
    out.push(pool[(idx + i) % pool.length]);
  }
  return out;
};

const buildObjectionsRotated = (
  slideId: string,
  weekId: CoachCardWeek["id"],
  idx: number,
): SlideObjection[] => {
  const curated = SLIDE_OBJECTIONS[slideId];
  if (curated && curated.length) return curated.slice(0, 2);
  return rotatePool(WEEK_OBJECTION_FALLBACK[weekId], idx, 2);
};

const buildDiscoveryQuestionsRotated = (
  script: string | undefined,
  slideId: string,
  weekId: CoachCardWeek["id"],
  idx: number,
): string[] => {
  const fromScript: string[] = [];
  if (script) {
    const qMatch = script.match(/['"]([^'".?]{15,140}\?)['"]/g);
    if (qMatch) qMatch.forEach((q) => fromScript.push(q.replace(/^['"]|['"]$/g, "").trim()));
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
  if (merged.length === 0) merged.push(...rotatePool(WEEK_DISCOVERY_FALLBACK[weekId], idx, 2));
  return merged.slice(0, 3);
};

const buildProofs = (slideId: string, weekId: CoachCardWeek["id"], idx: number): string[] => {
  const curated = SLIDE_PROOFS[slideId];
  if (curated && curated.length) return curated.slice(0, 3);
  const pools = WEEK_PROOF_FALLBACK[weekId];
  return pools[idx % pools.length];
};

const buildWhiteboard = (slideId: string, weekId: CoachCardWeek["id"]): string => {
  return SLIDE_WHITEBOARD[slideId] ?? WEEK_WHITEBOARD_FALLBACK[weekId];
};

const buildMistake = (slideId: string, weekId: CoachCardWeek["id"]): string => {
  return SLIDE_MISTAKE[slideId] ?? WEEK_MISTAKE_FALLBACK[weekId];
};

const buildMeta = (slideId: string, weekId: CoachCardWeek["id"]): SlideMeta => {
  return SLIDE_META[slideId] ?? WEEK_META_FALLBACK[weekId];
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
    pdf.text("Comply365 · Sales Enablement Academy", margin, 28);
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
    pdf.text("Rep-facing · not for customer distribution", pageW - margin, pageH - 18, {
      align: "right",
    });
  };

  const stampPageNumbers = () => {
    const total = pdf.getNumberOfPages();
    const chipText = (i: number) => `W${week.number} · ${i} / ${total}`;
    for (let i = 1; i <= total; i++) {
      pdf.setPage(i);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      const txt = chipText(i);
      const w = pdf.getTextWidth(txt) + 14;
      const h = 14;
      const cx = pageW / 2 - w / 2;
      const cy = pageH - 24;
      setFill(pdf, C.brand);
      pdf.roundedRect(cx, cy, w, h, h / 2, h / 2, "F");
      setText(pdf, C.white);
      pdf.text(txt, pageW / 2, cy + 9.5, { align: "center" });
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
  pdf.text("Comply365", margin, 64);
  pdf.setFont("helvetica", "normal");
  setText(pdf, [120, 140, 175]);
  pdf.text("Sales Enablement Academy", margin + 62, 64);

  // Title block
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  setText(pdf, [120, 160, 220]);
  pdf.text(`Week ${week.number}  ·  Field Kit`, margin, pageH * 0.22);

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
  pdf.text("How to use this kit", cardX + 20, cardY + 26);
  let oy = cardY + 50;
  const usageGuide = [
    "Every slide gets two pages: a one-page study sheet, then the full coach transcript verbatim for memorisation and self-recording.",
    "Study sheet — left rail: takeaway, why a buyer cares, watch-out, what this connects to. Right column: what's on the slide, ideas you must own, terms, facts.",
    "Transcript page — read it once before you record yourself, then close the kit. Never read the transcript live on a customer call.",
  ];
  usageGuide.forEach((o, i) => {
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
  pdf.text("Card legend", margin, legY);
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

  // Locked terminology mini-ref — two columns inside a padded card. Each
  // cell wraps its value if the label + value won't fit on one line, so
  // long entries (e.g. product names) can never run past the card edge.
  const termY = legY + 38;
  const termPadX = 16;
  const termPadY = 18;
  const termGutter = 18;
  const termColW = (contentW - termPadX * 2 - termGutter) / 2;
  const terms: Array<[string, string]> = [
    ["Operational Data", "not FOQA / FDM / ASAP"],
    ["Generative AI", "not 'the AI' / LLM"],
    ["Recommended Actions", "not 'suggestions'"],
    ["BrandNumber names", "Comply365, SafetyManager365"],
  ];
  // Pre-measure each row's height so the card stretches to fit.
  const termRowGap = 8;
  const labelSize = 9.5;
  const valueSize = 9;
  const labelLeading = 12;
  const valueLeading = 11.5;
  type TermRow = { left: typeof terms[number]; right?: typeof terms[number]; h: number };
  const wrapVal = (label: string, value: string): { onSameLine: boolean; lines: string[]; labelW: number } => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(labelSize);
    const labelW = pdf.getTextWidth(label + "  ");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(valueSize);
    const sameLineW = termColW - labelW;
    if (sameLineW > 60 && pdf.getTextWidth(value) <= sameLineW) {
      return { onSameLine: true, lines: [value], labelW };
    }
    const lines = pdf.splitTextToSize(value, termColW);
    return { onSameLine: false, lines, labelW };
  };
  const rows: TermRow[] = [];
  for (let i = 0; i < terms.length; i += 2) {
    const left = terms[i];
    const right = terms[i + 1];
    const lw = wrapVal(left[0], left[1]);
    const rw = right ? wrapVal(right[0], right[1]) : undefined;
    const lh = lw.onSameLine ? labelLeading : labelLeading + lw.lines.length * valueLeading;
    const rh = rw ? (rw.onSameLine ? labelLeading : labelLeading + rw.lines.length * valueLeading) : 0;
    rows.push({ left, right, h: Math.max(lh, rh) });
  }
  const cardHeaderH = 24; // label row
  const cardBodyH = rows.reduce((acc, r) => acc + r.h, 0) + (rows.length - 1) * termRowGap;
  const cardTotalH = termPadY + cardHeaderH + cardBodyH + termPadY;
  setFill(pdf, C.offwhite);
  pdf.roundedRect(margin, termY, contentW, cardTotalH, 6, 6, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.muted);
  pdf.text("Locked terminology — use these, never the others", margin + termPadX, termY + 18);
  let trY = termY + termPadY + cardHeaderH;
  const drawCell = (cell: typeof terms[number], cx: number, cy: number) => {
    const w = wrapVal(cell[0], cell[1]);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(labelSize);
    setText(pdf, C.slate);
    pdf.text(cell[0], cx, cy);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(valueSize);
    setText(pdf, C.muted);
    if (w.onSameLine) {
      pdf.text(w.lines[0], cx + w.labelW, cy);
    } else {
      let vy = cy + valueLeading;
      for (const ln of w.lines) {
        pdf.text(ln, cx, vy);
        vy += valueLeading;
      }
    }
  };
  for (const r of rows) {
    drawCell(r.left, margin + termPadX, trY);
    if (r.right) drawCell(r.right, margin + termPadX + termColW + termGutter, trY);
    trY += r.h + termRowGap;
  }

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

  // 2-column scannable tile grid
  const gutter = 14;
  const tileW = (contentW - gutter) / 2;
  const tileH = 56;
  const tileGapY = 10;
  let col = 0;
  let rowY = y;

  week.slideIds.forEach((slideId, idx) => {
    const cc = salesEnablementCoachCards[slideId];
    const narration = getSalesEnablementNarration(slideId);
    if (!cc) return;
    const slideTitle = sanitize(narration?.title ?? slideId);
    const studyNote = buildStudyNote(slideId, week.id, narration?.script);
    const slideMeta = buildMeta(slideId, week.id);
    const takeaway = sanitize(studyNote.inOneSentence || cc.remember || "");

    if (rowY + tileH > pageH - 60) {
      drawFooter();
      pdf.addPage();
      drawHeader(`Week ${week.number} · ${week.title}`);
      rowY = 70;
      col = 0;
    }

    const tx = margin + col * (tileW + gutter);
    // Left brand rule
    setFill(pdf, C.brand);
    pdf.rect(tx, rowY, 2, tileH, "F");

    // Index + title row
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setText(pdf, C.subtle);
    pdf.text(String(idx + 1).padStart(2, "0"), tx + 10, rowY + 12);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    setText(pdf, C.ink);
    const titleLines = clipLines(
      pdf.splitTextToSize(slideTitle, tileW - 36),
      2,
    );
    pdf.text(titleLines, tx + 26, rowY + 12, { lineHeightFactor: 1.15 });

    // One-line takeaway
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    setText(pdf, C.muted);
    const takeLines = clipLines(
      pdf.splitTextToSize(takeaway, tileW - 28),
      2,
    );
    pdf.text(takeLines, tx + 10, rowY + 12 + titleLines.length * 12 + 6);

    // DTOP chip
    if (slideMeta.dtop) {
      const chip = sanitize(slideMeta.dtop);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(6.5);
      const cw = pdf.getTextWidth(chip) + 10;
      setFill(pdf, C.brand);
      pdf.roundedRect(tx + tileW - cw - 4, rowY + 4, cw, 10, 2, 2, "F");
      setText(pdf, C.white);
      pdf.text(chip, tx + tileW - cw / 2 - 4, rowY + 11, { align: "center" });
    }

    col += 1;
    if (col >= 2) {
      col = 0;
      rowY += tileH + tileGapY;
    }
  });

  drawFooter();

  // ── 3. SLIDE CARDS ─────────────────────────────────────────────────────────
  week.slideIds.forEach((slideId, idx) => {
    const cc = salesEnablementCoachCards[slideId];
    if (!cc) return;
    const narration = getSalesEnablementNarration(slideId);
    const title = sanitize(narration?.title ?? slideId);
    const studyNote = buildStudyNote(slideId, week.id, narration?.script);
    const sMeta = buildMeta(slideId, week.id);

    renderSlidePagePortrait(pdf, {
      week,
      slideIndex: idx,
      slideCount: week.slideIds.length,
      title,
      studyNote,
      meta: sMeta,
    });

    if (narration?.script) {
      renderSlideTranscriptPage(pdf, {
        week,
        slideIndex: idx,
        slideCount: week.slideIds.length,
        title,
        script: narration.script,
      });
    }
  });

  // ── 3b. APPENDIX: GLOSSARY (every term across the week, A-Z) ───────────────
  renderGlossaryAppendixPage(pdf, week);

  // ── 3c. APPENDIX: SELL & WIN (W3 only — discovery + objections) ────────────
  if (week.id === "w3") {
    renderSellAndWinAppendixPage(pdf, week);
  }

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

  // Pushback row — draw a filled rose triangle (helvetica core lacks U+25B8)
  setFill(pdfInner, C.rose);
  pdfInner.triangle(x + 9, yPos + 8, x + 9, yPos + 16, x + 16, yPos + 12, "F");
  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(8.5);
  setText(pdfInner, C.ink);
  const pLines = clipLines(pdfInner.splitTextToSize(o.pushback, w - 26), 2);
  pdfInner.text(pLines, x + 22, yPos + 12);
  const afterPushY = yPos + 12 + pLines.length * 10 + 4;

  // Response row — draw an emerald right-arrow (avoid U+21B3)
  setStroke(pdfInner, C.emerald);
  pdfInner.setLineWidth(1.2);
  pdfInner.line(x + 9, afterPushY - 3, x + 18, afterPushY - 3);
  pdfInner.line(x + 14, afterPushY - 6, x + 18, afterPushY - 3);
  pdfInner.line(x + 14, afterPushY, x + 18, afterPushY - 3);
  pdfInner.setFont("helvetica", "normal");
  pdfInner.setFontSize(8);
  setText(pdfInner, C.slate);
  const maxRespLines = Math.max(2, Math.floor((h - (afterPushY - yPos) - 6) / 10));
  const rLines = clipLines(pdfInner.splitTextToSize(o.response, w - 26), maxRespLines);
  pdfInner.text(rLines, x + 22, afterPushY, { lineHeightFactor: 1.3 });
}

// ─── New rendering helpers ──────────────────────────────────────────────────
function drawSectionLabel(pdf: jsPDF, x: number, y: number, label: string, color: [number, number, number]) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, color);
  pdf.text(label, x, y);
  setFill(pdf, color);
  pdf.rect(x, y + 3, 18, 1.5, "F");
}

function drawAccentBlock(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  body: string,
  accent: [number, number, number],
  soft: [number, number, number],
) {
  setFill(pdf, soft);
  pdf.roundedRect(x, y, w, h, 5, 5, "F");
  setFill(pdf, accent);
  pdf.rect(x, y, 3, h, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, accent);
  pdf.text(label, x + 10, y + 14);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  setText(pdf, C.slate);
  const lines = clipLines(
    pdf.splitTextToSize(body, w - 18),
    Math.max(1, Math.floor((h - 22) / 11)),
  );
  pdf.text(lines, x + 10, y + 26, { lineHeightFactor: 1.3 });
}

// ─── Learning-outcome column renderer ──────────────────────────────────────
function renderLearningColumn(
  pdf: jsPDF,
  opts: {
    x: number;
    yTop: number;
    yBottom: number;
    w: number;
    learning: SlideLearning;
    whiteboard: string;
  },
) {
  const { x, yTop, yBottom, w, learning, whiteboard } = opts;
  const L = {
    outcome: sanitize(learning.outcome),
    coreIdea: sanitize(learning.coreIdea),
    beats: learning.teachBeats.map((b) => ({ label: b.label, text: sanitize(b.text) })),
    sayLikeThis: sanitize(learning.sayLikeThis),
    whiteboard: sanitize(whiteboard),
  };

  let y = yTop;

  // 1. LEARNING OUTCOME — accent band, navy fill, light text
  const outH = 46;
  setFill(pdf, [11, 26, 74]); // navy
  pdf.roundedRect(x, y, w, outH, 5, 5, "F");
  setFill(pdf, [0, 102, 255]); // brand
  pdf.rect(x, y, 3, outH, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.setTextColor(140, 175, 230);
  pdf.text("LEARNING OUTCOME  -  BY THE END THE REP CAN", x + 10, y + 13);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9.5);
  pdf.setTextColor(255, 255, 255);
  const outLines = clipLines(pdf.splitTextToSize(L.outcome, w - 20), 3);
  pdf.text(outLines, x + 10, y + 26, { lineHeightFactor: 1.3 });
  y += outH + 8;

  // 2. CORE IDEA — single bold sentence, no chrome
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(0, 102, 255);
  pdf.text("THE CORE IDEA", x, y);
  setFill(pdf, [0, 102, 255]);
  pdf.rect(x, y + 3, 18, 1.5, "F");
  y += 14;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10.5);
  pdf.setTextColor(11, 18, 32);
  const coreLines = clipLines(pdf.splitTextToSize(L.coreIdea, w), 2);
  pdf.text(coreLines, x, y, { lineHeightFactor: 1.25 });
  y += coreLines.length * 13 + 10;

  // 3. HOW TO TEACH IT — three numbered beats (Hook / Frame / Proof)
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(91, 103, 118);
  pdf.text("HOW TO TEACH IT  -  3 BEATS", x, y);
  setFill(pdf, [91, 103, 118]);
  pdf.rect(x, y + 3, 18, 1.5, "F");
  y += 12;

  // 4 + 5 are anchored to bottom; reserve their space now so beats height-fit
  const wbH = 50;
  const sayH = 44;
  const beatsBottom = yBottom - wbH - 6 - sayH - 6;

  const indent = 18;
  const beatGap = 8;
  const lineH = 11;

  // Pre-measure each beat at progressively tighter wrap caps until the
  // stack fits between y and beatsBottom. Always keep all 3 beats; reduce
  // wrap lines first, then drop characters via clipLines truncation.
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  const measureBeat = (b: { label: string; text: string }, wrapCap: number) => {
    const labelW = (() => {
      pdf.setFont("helvetica", "bold");
      const wL = pdf.getTextWidth(b.label);
      pdf.setFont("helvetica", "normal");
      return wL;
    })();
    const firstSlotW = Math.max(40, w - indent - labelW - 5);
    const firstFit = pdf.splitTextToSize(b.text, firstSlotW);
    const firstChunk = firstFit[0] ?? "";
    const remaining = b.text.slice(firstChunk.length).trim();
    const wrapLines =
      remaining && wrapCap > 0
        ? clipLines(pdf.splitTextToSize(remaining, w - indent), wrapCap)
        : [];
    return { labelW, firstChunk, wrapLines };
  };
  let wrapCap = 2;
  let prepared = L.beats.map((b) => measureBeat(b, wrapCap));
  const stackH = (p: typeof prepared) =>
    p.reduce((acc, m) => acc + lineH + m.wrapLines.length * lineH, 0) +
    (p.length - 1) * beatGap;
  while (wrapCap > 0 && y + stackH(prepared) > beatsBottom) {
    wrapCap -= 1;
    prepared = L.beats.map((b) => measureBeat(b, wrapCap));
  }

  L.beats.forEach((b, i) => {
    const m = prepared[i];
    // Number chip
    setFill(pdf, [0, 102, 255]);
    pdf.circle(x + 6, y + 3, 6, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(255, 255, 255);
    pdf.text(String(i + 1), x + 6, y + 5.5, { align: "center" });
    // Label (bold)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(11, 18, 32);
    pdf.text(b.label, x + indent, y + 4);
    // First chunk of body on the same line
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(31, 41, 55);
    pdf.text(m.firstChunk, x + indent + m.labelW + 5, y + 4);
    // Wrap lines aligned to indent
    if (m.wrapLines.length) {
      pdf.text(m.wrapLines, x + indent, y + 4 + lineH, { lineHeightFactor: 1.3 });
    }
    y += 4 + lineH + m.wrapLines.length * lineH + beatGap;
  });

  // 4. SAY IT LIKE THIS — emerald accent block (anchored above whiteboard)
  const sayY = yBottom - wbH - 6 - sayH;
  drawAccentBlock(
    pdf,
    x,
    sayY,
    w,
    sayH,
    "SAY IT LIKE THIS",
    `"${L.sayLikeThis}"`,
    [5, 150, 105],
    [209, 250, 229],
  );

  // 5. WHITEBOARD / WHERE TO POINT — violet accent (anchored to col bottom)
  drawAccentBlock(
    pdf,
    x,
    yBottom - wbH,
    w,
    wbH,
    "WHITEBOARD  /  WHERE TO POINT",
    L.whiteboard,
    [139, 92, 246],
    [243, 240, 253],
  );
}

// ─── Check-yourself band renderer ──────────────────────────────────────────
function renderCheckYourselfBand(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  question: string,
) {
  setFill(pdf, [250, 251, 253]);
  pdf.roundedRect(x, y, w, h, 4, 4, "F");
  setFill(pdf, [0, 102, 255]);
  pdf.rect(x, y, 3, h, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(0, 102, 255);
  pdf.text("CHECK YOURSELF  -  TICK BEFORE MOVING ON", x + 10, y + 11);
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(10);
  pdf.setTextColor(11, 18, 32);
  const lines = clipLines(pdf.splitTextToSize(question, w - 28), 1);
  pdf.text(lines, x + 10, y + 22);
  // tick box on the far right
  pdf.setDrawColor(91, 103, 118);
  pdf.setLineWidth(0.8);
  pdf.rect(x + w - 18, y + h / 2 - 5.5, 11, 11, "S");
}

function drawMetaStrip(pdf: jsPDF, x: number, y: number, w: number, meta: SlideMeta) {
  // DTOP chip
  let cx = x;
  if (meta.dtop) {
    const dtopColor: Record<NonNullable<SlideMeta["dtop"]>, [number, number, number]> = {
      D: C.dBlue,
      T: C.tAmber,
      O: C.oViolet,
      P: C.pEmerald,
    };
    const col = dtopColor[meta.dtop];
    setFill(pdf, col);
    pdf.roundedRect(cx, y - 8, 14, 14, 3, 3, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setText(pdf, C.white);
    pdf.text(meta.dtop, cx + 7, y + 2, { align: "center" });
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    setText(pdf, C.muted);
    pdf.text("DTOP STAGE", cx + 20, y + 2);
    cx += 86;
  }

  // Persona chips
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, C.muted);
  pdf.text("PERSONA FIT:", cx, y + 2);
  cx += 64;
  meta.persona.forEach((p) => {
    const pw = pdf.getTextWidth(p) + 12;
    setFill(pdf, C.offwhite);
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(cx, y - 7, pw, 13, 3, 3, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    setText(pdf, C.slate);
    pdf.text(p, cx + 6, y + 2);
    cx += pw + 5;
  });

  // Time-on-slide pinned right
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, C.muted);
  pdf.text("TIME ON SLIDE:", x + w - 96, y + 2);
  pdf.setFont("helvetica", "normal");
  setText(pdf, C.slate);
  pdf.text("60–90s", x + w - 36, y + 2);
}

export const downloadWeekFieldKit = (week: CoachCardWeek) => {
  const pdf = buildWeekFieldKitPdf(week);
  pdf.save(`Comply365-Week-${week.number}-${week.title.replace(/\s+/g, "-")}-Field-Kit.pdf`);
};

// ─────────────────────────────────────────────────────────────────────────────
// Portrait study-note page — one slide per page, designed so a rep can learn
// the slide WITHOUT the narration audio. Layout:
//   01. Numbered title
//   02. THE ONE-SENTENCE TAKEAWAY (curated `inOneSentence`)
//   03. Two-column row: WHAT'S ON THE SLIDE  |  WHY A BUYER CARES
//   04. THE IDEAS YOU MUST OWN (numbered curated keyIdeas)
//   05. 2x2 grid: KEY TERMS · DEFENSIBLE FACTS · WATCH-OUT · HOW THIS CONNECTS
//   06. CHECK YOURSELF (3 self-test questions, checkboxes)
//   07. Footer · optional one-line narration echo
// ─────────────────────────────────────────────────────────────────────────────
function renderSlidePagePortrait(
  pdf: jsPDF,
  opts: {
    week: CoachCardWeek;
    slideIndex: number;
    slideCount: number;
    title: string;
    studyNote: StudyNote;
    meta: SlideMeta;
  },
) {
  const { week, slideIndex, slideCount, title, studyNote, meta } = opts;

  pdf.addPage("a4", "portrait");
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 40;
  const topMargin = 44;
  const contentW = pageW - margin * 2;
  const footerY = pageH - 44;

  // ─── Header strip ─────────────────────────────────────────────────────────
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, C.subtle);
  pdf.text("Comply365 · Sales Enablement Academy", margin, topMargin - 14);

  const headRight: string[] = [];
  headRight.push(`W${week.number} · Slide ${String(slideIndex + 1).padStart(2, "0")} / ${slideCount}`);
  if (meta.dtop) headRight.push(`DTOP · ${meta.dtop}`);
  headRight.push("Study sheet · 1 of 2");
  pdf.setFont("helvetica", "normal");
  setText(pdf, C.muted);
  pdf.text(sanitize(headRight.join("   ·   ")), pageW - margin, topMargin - 14, { align: "right" });

  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, topMargin - 6, pageW - margin, topMargin - 6);

  // ─── Numeral-led title ────────────────────────────────────────────────────
  let y = topMargin + 26;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(30);
  setText(pdf, C.brand);
  const numStr = String(slideIndex + 1).padStart(2, "0");
  pdf.text(numStr, margin, y);
  const numW = pdf.getTextWidth(numStr);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(20);
  setText(pdf, [200, 215, 235]);
  pdf.text("/", margin + numW + 8, y - 3);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  setText(pdf, C.ink);
  const titleX = margin + numW + 22;
  const titleLines = clipLines(pdf.splitTextToSize(sanitize(title), contentW - (titleX - margin)), 2);
  pdf.text(titleLines, titleX, y - 2, { lineHeightFactor: 1.15 });
  y += Math.max(8, (titleLines.length - 1) * 16) + 12;

  setFill(pdf, C.brand);
  pdf.rect(margin, y, 28, 2, "F");
  y += 14;

  // ─── Check-yourself strip (lifted to top so reps see it before the fold) ──
  const checkH = 32;
  const checkY = y;
  const questions = (studyNote.checkYourself ?? []).slice(0, 3).map(sanitize);
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, checkY, pageW - margin, checkY);
  pdf.line(margin, checkY + checkH, pageW - margin, checkY + checkH);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, C.brand);
  pdf.text("Check yourself", margin, checkY + 12);

  if (questions.length) {
    const labelW = pdf.getTextWidth("Check yourself") + 18;
    const qAvail = contentW - labelW;
    const qSlot = qAvail / questions.length;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    setText(pdf, C.slate);
    questions.forEach((q, i) => {
      const qx = margin + labelW + i * qSlot;
      setStroke(pdf, C.muted);
      pdf.setLineWidth(0.6);
      pdf.rect(qx, checkY + 10, 7, 7, "S");
      const lines = clipLines(pdf.splitTextToSize(q, qSlot - 14), 2);
      pdf.text(lines, qx + 11, checkY + 15, { lineHeightFactor: 1.2 });
    });
  }
  y = checkY + checkH + 14;

  // ─── Two-column body ──────────────────────────────────────────────────────
  const bodyTop = y;
  const bodyBottom = footerY - 12;
  const bodyH = bodyBottom - bodyTop;

  const railW = Math.floor(contentW * 0.38);
  const railGap = 18;
  const colW = contentW - railW - railGap;
  const railX = margin;
  const colX = margin + railW + railGap;

  // Vertical divider between columns
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(railX + railW + railGap / 2, bodyTop, railX + railW + railGap / 2, bodyBottom);

  // ── Left rail blocks (buyer-facing anchors)
  const connects = (studyNote.connectsTo.length ? studyNote.connectsTo : meta.connectsTo ?? [])
    .slice(0, 4)
    .map(sanitize);

  const railBlocks: Array<{ label: string; accent: [number, number, number]; body: (yy: number) => number; }> = [
    {
      label: "Takeaway",
      accent: C.brand,
      body: (yy) => drawParagraph(pdf, railX, yy, railW, sanitize(studyNote.inOneSentence), {
        font: "bold", size: 11, color: C.ink, leading: 13,
      }),
    },
    {
      label: "Why the buyer cares",
      accent: C.navy,
      body: (yy) => drawParagraph(pdf, railX, yy, railW, sanitize(studyNote.whyItMatters), {
        font: "normal", size: 9, color: C.slate, leading: 11.5,
      }),
    },
    {
      label: "Watch-out",
      accent: C.rose,
      body: (yy) => drawParagraph(pdf, railX, yy, railW, sanitize(studyNote.watchOut), {
        font: "normal", size: 9, color: C.slate, leading: 11.5,
      }),
    },
    ...(connects.length ? [{
      label: "Connects",
      accent: C.sky,
      body: (yy: number) => drawBulletList(pdf, railX, yy, railW, connects, {
        size: 9, color: C.slate, leading: 11, bulletChar: ">",
      }),
    }] : []),
  ];

  const railSpacing = 14;
  let railY = bodyTop;
  for (const block of railBlocks) {
    if (railY > bodyBottom - 24) break;
    railY += drawRailLabel(pdf, railX, railY, block.label, block.accent);
    // measure via fake render to a sandbox is overkill — body() returns consumed height after drawing at current position.
    // We adjust by translating: call body with the right y by temporarily setting in helper. Simplify by accepting closure.
    const consumed = drawAtY(pdf, railY, block.body);
    railY += consumed + railSpacing;
  }

  // ── Right column blocks (rep-facing study)
  const whatsOn = (studyNote.whatsOnSlide ?? []).slice(0, 5).map(sanitize);
  const ideas = (studyNote.keyIdeas ?? []).slice(0, 4).map(sanitize);
  const terms = studyNote.terms.slice(0, 4).map((t) => ({
    label: sanitize(t.term),
    text: sanitize(t.definition),
  }));
  const facts = studyNote.facts.slice(0, 4).map(sanitize);

  let colY = bodyTop;

  // What's on the slide
  if (whatsOn.length) {
    colY += drawRailLabel(pdf, colX, colY, "What's on screen", C.brand);
    colY += drawAtY(pdf, colY, (yy) =>
      drawBulletList(pdf, colX, yy, colW, whatsOn, {
        size: 9.5, color: C.slate, leading: 12, bulletChar: "·",
      })
    );
    colY += 12;
  }

  // Ideas you must own (numbered)
  if (ideas.length && colY < bodyBottom - 60) {
    colY += drawRailLabel(pdf, colX, colY, "Ideas to own", C.brand);
    colY += drawAtY(pdf, colY, (yy) =>
      drawNumberedList(pdf, colX, yy, colW, ideas, {
        size: 9.5, color: C.slate, leading: 12, numberColor: C.brand,
      })
    );
    colY += 12;
  }

  // Key terms (label · def)
  if (terms.length && colY < bodyBottom - 40) {
    colY += drawRailLabel(pdf, colX, colY, "Key terms", C.brand);
    colY += drawAtY(pdf, colY, (yy) =>
      drawLabelledList(pdf, colX, yy, colW, terms, {
        size: 8.5, color: C.slate, labelColor: C.ink, leading: 11,
      })
    );
    colY += 12;
  }

  // Defensible facts
  if (facts.length && colY < bodyBottom - 30) {
    // Trim facts to fit remaining space.
    colY += drawRailLabel(pdf, colX, colY, "Proof points", C.emerald);
    colY += drawAtY(pdf, colY, (yy) =>
      drawBulletList(pdf, colX, yy, colW, facts, {
        size: 9, color: C.slate, leading: 11.5, bulletChar: "·",
        bulletColor: C.emerald, maxBottom: bodyBottom,
      })
    );
  }

  // ─── Footer ───────────────────────────────────────────────────────────────
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, footerY, pageW - margin, footerY);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  setText(pdf, C.subtle);
  pdf.text(`Week ${week.number} · ${sanitize(week.title)} · Study sheet`, margin, footerY + 14);
  pdf.text("Rep-facing · not for customer distribution", pageW - margin, footerY + 14, { align: "right" });
}

// ─── Rail / column helpers ────────────────────────────────────────────────

/** Draws an inline mini-label with a small accent square. Returns consumed height. */
function drawRailLabel(
  pdf: jsPDF,
  x: number,
  y: number,
  label: string,
  accent: [number, number, number],
): number {
  setFill(pdf, accent);
  pdf.rect(x, y - 5, 5, 5, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, accent);
  pdf.text(sanitize(label), x + 9, y - 1);
  return 10;
}

/** Runs a draw callback starting at yy and returns its reported consumed height. */
function drawAtY(_pdf: jsPDF, yy: number, fn: (yy: number) => number): number {
  return fn(yy);
}

interface TextStyle {
  font?: "normal" | "bold" | "italic";
  size: number;
  color: [number, number, number];
  leading: number;
}

function drawParagraph(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  text: string,
  style: TextStyle,
): number {
  pdf.setFont("helvetica", style.font ?? "normal");
  pdf.setFontSize(style.size);
  setText(pdf, style.color);
  const lines = pdf.splitTextToSize(text, w);
  pdf.text(lines, x, y + style.size, { lineHeightFactor: style.leading / style.size });
  return lines.length * style.leading + 2;
}

function drawBulletList(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  items: string[],
  opts: {
    size: number;
    color: [number, number, number];
    leading: number;
    bulletChar?: string;
    bulletColor?: [number, number, number];
    maxBottom?: number;
  },
): number {
  const bullet = opts.bulletChar ?? "·";
  let cy = y + opts.size;
  const indent = 9;
  for (const item of items) {
    if (opts.maxBottom && cy > opts.maxBottom) break;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(opts.size);
    setText(pdf, opts.bulletColor ?? opts.color);
    pdf.text(bullet, x, cy);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(opts.size);
    setText(pdf, opts.color);
    const lines = pdf.splitTextToSize(item, w - indent);
    pdf.text(lines, x + indent, cy, { lineHeightFactor: opts.leading / opts.size });
    cy += lines.length * opts.leading + 2;
  }
  return cy - y;
}

function drawNumberedList(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  items: string[],
  opts: { size: number; color: [number, number, number]; leading: number; numberColor: [number, number, number]; },
): number {
  const indent = 18;
  let cy = y + opts.size;
  items.forEach((it, i) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(opts.size);
    setText(pdf, opts.numberColor);
    pdf.text(String(i + 1).padStart(2, "0"), x, cy);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(opts.size);
    setText(pdf, opts.color);
    const lines = pdf.splitTextToSize(it, w - indent);
    pdf.text(lines, x + indent, cy, { lineHeightFactor: opts.leading / opts.size });
    cy += lines.length * opts.leading + 3;
  });
  return cy - y;
}

function drawLabelledList(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  items: Array<{ label: string; text: string }>,
  opts: { size: number; color: [number, number, number]; labelColor: [number, number, number]; leading: number; },
): number {
  let cy = y + opts.size;
  for (const it of items) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(opts.size);
    setText(pdf, opts.labelColor);
    const labelTxt = it.label + " ·";
    pdf.text(labelTxt, x, cy);
    const lw = pdf.getTextWidth(labelTxt) + 3;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(opts.size);
    setText(pdf, opts.color);
    // Try to fit value on the same line as the label; otherwise wrap the
    // value as a paragraph under the label so continuation lines start at
    // the column's left margin (with a small indent) instead of hanging
    // past where the label ended — which used to push text past the right
    // margin on long definitions.
    const inlineW = w - lw;
    const valueFitsInline = pdf.getTextWidth(it.text) <= inlineW;
    if (valueFitsInline) {
      pdf.text(it.text, x + lw, cy);
      cy += opts.leading + 2;
    } else {
      // First line tries to consume the inline space; remainder wraps below.
      const indent = 8;
      // Greedy fit of words onto the label line.
      const words = it.text.split(/\s+/);
      let inline = "";
      let i = 0;
      while (i < words.length) {
        const candidate = inline ? inline + " " + words[i] : words[i];
        if (pdf.getTextWidth(candidate) > inlineW) break;
        inline = candidate;
        i++;
      }
      if (inline) pdf.text(inline, x + lw, cy);
      cy += opts.leading;
      const rest = words.slice(i).join(" ").trim();
      if (rest) {
        const wrapped = clipLines(pdf.splitTextToSize(rest, w - indent), 3);
        for (const ln of wrapped) {
          pdf.text(ln, x + indent, cy);
          cy += opts.leading;
        }
      }
      cy += 2;
    }
  }
  return cy - y;
}

// ─── Transcript page (verbatim coach narration) ───────────────────────────
function renderSlideTranscriptPage(
  pdf: jsPDF,
  opts: {
    week: CoachCardWeek;
    slideIndex: number;
    slideCount: number;
    title: string;
    script: string;
  },
) {
  const { week, slideIndex, slideCount, title, script } = opts;
  const margin = 40;
  const topMargin = 44;

  // Split source script into beat-sized paragraphs. Authors sometimes use
  // blank-line separators, sometimes a single block of prose. Always try
  // an inline split on canonical cue phrases too so a wall of text becomes
  // multiple labelled beats.
  // Canonical cue starts. Splitting BEFORE each cue turns one block of
  // prose into multiple labelled beats.
  const INLINE_CUE = /(?=(?:Why this matters|Core message|The pain|The value lever|Say it like this|Watch out for|Bridge to next|Delivery tip|When you deliver this|Next we go|Next,)\b)/g;
  const paragraphs = sanitize(script)
    .split(/\n\s*\n/)
    .flatMap((block) => block.split(INLINE_CUE))
    .map((p) => p.trim())
    .filter((p) => p.length > 20);

  // Estimate ~150 words per minute spoken.
  const wordCount = script.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(wordCount / 150));
  const wpm = Math.round(wordCount / Math.max(1, mins));
  const paceLabel =
    wpm <= 120 ? "Pace: deliberate" : wpm <= 160 ? "Pace: conversational" : "Pace: brisk — slow down";

  // ── Beat parsing ─────────────────────────────────────────────────────
  type BeatGroup = "anchor" | "risk" | "value" | "bridge" | "coach";
  type Beat = {
    n: number;
    label: string;        // category chip text e.g. "ANCHOR"
    group: BeatGroup;
    accent: [number, number, number];
    point: string;        // "what this part is trying to land"
    sayLines?: string[];  // phrase-per-line, already broken
    listenFor?: string;   // small side coaching note
    durationSec: number;
  };

  const CUES: Array<[RegExp, string, BeatGroup, string]> = [
    [/^why this matters[^.:]*[:.]\s*/i, "ANCHOR", "anchor", "Set the stakes."],
    [/^core message[^.:]*[:.]\s*/i, "ANCHOR", "anchor", "The headline they remember."],
    [/^the pain[^.:]*[:.]\s*/i, "PAIN", "risk", "Name what hurts today."],
    [/^watch out for[^.:]*[:.]\s*/i, "COACH", "coach", "Don't do this on the call."],
    [/^the value lever[^.:]*[:.]\s*/i, "VALUE", "value", "What changes with Comply365."],
    [/^say it like this[^.:]*[:.]\s*/i, "VALUE", "value", "Use these exact words."],
    [/^bridge to next[^.:]*[:.]\s*/i, "BRIDGE", "bridge", "Hand off to the next slide."],
    [/^delivery tip[^.:]*[:.]\s*/i, "COACH", "coach", "How to land it."],
  ];
  const ACCENT: Record<BeatGroup, [number, number, number]> = {
    anchor: C.brand,
    risk: C.amber,
    value: C.emerald,
    bridge: C.sky,
    coach: C.rose,
  };

  // Split prose into flowing sentence paragraphs. Each sentence wraps
  // naturally on word boundaries inside the card — we only break a
  // sentence apart if it's very long (>180 chars), and only on strong
  // punctuation (`;`, ` — `, `: `). Commas are left alone so the prose
  // still reads as continuous speech.
  const SENTENCE_SOFT_MAX = 180;
  const splitToSentences = (text: string): string[] => {
    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const out: string[] = [];
    for (const sent of sentences) {
      if (sent.length <= SENTENCE_SOFT_MAX) { out.push(sent); continue; }
      const parts = sent
        .split(/(?<=;)\s+|\s+—\s+|\s+-\s+|(?<=:)\s+/)
        .map((p) => p.trim())
        .filter(Boolean);
      let buf = "";
      for (const p of parts) {
        if (!buf) { buf = p; continue; }
        if ((buf + " " + p).length <= SENTENCE_SOFT_MAX) {
          buf = buf + " " + p;
        } else {
          out.push(buf);
          buf = p;
        }
      }
      if (buf) out.push(buf);
    }
    return out;
  };

  const beats: Beat[] = paragraphs.map((p, i) => {
    // First beat with no explicit cue is the opening — label it OPEN, not BEAT.
    let label = i === 0 ? "OPEN" : "BEAT";
    let group: BeatGroup = "anchor";
    let point = i === 0 ? "Land the opening line." : "Say this.";
    let body = p;
    for (const [re, lab, g, hint] of CUES) {
      if (re.test(p)) {
        label = lab;
        group = g;
        point = hint;
        body = p.replace(re, "").trim();
        break;
      }
    }
    const wc = body.split(/\s+/).filter(Boolean).length;
    const durationSec = Math.max(6, Math.round(wc / 2.5));
    if (group === "coach") {
      return {
        n: i + 1, label, group, accent: ACCENT[group],
        point, listenFor: body, durationSec,
      };
    }
    // If there's a quoted phrase, treat it as the verbatim Say.
    const qm = body.match(/[\u201C\u201D"]([^\u201C\u201D"]{20,260})[\u201C\u201D"]/);
    const sayText = qm ? qm[1] : body;
    return {
      n: i + 1, label, group, accent: ACCENT[group],
      point, sayLines: splitToSentences(sayText), durationSec,
    };
  });

  // ── Token highlighter for SAY blocks ─────────────────────────────────
  const HIGHLIGHT_TERMS = [
    "Comply365",
    "SafetyManager365",
    "ContentManager365",
    "DTOP",
    "Insights & Intelligence",
    "Regulation Management",
    "Unified Mobile",
  ];
  const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlightRe = new RegExp(
    "(" +
      HIGHLIGHT_TERMS.map(escapeRe).join("|") +
      "|~?\\$?\\d+(?:[.,]\\d+)?(?:[\u2013-]\\$?\\d+(?:[.,]\\d+)?)?[%\u00D7x]?(?:[BMK])?" +
      "|\"[^\"]{2,160}\"" +
      ")",
    "g",
  );
  type Tok = { text: string; bold: boolean };
  const tokenize = (s: string): Tok[] => {
    const parts = s.split(highlightRe);
    const out: Tok[] = [];
    parts.forEach((part, i) => {
      if (!part) return;
      const isHi = i % 2 === 1;
      const words = part.split(/(\s+)/).filter((w) => w !== "");
      for (const w of words) out.push({ text: w, bold: isHi });
    });
    return out;
  };

  let isFirstPage = true;
  let pageCount = 0;
  let pageBeatStart = 1;
  let pageBeatEnd = 1;

  const startPage = (continued: boolean) => {
    pdf.addPage("a4", "portrait");
    pageCount += 1;
    const pageW = pdf.internal.pageSize.getWidth();
    const contentW = pageW - margin * 2;

    // Header strip
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    setText(pdf, C.subtle);
    pdf.text("Comply365 · Sales Enablement Academy", margin, topMargin - 14);
    pdf.setFont("helvetica", "normal");
    setText(pdf, C.muted);
    pdf.text(
      `W${week.number} · Slide ${String(slideIndex + 1).padStart(2, "0")} / ${slideCount}   ·   Coach transcript${continued ? " · continued" : " · 2 of 2"}`,
      pageW - margin,
      topMargin - 14,
      { align: "right" },
    );
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(margin, topMargin - 6, pageW - margin, topMargin - 6);

    let y = topMargin + 22;

    if (!continued) {
      // Numeral + title block
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      setText(pdf, C.brand);
      const numStr = String(slideIndex + 1).padStart(2, "0");
      pdf.text(numStr, margin, y);
      const numW = pdf.getTextWidth(numStr);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(16);
      setText(pdf, [200, 215, 235]);
      pdf.text("/", margin + numW + 6, y - 2);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      setText(pdf, C.ink);
      const titleX = margin + numW + 18;
      const titleLines = clipLines(
        pdf.splitTextToSize(sanitize(title), contentW - (titleX - margin)),
        2,
      );
      pdf.text(titleLines, titleX, y - 1, { lineHeightFactor: 1.15 });
      y += Math.max(8, (titleLines.length - 1) * 14) + 14;

      // Eyebrow + meta line
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7);
      setText(pdf, C.brand);
      pdf.text("Coach transcript · beat sheet", margin, y);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      setText(pdf, C.muted);
      pdf.text(
        `~${mins} min · ${wordCount} words · ${beats.length} beats · ${paceLabel}`,
        pageW - margin,
        y,
        { align: "right" },
      );
      y += 6;
      setFill(pdf, C.brand);
      pdf.rect(margin, y, 28, 1.5, "F");
      y += 18;
    } else {
      // Continuation page header — keep it slim but informative.
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      setText(pdf, C.ink);
      pdf.text(`${sanitize(title)}`, margin, y);
      const titleW2 = pdf.getTextWidth(sanitize(title));
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      setText(pdf, C.muted);
      pdf.text(` — continued`, margin + titleW2, y);
      // Right-aligned progress meta
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      setText(pdf, C.muted);
      const remaining = Math.max(0, beats.length - pageBeatStart + 1);
      pdf.text(
        `Beat ${pageBeatStart} of ${beats.length} · ${remaining} remaining`,
        pageW - margin,
        y,
        { align: "right" },
      );
      y += 8;
      setFill(pdf, C.brand);
      pdf.rect(margin, y, 28, 1.5, "F");
      y += 18;
    }

    return y;
  };

  let pageW = pdf.internal.pageSize.getWidth();
  let pageH = pdf.internal.pageSize.getHeight();
  let footerY = pageH - 44;
  const colW = Math.min(515, pageW - margin * 2);
  let colX = (pageW - colW) / 2;

  let y = startPage(false);
  pageW = pdf.internal.pageSize.getWidth();
  pageH = pdf.internal.pageSize.getHeight();
  footerY = pageH - 44;
  colX = (pageW - colW) / 2;

  const drawFooter = (continued: boolean) => {
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(margin, footerY, pageW - margin, footerY);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    setText(pdf, C.subtle);
    const rangeTxt =
      pageBeatStart === pageBeatEnd
        ? `Beat ${pageBeatStart} of ${beats.length}`
        : `Beats ${pageBeatStart}\u2013${pageBeatEnd} of ${beats.length}`;
    pdf.text(
      `Week ${week.number} · ${sanitize(week.title)} · ${rangeTxt}`,
      margin,
      footerY + 14,
    );
    const tip =
      pageCount <= 1
        ? "Read it like a story. Slow, simple, one thought at a time."
        : "Record yourself. Play back at 1.25x — does it still land?";
    pdf.text(tip, pageW - margin, footerY + 14, { align: "right" });
    void continued;
  };

  // ── Cue card layout constants ────────────────────────────────────────
  // Layout = left rail (number + chip) | card body (point + say lines + listen for)
  const railW = 64;        // left rail width
  const cardPadX = 16;
  const cardPadY = 14;
  const pointSize = 9.5;
  const pointLeading = 13;
  const sayBodySize = 10.5;     // calm, paragraph body
  const sayBodyLeading = 14;    // generous line-height for easy reading
  const sentenceGap = 6;        // paragraph break between sentences
  const listenSize = 8.5;
  const listenLeading = 11;
  const cardGap = 14;

  const bodyX = () => colX + railW;
  const bodyW = () => colW - railW;

  // Wrap a sentence to the card width and figure out where each token sits
  // on each line — so we can re-render that line word-by-word and keep
  // bold highlights (product names, stats, quoted phrases) intact without
  // breaking the natural reading flow.
  const wrapSentenceTokens = (text: string, maxW: number): Array<Array<{ text: string; bold: boolean }>> => {
    const tokens = tokenize(text).filter((t) => !/^\s+$/.test(t.text));
    const lines: Array<Array<{ text: string; bold: boolean }>> = [];
    let current: Array<{ text: string; bold: boolean }> = [];
    const measure = (line: Array<{ text: string; bold: boolean }>) => {
      let w = 0;
      line.forEach((tok, idx) => {
        pdf.setFont("helvetica", tok.bold ? "bold" : "normal");
        pdf.setFontSize(sayBodySize);
        if (idx > 0) {
          pdf.setFont("helvetica", "normal");
          w += pdf.getTextWidth(" ");
        }
        pdf.setFont("helvetica", tok.bold ? "bold" : "normal");
        w += pdf.getTextWidth(tok.text);
      });
      return w;
    };
    for (const tok of tokens) {
      const next = [...current, tok];
      if (measure(next) <= maxW || current.length === 0) {
        current = next;
      } else {
        lines.push(current);
        current = [tok];
      }
    }
    if (current.length) lines.push(current);
    return lines;
  };

  // Render one sentence as a flowing paragraph. Returns y advance.
  const drawSentence = (text: string, x: number, baseline: number, maxW: number): number => {
    const lines = wrapSentenceTokens(text, maxW);
    let by = baseline;
    for (const line of lines) {
      let cx = x;
      line.forEach((tok, idx) => {
        if (idx > 0) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(sayBodySize);
          cx += pdf.getTextWidth(" ");
        }
        pdf.setFont("helvetica", tok.bold ? "bold" : "normal");
        pdf.setFontSize(sayBodySize);
        setText(pdf, tok.bold ? C.ink : C.slate);
        pdf.text(tok.text, cx, by);
        cx += pdf.getTextWidth(tok.text);
      });
      by += sayBodyLeading;
    }
    return lines.length * sayBodyLeading;
  };

  const sentenceLineCount = (text: string, maxW: number): number => {
    return wrapSentenceTokens(text, maxW).length;
  };

  const measureBeat = (b: Beat): number => {
    let h = cardPadY; // top padding
    // point
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(pointSize);
    const pLines = pdf.splitTextToSize(b.point, bodyW() - cardPadX * 2);
    h += pLines.length * pointLeading + 8;
    // say sentences — each wraps naturally; gap between sentences only
    if (b.sayLines && b.sayLines.length) {
      const innerW = bodyW() - cardPadX * 2;
      b.sayLines.forEach((sent, i) => {
        const n = sentenceLineCount(sent, innerW);
        h += n * sayBodyLeading;
        if (i < b.sayLines!.length - 1) h += sentenceGap;
      });
      h += 4;
    }
    // listen for: divider + label row + body lines
    if (b.listenFor) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(listenSize);
      const wLines = pdf.splitTextToSize(b.listenFor, bodyW() - cardPadX * 2);
      h += 12 + listenLeading + wLines.length * listenLeading;
    }
    h += cardPadY; // bottom padding
    // ensure the rail content fits too
    const railMin = 48;
    return Math.max(h, railMin);
  };

  const drawBeat = (b: Beat) => {
    const cardH = measureBeat(b);

    // Card body background (subtle paper tint)
    setFill(pdf, [250, 251, 253]);
    pdf.roundedRect(bodyX(), y, bodyW(), cardH, 4, 4, "F");

    // ── Left rail ──
    // Big beat number
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(26);
    setText(pdf, b.accent);
    pdf.text(String(b.n).padStart(2, "0"), colX, y + 24);
    // Category chip
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.8);
    setText(pdf, b.accent);
    pdf.text(b.label, colX, y + 38);
    // Duration
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    setText(pdf, C.subtle);
    pdf.text(`~${b.durationSec}s`, colX, y + 50);

    // ── Card body ──
    const bx = bodyX() + cardPadX;
    const innerW = bodyW() - cardPadX * 2;
    let cy = y + cardPadY + pointSize;

    // Point — sentence case, calm subtitle (no ALL CAPS shouting)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(pointSize);
    setText(pdf, C.muted);
    const pLines = pdf.splitTextToSize(b.point, innerW);
    for (const ln of pLines) {
      pdf.text(ln, bx, cy);
      cy += pointLeading;
    }
    cy += 6;

    // Say — flowing paragraphs. One sentence per paragraph, wrapped
    // naturally; a small gap between sentences gives rhythm without
    // chopping the prose.
    if (b.sayLines && b.sayLines.length) {
      b.sayLines.forEach((sent, i) => {
        const advanced = drawSentence(sent, bx, cy, innerW);
        cy += advanced;
        if (i < b.sayLines!.length - 1) cy += sentenceGap;
      });
    }

    // Listen for — proper footer row: divider, label on its own line, body underneath
    if (b.listenFor) {
      cy += 8;
      // hairline divider across the card body
      setStroke(pdf, C.hairline);
      pdf.setLineWidth(0.4);
      pdf.line(bx, cy - 4, bx + innerW, cy - 4);
      cy += 4;
      // Label (own line)
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(listenSize);
      setText(pdf, b.accent);
      pdf.text("LISTEN FOR", bx, cy);
      cy += listenLeading;
      // Body (own block, full width)
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(listenSize);
      setText(pdf, C.muted);
      const wLines = pdf.splitTextToSize(b.listenFor, innerW);
      for (const ln of wLines) {
        pdf.text(ln, bx, cy);
        cy += listenLeading;
      }
    }

    y += cardH + cardGap;
  };

  // ── Place beats with page-break-on-overflow ──────────────────────────
  pageBeatStart = beats[0]?.n ?? 1;
  pageBeatEnd = pageBeatStart;

  for (let i = 0; i < beats.length; i++) {
    const b = beats[i];
    const h = measureBeat(b);
    if (i > 0 && y + h > footerY - 14) {
      drawFooter(!isFirstPage);
      isFirstPage = false;
      pageBeatStart = b.n;
      y = startPage(true);
    }
    drawBeat(b);
    pageBeatEnd = b.n;
  }

  drawFooter(!isFirstPage);
}

function drawBottomBlock(
  pdf: jsPDF,
  x: number,
  yTop: number,
  w: number,
  h: number,
  heading: string,
  accent: [number, number, number],
  items: Array<{ label: string; text: string }>,
) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, accent);
  pdf.text(heading, x, yTop);

  let cy = yTop + 14;
  const bottom = yTop + h;
  for (const item of items) {
    if (cy > bottom - 6) break;
    if (item.label) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      setText(pdf, C.ink);
      const labelText = item.label + " ·";
      pdf.text(labelText, x, cy);
      const labelW = pdf.getTextWidth(labelText) + 4;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      setText(pdf, C.slate);
      const remW = w - labelW;
      const lines = clipLines(pdf.splitTextToSize(item.text, remW), 2);
      pdf.text(lines, x + labelW, cy, { lineHeightFactor: 1.3 });
      cy += lines.length * 10 + 4;
    } else {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      setText(pdf, C.slate);
      const maxLines = Math.max(1, Math.floor((bottom - cy) / 10));
      const lines = clipLines(pdf.splitTextToSize(item.text, w), Math.min(maxLines, 3));
      pdf.text(lines, x, cy, { lineHeightFactor: 1.3 });
      cy += lines.length * 10 + 5;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Glossary appendix — every term used in the week, deduped A-Z.
function renderGlossaryAppendixPage(pdf: jsPDF, week: CoachCardWeek) {
  pdf.addPage("a4", "portrait");
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, C.subtle);
  pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);
  pdf.setFont("helvetica", "normal");
  setText(pdf, C.muted);
  pdf.text(`Week ${week.number} · Glossary`, pageW - margin, 34, { align: "right" });

  let y = 78;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setText(pdf, C.ink);
  pdf.text("Glossary", margin, y);
  y += 6;
  setFill(pdf, C.brand);
  pdf.rect(margin, y, 36, 3, "F");
  y += 22;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  setText(pdf, C.muted);
  const intro = "Every term used across the week, in your own voice. If you can't define it from memory, study the slide it belongs to before your next call.";
  const iLines = pdf.splitTextToSize(intro, contentW);
  pdf.text(iLines, margin, y, { lineHeightFactor: 1.4 });
  y += iLines.length * 13 + 16;

  const terms = collectWeekGlossary(week.slideIds);
  terms.forEach((t) => {
    if (y > pageH - 80) {
      pdf.addPage("a4", "portrait");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      setText(pdf, C.subtle);
      pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);
      pdf.setFont("helvetica", "normal");
      setText(pdf, C.muted);
      pdf.text(`Week ${week.number} · Glossary (cont.)`, pageW - margin, 34, { align: "right" });
      y = 70;
    }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    setText(pdf, C.ink);
    pdf.text(sanitize(t.term), margin, y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    setText(pdf, C.slate);
    const dLines = pdf.splitTextToSize(sanitize(t.definition), contentW);
    pdf.text(dLines, margin, y + 14, { lineHeightFactor: 1.4 });
    y += 14 + dLines.length * 13 + 10;
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.4);
    pdf.line(margin, y - 4, pageW - margin, y - 4);
    y += 6;
  });
}

// Sell & Win appendix (W3 only) — consolidates discovery questions + objections.
function renderSellAndWinAppendixPage(pdf: jsPDF, week: CoachCardWeek) {
  pdf.addPage("a4", "portrait");
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, C.subtle);
  pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);
  pdf.setFont("helvetica", "normal");
  setText(pdf, C.muted);
  pdf.text(`Week ${week.number} · Sell & Win Reference`, pageW - margin, 34, { align: "right" });

  let y = 78;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setText(pdf, C.ink);
  pdf.text("Sell & win reference", margin, y);
  y += 6;
  setFill(pdf, C.brand);
  pdf.rect(margin, y, 36, 3, "F");
  y += 22;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  setText(pdf, C.muted);
  const intro = "Discovery questions and objection responses pulled from every slide in the week. Pre-call cheat sheet only.";
  const iLines = pdf.splitTextToSize(intro, contentW);
  pdf.text(iLines, margin, y, { lineHeightFactor: 1.4 });
  y += iLines.length * 13 + 16;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  setText(pdf, C.brand);
  pdf.text("DISCOVERY QUESTIONS", margin, y);
  y += 14;

  const seenQ = new Set<string>();
  week.slideIds.forEach((sid) => {
    const qs = SLIDE_DISCOVERY[sid] ?? [];
    qs.forEach((q) => {
      const k = q.toLowerCase().replace(/[^a-z0-9? ]/g, "").trim();
      if (seenQ.has(k)) return;
      seenQ.add(k);
      if (y > pageH - 120) return;
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(9.5);
      setText(pdf, C.ink);
      const ql = clipLines(pdf.splitTextToSize(`"${sanitize(q)}"`, contentW), 2);
      pdf.text(ql, margin, y, { lineHeightFactor: 1.35 });
      y += ql.length * 11 + 6;
    });
  });

  y += 10;
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, pageW - margin, y);
  y += 14;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  setText(pdf, C.brand);
  pdf.text("OBJECTION RESPONSES", margin, y);
  y += 14;

  const seenO = new Set<string>();
  week.slideIds.forEach((sid) => {
    const objs = SLIDE_OBJECTIONS[sid] ?? [];
    objs.forEach((o) => {
      const k = o.pushback.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
      if (seenO.has(k)) return;
      seenO.add(k);
      if (y > pageH - 90) {
        pdf.addPage("a4", "portrait");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.5);
        setText(pdf, C.subtle);
        pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);
        pdf.setFont("helvetica", "normal");
        setText(pdf, C.muted);
        pdf.text(`Week ${week.number} · Sell & Win (cont.)`, pageW - margin, 34, { align: "right" });
        y = 70;
      }
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      setText(pdf, C.ink);
      const pl = clipLines(pdf.splitTextToSize(sanitize(o.pushback), contentW), 2);
      pdf.text(pl, margin, y, { lineHeightFactor: 1.3 });
      y += pl.length * 11 + 4;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      setText(pdf, C.slate);
      const rl = clipLines(pdf.splitTextToSize("> " + sanitize(o.response), contentW), 3);
      pdf.text(rl, margin, y, { lineHeightFactor: 1.35 });
      y += rl.length * 11 + 10;
    });
  });
}

