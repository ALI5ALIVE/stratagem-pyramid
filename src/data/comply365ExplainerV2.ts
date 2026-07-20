export interface ExplainerBeat {
  index: number;
  label: string;
  timecode: string;
  purpose: string;
  visualMode: string;
}

export interface ExplainerShot {
  n: number;
  timecode: string;
  vo: string;
  visual: string;
  motion: string;
  valueCaption?: string;
}

export interface ScriptSegment {
  timecode: string;
  beat: string;
  text: string;
}

export interface LayerValueLine {
  layer: string;
  capability: string;
  benefit: string;
}

export const EXPLAINER_META = {
  title: "Comply365 · Operational Performance Platform — v2 Explainer",
  subtitle:
    "Product & value-led explainer · ≤2 min · isometric layered stack (Amdocs Cognitive Core reference)",
  wordCount: 195,
  targetLength: "1:55–2:00",
  pace: "~105 wpm — allows sting, breaths, endframe",
  version: "v2 · product-led",
};

export const EXPLAINER_BEATS: ExplainerBeat[] = [
  {
    index: 1,
    label: "Name the product",
    timecode: "0:00–0:12",
    purpose: "Introduce Comply365 as the Operational Performance Platform",
    visualMode: "Logo + one-line definition · isometric base plate lands",
  },
  {
    index: 2,
    label: "What it replaces",
    timecode: "0:12–0:25",
    purpose: "Fragmented SMS · Docs · TMS → one platform (kept short, product-anchored)",
    visualMode: "Three legacy slabs snap into the base plate",
  },
  {
    index: 3,
    label: "The stack — product tour",
    timecode: "0:25–1:05",
    purpose: "Layer-by-layer reveal with a capability + benefit line per layer",
    visualMode: "Core Apps → Data Foundation → Intelligence Layer → Unified Mobile",
  },
  {
    index: 4,
    label: "DTOP in motion",
    timecode: "1:05–1:30",
    purpose: "How the layers work together — Detect · Trigger · Orchestrate · Prove",
    visualMode: "DTOP ribbon wraps the stack · signal dot travels the loop",
  },
  {
    index: 5,
    label: "Value & proof",
    timecode: "1:30–1:50",
    purpose: "Quantified outcomes + trust signals",
    visualMode: "Outcome tiles · 550+ operators trust strip",
  },
  {
    index: 6,
    label: "Close",
    timecode: "1:50–2:00",
    purpose: "One-line promise + logo",
    visualMode: "Endframe logo lock-up",
  },
];

export const EXPLAINER_SCRIPT: ScriptSegment[] = [
  {
    timecode: "0:00",
    beat: "Name",
    text:
      "This is Comply365 — the Operational Performance Platform for safety-critical operations. One connected system for content, training, safety and compliance.",
  },
  {
    timecode: "0:12",
    beat: "Replaces",
    text:
      "It replaces the disconnected mix of document tools, safety systems and training records most operators still run today — with a single, purpose-built platform.",
  },
  {
    timecode: "0:25",
    beat: "Stack",
    text:
      "At the base, Core Operational Apps run your procedures, competence and occurrences. Above them, an Operational Data Foundation connects every signal, document and record. On top, the Intelligence Layer reads that data with domain-trained AI — around 90% accuracy on operational language, versus about 35% for generic tools. And a Unified Mobile shell puts it all in the hands of the frontline.",
  },
  {
    timecode: "1:05",
    beat: "DTOP",
    text:
      "Around the stack runs our operating model — DTOP. Detect every signal. Trigger the right response. Orchestrate work across procedures, training and safety. And Prove it with an auditable evidence chain.",
  },
  {
    timecode: "1:30",
    beat: "Value",
    text:
      "The result: protected schedules, protected revenue, lower cost of operations, and a frontline that trusts the system. Trusted today by 550+ operators.",
  },
  {
    timecode: "1:50",
    beat: "Close",
    text:
      "Comply365. One platform. One operating model. One entry point.",
  },
];

export const LAYER_VALUE_LINES: LayerValueLine[] = [
  {
    layer: "Core Operational Apps",
    capability: "Procedures · Competence · Occurrences",
    benefit: "One place to author, train and report — no more system-hopping.",
  },
  {
    layer: "Operational Data Foundation",
    capability: "Unified data mesh across signals, documents and records",
    benefit: "Every event connected to the procedure, training and evidence behind it.",
  },
  {
    layer: "Intelligence Layer",
    capability: "Domain-trained AI · Automation · Insights · Recommendations",
    benefit: "~90% domain accuracy vs ~35% for generic AI.",
  },
  {
    layer: "Unified Mobile",
    capability: "One trusted shell for procedures, training and safety",
    benefit: "Crews work in one app they actually trust — offline-ready.",
  },
];

