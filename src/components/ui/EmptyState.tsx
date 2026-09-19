import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-card border-2 border-dashed border-brand-border bg-white/50',
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-brand-primary-light flex items-center justify-center text-yellow-800 mb-4 shadow-xs">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-brand-text-primary tracking-tight">{title}</h3>
      {description && (
        <p className="text-sm text-brand-text-secondary max-w-sm mt-1 mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-card border border-rose-200 bg-rose-50/50',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-brand-error mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-brand-text-primary">{title}</h4>
      <p className="text-sm text-brand-text-secondary max-w-md mt-1 mb-5">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="secondary"
          size="sm"
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rect' }) => {
  const variants = {
    text: 'h-4 rounded-md w-3/4',
    rect: 'h-24 rounded-card',
    circle: 'w-10 h-10 rounded-full',
  };
  return <div className={cn('animate-pulse bg-slate-200/80', variants[variant], className)} />;
};
