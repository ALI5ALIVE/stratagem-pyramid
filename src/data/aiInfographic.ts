export type AITier = "ai" | "noai";

export interface AISolution {
  id: string;
  label: string;
  tier: AITier;
  // capability ids it maps to (across all product columns)
  targets: string[];
}

export interface ProductColumn {
  id: "content" | "training" | "safety";
  product: string;
  rows: { id: string; label: string; ai: boolean }[];
}

export const aiSolutions: AISolution[] = [
  { id: "coanalyst", label: "CoAnalyst", tier: "ai", targets: ["c-forms", "t-records", "s-reports"] },
  { id: "coauthor", label: "CoAuthor", tier: "ai", targets: ["c-authoring"] },
  { id: "qvery", label: "Qvery BI & Dashboards", tier: "ai", targets: ["c-reporting", "t-reporting"] },
  { id: "assistant", label: "AI Assistant", tier: "ai", targets: ["c-distribution"] },
  { id: "cotrainer", label: "CoTrainer", tier: "ai", targets: ["t-scheduling"] },
  { id: "agents", label: "AI Agents", tier: "ai", targets: ["t-learning"] },
];

export const noAISolution: AISolution = {
  id: "noai",
  label: "No AI",
  tier: "noai",
  targets: ["t-qualifications", "s-quality", "s-risk", "s-change"],
};

export const productColumns: ProductColumn[] = [
  {
    id: "content",
    product: "ContentManager365",
    rows: [
      { id: "c-forms", label: "Forms", ai: true },
      { id: "c-authoring", label: "Authoring", ai: true },
      { id: "c-reporting", label: "Reporting", ai: true },
      { id: "c-distribution", label: "Distribution", ai: true },
    ],
  },
  {
    id: "training",
    product: "TrainingManager365",
    rows: [
      { id: "t-records", label: "Training Records", ai: true },
      { id: "t-reporting", label: "Reporting", ai: true },
      { id: "t-scheduling", label: "Scheduling", ai: true },
      { id: "t-learning", label: "Learning Manager", ai: true },
      { id: "t-qualifications", label: "Qualifications", ai: false },
    ],
  },
  {
    id: "safety",
    product: "SafetyManager365",
    rows: [
      { id: "s-reports", label: "Safety Reports", ai: true },
      { id: "s-quality", label: "Quality Management", ai: false },
      { id: "s-risk", label: "Risk Management", ai: false },
      { id: "s-change", label: "Change Management", ai: false },
    ],
  },
];

/** Solution color (HSL tokens via tailwind classes). Keep blue/teal palette like source. */
export const solutionColors: Record<string, { bg: string; pptx: string }> = {
  coanalyst: { bg: "from-blue-500 to-blue-600", pptx: "3B82F6" },
  coauthor: { bg: "from-sky-300 to-blue-400", pptx: "7DD3FC" },
  qvery: { bg: "from-teal-500 to-emerald-500", pptx: "14B8A6" },
  assistant: { bg: "from-indigo-300 to-purple-300", pptx: "C4B5FD" },
  cotrainer: { bg: "from-teal-300 to-emerald-300", pptx: "5EEAD4" },
  agents: { bg: "from-cyan-400 to-teal-400", pptx: "22D3EE" },
  noai: { bg: "from-slate-500 to-slate-600", pptx: "64748B" },
};