import React from 'react';
import { NextBestAction } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Compass, Sparkles, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface QuestCardProps {
  nba: NextBestAction;
  onStartQuest: (nba: NextBestAction) => void;
  className?: string;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  nba,
  onStartQuest,
  className,
}) => {
  return (
    <Card
      variant="elevated"
      className={cn(
        'border-2 border-brand-primary/60 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/40 p-5 sm:p-6 relative overflow-hidden',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-brand-text-primary shadow-xs">
            <Compass className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                Next Best Action
              </span>
              <span className="text-xs font-semibold text-brand-text-secondary">
                {nba.subjectName}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-brand-text-primary tracking-tight mt-0.5">
              Strengthen {nba.conceptName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold self-start sm:self-auto">
          <span className="flex items-center gap-1 text-brand-text-secondary bg-white px-2.5 py-1 rounded-full border border-slate-200">
            <Clock className="w-3.5 h-3.5" />
            {nba.estimatedMinutes} mins
          </span>
          <span className="flex items-center gap-1 text-yellow-900 bg-brand-primary/30 px-2.5 py-1 rounded-full border border-yellow-300">
            <Sparkles className="w-3.5 h-3.5 text-yellow-700" />
            +{nba.xpReward} XP
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-brand-text-secondary mt-3 leading-relaxed">
        {nba.reason}
      </p>

      {/* Quest Steps sequence */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {nba.steps.map((step) => (
          <div
            key={step.order}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/90 border border-slate-200/80 text-xs shadow-2xs"
          >
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-brand-text-primary text-[11px]">
              {step.order}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-brand-text-primary truncate">{step.title}</p>
              <span className="text-[10px] text-brand-text-secondary font-medium">
                {step.duration}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 text-xs text-brand-text-secondary w-full sm:w-auto">
          <span className="font-bold text-brand-text-primary">Current: {nba.currentMastery}%</span>
          <span>→</span>
          <span className="font-bold text-emerald-600">Target: {nba.targetMastery}%</span>
        </div>
        <Button
          onClick={() => onStartQuest(nba)}
          variant="primary"
          size="md"
          className="w-full sm:w-auto shadow-brand"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          START QUEST
        </Button>
      </div>
    </Card>
  );
};
