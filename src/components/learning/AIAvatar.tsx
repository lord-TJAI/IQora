import React from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AIAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isThinking?: boolean;
  className?: string;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({
  size = 'md',
  isThinking = false,
  className,
}) => {
  const sizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl flex items-center justify-center bg-gradient-to-br from-brand-ai via-purple-600 to-indigo-700 text-white shadow-ai flex-shrink-0 transition-transform select-none',
        sizes[size],
        isThinking && 'animate-pulse',
        className
      )}
    >
      <Bot className={iconSizes[size]} />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
      </span>
    </div>
  );
};
