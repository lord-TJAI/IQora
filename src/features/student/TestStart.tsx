import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTests } from '@/services/mock/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Clock, HelpCircle, AlertTriangle, ShieldAlert, Award } from 'lucide-react';

export const TestStart: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const test = mockTests.find((t) => t.id === testId) || mockTests[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/student/learn/physics')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel</span>
      </button>

      <Card className="p-6 sm:p-8 border border-brand-border space-y-6 shadow-elevated">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
            Class 12 Term Assessment
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary mt-2">
            {test.title}
          </h1>
          <p className="text-xs sm:text-sm text-brand-text-secondary mt-1">
            Subject: <strong className="text-brand-text-primary">{test.subjectName}</strong> • Chapter: {test.chapterTitle}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <Clock className="w-5 h-5 text-brand-ai mx-auto mb-1" />
            <span className="text-xs font-bold text-brand-text-secondary block">Duration</span>
            <span className="text-lg font-black text-brand-text-primary">
              {test.durationMinutes} Mins
            </span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <HelpCircle className="w-5 h-5 text-brand-primary mx-auto mb-1" />
            <span className="text-xs font-bold text-brand-text-secondary block">Questions</span>
            <span className="text-lg font-black text-brand-text-primary">
              {test.totalQuestions}
            </span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <Award className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <span className="text-xs font-bold text-brand-text-secondary block">Max Marks</span>
            <span className="text-lg font-black text-brand-text-primary">
              {test.maxMarks}
            </span>
          </div>
        </div>

        {/* Topics Covered */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-text-secondary">
            Topics Assessed:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {test.topics.map((top, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-brand-text-primary"
              >
                {top}
              </span>
            ))}
          </div>
        </div>

        {/* Assessment Rules */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2 text-amber-950">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <ShieldAlert className="w-4 h-4" />
            <span>Assessment Instructions & Rules:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {test.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <Button
            size="lg"
            variant="primary"
            className="w-full shadow-brand text-base font-black py-4"
            onClick={() => navigate(`/student/test/${test.id}/active`)}
          >
            START ASSESSMENT NOW
          </Button>
          <p className="text-center text-xs text-brand-text-secondary mt-2">
            The timer will begin as soon as you click start.
          </p>
        </div>
      </Card>
    </div>
  );
};
