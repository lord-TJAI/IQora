import React from 'react';
import { LessonNode } from '@/types/domain';
import { Check, Lock, Sparkles, Star, RefreshCw, Crown, Play } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

interface LearningPathProps {
  nodes: LessonNode[];
  onSelectNode: (node: LessonNode) => void;
  className?: string;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  nodes,
  onSelectNode,
  className,
}) => {
  const getNodeIcon = (node: LessonNode) => {
    if (node.state === 'completed') {
      return <Check className="w-6 h-6 text-white stroke-[3]" />;
    }
    if (node.state === 'locked') {
      return <Lock className="w-5 h-5 text-slate-400" />;
    }

    // Node is current/available
    switch (node.type) {
      case 'ai_practice':
        return <Sparkles className="w-6 h-6 text-brand-ai" />;
      case 'challenge':
        return <Star className="w-6 h-6 text-amber-500 fill-amber-500" />;
      case 'review':
        return <RefreshCw className="w-6 h-6 text-blue-500" />;
      case 'mastery_test':
        return <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
      default:
        return <Play className="w-6 h-6 text-brand-text-primary fill-brand-text-primary translate-x-0.5" />;
    }
  };

  // Generate subtle zigzag offsets for playful game map feel
  const getOffset = (index: number) => {
    const pattern = [0, 40, 20, -30, -10, 30, 0];
    return pattern[index % pattern.length];
  };

  return (
    <div className={cn('relative py-8 flex flex-col items-center select-none', className)}>
      {/* Curved connector background path */}
      <div className="absolute top-10 bottom-10 w-2.5 bg-slate-200/80 rounded-full -z-0" />

      <div className="space-y-12 z-10 w-full max-w-md px-4">
        {nodes.map((node, index) => {
          const isCompleted = node.state === 'completed';
          const isCurrent = node.state === 'current';
          const isLocked = node.state === 'locked';
          const offset = getOffset(index);

          return (
            <div
              key={node.id}
              className="flex flex-col items-center relative transition-transform"
              style={{ transform: `translateX(${offset}px)` }}
            >
              {/* Node Button */}
              <motion.button
                whileHover={!isLocked ? { scale: 1.08 } : undefined}
                whileTap={!isLocked ? { scale: 0.95 } : undefined}
                disabled={isLocked}
                onClick={() => onSelectNode(node)}
                className={cn(
                  'w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative transition-all duration-200 focus:outline-none',
                  isCompleted && 'bg-brand-success shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-100',
                  isCurrent &&
                    'bg-brand-primary shadow-brand ring-4 ring-yellow-200 animate-pulse-subtle scale-105',
                  isLocked && 'bg-slate-100 border-2 border-slate-200 cursor-not-allowed'
                )}
              >
                {getNodeIcon(node)}

                {/* Floating "CURRENT" or XP pill */}
                {isCurrent && (
                  <span className="absolute -top-3 px-2.5 py-0.5 rounded-full bg-brand-text-primary text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                    START
                  </span>
                )}
                {isCompleted && (
                  <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    ✓ Done
                  </span>
                )}
              </motion.button>

              {/* Title & Info Card below node */}
              <div
                onClick={() => !isLocked && onSelectNode(node)}
                className={cn(
                  'mt-2.5 text-center max-w-[180px] p-2 rounded-xl transition-colors',
                  !isLocked && 'cursor-pointer hover:bg-slate-100/80',
                  isLocked && 'opacity-60'
                )}
              >
                <h4 className="text-xs sm:text-sm font-bold text-brand-text-primary line-clamp-2">
                  {node.title}
                </h4>
                <div className="flex items-center justify-center gap-2 mt-1 text-[11px] font-semibold text-brand-text-secondary">
                  <span>+{node.xpReward} XP</span>
                  <span>•</span>
                  <span>{node.estimatedMinutes}m</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
