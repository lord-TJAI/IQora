import React from 'react';
import { StudentProgression } from '@/types/progression';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LevelProgressProps {
  progression: StudentProgression;
  className?: string;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({ progression, className }) => {
  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-4', className)}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Current Tier
          </span>
          <h3 className="text-base sm:text-lg font-black text-[#172033]">
            Level {progression.level} — {progression.levelTitle}
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-[#7C4DFF] bg-[#F5F0FF] px-3 py-1 rounded-full border border-[#7C4DFF]/20">
            {progression.levelProgressPercentage}% Complete
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-[#667085]">
          <span>
            Current: <strong className="text-[#172033]">{progression.currentXp.toLocaleString()} XP</strong>
          </span>
          <span>
            Goal: <strong className="text-[#172033]">{progression.nextLevelXp.toLocaleString()} XP</strong>
          </span>
        </div>

        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FFC800] to-[#FF9800] transition-all duration-500"
            style={{ width: `${progression.levelProgressPercentage}%` }}
          />
        </div>
      </div>

      {/* Next Tier Callout */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAFBFD] border border-slate-200 text-xs">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#FFC800] fill-[#FFC800]" />
          <div>
            <span className="text-[#667085] block text-[11px]">Next Milestone:</span>
            <span className="font-black text-[#172033]">
              Level {progression.level + 1} — {progression.nextLevelTitle}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-[#172033]">
            {progression.xpNeededForNextLevel} XP needed
          </span>
          <span className="text-[10px] text-emerald-600 block font-bold">
            +250 Milestone XP
          </span>
        </div>
      </div>
    </div>
  );
};
