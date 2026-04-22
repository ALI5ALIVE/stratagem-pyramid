import React from "react";
import { dtopSteps, useCases, valueCategories, whyDTOPExists, heroTagline } from "@/data/dtopPlaybook";
import { printBrand } from "./printBrand";

// DTOP step accent colours (sober, executive — paired with the in-app palette)
const stepAccents = ["#0066FF", "#B45309", "#047857", "#5B21B6"];

const DTOPPrintablePage: React.FC = () => {
  const C = printBrand.color;
  const F = printBrand.font;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const sectionLabel = (color: string = C.muted): React.CSSProperties => ({
    fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
    textTransform: "uppercase", color, fontFamily: F.display,
    marginBottom: 8,
  });
  const hr: React.CSSProperties = { height: 1, background: C.hairline, border: 0, margin: 0 };

  return (
    <div
      className="dtop-printable-page"
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
          }}>Comply365</span>
          <span style={{
            display: "inline-block", width: 6, height: 6,
            background: C.brand, marginBottom: 2,
          }} />
        </div>
        <div style={{
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: C.muted, fontWeight: 600, fontFamily: F.display,
        }}>
          Operating Model · Confidential · {today}
        </div>
      </div>
      <hr style={hr} />

      {/* TITLE */}
      <div style={{ marginTop: 16, marginBottom: 14, borderLeft: `4px solid ${C.brand}`, paddingLeft: 14 }}>
        <div style={{
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: C.brand, fontWeight: 700, fontFamily: F.display, marginBottom: 4,
        }}>
          The DTOP Operating Model
        </div>
        <h1 style={{
          margin: 0, fontFamily: F.display, fontSize: 28, fontWeight: 700,
          color: C.ink, lineHeight: 1.05, letterSpacing: "-0.02em",
        }}>
          Detect → Trigger → Orchestrate → Prove
        </h1>
        <div style={{ fontSize: 11.5, color: C.muted, marginTop: 5, fontStyle: "italic" }}>
          {heroTagline}.
        </div>
      </div>

      {/* PIPELINE — hero */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 14px 1fr 14px 1fr 14px 1fr", gap: 0, alignItems: "stretch", marginBottom: 14 }}>
        {dtopSteps.map((step, i) => (
          <React.Fragment key={step.letter}>
            <div style={{
              borderTop: `3px solid ${stepAccents[i]}`,
              background: C.paperWarm,
              border: `1px solid ${C.hairline}`,
              borderTopWidth: 3,
              borderTopColor: stepAccents[i],
              padding: "10px 12px 11px",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontFamily: F.display, fontSize: 28, fontWeight: 700,
                  color: stepAccents[i], lineHeight: 1, letterSpacing: "-0.03em",
                }}>{step.letter}</span>
                <span style={{
                  fontFamily: F.display, fontSize: 12, fontWeight: 700,
                  color: C.ink, textTransform: "uppercase", letterSpacing: "0.08em",
                }}>{step.label}</span>
              </div>
              <div style={{
                fontFamily: F.display, fontSize: 9.5, fontWeight: 600,
                color: stepAccents[i], textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: 6,
              }}>{step.tagline}</div>
              <div style={{ fontSize: 9, color: C.slate, lineHeight: 1.4 }}>
                <span style={{ color: C.subtle, fontWeight: 600 }}>In:</span> {step.dataSources.slice(0, 2).join(" · ")}
              </div>
              <div style={{ fontSize: 9, color: C.slate, lineHeight: 1.4, marginTop: 3 }}>
                <span style={{ color: C.subtle, fontWeight: 600 }}>Out:</span> {step.outputs[0]}
              </div>
            </div>
            {i < 3 && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.subtle, fontSize: 18, fontWeight: 400,
              }}>›</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* WHY IT EXISTS */}
      <div style={{
        display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center",
        padding: "12px 0", borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`,
        marginBottom: 14,
      }}>
        <div>
          <div style={sectionLabel()}>Why It Exists</div>
          <div style={{
            fontFamily: F.display, fontSize: 38, fontWeight: 700,
            color: C.ink, lineHeight: 1, letterSpacing: "-0.03em",
          }}>
            {whyDTOPExists.industryExposure}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: C.slate, lineHeight: 1.5, fontFamily: F.body }}>
            {whyDTOPExists.exposureLabel}.
          </div>
          <div style={{ fontSize: 7.5, color: C.subtle, lineHeight: 1.4, marginTop: 4, fontStyle: "italic" }}>
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
              borderLeft: `2px solid ${stepAccents[i]}`,
              paddingLeft: 12,
            }}>
              <div style={{
                fontFamily: F.display, fontSize: 18, fontWeight: 700,
                color: stepAccents[i], lineHeight: 1.05, letterSpacing: "-0.02em",
                marginBottom: 3,
              }}>{uc.metric}</div>
              <div style={{
                fontFamily: F.display, fontSize: 10, fontWeight: 600,
                color: C.ink, marginBottom: 4, lineHeight: 1.3,
              }}>{uc.title}</div>
              <div style={{ fontSize: 9, color: C.muted, lineHeight: 1.4 }}>
                {uc.scenario}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT IT UNLOCKS — value tiles */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={sectionLabel()}>What It Unlocks</div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
          borderTop: `1px solid ${C.hairline}`,
          paddingTop: 10,
        }}>
          {valueCategories.map((vc, i) => (
            <div key={vc.title} style={{
              paddingLeft: i === 0 ? 0 : 14,
              paddingRight: i === 3 ? 0 : 14,
              borderLeft: i === 0 ? "none" : `1px solid ${C.hairline}`,
            }}>
              <div style={{
                fontFamily: F.display, fontSize: 11, fontWeight: 700,
                color: stepAccents[i], textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: 5,
              }}>{vc.title}</div>
              <div style={{ fontSize: 9, color: C.slate, lineHeight: 1.4 }}>
                {vc.metrics[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        marginTop: 12, paddingTop: 8, borderTop: `1px solid ${C.hairline}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 8.5, color: C.subtle, fontFamily: F.display,
        letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
      }}>
        <div>© {new Date().getFullYear()} Comply365 · DTOP Operating Model</div>
        <div>Operating Model Brief · v2.0</div>
      </div>
    </div>
  );
};

export default DTOPPrintablePage;