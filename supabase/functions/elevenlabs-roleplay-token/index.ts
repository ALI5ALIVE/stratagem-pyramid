import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agentId } = await req.json();
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    if (!ELEVENLABS_API_KEY) throw new Error("ELEVENLABS_API_KEY is not configured");
    if (!agentId || typeof agentId !== "string") throw new Error("Missing agentId");

    // Return only a WebSocket signed URL. The WebRTC/LiveKit token path can
    // fail in preview environments with negotiation timeouts, so the client
    // must not receive a token it could accidentally use.
    const urlRes = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`,
      { headers: { "xi-api-key": ELEVENLABS_API_KEY } },
    );

    if (!urlRes.ok) {
      const err = await urlRes.text();
      throw new Error(`ElevenLabs signed-url error ${urlRes.status}: ${err}`);
    }
    const { signed_url } = await urlRes.json();

    return new Response(JSON.stringify({ signedUrl: signed_url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("roleplay-token error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});