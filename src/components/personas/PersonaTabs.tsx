import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { PERSONAS, getPersona, type PersonaId } from "./personaConfig";

interface PersonaTabsProps {
  defaultId?: PersonaId;
  syncToUrl?: boolean;
  onChange?: (id: PersonaId) => void;
  className?: string;
}

export const usePersonaState = (defaultId: PersonaId = "coo", syncToUrl = true) => {
  const [params, setParams] = useSearchParams();
  const initial = (syncToUrl ? (params.get("role") as PersonaId | null) : null) ?? defaultId;
  const [active, setActive] = useState<PersonaId>(initial);

  // Keep state in sync if URL changes externally
  useEffect(() => {
    if (!syncToUrl) return;
    const r = params.get("role") as PersonaId | null;
    if (r && r !== active && PERSONAS.some((p) => p.id === r)) setActive(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const set = useCallback(
    (id: PersonaId) => {
      setActive(id);
      if (syncToUrl) {
        const next = new URLSearchParams(params);
        next.set("role", id);
        setParams(next, { replace: true });
      }
    },
    [params, setParams, syncToUrl],
  );

  return { active, set, persona: getPersona(active) };
};

const PersonaTabs = ({ defaultId = "coo", syncToUrl = true, onChange, className = "" }: PersonaTabsProps) => {
  const { active, set } = usePersonaState(defaultId, syncToUrl);

  const handle = (id: PersonaId) => {
    set(id);
    onChange?.(id);
  };

  return (
    <div
      role="tablist"
      aria-label="Choose your role"
      className={`inline-flex flex-wrap gap-1 rounded-full border border-border bg-card/60 p-1 ${className}`}
    >
      {PERSONAS.map((p) => {
        const isActive = p.id === active;
        const Icon = p.icon;
        return (
          <button
            key={p.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handle(p.id)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              isActive
                ? `bg-background ${p.color} border ${p.border}`
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{p.shortRole}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PersonaTabs;