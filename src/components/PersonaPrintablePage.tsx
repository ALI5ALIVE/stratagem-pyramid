import React from "react";
import { Briefcase, Shield, Plane, GraduationCap, Monitor } from "lucide-react";
import type { PersonaProfile } from "@/data/personaProfiles";
import { printBrand } from "./print/printBrand";

interface Props {
  persona: PersonaProfile;
}

const iconMap: Record<string, React.ElementType> = {
  Briefcase, Shield, Plane, GraduationCap, Monitor,
};

// Persona accent colours — sober, executive palette (deeper than the in-app neon)
const personaAccent: Record<string, string> = {
  "ceo-coo":           "#5B21B6", // deep violet
  "vp-safety":         "#9F1239", // alert rose
  "vp-ops":            "#0066FF", // brand blue
  "training-director": "#047857", // deep emerald
  "cio-it":            "#B45309", // signal amber
};

const PersonaPrintablePage: React.FC<Props> = ({ persona }) => {
  const Icon = iconMap[persona.iconName] || Briefcase;
  const accent = personaAccent[persona.id] || printBrand.color.brand;
  const C = printBrand.color;
  const F = printBrand.font;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const sectionLabel = (color: string = C.muted): React.CSSProperties => ({
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color,
    fontFamily: F.display,
    marginBottom: 8,
  });

  const bullet = (text: string, key: number) => (
    <li key={key} style={{
      fontSize: 10.5, lineHeight: 1.5, color: C.slate,
      marginBottom: 5, paddingLeft: 14, position: "relative",
      fontFamily: F.body,
    }}>
      <span style={{
        position: "absolute", left: 0, top: 7,
        width: 5, height: 5, background: accent,
      }} />
      {text}
    </li>
  );

  const hr: React.CSSProperties = {
    height: 1, background: C.hairline, border: 0, margin: 0,
  };

  return (
    <div
      className="persona-printable-page"
      style={{
        width: printBrand.page.width,
        height: printBrand.page.height,
        background: C.paper,
        padding: "24px 36px 22px",
        fontFamily: F.body,
        color: C.ink,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: F.display, fontSize: 16, fontWeight: 700,
            color: C.ink, letterSpacing: "-0.01em",
          }}>
            Comply365
          </span>
          <span style={{
            display: "inline-block", width: 6, height: 6,
            background: accent, marginBottom: 2,
          }} />
        </div>
        <div style={{
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: C.muted, fontWeight: 600, fontFamily: F.display,
        }}>
          Persona Brief · Confidential · {today}
        </div>
      </div>
      <hr style={hr} />

      {/* TITLE BLOCK */}
      <div style={{ display: "flex", gap: 20, marginTop: 18, marginBottom: 14 }}>
        <div style={{ flex: 1, minWidth: 0, borderLeft: `4px solid ${accent}`, paddingLeft: 14 }}>
          <div style={{
            fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
            color: accent, fontWeight: 700, fontFamily: F.display, marginBottom: 4,
          }}>
            {persona.seniority}
          </div>
          <h1 style={{
            margin: 0, fontFamily: F.display, fontSize: 30, fontWeight: 700,
            color: C.ink, lineHeight: 1.05, letterSpacing: "-0.02em",
          }}>
            {persona.title}
          </h1>
          <div style={{
            fontSize: 10, color: C.muted, marginTop: 5, lineHeight: 1.4,
          }}>
            {persona.titleVariants.slice(0, 4).join(" · ")}
          </div>
        </div>
        <div style={{
          width: 56, height: 56, flexShrink: 0,
          border: `1px solid ${C.hairline}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: C.paperWarm,
        }}>
          <Icon size={26} color={accent} strokeWidth={1.5} />
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <p style={{
        margin: "0 0 14px", fontSize: 12.5, lineHeight: 1.5,
        color: C.slate, fontFamily: F.body, maxWidth: "92%",
      }}>
        {persona.profileSummary}
      </p>

      {/* META STRIP */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderTop: `1px solid ${C.hairline}`,
        borderBottom: `1px solid ${C.hairline}`,
        padding: "10px 0", marginBottom: 14,
      }}>
        {[
          { label: "Reports To", value: persona.reportsTo },
          { label: "Org Context", value: persona.orgContext },
          { label: "Budget Influence", value: persona.budgetInfluence },
        ].map((m, i) => (
          <div key={m.label} style={{
            paddingLeft: i === 0 ? 0 : 14,
            paddingRight: i === 2 ? 0 : 14,
            borderLeft: i === 0 ? "none" : `1px solid ${C.hairline}`,
          }}>
            <div style={sectionLabel(C.subtle)}>{m.label}</div>
            <div style={{ fontSize: 10.5, color: C.ink, lineHeight: 1.4, fontWeight: 500 }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* PRIORITIES + PAINS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 14 }}>
        <div>
          <div style={sectionLabel()}>Strategic Priorities</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.strategicPriorities.slice(0, 4).map((t, i) => bullet(t, i))}
          </ul>
        </div>
        <div>
          <div style={sectionLabel()}>Daily Pain Points</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.dailyPains.slice(0, 4).map((t, i) => bullet(t, i))}
          </ul>
        </div>
      </div>

      {/* TRIGGERS + CRITERIA */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 14 }}>
        <div>
          <div style={sectionLabel()}>Buying Triggers</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.buyingTriggers.slice(0, 3).map((t, i) => bullet(t, i))}
          </ul>
        </div>
        <div>
          <div style={sectionLabel()}>Decision Criteria</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.decisionCriteria.slice(0, 3).map((t, i) => bullet(t, i))}
          </ul>
        </div>
      </div>

      <hr style={hr} />

      {/* VALUE PROPOSITION — pull-quote */}
      <div style={{ padding: "14px 0 14px", borderLeft: `3px solid ${accent}`, paddingLeft: 16, marginTop: 12, marginBottom: 12 }}>
        <div style={{ ...sectionLabel(accent), marginBottom: 6 }}>Value Proposition</div>
        <p style={{
          margin: 0, fontFamily: F.display, fontSize: 14, lineHeight: 1.45,
          color: C.ink, fontWeight: 500, letterSpacing: "-0.005em",
        }}>
          {persona.valueProposition}
        </p>
      </div>

      <hr style={hr} />

      {/* KEY MESSAGES + METRICS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 14, marginBottom: 14 }}>
        <div>
          <div style={sectionLabel()}>Key Messages</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.keyMessages.slice(0, 3).map((t, i) => bullet(t, i))}
          </ul>
        </div>
        <div>
          <div style={sectionLabel()}>Metrics That Matter</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {persona.metricsThatMatter.slice(0, 4).map((t, i) => bullet(t, i))}
          </ul>
        </div>
      </div>

      {/* DISCOVERY + OBJECTION */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, flex: 1 }}>
        <div>
          <div style={sectionLabel()}>Top Discovery Question</div>
          <p style={{
            margin: 0, fontSize: 11, lineHeight: 1.5, color: C.ink,
            fontFamily: F.display, fontWeight: 500, fontStyle: "italic",
          }}>
            “{persona.discoveryQuestions[0]}”
          </p>
        </div>
        <div>
          <div style={sectionLabel()}>Top Objection → Response</div>
          {persona.objections[0] && (
            <>
              <p style={{
                margin: "0 0 6px", fontSize: 10, color: C.muted,
                fontStyle: "italic", lineHeight: 1.45,
              }}>
                “{persona.objections[0].objection}”
              </p>
              <div style={{
                fontSize: 10.5, color: C.success, fontFamily: F.body,
                fontWeight: 500, lineHeight: 1.5,
                paddingLeft: 10, borderLeft: `2px solid ${C.success}`,
              }}>
                {persona.objections[0].response}
              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        marginTop: 14, paddingTop: 8, borderTop: `1px solid ${C.hairline}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 8.5, color: C.subtle, fontFamily: F.display,
        letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
      }}>
        <div>© {new Date().getFullYear()} Comply365 · Sales Enablement</div>
        <div>Persona Brief · v2.0</div>
      </div>
    </div>
  );
};

export default PersonaPrintablePage;