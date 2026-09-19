import React, { useState } from 'react';
import { ProgressionAchievement } from '@/types/progression';
import { Award, ArrowRight, X, Crown, Flame, Atom, Target, Calculator, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AchievementPreviewProps {
  achievements: ProgressionAchievement[];
  className?: string;
}

export const AchievementPreview: React.FC<AchievementPreviewProps> = ({
  achievements,
  className,
}) => {
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const previewBadges = achievements.slice(0, 4);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return Crown;
      case 'Flame':
        return Flame;
      case 'Atom':
        return Atom;
      case 'Target':
        return Target;
      case 'Calculator':
        return Calculator;
      default:
        return Award;
    }
  };

  const filteredAchievements =
    selectedCategory === 'all'
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-6', className)}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Milestones & Recognition
          </span>
          <h3 className="text-base sm:text-lg font-black text-[#172033]">
            Achievements
          </h3>
        </div>

        <button
          onClick={() => setShowAllModal(true)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F7CFF] hover:underline"
        >
          <span>View all ({achievements.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Preview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {previewBadges.map((ach) => {
          const Icon = getBadgeIcon(ach.icon);

          return (
            <div
              key={ach.id}
              className={cn(
                'p-4 rounded-2xl border flex flex-col justify-between gap-3 text-center transition-all',
                ach.unlocked
                  ? 'bg-amber-50/60 border-amber-200/80 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              )}
            >
              <div className="flex justify-center">
                <div
                  className={cn(
                    'w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs',
                    ach.unlocked
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-slate-200 text-slate-400'
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-[#172033] line-clamp-1">
                  {ach.title}
                </h4>
                <span className="text-[10px] font-bold text-[#667085] block mt-0.5">
                  {ach.progressLabel || (ach.unlocked ? 'Unlocked' : 'Locked')}
                </span>
              </div>

              <div className="pt-1 border-t border-amber-200/50 text-[10px] font-mono font-bold text-amber-800">
                +{ach.xpBonus} XP
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Achievements Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 max-w-xl w-full shadow-elevated space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-black text-[#172033]">
                  All Achievements & Badges
                </h3>
              </div>

              <button
                onClick={() => setShowAllModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-[#667085]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {['all', 'consistency', 'mastery', 'practice', 'subject'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-3 py-1 rounded-full font-bold capitalize transition-all whitespace-nowrap',
                    selectedCategory === cat
                      ? 'bg-[#172033] text-white shadow-xs'
                      : 'bg-slate-100 text-[#667085] hover:text-[#172033]'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Full List */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {filteredAchievements.map((ach) => {
                const Icon = getBadgeIcon(ach.icon);

                return (
                  <div
                    key={ach.id}
                    className={cn(
                      'p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs',
                      ach.unlocked
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-[#FAFBFD] border-slate-200 opacity-70'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                          ach.unlocked
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-slate-200 text-slate-400'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-[#172033]">{ach.title}</h4>
                          {ach.unlocked ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                              Unlocked
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.2 rounded-full">
                              {ach.progressLabel}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#667085]">{ach.description}</p>
                      </div>
                    </div>

                    <span className="font-mono font-bold text-amber-800 flex-shrink-0">
                      +{ach.xpBonus} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
