import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConceptGapCard } from '@/components/teacher/ConceptGapCard';
import { Sparkles, AlertTriangle, ArrowRight, BrainCircuit } from 'lucide-react';

export const ClassIntelligence: React.FC = () => {
  const navigate = useNavigate();

  const gaps = [
    { concept: 'Electric Potential & Gradient', mastery: 51, affectedCount: 17, trend: 'down' as const },
    { concept: 'Definite Integration by Parts', mastery: 58, affectedCount: 12, trend: 'down' as const },
    { concept: 'Electrochemistry (Nernst Equation)', mastery: 54, affectedCount: 14, trend: 'down' as const },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-brand-ai" />
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Class Intelligence & Knowledge Gaps
          </h1>
        </div>
        <p className="text-sm text-brand-text-secondary mt-1">
          Automated diagnostic engine detecting learning hurdles before term board exams
        </p>
      </div>

      {/* AI Highlights Banner */}
      <Card className="p-6 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-ai bg-purple-100 px-3 py-0.5 rounded-full">
            High Priority Class Insight
          </span>
          <h3 className="text-lg font-black text-brand-text-primary">
            17 Students Need Support in Electric Potential
          </h3>
          <p className="text-xs sm:text-sm text-brand-text-secondary max-w-xl">
            Recent homework and test evidence reveals sign convention confusion in equipotential work formulas.
          </p>
        </div>

        <Button
          size="md"
          variant="ai"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => navigate('/teacher/interventions')}
        >
          Review Intervention
        </Button>
      </Card>

      {/* Concept Gaps Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-brand-text-primary">
          Active Knowledge Gaps Across Subjects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gaps.map((gap, i) => (
            <ConceptGapCard
              key={i}
              concept={gap.concept}
              mastery={gap.mastery}
              affectedCount={gap.affectedCount}
              trend={gap.trend}
              onReviewIntervention={() => navigate('/teacher/interventions')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
