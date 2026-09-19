import React, { useState, useMemo } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/utils/cn';

export type SimulationSubject = 'physics' | 'math' | 'chemistry' | 'english';

interface InteractiveCanvasProps {
  subject?: SimulationSubject;
  topic?: string;
  className?: string;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  subject = 'physics',
  topic = 'Class 12 Visual Lab',
  className,
}) => {
  const [activeSubject, setActiveSubject] = useState<SimulationSubject>(subject);

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle overflow-hidden flex flex-col', className)}>
      {/* Simulation Header */}
      <div className="p-4 sm:px-6 border-b border-[#E6EAF0] bg-[#F7F9FC]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FFC800] text-[#172033] flex items-center justify-center font-black shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#667085]">
                Interactive Lab
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10B981]/15 text-[#059669]">
                Live Simulation
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#172033]">
              {activeSubject === 'physics' && 'Electrostatics & Projectile Dynamics'}
              {activeSubject === 'math' && 'Calculus & Curve Tangent Explorer'}
              {activeSubject === 'chemistry' && 'Galvanic Cell & Electrochemical Flow'}
              {activeSubject === 'english' && 'Passage Rhetoric & Tone Dissector'}
            </h3>
          </div>
        </div>

        {/* Subject Switcher Tabs */}
        <div className="flex items-center bg-[#E6EAF0]/70 p-1 rounded-full text-xs font-bold text-[#667085]">
          {(['physics', 'math', 'chemistry', 'english'] as SimulationSubject[]).map((subj) => (
            <button
              key={subj}
              onClick={() => setActiveSubject(subj)}
              className={cn(
                'px-3 py-1 rounded-full transition-all capitalize',
                activeSubject === subj
                  ? 'bg-white text-[#172033] shadow-xs font-black'
                  : 'hover:text-[#172033]'
              )}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {activeSubject === 'physics' && <PhysicsSimulation />}
        {activeSubject === 'math' && <MathSimulation />}
        {activeSubject === 'chemistry' && <ChemistrySimulation />}
        {activeSubject === 'english' && <EnglishSimulation />}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. PHYSICS SIMULATION: PROJECTILE & ELECTRIC FIELD DYNAMICS                */
/* -------------------------------------------------------------------------- */
const PhysicsSimulation: React.FC = () => {
  const [velocity, setVelocity] = useState<number>(24);
  const [angle, setAngle] = useState<number>(45);
  const [charge, setCharge] = useState<number>(2); // positive or negative
  const [eField, setEField] = useState<number>(1); // downward electric field

  // Calculations
  const rad = (angle * Math.PI) / 180;
  const g = 9.8 + eField * charge * 1.5; // effective downward acceleration
  const effectiveG = Math.max(2, g);

  const timeOfFlight = useMemo(() => {
    return (2 * velocity * Math.sin(rad)) / effectiveG;
  }, [velocity, rad, effectiveG]);

  const maxHeight = useMemo(() => {
    return Math.pow(velocity * Math.sin(rad), 2) / (2 * effectiveG);
  }, [velocity, rad, effectiveG]);

  const maxRange = useMemo(() => {
    return (Math.pow(velocity, 2) * Math.sin(2 * rad)) / effectiveG;
  }, [velocity, rad, effectiveG]);

  // Generate Trajectory SVG points
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const steps = 40;
    const widthScale = 380 / Math.max(60, maxRange);
    const heightScale = 140 / Math.max(25, maxHeight);

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * timeOfFlight;
      const x = velocity * Math.cos(rad) * t;
      const y = velocity * Math.sin(rad) * t - 0.5 * effectiveG * Math.pow(t, 2);
      if (y >= 0) {
        pts.push({
          x: 20 + x * widthScale,
          y: 170 - y * heightScale,
        });
      }
    }
    return pts;
  }, [velocity, rad, effectiveG, timeOfFlight, maxRange, maxHeight]);

  const pathD = points.length > 0 ? `M ${points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')}` : '';

  return (
    <div className="space-y-4">
      {/* SVG Canvas Stage */}
      <div className="relative h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Electric field background grid & arrows */}
        <div className="absolute inset-0 opacity-20 pointer-events-none grid grid-cols-6 grid-rows-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-r border-b border-purple-400/40 flex items-center justify-center">
              <span className="text-[9px] text-purple-300">↓ E-field</span>
            </div>
          ))}
        </div>

        {/* SVG Drawing */}
        <svg className="w-full h-full" viewBox="0 0 420 200">
          {/* Ground baseline */}
          <line x1="10" y1="170" x2="410" y2="170" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />

          {/* Launcher Base */}
          <circle cx="20" cy="170" r="8" fill="#7C3AED" />
          <line
            x1="20"
            y1="170"
            x2={20 + 24 * Math.cos(rad)}
            y2={170 - 24 * Math.sin(rad)}
            stroke="#FFC800"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Trajectory Path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3"
              className="transition-all duration-150"
            />
          )}

          {/* Target / Apex Marker */}
          {points.length > 10 && (
            <circle
              cx={points[Math.floor(points.length / 2)].x}
              cy={points[Math.floor(points.length / 2)].y}
              r="4"
              fill="#F43F5E"
            />
          )}

          {/* Projectile moving dot */}
          {points.length > 0 && (
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r="6"
              fill="#F59E0B"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Real-time telemetry overlay */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">Apex (H_max):</span>
            <span>{maxHeight.toFixed(1)} m</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sky-400 font-bold">Range (R):</span>
            <span>{maxRange.toFixed(1)} m</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">Flight Time:</span>
            <span>{timeOfFlight.toFixed(2)} s</span>
          </div>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#F7F9FC] p-3.5 rounded-2xl border border-[#E6EAF0]">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Launch Velocity (v₀)</span>
            <span className="text-sky-600 font-mono">{velocity} m/s</span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            className="w-full accent-[#3B82F6] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Angle (θ)</span>
            <span className="text-purple-600 font-mono">{angle}°</span>
          </div>
          <input
            type="range"
            min="15"
            max="80"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[#7C3AED] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Particle Charge (q)</span>
            <span className="text-amber-600 font-mono">+{charge} μC</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            value={charge}
            onChange={(e) => setCharge(Number(e.target.value))}
            className="w-full accent-[#F59E0B] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Electric Field (E)</span>
            <span className="text-emerald-600 font-mono">{eField} kN/C</span>
          </div>
          <input
            type="range"
            min="0"
            max="4"
            value={eField}
            onChange={(e) => setEField(Number(e.target.value))}
            className="w-full accent-[#10B981] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. MATH SIMULATION: CALCULUS CURVE & TANGENT DERIVATIVE                    */
/* -------------------------------------------------------------------------- */
const MathSimulation: React.FC = () => {
  const [a, setA] = useState<number>(0.5);
  const [b, setB] = useState<number>(-2);
  const [c, setC] = useState<number>(1);
  const [tangentX, setTangentX] = useState<number>(3);

  // y = a*x^2 + b*x + c
  // dy/dx = 2*a*x + b
  const tangentY = a * Math.pow(tangentX, 2) + b * tangentX + c;
  const slope = 2 * a * tangentX + b;
  const vertexX = -b / (2 * a || 1);
  const vertexY = a * Math.pow(vertexX, 2) + b * vertexX + c;

  // Generate polynomial points
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let x = -5; x <= 7; x += 0.25) {
      const y = a * Math.pow(x, 2) + b * x + c;
      const cx = 200 + x * 20;
      const cy = 120 - y * 8;
      pts.push({ x: cx, y: cy });
    }
    return pts;
  }, [a, b, c]);

  const curveD = `M ${points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')}`;

  // Tangent line coordinates
  const tx1 = tangentX - 2.5;
  const ty1 = tangentY - slope * 2.5;
  const tx2 = tangentX + 2.5;
  const ty2 = tangentY + slope * 2.5;

  return (
    <div className="space-y-4">
      <div className="relative h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 220">
          {/* Grid lines */}
          <line x1="0" y1="120" x2="400" y2="120" stroke="#334155" strokeWidth="1.5" />
          <line x1="200" y1="0" x2="200" y2="220" stroke="#334155" strokeWidth="1.5" />

          {/* Curve */}
          <path d={curveD} fill="none" stroke="#38BDF8" strokeWidth="3" />

          {/* Tangent line */}
          <line
            x1={200 + tx1 * 20}
            y1={120 - ty1 * 8}
            x2={200 + tx2 * 20}
            y2={120 - ty2 * 8}
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />

          {/* Tangent point */}
          <circle
            cx={200 + tangentX * 20}
            cy={120 - tangentY * 8}
            r="6"
            fill="#F59E0B"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Vertex point */}
          <circle
            cx={200 + vertexX * 20}
            cy={120 - vertexY * 8}
            r="5"
            fill="#EC4899"
          />
        </svg>

        {/* Calculus telemetry overlay */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-0.5">
          <div className="text-sky-400 font-bold">f(x) = {a}x² + {b}x + {c}</div>
          <div className="text-amber-400 font-bold">f'({tangentX}) = Slope: {slope.toFixed(2)}</div>
          <div className="text-pink-400">Vertex: ({vertexX.toFixed(1)}, {vertexY.toFixed(1)})</div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#F7F9FC] p-3.5 rounded-2xl border border-[#E6EAF0]">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Tangent Point (x)</span>
            <span className="text-amber-600 font-mono">{tangentX}</span>
          </div>
          <input
            type="range"
            min="-3"
            max="6"
            step="0.5"
            value={tangentX}
            onChange={(e) => setTangentX(Number(e.target.value))}
            className="w-full accent-[#F59E0B] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Curvature (a)</span>
            <span className="text-sky-600 font-mono">{a}</span>
          </div>
          <input
            type="range"
            min="-1"
            max="1.5"
            step="0.1"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full accent-[#3B82F6] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Linear Slope (b)</span>
            <span className="text-purple-600 font-mono">{b}</span>
          </div>
          <input
            type="range"
            min="-4"
            max="4"
            step="0.5"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full accent-[#7C3AED] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Y-Intercept (c)</span>
            <span className="text-emerald-600 font-mono">{c}</span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            step="1"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            className="w-full accent-[#10B981] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. CHEMISTRY SIMULATION: GALVANIC CELL & ELECTRON FLOW                    */
/* -------------------------------------------------------------------------- */
const ChemistrySimulation: React.FC = () => {
  const [znConc, setZnConc] = useState<number>(0.1); // Zn2+ molarity
  const [cuConc, setCuConc] = useState<number>(1.0); // Cu2+ molarity
  const [tempK, setTempK] = useState<number>(298); // Temperature in Kelvin

  // Nernst Equation: E_cell = E0 - (RT/nF) * ln(Q)
  // E0 for Zn-Cu Daniell cell = 1.10 V
  const E0 = 1.10;
  const n = 2;
  const R = 8.314;
  const F = 96485;
  const Q = znConc / cuConc;
  const Ecell = E0 - ((R * tempK) / (n * F)) * Math.log(Q);

  return (
    <div className="space-y-4">
      <div className="relative h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Anode Beaker (Zn) */}
          <rect x="50" y="70" width="100" height="95" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
          <rect x="52" y="100" width="96" height="63" rx="4" fill="#3B82F6" fillOpacity="0.25" />
          <rect x="70" y="50" width="18" height="90" rx="3" fill="#94A3B8" />
          <text x="73" y="45" fill="#94A3B8" fontSize="10" fontWeight="bold">Zn (s)</text>

          {/* Cathode Beaker (Cu) */}
          <rect x="250" y="70" width="100" height="95" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
          <rect x="252" y="100" width="96" height="63" rx="4" fill="#06B6D4" fillOpacity="0.35" />
          <rect x="312" y="50" width="18" height="90" rx="3" fill="#F97316" />
          <text x="313" y="45" fill="#F97316" fontSize="10" fontWeight="bold">Cu (s)</text>

          {/* Salt Bridge */}
          <path
            d="M 120 110 L 120 60 Q 200 40 280 60 L 280 110"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <text x="180" y="52" fill="#1E293B" fontSize="9" fontWeight="bold">KCl Salt Bridge</text>

          {/* Wire & Voltmeter */}
          <path d="M 79 50 L 79 25 L 180 25" fill="none" stroke="#EAB308" strokeWidth="2" />
          <path d="M 220 25 L 321 25 L 321 50" fill="none" stroke="#EAB308" strokeWidth="2" />
          <circle cx="200" cy="25" r="16" fill="#0F172A" stroke="#EAB308" strokeWidth="2" />
          <text x="188" y="28" fill="#FACC15" fontSize="9" fontWeight="bold">V</text>

          {/* Animated electron arrow */}
          <text x="135" y="20" fill="#38BDF8" fontSize="11" fontWeight="bold">e⁻ → →</text>
        </svg>

        {/* Nernst readout overlay */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">Cell Potential E_cell:</span>
            <span className="text-emerald-400 font-black text-sm">{Ecell.toFixed(3)} V</span>
          </div>
          <div className="text-slate-400">Standard E°: 1.100 V • Q: {Q.toFixed(2)}</div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F7F9FC] p-3.5 rounded-2xl border border-[#E6EAF0]">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>[Zn²⁺] Concentration</span>
            <span className="text-blue-600 font-mono">{znConc.toFixed(2)} M</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="2.0"
            step="0.05"
            value={znConc}
            onChange={(e) => setZnConc(Number(e.target.value))}
            className="w-full accent-[#3B82F6] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>[Cu²⁺] Concentration</span>
            <span className="text-orange-600 font-mono">{cuConc.toFixed(2)} M</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="2.0"
            step="0.05"
            value={cuConc}
            onChange={(e) => setCuConc(Number(e.target.value))}
            className="w-full accent-[#F97316] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#172033] mb-1">
            <span>Temperature</span>
            <span className="text-emerald-600 font-mono">{tempK} K ({(tempK - 273.15).toFixed(0)}°C)</span>
          </div>
          <input
            type="range"
            min="273"
            max="373"
            step="5"
            value={tempK}
            onChange={(e) => setTempK(Number(e.target.value))}
            className="w-full accent-[#10B981] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. ENGLISH SIMULATION: PASSAGE RHETORIC & TONE DISSECTOR                  */
/* -------------------------------------------------------------------------- */
const EnglishSimulation: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<'analytical' | 'empathetic' | 'critical'>('analytical');

  const words = [
    { text: 'The', type: 'neutral' },
    { text: 'unprecedented', type: 'critical', note: 'Hyperbolic adjective signaling urgency' },
    { text: 'acceleration', type: 'analytical', note: 'Scientific register quantifying rate of change' },
    { text: 'of', type: 'neutral' },
    { text: 'cognitive', type: 'analytical', note: 'Academic domain vocabulary' },
    { text: 'automation', type: 'analytical', note: 'Technological paradigm descriptor' },
    { text: 'evokes', type: 'empathetic', note: 'Affective verb tapping into human sensibility' },
    { text: 'profound', type: 'empathetic', note: 'Emotional depth modifier' },
    { text: 'trepidation', type: 'critical', note: 'Noun conveying fear and existential unease' },
    { text: 'among', type: 'neutral' },
    { text: 'traditional', type: 'neutral' },
    { text: 'artisans.', type: 'neutral' },
    { text: 'Yet,', type: 'analytical', note: 'Adversative discourse marker establishing pivot' },
    { text: 'historical', type: 'analytical', note: 'Empirical context anchor' },
    { text: 'precedent', type: 'analytical', note: 'Logical substantiation' },
    { text: 'illuminates', type: 'empathetic', note: 'Metaphorical verb suggesting clarity and hope' },
    { text: 'resilience.', type: 'empathetic', note: 'Virtue attribute affirming human perseverance' },
  ];

  const [activeWord, setActiveWord] = useState<string | null>(null);
  const activeNote = words.find((w) => w.text === activeWord)?.note;

  return (
    <div className="space-y-4">
      {/* Passage Interactive Card */}
      <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
            Class 12 Reading Comprehension • Tone Analysis
          </span>
          <span className="text-xs font-semibold text-[#6366F1]">Click highlighted words</span>
        </div>

        <p className="text-base sm:text-lg leading-loose font-serif text-[#172033]">
          {words.map((w, idx) => {
            const isTarget = w.type === selectedTone;
            return (
              <span
                key={idx}
                onClick={() => w.note && setActiveWord(w.text)}
                className={cn(
                  'cursor-pointer px-1 py-0.5 mx-0.5 rounded-md transition-all',
                  isTarget && selectedTone === 'analytical' && 'bg-sky-100 text-sky-900 font-semibold underline decoration-sky-400',
                  isTarget && selectedTone === 'empathetic' && 'bg-amber-100 text-amber-900 font-semibold underline decoration-amber-400',
                  isTarget && selectedTone === 'critical' && 'bg-rose-100 text-rose-900 font-semibold underline decoration-rose-400',
                  !isTarget && 'hover:bg-slate-200/60'
                )}
              >
                {w.text}{' '}
              </span>
            );
          })}
        </p>

        {/* Word breakdown popover */}
        {activeWord && activeNote && (
          <div className="mt-4 p-3 rounded-xl bg-white border border-[#E6EAF0] shadow-sm flex items-start justify-between gap-3 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-black text-[#172033]">"{activeWord}"</span>
              <p className="text-xs text-[#667085] mt-0.5">{activeNote}</p>
            </div>
            <button
              onClick={() => setActiveWord(null)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Tone Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-[#667085]">Filter Rhetorical Lens:</span>
        <button
          onClick={() => setSelectedTone('analytical')}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-bold transition-all',
            selectedTone === 'analytical'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'bg-white border border-[#E6EAF0] text-[#172033] hover:bg-slate-50'
          )}
        >
          Analytical (Logic & Structure)
        </button>
        <button
          onClick={() => setSelectedTone('empathetic')}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-bold transition-all',
            selectedTone === 'empathetic'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white border border-[#E6EAF0] text-[#172033] hover:bg-slate-50'
          )}
        >
          Empathetic (Human & Emotional)
        </button>
        <button
          onClick={() => setSelectedTone('critical')}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-bold transition-all',
            selectedTone === 'critical'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white border border-[#E6EAF0] text-[#172033] hover:bg-slate-50'
          )}
        >
          Critical (Urgency & Tension)
        </button>
      </div>
    </div>
  );
};
