import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

interface Body {
  quarter?: string;
  pillarId?: string;
  onlyEmpty?: boolean;
  voice?: "thought_leader" | "corporate" | "hybrid";
  concurrency?: number;
  dryRun?: boolean;
}

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json(401, { error: "Unauthorized" });

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await userClient.auth.getUser();
    if (!userData?.user) return json(401, { error: "Unauthorized" });
    const userId = userData.user.id;

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleRows } = await admin
      .from("user_roles").select("role").eq("user_id", userId);
    const roles = (roleRows ?? []).map((r: any) => r.role);
    if (!roles.includes("owner") && !roles.includes("editor")) {
      return json(403, { error: "Forbidden: editor or owner role required" });
    }

    const body = (await req.json().catch(() => ({}))) as Body;
    const onlyEmpty = body.onlyEmpty !== false;
    const voice = body.voice ?? "corporate";
    const concurrency = Math.min(Math.max(body.concurrency ?? 2, 1), 4);
    const dryRun = !!body.dryRun;

    // Load target content items.
    let q = admin.from("content_items").select("id,title,pillar_id,quarter,persona,asset_type");
    if (body.quarter) q = q.eq("quarter", body.quarter);
    if (body.pillarId) q = q.eq("pillar_id", body.pillarId);
    const { data: items, error: itemsErr } = await q;
    if (itemsErr) return json(500, { error: itemsErr.message });

    // Filter against existing briefs if onlyEmpty.
    const { data: existingBriefs } = await admin
      .from("briefs").select("content_item_id,angle");
    const angleMap = new Map<string, string>(
      (existingBriefs ?? []).map((b: any) => [b.content_item_id, b.angle ?? ""]),
    );
    const targets = (items ?? []).filter((it: any) => {
      if (!onlyEmpty) return true;
      const a = angleMap.get(it.id) ?? "";
      return !a || a.trim() === "";
    });

    if (dryRun) {
      return json(200, {
        dryRun: true,
        total: targets.length,
        targets: targets.map((t: any) => ({ id: t.id, title: t.title, quarter: t.quarter, persona: t.persona })),
      });
    }

    // Create job row.
    const { data: jobRow, error: jobErr } = await admin
      .from("brief_jobs").insert({
        created_by: userId,
        status: "running",
        total: targets.length,
        filters: { quarter: body.quarter ?? null, pillarId: body.pillarId ?? null, onlyEmpty },
        voice,
        started_at: new Date().toISOString(),
      }).select().single();
    if (jobErr) return json(500, { error: jobErr.message });

    // Kick off background work (don't await).
    const work = async () => {
      const projectRef = SUPABASE_URL.replace("https://", "").split(".")[0];
      const draftUrl = `${SUPABASE_URL}/functions/v1/draft-brief`;
      let succeeded = 0;
      let failed = 0;
      const errors: any[] = [];

      for (let i = 0; i < targets.length; i += concurrency) {
        const batch = targets.slice(i, i + concurrency);
        const results = await Promise.allSettled(
          batch.map(async (item: any) => {
            const r = await fetch(draftUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
              },
              body: JSON.stringify({ contentItemId: item.id, voice }),
            });
            if (!r.ok) {
              const t = await r.text();
              throw new Error(`${r.status}: ${t.slice(0, 300)}`);
            }
            await r.json();
            return item.id;
          }),
        );
        for (let k = 0; k < results.length; k++) {
          const res = results[k];
          const item = batch[k];
          if (res.status === "fulfilled") succeeded++;
          else {
            failed++;
            errors.push({ itemId: item.id, title: item.title, message: String((res as any).reason?.message ?? res.reason) });
          }
        }
        // progress update
        await admin.from("brief_jobs").update({
          succeeded, failed, errors,
        }).eq("id", jobRow.id);

        // throttle
        if (i + concurrency < targets.length) {
          await new Promise((res) => setTimeout(res, 1200));
        }
      }

      await admin.from("brief_jobs").update({
        status: "done",
        succeeded, failed, errors,
        finished_at: new Date().toISOString(),
      }).eq("id", jobRow.id);
    };

    // @ts-ignore EdgeRuntime is available in Supabase functions runtime
    if (typeof EdgeRuntime !== "undefined" && (EdgeRuntime as any).waitUntil) {
      // @ts-ignore
      EdgeRuntime.waitUntil(work().catch(async (e) => {
        await admin.from("brief_jobs").update({
          status: "error",
          errors: [{ message: String(e?.message ?? e) }],
          finished_at: new Date().toISOString(),
        }).eq("id", jobRow.id);
      }));
    } else {
      // fallback: fire-and-forget
      work().catch(() => {});
    }

    return json(202, { jobId: jobRow.id, total: targets.length });
  } catch (err: any) {
    return json(500, { error: err?.message ?? String(err) });
  }
});