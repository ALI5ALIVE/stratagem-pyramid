import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface DraftBriefRequest {
  contentItemId: string;
  voice?: "thought_leader" | "corporate" | "hybrid";
}

// Outline schema instruction by asset type.
const OUTLINE_INSTRUCTION: Record<string, string> = {
  long_form:
    `"outline": array of 5–8 SECTION objects, each { "heading": string, "intent": one-line purpose, "bullets": [3–6 sub-points], "evidence": "what stat/customer/source to cite here" }`,
  social:
    `"outline": array of 1 SOCIAL BLOCK object { "hook": punchy first line, "body_lines": [4–7 short lines, 1 idea per line], "closing_question": single question, "hashtags": [3 relevant tags] }`,
  enablement:
    `"outline": array of 7 SECTION objects in this order: Problem, Cost, Solution, How (DTOP), Proof, Differentiators, Ask. Each { "heading", "intent", "bullets": [2–5], "evidence" }`,
  script:
    `"outline": array of 6–10 SCENE objects, each { "duration_seconds": number 20–90, "visual": one sentence describing what the viewer SEES (must reinforce, never duplicate, the script), "script_beats": [2–4 spoken beats], "on_screen_text": short caption or label }`,
};

function buildPrompt(item: any, neighbours: any[], snapshot: any, voiceLabel: string) {
  const persona = snapshot?.personas?.[item.persona]?.label ?? item.persona;
  const personaArc = snapshot?.personas?.[item.persona]?.arc ?? "";
  const proofs = (snapshot?.proof_points ?? []).join("\n- ");
  const differentiators = (snapshot?.differentiators ?? []).join("\n- ");
  const forbidden = (snapshot?.terminology?.forbidden ?? []).join(", ");
  const spine = (snapshot?.spine ?? [])
    .map((b: any) => `- ${b.label}: ${b.purpose}`)
    .join("\n");
  const neighbourTitles = neighbours
    .filter((n) => n.id !== item.id)
    .map((n) => `- ${n.title} (${n.asset_type}, ${n.persona})`)
    .join("\n") || "(none)";

  const outlineInstruction = OUTLINE_INSTRUCTION[item.asset_type] ?? OUTLINE_INSTRUCTION.long_form;

  const theme = snapshot?.quarter_themes?.[item.quarter] ?? null;
  const themeBlock = theme
    ? `# Quarter theme (THIS is the spine — anchor every line of the brief to it)
Quarter: ${theme.label} — ${theme.theme}
Customer message: "${theme.quarterMessage}"
Narrative: ${theme.narrative}
DTOP role this quarter: ${theme.dtopRole}
Message territory you must stay inside:
- ${(theme.messageTerritory ?? []).join("\n- ")}
Forbidden in this quarter:
- ${(theme.forbiddenHere ?? []).join("\n- ")}`
    : `# Quarter theme: (no theme defined — fall back to the 5-beat spine)`;

  const system = `You are the senior editor at Comply365's content marketing team. You write briefs to the standard of Ann Handley, Andy Crestodina, April Dunford, and Donald Miller.

Your job is to produce a UNIQUE, asset-specific editorial brief — NOT a fill-in-the-spine form. The brief must be CUSTOMER-VOICED, not product-voiced: name the customer's operational pain first, in their language; earn the right to mention DTOP / the Intelligence Layer / proof points only when the quarter theme says so. Each asset must stand apart from every other piece in the calendar.

Rules:
- Product names have NO spaces: Comply365, SafetyManager365, ContentManager365.
- DTOP = Detect → Trigger → Orchestrate → Prove.
- Intelligence Layer headline: ~90% domain accuracy at L4–L5 vs ~35% generic AI.
- Forbidden terms: ${forbidden}.
- OBEY the quarter theme's "Forbidden in this quarter" list. Q1 must lead with fragmentation pain, NOT DTOP. Q2 introduces DTOP as the answer to signal-to-action lag. Q3 is readiness-as-condition. Q4 is proof / evidence / ROI.
- The angle MUST be different from sibling items in this pillar (see "Sibling items" below).
- Be specific. Name customers, numbers, scenarios, days of the week. No corporate filler.
- Voice = ${voiceLabel}. Match the angle and outline to that voice.

Return ONE valid JSON object only. No prose, no markdown fence. Schema:

{
  "working_title": string (sharper than the input title),
  "alt_titles": [string, string, string],
  "angle": "one sentence — the unique POV for this piece, what makes it different from sibling content",
  "audience": {
    "role": string,
    "kpi_under_pressure": string,
    "already_believes": string,
    "doesnt_believe": string
  },
  "core_insight": "the non-obvious thing this asset teaches the reader",
  ${outlineInstruction},
  "takeaways": [3–5 sentences the reader should be able to repeat],
  "proof_points": [3–5 strings — pick from the playbook proof points, naming numbers/customers/platform modules],
  "sources": [3–6 strings — external citations or references the writer should ground claims in],
  "spine_beats": {
    "shift": "1–2 sentences on how this asset opens the messaging shift",
    "platform": "1–2 sentences on how it references the platform",
    "loop": "1–2 sentences on how DTOP shows up",
    "proof": "1–2 sentences on the proof beat",
    "differentiators": "1–2 sentences on the close"
  },
  "cta": "single specific time-bound action",
  "distribution": {
    "primary_channel": string,
    "repurpose": [2 strings]
  },
  "success_metric": "1 line — what good looks like (e.g. ≥3% LinkedIn engagement, ≥45s avg read time)",
  "length": "target length (e.g. 1,500–1,800 words, 1,200 chars, 90 sec, 1 page)",
  "tone": "1 line tone override for the writer"
}`;

  const user = `${themeBlock}

# Content item (the strategy says we need this piece)
Title: ${item.title}
Quarter: ${item.quarter}
Persona: ${persona} — arc: ${personaArc}
Channel: ${item.channel}
Asset type: ${item.asset_type}
Notes from strategist: ${item.notes || "(none)"}

# Sibling items in the same pillar (your angle must differ from these)
${neighbourTitles}

# Messaging guardrails (the writer will enforce these — your brief should set them up)
## 5-beat spine
${spine}

## Canonical proof points (pick 3–5 relevant ones)
- ${proofs}

## Differentiators (the close)
- ${differentiators}

Now draft the brief. JSON object only.`;

  return { system, user };
}

