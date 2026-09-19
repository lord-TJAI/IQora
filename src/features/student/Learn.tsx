import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cbse2026Curriculum } from '@/services/mock/curriculumData';
import { SubjectId } from '@/types/domain';
import {
  ArrowRight,
  Calculator,
  Atom,
  FlaskConical,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const Learn: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      currentFocus: 'Calculus',
      mastery: 78,
      color: '#4F7CFF',
      lightColor: '#EFF4FF',
      icon: Calculator,
    },
    {
      id: 'physics',
      name: 'Physics',
      currentFocus: 'Electrostatics',
      mastery: 72,
      color: '#7C4DFF',
      lightColor: '#F5F0FF',
      icon: Atom,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      currentFocus: 'Electrochemistry',
      mastery: 64,
      color: '#20C997',
      lightColor: '#E8F9F4',
      icon: FlaskConical,
    },
    {
      id: 'english',
      name: 'English Core',
      currentFocus: 'Literature',
      mastery: 81,
      color: '#FF8A3D',
      lightColor: '#FFF3EB',
      icon: BookOpen,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
          Learn
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
          Choose a subject to enter its visual curriculum path.
        </p>
      </div>

      {/* 4 Large Visual Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {subjects.map((subj) => {
          const Icon = subj.icon;
          return (
            <div
              key={subj.id}
              onClick={() => navigate(`/student/learn/${subj.id}`)}
              className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 hover:border-[#D0D5DD] hover:shadow-subtle transition-all cursor-pointer flex flex-col justify-between gap-6 group"
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: subj.color }}
                >
                  <Icon className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#172033] block">
                    {subj.mastery}%
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                    Mastery
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                  {subj.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
                  Current topic: <strong className="text-[#172033]">{subj.currentFocus}</strong>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex-1 max-w-[140px] h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${subj.mastery}%`, backgroundColor: subj.color }}
                  />
                </div>

                <button className="text-xs font-black text-[#172033] group-hover:text-[#4F7CFF] flex items-center gap-1.5 transition-colors">
                  <span>OPEN</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
