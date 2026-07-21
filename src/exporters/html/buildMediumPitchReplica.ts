import { renderComponentToPng } from "@/exporters/pptx/renderToImage";
import { execPitchMediumSlides } from "@/data/execPitchMediumSlides";
import { getExec3PitchNarration } from "@/data/executivePitchNarration";

type Progress = (current: number, total: number, label: string) => void;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const DECK_TITLE = "Comply365 — Executive Pitch (Medium)";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

const fetchNarrationDataUrl = async (slideId: string): Promise<string | null> => {
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
    const blob = await response.blob();
    return await blobToDataUrl(blob);
  } catch (err) {
    console.warn(`TTS error for ${slideId}:`, err);
    return null;
  }
};

const STYLES = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a0f1c;color:#e6ebf5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,sans-serif;overflow:hidden}
.deck{height:100vh;width:100vw;overflow-y:scroll;scroll-snap-type:y mandatory;scroll-behavior:smooth}
.deck::-webkit-scrollbar{width:0;display:none}
.slide{height:100vh;width:100vw;scroll-snap-align:start;scroll-snap-stop:always;position:relative;display:flex;align-items:center;justify-content:center;background:#0a0f1c}
.slide img{max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain;display:block}
.slide-num{position:absolute;bottom:16px;right:20px;font-size:12px;letter-spacing:.15em;color:rgba(230,235,245,.5);font-weight:500}
.play-btn{position:absolute;top:20px;left:20px;display:flex;align-items:center;gap:10px;padding:10px 16px;background:rgba(16,23,40,.85);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:999px;color:#e6ebf5;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;z-index:10}
.play-btn:hover{border-color:#3d8bff;background:rgba(61,139,255,.15)}
.play-btn[disabled]{opacity:.4;cursor:not-allowed}
.play-btn .icon{width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center}
.play-btn .progress{width:60px;height:3px;background:rgba(255,255,255,.15);border-radius:2px;overflow:hidden}
.play-btn .progress-fill{height:100%;background:#3d8bff;width:0;transition:width .1s linear}
.nav-hint{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);font-size:11px;color:rgba(230,235,245,.4);letter-spacing:.1em;text-transform:uppercase;pointer-events:none;z-index:20}
`;

const buildHtml = (slides: Array<{ title: string; img: string; audio: string | null; index: number }>) => {
  const total = slides.length;
  const sections = slides.map((s) => {
    const num = String(s.index + 1).padStart(2, "0");
    const totStr = String(total).padStart(2, "0");
    const audioEl = s.audio
      ? `<audio preload="none" data-slide="${s.index}"><source src="${s.audio}" type="audio/mpeg"/></audio>`
      : "";
    const btn = s.audio
      ? `<button class="play-btn" data-play="${s.index}"><span class="icon" data-icon="play">▶</span><span class="label">Play</span><span class="progress"><span class="progress-fill"></span></span></button>`
      : "";
    return `<section class="slide" data-index="${s.index}">
      ${btn}
      <img src="${s.img}" alt="${esc(s.title)}"/>
      <div class="slide-num">${num} / ${totStr}</div>
      ${audioEl}
    </section>`;
  }).join("\n");

  const script = `
(function(){
  const deck = document.querySelector('.deck');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const audios = Array.from(document.querySelectorAll('audio'));
  let current = 0;

  function stopAll(){
    audios.forEach(a => { try{ a.pause(); a.currentTime = 0; }catch(e){} });
    document.querySelectorAll('.play-btn').forEach(b => {
      b.querySelector('[data-icon]').textContent = '▶';
      b.querySelector('.label').textContent = 'Play';
      b.querySelector('.progress-fill').style.width = '0%';
    });
  }

  document.querySelectorAll('.play-btn').forEach(btn => {
    const idx = parseInt(btn.dataset.play, 10);
    const audio = document.querySelector('audio[data-slide="'+idx+'"]');
    if(!audio) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if(!audio.paused){
        audio.pause();
        btn.querySelector('[data-icon]').textContent = '▶';
        btn.querySelector('.label').textContent = 'Play';
        return;
      }
      stopAll();
      audio.play();
      btn.querySelector('[data-icon]').textContent = '❚❚';
      btn.querySelector('.label').textContent = 'Pause';
    });
    audio.addEventListener('timeupdate', () => {
      if(!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      btn.querySelector('.progress-fill').style.width = pct + '%';
    });
    audio.addEventListener('ended', () => {
      btn.querySelector('[data-icon]').textContent = '▶';
      btn.querySelector('.label').textContent = 'Replay';
    });
  });

  // Snap-based current index tracking + stop audio on scroll change
  let scrollTimer;
  deck.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const idx = Math.round(deck.scrollTop / deck.clientHeight);
      if(idx !== current){ stopAll(); current = idx; }
    }, 80);
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if(tag === 'INPUT' || tag === 'TEXTAREA') return;
    if(e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' '){
      e.preventDefault();
      const next = Math.min(current + 1, slides.length - 1);
      slides[next].scrollIntoView({behavior:'smooth'});
    } else if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){
      e.preventDefault();
      const prev = Math.max(current - 1, 0);
      slides[prev].scrollIntoView({behavior:'smooth'});
    }
  });
})();
`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(DECK_TITLE)}</title>
<style>${STYLES}</style></head>
<body><div class="deck">${sections}</div>
<div class="nav-hint">Scroll or use ↑ ↓ arrows · Press Play for narration</div>
<script>${script}</script></body></html>`;
};

export async function buildMediumPitchReplicaHtml(onProgress?: Progress): Promise<Blob> {
  const total = execPitchMediumSlides.length;
  const rendered: Array<{ title: string; img: string; audio: string | null; index: number }> = [];

  for (let i = 0; i < total; i++) {
    const slide = execPitchMediumSlides[i];
    onProgress?.(i, total, `${slide.label} — rendering`);

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

    const imgDataUrl = await renderComponentToPng(slide.component as any, extraProps);

    onProgress?.(i, total, `${slide.label} — voiceover`);
    const audioDataUrl = await fetchNarrationDataUrl(slide.id);

    rendered.push({ title: slide.label, img: imgDataUrl, audio: audioDataUrl, index: i });
  }

  onProgress?.(total, total, "Packaging");
  const html = buildHtml(rendered);
  return new Blob([html], { type: "text/html;charset=utf-8" });
}