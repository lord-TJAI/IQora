import React from 'react';
import { Target, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PersonalGoalsProps {
  goals: {
    id: string;
    title: string;
    current: number;
    target: number;
    unit: string;
    reward: string;
  }[];
  className?: string;
}

export const PersonalGoals: React.FC<PersonalGoalsProps> = ({ goals, className }) => {
  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-5', className)}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Immediate Targets
          </span>
          <h3 className="text-base sm:text-lg font-black text-[#172033]">
            Personal Goals
          </h3>
        </div>

        <span className="text-xs font-bold text-[#4F7CFF] bg-[#EFF4FF] px-2.5 py-0.5 rounded-full">
          3 Active
        </span>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const remaining = goal.target - goal.current;

          return (
            <div
              key={goal.id}
              className="p-3.5 rounded-2xl border border-slate-200 bg-[#FAFBFD] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-[#FFC800]" />
                  <h4 className="font-bold text-[#172033]">{goal.title}</h4>
                </div>
                <span className="font-black text-[#172033]">{progress}%</span>
              </div>

              {/* Mini Progress Bar */}
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFC800] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-[#667085] pt-0.5">
                <span>
                  {remaining} {goal.unit} remaining
                </span>
                <span className="font-bold text-amber-700">{goal.reward}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
