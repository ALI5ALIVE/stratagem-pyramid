import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface GenerateRequest {
  briefId: string;
  refineNote?: string;
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

function buildPrompt(brief: any, item: any, snapshot: any, refineNote?: string) {
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

  const system = `You are the senior editor for Comply365's content team.
Every asset you produce MUST follow the 5-beat spine: Shift → Platform → Loop (DTOP) → Proof → Differentiators.
DTOP = Detect → Trigger → Orchestrate → Prove.
Intelligence Layer headline: ~90% domain accuracy at L4–L5 vs ~35% generic AI.
Product names have NO spaces: Comply365, SafetyManager365, ContentManager365.
Forbidden terms (do not use): ${forbidden}.
Tone: ${persona}
Narrative arc: ${arc}

Output spec:
${spec}`;

  const user = `# Brief
Title: ${item.title}
Persona: ${item.persona}
Channel: ${item.channel}
Asset type: ${item.asset_type}

Objective: ${brief.objective || "(not provided)"}
Audience: ${brief.audience || "(not provided)"}
Key message: ${brief.key_message || "(not provided)"}
CTA: ${brief.cta || "(not provided)"}
Tone override: ${brief.tone || "(use persona default)"}
Length: ${brief.length || "(use asset spec default)"}

# 5-beat spine
${spineLines}

# Proof points to weave in
- ${proof || "(use playbook defaults)"}

# Canonical differentiators (the close)
- ${differentiators}

${refineNote ? `# Revision note from editor\n${refineNote}\n` : ""}
Produce the asset now. Markdown only, no preamble.`;

  return { system, user };
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
    const { system, user } = buildPrompt(brief, item, snapshot, body.refineNote);

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
        body: generated,
        body_json: {},
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