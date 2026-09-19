import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-btn transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-brand-primary text-brand-text-primary hover:bg-brand-primary-hover shadow-brand focus-visible:ring-brand-primary',
      secondary:
        'bg-brand-surface text-brand-text-primary border border-brand-border hover:bg-brand-surface-hover shadow-subtle focus-visible:ring-brand-border-focus',
      outline:
        'bg-transparent text-brand-text-primary border-2 border-brand-border hover:border-brand-text-primary hover:bg-slate-50',
      ghost:
        'bg-transparent text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-100',
      danger:
        'bg-brand-error text-white hover:bg-red-600 focus-visible:ring-brand-error shadow-sm',
      success:
        'bg-brand-success text-white hover:bg-emerald-600 focus-visible:ring-brand-success shadow-sm',
      ai:
        'bg-brand-ai text-white hover:bg-brand-ai-hover shadow-ai focus-visible:ring-brand-ai',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2.5 gap-2 h-11',
      lg: 'text-base px-6 py-3.5 gap-2.5 h-13 font-bold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
