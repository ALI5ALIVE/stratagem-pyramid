// Sync a set of markdown documents into an ElevenLabs Convai agent's
// Knowledge Base. Documents whose name starts with the same prefix as
// the incoming docs are deleted from the KB first, so re-syncing does
// not bloat the agent.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

interface IncomingDoc {
  name: string;
  text: string;
}

const EL_BASE = "https://api.elevenlabs.io/v1/convai";

async function el(path: string, init: RequestInit, apiKey: string) {
  const headers: Record<string, string> = {
    "xi-api-key": apiKey,
    ...(init.headers as Record<string, string> ?? {}),
  };
  // Only set JSON content-type when caller didn't supply a body that sets it (e.g. FormData)
  if (init.body && typeof init.body === "string" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${EL_BASE}${path}`, { ...init, headers });
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* keep raw */ }
  if (!res.ok) {
    throw new Error(`ElevenLabs ${init.method ?? "GET"} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  return json;
}

// Upload a text document to the KB via multipart/form-data — more
// reliable than the JSON /knowledge-base/text endpoint for long content.
async function uploadTextDoc(name: string, text: string, apiKey: string) {
  const form = new FormData();
  const blob = new Blob([text], { type: "text/markdown" });
  form.append("file", blob, `${name.replace(/[^a-z0-9._-]+/gi, "_")}.md`);
  form.append("name", name);
  return await el(`/knowledge-base/file`, { method: "POST", body: form }, apiKey);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not configured");

    // --- AuthN + AuthZ: only signed-in owners can re-sync the KB --------
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ ok: false, error: "Sign in required." }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: claims, error: authErr } = await userClient.auth.getClaims(
      authHeader.replace("Bearer ", ""),
    );
    if (authErr || !claims?.claims?.sub) {
      return new Response(JSON.stringify({ ok: false, error: "Auth check failed." }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: roleRow } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", claims.claims.sub as string)
      .in("role", ["owner", "admin"])
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ ok: false, error: "Owner role required." }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const agentId = typeof body?.agentId === "string" ? body.agentId : null;
    const namePrefix = typeof body?.namePrefix === "string" ? body.namePrefix : "lovable:";
    const docs: IncomingDoc[] = Array.isArray(body?.documents) ? body.documents : [];
    if (!agentId) throw new Error("agentId is required");
    if (docs.length === 0) throw new Error("documents[] is required");
    for (const d of docs) {
      if (!d?.name || !d?.text) throw new Error("each document needs {name, text}");
    }

    // 1. List existing KB docs and delete ones with our prefix.
    const list = await el(`/knowledge-base?page_size=100`, { method: "GET" }, apiKey);
    const existing: Array<{ id: string; name: string }> = list?.documents ?? list?.knowledge_base ?? [];
    const stale = existing.filter((d) => typeof d.name === "string" && d.name.startsWith(namePrefix));
    const deleted: string[] = [];
    for (const d of stale) {
      try {
        await el(`/knowledge-base/${d.id}`, { method: "DELETE" }, apiKey);
        deleted.push(d.name);
      } catch (e) {
        console.warn("Delete failed for", d.id, e);
      }
    }

    // 2. Create fresh documents. Try the JSON /text endpoint first; if
    // ElevenLabs 500s on it (which it intermittently does for longer
    // markdown), fall back to a multipart file upload.
    const created: Array<{ id: string; name: string }> = [];
    const failures: Array<{ name: string; error: string }> = [];
    for (const d of docs) {
      try {
        // ElevenLabs `/knowledge-base/text` is currently unstable (500s),
        // so always upload as a markdown file.
        const res = await uploadTextDoc(d.name, d.text, apiKey);
        const id = res?.id ?? res?.document_id;
        const name = res?.name ?? d.name;
        if (!id) throw new Error(`KB create returned no id`);
        created.push({ id, name });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`KB upload failed for ${d.name}:`, msg);
        failures.push({ name: d.name, error: msg });
      }
    }

    if (created.length === 0) {
      throw new Error(
        `All ${docs.length} KB uploads failed. First error: ${failures[0]?.error ?? "unknown"}`,
      );
    }

    // 3. Patch the agent so its prompt.knowledge_base includes our docs.
    const agent = await el(`/agents/${agentId}`, { method: "GET" }, apiKey);
    const prevKb: any[] = agent?.conversation_config?.agent?.prompt?.knowledge_base ?? [];
    const keptKb = prevKb.filter(
      (k) => typeof k?.name !== "string" || !k.name.startsWith(namePrefix),
    );
    const newKb = [
      ...keptKb,
      ...created.map((c) => ({ type: "file", name: c.name, id: c.id, usage_mode: "auto" })),
    ];

    await el(`/agents/${agentId}`, {
      method: "PATCH",
      body: JSON.stringify({
        conversation_config: {
          agent: { prompt: { knowledge_base: newKb } },
        },
      }),
    }, apiKey);

    return new Response(
      JSON.stringify({
        ok: true,
        agentId,
        deleted,
        created: created.map((c) => c.name),
        failed: failures,
        totalKb: newKb.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("kb-sync error:", msg);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});