import React from 'react';
import { StudentProgression } from '@/types/progression';
import { Sparkles, Flame, Award, Zap, Bell, Settings, Target } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/utils/cn';

interface ProfileHeaderProps {
  progression: StudentProgression;
  onOpenSettings?: () => void;
  onOpenNotifications?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  progression,
  onOpenSettings,
  onOpenNotifications,
}) => {
  const { dailyGoal } = progression;

  return (
    <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-8 shadow-subtle space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Avatar + Identity */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative">
            <Avatar
              seed={progression.name}
              name={progression.name}
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
                {progression.name}
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

        {/* Secondary Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onOpenNotifications && (
            <button
              onClick={onOpenNotifications}
              className="p-2.5 rounded-xl border border-[#E6EAF0] text-[#667085] hover:text-[#172033] hover:bg-slate-50 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          )}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl border border-[#E6EAF0] text-[#667085] hover:text-[#172033] hover:bg-slate-50 transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Compact Progress Line */}
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

      {/* Daily Goal Progress Bar */}
      <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Target className="w-4 h-4 text-[#FFC800]" />
          <span className="font-bold text-[#172033]">
            Today's Target: <strong>{dailyGoal.todayXp}</strong> / {dailyGoal.targetXp} XP
          </span>
          <span className="text-[#667085]">
            ({dailyGoal.remainingXp} XP remaining)
          </span>
        </div>

        <div className="w-full sm:w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FFC800] rounded-full transition-all"
            style={{ width: `${dailyGoal.progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
