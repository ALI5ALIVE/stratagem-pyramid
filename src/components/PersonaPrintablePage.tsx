import React from "react";
import { Briefcase, Shield, Plane, GraduationCap, Monitor } from "lucide-react";
import type { PersonaProfile } from "@/data/personaProfiles";
import { printBrand } from "./print/printBrand";
import complyLogo from "@/assets/comply365-logo-white.png";

interface Props {
  persona: PersonaProfile;
}

const iconMap: Record<string, React.ElementType> = {
  Briefcase, Shield, Plane, GraduationCap, Monitor,
};

// Brightened persona accent palette (tuned for dark surfaces)
const personaAccent: Record<string, string> = {
  "ceo-coo":           "#A78BFA", // bright violet
  "vp-safety":         "#FB7185", // alert rose
  "vp-ops":            "#3D8BFF", // bright brand blue
  "training-director": "#34D399", // bright emerald
  "cio-it":            "#F59E0B", // signal amber
};

// Composite exemplar — illustrative buyer profile per persona
interface PersonaExemplar {
  name: string;
  role: string;
  archetype: string;
  stats: [string, string, string];
  quote: string;
}
const personaExemplars: Record<string, PersonaExemplar> = {
  "ceo-coo": {
    name: "Margaret Chen",
    role: "Chief Operating Officer",
    archetype: "Mid-size European carrier",
    stats: ["180 aircraft", "1,200 daily ops", "14 yrs in role"],
    quote: "I need to know our controllable risk is going down quarter over quarter.",
  },
  "vp-safety": {
    name: "James Okafor",
    role: "VP Safety & Compliance",
    archetype: "Long-haul international carrier",
    stats: ["240 aircraft", "Ex-Captain · 22 yrs", "Reports to CEO"],
    quote: "When the regulator asks 'did this fix work?', I want one answer, not five.",
  },
  "vp-ops": {
    name: "Anika Patel",
    role: "VP Flight Operations",
    archetype: "Low-cost carrier · point-to-point",
    stats: ["120 aircraft", "1.4M sectors / yr", "8 yrs in role"],
    quote: "Every grounded aircraft is a six-figure decision — I need the loop closed by lunch.",
  },
  "training-director": {
    name: "Lukas Bergström",
    role: "Director of Training",
    archetype: "Regional carrier · CRM lead",
    stats: ["90 pilots / yr", "12 instructors", "EBT programme owner"],
    quote: "Show me the line between a published procedure and a competent crew.",
  },
  "cio-it": {
    name: "Priya Raman",
    role: "Chief Information Officer",
    archetype: "Network carrier · global hub model",
    stats: ["320 aircraft", "9-system modernisation", "Consolidating 14 vendors"],
    quote: "I'm consolidating vendors — show me one platform that closes the loop.",
  },
};

