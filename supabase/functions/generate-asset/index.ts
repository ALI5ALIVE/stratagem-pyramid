import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface GenerateRequest {
  briefId: string;
  refineNote?: string;
  voice?: "thought_leader" | "corporate" | "hybrid";
}

const ASSET_TYPE_SPEC: Record<string, string> = {
  long_form:
    "Produce a 1,200–2,500 word blog/article in clean markdown. Use a strong hook, H2 sections that map to the 5-beat spine, short paragraphs, and end with a clear CTA. No filler.",
  social:
    "Produce a single LinkedIn post under 1,300 characters. Open with a scroll-stopping line. 4–7 short lines, 1 line per idea. End with one question. No hashtags inline; suggest 3 at the bottom on a separate line.",
  enablement:
    "Produce a sales enablement asset in markdown with these sections: 'Headline', 'The Shift', 'What We Solve', 'How (DTOP)', 'Proof', '3 Reasons to Choose Us', 'Next Step'. Bullet-heavy, scannable.",
  script:
    "Produce a script in markdown organized scene-by-scene. For each scene give: [Scene N · ~XXs] heading, VISUAL line, SCRIPT line. Cover the full 5-beat spine across 6–10 scenes.",
};

const VOICES: Record<string, { label: string; guide: string }> = {
  thought_leader: {
    label: "Thought leader",
    guide:
      "First-person where natural. Contrarian or non-obvious POV. Lived operational anchors. Named opinions. Short signature lines. No marketing hedges.",
  },
  corporate: {
    label: "Corporate",
    guide:
      "Third-person, brand-led ('Comply365', 'we'). Measured authority. Evidence-backed, no opinion. Procurement-grade language.",
  },
  hybrid: {
    label: "Hybrid",
    guide:
      "Corporate frame with thought-leader pull-quotes. Brand narrates, named voices supply opinion.",
  },
};

const UNIVERSAL_CRAFT = [
  "Active voice (Strunk & White).",
  "Sentence-length variance — alternate short punches with longer rhythmic lines.",
  "Concrete > abstract: name the system, the dollar, the day.",
  "Evidence per claim: every assertion has a number, a name, or a source.",
  "Cut filler adverbs (very, really, simply, just, actually).",
  "Cut throat-clearing openers. First line earns the second.",
  "Operational verbs (ship, catch, route) over corporate verbs (leverage, utilize).",
];

const FRAMEWORKS_BY_TYPE: Record<string, { name: string; authority: string; rules: string[] }[]> = {
  long_form: [
    { name: "TRUTH framework", authority: "Ann Handley · Everybody Writes",
      rules: ["Truthful, Rare, Useful, Tested, Human.", "Don't say what every competitor is already saying."] },
    { name: "Original research bias", authority: "Andy Crestodina · Orbit Media",
      rules: ["Lead with proprietary data or first-hand observation.", "Quote a named expert at least once."] },
    { name: "Scannability (F-pattern)", authority: "Nielsen Norman Group",
      rules: ["Front-load value in first 11 words of each section.", "Subheads carry meaning if read alone.", "Short paragraphs (≤3 sentences)."] },
    { name: "BLUF — Bottom Line Up Front", authority: "McKinsey pyramid",
      rules: ["Conclusion in the first 2 sentences, then support."] },
  ],
  social: [
    { name: "Hook-deck patterns", authority: "Justin Welsh / Dickie Bush",
      rules: ["Open with contrarian claim, number, or tension.", "Line 1 sells line 2. Line breaks as punctuation."] },
    { name: "Persuasion principles", authority: "Robert Cialdini · Influence",
      rules: ["Authority, specificity, social proof.", "'$25–35B' beats 'billions'."] },
    { name: "AIDA", authority: "E. St. Elmo Lewis",
      rules: ["Attention → Interest → Desire → Action.", "One idea per line."] },
  ],
  enablement: [
    { name: "Obviously Awesome positioning", authority: "April Dunford",
      rules: ["Name the competitive alternative honestly.", "Unique attributes → customer value.", "Best-fit customer named."] },
    { name: "Teach-Tailor-Take Control", authority: "Dixon & Adamson · Challenger Sale",
      rules: ["Teach buyer something they didn't know.", "Tailor to persona KPIs.", "Recommend a specific next step."] },
    { name: "Problem→Cost→Solution→Proof→Ask", authority: "B2B enablement standard",
      rules: ["Problem quantified in $ or risk.", "Differentiator framing, not feature list.", "One CTA, one owner."] },
  ],
  script: [
    { name: "StoryBrand 7-part", authority: "Donald Miller",
      rules: ["Character has problem, meets guide with plan, called to action, ending in transformation."] },
    { name: "Three-act structure", authority: "Aristotle / Syd Field",
      rules: ["Act 1 stake. Act 2 confrontation. Act 3 resolution."] },
    { name: "Visual/script parallelism", authority: "Broadcast standard",
      rules: ["VISUAL and SCRIPT on separate lines.", "What viewer SEES reinforces what they HEAR — never duplicates.", "Show, don't tell."] },
  ],
};

