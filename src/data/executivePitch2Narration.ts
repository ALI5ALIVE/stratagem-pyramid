export interface ExecNarration2Slide {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const executivePitch2Narrations: ExecNarration2Slide[] = [
  { slideId: "exec2-slide-0", title: "Title", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-1", title: "Strategic Shift", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-2", title: "After", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-3", title: "DTOP", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-4", title: "Platform", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-5", title: "Use Cases", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-6", title: "Transformation", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-7", title: "Ladder", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-8", title: "AI Vision", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-9", title: "Maturity", script: "", voiceId: DEFAULT_VOICE_ID },
  { slideId: "exec2-slide-10", title: "Customer Outcomes", script: "", voiceId: DEFAULT_VOICE_ID },
];

export const getExecPitch2Narration = (slideId: string): ExecNarration2Slide | undefined =>
  executivePitch2Narrations.find((s) => s.slideId === slideId);
