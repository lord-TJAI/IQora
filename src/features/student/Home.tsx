import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  ArrowRight,
  BookOpen,
  Target,
  Trophy,
  ChevronsRight,
  Flame,
  Check,
  X,
  Lightbulb,
  Code2,
  FileText,
  AlignLeft,
  Atom,
  FlaskConical,
  Star,
  Lock,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { studentData } = useAuthStore();

  const handleContinueSubject = (subjectId: string) => {
    navigate(`/student/learn/${subjectId}`);
  };

  const handleAiAction = (action: string) => {
    navigate(`/student/ai?action=${encodeURIComponent(action)}`);
  };

  const subjects = [
    {
      id: 'math',
      title: 'Math',
      topics: 'Algebra • Calculus\nGeometry • More',
      progress: 68,
      color: '#3B82F6',
      bgLight: 'bg-blue-50/50',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#3B82F6] flex flex-col items-center justify-center text-white font-black text-xs shadow-xs leading-none">
          <div className="flex gap-1 mb-0.5">
            <span>+</span>
            <span>−</span>
          </div>
          <div className="flex gap-1">
            <span>×</span>
            <span>÷</span>
          </div>
        </div>
      ),
    },
    {
      id: 'physics',
      title: 'Physics',
      topics: 'Mechanics • Thermodynamics\nElectromagnetism • More',
      progress: 42,
      color: '#7C3AED',
      bgLight: 'bg-purple-50/50',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] flex items-center justify-center text-white shadow-xs">
          <Atom className="w-6 h-6 stroke-[2.2]" />
        </div>
      ),
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      topics: 'Organic • Inorganic\nPhysical • More',
      progress: 35,
      color: '#10B981',
      bgLight: 'bg-emerald-50/50',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#10B981] flex items-center justify-center text-white shadow-xs">
          <FlaskConical className="w-6 h-6 stroke-[2.2]" />
        </div>
      ),
    },
    {
      id: 'english',
      title: 'English',
      topics: 'Grammar • Vocabulary\nComprehension • More',
      progress: 58,
      color: '#F97316',
      bgLight: 'bg-orange-50/50',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#F97316] flex items-center justify-center text-white shadow-xs">
          <BookOpen className="w-6 h-6 stroke-[2.2]" />
        </div>
      ),
    },
  ];

  const weekdays = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Solved 10 Math questions',
      time: '2 hours ago',
      icon: <Check className="w-3.5 h-3.5 text-white stroke-[3]" />,
      iconBg: 'bg-[#10B981]',
    },
    {
      id: 2,
      title: "Learned: Newton's Laws",
      time: '5 hours ago',
      icon: <BookOpen className="w-3.5 h-3.5 text-white" />,
      iconBg: 'bg-[#7C3AED]',
    },
    {
      id: 3,
      title: 'Completed English Vocabulary Set 1',
      time: 'Yesterday',
      icon: <BookOpen className="w-3.5 h-3.5 text-white" />,
      iconBg: 'bg-[#F97316]',
    },
    {
      id: 4,
      title: 'Missed practice goal',
      time: 'Yesterday',
      icon: <X className="w-3.5 h-3.5 text-white stroke-[3]" />,
      iconBg: 'bg-[#EF4444]',
    },
  ];

  const achievements = [
    { id: 1, label: 'First Steps', icon: Star, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { id: 2, label: '7 Day Streak', icon: Flame, color: 'text-orange-500 bg-orange-50 border-orange-200' },
    { id: 3, label: 'Math Starter', icon: Trophy, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { id: 4, label: 'Problem Solver', icon: Target, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 5, label: 'Consistent', icon: Sparkles, color: 'text-yellow-500 bg-yellow-50 border-yellow-200' },
    { id: 6, label: 'Subject Master', icon: Lock, color: 'text-slate-400 bg-slate-100 border-slate-200', locked: true },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 2-Column Asymmetric Layout Matching demo_screen.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Hero Banner, Choose a Subject, Learning Journey              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* 1. HERO BANNER */}
          <div className="relative rounded-[28px] sm:rounded-[32px] bg-[#FFC90B] p-6 sm:p-9 overflow-hidden shadow-brand flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left Banner Text */}
            <div className="relative z-10 max-w-md">
              <div className="text-xs sm:text-sm font-black text-slate-800 tracking-wide uppercase">
                Small Steps.
                <br />
                Big Mastery.
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.08] text-[#172033] my-3 sm:my-4">
                Learn Today.
                <br />
                A Better You
                <br />
                Tomorrow.
              </h1>

              <p className="text-xs sm:text-sm font-extrabold text-slate-800/90 tracking-wide mb-6">
                Learn → Practice → Master → Next
              </p>

              <button
                onClick={() => navigate('/student/lesson/phys-ch2-l3')}
                className="bg-[#172033] text-white hover:bg-slate-800 font-extrabold px-7 py-3.5 rounded-full text-xs sm:text-sm inline-flex items-center gap-2.5 shadow-md transition-all group"
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Banner Artwork / Illustration */}
            <div className="relative z-10 flex-shrink-0 flex items-center justify-center select-none">
              <div className="relative w-72 h-56 sm:w-80 sm:h-64 flex items-end justify-center">
                {/* Doodles: Crown, note, arrow */}
                <div className="absolute top-0 left-12 text-slate-800 flex flex-col items-center">
                  <div className="text-sm font-black -rotate-6">👑</div>
                  <span className="text-[10px] font-bold text-slate-700 italic -rotate-6">
                    Same Student
                    <br />
                    Higher Version ↗
                  </span>
                </div>

                {/* Sticky Note */}
                <div className="absolute top-2 right-4 bg-yellow-100 border border-yellow-300 shadow-xs px-3 py-2 rounded-lg rotate-3 text-[10px] font-extrabold text-slate-800 leading-tight">
                  <div>Learn</div>
                  <div>Practice</div>
                  <div>Master</div>
                  <div>Next ↺</div>
                </div>

                {/* Student Avatar with Yellow Hoodie & Laptop */}
                <div className="relative flex flex-col items-center">
                  {/* Plant decoration on left */}
                  <div className="absolute -left-12 bottom-6 text-2xl">🪴</div>

                  {/* Character Illustration */}
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-amber-300 border-4 border-[#172033] overflow-hidden flex items-center justify-center relative shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80"
                      alt="Student"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>

                  {/* Laptop with Infinity Logo */}
                  <div className="w-44 h-14 bg-slate-800 rounded-t-xl border-t-2 border-slate-600 shadow-md flex items-center justify-center mt-[-14px] z-20 relative">
                    <span className="text-amber-400 font-black text-xl tracking-widest">
                      ∞
                    </span>
                  </div>
                  <div className="w-52 h-2.5 bg-slate-900 rounded-b-md shadow-xs z-20" />
                </div>

                {/* Subject Books Stack */}
                <div className="absolute right-0 bottom-2 flex flex-col gap-0.5 z-10">
                  <div className="px-2.5 py-0.5 rounded-sm bg-[#3B82F6] text-white text-[9px] font-black shadow-2xs">
                    MATH
                  </div>
                  <div className="px-2.5 py-0.5 rounded-sm bg-[#7C3AED] text-white text-[9px] font-black shadow-2xs">
                    PHYSICS
                  </div>
                  <div className="px-2.5 py-0.5 rounded-sm bg-[#10B981] text-white text-[9px] font-black shadow-2xs">
                    CHEMISTRY
                  </div>
                  <div className="px-2.5 py-0.5 rounded-sm bg-[#F97316] text-white text-[9px] font-black shadow-2xs">
                    ENGLISH
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/20 pointer-events-none blur-xl" />
          </div>

          {/* 2. CHOOSE A SUBJECT */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight">
                  Choose a Subject
                </h2>
                <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
                  Learn concepts, practice questions and track your progress.
                </p>
              </div>
              <button
                onClick={() => navigate('/student/learn')}
                className="text-xs font-bold text-[#6366F1] hover:text-[#4F46E5] flex items-center gap-1 transition-colors group"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {subjects.map((subj) => (
                <div
                  key={subj.id}
                  className="bg-white rounded-3xl border border-[#E6EAF0] p-5 flex flex-col justify-between hover:shadow-subtle hover:border-[#D0D5DD] transition-all"
                >
                  <div>
                    {subj.icon}
                    <h3 className="text-base font-black text-[#172033] mt-3">
                      {subj.title}
                    </h3>
                    <p className="text-xs text-[#667085] whitespace-pre-line mt-1 leading-relaxed">
                      {subj.topics}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {/* Progress Bar & Percentage */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${subj.progress}%`,
                            backgroundColor: subj.color,
                          }}
                        />
                      </div>
                      <span className="text-xs font-black text-[#172033]">
                        {subj.progress}%
                      </span>
                    </div>

                    {/* Pill Action Button */}
                    <button
                      onClick={() => handleContinueSubject(subj.id)}
                      className="w-full py-2 px-4 rounded-full text-xs font-black text-white flex items-center justify-center gap-1.5 shadow-xs transition-opacity hover:opacity-90"
                      style={{ backgroundColor: subj.color }}
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. YOUR LEARNING JOURNEY */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle">
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-black text-[#172033] tracking-tight">
                Your Learning Journey
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
                Follow the loop and keep moving forward.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center relative">
              {/* Step 1: Learn */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#3B82F6] text-white flex items-center justify-center shadow-xs">
                  <BookOpen className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033] mt-2.5">
                  Learn
                </span>
                <span className="text-xs text-[#667085] mt-0.5">
                  Understand core concepts
                </span>
              </div>

              {/* Step 2: Practice */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-xs">
                  <Target className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033] mt-2.5">
                  Practice
                </span>
                <span className="text-xs text-[#667085] mt-0.5">
                  Solve questions
                </span>
              </div>

              {/* Step 3: Master */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
                  <Trophy className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033] mt-2.5">
                  Master
                </span>
                <span className="text-xs text-[#667085] mt-0.5">
                  Build confidence
                </span>
              </div>

              {/* Step 4: Next */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-xs">
                  <ChevronsRight className="w-7 h-7 stroke-[2.5]" />
                </div>
                <span className="text-sm font-black text-[#172033] mt-2.5">
                  Next
                </span>
                <span className="text-xs text-[#667085] mt-0.5">
                  Unlock new topics
                </span>
              </div>
            </div>
          </div>

          {/* 4. FOOTER QUOTE & ENCOURAGEMENT */}
          <div className="flex items-center justify-between text-xs italic text-[#98A2B3] font-medium pt-2 px-1">
            <span>"Discipline today, freedom tomorrow."</span>
            <span className="text-[#667085]">Keep Learning ♡</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Streak, Meet AI Tutor, Recent Activity, Achievements        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. YOUR LEARNING STREAK */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shadow-xs flex-shrink-0">
                <Flame className="w-9 h-9 text-[#F97316] fill-[#F97316]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#667085] uppercase tracking-wider block">
                  Your Learning Streak
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight block">
                  {studentData?.streakDays || 7} days
                </span>
                <span className="text-xs text-[#667085]">
                  Keep going! Consistency wins.
                </span>
              </div>
            </div>

            {/* Weekday Circles Tracker */}
            <div className="grid grid-cols-7 gap-2 pt-2 border-t border-[#F0F2F5]">
              {weekdays.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-1.5">
                  {item.completed ? (
                    <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-2xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-[#E6EAF0] bg-slate-50/50" />
                  )}
                  <span className="text-[11px] font-bold text-[#667085]">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. MEET YOUR AI TUTOR */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#172033] tracking-tight">
                Meet Your AI Tutor
              </h3>
            </div>

            {/* Robot Avatar & Speech Bubble */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-100 to-indigo-100 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
                🤖
              </div>
              <div className="relative bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold p-3 rounded-2xl rounded-tl-none border border-[#E0E7FF] shadow-2xs">
                Stuck on a concept?
                <br />
                I'm here to help!
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => navigate('/student/ai')}
              className="w-full py-2.5 px-5 rounded-full text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>Ask Anything</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 4 Action Pills */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => handleAiAction('explain')}
                className="p-2.5 rounded-2xl bg-[#F5F3FF] text-[#7C3AED] hover:bg-[#EDE9FE] transition-colors flex flex-col items-center gap-1.5"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="text-[11px] font-black">Explain</span>
              </button>

              <button
                onClick={() => handleAiAction('solve')}
                className="p-2.5 rounded-2xl bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] transition-colors flex flex-col items-center gap-1.5"
              >
                <Code2 className="w-4 h-4" />
                <span className="text-[11px] font-black">Solve</span>
              </button>

              <button
                onClick={() => handleAiAction('quiz')}
                className="p-2.5 rounded-2xl bg-[#FDF2F8] text-[#DB2777] hover:bg-[#FCE7F3] transition-colors flex flex-col items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span className="text-[11px] font-black">Quiz</span>
              </button>

              <button
                onClick={() => handleAiAction('summarize')}
                className="p-2.5 rounded-2xl bg-[#F0FDF4] text-[#059669] hover:bg-[#DCFCE7] transition-colors flex flex-col items-center gap-1.5"
              >
                <AlignLeft className="w-4 h-4" />
                <span className="text-[11px] font-black">Summarize</span>
              </button>
            </div>
          </div>

          {/* 3. RECENT ACTIVITY & ACHIEVEMENTS (Side by Side or Stacked) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Recent Activity Card */}
            <div className="bg-white rounded-3xl border border-[#E6EAF0] p-4 sm:p-5 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h4 className="text-xs sm:text-sm font-black text-[#172033]">
                    Recent Activity
                  </h4>
                  <button
                    onClick={() => navigate('/student/profile')}
                    className="text-[11px] font-bold text-[#6366F1] hover:text-[#4F46E5]"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {recentActivities.map((act) => (
                    <div key={act.id} className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs',
                          act.iconBg
                        )}
                      >
                        {act.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#172033] truncate">
                          {act.title}
                        </p>
                        <span className="text-[10px] text-[#667085]">
                          {act.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-white rounded-3xl border border-[#E6EAF0] p-4 sm:p-5 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h4 className="text-xs sm:text-sm font-black text-[#172033]">
                    Achievements
                  </h4>
                  <button
                    onClick={() => navigate('/student/profile')}
                    className="text-[11px] font-bold text-[#6366F1] hover:text-[#4F46E5]"
                  >
                    View All →
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {achievements.map((ach) => {
                    const Icon = ach.icon;
                    return (
                      <div
                        key={ach.id}
                        className="flex flex-col items-center text-center p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-xl border flex items-center justify-center mb-1 shadow-2xs',
                            ach.color
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-[#172033] leading-tight line-clamp-2">
                          {ach.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
