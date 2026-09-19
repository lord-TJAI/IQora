import React, { useState } from 'react';
import { Layers, Sparkles, Plus, Trash2, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export type ChemistryMode = 'coordination_builder' | 'reaction_pathways' | 'galvanic_cell';

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

export const ChemistryMolecularEngine: React.FC = () => {
  const [mode, setMode] = useState<ChemistryMode>('coordination_builder');

  // Coordination Builder State
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

  // Organic Reaction State
  const [organicStep, setOrganicStep] = useState<number>(1);
  const [selectedReagent, setSelectedReagent] = useState<string>('PCC');

  // Coordination Calculations
  const coordinationNumber = ligands.reduce((acc, l) => acc + l.denticity, 0);
  const totalLigandCharge = ligands.reduce((acc, l) => acc + l.charge, 0);
  const complexCharge = metal.oxState + totalLigandCharge;

  // Geometry
  const geometry =
    coordinationNumber === 6
      ? 'Octahedral (d²sp³ / sp³d²)'
      : coordinationNumber === 4
      ? metal.symbol === 'Pt' || metal.symbol === 'Ni' && ligands.some(l => l.formula === 'CN⁻')
        ? 'Square Planar (dsp²)'
        : 'Tetrahedral (sp³)'
      : `Coordination ${coordinationNumber}`;

  // IUPAC Name Generator
  const generateIupacName = () => {
    // Count occurrences of each ligand
    const counts: Record<string, { count: number; iupac: string }> = {};
    ligands.forEach((l) => {
      if (!counts[l.formula]) {
        counts[l.formula] = { count: 0, iupac: l.iupacName };
      }
      counts[l.formula].count += 1;
    });

    const prefix = (n: number) => {
      switch (n) {
        case 1: return '';
        case 2: return 'di';
        case 3: return 'tri';
        case 4: return 'tetra';
        case 5: return 'penta';
        case 6: return 'hexa';
        default: return '';
      }
    };

    const roman = (n: number) => {
      switch (n) {
        case 1: return 'I';
        case 2: return 'II';
        case 3: return 'III';
        case 4: return 'IV';
        default: return `${n}`;
      }
    };

    const ligandPart = Object.values(counts)
      .map((item) => `${prefix(item.count)}${item.iupac}`)
      .join('');

    const metalPart =
      complexCharge < 0
        ? metal.symbol === 'Fe' ? 'ferrate' : metal.symbol === 'Co' ? 'cobaltate' : `${metal.name}ate`
        : metal.name;

    const chargeStr = complexCharge !== 0 ? (complexCharge > 0 ? `+${complexCharge}` : `${complexCharge}`) : '';

    return {
      formula: `[${metal.symbol}(${Object.keys(counts).map(k => `${k}${counts[k].count > 1 ? counts[k].count : ''}`).join('')})]${chargeStr ? `^${chargeStr}` : ''}`,
      name: `${ligandPart.charAt(0).toUpperCase() + ligandPart.slice(1)}${metalPart}(${roman(metal.oxState)}) ${complexCharge !== 0 ? 'ion' : ''}`,
    };
  };

  const { formula: complexFormula, name: complexIupacName } = generateIupacName();

  const handleAddLigand = (ligand: Ligand) => {
    if (coordinationNumber + ligand.denticity <= 6) {
      setLigands([...ligands, ligand]);
    }
  };

  const handleRemoveLigand = (index: number) => {
    setLigands(ligands.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Sub-mode Navigation */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-1 border-b border-slate-100">
        <div className="flex items-center gap-1.5 bg-[#E8F9F4] p-1 rounded-xl text-xs font-bold text-[#20C997]">
          <button
            onClick={() => setMode('coordination_builder')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'coordination_builder' ? 'bg-[#20C997] text-white shadow-xs font-black' : 'hover:text-emerald-900'
            )}
          >
            Coordination Complex Builder
          </button>
          <button
            onClick={() => setMode('reaction_pathways')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'reaction_pathways' ? 'bg-[#20C997] text-white shadow-xs font-black' : 'hover:text-emerald-900'
            )}
          >
            Organic Reaction Mechanisms
          </button>
        </div>

        <span className="text-[11px] font-bold text-[#667085] hidden sm:inline">
          CBSE Class XII • Molecular World Engine
        </span>
      </div>

      {/* ===================================================================== */}
      {/* 1. COORDINATION COMPLEX BUILDER                                       */}
      {/* ===================================================================== */}
      {mode === 'coordination_builder' && (
        <div className="space-y-4">
          {/* Visual Stage */}
          <div className="relative h-64 sm:h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner p-4">
            <svg className="w-full h-full" viewBox="0 0 420 240">
              {/* Central Metal Ion */}
              <circle cx="210" cy="120" r="26" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" />
              <text x="210" y="125" fill="#FFFFFF" fontSize="13" fontWeight="black" textAnchor="middle">
                {metal.symbol}^{metal.oxState >= 0 ? `+${metal.oxState}` : metal.oxState}
              </text>

              {/* Ligand coordinates in Octahedral (6) or Square Planar / Tetrahedral (4) */}
              {ligands.map((ligand, idx) => {
                const angle = (idx * 2 * Math.PI) / ligands.length - Math.PI / 2;
                const distance = 80;
                const lx = 210 + distance * Math.cos(angle);
                const ly = 120 + distance * Math.sin(angle);

                return (
                  <g key={idx}>
                    {/* Coordinate Covalent Bond (Arrow to Central Metal) */}
                    <line
                      x1={lx}
                      y1={ly}
                      x2={210}
                      y2={120}
                      stroke="#94A3B8"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                    {/* Ligand Circle */}
                    <circle cx={lx} cy={ly} r="18" fill={ligand.color} stroke="#FFFFFF" strokeWidth="2" />
                    <text x={lx} y={ly + 4} fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {ligand.formula}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* HUD Telemetry Overlay */}
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 shadow-md space-y-1">
              <div className="text-emerald-400 font-bold">{complexFormula}</div>
              <div className="text-amber-300 font-bold text-[11px]">{complexIupacName}</div>
              <div className="flex items-center gap-3 text-[11px] text-slate-300 pt-0.5">
                <span>CN: {coordinationNumber}</span>
                <span>•</span>
                <span>Geometry: {geometry}</span>
              </div>
            </div>
          </div>

          {/* Builder Controls */}
          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E6EAF0] space-y-4">
            {/* Metal Selector */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-[#172033]">Central Metal:</span>
              {[
                { symbol: 'Co', name: 'cobalt', oxState: 3 },
                { symbol: 'Fe', name: 'iron', oxState: 2 },
                { symbol: 'Fe', name: 'iron', oxState: 3 },
                { symbol: 'Ni', name: 'nickel', oxState: 2 },
                { symbol: 'Pt', name: 'platinum', oxState: 2 },
              ].map((m, i) => (
                <button
                  key={i}
                  onClick={() => setMetal(m)}
                  className={cn(
                    'px-3 py-1 rounded-xl text-xs font-bold transition-all',
                    metal.symbol === m.symbol && metal.oxState === m.oxState
                      ? 'bg-[#0284C7] text-white shadow-xs'
                      : 'bg-white border border-[#E6EAF0] text-[#172033] hover:bg-slate-100'
                  )}
                >
                  {m.symbol} ({m.oxState}+)
                </button>
              ))}
            </div>

            {/* Ligand Palette */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#172033]">
                  Attach Ligands (Max Coordination 6):
                </span>
                <span className="text-xs text-[#667085]">
                  Current CN: {coordinationNumber}/6
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {AVAILABLE_LIGANDS.map((ligand, i) => (
                  <button
                    key={i}
                    onClick={() => handleAddLigand(ligand)}
                    disabled={coordinationNumber + ligand.denticity > 6}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6EAF0] text-xs font-bold text-[#172033] hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{ligand.name} ({ligand.formula})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Attached Ligand Pill List with delete */}
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-200">
              <span className="text-[11px] font-bold text-[#667085]">Attached:</span>
              {ligands.map((ligand, idx) => (
                <span
                  key={idx}
                  onClick={() => handleRemoveLigand(idx)}
                  className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:border-rose-300 hover:text-rose-600 transition-colors shadow-2xs"
                  title="Click to remove"
                >
                  <span>{ligand.formula}</span>
                  <span className="text-[10px] text-slate-400">✕</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. ORGANIC REACTION PATHWAYS                                          */}
      {/* ===================================================================== */}
      {mode === 'reaction_pathways' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Alcohols & Carbonyl Conversion Chain
              </span>
              <span className="text-xs text-slate-400">CBSE NCERT Organic Synthesis</span>
            </div>

            {/* Reaction Chain Visualizer */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              {/* Substrate */}
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 w-44">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Substrate</span>
                <span className="text-lg font-black text-sky-400 block mt-1">CH₃CH₂OH</span>
                <span className="text-xs text-slate-300">Ethanol (1° Alcohol)</span>
              </div>

              {/* Reagent Arrow */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-black text-amber-400 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full">
                  + {selectedReagent}
                </span>
                <ArrowRight className="w-6 h-6 text-amber-400 my-1 hidden md:block" />
                <span className="text-[10px] text-slate-400">
                  {selectedReagent === 'PCC' && 'Mild Oxidation'}
                  {selectedReagent === 'KMnO4' && 'Strong Oxidation'}
                  {selectedReagent === 'SOCl2' && 'Darzens Halogenation'}
                  {selectedReagent === 'H2SO4_443K' && 'Acid Dehydration'}
                </span>
              </div>

              {/* Product */}
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 w-48">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Product</span>
                <span className="text-lg font-black text-emerald-400 block mt-1">
                  {selectedReagent === 'PCC' && 'CH₃CHO'}
                  {selectedReagent === 'KMnO4' && 'CH₃COOH'}
                  {selectedReagent === 'SOCl2' && 'CH₃CH₂Cl'}
                  {selectedReagent === 'H2SO4_443K' && 'CH₂=CH₂'}
                </span>
                <span className="text-xs text-slate-300">
                  {selectedReagent === 'PCC' && 'Acetaldehyde (Aldehyde)'}
                  {selectedReagent === 'KMnO4' && 'Acetic Acid (Carboxylic Acid)'}
                  {selectedReagent === 'SOCl2' && 'Chloroethane + SO₂↑ + HCl↑'}
                  {selectedReagent === 'H2SO4_443K' && 'Ethene (Alkene)'}
                </span>
              </div>
            </div>

            {/* Mechanism Explanation */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
              <span className="text-emerald-400 font-bold block">CBSE Mechanism Breakdown:</span>
              {selectedReagent === 'PCC' && (
                <p className="text-slate-300 leading-relaxed">
                  Pyridinium Chlorochromate (PCC) in anhydrous CH₂Cl₂ selectively oxidizes 1° alcohols into aldehydes without further oxidation into carboxylic acids.
                </p>
              )}
              {selectedReagent === 'KMnO4' && (
                <p className="text-slate-300 leading-relaxed">
                  Alkaline or acidified KMnO₄ is a vigorous oxidizing agent that directly converts primary alcohols into carboxylic acids via an unisolated gem-diol intermediate.
                </p>
              )}
              {selectedReagent === 'SOCl2' && (
                <p className="text-slate-300 leading-relaxed">
                  Darzen’s process with thionyl chloride produces chloroethane along with gaseous by-products (SO₂ and HCl), making purification exceptionally clean.
                </p>
              )}
              {selectedReagent === 'H2SO4_443K' && (
                <p className="text-slate-300 leading-relaxed">
                  Heating ethanol with concentrated H₂SO₄ at 443 K (170°C) leads to intramolecular dehydration via an ethyl carbocation intermediate to yield ethene.
                </p>
              )}
            </div>
          </div>

          {/* Reagent Switcher */}
          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E6EAF0]">
            <span className="text-xs font-bold text-[#172033] block mb-2">
              Select Reagent & Reaction Condition:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'PCC', label: 'PCC in CH₂Cl₂' },
                { id: 'KMnO4', label: 'Alkaline KMnO₄' },
                { id: 'SOCl2', label: 'SOCl₂ / Pyridine' },
                { id: 'H2SO4_443K', label: 'conc. H₂SO₄ (443 K)' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReagent(r.id)}
                  className={cn(
                    'p-2.5 rounded-xl text-xs font-black transition-all text-center',
                    selectedReagent === r.id
                      ? 'bg-[#20C997] text-white shadow-xs'
                      : 'bg-white border border-[#E6EAF0] text-[#172033] hover:bg-slate-50'
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
