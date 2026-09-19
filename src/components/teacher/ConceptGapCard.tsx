import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Users, Sparkles, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ConceptGapCardProps {
  concept: string;
  mastery: number;
  affectedCount: number;
  trend?: 'down' | 'up';
  onReviewIntervention?: () => void;
  className?: string;
}

export const ConceptGapCard: React.FC<ConceptGapCardProps> = ({
  concept,
  mastery,
  affectedCount,
  onReviewIntervention,
  className,
}) => {
  return (
    <Card className={cn('p-4 border-l-4 border-l-amber-500 flex flex-col justify-between', className)}>
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Concept Gap
            </span>
          </div>
          <span className="text-sm font-extrabold text-brand-text-primary">
            {mastery}% Mastery
          </span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-brand-text-primary mt-2">
          {concept}
        </h4>

        <div className="flex items-center gap-3 mt-2 text-xs text-brand-text-secondary">
          <span className="flex items-center gap-1 font-semibold text-rose-600">
            <Users className="w-3.5 h-3.5" />
            {affectedCount} students affected
          </span>
          <span className="flex items-center gap-0.5 text-slate-500">
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            -4% this week
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between">
        <span className="text-[11px] text-brand-text-secondary">AI Intervention Ready</span>
        {onReviewIntervention && (
          <Button
            size="sm"
            variant="ai"
            leftIcon={<Sparkles className="w-3 h-3" />}
            onClick={onReviewIntervention}
          >
            Review
          </Button>
        )}
      </div>
    </Card>
  );
};
