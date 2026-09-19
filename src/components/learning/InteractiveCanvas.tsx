import React, { useState } from 'react';
import { Zap, BookOpen, Atom, Calculator, FlaskConical } from 'lucide-react';
import { cn } from '@/utils/cn';
import { MathGraphEngine } from './engines/MathGraphEngine';
import { PhysicsLabEngine } from './engines/PhysicsLabEngine';
import { ChemistryMolecularEngine } from './engines/ChemistryMolecularEngine';
import { EnglishLiteraryEngine } from './engines/EnglishLiteraryEngine';

export type SimulationSubject = 'mathematics' | 'physics' | 'chemistry' | 'english';

interface InteractiveCanvasProps {
  subject?: SimulationSubject | 'math';
  topic?: string;
  className?: string;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  subject = 'physics',
  topic = 'Class 12 Interactive Visual Lab',
  className,
}) => {
  const normalizedSubject: SimulationSubject = subject === 'math' ? 'mathematics' : subject;
  const [activeSubject, setActiveSubject] = useState<SimulationSubject>(normalizedSubject);

  const subjectMeta: Record<
    SimulationSubject,
    { title: string; subtitle: string; icon: any; color: string; bg: string }
  > = {
    mathematics: {
      title: 'Mathematics • Dynamic Calculus & Graphs',
      subtitle: 'Secant-to-tangent differentiation, Riemann integrals & extrema',
      icon: Calculator,
      color: '#4F7CFF',
      bg: 'bg-[#EFF4FF]',
    },
    physics: {
      title: 'Physics • Virtual Field & Circuit Lab',
      subtitle: 'Electrostatics, DC circuits with Ohm’s law, and ray optics',
      icon: Atom,
      color: '#7C4DFF',
      bg: 'bg-[#F5F0FF]',
    },
    chemistry: {
      title: 'Chemistry • 3D Molecular World',
      subtitle: 'Coordination complex builder, IUPAC naming & organic reaction chains',
      icon: FlaskConical,
      color: '#20C997',
      bg: 'bg-[#E8F9F4]',
    },
    english: {
      title: 'English Core • Textual Evidence & Writing',
      subtitle: 'Passage rhetorical tone analysis & CBSE structured writing canvas',
      icon: BookOpen,
      color: '#FF8A3D',
      bg: 'bg-[#FFF3EB]',
    },
  };

  const meta = subjectMeta[activeSubject];
  const Icon = meta.icon;

  return (
    <div
      className={cn(
        'bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle overflow-hidden flex flex-col',
        className
      )}
    >
      {/* Simulation Header */}
      <div className="p-4 sm:px-6 border-b border-[#E6EAF0] bg-[#F7F9FC]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn('w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-xs')}
            style={{ backgroundColor: meta.color, color: '#FFFFFF' }}
          >
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#667085]">
                {meta.title}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10B981]/15 text-[#059669]">
                Live Lab
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-[#172033]">
              {topic || meta.subtitle}
            </h3>
          </div>
        </div>

        {/* Subject Switcher Tabs */}
        <div className="flex items-center bg-[#E6EAF0]/70 p-1 rounded-full text-xs font-bold text-[#667085]">
          {(['physics', 'mathematics', 'chemistry', 'english'] as SimulationSubject[]).map((subj) => (
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
              {subj === 'mathematics' ? 'Math' : subj}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Stage */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {activeSubject === 'mathematics' && <MathGraphEngine />}
        {activeSubject === 'physics' && <PhysicsLabEngine />}
        {activeSubject === 'chemistry' && <ChemistryMolecularEngine />}
        {activeSubject === 'english' && <EnglishLiteraryEngine />}
      </div>
    </div>
  );
};
