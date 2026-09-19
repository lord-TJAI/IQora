import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Card';
import { SubjectCard } from '@/components/learning/SubjectCard';
import { QuestCard } from '@/components/learning/QuestCard';
import { StreakBadge, XPBadge, LevelBadge } from '@/components/learning/StreakBadge';
import { mockSubjects, mockNextBestAction } from '@/services/mock/mockData';
import { Camera, Bot, Zap, Flame, ArrowRight, Play, Compass } from 'lucide-react';

export const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { studentData } = useAuthStore();

  const handleContinueSubject = (subjectId: string) => {
    navigate(`/student/learn/${subjectId}`);
  };

  const handleStartQuest = () => {
    navigate('/student/practice');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text-primary tracking-tight">
            Good morning, {studentData?.name.split(' ')[0] || 'Arjun'} 👋
          </h1>
          <p className="text-sm font-medium text-brand-text-secondary mt-1">
            Ready to keep your streak alive and master Class 12?
          </p>
        </div>

        {/* Stats Row */}
        {studentData && (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <StreakBadge days={studentData.streakDays} size="md" />
            <XPBadge xp={studentData.xp} size="md" />
            <LevelBadge level={studentData.level} title={studentData.levelTitle} />
          </div>
        )}
      </div>

      {/* 2. Dominant Card: TODAY'S MISSION */}
      <Card
        variant="elevated"
        className="p-6 sm:p-7 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-brand-text-primary border-none shadow-brand relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-text-primary text-white text-xs font-black tracking-wider uppercase">
                Today's Mission
              </span>
              <span className="text-xs font-bold text-yellow-950">
                Physics • Electrostatics
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-brand-text-primary">
              Electric Potential & Potential Difference
            </h2>
            <p className="text-xs sm:text-sm font-medium text-yellow-950/80 leading-relaxed">
              Complete Lesson 3 and practice 3 adaptive questions to reach 65% chapter mastery.
            </p>

            <div className="pt-2 max-w-xs">
              <div className="flex justify-between text-xs font-bold text-yellow-950 mb-1">
                <span>Progress</span>
                <span>72%</span>
              </div>
              <ProgressBar value={72} max={100} height="md" color="bg-brand-text-primary" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3">
            <div className="bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-extrabold text-brand-text-primary flex items-center gap-1.5 shadow-2xs">
              <span>Reward:</span>
              <span className="text-amber-700 font-black">+50 XP</span>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-brand-text-primary text-white hover:bg-slate-800 border-none shadow-elevated font-black text-sm sm:text-base px-8 py-3.5"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/student/lesson/phys-ch2-l3')}
            >
              CONTINUE MISSION
            </Button>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/20 pointer-events-none" />
      </Card>

      {/* 3. Quick Action Bar */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-text-secondary mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/student/ai/scan')}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-brand-border hover:border-brand-ai hover:shadow-subtle transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-ai flex items-center justify-center group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-brand-text-primary block">
                Scan Question
              </span>
              <span className="text-[11px] text-brand-text-secondary">Instant visual AI</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/student/ai/chat')}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-brand-border hover:border-brand-ai hover:shadow-subtle transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-ai flex items-center justify-center group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-brand-text-primary block">
                Ask AI Tutor
              </span>
              <span className="text-[11px] text-brand-text-secondary">Doubt resolution</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/student/practice')}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-brand-border hover:border-blue-400 hover:shadow-subtle transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-brand-text-primary block">
                Quick Quiz
              </span>
              <span className="text-[11px] text-brand-text-secondary">3 min workout</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/student/practice/challenge')}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-brand-border hover:border-amber-400 hover:shadow-subtle transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-brand-text-primary block">
                Daily Challenge
              </span>
              <span className="text-[11px] text-brand-text-secondary">+100 XP bonus</span>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Next Best Action Card (Section 15 & 28) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-brand-ai" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-text-secondary">
              Personalized Next Best Action
            </h3>
          </div>
          <span className="text-xs font-semibold text-brand-ai">Updated 10m ago</span>
        </div>
        <QuestCard nba={mockNextBestAction} onStartQuest={handleStartQuest} />
      </div>

      {/* 5. Subject Progress Grid (Section 15 & 16) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-brand-text-primary">
              Your Class 12 Subjects
            </h3>
            <p className="text-xs text-brand-text-secondary">
              Track your syllabus and chapter mastery
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => navigate('/student/learn')}
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onContinue={handleContinueSubject}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
