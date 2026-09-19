import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const variants = {
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
    bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } },
  };

  const positionStyles = {
    left: 'left-0 inset-y-0 w-80 sm:w-96 rounded-r-card-lg',
    right: 'right-0 inset-y-0 w-80 sm:w-96 rounded-l-card-lg',
    bottom: 'bottom-0 inset-x-0 max-h-[85vh] rounded-t-card-lg',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          />
          <motion.div
            initial={variants[position].initial}
            animate={variants[position].animate}
            exit={variants[position].exit}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'fixed bg-white border border-brand-border shadow-float flex flex-col p-6 z-10 overflow-y-auto',
              positionStyles[position],
              className
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
              <h3 className="text-lg font-bold text-brand-text-primary">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'underline',
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 overflow-x-auto no-scrollbar',
        variant === 'underline' ? 'border-b border-brand-border' : 'bg-slate-100 p-1 rounded-xl',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all whitespace-nowrap',
              variant === 'underline'
                ? cn(
                    'border-b-2 -mb-[1px]',
                    isActive
                      ? 'border-brand-primary text-brand-text-primary font-bold'
                      : 'border-transparent text-brand-text-secondary hover:text-brand-text-primary'
                  )
                : cn(
                    'rounded-lg',
                    isActive
                      ? 'bg-white text-brand-text-primary shadow-xs font-bold'
                      : 'text-brand-text-secondary hover:text-brand-text-primary'
                  )
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-full text-[11px] font-bold',
                  isActive ? 'bg-brand-primary/20 text-yellow-900' : 'bg-slate-200/80 text-slate-600'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
