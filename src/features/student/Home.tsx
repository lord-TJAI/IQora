import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSubjects } from '@/data/curriculum';
import { demoTasks } from '@/demo/demoData';
import {
  ArrowRight,
  Flame,
  BookOpen,
  Target,
  Trophy,
  FastForward,
  Check,
  Atom,
  FlaskConical,
  BookMarked,
  Calculator,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const StudentHome: React.FC = () => {
  const navigate = useNavigate();

  // Dynamically load mastery from curriculum so percentages in Home & Learn always match 100%
  const curriculumSubjects = getAllSubjects();
  const getSubjectMastery = (id: string, fallback: number) => {
    const s = curriculumSubjects.find((subj) => subj.id === id);
    return s ? s.overallMastery : fallback;
  };

  // 4 Subjects matching demo_screen.png aesthetic & Learn page mastery %
  const subjects = [
    {
      id: 'mathematics',
      name: 'Math',
      topics: 'Algebra • Calculus\nGeometry • More',
      mastery: getSubjectMastery('mathematics', 78),
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
      mastery: getSubjectMastery('physics', 72),
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
      mastery: getSubjectMastery('chemistry', 64),
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
      mastery: getSubjectMastery('english', 81),
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

  // Recent Activity matching actual student actions
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Solved 10 Math questions',
      time: '2 hours ago',
      path: '/student/practice/mathematics',
      icon: Check,
      color: '#20C997',
      bgColor: '#E8F9F4',
    },
    {
      id: 'act-2',
      title: "Learned: Newton's Laws",
      time: '5 hours ago',
      path: '/student/learn/physics',
      icon: BookOpen,
      color: '#7C4DFF',
      bgColor: '#F5F0FF',
    },
    {
      id: 'act-3',
      title: 'Completed English Vocabulary Set 1',
      time: 'Yesterday',
      path: '/student/learn/english',
      icon: BookMarked,
      color: '#FF8A3D',
      bgColor: '#FFF3EB',
    },
    {
      id: 'act-4',
      title: 'Asked AI Tutor: Redox Balancing',
      time: 'Yesterday',
      path: '/student/ai?mode=explain',
      icon: HelpCircle,
      color: '#4F7CFF',
      bgColor: '#EFF4FF',
    },
  ];

  // Work due soon (Real functional assignments linking to /student/work/:id)
  const upcomingTasks = demoTasks.slice(0, 3).map((task) => ({
    id: task.id,
    title: task.title,
    subject: task.subjectName,
    dueLabel:
      task.id === 'task-1'
        ? 'Due today'
        : task.id === 'task-2'
        ? 'Due tomorrow'
        : 'Due Friday',
    urgent: task.id === 'task-1',
    color:
      task.subjectId === 'physics'
        ? '#7C4DFF'
        : task.subjectId === 'chemistry'
        ? '#20C997'
        : '#4F7CFF',
  }));

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

          {/* 3. RECENT ACTIVITY & WORK DUE (2-Column Grid matching demo_screen.png aesthetic) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card A: Recent Activity (View All redirects to /student/work) */}
            <div className="bg-white rounded-3xl border border-[#E6EAF0] p-4 sm:p-5 shadow-subtle flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2">
                  <h4 className="text-sm font-black text-[#172033] tracking-tight">
                    Recent Activity
                  </h4>
                  <button
                    onClick={() => navigate('/student/work')}
                    className="text-[11px] font-bold text-[#4F7CFF] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {recentActivities.map((act) => {
                    const IconComponent = act.icon;
                    return (
                      <div
                        key={act.id}
                        onClick={() => navigate(act.path)}
                        className="flex items-start gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: act.bgColor, color: act.color }}
                        >
                          <IconComponent className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#172033] group-hover:text-[#4F7CFF] transition-colors leading-snug line-clamp-1">
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
              </div>
            </div>

            {/* Card B: Work Due Soon (Replacing Achievements with fully functional work widget) */}
            <div className="bg-white rounded-3xl border border-[#E6EAF0] p-4 sm:p-5 shadow-subtle flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2">
                  <h4 className="text-sm font-black text-[#172033] tracking-tight">
                    Work Due Soon
                  </h4>
                  <button
                    onClick={() => navigate('/student/work')}
                    className="text-[11px] font-bold text-[#4F7CFF] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {upcomingTasks.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/student/work/${item.id}`)}
                      className="p-2.5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0] hover:bg-white hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-start gap-2 min-w-0 flex-1">
                        <span
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#172033] group-hover:text-[#4F7CFF] transition-colors truncate">
                            {item.title}
                          </p>
                          <span className="text-[10px] font-semibold text-[#667085] block mt-0.5">
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
                          'px-3 py-1 rounded-full text-[10px] font-black transition-all flex-shrink-0 cursor-pointer shadow-2xs',
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
      </div>
    </div>
  );
};
