import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  ArrowRight,
  Flame,
  Star,
  BookOpen,
  Target,
  Trophy,
  FastForward,
  Check,
  X,
  Atom,
  FlaskConical,
  BookMarked,
  Calculator,
  Award,
  Zap,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { studentData } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'activity' | 'work'>('activity');

  // 4 Subjects matching demo_screen.png aesthetic
  const subjects = [
    {
      id: 'mathematics',
      name: 'Math',
      topics: 'Algebra • Calculus\nGeometry • More',
      mastery: 68,
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
      topics: 'Mechanics • Thermodynamics\nElectromagnetism • More',
      mastery: 42,
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
      topics: 'Organic • Inorganic\nPhysical • More',
      mastery: 35,
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
      topics: 'Grammar • Vocabulary\nComprehension • More',
      mastery: 58,
      accentColor: '#FF8A3D',
      bgColor: '#FFF3EB',
      btnColor: 'bg-[#FF8A3D] hover:bg-[#E87528] text-white',
      path: '/student/learn/english',
      icon: BookMarked,
      symbol: '📖',
    },
  ];

  // Week days for streak tracker (matching demo_screen.png)
  const weekDays = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  // Recent Activity matching demo_screen.png
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Solved 10 Math questions',
      time: '2 hours ago',
      type: 'success',
      icon: Check,
      color: '#20C997',
      bgColor: '#E8F9F4',
    },
    {
      id: 'act-2',
      title: "Learned: Newton's Laws",
      time: '5 hours ago',
      type: 'learn',
      icon: BookOpen,
      color: '#7C4DFF',
      bgColor: '#F5F0FF',
    },
    {
      id: 'act-3',
      title: 'Completed English Vocabulary Set 1',
      time: 'Yesterday',
      type: 'learn',
      icon: BookMarked,
      color: '#FF8A3D',
      bgColor: '#FFF3EB',
    },
    {
      id: 'act-4',
      title: 'Missed practice goal',
      time: 'Yesterday',
      type: 'missed',
      icon: X,
      color: '#FF5C5C',
      bgColor: '#FFF0F0',
    },
  ];

  // Work due soon (for toggle tab)
  const workDue = [
    {
      id: 'task-1',
      title: 'Physics Electrostatics Assignment',
      dueLabel: 'Due today',
      urgent: true,
      color: '#7C4DFF',
    },
    {
      id: 'task-2',
      title: 'Chemistry Electrochemistry Homework',
      dueLabel: 'Due tomorrow',
      urgent: false,
      color: '#20C997',
    },
    {
      id: 'task-3',
      title: 'Mathematics Calculus Practice Test',
      dueLabel: 'Due Friday',
      urgent: false,
      color: '#4F7CFF',
    },
  ];

  // Hexagonal badges for Achievements matching demo_screen.png
  const achievements = [
    { id: '1', name: 'First Steps', fill: '#F59E0B', border: '#D97706', icon: Star, locked: false },
    { id: '2', name: '7 Day Streak', fill: '#EAB308', border: '#CA8A04', icon: Flame, locked: false },
    { id: '3', name: 'Math Starter', fill: '#3B82F6', border: '#2563EB', icon: Award, locked: false },
    { id: '4', name: 'Problem Solver', fill: '#F97316', border: '#EA580C', icon: Target, locked: false },
    { id: '5', name: 'Consistent', fill: '#EAB308', border: '#CA8A04', icon: Zap, locked: false },
    { id: '6', name: 'Subject Master', fill: '#E2E8F0', border: '#CBD5E1', icon: Lock, locked: true },
  ];

  return (
    <div className="max-w-[1440px] mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 2-COLUMN ASYMMETRIC GRID: Left (Main Content, ~66%) & Right (Sidebar Widgets, ~34%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN (8 cols / ~67%)                              */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. HERO BANNER: "Small Steps. Big Mastery." */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#FED31F] via-[#FED422] to-[#FFD934] text-[#172033] shadow-subtle overflow-hidden border border-[#E6EAF0]/40">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[310px]">
              {/* Left Text & CTA */}
              <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10">
                <div className="space-y-3">
                  <span className="text-xs sm:text-sm font-extrabold text-[#172033]/85 tracking-wide block">
                    Small Steps. Big Mastery.
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.08] text-[#172033]">
                    Learn Today.
                    <br />
                    A Better You
                    <br />
                    Tomorrow.
                  </h2>

                  <p className="text-xs sm:text-sm font-extrabold text-[#172033]/80 pt-1">
                    Learn → Practice → Master → Next
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => navigate('/student/learn/physics')}
                    className="px-7 py-3.5 rounded-full bg-[#172033] hover:bg-slate-800 active:scale-[0.98] text-white font-black text-xs sm:text-sm inline-flex items-center gap-2.5 shadow-md transition-all cursor-pointer"
                  >
                    <span>Continue Learning</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Right Illustration: Anime Boy from demo_screen.png with laptop, books & sticky note */}
              <div className="md:col-span-6 flex items-end justify-end relative overflow-hidden">
                <img
                  src="/hero_character.png"
                  alt="Student Continuing Learning"
                  className="w-full h-full max-h-[344px] object-contain object-right-bottom select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* 2. CHOOSE A SUBJECT (4 Clean, Distinct Subject Cards) */}
          <div className="space-y-3.5">
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
                    className="bg-white rounded-3xl border border-[#E6EAF0] p-5 hover:border-slate-300 hover:shadow-subtle hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      {/* Icon Box */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-105"
                        style={{ backgroundColor: subj.bgColor, color: subj.accentColor }}
                      >
                        {subj.id === 'mathematics' ? (
                          <div className="font-black text-sm tracking-tighter leading-none select-none text-center">
                            + −
                            <br />× ÷
                          </div>
                        ) : (
                          <IconComponent className="w-6 h-6 stroke-[2.2]" />
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                          {subj.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#667085] mt-1 leading-snug whitespace-pre-line">
                          {subj.topics}
                        </p>
                      </div>

                      {/* Progress Bar & Label */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-xs font-black text-[#172033]">
                          <div className="w-full h-2 bg-[#F2F4F7] rounded-full overflow-hidden mr-3">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${subj.mastery}%`, backgroundColor: subj.accentColor }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-[#667085] flex-shrink-0">
                            {subj.mastery}%
                          </span>
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

          {/* 3. YOUR LEARNING JOURNEY (Matching demo_screen.png) */}
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
                <div className="w-13 h-13 rounded-full bg-[#4F7CFF] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
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
                <div className="w-13 h-13 rounded-full bg-[#7C4DFF] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                  <Target className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033]">Practice</span>
                <span className="text-[11px] font-semibold text-[#667085] mt-0.5">
                  Solve questions
                </span>
              </div>

              {/* Step 3: Master */}
              <div
                onClick={() => navigate('/student/profile')}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-13 h-13 rounded-full bg-[#20C997] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                  <Trophy className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-sm font-black text-[#172033]">Master</span>
                <span className="text-[11px] font-semibold text-[#667085] mt-0.5">
                  Build confidence
                </span>
              </div>

              {/* Step 4: Next */}
              <div
                onClick={() => navigate('/student/learn')}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-13 h-13 rounded-full bg-[#FFC800] text-[#172033] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                  <FastForward className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-sm font-black text-[#172033]">Next</span>
                <span className="text-[11px] font-semibold text-[#667085] mt-0.5">
                  Unlock new topics
                </span>
              </div>
            </div>

            {/* Bottom Quote matching demo_screen.png */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs text-[#667085] font-semibold gap-2">
              <span className="italic">"Discipline today, freedom tomorrow."</span>
              <span className="text-[#FF8A3D] font-bold">Keep Learning ♡</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN (4 cols / ~33%)                             */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. LEARNING STREAK WIDGET */}
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
                  7 days
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

          {/* 2. MEET YOUR AI TUTOR (With cute 3D robot illustration from demo_screen.png) */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#172033] tracking-tight">
                Meet Your AI Tutor
              </h3>
            </div>

            {/* Friendly 3D Robot & Speech Bubble */}
            <div className="flex items-center gap-3">
              <img
                src="/ai_robot.png"
                alt="AI Tutor Robot"
                className="w-20 h-auto object-contain flex-shrink-0 select-none pointer-events-none drop-shadow-2xs"
              />

              <div className="flex-1 bg-[#F5F0FF] text-[#172033] p-3.5 rounded-2xl text-xs font-bold leading-snug border border-[#E9E0FF] relative">
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
                <span className="text-xs font-mono font-bold text-[#7C4DFF]">&lt;/&gt;</span>
                <span className="text-[10px] font-bold text-[#172033] mt-1">Solve</span>
              </button>
              <button
                onClick={() => navigate('/student/ai?mode=quiz')}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F7F9FC] hover:bg-[#F0F3F9] border border-[#E6EAF0] text-center transition-colors cursor-pointer"
              >
                <span className="text-sm">📄</span>
                <span className="text-[10px] font-bold text-[#172033] mt-1">Quiz</span>
              </button>
              <button
                onClick={() => navigate('/student/ai?mode=summary')}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F7F9FC] hover:bg-[#F0F3F9] border border-[#E6EAF0] text-center transition-colors cursor-pointer"
              >
                <span className="text-sm">📑</span>
                <span className="text-[10px] font-bold text-[#172033] mt-1">Summarize</span>
              </button>
            </div>
          </div>

          {/* 3. RECENT ACTIVITY & ACHIEVEMENTS (2-Column Grid matching demo_screen.png) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card A: Recent Activity / Work Due */}
            <div className="bg-white rounded-3xl border border-[#E6EAF0] p-4 sm:p-5 shadow-subtle flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('activity')}
                      className={cn(
                        'text-sm font-black transition-colors cursor-pointer',
                        activeTab === 'activity' ? 'text-[#172033]' : 'text-[#98A2B3] hover:text-[#172033]'
                      )}
                    >
                      Recent Activity
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={() => setActiveTab('work')}
                      className={cn(
                        'text-xs font-bold transition-colors cursor-pointer',
                        activeTab === 'work' ? 'text-[#4F7CFF]' : 'text-[#98A2B3] hover:text-[#172033]'
                      )}
                    >
                      Work Due
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(activeTab === 'activity' ? '/student/profile' : '/student/work')}
                    className="text-[11px] font-bold text-[#4F7CFF] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Tab 1: Recent Activity */}
                {activeTab === 'activity' && (
                  <div className="space-y-2.5">
                    {recentActivities.map((act) => {
                      const IconComponent = act.icon;
                      return (
                        <div key={act.id} className="flex items-start gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: act.bgColor, color: act.color }}
                          >
                            <IconComponent className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#172033] leading-snug line-clamp-1">
                              {act.title}
                            </p>
                            <span className="text-[10px] font-semibold text-[#98A2B3]">
                              {act.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab 2: Work Due */}
                {activeTab === 'work' && (
                  <div className="space-y-2.5">
                    {workDue.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => navigate(`/student/work/${item.id}`)}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-[#172033] truncate">
                            {item.title}
                          </p>
                          <span className="text-[10px] font-semibold text-[#667085]">
                            {item.dueLabel}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#172033] text-white flex-shrink-0">
                          Open
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Card B: Achievements (Hexagonal Badges matching demo_screen.png) */}
            <div className="bg-white rounded-3xl border border-[#E6EAF0] p-4 sm:p-5 shadow-subtle flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2">
                  <h4 className="text-sm font-black text-[#172033] tracking-tight">
                    Achievements
                  </h4>
                  <button
                    onClick={() => navigate('/student/profile')}
                    className="text-[11px] font-bold text-[#4F7CFF] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* 3x2 Grid of Hexagonal Badges */}
                <div className="grid grid-cols-3 gap-y-3 gap-x-1 pt-1">
                  {achievements.map((badge) => {
                    const IconComponent = badge.icon;
                    return (
                      <div
                        key={badge.id}
                        onClick={() => navigate('/student/profile')}
                        className="flex flex-col items-center text-center group cursor-pointer"
                        title={badge.name}
                      >
                        {/* Hexagon SVG Badge */}
                        <div className="relative w-9 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                          <svg viewBox="0 0 44 48" className="w-full h-full drop-shadow-2xs">
                            <polygon
                              points="22,2 42,12 42,36 22,46 2,36 2,12"
                              fill={badge.locked ? '#F2F4F7' : badge.fill}
                              stroke={badge.locked ? '#CBD5E1' : badge.border}
                              strokeWidth="2.5"
                            />
                          </svg>
                          <div
                            className={cn(
                              'absolute inset-0 flex items-center justify-center',
                              badge.locked ? 'text-[#98A2B3]' : 'text-white drop-shadow-xs'
                            )}
                          >
                            <IconComponent className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-[#172033] mt-1 leading-tight line-clamp-1 max-w-[62px]">
                          {badge.name}
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
