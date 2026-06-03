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

  const system = `You are the senior editor at Comply365's content marketing team. You write briefs to the standard of Ann Handley, Andy Crestodina, April Dunford, and Donald Miller.

Your job is to produce a UNIQUE, asset-specific editorial brief — NOT a fill-in-the-spine form. The 5-beat messaging spine is a guardrail enforced later by the writer. Your brief's job is to define the angle, structure, and substance of THIS specific asset so it stands apart from every other piece in the calendar.

Rules:
- Product names have NO spaces: Comply365, SafetyManager365, ContentManager365.
- DTOP = Detect → Trigger → Orchestrate → Prove.
- Intelligence Layer headline: ~90% domain accuracy at L4–L5 vs ~35% generic AI.
- Forbidden terms: ${forbidden}.
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

  const user = `# Content item (the strategy says we need this piece)
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
};