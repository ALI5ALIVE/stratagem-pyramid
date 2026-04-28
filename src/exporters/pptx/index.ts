import { buildTechnicalDeck, type BuildOpts } from "./buildTechnicalDeck";
import { buildExecutiveDeck } from "./buildExecutiveDeck";
import { buildExecutivePitch3Deck } from "./buildExecutivePitch3Deck";

export type DeckId = "tech-deep-dive" | "executive-pitch" | "executive-pitch-3";

export interface DeckBuilder {
  filename: string;
  label: string;
  build: (opts: BuildOpts) => Promise<Blob>;
}

export const DECK_BUILDERS: Record<DeckId, DeckBuilder> = {
  "tech-deep-dive": {
    filename: "Comply365-Technical-Deep-Dive.pptx",
    label: "Technical Deep Dive",
    build: buildTechnicalDeck,
  },
  "executive-pitch": {
    filename: "Comply365-Executive-Pitch.pptx",
    label: "Executive Pitch",
    build: buildExecutiveDeck,
  },
  "executive-pitch-3": {
    filename: "Comply365-Executive-Pitch-Medium.pptx",
    label: "Executive Pitch · Medium",
    build: buildExecutivePitch3Deck,
  },
};