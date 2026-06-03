// World-class content craft frameworks, voices, and scoring rubrics applied
// to every generated asset. Sourced from established authorities so the AI
// generator produces deliberate, defensible content — not generic copy.

import type { AssetTypeId } from "./editorialPlaybook";

export type VoiceId = "thought_leader" | "corporate" | "hybrid";

export const VOICES: Record<VoiceId, { label: string; guide: string }> = {
  thought_leader: {
    label: "Thought leader",
    guide:
      "First-person where natural. Lead with a contrarian or non-obvious POV. " +
      "Anchor in lived operational experience. Use named opinions ('I think', 'In my experience'). " +
      "Short, signature lines. Specifics over generalities. No marketing hedges.",
  },
  corporate: {
    label: "Corporate",
    guide:
      "Third-person, brand-led ('Comply365', 'we'). Measured authority, enterprise-safe. " +
      "Evidence-backed, no opinion. Approved terminology only. Suitable for RFPs, " +
      "official announcements, and procurement-grade material.",
  },
  hybrid: {
    label: "Hybrid",
    guide:
      "Corporate frame with thought-leader pull-quotes. Brand narrates, named voices " +
      "(executives, customers) supply opinion and texture. Use for webinars, scripts, " +
      "and customer-story narratives.",
  },
};

// Universal craft rules applied to every asset.
export const UNIVERSAL_CRAFT = [
  "Active voice (Strunk & White): subjects act on objects.",
  "Sentence-length variance: alternate short punches with longer rhythmic lines.",
  "Concrete > abstract: name the system, the dollar, the day of the week.",
  "Evidence per claim: every assertion needs a number, a name, or a source.",
  "No filler adverbs ('very', 'really', 'simply', 'just', 'actually').",
  "Cut throat-clearing openers. First line earns the second.",
  "Sensory and operational verbs over corporate verbs ('ship', 'catch', 'route' over 'leverage', 'utilize').",
  "Read it aloud test: if it sounds like a press release, rewrite it.",
];

// Frameworks (with named authorities) the generator must apply, by asset type.
export const FRAMEWORKS_BY_TYPE: Record<
  AssetTypeId,
  { id: string; name: string; authority: string; rules: string[] }[]
