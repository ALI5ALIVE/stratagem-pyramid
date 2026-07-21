import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import JSZip from "jszip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SlideNavigationProvider } from "@/contexts/SlideNavigationContext";
import { execPitchMediumSlides } from "@/data/execPitchMediumSlides";
import { getExec3PitchNarration } from "@/data/executivePitchNarration";

type Progress = (current: number, total: number, label: string) => void;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const DECK_TITLE = "Comply365 — Executive Pitch (Medium)";

const FRAME_W = 1440;
const FRAME_H = 900;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64) || "section";

const fetchNarrationBlob = async (slideId: string): Promise<Blob | null> => {
  const narration = getExec3PitchNarration(slideId);
  if (!narration) return null;
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/elevenlabs-tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ text: narration.script, voiceId: narration.voiceId }),
    });
    if (!response.ok) {
      console.warn(`TTS failed for ${slideId}: ${response.status}`);
      return null;
    }
    return await response.blob();
  } catch (err) {
    console.warn(`TTS error for ${slideId}:`, err);
    return null;
  }
};

const waitForImages = async (root: HTMLElement) => {
  const imgs = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
    ),
  );
};

const collectDocumentCss = () => {
  const chunks: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      chunks.push(Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n"));
    } catch {
      // Cross-origin font stylesheets are intentionally skipped; the export
      // includes the same font link separately.
    }
  }
  return chunks.join("\n");
};

const EXPORT_CSS = `
html,body{margin:0;min-height:100%;background:hsl(230 25% 5%);color:hsl(0 0% 98%);overflow:hidden}
body{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.medium-pitch-page{height:100vh;width:100vw;overflow-y:auto;scroll-snap-type:y mandatory;scroll-behavior:smooth;background:hsl(230 25% 5%)}
.medium-pitch-page::-webkit-scrollbar{width:0;display:none}
.medium-pitch-section{scroll-snap-align:start;scroll-snap-stop:always;position:relative;min-height:100vh}
.medium-pitch-section button[title^="Jump"]{cursor:default}
.export-audio{position:absolute;left:0;right:0;bottom:0;z-index:80;display:flex;flex-direction:column;pointer-events:auto}
.export-audio__track{height:4px;background:rgba(148,163,184,.22)}
.export-audio__fill{display:block;height:100%;width:0;background:hsl(217 100% 50%);transition:width .15s linear}
.export-audio__bar{display:flex;align-items:center;justify-content:center;gap:14px;padding:10px 18px;background:rgba(6,10,20,.72);border-top:1px solid rgba(255,255,255,.12);backdrop-filter:blur(16px)}
.export-audio__btn{width:40px;height:40px;border:0;border-radius:999px;background:hsl(217 100% 50%);color:white;font-size:15px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 30px rgba(0,102,255,.25);transition:transform .18s ease,background .18s ease}
.export-audio__btn:hover{transform:translateY(-1px);background:hsl(217 100% 56%)}
.export-audio__btn[disabled]{opacity:.35;cursor:not-allowed;transform:none}
.export-audio__meta{min-width:190px;font-size:12px;color:hsl(220 15% 60%);letter-spacing:.08em;text-transform:uppercase}
.export-audio__chapter{color:hsl(0 0% 98%);font-weight:600;text-transform:none;letter-spacing:0;margin-left:8px}
.export-side-nav{position:fixed;right:18px;top:50%;transform:translateY(-50%);z-index:100;display:flex;flex-direction:column;gap:7px}
.export-side-nav button{width:9px;height:9px;border-radius:999px;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.12);padding:0;cursor:pointer;transition:all .18s ease}
.export-side-nav button.is-active{height:28px;background:hsl(217 100% 50%);border-color:hsl(217 100% 50%)}
.export-hint{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:100;padding:6px 10px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(6,10,20,.5);backdrop-filter:blur(12px);font-size:10px;color:rgba(230,235,245,.55);letter-spacing:.12em;text-transform:uppercase;pointer-events:none}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media (max-width: 768px){.export-side-nav{display:none}.export-audio__bar{justify-content:flex-start}.export-audio__meta{min-width:0;font-size:10px}.export-audio__chapter{display:none}.export-hint{display:none}}
`;

