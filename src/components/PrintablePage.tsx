import React from 'react';
import { Check, ArrowRight, Eye, Target, TrendingUp, Clock, Users, Flame, ClipboardList, Building2, Link, Sparkles } from 'lucide-react';

interface LayerData {
  id: string;
  level: number;
  label: string;
  sublabel?: string;
  color: string;
  glow: string;
  headline: string;
  whatItLooksLike: string[];
  result: string[];
  valueProof: {
    metrics: string[];
    roiStatement: string;
  };
  whyItMatters: string;
  behavioralShift: {
    from: string;
    to: string;
    culturalMarker: string;
  };
  timeAllocation: {
    reactive: number;
    proactive: number;
    strategic: number;
  };
}

interface PrintablePageProps {
  layer: LayerData;
  pageNumber: number;
  totalPages: number;
}

// Color map matching the web design exactly
const levelColors: Record<number, string> = {
  1: 'hsl(45 93% 58%)',    // Gold - Predictive
  2: 'hsl(280 65% 55%)',   // Purple - Closed-Loop
  3: 'hsl(173 80% 40%)',   // Teal - Connected
  4: 'hsl(199 89% 48%)',   // Blue - Managed
  5: 'hsl(0 70% 50%)',     // Red - Fragmented
};

const getIcons = (level: number) => {
  switch (level) {
    case 1:
      return { from: Clock, to: Sparkles };
    case 2:
      return { from: ClipboardList, to: TrendingUp };
    case 3:
      return { from: Building2, to: Link };
    case 4:
      return { from: Users, to: Building2 };
    case 5:
      return { from: Flame, to: Target };
    default:
      return { from: Flame, to: Target };
  }
};

