import React, { useState, useMemo } from 'react';
import { PhysicsActivityType, Concept } from '@/types/curriculum';
import { Zap, Eye, Sliders, Play, RotateCcw, Activity, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PhysicsActivityRendererProps {
  activityType: PhysicsActivityType;
  concept?: Concept;
  topic?: string;
  className?: string;
}

export const PhysicsActivityRenderer: React.FC<PhysicsActivityRendererProps> = ({
  activityType,
  concept,
  topic,
  className,
}) => {
  // 1. Electric Field State
  const [q1, setQ1] = useState<number>(3); // μC
  const [q2, setQ2] = useState<number>(-3); // μC
  const [separation, setSeparation] = useState<number>(140); // px

  // 2. DC Circuit State
  const [batteryV, setBatteryV] = useState<number>(12); // Volts
  const [internalR, setInternalR] = useState<number>(1); // Ω
  const [externalR, setExternalR] = useState<number>(5); // Ω
  const [switchClosed, setSwitchClosed] = useState<boolean>(true);

  // 3. Ray Optics State
  const [lensType, setLensType] = useState<'convex' | 'concave'>('convex');
  const [focalLength, setFocalLength] = useState<number>(60); // px
  const [objectDistance, setObjectDistance] = useState<number>(110); // px (u is negative)
  const [objectHeight, setObjectHeight] = useState<number>(35); // px

  // 4. Wave Optics / YDSE State
  const [wavelengthNm, setWavelengthNm] = useState<number>(600); // nm
  const [slitDistMm, setSlitDistMm] = useState<number>(0.5); // mm
  const [screenDistM, setScreenDistM] = useState<number>(1.2); // meters

  // 5. Induction Lab State
  const [magnetPos, setMagnetPos] = useState<number>(0); // -100 to 100
  const [magnetSpeed, setMagnetSpeed] = useState<number>(15); // speed

  // Electric Field Calculations
  const k = 8.99e9;
  const rMeters = separation * 0.001;
  const coulombForce = (k * Math.abs(q1 * 1e-6) * Math.abs(q2 * 1e-6)) / Math.pow(rMeters, 2);

  // Circuit Calculations
  const totalR = internalR + externalR;
  const currentI = switchClosed ? batteryV / totalR : 0;
  const terminalVoltage = switchClosed ? batteryV - currentI * internalR : batteryV;

  // Ray Optics Calculations: 1/v - 1/u = 1/f => 1/v = 1/f + 1/u (u is -objectDistance)
  const u = -objectDistance;
  const f = lensType === 'convex' ? focalLength : -focalLength;
  const invV = 1 / f + 1 / u;
  const v = invV !== 0 ? 1 / invV : 9999;
  const magnification = -v / u;
  const imageHeight = objectHeight * magnification;
  const isReal = v > 0;

  // Wave Optics Calculations: β = λD / d
  // λ in m = wavelengthNm * 1e-9, D in m = screenDistM, d in m = slitDistMm * 1e-3
  const fringeWidthMm = (wavelengthNm * 1e-9 * screenDistM) / (slitDistMm * 1e-3) * 1000;

  // Induction Calculations: induced EMF proportional to velocity
  const inducedEmf = (magnetSpeed * 0.1).toFixed(2);

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-6', className)}>
      {/* Activity Title Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] bg-[#F5F0FF] px-2.5 py-0.5 rounded-full">
              Physics Virtual Lab
            </span>
            <span className="text-xs font-bold text-[#667085]">
              {concept?.name || topic || 'Experimental Physics Engine'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#172033] mt-1">
            {activityType === 'electricFieldSimulation' && 'Electrostatic Field & Dipole Simulator'}
            {activityType === 'circuitLab' && 'Ohm\'s Law & Kirchhoff DC Circuit Lab'}
            {activityType === 'lensTracer' && 'Thin Lens Ray Optics & Image Formation Tracer'}
            {activityType === 'waveSimulation' && 'Young\'s Double Slit Interference (YDSE) Lab'}
            {activityType === 'inductionLab' && 'Faraday & Lenz Electromagnetic Induction Lab'}
          </h3>
        </div>
      </div>

      {/* 1. ELECTRIC FIELD SIMULATOR */}
      {activityType === 'electricFieldSimulation' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-3 sm:p-4 overflow-x-auto flex justify-center">
            <svg width="440" height="220" viewBox="0 0 440 220" className="select-none font-sans text-xs">
              <rect width="440" height="220" fill="#F8FAFC" rx="12" />

              {/* Field lines representation */}
              {[-30, -15, 0, 15, 30].map((offset, idx) => (
                <path
                  key={idx}
                  d={`M ${220 - separation / 2} 110 Q 220 ${110 + offset * 3} ${220 + separation / 2} 110`}
                  fill="none"
                  stroke="#7C4DFF"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                  opacity={0.6}
                />
              ))}

              {/* Charge 1 */}
              <circle
                cx={220 - separation / 2}
                cy="110"
                r="18"
                fill={q1 >= 0 ? '#EF4444' : '#3B82F6'}
                stroke="#FFFFFF"
                strokeWidth="3"
                className="shadow-sm"
              />
              <text x={220 - separation / 2 - 8} y="114" fill="#FFFFFF" fontWeight="black" fontSize="12">
                {q1 >= 0 ? `+${q1}` : q1}
              </text>

              {/* Charge 2 */}
              <circle
                cx={220 + separation / 2}
                cy="110"
                r="18"
                fill={q2 >= 0 ? '#EF4444' : '#3B82F6'}
                stroke="#FFFFFF"
                strokeWidth="3"
                className="shadow-sm"
              />
              <text x={220 + separation / 2 - 8} y="114" fill="#FFFFFF" fontWeight="black" fontSize="12">
                {q2 >= 0 ? `+${q2}` : q2}
              </text>

              {/* Distance arrow */}
              <line
                x1={220 - separation / 2}
                y1="165"
                x2={220 + separation / 2}
                y2="165"
                stroke="#64748B"
                strokeWidth="1.5"
              />
              <text x="210" y="180" fill="#64748B" fontWeight="bold" fontSize="10">
                r = {separation} mm
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between font-bold text-[#172033]">
                <span>Charge q₁ (Red: +, Blue: -)</span>
                <span className="font-mono text-[#7C4DFF]">{q1} μC</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={q1}
                onChange={(e) => setQ1(parseInt(e.target.value))}
                className="w-full accent-[#7C4DFF]"
              />

              <div className="flex justify-between font-bold text-[#172033] pt-2">
                <span>Charge q₂</span>
                <span className="font-mono text-[#7C4DFF]">{q2} μC</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={q2}
                onChange={(e) => setQ2(parseInt(e.target.value))}
                className="w-full accent-[#7C4DFF]"
              />

              <div className="flex justify-between font-bold text-[#172033] pt-2">
                <span>Separation distance r</span>
                <span className="font-mono text-slate-700">{separation} mm</span>
              </div>
              <input
                type="range"
                min="60"
                max="220"
                step="10"
                value={separation}
                onChange={(e) => setSeparation(parseInt(e.target.value))}
                className="w-full accent-slate-600"
              />
            </div>

            <div className="bg-[#F5F0FF] p-4 rounded-2xl border border-[#7C4DFF]/20 flex flex-col justify-between text-xs">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] block">
                  Coulombic Force Readout
                </span>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Electrostatic Force (F):</span>
                    <span className="font-mono font-black text-[#7C4DFF] text-base">
                      {coulombForce.toFixed(1)} N
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Interaction Nature:</span>
                    <span className={q1 * q2 < 0 ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                      {q1 * q2 < 0 ? 'Attractive (Opposite Charges)' : q1 * q2 > 0 ? 'Repulsive (Like Charges)' : 'Zero Force'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-purple-950 bg-white/80 p-2.5 rounded-xl border border-purple-100">
                Formula: <span className="font-mono font-bold">F = (1/4πε₀) · (|q₁ q₂| / r²)</span>. Inverse square law implies doubling distance quarters force.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CIRCUIT LAB */}
      {activityType === 'circuitLab' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-4 flex justify-center">
            <svg width="400" height="200" viewBox="0 0 400 200" className="select-none font-sans text-xs">
              <rect x="50" y="40" width="300" height="120" fill="none" stroke="#64748B" strokeWidth="2.5" rx="10" />

              {/* Battery on Left */}
              <rect x="40" y="80" width="20" height="40" fill="#FFFFFF" />
              <line x1="42" y1="88" x2="58" y2="88" stroke="#EF4444" strokeWidth="3" />
              <line x1="46" y1="102" x2="54" y2="102" stroke="#1E293B" strokeWidth="3" />
              <text x="15" y="105" fill="#EF4444" fontWeight="bold" fontSize="10">{batteryV} V</text>

              {/* Resistor R on Top */}
              <rect x="170" y="30" width="60" height="20" fill="#FFFFFF" stroke="#7C4DFF" strokeWidth="2" rx="4" />
              <text x="185" y="44" fill="#7C4DFF" fontWeight="bold" fontSize="10">R = {externalR} Ω</text>

              {/* Switch on Bottom */}
              <rect x="175" y="150" width="50" height="20" fill="#FFFFFF" />
              <line
                x1="180"
                y1="160"
                x2={switchClosed ? 220 : 210}
                y2={switchClosed ? 160 : 145}
                stroke={switchClosed ? '#10B981' : '#EF4444'}
                strokeWidth="3"
              />
              <text x="180" y="180" fill={switchClosed ? '#10B981' : '#EF4444'} fontWeight="bold" fontSize="10">
                {switchClosed ? 'Closed' : 'Open'}
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#172033]">Switch Control</span>
                <button
                  onClick={() => setSwitchClosed(!switchClosed)}
                  className={cn(
                    'px-3 py-1 rounded-full font-black text-[11px] transition-all',
                    switchClosed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  )}
                >
                  {switchClosed ? 'Switch: CLOSED' : 'Switch: OPEN'}
                </button>
              </div>

              <div className="flex justify-between font-bold text-[#172033] pt-2">
                <span>External Resistance (R)</span>
                <span className="font-mono text-[#7C4DFF]">{externalR} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={externalR}
                onChange={(e) => setExternalR(parseInt(e.target.value))}
                className="w-full accent-[#7C4DFF]"
              />

              <div className="flex justify-between font-bold text-[#172033] pt-2">
                <span>Internal Resistance (r)</span>
                <span className="font-mono text-slate-700">{internalR} Ω</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={internalR}
                onChange={(e) => setInternalR(parseFloat(e.target.value))}
                className="w-full accent-slate-600"
              />
            </div>

            <div className="bg-[#F5F0FF] p-4 rounded-2xl border border-[#7C4DFF]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] block">
                Meters & Ohm's Law
              </span>
              <div className="flex justify-between">
                <span>Circuit Current (I = E / (R + r)):</span>
                <span className="font-mono font-black text-[#7C4DFF] text-base">{currentI.toFixed(2)} A</span>
              </div>
              <div className="flex justify-between">
                <span>Terminal Voltage (V = E - Ir):</span>
                <span className="font-mono font-bold text-[#172033]">{terminalVoltage.toFixed(2)} V</span>
              </div>
              <div className="flex justify-between">
                <span>Power Dissipated (P = I²R):</span>
                <span className="font-mono font-bold text-amber-700">{(currentI ** 2 * externalR).toFixed(2)} W</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. LENS TRACER */}
      {activityType === 'lensTracer' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-3 sm:p-4 overflow-x-auto flex justify-center">
            <svg width="440" height="220" viewBox="0 0 440 220" className="select-none font-sans text-xs">
              {/* Principal Axis */}
              <line x1="20" y1="110" x2="420" y2="110" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Lens at x = 220 */}
              <line x1="220" y1="20" x2="220" y2="200" stroke="#7C4DFF" strokeWidth="3" />
              <text x="210" y="16" fill="#7C4DFF" fontWeight="bold" fontSize="10">Lens</text>

              {/* Foci F1 and F2 */}
              <circle cx={220 - focalLength} cy="110" r="3" fill="#EF4444" />
              <text x={220 - focalLength - 6} y="125" fill="#EF4444" fontSize="10">F₁</text>
              <circle cx={220 + focalLength} cy="110" r="3" fill="#EF4444" />
              <text x={220 + focalLength - 6} y="125" fill="#EF4444" fontSize="10">F₂</text>

              {/* Object Arrow at (220 - objectDistance, 110) */}
              <line
                x1={220 - objectDistance}
                y1="110"
                x2={220 - objectDistance}
                y2={110 - objectHeight}
                stroke="#3B82F6"
                strokeWidth="3.5"
              />
              <polygon
                points={`${220 - objectDistance - 4},${110 - objectHeight + 6} ${220 - objectDistance + 4},${110 - objectHeight + 6} ${220 - objectDistance},${110 - objectHeight}`}
                fill="#3B82F6"
              />
              <text x={220 - objectDistance - 15} y={110 - objectHeight - 4} fill="#3B82F6" fontWeight="bold">
                Object
              </text>

              {/* Image Arrow */}
              {Math.abs(v) < 200 && (
                <>
                  <line
                    x1={220 + v}
                    y1="110"
                    x2={220 + v}
                    y2={110 - imageHeight}
                    stroke="#10B981"
                    strokeWidth="3.5"
                  />
                  <text x={220 + v - 10} y={imageHeight > 0 ? 110 - imageHeight - 6 : 110 - imageHeight + 14} fill="#10B981" fontWeight="bold">
                    Image ({isReal ? 'Real' : 'Virtual'})
                  </text>
                </>
              )}
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between font-bold text-[#172033]">
                <span>Object Distance u (cm)</span>
                <span className="font-mono text-[#7C4DFF]">-{objectDistance} cm</span>
              </div>
              <input
                type="range"
                min="40"
                max="180"
                step="5"
                value={objectDistance}
                onChange={(e) => setObjectDistance(parseInt(e.target.value))}
                className="w-full accent-[#7C4DFF]"
              />

              <div className="flex justify-between font-bold text-[#172033] pt-2">
                <span>Focal Length f (cm)</span>
                <span className="font-mono text-slate-700">{focalLength} cm</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="5"
                value={focalLength}
                onChange={(e) => setFocalLength(parseInt(e.target.value))}
                className="w-full accent-slate-600"
              />
            </div>

            <div className="bg-[#F5F0FF] p-4 rounded-2xl border border-[#7C4DFF]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] block">
                Image Optics Readout
              </span>
              <div className="flex justify-between">
                <span>Image Distance (v):</span>
                <span className="font-mono font-black text-[#7C4DFF]">{v.toFixed(1)} cm</span>
              </div>
              <div className="flex justify-between">
                <span>Magnification (m = v/u):</span>
                <span className="font-mono font-black text-[#172033]">{magnification.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Image Nature:</span>
                <span className="font-bold text-emerald-700">
                  {isReal ? 'Real, Inverted' : 'Virtual, Erect'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. WAVE SIMULATION (YDSE) */}
      {activityType === 'waveSimulation' && (
        <div className="space-y-6">
          <div className="bg-[#111827] rounded-2xl border border-slate-700 p-4 flex flex-col items-center">
            {/* Interference Fringes Visualization */}
            <div className="w-full h-16 rounded-xl overflow-hidden flex">
              {Array.from({ length: 28 }).map((_, i) => {
                const intensity = Math.cos((i - 14) * 0.4) ** 2;
                return (
                  <div
                    key={i}
                    className="flex-1 h-full"
                    style={{
                      backgroundColor: '#7C4DFF',
                      opacity: intensity,
                    }}
                  />
                );
              })}
            </div>
            <span className="text-[11px] text-slate-400 mt-2">
              Interference Fringe Pattern on Screen
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between font-bold text-[#172033]">
                <span>Wavelength λ (nm)</span>
                <span className="font-mono text-[#7C4DFF]">{wavelengthNm} nm</span>
              </div>
              <input
                type="range"
                min="400"
                max="750"
                step="25"
                value={wavelengthNm}
                onChange={(e) => setWavelengthNm(parseInt(e.target.value))}
                className="w-full accent-[#7C4DFF]"
              />

              <div className="flex justify-between font-bold text-[#172033] pt-2">
                <span>Slit Separation d (mm)</span>
                <span className="font-mono text-slate-700">{slitDistMm} mm</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.5"
                step="0.1"
                value={slitDistMm}
                onChange={(e) => setSlitDistMm(parseFloat(e.target.value))}
                className="w-full accent-slate-600"
              />
            </div>

            <div className="bg-[#F5F0FF] p-4 rounded-2xl border border-[#7C4DFF]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] block">
                Fringe Width Calculation
              </span>
              <div className="flex justify-between">
                <span>Fringe Width (β = λD/d):</span>
                <span className="font-mono font-black text-[#7C4DFF] text-base">{fringeWidthMm.toFixed(2)} mm</span>
              </div>
              <div className="flex justify-between">
                <span>Angular Fringe Width (θ = λ/d):</span>
                <span className="font-mono font-bold text-[#172033]">{(wavelengthNm * 1e-6 / slitDistMm).toFixed(4)} rad</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. INDUCTION LAB */}
      {activityType === 'inductionLab' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-4 flex justify-center">
            <svg width="400" height="180" viewBox="0 0 400 180" className="select-none font-sans text-xs">
              {/* Coil Loops */}
              {Array.from({ length: 6 }).map((_, idx) => (
                <ellipse
                  key={idx}
                  cx={240 + idx * 14}
                  cy="90"
                  rx="8"
                  ry="35"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3"
                />
              ))}

              {/* Bar Magnet */}
              <rect
                x={80 + magnetPos}
                y="75"
                width="80"
                height="30"
                fill="#EF4444"
                rx="4"
              />
              <rect
                x={120 + magnetPos}
                y="75"
                width="40"
                height="30"
                fill="#3B82F6"
                rx="4"
              />
              <text x={95 + magnetPos} y="94" fill="#FFFFFF" fontWeight="black">N</text>
              <text x={135 + magnetPos} y="94" fill="#FFFFFF" fontWeight="black">S</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between font-bold text-[#172033]">
                <span>Move Magnet Towards Coil</span>
                <span className="font-mono text-[#7C4DFF]">{magnetPos} px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={magnetPos}
                onChange={(e) => setMagnetPos(parseInt(e.target.value))}
                className="w-full accent-[#7C4DFF]"
              />
            </div>

            <div className="bg-[#F5F0FF] p-4 rounded-2xl border border-[#7C4DFF]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] block">
                Faraday's Law Readout
              </span>
              <div className="flex justify-between">
                <span>Induced EMF (ε = -dΦ/dt):</span>
                <span className="font-mono font-black text-[#7C4DFF] text-base">{inducedEmf} V</span>
              </div>
              <div className="flex justify-between">
                <span>Lenz Law Opposing Field:</span>
                <span className="font-bold text-amber-700">Repulsive North Pole Induced</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
