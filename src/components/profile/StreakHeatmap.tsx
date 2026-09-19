import React, { useState } from 'react';
import { HeatmapDay, StreakMilestone } from '@/types/progression';
import { Flame, Calendar, Award, Info, ChevronRight, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StreakHeatmapProps {
  currentStreak: number;
  longestStreak: number;
  thisWeekActiveDays: number;
  nextMilestone: number;
  nextMilestoneRewardXp: number;
  daysToNextMilestone: number;
  milestones: StreakMilestone[];
  heatmap: HeatmapDay[];
  className?: string;
}

export const StreakHeatmap: React.FC<StreakHeatmapProps> = ({
  currentStreak,
  longestStreak,
  thisWeekActiveDays,
  nextMilestone,
  nextMilestoneRewardXp,
  daysToNextMilestone,
  milestones,
  heatmap,
  className,
}) => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<HeatmapDay | null>(null);
  const [showMilestonesModal, setShowMilestonesModal] = useState(false);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Map intensity to IQora's warm amber palette
  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 1:
        return 'bg-amber-200 border-amber-300';
      case 2:
        return 'bg-amber-300 border-amber-400';
      case 3:
        return 'bg-amber-400 border-amber-500';
      case 4:
        return 'bg-amber-500 border-amber-600';
      default:
        return 'bg-slate-100 border-slate-200';
    }
  };

  // Group heatmap by day of week (row) and week (column)
  // 7 rows (Mon to Sun), 12 columns
  const dayIndices = [1, 2, 3, 4, 5, 6, 0]; // Mon through Sun

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-6', className)}>
      {/* Streak Header Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-xs">
            <Flame className="w-7 h-7 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full">
                Daily Consistency
              </span>
              <span className="text-xs text-[#667085]">
                {thisWeekActiveDays}/7 days this week
              </span>
            </div>
            <h3 className="text-xl font-black text-[#172033]">
              {currentStreak} Day Learning Streak
            </h3>
          </div>
        </div>

        <button
          onClick={() => setShowMilestonesModal(true)}
          className="flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#172033] bg-[#F8FAFC] hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors self-start sm:self-auto"
        >
          <span>Milestones ({daysToNextMilestone} days to {nextMilestone})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Streak Summary Line */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
          <span className="text-[10px] text-[#667085] uppercase font-bold block">Current Streak</span>
          <span className="text-base font-black text-[#172033]">{currentStreak} Days</span>
        </div>
        <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
          <span className="text-[10px] text-[#667085] uppercase font-bold block">Longest Streak</span>
          <span className="text-base font-black text-[#172033]">{longestStreak} Days</span>
        </div>
        <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
          <span className="text-[10px] text-[#667085] uppercase font-bold block">Next Target</span>
          <span className="text-base font-black text-amber-700">{nextMilestone} Days</span>
        </div>
        <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
          <span className="text-[10px] text-[#667085] uppercase font-bold block">Milestone Bonus</span>
          <span className="text-base font-black text-emerald-700">+{nextMilestoneRewardXp} XP</span>
        </div>
      </div>

      {/* 12-Week Activity Heatmap */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#172033]">
            Learning Activity Heatmap (Last 12 Weeks)
          </span>
          <span className="text-[11px] text-[#667085]">
            Meaningful learning only • No passive screen opens
          </span>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[420px] space-y-1.5">
            {dayIndices.map((dayIdx) => {
              const dayName = daysOfWeek[dayIdx];
              // Filter days that match this day of week
              const daysForDayOfWeek = heatmap.filter((h) => h.dayOfWeek === dayIdx);

              return (
                <div key={dayIdx} className="flex items-center gap-2">
                  <span className="w-7 text-[10px] font-bold text-[#94A3B8] select-none">
                    {dayName}
                  </span>
                  <div className="flex items-center gap-1.5 flex-1">
                    {daysForDayOfWeek.map((day, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        onClick={() => setSelectedDay(day)}
                        className={cn(
                          'w-4 h-4 sm:w-5 sm:h-5 rounded-md border transition-all cursor-pointer hover:scale-110',
                          getIntensityColor(day.intensity),
                          selectedDay?.date === day.date && 'ring-2 ring-[#172033]'
                        )}
                        title={`${day.date}: ${day.activityCount} activities (+${day.xpEarned} XP)`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Heatmap Legend */}
        <div className="flex items-center justify-between text-xs text-[#667085] pt-1">
          <span>{heatmap[0]?.date} — {heatmap[heatmap.length - 1]?.date}</span>
          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span>Less</span>
            <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
            <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300" />
            <span className="w-3 h-3 rounded bg-amber-300 border border-amber-400" />
            <span className="w-3 h-3 rounded bg-amber-400 border border-amber-500" />
            <span className="w-3 h-3 rounded bg-amber-500 border border-amber-600" />
            <span>More</span>
          </div>
        </div>

        {/* Dynamic Detail Card for Hovered / Selected Day */}
        {(hoveredDay || selectedDay) && (
          <div className="p-3.5 rounded-2xl bg-[#FAFBFD] border border-slate-200 text-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-black text-[#172033]">
                {(hoveredDay || selectedDay)?.date}
              </span>
              <span className="font-bold text-amber-800">
                +{(hoveredDay || selectedDay)?.xpEarned} XP earned
              </span>
            </div>

            <div className="mt-1 text-[#667085]">
              {(hoveredDay || selectedDay)?.activityCount === 0 ? (
                <span>No meaningful learning actions recorded on this day.</span>
              ) : (
                <ul className="list-disc list-inside space-y-0.5 mt-1">
                  {(hoveredDay || selectedDay)?.activities.map((act, i) => (
                    <li key={i} className="text-[#172033]">{act}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Streak Milestones Modal */}
      {showMilestonesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 max-w-md w-full shadow-elevated space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
                <h3 className="text-base font-black text-[#172033]">
                  Streak Milestones Ladder
                </h3>
              </div>
              <button
                onClick={() => setShowMilestonesModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-[#667085]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {milestones.map((m) => (
                <div
                  key={m.days}
                  className={cn(
                    'p-3.5 rounded-2xl border flex items-center justify-between text-xs',
                    m.unlocked
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 font-bold'
                      : 'bg-[#FAFBFD] border-slate-200 text-[#667085]'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">
                      {m.unlocked ? '🔥' : '🔒'}
                    </span>
                    <div>
                      <span className="font-black block text-[#172033]">
                        {m.days} Days — {m.label}
                      </span>
                      <span className="text-[11px] text-[#667085]">
                        {m.unlocked ? `Unlocked on ${m.unlockedAt}` : `${m.days - currentStreak} days remaining`}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-amber-700">
                    +{m.rewardXp} XP
                  </span>
                </div>
              ))}
            </div>

            {/* Streak Policy Note */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-[#667085] leading-relaxed">
              💡 <strong>Streak Philosophy:</strong> Streaks build daily discipline. If you miss a day, don't worry: simply complete a lesson or practice question today to start a fresh streak.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
