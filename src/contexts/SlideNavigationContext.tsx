import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface SlideInfo {
  id: string;
  label: string;
}

interface SlideNavigationState {
  slides: SlideInfo[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

interface SlideNavigationContextType extends SlideNavigationState {
  register: (slides: SlideInfo[], activeIndex: number, onNavigate: (index: number) => void) => void;
  updateActiveIndex: (index: number) => void;
  unregister: () => void;
}

const SlideNavigationContext = createContext<SlideNavigationContextType | null>(null);

export function SlideNavigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SlideNavigationState>({
    slides: [],
    activeIndex: 0,
    onNavigate: () => {},
  });

  const register = useCallback((slides: SlideInfo[], activeIndex: number, onNavigate: (index: number) => void) => {
    setState({ slides, activeIndex, onNavigate });
  }, []);

  const updateActiveIndex = useCallback((index: number) => {
    setState((prev) => ({ ...prev, activeIndex: index }));
  }, []);

  const unregister = useCallback(() => {
    setState({ slides: [], activeIndex: 0, onNavigate: () => {} });
  }, []);

  return (
    <SlideNavigationContext.Provider value={{ ...state, register, updateActiveIndex, unregister }}>
      {children}
    </SlideNavigationContext.Provider>
  );
}

export function useSlideNavigation() {
  const ctx = useContext(SlideNavigationContext);
  if (!ctx) throw new Error("useSlideNavigation must be used within SlideNavigationProvider");
  return ctx;
}
