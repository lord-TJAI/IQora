import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSubjects } from '@/data/curriculum';
import {
  ArrowRight,
  Calculator,
  Atom,
  FlaskConical,
  BookOpen,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const Learn: React.FC = () => {
  const navigate = useNavigate();
  const subjects = getAllSubjects();

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'mathematics':
        return Calculator;
      case 'physics':
        return Atom;
      case 'chemistry':
        return FlaskConical;
      case 'english':
        return BookOpen;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] bg-[#F5F0FF] px-2.5 py-0.5 rounded-full">
              CBSE Class XII 2026–27
            </span>
            <span className="text-xs font-bold text-[#667085]">Academic Portals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight mt-1">
            Choose Your Learning Path
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
            Select a subject to enter its curriculum path, interactive simulations, and mastery tracking.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3.5 py-2 rounded-2xl border border-[#E6EAF0] shadow-xs text-xs font-bold text-[#667085]">
          <Sparkles className="w-4 h-4 text-[#FFC800] fill-[#FFC800]" />
          <span>4 Specialized Subject Engines</span>
        </div>
      </div>

      {/* 4 Large Visual Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subj) => {
          const Icon = getSubjectIcon(subj.id);
          const totalChapters = subj.units.reduce((acc, u) => acc + u.chapters.length, 0);

          return (
            <div
              key={subj.id}
              onClick={() => navigate(`/student/learn/${subj.id}`)}
              className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 hover:border-[#CBD5E1] hover:shadow-subtle transition-all cursor-pointer flex flex-col justify-between gap-6 group"
            >
              {/* Card Header: Icon, Code & Mastery */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform p-3"
                    style={{ backgroundColor: subj.color }}
                  >
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#667085]">
                        Code {subj.code}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: subj.lightColor, color: subj.color }}
                      >
                        {subj.units.length} Units • {totalChapters} Chapters
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                      {subj.name}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-[#172033] block">
                    {subj.overallMastery}%
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                    Mastery
                  </span>
                </div>
              </div>

              {/* Mini Subject-Specific Visual Preview */}
              <div className="rounded-2xl border border-slate-100 p-3.5 bg-[#FAFBFD] overflow-hidden flex items-center justify-center h-28">
                {subj.id === 'mathematics' && (
                  <svg width="260" height="90" viewBox="0 0 260 90" className="select-none">
                    <line x1="10" y1="75" x2="250" y2="75" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="80" y1="10" x2="80" y2="85" stroke="#CBD5E1" strokeWidth="1" />
                    {/* Polynomial Curve */}
                    <path
                      d="M 20 70 Q 100 80 140 35 T 240 15"
                      fill="none"
                      stroke="#4F7CFF"
                      strokeWidth="2.5"
                    />
                    {/* Tangent line */}
                    <line x1="90" y1="70" x2="190" y2="10" stroke="#10B981" strokeWidth="2" strokeDasharray="3,2" />
                    <circle cx="140" cy="35" r="4" fill="#4F7CFF" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="148" y="38" fill="#1E293B" fontSize="9" fontWeight="bold">f'(x)</text>
                  </svg>
                )}

                {subj.id === 'physics' && (
                  <svg width="260" height="90" viewBox="0 0 260 90" className="select-none">
                    {/* Dipole Field Lines */}
                    <path d="M 80 45 Q 130 10 180 45" fill="none" stroke="#7C4DFF" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
                    <path d="M 80 45 Q 130 80 180 45" fill="none" stroke="#7C4DFF" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
                    <line x1="80" y1="45" x2="180" y2="45" stroke="#7C4DFF" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
                    {/* Positive Charge */}
                    <circle cx="80" cy="45" r="10" fill="#EF4444" />
                    <text x="76" y="48" fill="#FFFFFF" fontSize="10" fontWeight="black">+</text>
                    {/* Negative Charge */}
                    <circle cx="180" cy="45" r="10" fill="#3B82F6" />
                    <text x="177" y="48" fill="#FFFFFF" fontSize="10" fontWeight="black">-</text>
                  </svg>
                )}

                {subj.id === 'chemistry' && (
                  <svg width="260" height="90" viewBox="0 0 260 90" className="select-none">
                    {/* Central Metal */}
                    <circle cx="130" cy="45" r="14" fill="#172033" />
                    <text x="123" y="48" fill="#FFFFFF" fontSize="9" fontWeight="bold">Co³⁺</text>
                    {/* Ligands */}
                    {[-50, 0, 50].map((dx, i) => (
                      <circle key={i} cx={130 + dx} cy={45 + (i === 1 ? -25 : 0)} r="7" fill="#38BDF8" />
                    ))}
                    <text x="100" y="80" fill="#059669" fontSize="9" fontWeight="bold">Octahedral [Co(NH₃)₆]³⁺</text>
                  </svg>
                )}

                {subj.id === 'english' && (
                  <div className="text-center space-y-1 px-4">
                    <span className="text-[10px] font-bold text-[#EA580C] bg-[#FFF3EB] px-2 py-0.5 rounded-full inline-block">
                      Tone: Patriotic & Reverent
                    </span>
                    <p className="text-[11px] italic text-[#172033] line-clamp-2">
                      "When a people are enslaved, as long as they hold fast to their language..."
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer: Progress & CTA */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-[#667085]">
                  <span>
                    Lessons: <strong className="text-[#172033]">{subj.completedLessons}</strong> / {subj.totalLessons}
                  </span>
                  <span className="text-emerald-700">Active Syllabus</span>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(subj.completedLessons / subj.totalLessons) * 100}%`,
                      backgroundColor: subj.color,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#667085]">
                    {subj.tagline}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                    <span>ENTER PORTAL</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