function safeParseJson(raw: string): any {
  // Strip code fences if model added them.
  let s = raw.trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) s = fence[1].trim();
  // Find first { and last }
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start >= 0 && end > start) s = s.slice(start, end + 1);
  return JSON.parse(s);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await userClient.auth.getUser();
    if (!userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleRows } = await admin
      .from("user_roles").select("role").eq("user_id", userData.user.id);
    const roles = (roleRows ?? []).map((r: any) => r.role);
    if (!roles.includes("owner") && !roles.includes("editor")) {
      return new Response(JSON.stringify({ error: "Forbidden: editor or owner role required" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as DraftBriefRequest;
    if (!body?.contentItemId) {
      return new Response(JSON.stringify({ error: "contentItemId required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const voice = body.voice ?? "corporate";
    const voiceLabel = voice === "thought_leader" ? "Thought leader" : voice === "hybrid" ? "Hybrid" : "Corporate";

    // Load item + sibling items in same pillar.
    const { data: item, error: itemErr } = await admin
      .from("content_items").select("*").eq("id", body.contentItemId).maybeSingle();
    if (itemErr || !item) {
      return new Response(JSON.stringify({ error: "Content item not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: neighbours } = await admin
      .from("content_items").select("id,title,asset_type,persona").eq("pillar_id", item.pillar_id);

    // Load existing brief snapshot if any; otherwise build a fresh one from the
    // shipped playbook (mirror of editorialPlaybook.ts).
    const { data: existingBrief } = await admin
      .from("briefs").select("*").eq("content_item_id", item.id).maybeSingle();

    const snapshot = existingBrief?.playbook_snapshot && Object.keys(existingBrief.playbook_snapshot as any).length > 0
      ? existingBrief.playbook_snapshot
      : DEFAULT_SNAPSHOT;

    const { system, user } = buildPrompt(item, neighbours ?? [], snapshot, voiceLabel);

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
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
    const raw: string = aiJson?.choices?.[0]?.message?.content ?? "";

    let parsed: any;
    try { parsed = safeParseJson(raw); }
    catch (e) {
      return new Response(JSON.stringify({ error: "Failed to parse brief JSON", raw }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Persist (upsert) — overwrite previous draft.
    const briefPayload: any = {
      content_item_id: item.id,
      objective: parsed.angle ?? "",
      angle: parsed.angle ?? "",
      audience: typeof parsed.audience === "object"
        ? `${parsed.audience.role ?? ""} — KPI: ${parsed.audience.kpi_under_pressure ?? ""} — Believes: ${parsed.audience.already_believes ?? ""} — Doesn't yet: ${parsed.audience.doesnt_believe ?? ""}`
        : (parsed.audience ?? ""),
      key_message: parsed.core_insight ?? "",
      core_insight: parsed.core_insight ?? "",
      alt_titles: parsed.alt_titles ?? [],
      outline: parsed.outline ?? [],
      takeaways: parsed.takeaways ?? [],
      sources: parsed.sources ?? [],
      proof_points: parsed.proof_points ?? [],
      spine_beats: parsed.spine_beats ?? {},
      cta: parsed.cta ?? "",
      distribution: parsed.distribution ?? {},
      success_metric: parsed.success_metric ?? "",
      length: parsed.length ?? "",
      tone: parsed.tone ?? "",
      voice,
      status: "draft",
      playbook_snapshot: snapshot,
    };

    let saved;
    if (existingBrief?.id) {
      const upd = await admin.from("briefs").update(briefPayload).eq("id", existingBrief.id).select().single();
      if (upd.error) {
        return new Response(JSON.stringify({ error: upd.error.message }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      saved = upd.data;
    } else {
      briefPayload.created_by = userData.user.id;
      const ins = await admin.from("briefs").insert(briefPayload).select().single();
      if (ins.error) {
        return new Response(JSON.stringify({ error: ins.error.message }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      saved = ins.data;
    }

    // Move item from "idea" → "brief" (but don't downgrade further states).
    if (item.status === "idea") {
      await admin.from("content_items").update({ status: "brief" }).eq("id", item.id);
    }

    return new Response(JSON.stringify({ brief: saved, parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Fallback snapshot when a brief doesn't yet have one — mirrors src/data/editorialPlaybook.ts
const DEFAULT_SNAPSHOT = {
  spine: [
    { id: "shift", label: "The Shift", purpose: "Name the change in operational performance. From reactive to predictive." },
    { id: "platform", label: "The Platform", purpose: "Comply365, SafetyManager365, ContentManager365 as one operational platform." },
    { id: "loop", label: "The Loop (DTOP)", purpose: "Detect → Trigger → Orchestrate → Prove. The operating model." },
    { id: "proof", label: "The Proof", purpose: "~90% domain accuracy at L4–L5 vs ~35% generic AI. Customer outcomes." },
    { id: "differentiators", label: "The Differentiators", purpose: "Domain intelligence · Operational data · Closed-loop control." },
  ],
  differentiators: [
    "Domain intelligence built for regulated operations (~90% accuracy at L4–5 vs ~35% generic).",
    "Operational data fabric — every action, signal, regulation in one place.",
    "Closed-loop control — DTOP turns signals into proven outcomes, not dashboards.",
  ],
  proof_points: [
    "~90% domain accuracy at L4–L5 vs ~35% generic AI.",
    "DTOP: Detect → Trigger → Orchestrate → Prove operating model.",
    "$25–35B industry exposure to operational underperformance (Eurocontrol, IATA, SITA).",
    "Single platform: Comply365 + SafetyManager365 + ContentManager365.",
    "Defensible customer footprint across aviation, defense, rail.",
  ],
  personas: {
    exec: { label: "Executive (CIO / COO / CSO)", arc: "Cost of inaction → Operating model shift → Proof → Decision." },
    ops: { label: "Operational leader", arc: "The inbox today → The loop tomorrow → Evidence → Pilot." },
    tech: { label: "Technical buyer", arc: "Data fabric → Intelligence layer → Control loop → Security/scale." },
  },
  terminology: {
    forbidden: ["FOQA", "FDM", "ASAP", "CoAnalyst (in customer-facing copy)", "CoAuthor / CoTrainer (in customer-facing copy)", "Spaces in product names (Comply 365, Safety Manager 365)"],
  },
  quarter_themes: {
    Q1: {
      label: "Q1", theme: "Build the Foundation",
      quarterMessage: "You cannot raise performance on fragmented foundations.",
      narrative: "Performance breaks down when safety, compliance, training, content, and IT improve separately. Before organisations can improve how they act, they need a connected foundation built on shared visibility, governance, and accountability.",
      messageTerritory: ["The market is still managing performance in silos","Fragmented systems reduce control and slow progress","Connected foundations are the first step to better performance"],
      dtopRole: "Introduce Detect as the need to see what matters clearly. Set up Trigger, Orchestrate, Prove by showing why disconnected systems weaken the whole performance model.",
      forbiddenHere: ["Leading with DTOP, the Intelligence Layer, or 90/35 — those are Q2.","Naming our product first. Always name the customer pain first."],
    },
    Q2: {
      label: "Q2", theme: "From Signals to Action",
      quarterMessage: "Performance improves when signals lead to action, not delay.",
      narrative: "Operational performance is shaped by what happens after something important is identified. The real challenge is not visibility — it is how quickly and consistently teams trigger response, coordinate action, and close the gap between issue and follow-through.",
      messageTerritory: ["Visibility alone does not improve performance","Signals create value when ownership is clear","Coordinated response reduces lag and strengthens control"],
      dtopRole: "DTOP enters fully: Detect what matters → Trigger the right response → Orchestrate cross-functional action → begin to Prove through follow-through.",
      forbiddenHere: ["Treating DTOP as an acronym education exercise. Earn it through the signal-to-action pain."],
    },
    Q3: {
      label: "Q3", theme: "Make Readiness Continuous",
      quarterMessage: "Readiness is not an event. It is a condition of performance.",
      narrative: "Readiness should not be a periodic push or a completion exercise. It is an ongoing performance capability built when training, compliance, and operational change work together inside a connected model.",
      messageTerritory: ["Readiness goes beyond training completion","Continuous readiness improves predictability and control","Role-based alignment strengthens performance across teams"],
      dtopRole: "Emphasise the back half of DTOP: stronger Orchestrate across functions, clearer Prove through role-based readiness and consistency over time.",
      forbiddenHere: ["Framing readiness as a training-team problem. It is cross-functional."],
    },
    Q4: {
      label: "Q4", theme: "Prove Performance at Scale",
      quarterMessage: "Performance only scales when progress can be proved.",
      narrative: "Performance improvement only scales when organisations can prove progress, readiness, and control across teams and regions. Leaders need more than activity reporting — they need evidence that supports confident decisions.",
      messageTerritory: ["Proof matters more than reporting volume","Standardisation strengthens confidence at scale","Visibility, readiness, and evidence support investment and expansion"],
      dtopRole: "Completes the DTOP story by focusing on Prove as measurable, repeatable, and scalable. The operating model becomes evidence, confidence, and wider rollout potential.",
      forbiddenHere: ["Activity-volume framing (dashboards, report counts). Lead with evidence, ROI, expansion."],
    },
  },
};