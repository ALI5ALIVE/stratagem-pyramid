import React from "react";
import { Briefcase, Shield, Plane, GraduationCap, Monitor } from "lucide-react";
import type { PersonaProfile } from "@/data/personaProfiles";

interface Props {
  persona: PersonaProfile;
}

const iconMap: Record<string, React.ElementType> = {
  Briefcase, Shield, Plane, GraduationCap, Monitor,
};

// Map Tailwind tokens → deterministic hex/rgba for html2canvas
const personaColorMap: Record<string, { accent: string; bg: string; border: string }> = {
  "ceo-coo":          { accent: "#a78bfa", bg: "rgba(139,92,246,0.10)",  border: "rgba(139,92,246,0.45)" },
  "vp-safety":        { accent: "#f87171", bg: "rgba(239,68,68,0.10)",   border: "rgba(239,68,68,0.45)" },
  "vp-ops":           { accent: "#60a5fa", bg: "rgba(59,130,246,0.10)",  border: "rgba(59,130,246,0.45)" },
  "training-director":{ accent: "#34d399", bg: "rgba(16,185,129,0.10)",  border: "rgba(16,185,129,0.45)" },
  "cio-it":           { accent: "#fbbf24", bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.45)" },
};

const fallback = { accent: "#60a5fa", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.45)" };

const PersonaPrintablePage: React.FC<Props> = ({ persona }) => {
  const Icon = iconMap[persona.iconName] || Briefcase;
  const c = personaColorMap[persona.id] || fallback;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const baseFont = "'Inter', 'Helvetica Neue', Arial, sans-serif";
  const displayFont = "'Space Grotesk', 'Inter', 'Helvetica Neue', Arial, sans-serif";

  const sectionStyle: React.CSSProperties = {
    background: "#ffffff",
    border: `1px solid ${c.border}`,
    borderTop: `3px solid ${c.accent}`,
    borderRadius: 6,
    padding: "10px 12px",
  };
  const sectionTitle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: c.accent,
    marginBottom: 6,
    fontFamily: displayFont,
  };
  const bullet = (text: string, key: number) => (
    <li key={key} style={{ fontSize: 10, lineHeight: 1.4, color: "#1f2937", marginBottom: 4, paddingLeft: 10, position: "relative" }}>
      <span style={{ position: "absolute", left: 0, top: 6, width: 4, height: 4, borderRadius: 4, background: c.accent }} />
      {text}
    </li>
  );

  return (
    <div
      className="persona-printable-page"
      style={{
        width: 1056,
        height: 816,
        background: "#f8fafc",
        borderTop: `6px solid ${c.accent}`,
        padding: "20px 28px",
        fontFamily: baseFont,
        color: "#0f172a",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6, background: "#0066FF",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontFamily: displayFont, fontSize: 14,
          }}>C3</div>
          <div style={{ fontFamily: displayFont, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
            Comply365
          </div>
        </div>
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#64748b", fontWeight: 700 }}>
          Persona One-Pager
        </div>
        <div style={{ fontSize: 9, color: "#64748b" }}>
          {today} · Confidential
        </div>
      </div>

      {/* Persona header */}
      <div style={{
        background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "12px 14px", marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, background: "#ffffff",
            border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon size={22} color={c.accent} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: c.accent, margin: 0, fontFamily: displayFont, lineHeight: 1.1 }}>
                {persona.title}
              </h1>
              <span style={{
                fontSize: 9, fontWeight: 700, color: c.accent, background: "#fff",
                border: `1px solid ${c.border}`, borderRadius: 4, padding: "3px 8px", whiteSpace: "nowrap",
              }}>{persona.seniority}</span>
            </div>
            <div style={{ fontSize: 9, color: "#475569", marginTop: 3, lineHeight: 1.4 }}>
              {persona.titleVariants.slice(0, 5).join(" · ")}
            </div>
            <p style={{ fontSize: 10, lineHeight: 1.45, color: "#334155", margin: "6px 0 0", fontFamily: baseFont }}>
              {persona.profileSummary}
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
          {[
            { label: "Reports To", value: persona.reportsTo },
            { label: "Org Context", value: persona.orgContext },
            { label: "Budget Influence", value: persona.budgetInfluence },
          ].map((m) => (
            <div key={m.label} style={{ background: "#fff", border: `1px solid ${c.border}`, borderRadius: 4, padding: "6px 8px" }}>
              <div style={{ fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: "#64748b", fontWeight: 700, marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 9, color: "#1f2937", lineHeight: 1.35 }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column: Priorities + Pains */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        <div style={sectionStyle}>
          <div style={sectionTitle}>Strategic Priorities</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.strategicPriorities.slice(0, 4).map((t, i) => bullet(t, i))}
          </ul>
        </div>
        <div style={sectionStyle}>
          <div style={sectionTitle}>Daily Pain Points</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.dailyPains.slice(0, 4).map((t, i) => bullet(t, i))}
          </ul>
        </div>
      </div>

      {/* Triggers + Criteria */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        <div style={sectionStyle}>
          <div style={sectionTitle}>Buying Triggers</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.buyingTriggers.slice(0, 3).map((t, i) => bullet(t, i))}
          </ul>
        </div>
        <div style={sectionStyle}>
          <div style={sectionTitle}>Decision Criteria</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.decisionCriteria.slice(0, 3).map((t, i) => bullet(t, i))}
          </ul>
        </div>
      </div>

      {/* Value Proposition */}
      <div style={{ ...sectionStyle, marginBottom: 8 }}>
        <div style={sectionTitle}>Value Proposition</div>
        <p style={{
          margin: 0, fontSize: 10, lineHeight: 1.45, color: "#1f2937", fontStyle: "italic",
          borderLeft: `3px solid ${c.accent}`, paddingLeft: 10,
        }}>
          {persona.valueProposition}
        </p>
      </div>

      {/* Key Messages + Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        <div style={sectionStyle}>
          <div style={sectionTitle}>Key Messages</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.keyMessages.slice(0, 3).map((t, i) => bullet(t, i))}
          </ul>
        </div>
        <div style={sectionStyle}>
          <div style={sectionTitle}>Metrics That Matter</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.metricsThatMatter.slice(0, 4).map((t, i) => bullet(t, i))}
          </ul>
        </div>
      </div>

      {/* Discovery + Objection */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flex: 1 }}>
        <div style={sectionStyle}>
          <div style={sectionTitle}>Top Discovery Question</div>
          <p style={{ margin: 0, fontSize: 10, lineHeight: 1.45, color: "#1f2937", fontStyle: "italic" }}>
            “{persona.discoveryQuestions[0]}”
          </p>
        </div>
        <div style={sectionStyle}>
          <div style={sectionTitle}>Top Objection &amp; Response</div>
          {persona.objections[0] && (
            <>
              <p style={{ margin: "0 0 4px", fontSize: 10, color: "#475569", fontStyle: "italic" }}>
                “{persona.objections[0].objection}”
              </p>
              <div style={{
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.35)",
                borderRadius: 4, padding: "6px 8px",
              }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: "#059669", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>
                  Response
                </div>
                <p style={{ margin: 0, fontSize: 10, lineHeight: 1.4, color: "#1f2937" }}>
                  {persona.objections[0].response}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 10, paddingTop: 8, borderTop: "1px solid #e2e8f0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 8, color: "#64748b",
      }}>
        <div>© {new Date().getFullYear()} Comply365 · Sales Enablement · /personas</div>
        <div>Persona One-Pager · v1.0</div>
      </div>
    </div>
  );
};

export default PersonaPrintablePage;