import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, Flame, Star, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

export const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { studentData } = useAuthStore();

  // 4 Subjects with distinct visual mini-previews and specific curriculum topics
  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      topic: 'Calculus & Continuity',
      mastery: 78,
      color: '#4F7CFF',
      lightColor: '#EFF4FF',
      path: '/student/learn/mathematics',
      // SVG Mini-preview: Coordinate axes, polynomial/sine wave, and tangent line
      visual: (
        <svg viewBox="0 0 120 70" className="w-full h-16 select-none" fill="none">
          {/* Axes */}
          <line x1="10" y1="60" x2="110" y2="60" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="10" x2="20" y2="65" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          {/* Curve */}
          <path d="M 20 52 C 45 52, 55 18, 75 22 C 90 26, 95 45, 110 15" stroke="#4F7CFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tangent point and line */}
          <line x1="50" y1="10" x2="95" y2="35" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="75" cy="22" r="3.5" fill="#4F7CFF" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'physics',
      name: 'Physics',
      topic: 'Electrostatics & Potential',
      mastery: 72,
      color: '#7C4DFF',
      lightColor: '#F5F0FF',
      path: '/student/learn/physics',
      // SVG Mini-preview: Dipole electric field lines and charged poles
      visual: (
        <svg viewBox="0 0 120 70" className="w-full h-16 select-none" fill="none">
          {/* Field Lines */}
          <path d="M 35 35 C 35 15, 85 15, 85 35" stroke="#7C4DFF" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
          <path d="M 35 35 C 35 55, 85 55, 85 35" stroke="#7C4DFF" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
          <line x1="35" y1="35" x2="85" y2="35" stroke="#7C4DFF" strokeWidth="2" />
          {/* Charges */}
          <circle cx="35" cy="35" r="7" fill="#7C4DFF" />
          <text x="35" y="38.5" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">+</text>
          <circle cx="85" cy="35" r="7" fill="#172033" />
          <text x="85" y="38" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">-</text>
        </svg>
      ),
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      topic: 'Electrochemistry & Cells',
      mastery: 64,
      color: '#20C997',
      lightColor: '#E8F9F4',
      path: '/student/learn/chemistry',
      // SVG Mini-preview: Molecular hexagonal structure with covalent bond spheres
      visual: (
        <svg viewBox="0 0 120 70" className="w-full h-16 select-none" fill="none">
          {/* Hexagon bonds */}
          <polygon points="60,15 80,26 80,48 60,59 40,48 40,26" stroke="#20C997" strokeWidth="2" strokeLinejoin="round" fill="none" />
          <line x1="47" y1="30" x2="47" y2="44" stroke="#20C997" strokeWidth="1.5" opacity="0.7" />
          <line x1="60" y1="20" x2="74" y2="28" stroke="#20C997" strokeWidth="1.5" opacity="0.7" />
          {/* Branching bond */}
          <line x1="80" y1="26" x2="98" y2="16" stroke="#20C997" strokeWidth="2" />
          {/* Atom spheres */}
          <circle cx="60" cy="15" r="3" fill="#20C997" />
          <circle cx="80" cy="26" r="3" fill="#20C997" />
          <circle cx="80" cy="48" r="3" fill="#20C997" />
          <circle cx="60" cy="59" r="3" fill="#20C997" />
          <circle cx="40" cy="48" r="3" fill="#20C997" />
          <circle cx="40" cy="26" r="3" fill="#20C997" />
          <circle cx="98" cy="16" r="4" fill="#172033" />
        </svg>
      ),
    },
    {
      id: 'english',
      name: 'English',
      topic: 'Reading & Interpretation',
      mastery: 81,
      color: '#FF8A3D',
      lightColor: '#FFF3EB',
      path: '/student/learn/english',
      // SVG Mini-preview: Open book with highlighted text passage lines
      visual: (
        <svg viewBox="0 0 120 70" className="w-full h-16 select-none" fill="none">
          {/* Book spine & pages */}
          <rect x="25" y="16" width="34" height="42" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="61" y="16" width="34" height="42" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Text lines */}
          <line x1="30" y1="24" x2="52" y2="24" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="31" x2="48" y2="31" stroke="#FF8A3D" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="38" x2="50" y2="38" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="66" y1="24" x2="88" y2="24" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="66" y1="31" x2="84" y2="31" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="66" y1="38" x2="78" y2="38" stroke="#FF8A3D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Work due soon: maximum 3 items, concise & actionable
  const workDue = [
    {
      id: 'task-1',
      title: 'Physics Electrostatics Assignment',
      subject: 'Physics',
      due: 'Today',
      dueLabel: 'Due today',
      urgent: true,
      color: '#7C4DFF',
    },
    {
      id: 'task-2',
      title: 'Chemistry Electrochemistry Homework',
      subject: 'Chemistry',
      due: 'Tomorrow',
      dueLabel: 'Due tomorrow',
      urgent: false,
      color: '#20C997',
    },
    {
      id: 'task-3',
      title: 'Mathematics Calculus Practice Test',
      subject: 'Mathematics',
      due: 'Friday',
      dueLabel: 'Due Friday',
      urgent: false,
      color: '#4F7CFF',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. GREETING & COMPACT STATS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
            Good morning, {studentData?.name ? studentData.name.split(' ')[0] : 'Arjun'} 👋
          </h1>
          <p className="text-sm font-medium text-[#667085] mt-1">
            Ready for today's learning?
          </p>
        </div>

        {/* Motivation summary: streak and XP */}
        <div
          onClick={() => navigate('/student/profile')}
          className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#E6EAF0] shadow-2xs self-start sm:self-auto cursor-pointer hover:border-[#FFC800] hover:shadow-xs transition-all select-none"
          title="View Profile & Progress"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033]">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>14 day streak</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033]">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>2,450 XP</span>
          </div>
        </div>
      </div>

      {/* 2. ASYMMETRIC DESKTOP LAYOUT (Main ~65-70%, Supporting ~30-35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MAIN COLUMN (8 cols / ~67%) */}
        <div className="lg:col-span-8 space-y-8">
          {/* HERO VISUAL CENTERPIECE: TODAY'S QUEST */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#FFC800] via-[#FFD026] to-[#FFAE00] p-6 sm:p-8 text-[#172033] shadow-subtle overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Content */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#172033] text-white text-[11px] font-black uppercase tracking-wider">
                    Today's Quest
                  </span>
                  <span className="text-xs font-bold text-slate-900/80">
                    Physics • Chapter 2
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[#172033]">
                    Electric Potential
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-900/80 mt-1">
                    Continue your current lesson where you left off.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#172033]">
                    <span>Chapter Progress</span>
                    <span>63%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/15 rounded-full overflow-hidden">
                    <div className="h-full bg-[#172033] rounded-full w-[63%] transition-all" />
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/student/lesson/phys-ch2-l3')}
                    className="px-6 py-3 rounded-xl bg-[#172033] hover:bg-slate-800 active:scale-[0.99] text-white font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs transition-all"
                  >
                    <span>CONTINUE LEARNING</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Right Illustration: Academic Student & Physics Field (Spirit of Reference) */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="w-full max-w-[220px]">
                  <svg viewBox="0 0 200 180" className="w-full h-auto select-none" fill="none">
                    {/* Glowing field rings */}
                    <circle cx="100" cy="90" r="75" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
                    <circle cx="100" cy="90" r="50" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />

                    {/* Books base */}
                    <rect x="40" y="145" width="120" height="14" rx="4" fill="#172033" />
                    <rect x="48" y="133" width="104" height="12" rx="3" fill="#7C4DFF" />
                    <text x="100" y="142" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.5">PHYSICS XII</text>

                    {/* Student Character */}
                    <g transform="translate(65, 30)">
                      {/* Body */}
                      <path d="M35 55 C20 55 10 75 10 100 L60 100 C60 75 50 55 35 55 Z" fill="#172033" />
                      {/* Head */}
                      <circle cx="35" cy="35" r="18" fill="#FFDFC4" />
                      {/* Hair */}
                      <path d="M18 32 C17 20 25 12 35 12 C45 12 53 20 52 32 C48 27 40 25 35 25 C30 25 22 27 18 32 Z" fill="#172033" />
                      {/* Eyes & Smile */}
                      <circle cx="30" cy="35" r="2" fill="#172033" />
                      <circle cx="40" cy="35" r="2" fill="#172033" />
                      <path d="M32 41 Q35 44 38 41" stroke="#172033" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </g>

                    {/* Floating electric potential particles */}
                    <circle cx="35" cy="55" r="5" fill="#FFFFFF" />
                    <text x="35" y="58" fill="#172033" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>

                    <circle cx="165" cy="65" r="5" fill="#FFFFFF" />
                    <text x="165" y="67" fill="#172033" fontSize="8" fontWeight="bold" textAnchor="middle">-</text>

                    <circle cx="150" cy="115" r="3" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="50" cy="110" r="3" fill="#FFFFFF" opacity="0.8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* YOUR SUBJECTS (4 Compact Cards with Distinct Visuals) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-black text-[#172033] tracking-tight">
                Your Subjects
              </h2>
              <button
                onClick={() => navigate('/student/learn')}
                className="text-xs font-bold text-[#4F7CFF] hover:underline"
              >
                View all subjects →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((subj) => (
                <div
                  key={subj.id}
                  onClick={() => navigate(subj.path)}
                  className="bg-white rounded-3xl border border-[#E6EAF0] p-5 hover:border-slate-300 hover:shadow-subtle transition-all cursor-pointer flex flex-col justify-between gap-3 group"
                >
                  {/* Top: Name & Mastery */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                        {subj.name}
                      </h3>
                      <p className="text-xs font-medium text-[#667085] mt-0.5">
                        {subj.topic}
                      </p>
                    </div>

                    <span className="text-base font-black text-[#172033]">
                      {subj.mastery}%
                    </span>
                  </div>

                  {/* Center: Unique Subject Visual Mini-Preview */}
                  <div className="rounded-2xl p-2 flex items-center justify-center" style={{ backgroundColor: subj.lightColor }}>
                    {subj.visual}
                  </div>

                  {/* Bottom: Clean CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold">
                    <span className="text-[#667085]">Current topic</span>
                    <span className="text-[#172033] group-hover:text-[#4F7CFF] group-hover:translate-x-0.5 transition-all flex items-center gap-1">
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUPPORTING COLUMN (4 cols / ~33%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* WORK DUE SOON (Max 3 Items) */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-[#172033] tracking-tight">
                Work due soon
              </h3>
              <button
                onClick={() => navigate('/student/work')}
                className="text-xs font-bold text-[#4F7CFF] hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {workDue.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/student/work/${item.id}`)}
                  className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0] hover:bg-white hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 truncate min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="truncate min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#172033] truncate group-hover:text-[#4F7CFF] transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-[#667085] block mt-0.5">
                        {item.dueLabel}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/student/work/${item.id}`);
                    }}
                    className={cn(
                      'px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex-shrink-0',
                      item.urgent
                        ? 'bg-[#FFC800] hover:bg-[#E6B400] text-[#172033]'
                        : 'bg-white border border-slate-200 hover:bg-slate-100 text-[#172033]'
                    )}
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* NEXT ACTION (Single Focused Recommendation) */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#7C4DFF] block">
                Your next move
              </span>
              <h3 className="text-base font-black text-[#172033] mt-1">
                Electric Potential
              </h3>
              <p className="text-xs font-medium text-[#667085] mt-1 leading-relaxed">
                Practice one guided activity to master equipotential surfaces before your upcoming test.
              </p>
            </div>

            <button
              onClick={() => navigate('/student/practice')}
              className="w-full py-3 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-black text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>START PRACTICE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
