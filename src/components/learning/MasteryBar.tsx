import React from 'react';
import { cn } from '@/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MasteryBarProps {
  label?: string;
  percentage: number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MasteryBar: React.FC<MasteryBarProps> = ({
  label,
  percentage,
  trend,
  trendValue,
  className,
  size = 'md',
}) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  // Determine friendly mastery status label
  const getStatus = (val: number) => {
    if (val >= 90) return { text: 'Mastered', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val >= 75) return { text: 'Strong', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (val >= 60) return { text: 'Learning', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { text: 'Needs Practice', color: 'text-purple-700 bg-purple-50 border-purple-200' };
  };

  const status = getStatus(clamped);

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      <div className="flex items-center justify-between text-xs font-semibold">
        <div className="flex items-center gap-2">
          {label && <span className="text-brand-text-primary">{label}</span>}
          <span className={cn('px-2 py-0.5 rounded-full text-[11px] border font-bold', status.color)}>
            {status.text}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-brand-text-primary">{clamped}%</span>
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 text-[11px] font-bold',
                trend === 'up' && 'text-emerald-600',
                trend === 'down' && 'text-rose-600',
                trend === 'stable' && 'text-slate-500'
              )}
            >
              {trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {trend === 'stable' && <Minus className="w-3 h-3" />}
              {trendValue !== undefined && `${trendValue}%`}
            </span>
          )}
        </div>
      </div>

      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60', heights[size])}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
