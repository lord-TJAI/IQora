import React, { useState } from 'react';
import { AIAvatar } from './AIAvatar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { aiService } from '@/services/aiService';

interface VoiceRecorderProps {
  onStartPractice?: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onStartPractice }) => {
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'thinking' | 'responding' | 'error'>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleStartListening = () => {
    setVoiceState('listening');
    setTranscript('Listening for your question...');
    setAiResponse('');
    setErrorMessage('');

    // Simulate speech detection
    setTimeout(async () => {
      setVoiceState('thinking');
      try {
        const result = await aiService.processVoiceInput('simulated_audio');
        setTranscript(result.transcript);
        setAiResponse(result.reply);
        setVoiceState('responding');
      } catch {
        setVoiceState('error');
        setErrorMessage('Could not process speech. Please check microphone permissions and try again.');
      }
    }, 2400);
  };

  const handleStopListening = () => {
    if (voiceState === 'listening') {
      setVoiceState('idle');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto p-4 text-center space-y-6">
      {/* Visual Avatar with pulsing wave effect */}
      <div className="relative py-6">
        {voiceState === 'listening' && (
          <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping" />
        )}
        <AIAvatar
          size="xl"
          isThinking={voiceState === 'thinking'}
          className={voiceState === 'listening' ? 'scale-110 transition-transform' : ''}
        />
      </div>

      {/* State Badge */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-100 text-brand-ai">
          <Sparkles className="w-3.5 h-3.5" />
          {voiceState === 'idle' && 'Tap to Speak'}
          {voiceState === 'listening' && 'Listening to You...'}
          {voiceState === 'thinking' && 'Mastery AI Thinking...'}
          {voiceState === 'responding' && 'AI Tutor Responding'}
          {voiceState === 'error' && 'Audio Error'}
        </span>
      </div>

      {/* Error state if permission or network fails */}
      {voiceState === 'error' && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Transcript Card */}
      {transcript && (
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-secondary">
            Your Question:
          </span>
          <p className="text-sm font-medium text-brand-text-primary mt-1 italic">
            "{transcript}"
          </p>
        </div>
      )}

      {/* AI Response Card */}
      {aiResponse && (
        <Card className="w-full text-left p-5 border-2 border-brand-ai/40 bg-gradient-to-br from-white to-purple-50/40">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
            <span className="text-xs font-bold text-brand-ai flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Mastery AI Voice Explanation
            </span>
            <button className="p-1.5 rounded-full hover:bg-purple-100 text-brand-ai transition-colors" title="Listen to audio">
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-brand-text-primary leading-relaxed font-medium">
            {aiResponse}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-purple-100">
            <Button size="sm" variant="ai" onClick={handleStartListening}>
              Ask Follow-up
            </Button>
            {onStartPractice && (
              <Button
                size="sm"
                variant="primary"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={onStartPractice}
              >
                Practice This Concept
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Primary Mic Button */}
      <div className="pt-2">
        {voiceState === 'listening' ? (
          <button
            onClick={handleStopListening}
            className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-all scale-105 active:scale-95"
          >
            <MicOff className="w-8 h-8" />
          </button>
        ) : (
          <button
            onClick={handleStartListening}
            className="w-20 h-20 rounded-full bg-brand-primary text-brand-text-primary flex items-center justify-center shadow-brand hover:bg-brand-primary-hover transition-all active:scale-95 ring-8 ring-yellow-100"
          >
            <Mic className="w-8 h-8 stroke-[2.5]" />
          </button>
        )}
        <p className="text-xs text-brand-text-secondary mt-3">
          {voiceState === 'listening' ? 'Tap mic to finish speaking' : 'Tap to ask any Class 12 doubt aloud'}
        </p>
      </div>
    </div>
  );
};
