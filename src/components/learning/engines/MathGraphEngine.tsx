import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, TrendingUp, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export type MathMode = 'differentiation' | 'riemann_integrals' | 'optimization';

export const MathGraphEngine: React.FC = () => {
  const [mode, setMode] = useState<MathMode>('differentiation');

  // Mode 1: Differentiation state
  const [x0, setX0] = useState<number>(1.5);
  const [deltaX, setDeltaX] = useState<number>(1.2); // approaches 0

  // Mode 2: Integrals state
  const [riemannN, setRiemannN] = useState<number>(8); // number of rectangles
  const [lowerA, setLowerA] = useState<number>(-1.5);
  const [upperB, setUpperB] = useState<number>(2.5);

  // Curve: f(x) = -0.2*x^3 + 0.3*x^2 + 1.2*x + 1.5
  const f = (x: number) => -0.2 * Math.pow(x, 3) + 0.3 * Math.pow(x, 2) + 1.2 * x + 1.5;
  const df = (x: number) => -0.6 * Math.pow(x, 2) + 0.6 * x + 1.2;
  const d2f = (x: number) => -1.2 * x + 0.6;

  // Coordinate transform helpers (SVG: 420x240, origin at (180, 160), scaleX: 35, scaleY: 28)
  const originX = 180;
  const originY = 160;
  const scaleX = 35;
  const scaleY = 28;

  const toSvgX = (x: number) => originX + x * scaleX;
  const toSvgY = (y: number) => originY - y * scaleY;

  // Generate polynomial curve path
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

  return (
    <div className="space-y-4">
      {/* Visual Sub-mode Tabs */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-1 border-b border-slate-100">
        <div className="flex items-center gap-1.5 bg-[#EFF4FF] p-1 rounded-xl text-xs font-bold text-[#4F7CFF]">
          <button
            onClick={() => setMode('differentiation')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'differentiation' ? 'bg-[#4F7CFF] text-white shadow-xs font-black' : 'hover:text-blue-900'
            )}
          >
            Secant → Tangent Derivative
          </button>
          <button
            onClick={() => setMode('riemann_integrals')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'riemann_integrals' ? 'bg-[#4F7CFF] text-white shadow-xs font-black' : 'hover:text-blue-900'
            )}
          >
            Riemann Sums Area (Definite Integral)
          </button>
          <button
            onClick={() => setMode('optimization')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'optimization' ? 'bg-[#4F7CFF] text-white shadow-xs font-black' : 'hover:text-blue-900'
            )}
          >
            Extrema & Optimization
          </button>
        </div>

        <span className="text-[11px] font-bold text-[#667085] hidden sm:inline">
          CBSE Class XII • Calculus Engine
        </span>
      </div>

      {/* SVG Canvas Stage */}
      <div className="relative h-64 sm:h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner">
        <svg className="w-full h-full" viewBox="0 0 420 240">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="10" y1={originY} x2="410" y2={originY} stroke="#334155" strokeWidth="1.5" />
          <line x1={originX} y1="10" x2={originX} y2="230" stroke="#334155" strokeWidth="1.5" />

          {/* Axis labels */}
          <text x="400" y={originY - 6} fill="#64748B" fontSize="10" fontWeight="bold">x</text>
          <text x={originX + 8} y="20" fill="#64748B" fontSize="10" fontWeight="bold">y = f(x)</text>

          {/* Riemann Rectangles (Mode 2) */}
          {mode === 'riemann_integrals' &&
            riemannRects.rects.map((r, idx) => (
              <rect
                key={idx}
                x={r.x}
                y={r.y}
                width={r.width}
                height={r.height}
                fill="url(#areaGrad)"
                stroke="#38BDF8"
                strokeWidth="1"
                className="transition-all duration-150"
              />
            ))}

          {/* Main Polynomial Curve */}
          <path d={curvePath} fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />

          {/* Differentiation Mode Elements */}
          {mode === 'differentiation' && (
            <>
              {/* Secant line extending across the canvas */}
              <line
                x1={toSvgX(x0 - 2.5)}
                y1={toSvgY(y0 - secantSlope * 2.5)}
                x2={toSvgX(x1 + 2.5)}
                y2={toSvgY(y1 + secantSlope * 2.5)}
                stroke={Math.abs(deltaX) < 0.15 ? '#10B981' : '#F59E0B'}
                strokeWidth={Math.abs(deltaX) < 0.15 ? '3' : '2'}
                strokeDasharray={Math.abs(deltaX) < 0.15 ? 'none' : '4 2'}
                className="transition-all duration-150"
              />

              {/* Point P (x0, y0) */}
              <circle
                cx={toSvgX(x0)}
                cy={toSvgY(y0)}
                r="6"
                fill="#3B82F6"
                stroke="#FFFFFF"
                strokeWidth="2"
              />

              {/* Point Q (x0 + Δx, y0 + Δy) */}
              {Math.abs(deltaX) > 0.05 && (
                <circle
                  cx={toSvgX(x1)}
                  cy={toSvgY(y1)}
                  r="5"
                  fill="#F59E0B"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              )}
            </>
          )}

          {/* Optimization Mode Elements */}
          {mode === 'optimization' && (
            <>
              {/* Local Maxima & Minima points */}
              {/* df(x) = -0.6x^2 + 0.6x + 1.2 = 0 => x^2 - x - 2 = 0 => (x-2)(x+1) = 0 */}
              {/* x = -1 is Local Minima, x = 2 is Local Maxima */}
              <circle cx={toSvgX(-1)} cy={toSvgY(f(-1))} r="6" fill="#EC4899" stroke="#FFF" strokeWidth="2" />
              <text x={toSvgX(-1) - 24} y={toSvgY(f(-1)) + 18} fill="#F472B6" fontSize="10" fontWeight="bold">
                Min (-1, {f(-1).toFixed(1)})
              </text>

              <circle cx={toSvgX(2)} cy={toSvgY(f(2))} r="6" fill="#10B981" stroke="#FFF" strokeWidth="2" />
              <text x={toSvgX(2) - 16} y={toSvgY(f(2)) - 12} fill="#34D399" fontSize="10" fontWeight="bold">
                Max (2, {f(2).toFixed(1)})
              </text>

              {/* Current probe point */}
              <circle cx={toSvgX(x0)} cy={toSvgY(y0)} r="7" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
              <line
                x1={toSvgX(x0 - 2)}
                y1={toSvgY(y0 - df(x0) * 2)}
                x2={toSvgX(x0 + 2)}
                y2={toSvgY(y0 + df(x0) * 2)}
                stroke="#F59E0B"
                strokeWidth="2"
              />
            </>
          )}
        </svg>

        {/* Live Mathematical Telemetry HUD */}
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 shadow-md space-y-1">
          {mode === 'differentiation' && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-bold">Base point P:</span>
                <span>({x0.toFixed(2)}, {y0.toFixed(2)})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">Secant Slope Δy/Δx:</span>
                <span className="font-bold">{secantSlope.toFixed(3)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">Limit f'(x₀) = dy/dx:</span>
                <span className="font-black text-emerald-400">{trueTangentSlope.toFixed(3)}</span>
              </div>
              {Math.abs(deltaX) < 0.15 && (
                <div className="text-[10px] text-emerald-300 font-sans font-bold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Secant has converged to Tangent!</span>
                </div>
              )}
            </>
          )}

          {mode === 'riemann_integrals' && (
            <>
              <div className="text-sky-400 font-bold">
                ∫ f(x)dx from {lowerA} to {upperB}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">Sub-intervals (n):</span>
                <span>{riemannN}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">Approx Area Σ f(xᵢ)Δx:</span>
                <span className="font-black text-emerald-300 text-sm">{riemannRects.totalArea.toFixed(3)} sq units</span>
              </div>
            </>
          )}

          {mode === 'optimization' && (
            <>
              <div className="text-sky-400 font-bold">Probe Point x = {x0.toFixed(2)}</div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">Slope f'(x):</span>
                <span className={cn(df(x0) > 0 ? 'text-emerald-400' : 'text-rose-400')}>
                  {df(x0).toFixed(2)} ({df(x0) > 0 ? 'Increasing' : 'Decreasing'})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-400">Concavity f''(x):</span>
                <span>{d2f(x0).toFixed(2)} ({d2f(x0) < 0 ? 'Concave Down' : 'Concave Up'})</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Interactive Manipulation Sliders */}
      <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E6EAF0] space-y-3">
        {mode === 'differentiation' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Base Point (x₀)</span>
                <span className="font-mono text-[#4F7CFF]">{x0.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="3"
                step="0.1"
                value={x0}
                onChange={(e) => setX0(Number(e.target.value))}
                className="w-full accent-[#4F7CFF] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Δx (Approaches 0 for derivative)</span>
                <span className="font-mono text-amber-600">{deltaX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="2.5"
                step="0.05"
                value={deltaX}
                onChange={(e) => setDeltaX(Number(e.target.value))}
                className="w-full accent-[#F59E0B] cursor-pointer"
              />
            </div>
          </div>
        )}

        {mode === 'riemann_integrals' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Number of Partitions (n) → Limit as n → ∞</span>
                <span className="font-mono text-[#4F7CFF]">{riemannN} rectangles</span>
              </div>
              <input
                type="range"
                min="4"
                max="36"
                step="2"
                value={riemannN}
                onChange={(e) => setRiemannN(Number(e.target.value))}
                className="w-full accent-[#4F7CFF] cursor-pointer"
              />
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              <strong>CBSE Fundamental Principle:</strong> As partition width Δx → 0 (or n → ∞), the sum of rectangle areas converges exactly to the definite integral ∫ₐᵇ f(x) dx.
            </p>
          </div>
        )}

        {mode === 'optimization' && (
          <div>
            <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
              <span>Drag Probe Point along Curve</span>
              <span className="font-mono text-amber-600">x = {x0.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-2.5"
              max="3.5"
              step="0.1"
              value={x0}
              onChange={(e) => setX0(Number(e.target.value))}
              className="w-full accent-[#F59E0B] cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
