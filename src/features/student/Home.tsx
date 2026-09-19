import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  ArrowRight,
  Flame,
  Star,
  Sparkles,
  BookOpen,
  Target,
  Trophy,
  FastForward,
  Check,
  Atom,
  FlaskConical,
  BookMarked,
  Calculator,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { studentData } = useAuthStore();

  // 4 Subjects matching demo_screen.png aesthetic
  const subjects = [
    {
      id: 'mathematics',
      name: 'Math',
      topics: 'Algebra • Calculus • Geometry • Vectors',
      mastery: 78,
      accentColor: '#4F7CFF',
      bgColor: '#EFF4FF',
      btnColor: 'bg-[#4F7CFF] hover:bg-[#3D6CE6] text-white',
      path: '/student/learn/mathematics',
      icon: Calculator,
      symbol: '+ − × ÷',
    },
    {
      id: 'physics',
      name: 'Physics',
      topics: 'Mechanics • Thermodynamics • Electrostatics',
      mastery: 72,
      accentColor: '#7C4DFF',
      bgColor: '#F5F0FF',
      btnColor: 'bg-[#7C4DFF] hover:bg-[#6C3AE8] text-white',
      path: '/student/learn/physics',
      icon: Atom,
      symbol: '⚛',
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      topics: 'Organic • Inorganic • Physical • More',
      mastery: 64,
      accentColor: '#20C997',
      bgColor: '#E8F9F4',
      btnColor: 'bg-[#20C997] hover:bg-[#1BAF83] text-white',
      path: '/student/learn/chemistry',
      icon: FlaskConical,
      symbol: '⚗',
    },
    {
      id: 'english',
      name: 'English',
      topics: 'Grammar • Vocabulary • Comprehension • More',
      mastery: 81,
      accentColor: '#FF8A3D',
      bgColor: '#FFF3EB',
      btnColor: 'bg-[#FF8A3D] hover:bg-[#E87528] text-white',
      path: '/student/learn/english',
      icon: BookMarked,
      symbol: '📖',
    },
  ];

  // Work due soon: maximum 3 items, concise & actionable
  const workDue = [
    {
      id: 'task-1',
      title: 'Physics Electrostatics Assignment',
      subject: 'Physics',
      dueLabel: 'Due today',
      urgent: true,
      color: '#7C4DFF',
    },
    {
      id: 'task-2',
      title: 'Chemistry Electrochemistry Homework',
      subject: 'Chemistry',
      dueLabel: 'Due tomorrow',
      urgent: false,
      color: '#20C997',
    },
    {
      id: 'task-3',
      title: 'Mathematics Calculus Practice Test',
      subject: 'Mathematics',
      dueLabel: 'Due Friday',
      urgent: false,
      color: '#4F7CFF',
    },
  ];

  // Week days for streak tracker
  const weekDays = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  return (
    <div className="max-w-[1360px] mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. GREETING & COMPACT STATS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
            Good morning, {studentData?.name ? studentData.name.split(' ')[0] : 'Arjun'} 👋
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
            Ready for today's learning? Small steps lead to big mastery.
          </p>
        </div>

        {/* Streak and XP Pill */}
        <div
          onClick={() => navigate('/student/profile')}
          className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#E6EAF0] shadow-2xs self-start sm:self-auto cursor-pointer hover:border-[#FFC800] hover:shadow-xs transition-all select-none"
          title="View Profile & Progress"
        >
          <div className="flex items-center gap-1.5 text-xs font-black text-[#172033]">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>14 day streak</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5 text-xs font-black text-[#172033]">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>2,450 XP</span>
          </div>
        </div>
      </div>

      {/* 2. ASYMMETRIC GRID: Main (8 cols) & Supporting (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MAIN COLUMN (8 cols / ~67%) */}
        <div className="lg:col-span-8 space-y-8">
          {/* HERO CENTERPIECE: "Small Steps. Big Mastery." */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#FFC800] via-[#FFD026] to-[#FFAE00] p-6 sm:p-10 text-[#172033] shadow-subtle overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Text & CTA */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs sm:text-sm font-bold text-[#172033]/85 tracking-wide block">
                  Small Steps. Big Mastery.
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tight leading-[1.1] text-[#172033]">
                  Learn Today.
                  <br />
                  A Better You
                  <br />
                  Tomorrow.
                </h2>

                <p className="text-xs sm:text-sm font-bold text-[#172033]/80">
                  Learn → Practice → Master → Next
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => navigate('/student/learn/physics')}
                    className="px-6 py-3.5 rounded-full bg-[#172033] hover:bg-slate-800 active:scale-[0.99] text-white font-black text-xs sm:text-sm inline-flex items-center gap-2.5 shadow-md transition-all cursor-pointer"
                  >
                    <span>Continue Learning</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Right Illustration: Student with laptop & colorful book stack (Inspired by demo_screen.png) */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="w-full max-w-[270px]">
                  <svg viewBox="0 0 280 230" className="w-full h-auto select-none" fill="none">
                    {/* Sticky Note */}
                    <g transform="translate(180, 20) rotate(5)">
                      <rect width="80" height="75" rx="6" fill="#FFF8DB" stroke="#E6DBA8" strokeWidth="1.5" />
                      <text x="40" y="22" fill="#5C5538" fontSize="8.5" fontWeight="800" textAnchor="middle">Learn</text>
                      <text x="40" y="36" fill="#5C5538" fontSize="8.5" fontWeight="800" textAnchor="middle">Practice</text>
                      <text x="40" y="50" fill="#5C5538" fontSize="8.5" fontWeight="800" textAnchor="middle">Master</text>
                      <text x="40" y="64" fill="#5C5538" fontSize="8.5" fontWeight="800" textAnchor="middle">Next ↺</text>
                    </g>

                    {/* Fun handwritten annotation */}
                    <g transform="translate(60, 25) rotate(-12)">
                      <text x="0" y="0" fill="#172033" fontSize="10" fontWeight="900" fontStyle="italic">Same Student</text>
                      <text x="10" y="14" fill="#172033" fontSize="10" fontWeight="900" fontStyle="italic">- Higher Version ✦</text>
                      <path d="M 60 20 Q 80 35 70 50" stroke="#172033" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>

                    {/* Desk base line */}
                    <rect x="20" y="188" width="250" height="10" rx="5" fill="#172033" />

                    {/* Stack of colorful textbooks */}
                    <g transform="translate(185, 115)">
                      {/* Math */}
                      <rect x="0" y="52" width="70" height="18" rx="4" fill="#4F7CFF" />
                      <text x="35" y="65" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle">MATH</text>
                      {/* Physics */}
                      <rect x="4" y="34" width="66" height="18" rx="4" fill="#7C4DFF" />
                      <text x="37" y="47" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle">PHYSICS</text>
                      {/* Chemistry */}
                      <rect x="2" y="16" width="68" height="18" rx="4" fill="#20C997" />
                      <text x="36" y="29" fill="#FFFFFF" fontSize="8.5" fontWeight="900" textAnchor="middle">CHEMISTRY</text>
                      {/* English */}
                      <rect x="6" y="-2" width="62" height="18" rx="4" fill="#FF8A3D" />
                      <text x="37" y="11" fill="#FFFFFF" fontSize="8.5" fontWeight="900" textAnchor="middle">ENGLISH</text>
                    </g>

                    {/* Student Character */}
                    <g transform="translate(75, 55)">
                      {/* Crown doodle */}
                      <path d="M 35 15 L 42 22 L 50 12 L 58 22 L 65 15 L 63 26 L 37 26 Z" fill="#FFC800" stroke="#172033" strokeWidth="1.5" />

                      {/* Head & Hair */}
                      <circle cx="50" cy="50" r="22" fill="#FFDFC4" />
                      <path d="M 28 46 C 26 28 36 18 50 18 C 64 18 74 28 72 46 C 66 38 56 36 50 36 C 44 36 34 38 28 46 Z" fill="#172033" />
                      <path d="M 30 40 Q 36 26 50 28 Q 64 26 70 40" stroke="#172033" strokeWidth="3" strokeLinecap="round" />

                      {/* Eyes & Smile */}
                      <circle cx="43" cy="50" r="2.5" fill="#172033" />
                      <circle cx="57" cy="50" r="2.5" fill="#172033" />
                      <path d="M 46 58 Q 50 62 54 58" stroke="#172033" strokeWidth="2" strokeLinecap="round" fill="none" />

                      {/* Hoodie Body */}
                      <path d="M 50 72 C 30 72 18 100 18 135 L 82 135 C 82 100 70 72 50 72 Z" fill="#172033" />
                      <path d="M 50 72 L 42 135" stroke="#24304A" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 50 72 L 58 135" stroke="#24304A" strokeWidth="2.5" strokeLinecap="round" />
                    </g>

                    {/* Laptop with Infinity Logo */}
                    <g transform="translate(115, 138)">
                      <rect x="8" y="0" width="64" height="42" rx="4" fill="#24304A" stroke="#172033" strokeWidth="2" />
                      <rect x="11" y="3" width="58" height="36" rx="2" fill="#172033" />
                      {/* Infinity Logo on lid */}
                      <circle cx="36" cy="21" r="4.5" stroke="#FFC800" strokeWidth="2" fill="none" />
                      <circle cx="44" cy="21" r="4.5" stroke="#FFC800" strokeWidth="2" fill="none" />
                      <polygon points="0,48 80,48 72,42 8,42" fill="#98A2B3" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CHOOSE A SUBJECT (4 Clean, Distinct Subject Cards) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight">
                  Choose a Subject
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">
                  Learn concepts, practice questions and track your progress.
                </p>
              </div>

              <button
                onClick={() => navigate('/student/learn')}
                className="text-xs sm:text-sm font-black text-[#4F7CFF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {subjects.map((subj) => {
                const IconComponent = subj.icon;
                return (
                  <div
                    key={subj.id}
                    onClick={() => navigate(subj.path)}
                    className="bg-white rounded-3xl border border-[#E6EAF0] p-5 hover:border-slate-300 hover:shadow-subtle hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      {/* Icon Box */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-105"
                        style={{ backgroundColor: subj.bgColor, color: subj.accentColor }}
                      >
                        <IconComponent className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                          {subj.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#667085] mt-1 leading-snug line-clamp-2">
                          {subj.topics}
                        </p>
                      </div>

                      {/* Progress Bar & Label */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-xs font-black text-[#172033]">
                          <span className="text-[11px] text-[#667085]">Mastery</span>
                          <span>{subj.mastery}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${subj.mastery}%`, backgroundColor: subj.accentColor }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <div className="pt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(subj.path);
                        }}
                        className={cn(
                          'w-full py-2.5 px-4 rounded-full font-black text-xs flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer',
                          subj.btnColor
                        )}
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. YOUR LEARNING JOURNEY (Interactive Loop Bar) */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-6">
            <div>
              <h3 className="text-lg font-black text-[#172033] tracking-tight">
                Your Learning Journey
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">
                Follow the loop and keep moving forward.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
              {/* Step 1: Learn */}
              <div
                onClick={() => navigate('/student/learn')}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EFF4FF] text-[#4F7CFF] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                  <BookOpen className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033]">Learn</span>
                <span className="text-[11px] font-semibold text-[#667085] mt-0.5">
                  Understand core concepts
                </span>
              </div>

              {/* Step 2: Practice */}
              <div
                onClick={() => navigate('/student/practice')}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5F0FF] text-[#7C4DFF] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                  <Target className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033]">Practice</span>
                <span className="text-[11px] font-semibold text-[#667085] mt-0.5">
                  Solve adaptive questions
                </span>
              </div>

              {/* Step 3: Master */}
              <div
                onClick={() => navigate('/student/profile')}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E8F9F4] text-[#20C997] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                  <Trophy className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033]">Master</span>
                <span className="text-[11px] font-semibold text-[#667085] mt-0.5">
                  Build confidence & XP
                </span>
              </div>

              {/* Step 4: Next */}
              <div
                onClick={() => navigate('/student/learn')}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9E6] text-[#FFC800] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                  <FastForward className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033]">Next</span>
                <span className="text-[11px] font-semibold text-[#667085] mt-0.5">
                  Unlock next chapters
                </span>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs text-[#667085] font-semibold gap-2">
              <span className="italic">"Discipline today, freedom tomorrow."</span>
              <span className="text-[#FF8A3D] font-bold">Keep Learning ♡</span>
            </div>
          </div>
        </div>

        {/* SUPPORTING COLUMN (4 cols / ~33%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. LEARNING STREAK WIDGET (Directly from demo_screen.png) */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#667085] block">
                  Your Learning Streak
                </span>
                <h3 className="text-2xl font-black text-[#172033] tracking-tight">
                  14 days
                </h3>
                <p className="text-xs font-semibold text-[#667085] mt-0.5">
                  Keep going! Consistency wins.
                </p>
              </div>
            </div>

            {/* Week Days Tracker */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {weekDays.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                      item.completed
                        ? 'bg-[#20C997] text-white shadow-2xs'
                        : 'bg-[#F2F4F7] text-[#98A2B3] border border-[#E6EAF0]'
                    )}
                  >
                    {item.completed ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                  </div>
                  <span className="text-[11px] font-bold text-[#667085]">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. MEET YOUR AI TUTOR (Directly from demo_screen.png) */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#172033] tracking-tight">
                Meet Your AI Tutor
              </h3>
              <p className="text-xs font-medium text-[#667085]">
                Academic guidance whenever you need it.
              </p>
            </div>

            {/* Friendly Avatar & Speech Bubble */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F0FF] border border-[#E9E0FF] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Sparkles className="w-6 h-6 text-[#7C4DFF]" />
              </div>

              <div className="flex-1 bg-[#F5F0FF] text-[#172033] p-3 rounded-2xl text-xs font-bold leading-snug border border-[#E9E0FF] relative">
                Stuck on a concept? I'm here to help!
              </div>
            </div>

            {/* Ask Anything CTA */}
            <button
              onClick={() => navigate('/student/ai')}
              className="w-full py-3 rounded-full bg-[#7C4DFF] hover:bg-[#6C3AE8] active:scale-[0.99] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Ask Anything</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 4 Quick Action Chips */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => navigate('/student/ai?mode=explain')}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F7F9FC] hover:bg-[#F0F3F9] border border-[#E6EAF0] text-center transition-colors cursor-pointer"
              >
                <span className="text-sm">💡</span>
                <span className="text-[10px] font-bold text-[#172033] mt-1">Explain</span>
              </button>
              <button
                onClick={() => navigate('/student/ai?mode=solve')}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F7F9FC] hover:bg-[#F0F3F9] border border-[#E6EAF0] text-center transition-colors cursor-pointer"
              >
                <span className="text-sm">⚙️</span>
                <span className="text-[10px] font-bold text-[#172033] mt-1">Solve</span>
              </button>
              <button
                onClick={() => navigate('/student/ai?mode=quiz')}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F7F9FC] hover:bg-[#F0F3F9] border border-[#E6EAF0] text-center transition-colors cursor-pointer"
              >
                <span className="text-sm">📝</span>
                <span className="text-[10px] font-bold text-[#172033] mt-1">Quiz</span>
              </button>
              <button
                onClick={() => navigate('/student/ai?mode=summary')}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F7F9FC] hover:bg-[#F0F3F9] border border-[#E6EAF0] text-center transition-colors cursor-pointer"
              >
                <span className="text-sm">📑</span>
                <span className="text-[10px] font-bold text-[#172033] mt-1">Summary</span>
              </button>
            </div>
          </div>

          {/* 3. WORK DUE SOON (Clean, Focused, Max 3 Items) */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-[#172033] tracking-tight">
                Work due soon
              </h3>
              <button
                onClick={() => navigate('/student/work')}
                className="text-xs font-black text-[#4F7CFF] hover:underline cursor-pointer"
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
                      <span className="text-[11px] font-semibold text-[#667085] block mt-0.5">
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
                      'px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex-shrink-0 cursor-pointer',
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
        </div>
      </div>
    </div>
  );
};