const EXPORT_JS = `
(function(){
  const deck = document.querySelector('[data-medium-pitch-page]');
  const sections = Array.from(document.querySelectorAll('[data-medium-pitch-section]'));
  const audios = Array.from(document.querySelectorAll('audio[data-audio-index]'));
  const dots = Array.from(document.querySelectorAll('[data-nav-dot]'));
  let current = 0;
  let scrollTimer = null;

  function stopAll(reset){
    audios.forEach((audio) => {
      try { audio.pause(); if(reset) audio.currentTime = 0; } catch(e) {}
    });
    document.querySelectorAll('[data-play-btn]').forEach((btn) => {
      btn.textContent = '▶';
      btn.setAttribute('aria-label', 'Play voiceover');
    });
    if(reset){
      document.querySelectorAll('[data-progress-fill]').forEach((fill) => { fill.style.width = '0%'; });
    }
  }

  function setActive(index){
    current = Math.max(0, Math.min(index, sections.length - 1));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  function go(index){
    const target = sections[Math.max(0, Math.min(index, sections.length - 1))];
    if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('[data-play-btn]').forEach((btn) => {
    const index = Number(btn.getAttribute('data-play-btn'));
    const audio = document.querySelector('audio[data-audio-index="' + index + '"]');
    if(!audio){ btn.setAttribute('disabled','true'); return; }
    const fill = document.querySelector('[data-progress-fill="' + index + '"]');
    btn.addEventListener('click', function(event){
      event.stopPropagation();
      if(!audio.paused){
        audio.pause();
        btn.textContent = '▶';
        btn.setAttribute('aria-label', 'Play voiceover');
        return;
      }
      stopAll(false);
      setActive(index);
      audio.play();
      btn.textContent = '❚❚';
      btn.setAttribute('aria-label', 'Pause voiceover');
    });
    audio.addEventListener('timeupdate', function(){
      if(fill && audio.duration) fill.style.width = ((audio.currentTime / audio.duration) * 100) + '%';
    });
    audio.addEventListener('ended', function(){
      btn.textContent = '↻';
      btn.setAttribute('aria-label', 'Replay voiceover');
      if(fill) fill.style.width = '100%';
    });
  });

  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));

  deck.addEventListener('scroll', function(){
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(function(){
      const next = Math.round(deck.scrollTop / deck.clientHeight);
      if(next !== current){ stopAll(true); setActive(next); }
    }, 80);
  }, { passive: true });

  window.addEventListener('keydown', function(e){
    const tag = (e.target && e.target.tagName) || '';
    if(tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
    if(e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' '){ e.preventDefault(); go(current + 1); }
    if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){ e.preventDefault(); go(current - 1); }
  });

  setActive(0);
})();
`;

const renderDeckDom = async (): Promise<HTMLElement> => {
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "0";
  host.style.top = "0";
  host.style.width = `${FRAME_W}px`;
  host.style.height = `${FRAME_H}px`;
  host.style.overflow = "hidden";
  host.style.opacity = "0";
  host.style.pointerEvents = "none";
  host.style.zIndex = "-1";
  document.body.appendChild(host);

  const root = createRoot(host);
  try {
    root.render(
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(
          SidebarProvider,
          null,
          React.createElement(
            SlideNavigationProvider,
            null,
            React.createElement(
              "main",
              {
                className: "medium-pitch-page h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth",
                "data-medium-pitch-page": "true",
              },
              execPitchMediumSlides.map((slide, index) => {
                const SlideComponent = slide.component as React.ComponentType<any>;
                return React.createElement(SlideComponent, {
                  key: slide.id,
                  slideNumber: index,
                  id: slide.id,
                  ...((slide as any).dividerProps ?? {}),
                  ...((slide as any).sectionProps ?? {}),
                  ...(slide.id === "exec3-slide-platform"
                    ? {
                        jumpTargets: {
                          dtop: "exec3-divider-dtop",
                          mobile: "exec3-divider-mobile",
                          intelligence: "exec3-divider-intelligence",
                          core: "exec3-divider-dtop",
                        },
                      }
                    : {}),
                  isPlaying: false,
                  isLoading: false,
                  progress: 0,
                  hasCompleted: false,
                });
              }),
            ),
          ),
        ),
      ),
    );

    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    if ((document as any).fonts?.ready) await (document as any).fonts.ready;
    await waitForImages(host);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const source = host.querySelector("[data-medium-pitch-page]") as HTMLElement | null;
    if (!source) throw new Error("Could not render medium pitch page for export");
    return source.cloneNode(true) as HTMLElement;
  } finally {
    try { root.unmount(); } catch {}
    host.remove();
  }
};

const localizeImages = async (container: HTMLElement, assetsDir: JSZip, onProgress?: Progress) => {
  const imgs = Array.from(container.querySelectorAll("img"));
  const seen = new Map<string, string>();
  let assetIndex = 1;
  for (const img of imgs) {
    const src = img.getAttribute("src");
    if (!src || src.startsWith("data:")) continue;
    const absolute = new URL(src, window.location.href).href;
    if (!seen.has(absolute)) {
      onProgress?.(0, execPitchMediumSlides.length, "Bundling page images");
      const url = new URL(absolute);
      const ext = (url.pathname.match(/\.([a-z0-9]+)$/i)?.[1] ?? "png").toLowerCase();
      const name = `image-${String(assetIndex).padStart(2, "0")}.${ext}`;
      assetIndex += 1;
      const response = await fetch(absolute);
      if (response.ok) {
        assetsDir.file(name, await response.blob());
        seen.set(absolute, `assets/${name}`);
      } else {
        seen.set(absolute, absolute);
      }
    }
    img.setAttribute("src", seen.get(absolute)!);
  }
};

