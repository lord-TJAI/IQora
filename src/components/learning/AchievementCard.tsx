import React from 'react';
import { Achievement } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/Card';
import { Flame, CheckCircle2, Crown, Zap, Calculator, Moon, Lock, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  className,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-purple-500 fill-purple-500" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-blue-500" />;
      case 'Moon':
        return <Moon className="w-6 h-6 text-indigo-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-primary" />;
    }
  };

  return (
    <Card
      variant={achievement.unlocked ? 'default' : 'default'}
      className={cn(
        'p-4 sm:p-5 flex flex-col justify-between transition-all border-2',
        achievement.unlocked
          ? 'border-brand-primary/50 bg-gradient-to-br from-white to-yellow-50/30 shadow-subtle hover:shadow-elevated'
          : 'border-slate-200 bg-slate-50/60 opacity-80',
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between">
          <div
            className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs',
              achievement.unlocked ? 'bg-yellow-100/80 ring-2 ring-yellow-300' : 'bg-slate-200'
            )}
          >
            {achievement.unlocked ? (
              getIcon(achievement.icon)
            ) : (
              <Lock className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <span
            className={cn(
              'text-[11px] font-extrabold px-2 py-0.5 rounded-full border',
              achievement.unlocked
                ? 'bg-yellow-200/80 text-yellow-900 border-yellow-300'
                : 'bg-slate-200 text-slate-600 border-slate-300'
            )}
          >
            +{achievement.xpBonus} XP
          </span>
        </div>

        <h4 className="text-sm font-bold text-brand-text-primary mt-3">
          {achievement.title}
        </h4>
        <p className="text-xs text-brand-text-secondary mt-1 leading-relaxed line-clamp-2">
          {achievement.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60">
        {achievement.unlocked ? (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Unlocked</span>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-brand-text-secondary mb-1">
              <span>Progress</span>
              <span>{achievement.progress}%</span>
            </div>
            <ProgressBar value={achievement.progress} max={100} height="sm" color="bg-brand-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};
