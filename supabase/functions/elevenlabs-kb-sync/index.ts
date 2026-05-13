// Sync a set of markdown documents into an ElevenLabs Convai agent's
// Knowledge Base. Documents whose name starts with the same prefix as
// the incoming docs are deleted from the KB first, so re-syncing does
// not bloat the agent.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface IncomingDoc {
  name: string;
  text: string;
}

const EL_BASE = "https://api.elevenlabs.io/v1/convai";

async function el(path: string, init: RequestInit, apiKey: string) {
  const res = await fetch(`${EL_BASE}${path}`, {
    ...init,
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* keep raw */ }
  if (!res.ok) {
    throw new Error(`ElevenLabs ${init.method ?? "GET"} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  return json;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not configured");

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

    // 2. Create fresh text documents.
    const created: Array<{ id: string; name: string }> = [];
    for (const d of docs) {
      const res = await el(`/knowledge-base/text`, {
        method: "POST",
        body: JSON.stringify({ name: d.name, text: d.text }),
      }, apiKey);
      const id = res?.id ?? res?.document_id;
      const name = res?.name ?? d.name;
      if (!id) throw new Error(`KB create returned no id for ${d.name}`);
      created.push({ id, name });
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