const PersonaPrintablePage: React.FC<Props> = ({ persona }) => {
  const Icon = iconMap[persona.iconName] || Briefcase;
  const accent = personaAccent[persona.id] || "#3D8BFF";
  const exemplar = personaExemplars[persona.id];
  const C = printBrand.color;
  const F = printBrand.font;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  // Convert hex to rgba for accent washes
  const accentRgba = (alpha: number) => {
    const h = accent.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const sectionLabel = (color: string = C.darkMuted): React.CSSProperties => ({
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color,
    fontFamily: F.display,
    marginBottom: 10,
  });

  const bullet = (text: string, key: number) => (
    <li key={key} style={{
      fontSize: 11, lineHeight: 1.55, color: C.darkSlate,
      marginBottom: 6, paddingLeft: 14, position: "relative",
      fontFamily: F.body,
    }}>
      <span style={{
        position: "absolute", left: 0, top: 7,
        width: 5, height: 5, background: accent,
        boxShadow: `0 0 8px ${accentRgba(0.6)}`,
      }} />
      {text}
    </li>
  );

  const hr: React.CSSProperties = {
    height: 1, background: C.darkHairline, border: 0, margin: 0,
  };

  return (
    <div
      className="persona-printable-page"
      style={{
        width: printBrand.page.width,
        height: printBrand.page.height,
        background: C.darkPaper,
        backgroundImage: `radial-gradient(700px 480px at 100% 0%, ${accentRgba(0.10)}, transparent 60%), radial-gradient(600px 400px at 0% 100%, rgba(0,102,255,0.05), transparent 65%)`,
        padding: "26px 40px 22px",
        fontFamily: F.body,
        color: C.darkInk,
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
          <img
            src={complyLogo}
            alt="Comply365"
            style={{ height: 18, width: "auto", display: "block" }}
          />
          <span style={{
            display: "inline-block", width: 6, height: 6,
            background: accent, marginBottom: 2,
            boxShadow: `0 0 8px ${accentRgba(0.7)}`,
          }} />
        </div>
        <div style={{
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: C.darkMuted, fontWeight: 600, fontFamily: F.display,
        }}>
          Persona Brief · Confidential · {today}
        </div>
      </div>
      <hr style={hr} />

      {/* TITLE BLOCK with persona medallion */}
      <div style={{ display: "flex", gap: 20, marginTop: 18, marginBottom: 14, alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 0, borderLeft: `4px solid ${accent}`, paddingLeft: 14 }}>
          <div style={{
            fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
            color: accent, fontWeight: 700, fontFamily: F.display, marginBottom: 4,
          }}>
            {persona.seniority}
          </div>
          <h1 style={{
            margin: 0, fontFamily: F.display, fontSize: 28, fontWeight: 700,
            color: C.darkInk, lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>
            {persona.title}
          </h1>
          <div style={{
            fontSize: 10, color: C.darkMuted, marginTop: 5, lineHeight: 1.4,
          }}>
            {persona.titleVariants.slice(0, 4).join(" · ")}
          </div>
        </div>
        {/* Persona medallion */}
        <div style={{
          width: 80, height: 80, flexShrink: 0,
          borderRadius: "50%",
          background: accentRgba(0.18),
          border: `1.5px solid ${accentRgba(0.6)}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 24px ${accentRgba(0.25)}, inset 0 0 16px ${accentRgba(0.10)}`,
        }}>
          <Icon size={36} color={accent} strokeWidth={1.5} />
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <p style={{
        margin: "0 0 14px", fontSize: 11.5, lineHeight: 1.6,
        color: C.darkSlate, fontFamily: F.body,
      }}>
        {persona.profileSummary}
      </p>

      {/* PERSONA VIGNETTE — composite exemplar */}
      {exemplar && (
        <div style={{
          background: C.darkPaperWarm,
          border: `1px solid ${accentRgba(0.35)}`,
          borderLeft: `3px solid ${accent}`,
          padding: "12px 16px",
          marginBottom: 14,
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 16,
          alignItems: "center",
        }}>
          <div>
            <div style={{
              fontSize: 8.5, fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: accent, fontFamily: F.display,
              marginBottom: 3,
            }}>
              Meet {exemplar.name.split(" ")[0]} — Composite Exemplar
            </div>
            <div style={{
              fontFamily: F.display, fontSize: 14, fontWeight: 700,
              color: C.darkInk, lineHeight: 1.2,
            }}>
              {exemplar.name}
            </div>
            <div style={{
              fontSize: 10, color: C.darkSlate, fontStyle: "italic",
              marginTop: 2, lineHeight: 1.45,
            }}>
              {exemplar.role} · {exemplar.archetype}
            </div>
            <div style={{
              fontSize: 9, color: C.darkMuted, marginTop: 5,
              fontFamily: F.display, letterSpacing: "0.04em",
            }}>
              {exemplar.stats.join("  ·  ")}
            </div>
          </div>
          <div style={{
            borderLeft: `1px solid ${C.darkHairline}`,
            paddingLeft: 14,
          }}>
            <p style={{
              margin: 0, fontFamily: F.display, fontSize: 11.5,
              fontStyle: "italic", lineHeight: 1.45,
              color: C.darkInk, fontWeight: 500,
            }}>
              <span style={{ color: accent, fontSize: 18, marginRight: 2 }}>“</span>
              {exemplar.quote}
              <span style={{ color: accent, fontSize: 18, marginLeft: 2 }}>”</span>
            </p>
          </div>
        </div>
      )}

      {/* META STRIP */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderTop: `1px solid ${C.darkHairline}`,
        borderBottom: `1px solid ${C.darkHairline}`,
        padding: "11px 0", marginBottom: 14,
      }}>
        {[
          { label: "Reports To", value: persona.reportsTo },
          { label: "Org Context", value: persona.orgContext },
          { label: "Budget Influence", value: persona.budgetInfluence },
        ].map((m, i) => (
          <div key={m.label} style={{
            paddingLeft: i === 0 ? 0 : 14,
            paddingRight: i === 2 ? 0 : 14,
            borderLeft: i === 0 ? "none" : `1px solid ${C.darkHairline}`,
          }}>
            <div style={sectionLabel(C.darkSubtle)}>{m.label}</div>
            <div style={{ fontSize: 11, color: C.darkInk, lineHeight: 1.5, fontWeight: 500 }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* PRIORITIES + PAINS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 14 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 14 }}>
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

      <hr style={{ ...hr, margin: "6px 0" }} />

      {/* VALUE PROPOSITION — pull-quote */}
      <div style={{
        padding: "14px 0",
        borderLeft: `4px solid ${accent}`,
        paddingLeft: 16,
      }}>
        <div style={{ ...sectionLabel(accent), marginBottom: 6 }}>Value Proposition</div>
        <p style={{
          margin: 0, fontFamily: F.display, fontSize: 15, lineHeight: 1.5,
          color: C.darkInk, fontWeight: 500, letterSpacing: "-0.005em",
          textShadow: `0 0 18px ${accentRgba(0.15)}`,
        }}>
          {persona.valueProposition}
        </p>
      </div>

      <hr style={{ ...hr, margin: "6px 0" }} />

      {/* KEY MESSAGES + METRICS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 14, marginBottom: 14 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <div style={sectionLabel()}>Top Discovery Question</div>
          <p style={{
            margin: 0, fontSize: 11, lineHeight: 1.5, color: C.darkInk,
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
                margin: "0 0 6px", fontSize: 10, color: C.darkMuted,
                fontStyle: "italic", lineHeight: 1.45,
              }}>
                “{persona.objections[0].objection}”
              </p>
              <div style={{
                fontSize: 11, color: C.darkSuccess, fontFamily: F.body,
                fontWeight: 500, lineHeight: 1.5,
                paddingLeft: 10, borderLeft: `2px solid ${C.darkSuccess}`,
              }}>
                {persona.objections[0].response}
              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        marginTop: "auto", paddingTop: 8, borderTop: `1px solid ${C.darkHairline}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 8.5, color: C.darkSubtle, fontFamily: F.display,
        letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
      }}>
        <div>© {new Date().getFullYear()} Comply<span style={{ color: C.brand }}>365</span> · Sales Enablement · Composite exemplar — illustrative buyer profile</div>
        <div>Persona Brief · v3.0</div>
      </div>
    </div>
  );
};

export default PersonaPrintablePage;