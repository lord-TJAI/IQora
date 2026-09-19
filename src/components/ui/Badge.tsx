import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ai' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-brand-primary/20 text-yellow-900 border-yellow-300',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-rose-50 text-rose-700 border-rose-200',
    ai: 'bg-brand-ai-light text-brand-ai border-purple-200 font-semibold',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  clickable?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  className,
  active = false,
  clickable = true,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all select-none border',
        active
          ? 'bg-brand-primary text-brand-text-primary border-brand-primary shadow-xs'
          : 'bg-white text-brand-text-secondary border-brand-border hover:border-slate-300 hover:text-brand-text-primary',
        clickable && 'cursor-pointer active:scale-95',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className }) => {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-extrabold',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-brand-ai to-indigo-700 overflow-hidden ring-2 ring-white shadow-subtle flex-shrink-0',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