const enhanceDom = (
  container: HTMLElement,
  audioFiles: Array<string | null>,
) => {
  container.setAttribute("data-medium-pitch-page", "true");
  container.classList.add("medium-pitch-page");
  const sections = Array.from(container.children).filter((node): node is HTMLElement => node instanceof HTMLElement);
  const total = sections.length;

  sections.forEach((section, index) => {
    const slide = execPitchMediumSlides[index];
    const narration = getExec3PitchNarration(slide.id);
    const num = String(index + 1).padStart(2, "0");
    section.classList.add("medium-pitch-section");
    section.setAttribute("data-medium-pitch-section", String(index));
    section.setAttribute("aria-label", `${num}. ${slide.label}`);

    const transcript = narration?.script
      ? `<div class="sr-only"><h2>Voiceover transcript — ${esc(slide.label)}</h2><p>${esc(narration.script)}</p></div>`
      : "";
    const audioSrc = audioFiles[index];
    const audio = audioSrc
      ? `<audio preload="metadata" data-audio-index="${index}" src="${audioSrc}"></audio>`
      : "";
    const disabled = audioSrc ? "" : " disabled";
    const controls = document.createElement("div");
    controls.className = "export-audio";
    controls.innerHTML = `
      <div class="export-audio__track"><span class="export-audio__fill" data-progress-fill="${index}"></span></div>
      <div class="export-audio__bar">
        <button class="export-audio__btn" type="button" data-play-btn="${index}" aria-label="Play voiceover"${disabled}>▶</button>
        <div class="export-audio__meta">${num} / ${String(total).padStart(2, "0")}<span class="export-audio__chapter">${esc(slide.label)}</span></div>
      </div>
      ${audio}
      ${transcript}`;
    section.appendChild(controls);
  });

  return { total };
};

const buildHtml = (bodyMarkup: string, appCss: string, total: number) => {
  const nav = `<nav class="export-side-nav" aria-label="Section navigation">${execPitchMediumSlides
    .map((slide, index) => `<button type="button" data-nav-dot="${index}" aria-label="Go to ${esc(slide.label)}"></button>`)
    .join("")}</nav>`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="description" content="Comply365 Executive Pitch Medium as a standalone scrolling HTML experience with local voiceover audio."/>
<title>${esc(DECK_TITLE)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>${appCss}\n${EXPORT_CSS}</style></head>
<body>${bodyMarkup}${nav}<div class="export-hint">Scroll or use ↑ ↓ arrows · voiceover included · ${total} sections</div><script>${EXPORT_JS}</script></body></html>`;
};

export async function buildMediumPitchReplicaHtml(onProgress?: Progress): Promise<Blob> {
  const zip = new JSZip();
  const root = zip.folder("comply365-medium-pitch-webpage")!;
  const assetsDir = root.folder("assets")!;
  const audioDir = root.folder("audio")!;
  const total = execPitchMediumSlides.length;

  onProgress?.(0, total, "Rendering live HTML");
  const deckDom = await renderDeckDom();
  await localizeImages(deckDom, assetsDir, onProgress);

  const audioFiles: Array<string | null> = [];

  for (let i = 0; i < total; i++) {
    const slide = execPitchMediumSlides[i];
    onProgress?.(i, total, `${slide.label} — voiceover`);
    const audioBlob = await fetchNarrationBlob(slide.id);
    if (audioBlob) {
      const name = `${String(i + 1).padStart(2, "0")}-${slug(slide.label)}.mp3`;
      audioDir.file(name, audioBlob);
      audioFiles.push(`audio/${name}`);
    } else {
      audioFiles.push(null);
    }
  }

  const { total: enhancedTotal } = enhanceDom(deckDom, audioFiles);
  const appCss = collectDocumentCss();
  const html = buildHtml(deckDom.outerHTML, appCss, enhancedTotal);

  root.file("index.html", html);
  root.file(
    "README.txt",
    [
      DECK_TITLE,
      "",
      "This is a standalone scrolling HTML version of the Medium Executive Pitch.",
      "Open index.html in a browser, or upload this whole folder to a website/WordPress file area and link to index.html.",
      "",
      "Included:",
      "- One real HTML page with the live text/layout markup, not slide screenshots.",
      "- Local image assets under /assets.",
      "- Local voiceover MP3 files under /audio.",
      "- Scroll snapping, keyboard navigation, section dots, and per-section voiceover playback.",
    ].join("\n"),
  );

  onProgress?.(total, total, "Packaging");
  return zip.generateAsync({ type: "blob", compression: "DEFLATE" });
}