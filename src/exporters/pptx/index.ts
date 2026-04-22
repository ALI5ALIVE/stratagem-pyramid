import { buildTechnicalDeck, type BuildOpts } from "./buildTechnicalDeck";

export type DeckId = "tech-deep-dive";

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
};