import React, { useState, useMemo } from 'react';
import { MathActivityType, Concept } from '@/types/curriculum';
import { Play, RotateCcw, TrendingUp, Maximize2, Sparkles, CheckCircle2, Compass, Layers } from 'lucide-react';
import { cn } from '@/utils/cn';

interface MathActivityRendererProps {
  activityType: MathActivityType;
  concept?: Concept;
  topic?: string;
  className?: string;
}

export const MathActivityRenderer: React.FC<MathActivityRendererProps> = ({
  activityType,
  concept,
  topic,
  className,
}) => {
  // Mode 1: Secant to Tangent Derivative state
  const [x0, setX0] = useState<number>(1.5);
  const [deltaX, setDeltaX] = useState<number>(1.0); // approaches 0

  // Mode 2: Riemann Sums state
  const [riemannN, setRiemannN] = useState<number>(8); // number of rectangles
  const [lowerA, setLowerA] = useState<number>(-1.0);
  const [upperB, setUpperB] = useState<number>(2.5);

  // Mode 3: Optimization / Extrema state
  const [activeCriticalPoint, setActiveCriticalPoint] = useState<number>(2.0);

  // Mode 4: Vectors state
  const [vecA, setVecA] = useState<{ x: number; y: number; z: number }>({ x: 2, y: 3, z: 1 });
  const [vecB, setVecB] = useState<{ x: number; y: number; z: number }>({ x: 3, y: -1, z: 2 });

  // Mode 5: Probability / Bayes state
  const [priorP1, setPriorP1] = useState<number>(0.5);
  const [likelihoodE1, setLikelihoodE1] = useState<number>(0.6); // P(A|E1)
  const [likelihoodE2, setLikelihoodE2] = useState<number>(0.3); // P(A|E2)

  // Curve: f(x) = -0.2*x^3 + 0.3*x^2 + 1.2*x + 1.5
  const f = (x: number) => -0.2 * Math.pow(x, 3) + 0.3 * Math.pow(x, 2) + 1.2 * x + 1.5;
  const df = (x: number) => -0.6 * Math.pow(x, 2) + 0.6 * x + 1.2;
  const d2f = (x: number) => -1.2 * x + 0.6;

  // SVG coordinate helpers (440x260, origin at (180, 160))
  const originX = 180;
  const originY = 160;
  const scaleX = 35;
  const scaleY = 28;

  const toSvgX = (x: number) => originX + x * scaleX;
  const toSvgY = (y: number) => originY - y * scaleY;

  // Polynomial curve path
  const curvePath = useMemo(() => {
    const pts: string[] = [];
    for (let x = -3.5; x <= 4.5; x += 0.1) {
      const y = f(x);
      pts.push(`${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`);
    }
    return `M ${pts.join(' L ')}`;
  }, []);

  // Differentiation Calculations
  const y0 = f(x0);
  const x1 = x0 + deltaX;
  const y1 = f(x1);
  const secantSlope = deltaX !== 0 ? (y1 - y0) / deltaX : df(x0);
  const trueTangentSlope = df(x0);

  // Riemann Sums Calculations
  const riemannRects = useMemo(() => {
    const rects: { x: number; y: number; width: number; height: number; area: number }[] = [];
    const dx = (upperB - lowerA) / riemannN;
    let totalArea = 0;

    for (let i = 0; i < riemannN; i++) {
      const xi = lowerA + i * dx;
      const midX = xi + dx / 2;
      const h = f(midX);
      const rectArea = Math.max(0, h * dx);
      totalArea += rectArea;

      if (h > 0) {
        rects.push({
          x: toSvgX(xi),
          y: toSvgY(h),
          width: dx * scaleX,
          height: h * scaleY,
          area: rectArea,
        });
      }
    }
    return { rects, totalArea };
  }, [riemannN, lowerA, upperB]);

  // Vector Calculations
  const dotProduct = vecA.x * vecB.x + vecA.y * vecB.y + vecA.z * vecB.z;
  const magA = Math.sqrt(vecA.x ** 2 + vecA.y ** 2 + vecA.z ** 2);
  const magB = Math.sqrt(vecB.x ** 2 + vecB.y ** 2 + vecB.z ** 2);
  const projAonB = magB !== 0 ? dotProduct / magB : 0;

  // Bayes Calculations
  const priorP2 = 1 - priorP1;
  const totalPA = priorP1 * likelihoodE1 + priorP2 * likelihoodE2;
  const posteriorP1GivenA = totalPA > 0 ? (priorP1 * likelihoodE1) / totalPA : 0;

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-6', className)}>
      {/* Activity Title Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7CFF] bg-[#EFF4FF] px-2.5 py-0.5 rounded-full">
              Mathematics Engine
            </span>
            <span className="text-xs font-bold text-[#667085]">
              {concept?.name || topic || 'Calculus & Visual Algebra'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#172033] mt-1">
            {activityType === 'secantTangent' && 'Secant-to-Tangent Derivative Visualizer'}
            {activityType === 'riemannSum' && 'Riemann Sum Definite Integral Lab'}
            {activityType === 'optimization' && 'Extrema & Optimization Explorer'}
            {activityType === 'vectorCanvas' && 'Vector Algebra & Projection Canvas'}
            {activityType === 'probabilitySimulation' && 'Bayes\' Theorem & Conditional Probability'}
          </h3>
        </div>
      </div>

      {/* 1. SECANT TO TANGENT ACTIVITY */}
      {activityType === 'secantTangent' && (
        <div className="space-y-6">
          {/* SVG Canvas */}
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-3 sm:p-4 overflow-x-auto flex justify-center">
            <svg width="440" height="260" viewBox="0 0 440 260" className="select-none font-sans text-xs">
              {/* Grid Lines */}
              <defs>
                <pattern id="mathGrid" width="35" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 35 0 L 0 0 0 28" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="440" height="260" fill="url(#mathGrid)" />

              {/* Axes */}
              <line x1="20" y1={originY} x2="420" y2={originY} stroke="#94A3B8" strokeWidth="1.5" />
              <line x1={originX} y1="20" x2={originX} y2="240" stroke="#94A3B8" strokeWidth="1.5" />
              <text x="425" y={originY + 4} fill="#64748B" fontWeight="bold" fontSize="10">x</text>
              <text x={originX - 6} y="16" fill="#64748B" fontWeight="bold" fontSize="10">y</text>

              {/* Function Curve f(x) */}
              <path d={curvePath} fill="none" stroke="#4F7CFF" strokeWidth="3" strokeLinecap="round" />

              {/* Secant Line */}
              {deltaX !== 0 && (
                <line
                  x1={toSvgX(x0 - 1.2)}
                  y1={toSvgY(y0 - 1.2 * secantSlope)}
                  x2={toSvgX(x1 + 1.2)}
                  y2={toSvgY(y1 + 1.2 * secantSlope)}
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4,3"
                />
              )}

              {/* True Tangent Line at x0 */}
              <line
                x1={toSvgX(x0 - 1.8)}
                y1={toSvgY(y0 - 1.8 * trueTangentSlope)}
                x2={toSvgX(x0 + 1.8)}
                y2={toSvgY(y0 + 1.8 * trueTangentSlope)}
                stroke="#10B981"
                strokeWidth="2.5"
              />

              {/* Point P(x0, y0) */}
              <circle cx={toSvgX(x0)} cy={toSvgY(y0)} r="6" fill="#4F7CFF" stroke="#FFFFFF" strokeWidth="2" />
              <text x={toSvgX(x0) - 15} y={toSvgY(y0) - 10} fill="#1E293B" fontWeight="bold" fontSize="10">
                P({x0.toFixed(1)}, {y0.toFixed(1)})
              </text>

              {/* Point Q(x0 + Δx, y0 + Δy) */}
              {Math.abs(deltaX) > 0.05 && (
                <>
                  <circle cx={toSvgX(x1)} cy={toSvgY(y1)} r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                  <text x={toSvgX(x1) + 8} y={toSvgY(y1) + 4} fill="#B45309" fontWeight="bold" fontSize="10">
                    Q
                  </text>
                  {/* Δx and Δy triangle */}
                  <line x1={toSvgX(x0)} y1={toSvgY(y0)} x2={toSvgX(x1)} y2={toSvgY(y0)} stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1={toSvgX(x1)} y1={toSvgY(y0)} x2={toSvgX(x1)} y2={toSvgY(y1)} stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" />
                </>
              )}
            </svg>
          </div>

          {/* Interactive Controls & Real-Time Calculations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-[#172033]">
                <span>Base Point x₀</span>
                <span className="font-mono text-[#4F7CFF]">{x0.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="2.5"
                step="0.1"
                value={x0}
                onChange={(e) => setX0(parseFloat(e.target.value))}
                className="w-full accent-[#4F7CFF]"
              />

              <div className="flex justify-between text-xs font-bold text-[#172033] pt-2">
                <span>Increment Δx (Drag to 0)</span>
                <span className="font-mono text-amber-600">{deltaX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="2.0"
                step="0.05"
                value={deltaX}
                onChange={(e) => setDeltaX(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              <button
                onClick={() => setDeltaX(0.01)}
                className="text-[11px] font-bold text-[#4F7CFF] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Snap Δx → 0 (Evaluate Instantaneous Tangent)
              </button>
            </div>

            {/* Readout */}
            <div className="bg-[#EFF4FF] p-4 rounded-2xl border border-[#4F7CFF]/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7CFF] block">
                  Differential Slopes
                </span>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <span className="w-2.5 h-0.5 bg-amber-500 rounded-full" />
                      Secant Slope (Δy / Δx):
                    </span>
                    <span className="font-mono font-black text-amber-700">{secantSlope.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <span className="w-2.5 h-0.5 bg-emerald-500 rounded-full" />
                      True Tangent f'(x₀):
                    </span>
                    <span className="font-mono font-black text-emerald-700">{trueTangentSlope.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                    <span className="text-[#64748B]">Slope Error (|m_sec - m_tan|):</span>
                    <span className="font-mono font-black text-[#172033]">
                      {Math.abs(secantSlope - trueTangentSlope).toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-blue-900 bg-white/80 p-2.5 rounded-xl border border-blue-100">
                💡 <strong>Limit Concept:</strong> As <span className="font-mono font-bold">Δx → 0</span>, the secant line rotates into coincidence with the tangent line.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. RIEMANN SUM ACTIVITY */}
      {activityType === 'riemannSum' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-3 sm:p-4 overflow-x-auto flex justify-center">
            <svg width="440" height="260" viewBox="0 0 440 260" className="select-none font-sans text-xs">
              <defs>
                <pattern id="riemannGrid" width="35" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 35 0 L 0 0 0 28" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="440" height="260" fill="url(#riemannGrid)" />

              {/* Axes */}
              <line x1="20" y1={originY} x2="420" y2={originY} stroke="#94A3B8" strokeWidth="1.5" />
              <line x1={originX} y1="20" x2={originX} y2="240" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Riemann Rectangles */}
              {riemannRects.rects.map((r, i) => (
                <rect
                  key={i}
                  x={r.x}
                  y={r.y}
                  width={r.width}
                  height={r.height}
                  fill="#4F7CFF"
                  fillOpacity="0.25"
                  stroke="#4F7CFF"
                  strokeWidth="1"
                />
              ))}

              {/* Function Curve */}
              <path d={curvePath} fill="none" stroke="#2563EB" strokeWidth="3" />

              {/* Limits a and b markers */}
              <line x1={toSvgX(lowerA)} y1={originY - 6} x2={toSvgX(lowerA)} y2={originY + 6} stroke="#EF4444" strokeWidth="2" />
              <text x={toSvgX(lowerA) - 6} y={originY + 18} fill="#EF4444" fontWeight="bold" fontSize="10">a</text>

              <line x1={toSvgX(upperB)} y1={originY - 6} x2={toSvgX(upperB)} y2={originY + 6} stroke="#EF4444" strokeWidth="2" />
              <text x={toSvgX(upperB) - 6} y={originY + 18} fill="#EF4444" fontWeight="bold" fontSize="10">b</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-[#172033]">
                <span>Rectangles (Subdivisions n)</span>
                <span className="font-mono text-[#4F7CFF] font-black">{riemannN}</span>
              </div>
              <input
                type="range"
                min="4"
                max="50"
                step="2"
                value={riemannN}
                onChange={(e) => setRiemannN(parseInt(e.target.value))}
                className="w-full accent-[#4F7CFF]"
              />

              <div className="flex justify-between text-xs font-bold text-[#172033] pt-2">
                <span>Integration Bounds [a, b]</span>
                <span className="font-mono text-slate-700">[{lowerA.toFixed(1)}, {upperB.toFixed(1)}]</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="-2.0"
                  max="0.0"
                  step="0.5"
                  value={lowerA}
                  onChange={(e) => setLowerA(parseFloat(e.target.value))}
                  className="w-1/2 accent-slate-600"
                />
                <input
                  type="range"
                  min="1.0"
                  max="3.5"
                  step="0.5"
                  value={upperB}
                  onChange={(e) => setUpperB(parseFloat(e.target.value))}
                  className="w-1/2 accent-slate-600"
                />
              </div>
            </div>

            <div className="bg-[#EFF4FF] p-4 rounded-2xl border border-[#4F7CFF]/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7CFF] block">
                  Definite Integral Convergence
                </span>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Riemann Area ∑ f(x_i) Δx:</span>
                    <span className="font-mono font-black text-[#4F7CFF] text-base">
                      {riemannRects.totalArea.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Strip Width Δx = (b-a)/n:</span>
                    <span className="font-mono font-bold text-[#172033]">
                      {((upperB - lowerA) / riemannN).toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-blue-900 bg-white/80 p-2.5 rounded-xl border border-blue-100">
                As <span className="font-mono font-bold">n → ∞</span>, <span className="font-mono font-bold">Δx → 0</span>, the sum of rectangle areas converges exactly to <span className="font-mono font-bold">∫_a^b f(x) dx</span>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. OPTIMIZATION ACTIVITY */}
      {activityType === 'optimization' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-3 sm:p-4 overflow-x-auto flex justify-center">
            <svg width="440" height="260" viewBox="0 0 440 260" className="select-none font-sans text-xs">
              <line x1="20" y1={originY} x2="420" y2={originY} stroke="#94A3B8" strokeWidth="1.5" />
              <line x1={originX} y1="20" x2={originX} y2="240" stroke="#94A3B8" strokeWidth="1.5" />
              <path d={curvePath} fill="none" stroke="#4F7CFF" strokeWidth="3" />

              {/* Critical Point Tangent (Horizontal) */}
              <line
                x1={toSvgX(activeCriticalPoint - 1.5)}
                y1={toSvgY(f(activeCriticalPoint))}
                x2={toSvgX(activeCriticalPoint + 1.5)}
                y2={toSvgY(f(activeCriticalPoint))}
                stroke="#10B981"
                strokeWidth="2.5"
                strokeDasharray="4,2"
              />

              <circle
                cx={toSvgX(activeCriticalPoint)}
                cy={toSvgY(f(activeCriticalPoint))}
                r="7"
                fill="#10B981"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-[#172033] block">Select Stationary Point to Test</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCriticalPoint(-1.0)}
                  className={cn(
                    'flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all',
                    activeCriticalPoint === -1.0
                      ? 'bg-[#4F7CFF] text-white border-[#4F7CFF]'
                      : 'bg-white text-[#667085] hover:text-[#172033]'
                  )}
                >
                  x = -1.0 (Local Min)
                </button>
                <button
                  onClick={() => setActiveCriticalPoint(2.0)}
                  className={cn(
                    'flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all',
                    activeCriticalPoint === 2.0
                      ? 'bg-[#4F7CFF] text-white border-[#4F7CFF]'
                      : 'bg-white text-[#667085] hover:text-[#172033]'
                  )}
                >
                  x = 2.0 (Local Max)
                </button>
              </div>
            </div>

            <div className="bg-[#EFF4FF] p-4 rounded-2xl border border-[#4F7CFF]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7CFF] block">
                Second Derivative Test
              </span>
              <div className="flex justify-between">
                <span>First derivative f'(x):</span>
                <span className="font-mono font-bold text-emerald-700">0.00 (Stationary)</span>
              </div>
              <div className="flex justify-between">
                <span>Second derivative f''(x):</span>
                <span className="font-mono font-bold text-[#172033]">
                  {d2f(activeCriticalPoint).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-blue-200">
                <span>Conclusion:</span>
                <span className={d2f(activeCriticalPoint) < 0 ? 'text-rose-600' : 'text-emerald-600'}>
                  {d2f(activeCriticalPoint) < 0 ? 'Local Maximum (Concave Down)' : 'Local Minimum (Concave Up)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. VECTOR CANVAS ACTIVITY */}
      {activityType === 'vectorCanvas' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-4 flex justify-center">
            <svg width="400" height="220" viewBox="0 0 400 220" className="select-none font-sans text-xs">
              {/* Origin at (200, 150) */}
              <line x1="50" y1="150" x2="350" y2="150" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="200" y1="30" x2="200" y2="200" stroke="#CBD5E1" strokeWidth="1.5" />

              {/* Vector A (Blue) */}
              <line
                x1="200"
                y1="150"
                x2={200 + vecA.x * 25}
                y2={150 - vecA.y * 25}
                stroke="#4F7CFF"
                strokeWidth="3"
                markerEnd="url(#arrowBlue)"
              />
              <text x={205 + vecA.x * 25} y={145 - vecA.y * 25} fill="#4F7CFF" fontWeight="black">
                a ({vecA.x}i + {vecA.y}j)
              </text>

              {/* Vector B (Amber) */}
              <line
                x1="200"
                y1="150"
                x2={200 + vecB.x * 25}
                y2={150 - vecB.y * 25}
                stroke="#F59E0B"
                strokeWidth="3"
              />
              <text x={205 + vecB.x * 25} y={145 - vecB.y * 25} fill="#D97706" fontWeight="black">
                b ({vecB.x}i + {vecB.y}j)
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-[#172033] block">Vector Coordinates</span>
              <div className="flex gap-2 items-center">
                <span className="w-12 font-bold text-[#4F7CFF]">Vec A:</span>
                <input
                  type="number"
                  value={vecA.x}
                  onChange={(e) => setVecA({ ...vecA, x: parseFloat(e.target.value) || 0 })}
                  className="w-16 px-2 py-1 rounded border text-center font-mono"
                />
                <input
                  type="number"
                  value={vecA.y}
                  onChange={(e) => setVecA({ ...vecA, y: parseFloat(e.target.value) || 0 })}
                  className="w-16 px-2 py-1 rounded border text-center font-mono"
                />
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-12 font-bold text-amber-600">Vec B:</span>
                <input
                  type="number"
                  value={vecB.x}
                  onChange={(e) => setVecB({ ...vecB, x: parseFloat(e.target.value) || 0 })}
                  className="w-16 px-2 py-1 rounded border text-center font-mono"
                />
                <input
                  type="number"
                  value={vecB.y}
                  onChange={(e) => setVecB({ ...vecB, y: parseFloat(e.target.value) || 0 })}
                  className="w-16 px-2 py-1 rounded border text-center font-mono"
                />
              </div>
            </div>

            <div className="bg-[#EFF4FF] p-4 rounded-2xl border border-[#4F7CFF]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7CFF] block">
                Vector Products
              </span>
              <div className="flex justify-between">
                <span>Dot Product (a · b):</span>
                <span className="font-mono font-black text-[#172033]">{dotProduct.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Projection of a on b:</span>
                <span className="font-mono font-black text-[#4F7CFF]">{projAonB.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Orthogonality:</span>
                <span className={dotProduct === 0 ? 'text-emerald-600 font-bold' : 'text-[#64748B]'}>
                  {dotProduct === 0 ? 'Perpendicular (a ⊥ b)' : 'Non-orthogonal'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PROBABILITY / BAYES SIMULATION */}
      {activityType === 'probabilitySimulation' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white rounded-xl border shadow-xs">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">Prior P(E₁)</span>
              <span className="text-lg font-black text-[#4F7CFF]">{(priorP1 * 100).toFixed(0)}%</span>
            </div>
            <div className="p-3 bg-white rounded-xl border shadow-xs">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">Prior P(E₂)</span>
              <span className="text-lg font-black text-amber-600">{(priorP2 * 100).toFixed(0)}%</span>
            </div>
            <div className="p-3 bg-white rounded-xl border shadow-xs">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">Posterior P(E₁|A)</span>
              <span className="text-lg font-black text-emerald-600">{(posteriorP1GivenA * 100).toFixed(1)}%</span>
            </div>
          </div>

          <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
            <div className="flex justify-between font-bold text-[#172033]">
              <span>Adjust Prior P(E₁)</span>
              <span className="font-mono text-[#4F7CFF]">{priorP1.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.1"
              value={priorP1}
              onChange={(e) => setPriorP1(parseFloat(e.target.value))}
              className="w-full accent-[#4F7CFF]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
