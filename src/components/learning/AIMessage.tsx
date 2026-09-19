import React from 'react';
import { AIChatMessage } from '@/services/aiService';
import { AIAvatar } from './AIAvatar';
import { cn } from '@/utils/cn';
import { Sparkles } from 'lucide-react';

interface AIMessageProps {
  message: AIChatMessage;
  onSelectFollowup?: (text: string) => void;
}

export const AIMessage: React.FC<AIMessageProps> = ({ message, onSelectFollowup }) => {
  const isAI = message.sender === 'ai';

  return (
    <div
      className={cn(
        'flex gap-3 w-full my-3',
        isAI ? 'justify-start' : 'justify-end'
      )}
    >
      {isAI && <AIAvatar size="sm" className="mt-1" />}

      <div className={cn('max-w-[85%] sm:max-w-[75%]', !isAI && 'text-right')}>
        {/* Context Chip if present */}
        {message.contextChip && (
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-ai text-[11px] font-bold mb-1.5 shadow-2xs">
            <Sparkles className="w-3 h-3" />
            <span>{message.contextChip}</span>
          </div>
        )}

        <div
          className={cn(
            'p-4 rounded-2xl text-sm leading-relaxed inline-block text-left',
            isAI
              ? 'bg-white border border-brand-border text-brand-text-primary shadow-subtle rounded-tl-xs'
              : 'bg-brand-primary text-brand-text-primary font-medium rounded-tr-xs shadow-xs'
          )}
        >
          {message.text}
        </div>

        <div className="flex items-center gap-2 mt-1 text-[10px] text-brand-text-secondary px-1">
          <span>{message.timestamp}</span>
        </div>

        {/* Suggested followup chips */}
        {isAI && message.suggestedFollowups && message.suggestedFollowups.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {message.suggestedFollowups.map((text, idx) => (
              <button
                key={idx}
                onClick={() => onSelectFollowup && onSelectFollowup(text)}
                className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 px-3 py-1.5 rounded-full font-semibold transition-colors flex items-center gap-1"
              >
                <span>{text}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
