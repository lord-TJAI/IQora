import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  ArrowRight,
  Flame,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  Calculator,
  Atom,
  FlaskConical,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { studentData } = useAuthStore();

  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      currentFocus: 'Calculus • Continuity',
      mastery: 78,
      color: '#4F7CFF',
      lightColor: '#EFF4FF',
      icon: Calculator,
    },
    {
      id: 'physics',
      name: 'Physics',
      currentFocus: 'Electrostatics • Potential',
      mastery: 72,
      color: '#7C4DFF',
      lightColor: '#F5F0FF',
      icon: Atom,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      currentFocus: 'Electrochemistry • Nernst',
      mastery: 64,
      color: '#20C997',
      lightColor: '#E8F9F4',
      icon: FlaskConical,
    },
    {
      id: 'english',
      name: 'English Core',
      currentFocus: 'Literature • The Last Lesson',
      mastery: 81,
      color: '#FF8A3D',
      lightColor: '#FFF3EB',
      icon: BookOpen,
    },
  ];

  const upcomingWork = [
    {
      id: 'task-1',
      title: 'Electrostatic Potential Assignment',
      subject: 'Physics',
      color: '#7C4DFF',
      due: 'Today, 6:00 PM',
      marks: 20,
    },
    {
      id: 'task-2',
      title: 'Chemical Kinetics Practice Set',
      subject: 'Chemistry',
      color: '#20C997',
      due: 'Tomorrow, 5:00 PM',
      marks: 15,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. Header: Clean Greeting + Minimal Streak/XP */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
            Good morning, {studentData?.name.split(' ')[0] || 'Arjun'}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">
            Class 12-A • Ready to continue your learning journey?
          </p>
        </div>

        {/* Minimal Stats Pill */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#E6EAF0] shadow-xs self-start sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033]">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>{studentData?.streakDays || 12} day streak</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033]">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{studentData?.xp || 1425} XP</span>
          </div>
        </div>
      </div>

      {/* 2. Primary: TODAY'S LEARNING (One Large Focused Visual Card) */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#FFC90B] to-[#FFB703] p-7 sm:p-9 text-[#172033] shadow-brand overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#172033] text-white text-[11px] font-black uppercase tracking-wider">
              Today's Priority
            </span>
            <span className="text-xs font-bold text-slate-900/80">
              Physics • Chapter 2: Electrostatics
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Electric Potential & Potential Difference
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-900/80 mt-1 leading-relaxed">
              Explore the interactive potential landscape and complete Lesson 3 to reach 65% chapter mastery.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={() => navigate('/student/lesson/phys-ch2-l3')}
              className="px-7 py-3 rounded-full bg-[#172033] hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all self-start"
            >
              <span>CONTINUE LESSON</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-32 h-2.5 bg-black/15 rounded-full overflow-hidden">
                <div className="h-full bg-[#172033] rounded-full w-[72%]" />
              </div>
              <span className="text-xs font-black text-[#172033]">72%</span>
            </div>
          </div>
        </div>

        {/* Subtle Background Glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/20 pointer-events-none blur-2xl" />
      </div>

      {/* 3. Secondary: YOUR SUBJECTS (4 Compact Scannable Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-[#172033] uppercase tracking-wider">
            Your Subjects
          </h3>
          <button
            onClick={() => navigate('/student/learn')}
            className="text-xs font-bold text-[#4F7CFF] hover:underline"
          >
            Open All Portals →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((subj) => {
            const Icon = subj.icon;
            return (
              <div
                key={subj.id}
                onClick={() => navigate(`/student/learn/${subj.id}`)}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6EAF0] p-5 hover:border-[#D0D5DD] hover:shadow-subtle transition-all cursor-pointer flex flex-col justify-between gap-4 group"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: subj.color }}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-base font-black text-[#172033]">
                    {subj.mastery}%
                  </span>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                    {subj.name}
                  </h4>
                  <p className="text-xs text-[#667085] mt-0.5 truncate">
                    {subj.currentFocus}
                  </p>
                </div>

                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${subj.mastery}%`, backgroundColor: subj.color }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#667085]">
                    <span>Mastery</span>
                    <span className="group-hover:translate-x-0.5 transition-transform text-[#172033]">
                      Open →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Row: Work Due Soon + Next Recommended Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Work Due Soon (~60%) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#172033] uppercase tracking-wider">
              Work Due Soon
            </h3>
            <button
              onClick={() => navigate('/student/work')}
              className="text-xs font-bold text-[#4F7CFF] hover:underline"
            >
              View All Work →
            </button>
          </div>

          <div className="space-y-3">
            {upcomingWork.map((task) => (
              <div
                key={task.id}
                onClick={() => navigate('/student/work')}
                className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0] hover:bg-white hover:border-[#D0D5DD] transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: task.color }}
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#172033]">
                      {task.title}
                    </h4>
                    <span className="text-[11px] text-[#667085]">
                      {task.subject} • Due {task.due}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#172033] whitespace-nowrap">
                  {task.marks} Marks
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Single Recommendation (~40%) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7C4DFF]" />
            <h3 className="text-sm font-black text-[#172033] uppercase tracking-wider">
              Next Move
            </h3>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#7C4DFF] bg-purple-50 px-2.5 py-0.5 rounded-full">
              Physics • Potential Difference
            </span>
            <p className="text-xs sm:text-sm font-medium text-[#172033] leading-relaxed">
              "Strengthen sign conventions for potential gradient before advancing to Capacitance."
            </p>
          </div>

          <button
            onClick={() => navigate('/student/lesson/phys-ch2-l3')}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-black bg-[#F7F9FC] hover:bg-[#EEF2F6] text-[#172033] border border-[#E6EAF0] flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Review Concept</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
