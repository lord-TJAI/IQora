import React, { useState, useMemo } from 'react';
import { Zap, Activity, Eye, Sliders, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/cn';

export type PhysicsLabMode = 'electric_field' | 'dc_circuit' | 'ray_optics';

export const PhysicsLabEngine: React.FC = () => {
  const [mode, setMode] = useState<PhysicsLabMode>('electric_field');

  // Mode 1: Electric Field state
  const [q1, setQ1] = useState<number>(3); // microcoulombs
  const [q2, setQ2] = useState<number>(-3);
  const [separation, setSeparation] = useState<number>(140); // distance in px

  // Mode 2: DC Circuit state
  const [batteryV, setBatteryV] = useState<number>(12); // Volts
  const [internalR, setInternalR] = useState<number>(1); // Ohms
  const [externalR, setExternalR] = useState<number>(5); // Ohms
  const [switchClosed, setSwitchClosed] = useState<boolean>(true);

  // Mode 3: Ray Optics state
  const [lensType, setLensType] = useState<'convex' | 'concave'>('convex');
  const [focalLength, setFocalLength] = useState<number>(60); // px
  const [objectDistance, setObjectDistance] = useState<number>(110); // px (u is negative)
  const [objectHeight, setObjectHeight] = useState<number>(35); // px

  // Electric Field Calculations
  const k = 8.99e9;
  const rMeters = separation * 0.001;
  const coulombForce = (k * Math.abs(q1 * 1e-6) * Math.abs(q2 * 1e-6)) / Math.pow(rMeters, 2);

  // Circuit Calculations
  const totalR = internalR + externalR;
  const currentI = switchClosed ? batteryV / totalR : 0;
  const terminalVoltage = switchClosed ? batteryV - currentI * internalR : batteryV;

  // Ray Optics Calculations: 1/v - 1/u = 1/f  =>  1/v = 1/f + 1/u (u is -objectDistance)
  const u = -objectDistance;
  const f = lensType === 'convex' ? focalLength : -focalLength;
  const invV = 1 / f + 1 / u;
  const v = invV !== 0 ? 1 / invV : 9999;
  const magnification = -v / u;
  const imageHeight = objectHeight * magnification;
  const isReal = v > 0;

  return (
    <div className="space-y-4">
      {/* Tab Selectors */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-1 border-b border-slate-100">
        <div className="flex items-center gap-1.5 bg-[#F5F0FF] p-1 rounded-xl text-xs font-bold text-[#7C4DFF]">
          <button
            onClick={() => setMode('electric_field')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'electric_field' ? 'bg-[#7C4DFF] text-white shadow-xs font-black' : 'hover:text-purple-900'
            )}
          >
            Electrostatic Field & Dipole
          </button>
          <button
            onClick={() => setMode('dc_circuit')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'dc_circuit' ? 'bg-[#7C4DFF] text-white shadow-xs font-black' : 'hover:text-purple-900'
            )}
          >
            Current & Circuit Lab
          </button>
          <button
            onClick={() => setMode('ray_optics')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'ray_optics' ? 'bg-[#7C4DFF] text-white shadow-xs font-black' : 'hover:text-purple-900'
            )}
          >
            Ray Optics & Lens Tracer
          </button>
        </div>

        <span className="text-[11px] font-bold text-[#667085] hidden sm:inline">
          CBSE Class XII • Physics Virtual Lab
        </span>
      </div>

      {/* Main Canvas SVG */}
      <div className="relative h-64 sm:h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner">
        {/* =================================================================== */}
        {/* 1. ELECTRIC FIELD MODE                                              */}
        {/* =================================================================== */}
        {mode === 'electric_field' && (
          <svg className="w-full h-full" viewBox="0 0 420 240">
            {/* Field lines grid */}
            {Array.from({ length: 9 }).map((_, i) => {
              const angle = (i * Math.PI) / 4.5;
              const x1 = 210 - separation / 2;
              const x2 = 210 + separation / 2;
              const y = 120;
              const ctrlY = 120 + (i - 4) * 28;
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y} Q 210 ${ctrlY} ${x2} ${y}`}
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                  strokeDasharray="4 3"
                />
              );
            })}

            {/* Charge 1 */}
            <circle
              cx={210 - separation / 2}
              cy={120}
              r="18"
              fill={q1 >= 0 ? '#EF4444' : '#3B82F6'}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              className="drop-shadow-md"
            />
            <text
              x={210 - separation / 2}
              y={125}
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
            >
              {q1 >= 0 ? `+${q1}` : q1}μC
            </text>

            {/* Charge 2 */}
            <circle
              cx={210 + separation / 2}
              cy={120}
              r="18"
              fill={q2 >= 0 ? '#EF4444' : '#3B82F6'}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              className="drop-shadow-md"
            />
            <text
              x={210 + separation / 2}
              y={125}
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
            >
              {q2 >= 0 ? `+${q2}` : q2}μC
            </text>

            {/* Force vectors */}
            {q1 * q2 < 0 ? (
              // Attractive
              <>
                <line
                  x1={210 - separation / 2 + 20}
                  y1={120}
                  x2={210 - separation / 2 + 50}
                  y2={120}
                  stroke="#F59E0B"
                  strokeWidth="3"
                  markerEnd="url(#arrow)"
                />
                <line
                  x1={210 + separation / 2 - 20}
                  y1={120}
                  x2={210 + separation / 2 - 50}
                  y2={120}
                  stroke="#F59E0B"
                  strokeWidth="3"
                />
              </>
            ) : (
              // Repulsive
              <>
                <line
                  x1={210 - separation / 2 - 20}
                  y1={120}
                  x2={210 - separation / 2 - 50}
                  y2={120}
                  stroke="#F59E0B"
                  strokeWidth="3"
                />
                <line
                  x1={210 + separation / 2 + 20}
                  y1={120}
                  x2={210 + separation / 2 + 50}
                  y2={120}
                  stroke="#F59E0B"
                  strokeWidth="3"
                />
              </>
            )}
          </svg>
        )}

        {/* =================================================================== */}
        {/* 2. DC CIRCUIT MODE                                                  */}
        {/* =================================================================== */}
        {mode === 'dc_circuit' && (
          <svg className="w-full h-full" viewBox="0 0 420 240">
            {/* Wire Loop */}
            <rect
              x="60"
              y="50"
              width="300"
              height="140"
              rx="12"
              fill="none"
              stroke="#475569"
              strokeWidth="3"
            />

            {/* Battery on Left Wire */}
            <rect x="52" y="100" width="16" height="40" fill="#0F172A" />
            <line x1="45" y1="110" x2="75" y2="110" stroke="#EF4444" strokeWidth="4" />
            <line x1="52" y1="130" x2="68" y2="130" stroke="#3B82F6" strokeWidth="3" />
            <text x="35" y="125" fill="#EF4444" fontSize="10" fontWeight="bold">+</text>
            <text x="35" y="145" fill="#3B82F6" fontSize="10" fontWeight="bold">−</text>
            <text x="80" y="125" fill="#F8FAFC" fontSize="10" fontWeight="bold">
              {batteryV}V (r={internalR}Ω)
            </text>

            {/* Resistor on Right Wire */}
            <rect x="350" y="90" width="20" height="60" rx="4" fill="#F59E0B" stroke="#FFF" strokeWidth="1.5" />
            <text x="320" y="125" fill="#F59E0B" fontSize="11" fontWeight="bold">
              R = {externalR}Ω
            </text>

            {/* Switch on Top Wire */}
            <rect x="180" y="44" width="40" height="12" fill="#0F172A" />
            <line
              x1="185"
              y1="50"
              x2={switchClosed ? 215 : 205}
              y2={switchClosed ? 50 : 35}
              stroke={switchClosed ? '#10B981' : '#EF4444'}
              strokeWidth="3"
            />
            <text x="185" y="32" fill={switchClosed ? '#10B981' : '#EF4444'} fontSize="9" fontWeight="bold">
              {switchClosed ? 'Switch CLOSED' : 'Switch OPEN'}
            </text>

            {/* Ammeter on Bottom Wire */}
            <circle cx="210" cy="190" r="18" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <text x="210" y="194" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">
              A
            </text>

            {/* Animated current dots if closed */}
            {switchClosed && (
              <>
                <circle cx="120" cy="50" r="3" fill="#FACC15" className="animate-ping" />
                <circle cx="360" cy="70" r="3" fill="#FACC15" className="animate-ping" />
                <circle cx="280" cy="190" r="3" fill="#FACC15" className="animate-ping" />
              </>
            )}
          </svg>
        )}

        {/* =================================================================== */}
        {/* 3. RAY OPTICS MODE                                                  */}
        {/* =================================================================== */}
        {mode === 'ray_optics' && (
          <svg className="w-full h-full" viewBox="0 0 420 240">
            {/* Principal Axis */}
            <line x1="10" y1="120" x2="410" y2="120" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3" />

            {/* Lens at center x = 210 */}
            <line x1="210" y1="30" x2="210" y2="210" stroke="#38BDF8" strokeWidth="3" />
            <path
              d={lensType === 'convex' ? 'M 205 30 Q 215 120 205 210 M 215 30 Q 205 120 215 210' : 'M 215 30 Q 205 120 215 210 M 205 30 Q 215 120 205 210'}
              stroke="#38BDF8"
              strokeWidth="2"
              fill="none"
            />

            {/* Focal points F1 and F2 */}
            <circle cx={210 - focalLength} cy="120" r="3" fill="#A855F7" />
            <text x={210 - focalLength - 4} y="136" fill="#C084FC" fontSize="9" fontWeight="bold">F₁</text>
            <circle cx={210 + focalLength} cy="120" r="3" fill="#A855F7" />
            <text x={210 + focalLength - 4} y="136" fill="#C084FC" fontSize="9" fontWeight="bold">F₂</text>

            {/* Object Arrow at x = 210 - objectDistance */}
            <line
              x1={210 - objectDistance}
              y1="120"
              x2={210 - objectDistance}
              y2={120 - objectHeight}
              stroke="#10B981"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <polygon
              points={`${210 - objectDistance - 4},${120 - objectHeight + 6} ${210 - objectDistance + 4},${120 - objectHeight + 6} ${210 - objectDistance},${120 - objectHeight}`}
              fill="#10B981"
            />
            <text x={210 - objectDistance - 10} y={115 - objectHeight} fill="#34D399" fontSize="9" fontWeight="bold">
              Object
            </text>

            {/* Rays */}
            {/* Ray 1: Parallel to axis then through F2 */}
            <line
              x1={210 - objectDistance}
              y1={120 - objectHeight}
              x2="210"
              y2={120 - objectHeight}
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            <line
              x1="210"
              y1={120 - objectHeight}
              x2={210 + v}
              y2={120 + imageHeight}
              stroke="#F59E0B"
              strokeWidth="1.5"
            />

            {/* Ray 2: Through optical center O (210, 120) */}
            <line
              x1={210 - objectDistance}
              y1={120 - objectHeight}
              x2={210 + v}
              y2={120 + imageHeight}
              stroke="#EC4899"
              strokeWidth="1.5"
            />

            {/* Image Arrow */}
            {Math.abs(v) < 190 && (
              <>
                <line
                  x1={210 + v}
                  y1="120"
                  x2={210 + v}
                  y2={120 + imageHeight}
                  stroke={isReal ? '#38BDF8' : '#F43F5E'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={isReal ? 'none' : '4 3'}
                />
                <text x={210 + v - 8} y={120 + imageHeight + (imageHeight > 0 ? 14 : -6)} fill={isReal ? '#7DD3FC' : '#FB7185'} fontSize="9" fontWeight="bold">
                  Image ({isReal ? 'Real' : 'Virtual'})
                </text>
              </>
            )}
          </svg>
        )}

        {/* Live Lab Telemetry HUD */}
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 shadow-md space-y-1">
          {mode === 'electric_field' && (
            <>
              <div className="text-purple-400 font-bold">Coulomb Electrostatic Force:</div>
              <div className="flex items-center gap-2">
                <span>Distance r:</span>
                <span className="text-sky-400">{rMeters.toFixed(3)} m</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Force Magnitude:</span>
                <span className="font-black text-amber-400">{coulombForce.toFixed(1)} N</span>
                <span className="text-[10px] text-slate-400">({q1 * q2 < 0 ? 'Attractive' : 'Repulsive'})</span>
              </div>
            </>
          )}

          {mode === 'dc_circuit' && (
            <>
              <div className="text-sky-400 font-bold">Circuit Measurements:</div>
              <div className="flex items-center gap-2">
                <span>Current (I):</span>
                <span className="text-emerald-400 font-black">{currentI.toFixed(2)} A</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Terminal V = E - Ir:</span>
                <span className="text-amber-400 font-bold">{terminalVoltage.toFixed(2)} V</span>
              </div>
            </>
          )}

          {mode === 'ray_optics' && (
            <>
              <div className="text-sky-400 font-bold">Lens Formula: 1/v − 1/u = 1/f</div>
              <div className="flex items-center gap-2">
                <span>Image Distance (v):</span>
                <span className="text-emerald-400 font-bold">{v.toFixed(1)} cm</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Magnification (m):</span>
                <span className="text-amber-400 font-bold">{magnification.toFixed(2)}x</span>
                <span className="text-[10px] text-slate-400">({isReal ? 'Inverted' : 'Erect'})</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Control Sliders */}
      <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E6EAF0]">
        {mode === 'electric_field' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Source Charge q₁</span>
                <span className="font-mono text-rose-600">{q1 > 0 ? `+${q1}` : q1} μC</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={q1}
                onChange={(e) => setQ1(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Test Charge q₂</span>
                <span className="font-mono text-blue-600">{q2 > 0 ? `+${q2}` : q2} μC</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={q2}
                onChange={(e) => setQ2(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Separation Distance (r)</span>
                <span className="font-mono text-purple-600">{separation} mm</span>
              </div>
              <input
                type="range"
                min="60"
                max="240"
                step="10"
                value={separation}
                onChange={(e) => setSeparation(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {mode === 'dc_circuit' && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>EMF (E)</span>
                <span className="font-mono text-sky-600">{batteryV} V</span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                step="2"
                value={batteryV}
                onChange={(e) => setBatteryV(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Load Resistor (R)</span>
                <span className="font-mono text-amber-600">{externalR} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={externalR}
                onChange={(e) => setExternalR(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Internal r</span>
                <span className="font-mono text-purple-600">{internalR} Ω</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={internalR}
                onChange={(e) => setInternalR(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <button
              onClick={() => setSwitchClosed(!switchClosed)}
              className={cn(
                'w-full py-2.5 px-4 rounded-xl text-xs font-black transition-colors',
                switchClosed
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-xs'
              )}
            >
              {switchClosed ? 'OPEN SWITCH' : 'CLOSE SWITCH'}
            </button>
          </div>
        )}

        {mode === 'ray_optics' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Object Distance (u)</span>
                <span className="font-mono text-emerald-600">−{objectDistance} cm</span>
              </div>
              <input
                type="range"
                min="40"
                max="180"
                step="5"
                value={objectDistance}
                onChange={(e) => setObjectDistance(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#172033] mb-1.5">
                <span>Focal Length (f)</span>
                <span className="font-mono text-purple-600">{focalLength} cm</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="5"
                value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLensType('convex')}
                className={cn(
                  'flex-1 py-2 rounded-xl text-xs font-black transition-all',
                  lensType === 'convex' ? 'bg-[#7C4DFF] text-white shadow-xs' : 'bg-white border border-[#E6EAF0]'
                )}
              >
                Convex Lens
              </button>
              <button
                onClick={() => setLensType('concave')}
                className={cn(
                  'flex-1 py-2 rounded-xl text-xs font-black transition-all',
                  lensType === 'concave' ? 'bg-[#7C4DFF] text-white shadow-xs' : 'bg-white border border-[#E6EAF0]'
                )}
              >
                Concave Lens
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