const PrintablePage: React.FC<PrintablePageProps> = ({ layer, pageNumber, totalPages }) => {
  const { reactive: coordination, proactive: administration, strategic: improvement } = layer.timeAllocation;
  const accentColor = levelColors[layer.level] || layer.color;
  const { from: FromIcon, to: ToIcon } = getIcons(layer.level);

  // Dark theme colors
  const bgColor = 'hsl(222 47% 6%)';
  const cardBg = 'hsl(222 47% 8%)';
  const borderColor = 'hsl(222 47% 18%)';
  const foreground = 'hsl(210 40% 98%)';
  const mutedForeground = 'hsl(215 20% 65%)';

  return (
    <div 
      className="printable-page"
      style={{ 
        width: '1056px', 
        height: '816px', 
        backgroundColor: bgColor,
        color: foreground,
        fontFamily: "'Inter', system-ui, sans-serif",
        boxSizing: 'border-box',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Google Fonts inline for PDF rendering */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: `1px solid ${borderColor}`,
      }}>
        <div>
          <h1 style={{ 
            fontSize: '18px', 
            fontWeight: 700, 
            fontFamily: "'Space Grotesk', sans-serif",
            color: foreground,
            margin: 0,
          }}>
            COMPLY365
          </h1>
          <p style={{ fontSize: '10px', color: mutedForeground, margin: '2px 0 0 0' }}>
            Compliance Maturity Model
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            backgroundColor: `${accentColor}`,
            color: bgColor,
            fontWeight: 700,
            fontSize: '12px',
          }}>
            Stage {layer.level} — {layer.sublabel}
          </div>
          <p style={{ fontSize: '9px', color: mutedForeground, margin: '4px 0 0 0' }}>
            Page {pageNumber} of {totalPages}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', gap: '20px' }}>
        {/* Left: Pyramid Visual */}
        <div style={{ width: '100px', flexShrink: 0 }}>
          <svg viewBox="0 0 240 300" style={{ width: '100%', height: 'auto' }}>
            <defs>
              {/* Gradients for each layer */}
              <linearGradient id="grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(45 93% 58%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(45 93% 48%)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(280 65% 55%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(280 65% 45%)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(173 80% 40%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(173 80% 30%)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(199 89% 48%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(199 89% 38%)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-5" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(0 70% 50%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(0 70% 40%)" stopOpacity="0.8" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Layer 1 - Top (Predictive) */}
            <polygon
              points="120,20 150,60 90,60"
              fill={layer.level === 1 ? 'url(#grad-1)' : 'hsl(222 47% 15%)'}
              stroke={layer.level === 1 ? 'hsl(45 93% 58%)' : 'hsl(222 47% 25%)'}
              strokeWidth={layer.level === 1 ? 3 : 1}
              filter={layer.level === 1 ? 'url(#glow)' : undefined}
            />
            
            {/* Layer 2 (Closed-Loop) */}
            <polygon
              points="90,65 150,65 170,115 70,115"
              fill={layer.level === 2 ? 'url(#grad-2)' : 'hsl(222 47% 15%)'}
              stroke={layer.level === 2 ? 'hsl(280 65% 55%)' : 'hsl(222 47% 25%)'}
              strokeWidth={layer.level === 2 ? 3 : 1}
              filter={layer.level === 2 ? 'url(#glow)' : undefined}
            />
            
            {/* Layer 3 (Connected) */}
            <polygon
              points="70,120 170,120 195,175 45,175"
              fill={layer.level === 3 ? 'url(#grad-3)' : 'hsl(222 47% 15%)'}
              stroke={layer.level === 3 ? 'hsl(173 80% 40%)' : 'hsl(222 47% 25%)'}
              strokeWidth={layer.level === 3 ? 3 : 1}
              filter={layer.level === 3 ? 'url(#glow)' : undefined}
            />
            
            {/* Layer 4 (Managed) */}
            <polygon
              points="45,180 195,180 220,235 20,235"
              fill={layer.level === 4 ? 'url(#grad-4)' : 'hsl(222 47% 15%)'}
              stroke={layer.level === 4 ? 'hsl(199 89% 48%)' : 'hsl(222 47% 25%)'}
              strokeWidth={layer.level === 4 ? 3 : 1}
              filter={layer.level === 4 ? 'url(#glow)' : undefined}
            />
            
            {/* Layer 5 - Bottom (Fragmented) */}
            <polygon
              points="20,240 220,240 240,290 0,290"
              fill={layer.level === 5 ? 'url(#grad-5)' : 'hsl(222 47% 15%)'}
              stroke={layer.level === 5 ? 'hsl(0 70% 50%)' : 'hsl(222 47% 25%)'}
              strokeWidth={layer.level === 5 ? 3 : 1}
              filter={layer.level === 5 ? 'url(#glow)' : undefined}
            />
            
            {/* Level labels */}
            <text x="120" y="45" textAnchor="middle" fontSize="11" fill={layer.level === 1 ? bgColor : mutedForeground} fontWeight="700" fontFamily="Space Grotesk, sans-serif">1</text>
            <text x="120" y="95" textAnchor="middle" fontSize="11" fill={layer.level === 2 ? bgColor : mutedForeground} fontWeight="700" fontFamily="Space Grotesk, sans-serif">2</text>
            <text x="120" y="152" textAnchor="middle" fontSize="11" fill={layer.level === 3 ? bgColor : mutedForeground} fontWeight="700" fontFamily="Space Grotesk, sans-serif">3</text>
            <text x="120" y="212" textAnchor="middle" fontSize="11" fill={layer.level === 4 ? bgColor : mutedForeground} fontWeight="700" fontFamily="Space Grotesk, sans-serif">4</text>
            <text x="120" y="270" textAnchor="middle" fontSize="11" fill={layer.level === 5 ? 'white' : mutedForeground} fontWeight="700" fontFamily="Space Grotesk, sans-serif">5</text>
          </svg>
          
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <h2 style={{ 
              fontWeight: 700, 
              fontSize: '14px',
              fontFamily: "'Space Grotesk', sans-serif",
              color: accentColor,
              margin: 0,
            }}>
              {layer.label}
            </h2>
            {layer.sublabel && (
              <p style={{ fontSize: '10px', color: mutedForeground, margin: '4px 0 0 0' }}>
                {layer.sublabel}
              </p>
            )}
          </div>
        </div>

        {/* Right: Details Panel */}
        <div style={{ 
          flex: 1, 
          backgroundColor: cardBg,
          borderRadius: '12px',
          border: `1px solid ${borderColor}`,
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: `linear-gradient(135deg, hsl(222 47% 10%) 0%, hsl(222 47% 6%) 100%)`,
        }}>
          {/* Header */}
          <div style={{ marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: accentColor,
                color: bgColor,
                fontSize: '11px',
                fontWeight: 700,
              }}>
                {layer.level}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: mutedForeground }}>
                Stage {layer.level} — {layer.sublabel}
              </span>
            </div>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 700, 
              fontFamily: "'Space Grotesk', sans-serif",
              color: accentColor,
              margin: 0,
              lineHeight: 1.3,
            }}>
              {layer.headline}
            </h2>
          </div>

          {/* Grid layout for sections */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1 }}>
            {/* What it looks like */}
            <div style={{ 
              backgroundColor: `${accentColor}08`,
              borderRadius: '8px',
              padding: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Eye style={{ width: '12px', height: '12px', color: accentColor }} />
                <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: mutedForeground }}>
                  What it looks like
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {layer.whatItLooksLike.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '5px' }}>
                    <span style={{
                      flexShrink: 0,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: `${accentColor}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '1px',
                    }}>
                      <Check style={{ width: '10px', height: '10px', color: accentColor }} />
                    </span>
                    <span style={{ fontSize: '11px', color: `${foreground}e6`, lineHeight: 1.4 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div style={{ 
              backgroundColor: `${accentColor}08`,
              borderRadius: '8px',
              padding: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Target style={{ width: '12px', height: '12px', color: accentColor }} />
                <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: mutedForeground }}>
                  Result
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {layer.result.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '5px' }}>
                    <span style={{
                      flexShrink: 0,
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: accentColor,
                      marginTop: '6px',
                    }} />
                    <span style={{ fontSize: '11px', color: `${foreground}cc`, fontWeight: 500, lineHeight: 1.4 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value Proof */}
            <div style={{ 
              backgroundColor: `${accentColor}08`,
              borderRadius: '8px',
              padding: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <TrendingUp style={{ width: '12px', height: '12px', color: accentColor }} />
                <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: mutedForeground }}>
                  Value Proof
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                {layer.valueProof.metrics.map((metric, index) => (
                  <span key={index} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 600,
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    border: `1px solid ${accentColor}30`,
                  }}>
                    {metric}
                  </span>
                ))}
              </div>
              <div style={{
                padding: '10px',
                borderRadius: '6px',
                background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 100%)`,
                borderLeft: `3px solid ${accentColor}`,
              }}>
                <p style={{ fontSize: '11px', fontWeight: 500, fontStyle: 'italic', color: `${foreground}e6`, margin: 0 }}>
                  "{layer.valueProof.roiStatement}"
                </p>
              </div>
            </div>

            {/* Why it matters */}
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}30`,
              background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ArrowRight style={{ width: '12px', height: '12px', color: accentColor }} />
                <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: mutedForeground }}>
                  Why it matters
                </span>
              </div>
              <p style={{ fontSize: '11px', fontWeight: 500, color: foreground, margin: 0, lineHeight: 1.5 }}>
                {layer.whyItMatters}
              </p>
            </div>

            {/* Behavioral Shift */}
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}30`,
              background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Users style={{ width: '12px', height: '12px', color: accentColor }} />
                <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: mutedForeground }}>
                  How Work Changes
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                {/* FROM */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: `${accentColor}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <FromIcon style={{ width: '10px', height: '10px', color: mutedForeground }} />
                    </div>
                    <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: mutedForeground }}>
                      From
                    </span>
                  </div>
                  <p style={{ fontSize: '10px', color: `${foreground}b3`, lineHeight: 1.4, margin: 0 }}>
                    {layer.behavioralShift.from}
                  </p>
                </div>

                {/* Arrow */}
                <div style={{
                  flexShrink: 0,
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: `${accentColor}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <ArrowRight style={{ width: '12px', height: '12px', color: accentColor }} />
                </div>

                {/* TO */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <ToIcon style={{ width: '10px', height: '10px', color: bgColor }} />
                    </div>
                    <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: accentColor }}>
                      To
                    </span>
                  </div>
                  <p style={{ fontSize: '10px', color: foreground, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                    {layer.behavioralShift.to}
                  </p>
                </div>
              </div>

              {/* Cultural Marker */}
              <div style={{
                padding: '8px',
                borderRadius: '4px',
                borderLeft: `3px solid ${accentColor}`,
                backgroundColor: `${accentColor}08`,
              }}>
                <p style={{ fontSize: '10px', fontStyle: 'italic', color: `${foreground}cc`, margin: 0 }}>
                  "{layer.behavioralShift.culturalMarker}"
                </p>
              </div>
            </div>

            {/* Time Allocation */}
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}30`,
              background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Clock style={{ width: '12px', height: '12px', color: accentColor }} />
                <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: mutedForeground }}>
                  Where Teams Spend Time
                </span>
              </div>

              {/* Stacked Bar */}
              <div style={{ 
                height: '22px', 
                borderRadius: '4px', 
                overflow: 'hidden', 
                display: 'flex',
                marginBottom: '10px',
              }}>
                <div style={{
                  width: `${coordination}%`,
                  backgroundColor: 'hsl(0 70% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {coordination >= 15 && (
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>{coordination}%</span>
                  )}
                </div>
                <div style={{
                  width: `${administration}%`,
                  backgroundColor: 'hsl(199 89% 48%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {administration >= 15 && (
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>{administration}%</span>
                  )}
                </div>
                <div style={{
                  width: `${improvement}%`,
                  backgroundColor: 'hsl(173 80% 40%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {improvement >= 15 && (
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>{improvement}%</span>
                  )}
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '9px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'hsl(0 70% 50%)' }} />
                  <span style={{ color: mutedForeground }}>Coordination</span>
                  <span style={{ fontWeight: 600, color: foreground }}>{coordination}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'hsl(199 89% 48%)' }} />
                  <span style={{ color: mutedForeground }}>Admin</span>
                  <span style={{ fontWeight: 600, color: foreground }}>{administration}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'hsl(173 80% 40%)' }} />
                  <span style={{ color: mutedForeground }}>Improvement</span>
                  <span style={{ fontWeight: 600, color: foreground }}>{improvement}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ 
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: `1px solid ${borderColor}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '9px',
        color: mutedForeground,
      }}>
        <span>© 2026 Comply365. All rights reserved.</span>
        <span>Compliance Maturity Model v1.0</span>
      </footer>
    </div>
  );
};

export default PrintablePage;
