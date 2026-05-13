import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // --- AuthN: signed-in users only -----------------------------------------
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return jsonResponse({ code: "UNAUTH", error: "Sign in to start a practice session." }, 401);
  }
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: claims, error: authErr } = await supabase.auth.getClaims(
      authHeader.replace("Bearer ", ""),
    );
    if (authErr || !claims?.claims) {
      return jsonResponse({ code: "UNAUTH", error: "Your session expired — please sign in again." }, 401);
    }
  } catch (_e) {
    return jsonResponse({ code: "UNAUTH", error: "Auth check failed." }, 401);
  }

  try {
    const { agentId } = await req.json();
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) throw new Error("ELEVENLABS_API_KEY is not configured");
    if (!agentId || typeof agentId !== "string") {
      return jsonResponse({ code: "BAD_REQUEST", error: "Missing agentId" }, 400);
    }

    const urlRes = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`,
      { headers: { "xi-api-key": ELEVENLABS_API_KEY } },
    );

    if (!urlRes.ok) {
      const errText = await urlRes.text();
      console.error(`ElevenLabs signed-url ${urlRes.status}:`, errText);
      // Classify common failures into actionable codes
      if (urlRes.status === 429 || /concurren|rate/i.test(errText)) {
        return jsonResponse(
          { code: "BUSY", error: "All practice lines are in use right now — try again in a minute." },
          503,
        );
      }
      if (urlRes.status === 402 || /quota|credit|insufficient/i.test(errText)) {
        return jsonResponse(
          { code: "QUOTA", error: "Practice quota reached — please contact your admin." },
          402,
        );
      }
      return jsonResponse(
        { code: "UPSTREAM", error: `Voice service error (${urlRes.status}). Please try again.` },
        502,
      );
    }
    const { signed_url } = await urlRes.json();
    return jsonResponse({ signedUrl: signed_url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("roleplay-token error:", msg);
    return jsonResponse({ code: "INTERNAL", error: msg }, 500);
  }
});
