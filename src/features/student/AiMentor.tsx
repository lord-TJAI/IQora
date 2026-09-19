import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIAvatar } from '@/components/learning/AIAvatar';
import { AIMessage } from '@/components/learning/AIMessage';
import { Button } from '@/components/ui/Button';
import { aiService, AIChatMessage } from '@/services/aiService';
import { Send, Sparkles, Mic, Camera, ArrowLeft } from 'lucide-react';

export const AiMentor: React.FC = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello Arjun! I'm your Mastery AI tutor. You are currently studying **Electric Potential & Potential Difference** in Physics (57% mastery). What would you like to explore or solve right now?",
      timestamp: 'Just now',
      contextChip: 'Physics • Electric Potential (57%)',
      suggestedFollowups: [
        'Explain potential gradient simply',
        'Give me a hint on work done',
        'Show a worked example',
        'Quiz me on this concept',
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickActions = [
    'Explain simply',
    'Give me a hint',
    'Show example',
    'Quiz me',
    'Summarize',
    'Practice this',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isThinking) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsThinking(true);

    try {
      const aiReply = await aiService.sendChatMessage(text, {
        subject: 'Physics',
        chapter: 'Electrostatics',
        concept: 'Electric Potential',
        mastery: 57,
      });
      setMessages((prev) => [...prev, aiReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'ai',
          text: "I couldn't respond right now. Please check your network connection and try again.",
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-3xl mx-auto bg-white rounded-3xl border border-brand-border shadow-subtle overflow-hidden animate-in fade-in duration-200">
      {/* Header with Context Chips */}
      <div className="p-4 border-b border-brand-border bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AIAvatar size="sm" isThinking={isThinking} />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-extrabold text-brand-text-primary">
                Mastery AI Mentor
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-brand-text-secondary font-semibold">
              <span className="text-purple-700 font-bold">Physics: Electric Potential</span>
              <span>•</span>
              <span>57% Mastery</span>
            </div>
          </div>
        </div>

        {/* Shortcuts to Voice & Camera */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigate('/student/ai/voice')}
            className="p-2 rounded-xl text-brand-text-secondary hover:text-brand-ai hover:bg-purple-50 transition-colors"
            title="Voice Tutor"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/student/ai/scan')}
            className="p-2 rounded-xl text-brand-text-secondary hover:text-brand-ai hover:bg-purple-50 transition-colors"
            title="Scan Question"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Actions Bar */}
      <div className="px-4 py-2 border-b border-brand-border/60 bg-white flex items-center gap-2 overflow-x-auto no-scrollbar">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(action)}
            className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 hover:bg-purple-100 hover:text-brand-ai text-slate-700 whitespace-nowrap transition-colors"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <AIMessage
            key={msg.id}
            message={msg}
            onSelectFollowup={(text) => handleSendMessage(text)}
          />
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-brand-ai font-semibold p-2 animate-pulse">
            <AIAvatar size="sm" isThinking={true} />
            <span>Mastery AI is formulating a clear explanation...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3.5 border-t border-brand-border bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask anything about Electric Potential, derivations, or concepts..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:border-brand-ai focus:ring-2 focus:ring-brand-ai/20"
        />
        <Button
          variant="ai"
          size="md"
          disabled={!inputValue.trim() || isThinking}
          onClick={() => handleSendMessage()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
