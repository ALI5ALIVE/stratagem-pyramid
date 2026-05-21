import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { text, voiceId, segments } = body as {
      text?: string;
      voiceId?: string;
      segments?: Array<{ voiceId: string; text: string }>;
    };
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }

    const preprocess = (t: string) =>
      t.replace(/\bDTOP\b/g, "D-T-O-P").replace(/\bFOQA\b/g, "Foe-kuh");

    const synthesize = async (segText: string, segVoice: string): Promise<ArrayBuffer> => {
      const processed = preprocess(segText);
      const resp = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${segVoice}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: processed,
            model_id: "eleven_turbo_v2_5",
            voice_settings: {
              stability: 0.45,
              similarity_boost: 0.75,
              style: 0.55,
              use_speaker_boost: true,
              speed: 1.0,
            },
          }),
        }
      );
      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("ElevenLabs API error:", errorText);
        throw new Error(`ElevenLabs API error: ${resp.status} - ${errorText}`);
      }
      return resp.arrayBuffer();
    };

    let audioBuffer: ArrayBuffer;

    if (Array.isArray(segments) && segments.length > 0) {
      console.log(`Generating multi-voice TTS: ${segments.length} segments`);
      const buffers: ArrayBuffer[] = [];
      for (const seg of segments) {
        if (!seg?.text || !seg?.voiceId) {
          throw new Error("Each segment requires text and voiceId");
        }
        buffers.push(await synthesize(seg.text, seg.voiceId));
      }
      const totalLen = buffers.reduce((n, b) => n + b.byteLength, 0);
      const merged = new Uint8Array(totalLen);
      let offset = 0;
      for (const b of buffers) {
        merged.set(new Uint8Array(b), offset);
        offset += b.byteLength;
      }
      audioBuffer = merged.buffer;
    } else {
      if (!text || !voiceId) {
        throw new Error("Missing required parameters: text and voiceId (or segments)");
      }
      console.log(`Generating TTS for text length: ${text.length}, voice: ${voiceId}`);
      audioBuffer = await synthesize(text, voiceId);
    }

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("TTS Error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