> = {
  long_form: [
    {
      id: "handley_truth",
      name: "TRUTH framework",
      authority: "Ann Handley · Everybody Writes",
      rules: [
        "Truthful: claims are verifiable.",
        "Rare: don't say what every competitor is already saying.",
        "Useful: reader leaves with something they can apply on Monday.",
        "Tested: facts and sources cited.",
        "Human: write like a person, not a brochure.",
      ],
    },
    {
      id: "crestodina_originality",
      name: "Original research bias",
      authority: "Andy Crestodina · Orbit Media",
      rules: [
        "Lead with proprietary data, customer numbers, or first-hand observation.",
        "Quote a named expert or operator at least once.",
        "Use one concrete example per major claim.",
      ],
    },
    {
      id: "nielsen_norman",
      name: "Scannability (F-pattern)",
      authority: "Nielsen Norman Group",
      rules: [
        "Front-load value in the first 11 words of each section.",
        "Subheads carry meaning if read alone.",
        "Bullets and pull-quotes break long passages.",
        "Short paragraphs (≤3 sentences).",
      ],
    },
    {
      id: "bluf",
      name: "BLUF — Bottom Line Up Front",
      authority: "US military / McKinsey pyramid",
      rules: [
        "Conclusion in the first 2 sentences.",
        "Then support with the why.",
        "End with the action you want the reader to take.",
      ],
    },
  ],
  social: [
    {
      id: "hook_deck",
      name: "Hook-deck patterns",
      authority: "Justin Welsh / Dickie Bush",
      rules: [
        "Open with a contrarian claim, a number, or a moment of tension.",
        "Line 1 sells line 2. Line 2 sells line 3.",
        "Use line breaks as punctuation.",
      ],
    },
    {
      id: "cialdini",
      name: "Persuasion principles",
      authority: "Robert Cialdini · Influence",
      rules: [
        "Authority: name credentials, customers, or numbers.",
        "Specificity: '$25–35B' beats 'billions'.",
        "Social proof: reference a real customer or operator.",
      ],
    },
    {
      id: "aida_social",
      name: "AIDA",
      authority: "E. St. Elmo Lewis",
      rules: [
        "Attention (hook) → Interest (the stake) → Desire (the shift) → Action (the question/CTA).",
        "One idea per line. No paragraphs longer than 2 lines.",
      ],
    },
  ],
  enablement: [
    {
      id: "dunford_positioning",
      name: "Obviously Awesome positioning",
      authority: "April Dunford",
      rules: [
        "State the competitive alternative honestly.",
        "Name the unique attributes only you have.",
        "Translate attributes into customer value.",
        "Name the best-fit customer (who this is for, who it isn't).",
      ],
    },
    {
      id: "challenger",
      name: "Teach-Tailor-Take Control",
      authority: "Dixon & Adamson · The Challenger Sale",
      rules: [
        "Teach the buyer something about their own business they didn't know.",
        "Tailor the insight to the persona's KPIs.",
        "Take control — recommend a specific next step.",
      ],
    },
    {
      id: "one_pager_arc",
      name: "Problem→Cost→Solution→Proof→Ask",
      authority: "B2B enablement standard",
      rules: [
        "Quantify the problem in dollars or risk.",
        "Differentiator framing, not feature list.",
        "Proof in the form of a named customer or third-party stat.",
        "One ask, one CTA, one owner.",
      ],
    },
  ],
  script: [
    {
      id: "storybrand",
      name: "StoryBrand 7-part",
      authority: "Donald Miller",
      rules: [
        "A character (the buyer) has a problem.",
        "Meets a guide (Comply365) with a plan.",
        "Who calls them to action and helps them avoid failure.",
        "Ending in transformation.",
      ],
    },
    {
      id: "three_act",
      name: "Three-act structure",
      authority: "Aristotle · Syd Field",
      rules: [
        "Act 1 — set the world and the stake.",
        "Act 2 — confrontation: the inbox today, the cost of inaction.",
        "Act 3 — resolution: DTOP loop, proof, decision.",
      ],
    },
    {
      id: "visual_script_parallel",
      name: "Visual / script parallelism",
      authority: "Broadcast standard",
      rules: [
        "Every scene specifies VISUAL and SCRIPT on separate lines.",
        "What the viewer SEES reinforces what they HEAR — never duplicates it.",
        "Show, don't tell: visualize the signal, the routing, the proof.",
      ],
    },
  ],
};

// Per-asset-type weighted rubric. Sum of weights = 100.
export interface RubricDimension {
  id: string;
  label: string;
  weight: number;
  guide: string;
}

