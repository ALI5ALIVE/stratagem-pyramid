import React from "react";
import { dtopSteps, useCases, valueCategories, whyDTOPExists, heroTagline } from "@/data/dtopPlaybook";
import { printBrand, stepAccentsDark } from "./printBrand";
import complyLogo from "@/assets/comply365-logo-white.png";

const DTOPPrintablePage: React.FC = () => {
  const C = printBrand.color;
  const F = printBrand.font;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const sectionLabel = (color: string = C.darkMuted): React.CSSProperties => ({
    fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
    textTransform: "uppercase", color, fontFamily: F.display,
    marginBottom: 8,
  });
  const hr: React.CSSProperties = { height: 1, background: C.darkHairline, border: 0, margin: 0 };

  return (
    <div
      className="dtop-printable-page"
      style={{
        width: printBrand.page.width,
        height: printBrand.page.height,
        background: C.darkPaper,
        backgroundImage: `radial-gradient(800px 500px at 0% 0%, rgba(0,102,255,0.10), transparent 60%), radial-gradient(700px 500px at 100% 100%, rgba(139,92,246,0.06), transparent 65%)`,
        padding: "28px 40px 24px",
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
        </div>
        <div style={{
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: C.darkMuted, fontWeight: 600, fontFamily: F.display,
        }}>
          Operating Model · Confidential · {today}
        </div>
      </div>
      <hr style={hr} />

      {/* TITLE */}
      <div style={{ marginTop: 14, marginBottom: 10, borderLeft: `4px solid ${C.brand}`, paddingLeft: 14 }}>
        <div style={{
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#3D8BFF", fontWeight: 700, fontFamily: F.display, marginBottom: 4,
        }}>
          The DTOP Operating Model
        </div>
        <h1 style={{
          margin: 0, fontFamily: F.display, fontSize: 26, fontWeight: 700,
          color: C.darkInk, lineHeight: 1.05, letterSpacing: "-0.02em",
        }}>
          Detect → Trigger → Orchestrate → Prove
        </h1>
        <div style={{ fontSize: 11.5, color: C.darkSlate, marginTop: 5, fontStyle: "italic" }}>
          {heroTagline}.
        </div>
      </div>

      {/* WHAT DTOP IS */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto", gap: 18, alignItems: "center",
        padding: "10px 14px", marginBottom: 12,
        background: C.darkPaperWarm,
        border: `1px solid ${C.darkHairline}`,
        borderLeft: `3px solid ${stepAccentsDark[0]}`,
      }}>
        <div>
          <div style={sectionLabel("#3D8BFF")}>What DTOP Is</div>
          <div style={{ fontSize: 11, color: C.darkInk, lineHeight: 1.5, fontFamily: F.body }}>
            DTOP is the <span style={{ fontWeight: 700 }}>closed-loop operating model</span> that connects detection of operational signals to provable outcomes — across Safety, Content, and Training, in one continuous workflow.
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
          {[
            { label: "Closed-loop", color: stepAccentsDark[0] },
            { label: "Cross-module", color: stepAccentsDark[2] },
            { label: "Auditable by design", color: stepAccentsDark[3] },
          ].map((chip) => (
            <span key={chip.label} style={{
              fontSize: 8.5, fontWeight: 700, fontFamily: F.display,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: chip.color, padding: "5px 9px",
              border: `1px solid ${chip.color}55`,
              background: `${chip.color}12`,
              whiteSpace: "nowrap",
            }}>{chip.label}</span>
          ))}
        </div>
      </div>

      {/* PIPELINE — hero */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 14px 1fr 14px 1fr 14px 1fr", gap: 0, alignItems: "stretch", marginBottom: 12 }}>
        {dtopSteps.map((step, i) => (
          <React.Fragment key={step.letter}>
            <div style={{
              background: C.darkPaperWarm,
              border: `1px solid ${C.darkHairline}`,
              borderTop: `3px solid ${stepAccentsDark[i]}`,
              padding: "10px 14px 11px",
              display: "flex", flexDirection: "column",
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontFamily: F.display, fontSize: 28, fontWeight: 700,
                  color: stepAccentsDark[i], lineHeight: 1, letterSpacing: "-0.03em",
                  textShadow: `0 0 16px ${stepAccentsDark[i]}55`,
                }}>{step.letter}</span>
                <span style={{
                  fontFamily: F.display, fontSize: 12, fontWeight: 700,
                  color: C.darkInk, textTransform: "uppercase", letterSpacing: "0.08em",
                }}>{step.label}</span>
              </div>
              <div style={{
                fontFamily: F.display, fontSize: 9.5, fontWeight: 600,
                color: stepAccentsDark[i], textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: 6,
              }}>{step.tagline}</div>
              <div style={{ fontSize: 9.5, color: C.darkSlate, lineHeight: 1.5 }}>
                <span style={{ color: C.darkSubtle, fontWeight: 600 }}>In:</span> {step.dataSources.slice(0, 2).join(" · ")}
              </div>
              <div style={{ fontSize: 9.5, color: C.darkSlate, lineHeight: 1.5, marginTop: 3 }}>
                <span style={{ color: C.darkSubtle, fontWeight: 600 }}>Out:</span> {step.outputs[0]}
              </div>
            </div>
            {i < 3 && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.darkSubtle, fontSize: 18, fontWeight: 400,
              }}>›</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* WHY IT EXISTS */}
      <div style={{
        display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center",
        padding: "14px 0", borderTop: `1px solid ${C.darkHairline}`, borderBottom: `1px solid ${C.darkHairline}`,
        marginBottom: 14,
      }}>
        <div>
          <div style={sectionLabel()}>Why It Exists</div>
          <div style={{
            fontFamily: F.display, fontSize: 38, fontWeight: 700,
            color: C.darkInk, lineHeight: 1, letterSpacing: "-0.03em",
            borderBottom: `3px solid ${C.brand}`,
            paddingBottom: 4, display: "inline-block",
          }}>
            {whyDTOPExists.industryExposure}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: C.darkSlate, lineHeight: 1.5, fontFamily: F.body }}>
            {whyDTOPExists.exposureLabel}.
          </div>
          <div style={{ fontSize: 7.5, color: C.darkSubtle, lineHeight: 1.4, marginTop: 4, fontStyle: "italic" }}>
            {whyDTOPExists.industryExposureMethodology}
          </div>
        </div>
      </div>

      {/* PROOF — three closed loops */}
      <div style={{ marginBottom: 14 }}>
        <div style={sectionLabel()}>Proof — Three Closed Loops</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {useCases.map((uc, i) => (
            <div key={uc.title} style={{
              borderLeft: `2px solid ${stepAccentsDark[i]}`,
              paddingLeft: 14,
            }}>
              <div style={{
                fontFamily: F.display, fontSize: 20, fontWeight: 700,
                color: stepAccentsDark[i], lineHeight: 1.05, letterSpacing: "-0.02em",
                marginBottom: 3,
                textShadow: `0 0 14px ${stepAccentsDark[i]}40`,
              }}>{uc.metric}</div>
              <div style={{
                fontFamily: F.display, fontSize: 10, fontWeight: 600,
                color: C.darkInk, marginBottom: 4, lineHeight: 1.3,
              }}>{uc.title}</div>
              <div style={{ fontSize: 9, color: C.darkSlate, lineHeight: 1.5 }}>
                {uc.scenario}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT IT UNLOCKS — value tiles */}
      <div style={{ marginBottom: 14 }}>
        <div style={sectionLabel()}>What It Unlocks</div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
          borderTop: `1px solid ${C.darkHairline}`,
          paddingTop: 12,
        }}>
          {valueCategories.map((vc, i) => (
            <div key={vc.title} style={{
              paddingLeft: i === 0 ? 0 : 14,
              paddingRight: i === 3 ? 0 : 14,
              borderLeft: i === 0 ? "none" : `1px solid ${C.darkHairline}`,
            }}>
              <div style={{
                fontFamily: F.display, fontSize: 11, fontWeight: 700,
                color: stepAccentsDark[i], textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: 5,
              }}>{vc.title}</div>
              <div style={{ fontSize: 10, color: C.darkSlate, lineHeight: 1.5 }}>
                {vc.metrics[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        marginTop: "auto", paddingTop: 8, borderTop: `2px solid ${C.brand}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 8.5, color: C.darkSubtle, fontFamily: F.display,
        letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-block", width: 4, height: 4, background: C.brand,
          }} />
          <span>© {new Date().getFullYear()} Comply<span style={{ color: C.brand }}>365</span> · DTOP Operating Model</span>
        </div>
        <div>Operating Model Brief · v2.0 · comply365.com</div>
      </div>
    </div>
  );
};

export default DTOPPrintablePage;