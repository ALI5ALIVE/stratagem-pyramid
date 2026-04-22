import { createContext, useContext, ReactNode } from "react";

const DeckContext = createContext<string | undefined>(undefined);

export const DeckProvider = ({ deckId, children }: { deckId: string; children: ReactNode }) => (
  <DeckContext.Provider value={deckId}>{children}</DeckContext.Provider>
);

export const useDeckId = () => useContext(DeckContext);