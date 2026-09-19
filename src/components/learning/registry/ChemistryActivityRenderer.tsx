import React, { useState } from 'react';
import { ChemistryActivityType, Concept } from '@/types/curriculum';
import { Layers, Sparkles, Plus, Trash2, ArrowRight, RotateCw, CheckCircle2, FlaskConical } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ChemistryActivityRendererProps {
  activityType: ChemistryActivityType;
  concept?: Concept;
  topic?: string;
  className?: string;
}

interface Ligand {
  name: string;
  formula: string;
  iupacName: string;
  charge: number;
  denticity: number;
  color: string;
}

const AVAILABLE_LIGANDS: Ligand[] = [
  { name: 'Ammine', formula: 'NH₃', iupacName: 'ammine', charge: 0, denticity: 1, color: '#38BDF8' },
  { name: 'Cyanido', formula: 'CN⁻', iupacName: 'cyanido', charge: -1, denticity: 1, color: '#F43F5E' },
  { name: 'Chlorido', formula: 'Cl⁻', iupacName: 'chlorido', charge: -1, denticity: 1, color: '#10B981' },
  { name: 'Aqua', formula: 'H₂O', iupacName: 'aqua', charge: 0, denticity: 1, color: '#60A5FA' },
  { name: 'Oxalato', formula: 'ox²⁻', iupacName: 'oxalato', charge: -2, denticity: 2, color: '#F59E0B' },
];

