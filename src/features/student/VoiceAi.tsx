import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VoiceRecorder } from '@/components/learning/VoiceRecorder';
import { ArrowLeft, Bot, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const VoiceAi: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/ai')}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to AI Hub</span>
        </button>

        <Button
          size="sm"
          variant="secondary"
          leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
          onClick={() => navigate('/student/ai/chat')}
        >
          Switch to Text Chat
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border shadow-subtle p-6">
        <div className="text-center mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-brand-ai bg-purple-100 px-3 py-1 rounded-full">
            Realtime Voice AI Tutor
          </span>
          <h1 className="text-2xl font-black text-brand-text-primary mt-2">
            Speak Your Academic Doubt
          </h1>
          <p className="text-xs text-brand-text-secondary mt-1 max-w-sm mx-auto">
            Ask complex physics formulas, derivations, or problem-solving approaches naturally.
          </p>
        </div>

        <VoiceRecorder onStartPractice={() => navigate('/student/practice')} />
      </div>
    </div>
  );
};
