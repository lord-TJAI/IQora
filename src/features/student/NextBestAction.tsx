import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestCard } from '@/components/learning/QuestCard';
import { mockNextBestAction } from '@/services/mock/mockData';
import { Compass, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const NextBestActionView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          AI Adaptive Recommendation
        </span>
      </div>

      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-brand-primary flex items-center justify-center mx-auto text-brand-text-primary mb-3 shadow-brand">
          <Compass className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary">
          Your Next Move
        </h1>
        <p className="text-xs sm:text-sm text-brand-text-secondary mt-1 max-w-md mx-auto">
          IQora continuously analyzes your mistakes to recommend the single most impactful study quest.
        </p>
      </div>

      <QuestCard
        nba={mockNextBestAction}
        onStartQuest={() => navigate('/student/practice')}
      />

      <Card className="p-5 border border-brand-border bg-white text-xs space-y-2">
        <span className="font-bold text-brand-text-primary block">
          Why did IQora choose this?
        </span>
        <p className="text-slate-600 leading-relaxed">
          In your previous test, question 8 (Electric Potential difference between equipotential surfaces) was missed. Reviewing this now prevents misconceptions when learning Capacitors next.
        </p>
      </Card>
    </div>
  );
};
