import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Flame, Clock, Sparkles, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import confetti from 'canvas-confetti';

export const DailyChallenge: React.FC = () => {
  const navigate = useNavigate();
  const { addXP } = useAuthStore();
  const [accepted, setAccepted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    addXP(100);
    setCompleted(true);
    confetti({ particleCount: 90, spread: 80 });
  };

  return (
    <div className="max-w-md mx-auto py-6 space-y-6 text-center animate-in fade-in duration-200">
      {!accepted ? (
        <Card className="p-6 sm:p-8 border-2 border-amber-300 bg-gradient-to-b from-amber-50/50 to-white space-y-5 shadow-elevated">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-brand-text-primary flex items-center justify-center mx-auto shadow-brand">
            <Flame className="w-8 h-8 fill-current" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full">
              Today's Daily Challenge
            </span>
            <h1 className="text-2xl font-black text-brand-text-primary mt-2">
              Electrostatics Speed Sprint
            </h1>
            <p className="text-xs sm:text-sm text-brand-text-secondary mt-1">
              Solve 3 rapid-fire questions to preserve your streak and earn huge bonus XP!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="p-3 rounded-2xl bg-white border border-amber-200 text-left">
              <span className="text-[11px] font-bold text-brand-text-secondary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Time Limit
              </span>
              <span className="text-lg font-black text-brand-text-primary mt-1 block">5 Minutes</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-amber-200 text-left">
              <span className="text-[11px] font-bold text-yellow-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-600" /> Reward
              </span>
              <span className="text-lg font-black text-amber-600 mt-1 block">+100 XP</span>
            </div>
          </div>

          <Button
            size="lg"
            variant="primary"
            className="w-full shadow-brand font-black py-4"
            onClick={() => setAccepted(true)}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            ACCEPT CHALLENGE
          </Button>
        </Card>
      ) : !completed ? (
        <Card className="p-6 sm:p-8 space-y-5 text-left border border-brand-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Question 1 of 1 • Rapid Challenge
            </span>
            <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
              <Clock className="w-4 h-4" /> 04:45
            </span>
          </div>

          <h3 className="text-base font-bold text-brand-text-primary">
            What is the SI unit of electric flux ($\Phi_E$)?
          </h3>

          <div className="space-y-2.5">
            {[
              'N · m² / C  (or V · m)',
              'N / C',
              'J / C',
              'C / m²',
            ].map((option, i) => (
              <button
                key={i}
                onClick={handleComplete}
                className="w-full text-left p-3.5 rounded-xl border border-brand-border hover:border-brand-primary hover:bg-yellow-50 text-sm font-medium transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-8 border-2 border-emerald-300 bg-emerald-50/40 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-brand-text-primary">
            Challenge Completed!
          </h2>
          <p className="text-sm text-brand-text-secondary">
            You earned <strong className="text-amber-700">+100 XP</strong> and extended your streak to 12 days!
          </p>
          <Button
            size="md"
            variant="primary"
            onClick={() => navigate('/student/home')}
            className="mt-2"
          >
            Return to Home
          </Button>
        </Card>
      )}
    </div>
  );
};