export const RUBRICS_BY_TYPE: Record<AssetTypeId, RubricDimension[]> = {
  long_form: [
    { id: "hook", label: "Hook strength", weight: 15, guide: "Does the opener earn the next sentence?" },
    { id: "originality", label: "Originality / POV", weight: 15, guide: "Non-obvious angle, not table-stakes commentary." },
    { id: "evidence", label: "Evidence density", weight: 15, guide: "Numbers, sources, named customers per major claim." },
    { id: "spine", label: "DTOP / 5-beat fidelity", weight: 15, guide: "All 5 beats present and in order." },
    { id: "scannability", label: "Scannability (NN/g)", weight: 10, guide: "Subheads, short paras, front-loaded value." },
    { id: "voice", label: "Voice fit", weight: 10, guide: "Matches the chosen voice (thought-leader / corporate / hybrid)." },
    { id: "cta", label: "CTA strength", weight: 10, guide: "One specific, time-bound action." },
    { id: "terminology", label: "Terminology compliance", weight: 10, guide: "No forbidden terms. Product names without spaces." },
  ],
  social: [
    { id: "hook", label: "Hook (line 1)", weight: 25, guide: "Pattern interrupt or specific number in the first line." },
    { id: "specificity", label: "Specificity", weight: 15, guide: "Concrete numbers, names, moments." },
    { id: "single_idea", label: "Single idea", weight: 10, guide: "Post defends one idea, not three." },
    { id: "pattern", label: "Pattern interrupt", weight: 10, guide: "Line breaks and rhythm create stop-scroll moments." },
    { id: "authority", label: "Authority signal", weight: 10, guide: "Credential, customer, or proof point present." },
    { id: "voice", label: "Voice fit", weight: 15, guide: "Matches chosen voice." },
    { id: "cta", label: "CTA / question", weight: 10, guide: "Ends with a question or specific ask." },
    { id: "terminology", label: "Terminology compliance", weight: 5, guide: "No forbidden terms." },
  ],
  enablement: [
    { id: "problem", label: "Problem clarity", weight: 15, guide: "Buyer pain quantified in $ or risk." },
    { id: "differentiator", label: "Differentiator framing", weight: 15, guide: "Dunford-style: alternatives → unique attributes → value." },
    { id: "proof", label: "Proof density", weight: 15, guide: "Named customers, third-party stats, specifics." },
    { id: "scannability", label: "Scannability", weight: 15, guide: "Skim-readable in 30 seconds by a seller." },
    { id: "sales_ready", label: "Sales-ready", weight: 15, guide: "Seller could use this in front of a buyer unchanged." },
    { id: "voice", label: "Voice fit", weight: 10, guide: "Matches chosen voice." },
    { id: "cta", label: "CTA", weight: 10, guide: "Single, owned next step." },
    { id: "terminology", label: "Terminology compliance", weight: 5, guide: "No forbidden terms." },
  ],
  script: [
    { id: "hook", label: "Opening hook", weight: 15, guide: "First 10 seconds earn the next 30." },
    { id: "arc", label: "Story arc", weight: 15, guide: "Three acts; clear stake, confrontation, resolution." },
    { id: "parallel", label: "Visual/script parallelism", weight: 15, guide: "VISUAL and SCRIPT lines reinforce, don't duplicate." },
    { id: "pacing", label: "Pacing", weight: 10, guide: "Scenes ~30–60s, no dead air." },
    { id: "spine", label: "DTOP / 5-beat spine", weight: 15, guide: "All 5 beats present across scenes." },
    { id: "voice", label: "Voice fit", weight: 10, guide: "Matches chosen voice." },
    { id: "cta", label: "CTA", weight: 10, guide: "Specific ask closes the script." },
    { id: "terminology", label: "Terminology compliance", weight: 10, guide: "No forbidden terms." },
  ],
};

// Default voice per persona × asset_type.
export function getDefaultVoice(persona: string, assetType: AssetTypeId): VoiceId {
  if (assetType === "script") return "hybrid";
  if (assetType === "enablement") return "corporate";
  if (persona === "tech") return "corporate";
  if (persona === "exec") return "thought_leader";
  if (persona === "ops") return assetType === "long_form" ? "hybrid" : "thought_leader";
  return "corporate";
}

export function getRubric(assetType: AssetTypeId): RubricDimension[] {
  return RUBRICS_BY_TYPE[assetType] ?? RUBRICS_BY_TYPE.long_form;
}

export function getFrameworks(assetType: AssetTypeId) {
  return FRAMEWORKS_BY_TYPE[assetType] ?? FRAMEWORKS_BY_TYPE.long_form;
}

export function gradeBand(total: number): "A" | "B" | "C" | "Rework" {
  if (total >= 90) return "A";
  if (total >= 80) return "B";
  if (total >= 70) return "C";
  return "Rework";
}

export function bandColor(band: string): string {
  switch (band) {
    case "A": return "bg-emerald-500";
    case "B": return "bg-blue-500";
    case "C": return "bg-amber-500";
    default: return "bg-rose-500";
  }
}