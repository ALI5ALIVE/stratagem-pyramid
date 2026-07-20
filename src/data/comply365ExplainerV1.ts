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
}

export interface ScriptSegment {
  timecode: string;
  beat: string;
  text: string;
}

export const EXPLAINER_META = {
  title: "Comply365 · Operational Performance Platform — v1 Explainer",
  subtitle:
    "Product/solution explainer · ≤2 min · isometric layered stack (Amdocs Cognitive Core reference)",
  wordCount: 195,
  targetLength: "1:55–2:00",
  pace: "~105 wpm — allows sting, breaths, endframe",
  version: "v1 · for review Wed",
};

export const EXPLAINER_BEATS: ExplainerBeat[] = [
  {
    index: 1,
    label: "Hook — The fragmented reality",
    timecode: "0:00–0:15",
    purpose: "Establish the pain: siloed tools, orphaned signals",
    visualMode: "Scattered flat icons drifting apart",
  },
  {
    index: 2,
    label: "Stakes — Why it matters now",
    timecode: "0:15–0:30",
    purpose: "Regulatory + cost + AI-maturity pressure",
    visualMode: "Pressure gauges rising · siloed slabs",
  },
  {
    index: 3,
    label: "Reveal — The Platform",
    timecode: "0:30–0:50",
    purpose: "Isometric stack assembles layer-by-layer",
    visualMode: "Hero isometric build — Layers 1 → 4",
  },
  {
    index: 4,
    label: "How it works — DTOP loop",
    timecode: "0:50–1:25",
    purpose: "Detect → Trigger → Orchestrate → Prove wrapping the stack",
    visualMode: "Layer 5 DTOP ribbon travelling the stack",
  },
  {
    index: 5,
    label: "Payoff — Outcomes + close",
    timecode: "1:25–2:00",
    purpose: "Schedule · revenue · cost · loyalty + logo outro",
    visualMode: "Outcome tiles · frontline ripple · endframe",
  },
];

export const EXPLAINER_SCRIPT: ScriptSegment[] = [
  {
    timecode: "0:00",
    beat: "Hook",
    text:
      "Every day, aviation operations generate thousands of signals — safety reports, training gaps, procedure changes, audit findings. Most of them go nowhere.",
  },
  {
    timecode: "0:15",
    beat: "Stakes",
    text:
      "Regulators want proactive evidence. Costs are rising. And the tools meant to help — safety systems, document platforms, training records — sit in silos, disconnected from each other and from the outcome.",
  },
  {
    timecode: "0:30",
    beat: "Reveal",
    text:
      "This is Comply365 — the Operational Performance Platform. One foundation for content, training and safety. One intelligence layer that reads across all of them. One trusted mobile shell for the frontline.",
  },
  {
    timecode: "0:50",
    beat: "How it works",
    text:
      "Wrapping it all: DTOP — our operating model. We Detect every signal, Trigger the right response, Orchestrate the work across procedures, training and safety, and Prove it with an auditable evidence chain.",
  },
  {
    timecode: "1:25",
    beat: "Payoff",
    text:
      "The result: protected schedules. Protected revenue. Lower cost of operations. And crews that trust the system they use every shift.",
  },
  {
    timecode: "1:45",
    beat: "Close",
    text:
      "From fragmented operations to closed-loop performance. Comply365. One platform. One operating model. One entry point.",
  },
];

export const EXPLAINER_STORYBOARD: ExplainerShot[] = [
  {
    n: 1,
    timecode: "0:00–0:05",
    vo: "Every day…",
    visual:
      "Dark hero canvas; small icons (report, manual, training cert, audit) drift on-screen from all sides.",
    motion: "Slow parallax drift.",
  },
  {
    n: 2,
    timecode: "0:05–0:15",
    vo: "Most go nowhere.",
    visual: "Icons dim/grey out; thin dotted paths trail off-frame.",
    motion: "Desaturate to communicate loss.",
  },
  {
    n: 3,
    timecode: "0:15–0:25",
    vo: "Regulators… costs… tools in silos.",
    visual:
      "Three pressure meters rise on left; three siloed slabs (SMS · Docs · TMS) appear disconnected on right.",
    motion: "Meters tick up; slabs stay apart.",
  },
  {
    n: 4,
    timecode: "0:25–0:30",
    vo: "(Beat / transition)",
    visual: "Slabs magnetise together; camera pushes in and rotates to isometric 3/4 view.",
    motion: "Camera move + magnetic snap.",
  },
  {
    n: 5,
    timecode: "0:30–0:38",
    vo: "This is Comply365…",
    visual:
      "Layer 1 slides in — Core Operational Apps: Procedures · Competence · Occurrences. Label pins on.",
    motion: "Spring-in from below, label pins fade after 6 frames.",
  },
  {
    n: 6,
    timecode: "0:38–0:44",
    vo: "One foundation…",
    visual:
      "Layer 2 (Operational Data Foundation) drops on top with data-mesh pattern flowing between apps.",
    motion: "Layer drop + animated mesh lines.",
  },
  {
    n: 7,
    timecode: "0:44–0:50",
    vo: "One intelligence layer…",
    visual:
      "Layer 3 (Intelligence & Orchestration) lands with three sub-tiles — Automation · Insights · Recommendations — glowing.",
    motion: "Layer drop, sub-tiles glow-in staggered.",
  },
  {
    n: 8,
    timecode: "0:50–0:55",
    vo: "One trusted mobile shell.",
    visual:
      "Layer 4 (Unified Mobile) lands; phone silhouette docks on the layer showing Procedures / Training / Safety tabs.",
    motion: "Layer drop, phone parallax float.",
  },
  {
    n: 9,
    timecode: "0:55–1:25",
    vo:
      "Wrapping it all: DTOP — Detect · Trigger · Orchestrate · Prove.",
    visual:
      "Layer 5 DTOP ribbon wraps around all four layers. Four labelled arcs light in sequence — Detect (blue) → Trigger (amber) → Orchestrate (violet) → Prove (emerald) — synced to the verbs. A single signal dot travels the full loop.",
    motion: "Linear-eased ribbon travel; arcs light on VO word cues.",
  },
  {
    n: 10,
    timecode: "1:25–1:40",
    vo: "Protected schedules… revenue… cost… loyalty.",
    visual:
      "Four outcome tiles pop above the stack, each with a micro-icon and the outcome line.",
    motion: "Stagger pop-in (spring, damping 15).",
  },
  {
    n: 11,
    timecode: "1:40–1:50",
    vo: "Crews that trust the system…",
    visual:
      "Camera pulls back; frontline crew silhouette taps the mobile shell; ripple animates back down through the stack.",
    motion: "Camera pullback + ripple cascade top-to-bottom.",
  },
  {
    n: 12,
    timecode: "1:50–2:00",
    vo: "One platform. One operating model. One entry point.",
    visual:
      "Endframe — Comply365 logo lock-up on dark background with comply365.com.",
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