import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentProgression } from '@/services/progression/progressionService';
import { useAuthStore } from '@/stores/authStore';
import { StreakHeatmap } from '@/components/profile/StreakHeatmap';
import { Leaderboard } from '@/components/profile/Leaderboard';
import { Avatar } from '@/components/ui/Avatar';
import {
  Zap,
  Flame,
  Award,
  Target,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  ArrowRight,
  LogOut,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const subjectIcons: Record<string, any> = {
  physics: Atom,
  mathematics: Calculator,
  chemistry: FlaskConical,
  english: BookOpen,
};

export const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { studentData, logout } = useAuthStore();
  const progression = getStudentProgression();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Clean Identity & Header */}
      <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Avatar & Student Info */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <Avatar
                seed={studentData?.name || progression.name}
                name={studentData?.name || progression.name}
                role="student"
                size={76}
                className="ring-4 ring-[#FFC800]/30 shadow-xs"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#172033] text-white px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase border-2 border-white shadow-xs">
                Lvl {progression.level}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight">
                  {studentData?.name || progression.name}
                </h1>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {progression.className}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-[#7C4DFF]">
                Level {progression.level} • {progression.levelTitle}
              </p>

              <p className="text-xs text-[#667085] font-medium">
                Roll No: {progression.rollNumber} • CBSE Class XII (2026–27)
              </p>
            </div>
          </div>

          {/* Quick Sign Out Action */}
          <button
            onClick={handleLogout}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>

        {/* 3 Key Stats Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Total XP
              </span>
              <span className="text-base font-black text-[#172033]">
                {progression.currentXp.toLocaleString()} XP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
              <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800 block">
                Active Streak
              </span>
              <span className="text-base font-black text-[#172033]">
                {progression.currentStreak} Days
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Overall Mastery
              </span>
              <span className="text-base font-black text-[#172033]">
                {progression.overallMastery}% Syllabus
              </span>
            </div>
          </div>
        </div>

        {/* Daily XP Target */}
        <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Target className="w-4 h-4 text-[#FFC800]" />
            <span className="font-bold text-[#172033]">
              Today's Goal: <strong>{progression.dailyGoal.todayXp}</strong> / {progression.dailyGoal.targetXp} XP
            </span>
            <span className="text-[#667085]">
              ({progression.dailyGoal.remainingXp} XP remaining)
            </span>
          </div>

          <div className="w-full sm:w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFC800] rounded-full transition-all"
              style={{ width: `${progression.dailyGoal.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Academic Mastery by Subject */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-[#172033] tracking-tight">
            Academic Mastery by Subject
          </h2>
          <button
            onClick={() => navigate('/student/learn')}
            className="text-xs font-bold text-[#7C4DFF] hover:underline flex items-center gap-1"
          >
            <span>Curriculum view</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {progression.subjects.map((subject) => {
            const Icon = subjectIcons[subject.subjectId] || BookOpen;

            return (
              <div
                key={subject.subjectId}
                className="bg-white rounded-2xl border border-[#E6EAF0] p-5 shadow-subtle hover:border-slate-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                      style={{ backgroundColor: subject.lightColor, color: subject.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#172033]">
                        {subject.name}
                      </h3>
                      <p className="text-[11px] text-[#667085] font-medium">
                        {subject.completedChapters} of {subject.totalChapters} chapters completed
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-[#172033]">
                      {subject.masteryPercentage}%
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      {subject.monthlyTrend}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${subject.masteryPercentage}%`,
                      backgroundColor: subject.color,
                    }}
                  />
                </div>

                {/* Focus Area & Action */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-[#667085] truncate max-w-[200px]">
                    Focus: <strong className="text-[#172033]">{subject.focusArea}</strong>
                  </span>
                  <button
                    onClick={() => navigate(`/student/learn/${subject.subjectId}`)}
                    className="font-bold text-xs text-[#172033] hover:text-[#7C4DFF] flex items-center gap-1 transition-colors"
                  >
                    <span>Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. GitHub-style Streak Heatmap */}
      <StreakHeatmap
        currentStreak={progression.currentStreak}
        longestStreak={progression.longestStreak}
        thisWeekActiveDays={progression.thisWeekActiveDays}
        nextMilestone={progression.nextStreakMilestone}
        nextMilestoneRewardXp={progression.streakMilestoneRewardXp}
        daysToNextMilestone={progression.daysToNextMilestone}
        milestones={progression.milestones}
        heatmap={progression.heatmap}
      />

      {/* 4. Peer Leaderboard */}
      <Leaderboard
        userRank={progression.leaderboard.userRank}
        userWeeklyXp={progression.leaderboard.userWeeklyXp}
        podium={progression.leaderboard.podium}
        nearbyRanks={progression.leaderboard.nearbyRanks}
        encouragingMessage={progression.leaderboard.encouragingMessage}
      />

      {/* 5. Account & Session Details */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-[#172033]">
            Signed in as <span className="font-black">arjun.s@iqora.edu</span>
          </p>
          <p className="text-[11px] text-[#667085]">
            Institution: Delhi Public School, R.K. Puram • Class XII Academic Portal
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 font-black text-xs inline-flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out of IQora</span>
        </button>
      </div>
    </div>
  );
};
