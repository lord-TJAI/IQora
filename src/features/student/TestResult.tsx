import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, TrendingUp, TrendingDown, Sparkles, ArrowRight, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TestResult: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-3xl bg-yellow-100 text-yellow-800 flex items-center justify-center mx-auto shadow-brand ring-8 ring-yellow-50">
          <Trophy className="w-8 h-8" />
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Assessment Evaluated
        </span>
        <h1 className="text-3xl font-black text-brand-text-primary tracking-tight">
          Test Results & Mastery Impact
        </h1>
        <p className="text-sm text-brand-text-secondary">
          Class 12 Physics Term Assessment — Electrostatics & Gauss Law
        </p>
      </div>

      {/* Score Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-white to-amber-50/40 border-2 border-brand-primary/60 shadow-elevated">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-white rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-brand-text-secondary block">Score</span>
            <span className="text-2xl font-black text-brand-text-primary mt-1 block">42 / 50</span>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-brand-text-secondary block">Percentage</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">84%</span>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-yellow-900 block">XP Earned</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">+150 XP</span>
          </div>
        </div>
      </Card>

      {/* Concept Mastery Impact (Section 33) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strong Concepts */}
        <Card className="p-5 border border-emerald-200 bg-emerald-50/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Strong Concepts</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-emerald-200 text-xs">
              <span className="font-bold text-brand-text-primary">Electric Charge & Quantization</span>
              <span className="font-extrabold text-emerald-600">+4%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-emerald-200 text-xs">
              <span className="font-bold text-brand-text-primary">Electric Field & Gauss Law</span>
              <span className="font-extrabold text-emerald-600">+8%</span>
            </div>
          </div>
        </Card>

        {/* Needs Practice */}
        <Card className="p-5 border border-amber-200 bg-amber-50/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
            <TrendingDown className="w-4 h-4 text-rose-500" />
            <span>Needs Targeted Practice</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-amber-200 text-xs">
              <span className="font-bold text-brand-text-primary">Electric Potential & Gradient</span>
              <span className="font-extrabold text-emerald-600">+3%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-rose-200 text-xs">
              <span className="font-bold text-brand-text-primary">Capacitance & Dielectrics</span>
              <span className="font-extrabold text-rose-600">-1%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Next Best Action Card (Section 90) */}
      <Card className="p-5 border-2 border-brand-ai/50 bg-gradient-to-br from-white to-purple-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-ai bg-purple-100 px-2.5 py-0.5 rounded-full">
            Recommended Next Step
          </span>
          <h4 className="text-base font-bold text-brand-text-primary mt-1">
            Strengthen Capacitance & Dielectrics
          </h4>
          <p className="text-xs text-brand-text-secondary mt-0.5">
            Turn your lowest concept into a high-confidence strength with 3 practice problems.
          </p>
        </div>

        <Button
          variant="ai"
          size="md"
          className="self-start sm:self-auto flex-shrink-0"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => navigate('/student/next-best-action')}
        >
          VIEW NEXT QUEST
        </Button>
      </Card>
    </div>
  );
};