export const ChemistryActivityRenderer: React.FC<ChemistryActivityRendererProps> = ({
  activityType,
  concept,
  topic,
  className,
}) => {
  // 1. Coordination Builder State
  const [metal, setMetal] = useState<{ symbol: string; name: string; oxState: number }>({
    symbol: 'Co',
    name: 'cobalt',
    oxState: 3,
  });
  const [ligands, setLigands] = useState<Ligand[]>([
    AVAILABLE_LIGANDS[0],
    AVAILABLE_LIGANDS[0],
    AVAILABLE_LIGANDS[0],
    AVAILABLE_LIGANDS[0],
    AVAILABLE_LIGANDS[0],
    AVAILABLE_LIGANDS[0],
  ]); // Default [Co(NH3)6]3+

  // 2. Reaction Explorer State
  const [organicStep, setOrganicStep] = useState<number>(1);
  const [selectedMechanism, setSelectedMechanism] = useState<'sn1' | 'sn2'>('sn2');

  // 3. Electrochemical Cell State
  const [znConc, setZnConc] = useState<number>(0.1);
  const [cuConc, setCuConc] = useState<number>(1.0);

  // 4. Particle Collision State
  const [temperatureK, setTemperatureK] = useState<number>(300);
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);

  // Coordination Calculations
  const coordinationNumber = ligands.reduce((acc, l) => acc + l.denticity, 0);
  const totalLigandCharge = ligands.reduce((acc, l) => acc + l.charge, 0);
  const complexCharge = metal.oxState + totalLigandCharge;

  const geometry =
    coordinationNumber === 6
      ? 'Octahedral (d²sp³ / sp³d²)'
      : coordinationNumber === 4
      ? metal.symbol === 'Pt' || (metal.symbol === 'Ni' && ligands.some((l) => l.formula === 'CN⁻'))
        ? 'Square Planar (dsp²)'
        : 'Tetrahedral (sp³)'
      : `Coordination ${coordinationNumber}`;

  // Electrochemical Calculations
  const eStandard = 1.10;
  const qQuotient = znConc / cuConc;
  const nernstE = eStandard - (0.0591 / 2) * Math.log10(qQuotient);

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-6', className)}>
      {/* Activity Title Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#20C997] bg-[#E8F9F4] px-2.5 py-0.5 rounded-full">
              Chemistry Molecular World
            </span>
            <span className="text-xs font-bold text-[#667085]">
              {concept?.name || topic || 'Molecular & Electrochemical Lab'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#172033] mt-1">
            {activityType === 'coordinationBuilder' && 'Coordination Complex 3D Builder & IUPAC Lab'}
            {activityType === 'reactionExplorer' && 'Organic Reaction Mechanism & Transition State Explorer'}
            {activityType === 'electrochemicalCell' && 'Galvanic Daniell Cell & Nernst Equation Lab'}
            {activityType === 'particleCollisionSimulation' && 'Arrhenius Collision Theory & Kinetics Simulator'}
          </h3>
        </div>
      </div>

      {/* 1. COORDINATION BUILDER */}
      {activityType === 'coordinationBuilder' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-4 flex flex-col items-center">
            {/* Coordination Complex Visualization */}
            <div className="relative w-64 h-52 flex items-center justify-center">
              {/* Central Metal Ion */}
              <div className="w-16 h-16 rounded-full bg-[#172033] text-white flex flex-col items-center justify-center font-black text-sm shadow-md z-10">
                <span>{metal.symbol}</span>
                <span className="text-[10px] text-amber-300">+{metal.oxState}</span>
              </div>

              {/* Surrounding Ligands */}
              {ligands.slice(0, 6).map((lig, idx) => {
                const angle = (idx * (360 / Math.min(ligands.length, 6))) * (Math.PI / 180);
                const r = 75;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;

                return (
                  <div
                    key={idx}
                    className="absolute flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-xs shadow-sm transition-all"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      backgroundColor: lig.color,
                    }}
                    title={lig.name}
                  >
                    {lig.formula}
                  </div>
                );
              })}
            </div>

            {/* Formula & Charge Badge */}
            <div className="mt-2 text-center">
              <span className="text-xs font-mono font-black text-[#172033] bg-[#E8F9F4] px-3 py-1 rounded-full border border-[#20C997]/30">
                [{metal.symbol}({ligands.map((l) => l.formula).join('')})]{complexCharge >= 0 ? `+${complexCharge}` : complexCharge}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-[#172033] block">Select Central Metal Ion</span>
              <div className="flex gap-2">
                {[
                  { symbol: 'Co', name: 'cobalt', oxState: 3 },
                  { symbol: 'Fe', name: 'iron', oxState: 3 },
                  { symbol: 'Ni', name: 'nickel', oxState: 2 },
                  { symbol: 'Pt', name: 'platinum', oxState: 2 },
                ].map((m) => (
                  <button
                    key={m.symbol}
                    onClick={() => setMetal(m)}
                    className={cn(
                      'flex-1 py-1.5 rounded-xl font-bold border transition-all text-xs',
                      metal.symbol === m.symbol
                        ? 'bg-[#20C997] text-white border-[#20C997]'
                        : 'bg-white text-slate-700 hover:border-slate-400'
                    )}
                  >
                    {m.symbol} ({m.oxState}+)
                  </button>
                ))}
              </div>

              <span className="font-bold text-[#172033] block pt-2">Add Ligands</span>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_LIGANDS.map((lig) => (
                  <button
                    key={lig.name}
                    onClick={() => {
                      if (ligands.length < 6) setLigands([...ligands, lig]);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 font-bold text-[11px] text-slate-700 transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3 text-emerald-600" />
                    <span>{lig.formula}</span>
                  </button>
                ))}
                <button
                  onClick={() => setLigands([])}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[11px] hover:bg-rose-100 transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </div>
            </div>

            <div className="bg-[#E8F9F4] p-4 rounded-2xl border border-[#20C997]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#059669] block">
                Complex Properties & Geometry
              </span>
              <div className="flex justify-between">
                <span>Coordination Number:</span>
                <span className="font-mono font-black text-[#172033]">{coordinationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Molecular Geometry:</span>
                <span className="font-mono font-black text-[#059669]">{geometry}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Complex Charge:</span>
                <span className="font-mono font-bold text-[#172033]">{complexCharge}</span>
              </div>
              <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-950">
                💡 <strong>Hybridization:</strong> Coordination 6 uses inner <span className="font-mono font-bold">d²sp³</span> (strong field) or outer <span className="font-mono font-bold">sp³d²</span> (weak field) orbitals.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. REACTION EXPLORER */}
      {activityType === 'reactionExplorer' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between gap-4">
              {/* Reactant */}
              <div className="flex-1 p-3 bg-white rounded-xl border text-center shadow-xs">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Substrate</span>
                <span className="font-mono font-bold text-sm text-[#172033]">
                  {selectedMechanism === 'sn2' ? 'CH₃-Cl (1° Alkyl Halide)' : '(CH₃)₃C-Cl (3° Alkyl Halide)'}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black text-[#20C997] uppercase">
                  {selectedMechanism === 'sn2' ? 'Backside Attack (Nu⁻)' : 'Carbocation Interm.'}
                </span>
                <ArrowRight className="w-5 h-5 text-[#20C997]" />
              </div>

              {/* Product */}
              <div className="flex-1 p-3 bg-white rounded-xl border text-center shadow-xs">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Product</span>
                <span className="font-mono font-bold text-sm text-[#172033]">
                  {selectedMechanism === 'sn2' ? 'CH₃-OH (Walden Inversion)' : '(CH₃)₃C-OH (Racemisation)'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-[#172033] block">Select Mechanism to Compare</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMechanism('sn2')}
                  className={cn(
                    'flex-1 py-2 rounded-xl font-bold border transition-all text-xs',
                    selectedMechanism === 'sn2'
                      ? 'bg-[#20C997] text-white border-[#20C997]'
                      : 'bg-white text-slate-700'
                  )}
                >
                  SN2 (Bimolecular)
                </button>
                <button
                  onClick={() => setSelectedMechanism('sn1')}
                  className={cn(
                    'flex-1 py-2 rounded-xl font-bold border transition-all text-xs',
                    selectedMechanism === 'sn1'
                      ? 'bg-[#20C997] text-white border-[#20C997]'
                      : 'bg-white text-slate-700'
                  )}
                >
                  SN1 (Unimolecular)
                </button>
              </div>
            </div>

            <div className="bg-[#E8F9F4] p-4 rounded-2xl border border-[#20C997]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#059669] block">
                Kinetic & Stereochemical Profile
              </span>
              <div className="flex justify-between">
                <span>Rate Law:</span>
                <span className="font-mono font-bold text-[#172033]">
                  {selectedMechanism === 'sn2' ? 'Rate = k[R-X][Nu⁻]' : 'Rate = k[R-X]'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Stereochemical Outcome:</span>
                <span className="font-bold text-[#059669]">
                  {selectedMechanism === 'sn2' ? '100% Inversion (Walden)' : 'Racemisation (50% Inv + 50% Ret)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Preferred Substrate:</span>
                <span className="font-bold text-[#172033]">
                  {selectedMechanism === 'sn2' ? 'Methyl > 1° > 2° > 3°' : '3° > 2° > 1° > Methyl'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ELECTROCHEMICAL CELL */}
      {activityType === 'electrochemicalCell' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-4 flex justify-center">
            <svg width="400" height="180" viewBox="0 0 400 180" className="select-none font-sans text-xs">
              {/* Beaker 1: Zn Anode */}
              <rect x="50" y="60" width="100" height="90" fill="#E2E8F0" rx="6" />
              <rect x="85" y="40" width="30" height="80" fill="#94A3B8" />
              <text x="75" y="32" fill="#475569" fontWeight="bold">Zn Anode (-)</text>

              {/* Salt Bridge */}
              <path d="M 120 70 Q 200 20 280 70" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
              <text x="180" y="45" fill="#B45309" fontWeight="bold">Salt Bridge</text>

              {/* Beaker 2: Cu Cathode */}
              <rect x="250" y="60" width="100" height="90" fill="#BFDBFE" rx="6" />
              <rect x="285" y="40" width="30" height="80" fill="#B45309" />
              <text x="275" y="32" fill="#B45309" fontWeight="bold">Cu Cathode (+)</text>

              {/* Wire & Voltmeter */}
              <path d="M 100 40 L 100 15 L 300 15 L 300 40" fill="none" stroke="#1E293B" strokeWidth="2" />
              <circle cx="200" cy="15" r="16" fill="#FFFFFF" stroke="#20C997" strokeWidth="2" />
              <text x="188" y="19" fill="#059669" fontWeight="black" fontSize="10">{nernstE.toFixed(2)}V</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between font-bold text-[#172033]">
                <span>[Zn²⁺] Anode Concentration</span>
                <span className="font-mono text-[#20C997]">{znConc.toFixed(2)} M</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="2.0"
                step="0.05"
                value={znConc}
                onChange={(e) => setZnConc(parseFloat(e.target.value))}
                className="w-full accent-[#20C997]"
              />

              <div className="flex justify-between font-bold text-[#172033] pt-2">
                <span>[Cu²⁺] Cathode Concentration</span>
                <span className="font-mono text-blue-600">{cuConc.toFixed(2)} M</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="2.0"
                step="0.05"
                value={cuConc}
                onChange={(e) => setCuConc(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="bg-[#E8F9F4] p-4 rounded-2xl border border-[#20C997]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#059669] block">
                Nernst Equation Potential
              </span>
              <div className="flex justify-between">
                <span>Standard EMF (E°_cell):</span>
                <span className="font-mono font-bold text-[#172033]">1.10 V</span>
              </div>
              <div className="flex justify-between">
                <span>Calculated Cell Potential (E):</span>
                <span className="font-mono font-black text-[#059669] text-base">{nernstE.toFixed(3)} V</span>
              </div>
              <div className="flex justify-between">
                <span>Reaction Quotient (Q = [Zn²⁺]/[Cu²⁺]):</span>
                <span className="font-mono font-bold text-[#172033]">{qQuotient.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PARTICLE COLLISION SIMULATION */}
      {activityType === 'particleCollisionSimulation' && (
        <div className="space-y-6">
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-4 flex justify-center">
            {/* Maxwell Boltzmann Distribution SVG */}
            <svg width="400" height="180" viewBox="0 0 400 180" className="select-none font-sans text-xs">
              <line x1="40" y1="150" x2="360" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="40" y1="20" x2="40" y2="150" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Curve */}
              <path
                d={`M 40 150 Q ${120 + (temperatureK - 300) * 0.2} 30 350 145`}
                fill="none"
                stroke="#20C997"
                strokeWidth="3"
              />

              {/* Activation Energy Line */}
              <line
                x1={hasCatalyst ? 200 : 260}
                y1="20"
                x2={hasCatalyst ? 200 : 260}
                y2="150"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="4,2"
              />
              <text x={hasCatalyst ? 165 : 225} y="15" fill="#EF4444" fontWeight="bold">
                {hasCatalyst ? 'Ea (Catalyzed)' : 'Ea (Uncatalyzed)'}
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between font-bold text-[#172033]">
                <span>Temperature T</span>
                <span className="font-mono text-[#20C997]">{temperatureK} K</span>
              </div>
              <input
                type="range"
                min="250"
                max="450"
                step="10"
                value={temperatureK}
                onChange={(e) => setTemperatureK(parseInt(e.target.value))}
                className="w-full accent-[#20C997]"
              />

              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-[#172033]">Catalyst Present</span>
                <button
                  onClick={() => setHasCatalyst(!hasCatalyst)}
                  className={cn(
                    'px-3 py-1 rounded-full font-bold text-xs transition-all',
                    hasCatalyst ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  )}
                >
                  {hasCatalyst ? 'Catalyst: ACTIVE' : 'No Catalyst'}
                </button>
              </div>
            </div>

            <div className="bg-[#E8F9F4] p-4 rounded-2xl border border-[#20C997]/20 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#059669] block">
                Arrhenius Equation Readout
              </span>
              <div className="flex justify-between">
                <span>Effective Collision Fraction:</span>
                <span className="font-mono font-black text-[#059669] text-base">
                  {((temperatureK / 300) * (hasCatalyst ? 3.5 : 1)).toFixed(1)}x Baseline
                </span>
              </div>
              <div className="flex justify-between">
                <span>Activation Energy Barrier:</span>
                <span className="font-bold text-[#172033]">
                  {hasCatalyst ? 'Lowered by ~25 kJ/mol' : 'Normal Uncatalyzed Barrier'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
