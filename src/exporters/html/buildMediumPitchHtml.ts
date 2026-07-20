import JSZip from "jszip";
import { renderComponentToPng } from "@/exporters/pptx/renderToImage";
import { execPitchMediumSlides } from "@/data/execPitchMediumSlides";
import { executivePitchNarrations } from "@/data/executivePitchNarration";

type Progress = (current: number, total: number, label: string) => void;

const DECK_TITLE = "Comply365 — Executive Pitch (Medium)";
const DECK_SUBTITLE = "One platform. One operating model. One entry point.";

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const narrationFor = (slideId: string) =>
  executivePitchNarrations.find((n) => n.slideId === slideId);

const STYLES = `:root{--bg:#0a0f1c;--panel:#101728;--border:rgba(255,255,255,.08);--text:#e6ebf5;--muted:#9aa4bd;--accent:#3d8bff}*{box-sizing:border-box}html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,sans-serif;line-height:1.55}a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}.wrap{max-width:1200px;margin:0 auto;padding:40px 24px 80px}.deck-header{margin-bottom:32px}.deck-header .eyebrow{color:var(--accent);text-transform:uppercase;letter-spacing:.15em;font-size:12px;font-weight:600}.deck-header h1{font-size:36px;margin:8px 0 6px;letter-spacing:-.02em}.deck-header p{color:var(--muted);margin:0}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;margin-top:32px}.card{background:var(--panel);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:transform .15s,border-color .15s;display:block;color:inherit}.card:hover{transform:translateY(-2px);border-color:var(--accent);text-decoration:none}.card img{display:block;width:100%;height:auto;background:#000}.card .meta{padding:14px 16px}.card .num{color:var(--muted);font-size:12px;letter-spacing:.1em;text-transform:uppercase}.card .title{font-weight:600;margin-top:4px}.slide-page .slide-img{width:100%;height:auto;border-radius:12px;border:1px solid var(--border);background:#000;display:block}.slide-page .kicker{color:var(--muted);font-size:12px;letter-spacing:.15em;text-transform:uppercase;margin-bottom:6px}.slide-page h1{font-size:32px;margin:0 0 24px;letter-spacing:-.02em}.narration{margin-top:32px;padding:24px;background:var(--panel);border:1px solid var(--border);border-radius:12px}.narration h2{font-size:14px;text-transform:uppercase;letter-spacing:.15em;color:var(--muted);margin:0 0 12px}.narration p{margin:0 0 12px;font-size:17px}.nav{display:flex;justify-content:space-between;align-items:center;margin-top:32px;gap:12px}.nav a,.nav span{padding:10px 16px;border:1px solid var(--border);border-radius:8px;background:var(--panel)}.nav .spacer{flex:1}.nav .index{color:var(--muted)}`;

const indexHtml = (slides: { file: string; title: string; asset: string; index: number }[]) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${esc(DECK_TITLE)}</title><link rel="stylesheet" href="styles.css"/></head><body><div class="wrap"><header class="deck-header"><div class="eyebrow">Executive Pitch · Medium</div><h1>${esc(DECK_TITLE)}</h1><p>${esc(DECK_SUBTITLE)}</p></header><div class="grid">${slides.map((s) => `<a class="card" href="slides/${s.file}"><img src="assets/${s.asset}" alt="${esc(s.title)}" loading="lazy"/><div class="meta"><div class="num">Slide ${String(s.index + 1).padStart(2, "0")}</div><div class="title">${esc(s.title)}</div></div></a>`).join("")}</div></div></body></html>`;

const slidePageHtml = (opts: {
  title: string;
  asset: string;
  index: number;
  total: number;
  prev?: string;
  next?: string;
  narration?: string;
}) => {
  const num = String(opts.index + 1).padStart(2, "0");
  const tot = String(opts.total).padStart(2, "0");
  const narrationBlock = opts.narration
    ? `<section class="narration"><h2>Narration</h2>${opts.narration
        .split(/\n+/)
        .map((p) => `<p>${esc(p.trim())}</p>`)
        .join("")}</section>`
    : "";
  const prevLink = opts.prev ? `<a href="${opts.prev}">← Previous</a>` : `<span style="opacity:.4">← Previous</span>`;
  const nextLink = opts.next ? `<a href="${opts.next}">Next →</a>` : `<span style="opacity:.4">Next →</span>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${num} · ${esc(opts.title)} — ${esc(DECK_TITLE)}</title><link rel="stylesheet" href="../styles.css"/></head><body><div class="wrap slide-page"><div class="kicker">Slide ${num} of ${tot}</div><h1>${esc(opts.title)}</h1><img class="slide-img" src="../assets/${opts.asset}" alt="${esc(opts.title)}"/>${narrationBlock}<nav class="nav">${prevLink}<span class="index"><a href="../index.html">All slides</a></span><span class="spacer"></span>${nextLink}</nav></div></body></html>`;
};

const dataUrlToUint8 = (dataUrl: string) => {
  const b64 = dataUrl.split(",")[1] ?? "";
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
};

export async function buildMediumPitchHtmlZip(onProgress?: Progress): Promise<Blob> {
  const zip = new JSZip();
  const root = zip.folder("comply365-medium-pitch-html")!;
  const slidesDir = root.folder("slides")!;
  const assetsDir = root.folder("assets")!;

  root.file("styles.css", STYLES);

  const total = execPitchMediumSlides.length;
  const manifest: { file: string; title: string; asset: string; index: number }[] = [];

  for (let i = 0; i < total; i++) {
    const slide = execPitchMediumSlides[i];
    const label = slide.label;
    onProgress?.(i, total, label);

    const baseName = `${String(i + 1).padStart(2, "0")}-${slug(label) || "slide"}`;
    const assetName = `${baseName}.png`;
    const fileName = `${baseName}.html`;

    const extraProps: Record<string, any> = {
      slideNumber: i,
      id: slide.id,
      ...((slide as any).dividerProps ?? {}),
      ...((slide as any).sectionProps ?? {}),
      isPlaying: false,
      isLoading: false,
      progress: 0,
      hasCompleted: false,
      onPlay: () => {},
      onPause: () => {},
      onNextSlide: () => {},
      onPrevSlide: () => {},
    };

    const dataUrl = await renderComponentToPng(slide.component as any, extraProps);
    assetsDir.file(assetName, dataUrlToUint8(dataUrl));

    manifest.push({ file: fileName, title: label, asset: assetName, index: i });
  }

  for (let i = 0; i < manifest.length; i++) {
    const cur = manifest[i];
    const prev = i > 0 ? manifest[i - 1].file : undefined;
    const next = i < manifest.length - 1 ? manifest[i + 1].file : undefined;
    const nar = narrationFor(execPitchMediumSlides[i].id);
    slidesDir.file(
      cur.file,
      slidePageHtml({
        title: cur.title,
        asset: cur.asset,
        index: i,
        total: manifest.length,
        prev,
        next,
        narration: nar?.script,
      }),
    );
  }

  root.file("index.html", indexHtml(manifest));
  root.file(
    "README.txt",
    [
      DECK_TITLE,
      "",
      "Static HTML export of the Executive Pitch (Medium).",
      "Open index.html in a browser, or upload the whole folder to WordPress",
      "(e.g. /wp-content/uploads/medium-pitch/) and link to index.html.",
      "",
      "Each slide is a standalone HTML file under /slides with the rendered",
      "image and the narration script as real body copy — paste into a",
      "Gutenberg Image + Paragraph block for editable WordPress content.",
    ].join("\n"),
  );

  onProgress?.(total, total, "Packaging");
  return zip.generateAsync({ type: "blob", compression: "DEFLATE" });
}