import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/audio/dtop90");
fs.mkdirSync(OUT, { recursive: true });

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) throw new Error("ELEVENLABS_API_KEY missing");

const GEORGE = "JBFqnCBsd6RMkjVDRZzb";

const SCENES = [
  { id: "s1", text: "In regulated operations, a single event can trigger chaos. A scramble of emails, phone calls, and manual checks where critical steps get missed. What if you could replace that risk with a controlled, automated, and provable response?" },
  { id: "s2", text: "It begins when the Comply three sixty five platform detects a signal. We monitor thousands of data points — from maintenance flags and crew scheduling to incoming regulatory changes." },
  { id: "s3", text: "That detection automatically initiates a trigger. This is not another dashboard alert. It is the first step in a pre-defined, fully compliant workflow." },
  { id: "s4", text: "Next, the system begins to orchestrate. Comply three sixty five drives the entire response, assigning specific tasks to the right people, with the precise information drawn directly from your manuals. It connects your content, safety, and compliance processes in a single, automated loop." },
  { id: "s5", text: "Finally, you prove the outcome. Every action, every decision, and every communication is documented in real time, creating a complete, auditable record. The loop is closed and the resolution is confirmed." },
  { id: "s6", text: "Detect. Trigger. Orchestrate. Prove. This is D-TOP, the operating model for complex industries. It is powered by a domain-specific intelligence layer that delivers over ninety percent accuracy, turning disconnected data into controlled outcomes." },
  { id: "s7", text: "Stop chasing alerts. Start orchestrating your operations. Schedule a personalized demo to see a D-TOP loop for your most critical scenario today." },
];

async function tts(text, prev, next) {
  const r = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${GEORGE}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        previous_text: prev,
        next_text: next,
        voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true, speed: 1.0 },
      }),
    }
  );
  if (!r.ok) throw new Error(`TTS ${r.status}: ${await r.text()}`);
  return Buffer.from(await r.arrayBuffer());
}

for (let i = 0; i < SCENES.length; i++) {
  const s = SCENES[i];
  console.log(`TTS ${s.id}...`);
  const buf = await tts(s.text, SCENES[i - 1]?.text, SCENES[i + 1]?.text);
  fs.writeFileSync(path.join(OUT, `${s.id}.mp3`), buf);
  console.log(`  -> ${buf.length} bytes`);
}
console.log("Done.");