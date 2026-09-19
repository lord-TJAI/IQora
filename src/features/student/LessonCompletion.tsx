import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Sparkles, Flame, ArrowRight, Target } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LessonCompletion: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="max-w-md mx-auto py-8 px-4 text-center space-y-6 animate-in zoom-in-95 duration-300">
      {/* Celebration Icon */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg ring-8 ring-emerald-50">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <div>
        <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Mission Accomplished
        </span>
        <h1 className="text-3xl font-black text-brand-text-primary tracking-tight mt-2">
          Lesson Complete!
        </h1>
        <p className="text-sm font-medium text-brand-text-secondary mt-1">
          You've mastered the fundamentals of Electric Potential.
        </p>
      </div>

      {/* Rewards Card */}
      <Card className="p-5 border-2 border-brand-primary/60 bg-gradient-to-br from-white via-amber-50/40 to-yellow-50/50 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-white rounded-2xl border border-yellow-200 shadow-2xs">
            <span className="text-xs font-bold text-yellow-900 block">XP Earned</span>
            <span className="text-xl font-black text-amber-600 mt-1 block">+30 XP</span>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-purple-200 shadow-2xs">
            <span className="text-xs font-bold text-purple-900 block">Mastery</span>
            <span className="text-xl font-black text-purple-700 mt-1 block">51% → 57%</span>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-xs font-bold text-amber-900 block">Streak</span>
            <span className="text-xl font-black text-amber-500 mt-1 block">🔥 12 Days</span>
          </div>
        </div>

        {/* Next Suggested Action */}
        <div className="p-3.5 bg-white/90 rounded-2xl border border-slate-200 text-left flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-brand-ai flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-text-secondary block">
                Next Recommendation:
              </span>
              <span className="text-xs font-bold text-brand-text-primary">
                Practice 3 adaptive questions
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-yellow-900 bg-yellow-100 px-2 py-0.5 rounded-full">
            +30 XP
          </span>
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <Button
          size="lg"
          variant="primary"
          className="w-full shadow-brand text-base font-black py-4"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => navigate('/student/practice')}
        >
          PRACTICE 3 QUESTIONS
        </Button>
        <Button
          size="md"
          variant="ghost"
          className="w-full text-brand-text-secondary"
          onClick={() => navigate('/student/home')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};