interface RubricDimension { id: string; label: string; weight: number; guide: string; }
const RUBRICS_BY_TYPE: Record<string, RubricDimension[]> = {
  long_form: [
    { id: "hook", label: "Hook strength", weight: 15, guide: "Does the opener earn the next sentence?" },
    { id: "originality", label: "Originality / POV", weight: 15, guide: "Non-obvious angle." },
    { id: "evidence", label: "Evidence density", weight: 15, guide: "Numbers, sources, named customers." },
    { id: "spine", label: "DTOP / 5-beat fidelity", weight: 15, guide: "All 5 beats present in order." },
    { id: "scannability", label: "Scannability (NN/g)", weight: 10, guide: "Subheads, short paras, front-loaded value." },
    { id: "voice", label: "Voice fit", weight: 10, guide: "Matches chosen voice." },
    { id: "cta", label: "CTA strength", weight: 10, guide: "One specific action." },
    { id: "terminology", label: "Terminology compliance", weight: 10, guide: "No forbidden terms; product names no spaces." },
  ],
  social: [
    { id: "hook", label: "Hook (line 1)", weight: 25, guide: "Pattern interrupt or specific number." },
    { id: "specificity", label: "Specificity", weight: 15, guide: "Concrete numbers, names, moments." },
    { id: "single_idea", label: "Single idea", weight: 10, guide: "Defends one idea, not three." },
    { id: "pattern", label: "Pattern interrupt", weight: 10, guide: "Rhythm creates stop-scroll." },
    { id: "authority", label: "Authority signal", weight: 10, guide: "Credential or proof present." },
    { id: "voice", label: "Voice fit", weight: 15, guide: "Matches chosen voice." },
    { id: "cta", label: "CTA / question", weight: 10, guide: "Ends with question or ask." },
    { id: "terminology", label: "Terminology compliance", weight: 5, guide: "No forbidden terms." },
  ],
  enablement: [
    { id: "problem", label: "Problem clarity", weight: 15, guide: "Pain quantified." },
    { id: "differentiator", label: "Differentiator framing", weight: 15, guide: "Dunford-style." },
    { id: "proof", label: "Proof density", weight: 15, guide: "Named customers, third-party stats." },
    { id: "scannability", label: "Scannability", weight: 15, guide: "Skim-readable in 30s." },
    { id: "sales_ready", label: "Sales-ready", weight: 15, guide: "Usable unchanged by a seller." },
    { id: "voice", label: "Voice fit", weight: 10, guide: "Matches chosen voice." },
    { id: "cta", label: "CTA", weight: 10, guide: "Single owned next step." },
    { id: "terminology", label: "Terminology compliance", weight: 5, guide: "No forbidden terms." },
  ],
  script: [
    { id: "hook", label: "Opening hook", weight: 15, guide: "First 10s earn next 30." },
    { id: "arc", label: "Story arc", weight: 15, guide: "Three acts." },
    { id: "parallel", label: "Visual/script parallelism", weight: 15, guide: "VISUAL and SCRIPT reinforce." },
    { id: "pacing", label: "Pacing", weight: 10, guide: "~30–60s scenes, no dead air." },
    { id: "spine", label: "DTOP / 5-beat spine", weight: 15, guide: "All 5 beats present." },
    { id: "voice", label: "Voice fit", weight: 10, guide: "Matches chosen voice." },
    { id: "cta", label: "CTA", weight: 10, guide: "Specific closing ask." },
    { id: "terminology", label: "Terminology compliance", weight: 10, guide: "No forbidden terms." },
  ],
};

function gradeBand(total: number): string {
  if (total >= 90) return "A";
  if (total >= 80) return "B";
  if (total >= 70) return "C";
  return "Rework";
}

function renderOutline(outline: any, assetType: string): string {
  if (!Array.isArray(outline) || outline.length === 0) return "(no outline supplied — use the spine to structure the asset)";
  try {
    if (assetType === "social") {
      const o = outline[0] ?? {};
      return `Hook: ${o.hook ?? ""}\nBody lines:\n${(o.body_lines ?? []).map((l: string) => "  - " + l).join("\n")}\nClosing question: ${o.closing_question ?? ""}\nHashtags: ${(o.hashtags ?? []).join(" ")}`;
    }
    if (assetType === "script") {
      return outline.map((s: any, i: number) =>
        `Scene ${i + 1} · ~${s.duration_seconds ?? 30}s\n  VISUAL: ${s.visual ?? ""}\n  SCRIPT beats:\n${(s.script_beats ?? []).map((b: string) => "    - " + b).join("\n")}\n  On-screen: ${s.on_screen_text ?? ""}`
      ).join("\n\n");
    }
    // sections
    return outline.map((s: any, i: number) =>
      `### Section ${i + 1}: ${s.heading ?? ""}\nIntent: ${s.intent ?? ""}\nSub-points:\n${(s.bullets ?? []).map((b: string) => "  - " + b).join("\n")}\nEvidence to cite: ${s.evidence ?? ""}`
    ).join("\n\n");
  } catch {
    return JSON.stringify(outline);
  }
}