export const EXPLAINER_STORYBOARD: ExplainerShot[] = [
  {
    n: 1,
    timecode: "0:00–0:06",
    vo: "This is Comply365 —",
    visual:
      "Dark hero canvas. Comply365 logo fades in centre-frame; isometric base plate lands beneath it.",
    motion: "Logo fade + base plate spring-drop.",
  },
  {
    n: 2,
    timecode: "0:06–0:12",
    vo: "…the Operational Performance Platform for safety-critical operations.",
    visual:
      "Product definition types in under the logo: 'One connected system for content, training, safety and compliance.'",
    motion: "Typewriter reveal, cursor blink out.",
  },
  {
    n: 3,
    timecode: "0:12–0:22",
    vo: "It replaces the disconnected mix of document tools, safety systems and training records…",
    visual:
      "Three legacy slabs labelled SMS · Docs · TMS float in from the edges, orbit briefly, then snap into the base plate.",
    motion: "Orbit + magnetic snap into base.",
  },
  {
    n: 4,
    timecode: "0:22–0:25",
    vo: "…with a single, purpose-built platform.",
    visual: "Camera pushes in and rotates to isometric 3/4 view over the base plate.",
    motion: "Camera dolly + rotate.",
  },
  {
    n: 5,
    timecode: "0:25–0:35",
    vo: "At the base, Core Operational Apps run your procedures, competence and occurrences.",
    visual:
      "Layer 1 slides in — Core Operational Apps. Three sub-tiles: Procedures · Competence · Occurrences.",
    motion: "Spring-in from below; label pins on.",
    valueCaption: "One place to author, train and report — no more system-hopping.",
  },
  {
    n: 6,
    timecode: "0:35–0:44",
    vo: "Above them, an Operational Data Foundation connects every signal, document and record.",
    visual: "Layer 2 drops on top with animated data-mesh pattern threading the apps below.",
    motion: "Layer drop + mesh line animation.",
    valueCaption: "Every event connected to the procedure, training and evidence behind it.",
  },
  {
    n: 7,
    timecode: "0:44–0:57",
    vo:
      "On top, the Intelligence Layer reads that data with domain-trained AI — around 90% accuracy on operational language, versus about 35% for generic tools.",
    visual:
      "Layer 3 lands. Three sub-tiles glow in — Automation · Insights · Recommendations. Floating comparison chip: 90% vs 35%.",
    motion: "Layer drop; sub-tiles glow staggered; chip pop.",
    valueCaption: "~90% domain accuracy vs ~35% for generic AI.",
  },
  {
    n: 8,
    timecode: "0:57–1:05",
    vo: "And a Unified Mobile shell puts it all in the hands of the frontline.",
    visual:
      "Layer 4 lands. Phone silhouette docks on the layer showing Procedures / Training / Safety tabs.",
    motion: "Layer drop + phone parallax float.",
    valueCaption: "Crews work in one app they actually trust — offline-ready.",
  },
  {
    n: 9,
    timecode: "1:05–1:30",
    vo:
      "Around the stack runs our operating model — DTOP. Detect · Trigger · Orchestrate · Prove.",
    visual:
      "DTOP ribbon wraps around all four layers. Four labelled arcs light in sequence — Detect (blue) → Trigger (amber) → Orchestrate (violet) → Prove (emerald). A signal dot travels the loop.",
    motion: "Linear-eased ribbon travel; arcs light on VO word cues.",
  },
  {
    n: 10,
    timecode: "1:30–1:42",
    vo: "Protected schedules, protected revenue, lower cost of operations…",
    visual:
      "Four outcome tiles pop above the stack, each with a micro-icon and a specific number sourced from the Line-of-Sight model.",
    motion: "Stagger pop-in (spring, damping 15).",
  },
  {
    n: 11,
    timecode: "1:42–1:50",
    vo: "…and a frontline that trusts the system. Trusted today by 550+ operators.",
    visual:
      "Trust strip appears beneath the outcome tiles — '550+ operators worldwide' with a subtle row of muted operator marks.",
    motion: "Strip slide-in from below.",
  },
  {
    n: 12,
    timecode: "1:50–2:00",
    vo: "One platform. One operating model. One entry point.",
    visual: "Endframe — Comply365 logo lock-up on dark background with comply365.com.",
    motion: "Hold on logo · subtle glow pulse.",
  },
];

export const ART_DIRECTION = [
  {
    label: "Style",
    value:
      "Isometric 3/4 layered stack matching Amdocs Cognitive Core — soft depth shadows, thin luminous edges, subtle grid pattern per slab.",
  },
  {
    label: "Palette",
    value:
      "bg hsl(222 47% 6%) · primary #0066FF · DTOP #3B82F6 / #F59E0B / #8B5CF6 / #10B981 · ink #F5F7FA.",
  },
  {
    label: "Type",
    value: "Space Grotesk display · Inter body — labels only, no long copy on-screen.",
  },
  {
    label: "Motion language",
    value:
      "Springs on layer-drops · linear ease on the DTOP ribbon travel · single signal dot as the recurring motif tying every scene.",
  },
  {
    label: "Terminology guardrails",
    value:
      "Operational Performance Platform · Intelligence Layer · DTOP · Recommended Actions. Never use CoAnalyst / FOQA / FDM.",
  },
];

export const OUT_OF_SCOPE = [
  "Actual animatic / motion tests (follow-on using Remotion + Rive/Lottie).",
  "Voice casting and music bed selection.",
  "Localised versions.",
];