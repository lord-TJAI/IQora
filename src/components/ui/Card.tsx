import React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'accent' | 'ai';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-brand-border shadow-subtle',
      elevated: 'bg-white border border-brand-border shadow-elevated',
      interactive:
        'bg-white border border-brand-border shadow-subtle hover:shadow-elevated hover:border-slate-300 transition-all duration-200 cursor-pointer active:scale-[0.99]',
      accent: 'bg-brand-primary-light border-2 border-brand-primary/40 shadow-subtle',
      ai: 'bg-gradient-to-br from-white to-purple-50/50 border border-brand-ai/30 shadow-ai/10',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-3.5',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-card relative overflow-hidden', variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'bg-brand-primary',
  height = 'md',
  showLabel = false,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden', heights[height])}>
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-1 text-xs font-semibold text-brand-text-secondary">
          <span>{Math.round(percentage)}%</span>
          <span>{max}%</span>
        </div>
      )}
    </div>
  );
};

export interface StatCardProps {
  label: string;
  value: string | number;
  subvalue?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  className?: string;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subvalue,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={cn('flex flex-col justify-between p-4 sm:p-5', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
          {label}
        </span>
        {icon && <div className="text-brand-text-secondary">{icon}</div>}
      </div>
      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-brand-text-primary tracking-tight">
          {value}
        </span>
        {subvalue && (
          <span className="text-xs font-medium text-brand-text-secondary">
            {subvalue}
          </span>
        )}
      </div>
      {trend && (
        <div className="mt-2 flex items-center text-xs font-semibold">
          <span className={trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}>
            {trend.value}
          </span>
        </div>
      )}
    </Card>
  );
};