function buildPrompt(brief: any, item: any, snapshot: any, voiceId: string, refineNote?: string) {
  const persona = snapshot?.personas?.[item.persona]?.tone ?? "Professional";
  const arc = snapshot?.personas?.[item.persona]?.arc ?? "";
  const spec = ASSET_TYPE_SPEC[item.asset_type] ?? ASSET_TYPE_SPEC.long_form;
  const proof = (brief.proof_points ?? []).join("\n- ");
  const differentiators = (snapshot?.differentiators ?? []).join("\n- ");
  const forbidden = (snapshot?.terminology?.forbidden ?? []).join(", ");
  const spineLines = (snapshot?.spine ?? [])
    .map((b: any) => {
      const v = brief.spine_beats?.[b.id] ?? "(use playbook default)";
      return `- **${b.label}** — ${b.purpose}\n  Brief input: ${v}`;
    })
    .join("\n");

  const outlineBlock = renderOutline(brief.outline, item.asset_type);
  const takeaways = (brief.takeaways ?? []).map((t: string) => "- " + t).join("\n") || "(none)";
  const sources = (brief.sources ?? []).map((s: string) => "- " + s).join("\n") || "(none)";
  const altTitles = (brief.alt_titles ?? []).join(" · ");
  const distribution = brief.distribution
    ? `Primary: ${brief.distribution.primary_channel ?? "(n/a)"} · Repurpose: ${(brief.distribution.repurpose ?? []).join(", ")}`
    : "(none)";

  const voice = VOICES[voiceId] ?? VOICES.corporate;
  const frameworks = FRAMEWORKS_BY_TYPE[item.asset_type] ?? FRAMEWORKS_BY_TYPE.long_form;
  const rubric = RUBRICS_BY_TYPE[item.asset_type] ?? RUBRICS_BY_TYPE.long_form;

  const frameworkBlock = frameworks
    .map((f) => `### ${f.name} — ${f.authority}\n${f.rules.map((r) => "- " + r).join("\n")}`)
    .join("\n\n");

  const rubricBlock = rubric
    .map((d) => `- ${d.id} (${d.weight} pts) — ${d.label}: ${d.guide}`)
    .join("\n");

  const system = `You are the senior editor for Comply365's content team — held to the standards of Ann Handley, Andy Crestodina, April Dunford, and Donald Miller.
Every asset you produce MUST follow the 5-beat spine: Shift → Platform → Loop (DTOP) → Proof → Differentiators.
DTOP = Detect → Trigger → Orchestrate → Prove.
Intelligence Layer headline: ~90% domain accuracy at L4–L5 vs ~35% generic AI.
Product names have NO spaces: Comply365, SafetyManager365, ContentManager365.
Forbidden terms (do not use): ${forbidden}.

Persona tone: ${persona}
Narrative arc: ${arc}

## VOICE: ${voice.label}
${voice.guide}

## UNIVERSAL CRAFT RULES (apply to every line)
${UNIVERSAL_CRAFT.map((r) => "- " + r).join("\n")}

## CRAFT FRAMEWORKS FOR THIS ASSET TYPE
${frameworkBlock}

## OUTPUT SPEC
${spec}

## SELF-SCORING — MANDATORY
After the asset body, append a fenced block exactly like:

\`\`\`json-scorecard
{
  "dimensions": [
    { "id": "hook", "score": 0-10, "rationale": "one sentence", "improvement": "one concrete fix" },
    ...one entry per rubric dimension below
  ]
}
\`\`\`

Rubric dimensions (id · weight · what to assess):
${rubricBlock}

Be honest. Score yourself critically — if the hook is generic, score it 4, not 8. Improvements must be concrete edits, not vague advice.`;

  const user = `# Brief
Title: ${item.title}
Persona: ${item.persona}
Channel: ${item.channel}
Asset type: ${item.asset_type}
Voice: ${voice.label}
Working title: ${brief.angle ? (brief as any).working_title ?? item.title : item.title}
Alt titles considered: ${altTitles || "(none)"}

Objective: ${brief.objective || "(not provided)"}
Audience: ${brief.audience || "(not provided)"}
Angle (unique POV): ${brief.angle || "(not provided)"}
Core insight: ${brief.core_insight || brief.key_message || "(not provided)"}
CTA: ${brief.cta || "(not provided)"}
Tone override: ${brief.tone || "(use persona default)"}
Length: ${brief.length || "(use asset spec default)"}
Success metric: ${brief.success_metric || "(not set)"}
Distribution: ${distribution}

# OUTLINE — this is the scaffold for the asset; follow it section by section
${outlineBlock}

# Key takeaways the reader must leave with
${takeaways}

# External sources to ground claims in
${sources}

# 5-beat messaging spine (guardrails — weave naturally, do NOT label sections "Shift" / "Platform" / etc.)
${spineLines}

# Proof points to weave in
- ${proof || "(use playbook defaults)"}

# Canonical differentiators (the close)
- ${differentiators}

${refineNote ? `# Revision note from editor\n${refineNote}\n` : ""}
Produce the asset now. Follow the OUTLINE as the scaffold — every section/scene/line in the outline becomes a section/scene/line in the asset. Weave the spine beats and proof points naturally into that structure. Markdown only, no preamble. End with the json-scorecard block.`;

  return { system, user };
}

function extractScorecard(raw: string, rubric: RubricDimension[]) {
  const match = raw.match(/```json-scorecard\s*([\s\S]*?)```/i);
  let body = raw;
  let scores: any = { dimensions: [] };
  if (match) {
    body = raw.replace(match[0], "").trim();
    try {
      scores = JSON.parse(match[1]);
    } catch { /* ignore parse errors */ }
  }
  // Compute weighted total
  const dimMap = new Map(rubric.map((d) => [d.id, d]));
  let total = 0;
  let maxPossible = 0;
  for (const d of rubric) {
    maxPossible += d.weight;
    const found = (scores.dimensions ?? []).find((x: any) => x.id === d.id);
    const s = typeof found?.score === "number" ? Math.max(0, Math.min(10, found.score)) : 0;
    total += (s / 10) * d.weight;
  }
  const totalRounded = Math.round(total);
  return {
    body,
    scores: {
      dimensions: scores.dimensions ?? [],
      max_possible: maxPossible,
    },
    total: totalRounded,
    band: gradeBand(totalRounded),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await userClient.auth.getUser();
    if (!userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleRows } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id);
    const roles = (roleRows ?? []).map((r: any) => r.role);
    if (!roles.includes("owner") && !roles.includes("editor")) {
      return new Response(JSON.stringify({ error: "Forbidden: editor or owner role required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as GenerateRequest;
    if (!body?.briefId) {
      return new Response(JSON.stringify({ error: "briefId required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: brief, error: briefErr } = await admin
      .from("briefs")
      .select("*")
      .eq("id", body.briefId)
      .maybeSingle();
    if (briefErr || !brief) {
      return new Response(JSON.stringify({ error: "Brief not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: item, error: itemErr } = await admin
      .from("content_items")
      .select("*")
      .eq("id", brief.content_item_id)
      .maybeSingle();
    if (itemErr || !item) {
      return new Response(JSON.stringify({ error: "Item not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const snapshot = brief.playbook_snapshot ?? {};
    const voiceId = body.voice || brief.voice || "corporate";
    const { system, user } = buildPrompt(brief, item, snapshot, voiceId, body.refineNote);

    const model =
      item.asset_type === "social" ? "google/gemini-3-flash-preview" : "google/gemini-2.5-pro";

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      return new Response(
        JSON.stringify({ error: `AI gateway error: ${aiResp.status}`, detail: errText }),
        { status: aiResp.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const aiJson = await aiResp.json();
    const generated: string = aiJson?.choices?.[0]?.message?.content ?? "";
    const rubric = RUBRICS_BY_TYPE[item.asset_type] ?? RUBRICS_BY_TYPE.long_form;
    const parsed = extractScorecard(generated, rubric);

    const { data: prevAssets } = await admin
      .from("assets")
      .select("version")
      .eq("content_item_id", item.id)
      .order("version", { ascending: false })
      .limit(1);
    const nextVersion = (prevAssets?.[0]?.version ?? 0) + 1;

    const { data: asset, error: insertErr } = await admin
      .from("assets")
      .insert({
        content_item_id: item.id,
        brief_id: brief.id,
        version: nextVersion,
        body: parsed.body,
        body_json: { voice: voiceId },
        scores: parsed.scores,
        score_total: parsed.total,
        score_band: parsed.band,
        generation_prompt: user,
        model,
        status: "draft",
        created_by: userData.user.id,
      })
      .select()
      .single();

    if (insertErr) {
      return new Response(JSON.stringify({ error: insertErr.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Move item status forward if still in earlier phase.
    if (["idea", "brief"].includes(item.status)) {
      await admin.from("content_items").update({ status: "draft" }).eq("id", item.id);
    }

    return new Response(JSON.stringify({ asset }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});