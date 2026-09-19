import React from 'react';
import { Flame, Star, Trophy } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StreakBadgeProps {
  days: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ days, className, size = 'md' }) => {
  const sizes = {
    sm: 'text-xs px-2.5 py-1 gap-1',
    md: 'text-sm px-3.5 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2 font-bold',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full bg-amber-500/10 text-amber-700 font-extrabold border border-amber-300 shadow-xs select-none',
        sizes[size],
        className
      )}
      title={`${days} day learning streak!`}
    >
      <span className="text-amber-500 animate-pulse">🔥</span>
      <span>{days}</span>
      <span className="text-amber-800/80 font-medium text-xs">days</span>
    </div>
  );
};

interface XPBadgeProps {
  xp: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const XPBadge: React.FC<XPBadgeProps> = ({ xp, className, size = 'md' }) => {
  const sizes = {
    sm: 'text-xs px-2.5 py-1 gap-1',
    md: 'text-sm px-3.5 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2 font-bold',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full bg-yellow-400/15 text-yellow-900 font-extrabold border border-yellow-300/80 shadow-xs select-none',
        sizes[size],
        className
      )}
      title={`${xp.toLocaleString()} Total XP`}
    >
      <Star className="w-4 h-4 fill-yellow-500 text-yellow-600" />
      <span>{xp.toLocaleString()}</span>
      <span className="text-yellow-800/80 font-medium text-xs">XP</span>
    </div>
  );
};

interface LevelBadgeProps {
  level: number;
  title?: string;
  className?: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, title, className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200',
        className
      )}
    >
      <Trophy className="w-3.5 h-3.5 text-indigo-600" />
      <span>Level {level}</span>
      {title && <span className="text-indigo-600/75 font-medium">• {title}</span>}
    </div>
  );
};
