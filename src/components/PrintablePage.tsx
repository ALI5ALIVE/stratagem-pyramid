import React from 'react';
import { Check, TrendingUp, ArrowRight, Clock } from 'lucide-react';

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

const PrintablePage: React.FC<PrintablePageProps> = ({ layer, pageNumber, totalPages }) => {
  const { reactive, proactive, strategic } = layer.timeAllocation;

  return (
    <div 
      className="printable-page bg-white text-gray-900 p-8 flex flex-col"
      style={{ 
        width: '1056px', 
        height: '816px', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">COMPLY365</h1>
          <p className="text-sm text-gray-500">Compliance Maturity Model</p>
        </div>
        <div className="text-right">
          <div 
            className="inline-block px-4 py-2 rounded-lg text-white font-bold text-lg"
            style={{ backgroundColor: layer.color }}
          >
            Stage {layer.level}
          </div>
          <p className="text-xs text-gray-400 mt-1">Page {pageNumber} of {totalPages}</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-8">
        {/* Left: Mini Pyramid */}
        <div className="w-64 flex-shrink-0">
          <svg viewBox="0 0 200 240" className="w-full h-auto">
            <defs>
              <linearGradient id={`gradient-${layer.level}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={layer.color} stopOpacity="1" />
                <stop offset="100%" stopColor={layer.color} stopOpacity="0.7" />
              </linearGradient>
            </defs>
            
            {/* Layer 1 - Top */}
            <polygon
              points="100,10 130,50 70,50"
              fill={layer.level === 1 ? `url(#gradient-${layer.level})` : '#e5e7eb'}
              stroke={layer.level === 1 ? layer.color : '#d1d5db'}
              strokeWidth="2"
            />
            
            {/* Layer 2 */}
            <polygon
              points="70,55 130,55 145,95 55,95"
              fill={layer.level === 2 ? `url(#gradient-${layer.level})` : '#e5e7eb'}
              stroke={layer.level === 2 ? layer.color : '#d1d5db'}
              strokeWidth="2"
            />
            
            {/* Layer 3 */}
            <polygon
              points="55,100 145,100 160,140 40,140"
              fill={layer.level === 3 ? `url(#gradient-${layer.level})` : '#e5e7eb'}
              stroke={layer.level === 3 ? layer.color : '#d1d5db'}
              strokeWidth="2"
            />
            
            {/* Layer 4 */}
            <polygon
              points="40,145 160,145 175,185 25,185"
              fill={layer.level === 4 ? `url(#gradient-${layer.level})` : '#e5e7eb'}
              stroke={layer.level === 4 ? layer.color : '#d1d5db'}
              strokeWidth="2"
            />
            
            {/* Layer 5 - Bottom */}
            <polygon
              points="25,190 175,190 190,230 10,230"
              fill={layer.level === 5 ? `url(#gradient-${layer.level})` : '#e5e7eb'}
              stroke={layer.level === 5 ? layer.color : '#d1d5db'}
              strokeWidth="2"
            />
            
            {/* Level labels */}
            <text x="100" y="35" textAnchor="middle" fontSize="10" fill={layer.level === 1 ? 'white' : '#6b7280'} fontWeight="bold">1</text>
            <text x="100" y="80" textAnchor="middle" fontSize="10" fill={layer.level === 2 ? 'white' : '#6b7280'} fontWeight="bold">2</text>
            <text x="100" y="125" textAnchor="middle" fontSize="10" fill={layer.level === 3 ? 'white' : '#6b7280'} fontWeight="bold">3</text>
            <text x="100" y="170" textAnchor="middle" fontSize="10" fill={layer.level === 4 ? 'white' : '#6b7280'} fontWeight="bold">4</text>
            <text x="100" y="215" textAnchor="middle" fontSize="10" fill={layer.level === 5 ? 'white' : '#6b7280'} fontWeight="bold">5</text>
          </svg>
          
          <div className="mt-4 text-center">
            <h2 
              className="font-bold text-lg leading-tight"
              style={{ color: layer.color }}
            >
              {layer.label}
            </h2>
            {layer.sublabel && (
              <p className="text-xs text-gray-500 mt-1">{layer.sublabel}</p>
            )}
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col gap-4 text-sm">
          {/* Headline */}
          <h3 
            className="text-xl font-bold leading-tight"
            style={{ color: layer.color }}
          >
            {layer.headline}
          </h3>

          <div className="grid grid-cols-2 gap-4 flex-1">
            {/* What It Looks Like */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">What It Looks Like</h4>
              <ul className="space-y-1">
                {layer.whatItLooksLike.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: layer.color }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">Result</h4>
              <ul className="space-y-1">
                {layer.result.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <TrendingUp className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: layer.color }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value Proof */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">Value Proof</h4>
              <div className="flex flex-wrap gap-1 mb-2">
                {layer.valueProof.metrics.map((metric, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: layer.color }}
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-600 italic">{layer.valueProof.roiStatement}</p>
            </div>

            {/* Why It Matters */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">Why It Matters</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{layer.whyItMatters}</p>
            </div>

            {/* Behavioral Shift */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">Behavioral Shift</h4>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex-1 bg-red-100 text-red-800 rounded p-2">
                  <span className="font-medium">From:</span> {layer.behavioralShift.from}
                </div>
                <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: layer.color }} />
                <div className="flex-1 bg-green-100 text-green-800 rounded p-2">
                  <span className="font-medium">To:</span> {layer.behavioralShift.to}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">
                Cultural Marker: "{layer.behavioralShift.culturalMarker}"
              </p>
            </div>

            {/* Time Allocation */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">Time Allocation</h4>
              <div className="flex h-6 rounded overflow-hidden mb-2">
                <div 
                  className="bg-red-400 flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${reactive}%` }}
                >
                  {reactive > 15 && `${reactive}%`}
                </div>
                <div 
                  className="bg-amber-400 flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${proactive}%` }}
                >
                  {proactive > 15 && `${proactive}%`}
                </div>
                <div 
                  className="bg-emerald-500 flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${strategic}%` }}
                >
                  {strategic > 15 && `${strategic}%`}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-red-400"></span> Reactive {reactive}%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-amber-400"></span> Proactive {proactive}%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-emerald-500"></span> Strategic {strategic}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
        <span>© 2026 Comply365. All rights reserved.</span>
        <span>Compliance Maturity Model v1.0</span>
      </footer>
    </div>
  );
};

export default PrintablePage;
